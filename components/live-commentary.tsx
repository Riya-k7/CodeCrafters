"use client"

import { useEffect, useState } from "react"
import { Radio, AlertTriangle, TrendingUp, Shield, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useMissionControl, type Industry } from "@/lib/mission-control-context"

interface Commentary {
  id: number
  message: string
  type: "warning" | "info" | "success" | "alert"
  icon: LucideIcon
}

const commentariesByIndustry: Record<Industry, Commentary[]> = {
  FinTech: [
    {
      id: 1,
      message: "Warning: Mumbai Operational Cost is critical. Consider Chennai for lower entry costs.",
      type: "warning",
      icon: AlertTriangle,
    },
    {
      id: 2,
      message: "Bangalore Transaction Volume looking strong. High demand sector ahead.",
      type: "success",
      icon: TrendingUp,
    },
    {
      id: 3,
      message: "Chennai compliance metrics stable. Regulatory conditions favorable for expansion.",
      type: "info",
      icon: Shield,
    },
    {
      id: 4,
      message: "Mumbai competition intensifying. Consider defensive market positioning.",
      type: "alert",
      icon: Zap,
    },
    {
      id: 5,
      message: "Bangalore showing fastest growth vectors across all fintech sectors. Prime entry window.",
      type: "success",
      icon: TrendingUp,
    },
    {
      id: 6,
      message: "Alert: Chennai transaction volume spike detected. Market opportunity identified.",
      type: "info",
      icon: Zap,
    },
  ],
  HealthTech: [
    {
      id: 1,
      message: "Warning: Mumbai R&D Spend is elevated. Chennai offers better capital efficiency.",
      type: "warning",
      icon: AlertTriangle,
    },
    {
      id: 2,
      message: "Bangalore Patient Density strong. Telemedicine adoption accelerating.",
      type: "success",
      icon: TrendingUp,
    },
    {
      id: 3,
      message: "Chennai HIPAA compliance stable. Hospital integrations proceeding smoothly.",
      type: "info",
      icon: Shield,
    },
    {
      id: 4,
      message: "Mumbai provider saturation high. Niche specialization recommended.",
      type: "alert",
      icon: Zap,
    },
    {
      id: 5,
      message: "Bangalore digital health adoption rate climbing. IoMT opportunities emerging.",
      type: "success",
      icon: TrendingUp,
    },
    {
      id: 6,
      message: "Alert: Chennai showing surge in health-conscious population. Preventive care demand up.",
      type: "info",
      icon: Zap,
    },
  ],
  Logistics: [
    {
      id: 1,
      message: "Warning: Mumbai Fleet Cost at critical levels. Route optimization required.",
      type: "warning",
      icon: AlertTriangle,
    },
    {
      id: 2,
      message: "Bangalore Shipment Volume exceeds projections. Warehouse capacity check advised.",
      type: "success",
      icon: TrendingUp,
    },
    {
      id: 3,
      message: "Chennai trade compliance favorable. Cross-border logistics greenlit.",
      type: "info",
      icon: Shield,
    },
    {
      id: 4,
      message: "Mumbai route congestion spiking. Last-mile delivery times affected.",
      type: "alert",
      icon: Zap,
    },
    {
      id: 5,
      message: "Bangalore delivery speed metrics optimal. Hub expansion recommended.",
      type: "success",
      icon: TrendingUp,
    },
    {
      id: 6,
      message: "Alert: Chennai port activity surge. Freight forwarding opportunities identified.",
      type: "info",
      icon: Zap,
    },
  ],
}

const typeStyles = {
  warning: "text-[oklch(0.75_0.15_55)]",
  info: "text-[oklch(0.8_0.18_195)]",
  success: "text-[oklch(0.7_0.2_145)]",
  alert: "text-[oklch(0.65_0.2_290)]",
}

export function LiveCommentary() {
  const { industry } = useMissionControl()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  const commentaries = commentariesByIndustry[industry]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % commentaries.length)
        setIsAnimating(true)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [commentaries.length])

  // Reset index when industry changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [industry])

  const current = commentaries[currentIndex]
  const Icon = current.icon

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Radio className="h-4 w-4 text-[oklch(0.6_0.22_25)]" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-[oklch(0.6_0.22_25)]" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.6_0.22_25)]">
            Race Engineer
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div
          className={`flex flex-1 items-center gap-2 transition-all duration-300 ${
            isAnimating ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
          }`}
        >
          <Icon className={`h-4 w-4 shrink-0 ${typeStyles[current.type]}`} />
          <p className={`text-sm ${typeStyles[current.type]}`}>{current.message}</p>
        </div>
      </div>
    </div>
  )
}
