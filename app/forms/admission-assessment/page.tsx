"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  FileClock,
  User,
  CalendarDays,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  Download,
  ChevronDown,
  ChevronRight,
  Info,
  AlertTriangle,
  Settings,
  Plus,
  Heart,
  Shield,
  Pill,
  Home,
  Users,
  XCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock current user
const currentUser = { name: "Casey Worker", id: "worker-123" }

// Service Package Configuration
const SERVICE_PACKAGES = {
  "Basic": { color: "bg-gray-100 text-gray-800", borderColor: "border-gray-500" },
  "Mental & Behavioral Health": { color: "bg-purple-100 text-purple-800", borderColor: "border-purple-500" },
  "IDD/Autism": { color: "bg-blue-100 text-blue-800", borderColor: "border-blue-500" },
  "Substance Use": { color: "bg-amber-100 text-amber-800", borderColor: "border-amber-500" },
  "Short-Term Assessment (STASS)": { color: "bg-cyan-100 text-cyan-800", borderColor: "border-cyan-500" },
  "Treatment Foster Family Care (TFFC)": { color: "bg-rose-100 text-rose-800", borderColor: "border-rose-500" },
} as const

type ServicePackageType = keyof typeof SERVICE_PACKAGES

// Sample Data for review purposes
const getSampleData = (servicePackage: ServicePackageType = "Mental & Behavioral Health") => ({
  childId: "child-123-sample",
  placementId: "place-456-sample",
  registeredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  childData: {
    firstName: "Jamie",
    lastName: "Doe",
    dfpsPersonId: "1234567",
    dateOfBirth: "2010-05-15",
    gender: "Female",
    servicePackage: servicePackage,
    placementType: "Emergency",
    age: 14, // for special populations
    placementHistoryCount: 4, // for special populations
    isKinship: false,
  },
  placementTasks: {
    safetyArrival: { completed: true, completedAt: new Date().toISOString() },
    healthScreening: { completed: true, completedAt: new Date().toISOString() },
    faceToFace: { completed: true, completedAt: new Date().toISOString() },
  },
  nextWorkflow: "admission-assessment",
})

export default function AdmissionAssessmentPage() {
  const searchParams = useSearchParams()
  const [isSampleData, setIsSampleData] = useState(false)
  const [childData, setChildData] = useState<any>(null)
  const [placementData, setPlacementData] = useState<any>(null)
  const [assessmentId, setAssessmentId] = useState("")
  const [selectedPackage, setSelectedPackage] = useState<ServicePackageType>("Mental & Behavioral Health")
  
  // Add-on services state - disabled when STASS is selected
  const [addOnServices, setAddOnServices] = useState<string[]>([])
  const isSTASS = selectedPackage === "Short-Term Assessment (STASS)"
  const isTFFC = selectedPackage === "Treatment Foster Family Care (TFFC)"
  const isSubstanceUse = selectedPackage === "Substance Use"
  
  // Package-specific assessment state
  const [substanceUseAssessment, setSubstanceUseAssessment] = useState<any>({})
  const [stassAssessment, setStassAssessment] = useState<any>({
    assessmentType: "standard",
    placementStartDate: new Date().toISOString().split("T")[0],
  })
  const [tffcAssessment, setTffcAssessment] = useState<any>({
    treatmentDirectorReview: "pending",
  })

  // State for each form section
  const [coreAssessment, setCoreAssessment] = useState<any>({
    recordsRequested: {},
    informationReview: {},
    physicalHealth: {},
    emotionalBehavioral: {},
    socialFunctioning: {},
    educationalCognitive: {},
    dailyLivingSkills: {},
    culturalSpiritual: {},
  })
  const [tbriComponents, setTbriComponents] = useState<any>({
    connecting: {},
    empowering: {},
    correcting: {},
  })
  const [packageSpecific, setPackageSpecific] = useState<any>({})
  const [specialPopulations, setSpecialPopulations] = useState<any>({})
  const [documents, setDocuments] = useState<any[]>([])
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [activeSection, setActiveSection] = useState("overview")
  const [showAddSection, setShowAddSection] = useState(false)
  const [customSections, setCustomSections] = useState<
    Array<{
      id: string
      title: string
      icon: any
      progress: number
      content?: string
    }>
  >([])
  const [newSectionTitle, setNewSectionTitle] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("placementComplete")
    if (stored) {
      const data = JSON.parse(stored)
      setChildData(data.childData)
      setPlacementData(data.placementTasks)
      setIsSampleData(false)
    } else {
      // Load sample data if nothing is in localStorage
      const sample = getSampleData(selectedPackage)
      setChildData(sample.childData)
      setPlacementData(sample.placementTasks)
      setIsSampleData(true)
    }

    // Generate Assessment ID
    const date = new Date()
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    setAssessmentId(
      `AA-${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}-${randomSuffix}`,
    )
  }, [selectedPackage])

  // Update sample data when package changes
  const handlePackageChange = (newPackage: ServicePackageType) => {
    setSelectedPackage(newPackage)
    // Clear add-ons when STASS is selected (STASS not eligible for add-ons)
    if (newPackage === "Short-Term Assessment (STASS)") {
      setAddOnServices([])
    }
    if (isSampleData) {
      const sample = getSampleData(newPackage)
      setChildData(sample.childData)
    }
  }
  
  // Calculate STASS deadline
  const calculateSTASSDeadline = (startDate: string, assessmentType: string) => {
    const start = new Date(startDate)
    const days = assessmentType === "extended" ? 45 : 30
    start.setDate(start.getDate() + days)
    return start
  }
  
  const stassDeadline = stassAssessment.placementStartDate 
    ? calculateSTASSDeadline(stassAssessment.placementStartDate, stassAssessment.assessmentType)
    : null
  
  const stassDaysRemaining = stassDeadline 
    ? Math.max(0, Math.ceil((stassDeadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 0

  const assessmentDeadline = useMemo(() => {
    if (!childData?.registeredAt) return null
    const deadline = new Date(childData.registeredAt)
    deadline.setDate(deadline.getDate() + 30)
    return deadline
  }, [childData])

  const daysRemaining = useMemo(() => {
    if (!assessmentDeadline) return 0
    const today = new Date()
    const diffTime = assessmentDeadline.getTime() - today.getTime()
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  }, [assessmentDeadline])

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!isSampleData) {
          // Mock saving logic
          console.log("Auto-saving draft...")
          setLastSaved(new Date())
        }
      },
      3 * 60 * 1000,
    ) // Every 3 minutes

    return () => clearInterval(interval)
  }, [isSampleData])

  const getServicePackageColor = (pkg: string) => {
    return SERVICE_PACKAGES[pkg as ServicePackageType]?.color || "bg-gray-100 text-gray-800"
  }
  
  const getServicePackageBorderColor = (pkg: string) => {
    return SERVICE_PACKAGES[pkg as ServicePackageType]?.borderColor || "border-gray-500"
  }

  const calculateProgress = () => {
    // Mock progress calculation based on completed sections
    let completed = 0
    const total = 7 // Total number of main sections

    // Check each section for completion (simplified logic)
    if (Object.keys(coreAssessment.recordsRequested).length > 0) completed++
    if (Object.keys(tbriComponents.connecting).length > 0) completed++

    return Math.round((completed / total) * 100)
  }

  const allRequirementsMet = () => {
    // Mock validation logic - would check all required fields
    return calculateProgress() >= 80
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const saveDraft = () => {
    if (isSampleData) {
      toast({
        title: "Sample Data Mode",
        description: "Save functionality is disabled in sample data mode.",
        variant: "default",
      })
      return
    }

    // Mock save logic
    setLastSaved(new Date())
    toast({
      title: "Draft Saved",
      description: "Your assessment has been saved successfully.",
    })
  }

  const generatePDF = () => {
    if (isSampleData) {
      toast({
        title: "Sample Data Mode",
        description: "PDF generation is disabled in sample data mode.",
        variant: "default",
      })
      return
    }

    toast({
      title: "PDF Generated",
      description: "Assessment report has been generated and downloaded.",
    })
  }

  const submitForReview = () => {
    if (isSampleData) {
      toast({
        title: "Sample Data Mode",
        description: "Submit functionality is disabled in sample data mode.",
        variant: "default",
      })
      return
    }

    if (!allRequirementsMet()) {
      toast({
        title: "Incomplete Assessment",
        description: "Please complete all required sections before submitting.",
        variant: "destructive",
      })
      return
    }

    // Mock submission logic
    toast({
      title: "Submitted for Review",
      description: "Assessment has been submitted to supervisor for review.",
    })
  }

  if (!childData) {
    return <div className="flex items-center justify-center min-h-screen">Loading assessment data...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {isSampleData && (
        <Alert variant="default" className="mb-6 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 !text-blue-600" />
          <AlertTitle className="text-blue-800">Sample Data Mode</AlertTitle>
          <AlertDescription className="text-blue-700">
            You are viewing this form with sample data for evaluation purposes. Save and submit functionality is
            disabled.
            <div className="mt-3 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <Label htmlFor="package-select" className="text-sm font-medium">
                Change Service Package:
              </Label>
              <Select value={selectedPackage} onValueChange={(v) => handlePackageChange(v as ServicePackageType)}>
                <SelectTrigger className="w-64 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">Basic Foster Family Home</SelectItem>
                  <SelectItem value="Mental & Behavioral Health">Mental & Behavioral Health</SelectItem>
                  <SelectItem value="IDD/Autism">IDD/Autism Support</SelectItem>
                  <SelectItem value="Substance Use">Substance Use Support Services</SelectItem>
                  <SelectItem value="Short-Term Assessment (STASS)">Short-Term Assessment (STASS)</SelectItem>
                  <SelectItem value="Treatment Foster Family Care (TFFC)">Treatment Foster Family Care (TFFC)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Header Card */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <CardTitle className="text-2xl">
                Admission Assessment: {childData.firstName} {childData.lastName}
              </CardTitle>
              <CardDescription className="mt-1">Assessment ID: {assessmentId}</CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={`px-3 py-1 text-sm font-medium ${getServicePackageColor(childData.servicePackage)}`}>
                {childData.servicePackage}
              </Badge>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-semibold">Assessment Deadline</p>
                <p
                  className={`${daysRemaining <= 7 ? "text-red-600" : daysRemaining <= 14 ? "text-yellow-600" : "text-gray-600"}`}
                >
                  {assessmentDeadline?.toLocaleDateString()} ({daysRemaining} days remaining)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-semibold">Child Age</p>
                <p className="text-gray-600">{childData.age} years</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileClock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-semibold">Last Saved</p>
                <p className="text-gray-600">{lastSaved ? lastSaved.toLocaleTimeString() : "Not saved yet"}</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <Label>Overall Progress</Label>
              <span className="text-sm text-gray-600">{calculateProgress()}% Complete</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <div className="flex gap-6">
        {/* Left Sidebar Navigation */}
        <div className="w-80 bg-white rounded-lg border p-4 h-fit sticky top-4">
          <h3 className="font-semibold text-lg mb-4">Assessment Sections</h3>
          <div className="space-y-2">
            {[
              { id: "overview", title: "Overview", icon: User, progress: 100 },
              { id: "core", title: "Core Assessment", icon: FileText, progress: 75 },
              { id: "tbri", title: "TBRI®", icon: CheckCircle2, progress: 60 },
              ...(childData.servicePackage !== "Basic"
                ? [{ 
                    id: "package", 
                    title: isSTASS ? "STASS Assessment" : isTFFC ? "TFFC Clinical" : isSubstanceUse ? "Substance Use" : "Package-Specific", 
                    icon: isSTASS ? Clock : isTFFC ? Heart : isSubstanceUse ? Pill : Settings, 
                    progress: 45 
                  }]
                : []),
              { id: "special", title: "Special Populations", icon: AlertTriangle, progress: 80 },
              { id: "documents", title: "Documents", icon: Upload, progress: 90 },
              { id: "review", title: "Review & Submit", icon: CheckCircle2, progress: 0 },
            ].map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{section.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${section.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{section.progress}%</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Add New Section Button */}
          <div className="mt-6 pt-4 border-t">
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowAddSection(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Section
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Content based on active section */}
          {activeSection === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Child Information Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-gray-500">Name</Label>
                      <p className="font-medium">
                        {childData.firstName} {childData.lastName}
                      </p>
                    </div>
                    <div>
                      <Label className="text-gray-500">DFPS ID</Label>
                      <p className="font-medium">{childData.dfpsPersonId}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Date of Birth</Label>
                      <p className="font-medium">{new Date(childData.dateOfBirth).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Gender</Label>
                      <p className="font-medium">{childData.gender}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Service Package</Label>
                      <p className="font-medium">{childData.servicePackage}</p>
                    </div>
                    <div>
                      <Label className="text-gray-500">Placement Type</Label>
                      <p className="font-medium">{childData.placementType}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Timeline Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Placement Completed</p>
                        <p className="text-sm text-gray-500">Initial 24-72 hour tasks</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Assessment In Progress</p>
                        <p className="text-sm text-gray-500">30-day comprehensive assessment</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                      <div>
                        <p className="font-medium text-gray-400">Service Plan Development</p>
                        <p className="text-sm text-gray-400">Post-assessment planning</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Required Tasks by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">5/7</p>
                      <p className="text-sm text-gray-600">Core Assessment</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">2/3</p>
                      <p className="text-sm text-gray-600">TBRI® Components</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">3/4</p>
                      <p className="text-sm text-gray-600">Package-Specific</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-2xl font-bold text-yellow-600">1/2</p>
                      <p className="text-sm text-gray-600">Special Populations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "core" && (
            <div className="space-y-6">
              {/* Section 1: Information Gathering */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Section 1: Information Gathering (Days 1-7)
                    <Badge variant="outline" className="ml-2">
                      Required
                    </Badge>
                  </CardTitle>
                  <CardDescription>Request and review all relevant records and documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      Records Request Tracking
                      <Info className="h-4 w-4 text-blue-500" />
                    </h4>
                    <div className="space-y-4">
                      {[
                        { type: "DFPS records", required: true },
                        { type: "Previous placement records", required: true },
                        { type: "Medical records", required: true },
                        { type: "Educational records", required: true },
                        { type: "Mental health records", required: false },
                      ].map((record) => (
                        <div key={record.type} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Checkbox id={`${record.type}-requested`} />
                            <Label htmlFor={`${record.type}-requested`} className="font-medium">
                              {record.type} {record.required && <span className="text-red-500">*</span>}
                            </Label>
                          </div>
                          <div>
                            <Label className="text-sm text-gray-500">Date Requested</Label>
                            <Input type="date" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-500">Status</Label>
                            <Select>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="requested">Requested</SelectItem>
                                <SelectItem value="received">Received</SelectItem>
                                <SelectItem value="not-available">Not Available</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm text-gray-500">Date Received</Label>
                            <Input type="date" className="mt-1" />
                          </div>
                          <div>
                            <Label className="text-sm text-gray-500">Upload File</Label>
                            <Button variant="outline" size="sm" className="mt-1 w-full bg-transparent">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold mb-4">Information Review Checklist</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Removal affidavit reviewed",
                        "Previous placement history documented",
                        "Trauma history assessed",
                        "Medical history compiled",
                        "Educational needs identified",
                        "Cultural/religious factors noted",
                        "Family connections mapped",
                      ].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox id={item} />
                          <Label htmlFor={item}>{item}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Comprehensive Assessment Areas */}
              <Card>
                <CardHeader>
                  <CardTitle>Section 2: Comprehensive Assessment Areas</CardTitle>
                  <CardDescription>Detailed evaluation across all developmental domains</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Physical Health & Development */}
                  <Collapsible open={expandedSections["physical"]} onOpenChange={() => toggleSection("physical")}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-blue-500 rounded-full" />
                          <span className="font-semibold">Physical Health & Development</span>
                          <Badge variant="outline">Required</Badge>
                        </div>
                        {expandedSections["physical"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <Label htmlFor="height">
                            Height (inches) <span className="text-red-500">*</span>
                          </Label>
                          <Input id="height" type="number" placeholder="Enter height" />
                        </div>
                        <div>
                          <Label htmlFor="weight">
                            Weight (lbs) <span className="text-red-500">*</span>
                          </Label>
                          <Input id="weight" type="number" placeholder="Enter weight" />
                        </div>
                        <div>
                          <Label htmlFor="bmi">BMI (calculated)</Label>
                          <Input id="bmi" disabled placeholder="Auto-calculated" />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label>
                          Physical Development <span className="text-red-500">*</span>
                        </Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select development level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="age-appropriate">Age Appropriate</SelectItem>
                            <SelectItem value="delayed">Delayed</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="chronic-conditions">Chronic Conditions</Label>
                        <Textarea id="chronic-conditions" placeholder="List any chronic medical conditions..." />
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="physical-limitations">Physical Limitations</Label>
                        <Textarea id="physical-limitations" placeholder="Describe any physical limitations..." />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Emotional/Behavioral Functioning */}
                  <Collapsible open={expandedSections["emotional"]} onOpenChange={() => toggleSection("emotional")}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-purple-500 rounded-full" />
                          <span className="font-semibold">Emotional/Behavioral Functioning</span>
                          <Badge variant="outline">Required</Badge>
                        </div>
                        {expandedSections["emotional"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>
                            Emotional Regulation (1-5 scale) <span className="text-red-500">*</span>
                          </Label>
                          <RadioGroup className="flex gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div key={num} className="flex items-center space-x-2">
                                <RadioGroupItem value={num.toString()} id={`emotion-${num}`} />
                                <Label htmlFor={`emotion-${num}`}>{num}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <p className="text-sm text-gray-500 mt-1">1 = Poor regulation, 5 = Excellent regulation</p>
                        </div>
                        <div>
                          <Label>Behavioral Patterns</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Aggression",
                              "Self-harm",
                              "Withdrawal",
                              "Hyperactivity",
                              "Defiance",
                              "Anxiety behaviors",
                              "Compulsive behaviors",
                              "Sleep issues",
                            ].map((behavior) => (
                              <div key={behavior} className="flex items-center space-x-2">
                                <Checkbox id={behavior} />
                                <Label htmlFor={behavior}>{behavior}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="coping-strategies">Coping Strategies</Label>
                          <Textarea id="coping-strategies" placeholder="Describe effective coping strategies..." />
                        </div>
                        <div>
                          <Label>Trauma Responses</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Hypervigilance",
                              "Flashbacks",
                              "Nightmares",
                              "Dissociation",
                              "Emotional numbing",
                              "Startle response",
                              "Regression",
                              "Somatic complaints",
                            ].map((response) => (
                              <div key={response} className="flex items-center space-x-2">
                                <Checkbox id={response} />
                                <Label htmlFor={response}>{response}</Label>
                              </div>
                            ))}
                          </div>
                          <Textarea className="mt-2" placeholder="Additional notes on trauma responses..." />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Social Functioning */}
                  <Collapsible open={expandedSections["social"]} onOpenChange={() => toggleSection("social")}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                          <span className="font-semibold">Social Functioning</span>
                          <Badge variant="outline">Required</Badge>
                        </div>
                        {expandedSections["social"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>
                            Peer Relationships (1-5 scale) <span className="text-red-500">*</span>
                          </Label>
                          <RadioGroup className="flex gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div key={num} className="flex items-center space-x-2">
                                <RadioGroupItem value={num.toString()} id={`peer-${num}`} />
                                <Label htmlFor={`peer-${num}`}>{num}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <p className="text-sm text-gray-500 mt-1">
                            1 = Significant difficulties, 5 = Age-appropriate relationships
                          </p>
                          <Textarea
                            className="mt-2"
                            placeholder="Describe peer relationship patterns and interactions..."
                          />
                        </div>
                        <div>
                          <Label>
                            Adult Relationships (1-5 scale) <span className="text-red-500">*</span>
                          </Label>
                          <RadioGroup className="flex gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div key={num} className="flex items-center space-x-2">
                                <RadioGroupItem value={num.toString()} id={`adult-${num}`} />
                                <Label htmlFor={`adult-${num}`}>{num}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <p className="text-sm text-gray-500 mt-1">
                            1 = Avoids/fears adults, 5 = Healthy adult relationships
                          </p>
                          <Textarea
                            className="mt-2"
                            placeholder="Describe relationships with caregivers, teachers, and other adults..."
                          />
                        </div>
                        <div>
                          <Label>Social Skills</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Sharing",
                              "Taking turns",
                              "Following social cues",
                              "Empathy/compassion",
                              "Conflict resolution",
                              "Communication skills",
                              "Boundary respect",
                              "Group participation",
                            ].map((skill) => (
                              <div key={skill} className="flex items-center space-x-2">
                                <Checkbox id={skill} />
                                <Label htmlFor={skill}>{skill}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Educational/Cognitive */}
                  <Collapsible open={expandedSections["educational"]} onOpenChange={() => toggleSection("educational")}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-orange-500 rounded-full" />
                          <span className="font-semibold">Educational/Cognitive</span>
                          <Badge variant="outline">Required</Badge>
                        </div>
                        {expandedSections["educational"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="current-grade">
                              Current Grade/Placement <span className="text-red-500">*</span>
                            </Label>
                            <Input id="current-grade" placeholder="e.g., 8th grade, Pre-K" />
                          </div>
                          <div>
                            <Label>
                              Academic Performance <span className="text-red-500">*</span>
                            </Label>
                            <Select>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select performance level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="above-grade">Above Grade Level</SelectItem>
                                <SelectItem value="at-grade">At Grade Level</SelectItem>
                                <SelectItem value="below-grade">Below Grade Level</SelectItem>
                                <SelectItem value="significantly-below">Significantly Below Grade Level</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="academic-notes">Academic Performance Notes</Label>
                          <Textarea
                            id="academic-notes"
                            placeholder="Describe specific academic strengths and challenges..."
                          />
                        </div>
                        <div>
                          <Label>Learning Styles</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Visual learner",
                              "Auditory learner",
                              "Kinesthetic learner",
                              "Reading/writing learner",
                              "Hands-on activities",
                              "Group learning",
                              "Independent study",
                              "Technology-assisted",
                            ].map((style) => (
                              <div key={style} className="flex items-center space-x-2">
                                <Checkbox id={style} />
                                <Label htmlFor={style}>{style}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Special Education Needs</Label>
                          <RadioGroup className="mt-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="special-ed-yes" />
                              <Label htmlFor="special-ed-yes">Yes - has special education needs</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="special-ed-no" />
                              <Label htmlFor="special-ed-no">No - does not require special education</Label>
                            </div>
                          </RadioGroup>
                          <Textarea
                            className="mt-2"
                            placeholder="If yes, describe IEP/504 plan details, accommodations, and services..."
                          />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Daily Living Skills */}
                  <Collapsible
                    open={expandedSections["daily-living"]}
                    onOpenChange={() => toggleSection("daily-living")}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-teal-500 rounded-full" />
                          <span className="font-semibold">Daily Living Skills</span>
                          <Badge variant="outline">Required</Badge>
                        </div>
                        {expandedSections["daily-living"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Age-Appropriate Skills</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Personal hygiene",
                              "Dressing independently",
                              "Meal preparation",
                              "Household chores",
                              "Money management",
                              "Time management",
                              "Transportation skills",
                              "Safety awareness",
                            ].map((skill) => (
                              <div key={skill} className="flex items-center space-x-2">
                                <Checkbox id={skill} />
                                <Label htmlFor={skill}>{skill}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        {childData.age >= 14 && (
                          <div>
                            <Label>Independent Living Skills (Age 14+)</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {[
                                "Laundry skills",
                                "Cooking meals",
                                "Budgeting",
                                "Job readiness",
                                "Healthcare management",
                                "Housing skills",
                                "Community navigation",
                                "Legal awareness",
                              ].map((skill) => (
                                <div key={skill} className="flex items-center space-x-2">
                                  <Checkbox id={skill} />
                                  <Label htmlFor={skill}>{skill}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <Label>
                            Supervision Needs (1-5 scale) <span className="text-red-500">*</span>
                          </Label>
                          <RadioGroup className="flex gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div key={num} className="flex items-center space-x-2">
                                <RadioGroupItem value={num.toString()} id={`supervision-${num}`} />
                                <Label htmlFor={`supervision-${num}`}>{num}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <p className="text-sm text-gray-500 mt-1">1 = Constant supervision, 5 = Independent</p>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Cultural/Spiritual Identity */}
                  <Collapsible open={expandedSections["cultural"]} onOpenChange={() => toggleSection("cultural")}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-pink-500 rounded-full" />
                          <span className="font-semibold">Cultural/Spiritual Identity</span>
                          <Badge variant="outline">Required</Badge>
                        </div>
                        {expandedSections["cultural"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label htmlFor="cultural-identity">
                            Cultural Identity <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="cultural-identity"
                            placeholder="Describe the child's cultural background, heritage, and identity..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="languages-spoken">Languages Spoken</Label>
                          <Input
                            id="languages-spoken"
                            placeholder="List all languages spoken by the child (e.g., English, Spanish, ASL)"
                          />
                        </div>
                        <div>
                          <Label htmlFor="religious-practices">Religious/Spiritual Practices</Label>
                          <Textarea
                            id="religious-practices"
                            placeholder="Describe any religious or spiritual practices important to the child..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="cultural-placement-needs">Cultural Placement Needs</Label>
                          <Textarea
                            id="cultural-placement-needs"
                            placeholder="Identify specific cultural considerations for placement (food, holidays, community connections, etc.)..."
                          />
                        </div>
                        <div>
                          <Label>Cultural Considerations</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Dietary restrictions",
                              "Holiday observances",
                              "Community connections",
                              "Traditional practices",
                              "Language preservation",
                              "Cultural mentorship",
                              "Religious services",
                              "Cultural education",
                            ].map((consideration) => (
                              <div key={consideration} className="flex items-center space-x-2">
                                <Checkbox id={consideration} />
                                <Label htmlFor={consideration}>{consideration}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "tbri" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded" />
                    TBRI® Components Assessment
                  </CardTitle>
                  <CardDescription>Trauma-Based Relational Intervention principles evaluation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* CONNECTING Assessment */}
                  <Collapsible open={expandedSections["connecting"]} onOpenChange={() => toggleSection("connecting")}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-blue-500 rounded-full" />
                          <span className="font-semibold">CONNECTING Assessment</span>
                          <Badge variant="outline">Required</Badge>
                        </div>
                        {expandedSections["connecting"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>
                            Attachment Style <span className="text-red-500">*</span>
                          </Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select attachment style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="secure">Secure</SelectItem>
                              <SelectItem value="anxious">Anxious-Ambivalent</SelectItem>
                              <SelectItem value="avoidant">Avoidant</SelectItem>
                              <SelectItem value="disorganized">Disorganized</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="mt-2">
                            <Label htmlFor="attachment-narrative">Attachment Behavior Narrative</Label>
                            <Textarea
                              id="attachment-narrative"
                              placeholder="Describe specific attachment behaviors, patterns, and responses observed..."
                              rows={3}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>
                            Eye Contact Comfort (1-5 scale) <span className="text-red-500">*</span>
                          </Label>
                          <RadioGroup className="flex gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div key={num} className="flex items-center space-x-2">
                                <RadioGroupItem value={num.toString()} id={`eye-contact-${num}`} />
                                <Label htmlFor={`eye-contact-${num}`}>{num}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <p className="text-sm text-gray-500 mt-1">
                            1 = Avoids all eye contact, 5 = Comfortable with appropriate eye contact
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="physical-touch">Physical Touch Preferences</Label>
                          <Textarea
                            id="physical-touch"
                            placeholder="Describe comfort level with physical touch, preferred types of touch, triggers to avoid..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="trust-building">Trust-Building Observations</Label>
                          <Textarea
                            id="trust-building"
                            placeholder="Document trust-building behaviors, responses to new people, time needed to warm up, successful strategies..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Play/Interaction Styles</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Parallel play",
                              "Interactive play",
                              "Solitary play preference",
                              "Structured activities",
                              "Free play",
                              "Adult-directed activities",
                              "Peer interaction",
                              "Imaginative/pretend play",
                              "Physical/active play",
                              "Quiet/calm activities",
                              "Competitive activities",
                              "Cooperative activities",
                            ].map((style) => (
                              <div key={style} className="flex items-center space-x-2">
                                <Checkbox id={style} />
                                <Label htmlFor={style}>{style}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* EMPOWERING Assessment */}
                  <Collapsible open={expandedSections["empowering"]} onOpenChange={() => toggleSection("empowering")}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                          <span className="font-semibold">EMPOWERING Assessment</span>
                          <Badge variant="outline">Required</Badge>
                        </div>
                        {expandedSections["empowering"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>
                            Sensory Needs <span className="text-red-500">*</span>
                          </Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Auditory sensitivity",
                              "Visual sensitivity",
                              "Tactile sensitivity",
                              "Vestibular needs",
                              "Proprioceptive needs",
                              "Oral sensory needs",
                              "Olfactory sensitivity",
                              "Temperature sensitivity",
                              "Texture preferences",
                              "Sound filtering needs",
                              "Light sensitivity",
                              "Movement seeking",
                            ].map((need) => (
                              <div key={need} className="flex items-center space-x-2">
                                <Checkbox id={need} />
                                <Label htmlFor={need}>{need}</Label>
                              </div>
                            ))}
                          </div>
                          <Textarea
                            className="mt-2"
                            placeholder="Provide details about specific sensory needs, triggers, and accommodations..."
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="sleep-patterns">
                              Sleep Patterns <span className="text-red-500">*</span>
                            </Label>
                            <div className="space-y-2 mt-1">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-sm text-gray-500">Bedtime</Label>
                                  <Input type="time" placeholder="e.g., 21:00" />
                                </div>
                                <div>
                                  <Label className="text-sm text-gray-500">Wake Time</Label>
                                  <Input type="time" placeholder="e.g., 07:00" />
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm text-gray-500">Sleep Quality</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select quality" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="excellent">Excellent - sleeps through night</SelectItem>
                                    <SelectItem value="good">Good - occasional wake-ups</SelectItem>
                                    <SelectItem value="fair">Fair - frequent wake-ups</SelectItem>
                                    <SelectItem value="poor">Poor - significant sleep disruption</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Textarea
                                placeholder="Describe sleep routines, difficulties, nightmares, bedtime behaviors..."
                                rows={2}
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="eating-patterns">
                              Eating Patterns <span className="text-red-500">*</span>
                            </Label>
                            <div className="space-y-2 mt-1">
                              <div>
                                <Label className="text-sm text-gray-500">Appetite Level</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select appetite" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="excellent">Excellent appetite</SelectItem>
                                    <SelectItem value="good">Good appetite</SelectItem>
                                    <SelectItem value="fair">Fair appetite</SelectItem>
                                    <SelectItem value="poor">Poor appetite</SelectItem>
                                    <SelectItem value="overeating">Tendency to overeat</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-sm text-gray-500">Food Preferences/Restrictions</Label>
                                <Input placeholder="e.g., vegetarian, allergies, textures" />
                              </div>
                              <Textarea
                                placeholder="Describe eating behaviors, mealtime routines, food hoarding, etc..."
                                rows={2}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>
                              Hydration Habits <span className="text-red-500">*</span>
                            </Label>
                            <Select>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select hydration level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="excellent">Excellent - drinks water regularly</SelectItem>
                                <SelectItem value="good">Good - adequate water intake</SelectItem>
                                <SelectItem value="fair">Fair - needs reminders to drink</SelectItem>
                                <SelectItem value="poor">Poor - rarely drinks water</SelectItem>
                                <SelectItem value="excessive">Excessive - drinks too much</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="physical-activity">Physical Activity Needs</Label>
                            <Textarea
                              id="physical-activity"
                              className="mt-1"
                              placeholder="Describe activity level, exercise needs, movement preferences, energy regulation..."
                              rows={2}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Environmental Preferences</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Quiet spaces",
                              "Busy/stimulating environments",
                              "Natural lighting",
                              "Dim lighting",
                              "Open spaces",
                              "Cozy/enclosed spaces",
                              "Organized environments",
                              "Flexible spaces",
                              "Indoor preferences",
                              "Outdoor preferences",
                              "Temperature control needs",
                              "Noise level preferences",
                            ].map((preference) => (
                              <div key={preference} className="flex items-center space-x-2">
                                <Checkbox id={preference} />
                                <Label htmlFor={preference}>{preference}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* CORRECTING Assessment */}
                  <Collapsible open={expandedSections["correcting"]} onOpenChange={() => toggleSection("correcting")}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-orange-500 rounded-full" />
                          <span className="font-semibold">CORRECTING Assessment</span>
                          <Badge variant="outline">Required</Badge>
                        </div>
                        {expandedSections["correcting"] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-4 pb-4">
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Current Survival Behaviors with Frequency</Label>
                          <div className="space-y-3 mt-2">
                            {[
                              "Fight responses (aggression, defiance)",
                              "Flight responses (running away, avoidance)",
                              "Freeze responses (shutting down, dissociation)",
                              "Fawn responses (people-pleasing, compliance)",
                              "Lying/deception",
                              "Stealing",
                              "Hoarding (food, items)",
                              "Control behaviors",
                              "Self-harm behaviors",
                              "Hypervigilance",
                            ].map((behavior) => (
                              <div key={behavior} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 border rounded">
                                <div className="flex items-center space-x-2">
                                  <Checkbox id={behavior} />
                                  <Label htmlFor={behavior} className="text-sm">
                                    {behavior}
                                  </Label>
                                </div>
                                <div>
                                  <Select>
                                    <SelectTrigger className="h-8">
                                      <SelectValue placeholder="Frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="daily">Daily</SelectItem>
                                      <SelectItem value="weekly">Weekly</SelectItem>
                                      <SelectItem value="monthly">Monthly</SelectItem>
                                      <SelectItem value="rarely">Rarely</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Input placeholder="Triggers/context" className="h-8 text-sm" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="redirection-strategies">Successful Redirection Strategies</Label>
                          <Textarea
                            id="redirection-strategies"
                            placeholder="Document specific redirection techniques that work, de-escalation methods, calming strategies..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>
                            Response to Limits (1-5 scale) <span className="text-red-500">*</span>
                          </Label>
                          <RadioGroup className="flex gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div key={num} className="flex items-center space-x-2">
                                <RadioGroupItem value={num.toString()} id={`limits-${num}`} />
                                <Label htmlFor={`limits-${num}`}>{num}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <div className="text-sm text-gray-500 mt-1 space-y-1">
                            <p>
                              <strong>1:</strong> Extreme resistance - meltdowns, aggression, complete refusal
                            </p>
                            <p>
                              <strong>3:</strong> Moderate resistance - argues, negotiates, eventual compliance
                            </p>
                            <p>
                              <strong>5:</strong> Accepts limits well - understands and follows boundaries
                            </p>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="teaching-moments">Teaching Moments Narrative</Label>
                          <Textarea
                            id="teaching-moments"
                            placeholder="Describe opportunities for teaching life skills, emotional regulation, problem-solving. What situations provide the best learning opportunities?"
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Skill-Building Opportunities</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Emotional regulation skills",
                              "Problem-solving skills",
                              "Communication skills",
                              "Social skills",
                              "Conflict resolution",
                              "Self-advocacy skills",
                              "Coping strategies",
                              "Anger management",
                              "Impulse control",
                              "Decision-making skills",
                              "Responsibility taking",
                              "Empathy development",
                            ].map((skill) => (
                              <div key={skill} className="flex items-center space-x-2">
                                <Checkbox id={skill} />
                                <Label htmlFor={skill}>{skill}</Label>
                              </div>
                            ))}
                          </div>
                          <Textarea
                            className="mt-2"
                            placeholder="Describe specific skill-building goals and strategies for this child..."
                            rows={2}
                          />
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            </div>
          )}

          {childData.servicePackage !== "Basic" && activeSection === "package" && (
            <div className="space-y-6">
              {childData.servicePackage === "Mental & Behavioral Health" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-5 w-5 bg-purple-500 rounded" />
                      Mental & Behavioral Health Assessment
                    </CardTitle>
                    <CardDescription>Additional assessments required for mental health service package</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Clinical Screening Section */}
                    <div className="p-4 border-l-4 border-red-500 bg-red-50">
                      <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Clinical Screening Section (72-hour deadline)
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="cans-review" />
                          <Label htmlFor="cans-review">CANS 3.0 Assessment reviewed</Label>
                        </div>
                        <div>
                          <Label htmlFor="dsm-diagnoses">DSM-5 Diagnoses with Dates</Label>
                          <div className="space-y-2 mt-1">
                            {[1, 2, 3].map((index) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <Input placeholder={`Diagnosis ${index}`} />
                                <Input type="date" placeholder="Date diagnosed" />
                              </div>
                            ))}
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                              Add Another Diagnosis
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="current-medications">Current Medications Detailed List</Label>
                          <div className="space-y-2 mt-1">
                            {[1, 2, 3].map((index) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2 border rounded">
                                <Input placeholder="Medication name" />
                                <Input placeholder="Dosage" />
                                <Input placeholder="Frequency" />
                                <Input placeholder="Prescribing doctor" />
                              </div>
                            ))}
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                              Add Another Medication
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="suicide-screening">Suicide/Self-Harm Screening Tool and Results</Label>
                          <div className="space-y-3 mt-1">
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select screening tool used" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="columbia">Columbia Suicide Severity Rating Scale</SelectItem>
                                <SelectItem value="ask-suicide">ASQ (Ask Suicide-Screening Questions)</SelectItem>
                                <SelectItem value="phq9">PHQ-9</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select risk level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low Risk</SelectItem>
                                <SelectItem value="moderate">Moderate Risk</SelectItem>
                                <SelectItem value="high">High Risk</SelectItem>
                                <SelectItem value="imminent">Imminent Risk</SelectItem>
                              </SelectContent>
                            </Select>
                            <Textarea placeholder="Detailed screening results and notes..." rows={3} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="previous-hospitalizations">Previous Hospitalizations List</Label>
                          <div className="space-y-2 mt-1">
                            {[1, 2].map((index) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 border rounded">
                                <Input placeholder="Hospital/Facility" />
                                <Input type="date" placeholder="Admission date" />
                                <Input placeholder="Reason for admission" />
                              </div>
                            ))}
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                              Add Another Hospitalization
                            </Button>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="therapy-history">Therapy History</Label>
                          <div className="space-y-2 mt-1">
                            {[1, 2].map((index) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 p-2 border rounded">
                                <Input placeholder="Therapist/Provider" />
                                <Input placeholder="Type of therapy" />
                                <Input placeholder="Duration" />
                                <Input placeholder="Outcome/Notes" />
                              </div>
                            ))}
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                              Add Another Provider
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Clinical Assessment Section */}
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <h4 className="font-semibold text-yellow-800 mb-2">
                        Clinical Assessment Section (14-day deadline)
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="therapist-assessment" />
                          <Label htmlFor="therapist-assessment">Licensed therapist assessment completed</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="trauma-interview" />
                          <Label htmlFor="trauma-interview">Trauma-focused interview documented</Label>
                        </div>
                        <div>
                          <Label htmlFor="treatment-recommendations">Treatment Recommendations Form</Label>
                          <div className="space-y-3 mt-1">
                            <Textarea placeholder="Primary treatment recommendations..." rows={3} />
                            <Textarea placeholder="Secondary/supportive interventions..." rows={2} />
                            <Textarea placeholder="Contraindications or concerns..." rows={2} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Therapy Frequency Recommendation</Label>
                            <Select>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily sessions</SelectItem>
                                <SelectItem value="3x-week">3x per week</SelectItem>
                                <SelectItem value="2x-week">2x per week</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="biweekly">Bi-weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="therapy-rationale">Rationale for Frequency</Label>
                            <Textarea
                              id="therapy-rationale"
                              placeholder="Explain reasoning for recommended therapy frequency..."
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Crisis Planning Section */}
                    <div className="p-4 border-l-4 border-red-500 bg-red-50">
                      <h4 className="font-semibold text-red-800 mb-2">Crisis Planning Section (72-hour deadline)</h4>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="crisis-plan" />
                          <Label htmlFor="crisis-plan">Crisis response plan developed</Label>
                        </div>
                        <div>
                          <Label htmlFor="warning-signs">Early Warning Signs List</Label>
                          <div className="space-y-2 mt-1">
                            <Textarea placeholder="Behavioral warning signs..." rows={2} />
                            <Textarea placeholder="Emotional warning signs..." rows={2} />
                            <Textarea placeholder="Physical warning signs..." rows={2} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="deescalation">De-escalation Strategies List</Label>
                          <div className="space-y-2 mt-1">
                            <Textarea placeholder="Verbal de-escalation techniques..." rows={2} />
                            <Textarea placeholder="Environmental modifications..." rows={2} />
                            <Textarea placeholder="Calming activities and interventions..." rows={2} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="contact-protocols">24/7 Contact Protocols</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                            <div>
                              <Label className="text-sm text-gray-500">Primary Crisis Contact</Label>
                              <Input placeholder="Name and phone number" />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-500">Secondary Crisis Contact</Label>
                              <Input placeholder="Name and phone number" />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-500">Emergency Services</Label>
                              <Input placeholder="Local emergency number" />
                            </div>
                            <div>
                              <Label className="text-sm text-gray-500">Crisis Hotline</Label>
                              <Input placeholder="Crisis hotline number" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="foster-trained" />
                          <Label htmlFor="foster-trained">Foster family trained on crisis protocols</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {childData.servicePackage === "IDD/Autism" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="h-5 w-5 bg-blue-500 rounded" />
                      IDD/Autism Assessment
                    </CardTitle>
                    <CardDescription>Additional assessments required for IDD/Autism service package</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Developmental Assessment */}
                    <div className="p-4 border-l-4 border-red-500 bg-red-50">
                      <h4 className="font-semibold text-red-800 mb-2">Developmental Assessment (72-hour deadline)</h4>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="formal-diagnoses">Formal Diagnoses with Dates</Label>
                          <div className="space-y-2 mt-1">
                            {[1, 2, 3].map((index) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <Input placeholder={`Diagnosis ${index}`} />
                                <Input type="date" placeholder="Date diagnosed" />
                              </div>
                            ))}
                            <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                              Add Another Diagnosis
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="iq-scores">IQ/Adaptive Functioning Scores</Label>
                            <div className="space-y-2 mt-1">
                              <Input placeholder="Full Scale IQ" />
                              <Input placeholder="Verbal IQ" />
                              <Input placeholder="Performance IQ" />
                              <Input placeholder="Adaptive Behavior Composite" />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="cooccurring">Co-occurring Conditions List</Label>
                            <Textarea
                              id="cooccurring"
                              placeholder="List all co-occurring conditions (ADHD, anxiety, seizures, etc.)..."
                              rows={4}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="seizure-protocol">Seizure Protocol Upload</Label>
                          <div className="space-y-2 mt-1">
                            <Button variant="outline" className="w-full bg-transparent">
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Seizure Protocol Document
                            </Button>
                            <Textarea
                              placeholder="If no document available, describe seizure history and protocols..."
                              rows={2}
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Equipment Needs Checklist</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Wheelchair",
                              "Walker/Mobility aid",
                              "Communication device",
                              "Sensory equipment",
                              "Adaptive utensils",
                              "Positioning equipment",
                              "Medical equipment",
                              "Safety equipment",
                              "Assistive technology",
                              "Hearing aids",
                              "Vision aids",
                              "Other adaptive equipment",
                            ].map((equipment) => (
                              <div key={equipment} className="flex items-center space-x-2">
                                <Checkbox id={equipment} />
                                <Label htmlFor={equipment}>{equipment}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Communication Assessment */}
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <h4 className="font-semibold text-yellow-800 mb-2">Communication Assessment (7-day deadline)</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Communication Method Dropdown</Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select primary communication method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="verbal">Verbal communication</SelectItem>
                              <SelectItem value="sign-language">Sign Language (ASL)</SelectItem>
                              <SelectItem value="picture-exchange">Picture Exchange (PECS)</SelectItem>
                              <SelectItem value="device-assisted">Device Assisted (AAC device)</SelectItem>
                              <SelectItem value="gestures">Gestures/Body language</SelectItem>
                              <SelectItem value="limited-verbal">Limited verbal</SelectItem>
                              <SelectItem value="non-verbal">Non-verbal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="receptive-language">Receptive Language Levels</Label>
                            <div className="space-y-2 mt-1">
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Receptive language level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="age-appropriate">Age appropriate</SelectItem>
                                  <SelectItem value="mild-delay">Mild delay</SelectItem>
                                  <SelectItem value="moderate-delay">Moderate delay</SelectItem>
                                  <SelectItem value="severe-delay">Severe delay</SelectItem>
                                  <SelectItem value="profound-delay">Profound delay</SelectItem>
                                </SelectContent>
                              </Select>
                              <Textarea placeholder="Describe receptive language abilities..." rows={2} />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="expressive-language">Expressive Language Levels</Label>
                            <div className="space-y-2 mt-1">
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Expressive language level" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="age-appropriate">Age appropriate</SelectItem>
                                  <SelectItem value="mild-delay">Mild delay</SelectItem>
                                  <SelectItem value="moderate-delay">Moderate delay</SelectItem>
                                  <SelectItem value="severe-delay">Severe delay</SelectItem>
                                  <SelectItem value="profound-delay">Profound delay</SelectItem>
                                </SelectContent>
                              </Select>
                              <Textarea placeholder="Describe expressive language abilities..." rows={2} />
                            </div>
                          </div>
                        </div>
                        <div>
                          <Label>AAC Needs (Yes/No with details)</Label>
                          <RadioGroup className="mt-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="aac-yes" />
                              <Label htmlFor="aac-yes">Yes - requires AAC support</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="aac-no" />
                              <Label htmlFor="aac-no">No - does not require AAC</Label>
                            </div>
                          </RadioGroup>
                          <Textarea
                            className="mt-2"
                            placeholder="If yes, describe specific AAC needs, current devices, training requirements..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Visual Supports Checklist</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Picture schedules",
                              "Visual timers",
                              "Choice boards",
                              "Social stories",
                              "Visual rules",
                              "Transition cards",
                              "Emotion cards",
                              "Task strips",
                              "Video modeling",
                              "Visual cues",
                              "Written instructions",
                            ].map((support) => (
                              <div key={support} className="flex items-center space-x-2">
                                <Checkbox id={support} />
                                <Label htmlFor={support}>{support}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Functional Skills */}
                    <div className="p-4 border-l-4 border-green-500 bg-green-50">
                      <h4 className="font-semibold text-green-800 mb-2">Functional Skills (14-day deadline)</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>ADL Assessment Checklist</Label>
                          <div className="space-y-3 mt-2">
                            {[
                              {
                                category: "Personal Hygiene",
                                skills: ["Brushing teeth", "Bathing/showering", "Hair care", "Nail care"],
                              },
                              {
                                category: "Dressing",
                                skills: [
                                  "Selecting clothes",
                                  "Putting on clothes",
                                  "Fasteners (buttons, zippers)",
                                  "Shoe tying",
                                ],
                              },
                              {
                                category: "Eating",
                                skills: ["Using utensils", "Drinking from cup", "Food preparation", "Table manners"],
                              },
                              {
                                category: "Toileting",
                                skills: ["Toilet use", "Wiping", "Hand washing", "Privacy awareness"],
                              },
                            ].map((category) => (
                              <div key={category.category} className="border rounded p-3">
                                <h5 className="font-medium mb-2">{category.category}</h5>
                                <div className="grid grid-cols-2 gap-2">
                                  {category.skills.map((skill) => (
                                    <div key={skill} className="flex items-center space-x-2">
                                      <Checkbox id={skill} />
                                      <Label htmlFor={skill} className="text-sm">
                                        {skill}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Safety Awareness Scale</Label>
                          <RadioGroup className="flex gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div key={num} className="flex items-center space-x-2">
                                <RadioGroupItem value={num.toString()} id={`safety-${num}`} />
                                <Label htmlFor={`safety-${num}`}>{num}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <p className="text-sm text-gray-500 mt-1">
                            1 = No safety awareness, 5 = Age-appropriate safety awareness
                          </p>
                          <Textarea
                            className="mt-2"
                            placeholder="Describe specific safety concerns and awareness level..."
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label htmlFor="educational-iep">Educational/IEP Review Summary</Label>
                          <div className="space-y-2 mt-1">
                            <Input placeholder="Current educational placement" />
                            <Textarea placeholder="IEP goals and objectives summary..." rows={3} />
                            <Textarea placeholder="Educational strengths and challenges..." rows={2} />
                            <Textarea placeholder="Recommended educational supports..." rows={2} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="skill-goals">Skill Goals List</Label>
                          <div className="space-y-2 mt-1">
                            <Textarea placeholder="Short-term skill development goals (3-6 months)..." rows={3} />
                            <Textarea placeholder="Long-term skill development goals (6-12 months)..." rows={3} />
                            <Textarea placeholder="Priority skills for immediate focus..." rows={2} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Environmental/Sensory */}
                    <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                      <h4 className="font-semibold text-purple-800 mb-2">Environmental/Sensory (7-day deadline)</h4>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="sensory-profile" />
                          <Label htmlFor="sensory-profile">Sensory profile completed</Label>
                        </div>
                        <div>
                          <Label htmlFor="environmental-modifications">Environmental Modifications List</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Noise reduction",
                              "Lighting adjustments",
                              "Sensory breaks area",
                              "Fidget tools",
                              "Weighted items",
                              "Texture modifications",
                              "Visual schedules",
                              "Calm down space",
                              "Movement breaks",
                              "Seating modifications",
                              "Temperature control",
                              "Reduced stimulation",
                            ].map((modification) => (
                              <div key={modification} className="flex items-center space-x-2">
                                <Checkbox id={modification} />
                                <Label htmlFor={modification}>{modification}</Label>
                              </div>
                            ))}
                          </div>
                          <Textarea
                            className="mt-2"
                            placeholder="Describe specific environmental modifications needed..."
                            rows={2}
                          />
                        </div>
                        <div>
                          <Label>Elopement Risk Scale with Plan</Label>
                          <RadioGroup className="flex gap-4 mt-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div key={num} className="flex items-center space-x-2">
                                <RadioGroupItem value={num.toString()} id={`elopement-${num}`} />
                                <Label htmlFor={`elopement-${num}`}>{num}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                          <p className="text-sm text-gray-500 mt-1">1 = No risk, 5 = High elopement risk</p>
                          <div className="mt-2 space-y-2">
                            <Textarea
                              placeholder="If risk exists, describe elopement triggers and patterns..."
                              rows={2}
                            />
                            <Textarea placeholder="Elopement prevention plan and strategies..." rows={2} />
                            <Textarea placeholder="Response plan if elopement occurs..." rows={2} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="routine-requirements">Routine Requirements Form</Label>
                          <div className="space-y-3 mt-1">
                            <div>
                              <Label className="text-sm text-gray-500">Daily Routine Structure</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select routine needs" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="highly-structured">Highly structured - minimal changes</SelectItem>
                                  <SelectItem value="moderately-structured">
                                    Moderately structured - some flexibility
                                  </SelectItem>
                                  <SelectItem value="flexible">Flexible - adapts to changes well</SelectItem>
                                  <SelectItem value="variable">Variable - depends on situation</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Textarea
                              placeholder="Describe specific routine requirements and preferences..."
                              rows={2}
                            />
                            <Textarea placeholder="How does child respond to routine changes?" rows={2} />
                            <Textarea placeholder="Strategies for managing routine disruptions..." rows={2} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* ========== SUBSTANCE USE SUPPORT SERVICES MODULE ========== */}
              {childData.servicePackage === "Substance Use" && (
                <Card className="border-l-4 border-amber-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5 text-amber-600" />
                      Substance Use Assessment
                    </CardTitle>
                    <CardDescription>
                      Reference: FC-SU-01 Substance Use Support Services Policy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Policy Banner */}
                    <Alert className="bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-800">Non-Punitive, Recovery-Focused Approach</AlertTitle>
                      <AlertDescription className="text-amber-700">
                        Per FC-SU-01 and TBRI® principles: Substance use is addressed as a health issue requiring 
                        support, not punishment. Focus on recovery-oriented interventions and relapse as part of 
                        the recovery process.
                      </AlertDescription>
                    </Alert>

                    {/* Initial Substance Use Screening */}
                    <div className="p-4 border-l-4 border-red-500 bg-red-50">
                      <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Initial Substance Use Screening
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Has child/youth been identified as having a substance use disorder? <span className="text-red-500">*</span></Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={substanceUseAssessment.identified || ""}
                            onValueChange={(v) => setSubstanceUseAssessment((prev: any) => ({...prev, identified: v}))}>
                            {["Yes - Diagnosed", "Yes - Suspected", "No", "Unknown"].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`su-identified-${opt}`} />
                                <Label htmlFor={`su-identified-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label>Is there documented history of substance use? <span className="text-red-500">*</span></Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={substanceUseAssessment.history || ""}
                            onValueChange={(v) => setSubstanceUseAssessment((prev: any) => ({...prev, history: v}))}>
                            {["Yes", "No", "Unknown"].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`su-history-${opt}`} />
                                <Label htmlFor={`su-history-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {substanceUseAssessment.history === "Yes" && (
                          <div className="mt-4 p-3 bg-white rounded border">
                            <Label>Substances involved (check all that apply):</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {[
                                "Alcohol",
                                "Cannabis/Marijuana",
                                "Opioids (prescription or illicit)",
                                "Stimulants (cocaine, methamphetamine)",
                                "Benzodiazepines",
                                "Inhalants",
                                "Other"
                              ].map((substance) => (
                                <div key={substance} className="flex items-center space-x-2">
                                  <Checkbox id={`substance-${substance}`} />
                                  <Label htmlFor={`substance-${substance}`}>{substance}</Label>
                                </div>
                              ))}
                            </div>
                            <Textarea className="mt-3" placeholder="If other, specify..." rows={2} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Treatment History */}
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <h4 className="font-semibold text-yellow-800 mb-4">Treatment History</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Previous substance use treatment?</Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={substanceUseAssessment.previousTreatment || ""}
                            onValueChange={(v) => setSubstanceUseAssessment((prev: any) => ({...prev, previousTreatment: v}))}>
                            {["Yes", "No", "Unknown"].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`su-prev-${opt}`} />
                                <Label htmlFor={`su-prev-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {substanceUseAssessment.previousTreatment === "Yes" && (
                          <div className="mt-4 p-3 bg-white rounded border space-y-3">
                            <Label>Types of previous treatment:</Label>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                "Outpatient counseling",
                                "Intensive outpatient (IOP)",
                                "Residential treatment",
                                "Detoxification",
                                "Medication-Assisted Treatment (MAT)",
                                "Support groups (AA/NA)",
                                "Other"
                              ].map((tx) => (
                                <div key={tx} className="flex items-center space-x-2">
                                  <Checkbox id={`tx-${tx}`} />
                                  <Label htmlFor={`tx-${tx}`}>{tx}</Label>
                                </div>
                              ))}
                            </div>
                            <Textarea placeholder="Treatment history details (dates, duration, outcomes)..." rows={3} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Current Recovery Status */}
                    <div className="p-4 border-l-4 border-green-500 bg-green-50">
                      <h4 className="font-semibold text-green-800 mb-4">Current Recovery Status</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Current substance use status:</Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={substanceUseAssessment.currentStatus || ""}
                            onValueChange={(v) => setSubstanceUseAssessment((prev: any) => ({...prev, currentStatus: v}))}>
                            {[
                              "Actively using",
                              "In early recovery (< 90 days)",
                              "In sustained recovery (90+ days)",
                              "Unknown/Unable to assess"
                            ].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`su-status-${opt}`} />
                                <Label htmlFor={`su-status-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div>
                          <Label>Currently receiving MAT (Medication-Assisted Treatment)?</Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={substanceUseAssessment.currentMAT || ""}
                            onValueChange={(v) => setSubstanceUseAssessment((prev: any) => ({...prev, currentMAT: v}))}>
                            {["Yes", "No", "Unknown"].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`su-mat-${opt}`} />
                                <Label htmlFor={`su-mat-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {substanceUseAssessment.currentMAT === "Yes" && (
                          <div className="mt-4 p-3 bg-white rounded border grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label>MAT Medication</Label>
                              <Input placeholder="e.g., Suboxone, Vivitrol, Methadone" className="mt-1" />
                            </div>
                            <div>
                              <Label>Prescribing Provider</Label>
                              <Input placeholder="Provider name" className="mt-1" />
                            </div>
                            <div>
                              <Label>Pharmacy</Label>
                              <Input placeholder="Pharmacy name" className="mt-1" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="p-4 border-l-4 border-red-600 bg-red-100">
                      <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Risk Indicators
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Current risk factors (check all that apply):</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            {[
                              "Recent overdose (within 12 months)",
                              "IV drug use history",
                              "Co-occurring mental health diagnosis",
                              "History of withdrawal complications",
                              "Access to substances in current/previous placement",
                              "Peer group actively using substances",
                              "Family history of substance use disorders"
                            ].map((risk) => (
                              <div key={risk} className="flex items-center space-x-2">
                                <Checkbox id={`risk-${risk}`} />
                                <Label htmlFor={`risk-${risk}`} className="text-sm">{risk}</Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label>Overdose risk level: <span className="text-red-500">*</span></Label>
                          <RadioGroup className="flex gap-4 mt-2"
                            value={substanceUseAssessment.overdoseRisk || ""}
                            onValueChange={(v) => setSubstanceUseAssessment((prev: any) => ({...prev, overdoseRisk: v}))}>
                            {["High", "Moderate", "Low", "Unable to assess"].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`od-risk-${opt}`} />
                                <Label htmlFor={`od-risk-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {(substanceUseAssessment.overdoseRisk === "High" || substanceUseAssessment.overdoseRisk === "Moderate") && (
                          <div className="flex items-center space-x-2 p-3 bg-white rounded border">
                            <Checkbox id="naloxone-required" defaultChecked />
                            <Label htmlFor="naloxone-required" className="font-medium text-red-700">
                              Naloxone (Narcan) should be available in foster home
                            </Label>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Recovery Support Planning */}
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <h4 className="font-semibold text-blue-800 mb-4">Recovery Support Planning</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Identified recovery strengths:</Label>
                          <Textarea className="mt-1" placeholder="Motivation for change, support systems, previous successes..." rows={3} />
                        </div>
                        <div>
                          <Label>Potential recovery barriers:</Label>
                          <Textarea className="mt-1" placeholder="Triggers, high-risk situations, lack of support..." rows={3} />
                        </div>
                        <div>
                          <Label>Recommended supports:</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            {[
                              "Weekly individual therapy (minimum per T3C)",
                              "Substance use-specific group therapy",
                              "MAT evaluation/continuation",
                              "Recovery mentor/sponsor connection",
                              "Sober recreational activities",
                              "Family therapy addressing substance use",
                              "Peer support groups"
                            ].map((support) => (
                              <div key={support} className="flex items-center space-x-2">
                                <Checkbox id={`support-${support}`} />
                                <Label htmlFor={`support-${support}`} className="text-sm">{support}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Foster Home Requirements */}
                    <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                      <h4 className="font-semibold text-purple-800 mb-4 flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Foster Home Requirements
                      </h4>
                      <Alert className="mb-4 bg-purple-100 border-purple-300">
                        <Info className="h-4 w-4 text-purple-600" />
                        <AlertDescription className="text-purple-700">
                          Per FC-SU-01: Foster home must be substance-free environment with secure medication storage. 
                          Foster parents must complete Substance Use Support Services training.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="su-home-verified" />
                          <Label htmlFor="su-home-verified">Foster home verified as substance-free environment <span className="text-red-500">*</span></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="su-training-complete" />
                          <Label htmlFor="su-training-complete">Foster parents completed SU-specific training <span className="text-red-500">*</span></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="su-med-storage" />
                          <Label htmlFor="su-med-storage">Medication storage security verified</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* ========== SHORT-TERM ASSESSMENT (STASS) MODULE ========== */}
              {childData.servicePackage === "Short-Term Assessment (STASS)" && (
                <Card className="border-l-4 border-cyan-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-cyan-600" />
                      Short-Term Assessment Coordination
                    </CardTitle>
                    <CardDescription>
                      Reference: FC-STASS-01 Short-Term Assessment Support Services Policy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Critical Timeline Alert */}
                    <Alert variant="destructive" className="bg-red-50 border-red-300">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>CRITICAL TIMELINE REQUIREMENTS</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li><strong>Standard Assessment:</strong> Maximum 30 days</li>
                          <li><strong>Extended Assessment:</strong> Maximum 45 days (requires SSCC/DFPS approval)</li>
                          <li><strong>Service Plan:</strong> Within 7 days (not standard 30)</li>
                          <li><strong>Preliminary Personal Safety Plan:</strong> Within 72 hours</li>
                        </ul>
                      </AlertDescription>
                    </Alert>

                    {/* No Add-Ons Warning */}
                    <Alert className="bg-amber-50 border-amber-200">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <AlertTitle className="text-amber-800">STASS is NOT Eligible for Add-On Services</AlertTitle>
                      <AlertDescription className="text-amber-700">
                        Per T3C Blueprint: Short-Term Assessment Support Services cannot include Transition, 
                        Pregnant/Parenting Youth, or Kinship add-on services.
                      </AlertDescription>
                    </Alert>

                    {/* Assessment Classification */}
                    <div className="p-4 border-l-4 border-cyan-500 bg-cyan-50">
                      <h4 className="font-semibold text-cyan-800 mb-4">Assessment Classification</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Assessment Type: <span className="text-red-500">*</span></Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={stassAssessment.assessmentType}
                            onValueChange={(v) => setStassAssessment((prev: any) => ({...prev, assessmentType: v}))}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="standard" id="stass-standard" />
                              <Label htmlFor="stass-standard">Standard Assessment (30-day maximum)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="extended" id="stass-extended" />
                              <Label htmlFor="stass-extended">Extended Assessment (45-day maximum - requires approval)</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {stassAssessment.assessmentType === "extended" && (
                          <div className="p-3 bg-white rounded border space-y-3">
                            <div>
                              <Label>Justification for extended assessment: <span className="text-red-500">*</span></Label>
                              <Textarea className="mt-1" placeholder="Document complexity factors requiring additional time..." rows={3} />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="sscc-approval" />
                              <Label htmlFor="sscc-approval">SSCC/DFPS approval obtained</Label>
                            </div>
                            <div>
                              <Label>Approval date:</Label>
                              <Input type="date" className="mt-1 max-w-xs" />
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <Label>Placement Start Date: <span className="text-red-500">*</span></Label>
                            <Input type="date" className="mt-1"
                              value={stassAssessment.placementStartDate}
                              onChange={(e) => setStassAssessment((prev: any) => ({...prev, placementStartDate: e.target.value}))} />
                          </div>
                          <div>
                            <Label>Assessment Deadline:</Label>
                            <div className={`mt-1 p-3 rounded font-bold text-lg ${
                              stassDaysRemaining <= 7 ? "bg-red-100 text-red-700" :
                              stassDaysRemaining <= 14 ? "bg-yellow-100 text-yellow-700" :
                              "bg-green-100 text-green-700"
                            }`}>
                              {stassDeadline?.toLocaleDateString()} ({stassDaysRemaining} days remaining)
                              {stassDaysRemaining <= 7 && <span className="block text-sm">⚠️ DEADLINE APPROACHING</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Assessment Reason and Goals */}
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <h4 className="font-semibold text-blue-800 mb-4">Assessment Reason and Goals</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Primary reason for short-term assessment:</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            {[
                              "Initial placement - comprehensive needs assessment",
                              "Placement disruption - assess contributing factors",
                              "Service package determination needed",
                              "Transition planning from residential/other setting",
                              "Reunification assessment",
                              "Adoption readiness assessment",
                              "Other (specify)"
                            ].map((reason) => (
                              <div key={reason} className="flex items-center space-x-2">
                                <Checkbox id={`stass-reason-${reason}`} />
                                <Label htmlFor={`stass-reason-${reason}`} className="text-sm">{reason}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Specific assessment objectives: <span className="text-red-500">*</span></Label>
                          <Textarea className="mt-1" placeholder="What questions need to be answered during this assessment period?" rows={3} />
                        </div>
                      </div>
                    </div>

                    {/* Information Availability */}
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <h4 className="font-semibold text-yellow-800 mb-4">Available History</h4>
                      <Alert className="mb-4 bg-yellow-100 border-yellow-300">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-700">
                          STASS placements often have LIMITED history available. Document what IS known and 
                          flag unknown areas for assessment focus.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-4">
                        <div>
                          <Label>Level of available history: <span className="text-red-500">*</span></Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={stassAssessment.historyLevel || ""}
                            onValueChange={(v) => setStassAssessment((prev: any) => ({...prev, historyLevel: v}))}>
                            {[
                              "Comprehensive - detailed records available",
                              "Partial - some history available",
                              "Minimal - very limited information",
                              "Unknown - new to system, no prior records"
                            ].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`stass-history-${opt}`} />
                                <Label htmlFor={`stass-history-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        <div>
                          <Label>History areas with GAPS (check all that apply):</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            {[
                              "Medical history",
                              "Mental health history",
                              "Trauma history",
                              "Educational history",
                              "Behavioral patterns",
                              "Family history",
                              "Previous placement history",
                              "Substance use history"
                            ].map((area) => (
                              <div key={area} className="flex items-center space-x-2">
                                <Checkbox id={`stass-gap-${area}`} />
                                <Label htmlFor={`stass-gap-${area}`} className="text-sm">{area}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Initial 48-Hour Protocol */}
                    <div className="p-4 border-l-4 border-red-500 bg-red-50">
                      <h4 className="font-semibold text-red-800 mb-4">Initial 48-Hour Enhanced Monitoring</h4>
                      <Alert className="mb-4 bg-red-100 border-red-300">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                          Per FC-STASS-01: Daily foster parent check-ins required during first 48 hours.
                          Preliminary Personal Safety Plan required within 72 hours.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="stass-48hr-protocol" />
                          <Label htmlFor="stass-48hr-protocol">48-hour enhanced monitoring protocol initiated</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="stass-daily-checkin" />
                          <Label htmlFor="stass-daily-checkin">Daily foster parent check-in schedule established</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="stass-crisis-reviewed" />
                          <Label htmlFor="stass-crisis-reviewed">Crisis response protocols reviewed with foster family</Label>
                        </div>
                        <div>
                          <Label>Personal Safety Plan due date:</Label>
                          <Input type="date" className="mt-1 max-w-xs" disabled
                            value={stassAssessment.placementStartDate ? 
                              new Date(new Date(stassAssessment.placementStartDate).getTime() + 3*24*60*60*1000).toISOString().split("T")[0] : ""} />
                        </div>
                      </div>
                    </div>

                    {/* Assessment Coordination Plan */}
                    <div className="p-4 border-l-4 border-green-500 bg-green-50">
                      <h4 className="font-semibold text-green-800 mb-4">Assessment Coordination Plan</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Assessments to be completed during STASS period:</Label>
                          <Textarea className="mt-1" placeholder="List specific assessments, evaluations, and their target completion dates..." rows={3} />
                        </div>
                        <div>
                          <Label>Required assessments:</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            {[
                              "Medical/dental screening (within 72 hours)",
                              "CANS 3.0 initial assessment (within 14 days)",
                              "Educational assessment coordination",
                              "Behavioral observation documentation",
                              "Trauma screening (as appropriate)",
                              "Service package recommendation assessment"
                            ].map((assessment) => (
                              <div key={assessment} className="flex items-center space-x-2">
                                <Checkbox id={`stass-req-${assessment}`} />
                                <Label htmlFor={`stass-req-${assessment}`} className="text-sm">{assessment}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Licensed Therapist assigned for assessment:</Label>
                          <Input className="mt-1" placeholder="Name of therapist" />
                        </div>
                      </div>
                    </div>

                    {/* Transition Planning */}
                    <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                      <h4 className="font-semibold text-purple-800 mb-4">Transition Planning</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Anticipated transition outcome:</Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={stassAssessment.transitionOutcome || ""}
                            onValueChange={(v) => setStassAssessment((prev: any) => ({...prev, transitionOutcome: v}))}>
                            {[
                              "Transition to long-term foster placement (same home)",
                              "Transition to long-term foster placement (different home)",
                              "Transition to specialized service package",
                              "Reunification",
                              "Other permanency outcome",
                              "To be determined through assessment"
                            ].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`stass-transition-${opt}`} />
                                <Label htmlFor={`stass-transition-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                        <div>
                          <Label>Preliminary transition considerations:</Label>
                          <Textarea className="mt-1" placeholder="Initial thoughts on appropriate next placement based on referral information..." rows={3} />
                        </div>
                      </div>
                    </div>

                    {/* Foster Home Requirements */}
                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                      <h4 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Foster Home Requirements
                      </h4>
                      <Alert variant="destructive" className="mb-4 bg-orange-100 border-orange-400">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="text-orange-800">Maximum 4 STASS children per foster home</AlertTitle>
                      </Alert>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="stass-training-complete" />
                          <Label htmlFor="stass-training-complete">Foster parents completed STASS-specific training (4 hours) <span className="text-red-500">*</span></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="stass-family-prepared" />
                          <Label htmlFor="stass-family-prepared">Foster family prepared for short-term, assessment-focused placement</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* ========== TREATMENT FOSTER FAMILY CARE (TFFC) MODULE ========== */}
              {childData.servicePackage === "Treatment Foster Family Care (TFFC)" && (
                <Card className="border-l-4 border-rose-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-rose-600" />
                      Treatment Foster Family Care Clinical Assessment
                    </CardTitle>
                    <CardDescription>
                      Reference: FC-TFFC-01 Treatment Foster Family Care Support Services Policy
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Critical Requirements Alert */}
                    <Alert variant="destructive" className="bg-rose-50 border-rose-300">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>TFFC REQUIREMENTS</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li><strong>Maximum 2 TFFC children per home</strong></li>
                          <li><strong>Maximum 365 days</strong> length of service</li>
                          <li><strong>60-day</strong> Service Plan reviews (not standard 90)</li>
                          <li>Foster home must hold <strong>DUAL credentials</strong> (TFFC + Basic)</li>
                          <li><strong>Treatment Director clinical review REQUIRED</strong></li>
                          <li><strong>24/7 On-Call Licensed Therapist</strong> availability</li>
                        </ul>
                      </AlertDescription>
                    </Alert>

                    <Alert className="bg-rose-50 border-rose-200">
                      <Info className="h-4 w-4 text-rose-600" />
                      <AlertDescription className="text-rose-700">
                        <strong>Regulatory Reference:</strong> Texas Family Code §264.1073; TAC §700.1335
                      </AlertDescription>
                    </Alert>

                    {/* TFFC Eligibility Verification */}
                    <div className="p-4 border-l-4 border-rose-500 bg-rose-50">
                      <h4 className="font-semibold text-rose-800 mb-4 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        TFFC Eligibility Verification
                      </h4>
                      <Alert className="mb-4 bg-rose-100 border-rose-300">
                        <Info className="h-4 w-4 text-rose-600" />
                        <AlertDescription className="text-rose-700">
                          Per T3C Blueprint p.141-142: Child must have DSM-5 diagnosis of emotional, conduct, or 
                          behavioral disorder AND meet 2+ additional criteria.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-4">
                        <div>
                          <Label>DSM-5 diagnosis of emotional, conduct, or behavioral disorder? <span className="text-red-500">*</span></Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={tffcAssessment.dsmDiagnosis || ""}
                            onValueChange={(v) => setTffcAssessment((prev: any) => ({...prev, dsmDiagnosis: v}))}>
                            {["Yes - Verified", "Pending evaluation", "No"].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`tffc-dsm-${opt}`} />
                                <Label htmlFor={`tffc-dsm-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {tffcAssessment.dsmDiagnosis === "Yes - Verified" && (
                          <div className="p-3 bg-white rounded border grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <Label>Primary DSM-5 Diagnosis: <span className="text-red-500">*</span></Label>
                              <Input className="mt-1" placeholder="Diagnosis" />
                            </div>
                            <div>
                              <Label>Diagnosing Clinician:</Label>
                              <Input className="mt-1" placeholder="Clinician name" />
                            </div>
                            <div>
                              <Label>Diagnosis Date:</Label>
                              <Input type="date" className="mt-1" />
                            </div>
                          </div>
                        )}

                        {tffcAssessment.dsmDiagnosis !== "No" && (
                          <div className="p-3 bg-white rounded border">
                            <Label className="font-semibold">Additional qualifying criteria (MUST select 2+): <span className="text-red-500">*</span></Label>
                            <p className="text-sm text-gray-500 mb-3">At least 2 criteria required for TFFC eligibility</p>
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                "Suicide attempt within past 12 months",
                                "Risk of harm to others requiring intensive supervision",
                                "Co-occurring substance use disorder with severe impairment",
                                "Multiple psychiatric hospitalizations",
                                "Multiple placement disruptions due to behavioral issues",
                                "Requires intensive behavioral intervention daily"
                              ].map((criteria) => (
                                <div key={criteria} className="flex items-center space-x-2">
                                  <Checkbox id={`tffc-criteria-${criteria}`} />
                                  <Label htmlFor={`tffc-criteria-${criteria}`}>{criteria}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <Label>Appropriate for family-based setting (vs. residential)? <span className="text-red-500">*</span></Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={tffcAssessment.familyBasedAppropriate || ""}
                            onValueChange={(v) => setTffcAssessment((prev: any) => ({...prev, familyBasedAppropriate: v}))}>
                            {["Yes", "No - Residential recommended", "Requires clinical review"].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`tffc-family-${opt}`} />
                                <Label htmlFor={`tffc-family-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    {/* Treatment Director Review - CRITICAL */}
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                      <h4 className="font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Treatment Director Clinical Review (REQUIRED)
                      </h4>
                      <Alert variant="destructive" className="mb-4 bg-yellow-100 border-yellow-400">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="text-yellow-800">
                          Treatment Director MUST review and approve TFFC eligibility per Texas Family Code §264.1073 
                          and TAC §700.1335
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-4">
                        <div className="p-3 bg-white rounded border">
                          <Label className="text-gray-500">Treatment Director:</Label>
                          <p className="font-semibold">Angel Wolfe, LMSW</p>
                        </div>
                        <div>
                          <Label>Treatment Director Review Status: <span className="text-red-500">*</span></Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={tffcAssessment.treatmentDirectorReview}
                            onValueChange={(v) => setTffcAssessment((prev: any) => ({...prev, treatmentDirectorReview: v}))}>
                            {[
                              "Approved - Meets TFFC criteria",
                              "Pending - Additional information needed",
                              "Not approved - Does not meet criteria",
                              "Not approved - Residential level recommended"
                            ].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`tffc-td-${opt}`} />
                                <Label htmlFor={`tffc-td-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {tffcAssessment.treatmentDirectorReview === "Pending - Additional information needed" && (
                          <div>
                            <Label>Additional information needed: <span className="text-red-500">*</span></Label>
                            <Textarea className="mt-1" placeholder="Specify what additional information is required..." rows={3} />
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Review Date: <span className="text-red-500">*</span></Label>
                            <Input type="date" className="mt-1" />
                          </div>
                          <div>
                            <Label>Treatment Director Signature/Initials: <span className="text-red-500">*</span></Label>
                            <Input className="mt-1" placeholder="Initials" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Clinical Presentation */}
                    <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                      <h4 className="font-semibold text-purple-800 mb-4">Clinical Presentation</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Summary of serious emotional/behavioral challenges: <span className="text-red-500">*</span></Label>
                          <Textarea className="mt-1" placeholder="Describe the specific behaviors, frequency, intensity, and impact..." rows={4} />
                        </div>
                        <div>
                          <Label>Primary presenting concerns:</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {[
                              "Severe aggression (physical)",
                              "Severe aggression (verbal)",
                              "Self-harm behaviors",
                              "Suicidal ideation/attempts",
                              "Psychotic symptoms",
                              "Severe anxiety/panic",
                              "Severe depression",
                              "Trauma responses/PTSD symptoms",
                              "Attachment disruption",
                              "Elopement/running away",
                              "Property destruction",
                              "Fire-setting",
                              "Sexual acting out",
                              "Substance use",
                              "Eating disorder behaviors",
                              "Other"
                            ].map((concern) => (
                              <div key={concern} className="flex items-center space-x-2">
                                <Checkbox id={`tffc-concern-${concern}`} />
                                <Label htmlFor={`tffc-concern-${concern}`} className="text-sm">{concern}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Crisis frequency (past 30 days):</Label>
                          <RadioGroup className="flex flex-wrap gap-4 mt-2"
                            value={tffcAssessment.crisisFrequency || ""}
                            onValueChange={(v) => setTffcAssessment((prev: any) => ({...prev, crisisFrequency: v}))}>
                            {["Daily", "Multiple times per week", "Weekly", "Less than weekly", "Unknown"].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`tffc-crisis-${opt}`} />
                                <Label htmlFor={`tffc-crisis-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    {/* Treatment History */}
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <h4 className="font-semibold text-blue-800 mb-4">Treatment History</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Previous treatment settings:</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Outpatient therapy",
                              "Intensive outpatient",
                              "Partial hospitalization",
                              "Inpatient psychiatric hospitalization",
                              "Residential treatment center",
                              "Therapeutic foster care (prior)",
                              "Group home",
                              "None documented"
                            ].map((setting) => (
                              <div key={setting} className="flex items-center space-x-2">
                                <Checkbox id={`tffc-setting-${setting}`} />
                                <Label htmlFor={`tffc-setting-${setting}`}>{setting}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Number of psychiatric hospitalizations:</Label>
                            <Input type="number" className="mt-1" placeholder="0" />
                          </div>
                          <div>
                            <Label>Number of previous placements:</Label>
                            <Input type="number" className="mt-1" placeholder="0" />
                          </div>
                        </div>
                        <div>
                          <Label>Summary of previous treatment and outcomes:</Label>
                          <Textarea className="mt-1" placeholder="What has worked? What hasn't? Patterns in placement disruptions..." rows={3} />
                        </div>
                      </div>
                    </div>

                    {/* Current Medications */}
                    <div className="p-4 border-l-4 border-green-500 bg-green-50">
                      <h4 className="font-semibold text-green-800 mb-4">Psychiatric Medications</h4>
                      <div className="space-y-4">
                        <div>
                          <Label>Currently prescribed psychiatric medications?</Label>
                          <RadioGroup className="mt-2 space-y-2"
                            value={tffcAssessment.hasMedications || ""}
                            onValueChange={(v) => setTffcAssessment((prev: any) => ({...prev, hasMedications: v}))}>
                            {["Yes", "No", "Unknown"].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`tffc-meds-${opt}`} />
                                <Label htmlFor={`tffc-meds-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        {tffcAssessment.hasMedications === "Yes" && (
                          <div className="space-y-2">
                            {[1, 2, 3].map((index) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-2 p-2 bg-white rounded border">
                                <Input placeholder="Medication Name" />
                                <Input placeholder="Dosage" />
                                <Input placeholder="Frequency" />
                                <Input placeholder="Prescriber" />
                                <Input placeholder="Target Symptoms" />
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Checkbox id="tffc-med-appt" />
                          <Label htmlFor="tffc-med-appt">Medication management appointment scheduled</Label>
                        </div>
                      </div>
                    </div>

                    {/* Step-Down Planning */}
                    <div className="p-4 border-l-4 border-teal-500 bg-teal-50">
                      <h4 className="font-semibold text-teal-800 mb-4">Step-Down Planning (Initial)</h4>
                      <Alert className="mb-4 bg-teal-100 border-teal-300">
                        <Info className="h-4 w-4 text-teal-600" />
                        <AlertDescription className="text-teal-700">
                          Per FC-TFFC-01: Step-down planning begins early. Goal is transition to less intensive 
                          setting within 365-day maximum.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-4">
                        <div>
                          <Label>Initial step-down goals:</Label>
                          <Textarea className="mt-1" placeholder="What needs to change for this child to step down to Basic or other package?" rows={3} />
                        </div>
                        <div>
                          <Label>Potential step-down indicators to monitor:</Label>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {[
                              "Reduced crisis frequency",
                              "Improved emotional regulation",
                              "Stable medication regimen",
                              "Consistent school attendance",
                              "Reduced need for intensive supervision",
                              "Improved family relationships",
                              "Development of coping skills",
                              "Reduced self-harm/suicidal behaviors"
                            ].map((indicator) => (
                              <div key={indicator} className="flex items-center space-x-2">
                                <Checkbox id={`tffc-indicator-${indicator}`} />
                                <Label htmlFor={`tffc-indicator-${indicator}`} className="text-sm">{indicator}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Projected step-down timeline:</Label>
                          <RadioGroup className="flex flex-wrap gap-4 mt-2"
                            value={tffcAssessment.stepDownTimeline || ""}
                            onValueChange={(v) => setTffcAssessment((prev: any) => ({...prev, stepDownTimeline: v}))}>
                            {["3-6 months", "6-9 months", "9-12 months", "Unable to project at this time"].map((opt) => (
                              <div key={opt} className="flex items-center space-x-2">
                                <RadioGroupItem value={opt} id={`tffc-timeline-${opt}`} />
                                <Label htmlFor={`tffc-timeline-${opt}`}>{opt}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    {/* Foster Home Requirements */}
                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                      <h4 className="font-semibold text-orange-800 mb-4 flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Foster Home Requirements
                      </h4>
                      <Alert variant="destructive" className="mb-4 bg-orange-100 border-orange-400">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle className="text-orange-800">Maximum 2 TFFC children per foster home</AlertTitle>
                        <AlertDescription className="text-orange-700">
                          Home must hold DUAL credentials: TFFC + Basic (for step-down in place)
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tffc-credential" />
                          <Label htmlFor="tffc-credential">Foster home holds TFFC credential <span className="text-red-500">*</span></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tffc-basic-credential" />
                          <Label htmlFor="tffc-basic-credential">Foster home holds Basic Foster Home credential (for step-down) <span className="text-red-500">*</span></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tffc-training" />
                          <Label htmlFor="tffc-training">Foster parents completed 20-hour TFFC specialized training <span className="text-red-500">*</span></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tffc-intensive-prepared" />
                          <Label htmlFor="tffc-intensive-prepared">Foster family prepared for intensive therapeutic environment</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tffc-oncall-provided" />
                          <Label htmlFor="tffc-oncall-provided">On-Call Licensed Therapist contact information provided to foster family <span className="text-red-500">*</span></Label>
                        </div>
                      </div>
                    </div>

                    {/* Service Intensity */}
                    <div className="p-4 border-l-4 border-indigo-500 bg-indigo-50">
                      <h4 className="font-semibold text-indigo-800 mb-4">Anticipated Service Intensity</h4>
                      <Alert className="mb-4 bg-indigo-100 border-indigo-300">
                        <Info className="h-4 w-4 text-indigo-600" />
                        <AlertDescription className="text-indigo-700">
                          TFFC ratios: 1:6 Case Manager, 1:11 Licensed Therapist, 1:6 BSS. 
                          Weekly therapy minimum required.
                        </AlertDescription>
                      </Alert>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tffc-weekly-therapy" defaultChecked />
                          <Label htmlFor="tffc-weekly-therapy">Weekly therapy scheduled <span className="text-red-500">*</span></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tffc-bss-assigned" />
                          <Label htmlFor="tffc-bss-assigned">Behavioral Support Specialist assigned</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="tffc-psych-coordinated" />
                          <Label htmlFor="tffc-psych-coordinated">Psychiatric services coordinated</Label>
                        </div>
                        <div>
                          <Label>Additional intensive services needed:</Label>
                          <Textarea className="mt-1" placeholder="Specialized therapies, wraparound services, etc." rows={2} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeSection === "special" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Special Populations Considerations</CardTitle>
                  <CardDescription>Additional assessments based on child characteristics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Age 14+ Section */}
                  {childData.age >= 14 && (
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                      <h4 className="font-semibold text-blue-800 mb-4">Age 14+ Considerations</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="casey-life-skills" />
                          <Label htmlFor="casey-life-skills">Casey Life Skills Assessment completed</Label>
                        </div>
                        <div>
                          <Label htmlFor="life-skills-score">Assessment Score and Areas of Need</Label>
                          <Textarea id="life-skills-score" placeholder="Document scores and identified needs..." />
                        </div>
                        <div>
                          <Label htmlFor="independent-living-goals">Independent Living Goals</Label>
                          <Textarea
                            id="independent-living-goals"
                            placeholder="List specific goals for independent living..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="transition-planning">Transition Planning Needs</Label>
                          <Textarea
                            id="transition-planning"
                            placeholder="Document transition planning requirements..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Kinship Placement Section */}
                  {childData.isKinship && (
                    <div className="p-4 border-l-4 border-green-500 bg-green-50">
                      <h4 className="font-semibold text-green-800 mb-4">Kinship Placement Considerations</h4>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="prior-relationship">Prior Relationship Narrative</Label>
                          <Textarea
                            id="prior-relationship"
                            placeholder="Describe the child's prior relationship with kinship caregiver..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="family-dynamics">Family Dynamics Evaluation</Label>
                          <Textarea id="family-dynamics" placeholder="Assess family dynamics and relationships..." />
                        </div>
                        <div>
                          <Label htmlFor="support-needs">Support Needs List</Label>
                          <Textarea
                            id="support-needs"
                            placeholder="Identify specific support needs for kinship placement..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="relative-strengths">Relative Strengths</Label>
                          <Textarea id="relative-strengths" placeholder="Document strengths of kinship caregiver..." />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Multiple Placements Section */}
                  {childData.placementHistoryCount >= 3 && (
                    <div className="p-4 border-l-4 border-orange-500 bg-orange-50">
                      <h4 className="font-semibold text-orange-800 mb-4">Multiple Placements (3+) Considerations</h4>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="placement-impact">Placement History Impact Assessment</Label>
                          <Textarea
                            id="placement-impact"
                            placeholder="Assess impact of multiple placement changes..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="trust-building-strategies">Trust-Building Strategies</Label>
                          <Textarea
                            id="trust-building-strategies"
                            placeholder="Document specific trust-building approaches..."
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="stability-plan" />
                          <Label htmlFor="stability-plan">Stability plan developed</Label>
                        </div>
                        <div>
                          <Label htmlFor="successful-strategies">Previous Successful Strategies</Label>
                          <Textarea
                            id="successful-strategies"
                            placeholder="Document what has worked in previous placements..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Show message if no special populations apply */}
                  {childData.age < 14 && !childData.isKinship && childData.placementHistoryCount < 3 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No special population considerations apply to this child based on current data.</p>
                      <p className="text-sm mt-2">
                        This section will populate if the child meets special population criteria.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "documents" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Document Management
                </CardTitle>
                <CardDescription>Upload and organize all assessment-related documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Document Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
                  <p className="text-gray-500 mb-4">Drag and drop files here, or click to browse</p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                </div>

                {/* Document Categories */}
                <div>
                  <h4 className="font-semibold mb-4">Document Categories</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { category: "Assessment Forms", count: 3, color: "bg-blue-100 text-blue-800" },
                      { category: "Medical Records", count: 2, color: "bg-green-100 text-green-800" },
                      { category: "Educational Records", count: 1, color: "bg-purple-100 text-purple-800" },
                      { category: "Previous Placements", count: 4, color: "bg-orange-100 text-orange-800" },
                      { category: "Legal Documents", count: 2, color: "bg-red-100 text-red-800" },
                      { category: "Other", count: 0, color: "bg-gray-100 text-gray-800" },
                    ].map((cat) => (
                      <div key={cat.category} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium">{cat.category}</h5>
                          <Badge className={cat.color}>{cat.count}</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          View Files
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Documents Alert */}
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Missing Required Documents</AlertTitle>
                  <AlertDescription>
                    The following required documents are still needed:
                    <ul className="list-disc list-inside mt-2">
                      <li>DFPS removal affidavit</li>
                      <li>Previous placement summary</li>
                      <li>Current medical records</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                {/* Uploaded Documents List */}
                <div>
                  <h4 className="font-semibold mb-4">Recently Uploaded</h4>
                  <div className="space-y-2">
                    {[
                      { name: "Medical_History_Jamie_Doe.pdf", size: "2.3 MB", date: "2 hours ago" },
                      { name: "Educational_Records_2024.pdf", size: "1.8 MB", date: "1 day ago" },
                      { name: "CANS_Assessment_Form.pdf", size: "856 KB", date: "2 days ago" },
                    ].map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">
                              {doc.size} • {doc.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* -------- Custom Sections -------- */}
          {customSections.map(
            (section) =>
              activeSection === section.id && (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>Custom assessment section</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      rows={10}
                      value={section.content ?? ""}
                      placeholder="Add your assessment content here…"
                      onChange={(e) =>
                        setCustomSections((prev) =>
                          prev.map((s) => (s.id === section.id ? { ...s, content: e.target.value } : s)),
                        )
                      }
                    />
                  </CardContent>
                </Card>
              ),
          )}

          {/* -------- Add Section Modal -------- */}
          {showAddSection && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Add New Section</CardTitle>
                  <CardDescription>Create a custom assessment section.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="section-title">Section Title</Label>
                    <Input
                      id="section-title"
                      value={newSectionTitle}
                      placeholder="Enter section title…"
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => {
                        if (!newSectionTitle.trim()) return
                        const id = `custom-${Date.now()}`
                        setCustomSections((prev) => [
                          ...prev,
                          { id, title: newSectionTitle.trim(), icon: FileText, progress: 0, content: "" },
                        ])
                        setActiveSection(id)
                        setNewSectionTitle("")
                        setShowAddSection(false)
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => {
                        setShowAddSection(false)
                        setNewSectionTitle("")
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* -------- Bottom Action Buttons -------- */}
      <div className="mt-6 flex flex-wrap justify-end gap-4">
        <Button variant="outline" className="bg-transparent" onClick={saveDraft}>
          <FileClock className="mr-2 h-4 w-4" />
          Save as Draft
        </Button>
        <Button variant="outline" className="bg-transparent" onClick={generatePDF}>
          <Download className="mr-2 h-4 w-4" />
          Generate PDF Report
        </Button>
        <Button
          disabled={!allRequirementsMet()}
          onClick={submitForReview}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <CheckCircle2 className="h-4 w-4" />
          Submit for Review
        </Button>
      </div>

      {/* -------- Auto-save Indicator -------- */}
      {lastSaved && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 rounded-lg bg-green-100 px-3 py-2 text-sm text-green-800">
          <CheckCircle2 className="h-4 w-4" />
          Last saved: {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>
  )
}
