"use client"

import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Clock,
  Users,
  ClipboardList,
  Heart,
  BookOpen,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PDFExportButton } from "@/components/pdf-export-button"

export default function ShortTermAssessmentTreatmentModel() {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50" ref={contentRef}>
      <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" className="gap-2 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
                Return to Dashboard
              </Button>
            </Link>
            <PDFExportButton
              formTitle="STASS Treatment Model"
              formPath="/forms/short-term-assessment-treatment-model"
              contentRef={contentRef}
              defaultPackage="STASS"
              showPackageFilter={false}
              className="border-white/30 text-gray-800"
            />
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="bg-white rounded-full p-3">
              <Image
                src="/images/refugehouse-logo.png"
                alt="Refuge House Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Treatment Model</h1>
              <p className="text-xl text-purple-100 italic">A home is in the heart of every child.</p>
              <Badge className="mt-2 bg-white/20 text-white border-white/30">
                T3C Short-Term Assessment Support Services
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="shadow-xl">
          <CardContent className="p-8 space-y-8">
            <Alert className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500">
              <BookOpen className="h-5 w-5 text-amber-700" />
              <AlertDescription className="ml-2">
                <h3 className="font-bold text-amber-900 mb-2 text-lg">📚 Foundational Treatment Model</h3>
                <p className="text-amber-800 mb-3">
                  Short-Term Assessment Support Services (STASS) utilizes the{" "}
                  <strong>same foundational TBRI® model</strong> as our T3C Basic Foster Family Home Support Services
                  package, with enhanced assessment coordination and time-limited focus.
                </p>
                <p className="text-amber-800 mb-4">
                  For comprehensive information about the core TBRI® principles, implementation strategies, education
                  plans, and foundational practices, please refer to:
                </p>
                <Link href="/forms/basic-tbri-resource-guide" target="_blank">
                  <Button className="bg-[#5E3989] hover:bg-[#4a2b6b] text-white shadow-md">
                    View Complete TBRI® Resource Guide (Basic Foster Family Home)
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <p className="text-amber-800 text-sm italic mt-4">
                  All staff and caregivers working with children in the STASS package must complete training in the
                  foundational TBRI® model plus specialized short-term assessment skills training (4 hours).
                </p>
              </AlertDescription>
            </Alert>

            <Alert className="mb-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500">
              <Clock className="h-5 w-5 text-yellow-700" />
              <AlertDescription className="ml-2">
                <h3 className="font-bold text-yellow-900 mb-2 text-lg">⏱️ Time-Limited Service Model</h3>
                <p className="text-yellow-800 mb-3">
                  <strong>
                    STASS is distinctly different from other T3C packages due to its short-term, assessment-focused
                    nature:
                  </strong>
                </p>
                <ul className="text-yellow-800 space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-yellow-600" />
                    <span>
                      <strong>Maximum 30 days</strong> for children age 5 and under
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-yellow-600" />
                    <span>
                      <strong>Maximum 45 days</strong> for children over age 5
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-yellow-600" />
                    <span>
                      <strong>One 15-day extension</strong> available if needed
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-yellow-600" />
                    <span>
                      <strong>Not eligible for Add-On Services</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-yellow-600" />
                    <span>
                      <strong>Up to 4 children</strong> may be in the home (unless sibling group requires more)
                    </span>
                  </li>
                </ul>
                <p className="text-yellow-800">
                  <strong>Purpose:</strong> Provide comprehensive assessment and evaluation to determine appropriate
                  long-term Service Package and placement, not long-term treatment.
                </p>
              </AlertDescription>
            </Alert>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-200">
                1. Treatment Model Framework and Structure
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Child Placing Agency implements Trust-Based Relational Intervention® (TBRI®) as documented in our
                T3C Basic Foster Family Home Support Services treatment model, adapted for the unique
                assessment-focused, time-limited nature of Short-Term Assessment Support Services.
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">STASS serves children who are:</p>
              <ul className="text-gray-700 space-y-2 mb-6 ml-6">
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    New to care or transitioning from unpaid placement, requiring assessment to understand service needs
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>Returning to foster care after unauthorized absence or placement</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>Transitioning after unplanned placement disruption</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    In need of comprehensive assessment and evaluation to identify appropriate Service Package and
                    placement
                  </span>
                </li>
              </ul>

              <Card className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-l-4 border-indigo-500">
                <CardHeader>
                  <CardTitle className="text-indigo-900 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    TBRI® in the Assessment Context
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 space-y-3">
                  <p>
                    While STASS placements are short-term, children still experience trauma responses to placement
                    changes and need the same trauma-informed, relational care provided in all our foster homes.{" "}
                    <Link
                      href="/forms/basic-tbri-resource-guide"
                      target="_blank"
                      className="text-indigo-700 underline font-semibold hover:text-indigo-900"
                    >
                      All core TBRI® principles
                    </Link>{" "}
                    remain fully applicable:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-indigo-600" />
                      <span>
                        <strong>Connecting Principles:</strong> Building trust and felt safety even in short-term
                        placement
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-indigo-600" />
                      <span>
                        <strong>Empowering Principles:</strong> Meeting physical and emotional needs through predictable
                        routines
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-indigo-600" />
                      <span>
                        <strong>Correcting Principles:</strong> Proactive teaching and IDEAL Response® during assessment
                        period
                      </span>
                    </li>
                  </ul>
                  <p className="italic text-gray-600 mt-4">
                    The difference is not in HOW we care for children, but in the PURPOSE of the placement:
                    stabilization and assessment rather than long-term treatment.
                  </p>
                </CardContent>
              </Card>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Assessment-Focused Enhancements</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                STASS adds the following specialized components to the TBRI® foundation:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-t-4 border-indigo-500 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-indigo-600" />
                      Comprehensive Assessment Coordination
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>CANS 3.0 within 21 days (ages 3-5) or 30 days (age 6+)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>Coordination of evaluations through STAR Health</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>Educational testing and planning</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>Behavioral observation and documentation</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>Medical and dental assessments</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>Early Childhood Intervention (if applicable)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-green-500 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      Enhanced Service Coordination
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>STAR Health assessment services coordination</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>HHSC Behavioral Health coordination</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>School enrollment and accommodations</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Transportation to multiple appointments</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Documentation for Service Planning team</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Transition planning to appropriate long-term placement</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Staffing Structure</h3>
              <div className="overflow-x-auto rounded-lg shadow-md mb-8">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#5E3989] to-[#764ba2]">
                      <th className="text-left p-4 text-white font-semibold">Position</th>
                      <th className="text-left p-4 text-white font-semibold">Ratio/Requirement</th>
                      <th className="text-left p-4 text-white font-semibold">STASS-Specific Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>Treatment Director</strong>
                      </td>
                      <td className="p-4">Required</td>
                      <td className="p-4 text-sm">Supervises Licensed Therapist; oversees assessment coordination</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>Licensed Therapist</strong>
                      </td>
                      <td className="p-4">1:12 ratio</td>
                      <td className="p-4 text-sm">
                        Oversees assessment coordination and service planning; evaluates child's needs
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>Case Manager</strong>
                      </td>
                      <td className="p-4">1:12 ratio</td>
                      <td className="p-4 text-sm">
                        Coordinates assessments; documents observations; develops transition plan
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>Crisis Management Staff</strong>
                      </td>
                      <td className="p-4">1:25 ratio</td>
                      <td className="p-4 text-sm">24/7 availability for assessment period stabilization</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>STASS Foster Parents</strong>
                      </td>
                      <td className="p-4">35-hour pre-service + 4-hour STASS training</td>
                      <td className="p-4 text-sm">
                        TBRI® implementation; observation/documentation; assessment coordination support
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Unknown History Considerations */}
              <Card className="border-2 border-[#5E3989]/30 mt-6">
                <CardHeader className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
                  <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Unknown History Considerations
                  </CardTitle>
                  <p className="text-center italic text-white/90 text-sm">
                    Critical for Short-Term Assessment population
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Children entering Short-Term Assessment often have limited or unknown histories, 
                    requiring specialized approaches for safety and accurate assessment.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Heightened Vigilance */}
                    <Card className="border-l-4 border-[#A90533]">
                      <CardHeader>
                        <CardTitle className="text-[#A90533] text-base">Heightened Vigilance</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-700 space-y-2">
                        <p>• Assume potential for undisclosed trauma</p>
                        <p>• Enhanced monitoring during initial 72 hours</p>
                        <p>• Document all behavioral observations</p>
                        <p>• Watch for medical conditions or triggers</p>
                      </CardContent>
                    </Card>
                    
                    {/* Expedited Safety Plan */}
                    <Card className="border-l-4 border-[#5E3989]">
                      <CardHeader>
                        <CardTitle className="text-[#5E3989] text-base">Expedited Safety Plan</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-700 space-y-2">
                        <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 p-2 rounded">
                          <strong>Within 72 hours:</strong>
                        </div>
                        <p>• Develop preliminary safety plan</p>
                        <p>• Update as patterns emerge</p>
                        <p>• Focus on immediate safety</p>
                        <p>• Gather assessment information</p>
                      </CardContent>
                    </Card>
                    
                    {/* TBRI Application */}
                    <Card className="border-l-4 border-[#A90533]">
                      <CardHeader>
                        <CardTitle className="text-[#A90533] text-base">TBRI® Application</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-700 space-y-2">
                        <p>• Prioritize felt safety and predictability</p>
                        <p>• Use proactive strategies to minimize escalation</p>
                        <p>• Allow authentic behavior observation</p>
                        <p>• Document patterns for Service Package recommendation</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-200">
                2. Assessment and Observation Within TBRI® Framework
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Foster parents and staff use TBRI® principles to create a stable, safe environment while simultaneously
                gathering critical assessment information:
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Observational Assessment</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Within the TBRI® framework, caregivers observe and document:
              </p>
              <ul className="text-gray-700 space-y-2 mb-6 ml-6">
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Attachment behaviors:</strong> How child responds to connection attempts (Connecting
                    Principles)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Regulation capacity:</strong> Child's ability to self-regulate and co-regulate (Empowering
                    Principles)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Behavioral responses:</strong> How child responds to structure, teaching, and correction
                    (Correcting Principles)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Trauma indicators:</strong> Observed trauma responses and triggers
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Developmental functioning:</strong> Age-appropriate skills and delays
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Social interaction:</strong> Peer and adult relationships
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Educational needs:</strong> Learning challenges and strengths
                  </span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Service Plan Development</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Service Plans are developed within 30 days and reviewed monthly, with focus on:
              </p>
              <ul className="text-gray-700 space-y-2 mb-6 ml-6">
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>Assessment completion goals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>Immediate stabilization needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>Information needed for appropriate Service Package determination</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>Transition planning to long-term placement</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-200">
                3. Trauma-Informed Approach During Assessment Period
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Children entering STASS placements often experience significant stress related to placement changes,
                previous trauma, or uncertainty about their future. Our TBRI® foundation ensures trauma-informed care
                during this vulnerable period.
              </p>

              <Alert className="mb-6 bg-blue-50 border-l-4 border-blue-500">
                <AlertCircle className="h-5 w-5 text-blue-700" />
                <AlertDescription className="ml-2 text-blue-800">
                  <strong>Note:</strong> All children and caregivers in the STASS package receive the foundational TBRI®
                  education outlined in the{" "}
                  <Link
                    href="/forms/basic-tbri-resource-guide"
                    target="_blank"
                    className="text-blue-900 underline font-semibold hover:text-blue-700"
                  >
                    Basic Foster Family Home TBRI® Resource Guide
                  </Link>
                  , plus 4 hours of specialized short-term assessment skills training.
                </AlertDescription>
              </Alert>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Stabilization Priority</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Before comprehensive assessment can occur, children need stabilization. TBRI® principles provide:
              </p>
              <ul className="text-gray-700 space-y-2 mb-6 ml-6">
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Immediate felt safety:</strong> Through consistent TBRI® Connecting strategies
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Predictable environment:</strong> Through TBRI® Empowering routines and structure
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Clear expectations:</strong> Through TBRI® Correcting teaching and life value terms
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>
                    <strong>Crisis support:</strong> Through IDEAL Response® and 24/7 availability
                  </span>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Family Engagement</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                STASS requires intensive family outreach and engagement:
              </p>
              <ul className="text-gray-700 space-y-2 mb-6 ml-6">
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>Identify and engage biological parents, relatives, and supportive persons</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>Include family in assessment process when safe and appropriate</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>Document family engagement efforts in Service Plan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#5E3989] mr-2">•</span>
                  <span>Share information with SSCC or DFPS caseworker for permanency planning</span>
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-200">
                4. Appropriateness of Treatment Model for STASS
              </h2>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why TBRI® Works for Short-Term Assessment</h3>
              <p className="text-gray-700 leading-relaxed mb-3">TBRI® is specifically appropriate for STASS because:</p>
              <ol className="text-gray-700 space-y-3 mb-8 ml-6 list-decimal">
                <li>
                  <strong>Immediate applicability:</strong> TBRI® strategies work from day one, providing stabilization
                  quickly
                </li>
                <li>
                  <strong>Observational value:</strong> Child's response to TBRI® principles provides assessment data
                </li>
                <li>
                  <strong>Trauma-informed:</strong> Recognizes assessment period itself can be traumatic
                </li>
                <li>
                  <strong>Continuity of care:</strong> If child transitions to another Refuge House placement, TBRI®
                  continues seamlessly
                </li>
                <li>
                  <strong>Universal application:</strong> Works regardless of child's ultimate Service Package
                  determination
                </li>
              </ol>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Assessment Timeline Compliance</h3>
              <div className="overflow-x-auto rounded-lg shadow-md mb-8">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#5E3989] to-[#764ba2]">
                      <th className="text-left p-4 text-white font-semibold">Requirement</th>
                      <th className="text-left p-4 text-white font-semibold">Timeline</th>
                      <th className="text-left p-4 text-white font-semibold">Our Implementation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">Comprehensive assessments coordinated</td>
                      <td className="p-4 text-sm">Within 21 days (ages ≤5) or 30 days (ages 6+)</td>
                      <td className="p-4 text-sm">
                        Licensed Therapist oversees; Case Manager coordinates all services
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">CANS 3.0 administration</td>
                      <td className="p-4 text-sm">Within 21 days (ages 3-5) or 30 days (ages 6+)</td>
                      <td className="p-4 text-sm">
                        Completed and used to inform Service Plan and next placement determination
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">Service Plan development</td>
                      <td className="p-4 text-sm">Initial within 30 days; reviewed monthly</td>
                      <td className="p-4 text-sm">TBRI®-informed plan focused on assessment goals and transition</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">Maximum length of service</td>
                      <td className="p-4 text-sm">30-45 days (age-dependent) + one 15-day extension</td>
                      <td className="p-4 text-sm">
                        Policy includes anticipated length; transition planning begins immediately
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500">
                <CardHeader>
                  <CardTitle className="text-green-900 text-2xl flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6" />
                    Expected STASS Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 space-y-6">
                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Assessment Completion:</h4>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>100% of children receive CANS 3.0 within required timeframe</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Comprehensive assessment data gathered through STAR Health coordination</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Educational needs identified and documented</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Behavioral observations documented using TBRI® framework</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Stabilization During Assessment:</h4>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Child experiences felt safety through TBRI® Connecting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Basic needs met through TBRI® Empowering</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Crisis incidents managed using IDEAL Response®</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Placement remains stable during assessment period</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-green-900 mb-2">Successful Transition:</h4>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Appropriate Service Package determination based on comprehensive assessment</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Smooth transition to long-term placement with complete assessment data</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Family engagement documented for permanency planning</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                        <span>Service coordination established for ongoing needs</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-8">
              <p className="text-gray-600 italic leading-relaxed mb-6">
                Through this TBRI®-based approach to Short-Term Assessment Support Services, we provide children with
                the trauma-informed, relational care they need during a vulnerable transition period while gathering
                comprehensive assessment data to inform appropriate long-term Service Package determination and
                placement decisions.
              </p>

              <Card className="bg-gray-50 border-2 border-gray-300">
                <CardHeader>
                  <CardTitle className="text-gray-800">Related Resources:</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/forms/basic-tbri-resource-guide"
                        target="_blank"
                        className="text-[#5E3989] hover:text-[#A90533] underline font-semibold flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Complete TBRI® Resource Guide (Basic Foster Family Home) - Foundational treatment model used in
                        STASS
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/forms/basic-logic-model"
                        target="_blank"
                        className="text-[#5E3989] hover:text-[#A90533] underline font-semibold flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Logic Model (Basic Foster Family Home) - Visual representation of TBRI® implementation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/forms/basic-cqi-model"
                        target="_blank"
                        className="text-[#5E3989] hover:text-[#A90533] underline font-semibold flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        CQI Model (Basic Foster Family Home) - Continuous quality improvement for TBRI® fidelity
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            TBRI® is a registered trademark of the Karyn Purvis Institute of Child Development at Texas Christian
            University
          </p>
          <p className="text-sm text-gray-600 italic">"A home is in the heart of every child."</p>
          <div className="mt-4 pt-4 border-t border-gray-200 max-w-md mx-auto">
            <p className="text-sm text-gray-500">
              <strong>Last Revised:</strong> December 10, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
