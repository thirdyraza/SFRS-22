const express = require('express')
const router = express.Router()
const { getReserves, setReserve, updateReserve, deleteReserve, getAllReserves, getReservation, getForReview, getForCheck, getForDean, getForDeanDash, getReservesDash, getForReviewDash, getForCheckDash, setTemp, getIfExist,  deleteTemp, getTemp, getIfExistDay} = require('../controllers/reserveController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getReserves).post(protect, setReserve)
router.route('/limited').get(protect, getReservesDash)
router.get('/all', protect, getAllReserves)
router.route('/reviewLimited').get(protect, getForReviewDash)
router.route('/review').get(protect, getForReview)
router.route('/checkLimited').get(protect, getForCheckDash)
router.route('/check').get(protect, getForCheck)
router.route('/deansLimited').get(protect, getForDeanDash)
router.route('/deans').get(protect, getForDean)
router.route('/temp').post(protect, setTemp).get(protect, getTemp)
router.route('/existing').get(protect, getIfExist)
router.route('/existingDay').get(protect, getIfExistDay)
router.route('/temp/:id').delete(protect, deleteTemp)
router.route('/:id').put(updateReserve).delete(protect, deleteReserve).get(getReservation)


module.exports = router