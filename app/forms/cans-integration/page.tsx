"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"
import CANSIntegrationSection from "@/components/cans-integration-section"

// Sample data
const sampleChildData = {
  id: "CH-2024-001",
  firstName: "Emma",
  lastName: "Johnson",
  dob: "2018-03-15",
  caseNumber: "CS-2024-0156",
}

const initialSectionData = {
  lastAssessmentDate: "2024-01-15",
  assessorName: "Dr. Sarah Martinez",
  assessorCredentials: "LCSW, CANS Certified",
  nextDueDate: "2025-01-15",
  domainScores: [
    {
      domain: "Life Functioning",
      currentScore: 1,
      previousScore: 2,
      actionRequired: false,
    },
    {
      domain: "Child Strengths",
      currentScore: 0,
      previousScore: 0,
      actionRequired: false,
    },
    {
      domain: "Caregiver Strengths & Needs",
      currentScore: 2,
      previousScore: 1,
      actionRequired: true,
    },
    {
      domain: "Child Behavioral/Emotional Needs",
      currentScore: 3,
      previousScore: 3,
      actionRequired: true,
    },
    {
      domain: "Child Risk Behaviors",
      currentScore: 0,
      previousScore: 1,
      actionRequired: false,
    },
    {
      domain: "Trauma",
      currentScore: 2,
      previousScore: 3,
      actionRequired: true,
    },
  ],
  servicesToAdd: [
    {
      id: "1",
      serviceType: "Individual Therapy",
      justification: "Child Behavioral/Emotional Needs domain scored 3 - immediate therapeutic intervention required",
      startDate: "2024-02-01",
    },
  ],
  servicesToIncrease: [],
  servicesToDecrease: [],
  servicesToDiscontinue: [],
  goals: [
    {
      id: "1",
      domain: "Caregiver Strengths & Needs",
      description:
        "Increase caregiver capacity and support systems to reduce score from 2 to 1 through parenting support services and respite care.",
      targetScore: 1,
      interventions: [],
    },
    {
      id: "2",
      domain: "Child Behavioral/Emotional Needs",
      description:
        "Reduce behavioral and emotional challenges from score 3 to score 1 through individual therapy, behavioral interventions, and family support.",
      targetScore: 1,
      interventions: [],
    },
    {
      id: "3",
      domain: "Trauma",
      description:
        "Address trauma symptoms and improve coping skills to reduce score from 2 to 1 through trauma-informed therapy and family support.",
      targetScore: 1,
      interventions: [],
    },
  ],
  sectionNotes:
    "Child has shown significant improvement in Life Functioning and Child Risk Behaviors since last assessment. Continue current interventions while addressing elevated scores in behavioral/emotional needs and caregiver support. Family is engaged and cooperative with services.",
}

export default function CANSIntegrationPage() {
  const [sectionData, setSectionData] = useState(initialSectionData)
  const [isValid, setIsValid] = useState(true)
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
            assessmentStatus: "Complete",
            completionPercentage: 95,
            lastAssessmentDate: sectionData.lastAssessmentDate,
            nextDueDate: sectionData.nextDueDate,
            assessor: `${sectionData.assessorName} (${sectionData.assessorCredentials})`,
            domainSummary: sectionData.domainScores.map((d) => ({
              domain: d.domain,
              currentScore: d.currentScore,
              change: d.currentScore - d.previousScore,
              actionRequired: d.actionRequired,
            })),
            serviceModifications: {
              toAdd: sectionData.servicesToAdd.length,
              toIncrease: sectionData.servicesToIncrease.length,
              toDecrease: sectionData.servicesToDecrease.length,
              toDiscontinue: sectionData.servicesToDiscontinue.length,
            },
            goals: sectionData.goals.length,
            notes: sectionData.sectionNotes,
          }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cans-integration-${sampleChildData.id}-${format}-${new Date().toISOString().split("T")[0]}.json`
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
              <h1 className="text-3xl font-bold text-gray-900">CANS 3.0 Integration Section</h1>
              <p className="text-gray-600 mt-2">Child welfare service plan component for CANS assessment integration</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isValid ? "default" : "destructive"}>{isValid ? "Valid" : "Validation Errors"}</Badge>
              <Badge variant="secondary">Draft</Badge>
            </div>
          </div>
        </div>

        {/* Child Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Child Information</CardTitle>
            <CardDescription>Basic information for this CANS assessment</CardDescription>
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

        {/* CANS Integration Section */}
        <CANSIntegrationSection
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
            <CardDescription>Export or print this CANS integration section</CardDescription>
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
          <p>© 2025 Refuge House Form Directory. CANS 3.0 Integration Section - Draft Version</p>
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
