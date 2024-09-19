import { Router } from "express";
import authRouter from './authentication'


const router = Router()

router.use('/auth', authRouter)






export default router