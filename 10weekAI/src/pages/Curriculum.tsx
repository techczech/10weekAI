import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { content, Week } from '../data/content';
import { useStore } from '../store/useStore';
import { downloadWeekCalendar } from '../utils/calendar';
import { CheckSquare, Square, Calendar, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

export function Curriculum() {
  const [searchParams] = useSearchParams();
  const { completedTasks, toggleTask } = useStore();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  useEffect(() => {
    const weekId = searchParams.get('week');
    if (weekId !== null) {
      setExpandedWeek(parseInt(weekId));
      // Optional: scroll to element
      setTimeout(() => {
        document.getElementById(`week-${weekId}`)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  const handleExportCalendar = (week: Week) => {
    // Determine the next Saturday
    const d = new Date();
    d.setDate(d.getDate() + (6 + 7 - d.getDay()) % 7); // Next Saturday
    // Ask user for confirmation or date (simplified for now to just prompt/confirm)
    
    // In a real app, we'd use a modal date picker. 
    // For now, we'll default to next Saturday and alert the user.
    const confirm = window.confirm(`Generate calendar events for Week ${week.id} starting this coming Saturday (${d.toDateString()})?`);
    if (confirm) {
      downloadWeekCalendar(week, d);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Curriculum</h2>
          <p className="text-gray-500 mt-1">10 Weeks to AI Fluency</p>
        </div>
      </div>

      <div className="space-y-4">
        {content.map((week) => {
          const isExpanded = expandedWeek === week.id;
          const weekCompletedTasks = week.tasks.filter(t => completedTasks.includes(t.id)).length;
          const isWeekComplete = weekCompletedTasks === week.tasks.length;
          
          return (
            <div 
              key={week.id} 
              id={`week-${week.id}`}
              className={clsx(
                "bg-white rounded-xl border transition-all duration-200 overflow-hidden",
                isExpanded ? "ring-2 ring-indigo-500 shadow-lg" : "hover:border-indigo-300 shadow-sm border-gray-200"
              )}
            >
              <div 
                className="p-6 cursor-pointer flex items-start gap-4"
                onClick={() => setExpandedWeek(isExpanded ? null : week.id)}
              >
                <div className={clsx(
                  "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                  isWeekComplete ? "bg-green-100 text-green-700" : "bg-indigo-100 text-indigo-700"
                )}>
                  {week.id}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                        {week.phase}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1">{week.title}</h3>
                    </div>
                    {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                  </div>
                  
                  <p className="text-gray-600 mt-2">{week.description}</p>
                  
                  {/* Progress bar inside card */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-500"
                        style={{ width: `${(weekCompletedTasks / week.tasks.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-500">
                      {weekCompletedTasks}/{week.tasks.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50/50">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <ExternalLink size={16} /> Tools
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {week.tools.map(tool => (
                          <span key={tool} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md border border-gray-200">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-100">
                       <h4 className="font-semibold text-gray-900 mb-2">Key Insight</h4>
                       <p className="text-sm text-gray-600 italic">"{week.keyInsight}"</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900">Action Plan</h4>
                    {week.tasks.map(task => {
                       const isChecked = completedTasks.includes(task.id);
                       return (
                         <div 
                           key={task.id} 
                           className={clsx(
                             "flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer",
                             isChecked ? "bg-green-50 border-green-200" : "bg-white border-gray-200 hover:border-indigo-300"
                           )}
                           onClick={(e) => {
                             e.stopPropagation();
                             toggleTask(task.id);
                           }}
                         >
                           <button className={clsx("mt-0.5", isChecked ? "text-green-600" : "text-gray-300")}>
                             {isChecked ? <CheckSquare size={20} /> : <Square size={20} />}
                           </button>
                           <div>
                             <h5 className={clsx("font-medium", isChecked ? "text-green-900" : "text-gray-900")}>
                               {task.title}
                             </h5>
                             <p className={clsx("text-sm", isChecked ? "text-green-700" : "text-gray-500")}>
                               {task.description}
                             </p>
                           </div>
                         </div>
                       );
                    })}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleExportCalendar(week);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <Calendar size={16} />
                      Add to Calendar
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
