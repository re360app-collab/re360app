import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, CheckCircle, Rocket } from 'lucide-react';

const CampaignLandingPageSMS = () => {
  console.log("✅ Rendering SMS Campaign Landing Page");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black">
      {/* === First Fold: Hero === */}
      <div className="relative w-full h-[80vh] sm:h-screen">
        <img 
          src="/campaigns/sms-hero.jpg" 
          alt="Agent holding checks in front of a home"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-2xl sm:text-4xl font-bold text-yellow-300 mb-4 drop-shadow-lg">
            Attention Real Estate Professionals
          </h1>

          <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-md leading-relaxed">
            We’ve perfected <span className="font-semibold text-yellow-300">dual licensing</span>{" "}
            for you!{" "}
            <span className="font-semibold">Time to earn double</span>{" "}
            with practically no extra work.  
            <br /><br />
            ✅ We handle all the work so <span className="font-semibold">you can focus on closing deals</span>.
          </p>

          <button
            onClick={() => navigate('/register')}
            className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-xl shadow hover:bg-yellow-300 transition text-lg w-full max-w-xs"
          >
            💵 Start Earning Now 💵
          </button>
        </div>
      </div>

      {/* === Second Fold: Why Join === */}
      <section className="bg-white text-slate-800 py-16 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Why Join RE360?</h2>

          <p className="text-xl font-semibold text-blue-700 mb-8">
            We handle all the licensing work so you can stay focused on closing more deals.
          </p>

          <p className="text-lg mb-12 max-w-3xl mx-auto">
            With RE360, you can unlock <span className="font-semibold">dual income streams</span>.  
            Keep your real estate commissions while also earning on mortgages and refinances.  
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-50 p-6 rounded-xl shadow border border-slate-200 flex flex-col items-center">
              <DollarSign className="w-10 h-10 text-green-600 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Earn More</h3>
              <p>Double your income potential — get paid on both sides of your closings.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl shadow border border-slate-200 flex flex-col items-center">
              <CheckCircle className="w-10 h-10 text-yellow-500 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Simple Process</h3>
              <p>We guide you through licensing so you can start fast, without headaches.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl shadow border border-slate-200 flex flex-col items-center">
              <Rocket className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Future Tools</h3>
              <p>AI marketing, smarter CRM, and more tools are coming soon to grow your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* === Third Fold: How It Works Timeline === */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-yellow-400 text-blue-900 rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p>Create your free account in minutes.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-400 text-blue-900 rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Get Licensed</h3>
              <p>We handle the work and guide you through dual licensing.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-yellow-400 text-blue-900 rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Earn More</h3>
              <p>Start collecting income on commissions + refinances.</p>
            </div>
          </div>
        </div>
      </section>

      {/* === Fourth Fold: Dashboard Preview === */}
      <section className="bg-white py-20 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Your RE360 Dashboard</h2>
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            Manage leads, track commissions, and get refinance opportunities all in one place.  
            Works beautifully on your phone — so you can close deals anywhere.
          </p>

          {/* Transparent Phone Mockup */}
          <div className="flex justify-center">
            <img 
              src="/campaigns/dashboard-phones.png"
              alt="RE360 Dashboard phones"
              className="w-80 md:w-[28rem] drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* === Final CTA === */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">
          Ready to Earn Twice on Every Deal?
        </h2>
        <button
          onClick={() => navigate('/register')}
          className="bg-yellow-400 text-blue-900 font-bold px-10 py-4 rounded-xl shadow hover:bg-yellow-300 transition text-lg"
        >
          💵 Start Earning Now 💵
        </button>
      </section>
    </div>
  );
};

export default CampaignLandingPageSMS;



