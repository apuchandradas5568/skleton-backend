import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const addItemToCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ApiError(404, 'Product not found'));
  }

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  cart.updatedAt = Date.now();
  await cart.save();

  res.status(200).json(new ApiResponse(200, cart));
});

export const getCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart) {
    return next(new ApiError(404, 'Cart not found'));
  }

  res.status(200).json(new ApiResponse(200, cart));
});

export const updateCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return next(new ApiError(404, 'Cart not found'));
  }

  const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

  if (itemIndex > -1) {
    if (quantity > 0) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.splice(itemIndex, 1);
    }
  } else {
    return next(new ApiError(404, 'Item not found in cart'));
  }

  cart.updatedAt = Date.now();
  await cart.save();

  res.status(200).json(new ApiResponse(200, cart));
});

export const clearCart = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return next(new ApiError(404, 'Cart not found'));
  }

  cart.items = [];
  cart.updatedAt = Date.now();
  await cart.save();

  res.status(200).json(new ApiResponse(200, { message: 'Cart cleared' }));
});
