const nodemailer = require('nodemailer');

console.log('Loading mail credentials:', {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS ? '***' : null,
});

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,  
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: '"ShopeBox" <snehamolkaniyeri@gmail.com>',
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Email sending error:", err);
    throw err;
  }
};

module.exports = sendEmail;
