"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/ui/file-upload"
import { Plus, X, Loader2, Briefcase } from "lucide-react"

export function NewJobButton() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [jdText, setJdText] = useState("")
  const [company, setCompany] = useState("")
  const [role, setRole] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleCreate() {
    if (!jdText.trim()) { setError("Job description is required."); return }
    setLoading(true); setError("")

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jdText, resumeText, company, role }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to create job")

      // Set as active job
      localStorage.setItem("activeJobId", data.id)
      localStorage.setItem(`job_resume_${data.id}`, resumeText)

      setOpen(false)
      setJdText(""); setCompany(""); setRole(""); setResumeText("")
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="gradient" className="gap-2">
        <Plus size={16} /> New Job
      </Button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-600/20 border border-orange-500/20 flex items-center justify-center">
                  <Briefcase size={18} className="text-orange-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Add New Job</h2>
                  <p className="text-xs text-gray-400">Paste the JD and optionally upload your resume to get started</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Company + Role */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">Company</label>
                  <Input
                    placeholder="e.g. Quantium"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">Role</label>
                  <Input
                    placeholder="e.g. Data Scientist"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
              </div>

              {/* JD */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">
                  Job Description <span className="text-red-400">*</span>
                </label>
                <Textarea
                  placeholder="Paste the full job description here…"
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  className="h-44 font-mono text-xs"
                />
                <p className="text-xs text-gray-600">{jdText.length} chars</p>
              </div>

              {/* Resume upload */}
              <FileUpload
                label="Resume (optional — can add later on the Resume page)"
                onTextExtracted={(text) => setResumeText(text)}
              />

              {error && (
                <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleCreate}
                  variant="gradient"
                  disabled={loading}
                  className="flex-1 gap-2"
                >
                  {loading
                    ? <><Loader2 size={16} className="animate-spin" /> Creating…</>
                    : <><Plus size={16} /> Create Job</>
                  }
                </Button>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
