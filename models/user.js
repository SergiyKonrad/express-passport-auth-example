// User model for storing user credentials

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Compare password
userSchema.methods.isValidPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)

// http://localhost:8080/auth/register POST
// http://localhost:8080/auth/login POST

// http://localhost:8080/auth/login-failed GET
// http://localhost:8080/protected         GET
// http://localhost:8080/auth/logout POST

// .pre is a Mongoose method to define pre-hooks (middleware) that execute before a specific operation, such as save, validate, remove, or find.
