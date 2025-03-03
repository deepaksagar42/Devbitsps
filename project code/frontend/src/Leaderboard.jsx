import { useEffect, useState } from "react";
import io from "socket.io-client";

const Leaderboard = ({ contestId, users, currentUser }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const socket = io("http://localhost:5001");

    // Join contest room
    socket.emit("join_contest", { contestId, users });

    // Listen for leaderboard updates
    socket.on("leaderboard_update", (data) => {
      setLeaderboard(data);
      setLastUpdate(new Date());
      setLoading(false);
    });

    // Listen for errors
    socket.on("error", (data) => {
      setError(data.message);
      setLoading(false);
    });

    // Set up interval to request updates every minute
    const updateInterval = setInterval(() => {
      socket.emit("request_update", { contestId });
    }, 60000); // Every minute

    // Cleanup function
    return () => {
      clearInterval(updateInterval);
      socket.emit("leave_contest", { contestId });
      socket.disconnect();
      socket.off("leaderboard_update");
      socket.off("error");
    };
  }, [contestId, users]);

  // Function to request immediate update
  const refreshLeaderboard = () => {
    setRefreshing(true);
    socket.emit("request_update", { contestId });
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Paginated leaderboard
  const paginatedLeaderboard = leaderboard.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading && !leaderboard.length) return <div>Loading leaderboard data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!leaderboard.length) return <div>No data available for this contest.</div>;

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Contest {contestId} Leaderboard</h2>
        <div className="leaderboard-controls">
          <button onClick={refreshLeaderboard} className="refresh-button" disabled={refreshing}>
            {refreshing ? "Refreshing..." : "Refresh Now"}
          </button>
          {lastUpdate && (
            <div className="last-update">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Handle</th>
            <th>Problems Solved</th>
            <th>Total Time</th>
          </tr>
        </thead>
        <tbody>
          {paginatedLeaderboard.map((user, index) => (
            <tr
              key={user.handle}
              className={`${index < 3 ? `top-${index + 1}` : ""} ${
                user.handle === currentUser ? "current-user" : ""
              }`}
            >
              <td>{index + 1}</td>
              <td>{user.handle}</td>
              <td>{user.solvedCount}</td>
              <td>{formatTime(user.totalTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage * itemsPerPage >= leaderboard.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Helper function to format time
function formatTime(seconds) {
  if (!seconds) return "0";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

export default Leaderboard;