"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Users,
  Download,
  Search,
  Phone,
  BookOpen,
  BarChart3,
  Shield,
  AlertCircle,
  FileText,
  Target,
  Clipboard,
  Globe,
  ArrowLeft,
} from "lucide-react"

export function ContinuedStayReviewGuide() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [searchQuery, setSearchQuery] = useState("")
  const [trackingProgress, setTrackingProgress] = useState(75)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Continued Stay Review Quick Reference Guide</h1>
              <p className="text-gray-600">Mental Health & IDD/Autism Packages - Comprehensive compliance guide</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  Revision Date: 12.27.2024.1
                </Badge>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  T3C Compliant
                </Badge>
              </div>
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

        {/* Critical Alert */}
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>CRITICAL:</strong> 15 business day DFPS submission deadline is non-negotiable. Missing deadline =
            COMPLIANCE VIOLATION
          </AlertDescription>
        </Alert>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search requirements, forms, or procedures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="critical-requirements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="critical-requirements">Critical Requirements</TabsTrigger>
            <TabsTrigger value="step-by-step">Step-by-Step</TabsTrigger>
            <TabsTrigger value="clinical-criteria">Clinical Criteria</TabsTrigger>
            <TabsTrigger value="compliance-tracking">Compliance Tracking</TabsTrigger>
            <TabsTrigger value="common-mistakes">Common Mistakes</TabsTrigger>
            <TabsTrigger value="emergency-procedures">Emergency</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Critical Requirements At A Glance */}
          <TabsContent value="critical-requirements">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <Users className="h-5 w-5" />
                    WHO Must Sign?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">BOTH Program Director AND Treatment Director</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span className="text-sm">One signature alone = NON-COMPLIANT</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <FileCheck className="h-5 w-5" />
                    WHAT Must They Confirm?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Child continues to meet admission criteria</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Less restrictive placement not appropriate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Specific clinical/developmental indicators documented</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <Clock className="h-5 w-5" />
                    WHEN Is It Due?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <p className="font-medium text-orange-800">Every 90 days from admission</p>
                      <p className="text-sm text-orange-700">(no exceptions)</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <p className="font-medium text-red-800">Submit to DFPS within 15 BUSINESS DAYS</p>
                      <p className="text-sm text-red-700">Missing deadline = COMPLIANCE VIOLATION</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50 lg:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800">
                    <FileText className="h-5 w-5" />
                    WHERE Do I Find Forms?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border">
                      <h4 className="font-medium mb-2">Enhanced Continued Stay Confirmation Form</h4>
                      <p className="text-sm text-gray-600 mb-3">previewforms.refugehouse.org</p>
                      <Button size="sm" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Access Form
                      </Button>
                    </div>
                    <div className="p-4 bg-white rounded-lg border">
                      <h4 className="font-medium mb-2">Service Plan T3C Supplement (FC3-03)</h4>
                      <p className="text-sm text-gray-600 mb-3">Internal forms library</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Access Form
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Step-by-Step Process */}
          <TabsContent value="step-by-step">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    STEP 1: SCHEDULE THE REVIEW (Day 60 from last review)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clipboard className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Calculate 90-day review date from admission or last review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clipboard className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Schedule team meeting 30 days in advance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clipboard className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">
                          Add to compliance calendar with alerts at 30, 7, and 1 day before
                        </span>
                      </div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Required Attendees:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Treatment Director</li>
                        <li>• Program Director</li>
                        <li>• Case Manager</li>
                        <li>• Therapist</li>
                        <li>• RN (if IDD package)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    STEP 2: GATHER DOCUMENTATION (2 weeks before review)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-purple-800">Mental Health Package:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">CANS 3.0 reassessment</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">Crisis incident log (past 90 days)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">Medication compliance data</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">Therapy attendance records</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">Psychiatric updates</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 text-teal-800">IDD/Autism Package:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-teal-600" />
                          <span className="text-sm">Developmental assessments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-teal-600" />
                          <span className="text-sm">Behavior data graphs (3-month trend)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-teal-600" />
                          <span className="text-sm">Medical stability reports from RN</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-teal-600" />
                          <span className="text-sm">Skills acquisition tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-teal-600" />
                          <span className="text-sm">Communication progress notes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    STEP 3: CONDUCT THE REVIEW (Day of review)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clipboard className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Review all documentation as a team</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clipboard className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Complete Service Plan T3C Supplement (FC3-03)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clipboard className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Determine if continued stay is justified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clipboard className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Document specific indicators (see criteria tab)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    STEP 4: COMPLETE CONFIRMATIONS (Within 48 hours)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-blue-800">Treatment Director Must Write:</h4>
                      <div className="space-y-2">
                        <p className="text-sm italic bg-white p-3 rounded border">
                          <strong>Mental Health:</strong> "I confirm that [Child's Name] continues to require Mental &
                          Behavioral Health Support Services based on the following clinical indicators: [list specific
                          indicators]"
                        </p>
                        <p className="text-sm italic bg-white p-3 rounded border">
                          <strong>IDD/Autism:</strong> "I confirm that [Child's Name] continues to require IDD/Autism
                          Support Services based on the following developmental and medical indicators: [list specific
                          indicators]"
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-green-800">Program Director Must Write:</h4>
                      <p className="text-sm italic bg-white p-3 rounded border">
                        "I confirm that [Child's Name] continues to meet admission criteria for [Service Package] and
                        that a less restrictive placement is not appropriate at this time."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    STEP 5: SUBMIT TO DFPS (Track carefully!)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-center">
                      <p className="font-medium text-blue-800">Day 1-5</p>
                      <p className="text-sm text-blue-700">Compile all documents</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg text-center">
                      <p className="font-medium text-yellow-800">Day 6-10</p>
                      <p className="text-sm text-yellow-700">Final review and signatures</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg text-center">
                      <p className="font-medium text-orange-800">Day 11-14</p>
                      <p className="text-sm text-orange-700">Submit via IMPACT</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg text-center">
                      <p className="font-medium text-red-800">Day 15</p>
                      <p className="text-sm text-red-700">ABSOLUTE DEADLINE</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Always confirm receipt from DFPS</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clinical Justifications */}
          <TabsContent value="clinical-criteria">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-800">
                    <Shield className="h-5 w-5" />
                    MENTAL HEALTH PACKAGE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 text-red-800">Continue Stay If Present:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Active psychosis or severe mood episodes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Psychiatric hospitalization in past 90 days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Self-harm attempts or serious gestures</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Medication changes in past 30 days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Crisis interventions required</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">CANS Mental Health items scored 2-3</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Requires intensive therapy (2+ weekly)</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 text-green-800">Consider Step-Down When:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Stable on medications 60+ days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">No crisis incidents 60+ days</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Using coping skills effectively</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">CANS scores improving to 0-1</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Managing with weekly therapy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-teal-800">
                    <Users className="h-5 w-5" />
                    IDD/AUTISM PACKAGE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 text-red-800">Continue Stay If Present:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Requires full assistance with ADLs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Cannot communicate basic needs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Severe self-injurious behaviors</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Complex medical needs requiring RN</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Multiple daily medications</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">Aggressive behaviors requiring specialized intervention</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <span className="text-sm">No safety awareness</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-3 text-green-800">Consider Step-Down When:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Increasing independence in ADLs</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Functional communication established</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Medical conditions stable</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Behaviors manageable with standard approaches</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Basic safety skills demonstrated</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tracking */}
          <TabsContent value="compliance-tracking">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Tracking Sheet Template
                  </CardTitle>
                  <CardDescription>
                    Create and maintain compliance tracking for all continued stay reviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Child Name</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Package</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">90-Day Due</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Review Date</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">
                            Director Signatures
                          </th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">DFPS Submission</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Days to Submit</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2 text-sm">Example Child</td>
                          <td className="border border-gray-300 p-2 text-sm">Mental Health</td>
                          <td className="border border-gray-300 p-2 text-sm">3/15/25</td>
                          <td className="border border-gray-300 p-2 text-sm">3/15/25</td>
                          <td className="border border-gray-300 p-2 text-sm">✅ Both</td>
                          <td className="border border-gray-300 p-2 text-sm">3/25/25</td>
                          <td className="border border-gray-300 p-2 text-sm">10 days</td>
                          <td className="border border-gray-300 p-2 text-sm">
                            <Badge className="bg-green-100 text-green-800">✅ COMPLIANT</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg text-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                      <p className="font-medium text-green-800">GREEN</p>
                      <p className="text-sm text-green-700">Submitted within 10 business days</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg text-center">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                      <p className="font-medium text-yellow-800">YELLOW</p>
                      <p className="text-sm text-yellow-700">Submitted days 11-14</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg text-center">
                      <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                      <p className="font-medium text-red-800">RED</p>
                      <p className="text-sm text-red-700">Submitted day 15 or late</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg text-center">
                      <div className="w-8 h-8 bg-gray-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <span className="text-white text-xs">⛔</span>
                      </div>
                      <p className="font-medium text-gray-800">VIOLATION</p>
                      <p className="text-sm text-gray-700">Submitted after day 15</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Tips for 100% Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Start the process at day 75 (not day 90)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Use calendar alerts liberally</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Assign backup reviewers</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Keep templates ready</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Celebrate on-time submissions!</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Target submission by day 10</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Common Mistakes */}
          <TabsContent value="common-mistakes">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="h-5 w-5" />
                    Common Mistakes to Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-red-600 font-bold">❌</span>
                        <span className="text-sm font-medium">Missing RN documentation for IDD/Autism reviews</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✅</span>
                        <span className="text-sm">Get RN input BEFORE the review meeting</span>
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-red-600 font-bold">❌</span>
                        <span className="text-sm font-medium">Using generic language in confirmations</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✅</span>
                        <span className="text-sm">List SPECIFIC clinical indicators</span>
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-red-600 font-bold">❌</span>
                        <span className="text-sm font-medium">Forgetting to track business days vs. calendar days</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✅</span>
                        <span className="text-sm">Use business day calculator</span>
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-red-600 font-bold">❌</span>
                        <span className="text-sm font-medium">Waiting until day 15 to submit</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✅</span>
                        <span className="text-sm">Target submission by day 10</span>
                      </div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-red-600 font-bold">❌</span>
                        <span className="text-sm font-medium">Not confirming DFPS receipt</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✅</span>
                        <span className="text-sm">Always get confirmation</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800">
                    <Phone className="h-5 w-5" />
                    Quick Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800 mb-1">Clinical indicators</p>
                      <p className="text-sm text-blue-700">→ Treatment Director</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800 mb-1">Forms location</p>
                      <p className="text-sm text-blue-700">→ Aftercare Coordinator</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800 mb-1">IMPACT submission</p>
                      <p className="text-sm text-blue-700">→ Case Manager Supervisor</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800 mb-1">Compliance issues</p>
                      <p className="text-sm text-blue-700">→ QA Coordinator</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-800 mb-1">Extended stays</p>
                      <p className="text-sm text-blue-700">→ Program Director</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Emergency Procedures */}
          <TabsContent value="emergency-procedures">
            <div className="space-y-6">
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="h-5 w-5" />
                    Emergency Situations
                  </CardTitle>
                  <CardDescription className="text-red-700">If approaching day 15 deadline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        1
                      </span>
                      <span className="text-sm">Immediately notify Program Director</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        2
                      </span>
                      <span className="text-sm">Contact DFPS liaison directly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        3
                      </span>
                      <span className="text-sm">Submit what you have with explanation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        4
                      </span>
                      <span className="text-sm">Follow up with missing pieces ASAP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        5
                      </span>
                      <span className="text-sm">Document the situation thoroughly</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Business Day Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800 mb-3">
                      <strong>Remember:</strong> The 15 business day deadline excludes weekends and holidays.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium mb-2">Excluded Days:</p>
                        <ul className="text-sm space-y-1">
                          <li>• Saturdays</li>
                          <li>• Sundays</li>
                          <li>• Federal holidays</li>
                          <li>• State holidays</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Quick Reference:</p>
                        <ul className="text-sm space-y-1">
                          <li>• 15 business days ≈ 21 calendar days</li>
                          <li>• Always count forward from review date</li>
                          <li>• Use online business day calculator</li>
                        </ul>
                      </div>
                    </div>
                  </div>
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
                    <BookOpen className="h-5 w-5" />
                    Related Procedures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      FC3-01.1 Individual Service Planning (Section 2)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      FC14-01.1 Discharge Planning (Section 2.3)
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      FC-AF-01.1 Aftercare Services (Section 4)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Downloadable Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Compliance Tracking Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Business Day Calculator
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Emergency Contact Card
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Quick Reference Checklist
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Training Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm mb-1">Continued Stay Review Training</h4>
                      <p className="text-xs text-gray-600 mb-2">45 minutes • Required annually</p>
                      <Button size="sm" className="w-full">
                        Access Training
                      </Button>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm mb-1">DFPS Submission Process</h4>
                      <p className="text-xs text-gray-600 mb-2">30 minutes • New staff</p>
                      <Button size="sm" variant="outline" className="w-full bg-transparent">
                        Access Training
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Important Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 mb-2">
                    <em>
                      This Quick Reference Guide is a supplement to official procedures. Always refer to the complete
                      procedures for comprehensive requirements. When in doubt, ask for clarification rather than risk
                      non-compliance.
                    </em>
                  </p>
                  <p className="text-sm font-medium text-gray-800">
                    <strong>Remember: The 15 business day deadline is non-negotiable. Plan accordingly!</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
