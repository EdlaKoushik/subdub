import {Router} from 'express';


import {signUp,signIn,signOut} from '../controllers/auth.controller.js'


const authRouter=Router();

//->/api/v1/auth/sign-up->POST BODY->{name,email,password}->CREATES A NEW USER


//path:/api/v1/auth/sign-up (POST)
authRouter.post('/sign-up',signUp);
authRouter.post('/sign-in',signIn);
authRouter.post('/sign-out',signOut);

export default authRouter;

//routes like end points that we can head and controllers are like logic after hitting that end point



//authorization meaning making a get call to the data base to figure out which users are in there  
