// const express = require('express');
// const { Pool } = require('pg');
// const bcrypt = require('bcrypt');
// const { OAuth2Client } = require('google-auth-library');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// app.use(express.json());

// app.use(cors({ origin: 'http://localhost:3000' }));


// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// });


// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// pool.query('SELECT NOW()', (err, res) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//     } else {
//         console.log('Database connected successfully:', res.rows[0].now);
//     }
// });


// app.get('/', (req, res) => {
//     res.send('Welcome to the CodeArena API!');
// });


// app.post('/api/signup', async (req, res) => {
//     const { username, email, password, confirmPassword } = req.body;

//     if (!username || !email || !password || !confirmPassword) {
//         return res.status(400).json({ success: false, message: 'All fields are required' });
//     }

//     if (password !== confirmPassword) {
//         return res.status(400).json({ success: false, message: 'Passwords do not match' });
//     }

//     try {
//         const userExists = await pool.query(
//             'SELECT * FROM users WHERE username = $1 OR email = $2',
//             [username, email]
//         );

//         if (userExists.rows.length > 0) {
//             return res.status(400).json({ success: false, message: 'Username or email already exists' });
//         }

//         const saltRounds = 10;
//         const passwordHash = await bcrypt.hash(password, saltRounds);

//         const newUser = await pool.query(
//             'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
//             [username, email, passwordHash]
//         );

//         res.status(201).json({ success: true, user: newUser.rows[0] });
//     } catch (error) {
//         console.error('Error during signup:', error);
//         res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
//     }
// });


// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ success: false, message: 'Email and password are required' });
//     }

//     try {
//         const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//         if (user.rows.length === 0) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.rows[0].password_hash);
//         if (!passwordMatch) {
//             return res.status(401).json({ success: false, message: 'Invalid password' });
//         }

//         res.status(200).json({ success: true, user: user.rows[0] });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
//     }
// });


// app.post('/api/login-codeforces', async (req, res) => {
//     const { codeforces_handle, password } = req.body;

//     if (!codeforces_handle || !password) {
//         return res.status(400).json({ success: false, message: 'Codeforces handle and password are required' });
//     }

//     try {
//         const user = await pool.query('SELECT * FROM users WHERE codeforces_handle = $1', [codeforces_handle]);
//         if (user.rows.length === 0) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.rows[0].password_hash);
//         if (!passwordMatch) {
//             return res.status(401).json({ success: false, message: 'Invalid password' });
//         }

//         res.status(200).json({ success: true, user: user.rows[0] });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
//     }
// });


// app.post('/api/login-google', async (req, res) => {
//     console.log("Fuckerrr")
//     const { token } = req.body;

//     if (!token) {
//         return res.status(400).json({ success: false, message: 'Google token is required' });
//     }

//     try {
//         const ticket = await client.verifyIdToken({
//             idToken: token,
//             audience: process.env.GOOGLE_CLIENT_ID,
//         });
//         const payload = ticket.getPayload();

//         const user = await pool.query(
//             'SELECT * FROM users WHERE google_id = $1 OR email = $2',
//             [payload.sub, payload.email]
//         );

//         if (user.rows.length === 0) {
//             const newUser = await pool.query(
//                 'INSERT INTO users (username, email, google_id) VALUES ($1, $2, $3) RETURNING *',
//                 [payload.name, payload.email, payload.sub]
//             );
//             return res.status(201).json({ success: true, user: newUser.rows[0] });
//         } else {
//             return res.status(200).json({ success: true, user: user.rows[0] });
//         }
//     } catch (error) {
//         console.error('Error during Google login:', error);
//         res.status(500).json({ success: false, message: 'Error logging in with Google', error: error.message });
//     }
// });


// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });  


// abhi ke liye bas login aur signup ka flow hai 

const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ origin: '*' }));

// Database connection
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Database connected successfully:', res.rows[0].now);
    }
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    try {
        const userExists = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ success: false, message: 'Username or email already exists' });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
            [username, email, passwordHash]
        );

        res.status(201).json({ success: true, user: newUser.rows[0] });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        const { password_hash, ...userData } = user.rows[0];
        res.status(200).json({ success: true, user: userData });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
    }
});


// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});