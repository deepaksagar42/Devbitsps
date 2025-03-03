import React from 'react';
import './App.css';
import Leaderboard from './Leaderboard';

function App() {
  // Example data - replace with your actual contest ID and users
  const contestId = 1234; // Replace with your contest ID
const users = [
  { handle: "lazynomad" },
  {
    handle: "strat42"
  }
];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Codeforces Leaderboard</h1>
      </header>
      <main>
        <Leaderboard contestId={contestId} users={users} />
      </main>
    </div>
  );
}

export default App;