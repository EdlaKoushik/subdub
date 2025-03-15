// import { emailTemplates } from './email-template.js'
// import dayjs from 'dayjs'
// import transporter, { accountEmail } from '../config/nodemailer.js'

// export const sendReminderEmail = async ({ to, type, subscription }) => {
//   if(!to || !type) throw new Error('Missing required parameters');

//   const template = emailTemplates.find((t) => t.label === type);

//   if(!template) throw new Error('Invalid email type');

//   const mailInfo = {
//     userName: subscription.user.name,
//     subscriptionName: subscription.name,
//     renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
//     planName: subscription.name,
//     price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
//     paymentMethod: subscription.paymentMethod,
//   }

//   const message = template.generateBody(mailInfo);
//   const subject = template.generateSubject(mailInfo);

//   const mailOptions = {
//     from: accountEmail,
//     to: to,
//     subject: subject,
//     html: message,
//   }

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//       throw new Error('Failed to send email');
//   }
      
//       // return console.log(error, 'Error sending email');

//     console.log('Email sent: ' + info.response);
//   })
// }



import { emailTemplates } from './email-template.js'
import dayjs from 'dayjs'
import transporter, { accountEmail } from '../config/nodemailer.js'

export const sendReminderEmail = async ({ to, type, subscription }) => {
  if(!to || !type) throw new Error('Missing required parameters');
   
  console.log('📩 Sending Email: Preparing to send email to', to);

  const template = emailTemplates.find((t) => t.label === type);

  if(!template) throw new Error('Invalid email type');

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
  }

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  }
  console.log('📤 Sending email with subject:');
  console.log("Sending email with options:", mailOptions);
  transporter.sendMail(mailOptions, (error, info) => {
    if(error)  return console.log(error, 'Error sending email');
    console.log('Email sent:', info.response); // Add this line
    
       console.log('✅ Email sent successfully:', info.response);
  });
};
