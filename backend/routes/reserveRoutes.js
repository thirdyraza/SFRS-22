const express = require('express')
const router = express.Router()
const { getReserves, setReserve, updateReserve, deleteReserve, getAllReserves } = require('../controllers/reserveController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getReserves).post(protect, setReserve)
router.route('/:id').put(protect, updateReserve).delete(protect, deleteReserve)
router.get('/all', protect, getAllReserves)

module.exports = router