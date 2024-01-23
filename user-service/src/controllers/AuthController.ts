import express, { Request, Response } from "express";
import { User } from "../database";
import { ApiError } from "../utils";

const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new ApiError(400, "User already exists!");
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        return res.json({
            status: 200,
            message: "User registered successfully!",
            data: user,
        });
    } catch (error: any) {
        return res.json({
            status: 500,
            message: error.message,
        });
    }
};

export default {
    register,
};
