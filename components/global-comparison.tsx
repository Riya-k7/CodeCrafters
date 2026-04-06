"use client"

import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Trophy,
} from "lucide-react"
import { useMissionControl } from "@/lib/mission-control-context"

const cities = [
  {
    id: "bangalore",
    name: "Bangalore",
    circuit: "Electronic City GP",
    rank: 2,
    metrics: {
      grip: 85,
      dirtyAir: 42,
      trackTemp: 67,
      sectorTimes: 78,
      fuelBurn: 34,
    },
    trends: {
      grip: "up" as const,
      dirtyAir: "down" as const,
      trackTemp: "stable" as const,
      sectorTimes: "up" as const,
      fuelBurn: "down" as const,
    },
    overallScore: 82,
  },
  {
    id: "mumbai",
    name: "Mumbai",
    circuit: "Marine Drive Circuit",
    rank: 3,
    metrics: {
      grip: 72,
      dirtyAir: 68,
      trackTemp: 82,
      sectorTimes: 65,
      fuelBurn: 56,
    },
    trends: {
      grip: "stable" as const,
      dirtyAir: "up" as const,
      trackTemp: "up" as const,
      sectorTimes: "down" as const,
      fuelBurn: "up" as const,
    },
    overallScore: 68,
  },
  {
    id: "chennai",
    name: "Chennai",
    circuit: "Marina Beach Track",
    rank: 1,
    metrics: {
      grip: 91,
      dirtyAir: 35,
      trackTemp: 75,
      sectorTimes: 88,
      fuelBurn: 28,
    },
    trends: {
      grip: "up" as const,
      dirtyAir: "stable" as const,
      trackTemp: "down" as const,
      sectorTimes: "up" as const,
      fuelBurn: "down" as const,
    },
    overallScore: 89,
  },
]

const metricKeys = ["grip", "dirtyAir", "trackTemp", "sectorTimes", "fuelBurn"] as const

function TrendIcon({ trend }: { trend: "up" | "down" | "stable" }) {
  if (trend === "up")
    return <TrendingUp className="h-3 w-3 text-[oklch(0.7_0.2_145)]" />
  if (trend === "down")
    return <TrendingDown className="h-3 w-3 text-[oklch(0.6_0.22_25)]" />
  return <Minus className="h-3 w-3 text-muted-foreground" />
}

function getMetricColor(metric: string, value: number): string {
  // For competition and operational cost, lower is better
  if (metric === "dirtyAir" || metric === "fuelBurn") {
    if (value < 40) return "text-[oklch(0.7_0.2_145)]"
    if (value < 60) return "text-[oklch(0.75_0.15_55)]"
    return "text-[oklch(0.6_0.22_25)]"
  }
  // For other metrics, higher is better
  if (value > 75) return "text-[oklch(0.7_0.2_145)]"
  if (value > 50) return "text-[oklch(0.75_0.15_55)]"
  return "text-[oklch(0.6_0.22_25)]"
}

export function GlobalComparison() {
  const { metrics: industryMetrics, industry } = useMissionControl()
  
  // Sort by rank for display
  const sortedCities = [...cities].sort((a, b) => a.rank - b.rank)

  // Map metric keys to their labels from the current industry
  const getMetricLabel = (key: typeof metricKeys[number]): string => {
    return industryMetrics[key].label
  }

  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="border-b border-border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-card-foreground">
              Global Circuit Comparison
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Side-by-side {industry.toLowerCase()} telemetry across all circuits
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-[oklch(0.8_0.18_195/0.1)] px-3 py-1.5">
            <Trophy className="h-4 w-4 text-[oklch(0.8_0.18_195)]" />
            <span className="text-sm font-medium text-[oklch(0.8_0.18_195)]">
              Q1 2026 Rankings
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Circuit
              </th>
              {metricKeys.map((key) => (
                <th
                  key={key}
                  className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {getMetricLabel(key)}
                </th>
              ))}
              <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Overall
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCities.map((city, index) => (
              <motion.tr
                key={city.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-border last:border-0 hover:bg-secondary/30"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold ${
                        city.rank === 1
                          ? "bg-[oklch(0.8_0.18_195/0.2)] text-[oklch(0.8_0.18_195)]"
                          : city.rank === 2
                            ? "bg-[oklch(0.65_0.2_290/0.2)] text-[oklch(0.65_0.2_290)]"
                            : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      P{city.rank}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {city.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {city.circuit}
                      </p>
                    </div>
                  </div>
                </td>
                {metricKeys.map((metricKey) => (
                    <td key={metricKey} className="px-4 py-4">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1">
                          <span
                            className={`text-lg font-bold tabular-nums ${getMetricColor(
                              metricKey,
                              city.metrics[metricKey]
                            )}`}
                          >
                            {city.metrics[metricKey]}
                          </span>
                          <TrendIcon trend={city.trends[metricKey]} />
                        </div>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${city.metrics[metricKey]}%` }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                            className={`h-full rounded-full ${
                              metricKey === "dirtyAir" ||
                              metricKey === "fuelBurn"
                                ? city.metrics[metricKey] < 40
                                  ? "bg-[oklch(0.7_0.2_145)]"
                                  : city.metrics[metricKey] < 60
                                    ? "bg-[oklch(0.75_0.15_55)]"
                                    : "bg-[oklch(0.6_0.22_25)]"
                                : city.metrics[metricKey] > 75
                                  ? "bg-[oklch(0.7_0.2_145)]"
                                  : city.metrics[metricKey] > 50
                                    ? "bg-[oklch(0.75_0.15_55)]"
                                    : "bg-[oklch(0.6_0.22_25)]"
                            }`}
                          />
                        </div>
                      </div>
                    </td>
                  )
                )}
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`text-2xl font-bold ${
                        city.overallScore > 80
                          ? "text-[oklch(0.7_0.2_145)]"
                          : city.overallScore > 65
                            ? "text-[oklch(0.75_0.15_55)]"
                            : "text-[oklch(0.6_0.22_25)]"
                      }`}
                    >
                      {city.overallScore}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /100
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
