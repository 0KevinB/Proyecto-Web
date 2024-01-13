import { Router } from "express";
import { login, newUser, forgotPassword, resetPassword, getUserDetails, updateUserInfo } from "../controlers/usuario";
import validateToken from "./validate-token";

const router = Router()

router.post('/', newUser)

router.post('/login', login)

router.post('/forgotPassword', forgotPassword)

router.post('/resetPassword', resetPassword)

router.get('/getUserDetails/:Cedula', validateToken, getUserDetails);

router.put('/update/:Cedula', validateToken, updateUserInfo);


export default router;