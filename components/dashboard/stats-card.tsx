import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  trend?: {
    value: string
    positive: boolean
  }
  className?: string
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-orange-400",
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <CardContent className="p-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
            {subtitle && (
              <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "text-xs mt-2 font-medium",
                  trend.positive ? "text-green-400" : "text-red-400"
                )}
              >
                {trend.positive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              "bg-white/5 border border-white/10"
            )}
          >
            <Icon size={20} className={iconColor} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
