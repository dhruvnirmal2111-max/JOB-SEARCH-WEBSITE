"use client"

import { useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OutreachCalendar } from "@/components/dashboard/outreach-calendar"
import { useActiveJob } from "@/hooks/use-active-job"
import {
  Users, Sparkles, Loader2, Copy, CheckCircle,
  Star, ChevronDown, ChevronUp, Search, Building2,
  MessageSquare, UserCheck, Briefcase, UserPlus, RotateCcw
} from "lucide-react"
import { cn, personaColor } from "@/lib/utils"

interface Contact {
  id: number
  name: string
  role: string
  company: string
  persona: "peer" | "manager" | "recruiter" | "senior"
  score: number
  week: number
  searchQuery: string
  linkedinTip: string
  messages: {
    connection: string
    followup: string
    thankyou: string
  }
}

interface WeekPlan {
  week: number
  dateRange: string
  connects: string[]
  followups: string[]
  focus: string
}

interface NetworkResult {
  company: string
  role: string
  contacts: Contact[]
  weeklyPlan: WeekPlan[]
  outreachRules: string[]
}

const PERSONA_META = {
  peer: { label: "Peer", icon: Users, desc: "Team culture + day-to-day", color: "orange" },
  manager: { label: "Hiring Manager", icon: Briefcase, desc: "What they value in candidates", color: "orange" },
  recruiter: { label: "Recruiter", icon: UserPlus, desc: "Process + timeline", color: "orange" },
  senior: { label: "Senior IC", icon: UserCheck, desc: "Strategic perspective", color: "orange" },
}

const MESSAGE_TABS = [
  { key: "connection" as const, label: "Connect Request", maxChars: 300, tip: "Send when connecting on LinkedIn" },
  { key: "followup" as const, label: "Follow-Up", maxChars: null, tip: "Send 5-7 days after connecting" },
  { key: "thankyou" as const, label: "Thank You", maxChars: null, tip: "Send within 24h of a conversation" },
]

export default function NetworkingPage() {
  const { jobId, ready } = useActiveJob()
  const [jdText, setJdText] = useState("")
  const [userContext, setUserContext] = useState("")
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [result, setResult] = useState<NetworkResult | null>(null)
  const [cached, setCached] = useState(false)
  const [error, setError] = useState("")
  const [expandedContact, setExpandedContact] = useState<number | null>(0)
  const [activeMessageTab, setActiveMessageTab] = useState<Record<number, "connection" | "followup" | "thankyou">>({})
  const [copied, setCopied] = useState<string | null>(null)
  const [contactStatuses, setContactStatuses] = useState<Record<number, string>>({})
  const [contactIds, setContactIds] = useState<string[]>([])

  useEffect(() => {
    if (!ready || !jobId) return
    setFetching(true)
    // Pre-fill JD from job
    fetch(`/api/jobs/${jobId}`)
      .then(r => r.ok ? r.json() : null)
      .then(job => { if (job?.jdText) setJdText(job.jdText) })
      .catch(() => {})
    // Load cached networking result
    fetch(`/api/networking?jobId=${jobId}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setResult(data)
          setCached(true)
          setExpandedContact(0)
          if (data.contactStatuses) setContactStatuses(data.contactStatuses)
          if (data.contactIds) setContactIds(data.contactIds)
        }
      })
      .catch(() => {})
      .finally(() => setFetching(false))
  }, [jobId, ready])

  async function handleGenerate() {
    if (!jdText.trim()) { setError("Please paste the job description."); return }
    setLoading(true); setError(""); setResult(null); setCached(false)

    try {
      const res = await fetch("/api/networking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jdText, userContext, jobId }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed")
      setResult(data)
      setCached(!!data.cached)
      setExpandedContact(0)
      if (data.contactStatuses) setContactStatuses(data.contactStatuses)
      if (data.contactIds) setContactIds(data.contactIds)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  function getMessageTab(contactId: number): "connection" | "followup" | "thankyou" {
    return activeMessageTab[contactId] ?? "connection"
  }

  const personaIcons: Record<string, React.ElementType> = {
    peer: Users,
    manager: Briefcase,
    recruiter: UserPlus,
    senior: UserCheck,
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-lg bg-orange-600/20 border border-orange-500/20 flex items-center justify-center">
              <Users size={18} className="text-orange-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Networking & Outreach</h1>
          </div>
          <p className="text-gray-400 text-sm ml-12">
            Paste a JD → get 5 ranked contacts with personalized messages and a 3-week outreach calendar.
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

      {/* Input */}
      {!result && (
        <div className="space-y-4 max-w-2xl">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">Job Description</label>
            <Textarea
              placeholder="Paste the full job description — company name and role will be extracted automatically…"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              className="h-52 font-mono text-xs"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 block">
              About You <span className="text-gray-500 font-normal">(optional — helps personalize messages)</span>
            </label>
            <Input
              placeholder="e.g. 3 years in data science, Python + ML, worked at a fintech startup…"
              value={userContext}
              onChange={(e) => setUserContext(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</p>
          )}
          <Button onClick={handleGenerate} variant="gradient" size="lg" disabled={loading} className="gap-2">
            {loading
              ? <><Loader2 size={18} className="animate-spin" /> Finding your network…</>
              : <><Sparkles size={18} /> Build My Network</>
            }
          </Button>
        </div>
      )}

      {/* RESULTS */}
      {result && (
        <div className="space-y-6">
          {/* Company banner */}
          <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-600/15 via-orange-800/10 to-orange-600/15 p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent pointer-events-none" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <Building2 size={24} className="text-orange-300" />
              </div>
              <div>
                <p className="text-xs text-orange-300 font-medium uppercase tracking-widest mb-1">Target Company</p>
                <h2 className="text-2xl font-bold text-white">{result.company}</h2>
                <p className="text-gray-300 text-sm mt-0.5">Targeting: <span className="text-orange-300 font-medium">{result.role}</span></p>
              </div>
              <div className="ml-auto flex gap-6 text-center">
                {[
                  { count: result.contacts.length, label: "Contacts" },
                  { count: result.contacts.filter(c => c.persona === "peer").length, label: "Peers" },
                  { count: 3, label: "Weeks" },
                ].map(({ count, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-white">{count}</p>
                    <p className="text-xs text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Persona summary chips */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(PERSONA_META).map(([key, meta]) => {
              const Icon = meta.icon
              const count = result.contacts.filter(c => c.persona === key).length
              if (count === 0) return null
              return (
                <div key={key} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                  <Icon size={14} className="text-gray-400" />
                  <span className="text-sm text-white font-medium">{count}x {meta.label}</span>
                  <span className="text-xs text-gray-500">{meta.desc}</span>
                </div>
              )
            })}
          </div>

          {/* Main grid: contacts + calendar */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            {/* Contacts */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <Users size={14} className="text-orange-400" />
                Your 5 Contacts — ranked by fit score
              </h3>

              {result.contacts.map((contact, i) => {
                const PersonaIcon = personaIcons[contact.persona] ?? Users
                const msgTab = getMessageTab(i)
                const isExpanded = expandedContact === i
                const status = contactStatuses[i] ?? "pending"

                return (
                  <div
                    key={i}
                    className={cn(
                      "border rounded-xl overflow-hidden transition-all duration-200",
                      isExpanded ? "border-orange-500/30" : "border-white/8 hover:border-white/15"
                    )}
                  >
                    {/* Contact header */}
                    <div
                      className={cn(
                        "flex items-center gap-4 p-4 cursor-pointer transition-colors",
                        isExpanded ? "bg-orange-600/10" : "bg-white/[0.02] hover:bg-white/5"
                      )}
                      onClick={() => setExpandedContact(isExpanded ? null : i)}
                    >
                      {/* Rank */}
                      <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-bold text-gray-300 flex-shrink-0">
                        {i + 1}
                      </div>

                      {/* Avatar */}
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                        "bg-gradient-to-br",
                        contact.persona === "peer" ? "from-orange-500 to-orange-700" :
                        contact.persona === "manager" ? "from-orange-600 to-orange-800" :
                        contact.persona === "recruiter" ? "from-orange-400 to-orange-600" :
                        "from-orange-700 to-orange-900"
                      )}>
                        {contact.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-white text-sm">{contact.name}</span>
                          <Badge variant="outline" className={`${personaColor(contact.persona)} text-xs border-current/30`}>
                            <PersonaIcon size={10} className="mr-1" />
                            {PERSONA_META[contact.persona]?.label ?? contact.persona}
                          </Badge>
                          <Badge variant="outline" className="text-gray-500 border-white/10 text-xs">
                            Week {contact.week}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 truncate">
                          {contact.role} · {contact.company}
                        </p>
                      </div>

                      {/* Score + status + toggle */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right hidden sm:block">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-amber-400 fill-amber-400" />
                            <span className="text-sm font-bold text-white">{contact.score.toFixed(1)}</span>
                          </div>
                        </div>
                        <select
                          value={status}
                          onChange={(e) => {
                            e.stopPropagation()
                            const newStatus = e.target.value
                            setContactStatuses(prev => ({ ...prev, [i]: newStatus }))
                            const contactId = contactIds[i]
                            if (contactId) {
                              fetch("/api/networking", {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ contactId, status: newStatus }),
                              }).catch(() => {})
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className={cn(
                            "text-xs rounded-md border px-2 py-1 bg-transparent cursor-pointer focus:outline-none",
                            status === "pending" ? "text-gray-400 border-white/20" :
                            status === "sent" ? "text-blue-400 border-blue-500/30" :
                            "text-green-400 border-green-500/30"
                          )}
                        >
                          <option value="pending" className="bg-[#0a0a0a]">Not sent</option>
                          <option value="sent" className="bg-[#0a0a0a]">Connected</option>
                          <option value="replied" className="bg-[#0a0a0a]">Replied ✓</option>
                        </select>
                        {isExpanded
                          ? <ChevronUp size={16} className="text-gray-500" />
                          : <ChevronDown size={16} className="text-gray-500" />
                        }
                      </div>
                    </div>

                    {/* Expanded: search query + messages */}
                    {isExpanded && (
                      <div className="border-t border-white/8 p-4 space-y-4">
                        {/* LinkedIn search */}
                        <div className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/8">
                          <Search size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-gray-300 mb-1">LinkedIn Search Query</p>
                            <code className="text-xs text-orange-300 font-mono">{contact.searchQuery}</code>
                            {contact.linkedinTip && (
                              <p className="text-xs text-gray-500 mt-1 italic">{contact.linkedinTip}</p>
                            )}
                          </div>
                        </div>

                        {/* Message tabs */}
                        <div>
                          <div className="flex gap-1 p-1 bg-white/5 rounded-lg w-fit mb-3">
                            {MESSAGE_TABS.map(({ key, label }) => (
                              <button
                                key={key}
                                onClick={() => setActiveMessageTab(prev => ({ ...prev, [i]: key }))}
                                className={cn(
                                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                                  msgTab === key ? "bg-orange-600 text-white" : "text-gray-400 hover:text-white"
                                )}
                              >
                                <MessageSquare size={11} />
                                {label}
                              </button>
                            ))}
                          </div>

                          {MESSAGE_TABS.filter(t => t.key === msgTab).map(({ key, tip, maxChars }) => (
                            <div key={key}>
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs text-gray-500 italic">{tip}</p>
                                <div className="flex items-center gap-2">
                                  {maxChars && (
                                    <span className={cn(
                                      "text-xs",
                                      contact.messages[key].length > maxChars ? "text-red-400" : "text-gray-500"
                                    )}>
                                      {contact.messages[key].length}/{maxChars} chars
                                    </span>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5 text-xs h-7"
                                    onClick={() => copyText(contact.messages[key], `${i}-${key}`)}
                                  >
                                    {copied === `${i}-${key}`
                                      ? <><CheckCircle size={11} className="text-green-400" /> Copied!</>
                                      : <><Copy size={11} /> Copy</>
                                    }
                                  </Button>
                                </div>
                              </div>
                              <div className="bg-white/3 border border-white/8 rounded-lg p-4">
                                <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                                  {contact.messages[key]}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Outreach Calendar */}
            <div className="xl:sticky xl:top-6 xl:h-fit">
              <div className="bg-white/[0.02] border border-white/8 rounded-xl p-4">
                <OutreachCalendar weeklyPlan={result.weeklyPlan} contacts={result.contacts} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
