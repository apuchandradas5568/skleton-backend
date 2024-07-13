import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    forgotPassword,
    resetPasswordGet,
    resetPasswordPost,
    verifyUser,
    googleAuth
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getWebData } from "../controllers/customization.controller.js";


const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route('/auth/google').post(googleAuth);

router.route("/verify/:userId/:uniqueString").get(verifyUser)

router.route("/forgot-password").post(forgotPassword)

router.route("/reset-password/:userId/:token").get(resetPasswordGet)

router.route("/reset-password/:userId/:token").post(resetPasswordPost)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)

export default router