"use client"

import { useEffect, useRef, useState } from "react"
import { FileText, Mail, Users, MessageSquare, Brain, TrendingUp, Briefcase } from "lucide-react"

interface OrbitalNode {
  id: number
  label: string
  icon: React.ElementType
  color: string
  glowColor: string
  radius: number
  speed: number
  initialAngle: number
}

const nodes: OrbitalNode[] = [
  {
    id: 1, label: "Resume", icon: FileText,
    color: "#6366f1", glowColor: "rgba(99,102,241,0.5)",
    radius: 160, speed: 0.4, initialAngle: 0,
  },
  {
    id: 2, label: "Cover Letter", icon: Mail,
    color: "#8b5cf6", glowColor: "rgba(139,92,246,0.5)",
    radius: 260, speed: 0.25, initialAngle: 51,
  },
  {
    id: 3, label: "Network", icon: Users,
    color: "#a855f7", glowColor: "rgba(168,85,247,0.5)",
    radius: 160, speed: 0.35, initialAngle: 103,
  },
  {
    id: 4, label: "Follow Up", icon: MessageSquare,
    color: "#3b82f6", glowColor: "rgba(59,130,246,0.5)",
    radius: 260, speed: 0.2, initialAngle: 154,
  },
  {
    id: 5, label: "Interview Prep", icon: Brain,
    color: "#ec4899", glowColor: "rgba(236,72,153,0.5)",
    radius: 160, speed: 0.45, initialAngle: 206,
  },
  {
    id: 6, label: "Skill Gap", icon: TrendingUp,
    color: "#f59e0b", glowColor: "rgba(245,158,11,0.5)",
    radius: 260, speed: 0.3, initialAngle: 257,
  },
  {
    id: 7, label: "Job Tracker", icon: Briefcase,
    color: "#14b8a6", glowColor: "rgba(20,184,166,0.5)",
    radius: 160, speed: 0.38, initialAngle: 308,
  },
]

export function OrbitalHero() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const anglesRef = useRef<number[]>(nodes.map((n) => (n.initialAngle * Math.PI) / 180))
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [nodePositions, setNodePositions] = useState<{ x: number; y: number }[]>(
    nodes.map(() => ({ x: 0, y: 0 }))
  )

  useEffect(() => {
    const animate = () => {
      anglesRef.current = anglesRef.current.map((angle, i) => {
        if (hoveredId === nodes[i].id) return angle
        return angle + (nodes[i].speed * Math.PI) / 180
      })

      setNodePositions(
        nodes.map((node, i) => ({
          x: Math.cos(anglesRef.current[i]) * node.radius,
          y: Math.sin(anglesRef.current[i]) * node.radius,
        }))
      )

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hoveredId])

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-[600px] flex items-center justify-center select-none"
      style={{ minWidth: 600 }}
    >
      {/* SVG orbit rings */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="300" cy="300" r="160" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="300" cy="300" r="260" fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth="1" strokeDasharray="4 8" />
      </svg>

      {/* Center "Dream Job" */}
      <div className="absolute z-10 flex flex-col items-center justify-center">
        {/* Outer ping rings */}
        <div className="absolute w-24 h-24 rounded-full border border-orange-500/20 animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute w-20 h-20 rounded-full border border-orange-500/30 animate-ping" style={{ animationDuration: "2s" }} />
        {/* Main orb */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle at 40% 35%, #818cf8, #4f46e5, #312e81)",
            boxShadow: "0 0 40px rgba(99,102,241,0.6), 0 0 80px rgba(99,102,241,0.3)",
          }}
        >
          <Briefcase size={22} className="text-white" />
        </div>
        <span className="mt-2 text-xs font-semibold text-orange-300 tracking-widest uppercase whitespace-nowrap">
          Dream Job
        </span>
      </div>

      {/* Orbital nodes */}
      {nodes.map((node, i) => {
        const pos = nodePositions[i]
        const Icon = node.icon
        const isHovered = hoveredId === node.id
        return (
          <div
            key={node.id}
            className="absolute flex flex-col items-center cursor-pointer transition-transform duration-200"
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`,
              zIndex: isHovered ? 20 : 5,
            }}
            onMouseEnter={() => setHoveredId(node.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Glow halo */}
            {isHovered && (
              <div
                className="absolute w-14 h-14 rounded-full -inset-2"
                style={{
                  background: `radial-gradient(circle, ${node.glowColor} 0%, transparent 70%)`,
                  filter: "blur(6px)",
                }}
              />
            )}
            {/* Node circle */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200"
              style={{
                background: isHovered
                  ? node.color
                  : `${node.color}22`,
                borderColor: isHovered ? node.color : `${node.color}66`,
                boxShadow: isHovered ? `0 0 20px ${node.glowColor}` : "none",
                transform: isHovered ? "scale(1.25)" : "scale(1)",
              }}
            >
              <Icon size={16} color={isHovered ? "#fff" : node.color} />
            </div>
            {/* Label */}
            <span
              className="mt-1.5 text-[10px] font-semibold whitespace-nowrap tracking-wide"
              style={{ color: isHovered ? node.color : "rgba(255,255,255,0.6)" }}
            >
              {node.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
