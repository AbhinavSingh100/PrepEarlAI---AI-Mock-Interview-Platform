const express = require("express");
const router = express.Router();
const { updateProfile, getUserHistory } = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

router.put("/profile", authenticate, updateProfile);
router.put("/profile/history", authenticate, getUserHistory);

module.exports = router;