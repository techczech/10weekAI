// Placeholder for future API integration

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export const api = {
  // Simulate fetching user profile
  getUserProfile: async (): Promise<UserProfile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'user_123',
          name: 'AI Learner',
          email: 'learner@example.com',
        });
      }, 500);
    });
  },

  // Simulate syncing progress to a backend
  syncProgress: async (completedTasks: string[]): Promise<{ success: boolean }> => {
    console.log('Syncing progress to backend:', completedTasks);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 800);
    });
  },
};
