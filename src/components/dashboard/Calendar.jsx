import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getAppointments } from '@/lib/appointments';
import AddAppointmentModal from '@/components/dashboard/appointments/AddAppointmentModal';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  User, 
  ChevronLeft,
  ChevronRight,
  Video
} from 'lucide-react';

const Calendar = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const fetchAppointments = useCallback(async () => {
    if (user) {
      setLoading(true);
      const { data, error } = await getAppointments(user.id);
      if (error) {
        toast({
          title: "Error fetching appointments",
          description: error.message,
          variant: "destructive",
        });
      } else if (data) {
        const formattedAppointments = data.map(apt => {
          let clientName = 'N/A';
          let clientPhone = 'N/A';
          if (apt.buyers) {
            clientName = `${apt.buyers.first_name} ${apt.buyers.last_name}`;
            clientPhone = apt.buyers.phone;
          } else if (apt.realestateleads) {
            clientName = `${apt.realestateleads.buyer_first_name} ${apt.realestateleads.buyer_last_name}`;
            clientPhone = apt.realestateleads.buyer_phone;
          } else if (apt.agent_registrations) {
            clientName = `${apt.agent_registrations.first_name} ${apt.agent_registrations.last_name}`;
            clientPhone = apt.agent_registrations.phone;
          }
          return {
            ...apt,
            date: new Date(apt.appointment_date),
            client: clientName,
            phone: clientPhone,
          };
        });
        setAppointments(formattedAppointments);
      }
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    return appointments.filter(apt => 
      apt.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleAddAppointment = () => {
    setIsModalOpen(true);
  };

  const handleAppointmentClick = (appointment) => {
    toast({
      title: `📅 ${appointment.title}`,
      description: `${appointment.date.toLocaleString()} - ${appointment.client}`,
    });
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const todaysAppointments = getAppointmentsForDate(new Date());
  const upcomingAppointments = appointments.filter(apt => 
    apt.date > new Date() && apt.date.toDateString() !== new Date().toDateString()
  ).sort((a, b) => a.date - b.date).slice(0, 5);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-lg">Loading Calendar...</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar & Appointments</h1>
            <p className="text-gray-600 mt-1">Manage your schedule and client meetings</p>
          </div>
          <Button onClick={handleAddAppointment} className="mt-4 sm:mt-0 gradient-bg hover:opacity-90">
            <Plus className="w-5 h-5 mr-2" />
            Add Appointment
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  if (!day) return <div key={index} className="p-2 h-20"></div>;
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isSelected = day.toDateString() === selectedDate.toDateString();
                  const dayAppointments = getAppointmentsForDate(day);

                  return (
                    <motion.div
                      key={day.toDateString()}
                      whileHover={{ scale: 1.05 }}
                      className={`p-2 h-20 border rounded-lg cursor-pointer transition-colors ${
                        isToday ? 'bg-blue-100 border-blue-300' : isSelected ? 'bg-purple-100 border-purple-300' : 'hover:bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>{day.getDate()}</div>
                      {dayAppointments.length > 0 && (
                        <div className="mt-1">
                          {dayAppointments.slice(0, 2).map((apt) => (
                            <div key={apt.id} className="text-xs bg-blue-500 text-white rounded px-1 py-0.5 mb-1 truncate">{apt.title}</div>
                          ))}
                          {dayAppointments.length > 2 && <div className="text-xs text-gray-500">+{dayAppointments.length - 2} more</div>}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Appointments</h3>
              {todaysAppointments.length > 0 ? (
                <div className="space-y-3">
                  {todaysAppointments.map(appointment => (
                    <div key={appointment.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleAppointmentClick(appointment)}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{appointment.title}</h4>
                          <div className="flex items-center text-xs text-gray-500 mt-1"><Clock className="w-3 h-3 mr-1" />{appointment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-1"><User className="w-3 h-3 mr-1" />{appointment.client}</div>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${appointment.type === 'consultation' ? 'bg-blue-500' : appointment.type === 'showing' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500 text-sm">No appointments today</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h3>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleAppointmentClick(appointment)}>
                      <h4 className="font-medium text-gray-900 text-sm">{appointment.title}</h4>
                      <div className="flex items-center text-xs text-gray-500 mt-1"><CalendarIcon className="w-3 h-3 mr-1" />{appointment.date.toLocaleDateString()}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1"><Clock className="w-3 h-3 mr-1" />{appointment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500 text-sm">No upcoming appointments</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
            >
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={handleAddAppointment}>
                  <Plus className="w-4 h-4 mr-2" />Schedule Meeting
                </Button>
                <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30" onClick={() => toast({ title: "🚧 Video Call Coming Soon!", description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}>
                  <Video className="w-4 h-4 mr-2" />Start Video Call
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <AddAppointmentModal
            user={user}
            onClose={() => setIsModalOpen(false)}
            onAppointmentCreated={() => {
              fetchAppointments();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Calendar;