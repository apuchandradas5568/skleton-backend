import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory, 
    updateAccountDetails,
    verifyUser,
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getShopData, getWebData } from "../controllers/customization.controller.js";
import { addItemToCart, clearCart, getCart, updateCart } from "../controllers/cart.controllers.js";
import { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrderToDelivered, updateOrderToPaid } from "../controllers/order.controllers.js";
import { createShippingAddress, deleteShippingAddress, getShippingAddressById, getUserShippingAddresses, updateShippingAddress } from "../controllers/shippingAddress.controller.js";


const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/verify/:userId/:uniqueString").get(verifyUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)




// routes from apu
router.route('/get-shop-data/:shop').get(getShopData)
router.route('/get-web-data').get(getWebData)


// cart routes
router.post('/cart',  addItemToCart);
router.get('/cart', getCart);
router.put('/cart', updateCart);
router.delete('/cart', clearCart);


// shipping address routes 
router.post('/',  createShippingAddress);
router.get('/',  getUserShippingAddresses);
router.get('/:id',  getShippingAddressById);
router.put('/:id',  updateShippingAddress);
router.delete('/:id',  deleteShippingAddress);

// orders routes 
router.post('/', createOrder);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrderById);
router.put('/:id/pay', updateOrderToPaid);
router.put('/:id/deliver', updateOrderToDelivered);
router.get('/', getAllOrders);








export default router