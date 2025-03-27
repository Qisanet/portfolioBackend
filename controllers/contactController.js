const Message = require('../models/contact'); // Use the correct model

// Handle POST request to /contact
const sendmessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Create a new contact message
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save(); // Save the contact message to the database

    console.log('Received contact form submission:', { name, email, subject, message });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ message: 'Error saving message.' });
  }
};

// Handle GET request to /contact
const getmessage = async (req, res) => {
  try {
      const messages = await Message.find(); // Use the correct model (Message)
      res.json(messages);
  } catch (err) {
      console.error('Error fetching messages:', err);
      res.status(500).json({ message: 'Error fetching messages', error: err });
  }
};

module.exports = { sendmessage, getmessage };
