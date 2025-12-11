import {
  SERVICE_PACKAGES,
  ADD_ONS,
  MEDICAL_COMPLEXITY,
  PLACEMENT_STATUS,
  OPTIMAL_MIN,
  OPTIMAL_MAX,
  MONITOR_MAX,
} from "./constants"
import type {
  ChildAssignment,
  CaseManager,
  ChildPointBreakdown,
  CaseloadSummary,
  TeamSummary,
} from "./types"
import type { LocationKey } from "./constants"

/**
 * Calculate points for a single child assignment
 */
export function calculateChildPoints(child: ChildAssignment): ChildPointBreakdown {
  const packageInfo = SERVICE_PACKAGES[child.package]
  const statusInfo = PLACEMENT_STATUS[child.status]

  // If aftercare, use flat 0.5 points regardless of package
  const isAftercare = !statusInfo.usePackagePoints
  let basePoints = isAftercare ? 0.5 : packageInfo.points

  // Calculate add-on points (only for active placements, and not for STASS)
  let addOnPoints = 0
  const addOnDetails: string[] = []

  if (!isAftercare && !packageInfo.noAddOns) {
    child.addOns.forEach((addOnKey) => {
      const addOn = ADD_ONS[addOnKey]
      addOnPoints += addOn.points
      addOnDetails.push(`${addOn.shortName} (+${addOn.points})`)
    })
  }

  // Calculate medical complexity modifier (only for complex-medical package and active placements)
  let medicalModifier = 0
  if (
    !isAftercare &&
    "hasComplexity" in packageInfo &&
    packageInfo.hasComplexity &&
    child.medicalComplexity
  ) {
    medicalModifier = MEDICAL_COMPLEXITY[child.medicalComplexity].points
  }

  const totalPoints = basePoints + addOnPoints + medicalModifier

  return {
    childId: child.id,
    packageName: packageInfo.name,
    packageShortName: packageInfo.shortName,
    basePoints,
    addOnPoints,
    medicalModifier,
    totalPoints,
    isAftercare,
    addOnDetails,
  }
}

/**
 * Determine caseload status zone based on total points
 */
export function getCaseloadStatus(totalPoints: number): "low" | "green" | "yellow" | "red" {
  if (totalPoints < 80) return "low"
  if (totalPoints >= OPTIMAL_MIN && totalPoints <= OPTIMAL_MAX) return "green"
  if (totalPoints > OPTIMAL_MAX && totalPoints <= MONITOR_MAX) return "yellow"
  return "red"
}

/**
 * Calculate full caseload summary for a case manager
 */
export function calculateCaseloadSummary(caseManager: CaseManager): CaseloadSummary {
  const breakdown: ChildPointBreakdown[] = caseManager.children.map(calculateChildPoints)

  const totalPoints = breakdown.reduce((sum, child) => sum + child.totalPoints, 0)
  const activeCount = breakdown.filter((child) => !child.isAftercare).length
  const aftercareCount = breakdown.filter((child) => child.isAftercare).length

  return {
    totalPoints: Math.round(totalPoints * 10) / 10, // Round to 1 decimal
    childCount: caseManager.children.length,
    activeCount,
    aftercareCount,
    breakdown,
    status: getCaseloadStatus(totalPoints),
  }
}

/**
 * Calculate team summary for a location
 */
export function calculateTeamSummary(
  caseManagers: CaseManager[],
  location: LocationKey
): TeamSummary {
  const locationManagers = caseManagers.filter((cm) => cm.location === location)

  const summaries = locationManagers.map(calculateCaseloadSummary)

  const totalChildren = summaries.reduce((sum, s) => sum + s.childCount, 0)
  const totalPoints = summaries.reduce((sum, s) => sum + s.totalPoints, 0)

  return {
    location,
    totalChildren,
    caseManagerCount: locationManagers.length,
    averagePoints:
      locationManagers.length > 0
        ? Math.round((totalPoints / locationManagers.length) * 10) / 10
        : 0,
    inGreen: summaries.filter((s) => s.status === "green").length,
    inYellow: summaries.filter((s) => s.status === "yellow").length,
    inRed: summaries.filter((s) => s.status === "red").length,
    inLow: summaries.filter((s) => s.status === "low").length,
  }
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Format points for display
 */
export function formatPoints(points: number): string {
  return points % 1 === 0 ? points.toString() : points.toFixed(1)
}

/**
 * Get status display info
 */
export function getStatusInfo(status: "low" | "green" | "yellow" | "red") {
  const statusMap = {
    low: {
      label: "Under-utilized",
      color: "bg-gray-400",
      textColor: "text-gray-700",
      description: "May indicate capacity for additional assignments",
      icon: "AlertCircle",
    },
    green: {
      label: "Optimal",
      color: "bg-green-500",
      textColor: "text-green-700",
      description: "Normal operations",
      icon: "CheckCircle2",
    },
    yellow: {
      label: "Monitor",
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
      description: "Requires supervisor awareness; consider rebalancing",
      icon: "AlertTriangle",
    },
    red: {
      label: "Over Capacity",
      color: "bg-red-500",
      textColor: "text-red-700",
      description: "Immediate intervention required",
      icon: "XCircle",
    },
  }
  return statusMap[status]
}

