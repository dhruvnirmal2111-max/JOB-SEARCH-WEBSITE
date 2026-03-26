"use client"

import { useState, useEffect } from "react"
import { FileUpload } from "@/components/ui/file-upload"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useActiveJob } from "@/hooks/use-active-job"
import {
  FileText, Sparkles, Loader2, Download, Copy,
  CheckCircle, XCircle, ArrowRight, TrendingUp, Star,
  Eye, BookOpen, ChevronDown, ChevronUp, Database, Building2
} from "lucide-react"

interface BulletRewrite { section: string; original: string; rewritten: string; relevanceScore: number; keywords: string[] }
interface ResumeResult {
  company: string; role: string; matchRate: number; cached?: boolean
  keywords: { matched: string[]; missing: string[]; added: string[] }
  summary: string; bulletRewrites: BulletRewrite[]; optimizedResume: string; coverLetter: string; recommendations: string[]
}
type ActiveTab = "bullets" | "preview" | "cover"
const SCORE_COLOR: Record<number, string> = { 0:"text-red-400",1:"text-red-400",2:"text-orange-400",3:"text-amber-400",4:"text-yellow-400",5:"text-yellow-400",6:"text-blue-400",7:"text-blue-400",8:"text-green-400",9:"text-green-400",10:"text-green-400" }

export default function ResumePage() {
  const { jobId, ready } = useActiveJob()
  const [resumeText, setResumeText] = useState("")
  const [jdText, setJdText] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [result, setResult] = useState<ResumeResult | null>(null)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<ActiveTab>("bullets")
  const [copied, setCopied] = useState<string | null>(null)
  const [expandedBullets, setExpandedBullets] = useState(true)

  // Load cached result + job JD on mount
  useEffect(() => {
    if (!ready) return
    if (!jobId) return

    setFetching(true)

    // Load saved resume text from localStorage for this job
    const savedResume = localStorage.getItem(`job_resume_${jobId}`)
    if (savedResume) setResumeText(savedResume)

    // Fetch job JD
    fetch(`/api/jobs/${jobId}`).then(r => r.ok ? r.json() : null).then(job => {
      if (job?.jdText) setJdText(job.jdText)
      if (job?.resumeText && !savedResume) setResumeText(job.resumeText)
    }).catch(() => {})

    // Fetch cached resume result
    fetch(`/api/resume?jobId=${jobId}`).then(r => r.ok ? r.json() : null).then(data => {
      if (data) setResult(data)
    }).catch(() => {}).finally(() => setFetching(false))
  }, [jobId, ready])

  // Save resume text to localStorage when it changes
  useEffect(() => {
    if (jobId && resumeText) {
      localStorage.setItem(`job_resume_${jobId}`, resumeText)
    }
  }, [resumeText, jobId])

  async function handleOptimize() {
    if (!resumeText.trim()) { setError("Please upload or paste your resume."); return }
    if (!jdText.trim()) { setError("Please paste the job description."); return }
    setLoading(true); setError(""); setResult(null)

    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jdText, jobId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed")
      setResult(data)
      setActiveTab("bullets")
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally { setLoading(false) }
  }

  function copyText(text: string, key: string) { navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(null), 2000) }

  function downloadFile(text: string, filename: string) {
    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url)
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 size={20} className="animate-spin" />
          <span>Loading your resume data…</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-lg bg-orange-600/20 border border-orange-500/20 flex items-center justify-center">
              <FileText size={18} className="text-orange-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Resume Optimizer</h1>
            {result?.cached && (
              <span className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 border border-green-500/20 px-2 py-0.5 rounded-full">
                <Database size={11} /> Cached
              </span>
            )}
          </div>
          {result ? (
            <p className="text-gray-400 text-sm ml-12 flex items-center gap-2">
              <Building2 size={13} className="text-orange-400" />
              <span className="text-white font-medium">{result.role}</span>
              <span className="text-gray-600">at</span>
              <span className="text-orange-300 font-medium">{result.company}</span>
            </p>
          ) : (
            <p className="text-gray-400 text-sm ml-12">Upload your resume + paste a JD → keyword-matched bullets, summary, cover letter.</p>
          )}
        </div>
        {result && (
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => downloadFile(result.optimizedResume, `resume-${result.company}.txt`)} className="gap-2">
              <Download size={14} /> Resume
            </Button>
            <Button variant="outline" size="sm" onClick={() => downloadFile(result.coverLetter, `cover-letter-${result.company}.txt`)} className="gap-2">
              <Download size={14} /> Cover Letter
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setResult(null); setError("") }}>
              Re-analyze
            </Button>
          </div>
        )}
      </div>

      {/* Inputs (show when no result or re-analyzing) */}
      {!result && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <FileUpload
              label="Your Resume (PDF or TXT)"
              onTextExtracted={(text) => setResumeText(text)}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 block">Job Description</label>
              <Textarea
                placeholder="Paste the full job description here…"
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                className="h-[185px] font-mono text-xs leading-relaxed"
              />
            </div>
          </div>
          {error && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</p>}
          <Button onClick={handleOptimize} variant="gradient" size="lg" disabled={loading} className="gap-2">
            {loading ? <><Loader2 size={18} className="animate-spin" /> Analyzing with Claude…</> : <><Sparkles size={18} /> Optimize Resume</>}
          </Button>
        </>
      )}

      {/* Results */}
      {result && (
        <div className="space-y-5">
          {/* Metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 md:col-span-1 bg-gradient-to-br from-orange-600/15 to-orange-600/5 border border-orange-500/20 rounded-xl p-5 flex flex-col items-center">
              <div className="relative w-20 h-20 mb-2">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="url(#rg)" strokeWidth="3"
                    strokeDasharray={`${(result.matchRate / 100) * 88} ${88 - (result.matchRate / 100) * 88}`} strokeLinecap="round" />
                  <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{result.matchRate}%</span>
                </div>
              </div>
              <p className="text-xs text-gray-400">Keyword Match</p>
            </div>
            <div className="bg-green-500/8 border border-green-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2"><CheckCircle size={14} className="text-green-400" /><span className="text-xs font-medium text-green-400">Matched</span></div>
              <p className="text-2xl font-bold text-white">{result.keywords.matched.length}</p>
              <div className="flex flex-wrap gap-1 mt-2">{result.keywords.matched.slice(0, 4).map(k => <span key={k} className="text-[10px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded">{k}</span>)}{result.keywords.matched.length > 4 && <span className="text-[10px] text-gray-500">+{result.keywords.matched.length - 4}</span>}</div>
            </div>
            <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2"><XCircle size={14} className="text-red-400" /><span className="text-xs font-medium text-red-400">Missing</span></div>
              <p className="text-2xl font-bold text-white">{result.keywords.missing.length}</p>
              <div className="flex flex-wrap gap-1 mt-2">{result.keywords.missing.slice(0, 4).map(k => <span key={k} className="text-[10px] bg-red-500/15 text-red-400 px-1.5 py-0.5 rounded">{k}</span>)}{result.keywords.missing.length > 4 && <span className="text-[10px] text-gray-500">+{result.keywords.missing.length - 4}</span>}</div>
            </div>
            <div className="bg-blue-500/8 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2"><TrendingUp size={14} className="text-blue-400" /><span className="text-xs font-medium text-blue-400">Added</span></div>
              <p className="text-2xl font-bold text-white">{result.keywords.added?.length ?? 0}</p>
              <div className="flex flex-wrap gap-1 mt-2">{(result.keywords.added ?? []).slice(0, 4).map(k => <span key={k} className="text-[10px] bg-blue-500/15 text-blue-400 px-1.5 py-0.5 rounded">{k}</span>)}</div>
            </div>
          </div>

          {/* Summary */}
          {result.summary && (
            <div className="bg-white/3 border border-white/8 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3"><Star size={15} className="text-amber-400" /><h3 className="text-sm font-semibold text-white">Tailored Summary</h3></div>
              <p className="text-sm text-gray-300 leading-relaxed">{result.summary}</p>
            </div>
          )}

          {/* Recommendations */}
          {result.recommendations?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="bg-white/3 border border-white/8 rounded-xl p-4 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-600/30 border border-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-400 flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-gray-300">{rec}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div>
            <div className="flex gap-1 p-1 bg-white/5 rounded-lg w-fit mb-5">
              {([
                { id: "bullets" as const, label: "Bullet Rewrites", icon: ArrowRight },
                { id: "preview" as const, label: "Resume Preview", icon: Eye },
                { id: "cover" as const, label: "Cover Letter", icon: BookOpen },
              ]).map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === id ? "bg-orange-600 text-white" : "text-gray-400 hover:text-white"}`}>
                  <Icon size={14} />{label}
                </button>
              ))}
            </div>

            {activeTab === "bullets" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">{result.bulletRewrites?.length ?? 0} bullets rewritten</p>
                  <button onClick={() => setExpandedBullets(!expandedBullets)} className="text-xs text-gray-500 hover:text-white flex items-center gap-1">
                    {expandedBullets ? <><ChevronUp size={12} /> Collapse</> : <><ChevronDown size={12} /> Expand</>}
                  </button>
                </div>
                {(result.bulletRewrites ?? []).map((b, i) => (
                  <div key={i} className="border border-white/8 rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-white/3 border-b border-white/5">
                      <span className="text-xs font-medium text-gray-400">{b.section}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star size={11} className={SCORE_COLOR[b.relevanceScore] ?? "text-gray-400"} />
                          <span className={`text-xs font-bold ${SCORE_COLOR[b.relevanceScore] ?? "text-gray-400"}`}>{b.relevanceScore}/10</span>
                        </div>
                        {b.keywords?.slice(0, 3).map(k => <span key={k} className="text-[10px] bg-orange-500/15 text-orange-400 px-1.5 py-0.5 rounded">{k}</span>)}
                      </div>
                    </div>
                    {expandedBullets && (
                      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
                        <div className="p-4 bg-red-500/3"><p className="text-[10px] text-red-400 font-medium uppercase tracking-wider mb-2">Original</p><p className="text-sm text-gray-400 leading-relaxed">{b.original}</p></div>
                        <div className="p-4 bg-green-500/3"><p className="text-[10px] text-green-400 font-medium uppercase tracking-wider mb-2">Optimized</p><p className="text-sm text-gray-200 leading-relaxed font-medium">{b.rewritten}</p></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "preview" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-400">Full optimized resume — maintained original structure</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => copyText(result.optimizedResume, "resume")}>
                      {copied === "resume" ? <><CheckCircle size={12} className="text-green-400" /> Copied!</> : <><Copy size={12} /> Copy</>}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => downloadFile(result.optimizedResume, `resume-${result.company}.txt`)}>
                      <Download size={12} /> .txt
                    </Button>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8 max-h-[600px] overflow-y-auto">
                  <pre className="text-sm text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">{result.optimizedResume}</pre>
                </div>
              </div>
            )}

            {activeTab === "cover" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-400">Tailored for {result.role} at {result.company}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => copyText(result.coverLetter, "cover")}>
                      {copied === "cover" ? <><CheckCircle size={12} className="text-green-400" /> Copied!</> : <><Copy size={12} /> Copy</>}
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1.5" onClick={() => downloadFile(result.coverLetter, `cover-letter-${result.company}.txt`)}>
                      <Download size={12} /> .txt
                    </Button>
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8 max-h-[600px] overflow-y-auto">
                  <pre className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">{result.coverLetter}</pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
