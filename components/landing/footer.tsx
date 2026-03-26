import { Briefcase } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-600 to-orange-600 flex items-center justify-center">
              <Briefcase size={14} className="text-white" />
            </div>
            <span className="font-bold text-white">JobsAI</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-gray-500">
            <span>AI-powered job search platform</span>
          </div>

          <p className="text-sm text-gray-600">
            © 2026 JobsAI. Built with Claude AI.
          </p>
        </div>
      </div>
    </footer>
  )
}
