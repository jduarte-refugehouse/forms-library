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
import { AlertCircle, FileCheck, Save, Send, ArrowLeft, Clock, AlertTriangle, Heart, Shield, CheckCircle2, XCircle, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Package configuration
const PACKAGES = {
  'mental-behavioral': {
    label: 'Mental & Behavioral Health (90-day)',
    fullLabel: 'Mental & Behavioral Health Support Services',
    cycle: 90,
    color: 'blue',
    requiresContinuedStay: true,
    policyRef: 'FC-MH-01',
    blueprintPage: 'p.85'
  },
  'idd-autism': {
    label: 'IDD/Autism Spectrum Disorder (90-day)',
    fullLabel: 'IDD/Autism Spectrum Disorder Support Services',
    cycle: 90,
    color: 'teal',
    requiresContinuedStay: true,
    policyRef: 'FC-IDD-01',
    blueprintPage: 'p.133-134'
  },
  'substance-use': {
    label: 'Substance Use Support Services (90-day)',
    fullLabel: 'Substance Use Support Services',
    cycle: 90,
    color: 'amber',
    requiresContinuedStay: true,
    policyRef: 'FC-SU-01',
    blueprintPage: 'per FC-SU-01'
  },
  'stass': {
    label: 'STASS - Short-Term Assessment (N/A - excluded)',
    fullLabel: 'Short-Term Assessment Support Services',
    cycle: null,
    color: 'gray',
    requiresContinuedStay: false,
    policyRef: 'FC-STASS-01',
    blueprintPage: 'N/A'
  },
  'tffc': {
    label: 'Treatment Foster Family Care (60-day)',
    fullLabel: 'T3C Treatment Foster Family Care Support Services',
    cycle: 60,
    color: 'purple',
    requiresContinuedStay: true,
    policyRef: 'FC-TFFC-01',
    blueprintPage: 'p.145'
  }
} as const

type PackageKey = keyof typeof PACKAGES
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
    placementStartDate: childData?.placementDate || sectionData?.placementStartDate || "",
    reviewNumber: sectionData?.reviewNumber || "1",
    reviewDate: sectionData?.reviewDate || "",
    reviewPeriodFrom: sectionData?.reviewPeriodFrom || "",
    reviewPeriodTo: sectionData?.reviewPeriodTo || "",
    dfpsWorkerName: sectionData?.dfpsWorkerName || "",
    dfpsWorkerEmail: sectionData?.dfpsWorkerEmail || "",
    previousReviewDate: sectionData?.previousReviewDate || "",
    nextReviewDate: sectionData?.nextReviewDate || "",
    previousCansScore: sectionData?.previousCansScore || "",
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
    // TFFC-specific certification
    tffcContinuedNeedConfirmation: sectionData?.tffcContinuedNeedConfirmation || false,
    fosterHomeCredentialConfirmation: sectionData?.fosterHomeCredentialConfirmation || false,
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
    // Substance Use
    recoveryStatus: sectionData?.packageSpecific?.recoveryStatus || "",
    relapseDetails: sectionData?.packageSpecific?.relapseDetails || "",
    treatmentEngagement: sectionData?.packageSpecific?.treatmentEngagement || "",
    matStatus: sectionData?.packageSpecific?.matStatus || "",
    recoveryIndicators: sectionData?.packageSpecific?.recoveryIndicators || [],
    recoveryNarrative: sectionData?.packageSpecific?.recoveryNarrative || "",
    // TFFC
    crisisCount: sectionData?.packageSpecific?.crisisCount || "",
    crisisTrend: sectionData?.packageSpecific?.crisisTrend || "",
    crisisNarrative: sectionData?.packageSpecific?.crisisNarrative || "",
    behavioralStability: sectionData?.packageSpecific?.behavioralStability || "",
    therapyEngagement: sectionData?.packageSpecific?.therapyEngagement || "",
    stepDownReadiness: sectionData?.packageSpecific?.stepDownReadiness || "",
    stepDownIndicators: sectionData?.packageSpecific?.stepDownIndicators || [],
    stepDownBarriersTffc: sectionData?.packageSpecific?.stepDownBarriersTffc || [],
    stepDownDestination: sectionData?.packageSpecific?.stepDownDestination || "",
    stepDownNotes: sectionData?.packageSpecific?.stepDownNotes || "",
  })

  // Helper: Get ordinal suffix
  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"]
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  // Helper: Calculate days in placement
  const calculateDaysInPlacement = (placementDate: string) => {
    if (!placementDate) return 0
    const start = new Date(placementDate)
    const today = new Date()
    const diffTime = today.getTime() - start.getTime()
    return Math.floor(diffTime / (1000 * 60 * 60 * 24))
  }

  // Get current package configuration
  const currentPackage = formData.servicePackage ? PACKAGES[formData.servicePackage as PackageKey] : null
  const cycleDays = currentPackage?.cycle || 90
  const daysInPlacement = calculateDaysInPlacement(formData.placementStartDate)
  const daysRemaining = formData.servicePackage === 'tffc' ? Math.max(0, 365 - daysInPlacement) : null

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

  const calculateNextReviewDate = (currentReviewDate: string, packageType: string) => {
    if (!currentReviewDate) return ""
    const pkg = PACKAGES[packageType as PackageKey]
    const cycleDaysForPackage = pkg?.cycle || 90
    const date = new Date(currentReviewDate)
    date.setDate(date.getDate() + cycleDaysForPackage)
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

      // Auto-calculate next review date when review date or package changes
      if (field === "reviewDate" && value) {
        updated.nextReviewDate = calculateNextReviewDate(value, updated.servicePackage)
      }
      if (field === "servicePackage" && updated.reviewDate) {
        updated.nextReviewDate = calculateNextReviewDate(updated.reviewDate, value)
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
            <FileCheck className={`h-8 w-8 ${formData.servicePackage === 'tffc' ? 'text-purple-600' : 'text-blue-600'}`} />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 print:text-black">
                Enhanced Continued Stay Confirmation
              </h1>
              <p className={`font-medium ${formData.servicePackage === 'tffc' ? 'text-purple-600' : 'text-blue-600'} print:text-black`}>
                {formData.servicePackage === 'tffc' ? '60-Day' : '90-Day'} Confirmation
              </p>
              <p className="text-gray-600 print:text-black text-sm">For specialized T3C service packages</p>
            </div>
            <Badge
              variant="secondary"
              className={`bg-amber-100 text-amber-800 ${viewMode === "print" ? "print:hidden" : ""}`}
            >
              Draft
            </Badge>
          </div>

          {/* Integration Notice */}
          <div className={`border rounded-lg p-4 mb-6 print:break-inside-avoid ${
            formData.servicePackage === 'tffc' ? 'bg-purple-50 border-purple-200' : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start gap-2">
              <AlertCircle className={`h-5 w-5 mt-0.5 ${formData.servicePackage === 'tffc' ? 'text-purple-600' : 'text-blue-600'}`} />
              <div className={`text-sm print:text-black ${formData.servicePackage === 'tffc' ? 'text-purple-800' : 'text-blue-800'}`}>
                <p className="font-medium mb-1">Service Plan Integration</p>
                <p>
                  This form is incorporated into the Service Plan for children receiving specialized T3C service packages
                  requiring continued stay confirmation, including Mental & Behavioral Health, IDD/Autism Spectrum Disorder,
                  Substance Use, and Treatment Foster Family Care Support Services.
                </p>
                <p className="mt-2 font-medium">
                  Review frequency: <span className="underline">{formData.servicePackage === 'tffc' ? '60 days (TFFC)' : '90 days (MH, IDD, SU)'}</span>
                </p>
                <p className="text-xs mt-1">Per TAC §749.1335 and T3C Blueprint requirements.</p>
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
                        <SelectItem value="mental-behavioral">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Mental & Behavioral Health (90-day)
                          </span>
                        </SelectItem>
                        <SelectItem value="idd-autism">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                            IDD/Autism Spectrum Disorder (90-day)
                          </span>
                        </SelectItem>
                        <SelectItem value="substance-use">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            Substance Use Support Services (90-day)
                          </span>
                        </SelectItem>
                        <SelectItem value="stass">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                            STASS - Short-Term Assessment (N/A - excluded)
                          </span>
                        </SelectItem>
                        <SelectItem value="tffc">
                          <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Treatment Foster Family Care (60-day)
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black print:border">
                      {currentPackage?.fullLabel || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="placementStartDate" className="print:text-black">
                    Placement Start Date *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="placementStartDate"
                      type="date"
                      value={formData.placementStartDate}
                      onChange={(e) => handleInputChange("placementStartDate", e.target.value)}
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.placementStartDate || "Not provided"}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="reviewNumber" className="print:text-black">
                    Review # *
                  </Label>
                  {viewMode === "edit" ? (
                    <Input
                      id="reviewNumber"
                      type="number"
                      min="1"
                      value={formData.reviewNumber}
                      onChange={(e) => handleInputChange("reviewNumber", e.target.value)}
                      required
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded print:bg-white print:text-black">
                      {formData.reviewNumber || "1"}
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
                    Next {formData.servicePackage === 'tffc' ? '60' : '90'}-Day Review Due *
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

          {/* STASS Exclusion Notice */}
          {formData.servicePackage === 'stass' && (
            <Card className="border-l-4 border-gray-500 bg-gray-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-700">
                  <AlertTriangle className="h-5 w-5" />
                  Continued Stay Reviews Not Required for STASS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Short-Term Assessment Support Services is a <strong>time-limited</strong> placement 
                  (30-45 days maximum) designed for assessment purposes only. Extended Stay Reviews 
                  are not applicable to this package.
                </p>
                <p className="text-gray-700 mb-2">Instead, use these forms:</p>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  <li>
                    <Link href="/forms/short-term-assessment-logic-model" className="text-blue-600 hover:underline">
                      STASS Logic Model & Assessment Framework
                    </Link>
                  </li>
                  <li>
                    <Link href="/forms/placement-workflow" className="text-blue-600 hover:underline">
                      Placement Workflow (includes transition planning)
                    </Link>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> If a child has been in STASS placement beyond 45 days, 
                    an extension must be documented with Program Director approval per T3C Blueprint p.72.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Review Counter - Show for all except STASS */}
          {formData.servicePackage && formData.servicePackage !== 'stass' && formData.placementStartDate && (
            <Card className={`border-l-4 ${formData.servicePackage === 'tffc' ? 'border-purple-500' : 'border-blue-500'}`}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-6">
                  {/* Review number circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    formData.servicePackage === 'tffc' ? 'bg-purple-100' : 'bg-blue-100'
                  }`}>
                    <span className={`text-2xl font-bold ${
                      formData.servicePackage === 'tffc' ? 'text-purple-700' : 'text-blue-700'
                    }`}>
                      {formData.reviewNumber || '1'}
                    </span>
                  </div>
                  
                  {/* Review details */}
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-gray-800">
                      {getOrdinal(parseInt(formData.reviewNumber) || 1)} {cycleDays}-Day Review
                    </div>
                    <div className="text-sm text-gray-600">
                      Placement Date: {formData.placementStartDate ? new Date(formData.placementStartDate).toLocaleDateString() : 'Not set'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Days in Placement: <span className="font-medium">{daysInPlacement}</span>
                    </div>
                  </div>
                  
                  {/* TFFC: Days remaining badge */}
                  {formData.servicePackage === 'tffc' && daysRemaining !== null && (
                    <div className={`px-4 py-2 rounded-lg text-center ${
                      daysRemaining <= 30 ? 'bg-red-100 border-2 border-red-500' :
                      daysRemaining <= 60 ? 'bg-orange-100 border-2 border-orange-500' :
                      daysRemaining <= 90 ? 'bg-yellow-100 border-2 border-yellow-500' :
                      'bg-purple-100 border-2 border-purple-300'
                    }`}>
                      <div className={`text-2xl font-bold ${
                        daysRemaining <= 30 ? 'text-red-700' :
                        daysRemaining <= 60 ? 'text-orange-700' :
                        daysRemaining <= 90 ? 'text-yellow-700' :
                        'text-purple-700'
                      }`}>
                        {daysRemaining}
                      </div>
                      <div className="text-xs text-gray-600">days remaining</div>
                      <div className="text-xs text-gray-500">(365-day max)</div>
                    </div>
                  )}
                </div>
                
                {/* TFFC Warning if approaching limit */}
                {formData.servicePackage === 'tffc' && daysRemaining !== null && daysRemaining <= 90 && (
                  <div className={`mt-4 p-3 rounded ${
                    daysRemaining <= 30 ? 'bg-red-50 border-l-4 border-red-500' :
                    daysRemaining <= 60 ? 'bg-orange-50 border-l-4 border-orange-500' :
                    'bg-yellow-50 border-l-4 border-yellow-500'
                  }`}>
                    <p className={`text-sm font-medium ${
                      daysRemaining <= 30 ? 'text-red-800' :
                      daysRemaining <= 60 ? 'text-orange-800' :
                      'text-yellow-800'
                    }`}>
                      ⏱️ {daysRemaining} days remaining until 365-day maximum.
                      {daysRemaining <= 60 && ' Step-down planning should be prioritized.'}
                      {daysRemaining <= 30 && ' URGENT: Step-down must occur soon.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
              
              {/* Previous Score Reference */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="previousCansScore" className="text-sm">Previous CANS Score (for reference)</Label>
                    {viewMode === "edit" ? (
                      <Input
                        id="previousCansScore"
                        type="number"
                        value={formData.previousCansScore}
                        onChange={(e) => handleInputChange("previousCansScore", e.target.value)}
                        placeholder="Previous score"
                        className="mt-1"
                      />
                    ) : (
                      <p className="p-2 bg-white rounded mt-1">{formData.previousCansScore || "Not provided"}</p>
                    )}
                  </div>
                  
                  {/* Trend visualization */}
                  {formData.cansOverallScore && formData.previousCansScore && (
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 px-3 py-2 rounded-lg ${
                        parseFloat(formData.cansOverallScore) < parseFloat(formData.previousCansScore)
                          ? 'bg-green-100 text-green-800'
                          : parseFloat(formData.cansOverallScore) > parseFloat(formData.previousCansScore)
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {parseFloat(formData.cansOverallScore) < parseFloat(formData.previousCansScore) ? (
                          <>
                            <TrendingDown className="h-4 w-4" />
                            <span className="text-sm font-medium">Score Decreased (Improvement)</span>
                          </>
                        ) : parseFloat(formData.cansOverallScore) > parseFloat(formData.previousCansScore) ? (
                          <>
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-sm font-medium">Score Increased (Concern)</span>
                          </>
                        ) : (
                          <span className="text-sm font-medium">No Change</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({formData.previousCansScore} → {formData.cansOverallScore})
                      </span>
                    </div>
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
          {formData.servicePackage && formData.servicePackage !== 'stass' && (
            <Card className={`print:break-inside-avoid ${
              formData.servicePackage === 'tffc' ? 'border-l-4 border-purple-500' :
              formData.servicePackage === 'substance-use' ? 'border-l-4 border-amber-500' :
              ''
            }`}>
              <CardHeader>
                <CardTitle className="print:text-black flex items-center gap-2">
                  {formData.servicePackage === 'substance-use' && <Heart className="h-5 w-5 text-amber-500" />}
                  {formData.servicePackage === 'tffc' && <Shield className="h-5 w-5 text-purple-500" />}
                  Package-Specific Assessment
                </CardTitle>
                <CardDescription className="print:text-black">
                  {formData.servicePackage === "mental-behavioral"
                    ? "Mental & Behavioral Health specific elements"
                    : formData.servicePackage === "idd-autism"
                      ? "IDD/Autism Spectrum Disorder specific elements"
                      : formData.servicePackage === "substance-use"
                        ? "Recovery Progress Assessment - Substance Use specific elements"
                        : formData.servicePackage === "tffc"
                          ? "Treatment Foster Care 60-Day Assessment"
                          : ""}
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

                {/* SUBSTANCE USE ASSESSMENT */}
                {formData.servicePackage === "substance-use" && (
                  <div className="space-y-6">
                    {/* Recovery Status */}
                    <div>
                      <Label className="font-medium print:text-black">Recovery Status *</Label>
                      <RadioGroup
                        value={packageSpecific.recoveryStatus}
                        onValueChange={(value) => handlePackageSpecificChange("recoveryStatus", value)}
                        className="mt-2 space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="stable" id="recovery-stable" />
                          <Label htmlFor="recovery-stable" className="font-normal">
                            Stable recovery - no substance use this period
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="challenges" id="recovery-challenges" />
                          <Label htmlFor="recovery-challenges" className="font-normal">
                            Recovery with minor challenges - maintained sobriety
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="relapse-reengaged" id="recovery-relapse" />
                          <Label htmlFor="recovery-relapse" className="font-normal">
                            Relapse occurred - re-engaged in treatment
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="active-concerns" id="recovery-active" />
                          <Label htmlFor="recovery-active" className="font-normal">
                            Active substance use concerns
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Relapse Details - conditional */}
                    {packageSpecific.recoveryStatus === 'relapse-reengaged' && (
                      <div className="bg-amber-50 p-4 rounded border border-amber-200">
                        <Label className="font-medium text-amber-800">Relapse Information</Label>
                        <p className="text-xs text-amber-700 mb-2">
                          Document in non-punitive, recovery-focused framing per FC-SU-01
                        </p>
                        <Textarea
                          value={packageSpecific.relapseDetails}
                          onChange={(e) => handlePackageSpecificChange("relapseDetails", e.target.value)}
                          placeholder="Describe circumstances, response, and treatment re-engagement..."
                          rows={3}
                        />
                      </div>
                    )}

                    {/* Treatment Engagement */}
                    <div>
                      <Label className="font-medium print:text-black">Substance Use Treatment Engagement *</Label>
                      <RadioGroup
                        value={packageSpecific.treatmentEngagement}
                        onValueChange={(value) => handlePackageSpecificChange("treatmentEngagement", value)}
                        className="mt-2 space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="consistent" id="engagement-consistent" />
                          <Label htmlFor="engagement-consistent" className="font-normal">
                            Consistent - attended all/most sessions
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mostly" id="engagement-mostly" />
                          <Label htmlFor="engagement-mostly" className="font-normal">
                            Mostly consistent - occasional missed sessions
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="inconsistent" id="engagement-inconsistent" />
                          <Label htmlFor="engagement-inconsistent" className="font-normal">
                            Inconsistent - frequent missed sessions
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="not-engaged" id="engagement-not" />
                          <Label htmlFor="engagement-not" className="font-normal">
                            Not engaged in therapy
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* MAT Status */}
                    <div>
                      <Label className="font-medium print:text-black">Medication-Assisted Treatment (MAT)</Label>
                      <RadioGroup
                        value={packageSpecific.matStatus}
                        onValueChange={(value) => handlePackageSpecificChange("matStatus", value)}
                        className="mt-2 space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="not-applicable" id="mat-na" />
                          <Label htmlFor="mat-na" className="font-normal">Not on MAT</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="compliant" id="mat-compliant" />
                          <Label htmlFor="mat-compliant" className="font-normal">On MAT - fully compliant</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="concerns" id="mat-concerns" />
                          <Label htmlFor="mat-concerns" className="font-normal">On MAT - compliance concerns</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Recovery Stability Indicators */}
                    <div>
                      <Label className="font-medium print:text-black">Recovery Stability Indicators</Label>
                      <p className="text-xs text-gray-600 mb-2">Check all that apply</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          { id: 'support-activities', label: 'Engaged in recovery support activities' },
                          { id: 'sober-network', label: 'Building sober support network' },
                          { id: 'coping-skills', label: 'Developing healthy coping skills' },
                          { id: 'trauma-addressed', label: 'Addressing underlying trauma/MH' },
                          { id: 'school-work', label: 'School/work engagement improving' },
                          { id: 'family', label: 'Family relationships improving' },
                        ].map((item) => (
                          <div key={item.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`indicator-${item.id}`}
                              checked={packageSpecific.recoveryIndicators?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                const current = packageSpecific.recoveryIndicators || []
                                const updated = checked
                                  ? [...current, item.id]
                                  : current.filter((i: string) => i !== item.id)
                                handlePackageSpecificChange("recoveryIndicators", updated)
                              }}
                            />
                            <Label htmlFor={`indicator-${item.id}`} className="font-normal text-sm">
                              {item.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recovery Progress Narrative */}
                    <div>
                      <Label htmlFor="recoveryNarrative" className="font-medium print:text-black">
                        Recovery Progress Narrative *
                      </Label>
                      <p className="text-xs text-gray-600 mb-1">
                        Describe recovery progress and treatment engagement this review period
                      </p>
                      <Textarea
                        id="recoveryNarrative"
                        value={packageSpecific.recoveryNarrative}
                        onChange={(e) => handlePackageSpecificChange("recoveryNarrative", e.target.value)}
                        placeholder="Include specific progress toward recovery goals, treatment participation, relapse prevention skill development..."
                        rows={4}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* TFFC ASSESSMENT */}
                {formData.servicePackage === "tffc" && (
                  <div className="space-y-6">
                    {/* TFFC Requirements Alert */}
                    <div className="bg-purple-100 border border-purple-300 rounded p-4">
                      <h4 className="font-bold text-purple-800">⚠️ TFFC Requirements</h4>
                      <ul className="text-sm text-purple-700 mt-2 space-y-1">
                        <li>• Review cycle: <strong>60 days</strong> (not 90)</li>
                        <li>• Maximum placement: <strong>365 days</strong> ({daysRemaining} remaining)</li>
                        <li>• Step-down assessment: <strong>REQUIRED</strong> every review</li>
                        <li>• Crisis analysis: <strong>REQUIRED</strong> every review</li>
                      </ul>
                    </div>

                    {/* Crisis Pattern Analysis */}
                    <div className="bg-red-50 p-4 rounded border border-red-200">
                      <h4 className="font-semibold text-red-800 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Crisis Pattern Analysis (REQUIRED)
                      </h4>
                      <p className="text-xs text-red-600 mb-3">
                        Per FC-TFFC-01 and FC-04.1: Crisis patterns must be analyzed at each 60-day review
                      </p>

                      <div className="space-y-4">
                        <div>
                          <Label className="font-medium">Number of crisis incidents this review period: *</Label>
                          <Input
                            type="number"
                            min="0"
                            value={packageSpecific.crisisCount}
                            onChange={(e) => handlePackageSpecificChange("crisisCount", e.target.value)}
                            className="w-32 mt-1"
                            required
                          />
                        </div>

                        <div>
                          <Label className="font-medium">Crisis frequency trend *</Label>
                          <RadioGroup
                            value={packageSpecific.crisisTrend}
                            onValueChange={(value) => handlePackageSpecificChange("crisisTrend", value)}
                            className="mt-2 space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="significant-decrease" id="crisis-sig-dec" />
                              <Label htmlFor="crisis-sig-dec" className="font-normal text-sm">
                                Significant decrease from previous period
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="moderate-decrease" id="crisis-mod-dec" />
                              <Label htmlFor="crisis-mod-dec" className="font-normal text-sm">
                                Moderate decrease
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="stable" id="crisis-stable" />
                              <Label htmlFor="crisis-stable" className="font-normal text-sm">
                                Stable / No change
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="increase" id="crisis-increase" />
                              <Label htmlFor="crisis-increase" className="font-normal text-sm">
                                Increase from previous period
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="none" id="crisis-none" />
                              <Label htmlFor="crisis-none" className="font-normal text-sm">
                                No crises either period
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label className="font-medium">Crisis Pattern Analysis Narrative *</Label>
                          <Textarea
                            value={packageSpecific.crisisNarrative}
                            onChange={(e) => handlePackageSpecificChange("crisisNarrative", e.target.value)}
                            placeholder="Describe patterns in triggers, intensity, interventions that worked, On-Call Therapist involvement..."
                            rows={3}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Behavioral Stability */}
                    <div>
                      <Label className="font-semibold">Behavioral Stability Assessment *</Label>
                      <RadioGroup
                        value={packageSpecific.behavioralStability}
                        onValueChange={(value) => handlePackageSpecificChange("behavioralStability", value)}
                        className="mt-2 space-y-1"
                      >
                        {[
                          { value: 'significantly-improved', label: 'Significantly improved' },
                          { value: 'moderately-improved', label: 'Moderately improved' },
                          { value: 'stable', label: 'Stable' },
                          { value: 'some-regression', label: 'Some regression' },
                          { value: 'significant-concerns', label: 'Significant concerns' },
                        ].map((item) => (
                          <div key={item.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={item.value} id={`behavior-${item.value}`} />
                            <Label htmlFor={`behavior-${item.value}`} className="font-normal text-sm">
                              {item.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Therapy Engagement */}
                    <div>
                      <Label className="font-semibold">Therapy Engagement *</Label>
                      <p className="text-xs text-gray-600">Weekly minimum individual therapy required for TFFC</p>
                      <RadioGroup
                        value={packageSpecific.therapyEngagement}
                        onValueChange={(value) => handlePackageSpecificChange("therapyEngagement", value)}
                        className="mt-2 space-y-1"
                      >
                        {[
                          { value: 'fully-engaged', label: 'Fully engaged - consistent attendance and participation' },
                          { value: 'mostly-engaged', label: 'Mostly engaged - good participation with occasional challenges' },
                          { value: 'partially-engaged', label: 'Partially engaged - inconsistent attendance or participation' },
                          { value: 'minimally-engaged', label: 'Minimally engaged - significant barriers' },
                        ].map((item) => (
                          <div key={item.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={item.value} id={`therapy-${item.value}`} />
                            <Label htmlFor={`therapy-${item.value}`} className="font-normal text-sm">
                              {item.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Step-Down Assessment (REQUIRED) */}
                    <div className="bg-green-50 border border-green-300 p-4 rounded">
                      <h4 className="font-bold text-green-800 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Step-Down Readiness Assessment (REQUIRED)
                      </h4>
                      <p className="text-xs text-green-700 mb-3">
                        Per T3C Blueprint: Step-down assessment must be completed at EVERY 60-day review.
                        Goal is transition to less intensive setting within 365-day maximum.
                      </p>

                      <div className="space-y-4">
                        {/* Step-Down Readiness */}
                        <div>
                          <Label className="font-medium">Current Step-Down Readiness *</Label>
                          <RadioGroup
                            value={packageSpecific.stepDownReadiness}
                            onValueChange={(value) => handlePackageSpecificChange("stepDownReadiness", value)}
                            className="mt-2 space-y-1"
                          >
                            {[
                              { value: 'ready', label: 'Ready for step-down - recommend transition planning' },
                              { value: 'approaching', label: 'Approaching readiness - continue 1-2 more review periods' },
                              { value: 'not-ready', label: 'Not ready - specific barriers identified' },
                              { value: 'regression', label: 'Regression noted - intensification may be needed' },
                            ].map((item) => (
                              <div key={item.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={item.value} id={`stepdown-${item.value}`} />
                                <Label htmlFor={`stepdown-${item.value}`} className="font-normal text-sm">
                                  {item.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {/* Step-Down Indicators */}
                        <div>
                          <Label className="font-medium">Step-Down Readiness Indicators Met</Label>
                          <p className="text-xs text-gray-600">Check all that apply</p>
                          <div className="grid grid-cols-2 gap-1 mt-2 text-sm">
                            {[
                              'Reduced crisis frequency',
                              'Improved emotional regulation',
                              'Stable medication regimen',
                              'Consistent school attendance',
                              'Reduced supervision needs',
                              'Improved family relationships',
                              'Coping skills developed',
                              'Reduced self-harm (if applicable)',
                            ].map((item) => (
                              <div key={item} className="flex items-center gap-1">
                                <Checkbox
                                  id={`stepind-${item}`}
                                  checked={packageSpecific.stepDownIndicators?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    const current = packageSpecific.stepDownIndicators || []
                                    const updated = checked
                                      ? [...current, item]
                                      : current.filter((i: string) => i !== item)
                                    handlePackageSpecificChange("stepDownIndicators", updated)
                                  }}
                                />
                                <Label htmlFor={`stepind-${item}`} className="font-normal text-xs">
                                  {item}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Barriers to Step-Down */}
                        <div>
                          <Label className="font-medium">Barriers to Step-Down</Label>
                          <p className="text-xs text-gray-600">Check all that apply</p>
                          <div className="grid grid-cols-2 gap-1 mt-2 text-sm">
                            {[
                              'Ongoing crisis frequency',
                              'Insufficient behavioral stability',
                              'Medication adjustments in progress',
                              'Active psychiatric symptoms',
                              'No appropriate placement identified',
                              'Family/permanency not ready',
                              'Recent regression',
                            ].map((item) => (
                              <div key={item} className="flex items-center gap-1">
                                <Checkbox
                                  id={`barrier-${item}`}
                                  checked={packageSpecific.stepDownBarriersTffc?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    const current = packageSpecific.stepDownBarriersTffc || []
                                    const updated = checked
                                      ? [...current, item]
                                      : current.filter((i: string) => i !== item)
                                    handlePackageSpecificChange("stepDownBarriersTffc", updated)
                                  }}
                                />
                                <Label htmlFor={`barrier-${item}`} className="font-normal text-xs">
                                  {item}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recommended Step-Down Destination */}
                        <div>
                          <Label className="font-medium">Recommended Step-Down Destination *</Label>
                          <RadioGroup
                            value={packageSpecific.stepDownDestination}
                            onValueChange={(value) => handlePackageSpecificChange("stepDownDestination", value)}
                            className="mt-2 space-y-1"
                          >
                            {[
                              { value: 'same-home-basic', label: 'Same foster home - transition to Basic Package (if dually credentialed)' },
                              { value: 'different-home-basic', label: 'Different foster home - Basic Package' },
                              { value: 'different-specialized', label: 'Different foster home - other specialized package' },
                              { value: 'permanency', label: 'Permanency placement (reunification, adoption, etc.)' },
                              { value: 'not-appropriate', label: 'Step-down not appropriate at this time' },
                            ].map((item) => (
                              <div key={item.value} className="flex items-center space-x-2">
                                <RadioGroupItem value={item.value} id={`dest-${item.value}`} />
                                <Label htmlFor={`dest-${item.value}`} className="font-normal text-sm">
                                  {item.label}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {/* Step-Down Planning Notes */}
                        <div>
                          <Label className="font-medium">Step-Down Planning Notes *</Label>
                          <Textarea
                            value={packageSpecific.stepDownNotes}
                            onChange={(e) => handlePackageSpecificChange("stepDownNotes", e.target.value)}
                            placeholder="Specific steps being taken toward step-down, timeline, barriers being addressed..."
                            rows={3}
                            required
                          />
                        </div>
                      </div>
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
                  <strong>Note:</strong> This confirmation must be completed concurrently with each{" "}
                  {formData.servicePackage === 'tffc' ? '60' : '90'}-day Service Plan Review
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

              <div className={`p-4 rounded-md print:bg-white print:border ${
                  formData.servicePackage === 'tffc' ? 'bg-purple-50' : 'bg-blue-50'
                }`}>
                <p className={`text-sm print:text-black ${
                  formData.servicePackage === 'tffc' ? 'text-purple-800' : 'text-blue-800'
                }`}>
                  <strong>Certification Statement:</strong> We certify that{" "}
                  <span className="font-bold underline">{formData.childName || "[Child's Name]"}</span>{" "}
                  continues to meet criteria for and is benefitting from the{" "}
                  <span className="font-bold">{currentPackage?.fullLabel || "[Service Package Name]"}</span>,{" "}
                  and that the less-restrictive T3C Basic Foster Home Service Package is not
                  appropriate to meet the child's needs at this time.
                </p>
              </div>

              {/* TFFC Additional Certifications */}
              {formData.servicePackage === 'tffc' && (
                <div className="bg-purple-50 p-4 rounded-md mt-4 border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-3">TFFC-Specific Certifications (Required)</h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      {viewMode === "edit" ? (
                        <Checkbox
                          id="tffcContinuedNeedConfirmation"
                          checked={formData.tffcContinuedNeedConfirmation}
                          onCheckedChange={(checked) => handleInputChange("tffcContinuedNeedConfirmation", checked)}
                          required
                        />
                      ) : (
                        <div className={`w-4 h-4 border rounded mt-0.5 ${formData.tffcContinuedNeedConfirmation ? "bg-purple-600" : "bg-white"}`}>
                          {formData.tffcContinuedNeedConfirmation && <span className="text-white text-xs">✓</span>}
                        </div>
                      )}
                      <Label htmlFor="tffcContinuedNeedConfirmation" className="font-normal text-purple-800">
                        Treatment Director confirms child requires continued T3C Treatment Foster Care 
                        and step-down is not appropriate at this time *
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      {viewMode === "edit" ? (
                        <Checkbox
                          id="fosterHomeCredentialConfirmation"
                          checked={formData.fosterHomeCredentialConfirmation}
                          onCheckedChange={(checked) => handleInputChange("fosterHomeCredentialConfirmation", checked)}
                          required
                        />
                      ) : (
                        <div className={`w-4 h-4 border rounded mt-0.5 ${formData.fosterHomeCredentialConfirmation ? "bg-purple-600" : "bg-white"}`}>
                          {formData.fosterHomeCredentialConfirmation && <span className="text-white text-xs">✓</span>}
                        </div>
                      )}
                      <Label htmlFor="fosterHomeCredentialConfirmation" className="font-normal text-purple-800">
                        Foster home maintains Treatment Foster Care credential *
                      </Label>
                    </div>
                  </div>
                </div>
              )}
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
            <strong>Compliance Statement:</strong> This form fulfills T3C Blueprint requirements for{" "}
            {formData.servicePackage === 'tffc' ? '60-day' : '90-day'} written confirmation of continued stay 
            necessity as outlined in:{" "}
            {formData.servicePackage === 'mental-behavioral' && 'Mental & Behavioral Health Support Services (p.85)'}
            {formData.servicePackage === 'idd-autism' && 'IDD/Autism Spectrum Disorder Support Services (p.133-134)'}
            {formData.servicePackage === 'substance-use' && 'Substance Use Support Services (per FC-SU-01)'}
            {formData.servicePackage === 'tffc' && 'T3C Treatment Foster Family Care Support Services (p.145)'}
            {!formData.servicePackage && 'the applicable service package'}{" "}
            specifications. This form is conditionally incorporated into the Service Plan when these packages 
            are utilized.
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
