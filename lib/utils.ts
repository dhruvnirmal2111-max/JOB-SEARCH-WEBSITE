import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function statusColor(status: string) {
  const map: Record<string, string> = {
    saved: "bg-slate-500/20 text-slate-300",
    applied: "bg-blue-500/20 text-blue-300",
    interviewing: "bg-yellow-500/20 text-yellow-300",
    offered: "bg-green-500/20 text-green-300",
    rejected: "bg-red-500/20 text-red-300",
    pending: "bg-slate-500/20 text-slate-300",
    sent: "bg-blue-500/20 text-blue-300",
    replied: "bg-green-500/20 text-green-300",
  }
  return map[status] ?? "bg-slate-500/20 text-slate-300"
}

export function personaColor(persona: string) {
  const map: Record<string, string> = {
    peer: "bg-orange-500/20 text-orange-300",
    manager: "bg-orange-500/20 text-orange-300",
    recruiter: "bg-pink-500/20 text-pink-300",
    senior: "bg-amber-500/20 text-amber-300",
  }
  return map[persona] ?? "bg-slate-500/20 text-slate-300"
}
