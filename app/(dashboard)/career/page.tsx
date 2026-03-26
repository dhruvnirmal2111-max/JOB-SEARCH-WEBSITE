"use client"

import { useState, useEffect } from "react"
import { FileUpload } from "@/components/ui/file-upload"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useActiveJob } from "@/hooks/use-active-job"
import {
  Brain, Sparkles, Loader2, TrendingUp, BookOpen,
  MessageSquare, ChevronDown, ChevronUp, Clock,
  AlertTriangle, CheckCircle2, Zap, Target, Building2, RotateCcw,
  Youtube
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillGap {
  skill: string
  importance: "critical" | "high" | "medium"
  category: "technical" | "domain" | "soft_skill" | "experience"
  yourLevel: string
  requiredLevel: string
  gap: string
}

interface LearningResource {
  title: string
  type: string
  duration?: string
  why?: string
  url?: string
}

interface LearningItem {
  skill: string
  priority: number
  timeframe: string
  resources: LearningResource[]
}

interface InterviewQ {
  question: string
  tips: string
  suggestedExperience?: string
}

interface CareerResult {
  company: string
  role: string
  overallReadiness: number
  summary: string
  totalPrepTime: string
  skillGaps: SkillGap[]
  learningPlan: LearningItem[]
  interviewQuestions: {
    technical: InterviewQ[]
    domain: InterviewQ[]
    systemDesign: InterviewQ[]
    behavioral: InterviewQ[]
  }
}

const LEVELS = ["none", "beginner", "intermediate", "advanced", "expert"]
const LEVEL_PCT: Record<string, number> = {
  none: 0, beginner: 20, intermediate: 45, advanced: 72, expert: 100
}
const LEVEL_COLOR: Record<string, string> = {
  none: "bg-gray-600",
  beginner: "bg-red-500",
  intermediate: "bg-amber-500",
  advanced: "bg-blue-500",
  expert: "bg-green-500",
}

const IMPORTANCE_META = {
  critical: { color: "text-red-400 border-red-500/30 bg-red-500/10", icon: AlertTriangle, label: "Critical" },
  high: { color: "text-amber-400 border-amber-500/30 bg-amber-500/10", icon: Zap, label: "High" },
  medium: { color: "text-blue-400 border-blue-500/30 bg-blue-500/10", icon: Target, label: "Medium" },
}

const INTERVIEW_TABS = [
  { key: "technical" as const, label: "Technical", color: "text-orange-400" },
  { key: "domain" as const, label: "Domain", color: "text-orange-400" },
  { key: "systemDesign" as const, label: "System Design", color: "text-blue-400" },
  { key: "behavioral" as const, label: "Behavioral", color: "text-green-400" },
]

type MainTab = "gaps" | "plan" | "interview"

export default function CareerPage() {
  const { jobId, ready } = useActiveJob()
  const [resumeText, setResumeText] = useState("")
  const [jdText, setJdText] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [result, setResult] = useState<CareerResult | null>(null)
  const [cached, setCached] = useState(false)
  const [error, setError] = useState("")
  const [mainTab, setMainTab] = useState<MainTab>("gaps")
  const [interviewTab, setInterviewTab] = useState<"technical" | "domain" | "systemDesign" | "behavioral">("technical")
  const [expandedQ, setExpandedQ] = useState<string | null>(null)
  const [expandedPlan, setExpandedPlan] = useState<number | null>(0)

  useEffect(() => {
    if (!ready || !jobId) return
    setFetching(true)
    // Pre-fill JD and resume from job
    fetch(`/api/jobs/${jobId}`)
      .then(r => r.ok ? r.json() : null)
      .then(job => {
        if (job?.jdText) setJdText(job.jdText)
        const savedResume = localStorage.getItem(`job_resume_${jobId}`)
        if (savedResume) setResumeText(savedResume)
        else if (job?.resumeText) setResumeText(job.resumeText)
      })
      .catch(() => {})
    // Load cached career result
    fetch(`/api/career?jobId=${jobId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) { setResult(data); setCached(true) }
      })
      .catch(() => {})
      .finally(() => setFetching(false))
  }, [jobId, ready])

  async function handleAnalyze() {
    if (!resumeText.trim()) { setError("Please upload or paste your resume."); return }
    if (!jdText.trim()) { setError("Please paste the job description."); return }
    setLoading(true); setError(""); setResult(null); setCached(false)

    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jdText, jobId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed")
      setResult(data)
      setCached(!!data.cached)
      setMainTab("gaps")
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const readinessColor =
    !result ? "from-gray-600 to-gray-700"
    : result.overallReadiness >= 75 ? "from-green-500 to-emerald-600"
    : result.overallReadiness >= 50 ? "from-amber-500 to-orange-500"
    : "from-red-500 to-rose-600"

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-lg bg-orange-600/20 border border-orange-500/20 flex items-center justify-center">
              <Brain size={18} className="text-orange-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Career Coach</h1>
          </div>
          <p className="text-gray-400 text-sm ml-12">
            Upload your resume + paste a JD → skill gap analysis, personalized learning plan, and interview prep.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {cached && (
            <Badge variant="outline" className="text-green-400 border-green-500/30 text-xs">
              Cached
            </Badge>
          )}
          {fetching && <Loader2 size={16} className="animate-spin text-gray-500" />}
          {result && (
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => { setResult(null); setCached(false) }}>
              <RotateCcw size={13} /> Re-analyze
            </Button>
          )}
        </div>
      </div>

      {/* Inputs */}
      {!result && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <FileUpload
            label="Your Resume (PDF or TXT)"
            onTextExtracted={(text) => setResumeText(text)}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">Target Job Description</label>
            <Textarea
              placeholder="Paste the job description…"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              className="h-[185px] font-mono text-xs"
            />
          </div>
        </div>
      )}

      {result && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/8">
          <div className="text-sm text-gray-400">
            Coaching for <span className="text-white font-medium">{result.role}</span> at{" "}
            <span className="text-orange-300 font-medium">{result.company}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { setResult(null); setCached(false) }}>
            Re-analyze
          </Button>
        </div>
      )}

      {error && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</p>
      )}

      {!result && (
        <Button onClick={handleAnalyze} variant="gradient" size="lg" disabled={loading} className="gap-2">
          {loading
            ? <><Loader2 size={18} className="animate-spin" /> Analyzing with Claude…</>
            : <><Sparkles size={18} /> Analyze My Profile</>
          }
        </Button>
      )}

      {/* RESULTS */}
      {result && (
        <div className="space-y-6">
          {/* Readiness banner */}
          <div className={cn(
            "relative overflow-hidden rounded-2xl border border-white/10 p-6",
            "bg-gradient-to-r from-orange-600/15 via-orange-600/10 to-blue-600/15"
          )}>
            <div className="flex items-center gap-8">
              {/* Donut */}
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="14" fill="none"
                    stroke="url(#cg)" strokeWidth="3.5"
                    strokeDasharray={`${(result.overallReadiness / 100) * 88} ${88 - (result.overallReadiness / 100) * 88}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="cg" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={result.overallReadiness >= 75 ? "#22c55e" : result.overallReadiness >= 50 ? "#f59e0b" : "#ef4444"} />
                      <stop offset="100%" stopColor={result.overallReadiness >= 75 ? "#10b981" : result.overallReadiness >= 50 ? "#f97316" : "#f43f5e"} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-white">{result.overallReadiness}%</span>
                  <span className="text-[9px] text-gray-400">ready</span>
                </div>
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 size={16} className="text-orange-300" />
                  <h2 className="text-lg font-bold text-white">{result.role} @ {result.company}</h2>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{result.summary}</p>
              </div>

              {/* Stats */}
              <div className="flex-shrink-0 flex flex-col gap-3 text-right hidden lg:flex">
                <div>
                  <p className="text-2xl font-bold text-white">{result.skillGaps.length}</p>
                  <p className="text-xs text-gray-400">Skill Gaps</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{result.totalPrepTime}</p>
                  <p className="text-xs text-gray-400">Prep Time</p>
                </div>
              </div>
            </div>

            {/* Gap severity bar */}
            <div className="mt-5 flex gap-2 items-center">
              {[
                { key: "critical", count: result.skillGaps.filter(g => g.importance === "critical").length, color: "bg-red-500" },
                { key: "high", count: result.skillGaps.filter(g => g.importance === "high").length, color: "bg-amber-500" },
                { key: "medium", count: result.skillGaps.filter(g => g.importance === "medium").length, color: "bg-blue-500" },
              ].map(({ key, count, color }) => count > 0 && (
                <div key={key} className="flex items-center gap-1.5">
                  <div className={cn("w-2 h-2 rounded-full", color)} />
                  <span className="text-xs text-gray-400">{count} {key}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main tabs */}
          <div className="flex gap-1 p-1 bg-white/5 rounded-lg w-fit">
            {[
              { id: "gaps" as const, label: "Skill Gaps", icon: AlertTriangle, count: result.skillGaps.length },
              { id: "plan" as const, label: "Learning Plan", icon: BookOpen, count: result.learningPlan.length },
              { id: "interview" as const, label: "Interview Prep", icon: MessageSquare, count: 16 },
            ].map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                onClick={() => setMainTab(id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                  mainTab === id ? "bg-orange-600 text-white" : "text-gray-400 hover:text-white"
                )}
              >
                <Icon size={14} />
                {label}
                <span className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full",
                  mainTab === id ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"
                )}>{count}</span>
              </button>
            ))}
          </div>

          {/* SKILL GAPS TAB */}
          {mainTab === "gaps" && (
            <div className="space-y-3">
              {result.skillGaps.length === 0 ? (
                <div className="text-center py-12">
                  <CheckCircle2 size={40} className="text-green-400 mx-auto mb-3" />
                  <p className="text-white font-semibold">No significant gaps found!</p>
                  <p className="text-gray-400 text-sm mt-1">You look well-prepared for this role.</p>
                </div>
              ) : (
                result.skillGaps.map((gap, i) => {
                  const meta = IMPORTANCE_META[gap.importance]
                  const ImpIcon = meta.icon
                  const yourPct = LEVEL_PCT[gap.yourLevel] ?? 0
                  const reqPct = LEVEL_PCT[gap.requiredLevel] ?? 50
                  const yourIdx = LEVELS.indexOf(gap.yourLevel)
                  const reqIdx = LEVELS.indexOf(gap.requiredLevel)

                  return (
                    <div key={i} className="border border-white/8 rounded-xl p-5 bg-white/[0.02]">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-white">{gap.skill}</h3>
                            <Badge variant="outline" className={cn("text-xs border", meta.color)}>
                              <ImpIcon size={10} className="mr-1" />
                              {meta.label}
                            </Badge>
                            <Badge variant="outline" className="text-xs text-gray-500 border-white/10">
                              {gap.category.replace("_", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{gap.gap}</p>
                        </div>
                      </div>

                      {/* Level bars */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-20 flex-shrink-0">Your level</span>
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={cn("h-full rounded-full transition-all", LEVEL_COLOR[gap.yourLevel] ?? "bg-gray-600")}
                              style={{ width: `${yourPct}%` }}
                            />
                          </div>
                          <span className={cn("text-xs font-medium w-20 flex-shrink-0", yourIdx < reqIdx ? "text-red-400" : "text-green-400")}>
                            {gap.yourLevel}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-20 flex-shrink-0">Required</span>
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white/30 rounded-full"
                              style={{ width: `${reqPct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-20 flex-shrink-0">{gap.requiredLevel}</span>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          )}

          {/* LEARNING PLAN TAB */}
          {mainTab === "plan" && (
            <div className="space-y-3">
              {/* Total time estimate */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/8 mb-2">
                <Clock size={16} className="text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Estimated total prep time: {result.totalPrepTime}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Focus on critical and high priority items first</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[22px] top-10 bottom-6 w-px bg-white/10" />

                {result.learningPlan.map((item, i) => (
                  <div key={i} className="relative flex gap-4 pb-4">
                    {/* Step dot */}
                    <div className={cn(
                      "w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 text-sm font-bold",
                      i === 0 ? "bg-orange-600 border-orange-500 text-white" :
                      i === 1 ? "bg-orange-600/50 border-orange-500/50 text-white" :
                      "bg-white/5 border-white/15 text-gray-400"
                    )}>
                      {item.priority}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div
                        className={cn(
                          "border rounded-xl overflow-hidden transition-all",
                          expandedPlan === i ? "border-orange-500/30" : "border-white/8"
                        )}
                      >
                        {/* Header */}
                        <div
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/3 transition-colors"
                          onClick={() => setExpandedPlan(expandedPlan === i ? null : i)}
                        >
                          <div>
                            <h3 className="font-semibold text-white">{item.skill}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock size={11} /> {item.timeframe}
                              </span>
                              <span className="text-xs text-gray-500">{item.resources.length} resource{item.resources.length !== 1 ? "s" : ""}</span>
                            </div>
                          </div>
                          {expandedPlan === i ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
                        </div>

                        {/* Resources */}
                        {expandedPlan === i && (
                          <div className="border-t border-white/8 p-4 space-y-3">
                            {item.resources.map((r, j) => (
                              <div key={j} className="flex items-start gap-3 p-3 rounded-lg bg-white/3">
                                <div className={cn(
                                  "px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider flex-shrink-0 mt-0.5",
                                  r.type === "book" ? "bg-amber-500/20 text-amber-400" :
                                  r.type === "course" ? "bg-orange-500/20 text-orange-400" :
                                  r.type === "practice" ? "bg-green-500/20 text-green-400" :
                                  r.type === "project" ? "bg-orange-500/20 text-orange-400" :
                                  "bg-white/10 text-gray-400"
                                )}>
                                  {r.type}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-white">{r.title}</p>
                                  {r.why && <p className="text-xs text-gray-400 mt-0.5">{r.why}</p>}
                                  {r.duration && (
                                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                      <Clock size={10} /> {r.duration}
                                    </p>
                                  )}
                                  {r.url && (
                                    <a
                                      href={r.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 mt-1.5 transition-colors"
                                    >
                                      <Youtube size={11} /> Watch on YouTube
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INTERVIEW PREP TAB */}
          {mainTab === "interview" && (
            <div>
              {/* Sub-tabs */}
              <div className="flex flex-wrap gap-2 mb-5">
                {INTERVIEW_TABS.map(({ key, label, color }) => (
                  <button
                    key={key}
                    onClick={() => { setInterviewTab(key); setExpandedQ(null) }}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium border transition-all",
                      interviewTab === key
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-transparent border-white/8 text-gray-400 hover:text-white hover:border-white/15"
                    )}
                  >
                    <span className={interviewTab === key ? color : ""}>{label}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({result.interviewQuestions[key]?.length ?? 0})
                    </span>
                  </button>
                ))}
              </div>

              {/* Questions */}
              <div className="space-y-3">
                {(result.interviewQuestions[interviewTab] ?? []).map((q, i) => {
                  const qKey = `${interviewTab}-${i}`
                  return (
                    <div
                      key={i}
                      className={cn(
                        "border rounded-xl overflow-hidden transition-all",
                        expandedQ === qKey ? "border-orange-500/30" : "border-white/8"
                      )}
                    >
                      <div
                        className="flex items-start justify-between gap-4 p-4 cursor-pointer hover:bg-white/3 transition-colors"
                        onClick={() => setExpandedQ(expandedQ === qKey ? null : qKey)}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="w-6 h-6 rounded-full bg-white/8 flex items-center justify-center text-xs text-gray-400 flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-white font-medium leading-relaxed">{q.question}</p>
                        </div>
                        {expandedQ === qKey ? <ChevronUp size={15} className="text-gray-500 flex-shrink-0 mt-0.5" /> : <ChevronDown size={15} className="text-gray-500 flex-shrink-0 mt-0.5" />}
                      </div>

                      {expandedQ === qKey && (
                        <div className="border-t border-white/8 p-4 space-y-3 bg-white/[0.015]">
                          <div className="flex items-start gap-2">
                            <TrendingUp size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-gray-300 mb-1">Answer Tips</p>
                              <p className="text-sm text-gray-400 leading-relaxed">{q.tips}</p>
                            </div>
                          </div>
                          {q.suggestedExperience && (
                            <div className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-orange-500/8 border border-orange-500/15">
                              <Brain size={13} className="text-orange-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-xs font-medium text-orange-300 mb-1">Use This Experience</p>
                                <p className="text-sm text-gray-400 leading-relaxed">{q.suggestedExperience}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
