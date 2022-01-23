const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');




router.get('/', controller.getUser)
router.get('/:id', controller.getUser)
router.post('/', controller.insertUser)






module.exports = router
