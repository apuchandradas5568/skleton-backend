import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  forgotPassword,
  resetPasswordGet,
  resetPasswordPost,
  verifyUser,
  googleAuth,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getShopData,
  getWebData,
} from "../controllers/customization.controller.js";

import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controllers.js";
import { createProduct, deleteProduct, getFeaturedProducts, getProductById, getProducts, updateProduct } from "../controllers/apu_product_controller.js";
import { addToFavorites } from "../controllers/favorite.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/auth/google").post(googleAuth);

router.route("/verify/:userId/:uniqueString").get(verifyUser);

router.route("/forgot-password").post(forgotPassword);

router.route("/reset-password/:userId/:token").get(resetPasswordGet);

router.route("/reset-password/:userId/:token").post(resetPasswordPost);

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
router.route("/get-web-data").get(getWebData);

router.route("/shop-data/:shop").get(getShopData);

router.route("/").post(verifyJWT, addToCart).get(verifyJWT, getCart);

router.route("/:productId").delete(verifyJWT, removeFromCart);



router.route('/add-product').post(createProduct )
router.route('/update-product/:id').put(updateProduct )
router.route('/delete-product/:id').delete(deleteProduct )
router.route('/get-products').get(getProducts )
router.route('/get-product/:id').get(getProductById )

router.route('/featured-products').get(getFeaturedProducts )



// routes from apu
router.route('/get-web-data').get(getWebData)


router.route('/add-cart').post(verifyJWT, addToCart )
router.route('/get-cart').get(verifyJWT, getCart )


router.route('/add-favorite').post(verifyJWT, addToFavorites )

export default router;
