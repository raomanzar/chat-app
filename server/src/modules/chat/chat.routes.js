import { Router } from "express";
import { requireAuth } from "../../middlewares/require-auth.js";
import {
  getMessages,
  sendMessage,
  markMessageAsRead,
  getConversations,
} from "./chat.controller.js";

export const chatRouter = Router();

chatRouter.use(requireAuth);

chatRouter.post("/send", sendMessage);
chatRouter.post("/markRead", markMessageAsRead);
chatRouter.get("/messages/:otherUserId", getMessages);
chatRouter.get("/conversations", getConversations);
