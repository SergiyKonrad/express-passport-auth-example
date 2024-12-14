const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Create one document (insertOne)
router.post('/create', async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        res.status(201).json({
            message: 'Document created successfully',

            // Explicitly return only required fields
            // email: newUser.email,
            // _id: newUser._id,

            newUser: newUser.toJSON(), // Applies `toJSON` transformation
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error creating document',
            error: err.message,
        })
    }
})

// Create multiple documents (insertMany)
router.post('/create-many', async (req, res) => {
    try {
        const newUsers = await User.insertMany(req.body)
        res.status(201).json({
            message: 'Documents created successfully',
            // newUsers,
            newUsers: newUsers.map((user) => {
                const { password, ...rest } = user.toJSON() // Exclude sensitive fields
                return rest
            }),
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error creating documents',
            error: err.message,
        })
    }
})

// Update one document (updateOne)
router.put('/update', async (req, res) => {
    const { filter, update } = req.body
    try {
        const result = await User.updateOne(filter, update)
        res.status(200).json({
            message: 'Document updated successfully',
            result,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error updating document',
            error: err.message,
        })
    }
})

// Update multiple documents (updateMany)
router.put('/update-many', async (req, res) => {
    const { filter, update } = req.body
    try {
        const result = await User.updateMany(filter, update)
        res.status(200).json({
            message: 'Documents updated successfully',
            result,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error updating documents',
            error: err.message,
        })
    }
})

// Replace one document (replaceOne)
router.put('/replace', async (req, res) => {
    const { filter, replacement } = req.body
    try {
        const result = await User.replaceOne(filter, replacement)
        res.status(200).json({
            message: 'Document replaced successfully',
            result,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error replacing document',
            error: err.message,
        })
    }
})

// Delete one document (deleteOne)
router.delete('/delete', async (req, res) => {
    const { filter } = req.body
    try {
        const result = await User.deleteOne(filter)
        res.status(200).json({
            message: 'Document deleted successfully',
            result,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting document',
            error: err.message,
        })
    }
})

// Delete multiple documents (deleteMany)
router.delete('/delete-many', async (req, res) => {
    const { filter } = req.body
    try {
        const result = await User.deleteMany(filter)
        res.status(200).json({
            message: 'Documents deleted successfully',
            deletedCount: result.deletedCount,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting documents',
            error: err.message,
        })
    }
})

// Enhanced find with projection
router.post('/read', async (req, res) => {
    const { filter = {}, projection = {} } = req.body
    try {
        const users = await User.find(filter, projection)
        res.status(200).json({
            message: 'Documents retrieved successfully',
            users,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error reading documents',
            error: err.message,
        })
    }

    /*
    router.get('/read', async (req, res) => {
      const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
      const projection = req.query.projection ? JSON.parse(req.query.projection) : {};
      try {
          const users = await User.find(filter, projection);
          res.status(200).json({
              message: 'Documents retrieved successfully',
              users,
          });
      } catch (err) {
          res.status(500).json({
              message: 'Error reading documents',
              error: err.message,
          });
      }
  });
  */
})

module.exports = router

// I use the User.create here as User.insertOne is Native MongoDB method (not available in Mongoose).

/*
Notes:
1. Used `toJSON` to exclude sensitive fields like `password` after `insertMany`.
2. Added `deletedCount` in deleteMany response for better debugging.
3. Using explicit fields in responses (e.g., `email`, `_id`) ensures consistent data exposure.
*/

// Mongoose does not automatically apply transformations (e.g., toJSON) to documents returned by create(), insertMany(), or other similar methods.
