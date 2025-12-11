"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CalendarIcon, Shield, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface FosterHomeCredentialingAssessmentProps {
  homeData?: {
    id: string
    familyName: string
    radiusId: string
  }
  sectionData?: any
  onUpdate?: (data: any) => void
  onValidationChange?: (isValid: boolean) => void
  viewMode?: "edit" | "view"
  userRole?: "admin" | "program_director" | "case_manager" | "foster_parent"
}

const initialFormData = {
  assessmentInfo: {
    familyName: "",
    radiusId: "",
    assessmentType: "", // Will be "Initial" or "Special Review"
    assessmentDate: null,
    assessors: "",
    previousAssessmentDate: null, // For special reviews or re-applications
  },
  basicEligibility: [
    { requirement: "DFPS License Current", status: false, verifiedDate: null, notes: "" },
    { requirement: "Background Checks Clear", status: false, verifiedDate: null, notes: "" },
    { requirement: "Medical Clearances Current", status: false, verifiedDate: null, notes: "" },
    { requirement: "Home Safety Inspection", status: false, verifiedDate: null, notes: "" },
    { requirement: "Financial Stability Verified", status: false, verifiedDate: null, notes: "" },
    { requirement: "Insurance Current", status: false, verifiedDate: null, notes: "" },
  ],
  trainingCompliance: {
    coreTraining: [
      { name: "PRIDE/Mini-PRIDE", initialDate: null, mostRecent: null, nextDue: null, status: "" },
      { name: "TBRI® Full Curriculum", initialDate: null, mostRecent: null, nextDue: null, status: "" },
      { name: "CPR/First Aid", initialDate: null, mostRecent: null, nextDue: null, status: "" },
      { name: "Medication Administration", initialDate: null, mostRecent: null, nextDue: null, status: "" },
      { name: "Emergency Behavior Intervention", initialDate: null, mostRecent: null, nextDue: null, status: "" },
      { name: "Normalcy Training", initialDate: null, mostRecent: null, nextDue: null, status: "" },
    ],
    annualHoursCompleted: "", // Could be for previous agency or initial hours
    trainingTopics: "",
  },
  tbriCompetency: {
    knowledgeAssessment: [
      { component: "Connecting Principles - Felt Safety", rating: "", evidence: "" },
      { component: "Connecting Principles - Healthy Touch", rating: "", evidence: "" },
      { component: "Connecting Principles - Life Value", rating: "", evidence: "" },
      { component: "Empowering Principles - Choices", rating: "", evidence: "" },
      { component: "Empowering Principles - Transitions", rating: "", evidence: "" },
      { component: "Empowering Principles - Teaching Life Skills", rating: "", evidence: "" },
      { component: "Correcting Principles - Proactive Strategies", rating: "", evidence: "" },
      { component: "Correcting Principles - Responsive Strategies", rating: "", evidence: "" },
      { component: "Correcting Principles - Setting Boundaries", rating: "", evidence: "" },
    ],
    practicalApplication: {
      demonstratesConsistentUse: false,
      showsImprovement: false, // Could be from previous foster care experience
      needsAdditionalCoaching: "",
    },
  },
  t3cBasicCredentialing: {
    serviceDeliveryCapabilities: [
      { area: "Understands trauma impacts", status: "", notes: "" },
      { area: "Committed to therapy participation", status: "", notes: "" },
      { area: "Maintains required documentation", status: "", notes: "" },
      { area: "Collaborates with team", status: "", notes: "" },
      { area: "Supports normalcy activities", status: "", notes: "" },
      { area: "24/7 availability demonstrated", status: "", notes: "" },
    ],
    placementHistory: {
      // Refers to prior foster care experience, not current agency placements
      numberOfPlacements: "",
      placementStabilityRate: "",
      unplannedDisruptions: "",
      successfullyReunifiedAdopted: "",
    },
    documentationQuality: "",
    comments: "",
  },
  specializedModules: {
    mentalBehavioralHealth: {
      selected: false,
      crisisManagement: [
        { skill: "De-escalation techniques", competency: "", evidence: "" },
        { skill: "Safety planning", competency: "", evidence: "" },
        { skill: "Medication management", competency: "", evidence: "" },
        { skill: "Crisis line utilization", competency: "", evidence: "" },
        { skill: "Therapeutic boundaries", competency: "", evidence: "" },
      ],
      additionalTraining: {
        mentalHealthFirstAid: null,
        cpiCrisisPrevention: null,
        traumaFocusedCBTOverview: null,
        psychotropicMedications: null,
      },
      placementOutcomes: {
        // Refers to prior experience
        crisisIncidentsManaged: "",
        hospitalizationsPrevented: "",
        therapyAttendanceRate: "",
      },
    },
    iddAutismSpectrumDisorder: {
      selected: false,
      specializedCapabilities: [
        { area: "Communication methods", competency: "", evidence: "" },
        { area: "Sensory accommodations", competency: "", evidence: "" },
        { area: "Structured routines", competency: "", evidence: "" },
        { area: "Medical procedures", competency: "", evidence: "" },
        { area: "Educational advocacy", competency: "", evidence: "" },
      ],
      additionalTraining: {
        autismAwareness: null,
        positiveBehaviorSupports: null,
        alternativeCommunication: null,
        sensoryProcessing: null,
      },
      placementOutcomes: {
        // Refers to prior experience
        iepMeetingsAttended: "",
        therapyAppointmentsKept: "",
        behavioralImprovementsNoted: "",
      },
    },
    respiteProvider: {
      selected: false,
      respiteCapabilities: {
        availability: [],
        packageCapabilities: [],
        geographicRange: "",
        capacity: "",
      },
      respiteTraining: {
        tbriEssentials: null,
        respiteOrientation: null,
        packageSpecificModulesCompleted: false,
      },
    },
  },
  qualityIndicators: {
    familyEngagement: {
      attendsSupportGroups: false,
      utilizesRespite: false,
      participatesInTraining: false,
      maintainsCommunication: false,
      advocatesEffectively: false,
    },
    areasOfStrength: "",
    areasForDevelopment: "",
  },
  credentialingDetermination: {
    t3cBasicFosterFamilyHome: "",
    additionalPackagesApproved: {
      mentalBehavioralHealth: false,
      iddAutismSpectrumDisorder: false,
      respiteProvider: false,
    },
    respitePackages: "",
    addOnServicesApproved: {
      transitionSupport: false,
      kinshipCaregiver: false,
    },
    conditionsImprovementsRequired: {
      none: false,
      completeTrainingBy: null,
      implementImprovementPlanFor: "",
      other: "",
    },
    nextReviewDate: null, // This would be the date for the *first* quarterly review
  },
  signatures: {
    homeDevelopmentDirector: { name: "", date: null },
    clinicalDirector: { name: "", date: null },
    programDirectorLcpaa: { name: "", date: null },
    fosterParent: { name: "", date: null },
    // Removed Program Director Written Confirmation and Copy provided to SSCC/DFPS
    // as these are for ongoing quarterly/annual reviews.
  },
}

const useEnhancedForm = (
  initialData: any,
  onUpdate: (data: any) => void,
  onValidationChange: (isValid: boolean) => void,
) => {
  const [formData, setFormData] = useState(initialData)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const validateField = useCallback((fieldPath: string, value: any) => {
    let error = ""
    // Basic validation: check if required fields are empty
    if (
      (fieldPath.includes("familyName") ||
        fieldPath.includes("radiusId") ||
        fieldPath.includes("assessmentType") ||
        fieldPath.includes("assessmentDate") ||
        fieldPath.includes("assessors")) &&
      !value
    ) {
      error = "This field is required."
    }
    // Add more specific validation rules here as needed
    setValidationErrors((prev) => ({ ...prev, [fieldPath]: error }))
    return error === ""
  }, [])

  const updateField = useCallback(
    (fieldPath: string, value: any) => {
      setFormData((prev: any) => {
        const newData = { ...prev }
        const pathParts = fieldPath.split(".")
        let current: any = newData
        for (let i = 0; i < pathParts.length - 1; i++) {
          if (!current[pathParts[i]]) {
            current[pathParts[i]] = {}
          }
          current = current[pathParts[i]]
        }
        current[pathParts[pathParts.length - 1]] = value
        return newData
      })
      validateField(fieldPath, value)
    },
    [validateField],
  )

  const calculateProgress = useCallback(() => {
    let completedFields = 0
    let totalFields = 0

    const countFields = (obj: any) => {
      for (const key in obj) {
        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key]) &&
          !(obj[key] instanceof Date)
        ) {
          countFields(obj[key])
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((item: any, index: number) => {
            if (typeof item === "object" && item !== null) {
              countFields(item)
            } else {
              totalFields++
              if (item !== "" && item !== null && item !== false) {
                completedFields++
              }
            }
          })
        } else {
          totalFields++
          if (obj[key] !== "" && obj[key] !== null && obj[key] !== false) {
            completedFields++
          }
        }
      }
    }

    countFields(formData)
    return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0
  }, [formData])

  const autoSave = useCallback(async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    onUpdate(formData)
    setLastSaved(new Date())
    setIsSaving(false)
  }, [formData, onUpdate])

  useEffect(() => {
    const handler = setTimeout(() => {
      autoSave()
    }, 2000) // Auto-save every 2 seconds of inactivity
    return () => clearTimeout(handler)
  }, [formData, autoSave])

  useEffect(() => {
    const isValid = Object.values(validationErrors).every((error) => error === "")
    onValidationChange(isValid)
  }, [validationErrors, onValidationChange])

  return { formData, updateField, isSaving, lastSaved, validationErrors, calculateProgress }
}

export function FosterHomeCredentialingAssessment({
  homeData,
  sectionData,
  onUpdate = () => {},
  onValidationChange = () => {},
  viewMode = "edit",
  userRole = "admin", // Default role for demonstration
}: FosterHomeCredentialingAssessmentProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const { formData, updateField, isSaving, lastSaved, validationErrors, calculateProgress } = useEnhancedForm(
    sectionData || {
      ...initialFormData,
      assessmentInfo: {
        ...initialFormData.assessmentInfo,
        familyName: homeData?.familyName || "",
        radiusId: homeData?.radiusId || "",
      },
    },
    onUpdate,
    onValidationChange,
  )

  const isViewMode = viewMode === "view"

  const renderField = (
    label: string,
    value: any,
    fieldPath: string,
    type: "text" | "date" | "textarea" | "checkbox" | "radio" | "select",
    options?: string[] | { value: string; label: string }[],
    placeholder?: string,
    required = false,
  ) => {
    const error = validationErrors[fieldPath]
    const isInvalid = required && !value && !isViewMode

    const commonProps = {
      id: fieldPath,
      value: value || "",
      onChange: (e: any) => updateField(fieldPath, e.target.value),
      disabled: isViewMode,
      className: cn(isInvalid && "border-red-500"),
    }

    if (isViewMode) {
      return (
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor={fieldPath}>{label}</Label>
          <div className="col-span-1 text-sm font-medium">
            {value instanceof Date ? format(value, "PPP") : value || "N/A"}
          </div>
        </div>
      )
    }

    switch (type) {
      case "text":
        return (
          <div className="space-y-1">
            <Label htmlFor={fieldPath}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input {...commonProps} placeholder={placeholder} />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
        )
      case "date":
        return (
          <div className="space-y-1">
            <Label htmlFor={fieldPath}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !value && "text-muted-foreground",
                    isInvalid && "border-red-500",
                  )}
                  disabled={isViewMode}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value ? format(value, "PPP") : <span>{placeholder || "Pick a date"}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={(date) => updateField(fieldPath, date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
        )
      case "textarea":
        return (
          <div className="space-y-1">
            <Label htmlFor={fieldPath}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea {...commonProps} placeholder={placeholder} />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
        )
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={fieldPath}
              checked={value}
              onCheckedChange={(checked) => updateField(fieldPath, checked)}
              disabled={isViewMode}
              className={cn(isInvalid && "border-red-500")}
            />
            <Label htmlFor={fieldPath}>{label}</Label>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
        )
      case "radio":
        return (
          <div className="space-y-2">
            <Label className={cn(isInvalid && "text-red-500")}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <RadioGroup
              value={value}
              onValueChange={(val) => updateField(fieldPath, val)}
              disabled={isViewMode}
              className="flex flex-wrap gap-4"
            >
              {options?.map((option) => (
                <div key={typeof option === "string" ? option : option.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={typeof option === "string" ? option : option.value}
                    id={`${fieldPath}-${typeof option === "string" ? option : option.value}`}
                  />
                  <Label htmlFor={`${fieldPath}-${typeof option === "string" ? option : option.value}`}>
                    {typeof option === "string" ? option : option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
        )
      case "select":
        return (
          <div className="space-y-1">
            <Label htmlFor={fieldPath}>
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Select value={value} onValueChange={(val) => updateField(fieldPath, val)} disabled={isViewMode}>
              <SelectTrigger className={cn(isInvalid && "border-red-500")}>
                <SelectValue placeholder={placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem
                    key={typeof option === "string" ? option : option.value}
                    value={typeof option === "string" ? option : option.value}
                  >
                    {typeof option === "string" ? option : option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
        )
      default:
        return null
    }
  }

  const renderTable = (
    data: any[],
    columns: {
      key: string
      label: string
      type: "text" | "date" | "select" | "checkbox" | "radio" | "textarea"
      options?: string[] | { value: string; label: string }[]
    }[],
    basePath: string,
  ) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th key={col.key} className="border p-2 text-left text-sm font-semibold">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="border p-2 align-top">
                    {isViewMode ? (
                      <div className="text-sm">
                        {col.type === "date" && row[col.key] instanceof Date
                          ? format(row[col.key], "PPP")
                          : col.type === "checkbox"
                            ? row[col.key]
                              ? "Yes"
                              : "No"
                            : row[col.key] || "N/A"}
                      </div>
                    ) : (
                      renderField(
                        "", // Label is handled by table header
                        row[col.key],
                        `${basePath}[${rowIndex}].${col.key}`,
                        col.type,
                        col.options,
                      )
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <Card className="w-full print:shadow-none print:border-0">
      <CardHeader className="pb-3 print:pb-0">
        <div className="flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle className="text-lg">
                Foster Family Home Initial Credentialing Assessment (FC-CRED-01)
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Initial screening and verification for foster family homes</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        <div className="hidden print:block text-center">
          <h1 className="text-xl font-bold">Foster Family Home Initial Credentialing Assessment (FC-CRED-01)</h1>
          <p className="text-sm">Refuge House, Inc.</p>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6 print:space-y-4">
          <div className="print:hidden">
            <Progress value={calculateProgress()} className="w-full" />
            <p className="text-right text-sm text-gray-500 mt-1">Completion: {calculateProgress()}%</p>
            {Object.values(validationErrors).some((error) => error !== "") && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Validation Error</AlertTitle>
                <AlertDescription>Please fill in all required fields.</AlertDescription>
              </Alert>
            )}
            {lastSaved && (
              <p className="text-right text-xs text-gray-500 mt-1">
                Last saved: {lastSaved.toLocaleTimeString()} {isSaving && "(Saving...)"}
              </p>
            )}
          </div>

          {/* ASSESSMENT INFORMATION */}
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold text-md mb-2">ASSESSMENT INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField(
                "Family Name",
                formData.assessmentInfo.familyName,
                "assessmentInfo.familyName",
                "text",
                undefined,
                "Enter family name",
                true,
              )}
              {renderField(
                "Radius ID",
                formData.assessmentInfo.radiusId,
                "assessmentInfo.radiusId",
                "text",
                undefined,
                "Enter Radius ID",
                true,
              )}
              {renderField(
                "Assessment Type",
                formData.assessmentInfo.assessmentType,
                "assessmentInfo.assessmentType",
                "radio",
                ["Initial", "Special Review"], // Only Initial and Special Review
                undefined,
                true,
              )}
              {renderField(
                "Assessment Date",
                formData.assessmentInfo.assessmentDate,
                "assessmentInfo.assessmentDate",
                "date",
                undefined,
                "Select date",
                true,
              )}
              {renderField(
                "Assessor(s)",
                formData.assessmentInfo.assessors,
                "assessmentInfo.assessors",
                "text",
                undefined,
                "Enter assessor names",
                true,
              )}
              {renderField(
                "Previous Assessment Date",
                formData.assessmentInfo.previousAssessmentDate,
                "assessmentInfo.previousAssessmentDate",
                "date",
                undefined,
                "Select date (for re-application or special review)",
              )}
            </div>
          </div>

          {/* SECTION 1: BASIC ELIGIBILITY VERIFICATION */}
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold text-md mb-2">SECTION 1: BASIC ELIGIBILITY VERIFICATION</h3>
            {renderTable(
              formData.basicEligibility,
              [
                { key: "requirement", label: "Requirement", type: "text" },
                { key: "status", label: "Status", type: "checkbox" },
                { key: "verifiedDate", label: "Verified Date", type: "date" },
                { key: "notes", label: "Notes", type: "textarea" },
              ],
              "basicEligibility",
            )}
          </div>

          {/* SECTION 2: TRAINING COMPLIANCE */}
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold text-md mb-2">SECTION 2: TRAINING COMPLIANCE</h3>
            <h4 className="font-medium mb-2">Core Training Requirements</h4>
            {renderTable(
              formData.trainingCompliance.coreTraining,
              [
                { key: "name", label: "Training", type: "text" },
                { key: "initialDate", label: "Initial Date", type: "date" },
                { key: "mostRecent", label: "Most Recent", type: "date" },
                { key: "nextDue", label: "Next Due", type: "date" },
                { key: "status", label: "Status", type: "select", options: ["Current", "Due"] },
              ],
              "trainingCompliance.coreTraining",
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {renderField(
                "Annual Training Hours Completed This Period (if applicable from previous agency)",
                formData.trainingCompliance.annualHoursCompleted,
                "trainingCompliance.annualHoursCompleted",
                "text",
                undefined,
                "Enter hours",
              )}
              {renderField(
                "Training Topics Completed (if applicable from previous agency)",
                formData.trainingCompliance.trainingTopics,
                "trainingCompliance.trainingTopics",
                "textarea",
                undefined,
                "List topics",
              )}
            </div>
          </div>

          {/* SECTION 3: TBRI® COMPETENCY ASSESSMENT */}
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold text-md mb-2">SECTION 3: TBRI® COMPETENCY ASSESSMENT</h3>
            <h4 className="font-medium mb-2">Knowledge Assessment (Rate 1-5: 1=Needs Development, 5=Expert)</h4>
            {renderTable(
              formData.tbriCompetency.knowledgeAssessment,
              [
                { key: "component", label: "Component", type: "text" },
                { key: "rating", label: "Rating", type: "select", options: ["1", "2", "3", "4", "5"] },
                { key: "evidence", label: "Evidence/Observation", type: "textarea" },
              ],
              "tbriCompetency.knowledgeAssessment",
            )}
            <h4 className="font-medium mt-4 mb-2">Practical Application</h4>
            <div className="space-y-2">
              {renderField(
                "Demonstrates consistent use in daily interactions",
                formData.tbriCompetency.practicalApplication.demonstratesConsistentUse,
                "tbriCompetency.practicalApplication.demonstratesConsistentUse",
                "checkbox",
              )}
              {renderField(
                "Shows improvement since last assessment (if applicable from previous experience)",
                formData.tbriCompetency.practicalApplication.showsImprovement,
                "tbriCompetency.practicalApplication.showsImprovement",
                "checkbox",
              )}
              {renderField(
                "Needs additional coaching in:",
                formData.tbriCompetency.practicalApplication.needsAdditionalCoaching,
                "tbriCompetency.practicalApplication.needsAdditionalCoaching",
                "textarea",
                undefined,
                "Specify areas",
              )}
            </div>
          </div>

          {/* SECTION 4: T3C BASIC CREDENTIALING */}
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold text-md mb-2">SECTION 4: T3C BASIC CREDENTIALING</h3>
            <h4 className="font-medium mb-2">Service Delivery Capabilities</h4>
            {renderTable(
              formData.t3cBasicCredentialing.serviceDeliveryCapabilities,
              [
                { key: "area", label: "Area", type: "text" },
                { key: "status", label: "Meets Standard", type: "radio", options: ["Yes", "No", "Developing"] },
                { key: "notes", label: "Notes", type: "textarea" },
              ],
              "t3cBasicCredentialing.serviceDeliveryCapabilities",
            )}
            <h4 className="font-medium mt-4 mb-2">
              Placement History (Past Period - from previous foster care experience)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField(
                "Number of Placements",
                formData.t3cBasicCredentialing.placementHistory.numberOfPlacements,
                "t3cBasicCredentialing.placementHistory.numberOfPlacements",
                "text",
              )}
              {renderField(
                "Placement Stability Rate (%)",
                formData.t3cBasicCredentialing.placementHistory.placementStabilityRate,
                "t3cBasicCredentialing.placementHistory.placementStabilityRate",
                "text",
              )}
              {renderField(
                "Unplanned Disruptions",
                formData.t3cBasicCredentialing.placementHistory.unplannedDisruptions,
                "t3cBasicCredentialing.placementHistory.unplannedDisruptions",
                "text",
              )}
              {renderField(
                "Successfully Reunified/Adopted",
                formData.t3cBasicCredentialing.placementHistory.successfullyReunifiedAdopted,
                "t3cBasicCredentialing.placementHistory.successfullyReunifiedAdopted",
                "text",
              )}
            </div>
            <h4 className="font-medium mt-4 mb-2">Documentation Quality</h4>
            {renderField(
              "Documentation Quality",
              formData.t3cBasicCredentialing.documentationQuality,
              "t3cBasicCredentialing.documentationQuality",
              "radio",
              ["Excellent", "Satisfactory", "Needs Improvement"],
            )}
            {renderField(
              "Comments",
              formData.t3cBasicCredentialing.comments,
              "t3cBasicCredentialing.comments",
              "textarea",
            )}
          </div>

          {/* SECTION 5: SPECIALIZED PACKAGE MODULES */}
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold text-md mb-2">SECTION 5: SPECIALIZED PACKAGE MODULES</h3>
            <div className="space-y-2">
              {renderField(
                "MENTAL & BEHAVIORAL HEALTH MODULE",
                formData.specializedModules.mentalBehavioralHealth.selected,
                "specializedModules.mentalBehavioralHealth.selected",
                "checkbox",
              )}
              {formData.specializedModules.mentalBehavioralHealth.selected && (
                <div className="ml-4 border-l pl-4 space-y-4">
                  <h4 className="font-medium mb-2">Crisis Management Capabilities</h4>
                  {renderTable(
                    formData.specializedModules.mentalBehavioralHealth.crisisManagement,
                    [
                      { key: "skill", label: "Skill Area", type: "text" },
                      {
                        key: "competency",
                        label: "Competency Level",
                        type: "select",
                        options: ["Basic", "Proficient", "Advanced"],
                      },
                      { key: "evidence", label: "Evidence", type: "textarea" },
                    ],
                    "specializedModules.mentalBehavioralHealth.crisisManagement",
                  )}
                  <h4 className="font-medium mt-4 mb-2">Additional MH Training</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderField(
                      "Mental Health First Aid (Date)",
                      formData.specializedModules.mentalBehavioralHealth.additionalTraining.mentalHealthFirstAid,
                      "specializedModules.mentalBehavioralHealth.additionalTraining.mentalHealthFirstAid",
                      "date",
                    )}
                    {renderField(
                      "CPI/Crisis Prevention (Date)",
                      formData.specializedModules.mentalBehavioralHealth.additionalTraining.cpiCrisisPrevention,
                      "specializedModules.mentalBehavioralHealth.additionalTraining.cpiCrisisPrevention",
                      "date",
                    )}
                    {renderField(
                      "Trauma-Focused CBT Overview (Date)",
                      formData.specializedModules.mentalBehavioralHealth.additionalTraining.traumaFocusedCBTOverview,
                      "specializedModules.mentalBehavioralHealth.additionalTraining.traumaFocusedCBTOverview",
                      "date",
                    )}
                    {renderField(
                      "Psychotropic Medications (Date)",
                      formData.specializedModules.mentalBehavioralHealth.additionalTraining.psychotropicMedications,
                      "specializedModules.mentalBehavioralHealth.additionalTraining.psychotropicMedications",
                      "date",
                    )}
                  </div>
                  <h4 className="font-medium mt-4 mb-2">MH Placement Outcomes (from previous experience)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderField(
                      "Crisis incidents managed",
                      formData.specializedModules.mentalBehavioralHealth.placementOutcomes.crisisIncidentsManaged,
                      "specializedModules.mentalBehavioralHealth.placementOutcomes.crisisIncidentsManaged",
                      "text",
                    )}
                    {renderField(
                      "Hospitalizations prevented",
                      formData.specializedModules.mentalBehavioralHealth.placementOutcomes.hospitalizationsPrevented,
                      "specializedModules.mentalBehavioralHealth.placementOutcomes.hospitalizationsPrevented",
                      "text",
                    )}
                    {renderField(
                      "Therapy attendance rate (%)",
                      formData.specializedModules.mentalBehavioralHealth.placementOutcomes.therapyAttendanceRate,
                      "specializedModules.mentalBehavioralHealth.placementOutcomes.therapyAttendanceRate",
                      "text",
                    )}
                  </div>
                </div>
              )}

              {renderField(
                "IDD/AUTISM SPECTRUM DISORDER MODULE",
                formData.specializedModules.iddAutismSpectrumDisorder.selected,
                "specializedModules.iddAutismSpectrumDisorder.selected",
                "checkbox",
              )}
              {formData.specializedModules.iddAutismSpectrumDisorder.selected && (
                <div className="ml-4 border-l pl-4 space-y-4">
                  <h4 className="font-medium mb-2">Specialized Capabilities</h4>
                  {renderTable(
                    formData.specializedModules.iddAutismSpectrumDisorder.specializedCapabilities,
                    [
                      { key: "area", label: "Area", type: "text" },
                      {
                        key: "competency",
                        label: "Competency Level",
                        type: "select",
                        options: ["Basic", "Proficient", "Advanced"],
                      },
                      { key: "evidence", label: "Evidence", type: "textarea" },
                    ],
                    "specializedModules.iddAutismSpectrumDisorder.specializedCapabilities",
                  )}
                  <h4 className="font-medium mt-4 mb-2">Additional IDD Training</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderField(
                      "Autism Awareness (Date)",
                      formData.specializedModules.iddAutismSpectrumDisorder.additionalTraining.autismAwareness,
                      "specializedModules.iddAutismSpectrumDisorder.additionalTraining.autismAwareness",
                      "date",
                    )}
                    {renderField(
                      "Positive Behavior Supports (Date)",
                      formData.specializedModules.iddAutismSpectrumDisorder.additionalTraining.positiveBehaviorSupports,
                      "specializedModules.iddAutismSpectrumDisorder.additionalTraining.positiveBehaviorSupports",
                      "date",
                    )}
                    {renderField(
                      "Alternative Communication (Date)",
                      formData.specializedModules.iddAutismSpectrumDisorder.additionalTraining.alternativeCommunication,
                      "specializedModules.iddAutismSpectrumDisorder.additionalTraining.alternativeCommunication",
                      "date",
                    )}
                    {renderField(
                      "Sensory Processing (Date)",
                      formData.specializedModules.iddAutismSpectrumDisorder.additionalTraining.sensoryProcessing,
                      "specializedModules.iddAutismSpectrumDisorder.additionalTraining.sensoryProcessing",
                      "date",
                    )}
                  </div>
                  <h4 className="font-medium mt-4 mb-2">IDD Placement Outcomes (from previous experience)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderField(
                      "IEP meetings attended",
                      formData.specializedModules.iddAutismSpectrumDisorder.placementOutcomes.iepMeetingsAttended,
                      "specializedModules.iddAutismSpectrumDisorder.placementOutcomes.iepMeetingsAttended",
                      "text",
                    )}
                    {renderField(
                      "Therapy appointments kept (%)",
                      formData.specializedModules.iddAutismSpectrumDisorder.placementOutcomes.therapyAppointmentsKept,
                      "specializedModules.iddAutismSpectrumDisorder.placementOutcomes.therapyAppointmentsKept",
                      "text",
                    )}
                    {renderField(
                      "Behavioral improvements noted",
                      formData.specializedModules.iddAutismSpectrumDisorder.placementOutcomes
                        .behavioralImprovementsNoted,
                      "specializedModules.iddAutismSpectrumDisorder.placementOutcomes.behavioralImprovementsNoted",
                      "radio",
                      ["Yes", "No"],
                    )}
                  </div>
                </div>
              )}

              {renderField(
                "RESPITE PROVIDER MODULE",
                formData.specializedModules.respiteProvider.selected,
                "specializedModules.respiteProvider.selected",
                "checkbox",
              )}
              {formData.specializedModules.respiteProvider.selected && (
                <div className="ml-4 border-l pl-4 space-y-4">
                  <h4 className="font-medium mb-2">Respite Capabilities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Availability</Label>
                      <div className="flex flex-wrap gap-2">
                        {["Weekends", "Weeknights", "Emergency", "Planned"].map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`respiteAvailability-${option}`}
                              checked={formData.specializedModules.respiteProvider.respiteCapabilities.availability.includes(
                                option,
                              )}
                              onCheckedChange={(checked) => {
                                const current =
                                  formData.specializedModules.respiteProvider.respiteCapabilities.availability
                                const newAvailability = checked
                                  ? [...current, option]
                                  : current.filter((item: string) => item !== option)
                                updateField(
                                  "specializedModules.respiteProvider.respiteCapabilities.availability",
                                  newAvailability,
                                )
                              }}
                              disabled={isViewMode}
                            />
                            <Label htmlFor={`respiteAvailability-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Package Capabilities</Label>
                      <div className="flex flex-wrap gap-2">
                        {["Basic", "MH", "IDD", "Medical"].map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`respitePackageCapabilities-${option}`}
                              checked={formData.specializedModules.respiteProvider.respiteCapabilities.packageCapabilities.includes(
                                option,
                              )}
                              onCheckedChange={(checked) => {
                                const current =
                                  formData.specializedModules.respiteProvider.respiteCapabilities.packageCapabilities
                                const newCapabilities = checked
                                  ? [...current, option]
                                  : current.filter((item: string) => item !== option)
                                updateField(
                                  "specializedModules.respiteProvider.respiteCapabilities.packageCapabilities",
                                  newCapabilities,
                                )
                              }}
                              disabled={isViewMode}
                            />
                            <Label htmlFor={`respitePackageCapabilities-${option}`}>{option}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    {renderField(
                      "Geographic Range",
                      formData.specializedModules.respiteProvider.respiteCapabilities.geographicRange,
                      "specializedModules.respiteProvider.respiteCapabilities.geographicRange",
                      "text",
                    )}
                    {renderField(
                      "Capacity (children simultaneously)",
                      formData.specializedModules.respiteProvider.respiteCapabilities.capacity,
                      "specializedModules.respiteProvider.respiteCapabilities.capacity",
                      "text",
                    )}
                  </div>
                  <h4 className="font-medium mt-4 mb-2">Respite Training (Abbreviated Track)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderField(
                      "TBRI® Essentials (8 hours) Date",
                      formData.specializedModules.respiteProvider.respiteTraining.tbriEssentials,
                      "specializedModules.respiteProvider.respiteTraining.tbriEssentials",
                      "date",
                    )}
                    {renderField(
                      "Respite Orientation (4 hours) Date",
                      formData.specializedModules.respiteProvider.respiteTraining.respiteOrientation,
                      "specializedModules.respiteProvider.respiteTraining.respiteOrientation",
                      "date",
                    )}
                    {renderField(
                      "Package-Specific Modules completed",
                      formData.specializedModules.respiteProvider.respiteTraining.packageSpecificModulesCompleted,
                      "specializedModules.respiteProvider.respiteTraining.packageSpecificModulesCompleted",
                      "checkbox",
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 6: QUALITY INDICATORS */}
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold text-md mb-2">SECTION 6: QUALITY INDICATORS</h3>
            <h4 className="font-medium mb-2">Family Engagement</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {renderField(
                "Attends support groups regularly",
                formData.qualityIndicators.familyEngagement.attendsSupportGroups,
                "qualityIndicators.familyEngagement.attendsSupportGroups",
                "checkbox",
              )}
              {renderField(
                "Utilizes respite appropriately",
                formData.qualityIndicators.familyEngagement.utilizesRespite,
                "qualityIndicators.familyEngagement.utilizesRespite",
                "checkbox",
              )}
              {renderField(
                "Participates in training opportunities",
                formData.qualityIndicators.familyEngagement.participatesInTraining,
                "qualityIndicators.familyEngagement.participatesInTraining",
                "checkbox",
              )}
              {renderField(
                "Maintains open communication",
                formData.qualityIndicators.familyEngagement.maintainsCommunication,
                "qualityIndicators.familyEngagement.maintainsCommunication",
                "checkbox",
              )}
              {renderField(
                "Advocates effectively for children",
                formData.qualityIndicators.familyEngagement.advocatesEffectively,
                "qualityIndicators.familyEngagement.advocatesEffectively",
                "checkbox",
              )}
            </div>
            {renderField(
              "Areas of Strength",
              formData.qualityIndicators.areasOfStrength,
              "qualityIndicators.areasOfStrength",
              "textarea",
            )}
            {renderField(
              "Areas for Development",
              formData.qualityIndicators.areasForDevelopment,
              "qualityIndicators.areasForDevelopment",
              "textarea",
            )}
          </div>

          {/* SECTION 7: CREDENTIALING DETERMINATION */}
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold text-md mb-2">SECTION 7: CREDENTIALING DETERMINATION</h3>
            <h4 className="font-medium mb-2">Current Period Recommendation</h4>
            {renderField(
              "T3C Basic Foster Family Home",
              formData.credentialingDetermination.t3cBasicFosterFamilyHome,
              "credentialingDetermination.t3cBasicFosterFamilyHome",
              "radio",
              ["Approved", "Conditional", "Not Approved"],
            )}
            <h4 className="font-medium mt-4 mb-2">Additional Packages Approved</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {renderField(
                "Mental & Behavioral Health Support Services",
                formData.credentialingDetermination.additionalPackagesApproved.mentalBehavioralHealth,
                "credentialingDetermination.additionalPackagesApproved.mentalBehavioralHealth",
                "checkbox",
              )}
              {renderField(
                "IDD/Autism Spectrum Disorder Support Services",
                formData.credentialingDetermination.additionalPackagesApproved.iddAutismSpectrumDisorder,
                "credentialingDetermination.additionalPackagesApproved.iddAutismSpectrumDisorder",
                "checkbox",
              )}
              {renderField(
                "Respite Provider",
                formData.credentialingDetermination.additionalPackagesApproved.respiteProvider,
                "credentialingDetermination.additionalPackagesApproved.respiteProvider",
                "checkbox",
              )}
            </div>
            {formData.credentialingDetermination.additionalPackagesApproved.respiteProvider &&
              renderField(
                "Respite Packages",
                formData.credentialingDetermination.respitePackages,
                "credentialingDetermination.respitePackages",
                "text",
                undefined,
                "Specify packages",
              )}
            <h4 className="font-medium mt-4 mb-2">Add-On Services Approved</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {renderField(
                "Transition Support Services",
                formData.credentialingDetermination.addOnServicesApproved.transitionSupport,
                "credentialingDetermination.addOnServicesApproved.transitionSupport",
                "checkbox",
              )}
              {renderField(
                "Kinship Caregiver Support Services",
                formData.credentialingDetermination.addOnServicesApproved.kinshipCaregiver,
                "credentialingDetermination.addOnServicesApproved.kinshipCaregiver",
                "checkbox",
              )}
            </div>
            <h4 className="font-medium mt-4 mb-2">Conditions/Improvements Required</h4>
            <div className="space-y-2">
              {renderField(
                "None",
                formData.credentialingDetermination.conditionsImprovementsRequired.none,
                "credentialingDetermination.conditionsImprovementsRequired.none",
                "checkbox",
              )}
              {!formData.credentialingDetermination.conditionsImprovementsRequired.none && (
                <>
                  {renderField(
                    "Complete training by",
                    formData.credentialingDetermination.conditionsImprovementsRequired.completeTrainingBy,
                    "credentialingDetermination.conditionsImprovementsRequired.completeTrainingBy",
                    "date",
                  )}
                  {renderField(
                    "Implement improvement plan for",
                    formData.credentialingDetermination.conditionsImprovementsRequired.implementImprovementPlanFor,
                    "credentialingDetermination.conditionsImprovementsRequired.implementImprovementPlanFor",
                    "textarea",
                  )}
                  {renderField(
                    "Other",
                    formData.credentialingDetermination.conditionsImprovementsRequired.other,
                    "credentialingDetermination.conditionsImprovementsRequired.other",
                    "textarea",
                  )}
                </>
              )}
            </div>
            {renderField(
              "Next Review Date (First Quarterly Review)",
              formData.credentialingDetermination.nextReviewDate,
              "credentialingDetermination.nextReviewDate",
              "date",
              undefined,
              "Select date",
              true,
            )}
          </div>

          {/* SECTION 8: SIGNATURES */}
          <div className="space-y-4 border p-4 rounded-lg">
            <h3 className="font-semibold text-md mb-2">SECTION 8: SIGNATURES</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderField(
                "Home Development Director Name",
                formData.signatures.homeDevelopmentDirector.name,
                "signatures.homeDevelopmentDirector.name",
                "text",
              )}
              {renderField(
                "Home Development Director Date",
                formData.signatures.homeDevelopmentDirector.date,
                "signatures.homeDevelopmentDirector.date",
                "date",
              )}
              {renderField(
                "Clinical Director (if applicable) Name",
                formData.signatures.clinicalDirector.name,
                "signatures.clinicalDirector.name",
                "text",
              )}
              {renderField(
                "Clinical Director (if applicable) Date",
                formData.signatures.clinicalDirector.date,
                "signatures.clinicalDirector.date",
                "date",
              )}
              {renderField(
                "Program Director/LCPAA Name",
                formData.signatures.programDirectorLcpaa.name,
                "signatures.programDirectorLcpaa.name",
                "text",
              )}
              {renderField(
                "Program Director/LCPAA Date",
                formData.signatures.programDirectorLcpaa.date,
                "signatures.programDirectorLcpaa.date",
                "date",
              )}
              {renderField(
                "Foster Parent(s) Name",
                formData.signatures.fosterParent.name,
                "signatures.fosterParent.name",
                "text",
              )}
              {renderField(
                "Foster Parent(s) Date",
                formData.signatures.fosterParent.date,
                "signatures.fosterParent.date",
                "date",
              )}
            </div>
            {/* Removed Program Director Written Confirmation and Copy provided to SSCC/DFPS */}
            {/* as these are for ongoing quarterly/annual reviews, not initial screening. */}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
