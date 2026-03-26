"use client"

import { useRouter } from "next/navigation"
import { FileText, Users, Brain, CheckCircle2, Circle, Calendar, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface JobCardProps {
  job: {
    id: string
    company: string
    role: string
    status: string
    createdAt: string
    hasResume: boolean
    hasNetworking: boolean
    hasCareer: boolean
    matchRate: number | null
  }
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter()

  function openTool(href: string) {
    localStorage.setItem("activeJobId", job.id)
    router.push(href)
  }

  function setActive() {
    localStorage.setItem("activeJobId", job.id)
  }

  const tools = [
    { key: "resume", label: "Resume", href: "/resume", icon: FileText, done: job.hasResume, color: "text-orange-400" },
    { key: "networking", label: "Network", href: "/networking", icon: Users, done: job.hasNetworking, color: "text-orange-400" },
    { key: "career", label: "Coach", href: "/career", icon: Brain, done: job.hasCareer, color: "text-orange-400" },
  ]

  return (
    <div
      className="group border border-white/8 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] hover:border-orange-500/20 transition-all duration-200 overflow-hidden"
      onClick={setActive}
    >
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-600/30 to-orange-600/30 border border-orange-500/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-orange-300">
            {job.company?.[0]?.toUpperCase() ?? "?"}
          </div>
          {job.matchRate !== null && (
            <Badge variant="outline" className="text-green-400 border-green-500/30 text-xs">
              {job.matchRate}% match
            </Badge>
          )}
        </div>

        <h3 className="font-semibold text-white text-sm truncate">{job.role}</h3>
        <p className="text-xs text-orange-300 font-medium mt-0.5 truncate">{job.company}</p>

        <div className="flex items-center gap-1.5 mt-2">
          <Calendar size={11} className="text-gray-600" />
          <span className="text-xs text-gray-500">{formatDate(job.createdAt)}</span>
        </div>
      </div>

      {/* Tool status */}
      <div className="border-t border-white/5 px-5 py-3">
        <div className="flex items-center gap-1">
          {tools.map(({ key, label, href, icon: Icon, done, color }) => (
            <button
              key={key}
              onClick={(e) => { e.stopPropagation(); openTool(href) }}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-xs font-medium transition-all",
                done
                  ? "bg-white/5 hover:bg-white/10"
                  : "hover:bg-white/5 text-gray-500"
              )}
              title={done ? `View ${label}` : `Generate ${label}`}
            >
              <div className="relative">
                <Icon size={16} className={done ? color : "text-gray-600"} />
                {done && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 size={8} className="text-white" />
                  </div>
                )}
              </div>
              <span className={done ? "text-gray-300" : "text-gray-600"}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Open button */}
      <div className="border-t border-white/5 px-5 py-3">
        <button
          onClick={(e) => { e.stopPropagation(); openTool("/resume") }}
          className="w-full flex items-center justify-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ExternalLink size={11} />
          Open in tools
        </button>
      </div>
    </div>
  )
}
