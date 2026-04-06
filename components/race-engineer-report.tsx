"use client"

import { motion } from "framer-motion"
import { Radio, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"
import { useMissionControl, type Industry } from "@/lib/mission-control-context"

interface RaceEngineerReportProps {
  city: string
}

interface CityMetrics {
  grip: number
  dirtyAir: number
  trackTemp: number
  sectorTimes: number
  fuelBurn: number
}

const cityData: Record<string, CityMetrics> = {
  bangalore: { grip: 85, dirtyAir: 42, trackTemp: 67, sectorTimes: 78, fuelBurn: 34 },
  mumbai: { grip: 72, dirtyAir: 68, trackTemp: 82, sectorTimes: 65, fuelBurn: 56 },
  chennai: { grip: 91, dirtyAir: 35, trackTemp: 75, sectorTimes: 88, fuelBurn: 28 },
}

const cityNames: Record<string, string> = {
  bangalore: "Bangalore",
  mumbai: "Mumbai",
  chennai: "Chennai",
}

function generateReport(city: string, industry: Industry, metrics: CityMetrics): string[] {
  const cityName = cityNames[city] || "Bangalore"
  const overallScore = Math.round(
    (metrics.grip + (100 - metrics.dirtyAir) + metrics.sectorTimes + (100 - metrics.fuelBurn)) / 4
  )

  const reports: Record<Industry, Record<string, string[]>> = {
    FinTech: {
      bangalore: [
        `${cityName} shows exceptional Transaction Volume at ${metrics.grip}%, indicating strong digital payment adoption and growing fintech user base.`,
        `Competition levels are moderate at ${metrics.dirtyAir}%, creating favorable market entry conditions while maintaining healthy ecosystem dynamics.`,
        `With Operational Cost at ${metrics.fuelBurn}% and Growth Rate at ${metrics.sectorTimes}%, this circuit offers a ${overallScore > 75 ? "premium" : "balanced"} opportunity for fintech startups seeking sustainable scaling.`,
      ],
      mumbai: [
        `${cityName}'s financial hub status delivers ${metrics.grip}% Transaction Volume, but Competition at ${metrics.dirtyAir}% signals a crowded market requiring strong differentiation.`,
        `High Compliance Index of ${metrics.trackTemp}% reflects mature regulatory infrastructure, beneficial for startups seeking institutional partnerships.`,
        `Caution: Operational Cost at ${metrics.fuelBurn}% is elevated. Consider this circuit for established fintechs with proven unit economics rather than early-stage ventures.`,
      ],
      chennai: [
        `${cityName} emerges as a hidden gem with ${metrics.grip}% Transaction Volume and remarkably low Competition at ${metrics.dirtyAir}%.`,
        `Growth Rate of ${metrics.sectorTimes}% combined with the lowest Operational Cost (${metrics.fuelBurn}%) makes this an optimal circuit for capital-efficient scaling.`,
        `Strong recommendation: Early market entry here could establish market leadership before competition intensifies.`,
      ],
    },
    HealthTech: {
      bangalore: [
        `${cityName} demonstrates strong Patient Density at ${metrics.grip}%, driven by tech-savvy population and growing health awareness.`,
        `Provider Saturation at ${metrics.dirtyAir}% indicates room for innovative healthtech solutions, especially in telemedicine and diagnostics.`,
        `R&D Spend efficiency at ${metrics.fuelBurn}% and Adoption Rate of ${metrics.sectorTimes}% position this circuit favorably for digital health startups.`,
      ],
      mumbai: [
        `${cityName}'s diverse demographics yield ${metrics.grip}% Patient Density, but Provider Saturation at ${metrics.dirtyAir}% requires niche targeting.`,
        `HIPAA-equivalent compliance at ${metrics.trackTemp}% supports enterprise healthtech deployments and hospital integrations.`,
        `Warning: R&D Spend at ${metrics.fuelBurn}% may strain early-stage budgets. Best suited for Series A+ healthtech ventures.`,
      ],
      chennai: [
        `${cityName} offers ${metrics.grip}% Patient Density with minimal Provider Saturation (${metrics.dirtyAir}%), creating blue ocean opportunities.`,
        `Exceptional Adoption Rate of ${metrics.sectorTimes}% suggests receptive market for health innovations and digital-first solutions.`,
        `Optimal circuit for healthtech pilots: low R&D Spend (${metrics.fuelBurn}%) enables extended runway for product-market fit validation.`,
      ],
    },
    Logistics: {
      bangalore: [
        `${cityName} processes ${metrics.grip}% Shipment Volume, reflecting robust e-commerce ecosystem and manufacturing activity.`,
        `Route Congestion at ${metrics.dirtyAir}% is manageable, allowing new logistics players to establish efficient delivery networks.`,
        `Fleet Cost at ${metrics.fuelBurn}% combined with Delivery Speed metrics (${metrics.sectorTimes}%) indicate favorable unit economics for last-mile startups.`,
      ],
      mumbai: [
        `${cityName}'s port city advantage drives ${metrics.grip}% Shipment Volume, but Route Congestion at ${metrics.dirtyAir}% demands smart routing solutions.`,
        `Trade Compliance infrastructure (${metrics.trackTemp}%) supports cross-border logistics and freight forwarding operations.`,
        `Critical: Fleet Cost at ${metrics.fuelBurn}% is the highest. Focus on asset-light models or specialized freight to maintain margins.`,
      ],
      chennai: [
        `${cityName} combines ${metrics.grip}% Shipment Volume with lowest Route Congestion (${metrics.dirtyAir}%), ideal for network expansion.`,
        `Delivery Speed potential at ${metrics.sectorTimes}% paired with minimal Fleet Cost (${metrics.fuelBurn}%) creates exceptional margins.`,
        `Strategic recommendation: Establish ${cityName} as hub before expanding to congested circuits for competitive advantage.`,
      ],
    },
  }

  return reports[industry][city] || reports.FinTech.bangalore
}

export function RaceEngineerReport({ city }: RaceEngineerReportProps) {
  const { industry, metrics: industryMetrics } = useMissionControl()
  const cityMetrics = cityData[city] || cityData.bangalore
  const report = generateReport(city, industry, cityMetrics)

  const overallScore = Math.round(
    (cityMetrics.grip +
      (100 - cityMetrics.dirtyAir) +
      cityMetrics.sectorTimes +
      (100 - cityMetrics.fuelBurn)) /
      4
  )

  const statusIcon =
    overallScore > 80 ? CheckCircle : overallScore > 65 ? TrendingUp : AlertTriangle
  const statusColor =
    overallScore > 80
      ? "oklch(0.7_0.2_145)"
      : overallScore > 65
        ? "oklch(0.75_0.15_55)"
        : "oklch(0.6_0.22_25)"
  const statusText =
    overallScore > 80 ? "Optimal Circuit" : overallScore > 65 ? "Viable Circuit" : "High Risk Circuit"

  const StatusIcon = statusIcon

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl border border-border bg-card overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b border-border p-6"
        style={{ background: `linear-gradient(135deg, color-mix(in oklch, ${statusColor} 10%, transparent), transparent)` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: `color-mix(in oklch, ${statusColor} 20%, transparent)` }}
          >
            <Radio className="h-5 w-5" style={{ color: statusColor }} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Race Engineer&apos;s Report
            </h2>
            <p className="text-xs text-muted-foreground">
              {industry} Analysis for {cityNames[city] || "Bangalore"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusIcon className="h-5 w-5" style={{ color: statusColor }} />
          <span className="text-sm font-medium" style={{ color: statusColor }}>
            {statusText}
          </span>
        </div>
      </div>

      {/* Report Content */}
      <div className="p-6">
        <div className="space-y-4">
          {report.map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.15 }}
              className="flex gap-3"
            >
              <div className="mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                {index + 1}
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">{paragraph}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-6 sm:grid-cols-4">
          <div className="rounded-lg bg-secondary/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">{industryMetrics.grip.label}</p>
            <p className="mt-1 text-lg font-bold text-[oklch(0.8_0.18_195)]">
              {cityMetrics.grip}%
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">{industryMetrics.dirtyAir.label}</p>
            <p className="mt-1 text-lg font-bold text-[oklch(0.65_0.2_290)]">
              {cityMetrics.dirtyAir}%
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">{industryMetrics.sectorTimes.label}</p>
            <p className="mt-1 text-lg font-bold text-[oklch(0.7_0.2_145)]">
              {cityMetrics.sectorTimes}%
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3 text-center">
            <p className="text-xs text-muted-foreground">{industryMetrics.fuelBurn.label}</p>
            <p className="mt-1 text-lg font-bold text-[oklch(0.6_0.22_25)]">
              {cityMetrics.fuelBurn}%
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
