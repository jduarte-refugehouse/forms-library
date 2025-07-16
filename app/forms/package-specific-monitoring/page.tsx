"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Settings, Eye, Edit, RefreshCw, BarChart3 } from "lucide-react"
import Link from "next/link"
import { PackageSpecificMonitoringSection } from "@/components/package-specific-monitoring-section"

export default function PackageSpecificMonitoringPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [packageType, setPackageType] = useState(searchParams.get("packageType") || "mental-behavioral")
  const [viewMode, setViewMode] = useState<"edit" | "view">((searchParams.get("viewMode") as "edit" | "view") || "edit")
  const [childId] = useState(searchParams.get("childId") || "sample-child-123")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Sample child data
  const childData = {
    id: childId,
    name: "Sample Child",
    age: 12,
    servicePackage: packageType === "mental-behavioral" ? "Mental & Behavioral Health" : "IDD/Autism Services",
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
    setPackageType(newPackage)
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

  const getPackageColor = (pkg: string) => {
    return pkg === "mental-behavioral" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"
  }

  const getPackageDescription = (pkg: string) => {
    return pkg === "mental-behavioral"
      ? "Comprehensive monitoring for therapy, crisis management, medication compliance, and 24/7 support utilization"
      : "Specialized tracking for therapy schedules, IEP/ARD meetings, behavioral data, and skill development"
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
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mental-behavioral">Mental & Behavioral Health</SelectItem>
                    <SelectItem value="idd-autism">IDD/Autism Services</SelectItem>
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
      <div className={`px-4 py-3 ${getPackageColor(packageType)}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                {packageType === "mental-behavioral"
                  ? "Mental & Behavioral Health Package"
                  : "IDD/Autism Services Package"}
              </h2>
              <p className="text-sm opacity-90">{getPackageDescription(packageType)}</p>
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
