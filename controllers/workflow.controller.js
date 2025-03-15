// //here we are writing the function for sending remainders

// import dayjs from 'dayjs'
// import {createRequire} from 'module';

// const require =createRequire(import.meta.url);
// const{serve}=require('@upstash/workflow/express');

// import Subscription from '../models/subscription.model.js';

// const REMAINDERS=[7,5,2,1]
// export const sendRemainders=serve(async(context)=>{

//     const {subscriptionId}=context.requestPayload;
//   const subscription= await fetchSubscription(context,subscriptionId);

//   if(!subscription || subscription.status != 'active')return;
    
//   const renewalDate=dayjs(subscription.renewalDate);
//   if(renewalDate.isBefore (dayjs())){
//     console.log(`Renewal date has passed for sunscription ${subscriptionId}.Stopping workflow.`)
//     return;
//   }


// for (const daysBefore of REMAINDERS){
//     const remainderDate=renewalDate.subtract(daysBefore,"days");
//     //renewal date =22 feb,remainder date=15 feb,current date=16 feb,17 20,21
//     if(remainderDate.isAfter(dayjs())){
//       await sleepUntilRemainder(context,`Remainder ${daysBefore} days before`, remainderDate)
//     }
//     await triggerRemainder(context,`Remainder ${daysBefore} days before`);
// }

//   });

// const fetchSubscription=async (context,subscriptionId)=>{
//     return await context.run('get subscription', async ()=>{
//         return Subscription.findById(subscriptionId).populate('user','name email');
//     })
// }


// const sleepUntilRemainder=async (context,label,date)=>{
//     console.log(`Sleeping unitl ${label} remainder at ${date}`);
//     await context.sleepingUnitl(label,date.toDate());
// }



// const triggerRemainder =async (context,label)=>{
//     return await context.run(label,()=>{
//         console.log(`Triggering  ${label} remainder`);

//         //send email,sms,push notifications ...
//     })
// }


// import dayjs from 'dayjs';
// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);
// const { serve } = require('@upstash/workflow/express');

// import Subscription from '../models/subscription.model.js';
// import {sendRemainderEmail} from '../utils/send-email.js';
// const REMINDERS = [7, 5, 2, 1];

// export const sendRemainders = serve(async (context) => {
//     const { subscriptionId } = context.requestPayload;
//     const subscription = await fetchSubscription(context, subscriptionId);

//     if (!subscription || subscription.status !== 'active') return;

//     const renewalDate = dayjs(subscription.renewalDate);
//     if (renewalDate.isBefore(dayjs())) {
//         console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
//         return;
//     }

//     for (const daysBefore of REMINDERS) {
//         const reminderDate = renewalDate.subtract(daysBefore, 'days');
//         if (reminderDate.isAfter(dayjs())) {
//             await sleepUntilRemainder(context, `Reminder ${daysBefore} days before`, reminderDate);
//         }

//         if(dayjs().isSame(remainderDate,'day')){
//             await triggerRemainder(context,`${daysBefore} days before remainder`,subscripiton);
//         }
       
//     }
// });

// const fetchSubscription = async (context, subscriptionId) => {
//     return await context.run('get subscription', async () => {
//         return Subscription.findById(subscriptionId).populate('user', 'name email');
//     });
// };

// const sleepUntilReminder = async (context, label, date) => {
//     console.log(`Sleeping until ${label} reminder at ${date}`);
//     await context.sleepUntil(label, date.toDate());
// };

// const triggerReminder = async (context, label) => {
//     return await context.run(label, async () => {
//         console.log(`Triggering ${label} reminder`);
//         // Send email, SMS, push notifications, etc.

//     await sendReminderEmail({
//         to:subscription.user.email,
//         type:Remainder.label.subscription
//     })
//     });
// };





// import dayjs from 'dayjs';
// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);
// const { serve } = require('@upstash/workflow/express');

// import Subscription from '../models/subscription.model.js';
// import { sendReminderEmail } from '../utils/send-email.js';

// const REMINDERS = [7, 5, 2, 1];

// export const sendReminders = serve(async (context) => {
//     const { subscriptionId } = context.requestPayload;
//     const subscription = await fetchSubscription(context, subscriptionId);

//     if (!subscription || subscription.status !== 'active') return;

//     const renewalDate = dayjs(subscription.renewalDate);
//     if (renewalDate.isBefore(dayjs())) {
//         console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
//         return;
//     }

//     for (const daysBefore of REMINDERS) {
//         const reminderDate = renewalDate.subtract(daysBefore, 'days');
//         if (reminderDate.isAfter(dayjs())) {
//             await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
//         }

//         if (dayjs().isSame(reminderDate, 'day')) {
//             await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
//         }
//     }
// });

// const fetchSubscription = async (context, subscriptionId) => {
//     return await context.run('get subscription', async () => {
//         return Subscription.findById(subscriptionId).populate('user', 'name email');
//     });
// };

// const sleepUntilReminder = async (context, label, date) => {
//     console.log(`Sleeping until ${label} reminder at ${date}`);
//     await context.sleepUntil(label, date.toDate());
// };

// const triggerReminder = async (context, label, subscription) => {
//     return await context.run(label, async () => {
//         console.log(`Triggering ${label} reminder`);
//         await sendReminderEmail({
//             to: subscription.user.email,
//             type: label,
//         });
//     });
// };





import dayjs from 'dayjs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js'

const REMINDERS = [7, 5, 2, 1]

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  console.log("Workflow started for subscription ID:", subscriptionId); 
  const subscription = await fetchSubscription(context, subscriptionId);
  console.log("Fetched subscription:", subscription);
  if(!subscription || subscription.status !== 'active') return;

  const renewalDate = dayjs(subscription.renewalDate);

  if(renewalDate.isBefore(dayjs())) {
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
    return;
  }

  for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');

    if(reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
    }

    if (dayjs().isSame(reminderDate, 'day')) {
        console.log(`Triggering ${daysBefore} days before reminder`);
      await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
    }
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run('get subscription', async () => {
    return Subscription.findById(subscriptionId).populate('user', 'name email');
  })
}

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);

    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    })
  })
}
