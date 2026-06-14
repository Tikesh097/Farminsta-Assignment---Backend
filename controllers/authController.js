const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Generate Access Token
    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m"
      }
    );

    // Generate Refresh Token
    const refreshToken = jwt.sign(
      {
        id: user._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // Save Refresh Token in DB
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.refreshToken = async (
  req,
  res
) => {
  try {
    const { refreshToken } =
      req.body;

    if (!refreshToken) {
      return res.status(401).json({
        message:
          "Refresh token required",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env
        .REFRESH_TOKEN_SECRET
    );

    const user =
      await User.findById(
        decoded.id
      );

    if (
      !user ||
      user.refreshToken !==
        refreshToken
    ) {
      return res.status(403).json({
        message:
          "Invalid refresh token",
      });
    }

    const newAccessToken =
      jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env
          .ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );

    res.status(200).json({
      accessToken:
        newAccessToken,
    });
  } catch (error) {
    res.status(401).json({
      message:
        "Refresh token expired",
    });
  }
};

exports.logout = async (
  req,
  res
) => {
  try {
    const { refreshToken } =
      req.body;

    const user =
      await User.findOne({
        refreshToken,
      });

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    res.status(200).json({
      message:
        "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};