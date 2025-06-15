import express from "express";

const orderRouter = express.Router();
import {
  userOrder,
  updateStatus,
  allOrders,
  placeOrder,
  placeOrderStripe,
  verify_stripe,
} from "../controllers/OrderControllers.js";

import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

// ADMIN ROUTES
// Route to get all orders
orderRouter.post("/list", adminAuth, allOrders);
// Route to update the status of a new order
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Routes
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);

// User Features
orderRouter.post("/userorder", authUser, userOrder);

// verify payement
orderRouter.post("/verifyStripe", authUser, verify_stripe);

export default orderRouter;
