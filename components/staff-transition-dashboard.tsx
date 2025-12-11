"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Target,
  TrendingUp,
  MessageCircle,
  Briefcase,
  Heart,
  Star,
  Activity,
} from "lucide-react"

export function StaffTransitionDashboard() {
  const [selectedRole, setSelectedRole] = useState("transition-specialist")
  const [searchQuery, setSearchQuery] = useState("")
  const [urgentCases, setUrgentCases] = useState(5)
  const [selectedYouth, setSelectedYouth] = useState("alex-johnson")

  const youthCaseload = [
    {
      id: "alex-johnson",
      name: "Alex Johnson",
      age: 17,
      status: "Active",
      priority: "High",
      nextDeadline: "PAL Assessment - 3 days",
      progress: 68,
      placement: "Foster Home",
      caseworker: "Sarah Martinez",
    },
    {
      id: "maria-garcia",
      name: "Maria Garcia",
      age: 19,
      status: "Transitioning",
      priority: "Medium",
      nextDeadline: "Housing Application - 1 week",
      progress: 85,
      placement: "Independent Living",
      caseworker: "Sarah Martinez",
    },
    {
      id: "james-wilson",
      name: "James Wilson",
      age: 16,
      status: "Active",
      priority: "Low",
      nextDeadline: "Life Skills Assessment - 2 weeks",
      progress: 45,
      placement: "Kinship Care",
      caseworker: "Sarah Martinez",
    },
  ]

  const complianceItems = [
    { item: "PAL Assessments", completed: 18, total: 22, dueThisWeek: 3 },
    { item: "Transition Plans", completed: 20, total: 22, dueThisWeek: 1 },
    { item: "Monthly Contacts", completed: 65, total: 66, dueThisWeek: 8 },
    { item: "DFPS Reports", completed: 21, total: 22, dueThisWeek: 2 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Transition Support Dashboard</h1>
              <p className="text-gray-600">Comprehensive case management for youth aging out of care</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transition-specialist">Transition Specialist</SelectItem>
                  <SelectItem value="case-manager">Case Manager</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="pal-coordinator">PAL Coordinator</SelectItem>
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
              <strong>{urgentCases} urgent items</strong> require immediate attention: 3 PAL assessments overdue, 2
              aging out in 30 days.
              <Button variant="link" className="p-0 ml-2 text-red-800 underline">
                View Details
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Active Cases</p>
                  <p className="text-2xl font-bold text-blue-600">22</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-800">Aging Out (90 days)</p>
                  <p className="text-2xl font-bold text-yellow-600">5</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">Successfully Transitioned</p>
                  <p className="text-2xl font-bold text-green-600">18</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-800">PAL Participants</p>
                  <p className="text-2xl font-bold text-purple-600">19</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search youth, cases, or resources..."
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

        <Tabs defaultValue="caseload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="caseload">Caseload</TabsTrigger>
            <TabsTrigger value="youth-profile">Youth Profile</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="foster-families">Foster Families</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          {/* Caseload Management Center */}
          <TabsContent value="caseload">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    My Caseload
                  </CardTitle>
                  <CardDescription>Manage and track progress for all youth in your caseload</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {youthCaseload.map((youth, index) => (
                      <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40&query=youth ${youth.name}`} />
                              <AvatarFallback>
                                {youth.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">{youth.name}</h4>
                              <p className="text-sm text-gray-600">
                                Age {youth.age} • {youth.placement}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                youth.priority === "High"
                                  ? "destructive"
                                  : youth.priority === "Medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {youth.priority}
                            </Badge>
                            <Badge variant="outline">{youth.status}</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600">Overall Progress</p>
                            <div className="flex items-center gap-2">
                              <Progress value={youth.progress} className="flex-1 h-2" />
                              <span className="text-sm font-medium">{youth.progress}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Next Deadline</p>
                            <p className="text-sm font-medium">{youth.nextDeadline}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Caseworker</p>
                            <p className="text-sm font-medium">{youth.caseworker}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => setSelectedYouth(youth.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-2" />
                            Update
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Upcoming Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">PAL Assessment - Alex Johnson</p>
                          <p className="text-xs text-gray-600">Due in 3 days</p>
                        </div>
                        <Badge variant="destructive">Overdue</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Monthly Contact - Maria Garcia</p>
                          <p className="text-xs text-gray-600">Due in 5 days</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Due Soon</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">Transition Plan Review - James Wilson</p>
                          <p className="text-xs text-gray-600">Due in 1 week</p>
                        </div>
                        <Badge variant="outline">Scheduled</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Caseload Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Average Progress</span>
                        <span className="font-medium">66%</span>
                      </div>
                      <Progress value={66} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">On-Time Completion</span>
                        <span className="font-medium">82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">PAL Participation</span>
                        <span className="font-medium">86%</span>
                      </div>
                      <Progress value={86} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Individual Youth Dashboard */}
          <TabsContent value="youth-profile">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback className="text-xl">AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>Alex Johnson</CardTitle>
                        <CardDescription>Age 17 • DOB: 03/15/2007 • Case #: YTH-2024-0156</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">Active</Badge>
                          <Badge variant="destructive">High Priority</Badge>
                          <Badge className="bg-purple-100 text-purple-800">PAL Participant</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Overall Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={68} className="w-24 h-2" />
                        <span className="text-lg font-bold">68%</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Transition Goals & Service Plan
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Complete High School Education</h4>
                            <Badge className="bg-green-100 text-green-800">On Track</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Graduate with diploma by June 2024</p>
                          <Progress value={85} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">85% Complete</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Secure Independent Housing</h4>
                            <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Find and secure apartment by age 18</p>
                          <Progress value={45} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">45% Complete</p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">Develop Life Skills</h4>
                            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Complete PAL curriculum modules</p>
                          <Progress value={72} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">72% Complete</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        PAL Participation Tracking
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-medium">Life Skills Domains</h4>
                          {[
                            { name: "Daily Living", score: 85 },
                            { name: "Self-Care", score: 72 },
                            { name: "Relationships", score: 60 },
                            { name: "Education", score: 90 },
                            { name: "Work & Study", score: 45 },
                            { name: "Money Management", score: 55 },
                          ].map((domain, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-sm">{domain.name}</span>
                              <div className="flex items-center gap-2">
                                <Progress value={domain.score} className="w-16 h-2" />
                                <span className="text-sm font-medium w-8">{domain.score}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium">Recent Activities</h4>
                          <div className="space-y-2">
                            <div className="text-sm p-2 bg-green-50 rounded">
                              <p className="font-medium">Budgeting Workshop</p>
                              <p className="text-gray-600">Completed 3/10/2024</p>
                            </div>
                            <div className="text-sm p-2 bg-blue-50 rounded">
                              <p className="font-medium">Job Interview Skills</p>
                              <p className="text-gray-600">Scheduled 3/15/2024</p>
                            </div>
                            <div className="text-sm p-2 bg-yellow-50 rounded">
                              <p className="font-medium">Apartment Hunting</p>
                              <p className="text-gray-600">Upcoming 3/20/2024</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Benefits Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">ETV Scholarship</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Medicaid</span>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">SNAP</span>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Housing Voucher</span>
                          <Badge variant="outline">Waitlist</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5" />
                        Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Birth Certificate</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Social Security Card</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">State ID</span>
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Medical Records</span>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload Document
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Upcoming Appointments
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-2 border rounded">
                          <p className="font-medium text-sm">PAL Assessment</p>
                          <p className="text-xs text-gray-600">March 15, 2024 at 2:00 PM</p>
                        </div>
                        <div className="p-2 border rounded">
                          <p className="font-medium text-sm">Monthly Check-in</p>
                          <p className="text-xs text-gray-600">March 22, 2024 at 10:00 AM</p>
                        </div>
                        <div className="p-2 border rounded">
                          <p className="font-medium text-sm">College Visit</p>
                          <p className="text-xs text-gray-600">March 25, 2024 at 9:00 AM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Compliance Tracker */}
          <TabsContent value="compliance">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    T3C Blueprint Compliance Tracker
                  </CardTitle>
                  <CardDescription>Monitor compliance with T3C requirements and regulatory standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {complianceItems.map((item, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{item.item}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Completed</span>
                            <span>
                              {item.completed}/{item.total}
                            </span>
                          </div>
                          <Progress value={(item.completed / item.total) * 100} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Due this week: {item.dueThisWeek}</span>
                            <span>{Math.round((item.completed / item.total) * 100)}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Compliance Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">3 PAL assessments are overdue</AlertDescription>
                      </Alert>
                      <Alert className="border-yellow-200 bg-yellow-50">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">
                          5 monthly reports due within 48 hours
                        </AlertDescription>
                      </Alert>
                      <Alert className="border-blue-200 bg-blue-50">
                        <Bell className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">New T3C policy update available</AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Documentation Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <span className="text-sm">Service Plans</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">100%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <span className="text-sm">PAL Assessments</span>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">82%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                        <span className="text-sm">Monthly Contacts</span>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">98%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Resource Management System */}
          <TabsContent value="resources">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Resource Directory
                  </CardTitle>
                  <CardDescription>
                    Comprehensive database of resources and services for transitioning youth
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { category: "Education", count: 45, icon: GraduationCap, color: "blue" },
                      { category: "Employment", count: 32, icon: Briefcase, color: "green" },
                      { category: "Housing", count: 28, icon: Home, color: "purple" },
                      { category: "Healthcare", count: 19, icon: Heart, color: "red" },
                      { category: "Financial", count: 23, icon: DollarSign, color: "yellow" },
                      { category: "Legal", count: 15, icon: Shield, color: "indigo" },
                    ].map((resource, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`p-2 rounded-lg ${
                                resource.color === "blue"
                                  ? "bg-blue-500"
                                  : resource.color === "green"
                                    ? "bg-green-500"
                                    : resource.color === "purple"
                                      ? "bg-purple-500"
                                      : resource.color === "red"
                                        ? "bg-red-500"
                                        : resource.color === "yellow"
                                          ? "bg-yellow-500"
                                          : "bg-indigo-500"
                              }`}
                            >
                              <resource.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium">{resource.category}</h4>
                              <p className="text-sm text-gray-600">{resource.count} resources</p>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="w-full bg-transparent">
                            Browse Resources
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Most Used Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "ETV Scholarship Application", uses: 18, category: "Education" },
                        { name: "Job Search Assistance", uses: 15, category: "Employment" },
                        { name: "Housing Voucher Program", uses: 12, category: "Housing" },
                        { name: "Medicaid Enrollment", uses: 22, category: "Healthcare" },
                        { name: "Banking Setup Guide", uses: 9, category: "Financial" },
                      ].map((resource, index) => (
                        <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                          <div>
                            <p className="font-medium text-sm">{resource.name}</p>
                            <p className="text-xs text-gray-600">{resource.category}</p>
                          </div>
                          <Badge variant="outline">{resource.uses} uses</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Resource Outcomes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Successful Referrals</span>
                          <span className="text-sm font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Resource Utilization</span>
                          <span className="text-sm font-medium">73%</span>
                        </div>
                        <Progress value={73} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Youth Satisfaction</span>
                          <span className="text-sm font-medium">91%</span>
                        </div>
                        <Progress value={91} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Foster Family Portal */}
          <TabsContent value="foster-families">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Foster Family Management
                  </CardTitle>
                  <CardDescription>Manage foster families supporting transitioning youth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Johnson Family",
                        youth: "Alex Johnson",
                        status: "Active",
                        training: "Current",
                        support: "High",
                      },
                      {
                        name: "Martinez Family",
                        youth: "Maria Garcia",
                        status: "Transitioning",
                        training: "Due Soon",
                        support: "Medium",
                      },
                      {
                        name: "Wilson Family",
                        youth: "James Wilson",
                        status: "Active",
                        training: "Current",
                        support: "Low",
                      },
                    ].map((family, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{family.name}</h4>
                            <p className="text-sm text-gray-600">Supporting: {family.youth}</p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline">{family.status}</Badge>
                            <Badge variant={family.training === "Current" ? "default" : "secondary"}>
                              {family.training}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Support Level</p>
                            <p className="font-medium">{family.support}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Last Contact</p>
                            <p className="font-medium">2 days ago</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Next Visit</p>
                            <p className="font-medium">March 18</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileCheck className="h-4 w-4 mr-2" />
                            Resources
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reporting & Analytics */}
          <TabsContent value="reports">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Data & Reporting Center
                  </CardTitle>
                  <CardDescription>Generate reports and analyze outcomes for transition services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button className="h-20 flex-col gap-2 bg-blue-500 hover:bg-blue-600">
                      <FileCheck className="h-6 w-6" />
                      <span className="text-sm">DFPS Monthly Report</span>
                    </Button>
                    <Button className="h-20 flex-col gap-2 bg-green-500 hover:bg-green-600">
                      <TrendingUp className="h-6 w-6" />
                      <span className="text-sm">Outcome Analytics</span>
                    </Button>
                    <Button className="h-20 flex-col gap-2 bg-purple-500 hover:bg-purple-600">
                      <Users className="h-6 w-6" />
                      <span className="text-sm">Caseload Summary</span>
                    </Button>
                    <Button className="h-20 flex-col gap-2 bg-yellow-500 hover:bg-yellow-600">
                      <Target className="h-6 w-6" />
                      <span className="text-sm">PAL Participation</span>
                    </Button>
                    <Button className="h-20 flex-col gap-2 bg-red-500 hover:bg-red-600">
                      <Shield className="h-6 w-6" />
                      <span className="text-sm">Compliance Report</span>
                    </Button>
                    <Button className="h-20 flex-col gap-2 bg-indigo-500 hover:bg-indigo-600">
                      <Download className="h-6 w-6" />
                      <span className="text-sm">Custom Report</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Key Performance Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Successful Transitions</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">PAL Completion Rate</span>
                          <span className="text-sm font-medium">86%</span>
                        </div>
                        <Progress value={86} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Housing Stability</span>
                          <span className="text-sm font-medium">82%</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">Education Continuity</span>
                          <span className="text-sm font-medium">91%</span>
                        </div>
                        <Progress value={91} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Reports</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-sm">March 2024 DFPS Report</p>
                          <p className="text-xs text-gray-600">Generated 3/1/2024</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-sm">Q1 Outcome Analysis</p>
                          <p className="text-xs text-gray-600">Generated 2/28/2024</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                        <div>
                          <p className="font-medium text-sm">PAL Participation Summary</p>
                          <p className="text-xs text-gray-600">Generated 2/25/2024</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Communication Hub */}
          <TabsContent value="communication">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Communication Hub
                  </CardTitle>
                  <CardDescription>Manage communications with youth, families, and partners</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button className="h-16 flex-col gap-2">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm">Send Message</span>
                    </Button>
                    <Button className="h-16 flex-col gap-2 bg-transparent" variant="outline">
                      <Phone className="h-5 w-5" />
                      <span className="text-sm">Schedule Call</span>
                    </Button>
                    <Button className="h-16 flex-col gap-2 bg-transparent" variant="outline">
                      <Bell className="h-5 w-5" />
                      <span className="text-sm">Send Reminder</span>
                    </Button>
                    <Button className="h-16 flex-col gap-2 bg-transparent" variant="outline">
                      <Users className="h-5 w-5" />
                      <span className="text-sm">Group Message</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-sm">Alex Johnson</p>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-600">Thanks for helping with the college application!</p>
                        <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                          Reply
                        </Button>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <p className="font-medium text-sm">Johnson Foster Family</p>
                          <span className="text-xs text-gray-500">1 day ago</span>
                        </div>
                        <p className="text-sm text-gray-600">Alex is doing well with his job search preparation.</p>
                        <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                          Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Communications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="font-medium text-sm">Monthly Check-in - Maria Garcia</p>
                        <p className="text-xs text-gray-600">Scheduled for March 15, 2024 at 10:00 AM</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <p className="font-medium text-sm">PAL Assessment Reminder</p>
                        <p className="text-xs text-gray-600">Send to Alex Johnson on March 13, 2024</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="font-medium text-sm">Foster Family Training</p>
                        <p className="text-xs text-gray-600">Group message on March 18, 2024</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Training & Support Center */}
          <TabsContent value="training">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Training & Knowledge Base
                  </CardTitle>
                  <CardDescription>
                    Access training materials and best practices for transition services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-500 rounded-lg">
                            <Target className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">PAL Program Training</h4>
                            <p className="text-sm text-gray-600">8 modules</p>
                          </div>
                        </div>
                        <Progress value={75} className="mb-2" />
                        <p className="text-xs text-gray-600 mb-3">75% Complete</p>
                        <Button size="sm" className="w-full">
                          Continue
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-green-500 rounded-lg">
                            <Shield className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">T3C Compliance</h4>
                            <p className="text-sm text-gray-600">6 modules</p>
                          </div>
                        </div>
                        <Progress value={100} className="mb-2" />
                        <p className="text-xs text-gray-600 mb-3">Complete</p>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Review
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-purple-500 rounded-lg">
                            <Heart className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium">Trauma-Informed Care</h4>
                            <p className="text-sm text-gray-600">5 modules</p>
                          </div>
                        </div>
                        <Progress value={40} className="mb-2" />
                        <p className="text-xs text-gray-600 mb-3">40% Complete</p>
                        <Button size="sm" className="w-full">
                          Start
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Best Practices Library
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <h4 className="font-medium text-sm">Engaging Reluctant Youth</h4>
                        <p className="text-xs text-gray-600">Strategies for building rapport and trust</p>
                      </div>
                      <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <h4 className="font-medium text-sm">Crisis Intervention Protocols</h4>
                        <p className="text-xs text-gray-600">Step-by-step emergency procedures</p>
                      </div>
                      <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <h4 className="font-medium text-sm">Benefits Navigation Guide</h4>
                        <p className="text-xs text-gray-600">Complete guide to available benefits</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Peer Consultation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="font-medium text-sm">Weekly Team Meeting</p>
                        <p className="text-xs text-gray-600">Fridays at 2:00 PM</p>
                        <Button size="sm" className="mt-2">
                          Join Meeting
                        </Button>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="font-medium text-sm">Case Consultation Available</p>
                        <p className="text-xs text-gray-600">Schedule with supervisor</p>
                        <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
