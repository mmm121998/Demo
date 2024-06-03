import express from "express";
import {
  registerController,
  loginController,
  testController
} from "../controllers/authController.js";
import {requireSignIn, isAdmin} from "../middleware/authMiddleware.js"

//router Object
const router=express.Router()

//routing
//REGISTER || POST
router.post('/register',registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

export default router