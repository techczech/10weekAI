import { Github, Code2, Cpu, Zap, ExternalLink } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">About This Project</h1>
        <p className="text-xl text-gray-600">
          A quick solution built for the community when the original site was down.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Code2 className="text-indigo-600" /> How It Was Made
        </h2>
        
        <div className="prose prose-indigo max-w-none text-gray-600 space-y-4">
          <p>
            This website was created by <strong>Dominik Lukeš</strong> as a "vibecoded" prototype to help people follow the 10-Weekend AI Resolution plan. 
          </p>
          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-4">
            <h3 className="font-bold text-gray-900 mt-0">The 15-Minute Workflow:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                <strong>Content Extraction:</strong> I listened to <a href="https://aidailybrief.beehiiv.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">The AI Daily Brief</a> podcast, shared the <a href="https://www.youtube.com/watch?v=EhQeGgZxdHU" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">YouTube video</a> link with <strong>Google AI Studio</strong>, and asked for an overview of the weeks with specific timecodes as outlined by <strong>Nathaniel Whittemore</strong>.
              </li>
              <li>
                <strong>Vibecoding:</strong> I started the <strong>Gemini CLI</strong> on my local machine and pasted the instructions. The CLI coded the entire React application in approximately 5 prompts.
              </li>
              <li>
                <strong>Repository:</strong> Created a GitHub repository and pushed the generated code.
              </li>
              <li>
                <strong>Deployment:</strong> Connected the GitHub repo to <strong>Cloudflare Pages</strong> for automatic deployment.
              </li>
            </ol>
          </div>

          <p className="flex items-center gap-2 font-medium text-gray-900">
            <Zap className="text-yellow-500 fill-yellow-500" size={18} />
            Total cost: $0. Total time: ~15 minutes.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-indigo-900 rounded-2xl p-8 text-white space-y-4">
          <Cpu size={32} className="text-indigo-300" />
          <h3 className="text-xl font-bold">Why build this?</h3>
          <p className="text-indigo-100 text-sm leading-relaxed">
            The official website was experiencing errors, and I wanted a clean, interactive way to track progress, 
            export tasks to my calendar, and have the video reference right next to the exercises.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-4">
          <Github size={32} className="text-gray-900" />
          <h3 className="text-xl font-bold">Open Source</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            The code for this entire platform is available on GitHub. Feel free to fork it or use it as a template for your own AI-generated sites.
          </p>
          <a 
            href="https://github.com/dominiklukes/cloudflaresites" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline"
          >
            View Repository <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400">
        Built with Gemini CLI, React, Tailwind, and Zustand.
      </div>
    </div>
  );
}
