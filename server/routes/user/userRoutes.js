const express = require('express');
const userController = require('../../controllers/userController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/all', userController.getAllUsers);
router.get('/profile', authMiddleware.authenticate, userController.getUserByJwt);
router.get('/:id', authMiddleware.authenticate, userController.getUserById);


module.exports = router;