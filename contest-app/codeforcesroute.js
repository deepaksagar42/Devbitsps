const express = require("express");
const axios = require("axios");

const router = express.Router();

// Fetch problems from Codeforces API
router.get("/problems", async (req, res) => {
    try {
        const response = await axios.get("https://codeforces.com/api/problemset.problems");
        if (response.data.status === "OK") {
            const problems = response.data.result.problems.map(problem => ({
                id: `${problem.contestId}-${problem.index}`,
                name: problem.name,
                rating: problem.rating || "Unrated",
                tags: problem.tags || [],
                link: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`
            }));
            res.json(problems);
        } else {
            res.status(500).json({ message: "Failed to fetch problems from Codeforces" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching problems", error: error.message });
    }
});

module.exports = router;
 