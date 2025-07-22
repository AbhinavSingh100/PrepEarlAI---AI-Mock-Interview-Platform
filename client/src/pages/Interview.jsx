import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  ArrowLeft, 
  Clock,
  Brain,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import Button from '../components/Button';
import WebCam from '../components/Webcam';
import image from '../assets/interviewer.png'
import useSpeechToText from 'react-hook-speech-to-text';
import API from '../services/api.js';

const Interview = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const interviewType = searchParams.get('type') || 'general';
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);
  //const [showSaveAnswerPopup, setShowSaveAnswerPopup] = useState(false);
  //const [isDictating, setIsDictating] = useState(false);
  // use "speechSynthesis.speaking" for "isDictating"
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [setupCompleted, setSetupCompleted] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [tempAnswer, setTempAnswer] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [setupData, setSetupData] = useState({
    role: '',
    experience: '',
    stack: []
  });

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

  const questions = {
    technical: [
      "Tell me about your experience with React and modern JavaScript frameworks.",
      "How would you optimize a slow-performing web application?",
      "Explain the concept of closure in JavaScript with an example.",
      "Design a system to handle 1 million concurrent users.",
      "What's the difference between SQL and NoSQL databases?"
    ],
    behavioral: [
      "Tell me about a time when you had to work with a difficult team member.",
      "Describe a situation where you had to learn something new quickly.",
      "How do you handle stress and pressure in the workplace?",
      "Tell me about a project you're particularly proud of.",
      "Describe a time when you had to make a difficult decision."
    ],
    general: [
      "Tell me about yourself and your background.",
      "What interests you about this position?",
      "What are your greatest strengths and weaknesses?",
      "Where do you see yourself in 5 years?",
      "Why should we hire you?"
    ]
  };

  const techStacks = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'TypeScript',
    'Angular', 'Vue.js', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'MongoDB', 'PostgreSQL', 'MySQL'
  ];

  const experienceLevels = [
    '0-1 years (Entry Level)',
    '2-3 years (Junior)',
    '4-6 years (Mid-Level)',
    '7-10 years (Senior)',
    '10+ years (Lead/Principal)'
  ];

  const currentQuestions = questions.technical;

  useEffect(() => {
    let interval;
    if (interviewStarted && !interviewCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);

      // first ques dictate kro 
      dictateCurrentQuestion(currentQuestionIndex);
      console.log(currentQuestionIndex)
    }
    return () => clearInterval(interval);
  }, [interviewStarted, interviewCompleted]);

  useEffect(() => {
    if(interviewStarted && !interviewCompleted) {
      dictateCurrentQuestion(currentQuestionIndex);
    }
  }, [currentQuestionIndex]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if(interviewStarted && !interviewCompleted) {
      setTempAnswer((results.length > 0) ? results.map((result) => result.transcript).join(''): '');      
    }
  }, [results]);

  useEffect(() => {
    if(interviewStarted && !interviewCompleted) {
      console.log(`Answer of Q${currentQuestionIndex + 1}.: ${currentAnswer}`);
    }
  }, [currentAnswer]);

  const dictateCurrentQuestion = (quesIndex) => {
    if(currentQuestions.length > 0){ 
      const utterance = new SpeechSynthesisUtterance(currentQuestions[quesIndex]);
      console.log(currentQuestions[quesIndex]);
      speechSynthesis.speak(utterance);
    } 
  }

    const handleSetupSubmit = (e) => {
    e.preventDefault();
    setSetupCompleted(true);
  };

  const handleSetupChange = (field, value) => {
    setSetupData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStackToggle = (tech) => {
    setSetupData(prev => ({
      ...prev,
      stack: prev.stack.includes(tech)
        ? prev.stack.filter(item => item !== tech)
        : [...prev.stack, tech]
    }));
  };

  const handleStartInterview = () => {
    setInterviewStarted(true);
  };

  const handleMicOn = () => {
    if(!speechSynthesis.speaking){

      if(isMicOn){
        stopSpeechToText();
        //setShowSaveAnswerPopup(true);
      }
      else if(!isMicOn) {
        startSpeechToText()
        //setShowSaveAnswerPopup(false);
      }
      setIsMicOn(!isMicOn);
    }
  }

  // const handleAnswerAccepted = () => {
  //   //const ans = (results.length > 0) ? results.map((result) => result.transcript).join(''): '';
  //   //if(ans === ''){
  //   if(tempAnswer === ''){
  //     alert("Answer cannot be empty");
  //   }
  //   else{
  //     setCurrentAnswer(tempAnswer);
  //   }
  //   results.length = 0;
    
  //   setShowSaveAnswerPopup(false);
  // }

  // const handleAnswerRejected = () => {
  //   results.length = 0;
  //   setTempAnswer('');
  //   setShowSaveAnswerPopup(false);
  // }

  const handleNextQuestion = () => {
    
    if (currentQuestionIndex < currentQuestions.length - 1) {
      if(tempAnswer === ''){
        return alert("Answer cannot be empty");
      }
      else{
        setCurrentAnswer(tempAnswer);
      }
      setCurrentQuestionIndex(prev => prev + 1);
      setTempAnswer('');
    } else {
      handleCompleteInterview();
    }
  }; 

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setCurrentAnswer('');
    }
  };

  const handleCompleteInterview = () => {
    setInterviewCompleted(true);
  };

  const handleRetakeInterview = () => {
    setCurrentQuestionIndex(0);
    setTimeElapsed(0);
    setInterviewStarted(false);
    setInterviewCompleted(false);
    setCurrentAnswer('');
  };

  if (interviewCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Interview Completed!</h1>
            <p className="text-gray-600 mb-8">
              Great job! You've completed your {interviewType} interview in {formatTime(timeElapsed)}.
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Assessment</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-gray-600">Clarity</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">78%</div>
                  <div className="text-sm text-gray-600">Confidence</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">92%</div>
                  <div className="text-sm text-gray-600">Relevance</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/dashboard')}>
                View Detailed Analysis
              </Button>
              <Button variant="secondary" onClick={handleRetakeInterview}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Interview
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!setupCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <Brain className="h-12 w-12" />
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">Interview Setup</h1>
              <p className="text-center text-purple-100">
                Help us personalize your interview experience
              </p>
            </div>

            <form onSubmit={handleSetupSubmit} className="p-8 space-y-8">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What role are you interviewing for? *
                </label>
                <input
                  type="text"
                  required
                  value={setupData.role}
                  onChange={(e) => handleSetupChange('role', e.target.value)}
                  placeholder="e.g., Frontend Developer, Product Manager, Data Scientist"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Years of Experience *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {experienceLevels.map((level) => (
                    <label key={level} className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        value={level}
                        checked={setupData.experience === level}
                        onChange={(e) => handleSetupChange('experience', e.target.value)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                        required
                      />
                      <span className="ml-3 text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select your tech stack (choose all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {techStacks.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => handleStackToggle(tech)}
                      className={`p-3 text-sm rounded-lg border transition-all duration-200 ${
                        setupData.stack.includes(tech)
                          ? 'bg-purple-100 border-purple-300 text-purple-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Selected: {setupData.stack.length} technologies
                </p>
              </div>

              {/* Interview Type Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      {interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview
                    </h4>
                    <p className="text-blue-800 text-sm">
                      {interviewType === 'technical' && 'Focus on coding problems, system design, and technical concepts relevant to your stack.'}
                      {interviewType === 'behavioral' && 'Focus on past experiences, leadership, teamwork, and situational questions.'}
                      {interviewType === 'general' && 'Mix of technical and behavioral questions tailored to your role and experience.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button type="submit" size="lg" className="px-12">
                  Continue to Interview Setup
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (!interviewStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <Brain className="h-12 w-12" />
              </div>
              <h1 className="text-3xl font-bold text-center mb-2">
                {interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview
              </h1>
              <p className="text-center text-purple-100">
                Get ready for your AI-powered mock interview session
              </p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">What to Expect</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600">{currentQuestions.length} carefully crafted questions</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600">Real-time AI feedback and analysis</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600">Estimated duration: 30-45 minutes</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="text-gray-600">Detailed performance report</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Setup Check</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Video className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-600">Camera</span>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Mic className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-600">Microphone</span>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Brain className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-600">AI Ready</span>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Interview Tips</h4>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Speak clearly and maintain eye contact with the camera</li>
                      <li>• Take your time to think before answering</li>
                      <li>• Use the STAR method for behavioral questions</li>
                      <li>• Ask clarifying questions if needed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button onClick={handleStartInterview} size="lg">
                  Start Interview
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

 

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-white font-semibold">
                {interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview
              </h1>
              <p className="text-gray-400 text-sm">
                Question {currentQuestionIndex + 1} of {currentQuestions.length}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white">
              <Clock className="h-4 w-4" />
              <span className="font-mono">{formatTime(timeElapsed)}</span>
            </div>
            {interviewStarted && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm">Recording</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen">
        {/* Video Area */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl overflow-hidden h-full flex flex-col">
            <div className="flex-1 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
                <img src={image} alt="bot" className="w-full h-full object-cover border-2 rounded"></img>
                
                <div className="absolute right-2 bottom-2 h-[31%] w-[35%] shadow-2xl border-2 border-black bg-white text-black px-1 rounded-md flex items-center justify-center">
                    <div className="text-center text-gray-400 absolute top-1 left-1.5">YOU</div>
                    {isCameraOn ? (<WebCam className=""/>) : (<div className="text-center text-gray-500">
                  <VideoOff className="h-16 w-16 mx-auto mb-4" />
                  <p>Camera Off</p>
                </div>)}
                </div>
            </div>
            

            {/* Controls */}
            <div className="p-4 bg-gray-900 flex justify-center space-x-4">
              <button
                onClick={handleMicOn}
                className={`p-3 rounded-full transition-colors ${
                  isMicOn 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>
              
              <button
                onClick={() => setIsCameraOn(!isCameraOn)}
                className={`p-3 rounded-full transition-colors ${
                  isCameraOn 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>

              <Button 
                onClick={handleCompleteInterview}
                className="bg-red-600 hover:bg-red-700"
              >
                End Interview
              </Button>
            </div>
          </div>
        </div>

        {/* Question Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Current Question</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {currentQuestions[currentQuestionIndex]}
            </p>

            <div className="space-y-4">
              <textarea
                value={tempAnswer}
                onChange={(e) => setTempAnswer(e.target.value)}
                placeholder="Take notes or outline your answer here..."
                className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />

              <div className="flex space-x-2">
                <Button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  size="sm"
                  className="flex-1"
                >
                  {currentQuestionIndex === currentQuestions.length - 1 ? 'Finish' : 'Next'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Questions</span>
                <span>{currentQuestionIndex + 1} / {currentQuestions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Accept question popup */}
        {/* { !isRecording && showSaveAnswerPopup && (
          <div className='absolute bottom-5 left-[45%] bg-white p-2  rounded-xl '>
            <div>Confirm your answer for Q.{currentQuestionIndex+1} :</div>
            <div className='flex justify-evenly gap-1 p-1 '>
              <CircleCheck
                onClick={handleAnswerAccepted}
                className='h-10 w-10'
                color='green'/>
              <CircleX 
                onClick={handleAnswerRejected}
                className='h-10 w-10'
                color='red'/>
            </div>
          </div>
          
        )
        } */}
      </div>
    </div>
  );
};

export default Interview;