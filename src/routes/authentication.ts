import { Router } from "express";
import Authentication from "../controllers/authentication";

const router = Router()

router.post('/signup', Authentication.signUp)
router.post('/login',  Authentication.login)
router.post('/logout', Authentication.logout)

export default router;
