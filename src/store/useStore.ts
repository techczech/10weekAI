import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  completedTasks: string[];
  toggleTask: (taskId: string) => void;
  resetProgress: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      completedTasks: [],
      toggleTask: (taskId) =>
        set((state) => {
          const isCompleted = state.completedTasks.includes(taskId);
          return {
            completedTasks: isCompleted
              ? state.completedTasks.filter((id) => id !== taskId)
              : [...state.completedTasks, taskId],
          };
        }),
      resetProgress: () => set({ completedTasks: [] }),
    }),
    {
      name: '10weekai-storage',
    }
  )
);
