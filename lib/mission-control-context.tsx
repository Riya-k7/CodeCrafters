"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Industry = "FinTech" | "HealthTech" | "Logistics"

export interface IndustryMetrics {
  grip: { label: string; subLabel: string }
  dirtyAir: { label: string; subLabel: string }
  trackTemp: { label: string; subLabel: string }
  sectorTimes: { label: string; subLabel: string }
  fuelBurn: { label: string; subLabel: string }
}

export interface StartupProfile {
  teamName: string
  foundingYear: string
}

const industryConfig: Record<Industry, IndustryMetrics> = {
  FinTech: {
    grip: { label: "Transaction Volume", subLabel: "Market Demand" },
    dirtyAir: { label: "Competition", subLabel: "Market Density" },
    trackTemp: { label: "Compliance", subLabel: "Regulatory Index" },
    sectorTimes: { label: "Growth Rate", subLabel: "Sector Velocity" },
    fuelBurn: { label: "Operational Cost", subLabel: "Burn Rate" },
  },
  HealthTech: {
    grip: { label: "Patient Density", subLabel: "Healthcare Demand" },
    dirtyAir: { label: "Provider Saturation", subLabel: "Market Competition" },
    trackTemp: { label: "HIPAA Index", subLabel: "Regulatory Compliance" },
    sectorTimes: { label: "Adoption Rate", subLabel: "Digital Health Growth" },
    fuelBurn: { label: "R&D Spend", subLabel: "Development Cost" },
  },
  Logistics: {
    grip: { label: "Shipment Volume", subLabel: "Freight Demand" },
    dirtyAir: { label: "Route Congestion", subLabel: "Network Competition" },
    trackTemp: { label: "Trade Compliance", subLabel: "Import/Export Rules" },
    sectorTimes: { label: "Delivery Speed", subLabel: "Last-Mile Efficiency" },
    fuelBurn: { label: "Fleet Cost", subLabel: "Operational Expense" },
  },
}

interface MissionControlContextType {
  industry: Industry
  setIndustry: (industry: Industry) => void
  metrics: IndustryMetrics
  startupProfile: StartupProfile
  updateStartupProfile: (profile: Partial<StartupProfile>) => void
  getIndustryLabel: () => string
}

const MissionControlContext = createContext<MissionControlContextType | null>(null)

export function MissionControlProvider({ children }: { children: ReactNode }) {
  const [industry, setIndustryState] = useState<Industry>("FinTech")
  const [startupProfile, setStartupProfile] = useState<StartupProfile>({
    teamName: "",
    foundingYear: "",
  })

  const setIndustry = useCallback((newIndustry: Industry) => {
    setIndustryState(newIndustry)
  }, [])

  const updateStartupProfile = useCallback((profile: Partial<StartupProfile>) => {
    setStartupProfile((prev) => ({ ...prev, ...profile }))
  }, [])

  const getIndustryLabel = useCallback(() => {
    return industry
  }, [industry])

  return (
    <MissionControlContext.Provider
      value={{
        industry,
        setIndustry,
        metrics: industryConfig[industry],
        startupProfile,
        updateStartupProfile,
        getIndustryLabel,
      }}
    >
      {children}
    </MissionControlContext.Provider>
  )
}

export function useMissionControl() {
  const context = useContext(MissionControlContext)
  if (!context) {
    throw new Error("useMissionControl must be used within a MissionControlProvider")
  }
  return context
}
