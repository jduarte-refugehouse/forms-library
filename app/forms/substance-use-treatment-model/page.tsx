"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Info, CheckCircle2, Heart, Users, AlertTriangle, BookOpen, FileText, Shield, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { PDFExportButton } from "@/components/pdf-export-button"

export default function SubstanceUseTreatmentModelPage() {
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
              formTitle="Substance Use Treatment Model"
              formPath="/forms/substance-use-treatment-model"
              contentRef={contentRef}
              defaultPackage="SU"
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
              <Badge className="mt-2 bg-white/20 text-white border-white/30">T3C Substance Use Support Services</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="shadow-xl">
          <CardContent className="p-8 space-y-8">
            {/* Foundational Reference Alert */}
            <Alert className="mb-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500">
              <BookOpen className="h-5 w-5 text-amber-700" />
              <AlertDescription className="ml-2">
                <h3 className="font-bold text-amber-900 mb-2 text-lg">📚 Foundational Treatment Model</h3>
                <p className="text-amber-800 mb-3">
                  Substance Use Support Services utilizes the{" "}
                  <strong>same foundational TBRI® model</strong> as our T3C Basic Foster Family Home Support Services
                  package, enhanced with recovery-oriented interventions for youth with substance use disorders.
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
                  All staff and caregivers working with children in the Substance Use package must complete training in the
                  foundational TBRI® model plus 4-hour substance abuse awareness training.
                </p>
              </AlertDescription>
            </Alert>

            {/* Treatment Focus Alert */}
            <Alert className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500">
              <Shield className="h-5 w-5 text-emerald-700" />
              <AlertDescription className="ml-2">
                <h3 className="font-bold text-emerald-900 mb-2 text-lg">🩺 Recovery-Oriented Service Model</h3>
                <p className="text-emerald-800 mb-3">
                  <strong>
                    Substance Use Support Services is distinctly designed for youth with DSM-5 substance-related and
                    addictive disorder diagnoses or documented problematic substance use:
                  </strong>
                </p>
                <ul className="text-emerald-800 space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-emerald-600" />
                    <span>
                      <strong>Non-punitive approach</strong> - treats addiction as disease, not moral failing
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-emerald-600" />
                    <span>
                      <strong>Relapse is treatment issue</strong> - requiring adjustment, not punishment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-emerald-600" />
                    <span>
                      <strong>Substance-free environment</strong> with secured medications
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-emerald-600" />
                    <span>
                      <strong>Drug screening as clinical tool</strong> - not punitive measure
                    </span>
                  </li>
                </ul>
                <p className="text-emerald-800">
                  <strong>Purpose:</strong> Provide trauma-informed, recovery-supportive care that addresses both substance
                  use and underlying trauma while building healthy relationships as protective factors.
                </p>
              </AlertDescription>
            </Alert>

            {/* Section 1: Treatment Model Framework */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-200">
                1. Treatment Model Framework and Structure
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Child Placing Agency implements <strong>Trust-Based Relational Intervention® (TBRI®)</strong> as our
                primary treatment model, <strong>enhanced with recovery-oriented interventions</strong> for providing the
                T3C Substance Use Support Services. TBRI provides the evidence-based, trauma-informed foundation while
                incorporating specialized recovery practices for children and youth with DSM-5 substance-related and
                addictive disorder diagnoses or documented problematic substance use requiring specialized monitoring and
                support.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The selection of TBRI enhanced with recovery-oriented approaches recognizes that substance use in foster
                youth is often rooted in trauma and attachment disruptions. Research consistently demonstrates that
                effective substance use treatment for adolescents must address underlying trauma while building healthy
                relationships as protective factors against continued use.
              </p>

              <Card className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border-l-4 border-indigo-500">
                  <CardHeader>
                  <CardTitle className="text-indigo-900 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    TBRI® in the Recovery Context
                  </CardTitle>
                  </CardHeader>
                <CardContent className="text-gray-700 space-y-3">
                  <p>
                    Youth with substance use disorders still experience trauma responses and need the same trauma-informed,
                    relational care provided in all our foster homes.{" "}
                    <Link
                      href="/forms/basic-tbri-resource-guide"
                      target="_blank"
                      className="text-indigo-700 underline font-semibold hover:text-indigo-900"
                    >
                      All core TBRI® principles
                    </Link>{" "}
                    remain fully applicable with recovery enhancements:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-indigo-600" />
                      <span>
                        <strong>Connecting Principles:</strong> Building trust and healthy relationships that model
                        substance-free connections
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-indigo-600" />
                      <span>
                        <strong>Empowering Principles:</strong> Addressing physiological needs complicated by substance use
                        including sleep, nutrition, and regulation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-indigo-600" />
                      <span>
                        <strong>Correcting Principles:</strong> Non-punitive recovery response with trigger identification
                        and coping skill development
                      </span>
                    </li>
                    </ul>
                  <p className="italic text-gray-600 mt-4">
                    The difference is in the additional recovery-specific enhancements layered onto the TBRI® foundation to
                    address substance use while healing relational trauma.
                  </p>
                  </CardContent>
                </Card>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Core TBRI® Principles with Recovery Enhancements</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                The enhanced TBRI framework maintains three interconnected principles adapted for children and youth with
                substance use disorders:
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="border-t-4 border-blue-500 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-blue-600" />
                      Connecting Principles
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Recovery-Supportive Relationships</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Therapeutic communication avoiding shame and judgment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Relationship building modeling healthy, substance-free connections</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Engagement approaches maintaining connection during relapse</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Daily check-ins monitoring emotional state and recovery progress</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span>Connection maintained through challenges without enabling</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-green-500 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      Empowering Principles
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Physical Regulation and Recovery Support</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Addressing physiological needs complicated by substance use</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Sleep regulation support for substance-related disruption</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Nutritional planning addressing substance-related deficits</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Sensory accommodations for post-acute withdrawal</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>MAT coordination when clinically appropriate</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Substance-free environment with secured medications</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-orange-500 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-orange-600" />
                      Correcting Principles
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">Non-Punitive Recovery Response</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-700 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Positive Behavioral Interventions and Supports (PBIS)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Relapse viewed as treatment issue, not punishment trigger</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Trigger identification and coping skill development</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Natural consequences with therapeutic support</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Drug screening as clinical tool, not punitive measure</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>Recovery-focused skill building at developmental level</span>
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
                      <th className="text-left p-4 text-white font-semibold">SU-Specific Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>Treatment Director</strong>
                      </td>
                      <td className="p-4">Required</td>
                      <td className="p-4 text-sm">Supervises Licensed Therapist; oversees recovery treatment coordination</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>Licensed Therapists</strong>
                      </td>
                      <td className="p-4">1:14 ratio</td>
                      <td className="p-4 text-sm">
                        Substance use treatment coordination; weekly individual therapy (minimum)
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>Behavior Support Specialists</strong>
                      </td>
                      <td className="p-4">1:15 ratio</td>
                      <td className="p-4 text-sm">
                        Behavioral interventions; trigger management; coping skill development
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>Case Managers</strong>
                      </td>
                      <td className="p-4">1:15 ratio</td>
                      <td className="p-4 text-sm">
                        Service coordination; STAR Health navigation; recovery resource connection
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>Crisis Management Staff</strong>
                      </td>
                      <td className="p-4">1:25 ratio</td>
                      <td className="p-4 text-sm">24/7 crisis response; relapse intervention support</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>Aftercare Case Manager</strong>
                      </td>
                      <td className="p-4">1:25 ratio</td>
                      <td className="p-4 text-sm">Post-discharge recovery support and monitoring</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <strong>SU Foster Parents</strong>
                      </td>
                      <td className="p-4">35-hour pre-service + 4-hour SU training</td>
                      <td className="p-4 text-sm">
                        TBRI® implementation; substance-free environment maintenance; recovery support
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Human Trafficking Risk */}
              <Card className="border-2 border-[#5E3989]/30 mt-6">
                <CardHeader className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
                  <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Human Trafficking Risk Considerations
                  </CardTitle>
                  <p className="text-center italic text-white/90 text-sm">
                    Critical for Substance Use population
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Youth with substance use disorders are at elevated risk for human trafficking. Our model incorporates
                    specialized protections and monitoring.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-l-4 border-[#A90533]">
                      <CardHeader>
                        <CardTitle className="text-[#A90533] text-base">Heightened Screening</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-700 space-y-2">
                        <p>• Universal trafficking screening at admission</p>
                        <p>• Regular reassessment during placement</p>
                        <p>• Recognition of trafficking-SU connection</p>
                        <p>• Documentation of risk indicators</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-l-4 border-[#5E3989]">
                      <CardHeader>
                        <CardTitle className="text-[#5E3989] text-base">Enhanced Protection</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-700 space-y-2">
                        <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 p-2 rounded">
                          <strong>Required Training:</strong>
                        </div>
                        <p>• Staff trafficking awareness training</p>
                        <p>• Foster parent trafficking recognition</p>
                        <p>• Safety planning protocols</p>
                        <p>• Response procedures</p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#A90533]">
                  <CardHeader>
                        <CardTitle className="text-[#A90533] text-base">Reporting & Response</CardTitle>
                  </CardHeader>
                      <CardContent className="text-sm text-gray-700 space-y-2">
                        <p>• Immediate reporting protocols</p>
                        <p>• Coordination with law enforcement</p>
                        <p>• Victim services coordination</p>
                        <p>• Trauma-informed response</p>
                  </CardContent>
                </Card>
              </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 2: Well-being Needs */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-200">
                2. Meeting Custom Physical, Emotional, Social, and Spiritual Well-being Needs
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our recovery-enhanced TBRI model addresses all domains of well-being with specialized attention to the
                unique challenges faced by youth with substance use disorders:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-pink-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Physical Well-being</CardTitle>
                    <p className="text-sm text-gray-600 italic mt-1">
                      Unique physical challenges requiring careful management
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Comprehensive health assessments including substance use history</li>
                      <li>Substance use assessment within 30 days of admission</li>
                      <li>Medication administration with attention to abuse potential</li>
                      <li>Medication-Assisted Treatment (MAT) coordination when appropriate</li>
                      <li>Sleep hygiene programs addressing substance-related disruption</li>
                      <li>Physical activity as therapeutic intervention and relapse prevention</li>
                      <li>Nutritional planning addressing substance-related deficits</li>
                      <li>STAR Health coordination for specialized services</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Emotional Well-being</CardTitle>
                    <p className="text-sm text-gray-600 italic mt-1">
                      Complex intersection of trauma, mental health, and substance use
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Daily mood monitoring with attention to triggers</li>
                      <li>Crisis safety planning including relapse prevention</li>
                      <li>Emotion regulation skill training</li>
                      <li>Trauma-informed interventions addressing root causes</li>
                      <li>Therapeutic outlets (journaling, arts, physical activity)</li>
                      <li>CANS assessment every 90 days</li>
                      <li>Coping skill development for managing triggers</li>
                      <li>Weekly individual therapy with SU-qualified provider (minimum)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Social Well-being</CardTitle>
                    <p className="text-sm text-gray-600 italic mt-1">
                      Structured recovery-supportive connections
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Evidence-based social skills training</li>
                      <li>Supported peer interactions in recovery-supportive environments</li>
                      <li>Family therapy addressing family system impacts of substance use</li>
                      <li>School collaboration with attention to academic impacts</li>
                      <li>Connection to age-appropriate recovery community resources</li>
                      <li>Healthy relationship modeling</li>
                      <li>Peer recovery support connections when appropriate</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Spiritual Well-being</CardTitle>
                    <p className="text-sm text-gray-600 italic mt-1">
                      Spiritual growth and meaning-making in recovery
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Values development supporting recovery identity</li>
                      <li>Cultural identity support and exploration</li>
                      <li>Inclusion in faith communities when desired</li>
                      <li>Meaning-making opportunities consistent with recovery</li>
                      <li>Hope and purpose cultivation</li>
                      <li>Connection to recovery community values</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 3: Evidence Base */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-200">
                3. Evidence and Data Informing Treatment Model Selection
              </h2>

              <Alert className="border-blue-600/30 bg-blue-50 mb-6">
                <Info className="h-5 w-5 text-blue-700" />
                <AlertDescription>
                  <strong className="text-blue-900">🏆 Evidence-Based Recognition</strong>
                  <br />
                  <br />
                  <strong className="text-blue-800">
                    California Evidence-Based Clearinghouse for Child Welfare (CEBC) Rating:
                  </strong>
                  <br />
                  TBRI® Caregiver Training is rated as a <strong>"Promising Practice"</strong> based on scientific
                  research showing improved outcomes for children who experienced trauma, abuse, and neglect.
                  <br />
                  <br />
                  <strong className="text-blue-800">Research Foundation:</strong>
                  <br />
                  The integration of TBRI with recovery-oriented interventions is supported by substantial evidence
                  demonstrating improved outcomes when trauma is addressed concurrently with substance use treatment.
                </AlertDescription>
              </Alert>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Research Findings</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li>Adolescent substance use treatment outcomes improve significantly when trauma is addressed concurrently</li>
                  <li>Family-based treatment models demonstrate superior outcomes for adolescent substance use</li>
                  <li>Non-punitive approaches to relapse reduce shame and increase treatment engagement</li>
                <li>Healthy relationships serve as primary protective factors against substance use in adolescents</li>
                <li>Medication-Assisted Treatment, when clinically appropriate, improves outcomes for opioid and alcohol use disorders</li>
                </ul>

              <Alert className="border-[#A90533]/30 bg-pink-50 mb-6">
                <AlertDescription>
                  <strong className="text-[#A90533]">Texas-Specific Outcomes:</strong> Children in programs using
                  integrated trauma-informed and recovery-oriented models experience higher rates of treatment
                  engagement, reduced relapse frequency, improved placement stability, better educational outcomes, and
                  higher rates of sustained recovery.
                </AlertDescription>
              </Alert>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Monitoring</h3>
              <p className="text-gray-700 mb-3">
                Our Continuous Quality Improvement process ensures effective recovery-oriented service delivery through:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>CANS assessments every 90 days with recovery progress tracking</li>
                <li>Regular review of recovery milestones and treatment engagement</li>
                <li>Substance use treatment coordination effectiveness monitoring</li>
                <li>Drug screening patterns reviewed as clinical indicators</li>
                <li>Relapse response protocol adherence tracking</li>
                <li>Post-discharge recovery stability monitoring (30/60/90 days)</li>
              </ul>
            </section>

            {/* Section 4: Trauma-Informed Approach */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-200">
                4. Trauma-Informed Approach for Children Who Have Experienced Abuse and Neglect
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Youth with substance use disorders have often experienced significant trauma. Our trauma-informed approach
                recognizes that substance use is frequently an attempt to cope with or self-medicate trauma symptoms.
              </p>

              <Alert className="mb-6 bg-amber-50 border-l-4 border-amber-500">
                <Info className="h-5 w-5 text-amber-700" />
                <AlertDescription className="ml-2 text-amber-800">
                  <strong>Note:</strong> All children and caregivers in the Substance Use package receive the foundational
                  TBRI® education outlined in the{" "}
                  <Link
                    href="/forms/basic-tbri-resource-guide"
                    target="_blank"
                    className="text-amber-900 underline font-semibold hover:text-amber-700"
                  >
                    Basic Foster Family Home TBRI® Resource Guide
                  </Link>
                  , plus 4-hour substance abuse awareness training including understanding addiction as disease and
                  recovery-supportive response strategies.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card className="border-l-4 border-[#5E3989]">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989]">Assessment Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• CANS 3.0 serves as primary assessment tool</li>
                      <li>• Comprehensive substance use assessment within 30 days</li>
                      <li>• Treatment planning addresses both trauma and substance use</li>
                      <li>• Recognition that SU may be self-medication for trauma</li>
                      <li>• Regular reassessment guiding treatment adjustments</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#A90533]">
                  <CardHeader>
                    <CardTitle className="text-[#A90533]">Caregiver Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• 4-hour substance abuse awareness training (minimum)</li>
                      <li>• Understanding addiction as disease</li>
                      <li>• Recognition of signs and relapse warning signs</li>
                      <li>• Non-punitive recovery-supportive response strategies</li>
                      <li>• 24/7 consultation availability</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#5E3989]">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989]">Clinical Interventions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Weekly individual therapy with SU-qualified provider</li>
                      <li>• Substance use treatment per clinical recommendation</li>
                      <li>• Family therapy addressing system impacts</li>
                      <li>• Connection to recovery community resources</li>
                      <li>• MAT coordination when appropriate</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 5: Appropriateness */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-3 border-b-2 border-purple-200">
                5. Appropriateness of the Treatment Model for T3C Substance Use Support Services
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Package Alignment</h3>
              <p className="text-gray-700 mb-4">
                Our enhanced TBRI model directly addresses each requirement specified in the T3C Substance Use Support
                Services package:
              </p>

              <div className="overflow-x-auto rounded-lg shadow-md mb-8">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#5E3989] to-[#764ba2]">
                      <th className="text-left p-4 text-white font-semibold">T3C Requirement</th>
                      <th className="text-left p-4 text-white font-semibold">Our Implementation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">Regular individual therapy</td>
                      <td className="p-4 text-sm">Weekly individual therapy with SU-qualified provider (minimum)</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">Substance use assessment</td>
                      <td className="p-4 text-sm">Comprehensive assessment within 30 days of admission</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">Service planning every 90 days</td>
                      <td className="p-4 text-sm">CANS-informed reviews with clinical team; recovery progress tracked</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">24/7 crisis response</td>
                      <td className="p-4 text-sm">On-call clinical staff with TBRI and SU training; relapse response protocols</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">Evidence-informed treatment</td>
                      <td className="p-4 text-sm">TBRI enhanced with recovery-oriented interventions</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">STAR Health coordination</td>
                      <td className="p-4 text-sm">Dedicated staff for service navigation and recovery support coordination</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">Drug screening protocols</td>
                      <td className="p-4 text-sm">Screening as clinical tool (non-punitive); results inform treatment</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-medium">Substance-free environment</td>
                      <td className="p-4 text-sm">Foster home requirements verified; medication security protocols</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Expected Outcomes */}
            <section className="mb-10">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500">
                <CardHeader>
                  <CardTitle className="text-green-900 text-2xl flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6" />
                Expected Outcomes
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
              <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-green-900 mb-2">Short-Term (3-6 months):</h4>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>Treatment engagement established</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>Reduced substance use frequency</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>Reduced crisis incidents</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>CANS score improvement</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>School stabilization</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>Coping skill development</span>
                        </li>
                    </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-green-900 mb-2">Long-Term (12-18 months):</h4>
                      <ul className="space-y-2 ml-4">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>Sustained recovery</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>Placement stability (85%+)</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>Reduced or eliminated substance use</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>Successful transition to Basic Services when appropriate</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>Community recovery connections maintained</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-green-600" />
                          <span>Family relationships improved</span>
                        </li>
                    </ul>
                    </div>
                  </div>
                  </CardContent>
                </Card>
            </section>

            {/* Closing Statement */}
            <section className="mb-8">
              <p className="text-gray-600 italic leading-relaxed mb-6">
                Through this TBRI®-based, recovery-enhanced approach to Substance Use Support Services, we provide youth
                with the trauma-informed, relational care they need while addressing substance use through non-punitive,
                recovery-oriented interventions. The integration ensures children and youth receive comprehensive
                substance use support while maintaining the relational foundation essential for lasting recovery.
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
                        Complete TBRI® Resource Guide (Basic Foster Family Home) - Foundational treatment model used in SU
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/forms/substance-use-logic-model"
                        target="_blank"
                        className="text-[#5E3989] hover:text-[#A90533] underline font-semibold flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Logic Model (Substance Use Support Services) - Theory of change and outcome framework
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/forms/substance-use-cqi-model"
                        target="_blank"
                        className="text-[#5E3989] hover:text-[#A90533] underline font-semibold flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        CQI Model (Substance Use Support Services) - Continuous quality improvement framework
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
