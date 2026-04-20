const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/protect');
const {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login',    loginUser);
router.post('/logout',   protect, logoutUser);
router.get('/me',        protect, getMe);

module.exports = router;