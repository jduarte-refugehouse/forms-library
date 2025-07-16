"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, Edit, RefreshCw } from "lucide-react"
import Link from "next/link"
import { FosterHomeCredentialSection } from "@/components/foster-home-credential-section"

export default function FosterHomeCredentialPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [viewMode, setViewMode] = useState<"edit" | "view">((searchParams.get("viewMode") as "edit" | "view") || "edit")
  const [childId] = useState(searchParams.get("childId") || "sample-child-123")
  const [homeId] = useState(searchParams.get("homeId") || "FH-2024-0156")
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Sample child data
  const childData = {
    id: childId,
    name: "Emma Rodriguez",
    servicePackage: "mental-behavioral" as const,
    addOnServices: ["trauma-informed-care"],
  }

  // Sample section data - simplified for service plan widget
  const [sectionData, setSectionData] = useState({
    homeInfo: {
      familyName: "Johnson Family",
      homeId: homeId,
      licenseNumber: "TX-FC-789456",
    },
    credentials: {
      t3cBasic: { status: "current" as const, expiration: "2025-12-15" },
      servicePackage: { status: "current" as const, expiration: "2025-08-30" },
      addOns: [{ name: "Trauma-Informed Care", status: "expiring" as const, expiration: "2024-12-30" }],
    },
  })

  // Update URL when view mode changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("viewMode", viewMode)
    if (childId) params.set("childId", childId)
    if (homeId) params.set("homeId", homeId)
    router.replace(`/forms/foster-home-credential?${params.toString()}`)
  }, [viewMode, childId, homeId, router, searchParams])

  const handleUpdate = (data: any) => {
    setSectionData((prev) => ({ ...prev, ...data }))
    setLastSaved(new Date())
  }

  const handleValidationChange = (isValid: boolean) => {
    console.log("Validation changed:", isValid)
  }

  const handleSave = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastSaved(new Date())
    setIsLoading(false)
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "edit" ? "view" : "edit"))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Navigation Header */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Forms Directory
              </Button>
            </Link>
            <div className="h-4 w-px bg-gray-300" />
            <nav className="text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">
                Forms Directory
              </Link>
              <span className="mx-2">/</span>
              <Link href="/#service-planning" className="hover:text-gray-900">
                Service Planning
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Foster Home Credential Widget</span>
            </nav>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold">Foster Home Credential Widget</h1>
                <p className="text-sm text-gray-600">
                  Service plan component for {childData.name} • {sectionData.homeInfo.familyName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Badge variant={viewMode === "edit" ? "default" : "secondary"}>
                  {viewMode === "edit" ? "Edit Mode" : "View Mode"}
                </Badge>
                <Button variant="outline" size="sm" onClick={toggleViewMode} className="gap-2 bg-transparent">
                  {viewMode === "edit" ? (
                    <>
                      <Eye className="h-4 w-4" />
                      View
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>

              <div className="h-4 w-px bg-gray-300" />

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="gap-2 bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>

              {viewMode === "edit" && (
                <Button onClick={handleSave} disabled={isLoading} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Service Plan Context */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="font-semibold text-blue-900 mb-2">Service Plan Component</h2>
          <p className="text-sm text-blue-800">
            This widget appears within the child's service plan to provide quick credential verification. The full
            credentialing record is maintained separately and accessed via the link below.
          </p>
        </div>

        {/* Main Content - Service Plan Widget */}
        <div className="space-y-6">
          <FosterHomeCredentialSection
            childData={childData}
            sectionData={sectionData}
            onUpdate={handleUpdate}
            onValidationChange={handleValidationChange}
            viewMode={viewMode}
          />

          {/* Additional Context */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Widget Purpose</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Shows basic credential status at a glance</li>
              <li>• Alerts when credentials are expiring within 30 days</li>
              <li>• Links to full credentialing record for detailed management</li>
              <li>• Integrates seamlessly into the service plan workflow</li>
            </ul>
          </div>

          {/* Last Saved Indicator */}
          {lastSaved && viewMode === "edit" && (
            <div className="text-center text-sm text-gray-500">Last saved: {lastSaved.toLocaleString()}</div>
          )}
        </div>
      </div>
    </div>
  )
}
