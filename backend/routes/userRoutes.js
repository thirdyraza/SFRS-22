const express = require('express');
const router = express.Router();
const{registerUser, loginUser, getMe, getAll} = require('../controllers/userController.js')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/all', protect, getAll)

module.exports = router