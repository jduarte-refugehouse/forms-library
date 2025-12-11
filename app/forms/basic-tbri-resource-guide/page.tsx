"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  Users,
  GraduationCap,
  Heart,
  Home,
  CheckCircle2,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Calendar,
  FileText,
  Award,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"

export default function BasicTBRIResourceGuide() {
  const [activeSection, setActiveSection] = useState("overview")
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({})

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header with Brand Colors */}
      <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 gap-2 text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>

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
              <h1 className="text-4xl font-bold mb-2">TBRI® Resource Guide</h1>
              <p className="text-xl text-purple-100 italic">A home is in the heart of every child.</p>
              <Badge className="mt-2 bg-white/20 text-white border-white/30">
                T3C Basic Foster Family Home Support Services
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className={`cursor-pointer transition-all hover:shadow-xl ${
              activeSection === "overview"
                ? "border-2 border-[#5E3989] bg-gradient-to-br from-[#5E3989] to-[#A90533] text-white"
                : "border-2 border-gray-200 hover:border-[#5E3989]"
            }`}
            onClick={() => setActiveSection("overview")}
          >
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-3 ${activeSection === "overview" ? "text-white" : "text-[#5E3989]"}`}
              >
                <BookOpen className="h-6 w-6" />
                TBRI® Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${activeSection === "overview" ? "text-white/90" : "text-gray-600"}`}>
                Learn about Trust-Based Relational Intervention principles and evidence-based recognition
              </p>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:shadow-xl ${
              activeSection === "treatment"
                ? "border-2 border-[#5E3989] bg-gradient-to-br from-[#5E3989] to-[#A90533] text-white"
                : "border-2 border-gray-200 hover:border-[#5E3989]"
            }`}
            onClick={() => setActiveSection("treatment")}
          >
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-3 ${activeSection === "treatment" ? "text-white" : "text-[#5E3989]"}`}
              >
                <Target className="h-6 w-6" />
                Treatment Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${activeSection === "treatment" ? "text-white/90" : "text-gray-600"}`}>
                Explore our TBRI®-based treatment framework and T3C compliance approach
              </p>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:shadow-xl ${
              activeSection === "education"
                ? "border-2 border-[#5E3989] bg-gradient-to-br from-[#5E3989] to-[#A90533] text-white"
                : "border-2 border-gray-200 hover:border-[#5E3989]"
            }`}
            onClick={() => setActiveSection("education")}
          >
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-3 ${activeSection === "education" ? "text-white" : "text-[#5E3989]"}`}
              >
                <GraduationCap className="h-6 w-6" />
                Education Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-sm ${activeSection === "education" ? "text-white/90" : "text-gray-600"}`}>
                Comprehensive timeline, materials, and methods for educating children about TBRI®
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="shadow-xl">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <CardContent className="p-8">
              {/* TBRI Overview Tab */}
              <TabsContent value="overview" className="space-y-8 mt-0">
                <div>
                  <h2 className="text-3xl font-bold text-[#5E3989] mb-4 flex items-center gap-3">
                    <Heart className="h-8 w-8 text-[#A90533]" />
                    Trust-Based Relational Intervention (TBRI®)
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    TBRI® is a comprehensive, trauma-informed approach designed to help vulnerable children and youth
                    heal through healthy relationships. It provides the evidence-based foundation for our T3C Basic
                    Foster Family Home Support Services.
                  </p>
                </div>

                <Card className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white border-0">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Award className="h-6 w-6" />
                      Evidence-Based Recognition & Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="font-semibold mb-2">California Evidence-Based Clearinghouse (CEBC) Rating</p>
                      <p className="text-sm text-white/90">
                        TBRI® Caregiver Training is officially rated as a <strong>"Promising Practice"</strong> by the
                        California Evidence-Based Clearinghouse for Child Welfare, based on rigorous scientific research
                        demonstrating improved outcomes for children who have experienced trauma, abuse, and neglect.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                        <p className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Title IV-E Recognition
                        </p>
                        <p className="text-sm text-white/90">
                          Recognized by the Title IV-E Prevention Services Clearinghouse for mental health prevention
                          and treatment effectiveness.
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                        <p className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" />
                          Eligible for California Programs
                        </p>
                        <p className="text-sm text-white/90">
                          CEBC listing makes TBRI® eligible for use in programs requiring evidence-based,
                          trauma-informed interventions.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="font-semibold mb-2">Ongoing Implementation Support</p>
                      <p className="text-sm text-white/90 mb-2">
                        The Karyn Purvis Institute of Child Development (KPICD) provides comprehensive support to
                        practitioners and organizations implementing TBRI®:
                      </p>
                      <ul className="text-sm text-white/90 space-y-1 ml-4">
                        <li>• Coaching and consultation services</li>
                        <li>• Site visits and teleconferencing support</li>
                        <li>• Fidelity monitoring through "Rate Your Understanding" assessments</li>
                        <li>• Pre/post training evaluations and six-month follow-up</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Three Core Principles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="border-2 border-[#5E3989]/20 hover:border-[#5E3989] transition-colors">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5E3989] to-[#A90533] rounded-full flex items-center justify-center mb-3">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-[#5E3989]">Connecting Principles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">Focus on building trust and meaningful relationships</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          <span>Maintaining eye contact and healthy touch</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          <span>Playful engagement and appropriate voice tone</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          <span>Therapeutic communication in daily interactions</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#5E3989]/20 hover:border-[#5E3989] transition-colors">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5E3989] to-[#A90533] rounded-full flex items-center justify-center mb-3">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-[#5E3989]">Empowering Principles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">Address physical and environmental needs for safety</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          <span>Hydration, nutrition, and blood sugar management</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          <span>Sensory accommodations and regulation support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          <span>Predictable routines and transitions</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#5E3989]/20 hover:border-[#5E3989] transition-colors">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-[#5E3989] to-[#A90533] rounded-full flex items-center justify-center mb-3">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-[#5E3989]">Correcting Principles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">Address behaviors and teach social competence</p>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          <span>Proactive and responsive behavioral strategies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          <span>Teaching rather than punishment approach</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          <span>IDEAL Response© framework</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Target Population */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-[#5E3989]/20">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989] flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Target Population
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-700">TBRI® is specifically designed for:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                        <span>Children who have experienced trauma, abuse, neglect, or toxic stress</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                        <span>Youth ages 0-17 in the child welfare system</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                        <span>Children with attachment difficulties</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                        <span>Any child who could benefit from a nurturing, trusting relationship</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Implementation Settings */}
                <div>
                  <h3 className="text-2xl font-bold text-[#5E3989] mb-4">Implementation Settings</h3>
                  <p className="text-gray-700 mb-4">TBRI® is utilized worldwide in various settings:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Homes & Residential", "Schools & Camps", "Clinical Practices", "Faith Communities"].map(
                      (setting) => (
                        <Card key={setting} className="text-center border-[#5E3989]/20">
                          <CardContent className="pt-6">
                            <Home className="h-8 w-8 text-[#A90533] mx-auto mb-2" />
                            <p className="text-sm font-medium text-gray-700">{setting}</p>
                          </CardContent>
                        </Card>
                      ),
                    )}
                  </div>
                </div>

                {/* Goals and Outcomes */}
                <Card className="border-2 border-[#A90533]/20">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989] flex items-center gap-2">
                      <Target className="h-6 w-6" />
                      Goals and Outcomes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">TBRI® aims to:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#5E3989] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Create Safe Environments</p>
                          <p className="text-sm text-gray-600">Physically, socially, and psychologically safe spaces</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#5E3989] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Build Secure Attachments</p>
                          <p className="text-sm text-gray-600">Strengthen bonds between caregivers and children</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#A90533] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Meet Complex Needs</p>
                          <p className="text-sm text-gray-600">Understand and address children's unique requirements</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#A90533] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Develop Trust</p>
                          <p className="text-sm text-gray-600">Support children's ability to trust caring adults</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Treatment Model Tab */}
              <TabsContent value="treatment" className="space-y-8 mt-0">
                <div>
                  <h2 className="text-3xl font-bold text-[#5E3989] mb-4">Treatment Model Framework</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Our TBRI®-based treatment model is fully compliant with Texas T3C Blueprint and Chapter 749
                    standards, providing comprehensive trauma-informed care within a family setting.
                  </p>
                </div>

                <Card className="border-2 border-[#5E3989]/30 bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989] flex items-center gap-2">
                      <Award className="h-6 w-6" />
                      Evidence Base and Research Foundation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 font-semibold">
                      TBRI® is recognized as an evidence-informed practice with substantial research support:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border-l-4 border-[#5E3989]">
                        <p className="font-semibold text-[#5E3989] mb-2">California CEBC Rating</p>
                        <p className="text-sm text-gray-700">
                          Rated as "Promising Practice" based on scientific research showing improved outcomes for
                          children with trauma histories
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-[#A90533]">
                        <p className="font-semibold text-[#A90533] mb-2">Karyn Purvis Institute</p>
                        <p className="text-sm text-gray-700">
                          Ongoing research and published studies continue to reinforce TBRI®'s effectiveness through
                          independent and institutional research
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-[#5E3989]">
                        <p className="font-semibold text-[#5E3989] mb-2">Fidelity Measures</p>
                        <p className="text-sm text-gray-700">
                          "Rate Your Understanding" assessments ensure consistent and effective delivery of the
                          intervention across all implementations
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border-l-4 border-[#A90533]">
                        <p className="font-semibold text-[#A90533] mb-2">Child Welfare Relevance</p>
                        <p className="text-sm text-gray-700">
                          Specifically designed for supporting children, youth, and families with complex trauma
                          histories in child welfare settings
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="font-semibold text-gray-800 mb-2">Implementation Support & Quality Assurance</p>
                      <p className="text-sm text-gray-700 mb-3">
                        The Karyn Purvis Institute of Child Development provides comprehensive support to ensure
                        successful TBRI® implementation:
                      </p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-0.5 flex-shrink-0" />
                          <span>Coaching model for leadership and change agents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-0.5 flex-shrink-0" />
                          <span>Site visits and teleconferencing support</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-0.5 flex-shrink-0" />
                          <span>Pre/post Practitioner Training evaluations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-0.5 flex-shrink-0" />
                          <span>Six-month follow-up to measure effectiveness</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Core Components */}
                <div className="space-y-6">
                  <Card className="border-l-4 border-[#5E3989]">
                    <CardHeader>
                      <CardTitle className="text-[#5E3989]">1. Trauma-Informed Foundation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Connecting Principles - Therapeutic Engagement:
                        </h4>
                        <ul className="space-y-2 ml-4">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-1 flex-shrink-0" />
                            <span className="text-gray-700">
                              Therapeutic communication techniques integrated into daily interactions
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-1 flex-shrink-0" />
                            <span className="text-gray-700">Age-appropriate relationship building strategies</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-1 flex-shrink-0" />
                            <span className="text-gray-700">Daily check-ins using validated tools</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Empowering Principles - Clinical Support:</h4>
                        <ul className="space-y-2 ml-4">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-1 flex-shrink-0" />
                            <span className="text-gray-700">Sensory accommodations based on individual needs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-1 flex-shrink-0" />
                            <span className="text-gray-700">
                              Crisis prevention planning with individualized strategies
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-1 flex-shrink-0" />
                            <span className="text-gray-700">
                              Regular health monitoring and STAR Health coordination
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Correcting Principles - Behavioral Interventions:
                        </h4>
                        <ul className="space-y-2 ml-4">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-1 flex-shrink-0" />
                            <span className="text-gray-700">
                              Positive Behavioral Interventions and Supports (PBIS) framework
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-1 flex-shrink-0" />
                            <span className="text-gray-700">Individualized behavior support plans</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-1 flex-shrink-0" />
                            <span className="text-gray-700">Natural consequences with therapeutic support</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-[#A90533]">
                    <CardHeader>
                      <CardTitle className="text-[#5E3989]">2. Service Integration</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-[#A90533] mb-3 flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          Staffing Structure
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-2">Full-time Licensed CPA Administrator</p>
                            <p className="text-sm text-gray-600">Oversees all agency operations and compliance</p>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-2">Program Director</p>
                            <p className="text-sm text-gray-600">Bachelor's degree or 5+ years experience</p>
                          </div>
                          <div className="bg-pink-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-2">Case Managers</p>
                            <p className="text-sm text-gray-600">1:20 ratio per T3C requirements</p>
                          </div>
                          <div className="bg-pink-50 p-4 rounded-lg">
                            <p className="font-semibold text-gray-800 mb-2">24/7 Intake/Placement Personnel</p>
                            <p className="text-sm text-gray-600">Dedicated staff available around the clock</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#A90533] mb-3 flex items-center gap-2">
                          <Heart className="h-5 w-5" />
                          Program Elements
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              Evidence-informed Treatment Model incorporating trauma-informed care
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              TBRI®-based approach with Connecting, Empowering, and Correcting Principles
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              IT system for data collection, quality assurance, and outcome tracking
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              Service planning process with six-month review intervals
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">
                              Comprehensive training for staff and caregivers on TBRI® principles
                            </span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-[#5E3989]">
                    <CardHeader>
                      <CardTitle className="text-[#5E3989]">3. Meeting Well-being Needs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-[#A90533] mb-3 flex items-center gap-2">
                            <Heart className="h-5 w-5" />
                            Physical Well-being
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Comprehensive health assessments</li>
                            <li>• Sleep hygiene programs</li>
                            <li>• Physical activity as intervention</li>
                            <li>• STAR Health coordination</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#A90533] mb-3 flex items-center gap-2">
                            <Heart className="h-5 w-5" />
                            Emotional Well-being
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Daily mood monitoring</li>
                            <li>• Emotion regulation skill training</li>
                            <li>• Trauma-informed interventions</li>
                            <li>• Therapeutic outlets</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#A90533] mb-3 flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Social Well-being
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Social skills training</li>
                            <li>• Supported peer interactions</li>
                            <li>• Family therapy and education</li>
                            <li>• Community integration</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#A90533] mb-3 flex items-center gap-2">
                            <Home className="h-5 w-5" />
                            Spiritual Well-being
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• Values development</li>
                            <li>• Cultural identity support</li>
                            <li>• Faith community inclusion</li>
                            <li>• Meaning-making opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-[#A90533]">
                    <CardHeader>
                      <CardTitle className="text-[#5E3989]">4. T3C Service Package Alignment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
                              <th className="border border-gray-300 p-3 text-left">T3C Requirement</th>
                              <th className="border border-gray-300 p-3 text-left">Our TBRI® Approach</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-purple-50">
                              <td className="border border-gray-300 p-3 font-semibold">Trauma-informed foster home</td>
                              <td className="border border-gray-300 p-3">
                                TBRI® principles integrated into daily caregiving
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-semibold">Evidence-informed treatment</td>
                              <td className="border border-gray-300 p-3">TBRI® recognized by Karyn Purvis Institute</td>
                            </tr>
                            <tr className="bg-purple-50">
                              <td className="border border-gray-300 p-3 font-semibold">
                                Service planning every 6 months
                              </td>
                              <td className="border border-gray-300 p-3">CANS-informed reviews with clinical team</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-3 font-semibold">STAR Health coordination</td>
                              <td className="border border-gray-300 p-3">Dedicated staff for service navigation</td>
                            </tr>
                            <tr className="bg-purple-50">
                              <td className="border border-gray-300 p-3 font-semibold">Case management (1:20 ratio)</td>
                              <td className="border border-gray-300 p-3">Trained case managers with TBRI® expertise</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-[#5E3989]">
                    <CardHeader>
                      <CardTitle className="text-[#5E3989]">5. Evidence-Based Practice</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">
                        The integration of TBRI® with clinical interventions is supported by substantial evidence.
                        Studies demonstrate superior outcomes including:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-[#5E3989] mb-2" />
                          <p className="font-semibold text-gray-800">Improved Functioning</p>
                          <p className="text-sm text-gray-600">Enhanced school performance and behavioral stability</p>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <CheckCircle2 className="h-6 w-6 text-[#A90533] mb-2" />
                          <p className="font-semibold text-gray-800">Placement Stability</p>
                          <p className="text-sm text-gray-600">Reduced disruptions and successful transitions</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-[#5E3989]/20">
                        <p className="font-semibold text-[#5E3989] mb-2">Research Support & Validation</p>
                        <p className="text-sm text-gray-700 mb-2">
                          TBRI® is recognized by multiple evidence-based clearinghouses and continues to demonstrate
                          effectiveness through ongoing research:
                        </p>
                        <ul className="text-sm text-gray-700 space-y-1 ml-4">
                          <li>
                            • California Evidence-Based Clearinghouse for Child Welfare (CEBC) - "Promising Practice"
                            rating
                          </li>
                          <li>• Title IV-E Prevention Services Clearinghouse recognition</li>
                          <li>• Published research from Karyn Purvis Institute and independent studies</li>
                          <li>• Ongoing evaluations measuring effectiveness and reach</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-[#A90533]">
                    <CardHeader>
                      <CardTitle className="text-[#5E3989] flex items-center gap-2">
                        <TrendingUp className="h-6 w-6" />
                        Expected Outcomes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-[#A90533] mb-3 flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Short-Term (3-6 months)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#5E3989] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Reduced crisis incidents</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#5E3989] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Improved therapy engagement</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#5E3989] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Enhanced physiological regulation</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#5E3989] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">School stabilization</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#5E3989] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Increased trust in caregivers</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#5E3989] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Decreased fear-based behaviors</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#A90533] mb-3 flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Long-Term (12-18 months)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Placement stability achieved</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Reduced trauma symptoms</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Healthy attachment patterns developed</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Progress toward permanency goals</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Enhanced capacity for healthy relationships</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">Increased resilience and adaptive coping</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-[#5E3989]/20">
                    <CardHeader>
                      <CardTitle className="text-[#5E3989] flex items-center gap-2">
                        <Settings className="h-6 w-6" />
                        Quality Monitoring & CQI
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">
                        Our Continuous Quality Improvement process ensures effective service delivery through:
                      </p>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-[#A90533] mb-2">1. Data Collection</h4>
                          <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">
                                Child outcomes tracked at individual and program levels
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Foster home-level outcome analysis</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">CANS 3.0 data utilization annually</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[#A90533] mb-2">2. Program Review</h4>
                          <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Service Plan reviews every six months</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">
                                Program Director assessment of continued stay criteria
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">TBRI® fidelity monitoring</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-[#A90533] mb-2">3. Implementation Adjustments</h4>
                          <ul className="space-y-2 ml-4">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">
                                Service delivery refinement based on outcome data
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Staff and caregiver training enhancement</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-1 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Resource allocation optimization</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Education Plan Tab */}
              <TabsContent value="education" className="space-y-8 mt-0">
                <div>
                  <h2 className="text-3xl font-bold text-[#5E3989] mb-4">TBRI® Education Plan</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Comprehensive plan for educating children and youth about TBRI®, including timeline, materials, and
                    methods to ensure understanding.
                  </p>
                </div>

                <Card className="border-2 border-[#5E3989]/20">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989] flex items-center gap-2">
                      <GraduationCap className="h-6 w-6" />
                      Implementation Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Phase 1 with detailed breakdown */}
                      <Collapsible open={openSections.phase1} onOpenChange={() => toggleSection("phase1")}>
                        <div className="border-l-4 border-[#5E3989] pl-4">
                          <CollapsibleTrigger className="flex items-center justify-between w-full">
                            <h4 className="font-bold text-gray-800 mb-2">Phase 1: Initial Placement (Days 1-7)</h4>
                            {openSections.phase1 ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-4 space-y-4">
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">Day 1:</p>
                              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                <li>• Foster parent reviews First Week Roadmap</li>
                                <li>• Introduce basic TBRI® concepts using Quick-Start Scripts</li>
                                <li>• Begin first Felt Safety activity</li>
                                <li>• Establish basic visual schedule for predictability</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">Days 2-3:</p>
                              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                <li>• Continue Felt Safety activities</li>
                                <li>• Complete setting up Visual Schedules</li>
                                <li>• Begin using basic Regulation Techniques</li>
                                <li>• Start First Week Observation Journal</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">Days 4-5:</p>
                              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                <li>• Introduce more advanced Felt Safety activities</li>
                                <li>• Practice basic regulation strategies</li>
                                <li>• Continue Observation Journal entries</li>
                                <li>• Begin using Connection Before Correction approach</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">Days 6-7:</p>
                              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                <li>• Review first week progress</li>
                                <li>• Complete all sections of Observation Journal</li>
                                <li>• Prepare summary for case manager</li>
                                <li>• Celebrate successful completion of first week</li>
                              </ul>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>

                      {/* Phase 2 with details */}
                      <Collapsible open={openSections.phase2} onOpenChange={() => toggleSection("phase2")}>
                        <div className="border-l-4 border-[#A90533] pl-4">
                          <CollapsibleTrigger className="flex items-center justify-between w-full">
                            <h4 className="font-bold text-gray-800 mb-2">Phase 2: Case Manager First Visit (Week 2)</h4>
                            {openSections.phase2 ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-4 space-y-4">
                            <div className="bg-pink-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#A90533] mb-2">Before Visit Preparation:</p>
                              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                <li>• Case manager reviews First Week Observation Journal</li>
                                <li>• Selects appropriate TBRI® Check-In questions</li>
                                <li>• Prepares age-appropriate child materials</li>
                                <li>• Sets up Connection Building Game</li>
                              </ul>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#A90533] mb-2">During Visit:</p>
                              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                <li>• Conduct TBRI® Check-In conversation</li>
                                <li>• Engage child with Building Bridges connection game</li>
                                <li>• Introduce Visual Progress Chart</li>
                                <li>• Provide age-appropriate materials (picture book, journal, or brain guide)</li>
                                <li>• Complete TBRI® Child Feedback Form</li>
                              </ul>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#A90533] mb-2">After Visit:</p>
                              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                <li>• Document observations and insights</li>
                                <li>• Provide feedback to foster parents</li>
                                <li>• Set goals for next visit</li>
                                <li>• Add initial milestone to Visual Progress Chart</li>
                              </ul>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>

                      {/* Phase 3 */}
                      <Collapsible open={openSections.phase3} onOpenChange={() => toggleSection("phase3")}>
                        <div className="border-l-4 border-[#5E3989] pl-4">
                          <CollapsibleTrigger className="flex items-center justify-between w-full">
                            <h4 className="font-bold text-gray-800 mb-2">
                              Phase 3: Ongoing Implementation (Weeks 3-12)
                            </h4>
                            {openSections.phase3 ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="mt-4 space-y-4">
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">Weeks 3-4: Foundation Building</p>
                              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                <li>• Foster parents continue implementing TBRI® principles with increasing depth</li>
                                <li>• Child begins using age-appropriate materials with support</li>
                                <li>• Introduction of Feelings Thermometer for daily check-ins</li>
                                <li>• Basic Voice and Choice Cards implemented</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">Weeks 5-8: Skill Development</p>
                              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                <li>• More advanced TBRI® concepts introduced</li>
                                <li>• Regular additions to TBRI® and Me Booklet</li>
                                <li>• Expanded use of Voice and Choice Cards</li>
                                <li>• Child begins identifying own regulation strategies</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">Weeks 9-12: Integration</p>
                              <ul className="space-y-1 text-sm text-gray-700 ml-4">
                                <li>• TBRI® language becomes part of daily interactions</li>
                                <li>• Child demonstrates understanding through application</li>
                                <li>• Preparation for first service plan review</li>
                                <li>• Documentation of progress in Visual Progress Chart</li>
                              </ul>
                            </div>
                          </CollapsibleContent>
                        </div>
                      </Collapsible>

                      {/* Phase 4 */}
                      <div className="border-l-4 border-[#A90533] pl-4">
                        <h4 className="font-bold text-gray-800 mb-2">Phase 4: Service Plan Reviews (Quarterly)</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Review completed materials and progress</li>
                          <li>• Update Visual Progress Chart</li>
                          <li>• Share child's TBRI® journey documentation</li>
                          <li>• Set new TBRI® education goals for next review period</li>
                          <li>• Celebrate progress with meaningful recognition</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="text-2xl font-bold text-[#5E3989] mb-4">Detailed Materials Inventory</h3>
                  <div className="space-y-6">
                    {/* Initial Placement Materials - Expanded */}
                    <Collapsible open={openSections.materials1} onOpenChange={() => toggleSection("materials1")}>
                      <Card className="border-l-4 border-[#5E3989]">
                        <CardHeader>
                          <CollapsibleTrigger className="flex items-center justify-between w-full">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Initial Placement Materials for Foster Parents
                            </CardTitle>
                            {openSections.materials1 ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                          <CardContent className="space-y-4">
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">1. TBRI® First Week Roadmap</p>
                              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>• Day-by-day guide for introducing TBRI® principles</li>
                                <li>• Practical strategies for establishing felt safety</li>
                                <li>• Guidance for observing and responding to child's needs</li>
                                <li>• Daily implementation of connecting, empowering, and correcting principles</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">2. Quick-Start TBRI® Scripts</p>
                              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>• Age-appropriate language to explain TBRI® concepts</li>
                                <li>• Tailored scripts for young children, school-age children, and teens</li>
                                <li>• Responses to common questions children in care may ask</li>
                                <li>• Key TBRI® phrases for daily use</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">3. Felt Safety Activity Cards</p>
                              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>• 7 structured activities to build felt safety and connection</li>
                                <li>• Clear instructions with age adaptations</li>
                                <li>• Materials lists and implementation guidance</li>
                                <li>• TBRI® connections for each activity</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">4. Visual Schedule Templates</p>
                              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>• Customizable routines incorporating TBRI® principles</li>
                                <li>• Templates for morning, evening, after-school, and weekend routines</li>
                                <li>• First day of placement schedule</li>
                                <li>• Visual guides for transitions</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">5. Regulation Techniques Handout</p>
                              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>• Age-appropriate calming strategies with instructions</li>
                                <li>• Techniques organized by developmental stage</li>
                                <li>• Physiological, sensory, and relational regulation strategies</li>
                                <li>• Creating a regulation-friendly home environment</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">
                                6. Connection Before Correction Reference Card
                              </p>
                              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>• Pocket guide for responding to behaviors using TBRI® principles</li>
                                <li>• 3-step response framework (Connect, Empower, Correct)</li>
                                <li>• Specific responses for common challenging behaviors</li>
                                <li>• Self-check questions and cycle of restoration</li>
                              </ul>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#5E3989] mb-2">7. First Week Observation Journal</p>
                              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>• Template to note children's responses to TBRI® approaches</li>
                                <li>• Daily observation categories for first 7 days</li>
                                <li>• Structured format for documenting patterns and preferences</li>
                                <li>• Summary section for case manager communication</li>
                              </ul>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* Age-Appropriate Materials - Expanded */}
                    <Collapsible open={openSections.materials2} onOpenChange={() => toggleSection("materials2")}>
                      <Card className="border-l-4 border-[#A90533]">
                        <CardHeader>
                          <CollapsibleTrigger className="flex items-center justify-between w-full">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <BookOpen className="h-5 w-5" />
                              Age-Appropriate Child Materials
                            </CardTitle>
                            {openSections.materials2 ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </CollapsibleTrigger>
                        </CardHeader>
                        <CollapsibleContent>
                          <CardContent className="space-y-4">
                            <div className="bg-pink-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#A90533] mb-2">Ages 3-8: "My New Home" Picture Book</p>
                              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>• Introduces TBRI® concepts through animal characters</li>
                                <li>• Story of Ollie Rabbit moving to the Badger family</li>
                                <li>• Concrete examples of felt safety, connection, and regulation</li>
                                <li>• Caregiver guide for discussion questions</li>
                              </ul>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#A90533] mb-2">
                                Ages 9-12: "Your Feelings Matter" Journal
                              </p>
                              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>• Guided prompts and regulation exercises</li>
                                <li>• Interactive activities for emotional awareness</li>
                                <li>• TBRI®-based strategies in child-friendly language</li>
                                <li>• Self-directed exploration of feelings and needs</li>
                              </ul>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-lg">
                              <p className="font-semibold text-[#A90533] mb-2">
                                Ages 13+: "Understanding Your Brain" Guide
                              </p>
                              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                <li>• Teen-friendly explanation of trauma and healing</li>
                                <li>• Neuroscience of trauma in accessible language</li>
                                <li>• Practical regulation strategies based on brain science</li>
                                <li>• Empowering approach to recovery and growth</li>
                              </ul>
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    {/* Case Manager and Service Plan Materials */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border-l-4 border-[#5E3989]">
                        <CardHeader>
                          <CardTitle className="text-lg">Case Manager Visit Materials</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• TBRI® Check-In Guide</li>
                            <li>• Building Bridges Connection Game</li>
                            <li>• Visual Progress Chart</li>
                            <li>• TBRI® Child Feedback Form</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-l-4 border-[#A90533]">
                        <CardHeader>
                          <CardTitle className="text-lg">Service Plan Review Materials</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 text-sm text-gray-700">
                            <li>• TBRI® and Me Personalized Booklet</li>
                            <li>• Feelings Thermometer Magnet</li>
                            <li>• Voice and Choice Cards</li>
                            <li>• Progress tracking tools</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Methods to Ensure Understanding */}
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-[#5E3989]/20">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989]">Methods to Ensure Education/Awareness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-[#A90533] mb-3">Direct Instruction</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Explicit teaching with visual aids</li>
                          <li>• Modeling by caregivers</li>
                          <li>• Structured learning activities</li>
                          <li>• Regular check-ins and discussions</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#A90533] mb-3">Experiential Learning</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Daily implementation in routines</li>
                          <li>• Interactive games and activities</li>
                          <li>• Relationship-based learning</li>
                          <li>• Practice through real situations</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#A90533] mb-3">Self-Directed Learning</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Personalized materials</li>
                          <li>• Ownership of process</li>
                          <li>• Integration into identity</li>
                          <li>• Creative expression</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Assessment of Understanding */}
                <Card className="border-2 border-[#A90533]/20">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989]">Assessment of Understanding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Observable Indicators:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Child uses TBRI® terminology appropriately</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Increased use of regulation strategies</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Improved ability to express needs</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#A90533] mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Enhanced emotional vocabulary</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Formal Assessment Methods:</h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li>• Completion of age-appropriate workbooks and journals</li>
                          <li>• Regular documentation reviews and progress tracking</li>
                          <li>• Structured feedback forms and comprehension checks</li>
                          <li>• Foster parent monitoring and professional assessment</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#5E3989]/20">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989] flex items-center gap-2">
                      <Settings className="h-6 w-6" />
                      Adaptations for Special Circumstances
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#A90533] mb-3">Developmental Considerations</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Cognitive Disabilities</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Simplified language and concepts</li>
                            <li>• More concrete examples</li>
                            <li>• Smaller steps with repetition</li>
                            <li>• Experiential learning focus</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Learning Differences</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Multiple modalities</li>
                            <li>• Reading/writing accommodations</li>
                            <li>• Strengths-based approach</li>
                            <li>• Adaptive materials</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Advanced Understanding</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Complex neurobiological concepts</li>
                            <li>• Deeper trauma exploration</li>
                            <li>• Leadership opportunities</li>
                            <li>• Advocacy connections</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#A90533] mb-3">Placement Circumstances</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Short-Term Placements</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Prioritize key TBRI® concepts</li>
                            <li>• Portable materials</li>
                            <li>• Focus on immediate needs</li>
                            <li>• Coordinate with next placement</li>
                          </ul>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Sibling Groups</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Group activities together</li>
                            <li>• Peer teaching opportunities</li>
                            <li>• Individual developmental needs</li>
                            <li>• Support sibling relationships</li>
                          </ul>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Placement Disruptions</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Maintain TBRI® during transitions</li>
                            <li>• Process disruption with TBRI®</li>
                            <li>• Transfer materials to new placement</li>
                            <li>• Communicate progress</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#A90533] mb-3">Cultural Considerations</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Cultural Responsiveness</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Culturally relevant examples and imagery</li>
                            <li>• Respect for cultural values</li>
                            <li>• Translation of materials when needed</li>
                            <li>• Acknowledgment of cultural strengths</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Language Differences</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Translation into primary language</li>
                            <li>• Bilingual support for concepts</li>
                            <li>• Visual supports to bridge gaps</li>
                            <li>• Respect for cultural expressions</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#A90533]/20">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989] flex items-center gap-2">
                      <Award className="h-6 w-6" />
                      Resources and Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-[#A90533] mb-3">Training Requirements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">For Foster Parents</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Basic TBRI® training before placement</li>
                            <li>• Review of all education materials</li>
                            <li>• Ongoing coaching in implementation</li>
                            <li>• Regular refresher training</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">For Case Managers</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• TBRI® practitioner certification</li>
                            <li>• Familiarity with all materials</li>
                            <li>• Skills in engaging children</li>
                            <li>• Regular supervision</li>
                          </ul>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">For Support Staff</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Basic TBRI® orientation</li>
                            <li>• Role-specific training</li>
                            <li>• Documentation requirements</li>
                            <li>• Coordination protocols</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-[#A90533] mb-3">Implementation Support</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Technical Assistance</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Access to TBRI® consultants</li>
                            <li>• Resource library</li>
                            <li>• Regular case consultations</li>
                            <li>• Problem-solving support</li>
                          </ul>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Material Resources</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Budget for education materials</li>
                            <li>• Regular review and updating</li>
                            <li>• Printing and laminating access</li>
                            <li>• Replacement of worn items</li>
                          </ul>
                        </div>
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <p className="font-semibold text-gray-800 mb-2">Community of Practice</p>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Foster parent support groups</li>
                            <li>• Peer mentoring</li>
                            <li>• Shared success stories</li>
                            <li>• Collaborative problem-solving</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            TBRI® is a registered trademark of the Karyn Purvis Institute of Child Development at Texas Christian
            University
          </p>
          <p className="text-sm text-gray-600 italic">"A home is in the heart of every child."</p>
        </div>
      </div>
    </div>
  )
}
