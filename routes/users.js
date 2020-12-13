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
      "Please enter a password with 3 or more characters"
    ).isLength({ min: 3 }),
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
      console.error(`Server error - ${message}`);
      res.status(500).send(message);
    }
  }
);

// @route GET /users/getFriendsList
// @desc Get friends list
// @access Private
router.get("/getFriendsList", auth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await Users.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "No matching user" }] });
    }
    res.send(user.friends);
  } catch ({ message = "" }) {
    console.error(message);
    res.status(500).send(`Server error - ${message}`);
  }
});

// @route PUT /users/addFriend
// @desc Add friends
// @access Private
router.put(
  "/addFriend",
  [
    auth,
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

    const { email, sinceWhen } = req.body;

    try {
      const user = await Users.findOne({ _id: req.user.id });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "No matching user" }] });
      } else if (user.email === email) {
        return res
          .status(400)
          .json({ errors: [{ msg: "You cannot add yourself as a friend" }] });
      }

      const friendAlreadyOnTheList = user.friends.some(
        ({ email: friendEmail = "" }) => email === friendEmail
      );
      if (friendAlreadyOnTheList) {
        return res
          .status(400)
          .json({ errors: [{ msg: "This Friend is already on the list" }] });
      }

      const friend = await Users.findOne({ email });
      if (!friend) {
        return res
          .status(400)
          .json({ errors: [{ msg: "There is no matching user" }] });
      }

      user.friends.push({
        firstName: friend.firstName,
        lastName: friend.lastName,
        email,
        sinceWhen,
      });

      await user.save();
      res.send(user.friends);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send(`Server error - ${message}`);
    }
  }
);

// @route DELETE /users/deleteFriend/:email
// @desc Delete friends
// @access Private
router.delete("/deleteFriend/:email", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

  try {
    const user = await Users.findOne({ _id: req.user.id });
    if (!user) res.status(400).json({ errors: [{ msg: "No matching user" }] });

    const removeIndex = user.friends
      .map(({ email }) => email)
      .indexOf(req.params.email);
    user.friends.splice(removeIndex, 1);

    await user.save();
    res.send(user.friends);
  } catch ({ message = "" }) {
    console.error(message);
    res.status(500).send(`Server error - ${message}`);
  }
});

// @route PUT /users/addLight
// @desc Add light
// @access Private
router.put(
  "/addLight",
  [
    auth,
    check("light", "Select a light to send to the person :)").not().isEmpty(),
    check("personToReceiveLight", "Select a receiver to send the light :)")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { light, personToReceiveLight, message, removeLightAt } = req.body;

    try {
      const sender = await Users.findOne({ _id: req.user.id });
      if (sender.email === personToReceiveLight) {
        res.status(400).json({
          errors: [
            {
              msg: "You cannot send yourself a light :)",
            },
          ],
        });
        return;
      }

      const receiver = await Users.findOne({ email: personToReceiveLight });
      if (!receiver) {
        res.status(400).json({
          errors: [
            {
              msg: "The receiver is not an existing user :)",
            },
          ],
        });
        return;
      }

      const userAlreadyHasLightFromTheSameUser = receiver.lights.some(
        ({ senderEmail }) => senderEmail === sender.email
      );
      if (userAlreadyHasLightFromTheSameUser) {
        res.status(400).json({
          errors: [
            {
              msg: "You can only send a light to the same person once a day :)",
            },
          ],
        });
        return;
      }

      receiver.lights.unshift({
        sender: `${sender.firstName} ${sender.lastName}`,
        senderEmail: sender.email,
        light,
        message,
        removeLightAt,
      });

      await receiver.save();
      res.send(receiver.lights);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
