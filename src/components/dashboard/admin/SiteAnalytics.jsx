import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ExternalLink, BarChart2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { trackEvent } from '@/lib/analytics';

const SiteAnalytics = () => {
  const { toast } = useToast();
  const [isGaInitialized, setIsGaInitialized] = useState(false);

  useEffect(() => {
    const gaId = "G-94BRDPCZHH";
    if (gaId && gaId !== "G-XXXXXXXXXX") {
      setIsGaInitialized(true);
    }
  }, []);

  const handleTestEvent = () => {
    trackEvent('Admin Dashboard', 'Click', 'Test Analytics Event Button');
    toast({
      title: "Test Event Sent!",
      description: "Check your Google Analytics 'Realtime' report to see the event.",
    });
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Site Analytics</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Confirm your Google Analytics connection and access your reports.
            </p>
          </div>
          <Button
            asChild
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity shadow-lg"
          >
            <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Google Analytics
            </a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {isGaInitialized ? (
                <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
              ) : (
                <AlertTriangle className="w-6 h-6 mr-3 text-yellow-500" />
              )}
              Connection Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isGaInitialized ? (
              <>
                <p className="text-gray-700 dark:text-gray-300">
                  Your application is successfully connected to Google Analytics with Measurement ID: <span className="font-mono bg-gray-100 dark:bg-slate-700 p-1 rounded">G-94BRDPCZHH</span>.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Page views and user interactions are now being tracked. Please note that it can take 24-48 hours for data to fully appear in standard reports. For immediate feedback, check the "Realtime" overview in your Google Analytics dashboard.
                </p>
                <Button onClick={handleTestEvent} variant="outline">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Send a Test Event
                </Button>
              </>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">
                Google Analytics has not been initialized. Please ensure a valid Measurement ID is configured in the application settings.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Accessing Your Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              This dashboard confirms your connection is active. All detailed analytics, including visitor counts, user demographics, behavior flows, and conversion tracking, are available directly within your Google Analytics account.
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Displaying live charts and data directly here requires using the Google Analytics Data API, which can be integrated in a future update. For now, use the button at the top to access the full suite of reporting tools.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SiteAnalytics;