import {getUsers,getUser} from '../controllers/user.controller.js'
import authorize from '../middlewares/auth.middleware.js'
import {Router} from 'express';
const userRouter=Router();
userRouter.get('/',getUsers);
userRouter.get('/:id',authorize,getUser);   //so the user who is loged in can able to see his details
userRouter.post('/',(req,res)=>res.send({title:" Create new user"}));
userRouter.put("/:id",(req,res)=>res.send({title:"Update user"}));
userRouter.delete('/:id',(req,res)=>res.send("delete the specific user"))

export default userRouter;
