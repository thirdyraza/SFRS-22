const express = require('express');
const router = express.Router();
const {setNotif, getNotifs} = require('../controllers/notifController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, setNotif).get(protect, getNotifs)

module.exports = router