"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ServiceAuthorizationSection from "@/components/service-authorization-section"

// Sample data
const sampleChildData = {
  id: "CH-2024-002",
  firstName: "Marcus",
  lastName: "Thompson",
  dob: "2015-08-22",
  caseNumber: "CS-2024-0287",
}

const initialSectionData = {
  services: [
    {
      id: "1",
      serviceType: "Individual Therapy",
      frequencyRequested: "2x/week",
      providerName: "Healing Hearts Counseling",
      authorizationStatus: "Approved" as const,
      authorizationDate: "2024-01-15",
    },
    {
      id: "2",
      serviceType: "Family Therapy",
      frequencyRequested: "1x/week",
      providerName: "Family Solutions Center",
      authorizationStatus: "Pending" as const,
      authorizationDate: "",
    },
    {
      id: "3",
      serviceType: "Psychiatric Services",
      frequencyRequested: "1x/month",
      providerName: "Children's Mental Health Clinic",
      authorizationStatus: "Denied" as const,
      authorizationDate: "2024-01-10",
      deniedBy: "Medicaid",
      denialReason:
        "Service not covered under current plan. Requires prior authorization with additional documentation.",
      denialDate: "2024-01-10",
      alternativeServiceArranged: "Telehealth psychiatric consultation through approved provider network",
      alternativeServiceProvider: "TelePsych Solutions",
      alternativeServiceStartDate: "2024-02-01",
      costCoverageRequired: true,
      estimatedCost: 450.0,
      justification:
        "Child requires psychiatric evaluation and medication management for ADHD and anxiety. Alternative provider offers same services at reduced cost through telehealth platform. Essential for child's stability and treatment plan success.",
      programDirectorApproval: true,
      digitalSignature: "Sarah Johnson, Program Director",
      approvalDate: "2024-01-12",
    },
    {
      id: "4",
      serviceType: "Transportation",
      frequencyRequested: "As needed",
      providerName: "Safe Rides Transport",
      authorizationStatus: "Denied" as const,
      authorizationDate: "2024-01-08",
      deniedBy: "DFPS",
      denialReason:
        "Transportation services not approved for this case type. Family expected to provide transportation.",
      denialDate: "2024-01-08",
      alternativeServiceArranged: "",
      alternativeServiceProvider: "",
      alternativeServiceStartDate: "",
      costCoverageRequired: false,
    },
  ],
  sectionNotes:
    "Child has complex mental health needs requiring coordinated care. Working closely with providers to ensure continuity of services despite authorization challenges. Family is cooperative but has transportation limitations that need to be addressed.",
  totalDeniedCost: 450.0,
  totalApprovedByDirector: 450.0,
  runningTotalForChild: 1250.0,
}

export default function ServiceAuthorizationPage() {
  const [sectionData, setSectionData] = useState(initialSectionData)
  const [isValid, setIsValid] = useState(false)
  const [viewMode, setViewMode] = useState<"edit" | "view">("edit")

  const handleUpdate = (data: typeof initialSectionData) => {
    setSectionData(data)
    console.log("Section data updated:", data)
  }

  const handleValidationChange = (valid: boolean) => {
    setIsValid(valid)
  }

  const handleExport = (format: "raw" | "servicePlan") => {
    const exportData =
      format === "raw"
        ? sectionData
        : {
            childId: sampleChildData.id,
            childName: `${sampleChildData.firstName} ${sampleChildData.lastName}`,
            authorizationSummary: {
              approved: sectionData.services.filter((s) => s.authorizationStatus === "Approved").length,
              pending: sectionData.services.filter((s) => s.authorizationStatus === "Pending").length,
              denied: sectionData.services.filter((s) => s.authorizationStatus === "Denied").length,
            },
            financialSummary: {
              totalDeniedCost: sectionData.totalDeniedCost,
              totalApprovedByDirector: sectionData.totalApprovedByDirector,
              runningTotal: sectionData.runningTotalForChild,
            },
            services: sectionData.services.map((s) => ({
              serviceType: s.serviceType,
              provider: s.providerName,
              status: s.authorizationStatus,
              frequency: s.frequencyRequested,
              authDate: s.authorizationDate,
              ...(s.authorizationStatus === "Denied" && {
                denialInfo: {
                  deniedBy: s.deniedBy,
                  reason: s.denialReason,
                  alternativeArranged: s.alternativeServiceArranged,
                  costCoverage: s.costCoverageRequired,
                  directorApproval: s.programDirectorApproval,
                },
              }),
            })),
            notes: sectionData.sectionNotes,
          }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `service-authorization-${sampleChildData.id}-${format}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Directory
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "edit" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("edit")}
              >
                Edit Mode
              </Button>
              <Button
                variant={viewMode === "view" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("view")}
              >
                View Mode
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Authorization Tracking</h1>
              <p className="text-gray-600 mt-2">Track service authorization requests, approvals, and denials</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isValid ? "default" : "destructive"}>{isValid ? "Complete" : "Needs Attention"}</Badge>
              <Badge variant="secondary">Draft</Badge>
            </div>
          </div>
        </div>

        {/* Child Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Child Information</CardTitle>
            <CardDescription>Basic information for service authorization tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Child Name:</span>
                <p className="text-gray-900">
                  {sampleChildData.firstName} {sampleChildData.lastName}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Date of Birth:</span>
                <p className="text-gray-900">{new Date(sampleChildData.dob).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Child ID:</span>
                <p className="text-gray-900">{sampleChildData.id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Case Number:</span>
                <p className="text-gray-900">{sampleChildData.caseNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Authorization Section */}
        <ServiceAuthorizationSection
          childData={sampleChildData}
          sectionData={sectionData}
          onUpdate={handleUpdate}
          onValidationChange={handleValidationChange}
          viewMode={viewMode}
        />

        {/* Action Buttons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
            <CardDescription>Export or print this service authorization section</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => handleExport("raw")} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Raw Data
              </Button>
              <Button onClick={() => handleExport("servicePlan")} variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Export for Service Plan
              </Button>
              <Button onClick={handlePrint} variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print Section
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 Refuge House Form Directory. Service Authorization Tracking Section - Draft Version</p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  )
}
