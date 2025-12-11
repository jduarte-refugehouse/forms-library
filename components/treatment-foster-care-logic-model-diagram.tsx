"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Heart, Users, Target, TrendingUp, Calendar, GraduationCap } from "lucide-react"

const TreatmentFosterCareLogicModel = () => {
  return (
    <div className="space-y-8">
      {/* Package Note */}
      <Card className="border-2 border-[#ea580c] bg-gradient-to-br from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="text-[#9a3412] text-center">
            Treatment Foster Family Care Support Services Package
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 leading-relaxed">
            This Logic Model is specifically for children requiring the most intensive level of therapeutic and recovery
            services in a family setting for serious emotional and behavioral disorders.
            <br />
            <strong>
              Incorporates T3C Basic and Mental Health as foundational tiers with enhanced intensive clinical components
              and behavioral support.
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
              To serve children with the most serious emotional and behavioral challenges by providing intensive
              therapeutic support within highly specialized family environments, utilizing evidence-based clinical
              interventions to guide them toward stabilization and successful step-down to less intensive services.
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
              To see children with complex behavioral and mental health needs achieve clinical stability through
              intensive treatment-level services in a family setting, enabling successful transitions to lower levels of
              care and permanent homes while avoiding institutional placement.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Objective */}
      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-[#ea580c]/30">
        <CardHeader>
          <CardTitle className="text-[#9a3412]">Treatment Foster Care Service Objective</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            To provide intensive trauma-informed therapeutic foster care for children with serious emotional, mental,
            and behavioral disorders requiring the highest level of clinical intervention in a family setting. Services
            include intensive therapy (weekly minimum), behavioral support, psychiatric coordination, and 24/7 crisis
            management through TBRI®-enhanced programming with maximum 365-day length of service and step-down planning
            toward permanency goals.
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
            Enhanced with intensive clinical interventions for treatment foster care (T3C Blueprint p.137-144)
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
                <div className="text-sm text-gray-600 italic">• Building felt safety through attunement</div>
                <div className="text-sm text-gray-600 italic">• Providing nurturing care</div>
                <div className="text-sm text-gray-600 italic">• Supporting healthy attachment</div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Intensive therapeutic engagement</span>
                  <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Daily therapeutic check-ins</span>
                  <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Crisis de-escalation through connection</span>
                  <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
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
                <div className="text-sm text-gray-600 italic">• Meeting physical needs</div>
                <div className="text-sm text-gray-600 italic">• Supporting self-regulation</div>
                <div className="text-sm text-gray-600 italic">• Establishing predictable routines</div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Structured clinical support</span>
                  <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Intensive medication management</span>
                  <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Crisis prevention planning</span>
                  <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
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
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Intensive behavioral interventions (PBIS)</span>
                  <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Functional Behavior Assessments</span>
                  <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                  <span className="text-sm text-gray-800 font-semibold">• Individualized behavior support plans</span>
                  <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
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
              <p className="text-xs text-gray-500 text-center">Tier 1-2 (Basic/MH) + TFC Enhancements</p>
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
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Treatment Director (Master's + 3 yrs exp required)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Case Managers - Intensive ratio 1:6</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Licensed Therapists (1:11 ratio)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Behavior Support Specialists (1:6 ratio)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Crisis Management Staff (1:25)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Aftercare Case Managers (1:25)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Treatment foster homes (35-hour + 20-hour TFC training)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Maximum 2 children per home</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • TBRI® trained staff
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• 24/7 crisis response with therapist on-call</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • IT systems (Radius)
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Enhanced behavioral data tracking</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • STAR Health coordination
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Psychiatric service coordination</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Wraparound service coordination</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
            </CardContent>
          </Card>

          {/* ACTIVITIES */}
          <Card className="border-t-4 border-[#4299e1]">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-white">
              <CardTitle className="text-[#4299e1] uppercase tracking-wide text-center">Activities</CardTitle>
              <p className="text-xs text-gray-500 text-center">Tier 1-2 (Basic/MH) + TFC Intensive</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">
                • TBRI® with intensive clinical integration
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC+</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Weekly individual therapy (minimum per T3C p.137)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Intensive family therapy sessions</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Group therapy for skill building</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Psychiatric consultations & medication mgmt</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Functional Behavior Assessments (FBA)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Individualized behavior support plans (PBIS)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Intensive behavioral interventions (1:6 specialist)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• 24/7 crisis intervention with therapist consult</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Daily medication monitoring</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• CANS 3.0 - Every 90 days</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Service Plans - Initial 30 days, reviewed 60 days</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• 90-day Treatment Director continued stay reviews</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Weekly case manager support (1:6 ratio)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Weekly foster parent coaching from behavior specialist</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • STAR Health coordination
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Wraparound services coordination</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Educational advocacy
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Intensive special education coordination</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Step-down planning from admission</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Aftercare planning & provision</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
            </CardContent>
          </Card>

          {/* OUTPUTS */}
          <Card className="border-t-4 border-[#48bb78]">
            <CardHeader className="bg-gradient-to-br from-green-50 to-white">
              <CardTitle className="text-[#48bb78] uppercase tracking-wide text-center">Outputs</CardTitle>
              <p className="text-xs text-gray-500 text-center">TFC-Specific Measurables</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">• Number of TFC children served</div>
              <div className="text-sm text-gray-700">• Service Plans within 30 days (100%)</div>
              <div className="text-sm text-gray-700">• Service Plan reviews every 60 days (100%)</div>
              <div className="text-sm text-gray-700">• CANS 3.0 every 90 days (100%)</div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Weekly therapy sessions delivered (100%)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Therapy attendance rate (target 100%)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• FBAs completed for target behaviors</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Behavior support plans implemented</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Behavioral data collected continuously</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Crisis interventions documented</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Crisis response time (&lt;1 hour: 100%)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Therapist on-call consultations</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Psychiatric consultations completed</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Medication compliance rate (≥90%)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Weekly case manager contacts (1:6 ratio)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Weekly behavior specialist coaching</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Treatment Director 90-day reviews (100%)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Program Director confirmations (15-day: 100%)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="text-sm text-gray-700">• Foster parent TFC training hours (50+)</div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Maximum 2-child-per-home compliance (100%)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Length of service tracking (max 365 days)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Step-down assessments every 90 days</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r flex items-center justify-between">
                <span className="text-sm text-gray-800 font-semibold">• Aftercare services initiated (100%)</span>
                <Badge className="ml-2 bg-[#ea580c] text-white text-xs">TFC</Badge>
              </div>
            </CardContent>
          </Card>

          {/* OUTCOMES */}
          <Card className="border-t-4 border-[#ed8936]">
            <CardHeader className="bg-gradient-to-br from-orange-50 to-white">
              <CardTitle className="text-[#ed8936] uppercase tracking-wide text-center">Outcomes</CardTitle>
              <p className="text-xs text-gray-500 text-center">TFC-Specific Results</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Time Horizons */}
              <div className="space-y-3">
                <Card className="bg-orange-50 border-[#ea580c]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#ea580c]" />
                      <strong className="text-xs text-[#ea580c]">SHORT-TERM (90 days)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Crisis reduction ≥75% • CANS improvement 2+ areas • Medication stabilization • Consistent therapy
                      engagement
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-amber-50 border-[#f59e0b]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#f59e0b]" />
                      <strong className="text-xs text-[#f59e0b]">INTERMEDIATE (6 months)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Behavioral incidents ≥40% reduction • Functional improvement • 85% placement stability • Progress
                      toward permanency
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 border-[#ea580c]/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-[#ea580c]" />
                      <strong className="text-xs text-[#ea580c]">LONG-TERM (Discharge)</strong>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      Service Plan goals achieved • Step-down to MH or Basic • Permanency achievement • Sustained
                      stability
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Crisis episodes reduced ≥75% from admission
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Psychiatric hospitalizations ≤1 per year</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Behavioral incident frequency ≥40% reduction
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Improved CANS behavioral/emotional scores</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Successful medication adherence ≥90%</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Step-down success rate ≥70%</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Placement stability 85% (no unplanned moves)
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">• Treatment completion within 365 days</div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Successful transition to Mental Health package
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-[#ea580c] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-semibold">
                    • Aftercare engagement 6 months post-discharge
                  </div>
                </div>
                <div className="text-sm text-gray-700">• RCC permanency targets (TFC cohort)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Foster Parent Training Requirements - TFFC Specific */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-[#5E3989]">
        <CardHeader>
          <CardTitle className="text-[#5E3989] text-lg flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Foster Parent Training - TFFC Specific
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#5E3989]/30">
                  <th className="text-left p-2 text-[#5E3989]">Training Component</th>
                  <th className="text-left p-2 text-[#5E3989]">Hours</th>
                  <th className="text-left p-2 text-[#5E3989]">Requirement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Initial TFFC Training</td>
                  <td className="p-2">
                    <Badge className="bg-[#5E3989] text-white">20 hours</Badge>
                  </td>
                  <td className="p-2 text-gray-600">TAC §749.863(c) - Before first TFFC placement</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Annual Refresher</td>
                  <td className="p-2">
                    <Badge className="bg-[#A90533] text-white">8 hours</Badge>
                  </td>
                  <td className="p-2 text-gray-600">Annual requirement</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">On-Call Therapist TBRI®</td>
                  <td className="p-2">
                    <Badge variant="outline" className="border-[#5E3989] text-[#5E3989]">Verified</Badge>
                  </td>
                  <td className="p-2 text-gray-600">Before on-call assignment</td>
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
            Post-Discharge Stability Milestones
          </CardTitle>
          <p className="text-xs text-gray-500">Tracked through 6-month mandatory aftercare</p>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-purple-50 p-3 rounded-lg text-center border border-[#5E3989]/30">
              <Calendar className="h-5 w-5 mx-auto text-[#5E3989] mb-1" />
              <div className="text-xs text-gray-600">30-Day</div>
              <div className="text-lg font-bold text-[#5E3989]">95%+</div>
              <div className="text-xs text-gray-500">stability target</div>
            </div>
            <div className="bg-pink-50 p-3 rounded-lg text-center border border-[#A90533]/30">
              <Calendar className="h-5 w-5 mx-auto text-[#A90533] mb-1" />
              <div className="text-xs text-gray-600">60-Day</div>
              <div className="text-lg font-bold text-[#A90533]">90%+</div>
              <div className="text-xs text-gray-500">stability target</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-center border border-[#5E3989]/30">
              <Calendar className="h-5 w-5 mx-auto text-[#5E3989] mb-1" />
              <div className="text-xs text-gray-600">90-Day</div>
              <div className="text-lg font-bold text-[#5E3989]">85%+</div>
              <div className="text-xs text-gray-500">stability target</div>
            </div>
            <div className="bg-pink-50 p-3 rounded-lg text-center border border-[#A90533]/30">
              <Calendar className="h-5 w-5 mx-auto text-[#A90533] mb-1" />
              <div className="text-xs text-gray-600">180-Day</div>
              <div className="text-lg font-bold text-[#A90533]">80%+</div>
              <div className="text-xs text-gray-500">stability target</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CQI Process */}
      <Card className="border-2 border-[#5E3989]/30">
        <CardHeader className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
          <CardTitle className="text-center text-white">Treatment Foster Care CQI Process (TAC §749.665)</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-[#5E3989]">
              <CardHeader>
                <CardTitle className="text-[#5E3989] text-lg">TFC-Specific Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Weekly therapy attendance tracking (100%)</li>
                  <li>• Daily behavioral incident documentation</li>
                  <li>• Weekly behavioral data analysis</li>
                  <li>• 90-day CANS trend monitoring</li>
                  <li>• Daily medication compliance tracking</li>
                  <li>• Crisis intervention frequency & outcomes</li>
                  <li>• FBA implementation fidelity</li>
                  <li>• Behavior support plan effectiveness</li>
                  <li>• Psychiatric consultation outcomes</li>
                  <li>• TBRI® fidelity in intensive context</li>
                  <li>• Step-down readiness indicators every 90 days</li>
                  <li>• Length of service tracking (max 365 days)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#A90533]">
              <CardHeader>
                <CardTitle className="text-[#A90533] text-lg">TFC Program Review</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 30-day initial Service Plan reviews</li>
                  <li>• 60-day Service Plan reviews</li>
                  <li>• 90-day Treatment Director reviews</li>
                  <li>• Continued stay criteria evaluation</li>
                  <li>• TBRI® fidelity in intensive treatment</li>
                  <li>• Therapist caseload management (1:11)</li>
                  <li>• Behavior specialist effectiveness (1:6)</li>
                  <li>• Crisis response effectiveness analysis</li>
                  <li>• Maximum 2-child-per-home compliance</li>
                  <li>• Step-down planning effectiveness</li>
                  <li>• Aftercare engagement rates</li>
                  <li>• Treatment model fidelity assessment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#5E3989]">
              <CardHeader>
                <CardTitle className="text-[#5E3989] text-lg">TFC Implementation Adjustments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Intensive therapy frequency modifications</li>
                  <li>• Behavioral intervention plan updates</li>
                  <li>• Crisis protocol refinements</li>
                  <li>• Medication protocol reviews</li>
                  <li>• FBA methodology improvements</li>
                  <li>• Step-down criteria adjustments</li>
                  <li>• Family engagement strategies</li>
                  <li>• Treatment foster parent support enhancements</li>
                  <li>• Training enhancements for intensive services</li>
                  <li>• Psychiatric coordination improvements</li>
                  <li>• Annual Logic Model updates</li>
                  <li>• TBRI® adaptations for complex cases</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default TreatmentFosterCareLogicModel
