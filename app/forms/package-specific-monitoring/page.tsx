"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Settings, Eye, Edit, RefreshCw, BarChart3, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { PackageSpecificMonitoringSection } from "@/components/package-specific-monitoring-section"

// Package configuration
const PACKAGES = {
  'mental-behavioral': {
    label: 'Mental & Behavioral Health',
    cycle: 90,
    color: 'bg-blue-100 text-blue-800',
    borderColor: 'border-blue-500',
  },
  'idd-autism': {
    label: 'IDD/Autism Services',
    cycle: 90,
    color: 'bg-teal-100 text-teal-800',
    borderColor: 'border-teal-500',
  },
  'substance-use': {
    label: 'Substance Use Support Services',
    cycle: 90,
    color: 'bg-amber-100 text-amber-800',
    borderColor: 'border-amber-500',
  },
  'stass': {
    label: 'Short-Term Assessment (STASS)',
    cycle: null, // No continued stay
    color: 'bg-gray-100 text-gray-800',
    borderColor: 'border-gray-500',
  },
  'tffc': {
    label: 'Treatment Foster Family Care',
    cycle: 60,
    color: 'bg-purple-100 text-purple-800',
    borderColor: 'border-purple-500',
  },
} as const

type PackageKey = keyof typeof PACKAGES

export default function PackageSpecificMonitoringPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [packageType, setPackageType] = useState<PackageKey>((searchParams.get("packageType") as PackageKey) || "mental-behavioral")
  const [viewMode, setViewMode] = useState<"edit" | "view">((searchParams.get("viewMode") as "edit" | "view") || "edit")
  const [childId] = useState(searchParams.get("childId") || "sample-child-123")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const currentPackage = PACKAGES[packageType]

  // Sample child data
  const childData = {
    id: childId,
    name: "Sample Child",
    age: 12,
    servicePackage: currentPackage.label,
    placementDate: "2024-01-15",
    caseWorker: "Jane Smith, LCSW",
  }

  // Sample section data
  const [sectionData, setSectionData] = useState({
    packageType,
    lastUpdated: new Date().toISOString(),
    data: {},
  })

  // Update URL when package or view mode changes
  useEffect(() => {
    const params = new URLSearchParams()
    params.set("packageType", packageType)
    params.set("viewMode", viewMode)
    params.set("childId", childId)

    router.replace(`/forms/package-specific-monitoring?${params.toString()}`, { scroll: false })
  }, [packageType, viewMode, childId, router])

  const handlePackageChange = (newPackage: string) => {
    setPackageType(newPackage as PackageKey)
    setSectionData((prev) => ({
      ...prev,
      packageType: newPackage,
      lastUpdated: new Date().toISOString(),
    }))
  }

  const handleViewModeChange = (newMode: "edit" | "view") => {
    setViewMode(newMode)
  }

  const handleUpdate = (updatedData: any) => {
    setSectionData((prev) => ({
      ...prev,
      data: updatedData,
      lastUpdated: new Date().toISOString(),
    }))
    setLastSaved(new Date())
  }

  const handleValidationChange = (isValid: boolean) => {
    // Handle validation state changes
    console.log("Validation state:", isValid)
  }

  const handleRefresh = () => {
    // Refresh data
    setSectionData((prev) => ({
      ...prev,
      lastUpdated: new Date().toISOString(),
    }))
  }

  const getPackageDescription = (pkg: PackageKey) => {
    const descriptions: Record<PackageKey, string> = {
      'mental-behavioral': 'Comprehensive monitoring for therapy, crisis management, medication compliance, and 24/7 support utilization',
      'idd-autism': 'Specialized tracking for therapy schedules, IEP/ARD meetings, behavioral data, and skill development',
      'substance-use': 'Recovery-focused monitoring for treatment engagement, MAT compliance, relapse prevention, and sobriety milestones',
      'stass': 'Assessment timeline tracking, deadline monitoring, and placement recommendation documentation (30-45 day limit)',
      'tffc': '60-day review cycle, crisis pattern analysis, On-Call Therapist logs, step-down readiness, and 365-day countdown',
    }
    return descriptions[pkg]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Directory
              </Button>
            </Link>
            <div className="text-sm text-gray-500">Forms / Service Planning / Package-Specific Monitoring</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <BarChart3 className="h-3 w-3" />
              Monitoring Dashboard
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Controls Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Package:</span>
                <Select value={packageType} onValueChange={handlePackageChange}>
                  <SelectTrigger className="w-72">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mental-behavioral">Mental & Behavioral Health</SelectItem>
                    <SelectItem value="idd-autism">IDD/Autism Services</SelectItem>
                    <SelectItem value="substance-use">Substance Use Support Services</SelectItem>
                    <SelectItem value="stass">Short-Term Assessment (STASS)</SelectItem>
                    <SelectItem value="tffc">Treatment Foster Family Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Mode:</span>
                <div className="flex rounded-md border border-gray-300">
                  <Button
                    variant={viewMode === "edit" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleViewModeChange("edit")}
                    className="rounded-r-none border-r"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant={viewMode === "view" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleViewModeChange("view")}
                    className="rounded-l-none"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {lastSaved && <span className="text-xs text-gray-500">Last saved: {lastSaved.toLocaleTimeString()}</span>}
              <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-1 bg-transparent">
                <RefreshCw className="h-3 w-3" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Package Information Banner */}
      <div className={`px-4 py-3 ${currentPackage.color}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{currentPackage.label}</h2>
                {currentPackage.cycle && (
                  <Badge variant="secondary" className="bg-white/40 text-current">
                    <Clock className="h-3 w-3 mr-1" />
                    {currentPackage.cycle}-Day Cycle
                  </Badge>
                )}
                {packageType === 'stass' && (
                  <Badge variant="secondary" className="bg-yellow-200 text-yellow-800">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    30-45 Day Limit
                  </Badge>
                )}
                {packageType === 'tffc' && (
                  <Badge variant="secondary" className="bg-purple-200 text-purple-800">
                    365-Day Maximum
                  </Badge>
                )}
              </div>
              <p className="text-sm opacity-90 mt-1">{getPackageDescription(packageType)}</p>
            </div>
            <Badge variant="secondary" className="bg-white/20">
              {viewMode === "edit" ? "Editing" : "Viewing"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Child Information */}
      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Child Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p>{childData.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Age:</span>
                  <p>{childData.age} years</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Service Package:</span>
                  <p>{childData.servicePackage}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Case Worker:</span>
                  <p>{childData.caseWorker}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <PackageSpecificMonitoringSection
            childData={childData}
            packageType={packageType}
            sectionData={sectionData}
            onUpdate={handleUpdate}
            onValidationChange={handleValidationChange}
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  )
}
