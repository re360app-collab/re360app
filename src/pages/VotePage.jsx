import React, { useState, useEffect } from 'react';
    import { Helmet } from 'react-helmet-async';
    import { motion } from 'framer-motion';
    import { supabase } from '@/lib/customSupabaseClient';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
    import { Label } from '@/components/ui/label';
    import Navigation from '@/components/landing/Navigation';
    import Footer from '@/components/Footer';
    import { CheckCircle, Loader2 } from 'lucide-react';

    const ads = [
      { id: 'ad1', videoId: 'CgUe48opXLQ', title: 'Ad #1' },
      { id: 'ad2', videoId: 'oXnaDFXk3r0', title: 'Ad #2' },
      { id: 'ad3', videoId: 'lY2CH3ifRz0', title: 'Ad #3' },
    ];

    const VotePage = () => {
      const [selectedAd, setSelectedAd] = useState(null);
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [hasVoted, setHasVoted] = useState(false);
      const { toast } = useToast();

      useEffect(() => {
        const voted = localStorage.getItem('hasVotedForAd');
        if (voted) {
          setHasVoted(true);
        }
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAd) {
          toast({
            title: 'No selection made',
            description: 'Please select an ad to vote for.',
            variant: 'destructive',
          });
          return;
        }

        setIsSubmitting(true);
        try {
          const { error } = await supabase.from('ad_votes').insert([{ vote: selectedAd }]);

          if (error) {
            throw error;
          }

          toast({
            title: 'Vote Submitted!',
            description: 'Thank you for your feedback.',
          });
          localStorage.setItem('hasVotedForAd', 'true');
          setHasVoted(true);
        } catch (error) {
          console.error('Error submitting vote:', error);
          toast({
            title: 'Error',
            description: 'There was a problem submitting your vote. Please try again.',
            variant: 'destructive',
          });
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <>
          <Helmet>
            <title>Cast Your Vote - RE360App</title>
            <meta name="description" content="Vote for your favorite ad and help us choose the best one!" />
          </Helmet>
          <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
            <Navigation />
            <main className="flex-grow pt-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Cast Your Vote
                  </h1>
                  <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                    Watch the ads below and vote for your favorite. Your feedback helps us create better content!
                  </p>
                </motion.div>

                {hasVoted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 md:p-12 text-center"
                  >
                    <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Thank You for Voting!</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      We've received your vote. We appreciate your input!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <RadioGroup onValueChange={setSelectedAd} value={selectedAd} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                      {ads.map((ad) => (
                        <motion.div
                          key={ad.id}
                          whileHover={{ y: -5 }}
                          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 border-2 border-transparent has-[:checked]:border-blue-500"
                        >
                          <div className="aspect-w-9 aspect-h-16">
                            <iframe
                              src={`https://www.youtube.com/embed/${ad.videoId}`}
                              title={ad.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            ></iframe>
                          </div>
                          <div className="p-6">
                            <RadioGroupItem value={ad.id} id={ad.id} className="sr-only" />
                            <Label
                              htmlFor={ad.id}
                              className="flex items-center justify-center text-lg font-semibold text-gray-800 dark:text-gray-200 cursor-pointer p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                              Vote for {ad.title}
                            </Label>
                          </div>
                        </motion.div>
                      ))}
                    </RadioGroup>

                    <div className="text-center">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Vote'
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </div>
            </main>
            <Footer />
          </div>
        </>
      );
    };

    export default VotePage;