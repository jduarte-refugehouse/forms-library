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

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {packageType === "mental-behavioral" ? (
                  <Brain className="h-6 w-6 text-purple-600" />
                ) : (
                  <Activity className="h-6 w-6 text-green-600" />
                )}
                {packageType === "mental-behavioral"
                  ? "Mental & Behavioral Health Monitoring"
                  : "IDD/Autism Services Monitoring"}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {packageType === "mental-behavioral"
                  ? "Track therapy attendance, crisis management, medication compliance, and support utilization"
                  : "Monitor therapy schedules, IEP/ARD meetings, behavioral data, and skill development"}
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
                  {packageType === "mental-behavioral" ? "Therapy Attendance" : "Therapy Sessions"}
                </p>
                <p className="text-2xl font-bold">
                  {packageType === "mental-behavioral" ? `${calculateAttendanceRate()}%` : "85%"}
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
                  {packageType === "mental-behavioral" ? "Crisis Incidents" : "Behavioral Goals"}
                </p>
                <p className="text-2xl font-bold">
                  {packageType === "mental-behavioral" ? formData.crisisIncidents.length : "12/15"}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {packageType === "mental-behavioral" ? "Progress Rating" : "Skill Development"}
                </p>
                <p className="text-2xl font-bold">
                  {packageType === "mental-behavioral" ? `${formData.progressRating}/5` : "78%"}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard */}
      {packageType === "mental-behavioral" ? renderMentalBehavioralDashboard() : renderIDDAutismDashboard()}

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
