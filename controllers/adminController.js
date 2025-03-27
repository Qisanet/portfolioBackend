

// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   // Validate input
//   if (!email || !password) {
//     return res.status(400).json({ message: 'email and password are required.' });
//   }

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     }

//     // Check if password is correct
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     }

//     // Generate JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Return token
//     res.json({ token });
//   } catch (err) {
//     console.error('Error during login:', err);

//     // Return a generic error message
//     res.status(500).json({ message: 'Something went wrong on the server.' });
//   }
// };


// module.exports = { loginAdmin };

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // 🔹 Compare input with environment variables
  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  // 🔹 Generate JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ message: "Login successful", token });
};

module.exports = { loginAdmin };
