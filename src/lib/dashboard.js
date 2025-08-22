import { supabase } from '@/lib/supabase';

export const getDashboardStats = async (userId, userProfile) => {
  if (!userId || !userProfile) {
    return {
      activeLeads: 0, qualifiedBuyers: 0, upcomingAppointments: 0,
      learningProgress: '0%', newRealtorLeads: 0,
    };
  }

  const isAdmin = userProfile.position === 'System Admin' || userProfile.position === 'NMB Admin';
  const isLoanOfficer = userProfile.position === 'Loan Officer';
  const isRealtor = userProfile.position === 'Real Estate Agent';

  try {
    let activeLeadsPromise;
    let qualifiedBuyersPromise;
    let newRealtorLeadsPromise;

    if (isAdmin) {
      activeLeadsPromise = supabase.from('realestateleads').select('id', { count: 'exact', head: true });
      newRealtorLeadsPromise = supabase.from('agent_registrations').select('id', { count: 'exact', head: true }).eq('status', 'New');
      qualifiedBuyersPromise = supabase.from('realestateleads').select('id', { count: 'exact', head: true }).eq('status', 'Qualified');
    } else if (isLoanOfficer) {
      activeLeadsPromise = supabase.from('realestateleads').select('id', { count: 'exact', head: true }).eq('assigned_loan_officer_id', userId).eq('status', 'New');
      qualifiedBuyersPromise = Promise.resolve({ count: 0 });
      newRealtorLeadsPromise = Promise.resolve({ count: 0 });
    } else if (isRealtor) {
      activeLeadsPromise = supabase.from('realestateleads').select('id', { count: 'exact', head: true }).eq('realtor_id', userId);
      qualifiedBuyersPromise = supabase.from('realestateleads').select('id', { count: 'exact', head: true }).eq('realtor_id', userId).eq('status', 'Qualified');
      newRealtorLeadsPromise = Promise.resolve({ count: 0 });
    } else {
      activeLeadsPromise = Promise.resolve({ count: 0 });
      qualifiedBuyersPromise = Promise.resolve({ count: 0 });
      newRealtorLeadsPromise = Promise.resolve({ count: 0 });
    }

    const upcomingAppointmentsPromise = supabase
      .from('appointments')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .gt('appointment_date', new Date().toISOString());

    const learningProgressPromise = supabase
      .from('learning_progress')
      .select('course_id, completed')
      .eq('user_id', userId);

    const [
      activeLeadsRes,
      qualifiedBuyersRes,
      upcomingAppointmentsRes,
      learningProgressRes,
      newRealtorLeadsRes,
    ] = await Promise.all([
      activeLeadsPromise,
      qualifiedBuyersPromise,
      upcomingAppointmentsPromise,
      learningProgressPromise,
      newRealtorLeadsPromise,
    ]);

    // Error checking for each promise
    if (activeLeadsRes.error) console.error('Error fetching active leads:', activeLeadsRes.error.message);
    if (qualifiedBuyersRes.error) console.error('Error fetching qualified buyers:', qualifiedBuyersRes.error.message);
    if (upcomingAppointmentsRes.error) console.error('Error fetching appointments:', upcomingAppointmentsRes.error.message);
    if (learningProgressRes.error) console.error('Error fetching learning progress:', learningProgressRes.error.message);
    if (newRealtorLeadsRes && newRealtorLeadsRes.error) console.error('Error fetching new realtor leads:', newRealtorLeadsRes.error.message);

    const totalCourses = 10;
    const completedCourses = learningProgressRes.data?.filter(p => p.completed).length || 0;
    const learningProgress = totalCourses > 0 ? `${Math.round((completedCourses / totalCourses) * 100)}%` : '0%';

    return {
      activeLeads: activeLeadsRes.count || 0,
      qualifiedBuyers: qualifiedBuyersRes.count || 0,
      upcomingAppointments: upcomingAppointmentsRes.count || 0,
      learningProgress: learningProgress,
      newRealtorLeads: newRealtorLeadsRes?.count || 0,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      activeLeads: 0,
      qualifiedBuyers: 0,
      upcomingAppointments: 0,
      learningProgress: '0%',
      newRealtorLeads: 0,
    };
  }
};