require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const authMiddleware = require('./middleware/authMiddleware')
const dataRoutes = require('./routes/data')
const statisticsRoutes = require('./routes/statistics')

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session Configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false, // Only saves sessions when they are modified
        cookie: {
            httpOnly: true, // Protect cookies from being accessed by JS
            secure: false, // Set to true if using HTTPS
            maxAge: 1000 * 60 * 60, // 1 hour
        },
    }),
)

// Passport Initialization
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

//  Routes
app.use('/auth', authRoutes)
app.use('/data', dataRoutes)
app.use('/stats', statisticsRoutes)

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Express-Passport App!')
})

// Protected Route (use middleware)
app.get('/protected', authMiddleware, (req, res) => {
    res.json({
        message: 'Welcome to the protected route!',
        user: req.user,
    })
})

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`),
        )
    })
    .catch((err) => console.error('Database connection error:', err))

// ------------ Available Routes ------------

// Authentication Routes
// POST  /auth/register    - Register a new user
// POST  /auth/login       - Authenticate user and log in
// POST  /auth/logout      - Log out user and destroy session

// User Routes
// GET  /auth/users   - Fetch all users (excludes sensitive data)

// Error Routes
// GET  /auth/login-failed  - Login failure response

// Protected Routes (app.js)
// GET  /protected    - Access secure route (requires authentication)

// Data Routes
// POST   /data/create         - Create one document
// POST   /data/create-many    - Create multiple documents
// PUT    /data/update         - Update one document
// PUT    /data/update-many    - Update multiple documents
// PUT    /data/replace        - Replace a single document
// DELETE /data/delete         - Delete one document
// DELETE /data/delete-many    - Delete multiple documents
// POST   /data/read           - Retrieve documents with optional filter and projection

// Statistics Routes
// GET  /stats/cursor          - Retrieve documents using a cursor for efficient memory usage
// GET  /stats/aggregate/stats  - Aggregate user registration statistics by date

/*
Use Postman, Thunder Client, or your browser to test:
GET /: Verifies the server is running.
POST /auth/register: Registers a new user.
POST /auth/login: Logs in an existing user.
GET /protected: Checks if the protected route works. 
*/
