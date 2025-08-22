import { supabase } from '@/lib/supabase';

// Learning progress helpers
export const updateLearningProgress = async (userId, courseId, progressData) => {
  try {
    const { data, error } = await supabase
      .from('learning_progress')
      .upsert([{
        user_id: userId,
        course_id: courseId,
        ...progressData
      }])
      .select();
    return { data, error };
  } catch (error) {
    console.error('Error updating learning progress:', error);
    return { data: null, error };
  }
};

export const getLearningProgress = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', userId);
    return { data, error };
  } catch (error) {
    console.error('Error getting learning progress:', error);
    return { data: null, error };
  }
};