"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Heart, Users, Target, TrendingUp, Calendar } from "lucide-react"

const MentalBehavioralLogicModel = () => {
  return (
    <div className="space-y-8">
      {/* Package Note */}
      <Card className="border-2 border-[#5E3989]/30 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-[#5E3989] text-center">
            Mental & Behavioral Health Support Services Package
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 leading-relaxed">
            This Logic Model is specifically for children requiring therapeutic and recovery services for emotional,
            conduct, or behavioral disorders.
            <br />
            <strong>
              Incorporates T3C Basic Foster Family Home Support Services as foundational Tier 1 with enhanced
              therapeutic components.
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
              To serve children with mental and behavioral health needs by providing comprehensive therapeutic support
              within stable family environments, utilizing evidence-based interventions to guide them toward healing and
              successful permanency.
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
              To see children overcome trauma and behavioral challenges through intensive therapeutic interventions,
              achieving stability and well-being that enables successful transitions to less restrictive settings and
              permanent homes.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Objective */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-[#5E3989]/20">
        <CardHeader>
          <CardTitle className="text-[#5E3989]">Mental & Behavioral Health Service Objective</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            To provide trauma-informed therapeutic foster care for children with DSM-5 diagnoses or pending diagnoses
            for emotional, conduct, or behavioral disorders, delivering regular clinical interventions (therapy,
            education, and/or medication) through TBRI®-enhanced programming to support and manage day-to-day activities
            while working toward permanency goals.
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
            Enhanced with specific programming for mental & behavioral health needs (T3C Blueprint p.77)
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
                  <div className="text-sm text-gray-800 font-medium">• Therapeutic alliance development</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH Enhancement</Badge>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Trust-building in therapy context</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH Enhancement</Badge>
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
                  <div className="text-sm text-gray-800 font-medium">• Sensory strategies for regulation</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH Enhancement</Badge>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Psychotropic medication support</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH Enhancement</Badge>
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
                  <div className="text-sm text-gray-800 font-medium">• Behavioral intervention plans</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH Enhancement</Badge>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Crisis de-escalation protocols</div>
                  <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH Enhancement</Badge>
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
              <p className="text-xs text-gray-500 text-center">Tier 1 (Basic) + MH Enhancements</p>
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
                <div className="text-sm text-gray-800 font-medium">• Treatment Director (Master's level)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Case Managers - Enhanced ratio 1:15</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Licensed Therapists (1:14 ratio)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Behavioral Support Specialists (1:15)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Crisis Management Staff (1:25)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Aftercare Case Managers (1:25)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Verified foster homes (35-hour training)
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• MH-specialized foster parent training</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • TBRI® trained staff
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• 24/7 crisis response capability</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • IT systems (Radius)
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Enhanced data tracking for MH metrics</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • STAR Health coordination
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• HHSC Behavioral Health coordination</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
            </CardContent>
          </Card>

          {/* ACTIVITIES */}
          <Card className="border-t-4 border-[#A90533]">
            <CardHeader className="bg-gradient-to-br from-pink-50 to-white">
              <CardTitle className="text-[#A90533] uppercase tracking-wide text-center">Activities</CardTitle>
              <p className="text-xs text-gray-500 text-center">Tier 1 (Basic) + MH Interventions</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">
                • TBRI® implementation with therapeutic integration
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC+</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">
                  • Regular & frequent individual therapy (per T3C p.77)
                </div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Family therapy sessions (as appropriate)</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Group therapy programs (as indicated)</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Psychiatric consultations & evaluations</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Medication management & monitoring</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Behavioral intervention plan implementation</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Crisis intervention (24/7)</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• CANS 3.0 - Every 90 days</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Service Planning - 90-day reviews</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Family engagement
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Therapeutic family participation</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • STAR Health coordination
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• HHSC BH service coordination</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• ECI coordination (if applicable)</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Educational advocacy
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Special education coordination</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
              <div className="text-sm text-gray-700">
                • Normalcy activities
                <Badge className="ml-2 bg-gray-200 text-gray-600 text-xs">BASIC</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Aftercare planning & provision</div>
                <Badge className="mt-1 bg-[#A90533] text-white text-xs">MH</Badge>
              </div>
            </CardContent>
          </Card>

          {/* OUTPUTS */}
          <Card className="border-t-4 border-[#5E3989]">
            <CardHeader className="bg-gradient-to-br from-purple-50 to-white">
              <CardTitle className="text-[#5E3989] uppercase tracking-wide text-center">Outputs</CardTitle>
              <p className="text-xs text-gray-500 text-center">MH-Specific Measurables</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-gray-700">• Number of MH children served</div>
              <div className="text-sm text-gray-700">• Service Plans completed within 90 days (100%)</div>
              <div className="text-sm text-gray-700">• CANS 3.0 completed every 90 days (100%)</div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Weekly therapy sessions delivered</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Therapy attendance rate (target ≥90%)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Crisis interventions provided</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Crisis response time (&lt;1 hour)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Behavioral plans implemented</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Psychiatric consultations completed</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Medication compliance rate (≥85%)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Family therapy sessions conducted</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="text-sm text-gray-700">• Foster parent MH training hours (enhanced)</div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Service denials notified (3-day compliance)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Program Director confirmations (15-day)</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Treatment Director reviews documented</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Aftercare services initiated</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• Step-down assessments completed</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
              <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                <div className="text-sm text-gray-800 font-medium">• HHSC BH services accessed</div>
                <Badge className="mt-1 bg-[#5E3989] text-white text-xs">MH</Badge>
              </div>
            </CardContent>
          </Card>

          {/* OUTCOMES */}
          <Card className="border-t-4 border-[#A90533]">
            <CardHeader className="bg-gradient-to-br from-pink-50 to-white">
              <CardTitle className="text-[#A90533] uppercase tracking-wide text-center">Outcomes</CardTitle>
              <p className="text-xs text-gray-500 text-center">MH-Specific Results</p>
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
                      Behavioral stabilization • Crisis reduction • Medication stability • Therapeutic engagement
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
                      CANS improvement ≥20% • Treatment goals achieved • Family functioning improved • School
                      performance gains
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
                      Step-down to Basic package • Permanency achievement • Sustained stability • Community integration
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Reduced psychiatric hospitalizations (≥50%)</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Decreased behavioral incidents (≥40%)</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Improved CANS behavioral domain scores</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Successful medication adherence</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Treatment completion rate (≥70%)</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#A90533] pl-3 py-2 rounded-r">
                  <div className="text-sm text-gray-800 font-medium">• Step-down success rate (≥60%)</div>
                </div>
                <div className="text-sm text-gray-700">• Placement stability (MH-adjusted targets)</div>
                <div className="text-sm text-gray-700">• RCC permanency targets (MH cohort)</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CQI Process */}
      <Card className="border-2 border-[#5E3989]/30">
        <CardHeader className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
          <CardTitle className="text-center text-white">
            Mental & Behavioral Health CQI Process (TAC §749.665)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-[#5E3989]">
              <CardHeader>
                <CardTitle className="text-[#5E3989] text-lg">MH-Specific Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Weekly therapy attendance tracking</li>
                  <li>• Monthly behavioral incident analysis</li>
                  <li>• 90-day CANS trend monitoring</li>
                  <li>• Medication compliance rates</li>
                  <li>• Crisis intervention frequencies</li>
                  <li>• Psychiatric consultation outcomes</li>
                  <li>• Family therapy participation</li>
                  <li>• TBRI® fidelity assessments</li>
                  <li>• Step-down readiness indicators</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#A90533]">
              <CardHeader>
                <CardTitle className="text-[#A90533] text-lg">MH Program Review</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 90-day Service Plan reviews</li>
                  <li>• Treatment Director quarterly analysis</li>
                  <li>• Continued stay criteria evaluation</li>
                  <li>• TBRI® fidelity in therapeutic context</li>
                  <li>• Cross-system coordination effectiveness</li>
                  <li>• Therapist caseload management</li>
                  <li>• Crisis response effectiveness</li>
                  <li>• Aftercare engagement rates</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-[#5E3989]">
              <CardHeader>
                <CardTitle className="text-[#5E3989] text-lg">MH Implementation Adjustments</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Therapeutic approach modifications</li>
                  <li>• Crisis protocol refinements</li>
                  <li>• Behavioral intervention updates</li>
                  <li>• Medication protocol reviews</li>
                  <li>• Step-down criteria adjustments</li>
                  <li>• Family engagement strategies</li>
                  <li>• Training enhancements for MH</li>
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

export default MentalBehavioralLogicModel
