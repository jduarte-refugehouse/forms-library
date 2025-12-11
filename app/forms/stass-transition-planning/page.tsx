"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Users, Home, Calendar, CheckCircle2, AlertTriangle, FileText, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

export default function STASSTransitionPlanningPage() {
  const [formData, setFormData] = useState({
    // Child Information
    childName: "",
    caseNumber: "",
    stassPlacementDate: "",
    stassEndDate: "",
    currentFosterHome: "",
    // Assessment Summary
    assessmentCompletionDate: "",
    recommendedPackage: "",
    primaryDiagnoses: "",
    keyFindings: "",
    // Transition Details
    transitionType: "", // same-home, different-home, permanency
    receivingPackage: "",
    receivingFosterHome: "",
    receivingHomeCredentialVerified: false,
    transitionDate: "",
    // Placement Continuity
    sameFosterHome: false,
    fosterHomeAgreesToContinue: false,
    homeHasRequiredCredential: false,
    capacityAvailable: false,
    // New Placement Details (if different home)
    newFosterParentNames: "",
    newFosterParentPhone: "",
    newFosterParentEmail: "",
    newFosterHomeAddress: "",
    // Transition Preparation
    childPrepared: false,
    childPreparationNotes: "",
    fosterParentOrientation: false,
    fosterParentOrientationDate: "",
    recordsTransferred: false,
    medicationsTransferred: false,
    schoolNotified: false,
    therapistNotified: false,
    dfpsNotified: false,
    dfpsNotificationDate: "",
    // Service Continuity
    therapyArranged: false,
    therapistName: "",
    psychiatricFollowUp: false,
    psychiatristName: "",
    medicalFollowUp: false,
    specializedServicesArranged: false,
    specializedServicesDetails: "",
    // Transition Meeting
    transitionMeetingDate: "",
    transitionMeetingAttendees: "",
    transitionMeetingNotes: "",
    // Signatures
    caseManagerSignature: "",
    supervisorSignature: "",
    receivingCaseManagerSignature: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const packageLabels: Record<string, string> = {
    'basic': 'T3C Basic Foster Family Home',
    'mental-behavioral': 'Mental & Behavioral Health Support Services',
    'idd-autism': 'IDD/Autism Spectrum Disorder Support Services',
    'substance-use': 'Substance Use Support Services',
    'tffc': 'T3C Treatment Foster Family Care',
    'permanency': 'Permanency Placement (Reunification/Adoption)',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-green-800 text-white">
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
              <h1 className="text-4xl font-bold mb-2">STASS Transition Planning</h1>
              <p className="text-xl text-green-200">Coordinating Transition from Assessment to Ongoing Services</p>
              <Badge className="mt-2 bg-green-600 text-white border-green-500">
                Short-Term Assessment → Ongoing Package
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Notice */}
        <Card className="mb-6 border-l-4 border-green-500 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-800">Transition from STASS</h3>
                <p className="text-green-700 text-sm mt-1">
                  This form coordinates the transition from Short-Term Assessment Support Services (STASS) 
                  to an ongoing T3C service package. STASS is assessment-only; children must transition to an 
                  appropriate service package based on assessment findings.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form className="space-y-6">
          {/* Child & Assessment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Child & Assessment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="childName">Child's Name *</Label>
                  <Input
                    id="childName"
                    value={formData.childName}
                    onChange={(e) => handleInputChange("childName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="caseNumber">Case Number *</Label>
                  <Input
                    id="caseNumber"
                    value={formData.caseNumber}
                    onChange={(e) => handleInputChange("caseNumber", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="stassPlacementDate">STASS Placement Date</Label>
                  <Input
                    id="stassPlacementDate"
                    type="date"
                    value={formData.stassPlacementDate}
                    onChange={(e) => handleInputChange("stassPlacementDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="stassEndDate">STASS End Date *</Label>
                  <Input
                    id="stassEndDate"
                    type="date"
                    value={formData.stassEndDate}
                    onChange={(e) => handleInputChange("stassEndDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="currentFosterHome">Current STASS Foster Home</Label>
                  <Input
                    id="currentFosterHome"
                    value={formData.currentFosterHome}
                    onChange={(e) => handleInputChange("currentFosterHome", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="assessmentCompletionDate">Assessment Completion Date</Label>
                  <Input
                    id="assessmentCompletionDate"
                    type="date"
                    value={formData.assessmentCompletionDate}
                    onChange={(e) => handleInputChange("assessmentCompletionDate", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="recommendedPackage">Recommended Service Package *</Label>
                <Select
                  value={formData.recommendedPackage}
                  onValueChange={(value) => handleInputChange("recommendedPackage", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recommended package from assessment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">T3C Basic Foster Family Home</SelectItem>
                    <SelectItem value="mental-behavioral">Mental & Behavioral Health Support Services</SelectItem>
                    <SelectItem value="idd-autism">IDD/Autism Spectrum Disorder Support Services</SelectItem>
                    <SelectItem value="substance-use">Substance Use Support Services</SelectItem>
                    <SelectItem value="tffc">T3C Treatment Foster Family Care</SelectItem>
                    <SelectItem value="permanency">Permanency (Reunification/Adoption)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="primaryDiagnoses">Primary Diagnoses/Findings</Label>
                <Textarea
                  id="primaryDiagnoses"
                  value={formData.primaryDiagnoses}
                  onChange={(e) => handleInputChange("primaryDiagnoses", e.target.value)}
                  placeholder="List primary diagnoses and key findings from assessment..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="keyFindings">Key Assessment Findings Summary</Label>
                <Textarea
                  id="keyFindings"
                  value={formData.keyFindings}
                  onChange={(e) => handleInputChange("keyFindings", e.target.value)}
                  placeholder="Summarize key findings that informed package recommendation..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Transition Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Transition Destination
              </CardTitle>
              <CardDescription>
                Where will the child transition after STASS?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={formData.transitionType}
                onValueChange={(value) => handleInputChange("transitionType", value)}
                className="space-y-3"
              >
                <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="same-home" id="same-home" className="mt-1" />
                  <div>
                    <Label htmlFor="same-home" className="font-medium cursor-pointer">
                      Same Foster Home - Continue with New Package
                    </Label>
                    <p className="text-sm text-gray-600">
                      Child remains in current STASS foster home, transitions to recommended package
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="different-home" id="different-home" className="mt-1" />
                  <div>
                    <Label htmlFor="different-home" className="font-medium cursor-pointer">
                      Different Foster Home
                    </Label>
                    <p className="text-sm text-gray-600">
                      Child transitions to a different foster home with appropriate credentials
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="permanency" id="permanency" className="mt-1" />
                  <div>
                    <Label htmlFor="permanency" className="font-medium cursor-pointer">
                      Permanency Placement
                    </Label>
                    <p className="text-sm text-gray-600">
                      Child transitions to reunification, adoption, or other permanency option
                    </p>
                  </div>
                </div>
              </RadioGroup>

              {/* Same Home Verification */}
              {formData.transitionType === 'same-home' && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
                  <h4 className="font-medium text-blue-800">Same Home Verification</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fosterHomeAgreesToContinue"
                        checked={formData.fosterHomeAgreesToContinue}
                        onCheckedChange={(checked) => handleInputChange("fosterHomeAgreesToContinue", checked)}
                      />
                      <Label htmlFor="fosterHomeAgreesToContinue">
                        Foster home agrees to continue placement
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="homeHasRequiredCredential"
                        checked={formData.homeHasRequiredCredential}
                        onCheckedChange={(checked) => handleInputChange("homeHasRequiredCredential", checked)}
                      />
                      <Label htmlFor="homeHasRequiredCredential">
                        Home has required credential for {packageLabels[formData.recommendedPackage] || 'recommended package'}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="capacityAvailable"
                        checked={formData.capacityAvailable}
                        onCheckedChange={(checked) => handleInputChange("capacityAvailable", checked)}
                      />
                      <Label htmlFor="capacityAvailable">
                        Capacity available per package requirements
                      </Label>
                    </div>
                  </div>
                  
                  {formData.recommendedPackage === 'tffc' && (
                    <div className="p-2 bg-purple-100 rounded text-purple-800 text-sm mt-2">
                      <strong>TFFC Note:</strong> Home must have BOTH Treatment Foster Care AND Basic credentials. 
                      Maximum 2 TFFC children per home.
                    </div>
                  )}
                </div>
              )}

              {/* Different Home Details */}
              {formData.transitionType === 'different-home' && (
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 space-y-4">
                  <h4 className="font-medium text-amber-800">Receiving Foster Home Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Foster Parent Name(s) *</Label>
                      <Input
                        value={formData.newFosterParentNames}
                        onChange={(e) => handleInputChange("newFosterParentNames", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Phone *</Label>
                      <Input
                        value={formData.newFosterParentPhone}
                        onChange={(e) => handleInputChange("newFosterParentPhone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={formData.newFosterParentEmail}
                        onChange={(e) => handleInputChange("newFosterParentEmail", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Input
                        value={formData.newFosterHomeAddress}
                        onChange={(e) => handleInputChange("newFosterHomeAddress", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="receivingHomeCredentialVerified"
                      checked={formData.receivingHomeCredentialVerified}
                      onCheckedChange={(checked) => handleInputChange("receivingHomeCredentialVerified", checked)}
                    />
                    <Label htmlFor="receivingHomeCredentialVerified">
                      Credential verified for {packageLabels[formData.recommendedPackage] || 'recommended package'}
                    </Label>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="transitionDate">Planned Transition Date *</Label>
                <Input
                  id="transitionDate"
                  type="date"
                  value={formData.transitionDate}
                  onChange={(e) => handleInputChange("transitionDate", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Transition Preparation Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Transition Preparation Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Child Preparation */}
              <div>
                <h4 className="font-medium mb-3">Child Preparation</h4>
                <div className="flex items-start space-x-2 mb-2">
                  <Checkbox
                    id="childPrepared"
                    checked={formData.childPrepared}
                    onCheckedChange={(checked) => handleInputChange("childPrepared", checked)}
                  />
                  <Label htmlFor="childPrepared">Child has been prepared for transition</Label>
                </div>
                <Textarea
                  value={formData.childPreparationNotes}
                  onChange={(e) => handleInputChange("childPreparationNotes", e.target.value)}
                  placeholder="Document how child was prepared, reactions, concerns addressed..."
                  rows={2}
                  className="ml-6"
                />
              </div>

              {/* Foster Parent Orientation */}
              {formData.transitionType === 'different-home' && (
                <div>
                  <h4 className="font-medium mb-3">Receiving Foster Parent Orientation</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="fosterParentOrientation"
                      checked={formData.fosterParentOrientation}
                      onCheckedChange={(checked) => handleInputChange("fosterParentOrientation", checked)}
                    />
                    <Label htmlFor="fosterParentOrientation">Foster parents oriented on child's needs</Label>
                  </div>
                  <div className="ml-6">
                    <Label className="text-sm">Orientation Date</Label>
                    <Input
                      type="date"
                      value={formData.fosterParentOrientationDate}
                      onChange={(e) => handleInputChange("fosterParentOrientationDate", e.target.value)}
                      className="w-48"
                    />
                  </div>
                </div>
              )}

              {/* Records & Notifications */}
              <div>
                <h4 className="font-medium mb-3">Records & Notifications</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="recordsTransferred"
                      checked={formData.recordsTransferred}
                      onCheckedChange={(checked) => handleInputChange("recordsTransferred", checked)}
                    />
                    <Label htmlFor="recordsTransferred">Records transferred/shared</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="medicationsTransferred"
                      checked={formData.medicationsTransferred}
                      onCheckedChange={(checked) => handleInputChange("medicationsTransferred", checked)}
                    />
                    <Label htmlFor="medicationsTransferred">Medications transferred</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="schoolNotified"
                      checked={formData.schoolNotified}
                      onCheckedChange={(checked) => handleInputChange("schoolNotified", checked)}
                    />
                    <Label htmlFor="schoolNotified">School notified</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="therapistNotified"
                      checked={formData.therapistNotified}
                      onCheckedChange={(checked) => handleInputChange("therapistNotified", checked)}
                    />
                    <Label htmlFor="therapistNotified">Therapist notified</Label>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <Checkbox
                    id="dfpsNotified"
                    checked={formData.dfpsNotified}
                    onCheckedChange={(checked) => handleInputChange("dfpsNotified", checked)}
                  />
                  <Label htmlFor="dfpsNotified">DFPS/SSCC notified of transition</Label>
                  <Input
                    type="date"
                    value={formData.dfpsNotificationDate}
                    onChange={(e) => handleInputChange("dfpsNotificationDate", e.target.value)}
                    className="w-40 ml-2"
                    placeholder="Date"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Continuity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Service Continuity Planning
              </CardTitle>
              <CardDescription>
                Ensure continuity of therapeutic and specialized services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="therapyArranged"
                      checked={formData.therapyArranged}
                      onCheckedChange={(checked) => handleInputChange("therapyArranged", checked)}
                    />
                    <Label htmlFor="therapyArranged">Individual therapy arranged</Label>
                  </div>
                  <Input
                    value={formData.therapistName}
                    onChange={(e) => handleInputChange("therapistName", e.target.value)}
                    placeholder="Therapist name"
                    className="ml-6"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="psychiatricFollowUp"
                      checked={formData.psychiatricFollowUp}
                      onCheckedChange={(checked) => handleInputChange("psychiatricFollowUp", checked)}
                    />
                    <Label htmlFor="psychiatricFollowUp">Psychiatric follow-up arranged</Label>
                  </div>
                  <Input
                    value={formData.psychiatristName}
                    onChange={(e) => handleInputChange("psychiatristName", e.target.value)}
                    placeholder="Psychiatrist name"
                    className="ml-6"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="medicalFollowUp"
                  checked={formData.medicalFollowUp}
                  onCheckedChange={(checked) => handleInputChange("medicalFollowUp", checked)}
                />
                <Label htmlFor="medicalFollowUp">Medical follow-up appointments scheduled</Label>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="specializedServicesArranged"
                    checked={formData.specializedServicesArranged}
                    onCheckedChange={(checked) => handleInputChange("specializedServicesArranged", checked)}
                  />
                  <Label htmlFor="specializedServicesArranged">Specialized services arranged</Label>
                </div>
                <Textarea
                  value={formData.specializedServicesDetails}
                  onChange={(e) => handleInputChange("specializedServicesDetails", e.target.value)}
                  placeholder="List specialized services (BSS, OT, PT, speech therapy, etc.) and providers..."
                  rows={2}
                  className="ml-6"
                />
              </div>
            </CardContent>
          </Card>

          {/* Transition Meeting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Transition Meeting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Transition Meeting Date</Label>
                  <Input
                    type="date"
                    value={formData.transitionMeetingDate}
                    onChange={(e) => handleInputChange("transitionMeetingDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Attendees</Label>
                  <Input
                    value={formData.transitionMeetingAttendees}
                    onChange={(e) => handleInputChange("transitionMeetingAttendees", e.target.value)}
                    placeholder="List meeting attendees"
                  />
                </div>
              </div>
              <div>
                <Label>Meeting Notes</Label>
                <Textarea
                  value={formData.transitionMeetingNotes}
                  onChange={(e) => handleInputChange("transitionMeetingNotes", e.target.value)}
                  placeholder="Document key discussions, decisions, and action items..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Signatures */}
          <Card>
            <CardHeader>
              <CardTitle>Signatures & Approval</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Case Manager Signature *</Label>
                  <Input
                    value={formData.caseManagerSignature}
                    onChange={(e) => handleInputChange("caseManagerSignature", e.target.value)}
                    placeholder="Type name to sign"
                  />
                </div>
                <div>
                  <Label>Supervisor Signature *</Label>
                  <Input
                    value={formData.supervisorSignature}
                    onChange={(e) => handleInputChange("supervisorSignature", e.target.value)}
                    placeholder="Type name to sign"
                  />
                </div>
                <div>
                  <Label>Receiving Case Manager (if different)</Label>
                  <Input
                    value={formData.receivingCaseManagerSignature}
                    onChange={(e) => handleInputChange("receivingCaseManagerSignature", e.target.value)}
                    placeholder="Type name to sign"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Link href="/forms/stass-assessment-progress">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Assessment Progress
              </Button>
            </Link>
            <div className="flex gap-3">
              <Button variant="outline">Save Draft</Button>
              <Button className="bg-green-700 hover:bg-green-800">
                Complete Transition Plan
              </Button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>STASS Transition Planning:</strong> This form coordinates the transition from Short-Term 
            Assessment Support Services to an ongoing T3C service package or permanency placement. Complete 
            this form before the STASS placement ends to ensure smooth transition and service continuity.
          </p>
          <p className="text-xs text-gray-500 mt-2">Last Updated: December 11, 2025</p>
        </div>
      </div>
    </div>
  )
}

