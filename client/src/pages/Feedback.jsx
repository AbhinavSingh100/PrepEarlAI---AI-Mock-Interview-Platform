import React from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const feedback = location.state?.feedback;
  // const [searchParams] = useSearchParams();
  // const interviewType = searchParams.get('type') || 'general';
  // const score = searchParams.get('score') || '85';


  // const feedbackData = {
  //   overall: {
  //     score: parseInt(score),
  //     duration: '32:45',
  //     questionsAnswered: 5,
  //     strengths: ['Clear communication', 'Good examples', 'Confident delivery'],
  //     improvements: ['More specific details', 'Better structure', 'Faster response time']
  //   },
  //   categories: [
  //     {
  //       name: 'Communication',
  //       score: 92,
  //       feedback: 'Excellent verbal communication skills. You spoke clearly and maintained good pace throughout the interview.',
  //       color: 'text-green-600',
  //       bgColor: 'bg-green-100'
  //     },
  //     {
  //       name: 'Technical Knowledge',
  //       score: 85,
  //       feedback: 'Strong technical foundation. Consider providing more specific examples and diving deeper into implementation details.',
  //       color: 'text-blue-600',
  //       bgColor: 'bg-blue-100'
  //     },
  //     {
  //       name: 'Problem Solving',
  //       score: 78,
  //       feedback: 'Good analytical approach. Work on breaking down complex problems into smaller, manageable components.',
  //       color: 'text-yellow-600',
  //       bgColor: 'bg-yellow-100'
  //     },
  //     {
  //       name: 'Confidence',
  //       score: 88,
  //       feedback: 'You demonstrated good confidence levels. Maintain eye contact and avoid filler words for even better presence.',
  //       color: 'text-purple-600',
  //       bgColor: 'bg-purple-100'
  //     }
  //   ],
  //   detailedAnalysis: [
  //     {
  //       question: 'Tell me about your experience with React and modern JavaScript frameworks.',
  //       yourAnswer: 'I have been working with React for about 3 years now, building various web applications...',
  //       score: 85,
  //       feedback: 'Good overview of your experience. Consider mentioning specific projects and technologies used.',
  //       suggestions: [
  //         'Mention specific React features you\'ve used (hooks, context, etc.)',
  //         'Include metrics or impact of your projects',
  //         'Discuss challenges you\'ve overcome'
  //       ]
  //     },
  //     {
  //       question: 'How would you optimize a slow-performing web application?',
  //       yourAnswer: 'I would start by identifying bottlenecks using performance profiling tools...',
  //       score: 90,
  //       feedback: 'Excellent systematic approach to performance optimization. Well-structured answer.',
  //       suggestions: [
  //         'Great job mentioning specific tools and techniques',
  //         'Consider discussing monitoring and measurement strategies'
  //       ]
  //     }
  //   ]
  // };

  // const getScoreColor = (score) => {
  //   if (score >= 90) return 'text-green-600';
  //   if (score >= 80) return 'text-blue-600';
  //   if (score >= 70) return 'text-yellow-600';
  //   return 'text-red-600';
  // };

  // const getScoreBgColor = (score) => {
  //   if (score >= 90) return 'bg-green-100';
  //   if (score >= 80) return 'bg-blue-100';
  //   if (score >= 70) return 'bg-yellow-100';
  //   return 'bg-red-100';
  // };

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
          {feedback}
        </div>

      </div>
    </div>
  );
};

export default Feedback;