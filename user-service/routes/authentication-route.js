import express from 'express';
var router = express.Router();
import LoginAuth from '../controller/authentication-controller.js'
router
    .route("/auth/login")
    .post(LoginAuth);

export default router