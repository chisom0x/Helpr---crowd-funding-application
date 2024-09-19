import { Router } from "express";
import verifyToken from "../middlewares/verify-token";
import authRouter from './authentication'


const router = Router()

router.use('/auth', authRouter)






export default router