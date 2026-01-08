import { useState } from 'react';
import { Download, CalendarDays, CheckCircle2 } from 'lucide-react';
import { downloadFullCourseCalendar } from '../utils/calendar';

export function CalendarPage() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedDays, setSelectedDays] = useState<number[]>([6, 0]); // Default Sat (6), Sun (0)

  const daysOfWeek = [
    { id: 1, label: 'Monday' },
    { id: 2, label: 'Tuesday' },
    { id: 3, label: 'Wednesday' },
    { id: 4, label: 'Thursday' },
    { id: 5, label: 'Friday' },
    { id: 6, label: 'Saturday' },
    { id: 0, label: 'Sunday' },
  ];

  const handleDayToggle = (dayId: number) => {
    setSelectedDays(prev => 
      prev.includes(dayId)
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleGenerate = () => {
    downloadFullCourseCalendar(new Date(startDate), selectedDays);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Course Calendar</h1>
        <p className="text-xl text-gray-600">
          Sync the entire 10-week curriculum to your personal calendar.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">
              The schedule will begin on or after this date.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Work Days
            </label>
            <div className="grid grid-cols-2 gap-2">
              {daysOfWeek.map(day => (
                <button
                  key={day.id}
                  onClick={() => handleDayToggle(day.id)}
                  className={`
                    flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium border transition-all
                    ${selectedDays.includes(day.id)
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={selectedDays.length === 0}
            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Download .ics File
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-100 flex flex-col justify-center">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <CalendarDays className="text-indigo-600" />
            How it works
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex gap-2">
              <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
              <span>Generates a single calendar file for all 10 weeks.</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
              <span>Automatically distributes tasks across your selected work days.</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
              <span>Includes direct links to the curriculum and video guides for each task.</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
              <span>Compatible with Google Calendar, Apple Calendar, Outlook, etc.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
