"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Heart, Users, Target, TrendingUp, Calendar, Clock } from "lucide-react"

const ShortTermAssessmentLogicModel = () => {
  return (
    <div className="space-y-8">
      {/* Package Note */}
      <Card className="border-2 border-[#f59e0b] bg-gradient-to-br from-amber-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="text-[#92400e] text-center">Short-Term Assessment Support Services Package</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 leading-relaxed">
            This Logic Model is specifically for time-limited assessment placements (30-45 days maximum) to determine
            appropriate long-term Service Package and placement.
            <br />
            Uses T3C Basic Foster Family Home TBRI® foundation with assessment coordination enhancements.{" "}
            <strong>Not eligible for Add-On Services.</strong>
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
              To serve children in transition by providing stable, trauma-informed assessment environments that enable
              comprehensive evaluation of strengths and needs while maintaining safety, dignity, and connection during a
              vulnerable period.
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
              To see children successfully transition to appropriate long-term placements with comprehensive assessment
              data that enables matched services and supports, ensuring their path to permanency is informed by thorough
              understanding of their unique needs.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Objective */}
      <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-[#f59e0b]/30">
        <CardHeader>
          <CardTitle className="text-[#92400e]">Short-Term Assessment Service Objective</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            To provide trauma-informed foster care for children requiring comprehensive assessment to determine
            appropriate Service Package and placement. Services focus on stabilization, coordination of evaluations
            (medical, educational, behavioral, developmental), documentation of observations, and transition
            planning—all within a time-limited framework (30-45 days maximum) using TBRI® principles to ensure felt
            safety during assessment period.
          </p>
        </CardContent>
      </Card>

      {/* Treatment Model */}
      <Card className="border-2 border-[#f59e0b]">
        <CardHeader className="bg-gradient-to-r from-[#fef3c7] to-[#fed7aa]">
          <CardTitle className="text-center text-[#92400e]">
            Evidence-Informed Treatment Model: Trust-Based Relational Intervention® (TBRI®)
          </CardTitle>
          <p className="text-center italic text-[#92400e]/80 text-sm mt-2">
            Same foundational model as T3C Basic Foster Family Home with assessment coordination enhancements (T3C
            Blueprint p.67-75)
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Connecting Principles */}
            <div>
              <h3 className="text-lg font-bold text-[#c05621] mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Connecting Principles
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 italic">• Building felt safety during transition</div>
                <div className="text-sm text-gray-600 italic">• Providing nurturing care in short-term placement</div>
                <div className="text-sm text-gray-600 italic">• Supporting attachment behaviors</div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Observing connection responses for assessment</span>
                  <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
                </div>
              </div>
            </div>

            {/* Empowering Principles */}
            <div>
              <h3 className="text-lg font-bold text-[#c05621] mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Empowering Principles
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 italic">• Meeting immediate physical needs</div>
                <div className="text-sm text-gray-600 italic">• Supporting regulation during assessments</div>
                <div className="text-sm text-gray-600 italic">• Establishing predictable routines quickly</div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Creating stability for valid assessment</span>
                  <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
                </div>
              </div>
            </div>

            {/* Correcting Principles */}
            <div>
              <h3 className="text-lg font-bold text-[#c05621] mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Correcting Principles
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 italic">• Proactive teaching strategies</div>
                <div className="text-sm text-gray-600 italic">• IDEAL Response® framework</div>
                <div className="text-sm text-gray-600 italic">• Life value terms</div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Documenting behavioral responses</span>
                  <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
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
          <Card className="border-t-4 border-[#9f7aea]">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-white">
              <CardTitle className="text-[#9f7aea] uppercase tracking-wide text-center">Inputs</CardTitle>
              <p className="text-xs text-gray-500 text-center">Basic Foundation + STASS Coordination</p>
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
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Treatment Director (assessment oversight)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Case Managers - 1:12 ratio</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Licensed Therapist (1:12 ratio) for assessment coordination</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Crisis Management Staff (1:25)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• STASS foster homes (35-hour + 4-hour STASS training)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Maximum 4 children per home (unless sibling group)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • TBRI® trained staff
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• 24/7 case manager+ availability</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • IT systems (Radius)
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Assessment tracking & documentation systems</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• STAR Health assessment coordination capacity</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Transportation for multiple appointments</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Educational liaison for enrollment/testing</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
            </CardContent>
          </Card>

          {/* ACTIVITIES */}
          <Card className="border-t-4 border-[#4299e1]">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <CardTitle className="text-[#4299e1] uppercase tracking-wide text-center">Activities</CardTitle>
              <p className="text-xs text-gray-500 text-center">Basic TBRI® + Assessment Coordination</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">
                • TBRI® implementation for stabilization
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• CANS 3.0 within 21-30 days (age-dependent)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Comprehensive assessment coordination</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• STAR Health evaluation services coordination</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Medical/dental assessment appointments</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Educational testing & school enrollment</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Behavioral observation & documentation</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Developmental screening</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• ECI coordination (if age 0-3)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• HHSC Behavioral Health coordination</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Service Planning - Initial 30 days, monthly review</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Licensed Therapist assessment oversight</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Family engagement & outreach
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Intensive family identification & engagement</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Documentation for permanency planning</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Transition planning to appropriate placement</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Service Package determination support</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Normalcy activities
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Crisis stabilization (24/7 availability)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
            </CardContent>
          </Card>

          {/* OUTPUTS */}
          <Card className="border-t-4 border-[#48bb78]">
            <CardHeader className="bg-gradient-to-br from-green-50 to-white">
              <CardTitle className="text-[#48bb78] uppercase tracking-wide text-center">Outputs</CardTitle>
              <p className="text-xs text-gray-500 text-center">STASS-Specific Measurables</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">• Number of STASS children served</div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Service Plans within 30 days (100%)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Service Plan monthly reviews (100%)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• CANS 3.0 completed within timeframe (100%)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Comprehensive assessments coordinated within 21-30 days</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Medical evaluations completed</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Educational assessments arranged</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Behavioral observations documented</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• STAR Health coordination documented</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• School enrollment completed</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Transportation to appointments provided</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Family engagement efforts documented</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Crisis interventions provided (if needed)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Service Package recommendations developed</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Transition plans completed</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Average length of service tracked</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Placement within time limits (30-45 days + extension)</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
              <div className="text-sm text-gray-700">• Foster parent STASS training hours (4+)</div>
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Assessment data transferred to next placement</span>
                <Badge className="ml-2 bg-[#f59e0b] text-white text-xs">STASS</Badge>
              </div>
            </CardContent>
          </Card>

          {/* OUTCOMES */}
          <Card className="border-t-4 border-[#ed8936]">
            <CardHeader className="bg-gradient-to-br from-orange-50 to-white">
              <CardTitle className="text-[#ed8936] uppercase tracking-wide text-center">Outcomes</CardTitle>
              <p className="text-xs text-gray-500 text-center">STASS-Specific Results</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Time Horizons */}
              <div className="space-y-3">
                <Card className="bg-amber-50 border-[#f59e0b]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#f59e0b]" />
                      <strong className="text-xs text-[#f59e0b]">IMMEDIATE (Week 1)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Stabilization achieved • Felt safety established • Basic needs met • Assessment planning begun
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-yellow-50 border-[#eab308]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#eab308]" />
                      <strong className="text-xs text-[#eab308]">SHORT-TERM (21-30 days)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Assessments completed • CANS 3.0 administered • Data gathered & analyzed • Service Package
                      identified
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-amber-50 border-[#f59e0b]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#f59e0b]" />
                      <strong className="text-xs text-[#f59e0b]">TRANSITION (30-45 days)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Appropriate placement identified • Smooth transition achieved • Assessment data transferred •
                      Family engaged in planning
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • 100% of children stabilized during assessment period
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Comprehensive assessment data gathered for 100%
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Appropriate Service Package determined for 100%
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • 95% transition to identified placement successfully
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Zero placement moves during assessment period
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Family engagement documented for permanency planning
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Educational enrollment/testing completed</div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Medical/behavioral needs identified and documented
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Crisis interventions successful when needed
                  </div>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-[#f59e0b] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Average length of service within limits</div>
                </div>
                <div className="text-sm text-gray-700">• TBRI® fidelity maintained during assessment</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assessment Types Coordinated */}
      <Card className="border-l-4 border-[#5E3989]">
        <CardHeader>
          <CardTitle className="text-[#5E3989] text-lg">Assessment Types Coordinated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#5E3989]/30">
                  <th className="text-left p-2 text-[#5E3989]">Domain</th>
                  <th className="text-left p-2 text-[#5E3989]">Timeline</th>
                  <th className="text-left p-2 text-[#5E3989]">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-gradient-to-r from-[#5E3989]/5 to-transparent">
                  <td className="p-2 font-medium">Medical/Dental Screening</td>
                  <td className="p-2"><Badge className="bg-[#A90533] text-white">72 hours</Badge></td>
                  <td className="p-2 text-gray-600">Immediate health needs</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Behavioral Health</td>
                  <td className="p-2">Per clinical indication</td>
                  <td className="p-2 text-gray-600">Mental health evaluation</td>
                </tr>
                <tr className="border-b bg-gradient-to-r from-[#5E3989]/5 to-transparent">
                  <td className="p-2 font-medium">Developmental Evaluation</td>
                  <td className="p-2">If applicable</td>
                  <td className="p-2 text-gray-600">Developmental status</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Educational Assessment</td>
                  <td className="p-2">As needed</td>
                  <td className="p-2 text-gray-600">Academic placement</td>
                </tr>
                <tr className="border-b bg-gradient-to-r from-[#5E3989]/5 to-transparent">
                  <td className="p-2 font-medium">Trauma Screening</td>
                  <td className="p-2">During assessment</td>
                  <td className="p-2 text-gray-600">Trauma history identification</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Substance Use Screening</td>
                  <td className="p-2">If indicated</td>
                  <td className="p-2 text-gray-600">Adolescent substance concerns</td>
                </tr>
                <tr className="bg-gradient-to-r from-[#A90533]/10 to-transparent font-semibold">
                  <td className="p-2">CANS 3.0</td>
                  <td className="p-2"><Badge className="bg-[#5E3989] text-white">21/30 days</Badge></td>
                  <td className="p-2 text-gray-600">Comprehensive needs assessment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Extension and Accuracy Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-yellow-50 border-l-4 border-yellow-500">
          <CardHeader>
            <CardTitle className="text-yellow-800 text-base flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Extension Rate Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-700">&lt;20%</div>
              <div className="text-sm text-yellow-600">Target extension rate</div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              High extension rates may indicate need for expedited assessment scheduling
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-l-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-green-800 text-base flex items-center gap-2">
              <Target className="h-4 w-4" />
              Recommendation Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">90%+</div>
              <div className="text-sm text-green-600">Placement stability at 90 days</div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              In receiving placement - quarterly follow-up
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CQI Process */}
      <Card className="border-2 border-[#5E3989]/30">
        <CardHeader className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
          <CardTitle className="text-center text-white">Short-Term Assessment CQI Process (TAC §749.665)</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-[#5E3989]">
              <CardHeader>
                <CardTitle className="text-[#5E3989] text-lg">STASS-Specific Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Referral source tracking (SSCC vs DFPS)</li>
                  <li>• Admission/denial rates and reasons</li>
                  <li>• Average length of service by child</li>
                  <li>• Assessment completion rates & timelines</li>
                  <li>• CANS 3.0 completion within timeframe</li>
                  <li>• Service coordination documentation</li>
                  <li>• Placement stability during assessment</li>
                  <li>• Transition success rates</li>
                  <li>• Service Package determination accuracy</li>
                  <li>• Family engagement documentation</li>
                  <li>• TBRI® fidelity during short-term care</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#A90533]">
              <CardHeader>
                <CardTitle className="text-[#A90533] text-lg">STASS Program Review</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Monthly Service Plan review quality</li>
                  <li>• Assessment coordination effectiveness</li>
                  <li>• Licensed Therapist oversight adequacy</li>
                  <li>• STAR Health coordination success</li>
                  <li>• Educational enrollment timeliness</li>
                  <li>• Time-to-assessment metrics</li>
                  <li>• Crisis response effectiveness</li>
                  <li>• Transition planning quality</li>
                  <li>• Foster parent feedback on STASS-specific training</li>
                  <li>• Service Package matching accuracy</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#5E3989]">
              <CardHeader>
                <CardTitle className="text-[#5E3989] text-lg">STASS Implementation Adjustments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Assessment coordination process improvements</li>
                  <li>• Timeline optimization for evaluations</li>
                  <li>• STAR Health coordination enhancements</li>
                  <li>• Transportation logistics refinement</li>
                  <li>• Documentation system improvements</li>
                  <li>• Foster parent STASS training updates</li>
                  <li>• Transition planning process improvements</li>
                  <li>• Family engagement strategy refinement</li>
                  <li>• Service Package determination criteria updates</li>
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

export default ShortTermAssessmentLogicModel
