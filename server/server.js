const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'https://com-clients.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
})); // Enable CORS for all routes
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services or SMTP servers
  auth: {
    user: 'kallurbhavesh@gmail.com', // Replace with your company email
    pass: 'ydcq vezf joic tmzf' // Replace with your app password (for Gmail, you'll need to create an app password)
  },
  // This allows the 'from' address to be different from the auth user
  // However, the email will still show "via your-email@gmail.com" for transparency
  name: 'company-website'
});

// Health check route
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});

// Contact form submission route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, projectDescription, budget } = req.body;
    
    // Validate required fields
    if (!name || !email || !projectDescription) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide name, email, and project description' 
      });
    }
    
    // Configure email content - email comes FROM user TO company
    const mailOptions = {
      from: `"${name}" <${email}>`, // Make it appear to come from the user
      to: 'kallurbhavesh@gmail.com', // Your company email as recipient
      replyTo: email, // When you reply, it goes to the user
      subject: `New Project Inquiry from ${name}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
        <h3>Project Description:</h3>
        <p>${projectDescription}</p>
      `
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Send success response
    res.status(200).json({
      success: true,
      message: 'Your inquiry has been sent successfully!'
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});