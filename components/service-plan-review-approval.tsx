"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  CalendarIcon,
  AlertCircle,
  Save,
  Printer,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  PlusCircle,
  MinusCircle,
  Smile,
  Frown,
  Meh,
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays, isPast, differenceInDays } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/hooks/use-toast"

// --- Type Definitions ---
type PackageType = "mental-behavioral" | "idd-autism" | "substance-use" | "stass" | "tffc" | "basic" | "none"

interface ChildData {
  id: string
  name: string
  placementDate: string // YYYY-MM-DD
  servicePlanApprovalDate: string // YYYY-MM-DD
  age: number
  packageType?: PackageType
}

interface ReviewSchedule {
  type: "30-day" | "90-day" | "6-month" | "Annual"
  dueDate: string
  status: "Complete" | "Due" | "Overdue"
  participants: string
  completion: number // 0-100
}

interface ServicePlanGoal {
  id: string
  goal: string
  baseline: string
  current: string
  progress: number
  status: "On Track" | "Delayed" | "Achieved"
  evidence: string
  nextSteps: string
  targetDate: string
}

interface ServicePlanReviewApprovalData {
  currentReviewCycle: "30-day" | "90-day" | "Annual" | ""
  daysInPlacement: number
  nextRequiredReviewDate: string
  overdueReviews: boolean
  reviewScheduleMatrix: ReviewSchedule[]
  caseManagerReview: {
    serviceDeliveryAssessment: {
      servicesAsPlanned: "Yes" | "No" | "Partial" | ""
      serviceDetails: Array<{
        serviceName: string
        frequencyMet: boolean | null
        providerFeedback: string
        effectiveness: string
      }>
      barriers: string[]
      otherBarriers: string
      modificationsNeeded: string
    }
    childProgressSummary: {
      behavioralObservations: string
      schoolPerformance: string
      healthStatus: string
      relationshipDevelopment: string
      lifeSkillsProgress: string
    }
  }
  fosterParentInput: {
    dailyLivingReport: {
      adjustmentRating: number | null
      sleepPatterns: "Improved" | "Same" | "Worsened" | ""
      appetite: "Improved" | "Same" | "Worsened" | ""
      peerInteractions: string
      followingHouseRules: string
    }
    supportNeeds: {
      trainingNeeded: string[]
      otherTrainingNeeded: string
      respiteUtilization: string
      clinicalSupportRequests: string
      resourceNeeds: string
      successes: string
      concerns: string
    }
  }
  treatmentTeamReview: {
    therapistSummary: string
    medicationEffectiveness: string
    crisisIncidentsAnalysis: string
    therapeuticGoalProgress: string
    recommendations: string
    developmentalProgress: string
    behavioralDataTrends: string
    skillAcquisitionUpdates: string
    supportLevelAdjustments: string
    educationalTeamInput: string
    // Substance Use specific fields
    recoveryStatus: string
    matCompliance: string
    relapsePrevention: string
    treatmentEngagement: string
    recoverySupports: string
    // TFFC specific fields
    tffcCrisisPatternAnalysis: string
    behavioralStability: string
    therapyEngagement: string
    stepDownReadiness: string
    daysRemaining: number
  }
  programDirectorQuarterlyReview: {
    reviewType: "90-day" | "180-day" | "270-day" | "Annual" | ""
    daysUntilDFPSDeadline: number
    previousReviewDate: string
    previousReviewFindings: string
    writtenConfirmation: {
      statement: string
      evidenceChecklist: string[]
      specificExamples: { [key: string]: string }
    }
    placementRecommendation: "continue-current" | "continue-modifications" | "step-down" | "higher-level" | ""
    rationale: string
    transitionTimeline: string
    preparationNeeds: string
  }
  childYouthVoice: {
    ageGroup: "6-11" | "12-17" | "18+" | ""
    happySadScale: {
      lifeAreas: Array<{ area: string; rating: "happy" | "sad" | "neutral" | "" }>
    }
    whatsGoingWell: string
    whatsHard: string
    wishesForFuture: string
    helperCompletedBy: string
    satisfactionRatings: Array<{ domain: string; rating: number | null }>
    goalInputPreferences: string
    concernsComplaintsProcess: string
    participationPlanningPreference: string
    normalcyActivities: string[]
    selfAssessmentTools: string
    transitionPlanningInput: string
    independentLivingReadiness: string
    consentForServices: boolean | null
  }
  servicePlanGoals: ServicePlanGoal[]
  complianceDocumentation: {
    dfpsSubmissionRequirements: string[]
    submissionDetails: {
      caseworkerName: string
      caseworkerEmail: string
      dateSent: string
      timeSent: string
      method: "Email" | "Portal" | "Certified Mail" | ""
      confirmationNumber: string
      responseReceived: "Yes" | "No" | "Pending" | ""
      responseDate: string
    }
    signatures: {
      "30-day": {
        caseManager: { name: string; date: string }
        fosterParent: { name: string; date: string }
        supervisor: { name: string; date: string }
      }
      "90-day": {
        programDirector: { name: string; date: string }
        clinicalDirector: { name: string; date: string }
        caseManager: { name: string; date: string }
        fosterParent: { name: string; date: string }
        youth: { name: string; date: string }
      }
      Annual: {
        regionalDirector: { name: string; date: string }
        casa: { name: string; date: string }
        educationalAdvocate: { name: string; date: string }
      }
    }
  }
  actionPlanningFollowUp: {
    immediateActionItems: Array<{
      action: string
      responsibleParty: string
      dueDate: string
      priority: "High" | "Medium" | "Low" | ""
    }>
    servicePlanModifications:
      | "no-changes"
      | "minor-adjustments"
      | "significant-changes"
      | "new-goals"
      | "package-change"
      | ""
    nextCaseManagerContact: string
    nextFosterParentCheckIn: string
    nextTreatmentTeamMeeting: string
    specialReviewNeeded: boolean | null
    specialReviewDate: string
    specialReviewReason: string
  }
  lastSaved: string
  isApproved: boolean
}

interface ServicePlanReviewApprovalProps {
  childData: ChildData
  sectionData?: ServicePlanReviewApprovalData
  onUpdate: (data: ServicePlanReviewApprovalData) => void
  onValidationChange: (isValid: boolean) => void
  viewMode?: "edit" | "view"
  userRole: "case_manager" | "program_director" | "clinical_director" | "foster_parent" | "youth" | "admin"
}

// --- Helper Functions ---
const calculateReviewSchedule = (
  placementDate: string,
  servicePlanApprovalDate: string,
  lastReviewDate: string,
  currentDate: Date = new Date(),
): ReviewSchedule[] => {
  const pDate = new Date(placementDate)
  const spDate = new Date(servicePlanApprovalDate)
  const lrDate = new Date(lastReviewDate)

  const schedules: ReviewSchedule[] = []

  // 30-day review
  const thirtyDayDueDate = addDays(pDate, 30)
  schedules.push({
    type: "30-day",
    dueDate: format(thirtyDayDueDate, "yyyy-MM-dd"),
    status: isPast(thirtyDayDueDate) ? "Overdue" : "Due", // Simplified status
    participants: "Case Manager, FP",
    completion: 0, // Placeholder
  })

  // 90-day review (quarterly)
  const ninetyDayDueDate = addDays(spDate, 90)
  schedules.push({
    type: "90-day",
    dueDate: format(ninetyDayDueDate, "yyyy-MM-dd"),
    status: isPast(ninetyDayDueDate) ? "Overdue" : "Due",
    participants: "PD, CM, FP, Team",
    completion: 0,
  })

  // 6-month review
  const sixMonthDueDate = addDays(spDate, 180)
  schedules.push({
    type: "6-month",
    dueDate: format(sixMonthDueDate, "yyyy-MM-dd"),
    status: isPast(sixMonthDueDate) ? "Overdue" : "Due",
    participants: "Full Team",
    completion: 0,
  })

  // Annual review
  const annualDueDate = addDays(spDate, 365)
  schedules.push({
    type: "Annual",
    dueDate: format(annualDueDate, "yyyy-MM-dd"),
    status: isPast(annualDueDate) ? "Overdue" : "Due",
    participants: "All + Child",
    completion: 0,
  })

  return schedules
}

const calculateDaysUntilDFPSDeadline = (reviewDate: string, currentDate: Date = new Date()): number => {
  const rDate = new Date(reviewDate)
  const deadlineDate = addDays(rDate, 15) // 15 business days, simplified to calendar days for this example
  return differenceInDays(deadlineDate, currentDate)
}

const initialFormData: ServicePlanReviewApprovalData = {
  currentReviewCycle: "",
  daysInPlacement: 0,
  nextRequiredReviewDate: "",
  overdueReviews: false,
  reviewScheduleMatrix: [],
  caseManagerReview: {
    serviceDeliveryAssessment: {
      servicesAsPlanned: "",
      serviceDetails: [],
      barriers: [],
      otherBarriers: "",
      modificationsNeeded: "",
    },
    childProgressSummary: {
      behavioralObservations: "",
      schoolPerformance: "",
      healthStatus: "",
      relationshipDevelopment: "",
      lifeSkillsProgress: "",
    },
  },
  fosterParentInput: {
    dailyLivingReport: {
      adjustmentRating: null,
      sleepPatterns: "",
      appetite: "",
      peerInteractions: "",
      followingHouseRules: "",
    },
    supportNeeds: {
      trainingNeeded: [],
      otherTrainingNeeded: "",
      respiteUtilization: "",
      clinicalSupportRequests: "",
      resourceNeeds: "",
      successes: "",
      concerns: "",
    },
  },
  treatmentTeamReview: {
    therapistSummary: "",
    medicationEffectiveness: "",
    crisisIncidentsAnalysis: "",
    therapeuticGoalProgress: "",
    recommendations: "",
    developmentalProgress: "",
    behavioralDataTrends: "",
    skillAcquisitionUpdates: "",
    supportLevelAdjustments: "",
    educationalTeamInput: "",
    // Substance Use specific fields
    recoveryStatus: "",
    matCompliance: "",
    relapsePrevention: "",
    treatmentEngagement: "",
    recoverySupports: "",
    // TFFC specific fields
    tffcCrisisPatternAnalysis: "",
    behavioralStability: "",
    therapyEngagement: "",
    stepDownReadiness: "",
    daysRemaining: 365,
  },
  programDirectorQuarterlyReview: {
    reviewType: "",
    daysUntilDFPSDeadline: 0,
    previousReviewDate: "",
    previousReviewFindings: "",
    writtenConfirmation: {
      statement: "",
      evidenceChecklist: [],
      specificExamples: {},
    },
    placementRecommendation: "",
    rationale: "",
    transitionTimeline: "",
    preparationNeeds: "",
  },
  childYouthVoice: {
    ageGroup: "",
    happySadScale: {
      lifeAreas: [
        { area: "School", rating: "" },
        { area: "Home", rating: "" },
        { area: "Friends", rating: "" },
      ],
    },
    whatsGoingWell: "",
    whatsHard: "",
    wishesForFuture: "",
    helperCompletedBy: "",
    satisfactionRatings: [
      { domain: "School", rating: null },
      { domain: "Home", rating: null },
      { domain: "Friends", rating: null },
    ],
    goalInputPreferences: "",
    concernsComplaintsProcess: "",
    participationPlanningPreference: "",
    normalcyActivities: [],
    selfAssessmentTools: "",
    transitionPlanningInput: "",
    independentLivingReadiness: "",
    consentForServices: null,
  },
  servicePlanGoals: [],
  complianceDocumentation: {
    dfpsSubmissionRequirements: [],
    submissionDetails: {
      caseworkerName: "",
      caseworkerEmail: "",
      dateSent: "",
      timeSent: "",
      method: "",
      confirmationNumber: "",
      responseReceived: "",
      responseDate: "",
    },
    signatures: {
      "30-day": {
        caseManager: { name: "", date: "" },
        fosterParent: { name: "", date: "" },
        supervisor: { name: "", date: "" },
      },
      "90-day": {
        programDirector: { name: "", date: "" },
        clinicalDirector: { name: "", date: "" },
        caseManager: { name: "", date: "" },
        fosterParent: { name: "", date: "" },
        youth: { name: "", date: "" },
      },
      Annual: {
        regionalDirector: { name: "", date: "" },
        casa: { name: "", date: "" },
        educationalAdvocate: { name: "", date: "" },
      },
    },
  },
  actionPlanningFollowUp: {
    immediateActionItems: [],
    servicePlanModifications: "",
    nextCaseManagerContact: "",
    nextFosterParentCheckIn: "",
    nextTreatmentTeamMeeting: "",
    specialReviewNeeded: null,
    specialReviewDate: "",
    specialReviewReason: "",
  },
  lastSaved: "",
  isApproved: false,
}

export default function ServicePlanReviewApproval({
  childData,
  sectionData,
  onUpdate,
  onValidationChange,
  viewMode = "edit",
  userRole,
}: ServicePlanReviewApprovalProps) {
  const [formData, setFormData] = useState<ServicePlanReviewApprovalData>(sectionData || initialFormData)
  const [completionProgress, setCompletionProgress] = useState(0)
  const [isValid, setIsValid] = useState(false)
  const { toast } = useToast()

  // Auto-save effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (JSON.stringify(formData) !== JSON.stringify(sectionData)) {
        onUpdate({ ...formData, lastSaved: new Date().toISOString() })
        toast({
          title: "Form Saved",
          description: `Last saved: ${format(new Date(), "MMM dd, yyyy HH:mm")}`,
        })
      }
    }, 10000) // Auto-save every 10 seconds

    return () => {
      clearTimeout(handler)
    }
  }, [formData, onUpdate, sectionData, toast])

  // Validation and Progress Calculation
  useEffect(() => {
    let completedFields = 0
    let totalFields = 0

    // Simplified validation for demonstration
    const validateField = (value: any) => {
      totalFields++
      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0) &&
        !(typeof value === "object" && Object.keys(value).length === 0)
      ) {
        completedFields++
        return true
      }
      return false
    }

    // Example validation for a few key fields
    validateField(formData.currentReviewCycle)
    validateField(formData.caseManagerReview.serviceDeliveryAssessment.servicesAsPlanned)
    validateField(formData.fosterParentInput.dailyLivingReport.adjustmentRating)
    if (userRole === "program_director" || userRole === "admin") {
      validateField(formData.programDirectorQuarterlyReview.writtenConfirmation.statement)
    }

    const currentIsValid = completedFields > totalFields * 0.5 // Example: 50% completion for valid
    setIsValid(currentIsValid)
    onValidationChange(currentIsValid)

    setCompletionProgress(Math.floor((completedFields / totalFields) * 100))
  }, [formData, onValidationChange, userRole])

  // Initial data setup and calculations
  useEffect(() => {
    const days = differenceInDays(new Date(), new Date(childData.placementDate))
    const reviewMatrix = calculateReviewSchedule(
      childData.placementDate,
      childData.servicePlanApprovalDate,
      formData.complianceDocumentation.submissionDetails.dateSent || childData.servicePlanApprovalDate,
    )
    const nextReview = reviewMatrix.find((r) => r.status === "Due") || reviewMatrix[0]
    const overdue = reviewMatrix.some((r) => r.status === "Overdue")

    setFormData((prev) => ({
      ...prev,
      daysInPlacement: days,
      reviewScheduleMatrix: reviewMatrix,
      nextRequiredReviewDate: nextReview ? nextReview.dueDate : "N/A",
      overdueReviews: overdue,
      programDirectorQuarterlyReview: {
        ...prev.programDirectorQuarterlyReview,
        daysUntilDFPSDeadline: calculateDaysUntilDFPSDeadline(
          prev.programDirectorQuarterlyReview.previousReviewDate || new Date().toISOString(),
        ),
      },
      childYouthVoice: {
        ...prev.childYouthVoice,
        ageGroup: childData.age >= 18 ? "18+" : childData.age >= 12 ? "12-17" : childData.age >= 6 ? "6-11" : "",
      },
    }))
  }, [
    childData,
    formData.complianceDocumentation.submissionDetails.dateSent,
    formData.programDirectorQuarterlyReview.previousReviewDate,
  ])

  const handleChange = useCallback((field: string, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const path = field.split(".")
      let current: any = newData
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {}
        current = current[path[i]]
      }
      current[path[path.length - 1]] = value
      return newData
    })
  }, [])

  const handleArrayChange = useCallback((field: string, item: string, isChecked: boolean) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const path = field.split(".")
      let current: any = newData
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {}
        current = current[path[i]]
      }
      const currentArray = current[path[path.length - 1]] || []
      if (isChecked) {
        current[path[path.length - 1]] = [...currentArray, item]
      } else {
        current[path[path.length - 1]] = currentArray.filter((i: string) => i !== item)
      }
      return newData
    })
  }, [])

  const handleGoalChange = useCallback((index: number, field: keyof ServicePlanGoal, value: any) => {
    setFormData((prev) => {
      const newGoals = [...prev.servicePlanGoals]
      newGoals[index] = { ...newGoals[index], [field]: value }
      return { ...prev, servicePlanGoals: newGoals }
    })
  }, [])

  const addGoal = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      servicePlanGoals: [
        ...prev.servicePlanGoals,
        {
          id: `goal-${prev.servicePlanGoals.length + 1}`,
          goal: "",
          baseline: "",
          current: "",
          progress: 0,
          status: "On Track",
          evidence: "",
          nextSteps: "",
          targetDate: "",
        },
      ],
    }))
  }, [])

  const removeGoal = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      servicePlanGoals: prev.servicePlanGoals.filter((_, i) => i !== index),
    }))
  }, [])

  const addActionItem = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      actionPlanningFollowUp: {
        ...prev.actionPlanningFollowUp,
        immediateActionItems: [
          ...prev.actionPlanningFollowUp.immediateActionItems,
          { action: "", responsibleParty: "", dueDate: "", priority: "" },
        ],
      },
    }))
  }, [])

  const removeActionItem = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      actionPlanningFollowUp: {
        ...prev.actionPlanningFollowUp,
        immediateActionItems: prev.actionPlanningFollowUp.immediateActionItems.filter((_, i) => i !== index),
      },
    }))
  }, [])

  const handleActionItemChange = useCallback(
    (
      index: number,
      field: keyof (typeof initialFormData.actionPlanningFollowUp.immediateActionItems)[0],
      value: any,
    ) => {
      setFormData((prev) => {
        const newItems = [...prev.actionPlanningFollowUp.immediateActionItems]
        newItems[index] = { ...newItems[index], [field]: value }
        return {
          ...prev,
          actionPlanningFollowUp: {
            ...prev.actionPlanningFollowUp,
            immediateActionItems: newItems,
          },
        }
      })
    },
    [],
  )

  const handleSubmit = useCallback(() => {
    if (isValid) {
      onUpdate({ ...formData, lastSaved: new Date().toISOString(), isApproved: true })
      toast({
        title: "Form Submitted",
        description: "Service Plan Review and Approval has been successfully submitted.",
        variant: "default",
      })
    } else {
      toast({
        title: "Submission Failed",
        description: "Please complete all required fields before submitting.",
        variant: "destructive",
      })
    }
  }, [formData, isValid, onUpdate, toast])

  /* eslint-disable react-hooks/exhaustive-deps */
  const renderField = useCallback(
    (
      label: string,
      value: any,
      onChange: (val: any) => void,
      type: "text" | "textarea" | "select" | "date" | "number" | "checkbox" | "radio" | "multiselect",
      options: { value: string; label: string }[] = [],
      placeholder = "",
      required = false,
      conditionalRender = true,
      fieldPath?: string,
    ) => {
      if (conditionalRender === false) return null

      // Fallback id when a path isn't provided
      const slugId =
        fieldPath ??
        label
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")

      const isInvalid =
        required &&
        (value === "" || value === null || (Array.isArray(value) && value.length === 0)) &&
        viewMode === "edit"

      return (
        <div className="grid gap-2" key={label}>
          <Label className={cn(required && isInvalid && "text-red-500")}>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          {viewMode === "edit" ? (
            <>
              {type === "text" && (
                <Input
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  className={cn(isInvalid && "border-red-500")}
                />
              )}
              {type === "textarea" && (
                <Textarea
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  className={cn(isInvalid && "border-red-500")}
                />
              )}
              {type === "select" && options && (
                <Select value={value || ""} onValueChange={onChange}>
                  <SelectTrigger className={cn(isInvalid && "border-red-500")}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {type === "date" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        isInvalid && "border-red-500",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={value ? new Date(value) : undefined}
                      onSelect={(date) => onChange(date ? format(date, "yyyy-MM-dd") : "")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
              {type === "number" && (
                <Input
                  type="number"
                  value={value || ""}
                  onChange={(e) => onChange(Number(e.target.value))}
                  placeholder={placeholder}
                  className={cn(isInvalid && "border-red-500")}
                />
              )}
              {type === "checkbox" && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={slugId}
                    checked={value}
                    onCheckedChange={onChange}
                    className={cn(isInvalid && "border-red-500")}
                  />
                  <Label htmlFor={slugId}>{placeholder}</Label>
                </div>
              )}
              {type === "radio" && options && (
                <RadioGroup value={value || ""} onValueChange={onChange} className={cn(isInvalid && "border-red-500")}>
                  {options.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={opt.value} id={`${slugId}-${opt.value}`} />
                      <Label htmlFor={`${slugId}-${opt.value}`}>{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              {type === "multiselect" && options && (
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <div key={opt.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${slugId}-${opt.value}`}
                        checked={value?.includes(opt.value)}
                        onCheckedChange={(checked) =>
                          handleArrayChange(fieldPath || label, opt.value, checked as boolean)
                        }
                      />
                      <Label htmlFor={`${slugId}-${opt.value}`}>{opt.label}</Label>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">
              {value instanceof Date ? format(value, "PPP") : Array.isArray(value) ? value.join(", ") : value || "N/A"}
            </p>
          )}
        </div>
      )
    },
    [viewMode, handleArrayChange],
  )

  const evidenceOptions = useMemo(
    () => [
      { value: "Behavioral improvements", label: "Behavioral improvements" },
      { value: "Educational progress", label: "Educational progress" },
      { value: "Mental health stability", label: "Mental health stability" },
      { value: "Family relationship improvements", label: "Family relationship improvements" },
      { value: "Decreased crisis incidents", label: "Decreased crisis incidents" },
      { value: "Improved CANS scores", label: "Improved CANS scores" },
      { value: "Meeting service plan goals", label: "Meeting service plan goals" },
      { value: "Therapeutic engagement", label: "Therapeutic engagement" },
      { value: "Developmental progress", label: "Developmental progress" },
      { value: "Other", label: "Other" },
    ],
    [],
  )

  const trainingNeededOptions = useMemo(
    () => [
      { value: "Trauma-Informed Care", label: "Trauma-Informed Care" },
      { value: "Behavior Management", label: "Behavior Management" },
      { value: "Attachment-Based Parenting", label: "Attachment-Based Parenting" },
      { value: "De-escalation Techniques", label: "De-escalation Techniques" },
      { value: "IDD/Autism Specific", label: "IDD/Autism Specific" },
      { value: "Medication Administration", label: "Medication Administration" },
      { value: "First Aid/CPR", label: "First Aid/CPR" },
      { value: "Other", label: "Other" },
    ],
    [],
  )

  const normalcyActivitiesOptions = useMemo(
    () => [
      { value: "Sports", label: "Sports" },
      { value: "Clubs", label: "Clubs" },
      { value: "Social Events", label: "Social Events" },
      { value: "Hobbies", label: "Hobbies" },
      { value: "Community Service", label: "Community Service" },
      { value: "Cultural Events", label: "Cultural Events" },
    ],
    [],
  )

  const isEditable = viewMode === "edit" && !formData.isApproved

  return (
    <Card className="w-full max-w-6xl mx-auto my-8 p-6 space-y-6 print:shadow-none print:border-0">
      <CardHeader className="print:hidden">
        <CardTitle className="text-3xl font-bold">Service Plan Review and Approval</CardTitle>
        <CardDescription>
          Comprehensive review and approval process for {childData.name}'s service plan.
        </CardDescription>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            Last Saved: {formData.lastSaved ? format(new Date(formData.lastSaved), "MMM dd, yyyy HH:mm") : "Never"}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => window.print()} className="gap-2 print:hidden">
              <Printer className="h-4 w-4" /> Print
            </Button>
            {viewMode === "edit" ? (
              <Button variant="outline" onClick={() => handleChange("viewMode", "view")} className="gap-2">
                <Eye className="h-4 w-4" /> View Mode
              </Button>
            ) : (
              <Button variant="outline" onClick={() => handleChange("viewMode", "edit")} className="gap-2">
                <Edit className="h-4 w-4" /> Edit Mode
              </Button>
            )}
          </div>
        </div>
        <Progress value={completionProgress} className="w-full mt-4" />
        <div className="text-right text-sm text-gray-600 mt-1">{completionProgress}% Complete</div>
        {!isValid && viewMode === "edit" && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Incomplete Form</AlertTitle>
            <AlertDescription>Please complete all required fields before final submission.</AlertDescription>
          </Alert>
        )}
        {formData.isApproved && (
          <Alert className="mt-4 bg-green-50 text-green-800 border-green-200">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Form Approved</AlertTitle>
            <AlertDescription>This service plan review has been approved and is locked for editing.</AlertDescription>
          </Alert>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Review Dashboard Header */}
        <div className="border p-4 rounded-lg bg-blue-50/50 print:border print:p-2">
          <h3 className="text-lg font-semibold mb-2">Review Status Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Current Review Cycle:</span>{" "}
              {renderField(
                "Current Review Cycle",
                formData.currentReviewCycle,
                (val) => handleChange("currentReviewCycle", val),
                "select",
                [
                  { value: "30-day", label: "30-day" },
                  { value: "90-day", label: "90-day" },
                  { value: "Annual", label: "Annual" },
                ],
                "Select Cycle",
                true,
              )}
            </div>
            <div>
              <span className="font-medium">Days in Placement:</span> {formData.daysInPlacement} days
            </div>
            <div>
              <span className="font-medium">Next Required Review:</span> {formData.nextRequiredReviewDate}{" "}
              {formData.nextRequiredReviewDate !== "N/A" &&
                `(${differenceInDays(new Date(formData.nextRequiredReviewDate), new Date())} days)`}
            </div>
            {formData.overdueReviews && (
              <div className="col-span-full">
                <Badge variant="destructive" className="gap-1">
                  <AlertCircle className="h-3 w-3" /> Overdue Reviews Present
                </Badge>
              </div>
            )}
          </div>

          <h4 className="text-md font-semibold mt-4 mb-2">Review Schedule Matrix</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Review Type</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Completion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.reviewScheduleMatrix.map((review) => (
                <TableRow key={review.type}>
                  <TableCell>{review.type}</TableCell>
                  <TableCell>{review.dueDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        review.status === "Overdue" ? "destructive" : review.status === "Due" ? "secondary" : "default"
                      }
                    >
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{review.participants}</TableCell>
                  <TableCell>
                    <Progress value={review.completion} className="w-[100px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Tabs defaultValue="scheduled-reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 print:hidden">
            <TabsTrigger value="scheduled-reviews">Scheduled Reviews</TabsTrigger>
            <TabsTrigger value="program-director">Program Director</TabsTrigger>
            <TabsTrigger value="treatment-team">Treatment Team</TabsTrigger>
            <TabsTrigger value="foster-parent">Foster Parent</TabsTrigger>
            <TabsTrigger value="child-youth">Child/Youth Voice</TabsTrigger>
          </TabsList>

          {/* Tab 1: Scheduled Reviews */}
          <TabsContent value="scheduled-reviews" className="space-y-6">
            <Card className="print:border print:p-2">
              <CardHeader>
                <CardTitle>Case Manager Review</CardTitle>
                <CardDescription>Assessment of service delivery and child progress.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h4 className="font-semibold">Service Delivery Assessment</h4>
                {renderField(
                  "Services being provided as planned?",
                  formData.caseManagerReview.serviceDeliveryAssessment.servicesAsPlanned,
                  (val) => handleChange("caseManagerReview.serviceDeliveryAssessment.servicesAsPlanned", val),
                  "select",
                  [
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                    { value: "Partial", label: "Partial" },
                  ],
                  "Select an option",
                  true,
                )}
                <div className="space-y-2">
                  <Label>Service Details (e.g., Frequency met? Provider feedback? Effectiveness?)</Label>
                  {formData.caseManagerReview.serviceDeliveryAssessment.serviceDetails.map((detail, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Service Name"
                        value={detail.serviceName}
                        onChange={(e) => {
                          const newDetails = [...formData.caseManagerReview.serviceDeliveryAssessment.serviceDetails]
                          newDetails[index].serviceName = e.target.value
                          handleChange("caseManagerReview.serviceDeliveryAssessment.serviceDetails", newDetails)
                        }}
                        disabled={!isEditable}
                      />
                      <Checkbox
                        checked={detail.frequencyMet || false}
                        onCheckedChange={(checked) => {
                          const newDetails = [...formData.caseManagerReview.serviceDeliveryAssessment.serviceDetails]
                          newDetails[index].frequencyMet = checked as boolean
                          handleChange("caseManagerReview.serviceDeliveryAssessment.serviceDetails", newDetails)
                        }}
                        disabled={!isEditable}
                      />
                      <Label>Frequency Met</Label>
                      <Input
                        placeholder="Provider Feedback"
                        value={detail.providerFeedback}
                        onChange={(e) => {
                          const newDetails = [...formData.caseManagerReview.serviceDeliveryAssessment.serviceDetails]
                          newDetails[index].providerFeedback = e.target.value
                          handleChange("caseManagerReview.serviceDeliveryAssessment.serviceDetails", newDetails)
                        }}
                        disabled={!isEditable}
                      />
                      <Input
                        placeholder="Effectiveness"
                        value={detail.effectiveness}
                        onChange={(e) => {
                          const newDetails = [...formData.caseManagerReview.serviceDeliveryAssessment.serviceDetails]
                          newDetails[index].effectiveness = e.target.value
                          handleChange("caseManagerReview.serviceDeliveryAssessment.serviceDetails", newDetails)
                        }}
                        disabled={!isEditable}
                      />
                      {isEditable && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newDetails =
                              formData.caseManagerReview.serviceDeliveryAssessment.serviceDetails.filter(
                                (_, i) => i !== index,
                              )
                            handleChange("caseManagerReview.serviceDeliveryAssessment.serviceDetails", newDetails)
                          }}
                        >
                          <MinusCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditable && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleChange("caseManagerReview.serviceDeliveryAssessment.serviceDetails", [
                          ...formData.caseManagerReview.serviceDeliveryAssessment.serviceDetails,
                          { serviceName: "", frequencyMet: null, providerFeedback: "", effectiveness: "" },
                        ])
                      }}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Service Detail
                    </Button>
                  )}
                </div>
                {renderField(
                  "Barriers to service delivery (checklist)",
                  formData.caseManagerReview.serviceDeliveryAssessment.barriers,
                  (val) => handleChange("caseManagerReview.serviceDeliveryAssessment.barriers", val),
                  "multiselect",
                  [
                    { value: "Transportation", label: "Transportation" },
                    { value: "Scheduling", label: "Scheduling" },
                    { value: "Child Resistance", label: "Child Resistance" },
                    { value: "Provider Availability", label: "Provider Availability" },
                    { value: "Other", label: "Other" },
                  ],
                  "",
                  false,
                  true,
                  "caseManagerReview.serviceDeliveryAssessment.barriers",
                )}
                {formData.caseManagerReview.serviceDeliveryAssessment.barriers.includes("Other") &&
                  renderField(
                    "Other Barriers (specify)",
                    formData.caseManagerReview.serviceDeliveryAssessment.otherBarriers,
                    (val) => handleChange("caseManagerReview.serviceDeliveryAssessment.otherBarriers", val),
                    "textarea",
                    [],
                    "Specify other barriers",
                  )}
                {renderField(
                  "Service modifications needed",
                  formData.caseManagerReview.serviceDeliveryAssessment.modificationsNeeded,
                  (val) => handleChange("caseManagerReview.serviceDeliveryAssessment.modificationsNeeded", val),
                  "textarea",
                  [],
                  "Describe any modifications needed",
                )}

                <h4 className="font-semibold mt-6">Child Progress Summary</h4>
                {renderField(
                  "Behavioral observations",
                  formData.caseManagerReview.childProgressSummary.behavioralObservations,
                  (val) => handleChange("caseManagerReview.childProgressSummary.behavioralObservations", val),
                  "textarea",
                  [],
                  "Describe behavioral observations",
                )}
                {renderField(
                  "School performance indicators",
                  formData.caseManagerReview.childProgressSummary.schoolPerformance,
                  (val) => handleChange("caseManagerReview.childProgressSummary.schoolPerformance", val),
                  "textarea",
                  [],
                  "Describe school performance",
                )}
                {renderField(
                  "Health status update",
                  formData.caseManagerReview.childProgressSummary.healthStatus,
                  (val) => handleChange("caseManagerReview.childProgressSummary.healthStatus", val),
                  "textarea",
                  [],
                  "Describe health status",
                )}
                {renderField(
                  "Relationship development",
                  formData.caseManagerReview.childProgressSummary.relationshipDevelopment,
                  (val) => handleChange("caseManagerReview.childProgressSummary.relationshipDevelopment", val),
                  "textarea",
                  [],
                  "Describe relationship development",
                )}
                {childData.age >= 6 &&
                  renderField(
                    "Life skills progress (if age-appropriate)",
                    formData.caseManagerReview.childProgressSummary.lifeSkillsProgress,
                    (val) => handleChange("caseManagerReview.childProgressSummary.lifeSkillsProgress", val),
                    "textarea",
                    [],
                    "Describe life skills progress",
                  )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Program Director Quarterly Review */}
          {(userRole === "program_director" || userRole === "admin") && (
            <TabsContent value="program-director" className="space-y-6">
              <Card className="print:border print:p-2">
                <CardHeader>
                  <CardTitle>Program Director Quarterly Review</CardTitle>
                  <CardDescription>Required review for DFPS submission.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {renderField(
                    "Review Type & Timing",
                    formData.programDirectorQuarterlyReview.reviewType,
                    (val) => handleChange("programDirectorQuarterlyReview.reviewType", val),
                    "select",
                    [
                      { value: "90-day", label: "90-day" },
                      { value: "180-day", label: "180-day" },
                      { value: "270-day", label: "270-day" },
                      { value: "Annual", label: "Annual" },
                    ],
                    "Select Review Type",
                    true,
                  )}
                  <div>
                    <span className="font-medium">Days until DFPS submission deadline:</span>{" "}
                    {formData.programDirectorQuarterlyReview.daysUntilDFPSDeadline} days
                    {formData.programDirectorQuarterlyReview.daysUntilDFPSDeadline <= 15 && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertCircle className="h-3 w-3 mr-1" /> Approaching Deadline!
                      </Badge>
                    )}
                  </div>
                  {renderField(
                    "Previous review reference date",
                    formData.programDirectorQuarterlyReview.previousReviewDate,
                    (val) => handleChange("programDirectorQuarterlyReview.previousReviewDate", val),
                    "date",
                    [],
                    "Select date",
                  )}
                  {renderField(
                    "Previous review key findings summary",
                    formData.programDirectorQuarterlyReview.previousReviewFindings,
                    (val) => handleChange("programDirectorQuarterlyReview.previousReviewFindings", val),
                    "textarea",
                    [],
                    "Summarize previous findings",
                  )}

                  <h4 className="font-semibold mt-6">Written Confirmation Section (Required)</h4>
                  {renderField(
                    "Confirmation Statement",
                    formData.programDirectorQuarterlyReview.writtenConfirmation.statement ||
                      `${childData.name} continues to meet criteria for and is benefitting from the T3C ${childData.packageType || "[Package Name]"} program as evidenced by:`,
                    (val) => handleChange("programDirectorQuarterlyReview.writtenConfirmation.statement", val),
                    "textarea",
                    [],
                    "Confirmation statement",
                    true,
                  )}
                  <div className="space-y-2">
                    <Label className="font-medium">Evidence Checklist (select at least 3 with specifics)</Label>
                    {evidenceOptions.map((option) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <Checkbox
                          id={`evidence-${option.value}`}
                          checked={formData.programDirectorQuarterlyReview.writtenConfirmation.evidenceChecklist.includes(
                            option.value,
                          )}
                          onCheckedChange={(checked) =>
                            handleArrayChange(
                              "programDirectorQuarterlyReview.writtenConfirmation.evidenceChecklist",
                              option.value,
                              checked as boolean,
                            )
                          }
                          disabled={!isEditable}
                        />
                        <Label htmlFor={`evidence-${option.value}`}>{option.label}</Label>
                        {formData.programDirectorQuarterlyReview.writtenConfirmation.evidenceChecklist.includes(
                          option.value,
                        ) && (
                          <Input
                            placeholder="Specific examples required"
                            value={
                              formData.programDirectorQuarterlyReview.writtenConfirmation.specificExamples[
                                option.value
                              ] || ""
                            }
                            onChange={(e) =>
                              handleChange(
                                `programDirectorQuarterlyReview.writtenConfirmation.specificExamples.${option.value}`,
                                e.target.value,
                              )
                            }
                            className="flex-1"
                            disabled={!isEditable}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {renderField(
                    "Evidence Checklist",
                    formData.programDirectorQuarterlyReview.writtenConfirmation.evidenceChecklist,
                    () => {},
                    "multiselect",
                    evidenceOptions,
                    "",
                    true,
                    true,
                    "programDirectorQuarterlyReview.writtenConfirmation.evidenceChecklist",
                  )}

                  <h4 className="font-semibold mt-6">Placement Recommendation</h4>
                  {renderField(
                    "Current placement remains appropriate?",
                    formData.programDirectorQuarterlyReview.placementRecommendation,
                    (val) => handleChange("programDirectorQuarterlyReview.placementRecommendation", val),
                    "radio",
                    [
                      { value: "continue-current", label: "Yes - Continue current plan" },
                      { value: "continue-modifications", label: "Yes - With modifications (specify)" },
                      { value: "step-down", label: "No - Step-down recommended" },
                      { value: "higher-level", label: "No - Higher level needed" },
                    ],
                    "",
                    true,
                  )}
                  {(formData.programDirectorQuarterlyReview.placementRecommendation === "continue-modifications" ||
                    formData.programDirectorQuarterlyReview.placementRecommendation === "step-down" ||
                    formData.programDirectorQuarterlyReview.placementRecommendation === "higher-level") &&
                    renderField(
                      "Rationale",
                      formData.programDirectorQuarterlyReview.rationale,
                      (val) => handleChange("programDirectorQuarterlyReview.rationale", val),
                      "textarea",
                      [],
                      "Provide rationale",
                      true,
                    )}
                  {(formData.programDirectorQuarterlyReview.placementRecommendation === "step-down" ||
                    formData.programDirectorQuarterlyReview.placementRecommendation === "higher-level") && (
                    <>
                      {renderField(
                        "Transition timeline",
                        formData.programDirectorQuarterlyReview.transitionTimeline,
                        (val) => handleChange("programDirectorQuarterlyReview.transitionTimeline", val),
                        "textarea",
                        [],
                        "Describe transition timeline",
                      )}
                      {renderField(
                        "Preparation needs",
                        formData.programDirectorQuarterlyReview.preparationNeeds,
                        (val) => handleChange("programDirectorQuarterlyReview.preparationNeeds", val),
                        "textarea",
                        [],
                        "Describe preparation needs",
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Tab 3: Treatment Team Reviews */}
          {(userRole === "clinical_director" || userRole === "admin") && (
            <TabsContent value="treatment-team" className="space-y-6">
              <Card className="print:border print:p-2">
                <CardHeader>
                  <CardTitle>Treatment Team Review</CardTitle>
                  <CardDescription>Package-specific clinical and developmental progress.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {childData.packageType === "mental-behavioral" && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">For Mental & Behavioral Health Package</h4>
                      {renderField(
                        "Therapist summary (structured template)",
                        formData.treatmentTeamReview.therapistSummary,
                        (val) => handleChange("treatmentTeamReview.therapistSummary", val),
                        "textarea",
                        [],
                        "Provide therapist summary",
                      )}
                      {renderField(
                        "Medication effectiveness (if applicable)",
                        formData.treatmentTeamReview.medicationEffectiveness,
                        (val) => handleChange("treatmentTeamReview.medicationEffectiveness", val),
                        "textarea",
                        [],
                        "Describe medication effectiveness",
                      )}
                      {renderField(
                        "Crisis incidents analysis",
                        formData.treatmentTeamReview.crisisIncidentsAnalysis,
                        (val) => handleChange("treatmentTeamReview.crisisIncidentsAnalysis", val),
                        "textarea",
                        [],
                        "Analyze crisis incidents",
                      )}
                      {renderField(
                        "Therapeutic goal progress",
                        formData.treatmentTeamReview.therapeuticGoalProgress,
                        (val) => handleChange("treatmentTeamReview.therapeuticGoalProgress", val),
                        "textarea",
                        [],
                        "Describe therapeutic goal progress",
                      )}
                      {renderField(
                        "Recommendations for next period",
                        formData.treatmentTeamReview.recommendations,
                        (val) => handleChange("treatmentTeamReview.recommendations", val),
                        "textarea",
                        [],
                        "Provide recommendations",
                      )}
                    </div>
                  )}

                  {childData.packageType === "idd-autism" && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">For IDD/Autism Package</h4>
                      {renderField(
                        "Developmental progress across domains",
                        formData.treatmentTeamReview.developmentalProgress,
                        (val) => handleChange("treatmentTeamReview.developmentalProgress", val),
                        "textarea",
                        [],
                        "Describe developmental progress",
                      )}
                      {renderField(
                        "Behavioral data trends",
                        formData.treatmentTeamReview.behavioralDataTrends,
                        (val) => handleChange("treatmentTeamReview.behavioralDataTrends", val),
                        "textarea",
                        [],
                        "Describe behavioral data trends",
                      )}
                      {renderField(
                        "Skill acquisition updates",
                        formData.treatmentTeamReview.skillAcquisitionUpdates,
                        (val) => handleChange("treatmentTeamReview.skillAcquisitionUpdates", val),
                        "textarea",
                        [],
                        "Provide skill acquisition updates",
                      )}
                      {renderField(
                        "Support level adjustments needed",
                        formData.treatmentTeamReview.supportLevelAdjustments,
                        (val) => handleChange("treatmentTeamReview.supportLevelAdjustments", val),
                        "textarea",
                        [],
                        "Describe support level adjustments",
                      )}
                      {renderField(
                        "Educational team input",
                        formData.treatmentTeamReview.educationalTeamInput,
                        (val) => handleChange("treatmentTeamReview.educationalTeamInput", val),
                        "textarea",
                        [],
                        "Summarize educational team input",
                      )}
                    </div>
                  )}

                  {childData.packageType === "substance-use" && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">For Substance Use Support Services</h4>
                      <Alert className="bg-amber-50 border-amber-200">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-amber-800">
                          Use recovery-focused, non-punitive language. Relapse is part of recovery for many.
                        </AlertDescription>
                      </Alert>
                      {renderField(
                        "Recovery Status",
                        formData.treatmentTeamReview.recoveryStatus,
                        (val) => handleChange("treatmentTeamReview.recoveryStatus", val),
                        "select",
                        [
                          { value: "stable", label: "Stable recovery - no use this period" },
                          { value: "challenges", label: "Recovery with challenges - maintained sobriety" },
                          { value: "relapse-reengaged", label: "Relapse occurred - re-engaged in treatment" },
                          { value: "active-concerns", label: "Active substance use concerns" },
                        ],
                        "Select recovery status",
                      )}
                      {renderField(
                        "MAT Compliance (if applicable)",
                        formData.treatmentTeamReview.matCompliance,
                        (val) => handleChange("treatmentTeamReview.matCompliance", val),
                        "select",
                        [
                          { value: "not-applicable", label: "Not on MAT" },
                          { value: "compliant", label: "On MAT - fully compliant" },
                          { value: "concerns", label: "On MAT - compliance concerns" },
                        ],
                        "Select MAT status",
                      )}
                      {renderField(
                        "Relapse Prevention Progress",
                        formData.treatmentTeamReview.relapsePrevention,
                        (val) => handleChange("treatmentTeamReview.relapsePrevention", val),
                        "textarea",
                        [],
                        "Describe progress on relapse prevention skills and plan",
                      )}
                      {renderField(
                        "Treatment Engagement",
                        formData.treatmentTeamReview.treatmentEngagement,
                        (val) => handleChange("treatmentTeamReview.treatmentEngagement", val),
                        "select",
                        [
                          { value: "consistent", label: "Consistent - attended all/most sessions" },
                          { value: "mostly", label: "Mostly consistent - occasional missed sessions" },
                          { value: "inconsistent", label: "Inconsistent - frequent missed sessions" },
                          { value: "not-engaged", label: "Not engaged in treatment" },
                        ],
                        "Select engagement level",
                      )}
                      {renderField(
                        "Recovery Supports",
                        formData.treatmentTeamReview.recoverySupports,
                        (val) => handleChange("treatmentTeamReview.recoverySupports", val),
                        "textarea",
                        [],
                        "Describe sober support network, meetings, sponsor involvement",
                      )}
                      {renderField(
                        "Recommendations for next period",
                        formData.treatmentTeamReview.recommendations,
                        (val) => handleChange("treatmentTeamReview.recommendations", val),
                        "textarea",
                        [],
                        "Provide recovery-focused recommendations",
                      )}
                    </div>
                  )}

                  {childData.packageType === "stass" && (
                    <div className="space-y-4">
                      <Alert className="bg-gray-100 border-gray-300">
                        <AlertCircle className="h-4 w-4 text-gray-600" />
                        <AlertTitle>STASS - Different Review Process</AlertTitle>
                        <AlertDescription>
                          Short-Term Assessment Support Services uses a different review process. STASS placements are 
                          time-limited (30-45 days) and focus on assessment rather than ongoing service plan reviews.
                          <br /><br />
                          <strong>Use these STASS-specific forms instead:</strong>
                          <ul className="list-disc ml-4 mt-2">
                            <li>STASS Assessment Progress Tracking</li>
                            <li>STASS Transition Planning</li>
                          </ul>
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  {childData.packageType === "tffc" && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">For Treatment Foster Family Care (60-Day Review)</h4>
                      <Alert className="bg-purple-50 border-purple-200">
                        <AlertCircle className="h-4 w-4 text-purple-600" />
                        <AlertDescription className="text-purple-800">
                          <strong>TFFC Requirements:</strong> Review cycle is 60 days (not 90). Maximum placement is 365 days. 
                          Step-down assessment and crisis pattern analysis are REQUIRED at every review.
                        </AlertDescription>
                      </Alert>
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <p className="text-sm font-medium text-purple-800">
                          Days Remaining in TFFC: {formData.treatmentTeamReview.daysRemaining || 365} of 365
                        </p>
                      </div>
                      {renderField(
                        "Crisis Pattern Analysis (REQUIRED)",
                        formData.treatmentTeamReview.tffcCrisisPatternAnalysis,
                        (val) => handleChange("treatmentTeamReview.tffcCrisisPatternAnalysis", val),
                        "textarea",
                        [],
                        "Describe crisis frequency trends, triggers, and intervention effectiveness per FC-TFFC-01",
                      )}
                      {renderField(
                        "Behavioral Stability Assessment",
                        formData.treatmentTeamReview.behavioralStability,
                        (val) => handleChange("treatmentTeamReview.behavioralStability", val),
                        "select",
                        [
                          { value: "significantly-improved", label: "Significantly improved" },
                          { value: "moderately-improved", label: "Moderately improved" },
                          { value: "stable", label: "Stable" },
                          { value: "some-regression", label: "Some regression" },
                          { value: "significant-concerns", label: "Significant concerns" },
                        ],
                        "Select stability level",
                      )}
                      {renderField(
                        "Therapy Engagement",
                        formData.treatmentTeamReview.therapyEngagement,
                        (val) => handleChange("treatmentTeamReview.therapyEngagement", val),
                        "select",
                        [
                          { value: "fully-engaged", label: "Fully engaged - consistent attendance and participation" },
                          { value: "mostly-engaged", label: "Mostly engaged - good participation with occasional challenges" },
                          { value: "partially-engaged", label: "Partially engaged - inconsistent" },
                          { value: "minimally-engaged", label: "Minimally engaged - significant barriers" },
                        ],
                        "Weekly minimum therapy required for TFFC",
                      )}
                      {renderField(
                        "Step-Down Readiness Assessment (REQUIRED)",
                        formData.treatmentTeamReview.stepDownReadiness,
                        (val) => handleChange("treatmentTeamReview.stepDownReadiness", val),
                        "select",
                        [
                          { value: "ready", label: "Ready for step-down - recommend transition planning" },
                          { value: "approaching", label: "Approaching readiness - continue 1-2 more review periods" },
                          { value: "not-ready", label: "Not ready - specific barriers identified" },
                          { value: "regression", label: "Regression noted - intensification may be needed" },
                        ],
                        "Step-down assessment required per T3C Blueprint",
                      )}
                      {renderField(
                        "On-Call Therapist Utilization",
                        formData.treatmentTeamReview.recommendations,
                        (val) => handleChange("treatmentTeamReview.recommendations", val),
                        "textarea",
                        [],
                        "Document On-Call Therapist consultations and recommendations for next period",
                      )}
                    </div>
                  )}

                  {(childData.packageType === "none" || childData.packageType === "basic") && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>No Package Type Selected</AlertTitle>
                      <AlertDescription>
                        Please select a package type for the child to enable package-specific treatment team review
                        sections.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Tab 4: Foster Parent Input */}
          {(userRole === "foster_parent" || userRole === "admin") && (
            <TabsContent value="foster-parent" className="space-y-6">
              <Card className="print:border print:p-2">
                <CardHeader>
                  <CardTitle>Foster Parent Input</CardTitle>
                  <CardDescription>Daily living report and support needs.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h4 className="font-semibold">Daily Living Report</h4>
                  {renderField(
                    "Child's adjustment rating (1-5 scale)",
                    formData.fosterParentInput.dailyLivingReport.adjustmentRating,
                    (val) => handleChange("fosterParentInput.dailyLivingReport.adjustmentRating", val),
                    "select",
                    Array.from({ length: 5 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) })),
                    "Select rating",
                    true,
                  )}
                  {renderField(
                    "Sleep patterns",
                    formData.fosterParentInput.dailyLivingReport.sleepPatterns,
                    (val) => handleChange("fosterParentInput.dailyLivingReport.sleepPatterns", val),
                    "select",
                    [
                      { value: "Improved", label: "Improved" },
                      { value: "Same", label: "Same" },
                      { value: "Worsened", label: "Worsened" },
                    ],
                    "Select status",
                  )}
                  {renderField(
                    "Appetite/eating",
                    formData.fosterParentInput.dailyLivingReport.appetite,
                    (val) => handleChange("fosterParentInput.dailyLivingReport.appetite", val),
                    "select",
                    [
                      { value: "Improved", label: "Improved" },
                      { value: "Same", label: "Same" },
                      { value: "Worsened", label: "Worsened" },
                    ],
                    "Select status",
                  )}
                  {renderField(
                    "Peer interactions",
                    formData.fosterParentInput.dailyLivingReport.peerInteractions,
                    (val) => handleChange("fosterParentInput.dailyLivingReport.peerInteractions", val),
                    "textarea",
                    [],
                    "Describe peer interactions",
                  )}
                  {renderField(
                    "Following house rules",
                    formData.fosterParentInput.dailyLivingReport.followingHouseRules,
                    (val) => handleChange("fosterParentInput.dailyLivingReport.followingHouseRules", val),
                    "textarea",
                    [],
                    "Describe adherence to house rules",
                  )}

                  <h4 className="font-semibold mt-6">Support Needs</h4>
                  {renderField(
                    "Additional training needed?",
                    formData.fosterParentInput.supportNeeds.trainingNeeded,
                    () => handleChange("fosterParentInput.supportNeeds.trainingNeeded", null),
                    "multiselect",
                    trainingNeededOptions,
                    "",
                    false,
                    true,
                    "fosterParentInput.supportNeeds.trainingNeeded",
                  )}
                  {formData.fosterParentInput.supportNeeds.trainingNeeded.includes("Other") &&
                    renderField(
                      "Other Training Needed (specify)",
                      formData.fosterParentInput.supportNeeds.otherTrainingNeeded,
                      (val) => handleChange("fosterParentInput.supportNeeds.otherTrainingNeeded", val),
                      "textarea",
                      [],
                      "Specify other training",
                    )}
                  {renderField(
                    "Respite utilization this period",
                    formData.fosterParentInput.supportNeeds.respiteUtilization,
                    (val) => handleChange("fosterParentInput.supportNeeds.respiteUtilization", val),
                    "textarea",
                    [],
                    "Describe respite utilization",
                  )}
                  {renderField(
                    "Clinical support requests",
                    formData.fosterParentInput.supportNeeds.clinicalSupportRequests,
                    (val) => handleChange("fosterParentInput.supportNeeds.clinicalSupportRequests", val),
                    "textarea",
                    [],
                    "Describe clinical support requests",
                  )}
                  {renderField(
                    "Resource needs",
                    formData.fosterParentInput.supportNeeds.resourceNeeds,
                    (val) => handleChange("fosterParentInput.supportNeeds.resourceNeeds", val),
                    "textarea",
                    [],
                    "Describe resource needs",
                  )}
                  {renderField(
                    "Successes to Celebrate",
                    formData.fosterParentInput.supportNeeds.successes,
                    (val) => handleChange("fosterParentInput.supportNeeds.successes", val),
                    "textarea",
                    [],
                    "Describe successes",
                  )}
                  {renderField(
                    "Concerns to Address",
                    formData.fosterParentInput.supportNeeds.concerns,
                    (val) => handleChange("fosterParentInput.supportNeeds.concerns", val),
                    "textarea",
                    [],
                    "Describe concerns",
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Tab 5: Child/Youth Voice */}
          {(userRole === "youth" || userRole === "admin") && (
            <TabsContent value="child-youth" className="space-y-6">
              <Card className="print:border print:p-2">
                <CardHeader>
                  <CardTitle>Child/Youth Voice</CardTitle>
                  <CardDescription>Age-appropriate input from the child/youth.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.childYouthVoice.ageGroup === "6-11" && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">For Ages 6-11</h4>
                      <div className="space-y-2">
                        <Label>Happy/sad face scale for different life areas</Label>
                        {formData.childYouthVoice.happySadScale.lifeAreas.map((item, index) => (
                          <div key={item.area} className="flex items-center gap-4">
                            <Label className="w-24">{item.area}:</Label>
                            {isEditable ? (
                              <RadioGroup
                                value={item.rating}
                                onValueChange={(val) => {
                                  const newAreas = [...formData.childYouthVoice.happySadScale.lifeAreas]
                                  newAreas[index].rating = val as "happy" | "sad" | "neutral"
                                  handleChange("childYouthVoice.happySadScale.lifeAreas", newAreas)
                                }}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="happy" id={`happy-${item.area}`} />
                                  <Label htmlFor={`happy-${item.area}`}>
                                    <Smile className="h-5 w-5 text-green-500" />
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="neutral" id={`neutral-${item.area}`} />
                                  <Label htmlFor={`neutral-${item.area}`}>
                                    <Meh className="h-5 w-5 text-yellow-500" />
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="sad" id={`sad-${item.area}`} />
                                  <Label htmlFor={`sad-${item.area}`}>
                                    <Frown className="h-5 w-5 text-red-500" />
                                  </Label>
                                </div>
                              </RadioGroup>
                            ) : (
                              <div className="flex items-center gap-2">
                                {item.rating === "happy" && <Smile className="h-5 w-5 text-green-500" />}
                                {item.rating === "neutral" && <Meh className="h-5 w-5 text-yellow-500" />}
                                {item.rating === "sad" && <Frown className="h-5 w-5 text-red-500" />}
                                {item.rating === "" && "N/A"}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {renderField(
                        "What's going well? (guided prompts)",
                        formData.childYouthVoice.whatsGoingWell,
                        (val) => handleChange("childYouthVoice.whatsGoingWell", val),
                        "textarea",
                        [],
                        "Describe what's going well",
                      )}
                      {renderField(
                        "What's hard? (guided prompts)",
                        formData.childYouthVoice.whatsHard,
                        (val) => handleChange("childYouthVoice.whatsHard", val),
                        "textarea",
                        [],
                        "Describe what's hard",
                      )}
                      {renderField(
                        "Wishes for the future",
                        formData.childYouthVoice.wishesForFuture,
                        (val) => handleChange("childYouthVoice.wishesForFuture", val),
                        "textarea",
                        [],
                        "Describe wishes for the future",
                      )}
                      {renderField(
                        "Helper to complete with child:",
                        formData.childYouthVoice.helperCompletedBy,
                        (val) => handleChange("childYouthVoice.helperCompletedBy", val),
                        "text",
                        [],
                        "Name of helper",
                      )}
                    </div>
                  )}

                  {formData.childYouthVoice.ageGroup === "12-17" && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">For Ages 12-17</h4>
                      <div className="space-y-2">
                        <Label>Satisfaction ratings across domains</Label>
                        {formData.childYouthVoice.satisfactionRatings.map((item, index) => (
                          <div key={item.domain} className="flex items-center gap-4">
                            <Label className="w-24">{item.domain}:</Label>
                            {renderField(
                              "",
                              item.rating,
                              (val) => {
                                const newRatings = [...formData.childYouthVoice.satisfactionRatings]
                                newRatings[index].rating = val
                                handleChange("childYouthVoice.satisfactionRatings", newRatings)
                              },
                              "select",
                              Array.from({ length: 5 }, (_, i) => ({ value: String(i + 1), label: String(i + 1) })),
                              "Select rating",
                            )}
                          </div>
                        ))}
                      </div>
                      {renderField(
                        "Goal input and preferences",
                        formData.childYouthVoice.goalInputPreferences,
                        (val) => handleChange("childYouthVoice.goalInputPreferences", val),
                        "textarea",
                        [],
                        "Describe goal input and preferences",
                      )}
                      {renderField(
                        "Concerns or complaints process",
                        formData.childYouthVoice.concernsComplaintsProcess,
                        (val) => handleChange("childYouthVoice.concernsComplaintsProcess", val),
                        "textarea",
                        [],
                        "Describe concerns or complaints process",
                      )}
                      {renderField(
                        "Participation in planning preference",
                        formData.childYouthVoice.participationPlanningPreference,
                        (val) => handleChange("childYouthVoice.participationPlanningPreference", val),
                        "textarea",
                        [],
                        "Describe participation preference",
                      )}
                      {renderField(
                        "Normalcy activities checklist",
                        formData.childYouthVoice.normalcyActivities,
                        () => handleChange("childYouthVoice.normalcyActivities", null),
                        "multiselect",
                        normalcyActivitiesOptions,
                        "",
                        false,
                        true,
                        "childYouthVoice.normalcyActivities",
                      )}
                    </div>
                  )}

                  {formData.childYouthVoice.ageGroup === "18+" && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">For Ages 18+ (Full Participant)</h4>
                      {renderField(
                        "Self-assessment tools",
                        formData.childYouthVoice.selfAssessmentTools,
                        (val) => handleChange("childYouthVoice.selfAssessmentTools", val),
                        "textarea",
                        [],
                        "Describe self-assessment tools used",
                      )}
                      {renderField(
                        "Transition planning input",
                        formData.childYouthVoice.transitionPlanningInput,
                        (val) => handleChange("childYouthVoice.transitionPlanningInput", val),
                        "textarea",
                        [],
                        "Describe transition planning input",
                      )}
                      {renderField(
                        "Independent living readiness",
                        formData.childYouthVoice.independentLivingReadiness,
                        (val) => handleChange("childYouthVoice.independentLivingReadiness", val),
                        "textarea",
                        [],
                        "Describe independent living readiness",
                      )}
                      {renderField(
                        "Consent for all services",
                        formData.childYouthVoice.consentForServices,
                        (val) => handleChange("childYouthVoice.consentForServices", val),
                        "checkbox",
                        [],
                        "Consent provided",
                      )}
                    </div>
                  )}
                  {formData.childYouthVoice.ageGroup === "" && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Child Age Not Set</AlertTitle>
                      <AlertDescription>
                        Please ensure the child's age is provided in `childData` to enable age-appropriate sections.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Service Plan Goal Review Matrix */}
        <Card className="print:border print:p-2">
          <CardHeader>
            <CardTitle>Service Plan Goal Review Matrix</CardTitle>
            <CardDescription>Track progress on service plan goals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Goal</TableHead>
                  <TableHead>Baseline</TableHead>
                  <TableHead>Current</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Evidence</TableHead>
                  <TableHead>Next Steps</TableHead>
                  <TableHead>Target Date</TableHead>
                  {isEditable && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.servicePlanGoals.map((goal, index) => (
                  <TableRow key={goal.id}>
                    <TableCell>
                      {renderField(
                        "",
                        goal.goal,
                        (val) => handleGoalChange(index, "goal", val),
                        "textarea",
                        [],
                        "Goal description",
                        true,
                      )}
                    </TableCell>
                    <TableCell>
                      {renderField(
                        "",
                        goal.baseline,
                        (val) => handleGoalChange(index, "baseline", val),
                        "text",
                        [],
                        "Baseline metric",
                        true,
                      )}
                    </TableCell>
                    <TableCell>
                      {renderField(
                        "",
                        goal.current,
                        (val) => handleGoalChange(index, "current", val),
                        "text",
                        [],
                        "Current metric",
                        true,
                      )}
                    </TableCell>
                    <TableCell>
                      {renderField(
                        "",
                        goal.progress,
                        (val) => handleGoalChange(index, "progress", val),
                        "number",
                        [],
                        "0-100",
                        true,
                      )}
                      <Progress value={goal.progress} className="w-[80px] mt-1" />
                    </TableCell>
                    <TableCell>
                      {renderField(
                        "",
                        goal.status,
                        (val) => handleGoalChange(index, "status", val),
                        "select",
                        [
                          { value: "On Track", label: "On Track" },
                          { value: "Delayed", label: "Delayed" },
                          { value: "Achieved", label: "Achieved" },
                        ],
                        "Select status",
                        true,
                      )}
                    </TableCell>
                    <TableCell>
                      {renderField(
                        "",
                        goal.evidence,
                        (val) => handleGoalChange(index, "evidence", val),
                        "textarea",
                        [],
                        "Evidence",
                        true,
                      )}
                    </TableCell>
                    <TableCell>
                      {renderField(
                        "",
                        goal.nextSteps,
                        (val) => handleGoalChange(index, "nextSteps", val),
                        "textarea",
                        [],
                        "Next steps",
                        true,
                      )}
                    </TableCell>
                    <TableCell>
                      {renderField(
                        "",
                        goal.targetDate,
                        (val) => handleGoalChange(index, "targetDate", val),
                        "date",
                        [],
                        "Target Date",
                        true,
                      )}
                    </TableCell>
                    {isEditable && (
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeGoal(index)}>
                          <MinusCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {isEditable && (
              <Button variant="outline" onClick={addGoal} className="mt-4 bg-transparent">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Goal
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Compliance & Documentation */}
        <Card className="print:border print:p-2">
          <CardHeader>
            <CardTitle>Compliance & Documentation</CardTitle>
            <CardDescription>DFPS notification tracking and multi-level signatures.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">DFPS Notification Tracking (for Quarterly Reviews)</h4>
            {renderField(
              "DFPS Submission Requirements",
              formData.complianceDocumentation.dfpsSubmissionRequirements,
              () => handleChange("complianceDocumentation.dfpsSubmissionRequirements", null),
              "multiselect",
              [
                {
                  value: "Written confirmation statement completed",
                  label: "Written confirmation statement completed",
                },
                { value: "Evidence documentation attached", label: "Evidence documentation attached" },
                { value: "All required signatures obtained", label: "All required signatures obtained" },
              ],
              "",
              false,
              true,
              "complianceDocumentation.dfpsSubmissionRequirements",
            )}
            <h5 className="font-medium mt-4">Submission Details</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField(
                "Caseworker Name",
                formData.complianceDocumentation.submissionDetails.caseworkerName,
                (val) => handleChange("complianceDocumentation.submissionDetails.caseworkerName", val),
                "text",
                [],
                "Caseworker Name",
              )}
              {renderField(
                "Caseworker Email",
                formData.complianceDocumentation.submissionDetails.caseworkerEmail,
                (val) => handleChange("complianceDocumentation.submissionDetails.caseworkerEmail", val),
                "text",
                [],
                "Caseworker Email",
              )}
              {renderField(
                "Date Sent",
                formData.complianceDocumentation.submissionDetails.dateSent,
                (val) => handleChange("complianceDocumentation.submissionDetails.dateSent", val),
                "date",
                [],
                "Select date",
              )}
              {renderField(
                "Time Sent",
                formData.complianceDocumentation.submissionDetails.timeSent,
                (val) => handleChange("complianceDocumentation.submissionDetails.timeSent", val),
                "text",
                [],
                "HH:MM",
              )}
              {renderField(
                "Method",
                formData.complianceDocumentation.submissionDetails.method,
                (val) => handleChange("complianceDocumentation.submissionDetails.method", val),
                "select",
                [
                  { value: "Email", label: "Email" },
                  { value: "Portal", label: "Portal" },
                  { value: "Certified Mail", label: "Certified Mail" },
                ],
                "Select method",
              )}
              {renderField(
                "Confirmation #",
                formData.complianceDocumentation.submissionDetails.confirmationNumber,
                (val) => handleChange("complianceDocumentation.submissionDetails.confirmationNumber", val),
                "text",
                [],
                "Confirmation Number",
              )}
              {renderField(
                "Response Received",
                formData.complianceDocumentation.submissionDetails.responseReceived,
                (val) => handleChange("complianceDocumentation.submissionDetails.responseReceived", val),
                "select",
                [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                  { value: "Pending", label: "Pending" },
                ],
                "Select status",
              )}
              {formData.complianceDocumentation.submissionDetails.responseReceived === "Yes" &&
                renderField(
                  "Response Date",
                  formData.complianceDocumentation.submissionDetails.responseDate,
                  (val) => handleChange("complianceDocumentation.submissionDetails.responseDate", val),
                  "date",
                  [],
                  "Select date",
                )}
            </div>

            <h4 className="font-semibold mt-6">Multi-Level Signatures</h4>
            <div className="space-y-4">
              <h5 className="font-medium">30-Day Review Signatures</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField(
                  "Case Manager Name",
                  formData.complianceDocumentation.signatures["30-day"].caseManager.name,
                  (val) => handleChange("complianceDocumentation.signatures.30-day.caseManager.name", val),
                  "text",
                  [],
                  "Name",
                )}
                {renderField(
                  "Case Manager Date",
                  formData.complianceDocumentation.signatures["30-day"].caseManager.date,
                  (val) => handleChange("complianceDocumentation.signatures.30-day.caseManager.date", val),
                  "date",
                  [],
                  "Date",
                )}
                {renderField(
                  "Foster Parent Name",
                  formData.complianceDocumentation.signatures["30-day"].fosterParent.name,
                  (val) => handleChange("complianceDocumentation.signatures.30-day.fosterParent.name", val),
                  "text",
                  [],
                  "Name",
                )}
                {renderField(
                  "Foster Parent Date",
                  formData.complianceDocumentation.signatures["30-day"].fosterParent.date,
                  (val) => handleChange("complianceDocumentation.signatures.30-day.fosterParent.date", val),
                  "date",
                  [],
                  "Date",
                )}
                {renderField(
                  "Supervisor Name",
                  formData.complianceDocumentation.signatures["30-day"].supervisor.name,
                  (val) => handleChange("complianceDocumentation.signatures.30-day.supervisor.name", val),
                  "text",
                  [],
                  "Name",
                )}
                {renderField(
                  "Supervisor Date",
                  formData.complianceDocumentation.signatures["30-day"].supervisor.date,
                  (val) => handleChange("complianceDocumentation.signatures.30-day.supervisor.date", val),
                  "date",
                  [],
                  "Date",
                )}
              </div>

              <h5 className="font-medium mt-4">90-Day/Quarterly Review Signatures</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField(
                  "Program Director Name",
                  formData.complianceDocumentation.signatures["90-day"].programDirector.name,
                  (val) => handleChange("complianceDocumentation.signatures.90-day.programDirector.name", val),
                  "text",
                  [],
                  "Name",
                  true,
                  userRole === "program_director" || userRole === "admin",
                )}
                {renderField(
                  "Program Director Date",
                  formData.complianceDocumentation.signatures["90-day"].programDirector.date,
                  (val) => handleChange("complianceDocumentation.signatures.90-day.programDirector.date", val),
                  "date",
                  [],
                  "Date",
                  true,
                  userRole === "program_director" || userRole === "admin",
                )}
                {(childData.packageType === "mental-behavioral" || childData.packageType === "idd-autism" || childData.packageType === "substance-use" || childData.packageType === "tffc") &&
                  (userRole === "clinical_director" || userRole === "admin") && (
                    <>
                      {renderField(
                        "Clinical Director Name",
                        formData.complianceDocumentation.signatures["90-day"].clinicalDirector.name,
                        (val) => handleChange("complianceDocumentation.signatures.90-day.clinicalDirector.name", val),
                        "text",
                        [],
                        "Name",
                      )}
                      {renderField(
                        "Clinical Director Date",
                        formData.complianceDocumentation.signatures["90-day"].clinicalDirector.date,
                        (val) => handleChange("complianceDocumentation.signatures.90-day.clinicalDirector.date", val),
                        "date",
                        [],
                        "Date",
                      )}
                    </>
                  )}
                {renderField(
                  "Case Manager Name",
                  formData.complianceDocumentation.signatures["90-day"].caseManager.name,
                  (val) => handleChange("complianceDocumentation.signatures.90-day.caseManager.name", val),
                  "text",
                  [],
                  "Name",
                )}
                {renderField(
                  "Case Manager Date",
                  formData.complianceDocumentation.signatures["90-day"].caseManager.date,
                  (val) => handleChange("complianceDocumentation.signatures.90-day.caseManager.date", val),
                  "date",
                  [],
                  "Date",
                )}
                {renderField(
                  "Foster Parent Name",
                  formData.complianceDocumentation.signatures["90-day"].fosterParent.name,
                  (val) => handleChange("complianceDocumentation.signatures.90-day.fosterParent.name", val),
                  "text",
                  [],
                  "Name",
                )}
                {renderField(
                  "Foster Parent Date",
                  formData.complianceDocumentation.signatures["90-day"].fosterParent.date,
                  (val) => handleChange("complianceDocumentation.signatures.90-day.fosterParent.date", val),
                  "date",
                  [],
                  "Date",
                )}
                {childData.age >= 14 && (
                  <>
                    {renderField(
                      "Youth Name",
                      formData.complianceDocumentation.signatures["90-day"].youth.name,
                      (val) => handleChange("complianceDocumentation.signatures.90-day.youth.name", val),
                      "text",
                      [],
                      "Name",
                    )}
                    {renderField(
                      "Youth Date",
                      formData.complianceDocumentation.signatures["90-day"].youth.date,
                      (val) => handleChange("complianceDocumentation.signatures.90-day.youth.date", val),
                      "date",
                      [],
                      "Date",
                    )}
                  </>
                )}
              </div>

              <h5 className="font-medium mt-4">Annual Review Signatures</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField(
                  "Regional Director Name",
                  formData.complianceDocumentation.signatures.Annual.regionalDirector.name,
                  (val) => handleChange("complianceDocumentation.signatures.Annual.regionalDirector.name", val),
                  "text",
                  [],
                  "Name",
                )}
                {renderField(
                  "Regional Director Date",
                  formData.complianceDocumentation.signatures.Annual.regionalDirector.date,
                  (val) => handleChange("complianceDocumentation.signatures.Annual.regionalDirector.date", val),
                  "date",
                  [],
                  "Date",
                )}
                {renderField(
                  "CASA Name (if assigned)",
                  formData.complianceDocumentation.signatures.Annual.casa.name,
                  (val) => handleChange("complianceDocumentation.signatures.Annual.casa.name", val),
                  "text",
                  [],
                  "Name",
                )}
                {renderField(
                  "CASA Date (if assigned)",
                  formData.complianceDocumentation.signatures.Annual.casa.date,
                  (val) => handleChange("complianceDocumentation.signatures.Annual.casa.date", val),
                  "date",
                  [],
                  "Date",
                )}
                {renderField(
                  "Educational Advocate Name",
                  formData.complianceDocumentation.signatures.Annual.educationalAdvocate.name,
                  (val) => handleChange("complianceDocumentation.signatures.Annual.educationalAdvocate.name", val),
                  "text",
                  [],
                  "Name",
                )}
                {renderField(
                  "Educational Advocate Date",
                  formData.complianceDocumentation.signatures.Annual.educationalAdvocate.date,
                  (val) => handleChange("complianceDocumentation.signatures.Annual.educationalAdvocate.date", val),
                  "date",
                  [],
                  "Date",
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Planning & Follow-Up */}
        <Card className="print:border print:p-2">
          <CardHeader>
            <CardTitle>Action Planning & Follow-Up</CardTitle>
            <CardDescription>Immediate actions and future planning.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <h4 className="font-semibold">Immediate Action Items</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Responsible Party</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  {isEditable && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.actionPlanningFollowUp.immediateActionItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {renderField(
                        "",
                        item.action,
                        (val) => handleActionItemChange(index, "action", val),
                        "textarea",
                        [],
                        "Action to be taken",
                        true,
                      )}
                    </TableCell>
                    <TableCell>
                      {renderField(
                        "",
                        item.responsibleParty,
                        (val) => handleActionItemChange(index, "responsibleParty", val),
                        "text",
                        [],
                        "Responsible Role",
                        true,
                      )}
                    </TableCell>
                    <TableCell>
                      {renderField(
                        "",
                        item.dueDate,
                        (val) => handleActionItemChange(index, "dueDate", val),
                        "date",
                        [],
                        "Due Date",
                        true,
                      )}
                    </TableCell>
                    <TableCell>
                      {renderField(
                        "",
                        item.priority,
                        (val) => handleActionItemChange(index, "priority", val),
                        "select",
                        [
                          { value: "High", label: "High" },
                          { value: "Medium", label: "Medium" },
                          { value: "Low", label: "Low" },
                        ],
                        "Select Priority",
                        true,
                      )}
                    </TableCell>
                    {isEditable && (
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeActionItem(index)}>
                          <MinusCircle className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {isEditable && (
              <Button variant="outline" onClick={addActionItem} className="mt-4 bg-transparent">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Action Item
              </Button>
            )}

            <h4 className="font-semibold mt-6">Service Plan Modifications</h4>
            {renderField(
              "Modifications needed?",
              formData.actionPlanningFollowUp.servicePlanModifications,
              (val) => handleChange("actionPlanningFollowUp.servicePlanModifications", val),
              "radio",
              [
                { value: "no-changes", label: "No changes needed - continue current plan" },
                { value: "minor-adjustments", label: "Minor adjustments (case manager approval)" },
                { value: "significant-changes", label: "Significant changes (treatment team approval)" },
                { value: "new-goals", label: "New goals added (full team approval)" },
                { value: "package-change", label: "Package change recommended (Program Director + DFPS)" },
              ],
              "",
              true,
            )}

            <h4 className="font-semibold mt-6">Follow-Up Schedule</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField(
                "Next case manager contact:",
                formData.actionPlanningFollowUp.nextCaseManagerContact,
                (val) => handleChange("actionPlanningFollowUp.nextCaseManagerContact", val),
                "date",
                [],
                "Select date",
              )}
              {renderField(
                "Next foster parent check-in:",
                formData.actionPlanningFollowUp.nextFosterParentCheckIn,
                (val) => handleChange("actionPlanningFollowUp.nextFosterParentCheckIn", val),
                "date",
                [],
                "Select date",
              )}
              {renderField(
                "Next treatment team meeting:",
                formData.actionPlanningFollowUp.nextTreatmentTeamMeeting,
                (val) => handleChange("actionPlanningFollowUp.nextTreatmentTeamMeeting", val),
                "date",
                [],
                "Select date",
              )}
              {renderField(
                "Special review if needed?",
                formData.actionPlanningFollowUp.specialReviewNeeded,
                (val) => handleChange("actionPlanningFollowUp.specialReviewNeeded", val),
                "checkbox",
                [],
                "Yes, special review needed",
              )}
              {formData.actionPlanningFollowUp.specialReviewNeeded && (
                <>
                  {renderField(
                    "Special review date:",
                    formData.actionPlanningFollowUp.specialReviewDate,
                    (val) => handleChange("actionPlanningFollowUp.specialReviewDate", val),
                    "date",
                    [],
                    "Select date",
                  )}
                  {renderField(
                    "Special review reason:",
                    formData.actionPlanningFollowUp.specialReviewReason,
                    (val) => handleChange("actionPlanningFollowUp.specialReviewReason", val),
                    "textarea",
                    [],
                    "Reason for special review",
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        {viewMode === "edit" && !formData.isApproved && (
          <div className="flex justify-end gap-4 print:hidden">
            <Button onClick={handleSubmit} disabled={!isValid} className="gap-2">
              <Save className="h-4 w-4" /> Submit Review
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
