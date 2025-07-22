const InterviewSession = require("../models/InterviewSession");
const { startChat, getQuestions, getFeedback } = require("../gemini/Gemini");

exports.startInterviewSession = async (req, res) => {
    try {
        const { role, experience, stack } = req.body;
        const userId = req.user.id;

        await startChat();
        const questions = await getQuestions();

        const interviewSession = await InterviewSession.create({ user: userId, role, experience, stack, questions, answers: [], startedAt: new Date() });
        
        res.status(201).json({ sessionId: interviewSession._id, questions });

    }
    catch(error) {
        res.status(500).json({ message: "Session couldn't be started. Server error." });
    }
}

exports.saveAnswer = async (req, res) => {
    try{
        const { sessionId, answer } = req.body;
        const interviewSession = await InterviewSession.findById(sessionId);
        if(!interviewSession) return res.status(404).json({ message: "Session not found" });
        interviewSession.answers.push(answer);
        await interviewSession.save();
        res.json({ message: "Answer saved" })
    }
    catch(error) {
        res.status(500).json({ message: "Answer can't be saved" });
    }
}

exports.endInterview = async (req, res) => {
    try{
        const { sessionId, answers } = req.body;
        const interviewSession = await InterviewSession.findById(sessionId);
        if(!interviewSession || interviewSession.user !== req.user.id) return res.status(404).json({ message: "Session not found" });

        const feedback = await getFeedback(interviewSession.questions, answers);

        interviewSession.answers = answers;
        interviewSession.feedback = feedback;
        interviewSession.endedAt = new Date();
        await interviewSession.save();
        res.json({ message: "Session ended", feedback });
    }
    catch(error) {
        res.status(500).json({ message: "Couldn't end interview session." });
    }
}