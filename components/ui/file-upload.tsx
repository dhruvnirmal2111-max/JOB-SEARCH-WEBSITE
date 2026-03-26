"use client"

import { useState, useRef, useCallback } from "react"
import { Upload, FileText, X, Loader2, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onTextExtracted: (text: string, filename: string) => void
  label?: string
  accept?: string
  className?: string
}

export function FileUpload({
  onTextExtracted,
  label = "Upload Resume",
  accept = ".pdf,.txt,.doc,.docx",
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [filename, setFilename] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const processFile = async (file: File) => {
    setLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to read file")
      setFilename(file.name)
      onTextExtracted(data.text, file.name)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to read file")
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFilename("")
    setError("")
    onTextExtracted("", "")
    if (inputRef.current) inputRef.current.value = ""
  }

  return (
    <div className={className}>
      <label className="text-sm font-medium text-gray-300 mb-2 block">{label}</label>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200",
          isDragging
            ? "border-orange-500 bg-orange-500/10 scale-[1.01]"
            : filename
            ? "border-green-500/50 bg-green-500/5 hover:bg-green-500/8"
            : "border-white/15 bg-white/2 hover:border-orange-500/50 hover:bg-white/4"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !loading && inputRef.current?.click()}
      >
        {loading ? (
          <>
            <Loader2 size={28} className="text-orange-400 animate-spin" />
            <p className="text-sm text-gray-400">Extracting text from file…</p>
          </>
        ) : filename ? (
          <>
            <CheckCircle size={28} className="text-green-400" />
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-green-400" />
              <span className="text-sm text-green-400 font-medium truncate max-w-[200px]">
                {filename}
              </span>
              <button
                onClick={clear}
                className="text-gray-500 hover:text-red-400 transition-colors ml-1"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-xs text-gray-500">Text extracted — click to replace</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Upload size={22} className="text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-300">
                <span className="text-orange-400 font-medium">Click to upload</span> or drag & drop
              </p>
              <p className="text-xs text-gray-600 mt-1">PDF, TXT, DOC — up to 5MB</p>
            </div>
          </>
        )}
        {error && (
          <p className="text-xs text-red-400 bg-red-400/10 px-3 py-1 rounded">{error}</p>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f) }}
        className="hidden"
      />
    </div>
  )
}
