const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const auth = require('../utilities/auth')

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
// Admin or same user
router.delete('/', auth.verifySameUser, controller.deleteUser)

// Not already logged in
router.post('/login', controller.login)

router.post('/logout', controller.logout)


module.exports = router
