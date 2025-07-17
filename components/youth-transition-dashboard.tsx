"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Target,
  BookOpen,
  DollarSign,
  Home,
  GraduationCap,
  Briefcase,
  Heart,
  MessageCircle,
  Calendar,
  Star,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  MapPin,
  Download,
  Play,
  Users,
  Zap,
  TrendingUp,
  Award,
  Bell,
  Settings,
  Moon,
  Sun,
} from "lucide-react"

export function YouthTransitionDashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [overallProgress, setOverallProgress] = useState(68)
  const [notifications, setNotifications] = useState(3)
  const [userName] = useState("Alex")

  // Life Skills Progress Data
  const lifeSkillsDomains = [
    { name: "Daily Living", progress: 85, color: "bg-green-500", icon: Home },
    { name: "Self-Care", progress: 72, color: "bg-blue-500", icon: Heart },
    { name: "Relationships", progress: 60, color: "bg-purple-500", icon: Users },
    { name: "Education", progress: 90, color: "bg-yellow-500", icon: GraduationCap },
    { name: "Work & Study", progress: 45, color: "bg-red-500", icon: Briefcase },
    { name: "Money Management", progress: 55, color: "bg-indigo-500", icon: DollarSign },
  ]

  const recentAchievements = [
    { title: "Budget Master", description: "Completed budgeting basics", date: "2 days ago", icon: Trophy },
    { title: "Interview Pro", description: "Finished job interview prep", date: "1 week ago", icon: Star },
    { title: "College Ready", description: "Submitted FAFSA application", date: "2 weeks ago", icon: Award },
  ]

  const upcomingEvents = [
    { title: "PAL Workshop: Apartment Hunting", date: "March 20, 2024", time: "2:00 PM", type: "workshop" },
    { title: "Meeting with Transition Specialist", date: "March 22, 2024", time: "10:00 AM", type: "meeting" },
    { title: "College Visit Day", date: "March 25, 2024", time: "9:00 AM", type: "education" },
  ]

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-purple-100"}`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className={`rounded-lg shadow-sm p-6 mb-8 ${darkMode ? "bg-gray-800 text-white" : "bg-white"}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback className="text-xl font-bold bg-blue-500 text-white">
                  {userName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 🌟</h1>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  You're {overallProgress}% ready for independence!
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={overallProgress} className="w-32 h-2" />
                  <span className="text-sm font-medium">{overallProgress}%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className={darkMode ? "border-gray-600 text-gray-300" : ""}
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" className={darkMode ? "border-gray-600 text-gray-300" : ""}>
                <Bell className="h-4 w-4 mr-2" />
                {notifications}
              </Button>
              <Button variant="outline" size="sm" className={darkMode ? "border-gray-600 text-gray-300" : ""}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            <MessageCircle className="h-6 w-6" />
            <span className="text-sm">Message Specialist</span>
          </Button>
          <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
            <DollarSign className="h-6 w-6" />
            <span className="text-sm">Check Benefits</span>
          </Button>
          <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
            <Target className="h-6 w-6" />
            <span className="text-sm">Set Goals</span>
          </Button>
          <Button className="h-20 flex-col gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
            <Phone className="h-6 w-6" />
            <span className="text-sm">Crisis Support</span>
          </Button>
        </div>

        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList
            className={`grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7 ${darkMode ? "bg-gray-800" : ""}`}
          >
            <TabsTrigger value="progress">My Progress</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="skills">Life Skills</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="connect">Connect</TabsTrigger>
            <TabsTrigger value="planner">Future Plan</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* My Progress Hub */}
          <TabsContent value="progress">
            <div className="space-y-6">
              {/* Life Skills Overview */}
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <TrendingUp className="h-5 w-5" />
                    Life Skills Progress
                  </CardTitle>
                  <CardDescription className={darkMode ? "text-gray-300" : ""}>
                    Your journey to independence across key life domains
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lifeSkillsDomains.map((domain, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${darkMode ? "border-gray-600 bg-gray-700" : "bg-gray-50"}`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${domain.color}`}>
                            <domain.icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className={`font-medium ${darkMode ? "text-white" : ""}`}>{domain.name}</h4>
                            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                              {domain.progress}% Complete
                            </p>
                          </div>
                        </div>
                        <Progress value={domain.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <Trophy className="h-5 w-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentAchievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-3 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gradient-to-r from-yellow-50 to-orange-50"}`}
                      >
                        <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                          <achievement.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${darkMode ? "text-white" : ""}`}>{achievement.title}</h4>
                          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {achievement.description}
                          </p>
                        </div>
                        <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {achievement.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 border rounded-lg ${darkMode ? "border-gray-600 bg-gray-700" : ""}`}
                      >
                        <div>
                          <h4 className={`font-medium ${darkMode ? "text-white" : ""}`}>{event.title}</h4>
                          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {event.date} at {event.time}
                          </p>
                        </div>
                        <Badge
                          variant={
                            event.type === "workshop" ? "default" : event.type === "meeting" ? "secondary" : "outline"
                          }
                        >
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">View Full Calendar</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Benefits Navigator */}
          <TabsContent value="benefits">
            <div className="space-y-6">
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <DollarSign className="h-5 w-5" />
                    Benefits Eligibility Checker
                  </CardTitle>
                  <CardDescription className={darkMode ? "text-gray-300" : ""}>
                    Find out what benefits you qualify for and track your applications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-4 bg-gradient-to-r from-green-500 to-green-600">
                    <Zap className="h-4 w-4 mr-2" />
                    Quick Eligibility Check
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 border rounded-lg ${darkMode ? "border-gray-600 bg-gray-700" : ""}`}>
                      <h4 className={`font-medium mb-2 ${darkMode ? "text-white" : ""}`}>Active Applications</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${darkMode ? "text-gray-300" : ""}`}>ETV Scholarship</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${darkMode ? "text-gray-300" : ""}`}>SNAP Benefits</span>
                          <Badge className="bg-green-100 text-green-800">Approved</Badge>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 border rounded-lg ${darkMode ? "border-gray-600 bg-gray-700" : ""}`}>
                      <h4 className={`font-medium mb-2 ${darkMode ? "text-white" : ""}`}>Upcoming Deadlines</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className={`text-sm ${darkMode ? "text-gray-300" : ""}`}>
                            Medicaid Renewal - 5 days
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <span className={`text-sm ${darkMode ? "text-gray-300" : ""}`}>
                            Housing Application - 2 weeks
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Medicaid/STAR Health", status: "Active", amount: "Full Coverage", color: "green" },
                  { name: "ETV Scholarship", status: "Pending", amount: "$5,000/year", color: "yellow" },
                  { name: "SNAP Benefits", status: "Active", amount: "$281/month", color: "green" },
                  { name: "Housing Voucher", status: "Waitlist", amount: "TBD", color: "blue" },
                  { name: "Tuition Waiver", status: "Eligible", amount: "Full Tuition", color: "purple" },
                  { name: "Driver's License Waiver", status: "Available", amount: "$25 Savings", color: "orange" },
                ].map((benefit, index) => (
                  <Card key={index} className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className={`font-medium ${darkMode ? "text-white" : ""}`}>{benefit.name}</h4>
                        <Badge
                          variant={benefit.status === "Active" ? "default" : "secondary"}
                          className={
                            benefit.color === "green"
                              ? "bg-green-100 text-green-800"
                              : benefit.color === "yellow"
                                ? "bg-yellow-100 text-yellow-800"
                                : benefit.color === "blue"
                                  ? "bg-blue-100 text-blue-800"
                                  : benefit.color === "purple"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-orange-100 text-orange-800"
                          }
                        >
                          {benefit.status}
                        </Badge>
                      </div>
                      <p className={`text-sm mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{benefit.amount}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className={`w-full ${darkMode ? "border-gray-600 text-gray-300" : ""}`}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Life Skills Academy */}
          <TabsContent value="skills">
            <div className="space-y-6">
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <BookOpen className="h-5 w-5" />
                    Life Skills Academy
                  </CardTitle>
                  <CardDescription className={darkMode ? "text-gray-300" : ""}>
                    Interactive modules to build essential life skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: "Budgeting Basics", progress: 100, lessons: 8, icon: DollarSign, color: "green" },
                      { title: "Cooking Essentials", progress: 75, lessons: 12, icon: Home, color: "blue" },
                      { title: "Job Interview Skills", progress: 90, lessons: 6, icon: Briefcase, color: "purple" },
                      { title: "Apartment Hunting", progress: 30, lessons: 10, icon: MapPin, color: "yellow" },
                      { title: "Healthcare Navigation", progress: 60, lessons: 8, icon: Heart, color: "red" },
                      { title: "Building Relationships", progress: 45, lessons: 9, icon: Users, color: "indigo" },
                    ].map((module, index) => (
                      <Card
                        key={index}
                        className={`${darkMode ? "bg-gray-700 border-gray-600" : "hover:shadow-lg"} transition-shadow cursor-pointer`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className={`p-2 rounded-lg ${
                                module.color === "green"
                                  ? "bg-green-500"
                                  : module.color === "blue"
                                    ? "bg-blue-500"
                                    : module.color === "purple"
                                      ? "bg-purple-500"
                                      : module.color === "yellow"
                                        ? "bg-yellow-500"
                                        : module.color === "red"
                                          ? "bg-red-500"
                                          : "bg-indigo-500"
                              }`}
                            >
                              <module.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className={`font-medium ${darkMode ? "text-white" : ""}`}>{module.title}</h4>
                              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                {module.lessons} lessons
                              </p>
                            </div>
                          </div>
                          <div className="mb-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                Progress
                              </span>
                              <span className={`text-sm font-medium ${darkMode ? "text-white" : ""}`}>
                                {module.progress}%
                              </span>
                            </div>
                            <Progress value={module.progress} className="h-2" />
                          </div>
                          <Button size="sm" className="w-full">
                            {module.progress === 100 ? "Review" : module.progress > 0 ? "Continue" : "Start"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resource Library */}
          <TabsContent value="resources">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Education",
                    icon: GraduationCap,
                    count: 24,
                    color: "blue",
                    items: ["College Prep", "Trade Schools", "GED Resources", "Study Tips"],
                  },
                  {
                    title: "Employment",
                    icon: Briefcase,
                    count: 18,
                    color: "green",
                    items: ["Resume Builder", "Job Search", "Interview Prep", "Career Exploration"],
                  },
                  {
                    title: "Housing",
                    icon: Home,
                    count: 15,
                    color: "purple",
                    items: ["Apartment Hunting", "Lease Understanding", "Budgeting", "Tenant Rights"],
                  },
                  {
                    title: "Health",
                    icon: Heart,
                    count: 12,
                    color: "red",
                    items: ["Finding Doctors", "Mental Health", "Insurance", "Wellness Tips"],
                  },
                  {
                    title: "Money Management",
                    icon: DollarSign,
                    count: 20,
                    color: "yellow",
                    items: ["Banking Basics", "Budgeting", "Credit Building", "Saving Strategies"],
                  },
                  {
                    title: "Transportation",
                    icon: MapPin,
                    count: 8,
                    color: "indigo",
                    items: ["Driver's Ed", "Public Transit", "Car Buying", "Maintenance"],
                  },
                ].map((category, index) => (
                  <Card
                    key={index}
                    className={`${darkMode ? "bg-gray-800 border-gray-700" : "hover:shadow-lg"} transition-shadow cursor-pointer`}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-lg ${
                            category.color === "blue"
                              ? "bg-blue-500"
                              : category.color === "green"
                                ? "bg-green-500"
                                : category.color === "purple"
                                  ? "bg-purple-500"
                                  : category.color === "red"
                                    ? "bg-red-500"
                                    : category.color === "yellow"
                                      ? "bg-yellow-500"
                                      : "bg-indigo-500"
                          }`}
                        >
                          <category.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className={darkMode ? "text-white" : ""}>{category.title}</CardTitle>
                          <CardDescription className={darkMode ? "text-gray-300" : ""}>
                            {category.count} resources
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className={`flex items-center gap-2 p-2 rounded ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className={`text-sm ${darkMode ? "text-gray-300" : ""}`}>{item}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        Explore All
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Connect & Support */}
          <TabsContent value="connect">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                      <MessageCircle className="h-5 w-5" />
                      Direct Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start bg-blue-500 hover:bg-blue-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Your Transition Specialist
                    </Button>
                    <Button className="w-full justify-start bg-green-500 hover:bg-green-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Virtual Meeting
                    </Button>
                    <Button className="w-full justify-start bg-red-500 hover:bg-red-600">
                      <Phone className="h-4 w-4 mr-2" />
                      Crisis Support Hotline
                    </Button>
                  </CardContent>
                </Card>

                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                      <Users className="h-5 w-5" />
                      Peer Connections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Find a Peer Mentor
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      Alumni Network
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Support Group Calendar
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <MapPin className="h-5 w-5" />
                    Community Resources Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`h-64 rounded-lg flex items-center justify-center ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                  >
                    <div className="text-center">
                      <MapPin className={`h-12 w-12 mx-auto mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                      <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Interactive map coming soon</p>
                      <Button className="mt-2 bg-transparent" variant="outline">
                        View Resource List
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Future Planner */}
          <TabsContent value="planner">
            <div className="space-y-6">
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <Target className="h-5 w-5" />
                    Goal Setting Wizard
                  </CardTitle>
                  <CardDescription className={darkMode ? "text-gray-300" : ""}>
                    Create and track your personal goals for independence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full mb-4 bg-gradient-to-r from-purple-500 to-pink-500">
                    <Target className="h-4 w-4 mr-2" />
                    Start Goal Setting Wizard
                  </Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 border rounded-lg ${darkMode ? "border-gray-600 bg-gray-700" : ""}`}>
                      <h4 className={`font-medium mb-2 ${darkMode ? "text-white" : ""}`}>Active Goals</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${darkMode ? "text-gray-300" : ""}`}>Get Driver's License</span>
                          <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${darkMode ? "text-gray-300" : ""}`}>Save $1000</span>
                          <Badge className="bg-blue-100 text-blue-800">75% Complete</Badge>
                        </div>
                      </div>
                    </div>
                    <div className={`p-4 border rounded-lg ${darkMode ? "border-gray-600 bg-gray-700" : ""}`}>
                      <h4 className={`font-medium mb-2 ${darkMode ? "text-white" : ""}`}>Completed Goals</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${darkMode ? "text-gray-300" : ""}`}>Open Bank Account</span>
                          <Badge className="bg-green-100 text-green-800">Complete</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className={`text-sm ${darkMode ? "text-gray-300" : ""}`}>
                            Submit College Application
                          </span>
                          <Badge className="bg-green-100 text-green-800">Complete</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                      <GraduationCap className="h-5 w-5" />
                      Career Explorer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Take Career Assessment
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Explore Career Paths
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Connect with Professionals
                    </Button>
                  </CardContent>
                </Card>

                <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                  <CardHeader>
                    <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                      <DollarSign className="h-5 w-5" />
                      Budget Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Create Monthly Budget
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Home className="h-4 w-4 mr-2" />
                      Housing Affordability
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Savings Goals
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements">
            <div className="space-y-6">
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <Trophy className="h-5 w-5" />
                    Achievement Gallery
                  </CardTitle>
                  <CardDescription className={darkMode ? "text-gray-300" : ""}>
                    Celebrate your progress and milestones
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      { name: "First Steps", icon: Star, earned: true, description: "Completed onboarding" },
                      {
                        name: "Budget Master",
                        icon: DollarSign,
                        earned: true,
                        description: "Mastered budgeting basics",
                      },
                      { name: "Interview Pro", icon: Briefcase, earned: true, description: "Aced interview skills" },
                      { name: "College Bound", icon: GraduationCap, earned: true, description: "Applied to college" },
                      { name: "Independent Living", icon: Home, earned: false, description: "Move to own place" },
                      { name: "Career Starter", icon: Trophy, earned: false, description: "Land first job" },
                      { name: "Life Skills Champion", icon: Award, earned: false, description: "Complete all modules" },
                      { name: "Mentor", icon: Users, earned: false, description: "Help another youth" },
                    ].map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg text-center ${
                          achievement.earned
                            ? darkMode
                              ? "bg-gradient-to-br from-yellow-600 to-orange-600"
                              : "bg-gradient-to-br from-yellow-400 to-orange-500"
                            : darkMode
                              ? "bg-gray-700 border border-gray-600"
                              : "bg-gray-100 border border-gray-300"
                        }`}
                      >
                        <achievement.icon
                          className={`h-8 w-8 mx-auto mb-2 ${
                            achievement.earned ? "text-white" : darkMode ? "text-gray-400" : "text-gray-400"
                          }`}
                        />
                        <h4
                          className={`font-medium text-sm mb-1 ${
                            achievement.earned ? "text-white" : darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {achievement.name}
                        </h4>
                        <p
                          className={`text-xs ${
                            achievement.earned ? "text-yellow-100" : darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {achievement.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${darkMode ? "text-white" : ""}`}>
                    <Award className="h-5 w-5" />
                    Share Your Success
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                      Proud of your achievements? Share them with your support network!
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button className="bg-blue-500 hover:bg-blue-600">Share Progress</Button>
                      <Button variant="outline" className={darkMode ? "border-gray-600 text-gray-300" : ""}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Certificate
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
