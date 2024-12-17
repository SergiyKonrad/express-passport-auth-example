const express = require('express')
const router = express.Router()
const User = require('../models/user')

// Cursor Example: Iterate through documents and stream them in batches

router.get('/cursor', async (req, res) => {
    try {
        const batchSize = parseInt(req.query.batchSize) || 10
        const cursor = User.find(
            {},
            { email: 1, createdAt: 1, _id: 0 },
        ).cursor()

        const users = []
        for await (const user of cursor) {
            users.push(user)
            if (users.length >= batchSize) break
        }

        res.status(200).json({
            message: 'Documents retrieved using cursor',
            users,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error using cursor',
            error: err.message,
        })
    }
})

// Aggregation Example: Group users by registration date and count them

router.get('/aggregate/stats', async (req, res) => {
    try {
        const stats = await User.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: '%Y-%m-%d',
                            date: '$createdAt',
                        },
                    },
                    userCount: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } }, // Sort by date in ascending order
        ])

        if (!stats.length) {
            return res.status(200).json({
                message: 'No statistics or users available',
                stats: [],
            })
        }

        res.status(200).json({
            message: 'User registration statistics',
            stats,
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error generating statistics',
            error: err.message,
        })
    }
})

module.exports = router
