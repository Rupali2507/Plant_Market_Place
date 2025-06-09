import express from "express";

import {
  addToCart,
  getUserCart,
  UpdateCart,
} from "../controllers/CartController.js";
import authUser from "../middlewares/auth.js";

const CartRouter = express();

CartRouter.post("/get", authUser, getUserCart);
CartRouter.post("/add", authUser, addToCart);
CartRouter.post("/update", authUser, UpdateCart);

export default CartRouter;
