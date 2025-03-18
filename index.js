// index.js

require('dotenv').config(); // dotenv প্যাকেজ ব্যবহার করছি

const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// JSON রিকোয়েস্ট পাঠানোর জন্য
app.use(express.json());

// environment variable থেকে API key নিন
const apiKey = process.env.BREVO_API_KEY;

function sendDataToBrevo(fullName, email, whatsappNumber) {
  const data = {
    email: email,
    attributes: {
      FIRSTNAME: fullName,
      PHONE: whatsappNumber
    }
  };

  fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey   // এখানে API Key ব্যবহার হচ্ছে
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));
}

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'new ld page')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'new ld page', 'index.html'));
});

// Contact form submission route
app.post('/submit', (req, res) => {
  const { fullName, email, whatsappNumber } = req.body;

  if (!fullName || !email || !whatsappNumber) {
    return res.status(400).send('All fields are required!');
  }

  // Send data to Brevo
  sendDataToBrevo(fullName, email, whatsappNumber);

  res.send('Thank you for submitting your information!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
