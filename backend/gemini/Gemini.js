const { GoogleGenAI } = require("@google/genai");

require('dotenv').config();

let chat = null;

exports.startChat = async () => {
    try {
        if(chat !== null) return; 
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});
        chat = ai.chats.create({
        model: "gemini-2.0-flash",
        history: [
            {
            role: "user",
            parts: [{ text: "Hello" }],
            },
            {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
        ],
        });
    }
    catch(err) {
        console.log(err);
    }
}


exports.getQuestions = async ({jobRole, yearsOfExp, techStack, description}) => {

    const response = await chat.sendMessage({ message: `Generate a comprehensive set of interview questions tailored for the role of ${jobRole}.
The ideal candidate should have approximately ${yearsOfExp} years of experience and possess strong proficiency in the following technical stack: ${techStack}.
In addition to technical skills, please incorporate these instructions from the interviewee: ${description}.
The questions should cover a range of difficulty levels, from foundational concepts to more advanced scenarios.
Ensure the questions are designed to evaluate not only the candidate's knowledge but also their ability to apply that knowledge in practical situations.
Keep in mind that this is a verbal interview so keep the question length limited.

Also take care of these additional points:

"Include at least one coding challenge (if applicable to the role)."
"Focus on questions that reveal the candidate's thought process."
"Provide a mix of open-ended and specific questions."

Generate at max 4 questions.

Produce JSON matching this specification:

Question = {"question": string }
Return: array<Question>` });
    const questions = JSON.parse(response.text.replace("```json", "").replace("```", ""));
    return questions;
}

exports.getFeedback = async (questions, answers) => {
    let qa = '';
    for(let i=0;i<questions.length;i++){
        qa += `Question: `+ questions[i] + ` Answer:` + answers[i] + `\n`;
    }
    const prompt = `Give me feedback of the interviewee on the basis of the answers given to your questions and the job role, experience and stack. The answers are as follows
    \n\n ${qa}`;

    const response = await chat.sendMessage({ message: prompt });
    return response.text;

}
