import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Award, 
  TrendingUp,
  Target,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { coursesData, learningCategories } from '@/data/learningCourses';
import CourseCard from '@/components/dashboard/learning/CourseCard';
import { getLearningProgress, updateLearningProgress } from '@/lib/learning';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const LearningLab = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('all');
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await getLearningProgress(user.id);
      if (error) {
        toast({ title: 'Error', description: 'Could not load learning progress.' });
      } else {
        const progressMap = data.reduce((acc, p) => {
          acc[p.course_id] = p;
          return acc;
        }, {});
        setProgress(progressMap);
      }
      setLoading(false);
    };
    fetchProgress();
  }, [user, toast]);

  const filteredCourses = activeCategory === 'all' 
    ? coursesData 
    : coursesData.filter(course => course.category === activeCategory);

  const handleStartCourse = (courseId) => {
      toast({
        title: "🚧 Course player coming soon!",
        description: "This feature isn't implemented yet—but you can request it in your next prompt! 🚀",
      });
  };

  const handleMarkComplete = async (courseId) => {
    const course = coursesData.find(c => c.id === courseId);
    if (!user || !course) return;

    const newProgressData = {
        completed: true,
        current_module: course.modules,
        time_spent: progress[courseId]?.time_spent || 0,
        completed_date: new Date().toISOString()
    };
    
    const { data: updatedProgress, error } = await updateLearningProgress(user.id, courseId, newProgressData);
    
    if (error) {
       toast({ title: 'Error', description: 'Failed to save progress.' });
    } else {
      setProgress(prev => ({...prev, [courseId]: updatedProgress[0]}));
      toast({
        title: "Course completed! 🎉",
        description: "Congratulations on completing another step in your learning journey!",
      });
    }
  };

  const calculateOverallProgress = () => {
    if (coursesData.length === 0) return 0;
    const completedCourses = Object.values(progress).filter(p => p.completed).length;
    return Math.round((completedCourses / coursesData.length) * 100);
  };
  
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <p className="ml-4 text-lg text-slate-600">Loading Learning Lab...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Learning Lab</h1>
            <p className="text-blue-100 text-lg">Master loan officer skills with expert training</p>
          </div>
          <div className="hidden md:block">
            <img 
              className="w-32 h-32 rounded-full object-cover border-4 border-white/20" 
              alt="Learning lab illustration"
             src="https://images.unsplash.com/photo-1585693991691-d6d7d4b642c4" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-yellow-300" />
              <div>
                <p className="text-2xl font-bold">{Object.values(progress).filter(p => p.completed).length}</p>
                <p className="text-blue-100 text-sm">Courses Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-green-300" />
              <div>
                <p className="text-2xl font-bold">{calculateOverallProgress()}%</p>
                <p className="text-blue-100 text-sm">Overall Progress</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <Target className="w-8 h-8 text-orange-300" />
              <div>
                <p className="text-2xl font-bold">{coursesData.length - Object.values(progress).filter(p => p.completed).length}</p>
                <p className="text-blue-100 text-sm">Courses Remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {learningCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            progress={progress[course.id]}
            onStartCourse={handleStartCourse}
            onMarkComplete={handleMarkComplete}
          />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try selecting a different category to see available courses.</p>
        </div>
      )}
    </div>
  );
};

export default LearningLab;