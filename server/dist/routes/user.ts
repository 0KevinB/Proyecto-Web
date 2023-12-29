import { Router } from "express";
import { login, newUser, forgotPassword, resetPassword } from "../controlers/usuario";

const router = Router()

router.post('/', newUser)

router.post('/login', login)

router.post('/forgotPassword', forgotPassword)

router.post('/resetPassword', resetPassword)
export default router;