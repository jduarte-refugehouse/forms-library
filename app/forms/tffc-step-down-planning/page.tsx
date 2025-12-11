"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowDown, Shield, Clock, CheckCircle2, AlertTriangle, TrendingDown, Calendar, Users, Target, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

export default function TFFCStepDownPlanningPage() {
  const [formData, setFormData] = useState({
    // Child Information
    childName: "",
    caseNumber: "",
    tffcPlacementDate: "",
    currentFosterHome: "",
    treatmentDirector: "",
    currentTherapist: "",
    // Timeline
    currentReviewNumber: "",
    daysInPlacement: 0,
    targetStepDownDate: "",
    // Readiness Indicators
    readinessLevel: "",
    crisisReduction: false,
    crisisReductionDetails: "",
    emotionalRegulation: false,
    emotionalRegulationDetails: "",
    medicationStability: false,
    medicationStabilityDetails: "",
    schoolAttendance: false,
    schoolAttendanceDetails: "",
    supervisionReduction: false,
    supervisionReductionDetails: "",
    familyRelationships: false,
    familyRelationshipsDetails: "",
    copingSkills: false,
    copingSkillsDetails: "",
    selfHarmReduction: false,
    selfHarmReductionDetails: "",
    // Barriers
    barrierCrisisFrequency: false,
    barrierBehavioralInstability: false,
    barrierMedicationAdjustments: false,
    barrierPsychiatricSymptoms: false,
    barrierNoPlacement: false,
    barrierFamilyNotReady: false,
    barrierRecentRegression: false,
    barrierOther: false,
    barrierOtherDetails: "",
    // Step-Down Plan
    stepDownDestination: "",
    sameFosterHome: false,
    receivingFosterHome: "",
    receivingPackage: "",
    // Transition Timeline
    phase1StartDate: "",
    phase1Activities: "",
    phase2StartDate: "",
    phase2Activities: "",
    phase3StartDate: "",
    phase3Activities: "",
    // Service Adjustments
    therapyPlan: "",
    psychiatryPlan: "",
    bssPlan: "",
    schoolPlan: "",
    familyPlan: "",
    // Crisis Prevention
    crisisPreventionPlan: "",
    warningSignsToWatch: "",
    escalationProtocol: "",
    // Aftercare
    aftercareTherapist: "",
    aftercareFrequency: "",
    familySupport: "",
    communityResources: "",
    // Signatures
    treatmentDirectorSignature: "",
    treatmentDirectorDate: "",
    programDirectorSignature: "",
    programDirectorDate: "",
    caseManagerSignature: "",
    therapistSignature: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Calculate days in placement and remaining
  const calculateDaysInPlacement = () => {
    if (!formData.tffcPlacementDate) return 0
    const start = new Date(formData.tffcPlacementDate)
    const today = new Date()
    return Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const daysInPlacement = calculateDaysInPlacement()
  const daysRemaining = Math.max(0, 365 - daysInPlacement)
  const progressPercent = Math.min(100, (daysInPlacement / 365) * 100)

  // Count readiness indicators
  const readinessIndicators = [
    'crisisReduction', 'emotionalRegulation', 'medicationStability', 'schoolAttendance',
    'supervisionReduction', 'familyRelationships', 'copingSkills', 'selfHarmReduction'
  ]
  const completedIndicators = readinessIndicators.filter(i => formData[i as keyof typeof formData]).length

  // Count barriers
  const barriers = [
    'barrierCrisisFrequency', 'barrierBehavioralInstability', 'barrierMedicationAdjustments',
    'barrierPsychiatricSymptoms', 'barrierNoPlacement', 'barrierFamilyNotReady', 
    'barrierRecentRegression', 'barrierOther'
  ]
  const activeBarriers = barriers.filter(b => formData[b as keyof typeof formData]).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
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
              <h1 className="text-4xl font-bold mb-2">TFFC Step-Down Planning</h1>
              <p className="text-xl text-purple-200">Treatment Foster Family Care Transition Planning</p>
              <Badge className="mt-2 bg-purple-600 text-white border-purple-400">
                <ArrowDown className="h-3 w-3 mr-1" />
                Step-Down to Less Intensive Services
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 365-Day Warning Banner */}
        {daysRemaining <= 90 && (
          <Card className={`mb-6 border-l-4 ${
            daysRemaining <= 30 ? 'border-red-500 bg-red-50' :
            daysRemaining <= 60 ? 'border-orange-500 bg-orange-50' :
            'border-yellow-500 bg-yellow-50'
          }`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className={`h-6 w-6 ${
                  daysRemaining <= 30 ? 'text-red-600' :
                  daysRemaining <= 60 ? 'text-orange-600' :
                  'text-yellow-600'
                }`} />
                <div>
                  <h3 className={`font-bold ${
                    daysRemaining <= 30 ? 'text-red-800' :
                    daysRemaining <= 60 ? 'text-orange-800' :
                    'text-yellow-800'
                  }`}>
                    {daysRemaining <= 30 ? '⚠️ URGENT: ' : ''}
                    {daysRemaining} Days Remaining Until 365-Day Maximum
                  </h3>
                  <p className={`text-sm mt-1 ${
                    daysRemaining <= 30 ? 'text-red-700' :
                    daysRemaining <= 60 ? 'text-orange-700' :
                    'text-yellow-700'
                  }`}>
                    {daysRemaining <= 30 
                      ? 'Step-down must occur immediately. Finalize transition plan and execute.'
                      : daysRemaining <= 60 
                        ? 'Step-down planning should be prioritized. Transition timeline must be established.'
                        : 'Begin active step-down planning. Identify receiving placement and prepare transition.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Child Info & Timeline */}
          <div className="lg:col-span-1 space-y-6">
            {/* Child Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  TFFC Placement Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Child's Name *</Label>
                  <Input
                    value={formData.childName}
                    onChange={(e) => handleInputChange("childName", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Case Number *</Label>
                  <Input
                    value={formData.caseNumber}
                    onChange={(e) => handleInputChange("caseNumber", e.target.value)}
                  />
                </div>
                <div>
                  <Label>TFFC Placement Date *</Label>
                  <Input
                    type="date"
                    value={formData.tffcPlacementDate}
                    onChange={(e) => handleInputChange("tffcPlacementDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Current Foster Home</Label>
                  <Input
                    value={formData.currentFosterHome}
                    onChange={(e) => handleInputChange("currentFosterHome", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Treatment Director</Label>
                  <Input
                    value={formData.treatmentDirector}
                    onChange={(e) => handleInputChange("treatmentDirector", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Current Therapist</Label>
                  <Input
                    value={formData.currentTherapist}
                    onChange={(e) => handleInputChange("currentTherapist", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* 365-Day Timeline */}
            <Card className="border-2 border-purple-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Clock className="h-5 w-5" />
                  365-Day Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${
                    daysRemaining <= 30 ? 'text-red-600' :
                    daysRemaining <= 60 ? 'text-orange-600' :
                    daysRemaining <= 90 ? 'text-yellow-600' :
                    'text-purple-700'
                  }`}>
                    {daysRemaining}
                  </div>
                  <div className="text-sm text-gray-600">days remaining</div>
                </div>

                <Progress 
                  value={progressPercent}
                  className={`h-4 ${
                    progressPercent >= 90 ? '[&>div]:bg-red-500' :
                    progressPercent >= 80 ? '[&>div]:bg-orange-500' :
                    progressPercent >= 70 ? '[&>div]:bg-yellow-500' :
                    '[&>div]:bg-purple-500'
                  }`}
                />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-purple-100 rounded">
                    <div className="font-bold text-purple-700">Day {daysInPlacement}</div>
                    <div className="text-xs text-purple-600">of 365</div>
                  </div>
                  <div className="text-center p-2 bg-purple-100 rounded">
                    <div className="font-bold text-purple-700">{Math.round(progressPercent)}%</div>
                    <div className="text-xs text-purple-600">complete</div>
                  </div>
                </div>

                <div>
                  <Label>Current Review # (60-day cycle)</Label>
                  <Input
                    type="number"
                    value={formData.currentReviewNumber}
                    onChange={(e) => handleInputChange("currentReviewNumber", e.target.value)}
                    placeholder="e.g., 3"
                  />
                </div>

                <div>
                  <Label>Target Step-Down Date *</Label>
                  <Input
                    type="date"
                    value={formData.targetStepDownDate}
                    onChange={(e) => handleInputChange("targetStepDownDate", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Readiness Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Readiness Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Indicators Met</span>
                      <span className="font-medium">{completedIndicators}/8</span>
                    </div>
                    <Progress value={(completedIndicators / 8) * 100} className="h-3 [&>div]:bg-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Active Barriers</span>
                      <span className={`font-medium ${activeBarriers > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {activeBarriers}
                      </span>
                    </div>
                    <Progress 
                      value={(activeBarriers / 8) * 100} 
                      className={`h-3 ${activeBarriers > 0 ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Step-Down Assessment */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Readiness Level */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Step-Down Readiness Assessment
                </CardTitle>
                <CardDescription>
                  Per T3C Blueprint: Step-down assessment required at EVERY 60-day review
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium">Overall Step-Down Readiness *</Label>
                  <RadioGroup
                    value={formData.readinessLevel}
                    onValueChange={(value) => handleInputChange("readinessLevel", value)}
                    className="mt-2 space-y-2"
                  >
                    <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-200">
                      <RadioGroupItem value="ready" id="ready" />
                      <Label htmlFor="ready" className="font-normal cursor-pointer flex-1">
                        <span className="font-medium text-green-800">Ready for Step-Down</span>
                        <p className="text-sm text-green-700">Recommend immediate transition planning</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <RadioGroupItem value="approaching" id="approaching" />
                      <Label htmlFor="approaching" className="font-normal cursor-pointer flex-1">
                        <span className="font-medium text-yellow-800">Approaching Readiness</span>
                        <p className="text-sm text-yellow-700">Continue 1-2 more 60-day review periods</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <RadioGroupItem value="not-ready" id="not-ready" />
                      <Label htmlFor="not-ready" className="font-normal cursor-pointer flex-1">
                        <span className="font-medium text-orange-800">Not Ready</span>
                        <p className="text-sm text-orange-700">Specific barriers identified - continued TFFC needed</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg border border-red-200">
                      <RadioGroupItem value="regression" id="regression" />
                      <Label htmlFor="regression" className="font-normal cursor-pointer flex-1">
                        <span className="font-medium text-red-800">Regression Noted</span>
                        <p className="text-sm text-red-700">Treatment intensification may be needed</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Readiness Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Step-Down Readiness Indicators
                </CardTitle>
                <CardDescription>Check indicators that are met and provide details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'crisisReduction', label: 'Reduced crisis frequency', detailKey: 'crisisReductionDetails' },
                  { key: 'emotionalRegulation', label: 'Improved emotional regulation', detailKey: 'emotionalRegulationDetails' },
                  { key: 'medicationStability', label: 'Stable medication regimen', detailKey: 'medicationStabilityDetails' },
                  { key: 'schoolAttendance', label: 'Consistent school attendance', detailKey: 'schoolAttendanceDetails' },
                  { key: 'supervisionReduction', label: 'Reduced supervision needs', detailKey: 'supervisionReductionDetails' },
                  { key: 'familyRelationships', label: 'Improved family relationships', detailKey: 'familyRelationshipsDetails' },
                  { key: 'copingSkills', label: 'Coping skills developed', detailKey: 'copingSkillsDetails' },
                  { key: 'selfHarmReduction', label: 'Reduced self-harm (if applicable)', detailKey: 'selfHarmReductionDetails' },
                ].map((indicator) => (
                  <div key={indicator.key} className={`p-3 rounded-lg border ${
                    formData[indicator.key as keyof typeof formData] 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={indicator.key}
                        checked={formData[indicator.key as keyof typeof formData] as boolean}
                        onCheckedChange={(checked) => handleInputChange(indicator.key, checked)}
                      />
                      <Label htmlFor={indicator.key} className="font-medium cursor-pointer">
                        {indicator.label}
                      </Label>
                    </div>
                    <Input
                      value={formData[indicator.detailKey as keyof typeof formData] as string}
                      onChange={(e) => handleInputChange(indicator.detailKey, e.target.value)}
                      placeholder="Provide specific evidence/details..."
                      className="ml-6"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Barriers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Current Barriers to Step-Down
                </CardTitle>
                <CardDescription>Identify barriers preventing step-down</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { key: 'barrierCrisisFrequency', label: 'Ongoing crisis frequency' },
                    { key: 'barrierBehavioralInstability', label: 'Insufficient behavioral stability' },
                    { key: 'barrierMedicationAdjustments', label: 'Medication adjustments in progress' },
                    { key: 'barrierPsychiatricSymptoms', label: 'Active psychiatric symptoms' },
                    { key: 'barrierNoPlacement', label: 'No appropriate placement identified' },
                    { key: 'barrierFamilyNotReady', label: 'Family/permanency not ready' },
                    { key: 'barrierRecentRegression', label: 'Recent regression' },
                  ].map((barrier) => (
                    <div key={barrier.key} className={`flex items-center space-x-2 p-2 rounded ${
                      formData[barrier.key as keyof typeof formData] ? 'bg-red-50' : ''
                    }`}>
                      <Checkbox
                        id={barrier.key}
                        checked={formData[barrier.key as keyof typeof formData] as boolean}
                        onCheckedChange={(checked) => handleInputChange(barrier.key, checked)}
                      />
                      <Label htmlFor={barrier.key} className="font-normal cursor-pointer text-sm">
                        {barrier.label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="barrierOther"
                      checked={formData.barrierOther}
                      onCheckedChange={(checked) => handleInputChange("barrierOther", checked)}
                    />
                    <Label htmlFor="barrierOther">Other barrier</Label>
                  </div>
                  {formData.barrierOther && (
                    <Textarea
                      value={formData.barrierOtherDetails}
                      onChange={(e) => handleInputChange("barrierOtherDetails", e.target.value)}
                      placeholder="Describe other barrier..."
                      rows={2}
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Step-Down Destination */}
            <Card className="border-l-4 border-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDown className="h-5 w-5" />
                  Step-Down Destination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-medium">Recommended Step-Down Destination *</Label>
                  <RadioGroup
                    value={formData.stepDownDestination}
                    onValueChange={(value) => handleInputChange("stepDownDestination", value)}
                    className="mt-2 space-y-2"
                  >
                    <div className="flex items-center space-x-2 p-2 border rounded">
                      <RadioGroupItem value="same-home-basic" id="same-home-basic" />
                      <Label htmlFor="same-home-basic" className="font-normal cursor-pointer">
                        Same foster home → Basic Package (if dually credentialed)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded">
                      <RadioGroupItem value="different-home-basic" id="different-home-basic" />
                      <Label htmlFor="different-home-basic" className="font-normal cursor-pointer">
                        Different foster home → Basic Package
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded">
                      <RadioGroupItem value="different-specialized" id="different-specialized" />
                      <Label htmlFor="different-specialized" className="font-normal cursor-pointer">
                        Different foster home → Other specialized package
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded">
                      <RadioGroupItem value="permanency" id="permanency" />
                      <Label htmlFor="permanency" className="font-normal cursor-pointer">
                        Permanency placement (reunification, adoption, etc.)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 border rounded">
                      <RadioGroupItem value="not-appropriate" id="not-appropriate" />
                      <Label htmlFor="not-appropriate" className="font-normal cursor-pointer">
                        Step-down not appropriate at this time
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.stepDownDestination && formData.stepDownDestination !== 'not-appropriate' && (
                  <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
                    {formData.stepDownDestination.includes('same-home') && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sameFosterHome"
                          checked={formData.sameFosterHome}
                          onCheckedChange={(checked) => handleInputChange("sameFosterHome", checked)}
                        />
                        <Label htmlFor="sameFosterHome">
                          Current foster home has Basic credential (required for same-home step-down)
                        </Label>
                      </div>
                    )}

                    {formData.stepDownDestination.includes('different') && (
                      <div className="space-y-3">
                        <div>
                          <Label>Receiving Foster Home</Label>
                          <Input
                            value={formData.receivingFosterHome}
                            onChange={(e) => handleInputChange("receivingFosterHome", e.target.value)}
                            placeholder="Foster family name"
                          />
                        </div>
                        <div>
                          <Label>Receiving Package</Label>
                          <Select
                            value={formData.receivingPackage}
                            onValueChange={(value) => handleInputChange("receivingPackage", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select package" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">T3C Basic Foster Family Home</SelectItem>
                              <SelectItem value="mental-behavioral">Mental & Behavioral Health</SelectItem>
                              <SelectItem value="idd-autism">IDD/Autism Spectrum Disorder</SelectItem>
                              <SelectItem value="substance-use">Substance Use Support Services</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Transition Timeline */}
            {formData.stepDownDestination && formData.stepDownDestination !== 'not-appropriate' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Transition Timeline
                  </CardTitle>
                  <CardDescription>Plan the phased step-down process</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Phase 1 */}
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-medium text-blue-800 mb-3">Phase 1: Preparation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={formData.phase1StartDate}
                          onChange={(e) => handleInputChange("phase1StartDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Activities</Label>
                        <Textarea
                          value={formData.phase1Activities}
                          onChange={(e) => handleInputChange("phase1Activities", e.target.value)}
                          placeholder="e.g., Begin visit schedule with receiving home, reduce therapy frequency..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phase 2 */}
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-medium text-green-800 mb-3">Phase 2: Transition</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={formData.phase2StartDate}
                          onChange={(e) => handleInputChange("phase2StartDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Activities</Label>
                        <Textarea
                          value={formData.phase2Activities}
                          onChange={(e) => handleInputChange("phase2Activities", e.target.value)}
                          placeholder="e.g., Overnight visits, service handoff meetings..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phase 3 */}
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-medium text-purple-800 mb-3">Phase 3: Completion</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Placement Date</Label>
                        <Input
                          type="date"
                          value={formData.phase3StartDate}
                          onChange={(e) => handleInputChange("phase3StartDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Activities</Label>
                        <Textarea
                          value={formData.phase3Activities}
                          onChange={(e) => handleInputChange("phase3Activities", e.target.value)}
                          placeholder="e.g., Move to new placement, aftercare begins..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Crisis Prevention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Crisis Prevention & Aftercare Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Crisis Prevention Plan</Label>
                  <Textarea
                    value={formData.crisisPreventionPlan}
                    onChange={(e) => handleInputChange("crisisPreventionPlan", e.target.value)}
                    placeholder="Document strategies to prevent crisis during and after transition..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Warning Signs to Watch</Label>
                  <Textarea
                    value={formData.warningSignsToWatch}
                    onChange={(e) => handleInputChange("warningSignsToWatch", e.target.value)}
                    placeholder="List early warning signs that may indicate need for re-escalation..."
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Aftercare Therapist</Label>
                    <Input
                      value={formData.aftercareTherapist}
                      onChange={(e) => handleInputChange("aftercareTherapist", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Aftercare Frequency</Label>
                    <Input
                      value={formData.aftercareFrequency}
                      onChange={(e) => handleInputChange("aftercareFrequency", e.target.value)}
                      placeholder="e.g., Weekly for 2 months, then monthly"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Signatures */}
            <Card>
              <CardHeader>
                <CardTitle>Required Signatures</CardTitle>
                <CardDescription>
                  Treatment Director and Program Director approval required for step-down
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Treatment Director Signature *</Label>
                    <Input
                      value={formData.treatmentDirectorSignature}
                      onChange={(e) => handleInputChange("treatmentDirectorSignature", e.target.value)}
                      placeholder="Type name to sign"
                    />
                    <Input
                      type="date"
                      value={formData.treatmentDirectorDate}
                      onChange={(e) => handleInputChange("treatmentDirectorDate", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Program Director Signature *</Label>
                    <Input
                      value={formData.programDirectorSignature}
                      onChange={(e) => handleInputChange("programDirectorSignature", e.target.value)}
                      placeholder="Type name to sign"
                    />
                    <Input
                      type="date"
                      value={formData.programDirectorDate}
                      onChange={(e) => handleInputChange("programDirectorDate", e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Case Manager Signature</Label>
                    <Input
                      value={formData.caseManagerSignature}
                      onChange={(e) => handleInputChange("caseManagerSignature", e.target.value)}
                      placeholder="Type name to sign"
                    />
                  </div>
                  <div>
                    <Label>Therapist Signature</Label>
                    <Input
                      value={formData.therapistSignature}
                      onChange={(e) => handleInputChange("therapistSignature", e.target.value)}
                      placeholder="Type name to sign"
                    />
                  </div>
                </div>
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
                <Button className="bg-purple-700 hover:bg-purple-800">
                  Submit Step-Down Plan
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>TFFC Step-Down Planning:</strong> Per T3C Blueprint, Treatment Foster Family Care has a 
            365-day maximum placement period. Step-down assessment is required at every 60-day review. This 
            form documents readiness indicators, barriers, and the transition plan for stepping down to less 
            intensive services.
          </p>
          <p className="text-xs text-gray-500 mt-2">Last Updated: December 11, 2025</p>
        </div>
      </div>
    </div>
  )
}

