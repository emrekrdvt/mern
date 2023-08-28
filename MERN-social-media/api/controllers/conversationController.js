const Conversation = require("../models/Conversation");

exports.newConv = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderID, req.body.receiverID],
  });
  try {
    const savedConv = await newConversation.save();
    res.status(200).json(savedConv);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getConv = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: {
        $in: [req.params.userId],
      },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getConv2userId = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    if (!conversation) {
      const newConversation = new Conversation({
        members: [req.params.firstUserId, req.params.secondUserId],
      });
      const newCon = await newConversation.save();
      return res.status(200).json(newCon);
    }
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};
