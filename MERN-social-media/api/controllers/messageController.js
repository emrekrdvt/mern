const Message = require("../models/Message");

exports.addMsg = async (req, res) => {
  const newMsg = new Message(req.body);
  try {
    const savedMsg = await newMsg.save();
    res.status(200).json(savedMsg);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getMsg = async (req, res) => {
  try {
    console.log('patlamadan geldim buraya kadar')
    if (req.params.convId) {
      const messages = await Message.find({
        conversationID: req.params.convId,
      });
      console.log('mesaj bastirdim')
      if (messages.length > 0) res.status(200).json(messages);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
