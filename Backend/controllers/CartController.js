import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (typeof cartData[itemId] === "number") {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1; // Start count as number
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const UpdateCart = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    cartData[itemId] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
export { addToCart, UpdateCart, getUserCart };
