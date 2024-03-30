
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'jagadeeshasapu31@gmail.com',
        pass: 'qieb czmw zsec wfzc',
    },
});

// const generateOTP = () => {
//     // Generate a random 6-digit OTP
//     return Math.floor(100000 + Math.random() * 900000);
// };

const sendVerificationEmail = async (email, otp) => {
    const mailOptions = {
        from: 'jagadeeshasapu31@gmail.com',
        to: email,
        subject: 'Your One Time Password (OTP)',
        text: `please verify E-mail with OTP . Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    return otp; // Return the generated OTP
};
module.exports = {
    sendVerificationEmail,
};