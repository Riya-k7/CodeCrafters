"use client"

import {
  Flag,
  MapPin,
  Activity,
  Radio,
  Timer,
  Settings,
  ChevronDown,
  Circle,
  Rocket,
  Briefcase,
  HeartPulse,
  Truck,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useMissionControl, type Industry } from "@/lib/mission-control-context"

const cities = [
  { id: "bangalore", name: "Bangalore", circuit: "Electronic City GP", status: "live" },
  { id: "mumbai", name: "Mumbai", circuit: "Marine Drive Circuit", status: "active" },
  { id: "chennai", name: "Chennai", circuit: "Marina Beach Track", status: "active" },
]

const industries: { id: Industry; name: string; icon: typeof Briefcase }[] = [
  { id: "FinTech", name: "FinTech", icon: Briefcase },
  { id: "HealthTech", name: "HealthTech", icon: HeartPulse },
  { id: "Logistics", name: "Logistics", icon: Truck },
]

interface MarketSidebarProps {
  selectedCity: string
  onCityChange: (city: string) => void
}

export function MarketSidebar({ selectedCity, onCityChange }: MarketSidebarProps) {
  const currentCity = cities.find((c) => c.id === selectedCity) || cities[0]
  const { industry, setIndustry, startupProfile } = useMissionControl()
  const currentIndustry = industries.find((i) => i.id === industry) || industries[0]

  return (
    <aside className="flex h-[calc(100vh-4rem)] w-72 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.8_0.18_195/0.15)]">
          <Flag className="h-5 w-5 text-[oklch(0.8_0.18_195)]" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-sidebar-foreground">
            {startupProfile.teamName || "MarketPrix"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {startupProfile.foundingYear ? `Est. ${startupProfile.foundingYear}` : "Mission Control"}
          </p>
        </div>
      </div>

      {/* Mission Control - Industry Selector */}
      <div className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Rocket className="h-4 w-4 text-[oklch(0.65_0.2_290)]" />
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Mission Control
          </label>
        </div>
        <Select value={industry} onValueChange={(val) => setIndustry(val as Industry)}>
          <SelectTrigger className="h-12 w-full border-border bg-sidebar-accent">
            <div className="flex items-center gap-3">
              <currentIndustry.icon className="h-4 w-4 text-[oklch(0.65_0.2_290)]" />
              <div className="text-left">
                <SelectValue placeholder="Select industry" />
              </div>
            </div>
          </SelectTrigger>
          <SelectContent className="border-border bg-sidebar">
            {industries.map((ind) => (
              <SelectItem
                key={ind.id}
                value={ind.id}
                className="focus:bg-sidebar-accent"
              >
                <div className="flex items-center gap-3">
                  <ind.icon className="h-4 w-4 text-[oklch(0.65_0.2_290)]" />
                  <span className="font-medium">{ind.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="bg-border" />

      {/* City Selector */}
      <div className="p-4">
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Select Circuit
        </label>
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger className="h-12 w-full border-border bg-sidebar-accent">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[oklch(0.8_0.18_195)]" />
              <div className="text-left">
                <SelectValue placeholder="Select city" />
              </div>
            </div>
          </SelectTrigger>
          <SelectContent className="border-border bg-sidebar">
            {cities.map((city) => (
              <SelectItem
                key={city.id}
                value={city.id}
                className="focus:bg-sidebar-accent"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      city.status === "live"
                        ? "bg-[oklch(0.7_0.2_145)] animate-pulse"
                        : "bg-[oklch(0.65_0.2_290)]"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{city.name}</p>
                    <p className="text-xs text-muted-foreground">{city.circuit}</p>
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator className="bg-border" />

      {/* Race Info */}
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Session Info
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-sidebar-accent p-3">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-[oklch(0.7_0.2_145)]" />
                <span className="text-sm text-sidebar-foreground">Status</span>
              </div>
              <span className="text-sm font-medium text-[oklch(0.7_0.2_145)]">
                LIVE
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-sidebar-accent p-3">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-[oklch(0.65_0.2_290)]" />
                <span className="text-sm text-sidebar-foreground">Session</span>
              </div>
              <span className="text-sm font-medium text-[oklch(0.65_0.2_290)]">
                Q1 2026
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-sidebar-accent p-3">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[oklch(0.8_0.18_195)]" />
                <span className="text-sm text-sidebar-foreground">Domain</span>
              </div>
              <span className="text-sm font-medium text-[oklch(0.8_0.18_195)]">
                {industry}
              </span>
            </div>
          </div>
        </div>

        {/* Circuit Indicator */}
        <div className="mt-6 rounded-xl border border-border bg-sidebar-accent/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Current Circuit
            </span>
            <Circle className="h-2 w-2 animate-pulse fill-[oklch(0.7_0.2_145)] text-[oklch(0.7_0.2_145)]" />
          </div>
          <p className="text-sm font-semibold text-sidebar-foreground">
            {currentCity.circuit}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{currentCity.name}, India</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <button className="flex w-full items-center justify-between rounded-lg bg-sidebar-accent p-3 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent/80">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </aside>
  )
}
