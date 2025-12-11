"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Building,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  FileText,
  Award,
  Shield,
  BookOpen,
  Heart,
  Brain,
  Home,
  Printer,
  Save,
  Send,
} from "lucide-react"

interface HomeData {
  homeId: string
  licenseNumber: string
  familyName: string
  verificationDate: string
  currentChildren: number
  servicePackages: string[]
  lastReviewDate: string
}

interface ReviewData {
  reviewPeriod: {
    from: string
    to: string
  }
  reviewerName: string
  reviewerTitle: string
  reviewType: string
  placements: Array<{
    childName: string
    servicePackage: string
    placementDate: string
    dischargeDate: string | null
    stability: string
    incidents: number
  }>
  training: {
    tbri: { status: string; expiration: string; hours: number }
    cpr: { status: string; expiration: string }
    medication: { status: string; expiration: string }
    emergency: { status: string; expiration: string }
    annualHours: { required: number; completed: number }
    topics: string[]
  }
}

interface FosterHomeQuarterlyReviewProps {
  homeData?: HomeData
  reviewData?: ReviewData
  onUpdate?: (data: any) => void
  onValidationChange?: (isValid: boolean) => void
  viewMode?: "edit" | "view"
}

export function FosterHomeQuarterlyReview({
  homeData,
  reviewData,
  onUpdate,
  onValidationChange,
  viewMode = "edit",
}: FosterHomeQuarterlyReviewProps) {
  const [formData, setFormData] = useState<any>({})
  const [completionProgress, setCompletionProgress] = useState(0)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isDraft, setIsDraft] = useState(true)

  // Mock data for demonstration
  const mockHomeData: HomeData = {
    homeId: "FH-2024-0156",
    licenseNumber: "FL-TFC-2024-0156",
    familyName: "Johnson Family",
    verificationDate: "2024-01-15",
    currentChildren: 2,
    servicePackages: ["T3C Basic", "Mental & Behavioral Health"],
    lastReviewDate: "2024-10-15",
  }

  const mockReviewData: ReviewData = {
    reviewPeriod: {
      from: "2024-10-01",
      to: "2024-12-31",
    },
    reviewerName: "Sarah Martinez",
    reviewerTitle: "Home Developer",
    reviewType: "Quarterly",
    placements: [
      {
        childName: "Child A",
        servicePackage: "Mental & Behavioral Health",
        placementDate: "2024-09-15",
        dischargeDate: null,
        stability: "Stable",
        incidents: 0,
      },
      {
        childName: "Child B",
        servicePackage: "T3C Basic",
        placementDate: "2024-11-01",
        dischargeDate: null,
        stability: "Stable",
        incidents: 1,
      },
    ],
    training: {
      tbri: { status: "Current", expiration: "2025-06-15", hours: 40 },
      cpr: { status: "Current", expiration: "2025-03-20" },
      medication: { status: "Expiring", expiration: "2025-01-30" },
      emergency: { status: "Current", expiration: "2025-08-10" },
      annualHours: { required: 30, completed: 22 },
      topics: ["TBRI Refresher", "Trauma-Informed Care", "Crisis Management"],
    },
  }

  const currentHomeData = homeData || mockHomeData
  const currentReviewData = reviewData || mockReviewData

  // Calculate review status
  const isOverdue = new Date(currentHomeData.lastReviewDate) < new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
  const daysUntilDue = Math.ceil(
    (new Date(currentHomeData.lastReviewDate).getTime() + 90 * 24 * 60 * 60 * 1000 - Date.now()) /
      (24 * 60 * 60 * 1000),
  )

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(formData).length > 0) {
        setLastSaved(new Date())
        // Simulate auto-save
        console.log("Auto-saved:", formData)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [formData])

  // Calculate completion progress
  useEffect(() => {
    const totalSections = 12
    const completedSections = Object.keys(formData).length
    setCompletionProgress((completedSections / totalSections) * 100)
  }, [formData])

  const handleFieldChange = (field: string, value: any) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    onUpdate?.(updatedData)
  }

  const handleSaveDraft = () => {
    setIsDraft(true)
    setLastSaved(new Date())
    console.log("Saved as draft:", formData)
  }

  const handleSubmitReview = () => {
    setIsDraft(false)
    console.log("Submitted review:", formData)
    // Send notification to Program Director
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Current":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Current
          </Badge>
        )
      case "Expiring":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Expiring
          </Badge>
        )
      case "Expired":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Expired
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 print:p-0 print:space-y-4">
      {/* Header */}
      <div className="bg-white rounded-lg border p-6 print:border-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Building className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Quarterly Foster Home Review & Credentialing Assessment
              </h1>
              <p className="text-gray-600">
                Home: {currentHomeData.familyName} | License: {currentHomeData.licenseNumber}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              {isOverdue ? (
                <Badge className="bg-red-100 text-red-800">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Overdue
                </Badge>
              ) : (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  On Schedule
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">
              Due: {daysUntilDue > 0 ? `${daysUntilDue} days` : `${Math.abs(daysUntilDue)} days overdue`}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm font-medium">Review Completion</Label>
            <span className="text-sm text-gray-600">{Math.round(completionProgress)}%</span>
          </div>
          <Progress value={completionProgress} className="h-2" />
        </div>

        {/* Last Saved Indicator */}
        {lastSaved && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Save className="w-4 h-4" />
            Last saved: {lastSaved.toLocaleTimeString()}
            {isDraft && <Badge variant="outline">Draft</Badge>}
          </div>
        )}
      </div>

      {/* Review Period Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Review Period Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="reviewFrom">Review Period From</Label>
              <Input
                id="reviewFrom"
                type="date"
                defaultValue={currentReviewData.reviewPeriod.from}
                disabled={viewMode === "view"}
                onChange={(e) => handleFieldChange("reviewPeriodFrom", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="reviewTo">Review Period To</Label>
              <Input
                id="reviewTo"
                type="date"
                defaultValue={currentReviewData.reviewPeriod.to}
                disabled={viewMode === "view"}
                onChange={(e) => handleFieldChange("reviewPeriodTo", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="reviewDue">Review Due Date</Label>
              <Input
                id="reviewDue"
                type="date"
                disabled={viewMode === "view"}
                onChange={(e) => handleFieldChange("reviewDueDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reviewerName">Reviewer Name</Label>
              <Input
                id="reviewerName"
                defaultValue={currentReviewData.reviewerName}
                disabled={viewMode === "view"}
                onChange={(e) => handleFieldChange("reviewerName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="reviewerTitle">Reviewer Title</Label>
              <Input
                id="reviewerTitle"
                defaultValue={currentReviewData.reviewerTitle}
                disabled={viewMode === "view"}
                onChange={(e) => handleFieldChange("reviewerTitle", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Review Type</Label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="quarterly" defaultChecked={currentReviewData.reviewType === "Quarterly"} />
                  <Label htmlFor="quarterly">Quarterly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="annual" />
                  <Label htmlFor="annual">Annual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="special" />
                  <Label htmlFor="special">Special Review</Label>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="currentChildren">Number of Children Currently Placed</Label>
              <Input
                id="currentChildren"
                type="number"
                defaultValue={currentHomeData.currentChildren}
                disabled={viewMode === "view"}
                onChange={(e) => handleFieldChange("currentChildren", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Service Packages Home is Credentialed For</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {[
                "T3C Basic",
                "Mental & Behavioral Health",
                "IDD/Autism",
                "Respite",
                "Transition Support",
                "Kinship Support",
              ].map((pkg) => (
                <div key={pkg} className="flex items-center space-x-2">
                  <Checkbox
                    id={pkg}
                    defaultChecked={currentHomeData.servicePackages.includes(pkg)}
                    disabled={viewMode === "view"}
                  />
                  <Label htmlFor={pkg} className="text-sm">
                    {pkg}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Placement Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Placement Summary
          </CardTitle>
          <CardDescription>All placements during review period</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child Name</TableHead>
                <TableHead>Service Package</TableHead>
                <TableHead>Placement Date</TableHead>
                <TableHead>Discharge Date</TableHead>
                <TableHead>Stability</TableHead>
                <TableHead>Incidents</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentReviewData.placements.map((placement, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{placement.childName}</TableCell>
                  <TableCell>{placement.servicePackage}</TableCell>
                  <TableCell>{placement.placementDate}</TableCell>
                  <TableCell>{placement.dischargeDate || "Current"}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        placement.stability === "Stable"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {placement.stability}
                    </Badge>
                  </TableCell>
                  <TableCell>{placement.incidents}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label className="text-sm font-medium">Total Placements This Quarter</Label>
              <div className="text-2xl font-bold text-blue-600">{currentReviewData.placements.length}</div>
            </div>
            <div>
              <Label className="text-sm font-medium">Successful Discharges</Label>
              <div className="text-2xl font-bold text-green-600">
                {currentReviewData.placements.filter((p) => p.dischargeDate && p.stability === "Stable").length}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Unplanned Disruptions</Label>
              <div className="text-2xl font-bold text-red-600">0</div>
            </div>
            <div>
              <Label className="text-sm font-medium">Average Length of Stay</Label>
              <div className="text-2xl font-bold text-purple-600">45 days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Compliance Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Training Compliance Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Core Requirements */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Core Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">TBRI® Certification</div>
                  <div className="text-sm text-gray-600">Expires: {currentReviewData.training.tbri.expiration}</div>
                  <div className="text-sm text-gray-600">{currentReviewData.training.tbri.hours} hours completed</div>
                </div>
                {getStatusBadge(currentReviewData.training.tbri.status)}
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">CPR/First Aid</div>
                  <div className="text-sm text-gray-600">Expires: {currentReviewData.training.cpr.expiration}</div>
                </div>
                {getStatusBadge(currentReviewData.training.cpr.status)}
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Medication Administration</div>
                  <div className="text-sm text-gray-600">
                    Expires: {currentReviewData.training.medication.expiration}
                  </div>
                </div>
                {getStatusBadge(currentReviewData.training.medication.status)}
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Emergency Behavior Intervention</div>
                  <div className="text-sm text-gray-600">
                    Expires: {currentReviewData.training.emergency.expiration}
                  </div>
                </div>
                {getStatusBadge(currentReviewData.training.emergency.status)}
              </div>
            </div>
          </div>

          {/* Annual Training Progress */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Annual Training Progress</h3>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Required Hours: {currentReviewData.training.annualHours.required}</span>
                <span className="font-medium">Completed: {currentReviewData.training.annualHours.completed}</span>
              </div>
              <Progress
                value={
                  (currentReviewData.training.annualHours.completed / currentReviewData.training.annualHours.required) *
                  100
                }
                className="mb-4"
              />
              <div>
                <Label className="text-sm font-medium">Topics Completed:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentReviewData.training.topics.map((topic, index) => (
                    <Badge key={index} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Package-Specific Training */}
          {currentHomeData.servicePackages.includes("Mental & Behavioral Health") && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Mental & Behavioral Health Training
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Mental Health First Aid</div>
                    <div className="text-sm text-gray-600">Date: 2024-08-15</div>
                  </div>
                  {getStatusBadge("Current")}
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Crisis Prevention (CPI)</div>
                    <div className="text-sm text-gray-600">Date: 2024-09-20</div>
                  </div>
                  {getStatusBadge("Current")}
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Trauma-Focused Interventions</div>
                    <div className="text-sm text-gray-600">Date: 2024-07-10</div>
                  </div>
                  {getStatusBadge("Current")}
                </div>
              </div>
            </div>
          )}

          <Button className="w-full md:w-auto">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Training
          </Button>
        </CardContent>
      </Card>

      {/* T3C Credentialing Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            T3C Credentialing Assessment (FC-CRED-01 Integration)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* TBRI Implementation Evaluation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">TBRI® Implementation Evaluation</h3>
            <p className="text-sm text-gray-600 mb-4">Rate each area 1-5 with evidence notes</p>

            <div className="space-y-4">
              {[
                { area: "Connecting Principles", description: "Building trust and attachment" },
                { area: "Empowering Principles", description: "Meeting physical and emotional needs" },
                { area: "Correcting Principles", description: "Addressing behavioral challenges with compassion" },
              ].map((principle, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium">{principle.area}</div>
                      <div className="text-sm text-gray-600">{principle.description}</div>
                    </div>
                    <Select disabled={viewMode === "view"}>
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="Rate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Textarea placeholder="Evidence and examples..." disabled={viewMode === "view"} className="mt-2" />
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <Label className="font-medium">Overall TBRI® Fidelity Rating</Label>
              <Select disabled={viewMode === "view"}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Select overall rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Needs Significant Improvement</SelectItem>
                  <SelectItem value="2">2 - Needs Improvement</SelectItem>
                  <SelectItem value="3">3 - Developing</SelectItem>
                  <SelectItem value="4">4 - Proficient</SelectItem>
                  <SelectItem value="5">5 - Exemplary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Service Delivery Capabilities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Delivery Capabilities</h3>
            <div className="space-y-2">
              {[
                "Maintains safe therapeutic environment",
                "Implements treatment plans effectively",
                "Maintains required documentation",
                "Collaborates with treatment team",
                "Supports normalcy activities",
                "Available 24/7 for emergencies",
              ].map((capability, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`capability-${index}`} disabled={viewMode === "view"} />
                  <Label htmlFor={`capability-${index}`}>{capability}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Package-Specific Competencies */}
          {currentHomeData.servicePackages.includes("Mental & Behavioral Health") && (
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Mental & Behavioral Health Competencies
              </h3>
              <div className="space-y-4">
                {[
                  {
                    skill: "Crisis Management Skills",
                    description: "Ability to de-escalate and manage crisis situations",
                  },
                  {
                    skill: "De-escalation Effectiveness",
                    description: "Success in preventing escalation of behaviors",
                  },
                  { skill: "Therapeutic Boundaries", description: "Maintains appropriate professional boundaries" },
                ].map((competency, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{competency.skill}</div>
                        <div className="text-sm text-gray-600">{competency.description}</div>
                      </div>
                      <Select disabled={viewMode === "view"}>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Rate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea placeholder="Examples and evidence..." disabled={viewMode === "view"} className="mt-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Home Environment & Safety */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Home Environment & Safety
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Physical Environment</h3>
            <div className="space-y-2">
              {[
                "Home remains safe and clean",
                "Bedroom arrangements appropriate",
                "Medications properly stored",
                "Safety equipment functional",
                "Emergency plans posted",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`environment-${index}`} disabled={viewMode === "view"} />
                  <Label htmlFor={`environment-${index}`}>{item}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Recent Changes</h3>
            <div className="space-y-2">
              {[
                "No changes to household composition",
                "No changes to physical structure",
                "Pets vaccinated and safe",
                "Transportation adequate",
                "Insurance current",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`changes-${index}`} disabled={viewMode === "view"} />
                  <Label htmlFor={`changes-${index}`}>{item}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="concerns">Note any concerns</Label>
            <Textarea
              id="concerns"
              placeholder="Document any concerns or observations..."
              disabled={viewMode === "view"}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quality Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Quality Indicators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="strengths">Strengths Observed This Quarter</Label>
            <Textarea
              id="strengths"
              placeholder="List 3-5 key strengths observed..."
              disabled={viewMode === "view"}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="growth">Areas for Growth</Label>
            <Textarea
              id="growth"
              placeholder="Specific development needs..."
              disabled={viewMode === "view"}
              className="mt-2"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support Provided by Agency</h3>
            <div className="space-y-2">
              {[
                "Monthly case management visits",
                "24/7 on-call support utilized",
                "Respite provided",
                "Additional training provided",
                "Clinical consultation",
                "In-home support visits",
              ].map((support, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`support-${index}`} disabled={viewMode === "view"} />
                  <Label htmlFor={`support-${index}`}>{support}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Foster Parent Feedback</h3>
            <div className="space-y-4">
              <div>
                <Label>Satisfaction with agency support (1-5 scale)</Label>
                <Select disabled={viewMode === "view"}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Very Dissatisfied</SelectItem>
                    <SelectItem value="2">2 - Dissatisfied</SelectItem>
                    <SelectItem value="3">3 - Neutral</SelectItem>
                    <SelectItem value="4">4 - Satisfied</SelectItem>
                    <SelectItem value="5">5 - Very Satisfied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="challenges">Biggest challenges this quarter</Label>
                <Textarea
                  id="challenges"
                  placeholder="Describe main challenges..."
                  disabled={viewMode === "view"}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="additionalSupport">Additional support needed</Label>
                <Textarea
                  id="additionalSupport"
                  placeholder="What additional support would be helpful..."
                  disabled={viewMode === "view"}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credentialing Determination */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Credentialing Determination
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Current Credentials Maintained</h3>
            <div className="space-y-2">
              {[
                "T3C Basic Foster Family Home",
                "Mental & Behavioral Health Support Services",
                "IDD/Autism Spectrum Disorder Support Services",
                "Respite Provider",
              ].map((credential, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`credential-${index}`}
                    disabled={viewMode === "view"}
                    defaultChecked={currentHomeData.servicePackages.some((pkg) =>
                      credential.includes(pkg.split(" ")[0]),
                    )}
                  />
                  <Label htmlFor={`credential-${index}`}>{credential}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Add-On Services</h3>
            <div className="space-y-2">
              {["Transition Support", "Kinship Support", "Pregnant & Parenting"].map((addon, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`addon-${index}`} disabled={viewMode === "view"} />
                  <Label htmlFor={`addon-${index}`}>{addon}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Recommendation</h3>
            <div className="space-y-2">
              {[
                "Maintain all current credentials",
                "Add credential for: _________",
                "Conditional approval - improvements needed in: _________",
                "Remove credential for: _________ (requires Program Director approval)",
              ].map((rec, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`rec-${index}`} disabled={viewMode === "view"} />
                  <Label htmlFor={`rec-${index}`}>{rec}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="conditions">Conditions/Required Improvements</Label>
            <Textarea
              id="conditions"
              placeholder="Specify conditions and timeline..."
              disabled={viewMode === "view"}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="nextReview">Next Review Date</Label>
            <Input id="nextReview" type="date" disabled={viewMode === "view"} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      {/* Children-Specific Summaries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Children-Specific Summaries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentReviewData.placements.map((placement, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-3">Child: {placement.childName}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Placement Stability</Label>
                    <Select disabled={viewMode === "view"}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={placement.stability} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="concerns">Some Concerns</SelectItem>
                        <SelectItem value="risk">At Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Foster Parent Engagement</Label>
                    <Select disabled={viewMode === "view"}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="needs-support">Needs Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>TBRI Implementation</Label>
                    <Select disabled={viewMode === "view"}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="effective">Effective</SelectItem>
                        <SelectItem value="developing">Developing</SelectItem>
                        <SelectItem value="struggling">Struggling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <Label htmlFor={`successes-${index}`}>Specific Successes</Label>
                    <Textarea
                      id={`successes-${index}`}
                      placeholder="Brief description of successes..."
                      disabled={viewMode === "view"}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`support-needs-${index}`}>Support Needs</Label>
                    <Textarea
                      id={`support-needs-${index}`}
                      placeholder="Brief description of support needs..."
                      disabled={viewMode === "view"}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance & Sign-offs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Compliance & Sign-offs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Documentation Review</h3>
            <div className="space-y-2">
              {[
                "All incident reports filed appropriately",
                "Medical logs current",
                "Service documentation complete",
                "Financial records in order",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`doc-${index}`} disabled={viewMode === "view"} />
                  <Label htmlFor={`doc-${index}`}>{item}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Signatures</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fosterParent">Foster Parent(s)</Label>
                  <Input id="fosterParent" placeholder="Signature" disabled={viewMode === "view"} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="fpDate">Date</Label>
                  <Input id="fpDate" type="date" disabled={viewMode === "view"} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="homeDeveloper">Home Developer</Label>
                  <Input id="homeDeveloper" placeholder="Signature" disabled={viewMode === "view"} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="hdDate">Date</Label>
                  <Input id="hdDate" type="date" disabled={viewMode === "view"} className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="programDirector">Program Director</Label>
                  <Input id="programDirector" placeholder="Signature" disabled={viewMode === "view"} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="pdDate">Date</Label>
                  <Input id="pdDate" type="date" disabled={viewMode === "view"} className="mt-1" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Distribution</h3>
            <div className="space-y-2">
              {[
                "Copy to foster home file",
                "Update credentialing status in Radius",
                "Flag any children affected by credential changes",
                "Schedule follow-up if improvements needed",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox id={`dist-${index}`} disabled={viewMode === "view"} />
                  <Label htmlFor={`dist-${index}`}>{item}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {viewMode === "edit" && (
        <div className="flex flex-col sm:flex-row gap-4 print:hidden">
          <Button variant="outline" onClick={handleSaveDraft} className="flex-1 bg-transparent">
            <Save className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={handleSubmitReview} className="flex-1">
            <Send className="w-4 h-4 mr-2" />
            Submit Review
          </Button>
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      )}

      {/* Alerts for expiring credentials */}
      {currentReviewData.training.medication.status === "Expiring" && (
        <Alert className="print:hidden">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Medication Administration training expires within 90 days. Schedule renewal training.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
