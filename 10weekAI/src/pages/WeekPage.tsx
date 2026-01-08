import { useParams, Link } from 'react-router-dom';
import { content } from '../data/content';
import { useStore } from '../store/useStore';
import { downloadWeekCalendar } from '../utils/calendar';
import { CheckSquare, Square, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export function WeekPage() {
  const { id } = useParams<{ id: string }>();
  const weekId = parseInt(id || '0', 10);
  const week = content.find(w => w.id === weekId);
  const { completedTasks, toggleTask } = useStore();

  if (!week) {
    return <div>Week not found</div>;
  }

  const prevWeek = content.find(w => w.id === weekId - 1);
  const nextWeek = content.find(w => w.id === weekId + 1);

  const handleExportCalendar = () => {
    const d = new Date();
    d.setDate(d.getDate() + (6 + 7 - d.getDay()) % 7);
    const confirm = window.confirm(`Generate calendar events for Week ${week.id} starting this coming Saturday (${d.toDateString()})?`);
    if (confirm) {
      downloadWeekCalendar(week, d);
    }
  };

  const weekCompletedTasks = week.tasks.filter(t => completedTasks.includes(t.id)).length;
  const progress = Math.round((weekCompletedTasks / week.tasks.length) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link to="/curriculum" className="text-gray-500 hover:text-indigo-600 flex items-center gap-2">
           <ArrowLeft size={16} /> Back to Curriculum
        </Link>
        <div className="flex gap-2">
          {prevWeek && (
            <Link 
              to={`/week/${prevWeek.id}`}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Previous
            </Link>
          )}
          {nextWeek && (
            <Link 
              to={`/week/${nextWeek.id}`}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              Next <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Header Content */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
          {week.phase}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">{week.title}</h1>
        <p className="text-xl text-gray-600 leading-relaxed">{week.description}</p>
        
        <div className="mt-6 flex flex-wrap gap-2">
          {week.tools.map(tool => (
            <span key={tool} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-900 shadow-lg">
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/EhQeGgZxdHU?start=${week.videoStart}&autoplay=0`}
          title={`Week ${week.id} Video Guide`}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Tasks */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold text-gray-900">Action Plan</h2>
               <span className="text-sm font-medium text-gray-500">{progress}% Complete</span>
             </div>
             
             {/* Progress Bar */}
             <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
             </div>

             <div className="space-y-4">
               {week.tasks.map(task => {
                  const isChecked = completedTasks.includes(task.id);
                  return (
                    <div 
                      key={task.id} 
                      className={clsx(
                        "flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer group",
                        isChecked ? "bg-green-50 border-green-200" : "bg-white border-gray-100 hover:border-indigo-300 hover:shadow-md"
                      )}
                      onClick={() => toggleTask(task.id)}
                    >
                      <button className={clsx("mt-1 transition-colors", isChecked ? "text-green-600" : "text-gray-300 group-hover:text-indigo-400")}>
                        {isChecked ? <CheckSquare size={24} /> : <Square size={24} />}
                      </button>
                      <div>
                        <h3 className={clsx("font-semibold text-lg", isChecked ? "text-green-900" : "text-gray-900")}>
                          {task.title}
                        </h3>
                        <p className={clsx("mt-1", isChecked ? "text-green-700" : "text-gray-500")}>
                          {task.description}
                        </p>
                      </div>
                    </div>
                  );
               })}
             </div>
          </div>
        </div>

        {/* Right Column: Key Details */}
        <div className="space-y-6">
          <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-2">Key Insight</h3>
            <p className="text-indigo-800 italic leading-relaxed">"{week.keyInsight}"</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Deliverable</h3>
            <p className="text-gray-600">{week.deliverable}</p>
          </div>

          <button 
            onClick={handleExportCalendar}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-indigo-100 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 hover:border-indigo-200 transition-all"
          >
            <Calendar size={20} />
            Schedule This Week
          </button>
        </div>
      </div>
    </div>
  );
}
