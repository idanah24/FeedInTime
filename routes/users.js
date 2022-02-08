const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const auth = require('../utilities/auth')

// Create
// Everyone
router.post('/', controller.createUser)

// Read
// Admin
router.get('/', auth.verifyAdmin, controller.getUser)

// Update
// Admin or Same user
router.put('/', auth.verifySameUser, controller.updateUser)

// Delete
// Admin or same user
router.delete('/', auth.verifySameUser, controller.deleteUser)

router.post('/login', controller.login)


// TODO: Logout on client side
router.post('/logout', controller.logout)


module.exports = router
