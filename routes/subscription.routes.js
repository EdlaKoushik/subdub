import {Router} from 'express';
import authorize from '../middlewares/auth.middleware.js'
import {createSubscription,
    getUserSubscriptions,
    getAllSubscriptions,
    getSubscriptionDetails,
} from "../controllers/subscription.controller.js"
const subscriptionRouter=Router();

subscriptionRouter.get('/',authorize,getAllSubscriptions)
subscriptionRouter.get('/:id',authorize,getSubscriptionDetails)
subscriptionRouter.post('/',authorize,createSubscription);
subscriptionRouter.put('/:id',(req,res)=>res.send({title:"Update subscriptions"}))
subscriptionRouter.delete('/:id',(req,res)=>res.send({title:"Get all subscriptions"}))
subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions)
subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({title:"CANCEL all subscritions"}))



subscriptionRouter.get('/upcoming-renewals', authorize, async (req, res) => {
    try {
        const upcomingSubscriptions = await Subscription.find({
            renewalDate: { $gte: new Date() },
            user: req.user._id,
        });
        res.status(200).json({ success: true, data: upcomingSubscriptions });
    } catch (error) {
        next(error);
    }
});
export default subscriptionRouter;
// nayb laqy febu nxan


