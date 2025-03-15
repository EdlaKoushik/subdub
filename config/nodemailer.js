// import nodemailer from 'nodemailer';
// import {EMAIL_PASSWORD} from './env.js'

// export const accountEmail="koushikedla01@gmail.com"
// const transporter=nodemailer.createTransport(

//     {
//         service:'gmail',
//         auth:{
//             user:accountEmail,
//              pass:EMAIL_PASSWORD
//         }
//     }
// )



// export default transporter;

// import nodemailer from 'nodemailer';

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host :'smtp.gmail.com',
//   port:465,
//   secure:true,
//   auth: {
//     user: process.env.ACCOUNT_EMAIL, // Make sure this is set in .env
//     pass: process.env.EMAIL_PASSWORD, // Make sure this is set in .env
//   },
// //   tls: {
// //     rejectUnauthorized: false, // Bypass SSL certificate validation
// // },
// });

// export default transporter;
// export const accountEmail = process.env.ACCOUNT_EMAIL;




// import nodemailer from 'nodemailer';
// import { ACCOUNT_EMAIL, EMAIL_PASSWORD } from './env.js'; // Import from env.js

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // Use SSL
//     auth: {
//         user: ACCOUNT_EMAIL, // Use the environment variable
//         pass: EMAIL_PASSWORD, // Use the environment variable
//     },
// });

// export default transporter;
// export const accountEmail = ACCOUNT_EMAIL; // Export for use elsewhere




import nodemailer from 'nodemailer';
import { ACCOUNT_EMAIL, EMAIL_PASSWORD } from './env.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: ACCOUNT_EMAIL,
        pass: EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // Bypass SSL certificate validation
    },
});

export default transporter;
export const accountEmail = ACCOUNT_EMAIL;


