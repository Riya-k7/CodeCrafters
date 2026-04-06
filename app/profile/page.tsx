"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  User,
  Trophy,
  Calendar,
  FileText,
  MapPin,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Star,
  Rocket,
  Building2,
  CalendarDays,
  Save,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useMissionControl } from "@/lib/mission-control-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const driverLevelConfig = {
  Rookie: {
    color: "oklch(0.7_0.2_145)",
    icon: Star,
    description: "Just starting your market intelligence journey",
    progress: 25,
  },
  Pro: {
    color: "oklch(0.8_0.18_195)",
    icon: Star,
    description: "Experienced analyst with proven track record",
    progress: 60,
  },
  Legend: {
    color: "oklch(0.65_0.2_290)",
    icon: Star,
    description: "Elite market navigator with exceptional insights",
    progress: 85,
  },
  Champion: {
    color: "oklch(0.75_0.15_55)",
    icon: Trophy,
    description: "Master of market telemetry and strategic decisions",
    progress: 100,
  },
}

const savedReports = [
  {
    id: 1,
    city: "Bangalore",
    circuit: "Electronic City GP",
    date: "2026-03-15",
    score: 82,
  },
  {
    id: 2,
    city: "Chennai",
    circuit: "Marina Beach Track",
    date: "2026-03-10",
    score: 89,
  },
  {
    id: 3,
    city: "Mumbai",
    circuit: "Marine Drive Circuit",
    date: "2026-03-05",
    score: 68,
  },
]

const settingsSections = [
  { icon: Bell, label: "Notifications", description: "Manage alert preferences" },
  { icon: Shield, label: "Privacy & Security", description: "Account protection settings" },
  { icon: Settings, label: "Preferences", description: "Display and data settings" },
]

export default function ProfilePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const { startupProfile, updateStartupProfile, industry } = useMissionControl()
  const router = useRouter()

  const [teamName, setTeamName] = useState(startupProfile.teamName)
  const [foundingYear, setFoundingYear] = useState(startupProfile.foundingYear)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    setTeamName(startupProfile.teamName)
    setFoundingYear(startupProfile.foundingYear)
  }, [startupProfile])

  const handleSaveProfile = () => {
    updateStartupProfile({ teamName, foundingYear })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background pt-16">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[oklch(0.8_0.18_195)] border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const levelConfig = driverLevelConfig[user.driverLevel]

  return (
    <div className="min-h-screen bg-background px-4 pb-12 pt-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-card"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(135deg, ${levelConfig.color} 0%, transparent 60%)`,
            }}
          />

          <div className="relative p-6 lg:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Avatar */}
              <div
                className="flex h-24 w-24 items-center justify-center rounded-2xl text-3xl font-bold text-foreground"
                style={{ backgroundColor: `color-mix(in oklch, ${levelConfig.color} 20%, transparent)` }}
              >
                {user.avatar}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground lg:text-3xl">
                  {user.name}
                </h1>
                <p className="mt-1 text-muted-foreground">{user.email}</p>

                {/* Driver Level Badge */}
                <div className="mt-4">
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                    style={{ backgroundColor: `color-mix(in oklch, ${levelConfig.color} 15%, transparent)` }}
                  >
                    <Trophy className="h-5 w-5" style={{ color: levelConfig.color }} />
                    <span className="font-semibold" style={{ color: levelConfig.color }}>
                      {user.driverLevel} Driver
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {levelConfig.description}
                  </p>
                </div>

                {/* Progress to next level */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress to next level</span>
                    <span style={{ color: levelConfig.color }}>{levelConfig.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${levelConfig.progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: levelConfig.color }}
                    />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-1">
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="text-2xl font-bold text-[oklch(0.8_0.18_195)]">
                    {user.totalReports}
                  </p>
                  <p className="text-xs text-muted-foreground">Reports</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3 text-center">
                  <p className="text-2xl font-bold text-[oklch(0.65_0.2_290)]">
                    {user.savedCities.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Circuits</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Startup Profile Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8 rounded-xl border border-border bg-card"
        >
          <div className="border-b border-border p-6">
            <div className="flex items-center gap-3">
              <Rocket className="h-5 w-5 text-[oklch(0.65_0.2_290)]" />
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Startup Profile
                </h2>
                <p className="text-xs text-muted-foreground">
                  Customize your team identity in {industry}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  Team Name
                </label>
                <Input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter your startup name"
                  className="h-12 border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-[oklch(0.8_0.18_195)]"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  This will appear in the dashboard header
                </p>
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  Founding Year
                </label>
                <Input
                  value={foundingYear}
                  onChange={(e) => setFoundingYear(e.target.value)}
                  placeholder="e.g., 2024"
                  maxLength={4}
                  className="h-12 border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-[oklch(0.8_0.18_195)]"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Year your startup was founded
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <Button
                onClick={handleSaveProfile}
                className="h-11 bg-[oklch(0.65_0.2_290)] px-6 text-white hover:bg-[oklch(0.55_0.2_290)]"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </Button>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm font-medium text-[oklch(0.7_0.2_145)]"
                >
                  Profile saved successfully!
                </motion.span>
              )}
            </div>
          </div>
        </motion.section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Saved City Reports */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="border-b border-border p-6">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-[oklch(0.8_0.18_195)]" />
                <h2 className="text-lg font-semibold text-foreground">
                  Saved Circuit Reports
                </h2>
              </div>
            </div>
            <div className="divide-y divide-border">
              {savedReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center justify-between p-4 transition-colors hover:bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.8_0.18_195/0.1)]">
                      <MapPin className="h-5 w-5 text-[oklch(0.8_0.18_195)]" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{report.city}</p>
                      <p className="text-xs text-muted-foreground">
                        {report.circuit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${
                        report.score > 80
                          ? "text-[oklch(0.7_0.2_145)]"
                          : report.score > 65
                            ? "text-[oklch(0.75_0.15_55)]"
                            : "text-[oklch(0.6_0.22_25)]"
                      }`}
                    >
                      {report.score}/100
                    </p>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Account Settings */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl border border-border bg-card"
          >
            <div className="border-b border-border p-6">
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 text-[oklch(0.65_0.2_290)]" />
                <h2 className="text-lg font-semibold text-foreground">
                  Account Settings
                </h2>
              </div>
            </div>
            <div className="divide-y divide-border">
              {settingsSections.map((section, index) => (
                <motion.button
                  key={section.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <section.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{section.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </motion.button>
              ))}

              {/* Logout */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => {
                  logout()
                  router.push("/")
                }}
                className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[oklch(0.6_0.22_25/0.1)]"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.6_0.22_25/0.1)]">
                    <LogOut className="h-5 w-5 text-[oklch(0.6_0.22_25)]" />
                  </div>
                  <div>
                    <p className="font-medium text-[oklch(0.6_0.22_25)]">
                      Sign Out
                    </p>
                    <p className="text-xs text-muted-foreground">
                      End your session
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </motion.button>
            </div>
          </motion.section>
        </div>

        {/* Account Info */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 rounded-xl border border-border bg-card p-6"
        >
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Account Information
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Driver ID</span>
              </div>
              <p className="mt-2 font-mono text-sm text-foreground">{user.id}</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Joined</span>
              </div>
              <p className="mt-2 text-sm text-foreground">{user.joinedDate}</p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Trophy className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Level</span>
              </div>
              <p className="mt-2 text-sm font-medium" style={{ color: levelConfig.color }}>
                {user.driverLevel}
              </p>
            </div>
            <div className="rounded-lg bg-secondary/50 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">Saved Circuits</span>
              </div>
              <p className="mt-2 text-sm text-foreground">
                {user.savedCities.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
