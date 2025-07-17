"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, Edit, RefreshCw, Printer } from "lucide-react"
import Link from "next/link"
import { FosterHomeCredentialingAssessment } from "@/components/foster-home-credentialing-assessment"

export default function FosterHomeCredentialingAssessmentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [viewMode, setViewMode] = useState<"edit" | "view">((searchParams.get("viewMode") as "edit" | "view") || "edit")
  const [homeId] = useState(searchParams.get("homeId") || "FH-2024-0156")
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isValid, setIsValid] = useState(true)

  // Sample home data
  const homeData = {
    id: homeId,
    familyName: "Johnson Family",
    radiusId: "RH-12345",
  }

  // Sample section data - will be managed by the useEnhancedForm hook
  const [sectionData, setSectionData] = useState<any>(null) // Let the component manage its own initial state

  // Update URL when view mode changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("viewMode", viewMode)
    if (homeId) params.set("homeId", homeId)
    router.replace(`/forms/foster-home-credentialing-assessment?${params.toString()}`)
  }, [viewMode, homeId, router, searchParams])

  const handleUpdate = (data: any) => {
    setSectionData(data)
    setLastSaved(new Date())
  }

  const handleValidationChange = (valid: boolean) => {
    setIsValid(valid)
  }

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastSaved(new Date())
    setIsLoading(false)
    alert("Form saved successfully!")
  }

  const handleRefresh = () => {
    setIsLoading(true)
    // In a real app, you'd refetch data here
    setTimeout(() => {
      setIsLoading(false)
      setLastSaved(new Date()) // Simulate refresh
    }, 1000)
  }

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "edit" ? "view" : "edit"))
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <div className="container mx-auto px-4 py-6 max-w-4xl print:max-w-full print:p-0">
        {/* Navigation Header */}
        <div className="mb-6 print:hidden">
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
              <Link href="/#foster-homes" className="hover:text-gray-900">
                Foster Homes
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Foster Home Initial Credentialing Assessment</span>
            </nav>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold">Foster Home Initial Credentialing Assessment</h1>
                <p className="text-sm text-gray-600">
                  Assessment for {homeData.familyName} ({homeData.radiusId})
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

              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2 bg-transparent">
                <Printer className="h-4 w-4" />
                Print
              </Button>

              {viewMode === "edit" && (
                <Button onClick={handleSave} disabled={isLoading || !isValid} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content - Foster Home Credentialing Assessment */}
        <div className="space-y-6">
          <FosterHomeCredentialingAssessment
            homeData={homeData}
            sectionData={sectionData}
            onUpdate={handleUpdate}
            onValidationChange={handleValidationChange}
            viewMode={viewMode}
            userRole="program_director" // Example role for testing conditional sections
          />

          {/* Last Saved Indicator */}
          {lastSaved && viewMode === "edit" && (
            <div className="text-center text-sm text-gray-500 print:hidden">
              Last saved: {lastSaved.toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
