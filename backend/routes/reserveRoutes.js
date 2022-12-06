const express = require('express')
const router = express.Router()
const { getReserves, setReserve, updateReserve, deleteReserve, getAllReserves, getReservation, getForReview } = require('../controllers/reserveController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getReserves).post(protect, setReserve)
router.get('/all', protect, getAllReserves)
router.route('/review').get(protect, getForReview)
router.route('/:id').put(updateReserve).delete(protect, deleteReserve).get(getReservation)


module.exports = router