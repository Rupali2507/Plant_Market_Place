import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";

import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/ProductRoute.js";
import CartRouter from "./routes/CartRouter.js";
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api endpoints
app.get("/", (req, res) => {
  res.send("API is working...");
});

// api endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", CartRouter);

connectDB();
connectCloudinary()
  .then(() => {
    console.log("Cloudinary connected successfully");
  })
  .catch((error) => {
    console.error("Cloudinary connection failed:", error);
  });

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
