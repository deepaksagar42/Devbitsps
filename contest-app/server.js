const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const contestRoutes = require("./contestroutes");
const codeforces = require("./codeforcesroute"); // Ensure this is correct

dotenv.config(); // Load environment variables
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow all origins

app.use("/api/contests", contestRoutes);
app.use("/api/codeforces", codeforces); // Add this line

// Test route
app.get("/", (req, res) => {
    res.send("API is fineeee working!");
});

// Log the loaded port
console.log("Loaded PORT from .env:", process.env.PORT);

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
