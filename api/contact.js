const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER, // set in Vercel dashboard
      pass: process.env.MAIL_PASS, // set in Vercel dashboard
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.MAIL_USER,
      subject: `Portfolio Contact from ${name}`,
      text: message,
      replyTo: email,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}