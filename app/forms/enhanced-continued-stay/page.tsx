"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, FileCheck, Save, Send, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"

interface EnhancedContinuedStayFormProps {
  childData: {
    name: string
    dob: string
    caseNumber: string
    t3cPackage: string
    placementDate: string
  }
  sectionData?: any
  onUpdate: (sectionName: string, data: any) => void
  onValidationChange: (sectionName: string, isValid: boolean) => void
  viewMode?: "edit" | "view" | "print"
  isStandalone?: boolean
}

function EnhancedContinuedStayForm({
  childData,
  sectionData,
  onUpdate,
  onValidationChange,
  viewMode = "edit",
  isStandalone = true,
}: EnhancedContinuedStayFormProps) {
  const [formData, setFormData] = useState({
    childName: childData?.name || sectionData?.childName || "",
    childDOB: childData?.dob || sectionData?.childDOB || "",
    caseNumber: childData?.caseNumber || sectionData?.caseNumber || "",
    servicePackage: childData?.t3cPackage || sectionData?.servicePackage || "",
    reviewDate: sectionData?.reviewDate || "",
    reviewPeriodFrom: sectionData?.reviewPeriodFrom || "",
    reviewPeriodTo: sectionData?.reviewPeriodTo || "",
    dfpsWorkerName: sectionData?.dfpsWorkerName || "",
    dfpsWorkerEmail: sectionData?.dfpsWorkerEmail || "",
    previousReviewDate: sectionData?.previousReviewDate || "",
    nextReviewDate: sectionData?.nextReviewDate || "",
    cansAssessmentDate: sectionData?.cansAssessmentDate || "",
    cansOverallScore: sectionData?.cansOverallScore || "",
    cansTrend: sectionData?.cansTrend || "",
    meetsAdmissionCriteria: sectionData?.meetsAdmissionCriteria || false,
    benefitingFromTreatment: sectionData?.benefittingFromTreatment || false,
    basicPackageNotAppropriate: sectionData?.basicPackageNotAppropriate || false,
    clinicalJustification: sectionData?.clinicalJustification || "",
    treatmentProgress: sectionData?.treatmentProgress || "",
    stepDownBarriers: sectionData?.stepDownBarriers || "",
    servicePlanDate: sectionData?.servicePlanDate || "",
    servicePlanId: sectionData?.servicePlanId || "",
    programDirectorSignature: sectionData?.programDirectorSignature || "",
    treatmentDirectorSignature: sectionData?.treatmentDirectorSignature || "",
    dfpsCopySent: sectionData?.dfpsCopySent || false,
    dfpsSentDate: sectionData?.dfpsSentDate || "",
    radiusAttached: sectionData?.radiusAttached || false,
  })

  const [packageSpecific, setPackageSpecific] = useState({
    // Mental & Behavioral Health
    psychiatricStability: sectionData?.packageSpecific?.psychiatricStability || "",
    crisisFrequency: sectionData?.packageSpecific?.crisisFrequency || "",
    medicationCompliance: sectionData?.packageSpecific?.medicationCompliance || "",
    therapeuticProgress: sectionData?.packageSpecific?.therapeuticProgress || "",
    familyReadiness: sectionData?.packageSpecific?.familyReadiness || "",
    // IDD/Autism
    behavioralSupport: sectionData?.packageSpecific?.behavioralSupport || "",
    medicalRequirements: sectionData?.packageSpecific?.medicalRequirements || "",
    skillDevelopment: sectionData?.packageSpecific?.skillDevelopment || "",
    environmentalMods: sectionData?.packageSpecific?.environmentalMods || "",
    caregiverCapability: sectionData?.packageSpecific?.caregiverCapability || "",
  })

  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Helper functions
  const isWithin30Days = (dateString: string) => {
    if (!dateString) return false
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays >= 0
  }

  const calculateNextReviewDate = (currentReviewDate: string) => {
    if (!currentReviewDate) return ""
    const date = new Date(currentReviewDate)
    date.setDate(date.getDate() + 90)
    return date.toISOString().split("T")[0]
  }

  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length
    const filledFields = Object.values(formData).filter((v) => v !== "" && v !== false).length
    return Math.round((filledFields / totalFields) * 100)
  }

  const validateForm = useCallback(
    (data = formData) => {
      const required = [
        "childName",
        "caseNumber",
        "servicePackage",
        "reviewDate",
        "cansAssessmentDate",
        "cansOverallScore",
        "cansTrend",
        "clinicalJustification",
        "treatmentProgress",
        "stepDownBarriers",
        "programDirectorSignature",
        "treatmentDirectorSignature",
        "dfpsWorkerName",
        "dfpsWorkerEmail",
        "nextReviewDate",
      ]

      const allCheckboxes =
        data.meetsAdmissionCriteria && data.benefittingFromTreatment && data.basicPackageNotAppropriate

      const allFieldsFilled = required.every((field) => data[field])
      const isValid = allFieldsFilled && allCheckboxes

      if (onValidationChange) {
        onValidationChange("enhancedContinuedStay", isValid)
      }

      return isValid
    },
    [formData, onValidationChange],
  )

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value }

      // Auto-calculate next review date when review date changes
      if (field === "reviewDate" && value) {
        updated.nextReviewDate = calculateNextReviewDate(value)
      }

      // Auto-save on change
      if (onUpdate) {
        onUpdate("enhancedContinuedStay", updated)
      }

      // Validate completion
      validateForm(updated)

      // Update last saved timestamp
      setLastSaved(new Date())

      return updated
    })
  }

  const handlePackageSpecificChange = (field: string, value: any) => {
    setPackageSpecific((prev) => {
      const updated = { ...prev, [field]: value }

      // Auto-save package specific data
      if (onUpdate) {
        onUpdate("enhancedContinuedStay", { ...formData, packageSpecific: updated })
      }

      setLastSaved(new Date())
      return updated
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      alert("Please complete all required fields")
      return
    }

    // Emit final data to parent
    if (onUpdate) {
      onUpdate("enhancedContinuedStay", {
        ...formData,
        packageSpecific,
        completedDate: new Date().toISOString(),
        completedBy: "Current User", // Would come from auth context
      })
    }

    alert("Enhanced Continued Stay Confirmation saved successfully!")
  }

  // Initialize validation on mount
  useEffect(() => {
    validateForm()
  }, [validateForm])

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 ${viewMode === "print" ? "print:bg-white" : ""}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          {isStandalone && (
            <Link
              href="/"
              className={`inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 ${viewMode === "print" ? "print:hidden" : ""}`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form Directory
            </Link>
          )}

          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 print:text-black">
                Enhanced Continued Stay Confirmation
              </h1>
              <p className="text-gray-600 print:text-black">90-day confirmation for specialized service packages</p>
            </div>
            <Badge
              variant="secondary"
              className={`bg-amber-100 text-amber-800 ${viewMode === "print" ? "print:hidden" : ""}`}
            >
              Draft
            </Badge>
          </div>

          {/* Integration Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 print:break-inside-avoid">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-blue-800 text-sm print:text-black">
                <p className="font-medium mb-1">Service Plan Integration</p>
                <p>
                  This form is incorporated into the Service Plan for children receiving Mental & Behavioral Health or
                  IDD/Autism Spectrum Disorder Support Services and is reviewed concurrently with the 90-day Service
                  Plan Review per TAC §749.1335.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          {viewMode === "edit" && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Section Progress</span>
                <span>{calculateProgress()}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          )}

          {/* Last Saved Indicator */}
          {lastSaved && viewMode === "edit" && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Clock className="h-4 w-4" />
              <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Section */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="print:text-black">Header Information</CardTitle>
              <CardDescription className="print:text-black">Basic child and case information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="childName" className="print:text-black">
                    Child's Name *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) => handleInputChange("childName", e.target.value)}
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.childName || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="childDOB" className="print:text-black">
                    Child's Date of Birth *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="childDOB"
                      type="date"
                      value={formData.childDOB}
                      onChange={(e) => handleInputChange("childDOB", e.target.value)}
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.childDOB || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="caseNumber" className="print:text-black">
                    Case Number *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="caseNumber"
                      value={formData.caseNumber}
                      onChange={(e) => handleInputChange("caseNumber", e.target.value)}
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.caseNumber || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="servicePackage" className="print:text-black">
                    Current Service Package *
                  </Label>
                  {viewMode === "edit" ? (
                    <Select
                      value={formData.servicePackage}
                      onValueChange={(value) => handleInputChange("servicePackage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mental-behavioral">Mental & Behavioral Health</SelectItem>
                        <SelectItem value="idd-autism">IDD/Autism Spectrum Disorder</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black print:border">
                      {formData.servicePackage === "mental-behavioral"
                        ? "Mental & Behavioral Health"
                        : formData.servicePackage === "idd-autism"
                          ? "IDD/Autism Spectrum Disorder"
                          : "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="reviewDate" className="print:text-black">
                    Review Date *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="reviewDate"
                      type="date"
                      value={formData.reviewDate}
                      onChange={(e) => handleInputChange("reviewDate", e.target.value)}
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.reviewDate || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="dfpsWorkerName" className="print:text-black">
                    DFPS/SSCC Caseworker Name *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="dfpsWorkerName"
                      value={formData.dfpsWorkerName}
                      onChange={(e) => handleInputChange("dfpsWorkerName", e.target.value)}
                      placeholder="Caseworker name"
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.dfpsWorkerName || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="dfpsWorkerEmail" className="print:text-black">
                    DFPS/SSCC Caseworker Email *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="dfpsWorkerEmail"
                      type="email"
                      value={formData.dfpsWorkerEmail}
                      onChange={(e) => handleInputChange("dfpsWorkerEmail", e.target.value)}
                      placeholder="caseworker@dfps.state.tx.us"
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.dfpsWorkerEmail || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reviewPeriodFrom" className="print:text-black">
                    Service Plan Review Period - From *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="reviewPeriodFrom"
                      type="date"
                      value={formData.reviewPeriodFrom}
                      onChange={(e) => handleInputChange("reviewPeriodFrom", e.target.value)}
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.reviewPeriodFrom || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="reviewPeriodTo" className="print:text-black">
                    Service Plan Review Period - To *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="reviewPeriodTo"
                      type="date"
                      value={formData.reviewPeriodTo}
                      onChange={(e) => handleInputChange("reviewPeriodTo", e.target.value)}
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.reviewPeriodTo || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="previousReviewDate" className="print:text-black">
                    Previous Enhanced Review Date
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="previousReviewDate"
                      type="date"
                      value={formData.previousReviewDate}
                      onChange={(e) => handleInputChange("previousReviewDate", e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.previousReviewDate || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="nextReviewDate" className="print:text-black">
                    Next 90-Day Review Due *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="nextReviewDate"
                      type="date"
                      value={formData.nextReviewDate}
                      onChange={(e) => handleInputChange("nextReviewDate", e.target.value)}
                      required
                      className={isWithin30Days(formData.nextReviewDate) ? "border-yellow-500" : ""}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.nextReviewDate || "Not provided"}
                    </p>
                  )}
                  {isWithin30Days(formData.nextReviewDate) && (
                    <p className="text-yellow-600 text-sm mt-1 print:text-black">Review due within 30 days</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CANS 3.0 Assessment Data */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="print:text-black">CANS 3.0 Assessment Data</CardTitle>
              <CardDescription className="print:text-black">Most recent assessment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cansAssessmentDate" className="print:text-black">
                    Most Recent CANS 3.0 Assessment Date *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="cansAssessmentDate"
                      type="date"
                      value={formData.cansAssessmentDate}
                      onChange={(e) => handleInputChange("cansAssessmentDate", e.target.value)}
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.cansAssessmentDate || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cansOverallScore" className="print:text-black">
                    Overall CANS Score *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="cansOverallScore"
                      type="number"
                      value={formData.cansOverallScore}
                      onChange={(e) => handleInputChange("cansOverallScore", e.target.value)}
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.cansOverallScore || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="cansTrend" className="print:text-black">
                    Trend Indicator *
                  </Label>
                  {viewMode === "edit" ? (
                    <Select value={formData.cansTrend} onValueChange={(value) => handleInputChange("cansTrend", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select trend" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="improving">Improving</SelectItem>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="worsening">Worsening</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.cansTrend === "improving"
                        ? "Improving"
                        : formData.cansTrend === "stable"
                          ? "Stable"
                          : formData.cansTrend === "worsening"
                            ? "Worsening"
                            : "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clinical Justification */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="print:text-black">Clinical Justification</CardTitle>
              <CardDescription className="print:text-black">Required elements per T3C Blueprint</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {viewMode === "edit" ? (
                    <Checkbox
                      id="meetsAdmissionCriteria"
                      checked={formData.meetsAdmissionCriteria}
                      onCheckedChange={(checked) => handleInputChange("meetsAdmissionCriteria", checked)}
                    />
                  ) : (
                    <div
                      className={`w-4 h-4 border rounded ${formData.meetsAdmissionCriteria ? "bg-blue-600" : "bg-white"} print:border-black`}
                    >
                      {formData.meetsAdmissionCriteria && <span className="text-white text-xs">✓</span>}
                    </div>
                  )}
                  <Label htmlFor="meetsAdmissionCriteria" className="font-medium print:text-black">
                    Child continues to meet admission criteria for the service package *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  {viewMode === "edit" ? (
                    <Checkbox
                      id="benefittingFromTreatment"
                      checked={formData.benefittingFromTreatment}
                      onCheckedChange={(checked) => handleInputChange("benefittingFromTreatment", checked)}
                    />
                  ) : (
                    <div
                      className={`w-4 h-4 border rounded ${formData.benefittingFromTreatment ? "bg-blue-600" : "bg-white"} print:border-black`}
                    >
                      {formData.benefittingFromTreatment && <span className="text-white text-xs">✓</span>}
                    </div>
                  )}
                  <Label htmlFor="benefittingFromTreatment" className="font-medium print:text-black">
                    Child is benefitting from the Evidence-informed Treatment Model *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  {viewMode === "edit" ? (
                    <Checkbox
                      id="basicPackageNotAppropriate"
                      checked={formData.basicPackageNotAppropriate}
                      onCheckedChange={(checked) => handleInputChange("basicPackageNotAppropriate", checked)}
                    />
                  ) : (
                    <div
                      className={`w-4 h-4 border rounded ${formData.basicPackageNotAppropriate ? "bg-blue-600" : "bg-white"} print:border-black`}
                    >
                      {formData.basicPackageNotAppropriate && <span className="text-white text-xs">✓</span>}
                    </div>
                  )}
                  <Label htmlFor="basicPackageNotAppropriate" className="font-medium print:text-black">
                    Less-restrictive T3C Basic Foster Home Service Package is NOT appropriate *
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="clinicalJustification" className="print:text-black">
                  Clinical Justification Narrative *
                </Label>
                {viewMode === "edit" ? (
                  <Textarea
                    id="clinicalJustification"
                    value={formData.clinicalJustification}
                    onChange={(e) => handleInputChange("clinicalJustification", e.target.value)}
                    placeholder="Provide detailed clinical justification for continued specialized services..."
                    className="min-h-[120px]"
                    required
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded min-h-[120px] print:bg-white print:text-black print:border">
                    {formData.clinicalJustification || "Not provided"}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="treatmentProgress" className="print:text-black">
                  Treatment Progress and Engagement Metrics *
                </Label>
                {viewMode === "edit" ? (
                  <Textarea
                    id="treatmentProgress"
                    value={formData.treatmentProgress}
                    onChange={(e) => handleInputChange("treatmentProgress", e.target.value)}
                    placeholder="Document specific improvements, progress indicators, and treatment engagement..."
                    className="min-h-[100px]"
                    required
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded min-h-[100px] print:bg-white print:text-black print:border">
                    {formData.treatmentProgress || "Not provided"}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="stepDownBarriers" className="print:text-black">
                  Barriers to Step-Down to Basic Services *
                </Label>
                {viewMode === "edit" ? (
                  <Textarea
                    id="stepDownBarriers"
                    value={formData.stepDownBarriers}
                    onChange={(e) => handleInputChange("stepDownBarriers", e.target.value)}
                    placeholder="Explain specific reasons why step-down is not appropriate, including safety concerns..."
                    className="min-h-[100px]"
                    required
                  />
                ) : (
                  <div className="p-3 bg-gray-50 rounded min-h-[100px] print:bg-white print:text-black print:border">
                    {formData.stepDownBarriers || "Not provided"}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Package-Specific Elements */}
          {formData.servicePackage && (
            <Card className="print:break-inside-avoid">
              <CardHeader>
                <CardTitle className="print:text-black">Package-Specific Assessment</CardTitle>
                <CardDescription className="print:text-black">
                  {formData.servicePackage === "mental-behavioral"
                    ? "Mental & Behavioral Health specific elements"
                    : "IDD/Autism Spectrum Disorder specific elements"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.servicePackage === "mental-behavioral" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="psychiatricStability" className="print:text-black">
                        Psychiatric Stability Indicators
                      </Label>
                      {viewMode === "edit" ? (
                        <Textarea
                          id="psychiatricStability"
                          value={packageSpecific.psychiatricStability}
                          onChange={(e) => handlePackageSpecificChange("psychiatricStability", e.target.value)}
                          placeholder="Document current psychiatric stability status..."
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded print:bg-white print:text-black print:border">
                          {packageSpecific.psychiatricStability || "Not provided"}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="crisisFrequency" className="print:text-black">
                        Crisis Frequency/Severity
                      </Label>
                      {viewMode === "edit" ? (
                        <Textarea
                          id="crisisFrequency"
                          value={packageSpecific.crisisFrequency}
                          onChange={(e) => handlePackageSpecificChange("crisisFrequency", e.target.value)}
                          placeholder="Document crisis episodes and severity levels..."
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded print:bg-white print:text-black print:border">
                          {packageSpecific.crisisFrequency || "Not provided"}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="medicationCompliance" className="print:text-black">
                        Medication Compliance
                      </Label>
                      {viewMode === "edit" ? (
                        <Textarea
                          id="medicationCompliance"
                          value={packageSpecific.medicationCompliance}
                          onChange={(e) => handlePackageSpecificChange("medicationCompliance", e.target.value)}
                          placeholder="Document medication adherence and effectiveness..."
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded print:bg-white print:text-black print:border">
                          {packageSpecific.medicationCompliance || "Not provided"}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="therapeuticProgress" className="print:text-black">
                        Therapeutic Progress
                      </Label>
                      {viewMode === "edit" ? (
                        <Textarea
                          id="therapeuticProgress"
                          value={packageSpecific.therapeuticProgress}
                          onChange={(e) => handlePackageSpecificChange("therapeuticProgress", e.target.value)}
                          placeholder="Document progress in therapeutic interventions..."
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded print:bg-white print:text-black print:border">
                          {packageSpecific.therapeuticProgress || "Not provided"}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="familyReadiness" className="print:text-black">
                        Family Readiness for Managing Mental Health Needs
                      </Label>
                      {viewMode === "edit" ? (
                        <Textarea
                          id="familyReadiness"
                          value={packageSpecific.familyReadiness}
                          onChange={(e) => handlePackageSpecificChange("familyReadiness", e.target.value)}
                          placeholder="Assess family/caregiver capacity for mental health support..."
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded print:bg-white print:text-black print:border">
                          {packageSpecific.familyReadiness || "Not provided"}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {formData.servicePackage === "idd-autism" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="behavioralSupport" className="print:text-black">
                        Behavioral Support Needs
                      </Label>
                      {viewMode === "edit" ? (
                        <Textarea
                          id="behavioralSupport"
                          value={packageSpecific.behavioralSupport}
                          onChange={(e) => handlePackageSpecificChange("behavioralSupport", e.target.value)}
                          placeholder="Document current behavioral support requirements..."
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded print:bg-white print:text-black print:border">
                          {packageSpecific.behavioralSupport || "Not provided"}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="medicalRequirements" className="print:text-black">
                        Medical/Nursing Requirements
                      </Label>
                      {viewMode === "edit" ? (
                        <Textarea
                          id="medicalRequirements"
                          value={packageSpecific.medicalRequirements}
                          onChange={(e) => handlePackageSpecificChange("medicalRequirements", e.target.value)}
                          placeholder="Document specialized medical or nursing needs..."
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded print:bg-white print:text-black print:border">
                          {packageSpecific.medicalRequirements || "Not provided"}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="skillDevelopment" className="print:text-black">
                        Skill Development Progress
                      </Label>
                      {viewMode === "edit" ? (
                        <Textarea
                          id="skillDevelopment"
                          value={packageSpecific.skillDevelopment}
                          onChange={(e) => handlePackageSpecificChange("skillDevelopment", e.target.value)}
                          placeholder="Document progress in adaptive and life skills..."
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded print:bg-white print:text-black print:border">
                          {packageSpecific.skillDevelopment || "Not provided"}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="environmentalMods" className="print:text-black">
                        Environmental Modification Needs
                      </Label>
                      {viewMode === "edit" ? (
                        <Textarea
                          id="environmentalMods"
                          value={packageSpecific.environmentalMods}
                          onChange={(e) => handlePackageSpecificChange("environmentalMods", e.target.value)}
                          placeholder="Document required environmental accommodations..."
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded print:bg-white print:text-black print:border">
                          {packageSpecific.environmentalMods || "Not provided"}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="caregiverCapability" className="print:text-black">
                        Caregiver Capability Assessment
                      </Label>
                      {viewMode === "edit" ? (
                        <Textarea
                          id="caregiverCapability"
                          value={packageSpecific.caregiverCapability}
                          onChange={(e) => handlePackageSpecificChange("caregiverCapability", e.target.value)}
                          placeholder="Assess caregiver capacity for specialized support..."
                        />
                      ) : (
                        <div className="p-3 bg-gray-50 rounded print:bg-white print:text-black print:border">
                          {packageSpecific.caregiverCapability || "Not provided"}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Service Plan Integration */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="print:text-black">Service Plan Integration</CardTitle>
              <CardDescription className="print:text-black">
                Connection to broader service planning process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                {viewMode === "edit" ? (
                  <Checkbox id="servicePlanAttached" />
                ) : (
                  <div className="w-4 h-4 border rounded bg-white print:border-black"></div>
                )}
                <Label htmlFor="servicePlanAttached" className="font-medium print:text-black">
                  This Enhanced Continued Stay Confirmation is attached to and incorporated into the Service Plan dated:
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                <div>
                  <Label htmlFor="servicePlanDate" className="print:text-black">
                    Service Plan Date
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="servicePlanDate"
                      type="date"
                      value={formData.servicePlanDate}
                      onChange={(e) => handleInputChange("servicePlanDate", e.target.value)}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.servicePlanDate || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="servicePlanId" className="print:text-black">
                    Service Plan Document ID/Number
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="servicePlanId"
                      value={formData.servicePlanId}
                      onChange={(e) => handleInputChange("servicePlanId", e.target.value)}
                      placeholder="Enter document ID"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.servicePlanId || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md print:bg-white print:border">
                <p className="text-sm text-gray-700 print:text-black">
                  <strong>Note:</strong> This confirmation must be completed concurrently with each 90-day Service Plan
                  Review
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Certification Section */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="print:text-black">Certification</CardTitle>
              <CardDescription className="print:text-black">Required signatures and certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="programDirectorSignature" className="print:text-black">
                    Program Director Signature *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="programDirectorSignature"
                      value={formData.programDirectorSignature}
                      onChange={(e) => handleInputChange("programDirectorSignature", e.target.value)}
                      placeholder="Digital signature or name"
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.programDirectorSignature || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="treatmentDirectorSignature" className="print:text-black">
                    Treatment Director Signature *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="treatmentDirectorSignature"
                      value={formData.treatmentDirectorSignature}
                      onChange={(e) => handleInputChange("treatmentDirectorSignature", e.target.value)}
                      placeholder="Digital signature or name"
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.treatmentDirectorSignature || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md print:bg-white print:border">
                <p className="text-sm text-blue-800 print:text-black">
                  <strong>Certification Statement:</strong> We certify that {formData.childName || "[Child's Name]"}{" "}
                  continues to meet criteria for and is benefitting from the{" "}
                  {formData.servicePackage === "mental-behavioral"
                    ? "Mental & Behavioral Health"
                    : formData.servicePackage === "idd-autism"
                      ? "IDD/Autism Spectrum Disorder"
                      : "[Service Package Name]"}{" "}
                  Support Services, and that the less-restrictive T3C Basic Foster Home Service Package is not
                  appropriate to meet the child's needs at this time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Requirements */}
          <Card className="print:break-inside-avoid">
            <CardHeader>
              <CardTitle className="print:text-black">Distribution Requirements</CardTitle>
              <CardDescription className="print:text-black">Required notifications and record keeping</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                {viewMode === "edit" ? (
                  <Checkbox
                    id="dfpsCopySent"
                    checked={formData.dfpsCopySent}
                    onCheckedChange={(checked) => handleInputChange("dfpsCopySent", checked)}
                  />
                ) : (
                  <div
                    className={`w-4 h-4 border rounded ${formData.dfpsCopySent ? "bg-blue-600" : "bg-white"} print:border-black`}
                  >
                    {formData.dfpsCopySent && <span className="text-white text-xs">✓</span>}
                  </div>
                )}
                <Label htmlFor="dfpsCopySent" className="font-medium print:text-black">
                  Copy will be sent to SSCC/DFPS within 15 business days
                </Label>
              </div>

              <div className="ml-6">
                <Label htmlFor="dfpsSentDate" className="print:text-black">
                  Date Sent to SSCC/DFPS
                </Label>
                {viewMode === "edit" ? (
                  <Input
                    id="dfpsSentDate"
                    type="date"
                    value={formData.dfpsSentDate}
                    onChange={(e) => handleInputChange("dfpsSentDate", e.target.value)}
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                    {formData.dfpsSentDate || "Not provided"}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {viewMode === "edit" ? (
                  <Checkbox
                    id="radiusAttached"
                    checked={formData.radiusAttached}
                    onCheckedChange={(checked) => handleInputChange("radiusAttached", checked)}
                  />
                ) : (
                  <div
                    className={`w-4 h-4 border rounded ${formData.radiusAttached ? "bg-blue-600" : "bg-white"} print:border-black`}
                  >
                    {formData.radiusAttached && <span className="text-white text-xs">✓</span>}
                  </div>
                )}
                <Label htmlFor="radiusAttached" className="font-medium print:text-black">
                  Copy attached to Service Plan in Radius
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          {isStandalone && (
            <div className={`flex justify-between items-center pt-6 ${viewMode === "print" ? "print:hidden" : ""}`}>
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Directory
                </Button>
              </Link>

              <div className="flex gap-3">
                {viewMode === "edit" && (
                  <Button type="button" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                )}
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Form
                </Button>
              </div>
            </div>
          )}
        </form>

        {/* Compliance Footer */}
        <div className="mt-12 p-4 bg-gray-50 rounded-lg print:bg-white print:border">
          <p className="text-xs text-gray-600 print:text-black">
            <strong>Compliance Statement:</strong> This form fulfills T3C Blueprint requirements for quarterly written
            confirmation of continued stay necessity as outlined in the Mental & Behavioral Health Support Services
            (p.85) and IDD/Autism Spectrum Disorder Support Services (p.133-134) specifications. This form is
            conditionally incorporated into the Service Plan when these packages are utilized.
          </p>
        </div>
      </div>
    </div>
  )
}

// Default export for standalone usage
const EnhancedContinuedStayPage = () => {
  const sampleChildData = {
    name: "Emma Johnson",
    dob: "2018-03-15",
    caseNumber: "CS-2024-0156",
    t3cPackage: "mental-behavioral",
    placementDate: "2024-01-15",
  }

  const handleUpdate = (sectionName: string, data: any) => {
    console.log(`Section ${sectionName} updated:`, data)
  }

  const handleValidationChange = (sectionName: string, isValid: boolean) => {
    console.log(`Section ${sectionName} validation:`, isValid)
  }

  return (
    <EnhancedContinuedStayForm
      childData={sampleChildData}
      onUpdate={handleUpdate}
      onValidationChange={handleValidationChange}
      viewMode="edit"
      isStandalone={true}
    />
  )
}

export default EnhancedContinuedStayPage
