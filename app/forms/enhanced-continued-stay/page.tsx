"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, FileCheck, Save, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EnhancedContinuedStayForm() {
  const [formData, setFormData] = useState({
    childName: "",
    childDOB: "",
    caseNumber: "",
    servicePackage: "",
    reviewDate: "",
    reviewPeriodFrom: "",
    reviewPeriodTo: "",
    cansAssessmentDate: "",
    cansOverallScore: "",
    cansTrend: "",
    meetsAdmissionCriteria: false,
    benefittingFromTreatment: false,
    basicPackageNotAppropriate: false,
    clinicalJustification: "",
    treatmentProgress: "",
    stepDownBarriers: "",
    servicePlanDate: "",
    servicePlanId: "",
    programDirectorSignature: "",
    treatmentDirectorSignature: "",
    dfpsCopySent: false,
    dfpsSentDate: "",
    radiusAttached: false,
  })

  const [packageSpecific, setPackageSpecific] = useState({
    // Mental & Behavioral Health
    psychiatricStability: "",
    crisisFrequency: "",
    medicationCompliance: "",
    therapeuticProgress: "",
    familyReadiness: "",
    // IDD/Autism
    behavioralSupport: "",
    medicalRequirements: "",
    skillDevelopment: "",
    environmentalMods: "",
    caregiverCapability: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePackageSpecificChange = (field: string, value: any) => {
    setPackageSpecific((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { formData, packageSpecific })
    alert("Enhanced Continued Stay Confirmation submitted successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Form Directory
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Enhanced Continued Stay Confirmation</h1>
              <p className="text-gray-600">90-day confirmation for specialized service packages</p>
            </div>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800">
              Draft
            </Badge>
          </div>

          {/* Integration Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-blue-800 text-sm">
                <p className="font-medium mb-1">Service Plan Integration</p>
                <p>
                  This form is incorporated into the Service Plan for children receiving Mental & Behavioral Health or
                  IDD/Autism Spectrum Disorder Support Services and is reviewed concurrently with the 90-day Service
                  Plan Review per TAC §749.1335.
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Header Section */}
          <Card>
            <CardHeader>
              <CardTitle>Header Information</CardTitle>
              <CardDescription>Basic child and case information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="childName">Child's Name *</Label>
                  <Input
                    id="childName"
                    value={formData.childName}
                    onChange={(e) => handleInputChange("childName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="childDOB">Child's Date of Birth *</Label>
                  <Input
                    id="childDOB"
                    type="date"
                    value={formData.childDOB}
                    onChange={(e) => handleInputChange("childDOB", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="caseNumber">Case Number *</Label>
                  <Input
                    id="caseNumber"
                    value={formData.caseNumber}
                    onChange={(e) => handleInputChange("caseNumber", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="servicePackage">Current Service Package *</Label>
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
                </div>
                <div>
                  <Label htmlFor="reviewDate">Review Date *</Label>
                  <Input
                    id="reviewDate"
                    type="date"
                    value={formData.reviewDate}
                    onChange={(e) => handleInputChange("reviewDate", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reviewPeriodFrom">Service Plan Review Period - From *</Label>
                  <Input
                    id="reviewPeriodFrom"
                    type="date"
                    value={formData.reviewPeriodFrom}
                    onChange={(e) => handleInputChange("reviewPeriodFrom", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="reviewPeriodTo">Service Plan Review Period - To *</Label>
                  <Input
                    id="reviewPeriodTo"
                    type="date"
                    value={formData.reviewPeriodTo}
                    onChange={(e) => handleInputChange("reviewPeriodTo", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CANS 3.0 Assessment Data */}
          <Card>
            <CardHeader>
              <CardTitle>CANS 3.0 Assessment Data</CardTitle>
              <CardDescription>Most recent assessment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cansAssessmentDate">Most Recent CANS 3.0 Assessment Date *</Label>
                  <Input
                    id="cansAssessmentDate"
                    type="date"
                    value={formData.cansAssessmentDate}
                    onChange={(e) => handleInputChange("cansAssessmentDate", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cansOverallScore">Overall CANS Score *</Label>
                  <Input
                    id="cansOverallScore"
                    type="number"
                    value={formData.cansOverallScore}
                    onChange={(e) => handleInputChange("cansOverallScore", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cansTrend">Trend Indicator *</Label>
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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Clinical Justification */}
          <Card>
            <CardHeader>
              <CardTitle>Clinical Justification</CardTitle>
              <CardDescription>Required elements per T3C Blueprint</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="meetsAdmissionCriteria"
                    checked={formData.meetsAdmissionCriteria}
                    onCheckedChange={(checked) => handleInputChange("meetsAdmissionCriteria", checked)}
                  />
                  <Label htmlFor="meetsAdmissionCriteria" className="font-medium">
                    Child continues to meet admission criteria for the service package *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="benefittingFromTreatment"
                    checked={formData.benefittingFromTreatment}
                    onCheckedChange={(checked) => handleInputChange("benefittingFromTreatment", checked)}
                  />
                  <Label htmlFor="benefittingFromTreatment" className="font-medium">
                    Child is benefitting from the Evidence-informed Treatment Model *
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="basicPackageNotAppropriate"
                    checked={formData.basicPackageNotAppropriate}
                    onCheckedChange={(checked) => handleInputChange("basicPackageNotAppropriate", checked)}
                  />
                  <Label htmlFor="basicPackageNotAppropriate" className="font-medium">
                    Less-restrictive T3C Basic Foster Home Service Package is NOT appropriate *
                  </Label>
                </div>
              </div>

              <div>
                <Label htmlFor="clinicalJustification">Clinical Justification Narrative *</Label>
                <Textarea
                  id="clinicalJustification"
                  value={formData.clinicalJustification}
                  onChange={(e) => handleInputChange("clinicalJustification", e.target.value)}
                  placeholder="Provide detailed clinical justification for continued specialized services..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="treatmentProgress">Treatment Progress and Engagement Metrics *</Label>
                <Textarea
                  id="treatmentProgress"
                  value={formData.treatmentProgress}
                  onChange={(e) => handleInputChange("treatmentProgress", e.target.value)}
                  placeholder="Document specific improvements, progress indicators, and treatment engagement..."
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="stepDownBarriers">Barriers to Step-Down to Basic Services *</Label>
                <Textarea
                  id="stepDownBarriers"
                  value={formData.stepDownBarriers}
                  onChange={(e) => handleInputChange("stepDownBarriers", e.target.value)}
                  placeholder="Explain specific reasons why step-down is not appropriate, including safety concerns..."
                  className="min-h-[100px]"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Package-Specific Elements */}
          {formData.servicePackage && (
            <Card>
              <CardHeader>
                <CardTitle>Package-Specific Assessment</CardTitle>
                <CardDescription>
                  {formData.servicePackage === "mental-behavioral"
                    ? "Mental & Behavioral Health specific elements"
                    : "IDD/Autism Spectrum Disorder specific elements"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.servicePackage === "mental-behavioral" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="psychiatricStability">Psychiatric Stability Indicators</Label>
                      <Textarea
                        id="psychiatricStability"
                        value={packageSpecific.psychiatricStability}
                        onChange={(e) => handlePackageSpecificChange("psychiatricStability", e.target.value)}
                        placeholder="Document current psychiatric stability status..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="crisisFrequency">Crisis Frequency/Severity</Label>
                      <Textarea
                        id="crisisFrequency"
                        value={packageSpecific.crisisFrequency}
                        onChange={(e) => handlePackageSpecificChange("crisisFrequency", e.target.value)}
                        placeholder="Document crisis episodes and severity levels..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="medicationCompliance">Medication Compliance</Label>
                      <Textarea
                        id="medicationCompliance"
                        value={packageSpecific.medicationCompliance}
                        onChange={(e) => handlePackageSpecificChange("medicationCompliance", e.target.value)}
                        placeholder="Document medication adherence and effectiveness..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="therapeuticProgress">Therapeutic Progress</Label>
                      <Textarea
                        id="therapeuticProgress"
                        value={packageSpecific.therapeuticProgress}
                        onChange={(e) => handlePackageSpecificChange("therapeuticProgress", e.target.value)}
                        placeholder="Document progress in therapeutic interventions..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="familyReadiness">Family Readiness for Managing Mental Health Needs</Label>
                      <Textarea
                        id="familyReadiness"
                        value={packageSpecific.familyReadiness}
                        onChange={(e) => handlePackageSpecificChange("familyReadiness", e.target.value)}
                        placeholder="Assess family/caregiver capacity for mental health support..."
                      />
                    </div>
                  </div>
                )}

                {formData.servicePackage === "idd-autism" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="behavioralSupport">Behavioral Support Needs</Label>
                      <Textarea
                        id="behavioralSupport"
                        value={packageSpecific.behavioralSupport}
                        onChange={(e) => handlePackageSpecificChange("behavioralSupport", e.target.value)}
                        placeholder="Document current behavioral support requirements..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="medicalRequirements">Medical/Nursing Requirements</Label>
                      <Textarea
                        id="medicalRequirements"
                        value={packageSpecific.medicalRequirements}
                        onChange={(e) => handlePackageSpecificChange("medicalRequirements", e.target.value)}
                        placeholder="Document specialized medical or nursing needs..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="skillDevelopment">Skill Development Progress</Label>
                      <Textarea
                        id="skillDevelopment"
                        value={packageSpecific.skillDevelopment}
                        onChange={(e) => handlePackageSpecificChange("skillDevelopment", e.target.value)}
                        placeholder="Document progress in adaptive and life skills..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="environmentalMods">Environmental Modification Needs</Label>
                      <Textarea
                        id="environmentalMods"
                        value={packageSpecific.environmentalMods}
                        onChange={(e) => handlePackageSpecificChange("environmentalMods", e.target.value)}
                        placeholder="Document required environmental accommodations..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="caregiverCapability">Caregiver Capability Assessment</Label>
                      <Textarea
                        id="caregiverCapability"
                        value={packageSpecific.caregiverCapability}
                        onChange={(e) => handlePackageSpecificChange("caregiverCapability", e.target.value)}
                        placeholder="Assess caregiver capacity for specialized support..."
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Service Plan Integration */}
          <Card>
            <CardHeader>
              <CardTitle>Service Plan Integration</CardTitle>
              <CardDescription>Connection to broader service planning process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="servicePlanAttached" />
                <Label htmlFor="servicePlanAttached" className="font-medium">
                  This Enhanced Continued Stay Confirmation is attached to and incorporated into the Service Plan dated:
                </Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                <div>
                  <Label htmlFor="servicePlanDate">Service Plan Date</Label>
                  <Input
                    id="servicePlanDate"
                    type="date"
                    value={formData.servicePlanDate}
                    onChange={(e) => handleInputChange("servicePlanDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="servicePlanId">Service Plan Document ID/Number</Label>
                  <Input
                    id="servicePlanId"
                    value={formData.servicePlanId}
                    onChange={(e) => handleInputChange("servicePlanId", e.target.value)}
                    placeholder="Enter document ID"
                  />
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> This confirmation must be completed concurrently with each 90-day Service Plan
                  Review
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Certification Section */}
          <Card>
            <CardHeader>
              <CardTitle>Certification</CardTitle>
              <CardDescription>Required signatures and certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="programDirectorSignature">Program Director Signature *</Label>
                  <Input
                    id="programDirectorSignature"
                    value={formData.programDirectorSignature}
                    onChange={(e) => handleInputChange("programDirectorSignature", e.target.value)}
                    placeholder="Digital signature or name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="treatmentDirectorSignature">Treatment Director Signature *</Label>
                  <Input
                    id="treatmentDirectorSignature"
                    value={formData.treatmentDirectorSignature}
                    onChange={(e) => handleInputChange("treatmentDirectorSignature", e.target.value)}
                    placeholder="Digital signature or name"
                    required
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-800">
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
          <Card>
            <CardHeader>
              <CardTitle>Distribution Requirements</CardTitle>
              <CardDescription>Required notifications and record keeping</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="dfpsCopySent"
                  checked={formData.dfpsCopySent}
                  onCheckedChange={(checked) => handleInputChange("dfpsCopySent", checked)}
                />
                <Label htmlFor="dfpsCopySent" className="font-medium">
                  Copy will be sent to SSCC/DFPS within 15 business days
                </Label>
              </div>

              <div className="ml-6">
                <Label htmlFor="dfpsSentDate">Date Sent to SSCC/DFPS</Label>
                <Input
                  id="dfpsSentDate"
                  type="date"
                  value={formData.dfpsSentDate}
                  onChange={(e) => handleInputChange("dfpsSentDate", e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="radiusAttached"
                  checked={formData.radiusAttached}
                  onCheckedChange={(checked) => handleInputChange("radiusAttached", checked)}
                />
                <Label htmlFor="radiusAttached" className="font-medium">
                  Copy attached to Service Plan in Radius
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-between items-center pt-6">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Directory
              </Button>
            </Link>

            <div className="flex gap-3">
              <Button type="button" variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Submit Form
              </Button>
            </div>
          </div>
        </form>

        {/* Compliance Footer */}
        <div className="mt-12 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
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
