const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Configure your email transport (use your real credentials)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'psreyas09@gmail.com',      // replace with your email
      pass: 'ehzl cihr catb xlhm',         // use an app password, not your real password
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'psreyas09@gmail.com',        // your email to receive messages
      subject: `Portfolio Contact from ${name}`,
      text: message,
      replyTo: email,
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));