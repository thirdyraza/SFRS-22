const express = require('express');
const router = express.Router();
const {setNotif, getNotifs, getAllNotifs, getHeadNotifs, getDeanNotifs, getOsasNotifs, getCheckNotifs} = require('../controllers/notifController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, setNotif)
router.route('/all').get(protect, getAllNotifs)
router.route('/head').get(protect, getHeadNotifs)
router.route('/dean').get(protect, getDeanNotifs)
router.route('/osas').get(protect, getOsasNotifs)
router.route('/:id').get(protect, getNotifs)
router.route('/venic/:id').get(protect, getCheckNotifs)

module.exports = router