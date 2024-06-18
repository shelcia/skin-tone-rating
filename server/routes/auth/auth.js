import { Router } from "express";
import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";
dotenv.config();

const router = Router();
//LOGIN SCHEMA
const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const email = process.env.EMAIL;
const pwd = process.env.PASSWORD;

//SIGNIN USER
router.post("/signin", async (req, res) => {
  console.log({ email, pwd });
  try {
    //VALIDATION OF USER INPUTS
    await loginSchema.validateAsync(req.body);

    if (email !== req.body.email || pwd !== req.body.password) {
      res.status(400).json({ status: "400", message: "Invalid Credentials" });
      return;
    }

    //CREATE TOKEN
    const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET, {
      expiresIn: "6h", // expires in 6 hours
    });

    res.status(200).header("auth-token", token).json({
      status: "200",
      token: token,
    });
  } catch (error) {
    if (error.details) {
      return res
        .status(400)
        .json({ status: "400", message: error.details[0]?.message });
    } else {
      res.status(500).json({ status: "400", message: error });
      return;
    }
  }
});

export default router;
