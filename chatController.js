const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const User = require('../models/User');

exports.createRoom = async (req, res) => {
  const { name, users, isGroup } = req.body;
  const room = new ChatRoom({ name, users, isGroup });
  await room.save();
  res.json(room);
};

exports.sendMessage = async (req, res) => {
  const { chatRoomId, senderId, text } = req.body;
  const message = new Message({ chatRoom: chatRoomId, sender: senderId, text });
  await message.save();
  res.json(message);
};

exports.getMessages = async (req, res) => {
  const { chatRoomId, page = 1, limit = 10 } = req.query;
  const messages = await Message.find({ chatRoom: chatRoomId })
    .sort({ timestamp: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(messages.reverse());
};
