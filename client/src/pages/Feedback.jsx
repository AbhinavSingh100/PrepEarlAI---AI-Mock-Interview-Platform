import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Target,
  Star,
  Brain,
  Mic,
  Eye,
  MessageSquare,
  BarChart3,
  Download,
  Share2,
  RotateCcw
} from 'lucide-react';
import Button from '../components/Button';
import Navbar from '../components/NavBar';

const Feedback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const interviewType = searchParams.get('type') || 'general';
  const score = searchParams.get('score') || '85';

  const feedbackData = {
    overall: {
      score: parseInt(score),
      duration: '32:45',
      questionsAnswered: 5,
      strengths: ['Clear communication', 'Good examples', 'Confident delivery'],
      improvements: ['More specific details', 'Better structure', 'Faster response time']
    },
    categories: [
      {
        name: 'Communication',
        score: 92,
        feedback: 'Excellent verbal communication skills. You spoke clearly and maintained good pace throughout the interview.',
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      },
      {
        name: 'Technical Knowledge',
        score: 85,
        feedback: 'Strong technical foundation. Consider providing more specific examples and diving deeper into implementation details.',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      },
      {
        name: 'Problem Solving',
        score: 78,
        feedback: 'Good analytical approach. Work on breaking down complex problems into smaller, manageable components.',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
      },
      {
        name: 'Confidence',
        score: 88,
        feedback: 'You demonstrated good confidence levels. Maintain eye contact and avoid filler words for even better presence.',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100'
      }
    ],
    detailedAnalysis: [
      {
        question: 'Tell me about your experience with React and modern JavaScript frameworks.',
        yourAnswer: 'I have been working with React for about 3 years now, building various web applications...',
        score: 85,
        feedback: 'Good overview of your experience. Consider mentioning specific projects and technologies used.',
        suggestions: [
          'Mention specific React features you\'ve used (hooks, context, etc.)',
          'Include metrics or impact of your projects',
          'Discuss challenges you\'ve overcome'
        ]
      },
      {
        question: 'How would you optimize a slow-performing web application?',
        yourAnswer: 'I would start by identifying bottlenecks using performance profiling tools...',
        score: 90,
        feedback: 'Excellent systematic approach to performance optimization. Well-structured answer.',
        suggestions: [
          'Great job mentioning specific tools and techniques',
          'Consider discussing monitoring and measurement strategies'
        ]
      }
    ]
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="secondary" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
          </div>
        </div>

        {/* Overall Score Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center ${getScoreBgColor(feedbackData.overall.score)}`}>
                <span className={`text-3xl font-bold ${getScoreColor(feedbackData.overall.score)}`}>
                  {feedbackData.overall.score}%
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Feedback</h1>
            <p className="text-gray-600">
              {interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} Interview • {feedbackData.overall.duration}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{feedbackData.overall.duration}</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{feedbackData.overall.questionsAnswered}</div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">A-</div>
              <div className="text-sm text-gray-600">Overall Grade</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Category Scores */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Performance Breakdown
              </h2>
              
              <div className="space-y-6">
                {feedbackData.categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <span className={`font-bold ${category.color}`}>{category.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${category.bgColor.replace('bg-', 'bg-').replace('-100', '-500')}`}
                        style={{ width: `${category.score}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">{category.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Question Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Question-by-Question Analysis
              </h2>
              
              <div className="space-y-8">
                {feedbackData.detailedAnalysis.map((item, index) => (
                  <div key={index} className="border-l-4 border-purple-200 pl-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Question {index + 1}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(item.score)} ${getScoreColor(item.score)}`}>
                        {item.score}%
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4 italic">"{item.question}"</p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Your Answer:</h4>
                      <p className="text-gray-600 text-sm">{item.yourAnswer}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">AI Feedback:</h4>
                      <p className="text-gray-600 text-sm">{item.feedback}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Suggestions for Improvement:</h4>
                      <ul className="space-y-1">
                        {item.suggestions.map((suggestion, suggestionIndex) => (
                          <li key={suggestionIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Strengths */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                Key Strengths
              </h3>
              <div className="space-y-3">
                {feedbackData.overall.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                Areas for Improvement
              </h3>
              <div className="space-y-3">
                {feedbackData.overall.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Recommended Next Steps
              </h3>
              <div className="space-y-4">
                <div className="text-sm text-gray-700">
                  <p className="mb-3">Based on your performance, we recommend:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <Brain className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Practice more technical deep-dive questions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Mic className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Work on reducing filler words</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Eye className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Practice maintaining eye contact</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/interview?type=' + interviewType)}
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Practice Again
              </Button>
              <Button 
                variant="secondary"
                onClick={() => navigate('/dashboard')}
                className="w-full"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;