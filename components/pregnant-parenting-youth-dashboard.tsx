"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Baby,
  Heart,
  Shield,
  BookOpen,
  Phone,
  Calendar,
  MapPin,
  DollarSign,
  GraduationCap,
  Home,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Play,
  Volume2,
  Moon,
  Sun,
  Search,
  Bell,
  MessageCircle,
  FileText,
  Globe,
  Target,
  ExternalLink,
  Plus,
  Settings,
} from "lucide-react"

interface PregnantParentingYouthDashboardProps {
  youthId?: string
  mode?: "edit" | "view"
}

export default function PregnantParentingYouthDashboard({
  youthId = "youth-001",
  mode = "edit",
}: PregnantParentingYouthDashboardProps) {
  const [activeTab, setActiveTab] = useState("welcome")
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [fontSize, setFontSize] = useState("medium")
  const [highContrast, setHighContrast] = useState(false)
  const [textToSpeech, setTextToSpeech] = useState(false)
  const [userProfile, setUserProfile] = useState({
    name: "Jordan",
    age: 17,
    status: "pregnant", // pregnant, parenting
    childAge: null,
    location: "Austin, TX",
    preferences: {
      notifications: true,
      reminders: true,
      forum: false,
    },
  })

  const [programExpectations, setProgramExpectations] = useState({
    videoWatched: false,
    expectationsRead: false,
    participationAgreed: false,
    contactInfoSaved: false,
  })

  const [parentingPlan, setParentingPlan] = useState({
    safeSleeping: {
      completed: false,
      checklist: {
        cribSafety: false,
        roomSetup: false,
        sidsInfo: false,
        sleepPosition: false,
      },
    },
    childproofing: {
      completed: false,
      rooms: {
        kitchen: false,
        bathroom: false,
        livingRoom: false,
        bedroom: false,
      },
    },
    development: {
      completed: false,
      milestones: {
        physical: false,
        cognitive: false,
        social: false,
        emotional: false,
      },
    },
    caregivers: {
      completed: false,
      screening: false,
      questions: false,
      emergency: false,
    },
    reading: {
      completed: false,
      books: false,
      songs: false,
      talking: false,
    },
    relationships: {
      completed: false,
      healthy: false,
      warning: false,
      safety: false,
    },
  })

  const [benefitEnrollment, setBenefitEnrollment] = useState({
    starHealth: { status: "not_started", progress: 0 },
    eci: { status: "not_started", progress: 0 },
    wic: { status: "in_progress", progress: 60 },
    snap: { status: "completed", progress: 100 },
    tanf: { status: "not_started", progress: 0 },
    childcare: { status: "not_started", progress: 0 },
    housing: { status: "in_progress", progress: 30 },
  })

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      type: "Prenatal",
      date: "2025-01-20",
      time: "10:00 AM",
      location: "Austin Women's Health",
      transportation: "Bus Route 7",
      preparation: ["Insurance card", "ID", "Questions list"],
    },
    {
      id: 2,
      type: "WIC Appointment",
      date: "2025-01-22",
      time: "2:00 PM",
      location: "WIC Office - Downtown",
      transportation: "Ride arranged",
      preparation: ["Proof of income", "Medical records", "ID"],
    },
  ])

  const [crisisResources] = useState([
    {
      name: "Crisis Text Line",
      contact: "Text HOME to 741741",
      available: "24/7",
      type: "text",
    },
    {
      name: "National Suicide Prevention Lifeline",
      contact: "988",
      available: "24/7",
      type: "phone",
    },
    {
      name: "Parenting Support Specialist",
      contact: "(512) 555-0123",
      available: "Mon-Fri 8AM-6PM",
      type: "phone",
    },
    {
      name: "After-Hours Crisis Support",
      contact: "(512) 555-0199",
      available: "Nights & Weekends",
      type: "phone",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "reminder",
      message: "WIC appointment tomorrow at 2:00 PM",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "achievement",
      message: "Congratulations! You completed the Safe Sleeping module",
      time: "1 day ago",
      read: false,
    },
  ])

  const calculateOverallProgress = () => {
    const sections = Object.values(parentingPlan)
    const completed = sections.filter((section) => section.completed).length
    return Math.round((completed / sections.length) * 100)
  }

  const getBenefitStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "in_progress":
        return "text-yellow-600"
      case "not_started":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
  }

  const getBenefitStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in_progress":
        return "In Progress"
      case "not_started":
        return "Not Started"
      default:
        return "Unknown"
    }
  }

  const speakText = (text: string) => {
    if (textToSpeech && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-pink-50 to-purple-50"
      } ${highContrast ? "contrast-125" : ""}`}
    >
      {/* Header */}
      <div className={`sticky top-0 z-50 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm border-b`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Baby className="h-8 w-8 text-pink-500" />
                <div>
                  <h1
                    className={`text-xl font-bold ${fontSize === "large" ? "text-2xl" : fontSize === "small" ? "text-lg" : "text-xl"}`}
                  >
                    Parenting Support Hub
                  </h1>
                  <p className="text-sm text-gray-500">Welcome back, {userProfile.name}!</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </Button>

              {/* Accessibility Controls */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setDarkMode(!darkMode)} title="Toggle dark mode">
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTextToSpeech(!textToSpeech)}
                  title="Toggle text-to-speech"
                  className={textToSpeech ? "bg-blue-100" : ""}
                >
                  <Volume2 className="h-4 w-4" />
                </Button>

                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-20">
                    <Globe className="h-4 w-4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="es">ES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crisis Support Banner */}
      <Alert className="mx-4 mt-4 border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="flex items-center justify-between">
          <span className="text-red-800">
            <strong>Need immediate help?</strong> Crisis support is available 24/7
          </span>
          <Button
            variant="outline"
            size="sm"
            className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
            onClick={() => setActiveTab("crisis")}
          >
            Get Help Now
          </Button>
        </AlertDescription>
      </Alert>

      {/* Progress Overview */}
      <div className="container mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Your Progress
                </CardTitle>
                <CardDescription>You're doing great! Keep up the amazing work.</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{calculateOverallProgress()}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={calculateOverallProgress()} className="mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-green-600">3</div>
                <div className="text-sm text-gray-500">Modules Complete</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600">2</div>
                <div className="text-sm text-gray-500">Benefits Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-600">5</div>
                <div className="text-sm text-gray-500">Achievements</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
            <TabsTrigger value="welcome" className="text-xs">
              Welcome
            </TabsTrigger>
            <TabsTrigger value="parenting" className="text-xs">
              Parenting
            </TabsTrigger>
            <TabsTrigger value="benefits" className="text-xs">
              Benefits
            </TabsTrigger>
            <TabsTrigger value="appointments" className="text-xs">
              Appointments
            </TabsTrigger>
            <TabsTrigger value="education" className="text-xs">
              Education
            </TabsTrigger>
            <TabsTrigger value="crisis" className="text-xs">
              Crisis Support
            </TabsTrigger>
            <TabsTrigger value="foster" className="text-xs">
              Foster Family
            </TabsTrigger>
            <TabsTrigger value="aftercare" className="text-xs">
              Future Planning
            </TabsTrigger>
          </TabsList>

          {/* Welcome & Program Expectations */}
          <TabsContent value="welcome" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  Welcome to Your Parenting Support Hub
                </CardTitle>
                <CardDescription>
                  This is your personal space for resources, support, and guidance on your parenting journey.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Video Introduction */}
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <Play className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="font-semibold mb-2">Watch: Program Introduction</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Learn about the Pregnant & Parenting Youth Add-On Service (3 minutes)
                  </p>
                  <Button
                    onClick={() => setProgramExpectations({ ...programExpectations, videoWatched: true })}
                    className="mb-2"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Watch Video
                  </Button>
                  {programExpectations.videoWatched && (
                    <div className="flex items-center justify-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      Video completed
                    </div>
                  )}
                </div>

                {/* Program Expectations Checklist */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Program Expectations</h3>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={programExpectations.expectationsRead}
                        onCheckedChange={(checked) =>
                          setProgramExpectations({ ...programExpectations, expectationsRead: !!checked })
                        }
                      />
                      <div className="flex-1">
                        <Label className="font-medium">I understand what this program provides</Label>
                        <p className="text-sm text-gray-600">
                          Support for both you and your baby, including parenting education, benefit enrollment, and
                          ongoing guidance from a Parenting Support Specialist.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={programExpectations.participationAgreed}
                        onCheckedChange={(checked) =>
                          setProgramExpectations({ ...programExpectations, participationAgreed: !!checked })
                        }
                      />
                      <div className="flex-1">
                        <Label className="font-medium">I understand participation is voluntary</Label>
                        <p className="text-sm text-gray-600">
                          You can choose which services to use and can stop participating at any time.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={programExpectations.contactInfoSaved}
                        onCheckedChange={(checked) =>
                          setProgramExpectations({ ...programExpectations, contactInfoSaved: !!checked })
                        }
                      />
                      <div className="flex-1">
                        <Label className="font-medium">I have my support specialist's contact info</Label>
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-blue-900">Sarah Martinez, Parenting Support Specialist</p>
                          <p className="text-blue-700">📞 (512) 555-0123</p>
                          <p className="text-blue-700">📧 sarah.martinez@refugehouse.org</p>
                          <p className="text-sm text-blue-600">Available: Monday-Friday, 8 AM - 6 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Frequently Asked Questions</h3>
                  <div className="space-y-2">
                    <details className="border rounded-lg p-3">
                      <summary className="font-medium cursor-pointer">
                        What if I'm not sure I want to participate?
                      </summary>
                      <p className="mt-2 text-sm text-gray-600">
                        That's completely okay! You can explore the resources here without committing to anything. Talk
                        to your caseworker or call Sarah if you have questions.
                      </p>
                    </details>
                    <details className="border rounded-lg p-3">
                      <summary className="font-medium cursor-pointer">Will this affect my other services?</summary>
                      <p className="mt-2 text-sm text-gray-600">
                        No, this is an additional support service. It won't change your current placement or other
                        services.
                      </p>
                    </details>
                    <details className="border rounded-lg p-3">
                      <summary className="font-medium cursor-pointer">
                        What if I need help outside business hours?
                      </summary>
                      <p className="mt-2 text-sm text-gray-600">
                        Crisis support is available 24/7. Check the "Crisis Support" tab for immediate help resources.
                      </p>
                    </details>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Parenting Plan Resources */}
          <TabsContent value="parenting" className="space-y-6">
            <div className="grid gap-6">
              {/* Safe Sleeping */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-blue-500" />
                    Safe Sleeping Arrangements
                    {parentingPlan.safeSleeping.completed && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">Safety Checklist</h4>
                        {Object.entries({
                          cribSafety: "Crib meets safety standards",
                          roomSetup: "Room setup is safe",
                          sidsInfo: "SIDS prevention understood",
                          sleepPosition: "Safe sleep position learned",
                        }).map(([key, label]) => (
                          <div key={key} className="flex items-center gap-2">
                            <Checkbox
                              checked={
                                parentingPlan.safeSleeping.checklist[
                                  key as keyof typeof parentingPlan.safeSleeping.checklist
                                ]
                              }
                              onCheckedChange={(checked) => {
                                const newChecklist = {
                                  ...parentingPlan.safeSleeping.checklist,
                                  [key]: !!checked,
                                }
                                setParentingPlan({
                                  ...parentingPlan,
                                  safeSleeping: {
                                    ...parentingPlan.safeSleeping,
                                    checklist: newChecklist,
                                    completed: Object.values(newChecklist).every(Boolean),
                                  },
                                })
                              }}
                            />
                            <Label className="text-sm">{label}</Label>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium">Resources</h4>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                            <Play className="h-4 w-4 mr-2" />
                            Watch: Safe Sleep Video Guide
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                            <Download className="h-4 w-4 mr-2" />
                            Download: Crib Safety Checklist
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                            <MapPin className="h-4 w-4 mr-2" />
                            Find: Free Crib Programs Near You
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Childproofing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    Childproofing Guide
                    {parentingPlan.childproofing.completed && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Room-by-Room Checklist</h4>
                      {Object.entries({
                        kitchen: "Kitchen Safety",
                        bathroom: "Bathroom Safety",
                        livingRoom: "Living Room Safety",
                        bedroom: "Bedroom Safety",
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2">
                          <Checkbox
                            checked={
                              parentingPlan.childproofing.rooms[key as keyof typeof parentingPlan.childproofing.rooms]
                            }
                            onCheckedChange={(checked) => {
                              const newRooms = {
                                ...parentingPlan.childproofing.rooms,
                                [key]: !!checked,
                              }
                              setParentingPlan({
                                ...parentingPlan,
                                childproofing: {
                                  ...parentingPlan.childproofing,
                                  rooms: newRooms,
                                  completed: Object.values(newRooms).every(Boolean),
                                },
                              })
                            }}
                          />
                          <Label className="text-sm">{label}</Label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">DIY Tutorials</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Play className="h-4 w-4 mr-2" />
                          Outlet Covers & Cabinet Locks
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Play className="h-4 w-4 mr-2" />
                          Stair Gates Installation
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <MapPin className="h-4 w-4 mr-2" />
                          Free Safety Equipment Programs
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Child Development */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Baby className="h-5 w-5 text-purple-500" />
                    Child Development & Behavior
                    {parentingPlan.development.completed && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Milestone Tracking</h4>
                      {Object.entries({
                        physical: "Physical Development",
                        cognitive: "Cognitive Development",
                        social: "Social Development",
                        emotional: "Emotional Development",
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2">
                          <Checkbox
                            checked={
                              parentingPlan.development.milestones[
                                key as keyof typeof parentingPlan.development.milestones
                              ]
                            }
                            onCheckedChange={(checked) => {
                              const newMilestones = {
                                ...parentingPlan.development.milestones,
                                [key]: !!checked,
                              }
                              setParentingPlan({
                                ...parentingPlan,
                                development: {
                                  ...parentingPlan.development,
                                  milestones: newMilestones,
                                  completed: Object.values(newMilestones).every(Boolean),
                                },
                              })
                            }}
                          />
                          <Label className="text-sm">{label}</Label>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Behavior Management</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Play className="h-4 w-4 mr-2" />
                          Positive Discipline Techniques
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Play className="h-4 w-4 mr-2" />
                          Calming Techniques Demo
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Phone className="h-4 w-4 mr-2" />
                          Early Childhood Intervention
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reading, Singing, Talking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-orange-500" />
                    Reading, Singing & Talking
                    {parentingPlan.reading.completed && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Reading
                      </h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Age-Appropriate Books
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <MapPin className="h-4 w-4 mr-2" />
                          Free Library Programs
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        Singing
                      </h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Play className="h-4 w-4 mr-2" />
                          Lullabies & Songs
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Rhymes Database
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Talking
                      </h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Play className="h-4 w-4 mr-2" />
                          Daily Interaction Ideas
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <FileText className="h-4 w-4 mr-2" />
                          Brain Development Info
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Benefits Enrollment Hub */}
          <TabsContent value="benefits" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Benefit Enrollment Hub
                </CardTitle>
                <CardDescription>Track your benefit applications and get help with enrollment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries({
                    starHealth: "STAR Health (for baby)",
                    eci: "Early Childhood Intervention",
                    wic: "WIC Nutrition Program",
                    snap: "SNAP Food Benefits",
                    tanf: "TANF Cash Assistance",
                    childcare: "Childcare Assistance",
                    housing: "Housing Programs",
                  }).map(([key, label]) => {
                    const benefit = benefitEnrollment[key as keyof typeof benefitEnrollment]
                    return (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{label}</h4>
                            <p className={`text-sm ${getBenefitStatusColor(benefit.status)}`}>
                              {getBenefitStatusText(benefit.status)}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold">{benefit.progress}%</div>
                          </div>
                        </div>
                        <Progress value={benefit.progress} className="mb-3" />
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Application Guide
                          </Button>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Eligibility Check
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Apply Online
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transportation & Appointments */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Appointments & Transportation
                </CardTitle>
                <CardDescription>Manage your appointments and transportation needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{appointment.type}</h4>
                          <p className="text-sm text-gray-600">
                            {appointment.date} at {appointment.time}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {appointment.location}
                          </p>
                        </div>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-sm mb-2">Transportation</h5>
                          <p className="text-sm text-gray-600">{appointment.transportation}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm mb-2">What to Bring</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {appointment.preparation.map((item, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-2" />
                          Get Directions
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Office
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Educational Support */}
          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-500" />
                  Educational Support Center
                </CardTitle>
                <CardDescription>Balance parenting with your educational goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">School Support</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Baby className="h-4 w-4 mr-2" />
                        School Childcare Resources
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Clock className="h-4 w-4 mr-2" />
                        Flexible Education Options
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <FileText className="h-4 w-4 mr-2" />
                        Academic Accommodations
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Alternative Education</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        GED Program Locator
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Settings className="h-4 w-4 mr-2" />
                        Vocational Programs
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Target className="h-4 w-4 mr-2" />
                        Study Tips for Parents
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Crisis Support */}
          <TabsContent value="crisis" className="space-y-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <strong>If this is a medical emergency, call 911 immediately.</strong>
              </AlertDescription>
            </Alert>

            <div className="grid md:grid-cols-2 gap-6">
              {crisisResources.map((resource, index) => (
                <Card key={index} className="border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-700">
                      <Phone className="h-5 w-5" />
                      {resource.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-lg">{resource.contact}</p>
                        <p className="text-sm text-gray-600">{resource.available}</p>
                      </div>
                      <Button
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={() => {
                          if (resource.type === "phone") {
                            window.location.href = `tel:${resource.contact}`
                          } else {
                            // Handle text message
                            alert(`Text HOME to 741741`)
                          }
                        }}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {resource.type === "phone" ? "Call Now" : "Text Now"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Common Parenting Emergencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <details className="border rounded-lg p-3">
                    <summary className="font-medium cursor-pointer">Baby won't stop crying</summary>
                    <div className="mt-2 text-sm space-y-2">
                      <p>Try these calming techniques:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Check if baby is hungry, needs diaper change, or is tired</li>
                        <li>Try swaddling or gentle rocking</li>
                        <li>Use white noise or soft music</li>
                        <li>Take baby for a walk or car ride</li>
                      </ul>
                      <p className="text-red-600">Call your pediatrician if crying is unusual or you're concerned.</p>
                    </div>
                  </details>

                  <details className="border rounded-lg p-3">
                    <summary className="font-medium cursor-pointer">Feeling overwhelmed</summary>
                    <div className="mt-2 text-sm space-y-2">
                      <p>It's normal to feel overwhelmed. Try:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        <li>Take deep breaths</li>
                        <li>Put baby in safe place and take a 5-minute break</li>
                        <li>Call your support specialist or a friend</li>
                        <li>Remember: You're doing your best</li>
                      </ul>
                    </div>
                  </details>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Foster Parent Resources */}
          <TabsContent value="foster" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-500" />
                  Foster Family Resources
                </CardTitle>
                <CardDescription>Resources to share with your foster family for better support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">For Foster Parents</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Supporting Teen Parents Guide
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <FileText className="h-4 w-4 mr-2" />
                        Daily Routine Suggestions
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Shield className="h-4 w-4 mr-2" />
                        Boundary Setting Guidelines
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Communication Tools</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Monthly Check-in Template
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Users className="h-4 w-4 mr-2" />
                        Support Group Schedule
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Emergency Contact Card
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aftercare Planning */}
          <TabsContent value="aftercare" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-500" />
                  Future Planning Tools
                </CardTitle>
                <CardDescription>Prepare for successful transition and independence</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">60-Day Countdown</h4>
                    <Progress value={45} className="mb-2" />
                    <p className="text-sm text-gray-600">45 days until transition - You're making great progress!</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Housing & Living</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Home className="h-4 w-4 mr-2" />
                          Housing Search Tool
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Budget Calculator
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Living Skills Checklist
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Support Network</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Users className="h-4 w-4 mr-2" />
                          Support Network Map
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Maintenance Plan
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                          <Target className="h-4 w-4 mr-2" />
                          Goal Setting Worksheet
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className={`mt-12 py-8 border-t ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Remember: You're not alone in this journey. Help is always available.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call Support: (512) 555-0123
            </Button>
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Text Crisis Line: 741741
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
