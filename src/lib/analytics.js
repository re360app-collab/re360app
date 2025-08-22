import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = "G-94BRDPCZHH";
let isInitialized = false;

export const initGA = () => {
  if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX" && !isInitialized) {
    try {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      isInitialized = true;
      console.log("Google Analytics initialized with ID:", GA_MEASUREMENT_ID);
    } catch (error) {
      console.error("Google Analytics initialization failed:", error);
    }
  } else if (GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    console.warn("Google Analytics: Placeholder Measurement ID detected. Provide a real ID to enable tracking.");
  }
};

export const trackPageView = (path) => {
  if (isInitialized) {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

export const trackEvent = (category, action, label) => {
  if (isInitialized) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};