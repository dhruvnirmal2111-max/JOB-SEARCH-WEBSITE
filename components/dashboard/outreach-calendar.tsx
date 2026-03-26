"use client"

import { useState } from "react"
import {
  Calendar, ChevronLeft, ChevronRight, Send, Bell,
  CheckCircle2, Copy, X, UserPlus, Users, Briefcase, UserCheck
} from "lucide-react"
import { cn } from "@/lib/utils"

interface WeekPlan {
  week: number
  dateRange: string
  connects: string[]
  followups: string[]
  focus: string
}

interface Contact {
  id: number
  name: string
  persona: "peer" | "manager" | "recruiter" | "senior"
  week: number
  messages: {
    connection: string
    followup: string
    thankyou: string
  }
}

interface CalendarAction {
  type: "connect" | "followup"
  name: string
  persona?: string
  message?: string
  key: string
}

interface OutreachCalendarProps {
  weeklyPlan: WeekPlan[]
  contacts?: Contact[]
  startDate?: Date
  completedActions?: Set<string>
  onToggle?: (key: string) => void
}

const PERSONA_ICONS: Record<string, React.ElementType> = {
  peer: Users,
  manager: Briefcase,
  recruiter: UserPlus,
  senior: UserCheck,
}

const PERSONA_COLOR: Record<string, string> = {
  peer: "text-orange-300 bg-orange-600/15 border-orange-500/20",
  manager: "text-amber-300 bg-amber-600/15 border-amber-500/20",
  recruiter: "text-white bg-white/10 border-white/20",
  senior: "text-orange-200 bg-orange-700/15 border-orange-600/20",
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function OutreachCalendar({
  weeklyPlan,
  contacts = [],
  startDate = new Date(),
  completedActions: externalCompleted,
  onToggle: externalToggle,
}: OutreachCalendarProps) {
  const [internalCompleted, setInternalCompleted] = useState<Set<string>>(new Set())
  const completedActions = externalCompleted ?? internalCompleted

  const toggleAction = (key: string) => {
    if (externalToggle) {
      externalToggle(key)
    } else {
      setInternalCompleted(prev => {
        const next = new Set(prev)
        if (next.has(key)) next.delete(key)
        else next.add(key)
        return next
      })
    }
  }

  // Calendar navigation state
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date(startDate)
    d.setDate(1)
    return d
  })
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Build action map: dateStr → CalendarAction[]
  const actionMap = new Map<string, CalendarAction[]>()

  weeklyPlan.forEach(week => {
    // Week 1 starts on the Monday of the startDate's week
    const weekStart = new Date(startDate)
    const dayOfWeek = weekStart.getDay() // 0=Sun, 1=Mon...
    const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    weekStart.setDate(weekStart.getDate() + daysToMonday + (week.week - 1) * 7)

    // Connects go on Mon and Wed of that week
    week.connects.forEach((name, i) => {
      const d = new Date(weekStart)
      d.setDate(d.getDate() + (i === 0 ? 0 : 2)) // Mon, Wed
      const key = `w${week.week}-connect-${i}`
      const dateStr = d.toISOString().split("T")[0]

      // Find contact for message
      const contactName = name.split(" (")[0]
      const contact = contacts.find(c => c.name === contactName)
      const persona = name.match(/\((\w+)\)/)?.[1]

      const actions = actionMap.get(dateStr) ?? []
      actions.push({
        type: "connect",
        name,
        persona,
        message: contact?.messages?.connection,
        key,
      })
      actionMap.set(dateStr, actions)
    })

    // Follow-ups go on Friday of that week
    week.followups.forEach((name, i) => {
      const d = new Date(weekStart)
      d.setDate(d.getDate() + 4) // Friday
      const key = `w${week.week}-followup-${i}`
      const dateStr = d.toISOString().split("T")[0]

      const contactName = name.split(" —")[0].split(" (")[0]
      const contact = contacts.find(c => c.name === contactName)

      const actions = actionMap.get(dateStr) ?? []
      actions.push({
        type: "followup",
        name,
        message: contact?.messages?.followup,
        key,
      })
      actionMap.set(dateStr, actions)
    })
  })

  // Calendar grid generation
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // Pad to Monday start
  let startPad = firstDay.getDay() - 1 // 0=Mon
  if (startPad < 0) startPad = 6

  const cells: (Date | null)[] = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(new Date(year, month, d))
  // Fill to complete the last row
  while (cells.length % 7 !== 0) cells.push(null)

  const todayStr = new Date().toISOString().split("T")[0]

  const selectedActions = selectedDate ? (actionMap.get(selectedDate) ?? []) : []

  const [copied, setCopied] = useState<string | null>(null)
  function copyMessage(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-orange-400" />
          <h3 className="font-semibold text-white text-sm">Outreach Calendar</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-xs font-medium text-white min-w-[90px] text-center">
            {viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={() => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-px">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-[10px] font-medium text-gray-500 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px">
        {cells.map((date, idx) => {
          if (!date) return <div key={idx} className="h-14" />

          const dateStr = date.toISOString().split("T")[0]
          const isToday = dateStr === todayStr
          const actions = actionMap.get(dateStr) ?? []
          const connects = actions.filter(a => a.type === "connect")
          const followups = actions.filter(a => a.type === "followup")
          const isSelected = selectedDate === dateStr
          const hasActions = actions.length > 0

          return (
            <button
              key={idx}
              onClick={() => {
                if (hasActions) setSelectedDate(isSelected ? null : dateStr)
              }}
              className={cn(
                "h-14 rounded-lg p-1.5 flex flex-col items-center transition-all text-left relative",
                isToday && "ring-1 ring-orange-500",
                isSelected && hasActions && "bg-orange-600/15 ring-1 ring-orange-500/50",
                hasActions && !isSelected && "hover:bg-white/5 cursor-pointer",
                !hasActions && "cursor-default",
              )}
            >
              <span className={cn(
                "text-[11px] font-medium w-5 h-5 flex items-center justify-center rounded-full",
                isToday ? "bg-orange-500 text-white" : "text-gray-400",
              )}>
                {date.getDate()}
              </span>

              {/* Action pills */}
              <div className="flex flex-col gap-0.5 w-full mt-0.5">
                {connects.slice(0, 1).map((a, i) => (
                  <div key={i} className={cn(
                    "w-full rounded-sm px-1 flex items-center gap-0.5",
                    completedActions.has(a.key)
                      ? "bg-green-500/20 text-green-400"
                      : "bg-orange-600/25 text-orange-300"
                  )}>
                    <Send size={7} className="flex-shrink-0" />
                    <span className="text-[8px] truncate leading-[11px]">
                      {a.name.split(" ")[0]}
                    </span>
                  </div>
                ))}
                {connects.length > 1 && (
                  <div className="w-full rounded-sm px-1 bg-orange-600/25 text-orange-300 flex items-center gap-0.5">
                    <Send size={7} className="flex-shrink-0" />
                    <span className="text-[8px] leading-[11px]">+{connects.length - 1}</span>
                  </div>
                )}
                {followups.slice(0, 1).map((a, i) => (
                  <div key={i} className={cn(
                    "w-full rounded-sm px-1 flex items-center gap-0.5",
                    completedActions.has(a.key)
                      ? "bg-green-500/20 text-green-400"
                      : "bg-white/10 text-gray-300"
                  )}>
                    <Bell size={7} className="flex-shrink-0" />
                    <span className="text-[8px] truncate leading-[11px]">
                      {a.name.split(" ")[0].split(" —")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </button>
          )
        })}
      </div>

      {/* Selected date action panel */}
      {selectedDate && selectedActions.length > 0 && (
        <div className="border border-orange-500/20 rounded-xl bg-orange-600/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-orange-400" />
              <span className="text-sm font-medium text-white">
                {new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
              </span>
              <span className="text-xs text-gray-500">{selectedActions.length} action{selectedActions.length > 1 ? "s" : ""}</span>
            </div>
            <button onClick={() => setSelectedDate(null)} className="text-gray-500 hover:text-white transition-colors">
              <X size={14} />
            </button>
          </div>

          {selectedActions.map((action, i) => {
            const personaKey = action.persona ?? ""
            const PersonaIcon = PERSONA_ICONS[personaKey] ?? Users
            const done = completedActions.has(action.key)

            return (
              <div key={i} className="border border-white/8 rounded-lg overflow-hidden">
                {/* Action header */}
                <div className="flex items-center justify-between p-3 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border",
                      action.type === "connect"
                        ? "bg-orange-600/20 text-orange-300 border-orange-500/20"
                        : "bg-white/10 text-gray-300 border-white/15"
                    )}>
                      {action.type === "connect" ? <Send size={9} /> : <Bell size={9} />}
                      {action.type === "connect" ? "Connect" : "Follow Up"}
                    </div>
                    <span className="text-sm font-medium text-white">
                      {action.name.split(" (")[0].split(" —")[0]}
                    </span>
                    {personaKey && (
                      <span className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] border", PERSONA_COLOR[personaKey])}>
                        <PersonaIcon size={8} />
                        {personaKey}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => toggleAction(action.key)}
                    className={cn(
                      "flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all",
                      done
                        ? "bg-green-500/20 text-green-400"
                        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <CheckCircle2 size={11} />
                    {done ? "Done" : "Mark done"}
                  </button>
                </div>

                {/* Message */}
                {action.message && (
                  <div className="p-3 border-t border-white/5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-500">
                        {action.type === "connect" ? "Connection request message" : "Follow-up message"}
                      </span>
                      <button
                        onClick={() => copyMessage(action.message!, `${selectedDate}-${i}`)}
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-orange-400 transition-colors"
                      >
                        {copied === `${selectedDate}-${i}`
                          ? <><CheckCircle2 size={10} className="text-green-400" /> Copied!</>
                          : <><Copy size={10} /> Copy</>
                        }
                      </button>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed bg-white/3 rounded-lg p-3 whitespace-pre-wrap">
                      {action.message}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-4 pt-1">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm bg-orange-600/25" />
          <span className="text-[10px] text-gray-500">Connect</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm bg-white/10" />
          <span className="text-[10px] text-gray-500">Follow-up</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-2 rounded-sm bg-green-500/20" />
          <span className="text-[10px] text-gray-500">Done</span>
        </div>
      </div>

      {/* Outreach rules */}
      <div className="p-3 rounded-lg bg-white/3 border border-white/5">
        <p className="text-[10px] font-medium text-gray-500 mb-2 uppercase tracking-wider">Ground Rules</p>
        <ul className="space-y-1">
          {[
            "Follow up once after 5-7 business days",
            "Thank you note within 24h of any conversation",
            "Never ask for referral in first message",
          ].map((rule, i) => (
            <li key={i} className="text-xs text-gray-500 flex items-start gap-1.5">
              <span className="text-orange-500/60 mt-0.5 flex-shrink-0">•</span>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
