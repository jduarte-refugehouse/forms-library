"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Heart, TrendingUp, CheckCircle2, AlertTriangle, Calendar, Users, Target, Activity, Award, Shield, Clock } from "lucide-react"
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

export default function RecoveryProgressTrackerPage() {
  const [formData, setFormData] = useState({
    // Child Information
    childName: "",
    caseNumber: "",
    dateOfBirth: "",
    placementDate: "",
    currentFosterHome: "",
    caseManager: "",
    // Treatment Information
    primarySubstance: "",
    secondarySubstances: "",
    treatmentStartDate: "",
    currentTreatmentProvider: "",
    therapistName: "",
    therapyFrequency: "",
    // MAT Information
    onMAT: false,
    matMedication: "",
    matProvider: "",
    matStartDate: "",
    matCompliance: "",
    // Current Status
    currentRecoveryStatus: "",
    daysSober: "",
    sobrietyStartDate: "",
    // Recovery Milestones
    milestone30Days: false,
    milestone30DaysDate: "",
    milestone60Days: false,
    milestone60DaysDate: "",
    milestone90Days: false,
    milestone90DaysDate: "",
    milestone6Months: false,
    milestone6MonthsDate: "",
    milestone1Year: false,
    milestone1YearDate: "",
    // Treatment Engagement
    therapyAttendance: "",
    groupParticipation: "",
    recoveryMeetings: "",
    sponsorMentor: false,
    sponsorMentorDetails: "",
    // Recovery Indicators
    copingSkillsDevelopment: false,
    copingSkillsDetails: "",
    triggerIdentification: false,
    triggerDetails: "",
    healthyRelationships: false,
    relationshipDetails: "",
    schoolWorkEngagement: false,
    schoolWorkDetails: "",
    familyReconciliation: false,
    familyDetails: "",
    communityInvolvement: false,
    communityDetails: "",
    // Relapse History
    relapseCount: "0",
    mostRecentRelapseDate: "",
    relapseCircumstances: "",
    relapseResponse: "",
    lessonsLearned: "",
    // Support System
    familySupport: "",
    peerSupport: "",
    professionalSupport: "",
    communityResources: "",
    // Goals
    shortTermGoals: "",
    longTermGoals: "",
    barriers: "",
    // Notes
    progressNotes: "",
    concernsFlags: "",
    nextSteps: "",
    // Review
    reviewDate: "",
    reviewedBy: "",
    nextReviewDate: "",
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Calculate days sober
  const calculateDaysSober = () => {
    if (!formData.sobrietyStartDate) return 0
    const start = new Date(formData.sobrietyStartDate)
    const today = new Date()
    return Math.max(0, Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
  }

  const daysSober = calculateDaysSober()

  // Count recovery indicators
  const indicators = [
    'copingSkillsDevelopment', 'triggerIdentification', 'healthyRelationships',
    'schoolWorkEngagement', 'familyReconciliation', 'communityInvolvement'
  ]
  const completedIndicators = indicators.filter(i => formData[i as keyof typeof formData]).length

  // Count milestones
  const milestones = [
    { key: 'milestone30Days', days: 30, label: '30 Days' },
    { key: 'milestone60Days', days: 60, label: '60 Days' },
    { key: 'milestone90Days', days: 90, label: '90 Days' },
    { key: 'milestone6Months', days: 180, label: '6 Months' },
    { key: 'milestone1Year', days: 365, label: '1 Year' },
  ]
  const completedMilestones = milestones.filter(m => formData[m.key as keyof typeof formData]).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
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
              <h1 className="text-4xl font-bold mb-2">Recovery Progress Tracker</h1>
              <p className="text-xl text-amber-100">Substance Use Support Services</p>
              <Badge className="mt-2 bg-amber-700 text-white border-amber-500">
                <Heart className="h-3 w-3 mr-1" />
                Recovery-Focused • Non-Punitive
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Recovery Philosophy Banner */}
        <Card className="mb-6 border-l-4 border-amber-500 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-800">Recovery-Focused Approach</h3>
                <p className="text-amber-700 text-sm mt-1">
                  Per FC-SU-01: All documentation uses non-punitive, recovery-focused language. 
                  Relapse is viewed as part of the recovery journey, not failure. Focus on 
                  strengths, progress, and building resilience.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Child Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Youth Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Name *</Label>
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
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  />
                </div>
                <div>
                  <Label>SU Package Placement Date</Label>
                  <Input
                    type="date"
                    value={formData.placementDate}
                    onChange={(e) => handleInputChange("placementDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Current Foster Home</Label>
                  <Input
                    value={formData.currentFosterHome}
                    onChange={(e) => handleInputChange("currentFosterHome", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Sobriety Counter */}
            <Card className="border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-700">
                  <Award className="h-5 w-5" />
                  Sobriety Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-6xl font-bold text-amber-600">
                    {daysSober}
                  </div>
                  <div className="text-sm text-amber-700">days of sobriety</div>
                </div>

                <div>
                  <Label>Sobriety Start Date</Label>
                  <Input
                    type="date"
                    value={formData.sobrietyStartDate}
                    onChange={(e) => handleInputChange("sobrietyStartDate", e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <Label>Current Recovery Status</Label>
                  <Select
                    value={formData.currentRecoveryStatus}
                    onValueChange={(value) => handleInputChange("currentRecoveryStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stable">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          Stable Recovery
                        </span>
                      </SelectItem>
                      <SelectItem value="early">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          Early Recovery
                        </span>
                      </SelectItem>
                      <SelectItem value="challenges">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                          Facing Challenges
                        </span>
                      </SelectItem>
                      <SelectItem value="re-engaged">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          Re-Engaged After Setback
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Recovery Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {milestones.map((milestone) => (
                    <div 
                      key={milestone.key}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        formData[milestone.key as keyof typeof formData]
                          ? 'bg-green-50 border-green-200'
                          : daysSober >= milestone.days
                            ? 'bg-amber-50 border-amber-200'
                            : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={milestone.key}
                          checked={formData[milestone.key as keyof typeof formData] as boolean}
                          onCheckedChange={(checked) => handleInputChange(milestone.key, checked)}
                        />
                        <Label htmlFor={milestone.key} className="cursor-pointer">
                          {milestone.label}
                        </Label>
                      </div>
                      {formData[milestone.key as keyof typeof formData] && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <div className="text-2xl font-bold text-amber-600">{completedMilestones}/{milestones.length}</div>
                  <div className="text-sm text-gray-600">milestones achieved</div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Progress Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Recovery Indicators</span>
                      <span className="font-medium">{completedIndicators}/6</span>
                    </div>
                    <Progress value={(completedIndicators / 6) * 100} className="h-3 [&>div]:bg-amber-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Milestones</span>
                      <span className="font-medium">{completedMilestones}/5</span>
                    </div>
                    <Progress value={(completedMilestones / 5) * 100} className="h-3 [&>div]:bg-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Treatment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Treatment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Primary Substance of Concern</Label>
                    <Select
                      value={formData.primarySubstance}
                      onValueChange={(value) => handleInputChange("primarySubstance", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select substance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alcohol">Alcohol</SelectItem>
                        <SelectItem value="marijuana">Marijuana/Cannabis</SelectItem>
                        <SelectItem value="opioids">Opioids (heroin, prescription painkillers)</SelectItem>
                        <SelectItem value="stimulants">Stimulants (meth, cocaine)</SelectItem>
                        <SelectItem value="benzodiazepines">Benzodiazepines</SelectItem>
                        <SelectItem value="synthetic">Synthetic drugs (K2, bath salts)</SelectItem>
                        <SelectItem value="polysubstance">Polysubstance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Secondary Substances (if any)</Label>
                    <Input
                      value={formData.secondarySubstances}
                      onChange={(e) => handleInputChange("secondarySubstances", e.target.value)}
                      placeholder="List other substances"
                    />
                  </div>
                  <div>
                    <Label>Treatment Start Date</Label>
                    <Input
                      type="date"
                      value={formData.treatmentStartDate}
                      onChange={(e) => handleInputChange("treatmentStartDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Treatment Provider</Label>
                    <Input
                      value={formData.currentTreatmentProvider}
                      onChange={(e) => handleInputChange("currentTreatmentProvider", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Therapist Name</Label>
                    <Input
                      value={formData.therapistName}
                      onChange={(e) => handleInputChange("therapistName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Therapy Frequency</Label>
                    <Select
                      value={formData.therapyFrequency}
                      onValueChange={(value) => handleInputChange("therapyFrequency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="multiple-weekly">Multiple times per week</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* MAT Section */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox
                      id="onMAT"
                      checked={formData.onMAT}
                      onCheckedChange={(checked) => handleInputChange("onMAT", checked)}
                    />
                    <Label htmlFor="onMAT" className="font-medium text-blue-800">
                      Youth is on Medication-Assisted Treatment (MAT)
                    </Label>
                  </div>

                  {formData.onMAT && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <Label>MAT Medication</Label>
                        <Select
                          value={formData.matMedication}
                          onValueChange={(value) => handleInputChange("matMedication", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select medication" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="suboxone">Suboxone (buprenorphine/naloxone)</SelectItem>
                            <SelectItem value="vivitrol">Vivitrol (naltrexone)</SelectItem>
                            <SelectItem value="methadone">Methadone</SelectItem>
                            <SelectItem value="naltrexone-oral">Naltrexone (oral)</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>MAT Provider</Label>
                        <Input
                          value={formData.matProvider}
                          onChange={(e) => handleInputChange("matProvider", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>MAT Start Date</Label>
                        <Input
                          type="date"
                          value={formData.matStartDate}
                          onChange={(e) => handleInputChange("matStartDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>MAT Compliance</Label>
                        <Select
                          value={formData.matCompliance}
                          onValueChange={(value) => handleInputChange("matCompliance", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select compliance level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fully-compliant">Fully Compliant</SelectItem>
                            <SelectItem value="mostly-compliant">Mostly Compliant</SelectItem>
                            <SelectItem value="some-concerns">Some Concerns</SelectItem>
                            <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Treatment Engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Treatment Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Individual Therapy Attendance</Label>
                    <Select
                      value={formData.therapyAttendance}
                      onValueChange={(value) => handleInputChange("therapyAttendance", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent (90%+)</SelectItem>
                        <SelectItem value="good">Good (75-89%)</SelectItem>
                        <SelectItem value="fair">Fair (50-74%)</SelectItem>
                        <SelectItem value="poor">Poor (&lt;50%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Group Participation</Label>
                    <Select
                      value={formData.groupParticipation}
                      onValueChange={(value) => handleInputChange("groupParticipation", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active Participant</SelectItem>
                        <SelectItem value="engaged">Engaged</SelectItem>
                        <SelectItem value="passive">Passive</SelectItem>
                        <SelectItem value="resistant">Resistant</SelectItem>
                        <SelectItem value="na">Not Applicable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Recovery Meetings (AA/NA)</Label>
                    <Select
                      value={formData.recoveryMeetings}
                      onValueChange={(value) => handleInputChange("recoveryMeetings", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular Attendance</SelectItem>
                        <SelectItem value="occasional">Occasional</SelectItem>
                        <SelectItem value="rarely">Rarely</SelectItem>
                        <SelectItem value="not-attending">Not Attending</SelectItem>
                        <SelectItem value="na">Not Age Appropriate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="sponsorMentor"
                    checked={formData.sponsorMentor}
                    onCheckedChange={(checked) => handleInputChange("sponsorMentor", checked)}
                  />
                  <div>
                    <Label htmlFor="sponsorMentor">Has sponsor/recovery mentor</Label>
                    {formData.sponsorMentor && (
                      <Input
                        value={formData.sponsorMentorDetails}
                        onChange={(e) => handleInputChange("sponsorMentorDetails", e.target.value)}
                        placeholder="Sponsor/mentor details"
                        className="mt-2"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recovery Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Recovery Indicators
                </CardTitle>
                <CardDescription>Track positive progress in recovery journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: 'copingSkillsDevelopment', label: 'Developing healthy coping skills', detailKey: 'copingSkillsDetails' },
                  { key: 'triggerIdentification', label: 'Identifying and managing triggers', detailKey: 'triggerDetails' },
                  { key: 'healthyRelationships', label: 'Building healthy relationships', detailKey: 'relationshipDetails' },
                  { key: 'schoolWorkEngagement', label: 'School/work engagement improving', detailKey: 'schoolWorkDetails' },
                  { key: 'familyReconciliation', label: 'Family relationships improving', detailKey: 'familyDetails' },
                  { key: 'communityInvolvement', label: 'Positive community involvement', detailKey: 'communityDetails' },
                ].map((indicator) => (
                  <div 
                    key={indicator.key}
                    className={`p-3 rounded-lg border ${
                      formData[indicator.key as keyof typeof formData]
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white'
                    }`}
                  >
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
                      placeholder="Provide specific examples..."
                      className="ml-6"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Relapse History */}
            <Card className="border-l-4 border-orange-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Setbacks & Relapses
                </CardTitle>
                <CardDescription>
                  Document in recovery-focused, non-punitive manner per FC-SU-01
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-orange-800 text-sm">
                  <strong>Remember:</strong> Relapse is often part of the recovery journey. 
                  Focus on learning, growth, and re-engagement rather than punishment.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Number of Relapses During Treatment</Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.relapseCount}
                      onChange={(e) => handleInputChange("relapseCount", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Most Recent Relapse Date (if any)</Label>
                    <Input
                      type="date"
                      value={formData.mostRecentRelapseDate}
                      onChange={(e) => handleInputChange("mostRecentRelapseDate", e.target.value)}
                    />
                  </div>
                </div>

                {parseInt(formData.relapseCount) > 0 && (
                  <div className="space-y-4">
                    <div>
                      <Label>Circumstances (use non-judgmental language)</Label>
                      <Textarea
                        value={formData.relapseCircumstances}
                        onChange={(e) => handleInputChange("relapseCircumstances", e.target.value)}
                        placeholder="What circumstances contributed to the relapse?"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Treatment Response</Label>
                      <Textarea
                        value={formData.relapseResponse}
                        onChange={(e) => handleInputChange("relapseResponse", e.target.value)}
                        placeholder="How did the treatment team respond? How was youth re-engaged?"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label>Lessons Learned & Plan Adjustments</Label>
                      <Textarea
                        value={formData.lessonsLearned}
                        onChange={(e) => handleInputChange("lessonsLearned", e.target.value)}
                        placeholder="What was learned? How was the treatment plan adjusted?"
                        rows={2}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Goals & Progress Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Goals & Progress Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Short-Term Recovery Goals (next 30-90 days)</Label>
                  <Textarea
                    value={formData.shortTermGoals}
                    onChange={(e) => handleInputChange("shortTermGoals", e.target.value)}
                    placeholder="List specific, achievable goals..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Long-Term Recovery Goals</Label>
                  <Textarea
                    value={formData.longTermGoals}
                    onChange={(e) => handleInputChange("longTermGoals", e.target.value)}
                    placeholder="Describe long-term recovery vision..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Current Barriers to Progress</Label>
                  <Textarea
                    value={formData.barriers}
                    onChange={(e) => handleInputChange("barriers", e.target.value)}
                    placeholder="Identify current barriers and plans to address them..."
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Progress Notes</Label>
                  <Textarea
                    value={formData.progressNotes}
                    onChange={(e) => handleInputChange("progressNotes", e.target.value)}
                    placeholder="Document recent progress, achievements, and observations..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Concerns or Flags</Label>
                  <Textarea
                    value={formData.concernsFlags}
                    onChange={(e) => handleInputChange("concernsFlags", e.target.value)}
                    placeholder="Note any concerns requiring attention..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Review Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Review Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Review Date</Label>
                    <Input
                      type="date"
                      value={formData.reviewDate}
                      onChange={(e) => handleInputChange("reviewDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Reviewed By</Label>
                    <Input
                      value={formData.reviewedBy}
                      onChange={(e) => handleInputChange("reviewedBy", e.target.value)}
                      placeholder="Name and title"
                    />
                  </div>
                  <div>
                    <Label>Next Review Date</Label>
                    <Input
                      type="date"
                      value={formData.nextReviewDate}
                      onChange={(e) => handleInputChange("nextReviewDate", e.target.value)}
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
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Save Progress Update
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Recovery Progress Tracker:</strong> This form tracks recovery milestones, treatment 
            engagement, and progress for youth receiving Substance Use Support Services. Per FC-SU-01, 
            all documentation uses non-punitive, recovery-focused language. Relapse is viewed as part of 
            the recovery journey, not as failure.
          </p>
          <p className="text-xs text-gray-500 mt-2">Last Updated: December 11, 2025</p>
        </div>
      </div>
    </div>
  )
}

