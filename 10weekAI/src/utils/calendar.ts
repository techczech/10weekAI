import { createEvents, EventAttributes } from 'ics';
import { Week } from '../data/content';

export const downloadWeekCalendar = (week: Week, startDate: Date) => {
  const events: EventAttributes[] = week.tasks.map((task, index) => {
    // Distribute tasks over the weekend (Saturday and Sunday)
    // Task 1: Saturday Morning
    // Task 2: Saturday Afternoon
    // Task 3: Sunday Morning
    // If more, distribute evenly.
    
    // Simple logic:
    // Even index -> Saturday
    // Odd index -> Sunday
    // Offset from startDate (assuming startDate is the Saturday)
    
    const dayOffset = index % 2; // 0 for Sat, 1 for Sun
    const hour = 10 + (Math.floor(index / 2) * 4); // 10am, then 2pm (14:00)
    
    const eventDate = new Date(startDate);
    eventDate.setDate(startDate.getDate() + dayOffset);
    
    return {
      start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), hour, 0],
      duration: { hours: 2, minutes: 0 },
      title: `[10WeekAI] ${week.title}: ${task.title}`,
      description: `${task.description}\n\nTools: ${week.tools.join(', ')}\nDeliverable: ${week.deliverable}`,
      location: 'Home / Remote',
      url: window.location.href,
      categories: ['AI', 'Learning', '10WeekAI'],
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      productId: '10WeekAI/1.0',
    };
  });

  createEvents(events, (error, value) => {
    if (error) {
      console.error(error);
      alert('Error creating calendar event');
      return;
    }

    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `10WeekAI-Week${week.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};
