const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validators/authValidator');

//  Helper: Create JWT and set httpOnly cookie
const sendTokenCookie = (res, userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public

const registerUser = async (req, res) => {
  try {
    // 1. Zod validation
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { name, email, password, phone, language, currency } = result.data;

    // 2. Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // 3. Create user
    const user = await User.create({
      name, email, password, phone, language, currency,
    });

    // 4. Set cookie
    sendTokenCookie(res, user._id);

    // 5. Response
    res.status(201).json({
      message: 'Registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        language: user.language,
        currency: user.currency,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

const loginUser = async (req, res) => {
  try {
    // 1. Zod validation
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
    }

    const { email, password } = result.data;

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 4. Set cookie
    sendTokenCookie(res, user._id);

    // 5. Response
    res.status(200).json({
      message: 'Logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        language: user.language,
        currency: user.currency,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private

const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = (req, res) => {
  // user already attached by protect middleware
  res.status(200).json({ user: req.user });
};

module.exports = { registerUser, loginUser, logoutUser, getMe };