import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    console.log("Subscription created:", subscription); 
    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })
    console.log("Workflow triggered with ID:", workflowRunId); 
    if (!workflowRunId) {
        throw new Error('Failed to get workflowRunId from Upstash');
    }

    res.status(201).json({ success: true, data: { subscription, workflowRunId } });
  } catch (e) {
    next(e);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if(req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
}


export const getAllSubscriptions=async(req,res,next)=>{
    try{
     //fetch all subscriptions (you can add filters or pagination here)
     const subscriptions=await Subscription.find({});
     res.status(200).json({success:true,data:subscriptions})
    }catch(e){
        next(e);
    }
};





//get subscription details by ID
export  const getSubscriptionDetails= async(req,res,next)=>{
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            const error=new Error("Subscription not found");
            error.status=404;
            throw error;
        }
        res.status(200).json({success:true,data:subscription});
    }catch(e){
        next(e);
    }
};
