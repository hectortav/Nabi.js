import express, { Request, Response } from "express";
const router = express.Router();

interface ErrorMessage {
    message: string;
    fields: string[];
}

interface LoginResponse {
    errors: ErrorMessage[];
    message: string;
}

const user = "myusername";
const pass = "mypassword";

router.post("/login", (req: Request, res: Response<LoginResponse>) => {
    const errors: ErrorMessage[] = [];
    let message = "failed";
    const { username, password } = req.body;
    if (username === undefined) {
        errors.push({
            message: "No username specified",
            fields: ["username"],
        });
    }
    if (password === undefined) {
        errors.push({
            message: "No password specified",
            fields: ["password"],
        });
    }
    if (errors.length > 0) {
        res.json({
            errors,
            message,
        });
        return;
    }
    if (username == user && password == pass) {
        message = "success";
        res.json({
            errors,
            message,
        });
        return;
    }
    errors.push({
        message: "Username or password incorrect",
        fields: ["username", "password"],
    });

    res.json({
        errors,
        message,
    });
    return;
});

export default router;
