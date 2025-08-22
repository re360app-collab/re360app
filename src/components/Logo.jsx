import React from 'react';
import { Link } from 'react-router-dom';
const LOGO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/0b420d02-3d28-409e-bd2c-9abc859f6e58/f20e9dd9c79502102dd6a9a805f4db17.png";
const Logo = ({
  className = "h-10 w-auto",
  linkTo = "/",
  siteTitleColor = "text-gray-800"
}) => {
  return <Link to={linkTo} className="flex items-center space-x-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md">
      <img src={LOGO_URL} alt="RE360App Logo" className={`${className} rounded-sm`} />
      <span className={`text-2xl font-bold ${siteTitleColor} tracking-tight sr-only sm:not-sr-only`}>RE360APP</span>
    </Link>;
};
export const Favicon = () => {
  return <link rel="icon" type="image/png" href={LOGO_URL} />;
};
export default Logo;