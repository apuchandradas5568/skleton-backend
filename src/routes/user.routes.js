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
import { getShopData, getWebData } from "../controllers/customization.controller.js";
import { addItemToCart, clearCart, getCart, updateCart } from "../controllers/cart.controllers.js";
import { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid } from "../controllers/order.controllers.js";
import { createShippingAddress, deleteShippingAddress, getShippingAddressById, getUserShippingAddresses, updateShippingAddress } from "../controllers/shippingAddress.controller.js";


const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route('/auth/google').post(googleAuth);

router.route("/verify/:userId/:uniqueString").get(verifyUser)

router.route("/forgot-password").post(forgotPassword)

router.route("/reset-password/:userId/:token").get(resetPasswordGet)

router.route("/reset-password/:userId/:token").post(resetPasswordPost)

//secured routes
// router.route("/logout").post(verifyJWT,  logoutUser)



// routes from apu
router.route('/get-web-data').get(getWebData)
router.route('/shop-data/:shop').get(getShopData)




export default router