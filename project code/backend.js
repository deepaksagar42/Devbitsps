const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const PORT = 5001;

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Codeforces Leaderboard Backend!");
});

// Store active contests and their user data
const activeContests = new Map();
// Store last submission time for each user to optimize API calls
const lastSubmissionTimes = new Map();

// Fetch user submissions from Codeforces with rate limiting
async function fetchUserSubmissions(handle) {
  const cacheKey = `submissions_${handle}`;
  try {
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
    return response.data.result;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.log(`Rate limited for ${handle}, retrying in 1 second...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchUserSubmissions(handle);
    }
    console.error(`Error fetching submissions for ${handle}:`, error.message);
    return [];
  }
}

// Process submissions to determine solved problems
function filterSolvedProblems(submissions, contestId) {
  const solved = new Set();
  const firstSolveTime = {};
  const contestStartTime = getContestStartTime(contestId);

  submissions.forEach((submission) => {
    const { contestId: subContestId, problem, verdict, creationTimeSeconds } = submission;
    if (subContestId === parseInt(contestId) && verdict === "OK") {
      const problemIndex = problem.index;

      if (!solved.has(problemIndex)) {
        solved.add(problemIndex);
        // Store relative time from contest start (in seconds)
        firstSolveTime[problemIndex] = creationTimeSeconds - contestStartTime;
      }
    }
  });

  return { solved, firstSolveTime };
}

// Get contest start time (in seconds) - you'll need to fetch this from Codeforces API
// or store it manually per contest
function getContestStartTime(contestId) {
  // Placeholder - you should implement actual contest start time retrieval
  // For now, we'll use a fixed point in time
  return 0; // This means we'll use absolute submission times
}

// Get leaderboard data
async function getLeaderboard(contestId, users) {
  const leaderboard = [];

  // Use Promise.all for parallel API calls
  const userPromises = users.map(async (user) => {
    try {
      const submissions = await fetchUserSubmissions(user.handle);
      const { solved, firstSolveTime } = filterSolvedProblems(submissions, contestId);

      let totalTime = 0;
      Object.values(firstSolveTime).forEach((time) => {
        totalTime += time;
      });

      return {
        handle: user.handle,
        solvedCount: solved.size,
        totalTime: totalTime,
        problems: Array.from(solved)
      };
    } catch (error) {
      console.error(`Error processing user ${user.handle}:`, error);
      return {
        handle: user.handle,
        solvedCount: 0,
        totalTime: 0,
        problems: []
      };
    }
  });

  const results = await Promise.all(userPromises);
  leaderboard.push(...results);

  // Sort by solved count (descending) then by total time (ascending)
  leaderboard.sort((a, b) => b.solvedCount - a.solvedCount || a.totalTime - b.totalTime);
  return leaderboard;
}

// Update and broadcast leaderboard for a specific contest
async function updateLeaderboard(contestId) {
  try {
    const contestData = activeContests.get(contestId);
    if (!contestData) return;

    const { users } = contestData;
    const leaderboard = await getLeaderboard(contestId, users);
    
    io.to(`contest_${contestId}`).emit("leaderboard_update", leaderboard);
    console.log(`Updated leaderboard for contest ${contestId}`);
    
    // Update last update time
    contestData.lastUpdated = Date.now();
    activeContests.set(contestId, contestData);
  } catch (error) {
    console.error(`Error updating leaderboard for contest ${contestId}:`, error);
  }
}

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_contest", async ({ contestId, users }) => {
    console.log(`User ${socket.id} joined contest ${contestId}`);
    
    // Join the contest room
    socket.join(`contest_${contestId}`);
    
    // Create or update contest data
    if (!activeContests.has(contestId)) {
      // Start a new interval for this contest - check every 10 seconds
      const intervalId = setInterval(() => updateLeaderboard(contestId), 10000);
      activeContests.set(contestId, { 
        intervalId, 
        users,
        lastUpdated: Date.now(),
        sockets: new Set([socket.id])
      });
    } else {
      // Update existing contest data
      const contestData = activeContests.get(contestId);
      contestData.sockets.add(socket.id);
      // Merge users if needed
      const existingHandles = new Set(contestData.users.map(u => u.handle));
      for (const user of users) {
        if (!existingHandles.has(user.handle)) {
          contestData.users.push(user);
        }
      }
      activeContests.set(contestId, contestData);
    }
    
    // Send initial leaderboard
    try {
      const leaderboard = await getLeaderboard(contestId, activeContests.get(contestId).users);
      socket.emit("leaderboard_update", leaderboard);
    } catch (error) {
      console.error(`Error sending initial leaderboard:`, error);
      socket.emit("error", { message: "Failed to load initial leaderboard" });
    }
  });

  // Allow clients to request an immediate update
  socket.on("request_update", ({ contestId }) => {
    if (activeContests.has(contestId)) {
      updateLeaderboard(contestId);
    }
  });

  socket.on("leave_contest", ({ contestId }) => {
    socket.leave(`contest_${contestId}`);
    console.log(`User ${socket.id} left contest ${contestId}`);
    
    // Update contest data
    if (activeContests.has(contestId)) {
      const contestData = activeContests.get(contestId);
      contestData.sockets.delete(socket.id);
      
      // If no more clients are connected to this contest, consider removing it
      if (contestData.sockets.size === 0) {
        clearInterval(contestData.intervalId);
        activeContests.delete(contestId);
        console.log(`Removed contest ${contestId} - no active clients`);
      } else {
        activeContests.set(contestId, contestData);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    
    // Remove socket from all contests it was joined to
    for (const [contestId, contestData] of activeContests.entries()) {
      if (contestData.sockets.has(socket.id)) {
        contestData.sockets.delete(socket.id);
        
        if (contestData.sockets.size === 0) {
          clearInterval(contestData.intervalId);
          activeContests.delete(contestId);
          console.log(`Removed contest ${contestId} - no active clients`);
        } else {
          activeContests.set(contestId, contestData);
        }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});