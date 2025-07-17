"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Phone,
  DollarSign,
  FileCheck,
  BookOpen,
  Users,
  MapPin,
  Search,
  Download,
  Calendar,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  GraduationCap,
  Shield,
  Globe,
} from "lucide-react"

export function KinshipCaregiverResourceDashboard() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [searchQuery, setSearchQuery] = useState("")
  const [verificationProgress, setVerificationProgress] = useState(65)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Kinship Caregiver Resource Portal</h1>
              <p className="text-gray-600">Your comprehensive guide to kinship care support and resources</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={selectedLanguage === "en" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage("en")}
              >
                English
              </Button>
              <Button
                variant={selectedLanguage === "es" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage("es")}
              >
                Español
              </Button>
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                Accessibility
              </Button>
            </div>
          </div>
        </div>

        {/* Emergency Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>24/7 Emergency Support:</strong> Call (555) 123-4567 for immediate assistance
          </AlertDescription>
        </Alert>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search resources, benefits, or guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="quick-start" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="daily-care">Daily Care</TabsTrigger>
            <TabsTrigger value="family-support">Family Support</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="my-portal">My Portal</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Quick Start Guide */}
          <TabsContent value="quick-start">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <Heart className="h-5 w-5" />
                    Welcome to Kinship Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 mb-4">
                    You've taken on an incredible responsibility. We're here to support you every step of the way.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Start Your Journey</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    First 72 Hours Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Contact emergency services if needed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Secure basic needs (food, shelter)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Notify child's school</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">Schedule medical checkup</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View Full Checklist
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">24/7 Crisis Line</p>
                      <p className="text-blue-600 font-mono">(555) 123-4567</p>
                    </div>
                    <div>
                      <p className="font-medium">Your Caseworker</p>
                      <p className="text-blue-600 font-mono">(555) 234-5678</p>
                    </div>
                    <div>
                      <p className="font-medium">Medical Emergency</p>
                      <p className="text-red-600 font-mono">911</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Print Contact Card
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Benefits Hub */}
          <TabsContent value="benefits">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    TANF for Relative Caregivers
                  </CardTitle>
                  <CardDescription>Financial assistance for kinship families caring for children</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Estimated Monthly Benefit</h4>
                      <p className="text-2xl font-bold text-blue-600">$892</p>
                      <p className="text-sm text-gray-600">For family of 3</p>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full">Check Eligibility</Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Start Application
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Track Application Status
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
                  <CardDescription>Monthly payments for verified kinship caregivers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Monthly Payment Rate</h4>
                      <p className="text-2xl font-bold text-green-600">$400</p>
                      <p className="text-sm text-gray-600">Per child (ages 0-12)</p>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full">Calculate Payment</Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Required Documents
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Application Timeline
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Other Available Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Home className="h-6 w-6 text-orange-600" />
                      </div>
                      <h4 className="font-medium">SNAP Benefits</h4>
                      <p className="text-sm text-gray-600">Food assistance</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Learn More
                      </Button>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Shield className="h-6 w-6 text-purple-600" />
                      </div>
                      <h4 className="font-medium">Medicaid/CHIP</h4>
                      <p className="text-sm text-gray-600">Health coverage</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Learn More
                      </Button>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Heart className="h-6 w-6 text-pink-600" />
                      </div>
                      <h4 className="font-medium">WIC</h4>
                      <p className="text-sm text-gray-600">Nutrition program</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Learn More
                      </Button>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                        <DollarSign className="h-6 w-6 text-teal-600" />
                      </div>
                      <h4 className="font-medium">Social Security</h4>
                      <p className="text-sm text-gray-600">Survivor benefits</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Verification Support Center */}
          <TabsContent value="verification">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Verification Progress</CardTitle>
                  <CardDescription>Track your progress through the kinship verification process</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Overall Progress</span>
                        <span className="text-sm text-gray-600">{verificationProgress}%</span>
                      </div>
                      <Progress value={verificationProgress} className="h-2" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Documents</p>
                          <p className="text-sm text-green-600">Complete</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">Background Check</p>
                          <p className="text-sm text-green-600">Complete</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <Clock className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-yellow-800">Training</p>
                          <p className="text-sm text-yellow-600">In Progress</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Clock className="h-5 w-5 text-gray-600" />
                        <div>
                          <p className="font-medium text-gray-800">Home Study</p>
                          <p className="text-sm text-gray-600">Pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCheck className="h-5 w-5" />
                      Document Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Birth Certificate</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Uploaded
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Photo ID</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Uploaded
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Proof of Income</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Upload
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full mt-4">View Full Checklist</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Training Schedule
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">TBRI® Foundations</h4>
                          <Badge className="bg-blue-100 text-blue-800">Required</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">March 15, 2024 • 9:00 AM - 4:00 PM</p>
                        <Button size="sm" className="w-full">
                          Register Now
                        </Button>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">Kinship Care Basics</h4>
                          <Badge variant="outline">Optional</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">March 22, 2024 • 6:00 PM - 8:00 PM</p>
                        <Button size="sm" variant="outline" className="w-full bg-transparent">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Daily Care Resources */}
          <TabsContent value="daily-care">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Age-Appropriate Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Infants & Toddlers (0-2)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Preschoolers (3-5)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      School Age (6-12)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Teenagers (13-18)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Trauma-Informed Care
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Understanding Trauma
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      TBRI® Techniques
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Managing Behaviors
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Building Trust
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Health & Medical
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Finding Healthcare
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Medical Consent
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Mental Health Services
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Emergency Care
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      School Enrollment
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Educational Rights
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Special Needs Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Tutoring Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Legal Rights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Your Rights as Caregiver
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Child's Rights
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Court Proceedings
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      Legal Advocacy
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Quick Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Emergency Contacts
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Medical Forms
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      School Forms
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Legal Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Family Dynamics Support */}
          <TabsContent value="family-support">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Managing Family Relationships
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium mb-2">Working with Birth Parents</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Navigate complex relationships while prioritizing the child's wellbeing
                      </p>
                      <Button size="sm" variant="outline">
                        Read Guide
                      </Button>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium mb-2">Setting Healthy Boundaries</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Learn to establish and maintain appropriate boundaries
                      </p>
                      <Button size="sm" variant="outline">
                        Read Guide
                      </Button>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium mb-2">Talking to Children</h4>
                      <p className="text-sm text-gray-600 mb-3">Age-appropriate ways to discuss their situation</p>
                      <Button size="sm" variant="outline">
                        Read Guide
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Self-Care & Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-50 rounded-lg">
                      <h4 className="font-medium mb-2">Caregiver Self-Care</h4>
                      <p className="text-sm text-gray-600 mb-3">Taking care of yourself so you can care for others</p>
                      <Button size="sm" variant="outline">
                        Self-Care Tips
                      </Button>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium mb-2">Dealing with Stress</h4>
                      <p className="text-sm text-gray-600 mb-3">Healthy coping strategies for challenging times</p>
                      <Button size="sm" variant="outline">
                        Stress Management
                      </Button>
                    </div>
                    <div className="p-4 bg-teal-50 rounded-lg">
                      <h4 className="font-medium mb-2">Family Conflicts</h4>
                      <p className="text-sm text-gray-600 mb-3">Resolving disputes and maintaining relationships</p>
                      <Button size="sm" variant="outline">
                        Conflict Resolution
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Connections */}
          <TabsContent value="community">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Support Groups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Kinship Caregivers Circle</h4>
                        <Badge className="bg-green-100 text-green-800">Weekly</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Tuesdays 7:00 PM • Community Center</p>
                      <Button size="sm" className="w-full">
                        Join Group
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Grandparents Raising Grandchildren</h4>
                        <Badge variant="outline">Monthly</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">First Saturday • 10:00 AM</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Local Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="h-4 w-4 mr-2" />
                      Food Banks & Pantries
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="h-4 w-4 mr-2" />
                      Clothing Assistance
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="h-4 w-4 mr-2" />
                      Transportation Help
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="h-4 w-4 mr-2" />
                      Respite Care
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="h-4 w-4 mr-2" />
                      Cultural Resources
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Family Portal */}
          <TabsContent value="my-portal">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    My Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Birth Certificate</span>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">Medical Records</span>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">School Records</span>
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full mt-4">Upload Document</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                      <p className="font-medium text-sm">Medical Checkup</p>
                      <p className="text-xs text-gray-600">March 20, 2024 • 2:00 PM</p>
                    </div>
                    <div className="p-3 border-l-4 border-green-500 bg-green-50">
                      <p className="font-medium text-sm">Caseworker Visit</p>
                      <p className="text-xs text-gray-600">March 25, 2024 • 10:00 AM</p>
                    </div>
                    <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                      <p className="font-medium text-sm">Court Hearing</p>
                      <p className="text-xs text-gray-600">April 2, 2024 • 9:00 AM</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4">View Calendar</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Messages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Sarah Johnson</p>
                        <span className="text-xs text-gray-500">2h ago</span>
                      </div>
                      <p className="text-sm text-gray-600">Your TANF application has been approved...</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-sm">Dr. Martinez</p>
                        <span className="text-xs text-gray-500">1d ago</span>
                      </div>
                      <p className="text-sm text-gray-600">Appointment reminder for tomorrow...</p>
                    </div>
                  </div>
                  <Button className="w-full mt-4">View All Messages</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Downloadable Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Kinship Care Handbook
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Benefits Application Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Emergency Preparedness
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Legal Rights Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Video Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Getting Started with Kinship Care</h4>
                      <p className="text-xs text-gray-600 mb-2">15 minutes • Beginner</p>
                      <Button size="sm" className="w-full">
                        Watch Now
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Applying for Benefits</h4>
                      <p className="text-xs text-gray-600 mb-2">22 minutes • Intermediate</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Success Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm italic mb-2">
                        "The support I received made all the difference in our journey..."
                      </p>
                      <p className="text-xs text-gray-600">- Maria, Grandmother</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm italic mb-2">
                        "I never thought I could do this, but with the right resources..."
                      </p>
                      <p className="text-xs text-gray-600">- James, Uncle</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Read More Stories
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
