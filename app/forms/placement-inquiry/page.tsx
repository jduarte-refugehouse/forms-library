"use client"

import { useState, useEffect, useCallback } from "react"
import {
  AlertCircle,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  User,
  FileText,
  Home,
  ArrowLeft,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Brain,
  Heart,
  Stethoscope,
  AlertTriangle,
  Shield,
} from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function PlacementInquiryWorkflow() {
  // Sample data for testing
  const sampleData = {
    referralSource: "SSCC-Empower",
    method: "phone",
    agencyContact: {
      name: "Sarah Johnson",
      position: "Placement Coordinator",
      phone: "(512) 555-1234",
      email: "sjohnson@empower.org",
    },
    isEmergency: false,
    isSiblingGroup: true,
    willingToPlaceOutsideCredentials: false,
    children: [
      {
        id: 1,
        firstName: "James",
        lastName: "Smith",
        age: "14",
        gender: "male",
        dfpsId: "12345678",
        servicePackage: "mental-behavioral",
        addOnServices: {
          transition: true,
          kinship: false,
          pregnant: false,
        },
        mentalHealthDiagnoses: ["ADHD", "Anxiety Disorders"],
        currentMedications: "Adderall 10mg daily, Zoloft 25mg daily",
        therapyFrequency: "weekly",
        psychiatricHospitalizations: 1,
        crisisInterventions: 2,
        selfHarmRisk: "moderate",
        aggressionRisk: "low",
        iddDiagnosis: "",
        communicationMethod: "Verbal",
        adaptiveFunctioningLevel: "Minimal Support",
        medicalEquipment: [],
        sensoryNeeds: [],
      },
      {
        id: 2,
        firstName: "Emily",
        lastName: "Smith",
        age: "12",
        gender: "female",
        dfpsId: "87654321",
        servicePackage: "idd-autism",
        addOnServices: {
          transition: false,
          kinship: false,
          pregnant: false,
        },
        mentalHealthDiagnoses: [],
        currentMedications: "",
        therapyFrequency: "bi-weekly",
        psychiatricHospitalizations: 0,
        crisisInterventions: 0,
        selfHarmRisk: "none",
        aggressionRisk: "none",
        iddDiagnosis: "Autism Spectrum Disorder - Level 2",
        communicationMethod: "Limited Verbal",
        adaptiveFunctioningLevel: "Moderate Support",
        medicalEquipment: ["Communication Device"],
        sensoryNeeds: ["Quiet Environment", "Sensory Room"],
      },
    ],
  }

  const [currentStep, setCurrentStep] = useState("inquiry")
  const [navigationHistory, setNavigationHistory] = useState(["inquiry"])
  const [expandedChild, setExpandedChild] = useState(1)

  // Separate state for each section to prevent re-renders
  const [referralSource, setReferralSource] = useState("")
  const [method, setMethod] = useState("")
  const [agencyContact, setAgencyContact] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
  })
  const [isEmergency, setIsEmergency] = useState(false)
  const [isSiblingGroup, setIsSiblingGroup] = useState(false)
  const [willingToPlaceOutsideCredentials, setWillingToPlaceOutsideCredentials] = useState(false)
  const [children, setChildren] = useState([
    {
      id: 1,
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      dfpsId: "",
      servicePackage: "",
      addOnServices: {
        transition: false,
        kinship: false,
        pregnant: false,
      },
      // Mental & Behavioral Health fields
      mentalHealthDiagnoses: [],
      currentMedications: "",
      therapyFrequency: "",
      psychiatricHospitalizations: 0,
      crisisInterventions: 0,
      selfHarmRisk: "none",
      aggressionRisk: "none",
      // IDD/Autism fields
      iddDiagnosis: "",
      communicationMethod: "",
      adaptiveFunctioningLevel: "",
      medicalEquipment: [],
      sensoryNeeds: [],
    },
  ])

  const [inquiryId, setInquiryId] = useState("")
  const [timestamp, setTimestamp] = useState("")
  const [responseDeadline, setResponseDeadline] = useState("")
  const [status, setStatus] = useState("new")
  const [responseTime, setResponseTime] = useState(null)
  const [preScreenResult, setPreScreenResult] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [selectedPlacement, setSelectedPlacement] = useState(null)
  const [proposedPlacements, setProposedPlacements] = useState([])
  const [negotiationNotes, setNegotiationNotes] = useState("")

  // Cost optimization state
  const [documentFiles, setDocumentFiles] = useState([])
  const [costOptimization, setCostOptimization] = useState({
    estimatedCosts: {
      azure: 0,
      claude: 0,
      hybrid: 0,
    },
    budgetRemaining: 100,
    selectedService: "auto-route",
  })

  // Add these state variables after the existing ones
  const [showChildRegistration, setShowChildRegistration] = useState(false)
  const [registrationChildren, setRegistrationChildren] = useState([])
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const [selectedChildrenForPlacement, setSelectedChildrenForPlacement] = useState([])

  // Add approval checklist state
  const [approvalChecklist, setApprovalChecklist] = useState({
    familyContacted: false,
    detailsShared: false,
    transportationConfirmed: false,
    emergencyContactsExchanged: false,
    medicalNeedsCommunicated: false,
    schoolEnrollmentProvided: false,
    // Mental Health specific
    crisisPlanShared: false,
    caseManagerContactConfirmed: false,
    therapyScheduled: false,
    medicationManagementConfirmed: false,
    safetyPlanEstablished: false,
    // IDD/Autism specific
    communicationSupportsReady: false,
    environmentalAdaptationsConfirmed: false,
    rnConsultationScheduled: false,
    routineStructureShared: false,
    sensoryAccommodationsCommunicated: false,
  })

  const [approvalNotes, setApprovalNotes] = useState("")

  // All available service packages
  const servicePackages = [
    { value: "basic", label: "T3C Basic Foster Family Home" },
    { value: "substance-use", label: "Substance Use Support Services" },
    { value: "stass", label: "Short-Term Assessment Support Services (STASS)" },
    { value: "mental-behavioral", label: "Mental & Behavioral Health" },
    { value: "sexual-aggression", label: "Sexual Aggression/Sex Offender" },
    { value: "complex-medical", label: "Complex Medical Needs" },
    { value: "trafficking", label: "Human Trafficking Victim/Survivor" },
    { value: "idd-autism", label: "IDD/Autism Spectrum Disorder" },
    { value: "treatment-foster", label: "T3C Treatment Foster Family Care" },
  ]

  // Add-on services available
  const addOnServices = [
    { key: "transition", label: "Transition Support Services (14+)", ageRestriction: 14 },
    { key: "kinship", label: "Kinship Caregiver Support Services" },
    { key: "pregnant", label: "Pregnant & Parenting Youth" },
  ]

  // Mental Health diagnosis options
  const mentalHealthDiagnosesOptions = [
    "ADHD",
    "Anxiety Disorders",
    "Bipolar Disorder",
    "Conduct Disorder",
    "Depression",
    "PTSD",
    "Oppositional Defiant Disorder",
    "Autism Spectrum Disorder",
    "Reactive Attachment Disorder",
    "Other (specify in notes)",
  ]

  // Risk level options
  const riskLevels = ["none", "low", "moderate", "high"]

  // Therapy frequency options
  const therapyFrequencyOptions = ["none", "monthly", "bi-weekly", "weekly", "twice-weekly", "multiple-times-weekly"]

  // IDD diagnosis options
  const iddDiagnosisOptions = [
    "Intellectual Disability - Mild",
    "Intellectual Disability - Moderate",
    "Intellectual Disability - Severe",
    "Autism Spectrum Disorder - Level 1",
    "Autism Spectrum Disorder - Level 2",
    "Autism Spectrum Disorder - Level 3",
    "Down Syndrome",
    "Fetal Alcohol Spectrum Disorder",
    "Other (specify in notes)",
  ]

  // Communication method options
  const communicationMethods = [
    "Verbal",
    "Limited Verbal",
    "Non-verbal",
    "Sign Language",
    "Picture Exchange (PECS)",
    "AAC Device",
    "Other (specify in notes)",
  ]

  // Adaptive functioning levels
  const adaptiveFunctioningLevels = [
    "Independent",
    "Minimal Support",
    "Moderate Support",
    "Extensive Support",
    "Pervasive Support",
  ]

  // Medical equipment options
  const medicalEquipmentOptions = [
    "Wheelchair",
    "Walker",
    "Feeding Tube",
    "Oxygen Equipment",
    "Seizure Monitoring",
    "Communication Device",
    "Mobility Aids",
    "Other (specify in notes)",
  ]

  // Sensory needs options
  const sensoryNeedsOptions = [
    "Quiet Environment",
    "Sensory Room",
    "Weighted Items",
    "Noise Reduction",
    "Lighting Modifications",
    "Texture Accommodations",
    "Movement Breaks",
    "Other (specify in notes)",
  ]

  const loadSampleData = useCallback(() => {
    setReferralSource(sampleData.referralSource)
    setMethod(sampleData.method)
    setAgencyContact(sampleData.agencyContact)
    setIsEmergency(sampleData.isEmergency)
    setIsSiblingGroup(sampleData.isSiblingGroup)
    setWillingToPlaceOutsideCredentials(sampleData.willingToPlaceOutsideCredentials)
    setChildren(sampleData.children)
  }, [])

  // Calculate response deadline based on emergency status and business hours
  const calculateResponseDeadline = (isEmergency: boolean, timestamp: string) => {
    const inquiryTime = new Date(timestamp)
    const hour = inquiryTime.getHours()
    const day = inquiryTime.getDay()
    const isBusinessHours = hour >= 8 && hour < 17 && day >= 1 && day <= 5

    const deadline = new Date(inquiryTime)
    if (isBusinessHours) {
      deadline.setHours(deadline.getHours() + 2)
    } else {
      deadline.setHours(deadline.getHours() + 4)
    }

    return deadline.toLocaleString()
  }

  // Navigate to a step
  const navigateToStep = (step: string) => {
    setCurrentStep(step)
    setNavigationHistory([...navigationHistory, step])
  }

  // Go back to previous step
  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory]
      newHistory.pop()
      const previousStep = newHistory[newHistory.length - 1]
      setCurrentStep(previousStep)
      setNavigationHistory(newHistory)
    }
  }

  // Add a child to sibling group
  const addChild = () => {
    const newChild = {
      id: Date.now(),
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      dfpsId: "",
      servicePackage: "",
      addOnServices: {
        transition: false,
        kinship: false,
        pregnant: false,
      },
      // Mental & Behavioral Health fields
      mentalHealthDiagnoses: [],
      currentMedications: "",
      therapyFrequency: "",
      psychiatricHospitalizations: 0,
      crisisInterventions: 0,
      selfHarmRisk: "none",
      aggressionRisk: "none",
      // IDD/Autism fields
      iddDiagnosis: "",
      communicationMethod: "",
      adaptiveFunctioningLevel: "",
      medicalEquipment: [],
      sensoryNeeds: [],
    }
    setChildren([...children, newChild])
    setExpandedChild(newChild.id)
  }

  // Remove a child from sibling group
  const removeChild = (childId: number) => {
    if (children.length > 1) {
      setChildren(children.filter((child) => child.id !== childId))
    }
  }

  // Update child data
  const updateChild = useCallback((childId: number, field: string, value: string) => {
    setChildren((prevChildren) =>
      prevChildren.map((child) => (child.id === childId ? { ...child, [field]: value } : child)),
    )
  }, [])

  // Update child's add-on services
  const updateChildAddOn = useCallback((childId: number, service: string, value: boolean) => {
    setChildren((prevChildren) =>
      prevChildren.map((child) =>
        child.id === childId ? { ...child, addOnServices: { ...child.addOnServices, [service]: value } } : child,
      ),
    )
  }, [])

  // Update agency contact
  const updateAgencyContact = useCallback((field: string, value: string) => {
    setAgencyContact((prev) => ({ ...prev, [field]: value }))
  }, [])

  // Update child's mental health diagnoses
  const updateChildMentalHealthDiagnoses = useCallback((childId: number, diagnoses: string[]) => {
    setChildren((prevChildren) =>
      prevChildren.map((child) => (child.id === childId ? { ...child, mentalHealthDiagnoses: diagnoses } : child)),
    )
  }, [])

  // Update child's medical equipment
  const updateChildMedicalEquipment = useCallback((childId: number, equipment: string[]) => {
    setChildren((prevChildren) =>
      prevChildren.map((child) => (child.id === childId ? { ...child, medicalEquipment: equipment } : child)),
    )
  }, [])

  // Update child's sensory needs
  const updateChildSensoryNeeds = useCallback((childId: number, needs: string[]) => {
    setChildren((prevChildren) =>
      prevChildren.map((child) => (child.id === childId ? { ...child, sensoryNeeds: needs } : child)),
    )
  }, [])

  // Add helper function to update checklist items:
  const updateApprovalChecklist = useCallback((field: string, value: boolean) => {
    setApprovalChecklist((prev) => ({ ...prev, [field]: value }))
  }, [])

  // Timer to show elapsed time
  useEffect(() => {
    if (timestamp && status === "in-progress") {
      const timer = setInterval(() => {
        const elapsed = Date.now() - new Date(timestamp).getTime()
        const hours = Math.floor(elapsed / 3600000)
        const minutes = Math.floor((elapsed % 3600000) / 60000)
        setResponseTime(`${hours}h ${minutes}m`)
      }, 60000)

      return () => clearInterval(timer)
    }
  }, [timestamp, status])

  const navigateToPlacement = (childData) => {
    // Add unique ID for this child
    const childRecord = {
      ...childData,
      placementId: `PL-${new Date().toISOString().split("T")[0]}-${Math.random().toString(36).substr(2, 9)}`,
      inquiryId: inquiryId,
      registeredAt: new Date().toISOString(),
    }

    // Store in localStorage
    localStorage.setItem("currentPlacementChild", JSON.stringify(childRecord))

    // Navigate to placement workflow
    window.location.href = `/forms/placement-workflow?childId=${childData.dfpsId}&inquiryId=${inquiryId}`
  }

  const handleFinalResponse = (accepted: boolean) => {
    setStatus(accepted ? "placed" : "declined")
    if (accepted) {
      // Initialize registration with existing child data - properly extract all fields
      const childrenForRegistration = children.map((child, index) => {
        // Calculate date of birth from age if available
        let estimatedDob = ""
        if (child.age) {
          const currentYear = new Date().getFullYear()
          const birthYear = currentYear - Number.parseInt(child.age)
          estimatedDob = `${birthYear}-01-01` // Default to January 1st
        }

        return {
          id: child.id,
          firstName: child.firstName || "",
          lastName: child.lastName || "",
          dob: estimatedDob, // Estimated from age, can be corrected during registration
          dfpsId: child.dfpsId || "", // Transfer existing Person ID if available
          gender: child.gender ? child.gender.charAt(0).toUpperCase() + child.gender.slice(1) : "",
          age: child.age || "",
          placementType: isEmergency ? "emergency" : "routine",
          servicePackage: child.servicePackage
            ? servicePackages.find((pkg) => pkg.value === child.servicePackage)?.label || ""
            : "",
          addOnServices: Object.keys(child.addOnServices || {})
            .filter((key) => child.addOnServices[key])
            .map((key) => addOnServices.find((service) => service.key === key)?.label || key),
          caseManager: "",
          fosterFamily: selectedPlacement?.family || "",
          originalChildData: child,
          selected: true, // Initially all children are selected for placement
        }
      })

      setRegistrationChildren(childrenForRegistration)
      setSelectedChildrenForPlacement(childrenForRegistration.map((child) => child.id))
      setShowChildRegistration(true)
    } else {
      navigateToStep("complete")
    }
  }

  const initializeAllPlacements = () => {
    const selectedChildren = registrationChildren.filter((child) => selectedChildrenForPlacement.includes(child.id))

    // Store all children data in localStorage
    const allChildrenRecords = selectedChildren.map((child) => ({
      ...child,
      placementId: `PL-${new Date().toISOString().split("T")[0]}-${Math.random().toString(36).substr(2, 9)}`,
      inquiryId: inquiryId,
      registeredAt: new Date().toISOString(),
    }))

    localStorage.setItem("allPlacementChildren", JSON.stringify(allChildrenRecords))
    localStorage.setItem("bulkProcessing", "true")

    // Navigate to first child's placement workflow
    if (allChildrenRecords.length > 0) {
      window.location.href = `/forms/placement-workflow?childId=${allChildrenRecords[0].dfpsId}&inquiryId=${inquiryId}`
    }
  }

  const handleInquirySubmit = () => {
    const now = new Date().toISOString()
    const id = `INQ-${Date.now()}`
    setInquiryId(id)
    setTimestamp(now)
    setResponseDeadline(calculateResponseDeadline(isEmergency, now))
    setStatus("in-progress")
    navigateToStep("prescreen")
  }

  const handlePreScreen = (result: { canAccommodate: boolean }) => {
    setPreScreenResult(result)
    if (result.canAccommodate) {
      navigateToStep("search")
    } else {
      navigateToStep("decline")
    }
  }

  const handleSearch = (results: any[]) => {
    setSearchResults(results)
    if (results.length > 0) {
      navigateToStep("match")
    } else {
      navigateToStep("decline")
    }
  }

  const handleAddToProposal = (placement: any) => {
    if (!proposedPlacements.find((p) => p.family === placement.family)) {
      setProposedPlacements([...proposedPlacements, placement])
    }
  }

  const handleRemoveFromProposal = (family: string) => {
    setProposedPlacements(proposedPlacements.filter((p) => p.family !== family))
  }

  const handleSubmitProposal = () => {
    navigateToStep("negotiate")
  }

  const handleNegotiationComplete = (accepted: boolean, placement: any = null) => {
    if (accepted && placement) {
      setSelectedPlacement(placement)
      navigateToStep("approve")
    } else if (!accepted) {
      navigateToStep("search")
    }
  }

  const handlePlacementSelection = (placement: any) => {
    setSelectedPlacement(placement)
    navigateToStep("approve")
  }

  const resetForm = () => {
    setCurrentStep("inquiry")
    setNavigationHistory(["inquiry"])
    setReferralSource("")
    setMethod("")
    setAgencyContact({
      name: "",
      position: "",
      phone: "",
      email: "",
    })
    setIsEmergency(false)
    setIsSiblingGroup(false)
    setWillingToPlaceOutsideCredentials(false)
    setChildren([
      {
        id: 1,
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        dfpsId: "",
        servicePackage: "",
        addOnServices: {
          transition: false,
          kinship: false,
          pregnant: false,
        },
        // Mental & Behavioral Health fields
        mentalHealthDiagnoses: [],
        currentMedications: "",
        therapyFrequency: "",
        psychiatricHospitalizations: 0,
        crisisInterventions: 0,
        selfHarmRisk: "none",
        aggressionRisk: "none",
        // IDD/Autism fields
        iddDiagnosis: "",
        communicationMethod: "",
        adaptiveFunctioningLevel: "",
        medicalEquipment: [],
        sensoryNeeds: [],
      },
    ])
    setInquiryId("")
    setTimestamp("")
    setResponseDeadline("")
    setStatus("new")
    setResponseTime(null)
    setProposedPlacements([])
    setNegotiationNotes("")
    setExpandedChild(1)
    setApprovalChecklist({
      familyContacted: false,
      detailsShared: false,
      transportationConfirmed: false,
      emergencyContactsExchanged: false,
      medicalNeedsCommunicated: false,
      schoolEnrollmentProvided: false,
      crisisPlanShared: false,
      caseManagerContactConfirmed: false,
      therapyScheduled: false,
      medicationManagementConfirmed: false,
      safetyPlanEstablished: false,
      communicationSupportsReady: false,
      environmentalAdaptationsConfirmed: false,
      rnConsultationScheduled: false,
      routineStructureShared: false,
      sensoryAccommodationsCommunicated: false,
    })
    setApprovalNotes("")
  }

  // Cost optimization helper functions
  const estimateProcessingCost = useCallback((files, service) => {
    if (!files || files.length === 0) return 0

    let totalCost = 0
    files.forEach((file) => {
      const pages = Math.ceil(file.size / 50000) // Estimate pages based on file size
      switch (service) {
        case "azure":
          totalCost += pages * 0.01 // $0.01 per page
          break
        case "claude":
          const complexity = file.size > 100000 ? 0.03 : 0.01 // $0.01-0.03 per document
          totalCost += complexity
          break
        case "hybrid":
          const azureCost = pages * 0.01
          const claudeCost = file.size > 100000 ? 0.03 : 0.01
          totalCost += (azureCost + claudeCost) * 1.1 // 10% overhead
          break
        case "auto-route":
          totalCost += estimateProcessingCost([file], recommendOptimalService(file))
          break
      }
    })

    return Math.round(totalCost * 100) / 100 // Round to 2 decimal places
  }, [])

  const recommendOptimalService = useCallback((file) => {
    const pages = Math.ceil(file.size / 50000)
    const isStructured = file.name.includes("form") || file.name.includes("application")
    const isNarrative = file.name.includes("report") || file.name.includes("assessment")

    // Smart routing logic
    if (pages < 2 && isStructured) return "azure"
    if (isNarrative && !isStructured) return "claude"
    if (pages > 5) return "hybrid"
    return "azure" // Default fallback
  }, [])

  const shouldUseHybrid = useCallback((documentComplexity, budgetRemaining) => {
    const hybridThreshold = 0.75 // Use hybrid if complexity > 75%
    const budgetThreshold = 10 // Need at least $10 remaining for hybrid
    return documentComplexity > hybridThreshold && budgetRemaining >= budgetThreshold
  }, [])

  const updateCostEstimates = useCallback(() => {
    if (documentFiles.length === 0) return

    const estimates = {
      azure: estimateProcessingCost(documentFiles, "azure"),
      claude: estimateProcessingCost(documentFiles, "claude"),
      hybrid: estimateProcessingCost(documentFiles, "hybrid"),
    }

    setCostOptimization((prev) => ({
      ...prev,
      estimatedCosts: estimates,
    }))
  }, [documentFiles, estimateProcessingCost, setCostOptimization])

  // Breadcrumb navigation
  const Breadcrumbs = () => {
    const steps = [
      { id: "inquiry", label: "Inquiry", icon: Phone },
      { id: "prescreen", label: "Pre-Screen", icon: FileText },
      { id: "search", label: "Search", icon: Search },
      { id: "match", label: "Match", icon: Home },
      { id: "negotiate", label: "Negotiate", icon: MessageSquare },
      { id: "approve", label: "Approve", icon: User },
      { id: "complete", label: "Complete", icon: CheckCircle },
    ]

    const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {currentStep !== "inquiry" && (
            <button onClick={goBack} className="flex items-center text-blue-600 hover:text-blue-800 mr-4">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
          )}
          <div className="flex-1">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = navigationHistory.includes(step.id)
                const isCurrent = step.id === currentStep
                const isPast = index < currentStepIndex

                return (
                  <div key={step.id} className="flex-1 relative">
                    <button
                      onClick={() => isActive && navigateToStep(step.id)}
                      className={`w-full flex flex-col items-center ${isActive ? "cursor-pointer" : "cursor-default"}`}
                      disabled={!isActive}
                    >
                      <div
                        className={`
                        w-10 h-10 rounded-full flex items-center justify-center transition-colors
                        ${isCurrent ? "bg-blue-600 text-white" : isPast ? "bg-green-500 text-white" : isActive ? "bg-gray-400 text-white" : "bg-gray-300 text-gray-600"}
                        ${isActive && !isCurrent ? "hover:ring-2 hover:ring-blue-400" : ""}
                      `}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs mt-1">{step.label}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <div
                        className={`
                        absolute top-5 left-1/2 w-full h-0.5
                        ${isPast ? "bg-green-500" : "bg-gray-300"}
                      `}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Component for child information in sibling group
  const ChildInformation = ({ child, index }: { child: any; index: number }) => {
    const isExpanded = expandedChild === child.id
    const childAge = Number.parseInt(child.age) || 0

    return (
      <div className="border rounded-lg p-4 mb-3 bg-white">
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setExpandedChild(isExpanded ? null : child.id)}
            className="flex items-center font-medium text-left"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
            Child {index + 1} {(child.firstName || child.lastName) && `- ${child.firstName} ${child.lastName}`.trim()}
          </button>
          {children.length > 1 && (
            <button type="button" onClick={() => removeChild(child.id)} className="text-red-600 hover:text-red-800">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={child.firstName || ""}
                  onChange={(e) => updateChild(child.id, "firstName", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={child.lastName || ""}
                  onChange={(e) => updateChild(child.id, "lastName", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={child.age || ""}
                  onChange={(e) => updateChild(child.id, "age", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  className="w-full p-2 border rounded"
                  value={child.gender || ""}
                  onChange={(e) => updateChild(child.id, "gender", e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">DFPS Person ID (if known)</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={child.dfpsId || ""}
                onChange={(e) => updateChild(child.id, "dfpsId", e.target.value)}
                placeholder="8-digit Person ID (optional)"
                maxLength="8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Service Package</label>
              <select
                className="w-full p-2 border rounded"
                value={child.servicePackage || ""}
                onChange={(e) => updateChild(child.id, "servicePackage", e.target.value)}
              >
                <option value="">Select if known...</option>
                {servicePackages.map((pkg) => (
                  <option key={pkg.value} value={pkg.value}>
                    {pkg.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Add-On Services</label>
              <div className="space-y-2">
                {addOnServices.map((service) => {
                  const isDisabled = service.ageRestriction && childAge < service.ageRestriction
                  return (
                    <label key={service.key} className={`flex items-center ${isDisabled ? "text-gray-400" : ""}`}>
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={child.addOnServices[service.key] || false}
                        onChange={(e) => updateChildAddOn(child.id, service.key, e.target.checked)}
                        disabled={isDisabled}
                      />
                      {service.label}
                      {isDisabled && <span className="ml-2 text-xs">(Age {service.ageRestriction}+ required)</span>}
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Mental & Behavioral Health Package Fields */}
            {child.servicePackage === "mental-behavioral" && (
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h5 className="font-medium mb-3 text-purple-800 flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  Mental & Behavioral Health Information
                </h5>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Mental Health Diagnoses</label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {mentalHealthDiagnosesOptions.map((diagnosis) => (
                        <label key={diagnosis} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={child.mentalHealthDiagnoses?.includes(diagnosis) || false}
                            onChange={(e) => {
                              const current = child.mentalHealthDiagnoses || []
                              const updated = e.target.checked
                                ? [...current, diagnosis]
                                : current.filter((d) => d !== diagnosis)
                              updateChildMentalHealthDiagnoses(child.id, updated)
                            }}
                          />
                          {diagnosis}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Medications</label>
                      <textarea
                        className="w-full p-2 border rounded text-sm"
                        rows={2}
                        value={child.currentMedications || ""}
                        onChange={(e) => updateChild(child.id, "currentMedications", e.target.value)}
                        placeholder="List medications and dosages"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Therapy Frequency</label>
                      <select
                        className="w-full p-2 border rounded"
                        value={child.therapyFrequency || ""}
                        onChange={(e) => updateChild(child.id, "therapyFrequency", e.target.value)}
                      >
                        <option value="">Select...</option>
                        {therapyFrequencyOptions.map((freq) => (
                          <option key={freq} value={freq}>
                            {freq}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Psychiatric Hospitalizations (Past Year)</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full p-2 border rounded"
                        value={child.psychiatricHospitalizations || 0}
                        onChange={(e) =>
                          updateChild(child.id, "psychiatricHospitalizations", Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Crisis Interventions (Past 90 Days)</label>
                      <input
                        type="number"
                        min="0"
                        className="w-full p-2 border rounded"
                        value={child.crisisInterventions || 0}
                        onChange={(e) =>
                          updateChild(child.id, "crisisInterventions", Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Self-Harm Risk Level</label>
                      <select
                        className="w-full p-2 border rounded"
                        value={child.selfHarmRisk || "none"}
                        onChange={(e) => updateChild(child.id, "selfHarmRisk", e.target.value)}
                      >
                        {riskLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Aggression Risk Level</label>
                      <select
                        className="w-full p-2 border rounded"
                        value={child.aggressionRisk || "none"}
                        onChange={(e) => updateChild(child.id, "aggressionRisk", e.target.value)}
                      >
                        {riskLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* IDD/Autism Package Fields */}
            {child.servicePackage === "idd-autism" && (
              <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                <h5 className="font-medium mb-3 text-pink-800 flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  IDD/Autism Support Information
                </h5>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">IDD/Autism Diagnosis</label>
                      <select
                        className="w-full p-2 border rounded"
                        value={child.iddDiagnosis || ""}
                        onChange={(e) => updateChild(child.id, "iddDiagnosis", e.target.value)}
                      >
                        <option value="">Select...</option>
                        {iddDiagnosisOptions.map((diagnosis) => (
                          <option key={diagnosis} value={diagnosis}>
                            {diagnosis}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Communication Method</label>
                      <select
                        className="w-full p-2 border rounded"
                        value={child.communicationMethod || ""}
                        onChange={(e) => updateChild(child.id, "communicationMethod", e.target.value)}
                      >
                        <option value="">Select...</option>
                        {communicationMethods.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Adaptive Functioning Level</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={child.adaptiveFunctioningLevel || ""}
                      onChange={(e) => updateChild(child.id, "adaptiveFunctioningLevel", e.target.value)}
                    >
                      <option value="">Select...</option>
                      {adaptiveFunctioningLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Medical Equipment Needs</label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {medicalEquipmentOptions.map((equipment) => (
                        <label key={equipment} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={child.medicalEquipment?.includes(equipment) || false}
                            onChange={(e) => {
                              const current = child.medicalEquipment || []
                              const updated = e.target.checked
                                ? [...current, equipment]
                                : current.filter((eq) => eq !== equipment)
                              updateChildMedicalEquipment(child.id, updated)
                            }}
                          />
                          {equipment}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Sensory Needs</label>
                    <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                      {sensoryNeedsOptions.map((need) => (
                        <label key={need} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={child.sensoryNeeds?.includes(need) || false}
                            onChange={(e) => {
                              const current = child.sensoryNeeds || []
                              const updated = e.target.checked ? [...current, need] : current.filter((n) => n !== need)
                              updateChildSensoryNeeds(child.id, updated)
                            }}
                          />
                          {need}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Component for initial inquiry capture
  const InquiryCapture = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold flex items-center">
          <AlertCircle className="mr-2 text-blue-600" />
          New Placement Inquiry
        </h3>
        <button
          type="button"
          onClick={loadSampleData}
          className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
        >
          Load Sample Data
        </button>
      </div>

      <div className="space-y-6">
        {/* Referral Source Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-gray-700">Referral Source Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Referral Source</label>
              <select
                className="w-full p-2 border rounded"
                value={referralSource}
                onChange={(e) => setReferralSource(e.target.value)}
              >
                <option value="">Select...</option>
                <option value="DFPS">DFPS</option>
                <option value="SSCC-Empower">SSCC - Empower</option>
                <option value="SSCC-2Ingage">SSCC - 2Ingage</option>
                <option value="SSCC-TFI">SSCC - TFI</option>
                <option value="SSCC-OC-OK">SSCC - OC-OK</option>
                <option value="SSCC-4Kids4Families">SSCC - 4Kids4Families</option>
                <option value="SSCC-Belong">SSCC - Belong</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Method</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`flex-1 p-2 border rounded flex items-center justify-center ${method === "phone" ? "bg-blue-100 border-blue-500" : ""}`}
                  onClick={() => setMethod("phone")}
                >
                  <Phone className="w-4 h-4 mr-1" /> Phone
                </button>
                <button
                  type="button"
                  className={`flex-1 p-2 border rounded flex items-center justify-center ${method === "email" ? "bg-blue-100 border-blue-500" : ""}`}
                  onClick={() => setMethod("email")}
                >
                  <Mail className="w-4 h-4 mr-1" /> Email
                </button>
                <button
                  type="button"
                  className={`flex-1 p-2 border rounded flex items-center justify-center ${method === "text" ? "bg-blue-100 border-blue-500" : ""}`}
                  onClick={() => setMethod("text")}
                >
                  <MessageSquare className="w-4 h-4 mr-1" /> Text
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Agency Contact Information Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-gray-700">Agency Contact Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contact Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={agencyContact.name}
                onChange={(e) => updateAgencyContact("name", e.target.value)}
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Position/Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={agencyContact.position}
                onChange={(e) => updateAgencyContact("position", e.target.value)}
                placeholder="e.g., Placement Coordinator"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full p-2 border rounded"
                value={agencyContact.phone}
                onChange={(e) => updateAgencyContact("phone", e.target.value)}
                placeholder="(xxx) xxx-xxxx"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={agencyContact.email}
                onChange={(e) => updateAgencyContact("email", e.target.value)}
                placeholder="email@agency.com"
              />
            </div>
          </div>
        </div>

        {/* Placement Type Section */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-gray-700">Placement Type</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emergency"
                className="mr-2"
                checked={isEmergency}
                onChange={(e) => setIsEmergency(e.target.checked)}
              />
              <label htmlFor="emergency" className="font-medium text-red-600">
                Emergency Placement (Immediate need)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sibling"
                className="mr-2"
                checked={isSiblingGroup}
                onChange={(e) => setIsSiblingGroup(e.target.checked)}
              />
              <label htmlFor="sibling" className="font-medium">
                Sibling Group
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="outsideCredentials"
                className="mr-2"
                checked={willingToPlaceOutsideCredentials}
                onChange={(e) => setWillingToPlaceOutsideCredentials(e.target.checked)}
              />
              <label htmlFor="outsideCredentials" className="font-medium text-orange-600">
                Willing to place outside of package credentials
              </label>
            </div>
          </div>
        </div>

        {/* Children Information Section */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-700">Children Information</h4>
            {isSiblingGroup && (
              <button type="button" onClick={addChild} className="flex items-center text-blue-600 hover:text-blue-800">
                <Plus className="w-4 h-4 mr-1" />
                Add Child
              </button>
            )}
          </div>
          {children.map((child, index) => (
            <ChildInformation key={child.id} child={child} index={index} />
          ))}
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleInquirySubmit}
          disabled={!referralSource || !method}
        >
          Begin Pre-Screen Process
        </button>
      </div>
    </div>
  )

  // Component for pre-screening
  const PreScreen = () => {
    const totalChildren = children.length
    const hasSpecializedNeeds = children.some((child) =>
      ["mental-behavioral", "idd-autism", "complex-medical", "treatment-foster"].includes(child.servicePackage),
    )
    const hasHighRiskBehaviors = children.some(
      (child) =>
        child.selfHarmRisk === "high" ||
        child.aggressionRisk === "high" ||
        (child.crisisInterventions && child.crisisInterventions > 3),
    )
    const needsCrisisSupport = children.some(
      (child) =>
        child.servicePackage === "mental-behavioral" &&
        (child.selfHarmRisk !== "none" || child.aggressionRisk !== "none"),
    )
    const needsRNConsultation = children.some(
      (child) => child.servicePackage === "idd-autism" && child.medicalEquipment && child.medicalEquipment.length > 0,
    )

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Pre-Screen Assessment</h3>

        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              <Clock className="mr-2 text-yellow-600" />
              Response Required By: {responseDeadline}
            </span>
            <span className="font-medium">Elapsed: {responseTime || "< 1m"}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Placement Summary:</h4>
          <ul className="text-sm space-y-1">
            <li>
              • {totalChildren} child{totalChildren > 1 ? "ren" : ""} requiring placement
            </li>
            {isSiblingGroup && <li>• Sibling group - need {totalChildren} beds in same home</li>}
            {hasSpecializedNeeds && <li>• Specialized service package requirements identified</li>}
            {hasHighRiskBehaviors && (
              <li className="text-red-600 font-medium">
                • <AlertTriangle className="w-4 h-4 inline mr-1" />
                High-risk behaviors identified - enhanced safety protocols required
              </li>
            )}
            {needsCrisisSupport && (
              <li className="text-orange-600 font-medium">
                • <Shield className="w-4 h-4 inline mr-1" />
                24/7 crisis support capability required
              </li>
            )}
            {needsRNConsultation && (
              <li className="text-blue-600 font-medium">
                • <Stethoscope className="w-4 h-4 inline mr-1" />
                RN consultation access required for medical equipment
              </li>
            )}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <CheckCircle className="mr-2 text-green-500" />
            <span>Age appropriate foster homes available</span>
          </div>
          <div className="flex items-center">
            {isSiblingGroup ? (
              <>
                <XCircle className="mr-2 text-red-500" />
                <span>Sibling group capacity available</span>
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 text-green-500" />
                <span>Single bed available</span>
              </>
            )}
          </div>
          <div className="flex items-center">
            {hasSpecializedNeeds ? (
              <>
                <XCircle className="mr-2 text-red-500" />
                <span>Specialized training requirements met</span>
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 text-green-500" />
                <span>Service package can be accommodated</span>
              </>
            )}
          </div>
          {needsCrisisSupport && (
            <div className="flex items-center">
              <XCircle className="mr-2 text-red-500" />
              <span>24/7 crisis support capability available</span>
            </div>
          )}
          {needsRNConsultation && (
            <div className="flex items-center">
              <CheckCircle className="mr-2 text-green-500" />
              <span>RN consultation access confirmed</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            onClick={() => handlePreScreen({ canAccommodate: true })}
          >
            Proceed to Search
          </button>
          <button
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            onClick={() => handlePreScreen({ canAccommodate: false })}
          >
            Unable to Accommodate
          </button>
        </div>
      </div>
    )
  }

  // Component for placement search
  const PlacementSearch = () => {
    const showAdditionalOptions = willingToPlaceOutsideCredentials
    const hasMentalHealthNeeds = children.some((child) => child.servicePackage === "mental-behavioral")
    const hasIDDNeeds = children.some((child) => child.servicePackage === "idd-autism")

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Search className="mr-2" />
          Searching for Suitable Placements
        </h3>

        <div className="mb-4 text-sm text-gray-600">
          Searching for homes that can accommodate:
          <ul className="mt-1 ml-4">
            {children.map((child, index) => (
              <li key={child.id}>
                • Child {index + 1}: {child.age}yo {child.gender || "Unknown gender"},
                {child.servicePackage
                  ? servicePackages.find((p) => p.value === child.servicePackage)?.label
                  : "No package specified"}
                {child.servicePackage === "mental-behavioral" && (
                  <span className="text-purple-600 ml-2">
                    {child.selfHarmRisk !== "none" && `(Self-harm risk: ${child.selfHarmRisk})`}
                    {child.aggressionRisk !== "none" && `(Aggression risk: ${child.aggressionRisk})`}
                  </span>
                )}
                {child.servicePackage === "idd-autism" && (
                  <span className="text-pink-600 ml-2">({child.communicationMethod || "Communication needs TBD"})</span>
                )}
              </li>
            ))}
          </ul>
          {willingToPlaceOutsideCredentials && (
            <p className="mt-2 text-orange-600 font-medium">⚠️ Including homes without specific package credentials</p>
          )}
        </div>

        <div className="space-y-3">
          {/* Fully credentialed options */}
          <div className="border rounded p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">Smith Family</h4>
                <p className="text-sm text-gray-600">2 miles away • {isSiblingGroup ? "3 beds" : "1 bed"} available</p>
                <div className="text-sm space-y-1">
                  <p>✓ Mental Health Training (4-hour completed) • ✓ Crisis Management • ✓ STASS Certified</p>
                  {hasMentalHealthNeeds && (
                    <p className="text-purple-600">
                      ✓ 24/7 Crisis Support Available • ✓ Psychiatric Medication Management
                    </p>
                  )}
                  {hasIDDNeeds && (
                    <p className="text-pink-600">✓ IDD Training (6-hour completed) • ✓ RN Consultation Access</p>
                  )}
                </div>
                <p className="text-sm text-green-600">✓ Fully credentialed for requested services</p>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
                onClick={() => handleSearch([{ family: "Smith", available: true, fullyCredentialed: true }])}
              >
                Select
              </button>
            </div>
          </div>

          <div className="border rounded p-4 hover:bg-gray-50 cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">Johnson Family</h4>
                <p className="text-sm text-gray-600">5 miles away • {isSiblingGroup ? "2 beds" : "2 beds"} available</p>
                <div className="text-sm space-y-1">
                  <p>✓ IDD Experience • ✓ Medical Equipment Training • ✓ Treatment Foster Care</p>
                  {hasIDDNeeds && (
                    <p className="text-pink-600">✓ Sensory-Friendly Environment • ✓ Communication Device Experience</p>
                  )}
                  {hasMentalHealthNeeds && (
                    <p className="text-orange-600">⚠️ Mental Health training scheduled for completion</p>
                  )}
                </div>
                <p className="text-sm text-yellow-600">⚠️ Partial credential match</p>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
                onClick={() => handleSearch([{ family: "Johnson", available: true, fullyCredentialed: false }])}
              >
                Select
              </button>
            </div>
          </div>

          {/* Show additional non-credentialed options if willing */}
          {showAdditionalOptions && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium text-orange-600 mb-3">Additional Options (Outside Credentials)</h4>
              <div className="border border-orange-300 rounded p-4 hover:bg-orange-50 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">Davis Family</h4>
                    <p className="text-sm text-gray-600">
                      8 miles away • {isSiblingGroup ? "4 beds" : "1 bed"} available
                    </p>
                    <p className="text-sm">✓ Basic Foster Care • ✓ Experienced with teens</p>
                    <p className="text-sm text-orange-600">⚠️ Not credentialed for specialized services</p>
                    <p className="text-sm text-red-600">⚠️ Enhanced support plan required for placement</p>
                  </div>
                  <button
                    className="bg-orange-600 text-white px-4 py-1 rounded text-sm"
                    onClick={() =>
                      handleSearch([
                        { family: "Davis", available: true, fullyCredentialed: false, outsideCredentials: true },
                      ])
                    }
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          className="mt-4 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
          onClick={() => handleSearch([])}
        >
          No Suitable Placements Available
        </button>
      </div>
    )
  }

  // Component for matching/proposal building
  const MatchProposal = () => {
    const hasMentalHealthNeeds = children.some((child) => child.servicePackage === "mental-behavioral")
    const hasIDDNeeds = children.some((child) => child.servicePackage === "idd-autism")

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Home className="mr-2" />
          Build Placement Proposal
        </h3>

        <div className="mb-4">
          <h4 className="font-medium mb-2">Available Options:</h4>
          <div className="space-y-3">
            {searchResults.map((result, index) => (
              <div key={index} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h5 className="font-semibold">{result.family} Family</h5>
                    {result.fullyCredentialed ? (
                      <p className="text-sm text-green-600">✓ Fully credentialed</p>
                    ) : result.outsideCredentials ? (
                      <p className="text-sm text-orange-600">⚠️ Outside credential requirements</p>
                    ) : (
                      <p className="text-sm text-yellow-600">⚠️ Partial credentials</p>
                    )}

                    {/* Mental Health Capabilities */}
                    {hasMentalHealthNeeds && (
                      <div className="mt-2 p-2 bg-purple-50 rounded text-sm">
                        <p className="font-medium text-purple-800">Mental Health Support Capabilities:</p>
                        <ul className="text-purple-700 ml-4">
                          <li>✓ Crisis intervention training completed</li>
                          <li>✓ 24/7 case manager contact established</li>
                          <li>✓ Psychiatric medication management experience</li>
                          <li>✓ Therapy transportation arrangements</li>
                        </ul>
                      </div>
                    )}

                    {/* IDD/Autism Capabilities */}
                    {hasIDDNeeds && (
                      <div className="mt-2 p-2 bg-pink-50 rounded text-sm">
                        <p className="font-medium text-pink-800">IDD/Autism Support Capabilities:</p>
                        <ul className="text-pink-700 ml-4">
                          <li>✓ Communication support training completed</li>
                          <li>✓ Environmental adaptations available</li>
                          <li>✓ RN consultation access confirmed</li>
                          <li>✓ Daily routine structure experience</li>
                        </ul>
                      </div>
                    )}

                    {/* Enhanced Support Plan Requirements */}
                    {result.outsideCredentials && (
                      <div className="mt-2 p-2 bg-orange-50 rounded text-sm">
                        <p className="font-medium text-orange-800">Enhanced Support Plan Required:</p>
                        <ul className="text-orange-700 ml-4">
                          <li>• Weekly case manager visits</li>
                          <li>• Specialized training completion within 30 days</li>
                          <li>• Additional supervision and support</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    className={`px-4 py-1 rounded text-sm ml-4 ${
                      proposedPlacements.find((p) => p.family === result.family)
                        ? "bg-red-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                    onClick={() =>
                      proposedPlacements.find((p) => p.family === result.family)
                        ? handleRemoveFromProposal(result.family)
                        : handleAddToProposal(result)
                    }
                  >
                    {proposedPlacements.find((p) => p.family === result.family) ? "Remove" : "Add to Proposal"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h4 className="font-medium mb-2">Current Proposal:</h4>
          {proposedPlacements.length === 0 ? (
            <p className="text-gray-600">No placements selected for proposal</p>
          ) : (
            <ul className="space-y-1">
              {proposedPlacements.map((placement, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>
                    {index + 1}. {placement.family} Family
                    {!placement.fullyCredentialed && (
                      <span className="text-orange-600 ml-2">(Limited credentials)</span>
                    )}
                  </span>
                  <button
                    onClick={() => handleRemoveFromProposal(placement.family)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleSubmitProposal}
          disabled={proposedPlacements.length === 0}
        >
          Submit Proposal to {referralSource}
        </button>
      </div>
    )
  }

  // Component for negotiation
  const NegotiateComponent = () => {
    const [selectedOption, setSelectedOption] = useState(null)

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <MessageSquare className="mr-2" />
          Placement Negotiation with {referralSource}
        </h3>

        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm">
            <strong>Note:</strong> {referralSource} is reviewing placement options. They may be comparing with other
            CPAs or have questions about our proposed families.
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Proposed Options:</h4>
          <div className="space-y-2">
            {proposedPlacements.map((placement, index) => (
              <label key={index} className="flex items-center p-3 border rounded hover:bg-gray-50">
                <input
                  type="radio"
                  name="placement"
                  value={placement.family}
                  checked={selectedOption?.family === placement.family}
                  onChange={() => setSelectedOption(placement)}
                  className="mr-3"
                />
                <div>
                  <span className="font-medium">{placement.family} Family</span>
                  {!placement.fullyCredentialed && (
                    <span className="ml-2 text-sm text-orange-600">(Credential limitations noted)</span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Communication from {referralSource}:</label>
          <div className="p-3 bg-gray-100 rounded mb-3">
            <p className="text-sm italic">
              {
                "We're interested in the Smith family but need to know more about their experience with mental health needs. Also evaluating options with other agencies."
              }
            </p>
          </div>
          <label className="block text-sm font-medium mb-1">Your Response/Notes:</label>
          <textarea
            className="w-full p-2 border rounded h-24"
            value={negotiationNotes}
            onChange={(e) => setNegotiationNotes(e.target.value)}
            placeholder="Document negotiation details, additional information provided, etc."
          />
        </div>

        <div className="space-y-2">
          <button
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            onClick={() => handleNegotiationComplete(true, selectedOption)}
            disabled={!selectedOption}
          >
            {referralSource} Selected {selectedOption?.family || "a"} Family - Proceed
          </button>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={() => navigateToStep("match")}
          >
            Revise Proposal
          </button>
          <button
            className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
            onClick={() => navigateToStep("decline")}
          >
            {referralSource} Declined All Options
          </button>
        </div>
      </div>
    )
  }

  // Component for decline response
  const DeclineResponse = () => {
    const hasMentalHealthNeeds = children.some((child) => child.servicePackage === "mental-behavioral")
    const hasIDDNeeds = children.some((child) => child.servicePackage === "idd-autism")

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-red-600">Unable to Accept Placement</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Reason for Decline</label>
            <select className="w-full p-2 border rounded">
              <option>No available beds matching requirements</option>
              {isSiblingGroup && <option>Cannot keep sibling group together</option>}
              <option>Specialized training requirements not met</option>
              <option>Geographic constraints</option>
              <option>Medical/behavioral needs exceed capacity</option>
              <option>STASS placement not available</option>
              <option>Treatment Foster Care home not available</option>
              {hasMentalHealthNeeds && (
                <>
                  <option>No Mental & Behavioral Health credentialed homes available</option>
                  <option>24/7 crisis support capacity not available</option>
                  <option>High-risk behavior management capacity exceeded</option>
                </>
              )}
              {hasIDDNeeds && (
                <>
                  <option>No IDD/Autism credentialed homes available</option>
                  <option>RN consultation requirement cannot be met</option>
                  <option>Medical equipment support not available</option>
                  <option>Communication support needs exceed capacity</option>
                </>
              )}
              <option>Other (specify in notes)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Efforts Made</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Contacted all available foster families
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Explored splitting sibling group (if applicable)
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Checked with families outside immediate area
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Consulted with specialized service providers
              </label>
              {hasMentalHealthNeeds && (
                <>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Reviewed Mental Health training schedules for upcoming completions
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Assessed crisis support capacity expansion possibilities
                  </label>
                </>
              )}
              {hasIDDNeeds && (
                <>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Reviewed IDD/Autism training schedules for upcoming completions
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Assessed environmental adaptation possibilities
                  </label>
                </>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Additional Notes</label>
            <textarea className="w-full p-2 border rounded h-24" />
          </div>

          <button
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            onClick={() => handleFinalResponse(false)}
          >
            Submit Decline Response to {referralSource}
          </button>
        </div>
      </div>
    )
  }

  // Component for completion
  const CompletionScreen = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center">
        {status === "placed" ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Placement Confirmed</h3>
            <p>Response Time: {responseTime || "< 1h"}</p>
            <p className="text-sm text-gray-600 mt-2">Response sent to {referralSource}</p>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Inquiry Declined</h3>
            <p>Response Time: {responseTime || "< 1h"}</p>
            <p className="text-sm text-gray-600 mt-2">Decline notification sent to {referralSource}</p>
          </>
        )}
        <button className="mt-6 bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700" onClick={resetForm}>
          Process New Inquiry
        </button>
      </div>
    </div>
  )

  // Component for approval process
  const ApprovalProcess = () => {
    const hasMentalHealthNeeds = children.some((child) => child.servicePackage === "mental-behavioral")
    const hasIDDNeeds = children.some((child) => child.servicePackage === "idd-autism")

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <User className="mr-2" />
          Final Placement Approval
        </h3>

        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
          <h4 className="font-medium mb-2">Selected Placement:</h4>
          <p className="font-semibold">{selectedPlacement?.family} Family</p>
          <p className="text-sm text-gray-600 mt-1">
            {selectedPlacement?.fullyCredentialed
              ? "✓ Fully credentialed for all requirements"
              : "⚠️ Partial credentials - additional support may be needed"}
          </p>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-3">Pre-Placement Checklist:</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={approvalChecklist.familyContacted}
                onChange={(e) => updateApprovalChecklist("familyContacted", e.target.checked)}
              />
              Foster family contacted and confirmed availability
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={approvalChecklist.detailsShared}
                onChange={(e) => updateApprovalChecklist("detailsShared", e.target.checked)}
              />
              Placement details shared with {referralSource}
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={approvalChecklist.transportationConfirmed}
                onChange={(e) => updateApprovalChecklist("transportationConfirmed", e.target.checked)}
              />
              Transportation arrangements confirmed
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={approvalChecklist.emergencyContactsExchanged}
                onChange={(e) => updateApprovalChecklist("emergencyContactsExchanged", e.target.checked)}
              />
              Emergency contact information exchanged
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={approvalChecklist.medicalNeedsCommunicated}
                onChange={(e) => updateApprovalChecklist("medicalNeedsCommunicated", e.target.checked)}
              />
              Medical/medication needs communicated (if applicable)
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={approvalChecklist.schoolEnrollmentProvided}
                onChange={(e) => updateApprovalChecklist("schoolEnrollmentProvided", e.target.checked)}
              />
              School enrollment information provided (if applicable)
            </label>

            {/* Mental Health Specific Checklist */}
            {hasMentalHealthNeeds && (
              <>
                <div className="mt-4 pt-4 border-t">
                  <h5 className="font-medium text-purple-800 mb-2 flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    Mental & Behavioral Health Requirements:
                  </h5>
                  <div className="space-y-2 ml-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={approvalChecklist.crisisPlanShared}
                        onChange={(e) => updateApprovalChecklist("crisisPlanShared", e.target.checked)}
                      />
                      Crisis intervention plan shared with foster family
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={approvalChecklist.caseManagerContactConfirmed}
                        onChange={(e) => updateApprovalChecklist("caseManagerContactConfirmed", e.target.checked)}
                      />
                      24/7 case manager contact information confirmed
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={approvalChecklist.therapyScheduled}
                        onChange={(e) => updateApprovalChecklist("therapyScheduled", e.target.checked)}
                      />
                      Weekly therapy appointments scheduled
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={approvalChecklist.medicationManagementConfirmed}
                        onChange={(e) => updateApprovalChecklist("medicationManagementConfirmed", e.target.checked)}
                      />
                      Psychiatric medication management arrangements confirmed
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={approvalChecklist.safetyPlanEstablished}
                        onChange={(e) => updateApprovalChecklist("safetyPlanEstablished", e.target.checked)}
                      />
                      Safety plan for high-risk behaviors established
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* IDD/Autism Specific Checklist */}
            {hasIDDNeeds && (
              <>
                <div className="mt-4 pt-4 border-t">
                  <h5 className="font-medium text-pink-800 mb-2 flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    IDD/Autism Support Requirements:
                  </h5>
                  <div className="space-y-2 ml-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={approvalChecklist.communicationSupportsReady}
                        onChange={(e) => updateApprovalChecklist("communicationSupportsReady", e.target.checked)}
                      />
                      Communication supports/devices prepared
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={approvalChecklist.environmentalAdaptationsConfirmed}
                        onChange={(e) => updateApprovalChecklist("environmentalAdaptationsConfirmed", e.target.checked)}
                      />
                      Environmental adaptations confirmed
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={approvalChecklist.rnConsultationScheduled}
                        onChange={(e) => updateApprovalChecklist("rnConsultationScheduled", e.target.checked)}
                      />
                      RN consultation scheduled (if medical equipment needed)
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={approvalChecklist.routineStructureShared}
                        onChange={(e) => updateApprovalChecklist("routineStructureShared", e.target.checked)}
                      />
                      Daily routine structure shared with foster family
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={approvalChecklist.sensoryAccommodationsCommunicated}
                        onChange={(e) => updateApprovalChecklist("sensoryAccommodationsCommunicated", e.target.checked)}
                      />
                      Sensory accommodation needs communicated
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Additional Notes/Special Instructions:</label>
          <textarea
            className="w-full p-2 border rounded h-20"
            placeholder="Any special instructions, medical needs, behavioral considerations, etc."
            value={approvalNotes}
            onChange={(e) => setApprovalNotes(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            onClick={() => {
              // Set status to placed and show child registration
              setStatus("placed")
              // Initialize registration with existing child data
              const childrenForRegistration = children.map((child, index) => {
                let estimatedDob = ""
                if (child.age) {
                  const currentYear = new Date().getFullYear()
                  const birthYear = currentYear - Number.parseInt(child.age)
                  estimatedDob = `${birthYear}-01-01`
                }

                return {
                  id: child.id,
                  firstName: child.firstName || "",
                  lastName: child.lastName || "",
                  dob: estimatedDob,
                  dfpsId: child.dfpsId || "",
                  gender: child.gender ? child.gender.charAt(0).toUpperCase() + child.gender.slice(1) : "",
                  age: child.age || "",
                  placementType: isEmergency ? "emergency" : "routine",
                  servicePackage: child.servicePackage
                    ? servicePackages.find((pkg) => pkg.value === child.servicePackage)?.label || ""
                    : "",
                  addOnServices: Object.keys(child.addOnServices || {})
                    .filter((key) => child.addOnServices[key])
                    .map((key) => addOnServices.find((service) => service.key === key)?.label || key),
                  caseManager: "",
                  fosterFamily: selectedPlacement?.family || "",
                  originalChildData: child,
                  selected: true,
                }
              })

              setRegistrationChildren(childrenForRegistration)
              setSelectedChildrenForPlacement(childrenForRegistration.map((child) => child.id))
              setShowChildRegistration(true)
            }}
          >
            Confirm Placement & Begin Registration
          </button>
          <button
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            onClick={() => handleFinalResponse(false)}
          >
            Cancel Placement
          </button>
        </div>
      </div>
    )
  }

  // Child Registration Component
  const ChildRegistrationComponent = () => {
    const [currentChildIndex, setCurrentChildIndex] = useState(0)
    const [showSiblingOptions, setShowSiblingOptions] = useState(isSiblingGroup && registrationChildren.length > 1)

    const servicePackageOptions = servicePackages.map((pkg) => pkg.label)
    const addOnServiceOptions = [
      "Transition Support Services (Youth 14+)",
      "Kinship Caregiver Support Services",
      "Pregnant & Parenting Youth Support",
    ]
    const caseManagers = ["Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Thompson", "Lisa Anderson"]
    const fosterFamilies = ["Smith Family", "Johnson Family", "Davis Family", "Wilson Family", "Brown Family"]

    const updateChildData = (childId, field, value) => {
      setRegistrationChildren((prev) =>
        prev.map((child) => (child.id === childId ? { ...child, [field]: value } : child)),
      )
    }

    const toggleChildSelection = (childId) => {
      setSelectedChildrenForPlacement((prev) =>
        prev.includes(childId) ? prev.filter((id) => id !== childId) : [...prev, childId],
      )
    }

    const validateChild = (child) => {
      return (
        child.firstName &&
        child.lastName &&
        child.dob &&
        child.dfpsId &&
        child.gender &&
        child.servicePackage &&
        child.caseManager &&
        child.fosterFamily &&
        /^\d{8}$/.test(child.dfpsId) &&
        selectedChildrenForPlacement.includes(child.id)
      )
    }

    const calculateAge = (dob) => {
      if (!dob) return ""
      const today = new Date()
      const birthDate = new Date(dob)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }

    const handleCompleteRegistration = () => {
      const selectedChildren = registrationChildren.filter((child) => selectedChildrenForPlacement.includes(child.id))
      const invalidChildren = selectedChildren.filter((child) => !validateChild(child))

      if (invalidChildren.length > 0) {
        alert(
          `Please complete all required fields and ensure DFPS ID is 8 digits for: ${invalidChildren.map((c) => c.firstName || "Unnamed child").join(", ")}`,
        )
        return
      }

      setRegistrationComplete(true)
    }

    if (registrationComplete) {
      const selectedChildren = registrationChildren.filter((child) => selectedChildrenForPlacement.includes(child.id))

      return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 className="text-xl font-semibold mb-4">Child Registration Summary</h3>

          {selectedChildren.length < registrationChildren.length && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800">
                <strong>Note:</strong> {registrationChildren.length - selectedChildren.length} child(ren) from the
                sibling group will not be placed at this time.
              </p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-2 text-left">Child Name</th>
                  <th className="border border-gray-300 p-2 text-left">Age</th>
                  <th className="border border-gray-300 p-2 text-left">Placement Type</th>
                  <th className="border border-gray-300 p-2 text-left">Service Package</th>
                  <th className="border border-gray-300 p-2 text-left">Foster Family</th>
                  <th className="border border-gray-300 p-2 text-left">Case Manager</th>
                  <th className="border border-gray-300 p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedChildren.map((child, index) => (
                  <tr key={child.id}>
                    <td className="border border-gray-300 p-2">
                      {child.firstName} {child.lastName}
                    </td>
                    <td className="border border-gray-300 p-2">{calculateAge(child.dob)}</td>
                    <td className="border border-gray-300 p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          child.placementType === "emergency" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {child.placementType === "emergency" ? "EMERGENCY" : "ROUTINE"}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2 text-sm">{child.servicePackage}</td>
                    <td className="border border-gray-300 p-2">{child.fosterFamily}</td>
                    <td className="border border-gray-300 p-2">{child.caseManager}</td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => navigateToPlacement(child)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Start Placement
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={initializeAllPlacements}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Initialize All Placement Workflows
            </button>
            <button
              onClick={() => navigateToStep("complete")}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
            >
              Complete Inquiry
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Child Registration</h3>
          <span className="text-sm text-gray-600">
            {selectedChildrenForPlacement.length} of {registrationChildren.length} children selected for placement
          </span>
        </div>

        {/* Sibling Group Management */}
        {showSiblingOptions && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
            <h4 className="font-medium mb-3">Sibling Group Placement Options</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-700 mb-2">Select which children to place:</p>
                <div className="space-y-2">
                  {registrationChildren.map((child, index) => (
                    <label key={child.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={selectedChildrenForPlacement.includes(child.id)}
                        onChange={() => toggleChildSelection(child.id)}
                      />
                      <span>
                        Child {index + 1}: {child.firstName || child.originalChildData.name || "Unnamed"}
                        {child.age && ` (Age ${child.age})`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> Siblings can be placed in different Refuge House homes if needed. Each child
                  can be assigned to a different foster family below.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Individual Child Registration Forms */}
        <div className="space-y-6">
          {registrationChildren.map((child, index) => {
            if (!selectedChildrenForPlacement.includes(child.id)) return null

            return (
              <div key={child.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">
                    Child {index + 1}: {child.firstName || child.originalChildData.name || "Unnamed Child"}
                  </h4>
                  {child.placementType === "emergency" && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                      24-HOUR CRITICAL TIMELINE
                    </span>
                  )}
                </div>

                {child.placementType === "emergency" && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                      <span className="font-medium text-red-800">Emergency Placement Alert</span>
                    </div>
                    <p className="text-red-700 text-sm mt-1">
                      This placement requires immediate action and 24-hour processing.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">First Name *</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={child.firstName}
                      onChange={(e) => updateChildData(child.id, "firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Last Name *</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={child.lastName}
                      onChange={(e) => updateChildData(child.id, "lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                      value={child.dob}
                      onChange={(e) => updateChildData(child.id, "dob", e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">DFPS Person ID * (8-digit number)</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      value={child.dfpsId}
                      onChange={(e) => updateChildData(child.id, "dfpsId", e.target.value)}
                      placeholder="12345678"
                      pattern="[0-9]{8}"
                      maxLength="8"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Gender *</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={child.gender}
                      onChange={(e) => updateChildData(child.id, "gender", e.target.value)}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Placement Type *</label>
                    <div className="flex gap-4 pt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`placementType-${child.id}`}
                          value="routine"
                          checked={child.placementType === "routine"}
                          onChange={(e) => updateChildData(child.id, "placementType", e.target.value)}
                          className="mr-1"
                        />
                        Routine
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`placementType-${child.id}`}
                          value="emergency"
                          checked={child.placementType === "emergency"}
                          onChange={(e) => updateChildData(child.id, "placementType", e.target.value)}
                          className="mr-1"
                        />
                        <span className="text-red-600">Emergency</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    T3C Service Package *
                    {child.servicePackage && (
                      <span className="text-blue-600 text-xs ml-2">(Pre-populated from inquiry data)</span>
                    )}
                  </label>
                  <select
                    className="w-full p-2 border rounded"
                    value={child.servicePackage}
                    onChange={(e) => updateChildData(child.id, "servicePackage", e.target.value)}
                    required
                  >
                    <option value="">Select Service Package</option>
                    {servicePackages.map((pkg) => (
                      <option key={pkg.value} value={pkg.label}>
                        {pkg.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Add-On Services</label>
                  <div className="space-y-2">
                    {addOnServiceOptions.map((service) => (
                      <label key={service} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={child.addOnServices.includes(service)}
                          onChange={(e) => {
                            const newServices = e.target.checked
                              ? [...child.addOnServices, service]
                              : child.addOnServices.filter((s) => s !== service)
                            updateChildData(child.id, "addOnServices", newServices)
                          }}
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Assigned Case Manager *</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={child.caseManager}
                      onChange={(e) => updateChildData(child.id, "caseManager", e.target.value)}
                      required
                    >
                      <option value="">Select Case Manager</option>
                      {caseManagers.map((manager) => (
                        <option key={manager} value={manager}>
                          {manager}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Target Foster Family *</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={child.fosterFamily}
                      onChange={(e) => updateChildData(child.id, "fosterFamily", e.target.value)}
                      required
                    >
                      <option value="">Select Foster Family</option>
                      {fosterFamilies.map((family) => (
                        <option key={family} value={family}>
                          {family}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Show original inquiry data for reference */}
                {child.originalChildData && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                    <h5 className="font-medium text-blue-800 mb-2">Original Inquiry Information:</h5>
                    <div className="text-sm text-blue-700 space-y-1">
                      {child.originalChildData.mentalHealthDiagnoses?.length > 0 && (
                        <p>Mental Health: {child.originalChildData.mentalHealthDiagnoses.join(", ")}</p>
                      )}
                      {child.originalChildData.currentMedications && (
                        <p>Medications: {child.originalChildData.currentMedications}</p>
                      )}
                      {child.originalChildData.iddDiagnosis && (
                        <p>IDD/Autism: {child.originalChildData.iddDiagnosis}</p>
                      )}
                      {child.originalChildData.communicationMethod && (
                        <p>Communication: {child.originalChildData.communicationMethod}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleCompleteRegistration}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={selectedChildrenForPlacement.length === 0}
          >
            Complete Registration ({selectedChildrenForPlacement.length} children)
          </button>
          <button
            onClick={() => setShowChildRegistration(false)}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Cancel Registration
          </button>
        </div>
      </div>
    )
  }

  // Mock CostOptimizationComponent
  const CostOptimizationComponent = () => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h3 className="text-xl font-semibold mb-4">Cost Optimization</h3>
        <p>This is a placeholder for the Cost Optimization Component.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Form Directory
          </Link>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-6 w-6" />
                Placement Inquiry Workflow
              </CardTitle>
              <CardDescription>
                Comprehensive multi-step workflow for managing foster care placement inquiries from initial contact
                through final placement
              </CardDescription>
              <Badge variant="secondary" className="w-fit bg-amber-100 text-amber-800">
                Draft Version
              </Badge>
              <p className="text-sm text-gray-600 mt-2">Revision Date: 1/10/25.2</p>
            </CardHeader>
          </Card>
        </div>

        {/* Main Form Content */}
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs />

          {currentStep === "inquiry" && <InquiryCapture />}
          {currentStep === "prescreen" && <PreScreen />}
          {currentStep === "search" && <PlacementSearch />}
          {currentStep === "match" && <MatchProposal />}
          {currentStep === "negotiate" && <NegotiateComponent />}
          {currentStep === "approve" && <ApprovalProcess />}
          {currentStep === "decline" && <DeclineResponse />}
          {currentStep === "complete" && <CompletionScreen />}

          {/* Child Registration Component - Show after placement is accepted */}
          {showChildRegistration && <ChildRegistrationComponent />}

          {/* Cost Optimization Component - Always visible */}
          <CostOptimizationComponent />

          {/* Status bar */}
          {inquiryId && (
            <div className="mt-6 bg-gray-100 rounded p-4">
              <div className="flex justify-between text-sm">
                <span>Inquiry ID: {inquiryId}</span>
                <span>Source: {referralSource}</span>
                <span>Children: {children.length}</span>
                <span>
                  Status: <span className="font-semibold">{status}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
