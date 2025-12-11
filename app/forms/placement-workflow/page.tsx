"use client"

import { useState, useEffect, useMemo, Suspense, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, Clock, Info, Save, Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock current user
const currentUser = { name: "Jane Doe", id: "user-789" }

const sampleChildData = {
  childId: "sample-child-123",
  inquiryId: "sample-inquiry-456",
  placementId: "sample-placement-789",
  firstName: "Alex",
  lastName: "Doe",
  dfpsId: "987654321",
  placementType: "Emergency",
  servicePackage: "Mental & Behavioral Health",
  placementStart: new Date().toISOString(),
}

// Package-specific intake tasks
const packageSpecificTasks = {
  "Mental & Behavioral Health": [
    "Crisis plan from previous placement reviewed",
    "Current psychotropic medications verified and supply confirmed",
    "Therapy appointment scheduling initiated",
    "24/7 support line information provided to foster family",
    "Mental health contact at school identified (if applicable)",
  ],
  "IDD/Autism": [
    "Communication method/device identified",
    "Sensory accommodations documented",
    "Current therapy schedule obtained (OT, PT, Speech)",
    "IEP/ARD information collected",
    "Special equipment needs verified",
  ],
  "Substance Use Support Services": [
    "Recovery status documented",
    "Current MAT medications verified (if applicable)",
    "Treatment provider/counselor information obtained",
    "Relapse prevention plan reviewed",
    "Recovery-informed expectations discussed with foster family",
    "Sober support network contacts identified",
  ],
  "Short-Term Assessment (STASS)": [
    "Unknown history protocols activated",
    "72-hour assessment timeline documented",
    "Heightened observation period initiated",
    "Assessment coordination checklist started",
    "Foster family briefed on neutral observation approach",
    "Expedited safety plan due date noted",
  ],
  "Treatment Foster Family Care": [
    "TFFC intake protocol activated",
    "On-Call Therapist contact provided to foster family",
    "Intensive therapy scheduling initiated",
    "365-day placement countdown started",
    "60-day review cycle documented",
    "Crisis management resources verified",
    "Treatment Director notified",
    "Step-down planning considerations documented",
  ],
  "T3C Basic": [],
}

const allTasks = {
  safety: [
    "Child physically arrived at placement",
    "Foster family introduction completed",
    "Room/bed assignment confirmed",
    "Basic necessities provided (clothing, toiletries, comfort items)",
    "Emergency contact information exchanged",
    "Any immediate safety concerns identified",
    "Child oriented to home",
  ],
  health: [
    "Vision concerns?",
    "Hearing concerns?",
    "Current medications",
    "Known allergies",
    "Immediate medical needs?",
    "Last medical visit",
    "Immunization records available?",
    "Current psychotropic medications verified?",
    "Crisis plan from previous placement?",
    "Immediate psychiatric needs?",
    "Special equipment needs verified?",
    "Communication method identified?",
    "Sensory accommodations needed?",
  ],
  contact: ["Initial face-to-face completed"],
  documentation: [
    "Placement notification sent to DFPS/SSCC",
    "Medical consent forms initiated",
    "School notification sent (if applicable)",
    "Essential documents requested: Birth certificate",
    "Essential documents requested: Social security card",
    "Essential documents requested: Medicaid card",
    "Essential documents requested: School records",
    "Essential documents requested: IEP/504 plan (if applicable)",
    "Photo taken for file",
    "Clothing inventory completed",
  ],
  support: [
    "Foster family orientation completed",
    "Emergency numbers provided",
    "Behavior strategies discussed",
    "Daily routine established",
    "School transportation arranged (if applicable)",
    "Follow-up support scheduled",
  ],
}

const criticalTasks = ["Initial face-to-face completed"]

function PlacementWorkflowForm() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const childId = searchParams.get("childId")

  const [isSampleData, setIsSampleData] = useState(false)
  const [childData, setChildData] = useState(null)
  const [tasks, setTasks] = useState({})
  const [healthScreening, setHealthScreening] = useState({ medications: [] })
  const [faceToFace, setFaceToFace] = useState({})
  const [notes, setNotes] = useState({})
  const [activeNote, setActiveNote] = useState(null)

  useEffect(() => {
    let stored
    try {
      stored = localStorage.getItem(`placementWorkflow-${childId}`)
    } catch (error) {
      console.warn("Could not access localStorage.")
      stored = null
    }

    if (stored) {
      const data = JSON.parse(stored)
      setChildData(data.childData)
      setTasks(data.tasks || {})
      setHealthScreening(data.healthScreening || { medications: [] })
      setFaceToFace(data.faceToFace || {})
      setNotes(data.notes || {})
    } else {
      let initialChildData
      try {
        const storedChild = localStorage.getItem("currentPlacementChild")
        if (storedChild) {
          initialChildData = JSON.parse(storedChild)
        }
      } catch (error) {
        console.warn("Could not access localStorage for currentPlacementChild.")
      }

      if (initialChildData && initialChildData.childId === childId) {
        setChildData({ ...initialChildData, placementStart: new Date().toISOString() })
        setIsSampleData(false)
      } else {
        setChildData(sampleChildData)
        setIsSampleData(true)
      }
    }
  }, [childId])

  const timeRemaining = useMemo(() => {
    if (!childData?.placementStart) return { total: 0, remaining: 0 }
    const startTime = new Date(childData.placementStart)
    const deadlineHours = childData.placementType === "Emergency" ? 24 : 72
    const deadline = new Date(startTime.getTime() + deadlineHours * 60 * 60 * 1000)
    const now = new Date()
    return {
      total: deadlineHours * 60 * 60 * 1000,
      remaining: Math.max(0, deadline.getTime() - now.getTime()),
      deadline,
    }
  }, [childData])

  const [countdown, setCountdown] = useState("")
  useEffect(() => {
    const interval = setInterval(() => {
      const { remaining } = timeRemaining
      if (remaining > 0) {
        const hours = Math.floor(remaining / (1000 * 60 * 60))
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
        setCountdown(`${hours}h ${minutes}m ${seconds}s`)
      } else {
        setCountdown("Overdue")
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [timeRemaining])

  const progress = useMemo(() => {
    const totalTasks = Object.values(allTasks).flat().length
    const completedCount = Object.keys(tasks).length
    return totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0
  }, [tasks])

  const saveProgress = useCallback(() => {
    if (isSampleData) {
      toast({
        title: "Sample Mode",
        description: "Saving is disabled in sample data mode.",
      })
      return
    }
    try {
      const dataToSave = { childData, tasks, healthScreening, faceToFace, notes }
      localStorage.setItem(`placementWorkflow-${childId}`, JSON.stringify(dataToSave))
      toast({
        title: "Progress Saved!",
        description: "Your work has been saved locally.",
      })
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Could not save progress to local storage. It might be full.",
        variant: "destructive",
      })
    }
  }, [childData, tasks, healthScreening, faceToFace, notes, isSampleData, childId, toast])

  useEffect(() => {
    const autoSave = setInterval(
      () => {
        if (!isSampleData) {
          saveProgress()
        }
      },
      5 * 60 * 1000,
    ) // 5 minutes
    return () => clearInterval(autoSave)
  }, [isSampleData, saveProgress])

  const handleTaskToggle = (taskName) => {
    setTasks((prev) => {
      const newTasks = { ...prev }
      if (newTasks[taskName]) {
        delete newTasks[taskName]
      } else {
        newTasks[taskName] = {
          completedAt: new Date().toISOString(),
          completedBy: currentUser.name,
        }
      }
      return newTasks
    })
  }

  const handlePlacementTypeChange = (type) => {
    if (isSampleData) {
      setChildData((prev) => ({ ...prev, placementType: type }))
    }
  }

  const allCriticalTasksComplete = () => {
    return criticalTasks.every((task) => !!tasks[task])
  }

  const completeAndProceed = () => {
    if (isSampleData) {
      toast({
        title: "Sample Mode",
        description: "Cannot complete workflow in sample data mode.",
      })
      return
    }
    if (!allCriticalTasksComplete()) {
      toast({
        title: "Incomplete Critical Tasks",
        description: "Please complete all required tasks before proceeding.",
        variant: "destructive",
      })
      return
    }
    saveProgress()
    toast({
      title: "Placement Workflow Complete!",
      description: "Navigating to Admission Assessment...",
    })
  }

  if (!childData) {
    return <div>Loading placement data...</div>
  }

  const renderTaskItem = (taskName) => (
    <div key={taskName} className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <Checkbox id={taskName} checked={!!tasks[taskName]} onCheckedChange={() => handleTaskToggle(taskName)} />
        <Label htmlFor={taskName} className="text-sm font-medium">
          {taskName}
          {criticalTasks.includes(taskName) && <span className="text-red-500 ml-1">*</span>}
        </Label>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {tasks[taskName] && (
          <>
            <span>{new Date(tasks[taskName].completedAt).toLocaleTimeString()}</span>
            <span>({tasks[taskName].completedBy})</span>
          </>
        )}
        <Button variant="ghost" size="sm" onClick={() => setActiveNote(activeNote === taskName ? null : taskName)}>
          Add Note
        </Button>
      </div>
      {activeNote === taskName && (
        <div className="w-full mt-2">
          <Textarea
            placeholder={`Notes for ${taskName}...`}
            value={notes[taskName] || ""}
            onChange={(e) => setNotes({ ...notes, [taskName]: e.target.value })}
          />
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {isSampleData && (
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-800">Sample Data Mode</AlertTitle>
            <AlertDescription className="text-blue-700">
              You are viewing this form with sample data for review purposes. Saving and completion are disabled.
            </AlertDescription>
          </Alert>
        )}

        {/* Header Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <CardTitle className="text-2xl">
                  Placement Workflow: {childData.firstName} {childData.lastName}
                </CardTitle>
                <p className="text-sm text-gray-500">DFPS ID: {childData.dfpsId}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant={childData.placementType === "Emergency" ? "destructive" : "default"}>
                    {childData.placementType}
                  </Badge>
                  {isSampleData && (
                    <div className="border rounded-lg p-1 flex items-center bg-white">
                      <Button
                        size="sm"
                        variant={childData.placementType === "Emergency" ? "destructive" : "ghost"}
                        className="h-6 px-2 text-xs"
                        onClick={() => handlePlacementTypeChange("Emergency")}
                      >
                        Emergency
                      </Button>
                      <Button
                        size="sm"
                        variant={childData.placementType === "Routine" ? "default" : "ghost"}
                        className="h-6 px-2 text-xs"
                        onClick={() => handlePlacementTypeChange("Routine")}
                      >
                        Routine
                      </Button>
                    </div>
                  )}
                </div>
                <Badge variant="secondary">{childData.servicePackage}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <span>Time Remaining:</span>
                <span
                  className={`font-bold ${
                    timeRemaining.remaining < timeRemaining.total / 4 ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  {countdown}
                </span>
              </div>
              <Progress value={progress} />
              <p className="text-xs text-gray-500 text-right">{progress}% Complete</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Accordion type="multiple" defaultValue={["safety"]} className="w-full space-y-4">
              {/* Section A: Immediate Safety & Arrival */}
              <Card>
                <AccordionItem value="safety" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4">
                    <h3 className="font-semibold text-lg">A: Immediate Safety & Arrival (0-2 hours)</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">{allTasks.safety.map(renderTaskItem)}</AccordionContent>
                </AccordionItem>
              </Card>

              {/* Section B: Initial Health Screening */}
              <Card>
                <AccordionItem value="health" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      B: Initial Health Screening (Within 24 hours)
                      <span className="text-red-500 font-bold">*CRITICAL*</span>
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 space-y-4">
                    <p className="text-sm text-gray-500">
                      Detailed health screening form fields to be implemented here.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Card>

              {/* Section C: Face-to-Face Contact */}
              <Card>
                <AccordionItem value="contact" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4">
                    <h3 className="font-semibold text-lg">C: Face-to-Face Contact</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {renderTaskItem("Initial face-to-face completed")}
                  </AccordionContent>
                </AccordionItem>
              </Card>

              {/* Section D: Documentation & Notifications */}
              <Card>
                <AccordionItem value="documentation" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4">
                    <h3 className="font-semibold text-lg">D: Documentation & Notifications</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {allTasks.documentation.map(renderTaskItem)}
                  </AccordionContent>
                </AccordionItem>
              </Card>

              {/* Section E: Foster Family Support */}
              <Card>
                <AccordionItem value="support" className="border-b-0">
                  <AccordionTrigger className="px-6 py-4">
                    <h3 className="font-semibold text-lg">E: Foster Family Support</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">{allTasks.support.map(renderTaskItem)}</AccordionContent>
                </AccordionItem>
              </Card>

              {/* Section F: Package-Specific Requirements */}
              {childData.servicePackage && packageSpecificTasks[childData.servicePackage]?.length > 0 && (
                <Card className={
                  childData.servicePackage === "Mental & Behavioral Health" ? "border-blue-300 bg-blue-50/50" :
                  childData.servicePackage === "IDD/Autism" ? "border-teal-300 bg-teal-50/50" :
                  childData.servicePackage === "Substance Use Support Services" ? "border-amber-300 bg-amber-50/50" :
                  childData.servicePackage === "Short-Term Assessment (STASS)" ? "border-gray-400 bg-gray-50/50" :
                  childData.servicePackage === "Treatment Foster Family Care" ? "border-purple-300 bg-purple-50/50" :
                  ""
                }>
                  <AccordionItem value="package" className="border-b-0">
                    <AccordionTrigger className="px-6 py-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        F: Package-Specific Requirements
                        <Badge variant="secondary" className={
                          childData.servicePackage === "Mental & Behavioral Health" ? "bg-blue-100 text-blue-800" :
                          childData.servicePackage === "IDD/Autism" ? "bg-teal-100 text-teal-800" :
                          childData.servicePackage === "Substance Use Support Services" ? "bg-amber-100 text-amber-800" :
                          childData.servicePackage === "Short-Term Assessment (STASS)" ? "bg-gray-200 text-gray-800" :
                          childData.servicePackage === "Treatment Foster Family Care" ? "bg-purple-100 text-purple-800" :
                          ""
                        }>
                          {childData.servicePackage}
                        </Badge>
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      {/* STASS Alert */}
                      {childData.servicePackage === "Short-Term Assessment (STASS)" && (
                        <Alert className="mb-4 bg-yellow-50 border-yellow-300">
                          <Info className="h-4 w-4 text-yellow-600" />
                          <AlertTitle className="text-yellow-800">STASS Placement</AlertTitle>
                          <AlertDescription className="text-yellow-700">
                            This is a time-limited assessment placement (30-45 days max). 
                            Child may have unknown history - apply heightened vigilance protocols.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {/* TFFC Alert */}
                      {childData.servicePackage === "Treatment Foster Family Care" && (
                        <Alert className="mb-4 bg-purple-50 border-purple-300">
                          <Info className="h-4 w-4 text-purple-600" />
                          <AlertTitle className="text-purple-800">TFFC Placement</AlertTitle>
                          <AlertDescription className="text-purple-700">
                            Treatment Foster Family Care requires 60-day review cycles (not 90-day) 
                            and has a 365-day maximum placement duration. On-Call Therapist access 24/7.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {/* SU Alert */}
                      {childData.servicePackage === "Substance Use Support Services" && (
                        <Alert className="mb-4 bg-amber-50 border-amber-300">
                          <Info className="h-4 w-4 text-amber-600" />
                          <AlertTitle className="text-amber-800">Substance Use Support</AlertTitle>
                          <AlertDescription className="text-amber-700">
                            Apply recovery-informed, non-punitive approach. Document any MAT medications carefully.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {packageSpecificTasks[childData.servicePackage].map(renderTaskItem)}
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              )}
            </Accordion>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Progress Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Compliance Status */}
                <div>
                  <h4 className="font-semibold mb-2">Compliance Status</h4>
                  <Badge
                    className={
                      countdown === "Overdue"
                        ? "bg-red-100 text-red-800"
                        : timeRemaining.remaining < timeRemaining.total / 4
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }
                  >
                    {countdown === "Overdue"
                      ? "Overdue"
                      : timeRemaining.remaining < timeRemaining.total / 4
                        ? "At Risk"
                        : "On Track"}
                  </Badge>
                </div>
                {/* Section Completion */}
                <div>
                  <h4 className="font-semibold mb-2">Section Completion</h4>
                  <ul className="space-y-1 text-sm">
                    {Object.entries(allTasks).map(([key, sectionTasks]) => {
                      const completed = sectionTasks.every((task) => !!tasks[task])
                      return (
                        <li key={key} className="flex items-center gap-2">
                          {completed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="capitalize">{key}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={saveProgress} className="gap-2 bg-transparent">
            <Save className="h-4 w-4" />
            Save Progress
          </Button>
          <Button
            onClick={completeAndProceed}
            disabled={!allCriticalTasksComplete() && !isSampleData}
            className="gap-2"
          >
            Complete & Start Assessment
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function PlacementWorkflowPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlacementWorkflowForm />
    </Suspense>
  )
}
