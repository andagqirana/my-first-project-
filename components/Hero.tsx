import React from 'react';
import { ArrowRightIcon, CheckCircleIcon, ClockIcon, SparklesIcon } from './Icons';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative w-full overflow-hidden bg-slate-50 min-h-[90vh] flex flex-col justify-center pt-20 pb-16">
      
      {/* Dynamic Gradient Background Shapes */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-brand-400/30 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
        <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-fuchsia-400/30 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/80 shadow-sm text-sm font-bold text-brand-700 mb-8 tracking-wide uppercase">
          <SparklesIcon className="w-4 h-4 mr-2 text-brand-500" />
          AI-Powered Personal Growth
        </div>

        {/* Massive Bold Headline */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 leading-[1.1]">
          Master Your Time. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-500 to-fuchsia-500 drop-shadow-sm">
            Design Your Life.
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="mt-8 max-w-2xl mx-auto text-xl md:text-2xl font-medium text-slate-600 leading-relaxed">
          Stop drifting and start living intentionally. Let our advanced AI build a highly personalized, actionable roadmap to achieve your biggest goals.
        </p>
        
        {/* Premium Call-to-Action Button */}
        <div className="mt-12 relative inline-flex group">
          {/* Glowing aura behind button */}
          <div className="absolute transition-all duration-500 opacity-60 -inset-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-fuchsia-500 rounded-full blur-md group-hover:opacity-100 group-hover:blur-lg group-hover:-inset-2"></div>
          
          <button
            onClick={onStart}
            className="relative inline-flex items-center justify-center px-10 py-5 text-lg md:text-xl font-bold text-white transition-all duration-300 bg-slate-900 rounded-full hover:bg-slate-800 shadow-[0_0_40px_rgba(124,58,237,0.3)] hover:shadow-[0_0_60px_rgba(124,58,237,0.5)] scale-100 group-hover:scale-[1.02]"
          >
            Generate My Blueprint 
            <ArrowRightIcon className="ml-3 w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Premium Feature Cards (Glassmorphism) */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:-translate-y-2 transition-transform duration-300 text-left group">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <CheckCircleIcon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Actionable Steps</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Clear, bite-sized daily tasks mapped out to move you relentlessly toward your goals.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:-translate-y-2 transition-transform duration-300 text-left group">
            <div className="w-14 h-14 bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <ClockIcon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Optimized Routines</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Schedules engineered to fit your actual availability, boosting productivity without burnout.</p>
          </div>

          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:-translate-y-2 transition-transform duration-300 text-left group">
            <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-100 to-fuchsia-50 rounded-2xl flex items-center justify-center text-fuchsia-600 mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <SparklesIcon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Habit Formation</h3>
            <p className="text-slate-600 font-medium leading-relaxed">Identify and build the exact core habits required to sustain long-term success.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
