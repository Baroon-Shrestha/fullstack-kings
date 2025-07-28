const express = require("express");
const {
  adminLogin,
  adminMe,
  signOut,
} = require("../Controllers/authController");
const router = express.Router();

router.post("/login", adminLogin);
router.get("/me", adminMe);
router.post("/logout", signOut);

module.exports = router;
