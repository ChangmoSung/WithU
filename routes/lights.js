const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Users = require("../models/Users");

// @route PUT /light
// @desc Send light
// @access Private
router.put(
  "/",
  [
    auth,
    check("light", "Select a light to send to the person :)").not().isEmpty(),
    check("person", "Select a person to send the light :)").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { light, person, message = "", removeLightAt = "" } = req.body;

    try {
      const user = await Users.findOne({ _id: req.user.id });
      user.lights.unshift({ light, from: person, message, removeLightAt });

      await user.save();
      res.send(user);
    } catch ({ message = "" }) {
      console.error(message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
