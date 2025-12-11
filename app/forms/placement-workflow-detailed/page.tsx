"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Clock, AlertTriangle, CheckCircle, Save, ArrowRight } from "lucide-react"

interface ChildData {
  childId: string
  firstName: string
  lastName: string
  dfpsPersonId: string
  placementType: "Emergency" | "Routine"
  servicePackage: string
  placementStartTime: string
  placementId: string
}

interface Task {
  id: string
  completed: boolean
  completedAt?: string
  completedBy?: string
  notes?: string
}

interface Medication {
  name: string
  dosage: string
  frequency: string
  prescriber: string
}

interface HealthScreening {
  visionConcerns: "Yes" | "No" | "Unknown"
  visionNotes: string
  hearingConcerns: "Yes" | "No" | "Unknown"
  hearingNotes: string
  noCurrentMedications: boolean
  medications: Medication[]
  allergies: string
  immediateMedicalNeeds: boolean
  medicalNeedsDescription: string
  lastMedicalVisit: string
  lastMedicalReason: string
  immunizationRecords: "Yes" | "No" | "Partial"
  // Mental Health specific
  psychotropicMedsVerified?: boolean
  crisisPlanAvailable?: boolean
  immediatePsychiatricNeeds?: boolean
  // IDD/Autism specific
  specialEquipmentVerified?: boolean
  communicationMethodIdentified?: boolean
  sensoryAccommodationsNeeded?: boolean
  // Substance Use specific
  substanceHistoryObtained?: boolean
  withdrawalRiskAssessed?: boolean
  matNeedsIdentified?: boolean
  // STASS specific
  unknownHistoryProtocol?: boolean
  expeditedSafetyPlanInitiated?: boolean
  initialObservationPeriodPlanned?: boolean
  // TFFC specific
  tbriAssessmentInitiated?: boolean
  onCallTherapistVerified?: boolean
  crisisInterventionPlanReviewed?: boolean
}

interface FaceToFaceContact {
  completed: boolean
  dateTime: string
  location: string
  childAdjustment: "Good" | "Fair" | "Struggling"
  immediateNeeds: string
  tbriStrategies: string[]
  notes: string
}

export default function PlacementWorkflowPage() {
  const searchParams = useSearchParams()
  const childId = searchParams.get("childId")
  const inquiryId = searchParams.get("inquiryId")

  const [childData, setChildData] = useState<ChildData | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [currentUser] = useState("Current User") // This would come from auth context
  const [lastSaved, setLastSaved] = useState<string>("")

  // Task states
  const [safetyTasks, setSafetyTasks] = useState<Record<string, Task>>({})
  const [healthScreening, setHealthScreening] = useState<HealthScreening>({
    visionConcerns: "Unknown",
    visionNotes: "",
    hearingConcerns: "Unknown",
    hearingNotes: "",
    noCurrentMedications: false,
    medications: [],
    allergies: "",
    immediateMedicalNeeds: false,
    medicalNeedsDescription: "",
    lastMedicalVisit: "",
    lastMedicalReason: "",
    immunizationRecords: "No",
  })
  const [faceToFace, setFaceToFace] = useState<FaceToFaceContact>({
    completed: false,
    dateTime: "",
    location: "",
    childAdjustment: "Good",
    immediateNeeds: "",
    tbriStrategies: [],
    notes: "",
  })
  const [documentationTasks, setDocumentationTasks] = useState<Record<string, Task>>({})
  const [supportTasks, setSupportTasks] = useState<Record<string, Task>>({})

  // Load child data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("currentPlacementChild")
    if (stored) {
      const data = JSON.parse(stored)
      setChildData(data)
      // Calculate time remaining
      const startTime = new Date(data.placementStartTime).getTime()
      const hoursLimit = data.placementType === "Emergency" ? 24 : 72
      const endTime = startTime + hoursLimit * 60 * 60 * 1000
      const now = Date.now()
      setTimeRemaining(Math.max(0, endTime - now))
    }

    // Load saved progress
    const savedProgress = localStorage.getItem("placementWorkflowProgress")
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setSafetyTasks(progress.safetyTasks || {})
      setHealthScreening(progress.healthScreening || healthScreening)
      setFaceToFace(progress.faceToFace || faceToFace)
      setDocumentationTasks(progress.documentationTasks || {})
      setSupportTasks(progress.supportTasks || {})
      setLastSaved(progress.lastSaved || "")
    }
  }, [])

  // Update countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Auto-save every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        saveProgress()
      },
      5 * 60 * 1000,
    )
    return () => clearInterval(interval)
  }, [safetyTasks, healthScreening, faceToFace, documentationTasks, supportTasks])

  const formatTimeRemaining = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const updateTask = (section: string, taskId: string, updates: Partial<Task>) => {
    const setters = {
      safety: setSafetyTasks,
      documentation: setDocumentationTasks,
      support: setSupportTasks,
    }

    const setter = setters[section as keyof typeof setters]
    if (setter) {
      setter((prev) => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          id: taskId,
          ...updates,
          ...(updates.completed && { completedAt: new Date().toISOString(), completedBy: currentUser }),
        },
      }))
    }
  }

  const addMedication = () => {
    setHealthScreening((prev) => ({
      ...prev,
      medications: [...prev.medications, { name: "", dosage: "", frequency: "", prescriber: "" }],
    }))
  }

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    setHealthScreening((prev) => ({
      ...prev,
      medications: prev.medications.map((med, i) => (i === index ? { ...med, [field]: value } : med)),
    }))
  }

  const removeMedication = (index: number) => {
    setHealthScreening((prev) => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index),
    }))
  }

  const calculateProgress = () => {
    const safetyTaskCount = 7 // Number of safety tasks
    const safetyCompleted = Object.values(safetyTasks).filter((t) => t.completed).length

    const healthCompleted =
      healthScreening.visionConcerns !== "Unknown" && healthScreening.hearingConcerns !== "Unknown" ? 1 : 0

    const faceToFaceCompleted = faceToFace.completed ? 1 : 0

    const docTaskCount = 10 // Number of documentation tasks
    const docCompleted = Object.values(documentationTasks).filter((t) => t.completed).length

    const supportTaskCount = 6 // Number of support tasks
    const supportCompleted = Object.values(supportTasks).filter((t) => t.completed).length

    const totalTasks = safetyTaskCount + 1 + 1 + docTaskCount + supportTaskCount
    const completedTasks = safetyCompleted + healthCompleted + faceToFaceCompleted + docCompleted + supportCompleted

    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  }

  const allCriticalTasksComplete = () => {
    // Critical tasks: Health screening and face-to-face contact
    const healthComplete = healthScreening.visionConcerns !== "Unknown" && healthScreening.hearingConcerns !== "Unknown"
    return healthComplete && faceToFace.completed
  }

  const saveProgress = () => {
    const progressData = {
      childData,
      safetyTasks,
      healthScreening,
      faceToFace,
      documentationTasks,
      supportTasks,
      lastSaved: new Date().toISOString(),
    }
    localStorage.setItem("placementWorkflowProgress", JSON.stringify(progressData))
    setLastSaved(new Date().toISOString())
  }

  const completeAndProceed = async () => {
    if (!allCriticalTasksComplete()) {
      alert("Please complete all required tasks before proceeding.")
      return
    }

    const placementCompletion = {
      ...childData,
      placementTasks: {
        safety: safetyTasks,
        health: healthScreening,
        faceToFace,
        documentation: documentationTasks,
        support: supportTasks,
      },
      placementCompletedAt: new Date().toISOString(),
      completedBy: currentUser,
      nextWorkflow: "admission-assessment",
    }

    localStorage.setItem("placementComplete", JSON.stringify(placementCompletion))
    window.location.href = `/forms/admission-assessment?childId=${childId}&placementId=${childData?.placementId}`
  }

  const getComplianceStatus = () => {
    if (allCriticalTasksComplete()) return { status: "On Track", color: "bg-green-100 text-green-800" }
    if (timeRemaining < 3600000) return { status: "Overdue", color: "bg-red-100 text-red-800" }
    return { status: "At Risk", color: "bg-yellow-100 text-yellow-800" }
  }

  if (!childData) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg">Loading placement data...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isEmergency = childData.placementType === "Emergency"
  const progress = calculateProgress()
  const compliance = getComplianceStatus()

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Emergency Alert */}
      {isEmergency && (
        <Alert className="mb-6 border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 font-medium">
            🚨 EMERGENCY PLACEMENT - All critical tasks must be completed within 24 hours
          </AlertDescription>
        </Alert>
      )}

      {/* Header Section */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">
                {childData.firstName} {childData.lastName}
              </CardTitle>
              <p className="text-muted-foreground">DFPS ID: {childData.dfpsPersonId}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Badge variant={isEmergency ? "destructive" : "default"} className="text-sm">
                {childData.placementType} Placement
              </Badge>
              <div className="text-sm text-muted-foreground">Service: {childData.servicePackage}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Time Remaining</span>
              </div>
              <div
                className={`text-2xl font-bold ${timeRemaining < 3600000 ? "text-red-600" : isEmergency ? "text-orange-600" : "text-green-600"}`}
              >
                {formatTimeRemaining(timeRemaining)}
              </div>
              {timeRemaining === 0 && (
                <Badge variant="destructive" className="mt-2">
                  DEADLINE REACHED
                </Badge>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Overall Progress</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-muted-foreground">{progress}% Complete</p>
                {lastSaved && (
                  <p className="text-xs text-muted-foreground">
                    Last saved: {new Date(lastSaved).toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-3">
          <Accordion type="multiple" defaultValue={["safety", "health"]} className="space-y-4">
            {/* Section A: Immediate Safety & Arrival */}
            <AccordionItem value="safety">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">A</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Immediate Safety & Arrival</h3>
                      <p className="text-sm text-muted-foreground">0-2 hours</p>
                    </div>
                    {Object.values(safetyTasks).filter((t) => t.completed).length === 7 && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {[
                        { id: "child-arrived", label: "Child physically arrived at placement" },
                        { id: "introduction-completed", label: "Foster family introduction completed" },
                        { id: "room-assigned", label: "Room/bed assignment confirmed" },
                        {
                          id: "necessities-provided",
                          label: "Basic necessities provided (clothing, toiletries, comfort items)",
                        },
                        { id: "emergency-contacts", label: "Emergency contact information exchanged" },
                        { id: "safety-concerns", label: "Any immediate safety concerns identified" },
                        { id: "child-oriented", label: "Child oriented to home" },
                      ].map((item) => {
                        const task = safetyTasks[item.id] || { id: item.id, completed: false }
                        return (
                          <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={(checked) => updateTask("safety", item.id, { completed: !!checked })}
                            />
                            <div className="flex-1">
                              <Label className="text-sm font-medium cursor-pointer">{item.label}</Label>
                              {task.completed && (
                                <div className="text-xs text-green-600 mt-1">
                                  ✓ Completed {task.completedAt ? new Date(task.completedAt).toLocaleString() : ""} by{" "}
                                  {task.completedBy}
                                </div>
                              )}
                              <div className="mt-2 flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const notes = prompt("Add notes:", task.notes || "")
                                    if (notes !== null) {
                                      updateTask("safety", item.id, { notes })
                                    }
                                  }}
                                >
                                  {task.notes ? "Edit Note" : "Add Note"}
                                </Button>
                              </div>
                              {task.notes && (
                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                                  <strong>Note:</strong> {task.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>

            {/* Section B: Initial Health Screening */}
            <AccordionItem value="health">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">B</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Initial Health Screening *</h3>
                      <p className="text-sm text-muted-foreground">Within 24 hours - CRITICAL</p>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      CRITICAL
                    </Badge>
                    {allCriticalTasksComplete() && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="space-y-6">
                      {/* Vision Concerns */}
                      <div className="p-4 border rounded-lg">
                        <Label className="text-sm font-medium text-red-600">Vision concerns? *</Label>
                        <RadioGroup
                          value={healthScreening.visionConcerns}
                          onValueChange={(value) =>
                            setHealthScreening((prev) => ({ ...prev, visionConcerns: value as any }))
                          }
                          className="flex gap-6 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="vision-yes" />
                            <Label htmlFor="vision-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="vision-no" />
                            <Label htmlFor="vision-no">No</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Unknown" id="vision-unknown" />
                            <Label htmlFor="vision-unknown">Unknown</Label>
                          </div>
                        </RadioGroup>
                        <Textarea
                          placeholder="Vision notes..."
                          value={healthScreening.visionNotes}
                          onChange={(e) => setHealthScreening((prev) => ({ ...prev, visionNotes: e.target.value }))}
                          className="mt-2"
                        />
                      </div>

                      {/* Hearing Concerns */}
                      <div className="p-4 border rounded-lg">
                        <Label className="text-sm font-medium text-red-600">Hearing concerns? *</Label>
                        <RadioGroup
                          value={healthScreening.hearingConcerns}
                          onValueChange={(value) =>
                            setHealthScreening((prev) => ({ ...prev, hearingConcerns: value as any }))
                          }
                          className="flex gap-6 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="hearing-yes" />
                            <Label htmlFor="hearing-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="hearing-no" />
                            <Label htmlFor="hearing-no">No</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Unknown" id="hearing-unknown" />
                            <Label htmlFor="hearing-unknown">Unknown</Label>
                          </div>
                        </RadioGroup>
                        <Textarea
                          placeholder="Hearing notes..."
                          value={healthScreening.hearingNotes}
                          onChange={(e) => setHealthScreening((prev) => ({ ...prev, hearingNotes: e.target.value }))}
                          className="mt-2"
                        />
                      </div>

                      {/* Current Medications */}
                      <div className="p-4 border rounded-lg">
                        <Label className="text-sm font-medium">Current medications</Label>
                        <div className="mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={healthScreening.noCurrentMedications}
                              onCheckedChange={(checked) =>
                                setHealthScreening((prev) => ({
                                  ...prev,
                                  noCurrentMedications: !!checked,
                                  medications: !!checked ? [] : prev.medications,
                                }))
                              }
                            />
                            <Label>No current medications</Label>
                          </div>
                          {!healthScreening.noCurrentMedications && (
                            <div className="mt-4 space-y-4">
                              {healthScreening.medications.map((med, index) => (
                                <div key={index} className="p-4 border rounded-lg bg-gray-50">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label>Medication Name</Label>
                                      <Input
                                        value={med.name}
                                        onChange={(e) => updateMedication(index, "name", e.target.value)}
                                        placeholder="Medication name"
                                      />
                                    </div>
                                    <div>
                                      <Label>Dosage</Label>
                                      <Input
                                        value={med.dosage}
                                        onChange={(e) => updateMedication(index, "dosage", e.target.value)}
                                        placeholder="e.g., 10mg"
                                      />
                                    </div>
                                    <div>
                                      <Label>Frequency</Label>
                                      <Input
                                        value={med.frequency}
                                        onChange={(e) => updateMedication(index, "frequency", e.target.value)}
                                        placeholder="e.g., Twice daily"
                                      />
                                    </div>
                                    <div>
                                      <Label>Prescriber</Label>
                                      <Input
                                        value={med.prescriber}
                                        onChange={(e) => updateMedication(index, "prescriber", e.target.value)}
                                        placeholder="Doctor name"
                                      />
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeMedication(index)}
                                    className="mt-2"
                                  >
                                    Remove Medication
                                  </Button>
                                </div>
                              ))}
                              <Button onClick={addMedication} variant="outline">
                                + Add Medication
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Additional Health Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <Label className="text-sm font-medium">Known allergies</Label>
                          <Textarea
                            value={healthScreening.allergies}
                            onChange={(e) => setHealthScreening((prev) => ({ ...prev, allergies: e.target.value }))}
                            placeholder="List any known allergies..."
                            className="mt-2"
                          />
                        </div>
                        <div className="p-4 border rounded-lg">
                          <Label className="text-sm font-medium">Immediate medical needs?</Label>
                          <RadioGroup
                            value={healthScreening.immediateMedicalNeeds ? "Yes" : "No"}
                            onValueChange={(value) =>
                              setHealthScreening((prev) => ({ ...prev, immediateMedicalNeeds: value === "Yes" }))
                            }
                            className="flex gap-6 mt-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Yes" id="medical-yes" />
                              <Label htmlFor="medical-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="No" id="medical-no" />
                              <Label htmlFor="medical-no">No</Label>
                            </div>
                          </RadioGroup>
                          {healthScreening.immediateMedicalNeeds && (
                            <Textarea
                              value={healthScreening.medicalNeedsDescription}
                              onChange={(e) =>
                                setHealthScreening((prev) => ({ ...prev, medicalNeedsDescription: e.target.value }))
                              }
                              placeholder="Describe medical needs and action taken..."
                              className="mt-2"
                            />
                          )}
                        </div>
                      </div>

                      {/* Last Medical Visit */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Last medical visit (date)</Label>
                          <Input
                            type="date"
                            value={healthScreening.lastMedicalVisit}
                            onChange={(e) =>
                              setHealthScreening((prev) => ({ ...prev, lastMedicalVisit: e.target.value }))
                            }
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Reason for visit</Label>
                          <Input
                            value={healthScreening.lastMedicalReason}
                            onChange={(e) =>
                              setHealthScreening((prev) => ({ ...prev, lastMedicalReason: e.target.value }))
                            }
                            placeholder="Reason for last visit"
                            className="mt-2"
                          />
                        </div>
                      </div>

                      {/* Immunization Records */}
                      <div>
                        <Label className="text-sm font-medium">Immunization records available?</Label>
                        <RadioGroup
                          value={healthScreening.immunizationRecords}
                          onValueChange={(value) =>
                            setHealthScreening((prev) => ({ ...prev, immunizationRecords: value as any }))
                          }
                          className="flex gap-6 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id="immun-yes" />
                            <Label htmlFor="immun-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id="immun-no" />
                            <Label htmlFor="immun-no">No</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Partial" id="immun-partial" />
                            <Label htmlFor="immun-partial">Partial</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Service Package Specific Fields */}
                      {childData.servicePackage === "Mental & Behavioral Health" && (
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-900">Mental & Behavioral Health Specific</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.psychotropicMedsVerified || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, psychotropicMedsVerified: !!checked }))
                                }
                              />
                              <Label>Current psychotropic medications verified?</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.crisisPlanAvailable || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, crisisPlanAvailable: !!checked }))
                                }
                              />
                              <Label>Crisis plan from previous placement?</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.immediatePsychiatricNeeds || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, immediatePsychiatricNeeds: !!checked }))
                                }
                              />
                              <Label>Immediate psychiatric needs?</Label>
                            </div>
                          </div>
                        </div>
                      )}

                      {childData.servicePackage === "IDD/Autism Support Services" && (
                        <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-900">IDD/Autism Support Specific</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.specialEquipmentVerified || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, specialEquipmentVerified: !!checked }))
                                }
                              />
                              <Label>Special equipment needs verified?</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.communicationMethodIdentified || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, communicationMethodIdentified: !!checked }))
                                }
                              />
                              <Label>Communication method identified?</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.sensoryAccommodationsNeeded || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, sensoryAccommodationsNeeded: !!checked }))
                                }
                              />
                              <Label>Sensory accommodations needed?</Label>
                            </div>
                          </div>
                        </div>
                      )}

                      {childData.servicePackage === "Substance Use Support Services" && (
                        <div className="space-y-4 p-4 bg-amber-50 rounded-lg">
                          <h4 className="font-medium text-amber-900">Substance Use Support Specific</h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.substanceHistoryObtained || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, substanceHistoryObtained: !!checked }))
                                }
                              />
                              <Label>Substance use history obtained?</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.withdrawalRiskAssessed || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, withdrawalRiskAssessed: !!checked }))
                                }
                              />
                              <Label>Withdrawal risk assessed?</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.matNeedsIdentified || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, matNeedsIdentified: !!checked }))
                                }
                              />
                              <Label>MAT needs identified?</Label>
                            </div>
                          </div>
                        </div>
                      )}

                      {childData.servicePackage === "Short-Term Assessment Support Services" && (
                        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900">STASS Assessment Specific</h4>
                          <Alert className="mb-3">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              STASS children often have unknown histories. Enhanced safety monitoring required.
                            </AlertDescription>
                          </Alert>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.unknownHistoryProtocol || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, unknownHistoryProtocol: !!checked }))
                                }
                              />
                              <Label>Unknown history protocol initiated?</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.expeditedSafetyPlanInitiated || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, expeditedSafetyPlanInitiated: !!checked }))
                                }
                              />
                              <Label>Expedited safety plan initiated (72-hour)?</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.initialObservationPeriodPlanned || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, initialObservationPeriodPlanned: !!checked }))
                                }
                              />
                              <Label>Initial observation period planned?</Label>
                            </div>
                          </div>
                        </div>
                      )}

                      {childData.servicePackage === "Treatment Foster Family Care" && (
                        <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-medium text-purple-900">TFFC Specific</h4>
                          <Alert className="mb-3 bg-purple-100 border-purple-200">
                            <AlertTriangle className="h-4 w-4 text-purple-600" />
                            <AlertDescription className="text-purple-800">
                              TFFC requires 24/7 On-Call Licensed Therapist access. Verify before placement.
                            </AlertDescription>
                          </Alert>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.tbriAssessmentInitiated || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, tbriAssessmentInitiated: !!checked }))
                                }
                              />
                              <Label>TBRI assessment initiated?</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.onCallTherapistVerified || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, onCallTherapistVerified: !!checked }))
                                }
                              />
                              <Label>On-Call Therapist verified?</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={healthScreening.crisisInterventionPlanReviewed || false}
                                onCheckedChange={(checked) =>
                                  setHealthScreening((prev) => ({ ...prev, crisisInterventionPlanReviewed: !!checked }))
                                }
                              />
                              <Label>Crisis intervention plan reviewed?</Label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>

            {/* Section C: Face-to-Face Contact */}
            <AccordionItem value="face-to-face">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">C</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Face-to-Face Contact *</h3>
                      <p className="text-sm text-muted-foreground">Required within timeframe</p>
                    </div>
                    {faceToFace.completed && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <Checkbox
                          checked={faceToFace.completed}
                          onCheckedChange={(checked) => setFaceToFace((prev) => ({ ...prev, completed: !!checked }))}
                        />
                        <Label className="font-medium text-red-600">Initial face-to-face completed *</Label>
                      </div>

                      {faceToFace.completed && (
                        <div className="space-y-4 p-4 border rounded-lg bg-green-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-red-600">Date/Time *</Label>
                              <Input
                                type="datetime-local"
                                value={faceToFace.dateTime}
                                onChange={(e) => setFaceToFace((prev) => ({ ...prev, dateTime: e.target.value }))}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label className="text-red-600">Location *</Label>
                              <Select
                                value={faceToFace.location}
                                onValueChange={(value) => setFaceToFace((prev) => ({ ...prev, location: value }))}
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Foster Home">Foster Home</SelectItem>
                                  <SelectItem value="Office">Office</SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label className="text-red-600">Child's adjustment *</Label>
                            <RadioGroup
                              value={faceToFace.childAdjustment}
                              onValueChange={(value) =>
                                setFaceToFace((prev) => ({ ...prev, childAdjustment: value as any }))
                              }
                              className="flex gap-6 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Good" id="adj-good" />
                                <Label htmlFor="adj-good">Good</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Fair" id="adj-fair" />
                                <Label htmlFor="adj-fair">Fair</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="Struggling" id="adj-struggling" />
                                <Label htmlFor="adj-struggling">Struggling</Label>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label>Immediate needs identified</Label>
                            <Textarea
                              value={faceToFace.immediateNeeds}
                              onChange={(e) => setFaceToFace((prev) => ({ ...prev, immediateNeeds: e.target.value }))}
                              placeholder="Describe any immediate needs..."
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label className="font-medium">TBRI® strategies used</Label>
                            <div className="mt-2 space-y-2">
                              {[
                                "Offered choices",
                                "Used calm voice/body language",
                                "Met at eye level",
                                "Provided felt safety",
                              ].map((strategy) => (
                                <div key={strategy} className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={faceToFace.tbriStrategies.includes(strategy)}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        setFaceToFace((prev) => ({
                                          ...prev,
                                          tbriStrategies: [...prev.tbriStrategies, strategy],
                                        }))
                                      } else {
                                        setFaceToFace((prev) => ({
                                          ...prev,
                                          tbriStrategies: prev.tbriStrategies.filter((s) => s !== strategy),
                                        }))
                                      }
                                    }}
                                  />
                                  <Label>{strategy}</Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <Label>Notes</Label>
                            <Textarea
                              value={faceToFace.notes}
                              onChange={(e) => setFaceToFace((prev) => ({ ...prev, notes: e.target.value }))}
                              placeholder="Additional notes..."
                              className="mt-1"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>

            {/* Section D: Documentation & Notifications */}
            <AccordionItem value="documentation">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">D</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Documentation & Notifications</h3>
                      <p className="text-sm text-muted-foreground">Required documentation</p>
                    </div>
                    {Object.values(documentationTasks).filter((t) => t.completed).length === 10 && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {[
                        { id: "placement-notification", label: "Placement notification sent to DFPS/SSCC" },
                        { id: "medical-consent", label: "Medical consent forms initiated" },
                        { id: "school-notification", label: "School notification sent (if applicable)" },
                        { id: "birth-certificate", label: "Birth certificate requested" },
                        { id: "social-security", label: "Social security card requested" },
                        { id: "medicaid-card", label: "Medicaid card requested" },
                        { id: "school-records", label: "School records requested" },
                        { id: "iep-504", label: "IEP/504 plan requested (if applicable)" },
                        { id: "photo-taken", label: "Photo taken for file" },
                        { id: "clothing-inventory", label: "Clothing inventory completed" },
                      ].map((item) => {
                        const task = documentationTasks[item.id] || { id: item.id, completed: false }
                        return (
                          <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={(checked) =>
                                updateTask("documentation", item.id, { completed: !!checked })
                              }
                            />
                            <div className="flex-1">
                              <Label className="text-sm font-medium cursor-pointer">{item.label}</Label>
                              {task.completed && (
                                <div className="text-xs text-green-600 mt-1">
                                  ✓ Completed {task.completedAt ? new Date(task.completedAt).toLocaleString() : ""} by{" "}
                                  {task.completedBy}
                                </div>
                              )}
                              <div className="mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const notes = prompt("Add notes:", task.notes || "")
                                    if (notes !== null) {
                                      updateTask("documentation", item.id, { notes })
                                    }
                                  }}
                                >
                                  {task.notes ? "Edit Note" : "Add Note"}
                                </Button>
                              </div>
                              {task.notes && (
                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                                  <strong>Note:</strong> {task.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>

            {/* Section E: Foster Family Support */}
            <AccordionItem value="support">
              <Card>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-sm">E</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">Foster Family Support</h3>
                      <p className="text-sm text-muted-foreground">Support and orientation</p>
                    </div>
                    {Object.values(supportTasks).filter((t) => t.completed).length === 6 && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {[
                        { id: "family-orientation", label: "Foster family orientation completed" },
                        { id: "emergency-numbers", label: "Emergency numbers provided" },
                        { id: "behavior-strategies", label: "Behavior strategies discussed" },
                        { id: "daily-routine", label: "Daily routine established" },
                        { id: "school-transport", label: "School transportation arranged (if applicable)" },
                        { id: "followup-scheduled", label: "Follow-up support scheduled" },
                      ].map((item) => {
                        const task = supportTasks[item.id] || { id: item.id, completed: false }
                        return (
                          <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                            <Checkbox
                              checked={task.completed}
                              onCheckedChange={(checked) => updateTask("support", item.id, { completed: !!checked })}
                            />
                            <div className="flex-1">
                              <Label className="text-sm font-medium cursor-pointer">{item.label}</Label>
                              {task.completed && (
                                <div className="text-xs text-green-600 mt-1">
                                  ✓ Completed {task.completedAt ? new Date(task.completedAt).toLocaleString() : ""} by{" "}
                                  {task.completedBy}
                                </div>
                              )}
                              <div className="mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const notes = prompt("Add notes:", task.notes || "")
                                    if (notes !== null) {
                                      updateTask("support", item.id, { notes })
                                    }
                                  }}
                                >
                                  {task.notes ? "Edit Note" : "Add Note"}
                                </Button>
                              </div>
                              {task.notes && (
                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                                  <strong>Note:</strong> {task.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Progress Tracking Sidebar */}
        <div className="xl:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="flex-1">Safety & Arrival</span>
                  {Object.values(safetyTasks).filter((t) => t.completed).length === 7 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="flex-1">Health Screening</span>
                  {healthScreening.visionConcerns !== "Unknown" && healthScreening.hearingConcerns !== "Unknown" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="flex-1">Face-to-Face</span>
                  {faceToFace.completed ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="flex-1">Documentation</span>
                  {Object.values(documentationTasks).filter((t) => t.completed).length > 0 ? (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="flex-1">Family Support</span>
                  {Object.values(supportTasks).filter((t) => t.completed).length > 0 ? (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm font-medium mb-2">Time Remaining</div>
                <div
                  className={`text-lg font-bold ${timeRemaining === 0 ? "text-red-600" : timeRemaining < 3600000 ? "text-orange-600" : "text-green-600"}`}
                >
                  {timeRemaining === 0 ? "EXPIRED" : formatTimeRemaining(timeRemaining)}
                </div>
                {timeRemaining > 0 && timeRemaining < 3600000 && (
                  <div className="text-xs text-red-600 mt-1">⚠️ Less than 1 hour remaining!</div>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm font-medium mb-2">Compliance Status</div>
                <Badge className={`w-full justify-center ${compliance.color}`}>{compliance.status}</Badge>
              </div>

              {/* Overdue Tasks */}
              {timeRemaining < 3600000 && !allCriticalTasksComplete() && (
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2 text-red-600">Overdue Tasks</div>
                  <div className="space-y-1 text-xs">
                    {healthScreening.visionConcerns === "Unknown" && (
                      <div className="text-red-600">• Health screening incomplete</div>
                    )}
                    {!faceToFace.completed && <div className="text-red-600">• Face-to-face contact required</div>}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 pt-6 border-t">
        <Button
          variant="outline"
          onClick={saveProgress}
          className="flex items-center gap-2 bg-transparent"
          disabled={!childData}
        >
          <Save className="h-4 w-4" />
          Save Progress
        </Button>
        <Button
          onClick={completeAndProceed}
          disabled={!allCriticalTasksComplete()}
          className="flex items-center gap-2"
          size="lg"
        >
          <ArrowRight className="h-4 w-4" />
          Complete Placement & Start Assessment
        </Button>
      </div>

      {/* Critical Tasks Warning */}
      {!allCriticalTasksComplete() && (
        <Alert className="mt-4 border-amber-500 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Critical tasks must be completed before proceeding:</strong>
            <ul className="mt-2 list-disc list-inside text-sm">
              {healthScreening.visionConcerns === "Unknown" && <li>Complete health screening (vision concerns)</li>}
              {healthScreening.hearingConcerns === "Unknown" && <li>Complete health screening (hearing concerns)</li>}
              {!faceToFace.completed && <li>Complete face-to-face contact</li>}
            </ul>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
