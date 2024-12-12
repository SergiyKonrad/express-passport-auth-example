// Middleware to protect routes

module.exports = (req, res, next) => {
    // console.log('Session:', req.session)
    // console.log('User:', req.user)
    if (req.isAuthenticated()) {
        return next()
    }
    res.status(401).json({ message: 'Unauthorized access' })
}

// req.isAuthenticated() is part of the Passport.js API. It becomes available because of the Passport middleware in the app.js.
