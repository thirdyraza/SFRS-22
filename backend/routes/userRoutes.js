const express = require('express');
const router = express.Router();
const{registerUser, loginUser, getMe, getAll, deleteUser, getAllDash} = require('../controllers/userController.js')
const {protect} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/all', getAll)
router.get('/alldash', protect, getAllDash)
router.delete('/:id', deleteUser)

module.exports = router