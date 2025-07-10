"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock current user
const currentUser = { name: "Casey Worker", id: "worker-123" }

// Sample Data for review purposes
const getSampleData = () => ({
  childId: "child-123-sample",
  placementId: "place-456-sample",
  registeredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  childData: {
    firstName: "Jamie",
    lastName: "Doe",
    dfpsPersonId: "1234567",
    dateOfBirth: "2010-05-15",
    gender: "Female",
    servicePackage: "Mental & Behavioral Health",
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

  useEffect(() => {
    const stored = localStorage.getItem("placementComplete")
    if (stored) {
      const data = JSON.parse(stored)
      setChildData(data.childData)
      setPlacementData(data.placementTasks)
      setIsSampleData(false)
    } else {
      // Load sample data if nothing is in localStorage
      const sample = getSampleData()
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
  }, [])

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
    switch (pkg) {
      case "Mental & Behavioral Health":
        return "bg-purple-100 text-purple-800"
      case "IDD/Autism":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="core">Core Assessment</TabsTrigger>
          <TabsTrigger value="tbri">TBRI®</TabsTrigger>
          {childData.servicePackage !== "basic" && <TabsTrigger value="package">Package-Specific</TabsTrigger>}
          <TabsTrigger value="special">Special Populations</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="review">Review & Submit</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
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
        </TabsContent>

        {/* Core Assessment Tab */}
        <TabsContent value="core">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Section 1: Information Gathering (Days 1-7)</CardTitle>
                <CardDescription>Request and review all relevant records and documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">Records Request Tracking</h4>
                  <div className="space-y-4">
                    {[
                      "DFPS records",
                      "Previous placement records",
                      "Medical records",
                      "Educational records",
                      "Mental health records",
                    ].map((recordType) => (
                      <div key={recordType} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Checkbox id={`${recordType}-requested`} />
                          <Label htmlFor={`${recordType}-requested`} className="font-medium">
                            {recordType} requested
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

            <Card>
              <CardHeader>
                <CardTitle>Section 2: Comprehensive Assessment Areas</CardTitle>
                <CardDescription>Detailed evaluation across all developmental domains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>Comprehensive assessment forms will be implemented here</p>
                  <p className="text-sm mt-2">
                    Including Physical Health, Emotional/Behavioral, Social, Educational, Daily Living, and
                    Cultural/Spiritual assessments
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TBRI Tab */}
        <TabsContent value="tbri">
          <Card>
            <CardHeader>
              <CardTitle>TBRI® Components Assessment</CardTitle>
              <CardDescription>Trauma-Based Relational Intervention principles evaluation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 text-gray-500">
                <p>TBRI® assessment components will be implemented here</p>
                <p className="text-sm mt-2">Including Connecting, Empowering, and Correcting assessments</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Package-Specific Tab */}
        {childData.servicePackage !== "basic" && (
          <TabsContent value="package">
            <Card>
              <CardHeader>
                <CardTitle>Package-Specific Assessment: {childData.servicePackage}</CardTitle>
                <CardDescription>Additional assessments required for this service package</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-16 text-gray-500">
                  <p>Package-specific assessment forms will be implemented here</p>
                  <p className="text-sm mt-2">Tailored to {childData.servicePackage} requirements</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Special Populations Tab */}
        <TabsContent value="special">
          <Card>
            <CardHeader>
              <CardTitle>Special Populations Considerations</CardTitle>
              <CardDescription>Additional assessments based on child characteristics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 text-gray-500">
                <p>Special populations assessments will be implemented here</p>
                <p className="text-sm mt-2">Including age-specific, kinship, and multiple placement considerations</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Upload and organize all assessment-related documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 text-gray-500">
                <p>Document upload and management system will be implemented here</p>
                <p className="text-sm mt-2">Including drag-and-drop functionality and document categorization</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Review & Submit Tab */}
        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit Assessment</CardTitle>
              <CardDescription>Final review and submission for supervisor approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-4">Pre-submission Checklist</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span>All required sections complete</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Complete
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <span>Timeline requirements met</span>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      In Progress
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="foster-input" />
                    <Label htmlFor="foster-input">Foster parent input included</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="youth-voice" />
                    <Label htmlFor="youth-voice">Youth voice included (if appropriate)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="package-requirements" />
                    <Label htmlFor="package-requirements">Package-specific requirements complete</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-semibold mb-4">Supervisor Review Section</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="review-notes">Review Notes</Label>
                    <Textarea id="review-notes" placeholder="Add any notes for supervisor review..." className="mt-1" />
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Assessment summary report will be auto-generated upon submission
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Bottom Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-4 justify-end">
        <Button variant="outline" onClick={saveDraft}>
          Save as Draft
        </Button>
        <Button variant="outline" onClick={generatePDF}>
          <Download className="h-4 w-4 mr-2" />
          Generate PDF Report
        </Button>
        <Button onClick={submitForReview} disabled={!allRequirementsMet()} className="bg-blue-600 hover:bg-blue-700">
          Submit for Review
        </Button>
      </div>
    </div>
  )
}
