const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/room', chatController.createRoom);
router.post('/message', chatController.sendMessage);
router.get('/messages', chatController.getMessages);

module.exports = router;
