import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Star,
  FileText,
  Video,
  Headphones,
  Target,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const getTypeIcon = (type) => {
  switch (type) {
    case 'video': return Video;
    case 'audio': return Headphones;
    case 'interactive': return Target;
    case 'document': return FileText;
    default: return BookOpen;
  }
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const CourseCard = ({ course, progress, onStartCourse, onMarkComplete }) => {
  const isCompleted = progress?.completed;
  const TypeIcon = getTypeIcon(course.type);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${
        course.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
    >
      {course.featured && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2">
          <span className="text-sm font-medium flex items-center justify-center">
            <Star className="w-4 h-4 mr-1" />
            Featured Course
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TypeIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{course.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
                <span className="text-gray-500 text-sm">{course.modules} modules</span>
              </div>
            </div>
          </div>
          {isCompleted && (
            <div className="flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          )}
        </div>

        <div className="mb-4">
          <img 
            className="w-full h-32 object-cover rounded-lg" 
            alt={`${course.title} course thumbnail`}
            src="https://images.unsplash.com/photo-1677696795233-5ef097695f12" />
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{course.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              {course.rating}
            </div>
          </div>
        </div>

        {progress && !isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(((progress.current_module || 0) / course.modules) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((progress.current_module || 0) / course.modules) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          {isCompleted ? (
            <Button
              variant="outline"
              className="flex-1 text-green-600 border-green-600 hover:bg-green-50"
              onClick={() => onStartCourse(course.id)}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Review
            </Button>
          ) : (
            <Button
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => onStartCourse(course.id)}
            >
              <Play className="w-4 h-4 mr-2" />
              {progress ? 'Continue' : 'Start Course'}
            </Button>
          )}
          
          {!isCompleted && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMarkComplete(course.id)}
              className="text-gray-600 hover:text-gray-900"
            >
              Mark Complete
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;