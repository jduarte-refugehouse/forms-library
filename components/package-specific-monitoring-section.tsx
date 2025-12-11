"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Brain,
  Heart,
  Activity,
  Download,
  Mail,
  Plus,
  Trash2,
  Edit,
  Eye,
  Phone,
  Target,
  Shield,
  FileText,
  XCircle,
  ArrowDown,
  Sparkles,
} from "lucide-react"

interface PackageSpecificMonitoringSectionProps {
  childData: {
    id: string
    name: string
    age: number
    servicePackage: string
    placementDate: string
    caseWorker: string
  }
  packageType: string
  sectionData: {
    packageType: string
    lastUpdated: string
    data: any
  }
  onUpdate: (data: any) => void
  onValidationChange: (isValid: boolean) => void
  viewMode?: "edit" | "view"
}

export function PackageSpecificMonitoringSection({
  childData,
  packageType,
  sectionData,
  onUpdate,
  onValidationChange,
  viewMode = "edit",
}: PackageSpecificMonitoringSectionProps) {
  const [formData, setFormData] = useState({
    therapyAttendance: Array(12).fill(false),
    missedSessions: 0,
    therapistNotes: "",
    progressRating: 3,
    crisisIncidents: [],
    medications: [],
    supportCalls: [],
    therapySchedule: {},
    iepMeetings: [],
    behaviorData: [],
    skillDevelopment: {},
    ...sectionData.data,
  })

  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate(formData)
      setLastSaved(new Date())
    }, 2000)

    return () => clearTimeout(timer)
  }, [formData, onUpdate])

  const handleInputChange = (field: string, value: any) => {
    if (viewMode === "view") return

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addCrisisIncident = () => {
    if (viewMode === "view") return

    const newIncident = {
      id: Date.now(),
      date: "",
      duration: "",
      intervention: "",
      outcome: "",
      safetyPlanActivated: false,
      hospitalizationPrevented: false,
    }

    setFormData((prev) => ({
      ...prev,
      crisisIncidents: [...prev.crisisIncidents, newIncident],
    }))
  }

  const removeCrisisIncident = (id: number) => {
    if (viewMode === "view") return

    setFormData((prev) => ({
      ...prev,
      crisisIncidents: prev.crisisIncidents.filter((incident: any) => incident.id !== id),
    }))
  }

  const calculateAttendanceRate = () => {
    const attended = formData.therapyAttendance.filter(Boolean).length
    return Math.round((attended / formData.therapyAttendance.length) * 100)
  }

  const renderMentalBehavioralDashboard = () => (
    <Tabs defaultValue="therapy" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="therapy">Therapy Tracker</TabsTrigger>
        <TabsTrigger value="crisis">Crisis Management</TabsTrigger>
        <TabsTrigger value="medication">Medication</TabsTrigger>
        <TabsTrigger value="support">24/7 Support</TabsTrigger>
      </TabsList>

      <TabsContent value="therapy" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Weekly Therapy Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Attendance Rate</span>
                <Badge variant={calculateAttendanceRate() >= 80 ? "default" : "destructive"}>
                  {calculateAttendanceRate()}%
                </Badge>
              </div>
              <Progress value={calculateAttendanceRate()} className="w-full" />

              <div className="grid grid-cols-6 gap-2 mt-4">
                {formData.therapyAttendance.map((attended: boolean, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`week-${index + 1}`}
                      checked={attended}
                      onCheckedChange={(checked) => {
                        const newAttendance = [...formData.therapyAttendance]
                        newAttendance[index] = checked as boolean
                        handleInputChange("therapyAttendance", newAttendance)
                      }}
                      disabled={viewMode === "view"}
                    />
                    <label htmlFor={`week-${index + 1}`} className="text-xs">
                      Week {index + 1}
                    </label>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Missed Sessions</label>
                  <Input
                    type="number"
                    value={formData.missedSessions}
                    onChange={(e) => handleInputChange("missedSessions", Number.parseInt(e.target.value) || 0)}
                    disabled={viewMode === "view"}
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Progress Rating (1-5)</label>
                  <Select
                    value={formData.progressRating.toString()}
                    onValueChange={(value) => handleInputChange("progressRating", Number.parseInt(value))}
                    disabled={viewMode === "view"}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Poor</SelectItem>
                      <SelectItem value="2">2 - Below Average</SelectItem>
                      <SelectItem value="3">3 - Average</SelectItem>
                      <SelectItem value="4">4 - Good</SelectItem>
                      <SelectItem value="5">5 - Excellent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Therapist Notes Summary</label>
                <Textarea
                  value={formData.therapistNotes}
                  onChange={(e) => handleInputChange("therapistNotes", e.target.value)}
                  disabled={viewMode === "view"}
                  placeholder="Summary of therapist observations and recommendations..."
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="crisis" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Crisis Incident Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {viewMode === "edit" && (
                <Button onClick={addCrisisIncident} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Crisis Incident
                </Button>
              )}

              {formData.crisisIncidents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No crisis incidents recorded</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {formData.crisisIncidents.map((incident: any, index: number) => (
                    <Card key={incident.id} className="border-l-4 border-l-red-500">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-medium">Incident #{index + 1}</h4>
                          {viewMode === "edit" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCrisisIncident(incident.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Date</label>
                            <Input
                              type="date"
                              value={incident.date}
                              onChange={(e) => {
                                const updated = formData.crisisIncidents.map((item: any) =>
                                  item.id === incident.id ? { ...item, date: e.target.value } : item,
                                )
                                handleInputChange("crisisIncidents", updated)
                              }}
                              disabled={viewMode === "view"}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                            <Input
                              type="number"
                              value={incident.duration}
                              onChange={(e) => {
                                const updated = formData.crisisIncidents.map((item: any) =>
                                  item.id === incident.id ? { ...item, duration: e.target.value } : item,
                                )
                                handleInputChange("crisisIncidents", updated)
                              }}
                              disabled={viewMode === "view"}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium mb-1">Intervention Used</label>
                          <Textarea
                            value={incident.intervention}
                            onChange={(e) => {
                              const updated = formData.crisisIncidents.map((item: any) =>
                                item.id === incident.id ? { ...item, intervention: e.target.value } : item,
                              )
                              handleInputChange("crisisIncidents", updated)
                            }}
                            disabled={viewMode === "view"}
                            rows={2}
                          />
                        </div>

                        <div className="flex gap-4 mt-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`safety-${incident.id}`}
                              checked={incident.safetyPlanActivated}
                              onCheckedChange={(checked) => {
                                const updated = formData.crisisIncidents.map((item: any) =>
                                  item.id === incident.id ? { ...item, safetyPlanActivated: checked } : item,
                                )
                                handleInputChange("crisisIncidents", updated)
                              }}
                              disabled={viewMode === "view"}
                            />
                            <label htmlFor={`safety-${incident.id}`} className="text-sm">
                              Safety Plan Activated
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`hospital-${incident.id}`}
                              checked={incident.hospitalizationPrevented}
                              onCheckedChange={(checked) => {
                                const updated = formData.crisisIncidents.map((item: any) =>
                                  item.id === incident.id ? { ...item, hospitalizationPrevented: checked } : item,
                                )
                                handleInputChange("crisisIncidents", updated)
                              }}
                              disabled={viewMode === "view"}
                            />
                            <label htmlFor={`hospital-${incident.id}`} className="text-sm">
                              Hospitalization Prevented
                            </label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="medication" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Medication Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Medication tracking coming soon</p>
                <p className="text-sm">Will include compliance tracking, side effects, and psychiatrist appointments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="support" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              24/7 Support Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Support call tracking coming soon</p>
                <p className="text-sm">Will include call logs, frequent concerns, and support needs identification</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )

  const renderIDDAutismDashboard = () => (
    <Tabs defaultValue="therapy-schedule" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="therapy-schedule">Therapy Schedule</TabsTrigger>
        <TabsTrigger value="iep-ard">IEP/ARD Tracker</TabsTrigger>
        <TabsTrigger value="behavioral">Behavioral Data</TabsTrigger>
        <TabsTrigger value="skills">Skill Development</TabsTrigger>
      </TabsList>

      <TabsContent value="therapy-schedule" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Therapy Schedule Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Therapy schedule matrix coming soon</p>
                <p className="text-sm">Will include OT, PT, Speech, ABA tracking with attendance indicators</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="iep-ard" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              IEP/ARD Meeting Tracker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>IEP/ARD tracking coming soon</p>
                <p className="text-sm">Will include meeting dates, attendees, goals, and advocacy needs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="behavioral" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Behavioral Data Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Behavioral data collection coming soon</p>
                <p className="text-sm">Will include ABC data, daily tracking, and intervention logs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="skills" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Skill Development Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Skill development tracking coming soon</p>
                <p className="text-sm">Will include communication milestones, social skills, and academic progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )

  // Substance Use Dashboard
  const renderSubstanceUseDashboard = () => (
    <Tabs defaultValue="recovery" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="recovery">Recovery Progress</TabsTrigger>
        <TabsTrigger value="treatment">Treatment</TabsTrigger>
        <TabsTrigger value="mat">MAT Compliance</TabsTrigger>
        <TabsTrigger value="milestones">Milestones</TabsTrigger>
      </TabsList>

      <TabsContent value="recovery" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-amber-600" />
              Recovery Status Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Recovery Status *</label>
                <Select disabled={viewMode === "view"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stable">Stable recovery - no substance use this period</SelectItem>
                    <SelectItem value="challenges">Recovery with minor challenges - maintained sobriety</SelectItem>
                    <SelectItem value="relapse-reengaged">Relapse occurred - re-engaged in treatment</SelectItem>
                    <SelectItem value="active-concerns">Active substance use concerns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-amber-50 p-4 rounded border-l-4 border-amber-500">
                <h4 className="font-medium text-amber-800">Recovery-Focused Documentation</h4>
                <p className="text-xs text-amber-700 mt-1">
                  Per FC-SU-01: Document in non-punitive, recovery-focused framing. 
                  Relapse is treated as part of recovery process, not failure.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Days Since Last Use</label>
                <Input 
                  type="number" 
                  placeholder="Enter number of days..."
                  disabled={viewMode === "view"}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Recovery Progress Notes</label>
                <Textarea
                  placeholder="Document recovery progress, challenges, and supports being utilized..."
                  rows={4}
                  disabled={viewMode === "view"}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="treatment" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-600" />
              Treatment Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Treatment Engagement Level *</label>
                <Select disabled={viewMode === "view"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consistent">Consistent - attended all/most sessions</SelectItem>
                    <SelectItem value="mostly">Mostly consistent - occasional missed sessions</SelectItem>
                    <SelectItem value="inconsistent">Inconsistent - frequent missed sessions</SelectItem>
                    <SelectItem value="not-engaged">Not engaged in therapy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Sessions Attended (this period)</label>
                  <Input type="number" min="0" disabled={viewMode === "view"} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Sessions Scheduled</label>
                  <Input type="number" min="0" disabled={viewMode === "view"} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Treatment Type(s)</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Individual Therapy', 'Group Therapy', 'Family Therapy', 'Support Groups', 'Outpatient Program', 'Intensive Outpatient'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox disabled={viewMode === "view"} />
                      <label className="text-sm">{type}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="mat" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-amber-600" />
              Medication-Assisted Treatment (MAT)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">MAT Status</label>
                <Select disabled={viewMode === "view"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select MAT status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-applicable">Not on MAT</SelectItem>
                    <SelectItem value="compliant">On MAT - fully compliant</SelectItem>
                    <SelectItem value="concerns">On MAT - compliance concerns</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">MAT Details (if applicable)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Medication</label>
                    <Input placeholder="e.g., Suboxone, Vivitrol" disabled={viewMode === "view"} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Prescribing Provider</label>
                    <Input placeholder="Provider name" disabled={viewMode === "view"} />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm text-gray-600 mb-1">Compliance Notes</label>
                  <Textarea rows={2} disabled={viewMode === "view"} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="milestones" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
              Recovery Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['30 Days', '60 Days', '90 Days', '6 Months', '1 Year'].map((milestone) => (
                  <div key={milestone} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <Checkbox disabled={viewMode === "view"} />
                    <label className="text-sm font-medium">{milestone}</label>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Recovery Stability Indicators</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Engaged in recovery support activities',
                    'Building sober support network',
                    'Developing healthy coping skills',
                    'Addressing underlying trauma/MH',
                    'School/work engagement improving',
                    'Family relationships improving'
                  ].map((indicator) => (
                    <div key={indicator} className="flex items-center space-x-2">
                      <Checkbox disabled={viewMode === "view"} />
                      <label className="text-sm">{indicator}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )

  // STASS Dashboard
  const renderSTASSDashboard = () => (
    <div className="space-y-4">
      {/* STASS Timeline Alert */}
      <Card className="border-2 border-yellow-500">
        <CardHeader className="bg-yellow-50">
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            Short-Term Assessment - Time-Limited Placement
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-700">30-45</div>
              <div className="text-sm text-yellow-600">Days Maximum</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-gray-700">--</div>
              <div className="text-sm text-gray-600">Days in Placement</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-gray-700">--</div>
              <div className="text-sm text-gray-600">Days Remaining</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center italic">
            STASS placements do not require continued stay reviews. Use STASS-specific assessment tracking forms.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Assessment Timeline</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="observations">Observations</TabsTrigger>
          <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                Assessment Timeline Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Placement Date</label>
                    <Input type="date" disabled={viewMode === "view"} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Completion Date</label>
                    <Input type="date" disabled={viewMode === "view"} />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-3">72-Hour Requirements</h4>
                  <div className="space-y-2">
                    {[
                      'Medical/Dental Screening Complete',
                      'Expedited Safety Plan Developed',
                      'Initial Behavioral Observations Documented'
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox disabled={viewMode === "view"} />
                        <label className="text-sm">{item}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-600" />
                Assessment Coordination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Assessment Type</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Scheduled</th>
                      <th className="text-left p-2">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'Medical/Dental Screening',
                      'Behavioral Health Evaluation',
                      'Developmental Evaluation',
                      'Educational Assessment',
                      'Trauma Screening',
                      'Substance Use Screening',
                      'CANS 3.0'
                    ].map((assessment) => (
                      <tr key={assessment} className="border-b">
                        <td className="p-2 font-medium">{assessment}</td>
                        <td className="p-2">
                          <Select disabled={viewMode === "view"}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="na">N/A</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="p-2">
                          <Input type="date" className="w-32" disabled={viewMode === "view"} />
                        </td>
                        <td className="p-2">
                          <Input type="date" className="w-32" disabled={viewMode === "view"} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="observations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-gray-600" />
                Behavioral Observations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Document behavioral patterns to inform Service Package recommendation
              </p>
              <Textarea
                placeholder="Document observed behaviors, triggers, patterns, and any emerging needs..."
                rows={6}
                disabled={viewMode === "view"}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-gray-600" />
                Service Package Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Recommended Service Package</label>
                  <Select disabled={viewMode === "view"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recommendation..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Foster Home</SelectItem>
                      <SelectItem value="mental-behavioral">Mental & Behavioral Health</SelectItem>
                      <SelectItem value="idd-autism">IDD/Autism Services</SelectItem>
                      <SelectItem value="substance-use">Substance Use Support Services</SelectItem>
                      <SelectItem value="tffc">Treatment Foster Family Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Recommendation Rationale</label>
                  <Textarea
                    placeholder="Document the rationale for service package recommendation based on assessment findings..."
                    rows={4}
                    disabled={viewMode === "view"}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  // TFFC Dashboard
  const renderTFFCDashboard = () => (
    <div className="space-y-4">
      {/* TFFC Critical Alert */}
      <Card className="border-2 border-purple-500">
        <CardHeader className="bg-purple-50">
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Shield className="h-5 w-5" />
            Treatment Foster Family Care - 60-Day Review Cycle
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-purple-100 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">60</div>
              <div className="text-sm text-purple-600">Day Review Cycle</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-gray-700">365</div>
              <div className="text-sm text-gray-600">Day Maximum</div>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-2xl font-bold text-gray-700">--</div>
              <div className="text-sm text-gray-600">Days in Placement</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-700">--</div>
              <div className="text-sm text-orange-600">Days Remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="crisis" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="crisis">Crisis Analysis</TabsTrigger>
          <TabsTrigger value="oncall">On-Call Therapist</TabsTrigger>
          <TabsTrigger value="therapy">Therapy Engagement</TabsTrigger>
          <TabsTrigger value="stepdown">Step-Down Readiness</TabsTrigger>
        </TabsList>

        <TabsContent value="crisis" className="space-y-4">
          <Card>
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                Crisis Pattern Analysis (REQUIRED at 60-Day Reviews)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Crisis Incidents This Period *</label>
                    <Input type="number" min="0" disabled={viewMode === "view"} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Crisis Incidents Previous Period</label>
                    <Input type="number" min="0" disabled={viewMode === "view"} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Crisis Frequency Trend *</label>
                  <Select disabled={viewMode === "view"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trend..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="significant-decrease">Significant decrease from previous period</SelectItem>
                      <SelectItem value="moderate-decrease">Moderate decrease</SelectItem>
                      <SelectItem value="stable">Stable / No change</SelectItem>
                      <SelectItem value="increase">Increase from previous period</SelectItem>
                      <SelectItem value="none">No crises either period</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Crisis Pattern Analysis Narrative *</label>
                  <Textarea
                    placeholder="Describe patterns in triggers, intensity, interventions that worked, On-Call Therapist involvement..."
                    rows={4}
                    disabled={viewMode === "view"}
                  />
                </div>

                <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                  <h4 className="font-medium text-green-800">Step-Down Implications</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span>Crisis-free = Strong step-down indicator</span>
                    </div>
                    <div className="flex items-center gap-2 text-yellow-700">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Stable = Treatment adjustment needed</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="h-4 w-4" />
                      <span>Decreasing = May indicate readiness</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-700">
                      <XCircle className="h-4 w-4" />
                      <span>Increasing = Step-down not appropriate</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="oncall" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-purple-600" />
                On-Call Licensed Therapist Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Document On-Call Therapist consultations and crisis responses (per T3C Blueprint p.138)
                </p>

                {viewMode === "edit" && (
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add On-Call Contact
                  </Button>
                )}

                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">On-Call Summary This Period</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold">0</div>
                      <div className="text-sm text-gray-600">Phone Consultations</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">0</div>
                      <div className="text-sm text-gray-600">In-Person Responses</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">0</div>
                      <div className="text-sm text-gray-600">Hospitalizations Prevented</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="therapy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Weekly Therapy Engagement (Minimum Required)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Therapy Engagement Level *</label>
                  <Select disabled={viewMode === "view"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fully-engaged">Fully engaged - consistent attendance and participation</SelectItem>
                      <SelectItem value="mostly-engaged">Mostly engaged - good participation with occasional challenges</SelectItem>
                      <SelectItem value="partially-engaged">Partially engaged - inconsistent attendance or participation</SelectItem>
                      <SelectItem value="minimally-engaged">Minimally engaged - significant barriers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Weekly Sessions Attended</span>
                  <Badge variant={calculateAttendanceRate() >= 80 ? "default" : "destructive"}>
                    {calculateAttendanceRate()}%
                  </Badge>
                </div>
                <Progress value={calculateAttendanceRate()} className="w-full" />

                <div className="grid grid-cols-6 gap-2 mt-4">
                  {formData.therapyAttendance.map((attended: boolean, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`week-${index + 1}`}
                        checked={attended}
                        onCheckedChange={(checked) => {
                          const newAttendance = [...formData.therapyAttendance]
                          newAttendance[index] = checked as boolean
                          handleInputChange("therapyAttendance", newAttendance)
                        }}
                        disabled={viewMode === "view"}
                      />
                      <label htmlFor={`week-${index + 1}`} className="text-xs">
                        Week {index + 1}
                      </label>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Behavioral Stability Assessment *</label>
                  <Select disabled={viewMode === "view"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select assessment..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="significantly-improved">Significantly improved</SelectItem>
                      <SelectItem value="moderately-improved">Moderately improved</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="some-regression">Some regression</SelectItem>
                      <SelectItem value="significant-concerns">Significant concerns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stepdown" className="space-y-4">
          <Card className="border-2 border-green-300">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <ArrowDown className="h-5 w-5" />
                Step-Down Readiness Assessment (REQUIRED at Every Review)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <p className="text-sm text-gray-600 italic">
                  Per T3C Blueprint: Step-down assessment must be completed at EVERY 60-day review. 
                  Goal is transition to less intensive setting within 365-day maximum.
                </p>

                <div>
                  <label className="block text-sm font-medium mb-2">Current Step-Down Readiness *</label>
                  <Select disabled={viewMode === "view"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select readiness level..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ready">Ready for step-down - recommend transition planning</SelectItem>
                      <SelectItem value="approaching">Approaching readiness - continue 1-2 more review periods</SelectItem>
                      <SelectItem value="not-ready">Not ready - specific barriers identified</SelectItem>
                      <SelectItem value="regression">Regression noted - intensification may be needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Step-Down Readiness Indicators Met</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Reduced crisis frequency',
                      'Improved emotional regulation',
                      'Stable medication regimen',
                      'Consistent school attendance',
                      'Reduced supervision needs',
                      'Improved family relationships',
                      'Coping skills developed',
                      'Reduced self-harm (if applicable)'
                    ].map((indicator) => (
                      <div key={indicator} className="flex items-center space-x-2">
                        <Checkbox disabled={viewMode === "view"} />
                        <label className="text-sm">{indicator}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Barriers to Step-Down</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Ongoing crisis frequency',
                      'Insufficient behavioral stability',
                      'Medication adjustments in progress',
                      'Active psychiatric symptoms',
                      'No appropriate placement identified',
                      'Family/permanency not ready',
                      'Recent regression'
                    ].map((barrier) => (
                      <div key={barrier} className="flex items-center space-x-2">
                        <Checkbox disabled={viewMode === "view"} />
                        <label className="text-sm">{barrier}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Recommended Step-Down Destination *</label>
                  <Select disabled={viewMode === "view"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="same-home-basic">Same foster home - transition to Basic Package</SelectItem>
                      <SelectItem value="different-home-basic">Different foster home - Basic Package</SelectItem>
                      <SelectItem value="different-specialized">Different foster home - other specialized package</SelectItem>
                      <SelectItem value="permanency">Permanency placement (reunification, adoption, etc.)</SelectItem>
                      <SelectItem value="not-appropriate">Step-down not appropriate at this time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Step-Down Planning Notes *</label>
                  <Textarea
                    placeholder="Specific steps being taken toward step-down, timeline, barriers being addressed..."
                    rows={4}
                    disabled={viewMode === "view"}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {packageType === "mental-behavioral" && <Brain className="h-6 w-6 text-blue-600" />}
                {packageType === "idd-autism" && <Activity className="h-6 w-6 text-teal-600" />}
                {packageType === "substance-use" && <Heart className="h-6 w-6 text-amber-600" />}
                {packageType === "stass" && <Clock className="h-6 w-6 text-gray-600" />}
                {packageType === "tffc" && <Shield className="h-6 w-6 text-purple-600" />}
                {packageType === "mental-behavioral" && "Mental & Behavioral Health Monitoring"}
                {packageType === "idd-autism" && "IDD/Autism Services Monitoring"}
                {packageType === "substance-use" && "Substance Use Recovery Monitoring"}
                {packageType === "stass" && "Short-Term Assessment Tracking"}
                {packageType === "tffc" && "Treatment Foster Care Monitoring"}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {packageType === "mental-behavioral" && "Track therapy attendance, crisis management, medication compliance, and support utilization"}
                {packageType === "idd-autism" && "Monitor therapy schedules, IEP/ARD meetings, behavioral data, and skill development"}
                {packageType === "substance-use" && "Track recovery progress, treatment engagement, MAT compliance, and sobriety milestones"}
                {packageType === "stass" && "Monitor assessment timeline, deadline tracking, and placement recommendation documentation"}
                {packageType === "tffc" && "Track 60-day reviews, crisis patterns, On-Call Therapist logs, and step-down readiness"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={viewMode === "edit" ? "default" : "secondary"}>
                {viewMode === "edit" ? (
                  <>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit Mode
                  </>
                ) : (
                  <>
                    <Eye className="h-3 w-3 mr-1" />
                    View Mode
                  </>
                )}
              </Badge>
              {lastSaved && <span className="text-xs text-gray-500">Auto-saved {lastSaved.toLocaleTimeString()}</span>}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {packageType === "mental-behavioral" && "Therapy Attendance"}
                  {packageType === "idd-autism" && "Therapy Sessions"}
                  {packageType === "substance-use" && "Recovery Status"}
                  {packageType === "stass" && "Assessments Complete"}
                  {packageType === "tffc" && "Therapy Attendance"}
                </p>
                <p className="text-2xl font-bold">
                  {(packageType === "mental-behavioral" || packageType === "tffc") && `${calculateAttendanceRate()}%`}
                  {packageType === "idd-autism" && "85%"}
                  {packageType === "substance-use" && "Stable"}
                  {packageType === "stass" && "3/7"}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {packageType === "mental-behavioral" && "Crisis Incidents"}
                  {packageType === "idd-autism" && "Behavioral Goals"}
                  {packageType === "substance-use" && "Days Sober"}
                  {packageType === "stass" && "Days Remaining"}
                  {packageType === "tffc" && "Crisis Incidents"}
                </p>
                <p className="text-2xl font-bold">
                  {(packageType === "mental-behavioral" || packageType === "tffc") && formData.crisisIncidents.length}
                  {packageType === "idd-autism" && "12/15"}
                  {packageType === "substance-use" && "45"}
                  {packageType === "stass" && "21"}
                </p>
              </div>
              {(packageType === "mental-behavioral" || packageType === "tffc") && <AlertTriangle className="h-8 w-8 text-yellow-500" />}
              {packageType === "idd-autism" && <TrendingUp className="h-8 w-8 text-blue-500" />}
              {packageType === "substance-use" && <Heart className="h-8 w-8 text-amber-500" />}
              {packageType === "stass" && <Clock className="h-8 w-8 text-gray-500" />}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {packageType === "mental-behavioral" && "Progress Rating"}
                  {packageType === "idd-autism" && "Skill Development"}
                  {packageType === "substance-use" && "Treatment Engagement"}
                  {packageType === "stass" && "Recommendation"}
                  {packageType === "tffc" && "Step-Down Readiness"}
                </p>
                <p className="text-2xl font-bold">
                  {packageType === "mental-behavioral" && `${formData.progressRating}/5`}
                  {packageType === "idd-autism" && "78%"}
                  {packageType === "substance-use" && "High"}
                  {packageType === "stass" && "Pending"}
                  {packageType === "tffc" && "Approaching"}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      {packageType === "mental-behavioral" && renderMentalBehavioralDashboard()}
      {packageType === "idd-autism" && renderIDDAutismDashboard()}
      {packageType === "substance-use" && renderSubstanceUseDashboard()}
      {packageType === "stass" && renderSTASSDashboard()}
      {packageType === "tffc" && renderTFFCDashboard()}

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Mail className="h-4 w-4" />
            Email Summary
          </Button>
        </div>

        {viewMode === "edit" && (
          <div className="flex gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Submit Report</Button>
          </div>
        )}
      </div>
    </div>
  )
}
