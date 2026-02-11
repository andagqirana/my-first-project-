import React, { useState } from 'react';
import Hero from './components/Hero';
import PlannerForm from './components/PlannerForm';
import PlanResult from './components/PlanResult';
import TodoList from './components/TodoList';
import { AppState, UserFormData, GeneratedPlan } from './types';
import { generateLifePlan } from './services/geminiService';

function App() {
  const [appState, setAppState] = useState<AppState>(AppState.HERO);
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [plan, setPlan] = useState<GeneratedPlan | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleStart = () => {
    setAppState(AppState.FORM);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setAppState(AppState.HERO);
  };

  const handleSubmitForm = async (data: UserFormData) => {
    setUserData(data);
    setAppState(AppState.LOADING);
    setErrorMsg('');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const generatedResult = await generateLifePlan(data);
      setPlan(generatedResult);
      setAppState(AppState.RESULT);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setUserData(null);
    setAppState(AppState.HERO);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (item: string) => {
    if (appState === AppState.LOADING) return;
    
    if (item === 'Home') setAppState(AppState.HERO);
    if (item === 'Plans') setAppState(AppState.FORM);
    
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = ['Home', 'Features', 'Plans', 'Contact'];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 relative">
      
      {/* Liquid Glass Header */}
      <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-white/60 to-white/20 backdrop-blur-lg backdrop-saturate-150 border-b border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => handleNavClick('Home')}
          >
            <span className="font-extrabold text-xl md:text-2xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600 drop-shadow-sm group-hover:opacity-80 transition-opacity">
              AI LIFE PLANNER
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <button 
                key={item}
                onClick={() => handleNavClick(item)}
                className="relative text-sm font-bold tracking-wider text-slate-700 hover:text-brand-600 transition-colors duration-300 group uppercase"
              >
                {item}
                {/* Smooth hover underline animation */}
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 hover:text-brand-600 focus:outline-none transition-colors"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
        </div>

        {/* Mobile Navigation Dropdown (Liquid Glass) */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/50 shadow-lg py-4 px-6 flex flex-col space-y-2 origin-top animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button 
                key={item}
                onClick={() => handleNavClick(item)}
                className="text-left text-sm font-bold tracking-wider text-slate-700 hover:text-brand-600 uppercase py-3 border-b border-slate-200/50 last:border-0 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main content wrapper */}
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        {appState === AppState.HERO && (
          <div className="w-full flex flex-col items-center justify-start pb-20">
             <Hero onStart={handleStart} />
             <TodoList />
          </div>
        )}

        {appState === AppState.FORM && (
          <div className="w-full bg-slate-50 min-h-screen pb-20">
            <PlannerForm onSubmit={handleSubmitForm} onCancel={handleCancelForm} />
          </div>
        )}

        {appState === AppState.LOADING && (
          <div className="w-full flex-grow flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="relative w-24 h-24 mb-8">
               <div className="absolute inset-0 border-4 border-brand-100 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-brand-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Analyzing your profile...</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Our AI is crafting a highly personalized roadmap based on your goals and availability. This usually takes just a few seconds.
            </p>
          </div>
        )}

        {appState === AppState.RESULT && plan && userData && (
          <div className="w-full bg-slate-50 min-h-screen">
            <PlanResult plan={plan} userData={userData} onReset={handleReset} />
          </div>
        )}

        {appState === AppState.ERROR && (
          <div className="w-full flex-grow flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-slate-600 max-w-md mx-auto mb-8">{errorMsg}</p>
            <div className="space-x-4">
              <button onClick={() => setAppState(AppState.FORM)} className="px-6 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 transition">
                Try Again
              </button>
              <button onClick={handleReset} className="px-6 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition">
                Start Over
              </button>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-slate-900 py-8 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} AI Life Planner. Powered by Gemini.</p>
      </footer>
    </div>
  );
}

export default App;
