const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Users = require("../models/Users");

// @route POST /users
// @desc Register user
// @access Public
router.post(
  "/",
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await Users.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new Users({
        firstName,
        lastName,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT /users/addFriend
// @desc Register user
// @access Public
router.put(
  "/addFriend",
  [
    auth,
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Provide an email").isEmail(),
    check("sinceWhen", "Provide the date this friendship started")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      sinceWhen,
      lastLightYouSent = "",
    } = req.body;

    try {
      const user = await Users.findOne({ _id: req.user.id });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "No matching user" }] });
      }

      const friend = user.friends.find(
        ({ email: friendEmail = "" }) => email === friendEmail
      );
      if (friend) {
        return res
          .status(400)
          .json({ errors: [{ msg: "This Friend is already on the list" }] });
      }

      user.friends.push({
        firstName,
        lastName,
        email,
        sinceWhen,
        lastLightYouSent,
      });

      await user.save();
      res.send(user);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
