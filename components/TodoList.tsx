import React, { useState } from 'react';
import { PlusIcon, TrashIcon, CheckIcon } from './Icons';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Define my primary focus for the month', completed: true },
    { id: '2', text: 'Generate AI personalized blueprint', completed: false },
    { id: '3', text: 'Review daily actionable steps', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTask.trim(), completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16 sm:py-24 relative z-10">
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Quick Tasks</h2>
        
        <form onSubmit={addTask} className="flex space-x-3 mb-8">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new goal or task..."
            className="flex-1 rounded-xl border border-slate-200 bg-white/50 backdrop-blur-sm px-5 py-4 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all shadow-sm text-slate-700 font-medium placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl px-5 py-4 shadow-md hover:shadow-lg transition-all flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            aria-label="Add Task"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <li className="text-center text-slate-500 py-6 font-medium">All caught up! Time to plan your next move.</li>
          ) : (
            tasks.map(task => (
              <li 
                key={task.id} 
                className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${
                  task.completed 
                    ? 'bg-slate-50/50 border-transparent' 
                    : 'bg-white border-slate-100 shadow-sm hover:border-brand-200 hover:shadow-md'
                }`}
              >
                <label className="flex items-center space-x-4 cursor-pointer flex-1">
                  <div className={`relative flex items-center justify-center w-7 h-7 rounded-lg border-2 transition-colors duration-300 ${
                    task.completed ? 'border-brand-500 bg-brand-500' : 'border-slate-300 group-hover:border-brand-400 bg-white'
                  }`}>
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={task.completed} 
                      onChange={() => toggleTask(task.id)} 
                    />
                    <CheckIcon className={`w-4 h-4 text-white transition-opacity duration-300 ${task.completed ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                  <span className={`text-lg font-medium transition-all duration-300 ${
                    task.completed ? 'text-slate-400 line-through' : 'text-slate-700'
                  }`}>
                    {task.text}
                  </span>
                </label>
                
                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 focus:opacity-100 outline-none"
                  aria-label="Delete task"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default TodoList;
