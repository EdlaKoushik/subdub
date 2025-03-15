import transporter, { accountEmail } from './config/nodemailer.js';

const mailOptions = {
    from: accountEmail,
    to: 'koushikedla01@gmail.com', // Replace with your email
    subject: 'Test Email',
    text: 'This is a test email from Nodemailer.',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});