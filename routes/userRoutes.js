const express = require('express');
const router = express.Router();
const userController = require('../controllers/userConrollers');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:name', userController.getUserByName);
router.put('/:name', userController.updateUser);
router.delete('/:name', userController.deleteUser);
router.delete('/', userController.deleteAllUsers);

module.exports = router;
