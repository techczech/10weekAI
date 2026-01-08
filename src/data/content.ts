export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface Week {
  id: number;
  title: string;
  phase: string;
  description: string;
  tools: string[];
  tasks: Task[];
  keyInsight: string;
  deliverable: string;
  videoStart: number;
}

export const content: Week[] = [
  {
    id: 0,
    title: "Day Zero Setup",
    phase: "Phase 0: Preparation",
    description: "Build the infrastructure so weekends are spent doing, not setting up accounts.",
    tools: ["Claude", "ChatGPT", "Gemini", "NotebookLM", "Gamma", "Lindy", "n8n", "Make", "Replit", "Lovable", "Google AI Studio"],
    keyInsight: "Preparation is key to momentum.",
    deliverable: "Launchpad folder structure and accounts ready.",
    tasks: [
      { id: "0-1", title: "Create Launchpad Folder", description: "Create a 'Launchpad' folder with subfolders for each of the 10 weeks.", completed: false },
      { id: "0-2", title: "Register for Models", description: "Sign up for Claude, ChatGPT, and Gemini.", completed: false },
      { id: "0-3", title: "Register for Info Tools", description: "Sign up for NotebookLM and Gamma.", completed: false },
      { id: "0-4", title: "Register for Automation", description: "Sign up for Lindy, n8n, or Make.", completed: false },
      { id: "0-5", title: "Register for Building", description: "Sign up for Replit, Lovable, or Google AI Studio.", completed: false }
    ],
    videoStart: 155
  },
  {
    id: 1,
    title: "The Vibe Code Kickoff",
    phase: "Phase 1: The Foundations",
    description: "Build a web app that tracks your progress through these 10 weekends.",
    tools: ["Replit Agent", "Lovable", "Cursor"],
    keyInsight: "Prove to yourself you can build functioning software from scratch using natural language.",
    deliverable: "A deployed web app tracking your progress.",
    tasks: [
      { id: "1-1", title: "Prompt the AI", description: "Ask the AI to build a tracker with checkboxes, progress bar, and notes.", completed: false },
      { id: "1-2", title: "Deploy Live", description: "Get your application hosted and accessible via a URL.", completed: false }
    ],
    videoStart: 194
  },
  {
    id: 2,
    title: "The Model Mapping Project",
    phase: "Phase 1: The Foundations",
    description: "Create a 'Personal AI Topography' cheat sheet.",
    tools: ["Claude", "GPT", "Gemini"],
    keyInsight: "Stop using one model for everything; optimize based on strengths.",
    deliverable: "A 'Rules of Thumb' document for model usage.",
    tasks: [
      { id: "2-1", title: "Select 3 Tasks", description: "Choose distinct tasks (e.g., coding, creative writing, strategic reasoning).", completed: false },
      { id: "2-2", title: "Run Comparison", description: "Run the exact same prompt through Claude, GPT, and Gemini.", completed: false },
      { id: "2-3", title: "Create Cheat Sheet", description: "Document which model performed best for each task type.", completed: false }
    ],
    videoStart: 266
  },
  {
    id: 3,
    title: "The Deep Research Sprint",
    phase: "Phase 1: The Foundations",
    description: "Let AI do a week's worth of research in an afternoon.",
    tools: ["Deep Research Features (ChatGPT/Gemini)"],
    keyInsight: "Move from 'AI can generate text' to 'AI can inform decisions'.",
    deliverable: "A 2-page brief with a clear recommendation.",
    tasks: [
      { id: "3-1", title: "Pick a Decision", description: "Choose a real decision (e.g., product pricing, travel planning).", completed: false },
      { id: "3-2", title: "Generate Report", description: "Use deep research features to generate a comprehensive report.", completed: false },
      { id: "3-3", title: "Challenge Findings", description: "Push back on the AI, asking for disconfirming evidence.", completed: false }
    ],
    videoStart: 370
  },
  {
    id: 4,
    title: "The Analysis Project",
    phase: "Phase 2: Visuals & Information",
    description: "Turn messy data into actual decisions.",
    tools: ["ChatGPT (Data Analyst)", "Claude (Analysis)"],
    keyInsight: "You don't need to be a data scientist to get value from data.",
    deliverable: "A cleaned dataset + a one-page insights memo.",
    tasks: [
      { id: "4-1", title: "Gather Data", description: "Get your own data (Spotify, bank statement) or a Kaggle dataset.", completed: false },
      { id: "4-2", title: "Clean & Analyze", description: "Upload data and ask AI to clean it and propose 5 metrics.", completed: false },
      { id: "4-3", title: "Test Hypotheses", description: "Ask the AI to test 3 specific hypotheses on the data.", completed: false }
    ],
    videoStart: 456
  },
  {
    id: 5,
    title: "The Visual Reasoning Project",
    phase: "Phase 2: Visuals & Information",
    description: "Create an infographic or visual explainer.",
    tools: ["Nano Banana Pro", "ChatGPT Images 1.5"],
    keyInsight: "Use AI to *think* visually, not just generate pretty pictures.",
    deliverable: "A diagram or visual explainer used in a presentation.",
    tasks: [
      { id: "5-1", title: "Define Concept", description: "Choose a complex concept to visualize.", completed: false },
      { id: "5-2", title: "Reason Logic", description: "Ask AI to determine the best visual logic (flow chart, matrix, etc.).", completed: false },
      { id: "5-3", title: "Generate Visual", description: "Create the final image using the chosen tool.", completed: false }
    ],
    videoStart: 552
  },
  {
    id: 6,
    title: "The Information Pipeline",
    phase: "Phase 2: Visuals & Information",
    description: "Build a reusable 'Stack' for processing info.",
    tools: ["NotebookLM", "Gamma"],
    keyInsight: "Turn raw, messy inputs into polished outputs without the manual grind.",
    deliverable: "A documented workflow (Summary → FAQ → Presentation Deck).",
    tasks: [
      { id: "6-1", title: "Process Inputs", description: "Feed raw documents into NotebookLM to generate summaries/glossaries.", completed: false },
      { id: "6-2", title: "Generate Output", description: "Feed that output into Gamma to auto-generate a slide deck or website.", completed: false }
    ],
    videoStart: 686
  },
  {
    id: 7,
    title: "The First Automation (Output)",
    phase: "Phase 3: Automation & Systems",
    description: "Build a content distribution or 'output' machine.",
    tools: ["Lindy", "n8n", "Make", "Zapier"],
    keyInsight: "Build a machine that scales your output.",
    deliverable: "One working automation that handles production/distribution.",
    tasks: [
      { id: "7-1", title: "Identify Workflow", description: "Choose a repetitive output task (e.g., Notion -> Tweet).", completed: false },
      { id: "7-2", title: "Build Automation", description: "Implement the workflow using your chosen tool.", completed: false },
      { id: "7-3", title: "Test Run", description: "Verify the automation works end-to-end.", completed: false }
    ],
    videoStart: 826
  },
  {
    id: 8,
    title: "The Second Automation (Input)",
    phase: "Phase 3: Automation & Systems",
    description: "Build a productivity workflow (The 'Catch-all').",
    tools: ["Lindy", "n8n", "Make", "Zapier"],
    keyInsight: "A workflow that manages inputs so you don't have to.",
    deliverable: "A workflow that automates an input stream.",
    tasks: [
      { id: "8-1", title: "Identify Input Stream", description: "Choose an input source (e.g., Calendar, Emails).", completed: false },
      { id: "8-2", title: "Build 'Catch-all'", description: "Create automation (e.g., Meeting Prep Bot).", completed: false }
    ],
    videoStart: 969
  },
  {
    id: 9,
    title: "The Context Engineering Project",
    phase: "Phase 3: Automation & Systems",
    description: "Build your 'Personal AI Operating System'.",
    tools: ["Text Editor"],
    keyInsight: "Stop repeating your context in every new chat.",
    deliverable: "A master context file.",
    tasks: [
      { id: "9-1", title: "Draft Content", description: "Write down your role, bio, writing style, and project details.", completed: false },
      { id: "9-2", title: "Structure File", description: "Organize into a reusable format (Markdown recommended).", completed: false },
      { id: "9-3", title: "Test Context", description: "Paste it into a new chat session and verify improved results.", completed: false }
    ],
    videoStart: 1083
  },
  {
    id: 10,
    title: "The AI-Powered Build",
    phase: "Phase 4: The Build",
    description: "Build an app with AI *inside* it.",
    tools: ["Google AI Studio"],
    keyInsight: "Transition from an AI user to an AI tool builder.",
    deliverable: "A working prototype of an AI-wrapper tool.",
    tasks: [
      { id: "10-1", title: "Design App", description: "Plan an app that uses AI features (e.g., voice agent, specific chatbot).", completed: false },
      { id: "10-2", title: "Build Prototype", description: "Use Google AI Studio to build the application logic.", completed: false },
      { id: "10-3", title: "Deploy/Share", description: "Make the prototype usable.", completed: false }
    ],
    videoStart: 1180
  },
  {
    id: 11,
    title: "The Agent Exploration",
    phase: "Bonus",
    description: "Run an 'Agent Evaluation Gauntlet'.",
    tools: ["Manus", "Jenspark"],
    keyInsight: "Identify tasks safe for autonomous delegation.",
    deliverable: "A scorecard of what tasks are safe to delegate unsupervised.",
    tasks: [
      { id: "11-1", title: "Plan Task", description: "Define a complex task (e.g., Travel Itinerary).", completed: false },
      { id: "11-2", title: "Run Agents", description: "Execute the task using autonomous agents.", completed: false },
      { id: "11-3", title: "Evaluate", description: "Score accuracy vs. hallucination.", completed: false }
    ],
    videoStart: 1261
  }
];