import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { useForm } from 'react-hook-form';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { useToast } from '@/components/ui/use-toast';
    import { X, Send } from 'lucide-react';
    import { submitContactForm } from '@/lib/contact';

    const ContactForm = ({ isOpen, onClose }) => {
      const { register, handleSubmit, formState: { errors }, reset } = useForm();
      const [isSending, setIsSending] = useState(false);
      const { toast } = useToast();

      const onSubmit = async (data) => {
        setIsSending(true);
        const { error } = await submitContactForm(data);
        setIsSending(false);

        if (error) {
          console.error("Contact form submission error:", error);
          toast({
            title: "Oh no! Something went wrong.",
            description: "We couldn't send your message. Please try again later.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Message Sent! 🚀",
            description: "Thanks for reaching out! We'll get back to you soon.",
          });
          reset();
          onClose();
        }
      };

      return (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative bg-slate-800/80 border border-white/20 rounded-2xl shadow-2xl w-full max-w-md m-4 p-8 text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Get In Touch
                  </h2>
                  <p className="text-blue-200 mt-2">We'd love to hear from you!</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-blue-200">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your Name"
                      className="bg-slate-700/50 border-slate-600 text-white focus:ring-yellow-400"
                      {...register('name', { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-200">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-slate-700/50 border-slate-600 text-white focus:ring-yellow-400"
                      {...register('email', { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-blue-200">Message</Label>
                    <textarea
                      id="message"
                      rows="4"
                      placeholder="How can we help?"
                      className="w-full bg-slate-700/50 border-slate-600 text-white rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-shadow"
                      {...register('message', { required: "Message is required" })}
                    ></textarea>
                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 group"
                    disabled={isSending}
                  >
                    {isSending ? 'Sending...' : (
                      <>
                        <Send className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:-translate-x-1" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    export default ContactForm;