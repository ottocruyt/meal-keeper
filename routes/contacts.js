const express = require("express");
const router = express.Router();

// @route					GET api/contacts
// @desc					Get all contacts from logged in user
// @access				Private
router.get("/", (req, res) => {
  res.send("get all user contacts");
});

// @route					POST api/contacts
// @desc					add a new contact
// @access				Private
router.post("/", (req, res) => {
  res.send("add new user");
});

// @route					PUT api/contacts/:id
// @desc					update contact
// @access				Private
router.put("/:id", (req, res) => {
  res.send("update contact with id");
});

// @route					DELETE api/contacts/:id
// @desc					delete contact
// @access				Private
router.delete("/:id", (req, res) => {
  res.send("delete contact with id");
});

module.exports = router;
