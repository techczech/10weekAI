import { content } from '../data/content';
import { useStore } from '../store/useStore';
import { CheckCircle2, Circle, Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { completedTasks } = useStore();
  
  const totalTasks = content.reduce((acc, week) => acc + week.tasks.length, 0);
  const completedCount = completedTasks.length;
  const progress = Math.round((completedCount / totalTasks) * 100);

  const nextUp = content.find(week => 
    week.tasks.some(task => !completedTasks.includes(task.id))
  ) || content[content.length - 1];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome & Progress */}
      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome to Your AI Journey</h2>
            <p className="text-gray-500 mt-1">2026 is the year of AI fluency.</p>
          </div>
          <div className="flex items-center gap-3 bg-indigo-50 px-5 py-2.5 rounded-full border border-indigo-100">
            <Trophy className="text-indigo-600" size={20} />
            <span className="font-bold text-indigo-900">{progress}% Complete</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Video Embed */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-900 shadow-xl ring-1 ring-gray-900/10">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/EhQeGgZxdHU?si=start_radio=1" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm text-gray-400 mt-3 text-center">
          Based on "How to Learn AI in 2025" by Nathaniel Whitmore. Vibecoded by Dominik Lukes.
        </p>
      </section>

      {/* Up Next Card */}
      <section className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-800/50 border border-indigo-700 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-3">
                Up Next
              </span>
              <h3 className="text-3xl md:text-4xl font-bold">{nextUp.title}</h3>
              <p className="text-indigo-200 mt-2 text-lg max-w-2xl">{nextUp.description}</p>
            </div>
            
            <Link 
              to={`/week/${nextUp.id}`}
              className="shrink-0 flex items-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Week {nextUp.id} <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="space-y-3 bg-white/10 rounded-xl p-6 backdrop-blur-md border border-white/10">
            <h4 className="text-indigo-200 text-sm font-semibold uppercase mb-2">This Week's Tasks</h4>
            {nextUp.tasks.map(task => {
              const isCompleted = completedTasks.includes(task.id);
              return (
                <div key={task.id} className="flex items-start gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={20} />
                  ) : (
                    <Circle className="text-indigo-300 shrink-0 mt-0.5" size={20} />
                  )}
                  <span className={isCompleted ? "text-indigo-200 line-through" : "text-white font-medium"}>
                    {task.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}