// Passport configuration

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

// Configure Passport to use Local Strategy
passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email })
                if (!user) {
                    return done(null, false, {
                        message: 'No user with that email',
                    })
                }
                const isMatch = await user.isValidPassword(password)
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password' })
                }
                return done(null, user)
            } catch (err) {
                return done(err)
            }
        },
    ),
)

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
})
