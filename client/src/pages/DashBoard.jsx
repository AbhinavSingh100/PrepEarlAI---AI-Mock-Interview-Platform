import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Clock, 
  TrendingUp, 
  Star, 
  Calendar,
  Target,
  Award,
  BarChart3,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import Navbar from '../components/NavBar';
import Button from '../components/Button';

const DashBoard = () => {
  const recentInterviews = [
    {
      id: 1,
      type: 'Technical Interview',
      company: 'Tech Corp',
      date: '2024-01-15',
      score: 85,
      duration: '45 min',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Behavioral Interview',
      company: 'StartupXYZ',
      date: '2024-01-12',
      score: 92,
      duration: '30 min',
      status: 'completed'
    },
    {
      id: 3,
      type: 'System Design',
      company: 'BigTech Inc',
      date: '2024-01-10',
      score: 78,
      duration: '60 min',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isAuthenticated={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Sarah!</h1>
          <p className="text-gray-600">Ready to practice your interview skills today?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">85%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hours Practiced</p>
                <p className="text-2xl font-bold text-gray-900">12.5</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Start */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Start a New Interview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Link to="/interview?type=technical" className="group">
                  <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group-hover:shadow-md">
                    <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Technical Interview</h3>
                    <p className="text-gray-600 text-sm">Practice coding and system design questions</p>
                  </div>
                </Link>

                <Link to="/interview?type=behavioral" className="group">
                  <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 group-hover:shadow-md">
                    <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <Star className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Behavioral Interview</h3>
                    <p className="text-gray-600 text-sm">Work on communication and soft skills</p>
                  </div>
                </Link>
              </div>
              <Link to="/interview">
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Start Custom Interview
                </Button>
              </Link>
            </div>

            {/* Recent Interviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Interviews</h2>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {recentInterviews.map((interview) => (
                  <div key={interview.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-10 h-10 rounded-lg flex items-center justify-center">
                          <Play className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{interview.type}</h3>
                          <p className="text-sm text-gray-600">{interview.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {interview.date}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            {interview.duration}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            interview.score >= 90 ? 'text-green-600' :
                            interview.score >= 80 ? 'text-blue-600' :
                            interview.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {interview.score}%
                          </div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-200">
                <Button variant="ghost" className="w-full">
                  View All Interviews
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Progress Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Technical Skills</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Communication</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Problem Solving</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Goals */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Weekly Goals</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Complete 3 interviews</span>
                  <span className="text-sm font-medium text-purple-600">2/3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Improve avg. score by 5%</span>
                  <span className="text-sm font-medium text-green-600">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Practice system design</span>
                  <span className="text-sm font-medium text-gray-400">0/2</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
              <h3 className="font-semibold text-gray-900 mb-3">💡 Today's Tip</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Practice the STAR method (Situation, Task, Action, Result) for behavioral questions. 
                It helps structure your responses and makes them more compelling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;