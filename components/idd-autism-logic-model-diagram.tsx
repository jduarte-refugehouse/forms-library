"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Heart, Users, Target, TrendingUp, Calendar } from "lucide-react"

export function IddAutismLogicModelDiagram() {
  return (
    <div className="space-y-8">
      {/* Package Note */}
      <Card className="border-2 border-[#5E3989]/30 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-[#5E3989] text-center">
            IDD/Autism Spectrum Disorder Support Services Package
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 leading-relaxed">
            This Logic Model is specifically for children with intellectual or developmental disabilities and autism
            spectrum disorders requiring specialized therapeutic and developmental support.
            <br />
            <strong>
              Incorporates T3C Basic Foster Family Home Support Services as foundational Tier 1 with enhanced
              developmental and medical components.
            </strong>
          </p>
        </CardContent>
      </Card>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-[#5E3989]">
          <CardHeader>
            <CardTitle className="text-[#5E3989] uppercase tracking-wide flex items-center gap-2">
              <Target className="h-5 w-5" />
              Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              To serve children with intellectual or developmental disabilities and autism spectrum disorders by
              providing specialized therapeutic support within stable family environments, promoting development,
              independence, and improved life skills through evidence-based interventions.
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-[#A90533]">
          <CardHeader>
            <CardTitle className="text-[#A90533] uppercase tracking-wide flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              To see children with IDD/Autism achieve maximum independence and quality of life through individualized
              supports, enabling successful integration into their communities and achievement of their fullest
              potential.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Objective */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-[#5E3989]/20">
        <CardHeader>
          <CardTitle className="text-[#5E3989]">IDD/Autism Support Service Objective</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            To provide trauma-informed therapeutic foster care for children with DSM-5 diagnoses or pending diagnoses of
            Intellectual or Developmental Disability and/or Autism Spectrum Disorder, delivering routine clinical
            intervention, structure, and therapeutic services to support daily activities while promoting development,
            independence, and permanency.
          </p>
        </CardContent>
      </Card>

      {/* Treatment Model */}
      <Card className="border-2 border-[#5E3989]/30">
        <CardHeader className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
          <CardTitle className="text-center text-white">
            Evidence-Informed Treatment Model: Trust-Based Relational Intervention® (TBRI®)
          </CardTitle>
          <p className="text-center italic text-white/90 text-sm">
            Enhanced with specific programming for IDD/Autism Spectrum Disorder needs (T3C Blueprint p.125)
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Connecting Principles */}
            <div>
              <h3 className="text-lg font-bold text-[#5E3989] mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Connecting Principles
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 italic">• Building felt safety through attunement</div>
                <div className="text-sm text-gray-600 italic">• Providing nurturing care</div>
                <div className="text-sm text-gray-600 italic">• Supporting healthy attachment</div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Modified communication approaches</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD Enhancement</Badge>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Structured social engagement</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD Enhancement</Badge>
                </div>
              </div>
            </div>

            {/* Empowering Principles */}
            <div>
              <h3 className="text-lg font-bold text-[#5E3989] mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Empowering Principles
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 italic">• Meeting physical needs</div>
                <div className="text-sm text-gray-600 italic">• Supporting self-regulation</div>
                <div className="text-sm text-gray-600 italic">• Establishing predictable routines</div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Visual supports & schedules</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD Enhancement</Badge>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Sensory accommodation strategies</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD Enhancement</Badge>
                </div>
              </div>
            </div>

            {/* Correcting Principles */}
            <div>
              <h3 className="text-lg font-bold text-[#5E3989] mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Correcting Principles
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 italic">• Proactive teaching strategies</div>
                <div className="text-sm text-gray-600 italic">• IDEAL Response® framework</div>
                <div className="text-sm text-gray-600 italic">• Life value terms</div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Positive behavioral supports (PBIS)</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD Enhancement</Badge>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Functional communication training</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD Enhancement</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logic Flow - 4 Columns */}
      <div>
        <h2 className="text-2xl font-bold text-[#5E3989] mb-6 text-center">Logic Model Framework</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* INPUTS */}
          <Card className="border-t-4 border-[#5E3989]">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-white">
              <CardTitle className="text-[#5E3989] uppercase tracking-wide text-center">Inputs</CardTitle>
              <p className="text-xs text-gray-500 text-center">Tier 1 (Basic) + IDD Enhancements</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">
                • Licensed CPA Administrator
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Program Director
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Treatment Director (Special Ed/IDD expertise)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Case Managers - Enhanced ratio 1:15</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">
                  • Licensed Therapists (IDD/Autism specialized, 1:12)
                </div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Behavioral Support Specialists (1:15)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Registered Nurse (24/7 availability)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Crisis Management Staff (1:25)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Verified foster homes (35-hour training)
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• IDD/Autism-specialized foster training</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • TBRI® trained staff
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• 24/7 crisis response capability</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • IT systems (Radius)
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Enhanced data tracking for IDD metrics</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • STAR Health coordination
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• HHSC IDD Services coordination</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
            </CardContent>
          </Card>

          {/* ACTIVITIES */}
          <Card className="border-t-4 border-[#A90533]">
            <CardHeader className="bg-gradient-to-br from-pink-50 to-white">
              <CardTitle className="text-[#A90533] uppercase tracking-wide text-center">Activities</CardTitle>
              <p className="text-xs text-gray-500 text-center">Tier 1 (Basic) + IDD Interventions</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">
                • TBRI® implementation with developmental integration
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC+</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Individual therapy (IDD/Autism-specialized)</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Family therapy with disability focus</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Speech and language therapy</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Occupational therapy coordination</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Social skills groups</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Behavioral intervention implementation</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Life skills development programs</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• RN care plan oversight</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• CANS 3.0 - Every 90 days</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Service Planning - 90-day reviews</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Family engagement
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Therapeutic family participation</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • STAR Health coordination
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• HHSC IDD service coordination</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Educational advocacy
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Special education coordination</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">IDD</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Normalcy activities
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
            </CardContent>
          </Card>

          {/* OUTPUTS */}
          <Card className="border-t-4 border-[#5E3989]">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-white">
              <CardTitle className="text-[#5E3989] uppercase tracking-wide text-center">Outputs</CardTitle>
              <p className="text-xs text-gray-500 text-center">IDD-Specific Measurables</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">• Number of IDD/Autism children served</div>
              <div className="text-sm text-gray-700">• Service Plans completed within 90 days (100%)</div>
              <div className="text-sm text-gray-700">• CANS 3.0 completed every 90 days (100%)</div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Specialized therapy sessions delivered</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Therapy attendance rate (target ≥85%)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Developmental assessments completed</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Life skills goals achieved</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Communication improvements documented</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• RN consultations provided</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Behavioral plans implemented</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Special education plans coordinated</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="text-sm text-gray-700">• Foster parent IDD training hours (enhanced)</div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Service denials notified (3-day compliance)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Program Director confirmations (15-day)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Treatment Director reviews documented</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• HHSC IDD services accessed</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">IDD</Badge>
              </div>
            </CardContent>
          </Card>

          {/* OUTCOMES */}
          <Card className="border-t-4 border-[#A90533]">
            <CardHeader className="bg-gradient-to-br from-pink-50 to-white">
              <CardTitle className="text-[#A90533] uppercase tracking-wide text-center">Outcomes</CardTitle>
              <p className="text-xs text-gray-500 text-center">IDD-Specific Results</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Time Horizons */}
              <div className="space-y-3">
                <Card className="bg-purple-50 border-[#5E3989]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#5E3989]" />
                      <strong className="text-xs text-[#5E3989]">SHORT-TERM (90 days)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Behavioral stabilization • Routine establishment • Communication gains • Safety awareness
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-pink-50 border-[#A90533]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#A90533]" />
                      <strong className="text-xs text-[#A90533]">INTERMEDIATE (6 months)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Developmental progress • Life skills improvement • Social engagement gains • Educational
                      advancement
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 border-[#5E3989]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#5E3989]" />
                      <strong className="text-xs text-[#5E3989]">LONG-TERM (12+ months)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Maximum independence • Community integration • Sustained progress • Successful transitions
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Developmental milestone achievements</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Adaptive behavior improvements (≥15%)</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Communication skill gains documented</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Educational goal attainment (≥70%)</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Reduced behavioral incidents (≥30%)</div>
                </div>
                <div className="text-sm text-gray-700">• Placement stability (IDD-adjusted targets)</div>
                <div className="text-sm text-gray-700">• RCC permanency targets (IDD cohort)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CQI Process */}
      <Card className="border-2 border-[#5E3989]/30">
        <CardHeader className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
          <CardTitle className="text-center text-white">
            IDD/Autism Support Services CQI Process (TAC §749.665)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-[#5E3989]">
              <CardHeader>
                <CardTitle className="text-[#5E3989] text-lg">IDD-Specific Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Weekly therapy progress tracking</li>
                  <li>• Monthly developmental assessments</li>
                  <li>• 90-day CANS trend monitoring</li>
                  <li>• Life skills achievement monitoring</li>
                  <li>• Communication progress documentation</li>
                  <li>• Educational goal tracking</li>
                  <li>• RN care plan reviews</li>
                  <li>• TBRI® fidelity assessments</li>
                  <li>• Behavioral support effectiveness</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#A90533]">
              <CardHeader>
                <CardTitle className="text-[#A90533] text-lg">IDD Program Review</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 90-day Service Plan reviews</li>
                  <li>• Treatment Director quarterly analysis</li>
                  <li>• Continued stay criteria evaluation</li>
                  <li>• TBRI® fidelity in developmental context</li>
                  <li>• Cross-system coordination effectiveness</li>
                  <li>• Therapist caseload management</li>
                  <li>• RN oversight effectiveness</li>
                  <li>• Special education collaboration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#5E3989]">
              <CardHeader>
                <CardTitle className="text-[#5E3989] text-lg">IDD Implementation Adjustments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Developmental approach modifications</li>
                  <li>• Behavioral support refinements</li>
                  <li>• Communication strategy updates</li>
                  <li>• Life skills curriculum adjustments</li>
                  <li>• Medical care plan revisions</li>
                  <li>• Family engagement strategies</li>
                  <li>• Training enhancements for IDD</li>
                  <li>• Annual Logic Model updates</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
