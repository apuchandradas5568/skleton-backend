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
// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/change-password").post(verifyJWT, changeCurrentPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)

// router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
// router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

// router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
// router.route("/history").get(verifyJWT, getWatchHistory)




// routes from apu
router.route('/get-web-data').get(getWebData)




export default router