const InterviewSession = require("../models/InterviewSession");
const { startChat, getQuestions, getFeedback } = require("../gemini/Gemini");

exports.startInterviewSession = async (req, res) => {
    try {
        console.log(req.body);
        const { role, experience, stack } = req.body;
        const userId = req.user.id;

        await startChat();
        const questions = await getQuestions({ jobRole: role, yearsOfExp: experience, techStack: stack, description: "Focus on questions that reveal the candidate's thought process." });
        console.log(questions);
        const questionTexts = questions.map(q => q.question);

        const interviewSession = await InterviewSession.create({
            user: userId,
            role,
            experience,
            stack,
            questions: questionTexts, // Use the new array of strings
            answers: [],
            startedAt: new Date()
        });
        
        // Return the original array of objects to the frontend
        res.status(201).json({ sessionId: interviewSession._id, questions: questionTexts });
    }
    catch(error) {
        console.log("error aa gaya", error);
        res.status(500).json({ message: "Session couldn't be started. Server error." });
    }
}

exports.saveAnswer = async (req, res) => {
  try {
    console.log(req.body);
    const { sessionId, questionIndex, answer } = req.body;
    const interviewSession = await InterviewSession.findById(sessionId);
    if (!interviewSession) return res.status(404).json({ message: "Session not found" });
    interviewSession.answers[questionIndex] = answer;
    await interviewSession.save();
    res.json({ message: "Answer saved" })
  } catch (error) {
    res.status(500).json({ message: "Answer can't be saved" });
  }
}

exports.endInterview = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const interviewSession = await InterviewSession.findById(sessionId);

        // Check if session exists first
        if (!interviewSession) {
            return res.status(404).json({ message: "Session not found" });
        }

        // ✅ FIX: Convert ObjectId to string for comparison
        if (interviewSession.user.toString() !== req.user.id) {
            // Use 403 Forbidden, as the session exists but the user is not authorized
            return res.status(403).json({ message: "Forbidden: You do not have permission to end this session." });
        }

        const feedback = await getFeedback(interviewSession.questions, interviewSession.answers);

        interviewSession.feedback = feedback;
        interviewSession.endedAt = new Date();
        await interviewSession.save();

        res.json({ message: "Session ended", feedback });
    }
    catch (error) {
        // It's good practice to log the actual error on the server
        console.error("Error ending interview session:", error);
        res.status(500).json({ message: "Couldn't end interview session." });
    }
}