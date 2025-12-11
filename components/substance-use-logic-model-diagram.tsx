"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Heart, Users, Target, TrendingUp, Calendar, Shield } from "lucide-react"

const SubstanceUseLogicModel = () => {
  return (
    <div className="space-y-8">
      {/* Package Note */}
      <Card className="border-2 border-[#10b981] bg-gradient-to-br from-emerald-50 to-teal-50">
        <CardHeader>
          <CardTitle className="text-[#065f46] text-center">Substance Use Support Services Package</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 leading-relaxed">
            This Logic Model is specifically for youth with DSM-5 substance-related and addictive disorder diagnoses or
            documented problematic substance use requiring specialized monitoring and recovery support.
            <br />
            Uses T3C Basic Foster Family Home TBRI® foundation with recovery-oriented enhancements.{" "}
            <strong>Non-punitive, recovery-supportive approach treating addiction as disease.</strong>
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
              To serve youth with substance use disorders by providing trauma-informed, recovery-supportive foster care
              that addresses both addiction and underlying trauma while building healthy relationships as protective
              factors against continued use.
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
              To see youth achieve sustained recovery through healing relationships and comprehensive support, enabling
              successful transitions to less intensive services and permanent homes while maintaining community recovery
              connections.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Objective */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-[#10b981]/30">
        <CardHeader>
          <CardTitle className="text-[#065f46]">Substance Use Support Services Objective</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            To provide trauma-informed, recovery-oriented foster care for youth with substance use disorders. Services
            focus on non-punitive recovery support, comprehensive substance use assessment and treatment coordination,
            trigger management, coping skill development, and community recovery connections—all within a TBRI® framework
            that recognizes addiction as disease and maintains connection through the recovery journey.
          </p>
        </CardContent>
      </Card>

      {/* Treatment Model */}
      <Card className="border-2 border-[#10b981]">
        <CardHeader className="bg-gradient-to-r from-[#d1fae5] to-[#a7f3d0]">
          <CardTitle className="text-center text-[#065f46]">
            Evidence-Informed Treatment Model: Trust-Based Relational Intervention® (TBRI®)
          </CardTitle>
          <p className="text-center italic text-[#065f46]/80 text-sm mt-2">
            Enhanced with recovery-oriented interventions for substance use (T3C Blueprint)
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Connecting Principles */}
            <div>
              <h3 className="text-lg font-bold text-[#047857] mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Connecting Principles
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 italic">• Building felt safety through attunement</div>
                <div className="text-sm text-gray-600 italic">• Providing nurturing care</div>
                <div className="text-sm text-gray-600 italic">• Supporting healthy attachment</div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Therapeutic communication avoiding shame</span>
                  <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Connection maintained during relapse</span>
                  <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
                </div>
              </div>
            </div>

            {/* Empowering Principles */}
            <div>
              <h3 className="text-lg font-bold text-[#047857] mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Empowering Principles
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 italic">• Meeting physical needs</div>
                <div className="text-sm text-gray-600 italic">• Supporting self-regulation</div>
                <div className="text-sm text-gray-600 italic">• Establishing predictable routines</div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Substance-free environment maintenance</span>
                  <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• MAT coordination when appropriate</span>
                  <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
                </div>
              </div>
            </div>

            {/* Correcting Principles */}
            <div>
              <h3 className="text-lg font-bold text-[#047857] mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Correcting Principles
              </h3>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 italic">• Proactive teaching strategies</div>
                <div className="text-sm text-gray-600 italic">• IDEAL Response® framework</div>
                <div className="text-sm text-gray-600 italic">• Life value terms</div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Non-punitive relapse response</span>
                  <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Drug screening as clinical tool</span>
                  <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
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
              <p className="text-xs text-gray-500 text-center">Basic Foundation + SU Enhancements</p>
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
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Treatment Director</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Licensed Therapists (1:14 ratio) w/ SU experience</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Behavior Support Specialists (1:15)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Case Managers (1:15) w/ SU awareness</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Crisis Management Staff (1:25)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Aftercare Case Manager (1:25)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• SU foster homes (35-hr + 4-hr SU training)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • TBRI® trained staff
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• 24/7 crisis availability</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • IT systems (Radius)
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Drug screening protocols (clinical)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• SU therapist network</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Community recovery resources</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
            </CardContent>
          </Card>

          {/* ACTIVITIES */}
          <Card className="border-t-4 border-[#4299e1]">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <CardTitle className="text-[#4299e1] uppercase tracking-wide text-center">Activities</CardTitle>
              <p className="text-xs text-gray-500 text-center">Basic TBRI® + Recovery Support</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">
                • TBRI® implementation for stabilization
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Comprehensive SU assessment within 30 days</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Weekly individual therapy (SU-qualified)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Substance use treatment per recommendation</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Family therapy addressing SU impacts</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• MAT coordination when appropriate</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Trigger management skill building</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Drug screening as clinical tool</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Non-punitive relapse response</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• CANS 3.0 - Every 90 days</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Recovery community connections</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Family engagement & outreach
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Human trafficking screening (elevated risk)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Normalcy activities
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Aftercare planning & provision</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
            </CardContent>
          </Card>

          {/* OUTPUTS */}
          <Card className="border-t-4 border-[#48bb78]">
            <CardHeader className="bg-gradient-to-br from-green-50 to-white">
              <CardTitle className="text-[#48bb78] uppercase tracking-wide text-center">Outputs</CardTitle>
              <p className="text-xs text-gray-500 text-center">SU-Specific Measurables</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">• Number of SU children served</div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• SU assessments within 30 days (100%)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• CANS 3.0 every 90 days (100%)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Weekly therapy sessions delivered (95%+)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• 90-day continued stay reviews (100%)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Drug screenings completed per protocol</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Recovery progress documented</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Relapse responses per protocol (100%)</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Crisis interventions documented</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• SU treatment engagement tracked</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Community recovery connections made</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
              <div className="text-sm text-gray-700">• Foster parent SU training hours (4+)</div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Aftercare engagement rates</span>
                <Badge className="ml-2 bg-[#10b981] text-white text-xs">SU</Badge>
              </div>
            </CardContent>
          </Card>

          {/* OUTCOMES */}
          <Card className="border-t-4 border-[#ed8936]">
            <CardHeader className="bg-gradient-to-br from-orange-50 to-white">
              <CardTitle className="text-[#ed8936] uppercase tracking-wide text-center">Outcomes</CardTitle>
              <p className="text-xs text-gray-500 text-center">SU-Specific Results</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Time Horizons */}
              <div className="space-y-3">
                <Card className="bg-emerald-50 border-[#10b981]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#10b981]" />
                      <strong className="text-xs text-[#10b981]">SHORT-TERM (3-6 months)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Treatment engagement • Reduced substance use • Crisis reduction • CANS improvement • School
                      stabilization
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-teal-50 border-[#14b8a6]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#14b8a6]" />
                      <strong className="text-xs text-[#14b8a6]">INTERMEDIATE (6-12 months)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Sustained recovery periods • Placement stability (85%+) • Faster relapse recovery • Expanding coping
                      skills
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-emerald-50 border-[#10b981]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#10b981]" />
                      <strong className="text-xs text-[#10b981]">LONG-TERM (12-18+ months)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Sustained recovery • Permanency achievement • Transition to Basic • Community connections • Family
                      improvement
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Reduced substance use frequency (25%+ baseline)</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Placement stability 85%+</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• CANS score improvement (measurable)</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Crisis incidents decreasing trend</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Recovery community connections maintained</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-[#10b981] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• 30/60/90-day post-discharge stability</div>
                </div>
                <div className="text-sm text-gray-700">• TBRI® fidelity maintained</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Human Trafficking Monitoring */}
      <Card className="border-l-4 border-[#A90533]">
        <CardHeader>
          <CardTitle className="text-[#A90533] text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Human Trafficking Risk Monitoring
          </CardTitle>
          <p className="text-xs text-gray-500">Elevated risk population - required screening and monitoring</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#A90533]/30">
                  <th className="text-left p-2 text-[#A90533]">Screening Point</th>
                  <th className="text-left p-2 text-[#A90533]">Timeline</th>
                  <th className="text-left p-2 text-[#A90533]">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-gradient-to-r from-[#A90533]/5 to-transparent">
                  <td className="p-2 font-medium">Universal trafficking screening</td>
                  <td className="p-2">
                    <Badge className="bg-[#A90533] text-white">At admission</Badge>
                  </td>
                  <td className="p-2 text-gray-600">Identify existing trafficking involvement</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Regular reassessment</td>
                  <td className="p-2">Ongoing</td>
                  <td className="p-2 text-gray-600">Monitor for new risk indicators</td>
                </tr>
                <tr className="border-b bg-gradient-to-r from-[#A90533]/5 to-transparent">
                  <td className="p-2 font-medium">Staff training verification</td>
                  <td className="p-2">Annual</td>
                  <td className="p-2 text-gray-600">Ensure recognition capacity</td>
                </tr>
                <tr>
                  <td className="p-2 font-medium">Response protocol review</td>
                  <td className="p-2">As needed</td>
                  <td className="p-2 text-gray-600">Maintain current procedures</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Post-Discharge Stability Tracking */}
      <Card className="border-t-4 border-[#A90533]">
        <CardHeader className="bg-gradient-to-br from-pink-50 to-white">
          <CardTitle className="text-[#A90533] text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Post-Discharge Recovery Stability Milestones
          </CardTitle>
          <p className="text-xs text-gray-500">Tracked through aftercare services</p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-emerald-50 p-3 rounded-lg text-center border border-[#10b981]/30">
              <Calendar className="h-5 w-5 mx-auto text-[#10b981] mb-1" />
              <div className="text-xs text-gray-600">30-Day</div>
              <div className="text-lg font-bold text-[#10b981]">90%+</div>
              <div className="text-xs text-gray-500">recovery stability</div>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg text-center border border-[#14b8a6]/30">
              <Calendar className="h-5 w-5 mx-auto text-[#14b8a6] mb-1" />
              <div className="text-xs text-gray-600">60-Day</div>
              <div className="text-lg font-bold text-[#14b8a6]">85%+</div>
              <div className="text-xs text-gray-500">recovery stability</div>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg text-center border border-[#10b981]/30">
              <Calendar className="h-5 w-5 mx-auto text-[#10b981] mb-1" />
              <div className="text-xs text-gray-600">90-Day</div>
              <div className="text-lg font-bold text-[#10b981]">80%+</div>
              <div className="text-xs text-gray-500">recovery stability</div>
            </div>
            <div className="bg-teal-50 p-3 rounded-lg text-center border border-[#14b8a6]/30">
              <Calendar className="h-5 w-5 mx-auto text-[#14b8a6] mb-1" />
              <div className="text-xs text-gray-600">No Re-entry</div>
              <div className="text-lg font-bold text-[#14b8a6]">90%+</div>
              <div className="text-xs text-gray-500">target</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CQI Process */}
      <Card className="border-2 border-[#5E3989]/30">
        <CardHeader className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
          <CardTitle className="text-center text-white">Substance Use Support Services CQI Process (TAC §749.665)</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-[#5E3989]">
              <CardHeader>
                <CardTitle className="text-[#5E3989] text-lg">SU-Specific Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• SU assessment completion rates & timelines</li>
                  <li>• CANS 3.0 completion every 90 days</li>
                  <li>• Weekly therapy attendance tracking</li>
                  <li>• Recovery progress documentation</li>
                  <li>• Drug screening patterns (clinical indicator)</li>
                  <li>• Relapse frequency and response quality</li>
                  <li>• Crisis intervention documentation</li>
                  <li>• Treatment engagement metrics</li>
                  <li>• TBRI® fidelity in recovery context</li>
                  <li>• Post-discharge stability tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#A90533]">
              <CardHeader>
                <CardTitle className="text-[#A90533] text-lg">SU Program Review</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 90-day Service Plan review quality</li>
                  <li>• SU treatment coordination effectiveness</li>
                  <li>• Relapse response protocol adherence</li>
                  <li>• Non-punitive approach verification</li>
                  <li>• Foster parent SU support adequacy</li>
                  <li>• Recovery community connections</li>
                  <li>• Human trafficking screening compliance</li>
                  <li>• MAT coordination (when applicable)</li>
                  <li>• Aftercare engagement rates</li>
                  <li>• Treatment model fidelity assessment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#5E3989]">
              <CardHeader>
                <CardTitle className="text-[#5E3989] text-lg">SU Implementation Adjustments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Therapy frequency/modality modifications</li>
                  <li>• Relapse response protocol refinements</li>
                  <li>• Recovery support strategy enhancements</li>
                  <li>• Foster parent training updates</li>
                  <li>• Drug screening protocol adjustments</li>
                  <li>• Community resource connections expansion</li>
                  <li>• Crisis intervention improvements</li>
                  <li>• Family engagement strategies</li>
                  <li>• Aftercare process refinements</li>
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

export default SubstanceUseLogicModel

