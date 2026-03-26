"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  FolderOpen, Plus, Github, ExternalLink, Pencil, Trash2,
  X, Check, Loader2, ChevronDown, ChevronUp, Calendar,
  Tag, Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  status: "in-progress" | "completed" | "paused"
  githubUrl?: string | null
  liveUrl?: string | null
  highlights: string[]
  startDate?: string | null
  endDate?: string | null
  createdAt: string
  updatedAt: string
}

const STATUS_META = {
  "in-progress": { label: "In Progress", color: "text-orange-400 border-orange-500/30 bg-orange-500/10" },
  "completed": { label: "Completed", color: "text-green-400 border-green-500/30 bg-green-500/10" },
  "paused": { label: "Paused", color: "text-gray-400 border-gray-500/30 bg-gray-500/10" },
}

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
  { id: "paused", label: "Paused" },
]

const EMPTY_FORM = {
  title: "",
  description: "",
  techStack: [] as string[],
  techInput: "",
  status: "in-progress" as Project["status"],
  githubUrl: "",
  liveUrl: "",
  highlights: [] as string[],
  highlightInput: "",
  startDate: "",
  endDate: "",
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/projects")
      .then(r => r.ok ? r.json() : [])
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === "all" ? projects : projects.filter(p => p.status === filter)

  function openAdd() {
    setForm({ ...EMPTY_FORM })
    setEditingId(null)
    setShowForm(true)
    setError("")
  }

  function openEdit(p: Project) {
    setForm({
      title: p.title,
      description: p.description,
      techStack: [...p.techStack],
      techInput: "",
      status: p.status,
      githubUrl: p.githubUrl ?? "",
      liveUrl: p.liveUrl ?? "",
      highlights: [...p.highlights],
      highlightInput: "",
      startDate: p.startDate ?? "",
      endDate: p.endDate ?? "",
    })
    setEditingId(p.id)
    setShowForm(true)
    setError("")
  }

  function closeForm() {
    setShowForm(false)
    setEditingId(null)
    setError("")
  }

  function addTech() {
    const t = form.techInput.trim()
    if (t && !form.techStack.includes(t)) {
      setForm(f => ({ ...f, techStack: [...f.techStack, t], techInput: "" }))
    }
  }

  function removeTech(t: string) {
    setForm(f => ({ ...f, techStack: f.techStack.filter(x => x !== t) }))
  }

  function addHighlight() {
    const h = form.highlightInput.trim()
    if (h) {
      setForm(f => ({ ...f, highlights: [...f.highlights, h], highlightInput: "" }))
    }
  }

  function removeHighlight(i: number) {
    setForm(f => ({ ...f, highlights: f.highlights.filter((_, idx) => idx !== i) }))
  }

  async function handleSave() {
    if (!form.title.trim()) { setError("Title is required"); return }
    setSaving(true); setError("")

    const payload = {
      title: form.title,
      description: form.description,
      techStack: form.techStack,
      status: form.status,
      githubUrl: form.githubUrl || null,
      liveUrl: form.liveUrl || null,
      highlights: form.highlights,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
    }

    try {
      if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error("Failed to update")
        const updated = await res.json()
        setProjects(ps => ps.map(p => p.id === editingId ? updated : p))
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error("Failed to create")
        const created = await res.json()
        setProjects(ps => [created, ...ps])
      }
      closeForm()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      await fetch(`/api/projects/${id}`, { method: "DELETE" })
      setProjects(ps => ps.filter(p => p.id !== id))
    } catch {}
    setDeletingId(null)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-9 h-9 rounded-lg bg-orange-600/20 border border-orange-500/20 flex items-center justify-center">
              <FolderOpen size={18} className="text-orange-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Projects</h1>
          </div>
          <p className="text-gray-400 text-sm ml-12">
            Track your portfolio projects — tech stack, status, GitHub links, and key highlights.
          </p>
        </div>
        <Button onClick={openAdd} variant="gradient" size="sm" className="gap-2">
          <Plus size={16} /> Add Project
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 p-1 bg-white/5 rounded-lg w-fit">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
              filter === tab.id ? "bg-orange-600 text-white" : "text-gray-400 hover:text-white"
            )}
          >
            {tab.label}
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full",
              filter === tab.id ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"
            )}>
              {tab.id === "all" ? projects.length : projects.filter(p => p.status === tab.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="border border-orange-500/20 rounded-2xl bg-orange-600/5 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              {editingId ? "Edit Project" : "New Project"}
            </h2>
            <button onClick={closeForm} className="text-gray-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Title */}
            <div className="space-y-1.5 lg:col-span-2">
              <label className="text-sm font-medium text-gray-300">Title *</label>
              <Input
                placeholder="e.g. AI Resume Optimizer"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 lg:col-span-2">
              <label className="text-sm font-medium text-gray-300">Description</label>
              <Textarea
                placeholder="What does this project do? What problem does it solve?"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                className="h-24"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Status</label>
              <select
                value={form.status}
                onChange={e => setForm(f => ({ ...f, status: e.target.value as Project["status"] }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-orange-500/50"
              >
                <option value="in-progress" className="bg-[#0a0a0a]">In Progress</option>
                <option value="completed" className="bg-[#0a0a0a]">Completed</option>
                <option value="paused" className="bg-[#0a0a0a]">Paused</option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">Start</label>
                <Input
                  type="month"
                  value={form.startDate}
                  onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">End</label>
                <Input
                  type="month"
                  value={form.endDate}
                  onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))}
                />
              </div>
            </div>

            {/* GitHub */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">GitHub URL</label>
              <Input
                placeholder="https://github.com/..."
                value={form.githubUrl}
                onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
              />
            </div>

            {/* Live URL */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300">Live URL</label>
              <Input
                placeholder="https://..."
                value={form.liveUrl}
                onChange={e => setForm(f => ({ ...f, liveUrl: e.target.value }))}
              />
            </div>

            {/* Tech stack */}
            <div className="space-y-1.5 lg:col-span-2">
              <label className="text-sm font-medium text-gray-300">Tech Stack</label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Python, React, PostgreSQL…"
                  value={form.techInput}
                  onChange={e => setForm(f => ({ ...f, techInput: e.target.value }))}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTech() } }}
                />
                <Button variant="outline" size="sm" onClick={addTech} className="flex-shrink-0">
                  <Plus size={14} />
                </Button>
              </div>
              {form.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {form.techStack.map(t => (
                    <span key={t} className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-600/15 border border-orange-500/20 text-orange-300 text-xs">
                      {t}
                      <button onClick={() => removeTech(t)} className="hover:text-white ml-0.5">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Highlights */}
            <div className="space-y-1.5 lg:col-span-2">
              <label className="text-sm font-medium text-gray-300">Key Highlights</label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Reduced inference latency by 40%…"
                  value={form.highlightInput}
                  onChange={e => setForm(f => ({ ...f, highlightInput: e.target.value }))}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addHighlight() } }}
                />
                <Button variant="outline" size="sm" onClick={addHighlight} className="flex-shrink-0">
                  <Plus size={14} />
                </Button>
              </div>
              {form.highlights.length > 0 && (
                <ul className="space-y-1 mt-2">
                  {form.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-orange-400 mt-0.5 flex-shrink-0">•</span>
                      <span className="flex-1">{h}</span>
                      <button onClick={() => removeHighlight(i)} className="text-gray-600 hover:text-red-400 flex-shrink-0">
                        <X size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</p>
          )}

          <div className="flex gap-3">
            <Button onClick={handleSave} variant="gradient" disabled={saving} className="gap-2">
              {saving ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
              {editingId ? "Save Changes" : "Add Project"}
            </Button>
            <Button variant="ghost" onClick={closeForm}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Project list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-orange-400" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-orange-600/10 border border-orange-500/20 flex items-center justify-center mx-auto mb-4">
            <FolderOpen size={28} className="text-orange-400" />
          </div>
          <p className="text-white font-semibold text-lg mb-1">
            {filter === "all" ? "No projects yet" : `No ${filter} projects`}
          </p>
          <p className="text-gray-500 text-sm">
            {filter === "all" ? "Add your first project to start building your portfolio." : "Change the filter to see other projects."}
          </p>
          {filter === "all" && (
            <Button onClick={openAdd} variant="gradient" size="sm" className="gap-2 mt-4">
              <Plus size={15} /> Add Project
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map(p => {
            const meta = STATUS_META[p.status] ?? STATUS_META["in-progress"]
            const isExpanded = expandedId === p.id

            return (
              <div key={p.id} className={cn(
                "border rounded-xl overflow-hidden transition-all",
                isExpanded ? "border-orange-500/30" : "border-white/8 hover:border-white/15"
              )}>
                {/* Card header */}
                <div
                  className={cn(
                    "flex items-start gap-4 p-5 cursor-pointer transition-colors",
                    isExpanded ? "bg-orange-600/8" : "bg-white/[0.02] hover:bg-white/5"
                  )}
                  onClick={() => setExpandedId(isExpanded ? null : p.id)}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-orange-600/15 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles size={16} className="text-orange-400" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold text-white">{p.title}</h3>
                          <Badge variant="outline" className={cn("text-xs border", meta.color)}>
                            {meta.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">{p.description}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={e => { e.stopPropagation(); openEdit(p) }}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-orange-400 hover:bg-orange-400/10 transition-all"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); handleDelete(p.id) }}
                          disabled={deletingId === p.id}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
                        >
                          {deletingId === p.id
                            ? <Loader2 size={14} className="animate-spin" />
                            : <Trash2 size={14} />
                          }
                        </button>
                        {isExpanded
                          ? <ChevronUp size={15} className="text-gray-500 ml-1" />
                          : <ChevronDown size={15} className="text-gray-500 ml-1" />
                        }
                      </div>
                    </div>

                    {/* Tech stack row */}
                    {p.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {p.techStack.map(t => (
                          <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                            <Tag size={9} />
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-white/8 p-5 space-y-4 bg-white/[0.01]">
                    {/* Dates */}
                    {(p.startDate || p.endDate) && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar size={13} className="text-orange-400" />
                        <span>
                          {p.startDate ? p.startDate.replace("-", " / ") : "?"}
                          {" → "}
                          {p.endDate ? p.endDate.replace("-", " / ") : "Present"}
                        </span>
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-3">
                      {p.githubUrl && (
                        <a
                          href={p.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 transition-colors"
                          onClick={e => e.stopPropagation()}
                        >
                          <Github size={14} /> GitHub
                        </a>
                      )}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-orange-400 transition-colors"
                          onClick={e => e.stopPropagation()}
                        >
                          <ExternalLink size={14} /> Live Demo
                        </a>
                      )}
                    </div>

                    {/* Highlights */}
                    {p.highlights.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Highlights</p>
                        <ul className="space-y-1.5">
                          {p.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="text-orange-400 mt-0.5 flex-shrink-0">•</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
