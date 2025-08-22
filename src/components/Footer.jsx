import React from 'react';

const Footer = ({ variant = 'light' }) => {
  const isLight = variant === 'light';
  
  return (
    <footer className={`${isLight ? 'bg-gray-50 border-t border-gray-200' : 'bg-white/5 backdrop-blur-sm border-t border-white/10'} py-6 mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-white/60'} leading-relaxed max-w-6xl mx-auto`}>
            Nationwide Mortgage Bankers, Inc. (NMB), going by NMB Home Loans, Inc. in the states of AL, AZ, GA, IL, IA, KS, LA, MN, MT, ND, OK, PA, SC, SD, TX, WV and as NMB Home Loans in KY and MA | NMLS# 819382 (
            <a 
              href="https://www.nmlsconsumeraccess.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${isLight ? 'text-blue-600 hover:text-blue-800' : 'text-blue-300 hover:text-blue-200'} underline`}
            >
              https://www.nmlsconsumeraccess.org
            </a>
            ) | 3 Huntington Quadrangle, Suite 403N, Melville, NY 11747 | Branch NMLS 1822931 | (833) 700-8884 | 
            <a 
              href="https://www.nmbnow.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${isLight ? 'text-blue-600 hover:text-blue-800' : 'text-blue-300 hover:text-blue-200'} underline`}
            >
              www.nmbnow.com
            </a>
            | NMB is in no way affiliated with Nationwide Mutual Insurance Company. | NMBNOW is a registered DBA of Nationwide Mortgage Bankers, Inc. | All loans are subject to credit and appraisal approval. Not all applicants may qualify. Some products and services may not be available in all states. | NMB is not acting on behalf of or at the direction of FHA/HUD/USDA/VA or the federal government. | This is an advertisement. | Licensed under the California Finance Lenders Law by The Department of Financial Protection and Innovation #60DBO73939 | Georgia Residential Mortgage License | Massachusetts Mortgage Lender License #ML819382 | Licensed by the New Jersey Department of Banking and Insurance | Licensed Mortgage Banker – New York Department of Financial Services | Rhode Island Licensed Lender | Licensed by the Virginia State Corporation Commission. | Additional state licensing information can be found at 
            <a 
              href="https://nmbnow.com/disclosures-and-licensing/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${isLight ? 'text-blue-600 hover:text-blue-800' : 'text-blue-300 hover:text-blue-200'} underline`}
            >
              https://nmbnow.com/disclosures-and-licensing/
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;