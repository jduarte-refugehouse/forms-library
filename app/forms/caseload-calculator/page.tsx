"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Plus,
  Trash2,
  Users,
  Calculator,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Building,
  UserCheck,
  Target,
  TrendingUp,
  FileText,
  Download,
  RefreshCw,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

import {
  SERVICE_PACKAGES,
  ADD_ONS,
  MEDICAL_COMPLEXITY,
  PLACEMENT_STATUS,
  SAMPLE_DATA,
  STAFFING_RATIOS,
  TARGET_POINTS,
  type ServicePackageKey,
  type AddOnKey,
  type MedicalComplexityKey,
  type PlacementStatusKey,
  type LocationKey,
} from "./constants"

import type { ChildAssignment, CaseManager } from "./types"

import {
  calculateCaseloadSummary,
  calculateTeamSummary,
  generateId,
  formatPoints,
  getStatusInfo,
} from "./utils"

// ============================================================================
// STATUS BADGE COMPONENT
// ============================================================================
function StatusBadge({
  status,
  size = "default",
}: {
  status: "low" | "green" | "yellow" | "red"
  size?: "default" | "large"
}) {
  const info = getStatusInfo(status)
  const Icon =
    status === "green"
      ? CheckCircle2
      : status === "yellow"
        ? AlertTriangle
        : status === "red"
          ? XCircle
          : AlertCircle

  const sizeClasses = size === "large" ? "px-4 py-2 text-base" : "px-2.5 py-0.5 text-xs"

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold text-white ${info.color} ${sizeClasses}`}
    >
      <Icon className={size === "large" ? "h-5 w-5" : "h-3 w-3"} />
      {info.label}
    </span>
  )
}

// ============================================================================
// POINT METER COMPONENT
// ============================================================================
function PointMeter({ points, showZones = true }: { points: number; showZones?: boolean }) {
  // Scale: 0-150 points mapped to 0-100%
  const percentage = Math.min((points / 150) * 100, 100)

  // Zone boundaries as percentages
  const lowEnd = (80 / 150) * 100 // 53.3%
  const greenStart = (100 / 150) * 100 // 66.7%
  const greenEnd = (120 / 150) * 100 // 80%
  const yellowEnd = (130 / 150) * 100 // 86.7%

  // Determine color based on points
  let barColor = "bg-gray-400"
  if (points >= 100 && points <= 120) barColor = "bg-green-500"
  else if (points > 120 && points <= 130) barColor = "bg-yellow-500"
  else if (points > 130) barColor = "bg-red-500"

  return (
    <div className="w-full space-y-2">
      <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
        {/* Zone indicators */}
        {showZones && (
          <>
            <div
              className="absolute h-full bg-gray-200 opacity-50"
              style={{ left: 0, width: `${lowEnd}%` }}
            />
            <div
              className="absolute h-full bg-green-100 opacity-50"
              style={{ left: `${greenStart}%`, width: `${greenEnd - greenStart}%` }}
            />
            <div
              className="absolute h-full bg-yellow-100 opacity-50"
              style={{ left: `${greenEnd}%`, width: `${yellowEnd - greenEnd}%` }}
            />
            <div
              className="absolute h-full bg-red-100 opacity-50"
              style={{ left: `${yellowEnd}%`, width: `${100 - yellowEnd}%` }}
            />
          </>
        )}

        {/* Progress bar */}
        <div
          className={`absolute h-full ${barColor} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />

        {/* Target line at 120 points */}
        <div
          className="absolute h-full w-0.5 bg-gray-800 z-10"
          style={{ left: `${greenEnd}%` }}
          title="Target: 120 points"
        />
      </div>

      {/* Scale labels */}
      {showZones && (
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>0</span>
          <span className="text-gray-400">80</span>
          <span className="text-green-600 font-medium">100-120</span>
          <span className="text-yellow-600">130</span>
          <span>150+</span>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// CHILD ENTRY ROW COMPONENT
// ============================================================================
function ChildEntryRow({
  child,
  index,
  onUpdate,
  onRemove,
}: {
  child: ChildAssignment
  index: number
  onUpdate: (index: number, updates: Partial<ChildAssignment>) => void
  onRemove: (index: number) => void
}) {
  const packageInfo = SERVICE_PACKAGES[child.package]
  const isSTASS = child.package === "stass"
  const isComplexMedical = child.package === "complex-medical"

  return (
    <div className={`p-4 rounded-lg border-2 ${packageInfo.color} border-gray-200 space-y-3`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Child ID */}
          <div>
            <Label htmlFor={`child-id-${index}`} className="text-xs font-medium text-gray-600">
              Child ID (optional)
            </Label>
            <Input
              id={`child-id-${index}`}
              value={child.id}
              onChange={(e) => onUpdate(index, { id: e.target.value })}
              placeholder="e.g., C001"
              className="mt-1 h-9 bg-white"
            />
          </div>

          {/* Service Package */}
          <div>
            <Label className="text-xs font-medium text-gray-600">Service Package *</Label>
            <Select
              value={child.package}
              onValueChange={(value: ServicePackageKey) => {
                const updates: Partial<ChildAssignment> = { package: value }
                // Reset add-ons if switching to STASS
                if (value === "stass") {
                  updates.addOns = []
                  updates.status = "active" // STASS can't have aftercare
                }
                // Reset medical complexity if switching from complex-medical
                if (value !== "complex-medical") {
                  updates.medicalComplexity = undefined
                }
                onUpdate(index, updates)
              }}
            >
              <SelectTrigger className="mt-1 h-9 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SERVICE_PACKAGES).map(([key, pkg]) => (
                  <SelectItem key={key} value={key}>
                    <span className="flex items-center gap-2">
                      <span>{pkg.shortName}</span>
                      <span className="text-gray-400 text-xs">({pkg.ratio})</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Placement Status */}
          <div>
            <Label className="text-xs font-medium text-gray-600">Placement Status *</Label>
            <Select
              value={child.status}
              onValueChange={(value: PlacementStatusKey) => onUpdate(index, { status: value })}
              disabled={isSTASS} // STASS can't have aftercare
            >
              <SelectTrigger className="mt-1 h-9 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PLACEMENT_STATUS).map(([key, status]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    disabled={key === "aftercare" && isSTASS}
                  >
                    {status.name}
                    {key === "aftercare" && (
                      <span className="text-gray-400 text-xs ml-1">(0.5 pts)</span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {isSTASS && (
              <p className="text-xs text-amber-600 mt-1">STASS does not have aftercare status</p>
            )}
          </div>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-5"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Add-Ons (only for non-STASS and active placements) */}
      {!isSTASS && child.status === "active" && (
        <div className="pt-2 border-t border-gray-200">
          <Label className="text-xs font-medium text-gray-600">Add-On Services</Label>
          <div className="flex flex-wrap gap-4 mt-2">
            {Object.entries(ADD_ONS).map(([key, addOn]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`addon-${index}-${key}`}
                  checked={child.addOns.includes(key as AddOnKey)}
                  onCheckedChange={(checked) => {
                    const newAddOns = checked
                      ? [...child.addOns, key as AddOnKey]
                      : child.addOns.filter((a) => a !== key)
                    onUpdate(index, { addOns: newAddOns })
                  }}
                />
                <label
                  htmlFor={`addon-${index}-${key}`}
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  {addOn.shortName} (+{addOn.points} pts)
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medical Complexity (only for complex-medical package and active) */}
      {isComplexMedical && child.status === "active" && (
        <div className="pt-2 border-t border-gray-200">
          <Label className="text-xs font-medium text-gray-600">Medical Complexity Level</Label>
          <Select
            value={child.medicalComplexity || "standard"}
            onValueChange={(value: MedicalComplexityKey) =>
              onUpdate(index, { medicalComplexity: value })
            }
          >
            <SelectTrigger className="mt-1 h-9 bg-white max-w-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(MEDICAL_COMPLEXITY).map(([key, level]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <span>{level.name}</span>
                    <span className="text-gray-400 text-xs">(+{level.points} pts)</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">
            {MEDICAL_COMPLEXITY[child.medicalComplexity || "standard"].description}
          </p>
        </div>
      )}

      {/* Aftercare notice */}
      {child.status === "aftercare" && (
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Aftercare status = flat 0.5 points (2 contacts per month only)
          </p>
        </div>
      )}
    </div>
  )
}

// ============================================================================
// CALCULATOR VIEW COMPONENT
// ============================================================================
function CalculatorView() {
  const [caseManagerName, setCaseManagerName] = useState("")
  const [location, setLocation] = useState<LocationKey>("dallas")
  const [children, setChildren] = useState<ChildAssignment[]>([])

  const addChild = useCallback(() => {
    setChildren((prev) => [
      ...prev,
      {
        id: "",
        package: "basic" as ServicePackageKey,
        status: "active" as PlacementStatusKey,
        addOns: [],
        medicalComplexity: undefined,
      },
    ])
  }, [])

  const updateChild = useCallback((index: number, updates: Partial<ChildAssignment>) => {
    setChildren((prev) =>
      prev.map((child, i) => (i === index ? { ...child, ...updates } : child))
    )
  }, [])

  const removeChild = useCallback((index: number) => {
    setChildren((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const clearAll = useCallback(() => {
    setCaseManagerName("")
    setChildren([])
  }, [])

  // Calculate summary
  const summary = useMemo(() => {
    if (children.length === 0) return null
    const tempCM: CaseManager = {
      id: "temp",
      name: caseManagerName || "Case Manager",
      location,
      children,
    }
    return calculateCaseloadSummary(tempCM)
  }, [children, caseManagerName, location])

  return (
    <div className="space-y-6">
      {/* Header Form */}
      <Card className="border-2 border-[#5E3989]">
        <CardHeader className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10">
          <CardTitle className="flex items-center gap-2 text-[#5E3989]">
            <Calculator className="h-5 w-5" />
            Case Manager Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cm-name">Case Manager Name</Label>
              <Input
                id="cm-name"
                value={caseManagerName}
                onChange={(e) => setCaseManagerName(e.target.value)}
                placeholder="Enter case manager name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Select
                value={location}
                onValueChange={(value: LocationKey) => setLocation(value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dallas">
                    <span className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Dallas
                    </span>
                  </SelectItem>
                  <SelectItem value="sanAntonio">
                    <span className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      San Antonio
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {summary && (
        <Card
          className={`border-2 ${
            summary.status === "green"
              ? "border-green-500 bg-green-50"
              : summary.status === "yellow"
                ? "border-yellow-500 bg-yellow-50"
                : summary.status === "red"
                  ? "border-red-500 bg-red-50"
                  : "border-gray-400 bg-gray-50"
          }`}
        >
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-600 mb-1">Total Caseload Points</p>
                <p className="text-5xl font-bold text-gray-800">
                  {formatPoints(summary.totalPoints)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Target: {TARGET_POINTS} points
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <StatusBadge status={summary.status} size="large" />
                <p className="text-sm text-gray-600">{getStatusInfo(summary.status).description}</p>
              </div>
              <div className="text-center md:text-right space-y-1">
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold">{summary.childCount} children</span>
                </div>
                <p className="text-sm text-gray-500">
                  {summary.activeCount} active • {summary.aftercareCount} aftercare
                </p>
              </div>
            </div>
            <div className="mt-6">
              <PointMeter points={summary.totalPoints} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Children List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#5E3989]" />
              Assigned Children ({children.length})
            </CardTitle>
            <div className="flex gap-2">
              {children.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
              <Button
                onClick={addChild}
                className="bg-[#5E3989] hover:bg-[#5E3989]/90 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Child
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {children.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No children assigned yet</p>
              <p className="text-sm">Click &quot;Add Child&quot; to start building the caseload</p>
            </div>
          ) : (
            <div className="space-y-4">
              {children.map((child, index) => (
                <ChildEntryRow
                  key={`child-${index}`}
                  child={child}
                  index={index}
                  onUpdate={updateChild}
                  onRemove={removeChild}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Breakdown Table */}
      {summary && summary.breakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#5E3989]" />
              Point Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Child ID</TableHead>
                    <TableHead>Service Package</TableHead>
                    <TableHead className="text-center">Base Points</TableHead>
                    <TableHead className="text-center">Add-Ons</TableHead>
                    <TableHead className="text-center">Medical</TableHead>
                    <TableHead className="text-center font-bold">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.breakdown.map((row, idx) => (
                    <TableRow
                      key={idx}
                      className={row.isAftercare ? "bg-gray-50 italic" : ""}
                    >
                      <TableCell className="font-mono text-sm">
                        {row.childId || `Child ${idx + 1}`}
                        {row.isAftercare && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Aftercare
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{row.packageShortName}</TableCell>
                      <TableCell className="text-center">{formatPoints(row.basePoints)}</TableCell>
                      <TableCell className="text-center">
                        {row.addOnPoints > 0 ? (
                          <span className="text-blue-600">+{row.addOnPoints}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.medicalModifier > 0 ? (
                          <span className="text-purple-600">+{row.medicalModifier}</span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-bold">
                        {formatPoints(row.totalPoints)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-100 font-bold">
                    <TableCell colSpan={5} className="text-right">
                      Total Caseload Points:
                    </TableCell>
                    <TableCell className="text-center text-lg">
                      {formatPoints(summary.totalPoints)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ============================================================================
// TEAM DASHBOARD VIEW COMPONENT
// ============================================================================
function TeamDashboardView() {
  const [selectedLocation, setSelectedLocation] = useState<LocationKey | "all">("all")

  // Combine all sample data
  const allCaseManagers: CaseManager[] = useMemo(() => {
    return [...SAMPLE_DATA.dallas, ...SAMPLE_DATA.sanAntonio]
  }, [])

  const filteredManagers = useMemo(() => {
    if (selectedLocation === "all") return allCaseManagers
    return allCaseManagers.filter((cm) => cm.location === selectedLocation)
  }, [allCaseManagers, selectedLocation])

  // Calculate summaries
  const managerSummaries = useMemo(() => {
    return filteredManagers.map((cm) => ({
      ...cm,
      summary: calculateCaseloadSummary(cm),
    }))
  }, [filteredManagers])

  // Sort by points (high to low for easy identification of concerns)
  const sortedManagers = useMemo(() => {
    return [...managerSummaries].sort((a, b) => b.summary.totalPoints - a.summary.totalPoints)
  }, [managerSummaries])

  // Team summary stats
  const teamStats = useMemo(() => {
    const stats = {
      total: managerSummaries.length,
      totalChildren: managerSummaries.reduce((sum, m) => sum + m.summary.childCount, 0),
      avgPoints:
        managerSummaries.length > 0
          ? managerSummaries.reduce((sum, m) => sum + m.summary.totalPoints, 0) /
            managerSummaries.length
          : 0,
      inGreen: managerSummaries.filter((m) => m.summary.status === "green").length,
      inYellow: managerSummaries.filter((m) => m.summary.status === "yellow").length,
      inRed: managerSummaries.filter((m) => m.summary.status === "red").length,
      inLow: managerSummaries.filter((m) => m.summary.status === "low").length,
    }
    return stats
  }, [managerSummaries])

  return (
    <div className="space-y-6">
      {/* Location Filter */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Label>Filter by Location:</Label>
              <Select
                value={selectedLocation}
                onValueChange={(value: LocationKey | "all") => setSelectedLocation(value)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="dallas">Dallas</SelectItem>
                  <SelectItem value="sanAntonio">San Antonio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Badge variant="outline" className="border-[#5E3989] text-[#5E3989]">
              Demo Data - {teamStats.total} Case Managers
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-2 border-green-500">
          <CardContent className="pt-4 text-center">
            <CheckCircle2 className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <p className="text-3xl font-bold text-green-600">{teamStats.inGreen}</p>
            <p className="text-sm text-gray-600">Optimal</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-yellow-500">
          <CardContent className="pt-4 text-center">
            <AlertTriangle className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <p className="text-3xl font-bold text-yellow-600">{teamStats.inYellow}</p>
            <p className="text-sm text-gray-600">Monitor</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-red-500">
          <CardContent className="pt-4 text-center">
            <XCircle className="h-8 w-8 mx-auto text-red-500 mb-2" />
            <p className="text-3xl font-bold text-red-600">{teamStats.inRed}</p>
            <p className="text-sm text-gray-600">Over Capacity</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-gray-400">
          <CardContent className="pt-4 text-center">
            <AlertCircle className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <p className="text-3xl font-bold text-gray-600">{teamStats.inLow}</p>
            <p className="text-sm text-gray-600">Under-utilized</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#5E3989]" />
              Case Manager Overview
            </CardTitle>
            <div className="text-sm text-gray-500">
              {teamStats.totalChildren} total children •{" "}
              {formatPoints(teamStats.avgPoints)} avg points
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedManagers.map((cm) => (
              <Card
                key={cm.id}
                className={`border-l-4 ${
                  cm.summary.status === "green"
                    ? "border-l-green-500"
                    : cm.summary.status === "yellow"
                      ? "border-l-yellow-500"
                      : cm.summary.status === "red"
                        ? "border-l-red-500"
                        : "border-l-gray-400"
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#5E3989] to-[#A90533] flex items-center justify-center text-white font-bold text-lg">
                        {cm.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-semibold text-lg">{cm.name}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {cm.location === "dallas" ? "Dallas" : "San Antonio"}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 max-w-md px-4">
                      <PointMeter points={cm.summary.totalPoints} showZones={false} />
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {formatPoints(cm.summary.totalPoints)}
                        </p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{cm.summary.childCount}</p>
                        <p className="text-xs text-gray-500">children</p>
                      </div>
                      <StatusBadge status={cm.summary.status} />
                    </div>
                  </div>

                  {/* Package distribution */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(
                        cm.children.reduce(
                          (acc, child) => {
                            acc[child.package] = (acc[child.package] || 0) + 1
                            return acc
                          },
                          {} as Record<string, number>
                        )
                      ).map(([pkg, count]) => (
                        <Badge
                          key={pkg}
                          variant="outline"
                          className={`${SERVICE_PACKAGES[pkg as ServicePackageKey].color} border-gray-300`}
                        >
                          {SERVICE_PACKAGES[pkg as ServicePackageKey].shortName}: {count}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// RATIO REFERENCE VIEW COMPONENT
// ============================================================================
function RatioReferenceView() {
  return (
    <div className="space-y-6">
      {/* Point System Quick Reference */}
      <Card className="border-2 border-[#5E3989]">
        <CardHeader className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10">
          <CardTitle className="flex items-center gap-2 text-[#5E3989]">
            <Calculator className="h-5 w-5" />
            Case Manager Point System
          </CardTitle>
          <CardDescription>
            120 total points ÷ Service Package Ratio = Point Value per Child
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Service Package</TableHead>
                  <TableHead className="text-center">CM Ratio</TableHead>
                  <TableHead className="text-center">Points</TableHead>
                  <TableHead>Rationale</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(SERVICE_PACKAGES).map(([key, pkg]) => (
                  <TableRow key={key} className={pkg.color}>
                    <TableCell className="font-medium">{pkg.name}</TableCell>
                    <TableCell className="text-center font-mono">{pkg.ratio}</TableCell>
                    <TableCell className="text-center font-bold">{pkg.points}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {key === "basic" && "Lowest complexity, highest ratio"}
                      {key === "substance-use" && "Recovery coordination, weekly therapy monitoring"}
                      {key === "stass" && "Time-limited but intensive assessment coordination"}
                      {key === "mental-behavioral" && "Standard behavioral health complexity"}
                      {key === "idd-autism" && "Standard ratio with specialized developmental needs"}
                      {key === "human-trafficking" && "Standard ratio with trauma specialization"}
                      {key === "sexual-aggression" && "Standard ratio with specialized treatment coordination"}
                      {key === "tffc" && "Highest intensity; 60-day reviews; step-down planning"}
                      {key === "specialized-tfc" && "Highest intensity, research-based model"}
                      {key === "complex-medical" && "High complexity, medical coordination required"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add-Ons and Modifiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="h-5 w-5 text-blue-600" />
              Add-On Service Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead>Add-On Service</TableHead>
                  <TableHead className="text-center">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(ADD_ONS).map(([key, addOn]) => (
                  <TableRow key={key}>
                    <TableCell>{addOn.name}</TableCell>
                    <TableCell className="text-center font-bold text-blue-600">
                      +{addOn.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs text-gray-500 mt-3">
              Note: STASS is NOT eligible for Add-On Services per T3C Blueprint.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-purple-600" />
              Medical Complexity Modifiers
            </CardTitle>
            <CardDescription>Applied to Complex Medical Needs package only</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-50">
                  <TableHead>Complexity Level</TableHead>
                  <TableHead className="text-center">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(MEDICAL_COMPLEXITY).map(([key, level]) => (
                  <TableRow key={key}>
                    <TableCell>
                      <p className="font-medium">{level.name}</p>
                      <p className="text-xs text-gray-500">{level.description}</p>
                    </TableCell>
                    <TableCell className="text-center font-bold text-purple-600">
                      +{level.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Aftercare Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserCheck className="h-5 w-5 text-green-600" />
            Aftercare Status Modifier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-green-800">Aftercare Status</p>
                <p className="text-sm text-green-700">
                  Post-discharge, receiving follow-up contacts (2 contacts per month)
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">0.5</p>
                <p className="text-xs text-green-600">points (flat)</p>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">
              Note: Short-Term Assessment children do NOT enter aftercare status per T3C Blueprint.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Complete Staffing Ratio Matrix */}
      <Accordion type="single" collapsible defaultValue="staffing-matrix">
        <AccordionItem value="staffing-matrix" className="border-2 border-[#5E3989] rounded-lg">
          <AccordionTrigger className="px-4 hover:bg-gray-50">
            <span className="flex items-center gap-2 text-[#5E3989] font-semibold">
              <Users className="h-5 w-5" />
              Complete Staffing Ratio Matrix
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10">
                    <TableHead className="font-bold">Service Package</TableHead>
                    <TableHead className="text-center">Case Manager</TableHead>
                    <TableHead className="text-center">Licensed Therapist</TableHead>
                    <TableHead className="text-center">BSS/Mentor</TableHead>
                    <TableHead className="text-center">Crisis Mgmt</TableHead>
                    <TableHead className="text-center">Aftercare CM</TableHead>
                    <TableHead className="text-center">Foster Home Limit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(STAFFING_RATIOS.packages).map(([key, ratios]) => (
                    <TableRow key={key} className={SERVICE_PACKAGES[key as ServicePackageKey].color}>
                      <TableCell className="font-medium">
                        {SERVICE_PACKAGES[key as ServicePackageKey].shortName}
                        {"specialNote" in ratios && (
                          <p className="text-xs text-amber-600 mt-1">{ratios.specialNote}</p>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-mono">
                        {ratios.caseManager}
                      </TableCell>
                      <TableCell className="text-center font-mono">
                        {ratios.licensedTherapist}
                      </TableCell>
                      <TableCell className="text-center font-mono">{ratios.bssMentor}</TableCell>
                      <TableCell className="text-center font-mono">
                        {ratios.crisisManagement}
                      </TableCell>
                      <TableCell className="text-center font-mono">{ratios.aftercareCM}</TableCell>
                      <TableCell className="text-center text-sm">
                        {ratios.fosterHomeLimit}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Caseload Zones Reference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-[#5E3989]" />
            Caseload Management Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Zone</TableHead>
                <TableHead className="text-center">Point Range</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action Required</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-gray-50">
                <TableCell>
                  <Badge className="bg-gray-400">Low</Badge>
                </TableCell>
                <TableCell className="text-center font-mono">Under 80</TableCell>
                <TableCell>Under-utilized</TableCell>
                <TableCell className="text-sm">May indicate capacity for additional assignments</TableCell>
              </TableRow>
              <TableRow className="bg-green-50">
                <TableCell>
                  <Badge className="bg-green-500">Green</Badge>
                </TableCell>
                <TableCell className="text-center font-mono">100-120</TableCell>
                <TableCell>Optimal</TableCell>
                <TableCell className="text-sm">Normal operations</TableCell>
              </TableRow>
              <TableRow className="bg-yellow-50">
                <TableCell>
                  <Badge className="bg-yellow-500">Yellow</Badge>
                </TableCell>
                <TableCell className="text-center font-mono">121-130</TableCell>
                <TableCell>Monitor</TableCell>
                <TableCell className="text-sm">Requires supervisor awareness; consider rebalancing</TableCell>
              </TableRow>
              <TableRow className="bg-red-50">
                <TableCell>
                  <Badge className="bg-red-500">Red</Badge>
                </TableCell>
                <TableCell className="text-center font-mono">131+</TableCell>
                <TableCell>Over Capacity</TableCell>
                <TableCell className="text-sm font-semibold text-red-700">Immediate intervention required</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Document References */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-gray-600" />
            Document References
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-mono text-[#5E3989]">FC-SU-01</span>
                <span className="text-gray-600">Substance Use Support Services Policy</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[#5E3989]">FC-STASS-01</span>
                <span className="text-gray-600">Short-Term Assessment Support Services Policy</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[#5E3989]">FC-TFFC-01</span>
                <span className="text-gray-600">Treatment Foster Family Care Support Services Policy</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[#5E3989]">FC-MH-01</span>
                <span className="text-gray-600">Mental & Behavioral Health Support Services Policy</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-mono text-[#5E3989]">FC-IDD-01</span>
                <span className="text-gray-600">IDD/Autism Support Services Policy</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[#5E3989]">FC-04</span>
                <span className="text-gray-600">Crisis Management Policy</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[#5E3989]">FC-AF-01</span>
                <span className="text-gray-600">Aftercare Services Policy</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-[#A90533]">T3C Blueprint</span>
                <span className="text-gray-600">DFPS T3C System Blueprint (April 2025)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function CaseloadCalculatorPage() {
  const [activeTab, setActiveTab] = useState("calculator")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-[#5E3989] hover:bg-[#5E3989]/10">
              <ArrowLeft className="h-4 w-4" />
              Back to Directory
            </Button>
          </Link>
          <Image
            src="/images/refugehouse-logo.png"
            alt="Refuge House Logo"
            width={120}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5E3989] to-[#A90533] bg-clip-text text-transparent mb-2">
            T3C Caseload Point System & Staffing Ratios
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ensuring Compliant Ratios Across Blended Service Packages
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <span>Document Version: 2.0</span>
            <span>•</span>
            <span>Effective: December 2025</span>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:max-w-xl lg:mx-auto">
            <TabsTrigger value="calculator" className="gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="reference" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Ratio Reference</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator">
            <CalculatorView />
          </TabsContent>

          <TabsContent value="team">
            <TeamDashboardView />
          </TabsContent>

          <TabsContent value="reference">
            <RatioReferenceView />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            This document ensures T3C compliance while providing flexibility for real-world
            caseload management.
          </p>
          <p className="mt-1">
            Regular monitoring and adjustment will optimize both child outcomes and staff
            wellbeing.
          </p>
          <p className="mt-4 font-medium text-gray-600">
            © 2025 Refuge House. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

