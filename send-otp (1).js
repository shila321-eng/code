// Requires: npm install express twilio cors
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const app = express();
app.use(cors());
app.use(express.json());

// Your Twilio credentials
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const fromPhone = 'YOUR_TWILIO_PHONE_NUMBER';
const client = twilio(accountSid, authToken);

// OTP generator
function generateOTP(length = 6) {
  return Array.from({length}).map(() => Math.floor(Math.random() * 10)).join('');
}

app.post('/api/send-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();
  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: fromPhone,
      to: phone
    });
    res.json({ success: true });
    // You should store the OTP and associate it with the phone/session for validation
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));