import React, { useEffect, useState } from 'react'
import WebCam from '../components/Webcam.jsx'
import useSpeechToText from 'react-hook-speech-to-text'
import '../styles/InterviewWindow.css'
import image from '../assets/interviewer.png'



const InterviewWindow = () => {

  const [showPopup, setShowPopup] = useState(true);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [questions, setQuestions] = useState([])
  const [isAnsReceived, setIsAnsReceived] = useState(true);
  const [chat, setChat] = useState(null);
  const [quesNo, setQuesNo] = useState(1);

  

  // Speech to text conversion hook
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  useEffect(() => {
    if(results.length > 0){
      //const transcript = results.map((result) => result.transcript).join('');
      const transcript = results[results.length - 1].transcript;
      console.log(transcript)
    }
    
   
  }, [results])
  
  useEffect(() => {
    console.log("chat started");
    gemini();
  }, [])
  useEffect(() => {
    if(interviewStarted) {
      dictateCurrentQuestion(quesNo);
    }
  },[questions, interviewStarted])

  const gemini = async function() {
    let ques = [];
    if(sessionStorage.getItem("questions") !== null) 
      ques = JSON.parse(sessionStorage.getItem("questions"));
    else {
      const localChat = await startChat()
      setChat(localChat)
      ques = await getQuestions(localChat, {jobRole: "Software Engineer", yearsOfExp: 2, techStack: "Java", description: "Focus on questions that reveal the candidate's thought process."});
    }

    sessionStorage.setItem("questions", JSON.stringify(ques));
    let i=1;
    ques.forEach((question) => {
      console.log(`${i} `+ question.question);
      i++;
    });
    setQuestions(ques);
  }

  const dictateCurrentQuestion = (quesNo) => {
    if(questions.length > 0){ 
      const utterance = new SpeechSynthesisUtterance(questions[quesNo-1].question);
      speechSynthesis.speak(utterance);
    }
    
  }

  const micBtnHandler = () => {
    console.log(isRecording);
    if (isRecording) {
      stopSpeechToText();
      setIsAnsReceived(false);
      if(results.length > 0) console.log(results[results.length - 1].transcript);
    } else {
      startSpeechToText();
    }
  }
  const acceptedBtnHandler = async () => {
    setIsAnsReceived(true);
    const ans = (results.length > 0) ? results.map((result) => result.transcript).join(''): '';
    if(ans === ''){
      alert("Answer cannot be empty");
    }
    else{
      const response = await sendAnswer(chat, questions[quesNo-1].question, ans);
      console.log(response);
      dictateCurrentQuestion(quesNo + 1);
      setQuesNo((quesNo) => quesNo + 1);
      
    }
    results.length = 0;
  }

  const rejectedBtnHandler = () => {
    setIsAnsReceived(true);
    results.length = 0;
  }


  return (
    <>
    { showPopup && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white text-black p-6 rounded shadow-md text-center">
      <h2 className="text-xl font-bold mb-4">Start Interview?</h2>
      <p className="mb-4">Click below to begin your interview.</p>
      <button
        onClick={() => {
          setShowPopup(false);
          setInterviewStarted(true);
          dictateCurrentQuestion(1);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Start
      </button>
        </div>
      </div>
    )}
    
    <div className="w-screen h-screen bg-gray-900 text-white p-4 flex flex-col">

      {/* Top Bar */}
      <div className="w-full flex justify-between items-center bg-gray-800 p-2 rounded-t-md">
        <div className="text-lg font-semibold">INTERVIEW WINDOW</div>
        <div className="text-white">👤</div>
      </div>

      {/* Main Body */}
      <div className="w-full h-[80%] flex flex-1 mt-2">
        {/* Bot Video Section */}
        <div className="flex-1 bg-white text-black rounded-md border-2 relative">
          <img src={image} alt="bot" className="w-full h-full object-cover border-2"></img>
          <div className="absolute top-2 left-2">BOT</div>
          

          {/* Your Video */}
          <div className="absolute right-2 bottom-2 h-[45%] w-[35%] shadow-2xl border-2 border-black bg-white text-black mt-4 p-2 rounded flex-1 flex items-center justify-center">
            <WebCam/>
          </div>

          <div className="absolute right-[45%] bottom-2">
            {!isRecording && !isAnsReceived && (<button onClick={acceptedBtnHandler} className="bg-emerald-200 p-3 mr-1 rounded-full">✅</button>)}
            {!isRecording && !isAnsReceived && (<button onClick={rejectedBtnHandler} className="bg-red-200 p-3 rounded-full">❌</button>)}
          </div>

          <div className="absolute bottom-2 left-2 font-mono text-lg font-bold text-emerald-600">Answer question no.{quesNo} ...</div>
        </div>

        {/* Sidebar */}
        <div className="w-1/4 h-full flex flex-col ml-4">
          {/* Questions List */}
          <div className="questions h-full bg-gray-800 p-2 rounded text-white">
            <div className="mb-2 font-semibold">QUESTIONS</div>
            <ul className="text-sm pl-2 space-y-1">
              {questions.map((q) => (
                <li className='p-1 hover:bg-gray-700'><b>Q.{questions.indexOf(q)+1} </b>{q.question}</li>
              ))}
              
              
            </ul>
          </div>

          
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex justify-center mt-4 space-x-6">
        <button className="bg-red-600 p-3 rounded-full">⏏</button>
        <button className="bg-yellow-500 p-3 rounded-full">🔇</button>
        <button className={isRecording? `bg-red-500 p-3 rounded-full` : `bg-green-500 p-3 rounded-full`}
          onClick={micBtnHandler}>
            {isRecording ? "⏹️" : "🎙️"}
        </button>
        
        
        <button className="bg-blue-500 p-3 rounded-full">⏸️</button>
        <button className="bg-purple-500 p-3 rounded-full" onClick={gemini}>💬</button>
      </div>
    </div>

    </>
  )
}

export default InterviewWindow