import jwt from "jsonwebtoken"
import { Response } from "express"


const signToken = (id: any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

const createSendToken = (user: any, statusCode: number, res: Response) => {
    const token = signToken(user.id)

    const cookieOptions = {
        expires: new Date(
            Date.now() + 90 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    user.password = undefined

    res.status(statusCode).json({
        status: true,
        message: 'successful',
        data: {
            user,
        },
        token,
    });
}

export default createSendToken;