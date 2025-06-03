require('dotenv').config();
const nodemailer = require('nodemailer');

async function testSend() {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: '"Test" <snehamolkaniyeri@gmail.com.com>',
      to: 'snehamolkaniyery@gmail.com', // Replace with your real email to test
      subject: 'Test email',
      text: 'This is a test',
    });

    console.log('Message sent:', info.messageId);
  } catch (err) {
    console.error('Error:', err);
  }
}

testSend();
