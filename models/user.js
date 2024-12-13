// User model for storing user credentials

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        versionKey: false, // Excludes __v field from all responses
    },
)

// * Transform the output to exclude sensitive data like the password

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        // console.log('Before Transformation:', ret)
        delete ret.password
        // delete ret.__v
        // console.log('After Transformation:', ret)
        return ret
    },
})

userSchema.set('toObject', {
    transform: (doc, ret) => {
        delete ret.password // Remove the password field
        // delete ret.__v // Remove version key
        return ret
    },
})

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
// .pre is a Mongoose method to define pre-hooks (middleware) that execute before a specific operation, such as save, validate, remove, or find.

// Compare password
userSchema.methods.isValidPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)

// * Middleware to automatically exclude fields after find queries

// userSchema.post('find', function (docs) {
//   docs.forEach((doc) => {
//       doc.password = undefined
//   })
// })
