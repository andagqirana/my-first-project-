import React, { useState } from 'react';
import { UserFormData, FocusArea } from '../types';

interface PlannerFormProps {
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
}

const PlannerForm: React.FC<PlannerFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    primaryFocus: '',
    shortTermGoal: '',
    longTermGoal: '',
    dailyAvailability: '',
    biggestObstacle: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof UserFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.primaryFocus) newErrors.primaryFocus = "Please select a focus area";
    if (!formData.shortTermGoal.trim()) newErrors.shortTermGoal = "Please enter a short-term goal";
    if (!formData.longTermGoal.trim()) newErrors.longTermGoal = "Please enter a long-term goal";
    if (!formData.dailyAvailability.trim()) newErrors.dailyAvailability = "Please estimate your availability";
    if (!formData.biggestObstacle.trim()) newErrors.biggestObstacle = "Please describe your biggest obstacle";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputClass = "mt-1 block w-full rounded-xl border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm px-4 py-3 bg-slate-50 border transition-colors duration-200 outline-none";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="px-6 py-8 sm:p-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Tell us about yourself</h2>
          <p className="text-slate-500 mb-8">The more specific you are, the better the AI can tailor your plan.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className={labelClass}>What's your name?</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Alex" />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="primaryFocus" className={labelClass}>Primary Focus Area</label>
              <select id="primaryFocus" name="primaryFocus" value={formData.primaryFocus} onChange={handleChange} className={inputClass}>
                <option value="" disabled>Select an area</option>
                {Object.values(FocusArea).map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              {errors.primaryFocus && <p className={errorClass}>{errors.primaryFocus}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="shortTermGoal" className={labelClass}>Short-term Goal (1-3 months)</label>
                <textarea id="shortTermGoal" name="shortTermGoal" rows={3} value={formData.shortTermGoal} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="e.g., Run a 5k, learn React basics" />
                {errors.shortTermGoal && <p className={errorClass}>{errors.shortTermGoal}</p>}
              </div>

              <div>
                <label htmlFor="longTermGoal" className={labelClass}>Long-term Goal (1-3 years)</label>
                <textarea id="longTermGoal" name="longTermGoal" rows={3} value={formData.longTermGoal} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="e.g., Run a marathon, become a Senior Dev" />
                {errors.longTermGoal && <p className={errorClass}>{errors.longTermGoal}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="dailyAvailability" className={labelClass}>Daily Availability</label>
              <input type="text" id="dailyAvailability" name="dailyAvailability" value={formData.dailyAvailability} onChange={handleChange} className={inputClass} placeholder="e.g., 2 hours in the evening, 30 mins mornings" />
              {errors.dailyAvailability && <p className={errorClass}>{errors.dailyAvailability}</p>}
            </div>

            <div>
              <label htmlFor="biggestObstacle" className={labelClass}>What's your biggest obstacle right now?</label>
              <textarea id="biggestObstacle" name="biggestObstacle" rows={2} value={formData.biggestObstacle} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="e.g., Lack of motivation after work, easily distracted" />
              {errors.biggestObstacle && <p className={errorClass}>{errors.biggestObstacle}</p>}
            </div>

            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100">
              <button type="button" onClick={onCancel} className="px-6 py-3 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-8 py-3 text-sm font-semibold rounded-xl text-white bg-brand-600 hover:bg-brand-700 shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
                Generate Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlannerForm;
