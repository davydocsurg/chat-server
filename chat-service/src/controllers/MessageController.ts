import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Message from "../database/models/Message";

const send = async (req: AuthRequest, res: Response) => {
    try {
        const { receiverId, message } = req.body;
        const senderId = req.user._id;

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        return res.json({
            status: 200,
            message: "Message sent successfully!",
            data: newMessage,
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const getConversation = async (req: AuthRequest, res: Response) => {
    try {
        const { receiverId } = req.params;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        });

        return res.json({
            status: 200,
            message: "Messages retrieved successfully!",
            data: messages,
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

const getConversations = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user._id;

        const messages = await Message.find({
            $or: [{ senderId: userId }, { receiverId: userId }],
        });

        return res.json({
            status: 200,
            message: "Messages retrieved successfully!",
            data: messages,
        });
    } catch (error) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

export default {
    send,
    getConversation,
    getConversations,
};
