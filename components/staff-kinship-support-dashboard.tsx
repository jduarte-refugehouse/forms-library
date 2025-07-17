"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Phone,
  DollarSign,
  FileCheck,
  BookOpen,
  BarChart3,
  MapPin,
  Search,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  GraduationCap,
  Shield,
  Bell,
  Settings,
  Filter,
  Plus,
  Eye,
  Edit,
  RefreshCw,
} from "lucide-react"

export function StaffKinshipSupportDashboard() {
  const [selectedRole, setSelectedRole] = useState("kinship-specialist")
  const [searchQuery, setSearchQuery] = useState("")
  const [urgentCases, setUrgentCases] = useState(3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Staff Kinship Support Dashboard</h1>
              <p className="text-gray-600">Comprehensive tools for supporting kinship placements</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="intake">Intake Specialist</SelectItem>
                  <SelectItem value="kinship-specialist">Kinship Specialist</SelectItem>
                  <SelectItem value="case-manager">Case Manager</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Alerts ({urgentCases})
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Urgent Alerts */}
        {urgentCases > 0 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>{urgentCases} urgent cases</strong> require immediate attention.
              <Button variant="link" className="p-0 ml-2 text-red-800 underline">
                View Details
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search cases, families, or resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Case
            </Button>
          </div>
        </div>

        <Tabs defaultValue="intake-center" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="intake-center">Intake</TabsTrigger>
            <TabsTrigger value="benefits-toolkit">Benefits</TabsTrigger>
            <TabsTrigger value="assessment-hub">Assessment</TabsTrigger>
            <TabsTrigger value="case-management">Cases</TabsTrigger>
            <TabsTrigger value="training-knowledge">Training</TabsTrigger>
            <TabsTrigger value="support-operations">24/7 Support</TabsTrigger>
            <TabsTrigger value="data-reporting">Reports</TabsTrigger>
            <TabsTrigger value="resource-library">Resources</TabsTrigger>
          </TabsList>

          {/* Kinship Intake Command Center */}
          <TabsContent value="intake-center">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-800">Urgent Referrals</p>
                        <p className="text-2xl font-bold text-red-600">3</p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Pending Review</p>
                        <p className="text-2xl font-bold text-yellow-600">8</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-800">In Progress</p>
                        <p className="text-2xl font-bold text-blue-600">15</p>
                      </div>
                      <RefreshCw className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">Completed Today</p>
                        <p className="text-2xl font-bold text-green-600">5</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Real-Time Referral Queue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border-l-4 border-red-500 bg-red-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">Emergency Placement - Sarah M.</p>
                            <p className="text-xs text-gray-600">Age 8 • Grandmother available</p>
                          </div>
                          <Badge variant="destructive">URGENT</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Accept</Button>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium text-sm">Kinship Assessment - Johnson Family</p>
                            <p className="text-xs text-gray-600">2 children • Uncle placement</p>
                          </div>
                          <Badge variant="secondary">HIGH</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Accept</Button>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Quick Eligibility Screener
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="relationship">Relationship to Child</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="grandparent">Grandparent</SelectItem>
                            <SelectItem value="aunt-uncle">Aunt/Uncle</SelectItem>
                            <SelectItem value="sibling">Adult Sibling</SelectItem>
                            <SelectItem value="other">Other Relative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="background">Background Check Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clear">Clear</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="review">Needs Review</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Run Eligibility Check</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Benefit Navigation Toolkit */}
          <TabsContent value="benefits-toolkit">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      TANF for Relative Caregivers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Current Rates (2024)</p>
                        <p className="text-lg font-bold text-blue-600">$892/month</p>
                        <p className="text-xs text-gray-600">Family of 3</p>
                      </div>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          Eligibility Calculator
                        </Button>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Application Checklist
                        </Button>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Processing Timeline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Kinship Care Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Monthly Rate</p>
                        <p className="text-lg font-bold text-green-600">$400/child</p>
                        <p className="text-xs text-gray-600">Ages 0-12</p>
                      </div>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          Payment Calculator
                        </Button>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Required Documents
                        </Button>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Approval Process
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Application Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Success Rate</span>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                      <div className="text-xs text-gray-600">Based on last 30 days</div>
                      <Button size="sm" className="w-full">
                        View Detailed Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Application Assistance Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <FileCheck className="h-6 w-6 mb-2" />
                      Pre-filled Templates
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <CheckCircle className="h-6 w-6 mb-2" />
                      Document Matrix
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <DollarSign className="h-6 w-6 mb-2" />
                      Benefit Calculator
                    </Button>
                    <Button variant="outline" className="h-20 flex-col bg-transparent">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      Status Tracking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assessment and Credentialing Hub */}
          <TabsContent value="assessment-hub">
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Kinship Assessment Protocols
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Initial Safety Assessment
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Home className="h-4 w-4 mr-2" />
                        Home Environment Evaluation
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Users className="h-4 w-4 mr-2" />
                        Family Dynamics Assessment
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Shield className="h-4 w-4 mr-2" />
                        Background Check Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Training Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                        <span className="text-sm">TBRI® Foundations</span>
                        <Badge className="bg-green-100 text-green-800">Complete</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                        <span className="text-sm">Kinship Care Basics</span>
                        <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">CPR/First Aid</span>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </div>
                    <Button className="w-full mt-4">Schedule Training</Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Credentialing Checklist</CardTitle>
                  <CardDescription>Track progress through the kinship credentialing process</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Documentation</span>
                      </div>
                      <Progress value={100} className="h-2 mb-2" />
                      <p className="text-xs text-gray-600">All documents submitted</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Background Check</span>
                      </div>
                      <Progress value={100} className="h-2 mb-2" />
                      <p className="text-xs text-gray-600">Cleared</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">Training</span>
                      </div>
                      <Progress value={75} className="h-2 mb-2" />
                      <p className="text-xs text-gray-600">3 of 4 modules complete</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">Home Study</span>
                      </div>
                      <Progress value={25} className="h-2 mb-2" />
                      <p className="text-xs text-gray-600">Scheduled for next week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Case Management Resources */}
          <TabsContent value="case-management">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Active Caseload
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Total Cases</span>
                        <span className="text-2xl font-bold">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">High Priority</span>
                        <span className="text-lg font-semibold text-red-600">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Due This Week</span>
                        <span className="text-lg font-semibold text-yellow-600">7</span>
                      </div>
                      <Button className="w-full mt-4">View All Cases</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Service Plans
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        New Service Plan
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Plan Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Progress Tracking
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Calendar className="h-4 w-4 mr-2" />
                        Review Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Crisis Intervention
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Crisis Protocols
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Shield className="h-4 w-4 mr-2" />
                        Safety Planning
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Users className="h-4 w-4 mr-2" />
                        Emergency Contacts
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Incident Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Case Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm">Johnson Family - Emergency Contact</p>
                          <p className="text-xs text-gray-600">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-sm">Martinez Family - Home Visit Completed</p>
                          <p className="text-xs text-gray-600">1 day ago</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Training and Knowledge Base */}
          <TabsContent value="training-knowledge">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Staff Training Modules
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">Kinship Care Fundamentals</span>
                          <Badge className="bg-green-100 text-green-800">Complete</Badge>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">TBRI® for Staff</span>
                          <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-sm">Crisis Intervention</span>
                          <Badge variant="outline">Not Started</Badge>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Policy Quick Reference
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        Kinship Placement Guidelines
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        Emergency Procedures
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        Documentation Requirements
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        Legal Compliance
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        Safety Protocols
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Best Practice Library
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Successful Kinship Transitions</h4>
                        <p className="text-xs text-gray-600 mb-2">Case study collection</p>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          View Cases
                        </Button>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Family Engagement Strategies</h4>
                        <p className="text-xs text-gray-600 mb-2">Proven techniques</p>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 24/7 Support Operations */}
          <TabsContent value="support-operations">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-800">On-Call Staff</p>
                        <p className="text-lg font-bold text-blue-600">Sarah J.</p>
                      </div>
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-800">Active Cases</p>
                        <p className="text-lg font-bold text-green-600">2</p>
                      </div>
                      <AlertCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-800">Pending Calls</p>
                        <p className="text-lg font-bold text-yellow-600">0</p>
                      </div>
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-800">Shift Ends</p>
                        <p className="text-lg font-bold text-purple-600">6:00 AM</p>
                      </div>
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Crisis Response Protocols
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Emergency Placement Protocol
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Shield className="h-4 w-4 mr-2" />
                        Safety Assessment Checklist
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Escalation Procedures
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Documentation Templates
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Shift Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="font-medium text-sm mb-1">Current Shift</p>
                        <p className="text-sm text-gray-600">10:00 PM - 6:00 AM</p>
                        <p className="text-sm text-gray-600">Sarah Johnson (Primary)</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-sm mb-1">Next Shift</p>
                        <p className="text-sm text-gray-600">6:00 AM - 2:00 PM</p>
                        <p className="text-sm text-gray-600">Mike Rodriguez</p>
                      </div>
                      <Button className="w-full">View Full Schedule</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Data and Reporting Center */}
          <TabsContent value="data-reporting">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Placements</p>
                        <p className="text-2xl font-bold">156</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Success Rate</p>
                        <p className="text-2xl font-bold">87%</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg. Processing Time</p>
                        <p className="text-2xl font-bold">12d</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Active Cases</p>
                        <p className="text-2xl font-bold">43</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Placement Outcomes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Successful Placements</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Placement Stability</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Family Satisfaction</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Benefit Approval Rates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">TANF Applications</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Kinship Payments</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">SNAP Benefits</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Report Generator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="placement-outcomes">Placement Outcomes</SelectItem>
                          <SelectItem value="benefit-tracking">Benefit Tracking</SelectItem>
                          <SelectItem value="staff-performance">Staff Performance</SelectItem>
                          <SelectItem value="family-satisfaction">Family Satisfaction</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date-range">Date Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                          <SelectItem value="last-quarter">Last Quarter</SelectItem>
                          <SelectItem value="last-year">Last Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">Generate Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resource Library */}
          <TabsContent value="resource-library">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Caregiver Materials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Kinship Care Handbook
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Benefits Guide (English)
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Guía de Beneficios (Español)
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Emergency Contact Cards
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        TBRI® Quick Reference
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Legal Forms & Templates
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Kinship Affidavit
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Medical Consent Forms
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        <FileCheck className="h-4 w-4 mr-2" />
                        School Authorization
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Court Report Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-sm bg-transparent">
                        <FileCheck className="h-4 w-4 mr-2" />
                        Safety Plan Templates
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Community Partners
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-2 border rounded">
                        <p className="font-medium text-sm">Texas Health & Human Services</p>
                        <p className="text-xs text-gray-600">(555) 123-4567</p>
                      </div>
                      <div className="p-2 border rounded">
                        <p className="font-medium text-sm">Local Food Bank Network</p>
                        <p className="text-xs text-gray-600">(555) 234-5678</p>
                      </div>
                      <div className="p-2 border rounded">
                        <p className="font-medium text-sm">Children's Mental Health</p>
                        <p className="text-xs text-gray-600">(555) 345-6789</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4 bg-transparent">
                      View Full Directory
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Success Stories Repository</CardTitle>
                  <CardDescription>Inspiring stories from successful kinship placements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium mb-2">The Martinez Family Journey</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        How grandmother Maria successfully navigated the kinship process to provide a loving home for
                        her two grandchildren...
                      </p>
                      <Button size="sm" variant="outline">
                        Read Full Story
                      </Button>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Uncle James Steps Up</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        A single uncle's experience becoming a kinship caregiver and the support that made it
                        possible...
                      </p>
                      <Button size="sm" variant="outline">
                        Read Full Story
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
