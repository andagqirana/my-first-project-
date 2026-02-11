import React from 'react';
import { GeneratedPlan, UserFormData } from '../types';
import { CheckCircleIcon, ClockIcon, SparklesIcon } from './Icons';

interface PlanResultProps {
  plan: GeneratedPlan;
  userData: UserFormData;
  onReset: () => void;
}

const PlanResult: React.FC<PlanResultProps> = ({ plan, userData, onReset }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      
      {/* Header / Intro */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Your Personalized Blueprint
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Based on your focus in <span className="font-semibold text-brand-600">{userData.primaryFocus}</span>, here is your customized plan to overcome your obstacles and reach your goals.
        </p>
      </div>

      {/* Motivational Quote Quote */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-600 rounded-3xl p-8 mb-12 text-white shadow-xl relative overflow-hidden">
        <SparklesIcon className="absolute top-4 right-4 w-16 h-16 text-white/10" />
        <blockquote className="text-xl md:text-2xl font-medium italic relative z-10">
          "{plan.motivationalQuote}"
        </blockquote>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Routine */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <ClockIcon className="mr-3 text-brand-500 w-7 h-7" />
              Daily Routine
            </h3>
            <div className="space-y-6">
              {plan.dailyRoutine.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-start p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="sm:w-1/3 mb-2 sm:mb-0">
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
                      {item.timeOfDay}
                    </span>
                    <div className="text-slate-500 text-sm mt-2 ml-1 flex items-center">
                       <ClockIcon className="w-4 h-4 mr-1"/> {item.duration}
                    </div>
                  </div>
                  <div className="sm:w-2/3 sm:pl-4 border-l-0 sm:border-l border-slate-200">
                    <p className="text-slate-800 font-medium">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <CheckCircleIcon className="mr-3 text-emerald-500 w-7 h-7" />
              Actionable Steps (Next 7 Days)
            </h3>
            <ul className="space-y-4">
              {plan.actionableSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold mr-4 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Habits & Summary */}
        <div className="space-y-8">
           <section className="bg-slate-900 rounded-3xl p-8 shadow-lg text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center text-brand-300">
               <SparklesIcon className="mr-2 w-6 h-6" />
              Habits to Build
            </h3>
            <ul className="space-y-4">
              {plan.habitsToBuild.map((habit, index) => (
                <li key={index} className="flex items-start border-b border-slate-700 pb-4 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-brand-400 mt-2 mr-3 flex-shrink-0" />
                  <span className="text-slate-300">{habit}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="bg-brand-50 rounded-3xl p-6 border border-brand-100">
            <h4 className="font-semibold text-brand-900 mb-2">Reminder</h4>
            <p className="text-sm text-brand-700 mb-6">
              You indicated your biggest obstacle is: <br/>
              <span className="italic mt-1 block">"{userData.biggestObstacle}"</span>
            </p>
            <p className="text-sm text-brand-800">
              Stick to the routines and habits provided to help overcome this. Consistency is more important than intensity.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          Create Another Plan
        </button>
      </div>

    </div>
  );
};

export default PlanResult;
