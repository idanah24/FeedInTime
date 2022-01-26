const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

// Create
// Everyone
router.post('/', controller.createUser)

// Read
// Admin
router.get('/', controller.getUser)

// Update
// Admin or Same user
router.put('/', controller.updateUser)

// Delete
// Admin
router.put('/', controller.deleteUser)

router.post('/login', controller.login)

router.post('/logout', controller.logout)


module.exports = router
