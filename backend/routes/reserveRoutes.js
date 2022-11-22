const express = require('express')
const router = express.Router()
const { getReserves, setReserve, updateReserve, deleteReserve } = require('../controllers/reserveController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getReserves).post(protect, setReserve)
router.route('/:id').put(protect, updateReserve).delete(protect, deleteReserve)

module.exports = router