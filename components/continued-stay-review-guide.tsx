"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  Heart,
  Pill,
  XCircle,
  Info,
  TrendingDown,
} from "lucide-react"

// Package configuration
const PACKAGES = {
  mh: {
    id: "mh",
    name: "Mental & Behavioral Health",
    shortName: "Mental Health",
    cycle: "90-day",
    color: "purple",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
    borderColor: "border-purple-500",
    excluded: false,
  },
  idd: {
    id: "idd",
    name: "IDD/Autism Support Services",
    shortName: "IDD/Autism",
    cycle: "90-day",
    color: "teal",
    bgColor: "bg-teal-100",
    textColor: "text-teal-800",
    borderColor: "border-teal-500",
    excluded: false,
  },
  su: {
    id: "su",
    name: "Substance Use Support Services",
    shortName: "Substance Use",
    cycle: "90-day",
    color: "amber",
    bgColor: "bg-amber-100",
    textColor: "text-amber-800",
    borderColor: "border-amber-500",
    excluded: false,
  },
  stass: {
    id: "stass",
    name: "Short-Term Assessment (STASS)",
    shortName: "STASS",
    cycle: "N/A",
    color: "gray",
    bgColor: "bg-gray-100",
    textColor: "text-gray-800",
    borderColor: "border-gray-500",
    excluded: true,
  },
  tffc: {
    id: "tffc",
    name: "Treatment Foster Family Care (TFFC)",
    shortName: "TFFC",
    cycle: "60-day",
    color: "rose",
    bgColor: "bg-rose-100",
    textColor: "text-rose-800",
    borderColor: "border-rose-500",
    excluded: false,
  },
} as const

type PackageKey = keyof typeof PACKAGES

export function ContinuedStayReviewGuide() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [searchQuery, setSearchQuery] = useState("")
  const [trackingProgress, setTrackingProgress] = useState(75)
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>("mh")
  
  const pkg = PACKAGES[selectedPackage]
  const is90Day = pkg.cycle === "90-day"
  const is60Day = pkg.cycle === "60-day"
  const isExcluded = pkg.excluded

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
              <p className="text-gray-600">All T3C Specialized Packages - Comprehensive compliance guide</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800">
                  Revision Date: 12.10.2025
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

        {/* Package Selector */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Select Service Package:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PACKAGES).map(([key, p]) => (
              <Button
                key={key}
                variant={selectedPackage === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPackage(key as PackageKey)}
                className={selectedPackage === key 
                  ? `${p.bgColor} ${p.textColor} border-2 ${p.borderColor}` 
                  : "bg-transparent"
                }
              >
                <span className="font-medium">{p.shortName}</span>
                <Badge variant="outline" className={`ml-2 text-xs ${p.excluded ? "bg-gray-200" : ""}`}>
                  {p.cycle}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Package-Specific Alert Banner */}
        {isExcluded ? (
          <Alert className="mb-6 border-gray-300 bg-gray-100">
            <XCircle className="h-4 w-4 text-gray-600" />
            <AlertTitle className="text-gray-800">STASS - No Continued Stay Reviews Required</AlertTitle>
            <AlertDescription className="text-gray-700">
              Short-Term Assessment is time-limited (30-45 days max). Use Assessment Completion forms instead.
              See the STASS Exclusion tab for alternative forms and timelines.
            </AlertDescription>
          </Alert>
        ) : is60Day ? (
          <Alert className="mb-6 border-rose-200 bg-rose-50">
            <AlertTriangle className="h-4 w-4 text-rose-600" />
            <AlertTitle className="text-rose-800">TFFC: 60-Day Review Cycle</AlertTitle>
            <AlertDescription className="text-rose-700">
              <strong>CRITICAL:</strong> TFFC requires reviews every <strong>60 days</strong> (not 90). 
              Maximum 365 days total placement. Step-down assessment REQUIRED at every review.
              15 business day DFPS submission deadline still applies.
            </AlertDescription>
          </Alert>
        ) : selectedPackage === "su" ? (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <Pill className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Substance Use: Recovery-Focused Review</AlertTitle>
            <AlertDescription className="text-amber-700">
              <strong>CRITICAL:</strong> 15 business day DFPS submission deadline is non-negotiable.
              Recovery metrics and relapse documentation (non-punitive) required per FC-SU-01.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>CRITICAL:</strong> 15 business day DFPS submission deadline is non-negotiable. Missing deadline =
              COMPLIANCE VIOLATION
            </AlertDescription>
          </Alert>
        )}

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

        <Tabs defaultValue={isExcluded ? "stass-exclusion" : "critical-requirements"} className="space-y-6">
          <TabsList className="flex flex-wrap gap-1 h-auto p-1">
            {!isExcluded && <TabsTrigger value="critical-requirements">Critical Requirements</TabsTrigger>}
            {isExcluded && <TabsTrigger value="stass-exclusion">STASS Exclusion</TabsTrigger>}
            {is60Day && <TabsTrigger value="tffc-guide">TFFC 60-Day Guide</TabsTrigger>}
            {selectedPackage === "su" && <TabsTrigger value="su-guide">Recovery Metrics</TabsTrigger>}
            {!isExcluded && <TabsTrigger value="step-by-step">Step-by-Step</TabsTrigger>}
            {!isExcluded && <TabsTrigger value="clinical-criteria">Clinical Criteria</TabsTrigger>}
            {!isExcluded && <TabsTrigger value="compliance-tracking">Compliance Tracking</TabsTrigger>}
            <TabsTrigger value="common-mistakes">Common Mistakes</TabsTrigger>
            {!isExcluded && <TabsTrigger value="emergency-procedures">Emergency</TabsTrigger>}
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* STASS Exclusion Tab */}
          <TabsContent value="stass-exclusion">
            <div className="space-y-6">
              <Card className="border-2 border-gray-400">
                <CardHeader className="bg-gray-100">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <XCircle className="h-6 w-6" />
                    Short-Term Assessment Support Services (STASS)
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Continued Stay Reviews are NOT Required
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <Alert className="border-gray-300 bg-gray-50">
                      <Info className="h-4 w-4 text-gray-600" />
                      <AlertDescription className="text-gray-700">
                        STASS is <strong>excluded</strong> from continued stay review requirements because:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li><strong>Time-Limited Service:</strong> Maximum 30-45 days (not ongoing placement)</li>
                          <li><strong>Assessment Purpose:</strong> Designed for evaluation, not long-term care</li>
                          <li><strong>Automatic Transition:</strong> Children transition to appropriate ongoing package upon assessment completion</li>
                        </ul>
                      </AlertDescription>
                    </Alert>

                    <div>
                      <h4 className="font-semibold text-lg mb-4">Instead, Use These Forms:</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 p-3 text-left">Form</th>
                              <th className="border border-gray-300 p-3 text-left">Purpose</th>
                              <th className="border border-gray-300 p-3 text-left">When</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">STASS Assessment Progress</td>
                              <td className="border border-gray-300 p-3">Track assessment activities</td>
                              <td className="border border-gray-300 p-3">Weekly</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">STASS Transition Planning</td>
                              <td className="border border-gray-300 p-3">Plan Service Package transition</td>
                              <td className="border border-gray-300 p-3">By Day 20 (standard) or Day 35 (extended)</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Assessment Completion Summary</td>
                              <td className="border border-gray-300 p-3">Document findings and recommendation</td>
                              <td className="border border-gray-300 p-3">Before transition</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg mb-4">STASS Timeline Reference</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-cyan-100">
                              <th className="border border-gray-300 p-3 text-left">Type</th>
                              <th className="border border-gray-300 p-3 text-center">Duration</th>
                              <th className="border border-gray-300 p-3 text-center">Extension</th>
                              <th className="border border-gray-300 p-3 text-center">Maximum</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 p-3 font-medium">Standard Assessment</td>
                              <td className="border border-gray-300 p-3 text-center">30 days</td>
                              <td className="border border-gray-300 p-3 text-center">+15 days (with approval)</td>
                              <td className="border border-gray-300 p-3 text-center font-bold">45 days</td>
                            </tr>
                            <tr className="bg-gray-50">
                              <td className="border border-gray-300 p-3 font-medium">Extended Assessment</td>
                              <td className="border border-gray-300 p-3 text-center">45 days</td>
                              <td className="border border-gray-300 p-3 text-center">+15 days (with approval)</td>
                              <td className="border border-gray-300 p-3 text-center font-bold">60 days</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <Alert className="border-blue-300 bg-blue-50">
                      <Info className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800">Key Point</AlertTitle>
                      <AlertDescription className="text-blue-700">
                        If a child in STASS requires continued placement beyond assessment, they must transition 
                        to an ongoing Service Package (Basic, MH, IDD, SU, or TFFC), which <strong>WILL</strong> have 
                        continued stay review requirements.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TFFC 60-Day Guide Tab */}
          <TabsContent value="tffc-guide">
            <div className="space-y-6">
              <Card className="border-2 border-rose-400">
                <CardHeader className="bg-rose-50">
                  <CardTitle className="flex items-center gap-2 text-rose-800">
                    <Heart className="h-6 w-6" />
                    T3C Treatment Foster Family Care - 60-Day Review Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {/* Key Differences Table */}
                  <div>
                    <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-rose-600" />
                      KEY DIFFERENCES FROM OTHER PACKAGES
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-rose-100">
                            <th className="border border-gray-300 p-3 text-left">Element</th>
                            <th className="border border-gray-300 p-3 text-center">Other Packages</th>
                            <th className="border border-gray-300 p-3 text-center font-bold text-rose-800">TFFC</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-3 font-medium">Review Cycle</td>
                            <td className="border border-gray-300 p-3 text-center">90 days</td>
                            <td className="border border-gray-300 p-3 text-center font-bold text-rose-700">60 days</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 p-3 font-medium">Max Placement</td>
                            <td className="border border-gray-300 p-3 text-center">None</td>
                            <td className="border border-gray-300 p-3 text-center font-bold text-rose-700">365 days</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-3 font-medium">Step-Down Required</td>
                            <td className="border border-gray-300 p-3 text-center">No</td>
                            <td className="border border-gray-300 p-3 text-center font-bold text-rose-700">Yes - every review</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border border-gray-300 p-3 font-medium">Crisis Analysis</td>
                            <td className="border border-gray-300 p-3 text-center">No</td>
                            <td className="border border-gray-300 p-3 text-center font-bold text-rose-700">Yes - every review</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 60-Day Timeline Visual */}
                  <div className="bg-rose-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">60-Day Review Timeline (365-Day Max)</h4>
                    <div className="flex flex-wrap gap-2 items-center text-sm">
                      <Badge className="bg-rose-200 text-rose-800">Day 1: Start</Badge>
                      <span>→</span>
                      <Badge className="bg-rose-300 text-rose-900">Day 60: Review 1</Badge>
                      <span>→</span>
                      <Badge className="bg-rose-300 text-rose-900">Day 120: Review 2</Badge>
                      <span>→</span>
                      <Badge className="bg-rose-300 text-rose-900">Day 180: Review 3</Badge>
                      <span>→</span>
                      <Badge className="bg-rose-400 text-white">Day 240: Review 4</Badge>
                      <span>→</span>
                      <Badge className="bg-rose-500 text-white">Day 300: Review 5</Badge>
                      <span>→</span>
                      <Badge className="bg-rose-700 text-white">Day 360: Review 6</Badge>
                      <span>→</span>
                      <Badge variant="destructive">Day 365: MAX</Badge>
                    </div>
                  </div>

                  {/* Step-Down Readiness */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-green-300 bg-green-50">
                      <CardHeader>
                        <CardTitle className="text-green-800 text-base flex items-center gap-2">
                          <CheckCircle className="h-5 w-5" />
                          Ready for Step-Down When:
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {[
                          "Crisis frequency significantly reduced from admission",
                          "Behavioral stability demonstrated",
                          "Medication regimen stable (if applicable)",
                          "Therapy engagement consistent",
                          "Coping skills developing",
                          "Family/permanency resource identified"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <Card className="border-red-300 bg-red-50">
                      <CardHeader>
                        <CardTitle className="text-red-800 text-base flex items-center gap-2">
                          <XCircle className="h-5 w-5" />
                          Not Ready for Step-Down When:
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {[
                          "Ongoing crisis frequency",
                          "Recent behavioral regression",
                          "Medication adjustments in progress",
                          "Active psychiatric symptoms",
                          "No appropriate step-down placement identified"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* 365-Day Alerts */}
                  <div>
                    <h4 className="font-semibold text-lg mb-4">365-Day Maximum Alerts</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      <div className="p-3 bg-green-100 rounded-lg text-center">
                        <p className="font-bold text-green-800">90+ days</p>
                        <p className="text-xs text-green-700">Standard planning</p>
                      </div>
                      <div className="p-3 bg-yellow-100 rounded-lg text-center">
                        <p className="font-bold text-yellow-800">60-89 days</p>
                        <p className="text-xs text-yellow-700">Intensify planning</p>
                      </div>
                      <div className="p-3 bg-orange-100 rounded-lg text-center">
                        <p className="font-bold text-orange-800">30-59 days</p>
                        <p className="text-xs text-orange-700">Imminent transition</p>
                      </div>
                      <div className="p-3 bg-red-100 rounded-lg text-center">
                        <p className="font-bold text-red-800">&lt;30 days</p>
                        <p className="text-xs text-red-700">Emergency planning</p>
                      </div>
                      <div className="p-3 bg-red-600 rounded-lg text-center">
                        <p className="font-bold text-white">0 days</p>
                        <p className="text-xs text-red-100">CRITICAL</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Substance Use Recovery Metrics Tab */}
          <TabsContent value="su-guide">
            <div className="space-y-6">
              <Card className="border-2 border-amber-400">
                <CardHeader className="bg-amber-50">
                  <CardTitle className="flex items-center gap-2 text-amber-800">
                    <Pill className="h-6 w-6" />
                    Substance Use Support Services - Recovery Metrics Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <Alert className="border-amber-300 bg-amber-100">
                    <Info className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      In addition to standard continued stay elements, Substance Use reviews <strong>must include</strong> 
                      recovery-specific indicators per FC-SU-01.
                    </AlertDescription>
                  </Alert>

                  {/* Recovery Progress Checklist */}
                  <div>
                    <h4 className="font-semibold text-lg mb-4">Recovery Progress Indicators (Required)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "Recovery status assessment (stable/challenges/relapse)",
                        "Substance use treatment engagement",
                        "Relapse history (if applicable)",
                        "MAT compliance (if applicable)",
                        "Recovery support involvement"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-amber-50 rounded">
                          <Clipboard className="h-4 w-4 text-amber-600 flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Relapse Documentation */}
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-3">Relapse Documentation (Non-Punitive)</h4>
                    <p className="text-sm text-amber-700 mb-4">
                      Per FC-SU-01, relapse documentation must frame relapse as part of recovery process, NOT failure.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-green-100 rounded border border-green-300">
                        <p className="font-medium text-green-800 mb-2">✅ Appropriate Documentation:</p>
                        <p className="text-sm text-green-700 italic">
                          &quot;Youth experienced relapse on [date] following [trigger]. Re-engaged with treatment within 48 hours. 
                          Treatment plan adjusted to address identified triggers. Youth continues to demonstrate commitment to recovery.&quot;
                        </p>
                      </div>
                      <div className="p-3 bg-red-100 rounded border border-red-300">
                        <p className="font-medium text-red-800 mb-2">❌ Inappropriate Documentation:</p>
                        <p className="text-sm text-red-700 italic">
                          &quot;Youth failed to maintain sobriety and used substances again.&quot;
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recovery Stability Assessment */}
                  <div>
                    <h4 className="font-semibold text-lg mb-4">Recovery Stability Assessment</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-amber-100">
                            <th className="border border-gray-300 p-3 text-left">Indicator</th>
                            <th className="border border-gray-300 p-3 text-center">Supports Continued Stay</th>
                            <th className="border border-gray-300 p-3 text-center">May Support Step-Down</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            ["Treatment Engagement", "Inconsistent or recent increase", "Consistent over multiple periods"],
                            ["Relapse History", "Recent relapse(s)", "Extended sobriety period"],
                            ["Recovery Supports", "Building network", "Established stable network"],
                            ["Coping Skills", "Still developing", "Demonstrated use in stress"],
                            ["Co-occurring MH", "Being actively addressed", "Stabilized"]
                          ].map(([indicator, stay, stepDown], i) => (
                            <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                              <td className="border border-gray-300 p-3 font-medium">{indicator}</td>
                              <td className="border border-gray-300 p-3 text-center text-sm">{stay}</td>
                              <td className="border border-gray-300 p-3 text-center text-sm">{stepDown}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* MAT Tracking */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">MAT (Medication-Assisted Treatment) Tracking</h4>
                    <p className="text-sm text-blue-700 mb-3">If youth is receiving MAT, document the following:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {[
                        "Current MAT medication",
                        "Compliance status",
                        "Dosage adjustments",
                        "Provider coordination"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-white rounded border">
                          <Clipboard className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                    {is60Day && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-rose-600" />
                        <span className="text-sm font-medium text-rose-700">Step-down assessment completed (TFFC)</span>
                      </div>
                    )}
                    {selectedPackage === "su" && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-medium text-amber-700">Recovery metrics documented (SU)</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className={`border-2 ${is60Day ? "border-rose-300 bg-rose-50" : "border-orange-200 bg-orange-50"}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${is60Day ? "text-rose-800" : "text-orange-800"}`}>
                    <Clock className="h-5 w-5" />
                    WHEN Is It Due?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className={`p-3 rounded-lg ${is60Day ? "bg-rose-100" : "bg-orange-100"}`}>
                      <p className={`font-medium ${is60Day ? "text-rose-800" : "text-orange-800"}`}>
                        Every {is60Day ? "60" : "90"} days from admission
                      </p>
                      {is60Day && (
                        <p className="text-sm text-rose-700 font-medium">⚠️ SHORTER CYCLE than other packages</p>
                      )}
                    </div>
                    <div className="bg-red-100 p-3 rounded-lg">
                      <p className="font-medium text-red-800">Submit to DFPS within 15 BUSINESS DAYS</p>
                      <p className="text-sm text-red-700">Missing deadline = COMPLIANCE VIOLATION</p>
                    </div>
                    {is60Day && (
                      <div className="bg-rose-200 p-3 rounded-lg">
                        <p className="font-medium text-rose-900">Maximum 365 days total placement</p>
                      </div>
                    )}
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
              {/* Package Identification */}
              <Card className="border-blue-300 bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-700" />
                    STEP 1: IDENTIFY REVIEW TYPE
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 bg-white">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left">If Package Is...</th>
                          <th className="border border-gray-300 p-3 text-left">Then...</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3">Mental & Behavioral Health</td>
                          <td className="border border-gray-300 p-3">Proceed to 90-Day Review Process</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3">IDD/Autism</td>
                          <td className="border border-gray-300 p-3">Proceed to 90-Day Review Process</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Substance Use</td>
                          <td className="border border-gray-300 p-3">Proceed to 90-Day Review Process <span className="text-amber-700 font-medium">(with recovery additions)</span></td>
                        </tr>
                        <tr className="bg-gray-200">
                          <td className="border border-gray-300 p-3 font-bold">STASS</td>
                          <td className="border border-gray-300 p-3 font-bold text-gray-700">STOP - No continued stay review required</td>
                        </tr>
                        <tr className="bg-rose-100">
                          <td className="border border-gray-300 p-3 font-bold text-rose-800">TFFC</td>
                          <td className="border border-gray-300 p-3 font-bold text-rose-800">Proceed to 60-Day Review Process</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule the Review - Dynamic based on package */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    STEP 2: SCHEDULE THE REVIEW
                    <Badge className={is60Day ? "bg-rose-100 text-rose-800" : "bg-blue-100 text-blue-800"}>
                      {is60Day ? "Day 53 from last review" : "Day 60 from last review"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clipboard className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Calculate {is60Day ? "60" : "90"}-day review date from admission or last review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clipboard className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Schedule team meeting {is60Day ? "7" : "30"} days in advance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clipboard className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">
                          Add to compliance calendar with alerts at {is60Day ? "14, 7, and 3" : "30, 7, and 1"} day(s) before
                        </span>
                      </div>
                      {is60Day && (
                        <div className="flex items-center gap-2 p-2 bg-rose-100 rounded">
                          <AlertTriangle className="h-4 w-4 text-rose-600" />
                          <span className="text-sm font-medium text-rose-700">Calculate days remaining of 365-day max</span>
                        </div>
                      )}
                    </div>
                    <div className={`p-4 rounded-lg ${is60Day ? "bg-rose-50" : "bg-blue-50"}`}>
                      <h4 className="font-medium mb-2">Required Attendees:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Treatment Director</li>
                        <li>• Program Director</li>
                        <li>• Case Manager</li>
                        <li>• Therapist</li>
                        {selectedPackage === "idd" && <li className="font-medium text-teal-700">• RN (required for IDD)</li>}
                        {is60Day && <li className="font-medium text-rose-700">• Step-down planning coordinator</li>}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    STEP 3: GATHER DOCUMENTATION
                    <Badge className={is60Day ? "bg-rose-100 text-rose-800" : "bg-blue-100 text-blue-800"}>
                      {is60Day ? "1 week before review" : "2 weeks before review"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Mental Health */}
                    <div className={selectedPackage === "mh" ? "ring-2 ring-purple-400 rounded-lg p-3" : ""}>
                      <h4 className="font-medium mb-3 text-purple-800">Mental Health Package:</h4>
                      <div className="space-y-2">
                        {[
                          "CANS 3.0 reassessment",
                          "Crisis incident log (past 90 days)",
                          "Medication compliance data",
                          "Therapy attendance records",
                          "Psychiatric updates"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Clipboard className="h-4 w-4 text-purple-600" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* IDD/Autism */}
                    <div className={selectedPackage === "idd" ? "ring-2 ring-teal-400 rounded-lg p-3" : ""}>
                      <h4 className="font-medium mb-3 text-teal-800">IDD/Autism Package:</h4>
                      <div className="space-y-2">
                        {[
                          "Developmental assessments",
                          "Behavior data graphs (3-month trend)",
                          "Medical stability reports from RN",
                          "Skills acquisition tracking",
                          "Communication progress notes"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Clipboard className="h-4 w-4 text-teal-600" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Substance Use */}
                    <div className={selectedPackage === "su" ? "ring-2 ring-amber-400 rounded-lg p-3" : ""}>
                      <h4 className="font-medium mb-3 text-amber-800">Substance Use Package:</h4>
                      <div className="space-y-2">
                        {[
                          "CANS 3.0 reassessment",
                          "Recovery status assessment",
                          "Treatment engagement records",
                          "Relapse documentation (if applicable)",
                          "MAT compliance (if applicable)",
                          "Recovery support involvement"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Clipboard className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* TFFC */}
                    <div className={selectedPackage === "tffc" ? "ring-2 ring-rose-400 rounded-lg p-3" : ""}>
                      <h4 className="font-medium mb-3 text-rose-800">TFFC Package (60-Day):</h4>
                      <div className="space-y-2">
                        {[
                          "CANS 3.0 results",
                          "Crisis incident log for 60-day period",
                          "Crisis pattern analysis",
                          "Behavioral stability data",
                          "Step-down assessment materials",
                          "Days remaining calculation (of 365)"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Clipboard className="h-4 w-4 text-rose-600" />
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    STEP 4: CONDUCT THE REVIEW (Day of review)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-800">All Packages:</h4>
                      {[
                        "Review all documentation as a team",
                        "Complete Service Plan T3C Supplement (FC3-03)",
                        "Determine if continued stay is justified",
                        "Document specific indicators (see criteria tab)",
                        "Obtain BOTH Director signatures"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Clipboard className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {selectedPackage === "su" && (
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <h4 className="font-medium text-amber-800 mb-2">+ Substance Use Additions:</h4>
                          <div className="space-y-2">
                            {[
                              "Complete recovery status assessment",
                              "Document relapse history (non-punitive)",
                              "Review MAT compliance if applicable"
                            ].map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Pill className="h-4 w-4 text-amber-600" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {is60Day && (
                        <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                          <h4 className="font-medium text-rose-800 mb-2">+ TFFC Requirements:</h4>
                          <div className="space-y-2">
                            {[
                              "Complete crisis pattern analysis",
                              "Assess behavioral stability",
                              "REQUIRED: Complete Step-Down Assessment",
                              "Identify barriers to step-down (if not ready)",
                              "Set step-down timeline goals"
                            ].map((item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Heart className="h-4 w-4 text-rose-600" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedPackage === "idd" && (
                        <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                          <h4 className="font-medium text-teal-800 mb-2">+ IDD/Autism Requirement:</h4>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-teal-600" />
                            <span className="text-sm">Obtain RN input on medical/nursing needs</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    STEP 5: COMPLETE CONFIRMATIONS (Within 48 hours)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-blue-800">Treatment Director Must Write:</h4>
                      <div className="space-y-2">
                        <p className="text-sm italic bg-white p-3 rounded border">
                          <strong>Mental Health:</strong> &quot;I confirm that [Child&apos;s Name] continues to require Mental &
                          Behavioral Health Support Services based on the following clinical indicators: [list specific
                          indicators]&quot;
                        </p>
                        <p className="text-sm italic bg-white p-3 rounded border">
                          <strong>IDD/Autism:</strong> &quot;I confirm that [Child&apos;s Name] continues to require IDD/Autism
                          Support Services based on the following developmental and medical indicators: [list specific
                          indicators]&quot;
                        </p>
                        <p className="text-sm italic bg-white p-3 rounded border border-amber-300">
                          <strong>Substance Use:</strong> &quot;I confirm that [Child&apos;s Name] continues to require Substance Use
                          Support Services based on the following recovery indicators: [list specific
                          indicators including recovery status]&quot;
                        </p>
                        <p className="text-sm italic bg-white p-3 rounded border border-rose-300">
                          <strong>TFFC:</strong> &quot;I confirm that [Child&apos;s Name] continues to require Treatment Foster Family Care
                          based on the following clinical indicators: [list specific
                          indicators]. Step-down assessment: [ready/not ready with rationale]. Days remaining: [X of 365].&quot;
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-green-800">Program Director Must Write:</h4>
                      <p className="text-sm italic bg-white p-3 rounded border">
                        &quot;I confirm that [Child&apos;s Name] continues to meet admission criteria for [Service Package] and
                        that a less restrictive placement is not appropriate at this time.&quot;
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    STEP 6: SUBMIT TO DFPS (Track carefully!)
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
                  <div className="mt-4 space-y-2">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Always confirm receipt from DFPS</span>
                      </div>
                    </div>
                    {is60Day && (
                      <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-rose-600" />
                          <span className="text-sm font-medium text-rose-700">TFFC: Schedule NEXT 60-day review immediately after submission</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clinical Justifications */}
          <TabsContent value="clinical-criteria">
            <div className="space-y-6">
              {/* All Packages Must Confirm */}
              <Card className="border-blue-300 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">All Packages Must Confirm:</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      "Child continues to meet admission criteria",
                      "Child is benefitting from Treatment Model",
                      "Less-restrictive Basic Foster Home is NOT appropriate"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-white rounded border">
                        <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mental Health */}
                <Card className={selectedPackage === "mh" ? "ring-2 ring-purple-500" : ""}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-800">
                      <Shield className="h-5 w-5" />
                      MENTAL HEALTH PACKAGE
                      <Badge className="bg-purple-100 text-purple-800">90-day</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 text-red-800">Continue Stay If Present:</h4>
                        <div className="space-y-2">
                          {[
                            "Active psychosis or severe mood episodes",
                            "Psychiatric hospitalization in past 90 days",
                            "Self-harm attempts or serious gestures",
                            "Medication changes in past 30 days",
                            "Crisis interventions required",
                            "CANS Mental Health items scored 2-3",
                            "Requires intensive therapy (2+ weekly)"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 text-green-800">Consider Step-Down When:</h4>
                        <div className="space-y-2">
                          {[
                            "Stable on medications 60+ days",
                            "No crisis incidents 60+ days",
                            "Using coping skills effectively",
                            "CANS scores improving to 0-1",
                            "Managing with weekly therapy"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* IDD/Autism */}
                <Card className={selectedPackage === "idd" ? "ring-2 ring-teal-500" : ""}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-teal-800">
                      <Users className="h-5 w-5" />
                      IDD/AUTISM PACKAGE
                      <Badge className="bg-teal-100 text-teal-800">90-day</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 text-red-800">Continue Stay If Present:</h4>
                        <div className="space-y-2">
                          {[
                            "Requires full assistance with ADLs",
                            "Cannot communicate basic needs",
                            "Severe self-injurious behaviors",
                            "Complex medical needs requiring RN",
                            "Multiple daily medications",
                            "Aggressive behaviors requiring specialized intervention",
                            "No safety awareness"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 text-green-800">Consider Step-Down When:</h4>
                        <div className="space-y-2">
                          {[
                            "Increasing independence in ADLs",
                            "Functional communication established",
                            "Medical conditions stable",
                            "Behaviors manageable with standard approaches",
                            "Basic safety skills demonstrated"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Substance Use */}
                <Card className={selectedPackage === "su" ? "ring-2 ring-amber-500" : ""}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-800">
                      <Pill className="h-5 w-5" />
                      SUBSTANCE USE PACKAGE
                      <Badge className="bg-amber-100 text-amber-800">90-day</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 text-red-800">Continue Stay If Present:</h4>
                        <div className="space-y-2">
                          {[
                            "Early recovery (<90 days sobriety)",
                            "Recent relapse requiring treatment adjustment",
                            "High relapse risk factors present",
                            "MAT regimen not yet stabilized",
                            "Recovery support network still forming",
                            "Co-occurring mental health actively treated",
                            "Treatment engagement inconsistent"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 text-green-800">Consider Step-Down When:</h4>
                        <div className="space-y-2">
                          {[
                            "Extended sobriety (90+ days)",
                            "Stable recovery with identified supports",
                            "MAT compliance consistent (if applicable)",
                            "Demonstrated coping in stressful situations",
                            "Co-occurring conditions stabilized"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* TFFC */}
                <Card className={selectedPackage === "tffc" ? "ring-2 ring-rose-500" : ""}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-rose-800">
                      <Heart className="h-5 w-5" />
                      TREATMENT FOSTER CARE
                      <Badge className="bg-rose-100 text-rose-800">60-day</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 text-red-800">Continue Stay If Present:</h4>
                        <div className="space-y-2">
                          {[
                            "Ongoing crises requiring intensive support",
                            "Requires intensive behavioral intervention",
                            "Active psychiatric symptoms",
                            "Medication adjustments in progress",
                            "Still responding to intensive treatment",
                            "Weekly therapy still necessary"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-3 text-green-800">Supports Step-Down When:</h4>
                        <div className="space-y-2">
                          {[
                            "Significant crisis reduction from admission",
                            "Stable, manageable behaviors",
                            "Psychiatric symptoms controlled",
                            "Treatment goals substantially met",
                            "Can maintain with less frequent therapy"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Alert className="border-rose-300 bg-rose-100">
                        <TrendingDown className="h-4 w-4 text-rose-600" />
                        <AlertDescription className="text-rose-700 text-sm">
                          <strong>TFFC Step-Down Urgency:</strong> 90+ days remaining = standard planning; 
                          60-89 days = accelerated; &lt;60 days = urgent
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Compliance Tracking */}
          <TabsContent value="compliance-tracking">
            <div className="space-y-6">
              {/* Review Cycle Summary */}
              <Card className="border-blue-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Review Cycle Summary by Package
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left">Requirement</th>
                          <th className="border border-gray-300 p-3 text-center">MH</th>
                          <th className="border border-gray-300 p-3 text-center">IDD</th>
                          <th className="border border-gray-300 p-3 text-center">SU</th>
                          <th className="border border-gray-300 p-3 text-center bg-rose-50">TFFC</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Review Cycle</td>
                          <td className="border border-gray-300 p-3 text-center">90-day</td>
                          <td className="border border-gray-300 p-3 text-center">90-day</td>
                          <td className="border border-gray-300 p-3 text-center">90-day</td>
                          <td className="border border-gray-300 p-3 text-center bg-rose-50 font-bold text-rose-700">60-day</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3 font-medium">Program Director signature</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center bg-rose-50">✓</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Treatment Director signature</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center bg-rose-50">✓</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3 font-medium">CANS 3.0 current</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center bg-rose-50">✓</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Submit within 15 business days</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center">✓</td>
                          <td className="border border-gray-300 p-3 text-center bg-rose-50">✓</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3 font-medium">RN Input Required</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center font-bold text-teal-700">✓</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center bg-rose-50">-</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Recovery Metrics</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center font-bold text-amber-700">✓</td>
                          <td className="border border-gray-300 p-3 text-center bg-rose-50">-</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3 font-medium">Step-Down Assessment</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center bg-rose-50 font-bold text-rose-700">✓</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3 font-medium">Crisis Pattern Analysis</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center bg-rose-50 font-bold text-rose-700">✓</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3 font-medium">Max Placement Tracking</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center">-</td>
                          <td className="border border-gray-300 p-3 text-center bg-rose-50 font-bold text-rose-700">✓ (365 days)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

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
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Cycle</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Review Due</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Review Date</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Signatures</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">DFPS Submission</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Days to Submit</th>
                          <th className="border border-gray-300 p-2 text-left text-sm font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-2 text-sm">Example Child A</td>
                          <td className="border border-gray-300 p-2 text-sm"><Badge className="bg-purple-100 text-purple-800">MH</Badge></td>
                          <td className="border border-gray-300 p-2 text-sm">90-day</td>
                          <td className="border border-gray-300 p-2 text-sm">3/15/25</td>
                          <td className="border border-gray-300 p-2 text-sm">3/15/25</td>
                          <td className="border border-gray-300 p-2 text-sm">✅ Both</td>
                          <td className="border border-gray-300 p-2 text-sm">3/25/25</td>
                          <td className="border border-gray-300 p-2 text-sm">10 days</td>
                          <td className="border border-gray-300 p-2 text-sm">
                            <Badge className="bg-green-100 text-green-800">✅ COMPLIANT</Badge>
                          </td>
                        </tr>
                        <tr className="bg-rose-50">
                          <td className="border border-gray-300 p-2 text-sm">Example Child B</td>
                          <td className="border border-gray-300 p-2 text-sm"><Badge className="bg-rose-100 text-rose-800">TFFC</Badge></td>
                          <td className="border border-gray-300 p-2 text-sm font-medium text-rose-700">60-day</td>
                          <td className="border border-gray-300 p-2 text-sm">3/20/25</td>
                          <td className="border border-gray-300 p-2 text-sm">3/18/25</td>
                          <td className="border border-gray-300 p-2 text-sm">✅ Both</td>
                          <td className="border border-gray-300 p-2 text-sm">3/28/25</td>
                          <td className="border border-gray-300 p-2 text-sm">8 days</td>
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
            <div className="space-y-6">
              {/* All Packages */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="h-5 w-5" />
                    All Packages - Common Mistakes to Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { mistake: "Missing the 15-business-day deadline", fix: "Set calendar reminders; use tracking system" },
                      { mistake: "Only one Director signature", fix: "BOTH Program Director AND Treatment Director must sign" },
                      { mistake: "Using generic clinical justification", fix: "Provide specific, measurable clinical indicators" },
                      { mistake: "Not attaching to Service Plan", fix: "Review must be incorporated into Service Plan" },
                      { mistake: "Forgetting to track business days vs. calendar days", fix: "Use business day calculator" },
                      { mistake: "Waiting until day 15 to submit", fix: "Target submission by day 10" },
                    ].map((item, i) => (
                      <div key={i} className="p-3 bg-red-50 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-red-600 font-bold">❌</span>
                          <span className="text-sm font-medium">{item.mistake}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">✅</span>
                          <span className="text-sm">{item.fix}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* TFFC-Specific Mistakes */}
                <Card className="border-rose-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-rose-800">
                      <Heart className="h-5 w-5" />
                      TFFC-Specific Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { mistake: "Using 90-day cycle instead of 60-day", fix: "TFFC requires MORE FREQUENT reviews (every 60 days)" },
                        { mistake: "Skipping step-down assessment", fix: "Step-down assessment is REQUIRED at every 60-day review" },
                        { mistake: "Not tracking days remaining", fix: "Monitor 365-day maximum; plan step-down early" },
                        { mistake: "Missing crisis pattern analysis", fix: "Crisis patterns must be analyzed at each review" },
                        { mistake: "Waiting until Day 300+ to plan step-down", fix: "Begin step-down discussions by Day 180" },
                      ].map((item, i) => (
                        <div key={i} className="p-3 bg-rose-50 rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="text-rose-600 font-bold">❌</span>
                            <span className="text-sm font-medium">{item.mistake}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✅</span>
                            <span className="text-sm">{item.fix}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Substance Use-Specific Mistakes */}
                <Card className="border-amber-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-800">
                      <Pill className="h-5 w-5" />
                      Substance Use-Specific Mistakes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { mistake: "Punitive language about relapse", fix: "Frame relapse as part of recovery, not failure" },
                        { mistake: "Not documenting recovery metrics", fix: "Recovery-specific indicators required" },
                        { mistake: "Ignoring MAT compliance", fix: "If youth on MAT, compliance must be documented" },
                        { mistake: "Not connecting to recovery supports", fix: "Document recovery community engagement" },
                      ].map((item, i) => (
                        <div key={i} className="p-3 bg-amber-50 rounded-lg">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="text-amber-600 font-bold">❌</span>
                            <span className="text-sm font-medium">{item.mistake}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✅</span>
                            <span className="text-sm">{item.fix}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* STASS Mistake */}
                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <XCircle className="h-5 w-5" />
                      STASS Mistake
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <span className="text-gray-600 font-bold">❌</span>
                        <span className="text-sm font-medium">Attempting continued stay review for STASS</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✅</span>
                        <span className="text-sm">STASS does NOT require continued stay reviews — use Assessment Completion forms instead</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Contacts */}
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Phone className="h-5 w-5" />
                      Quick Contacts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { topic: "Clinical indicators", contact: "Treatment Director" },
                        { topic: "Forms location", contact: "Aftercare Coordinator" },
                        { topic: "IMPACT submission", contact: "Case Manager Supervisor" },
                        { topic: "Compliance issues", contact: "QA Coordinator" },
                        { topic: "Extended stays", contact: "Program Director" },
                      ].map((item, i) => (
                        <div key={i} className="p-3 bg-blue-50 rounded-lg">
                          <p className="font-medium text-blue-800 mb-1">{item.topic}</p>
                          <p className="text-sm text-blue-700">→ {item.contact}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
            <div className="space-y-6">
              {/* Forms by Package */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Forms by Package
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left">Form</th>
                          <th className="border border-gray-300 p-3 text-center">Packages</th>
                          <th className="border border-gray-300 p-3 text-center">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 p-3">Enhanced Continued Stay Confirmation (90-Day)</td>
                          <td className="border border-gray-300 p-3 text-center">
                            <div className="flex flex-wrap gap-1 justify-center">
                              <Badge className="bg-purple-100 text-purple-800">MH</Badge>
                              <Badge className="bg-teal-100 text-teal-800">IDD</Badge>
                              <Badge className="bg-amber-100 text-amber-800">SU</Badge>
                            </div>
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <Link href="/forms/enhanced-continued-stay">
                              <Button size="sm" variant="outline" className="bg-transparent">Access Form</Button>
                            </Link>
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3">Enhanced Continued Stay Confirmation (60-Day)</td>
                          <td className="border border-gray-300 p-3 text-center">
                            <Badge className="bg-rose-100 text-rose-800">TFFC</Badge>
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <Link href="/forms/enhanced-continued-stay?type=tffc">
                              <Button size="sm" variant="outline" className="bg-transparent">Access Form</Button>
                            </Link>
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 p-3">Service Plan T3C Supplement (FC3-03)</td>
                          <td className="border border-gray-300 p-3 text-center">
                            <Badge variant="outline">All</Badge>
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <Button size="sm" variant="outline" className="bg-transparent">Access Form</Button>
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 p-3">STASS Assessment Completion</td>
                          <td className="border border-gray-300 p-3 text-center">
                            <Badge className="bg-gray-200 text-gray-800">STASS only</Badge>
                          </td>
                          <td className="border border-gray-300 p-3 text-center">
                            <Button size="sm" variant="outline" className="bg-transparent">Access Form</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Policies by Package */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Policies by Package
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 p-3 text-left">Policy</th>
                          <th className="border border-gray-300 p-3 text-center">Package</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { policy: "FC-CSR-01.1 Continued Stay Review Procedure", pkg: "All", color: "" },
                          { policy: "FC-MH-01 Mental & Behavioral Health Policy", pkg: "MH", color: "bg-purple-100 text-purple-800" },
                          { policy: "FC-IDD-01 IDD/Autism Policy", pkg: "IDD", color: "bg-teal-100 text-teal-800" },
                          { policy: "FC-SU-01 Substance Use Policy", pkg: "SU", color: "bg-amber-100 text-amber-800" },
                          { policy: "FC-STASS-01 Short-Term Assessment Policy", pkg: "STASS", color: "bg-gray-200 text-gray-800" },
                          { policy: "FC-TFFC-01 Treatment Foster Care Policy", pkg: "TFFC", color: "bg-rose-100 text-rose-800" },
                        ].map((item, i) => (
                          <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50"}>
                            <td className="border border-gray-300 p-3">{item.policy}</td>
                            <td className="border border-gray-300 p-3 text-center">
                              <Badge className={item.color || ""}>{item.pkg}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Quick Reference Cards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        90-Day Review Checklist (MH/IDD/SU)
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        60-Day Review Checklist (TFFC)
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Step-Down Assessment Guide (TFFC)
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Recovery Documentation Guide (SU)
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        STASS Timeline Reference
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

              <Card>
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
