import { content } from '../data/content';
import { useStore } from '../store/useStore';
import { CheckCircle2, Circle, Trophy } from 'lucide-react';
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
    <div className="space-y-8">
      {/* Welcome & Progress */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome to Your AI Journey</h2>
            <p className="text-gray-500">2026 is the year of AI fluency.</p>
          </div>
          <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-full">
            <Trophy className="text-indigo-600" size={20} />
            <span className="font-semibold text-indigo-900">{progress}% Complete</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Video Embed */}
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-900 shadow-lg">
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
        <p className="text-sm text-gray-500 mt-2 text-center">
          Based on "How to Learn AI in 2025" by Nathaniel Whitmore. Vibecoded by Dominik Lukes.
        </p>
      </section>

      {/* Up Next Card */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
        <div className="mb-4">
          <span className="text-indigo-200 text-sm font-semibold uppercase tracking-wider">Up Next</span>
          <h3 className="text-3xl font-bold mt-1">{nextUp.title}</h3>
          <p className="text-indigo-100 mt-2">{nextUp.description}</p>
        </div>
        
        <div className="space-y-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
          {nextUp.tasks.map(task => {
            const isCompleted = completedTasks.includes(task.id);
            return (
              <div key={task.id} className="flex items-start gap-3">
                {isCompleted ? (
                  <CheckCircle2 className="text-green-400 shrink-0 mt-0.5" size={20} />
                ) : (
                  <Circle className="text-indigo-300 shrink-0 mt-0.5" size={20} />
                )}
                <span className={isCompleted ? "text-indigo-200 line-through" : "text-white"}>
                  {task.title}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6">
           <Link 
             to={`/curriculum?week=${nextUp.id}`}
             className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
           >
             Start Week {nextUp.id}
           </Link>
        </div>
      </section>
    </div>
  );
}
