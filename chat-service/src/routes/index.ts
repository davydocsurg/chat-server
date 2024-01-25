import { Router } from "express";
import MessageController from "../controllers/MessageController";
import { authMiddleware } from "../middleware";

const messageRoutes = Router();

// @ts-ignore
messageRoutes.post("/send", authMiddleware, MessageController.send);
messageRoutes.get(
    "/get/message/:receiverId",
    // @ts-ignore
    authMiddleware,
    MessageController.getConversation
);
messageRoutes.get(
    "/get/messages",
    // @ts-ignore
    authMiddleware,
    MessageController.getConversations
);

export default messageRoutes;
