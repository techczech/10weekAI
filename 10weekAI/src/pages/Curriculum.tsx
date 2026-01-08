import { Link } from 'react-router-dom';
import { content } from '../data/content';
import { useStore } from '../store/useStore';
import { ChevronRight, CheckCircle2, Circle, CalendarPlus } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { CalendarModal } from '../components/CalendarModal';

export function Curriculum() {
  const { completedTasks } = useStore();
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Curriculum</h2>
          <p className="text-gray-500 mt-2 text-lg">Your roadmap to AI fluency in 2026.</p>
        </div>
        
        <button
          onClick={() => setIsCalendarModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors shadow-sm"
        >
          <CalendarPlus size={18} />
          Schedule All Weeks
        </button>
      </div>

      <div className="grid gap-4">
        {content.map((week) => {
          const weekCompletedTasks = week.tasks.filter(t => completedTasks.includes(t.id)).length;
          const isWeekComplete = weekCompletedTasks === week.tasks.length;
          const progress = Math.round((weekCompletedTasks / week.tasks.length) * 100);
          
          return (
            <Link 
              key={week.id} 
              to={`/week/${week.id}`}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className={clsx(
                  "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl transition-colors",
                  isWeekComplete ? "bg-green-100 text-green-700" : "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100"
                )}>
                  {week.id}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1 block">
                        {week.phase}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                        {week.title}
                      </h3>
                      <p className="text-gray-600 mt-1 truncate pr-4">{week.description}</p>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-indigo-500 transition-transform group-hover:translate-x-1" size={24} />
                  </div>
                  
                  {/* Mini Progress Bar */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={clsx("h-full transition-all duration-500", isWeekComplete ? "bg-green-500" : "bg-indigo-500")}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    {isWeekComplete ? (
                      <div className="flex items-center gap-1 text-xs font-semibold text-green-600">
                        <CheckCircle2 size={14} /> Complete
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs font-medium text-gray-400">
                        <Circle size={14} /> {weekCompletedTasks}/{week.tasks.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <CalendarModal 
        isOpen={isCalendarModalOpen} 
        onClose={() => setIsCalendarModalOpen(false)} 
      />
    </div>
  );
}
