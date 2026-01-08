import { createEvents, EventAttributes } from 'ics';
import { Week, content } from '../data/content';

export const downloadWeekCalendar = (week: Week, startDate: Date) => {
  const events: EventAttributes[] = week.tasks.map((task, index) => {
    const dayOffset = index % 2; // 0 for Sat, 1 for Sun
    const hour = 10 + (Math.floor(index / 2) * 4); // 10am, then 2pm
    
    const eventDate = new Date(startDate);
    eventDate.setDate(startDate.getDate() + dayOffset);
    
    return {
      start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), hour, 0],
      duration: { hours: 2, minutes: 0 },
      title: `[10WeekAI] ${week.title}: ${task.title}`,
      description: `${task.description}\n\nTools: ${week.tools.join(', ')}\nDeliverable: ${week.deliverable}`,
      location: 'Home / Remote',
      url: `${window.location.origin}/week/${week.id}`,
      categories: ['AI', 'Learning', '10WeekAI'],
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      productId: '10WeekAI/1.0',
    };
  });

  generateIcs(events, `10WeekAI-Week${week.id}.ics`);
};

export const downloadFullCourseCalendar = (startDate: Date, selectedDays: number[]) => {
  // Logic:
  // 1. Find the first occurrence of one of the selected days on or after startDate. This is the anchor.
  // 2. Determine the dates for the first week based on that anchor.
  //    Actually, simpler: Find the next occurrence of EACH selected day starting from startDate.
  //    Sort those dates. That is the pattern for Week 0.
  //    Week 1 is those dates + 7 days, etc.
  
  // Example: Start Wed. Days: [Tue, Thu].
  // Next Thu is tomorrow (D1). Next Tue is next week (D2).
  // Week 0 Dates: [D1, D2].
  
  if (selectedDays.length === 0) {
    alert("Please select at least one day of the week.");
    return;
  }

  // Helper to find next occurrence of a specific day of week (0-6) on or after a date
  const getNextDayOfWeek = (date: Date, dayOfWeek: number) => {
    const resultDate = new Date(date.getTime());
    resultDate.setHours(10, 0, 0, 0); // Default to 10 AM
    
    const currentDay = resultDate.getDay();
    let distance = dayOfWeek - currentDay;
    if (distance < 0) {
      distance += 7;
    }
    resultDate.setDate(resultDate.getDate() + distance);
    return resultDate;
  };

  // Calculate the specific dates for "Week 0"
  // We want the sequence to be chronological starting from startDate.
  // But strictly repeating weekly.
  // So if we pick [Sat, Sun] and start on Friday:
  // Sat is +1. Sun is +2. -> Order: Sat, Sun.
  // If we pick [Sat, Sun] and start on Sunday:
  // Sun is +0. Sat is +6. -> Order: Sun, Sat. (This might be weird for a "weekend" concept but is correct chronologically)
  
  const week0Dates = selectedDays.map(day => getNextDayOfWeek(startDate, day));
  week0Dates.sort((a, b) => a.getTime() - b.getTime());

  const allEvents: EventAttributes[] = [];

  content.forEach((week) => {
    week.tasks.forEach((task, taskIndex) => {
      // Round robin assign tasks to the available days in the week
      const dayIndex = taskIndex % week0Dates.length;
      const baseDate = week0Dates[dayIndex];
      
      // Calculate actual date: Base Date + (Week ID * 7 days)
      const eventDate = new Date(baseDate.getTime());
      eventDate.setDate(eventDate.getDate() + (week.id * 7));

      // Stagger times if multiple tasks on same day? 
      // With round robin, we might loop back to the same day if tasks > days.
      // E.g. 3 tasks, 2 days. Task 0->Day0, Task 1->Day1, Task 2->Day0.
      // We should offset the time for Task 2.
      const tasksPerDaySoFar = Math.floor(taskIndex / week0Dates.length);
      const hour = 10 + (tasksPerDaySoFar * 4); // 10am, 2pm, 6pm...

      allEvents.push({
        start: [eventDate.getFullYear(), eventDate.getMonth() + 1, eventDate.getDate(), hour, 0],
        duration: { hours: 2, minutes: 0 },
        title: `[10WeekAI] ${week.title}: ${task.title}`,
        description: `${task.description}\n\nTools: ${week.tools.join(', ')}\nDeliverable: ${week.deliverable}`,
        location: 'Home / Remote',
        url: `${window.location.origin}/week/${week.id}`,
        categories: ['AI', 'Learning', '10WeekAI'],
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        productId: '10WeekAI/1.0',
      });
    });
  });

  generateIcs(allEvents, '10WeekAI-FullCourse.ics');
};

const generateIcs = (events: EventAttributes[], filename: string) => {
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
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
};