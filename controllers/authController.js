import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import dotenv from 'dotenv'


export const registerController = async (req, res)=>{
    try{
        const {name,email,password,phone,address,answer} =req.body
        //validations
        if(!name){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
        if(!phone){
            return res.send({message:'Pnone no. is required'})
        }
        if(!address){
            return res.send({message:'Address is required'})
        }
        if(!answer){
          return res.send({message:'Answer is required'})
      }

        //check  user
        const existingUser =await userModel.findOne({email})
        //existing user
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Register please login',
            })
        }

        //register user
        const hashedPassword=await hashPassword(password)
        //save
        const user= await new userModel({name,email,phone,address,answer,password:hashedPassword}).save()
        res.status(201).send({
        success:true,
        message:'user Registration Successfully',
        user
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          adddress: user.address,
          role:user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };

  // forgotPasswordController
  export const forgotPasswordController= async(req, res)=>{
    try {
      const{email,answer,newPassword}=req.body
      if(!email){
        res.status(400).send({message:"Email is Required"})
      }
      if(!answer){
        res.status(400).send({message:"Answer is Required"})
      }
      if(!newPassword){
        res.status(400).send({message:"newPassword is Required"})
      }
      //Check
      const user=await userModel.findOne({email, answer});
      //Validation
      if(!user){
        return res.status(404).send({
          success:false,
          message:"Wrong email or answer"
        });
      };
      const hashed=await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id,{password:hashed});
      res.status(200).send({
        success:true,
        message:"Password Reset Successfully"
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).send({
        sucess:false,
        message:"Something Went Wrong",
        error,
      })
      
    }
  }

  //test Controller
  export const testController =(req,res)=>{
    res.send("protected Route");
  }