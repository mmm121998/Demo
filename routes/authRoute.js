import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController
} from "../controllers/authController.js";
import {requireSignIn, isAdmin} from "../middleware/authMiddleware.js"

//router Object
const router=express.Router()

//routing
//REGISTER || POST
router.post('/register',registerController);

//LOGIN || POST
router.post("/login", loginController);

//FORGOT PASSWORD || POST
router.post("/forgot-password",forgotPasswordController);

//Protected Route user auth
router.get("/user-auth", requireSignIn,  (req, res)=>{
  res.status(200).send({ok:true});
});
//Protected Route admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res)=>{
  res.status(200).send({ok:true});
});

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

export default router