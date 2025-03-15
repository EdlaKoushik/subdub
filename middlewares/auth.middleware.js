// import jwt from 'jsonwebtoken'

// import {JWT_SECRET} from '../config/env.js'


// import User from '../models/user.model.js'
// //someone is making a request get user details ->authorize middle ->verify->if valid-> next->get user details
// const authorize=async (req,res,next)=>{
//     try{
//         let token;
        
//         if (req.headers.authorization && headers.authorization.startsWith("Bearer")){
//             token=req.headers.authorization.split('')[1];
//         }
        
//         if(!token) return res.status(401).json({message:"Unauthorized"});
//         const decoded=jwt.verify(token,JWT_SECRET)
//        const user=await User.findById(decoded.userId);
//        if(!user) return res.status(401).json({message:"Unauthorized"});
//        req.user=user;
//        next();
//     }catch(error){
//         res.status(401).json({message:"Unauthorized",error:error.message})
//     }
// }


// export default authorize


// //basically what this middlware is trying to do is 
// //finding the user based on the  token   that user is trying to make request  ,it looks if its there  decodes it verifies that that is the user,so later on we can know that who exactly making that request





// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config/env.js';
// import User from '../models/user.model.js';

// const authorize = async (req, res, next) => {
//     try {
//         let token;
        
//         if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
//             token = req.headers.authorization.split(' ')[1];
//         }
        
//         if (!token) return res.status(401).json({ message: "Unauthorized" });
        
//         const decoded = jwt.verify(token, JWT_SECRET);
//         const user = await User.findById(decoded.userId);
        
//         if (!user) return res.status(401).json({ message: "Unauthorized" });
        
//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("Authorization error:", error);
//         res.status(401).json({ message: "Unauthorized", error: error.message });
//     }
// };

// export default authorize;



// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../config/env.js';
// import User from '../models/user.model.js';

// const authorize = async (req, res, next) => {
//     try {
//         let token;
        
//         if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
//             token = req.headers.authorization.split(' ')[1];
//         }
        
//         if (!token) return res.status(401).json({ message: "Unauthorized" });
        
//         const decoded = jwt.verify(token, JWT_SECRET);
//         const user = await User.findById(decoded.userId);
        
//         if (!user) return res.status(401).json({ message: "Unauthorized" });
        
//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("Authorization error:", error);
//         res.status(401).json({ message: "Unauthorized", error: error.message });
//     }
// };

// export default authorize;

import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/env.js'
import User from '../models/user.model.js'

const authorize = async (req, res, next) => {
  try {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if(!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
}

export default authorize;