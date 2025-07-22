const express = require("express");
const router = express.Router();
const { startInterviewSession, saveAnswer, endInterview } = require("../controllers/interviewSessionController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/start", authenticate, startInterviewSession);
router.post("/answer", authenticate, saveAnswer);
router.post("/end", authenticate, endInterview);

module.exports = router;
