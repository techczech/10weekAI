import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Info, ArrowRight } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-12">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 pt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          How to Learn AI in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">2026</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A structured 10-weekend curriculum to go from beginner to AI fluency.
          Based on the guide by Nathaniel Whittemore from <a href="https://aidailybrief.beehiiv.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">The AI Daily Brief</a> podcast.
        </p>
      </div>

      {/* Video Section - Centered */}
      <div className="max-w-4xl mx-auto">
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-gray-900 shadow-2xl ring-4 ring-gray-50">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/EhQeGgZxdHU?start=0" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-3 text-center">
        Based on "How to Learn AI in 2025" by Nathaniel Whittemore. Vibecoded by Dominik Lukes.
      </p>

      {/* Navigation Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link 
          to="/curriculum" 
          className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all text-center flex flex-col items-center"
        >
          <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">The Curriculum</h2>
          <p className="text-gray-500 mb-6">Access the detailed 10-week plan with tasks, tools, and deliverables.</p>
          <span className="text-indigo-600 font-semibold flex items-center gap-2 mt-auto">
            Start Learning <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link 
          to="/calendar" 
          className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all text-center flex flex-col items-center"
        >
          <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
            <Calendar size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sync Calendar</h2>
          <p className="text-gray-500 mb-6">Generate a custom schedule for your 10-week journey and export to .ics.</p>
          <span className="text-purple-600 font-semibold flex items-center gap-2 mt-auto">
            Plan Your Schedule <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link 
          to="/about" 
          className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all text-center flex flex-col items-center"
        >
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
            <Info size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">About Project</h2>
          <p className="text-gray-500 mb-6">Learn how this site was "vibecoded" in 15 minutes using Gemini CLI.</p>
          <span className="text-blue-600 font-semibold flex items-center gap-2 mt-auto">
            Read the Story <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
}
