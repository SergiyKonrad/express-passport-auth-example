// Routes for authentication
const express = require('express')
const passport = require('passport')
const User = require('../models/user')

const router = express.Router()

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const user = new User({ email, password })
        await user.save()
        res.status(201).json({ message: 'User registered successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message })
    }
})

// Login Route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return res
                .status(500)
                .json({ message: 'Server error', error: err.message })
        if (!user)
            return res
                .status(401)
                .json({ message: 'Invalid credentials', info })

        req.logIn(user, (err) => {
            if (err)
                return res
                    .status(500)
                    .json({ message: 'Login error', error: err.message })
            return res.json({
                message: 'Login successful',
                user,
            })
        })
    })(req, res, next)
})

// Redirect to static login page
router.get('/login', (req, res) => {
    res.redirect('/login.html') // Redirect to static login.html
})

// Dynamic login route (optional)
// Uncomment if you need server-rendered content
/*
router.get('/login', (req, res) => {
    res.send(`
    <h1>Dynamic Login</h1>
    <form action="/auth/login" method="POST">
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
    </form>
  `)
})
*/

// Logout Route
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err)
            return res
                .status(500)
                .json({ message: 'Logout error', error: err.message })
        res.json({ message: 'Logged out successfully' })
    })
})

// Login Failure Route
router.get('/login-failed', (req, res) => {
    res.status(401).json({ message: 'Login failed' })
})

// Route to fetch all users
router.get('/users', async (req, res) => {
    try {
        // Exclude the password field when fetching users
        const users = await User.find().select('-password')
        console.log(users)
        res.status(200).json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: 'Error fetching users',
            error: err.message,
        })
    }
})

module.exports = router

//   Login Route example for browser-based apps

// NB. By temporarily removing successRedirect, Passport won't attempt to perform a GET request to /protected after login.

/* 
router.post(
  '/login',
  passport.authenticate('local', {
      successRedirect: '/protected',
      failureRedirect: '/auth/login-failed',
  }),
) 
  */
