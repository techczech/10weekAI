import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Github, Menu, X, CheckCircle2, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { content } from '../data/content';
import { useStore } from '../store/useStore';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { completedTasks } = useStore();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/curriculum', icon: BookOpen, label: 'Curriculum' },
    { to: '/about', icon: Info, label: 'About' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          10WeekAI
        </h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-10 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 flex flex-col",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 hidden md:block flex-shrink-0">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            10WeekAI
          </h1>
          <p className="text-xs text-gray-500 mt-1">2026 Resolution</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 md:py-0">
          <nav className="space-y-1 mb-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  )
                }
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="px-4 mb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Weekly Plan
            </h3>
          </div>

          <nav className="space-y-0.5">
            {content.map((week) => {
              const weekCompletedTasks = week.tasks.filter(t => completedTasks.includes(t.id)).length;
              const isWeekComplete = weekCompletedTasks === week.tasks.length && week.tasks.length > 0;
              
              return (
                <NavLink
                  key={week.id}
                  to={`/week/${week.id}`}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors group",
                      isActive
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className={clsx(
                        "flex-shrink-0",
                        isWeekComplete ? "text-green-500" : (isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500")
                      )}>
                        {isWeekComplete ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <span className="w-4 h-4 flex items-center justify-center text-[10px] font-bold border rounded-full border-current">
                            {week.id}
                          </span>
                        )}
                      </span>
                      <span className="truncate">{week.title}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t bg-gray-50 flex-shrink-0">
          <a
            href="https://github.com/dominiklukes/cloudflaresites"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900"
          >
            <Github size={14} />
            View Source
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}