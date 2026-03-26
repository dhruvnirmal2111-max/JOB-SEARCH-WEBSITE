"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import {
  LayoutDashboard,
  FileText,
  Users,
  Brain,
  Briefcase,
  LogOut,
  ChevronRight,
  FolderOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/networking", label: "Networking", icon: Users },
  { href: "/career", label: "Career Coach", icon: Brain },
  { href: "/projects", label: "Projects", icon: FolderOpen },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <Briefcase size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg">JobsAI</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-orange-600/20 text-orange-300 border border-orange-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon
                size={18}
                className={cn(
                  "transition-colors",
                  isActive ? "text-orange-400" : "text-gray-500 group-hover:text-gray-300"
                )}
              />
              {item.label}
              {isActive && (
                <ChevronRight size={14} className="ml-auto text-orange-400" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 mb-3 px-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">
              {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {session?.user?.name ?? "User"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {session?.user?.email ?? ""}
            </p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  )
}
