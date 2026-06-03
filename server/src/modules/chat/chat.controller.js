import {
  sendMessageService,
  markMessageAsReadService,
  getMessagesService,
  getConversationsService,
} from "./chat.service.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, content } = req.body;
    const data = await sendMessageService({ senderId, receiverId, content });
    //TODO WEBSOCKET NOTIFICATION TO RECEIVER (NOTIFY ONLY WHEN USER IS OFFLINE)
    return res.json(data);
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message || "Failed to send message" });
  }
};

export const markMessageAsRead = async (req, res) => {
  try {
    const userId = req.user.id; // Jo padh raha hai
    const { senderId } = req.body; // Jisne wo messages bheje the JIS K LYE MARK AS READ KR RHA HAI
    const data = await markMessageAsReadService({
      receiverId: userId,
      senderId,
    });
    //TODO WEBSOCKET
    return res.json({ success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message || "Failed to mark messages as read" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { otherUserId } = req.params;
    const { limit, cursor } = req.query;
    const data = await getMessagesService({
      userId,
      otherUserId,
      limit: limit ? parseInt(limit) : undefined,
      cursor: cursor ? parseInt(cursor) : undefined,
    });
    return res.json(data);
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message || "Failed to fetch messages" });
  }
};
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await getConversationsService({ userId });
    return res.json(data);
  } catch (err) {
    return res
      .status(400)
      .json({ message: err.message || "Failed to fetch conversations" });
  }
};
