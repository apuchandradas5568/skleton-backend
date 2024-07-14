import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';


const addToFavorites = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const user = await User.findById(req.user._id);

  if (user.favorites.find(item => item.product.toString() === productId)) {
    throw new ApiError(400, 'Product already in favorites');
  }

  user.favorites.push({ product: productId });
  await user.save();
  res.status(200).json(new ApiResponse(200, user.favorites));
});

const removeFromFavorites = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = await User.findById(req.user._id);

  user.favorites = user.favorites.filter(item => item.product.toString() !== productId);
  await user.save();
  res.status(200).json(new ApiResponse(200, user.favorites));
});

const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('favorites.product');
  res.status(200).json(new ApiResponse(200, user.favorites));
});

export { addToFavorites, removeFromFavorites, getFavorites };
