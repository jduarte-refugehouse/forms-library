"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, CheckCircle2, AlertTriangle, FileText, Calendar, ClipboardList, Users, Activity, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function STASSAssessmentProgressPage() {
  const [formData, setFormData] = useState({
    childName: "",
    caseNumber: "",
    placementDate: "",
    assessmentDuration: "30", // 30 or 45 days
    extensionApproved: false,
    extensionReason: "",
    extensionApprovedBy: "",
    // Assessment activities
    medicalScreening: false,
    medicalScreeningDate: "",
    dentalScreening: false,
    dentalScreeningDate: "",
    psychiatricEval: false,
    psychiatricEvalDate: "",
    psychologicalEval: false,
    psychologicalEvalDate: "",
    educationalAssessment: false,
    educationalAssessmentDate: "",
    developmentalEval: false,
    developmentalEvalDate: "",
    traumaScreening: false,
    traumaScreeningDate: "",
    substanceScreening: false,
    substanceScreeningDate: "",
    cansAssessment: false,
    cansAssessmentDate: "",
    safetyPlan: false,
    safetyPlanDate: "",
    // Observations
    behavioralObservations: "",
    strengthsIdentified: "",
    concernsIdentified: "",
    // Recommendation
    recommendedPackage: "",
    recommendationRationale: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Calculate days in placement
  const calculateDaysInPlacement = () => {
    if (!formData.placementDate) return 0
    const start = new Date(formData.placementDate)
    const today = new Date()
    return Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const daysInPlacement = calculateDaysInPlacement()
  const maxDays = parseInt(formData.assessmentDuration) + (formData.extensionApproved ? 15 : 0)
  const daysRemaining = Math.max(0, maxDays - daysInPlacement)
  const progressPercent = Math.min(100, (daysInPlacement / maxDays) * 100)

  // Calculate assessment completion
  const assessments = [
    { key: 'medicalScreening', label: 'Medical Screening', required: true },
    { key: 'dentalScreening', label: 'Dental Screening', required: true },
    { key: 'psychiatricEval', label: 'Psychiatric Evaluation', required: false },
    { key: 'psychologicalEval', label: 'Psychological Evaluation', required: false },
    { key: 'educationalAssessment', label: 'Educational Assessment', required: false },
    { key: 'developmentalEval', label: 'Developmental Evaluation', required: false },
    { key: 'traumaScreening', label: 'Trauma Screening', required: true },
    { key: 'substanceScreening', label: 'Substance Use Screening', required: false },
    { key: 'cansAssessment', label: 'CANS 3.0 Assessment', required: true },
    { key: 'safetyPlan', label: 'Personal Safety Plan', required: true },
  ]

  const completedAssessments = assessments.filter(a => formData[a.key as keyof typeof formData]).length
  const requiredAssessments = assessments.filter(a => a.required)
  const completedRequired = requiredAssessments.filter(a => formData[a.key as keyof typeof formData]).length
  const assessmentProgress = (completedAssessments / assessments.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 gap-2 text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>

          <div className="flex items-center gap-6 mb-6">
            <div className="bg-white rounded-full p-3">
              <Image
                src="/images/refugehouse-logo.png"
                alt="Refuge House Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">STASS Assessment Progress</h1>
              <p className="text-xl text-gray-300">Short-Term Assessment Support Services</p>
              <Badge className="mt-2 bg-gray-600 text-white border-gray-500">
                Assessment Timeline Tracking
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Important Notice */}
        <Card className="mb-6 border-l-4 border-gray-500 bg-gray-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-800">STASS Time-Limited Placement</h3>
                <p className="text-gray-700 text-sm mt-1">
                  Short-Term Assessment placements are limited to <strong>30-45 days maximum</strong>. 
                  Extensions require Program Director written approval with documented justification per T3C Blueprint p.72.
                  This is an <strong>assessment-only</strong> placement - no continued stay reviews apply.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Child Info & Timeline */}
          <div className="lg:col-span-1 space-y-6">
            {/* Child Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Child Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="childName">Child's Name *</Label>
                  <Input
                    id="childName"
                    value={formData.childName}
                    onChange={(e) => handleInputChange("childName", e.target.value)}
                    placeholder="Enter child's name"
                  />
                </div>
                <div>
                  <Label htmlFor="caseNumber">Case Number *</Label>
                  <Input
                    id="caseNumber"
                    value={formData.caseNumber}
                    onChange={(e) => handleInputChange("caseNumber", e.target.value)}
                    placeholder="CS-2024-XXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="placementDate">STASS Placement Date *</Label>
                  <Input
                    id="placementDate"
                    type="date"
                    value={formData.placementDate}
                    onChange={(e) => handleInputChange("placementDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="assessmentDuration">Assessment Duration</Label>
                  <Select
                    value={formData.assessmentDuration}
                    onValueChange={(value) => handleInputChange("assessmentDuration", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days (Standard)</SelectItem>
                      <SelectItem value="45">45 Days (Extended Assessment)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Progress */}
            <Card className={`${daysRemaining <= 7 ? 'border-red-500 border-2' : daysRemaining <= 14 ? 'border-yellow-500 border-2' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Assessment Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${
                    daysRemaining <= 7 ? 'text-red-600' : 
                    daysRemaining <= 14 ? 'text-yellow-600' : 
                    'text-gray-700'
                  }`}>
                    {daysRemaining}
                  </div>
                  <div className="text-sm text-gray-600">days remaining</div>
                </div>

                <Progress 
                  value={progressPercent} 
                  className={`h-3 ${progressPercent >= 80 ? '[&>div]:bg-red-500' : progressPercent >= 60 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'}`}
                />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <div className="font-bold text-gray-700">Day {daysInPlacement}</div>
                    <div className="text-xs text-gray-500">of {maxDays}</div>
                  </div>
                  <div className="text-center p-2 bg-gray-100 rounded">
                    <div className="font-bold text-gray-700">{Math.round(progressPercent)}%</div>
                    <div className="text-xs text-gray-500">time elapsed</div>
                  </div>
                </div>

                {daysRemaining <= 7 && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                    <strong>⚠️ URGENT:</strong> Assessment completion and transition planning must be finalized immediately.
                  </div>
                )}

                {/* Extension Section */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox
                      id="extensionApproved"
                      checked={formData.extensionApproved}
                      onCheckedChange={(checked) => handleInputChange("extensionApproved", checked)}
                    />
                    <Label htmlFor="extensionApproved" className="font-medium">
                      Extension Approved
                    </Label>
                  </div>

                  {formData.extensionApproved && (
                    <div className="space-y-3 pl-6">
                      <div>
                        <Label className="text-sm">Extension Reason</Label>
                        <Textarea
                          value={formData.extensionReason}
                          onChange={(e) => handleInputChange("extensionReason", e.target.value)}
                          placeholder="Document justification per T3C Blueprint p.72"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Approved By (Program Director)</Label>
                        <Input
                          value={formData.extensionApprovedBy}
                          onChange={(e) => handleInputChange("extensionApprovedBy", e.target.value)}
                          placeholder="Program Director name"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Assessment Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Assessment Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-gray-700">
                    {completedAssessments}/{assessments.length}
                  </div>
                  <div className="text-sm text-gray-500">assessments complete</div>
                </div>
                <Progress value={assessmentProgress} className="h-3 mb-4" />
                <div className={`text-sm p-2 rounded ${
                  completedRequired < requiredAssessments.length 
                    ? 'bg-yellow-50 text-yellow-800' 
                    : 'bg-green-50 text-green-800'
                }`}>
                  Required: {completedRequired}/{requiredAssessments.length} complete
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Assessment Checklist */}
          <div className="lg:col-span-2 space-y-6">
            {/* Required Assessments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5" />
                  Assessment Activity Checklist
                </CardTitle>
                <CardDescription>
                  Track completion of required and recommended assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessments.map((assessment) => (
                    <div 
                      key={assessment.key}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        formData[assessment.key as keyof typeof formData] 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={assessment.key}
                          checked={formData[assessment.key as keyof typeof formData] as boolean}
                          onCheckedChange={(checked) => handleInputChange(assessment.key, checked)}
                        />
                        <div>
                          <Label htmlFor={assessment.key} className="font-medium cursor-pointer">
                            {assessment.label}
                          </Label>
                          {assessment.required && (
                            <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="date"
                          className="w-40"
                          value={formData[`${assessment.key}Date` as keyof typeof formData] as string || ""}
                          onChange={(e) => handleInputChange(`${assessment.key}Date`, e.target.value)}
                          placeholder="Date"
                        />
                        {formData[assessment.key as keyof typeof formData] && (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Observations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Behavioral Observations & Findings
                </CardTitle>
                <CardDescription>
                  Document patterns and observations to inform package recommendation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="behavioralObservations">Behavioral Observations</Label>
                  <Textarea
                    id="behavioralObservations"
                    value={formData.behavioralObservations}
                    onChange={(e) => handleInputChange("behavioralObservations", e.target.value)}
                    placeholder="Document behavioral patterns, triggers, responses observed during assessment period..."
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="strengthsIdentified">Strengths Identified</Label>
                    <Textarea
                      id="strengthsIdentified"
                      value={formData.strengthsIdentified}
                      onChange={(e) => handleInputChange("strengthsIdentified", e.target.value)}
                      placeholder="Document child's strengths..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="concernsIdentified">Concerns/Needs Identified</Label>
                    <Textarea
                      id="concernsIdentified"
                      value={formData.concernsIdentified}
                      onChange={(e) => handleInputChange("concernsIdentified", e.target.value)}
                      placeholder="Document concerns and needs..."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Recommendation */}
            <Card className="border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Service Package Recommendation
                </CardTitle>
                <CardDescription>
                  Based on assessment findings, recommend appropriate ongoing service package
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="recommendedPackage">Recommended T3C Service Package *</Label>
                  <Select
                    value={formData.recommendedPackage}
                    onValueChange={(value) => handleInputChange("recommendedPackage", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select recommended package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">T3C Basic Foster Family Home</SelectItem>
                      <SelectItem value="mental-behavioral">Mental & Behavioral Health Support Services</SelectItem>
                      <SelectItem value="idd-autism">IDD/Autism Spectrum Disorder Support Services</SelectItem>
                      <SelectItem value="substance-use">Substance Use Support Services</SelectItem>
                      <SelectItem value="tffc">T3C Treatment Foster Family Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="recommendationRationale">Recommendation Rationale *</Label>
                  <Textarea
                    id="recommendationRationale"
                    value={formData.recommendationRationale}
                    onChange={(e) => handleInputChange("recommendationRationale", e.target.value)}
                    placeholder="Document clinical rationale for the recommended service package based on assessment findings..."
                    rows={4}
                  />
                </div>

                {formData.recommendedPackage && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      <strong>Next Step:</strong> Complete the{" "}
                      <Link href="/forms/stass-transition-planning" className="underline hover:text-blue-600">
                        STASS Transition Planning Form
                      </Link>{" "}
                      to coordinate transition to {formData.recommendedPackage === 'basic' ? 'T3C Basic' : 
                        formData.recommendedPackage === 'mental-behavioral' ? 'Mental & Behavioral Health' :
                        formData.recommendedPackage === 'idd-autism' ? 'IDD/Autism' :
                        formData.recommendedPackage === 'substance-use' ? 'Substance Use' :
                        formData.recommendedPackage === 'tffc' ? 'Treatment Foster Family Care' : ''
                      } Support Services.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex gap-3">
                <Button variant="outline">Save Draft</Button>
                <Button className="bg-gray-700 hover:bg-gray-800">
                  Complete Assessment
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>STASS Assessment Progress Tracking:</strong> This form tracks assessment activities during 
            Short-Term Assessment Support Services placements. STASS is time-limited (30-45 days) and focuses on 
            comprehensive assessment to inform appropriate ongoing service package placement. No continued stay 
            reviews apply to STASS placements.
          </p>
          <p className="text-xs text-gray-500 mt-2">Last Updated: December 11, 2025</p>
        </div>
      </div>
    </div>
  )
}

