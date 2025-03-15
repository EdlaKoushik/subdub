
// import mongoose from 'mongoose'
// import bcrypt from  'bcryptjs'
// import jwt  from  'jsonwebtoken'
// import User from '../models/user.model.js';
// import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';
// //what is a request body?-> req.body is an object containing data from the client  (POST request)


// export const signUp=async (req,res,next)=>{
//     //implementing the logic for signup
//     const session =await mongoose.startSession();
//     session.startTransaction();
// }
// try{
//    //logic to create a new user

//    const {name,email,password}=req.body;

//    //check if a user alreay exists
   
//    const existingUser=await User.findOne({email});


//    if (existingUser){
//      const error=new Error("user already exists");
//      error.statusCode=409;
//      throw error;
//    }




//    //if the user not found in database so we can hash the password for the new user means securing password

//    //salt is used for randomizing the hash password
     

//    const salt=await  bcrypt.genSalt(10);
//    const hashedPassword=await bcrypt.hash(password,salt);
   
//   //once we have the hashedpassword then we can create a new user
  

//   const newUsers =await userRouter.create([{name,email,password:hashedPassoword}],{session})

//   const token =jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:'JWT_EXPIRES_IN'});

// await session.commitTransaction();
// session.endSession();
// res.status(201).json({
//     success:true,
// message:"user created successfully",
// data:{
//     token,
//     user:newUsers[0],
// }})


// }catch(error){
//     await session.abortTransaction();  //if any error got then simply abort the process dont do any thing
//     session.endSession();
//     next(error);
// }






// export const signIn=async(req,res,next)=>{
//  //implementing the logic for signIn
// }

// export const signOut=async(req,res,next)=>{
// //implementing the logic for signOut
// }




// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';
// import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';

// export const signUp = async (req, res, next) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     try {
//         const { name, email, password } = req.body;

//         // Check if a user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             const error = new Error("User already exists");
//             error.statusCode = 409;
//             throw error;
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create a new user
//         const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

//         // Generate JWT token
//         const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//         await session.commitTransaction();
//         session.endSession();

//         res.status(201).json({
//             success: true,
//             message: "User created successfully",
//             data: {
//                 token,
//                 user: newUsers[0],
//             }
//         });
//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         next(error);
//     }
// };


// export const signIn=async(req,res,next)=>{
//  //implementing the logic for signIn

//  try{
//  const {email,password}=req.body;
 
//  const user =await User.findOne({email});

//  if(!user){
//     const error=new Error('User not found');
//     error.statusCode=404;
//     throw error;
//  }
//  const isPasswordValid=await bcrypt.compare(password,user.password);
//  if(!isPasswordValid){
//     const error =new Error('Invalid password');
//     error.statusCode=401;
//     throw error;
//   }

//   //if the password is correct then we can generate a new token
//   const token =jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
//   res.status(200).json({
//     success:true,
//     message:'User signed in successfully',
//     data:{
//         token,
//         user,
//     }
//   });

//  }catch(error){
//     next(error);
//  }

// }
// export const signOut = async (req, res, next) => {
//     try {
//         // Example: Clear token or session
//         res.status(200).json({ success: true, message: "User signed out successfully" });
//     } catch (error) {
//         next(error);
//     }
// };




import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // Check if a user already exists
    const existingUser = await User.findOne({ email });

    if(existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUsers[0],
      }
    })
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user,
      }
    });
  } catch (error) {
    next(error);
  }
}

export const signOut = async (req, res, next) => {
    try {
        // Example: Clear token or session
        res.status(200).json({ success: true, message: "User signed out successfully" });
    } catch (error) {
        next(error);
    }
};