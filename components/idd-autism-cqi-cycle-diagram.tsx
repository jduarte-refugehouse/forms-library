"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function IddAutismCqiCycleDiagram() {
  return (
    <div className="w-full bg-white">
      {/* CQI Framework Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">IDD/Autism Support Services CQI Cycle</h2>

        {/* PDSA Grid Layout */}
        <div className="relative max-w-4xl mx-auto p-10">
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            {/* PLAN Quadrant */}
            <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-500 rounded-xl p-5 relative">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">PLAN</CardTitle>
                <span className="text-sm text-gray-600">Beginning of 90-Day Cycle</span>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="opacity-80">
                  <strong className="text-sm">Tier 1 (Basic):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Review Logic Model</li>
                    <li>Set TBRI®-aligned goals</li>
                    <li>Develop intervention strategies</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <strong className="text-sm font-semibold">IDD-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Plan developmental assessments</li>
                    <li>Schedule specialized therapies per T3C p.125</li>
                    <li>Coordinate with RN for care plans</li>
                    <li>Plan life skills training modules</li>
                    <li>Review communication strategies within TBRI®</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* DO Quadrant */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-5 relative">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">DO</CardTitle>
                <span className="text-sm text-gray-600">Days 1-75</span>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="opacity-80">
                  <strong className="text-sm">Tier 1 (Basic):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Implement TBRI® Connecting daily</li>
                    <li>Document all services</li>
                    <li>Family engagement per TBRI®</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <strong className="text-sm font-semibold">IDD-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Conduct specialized therapy sessions (required)</li>
                    <li>Implement behavioral interventions using TBRI® Correcting</li>
                    <li>Provide life skills training</li>
                    <li>Support communication development</li>
                    <li>Monitor medical/nursing needs per RN care plan</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* STUDY Quadrant */}
            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-500 rounded-xl p-5 relative">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">STUDY</CardTitle>
                <span className="text-sm text-gray-600">Days 76-85</span>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="opacity-80">
                  <strong className="text-sm">Tier 1 (Basic):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Analyze data</li>
                    <li>Compare to model</li>
                    <li>Identify trends</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <strong className="text-sm font-semibold">IDD-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Review 90-day CANS results</li>
                    <li>Assess developmental progress (≥85%)</li>
                    <li>Evaluate life skills achievements</li>
                    <li>Analyze communication gains</li>
                    <li>Review educational outcomes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* ACT Quadrant */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-500 rounded-xl p-5 relative">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">ACT</CardTitle>
                <span className="text-sm text-gray-600">Days 86-90</span>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <div className="opacity-80">
                  <strong className="text-sm">Tier 1 (Basic):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Refine TBRI® implementation</li>
                    <li>Adjust service approaches</li>
                    <li>Enhance training as needed</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <strong className="text-sm font-semibold">IDD-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Adjust developmental interventions per needs</li>
                    <li>Update behavioral plans with TBRI® strategies</li>
                    <li>Modify communication strategies based on data</li>
                    <li>Revise life skills curriculum</li>
                    <li>Plan transitions or aftercare services</li>
                    <li>Document Program Director confirmation (15-day)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Center Circle - Logic Model */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-500 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center p-5 shadow-xl z-10">
            <h4 className="text-base font-bold text-amber-900 leading-tight">
              IDD/Autism
              <br />
              Logic Model
            </h4>
            <p className="text-xs text-amber-800 mt-2 leading-snug">
              TBRI® Foundation
              <br />+ Developmental Services
              <br />
              90-Day Review Cycle
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">IDD/Autism Support Services CQI Timeline</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Beginning of 90-Day Cycle</h3>
            <p className="text-xs text-gray-600 mb-2">Program Director, Treatment Director, RN, QA Team</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Review IDD service delivery</li>
              <li>• Set developmental targets</li>
              <li className="font-semibold">• Plan therapy schedules</li>
              <li className="font-semibold">• Review RN care plans</li>
              <li className="font-semibold">• Update communication strategies</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 1-75</h3>
            <p className="text-xs text-gray-600 mb-2">Therapists, RN, Case Managers, Foster Parents</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• TBRI® implementation</li>
              <li className="font-semibold">• Specialized therapy sessions</li>
              <li className="font-semibold">• Life skills training</li>
              <li className="font-semibold">• Communication interventions</li>
              <li className="font-semibold">• Behavioral support</li>
              <li className="font-semibold">• RN care plan monitoring</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-pink-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 76-85</h3>
            <p className="text-xs text-gray-600 mb-2">QA Coordinator, Treatment Director, RN</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Compile developmental data</li>
              <li>• Analyze CANS results</li>
              <li className="font-semibold">• Review therapy attendance</li>
              <li className="font-semibold">• Assess skill achievements</li>
              <li className="font-semibold">• Evaluate communication progress</li>
              <li className="font-semibold">• Determine continued stay</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Day 86-90</h3>
            <p className="text-xs text-gray-600 mb-2">Full IDD CQI Team</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Treatment team meeting</li>
              <li>• Review all outcomes</li>
              <li className="font-semibold">• Adjust developmental plans</li>
              <li className="font-semibold">• Modify therapy approaches</li>
              <li className="font-semibold">• Update behavioral supports</li>
              <li className="font-semibold">• Plan transition services</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">IDD/Autism Support Services CQI Metrics</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="p-3 text-left text-sm font-semibold">Logic Model Component</th>
                <th className="p-3 text-left text-sm font-semibold">IDD-Specific Metrics</th>
                <th className="p-3 text-left text-sm font-semibold">Target/Threshold</th>
                <th className="p-3 text-left text-sm font-semibold">Review Frequency</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 font-semibold">
                <td className="p-3 border-b">TBRI® Implementation</td>
                <td className="p-3 border-b">
                  • Staff TBRI® Practitioner competency
                  <br />• TBRI® fidelity with IDD adaptations
                  <br />• Caregiver TBRI® implementation scores
                  <br />• Crisis de-escalation using IDEAL Response®
                </td>
                <td className="p-3 border-b">
                  ≥90% competency
                  <br />
                  Documented in sessions
                  <br />
                  ≥85% fidelity
                  <br />
                  100% utilization
                </td>
                <td className="p-3 border-b">
                  Quarterly assessment
                  <br />
                  Monthly review
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Developmental Progress</td>
                <td className="p-3 border-b">
                  • Developmental milestone achievements
                  <br />• Adaptive behavior assessments
                  <br />• Life skills goal attainment
                  <br />• Independence in daily activities
                </td>
                <td className="p-3 border-b">
                  Documented progress
                  <br />
                  ≥15% improvement
                  <br />
                  ≥70% goals met
                  <br />
                  Increasing trend
                </td>
                <td className="p-3 border-b">
                  Monthly monitoring
                  <br />
                  90-day comprehensive
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Therapeutic Services</td>
                <td className="p-3 border-b">
                  • IDD-specialized therapy attendance
                  <br />• Speech/communication therapy
                  <br />• Occupational therapy participation
                  <br />• Family therapy engagement
                </td>
                <td className="p-3 border-b">
                  ≥85% attendance
                  <br />
                  Per care plan
                  <br />
                  As prescribed
                  <br />
                  Monthly minimum
                </td>
                <td className="p-3 border-b">
                  Weekly monitoring
                  <br />
                  Monthly review
                </td>
              </tr>
              <tr className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 font-semibold">
                <td className="p-3 border-b">CANS Assessment</td>
                <td className="p-3 border-b">
                  • 90-day CANS completion <span className="text-gray-500 italic">(vs 6-month Basic)</span>
                  <br />• Developmental domain improvements
                  <br />• Life skills progress
                  <br />• Strengths development
                </td>
                <td className="p-3 border-b">
                  100% on time
                  <br />
                  ≥15% improvement
                  <br />
                  Measurable gains
                  <br />
                  Increase in scores
                </td>
                <td className="p-3 border-b">Every 90 days</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Communication Development</td>
                <td className="p-3 border-b">
                  • Communication skill improvements
                  <br />• Alternative communication methods
                  <br />• Social interaction progress
                  <br />• Receptive/expressive language gains
                </td>
                <td className="p-3 border-b">
                  Documented gains
                  <br />
                  Successfully implemented
                  <br />
                  Measurable progress
                  <br />
                  Per assessment tools
                </td>
                <td className="p-3 border-b">Monthly</td>
              </tr>
              <tr className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 font-semibold">
                <td className="p-3 border-b">Medical/Nursing Care</td>
                <td className="p-3 border-b">
                  • RN consultations completed
                  <br />• Medical care plan updates
                  <br />• Medication management
                  <br />• Adaptive equipment utilization
                </td>
                <td className="p-3 border-b">
                  24/7 availability
                  <br />
                  Monthly minimum
                  <br />
                  Per physician orders
                  <br />
                  As prescribed
                </td>
                <td className="p-3 border-b">Weekly/Monthly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles Section */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        <Card className="bg-gray-50 p-5 rounded-lg border-t-4 border-indigo-500">
          <CardHeader>
            <CardTitle className="text-base font-bold mb-3 text-gray-800">
              Program Director - IDD Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 leading-relaxed">
              <li>• Oversee IDD service package delivery per T3C Blueprint</li>
              <li>• Monitor TBRI® implementation across all services</li>
              <li className="font-semibold">• Review continued stay criteria every 90 days</li>
              <li className="font-semibold">• Provide written confirmations within 15 business days</li>
              <li>• Lead IDD-specific CQI reviews with TBRI® focus</li>
              <li>• Approve Logic Model modifications based on CQI</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 p-5 rounded-lg border-t-4 border-green-500">
          <CardHeader>
            <CardTitle className="text-base font-bold mb-3 text-gray-800">Treatment Director - IDD Specific</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 leading-relaxed">
              <li className="font-semibold">• Supervise IDD-specialized therapists</li>
              <li className="font-semibold">• Review developmental interventions</li>
              <li className="font-semibold">• Oversee behavioral support plans</li>
              <li className="font-semibold">• Coordinate with special education</li>
              <li className="font-semibold">• Lead treatment team meetings</li>
              <li className="font-semibold">• Approve transition planning</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 p-5 rounded-lg border-t-4 border-pink-500">
          <CardHeader>
            <CardTitle className="text-base font-bold mb-3 text-gray-800">Registered Nurse - IDD Team</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 leading-relaxed">
              <li className="font-semibold">• Provide 24/7 consultation availability</li>
              <li className="font-semibold">• Develop and update custom care plans</li>
              <li className="font-semibold">• Train caregivers on medical needs</li>
              <li className="font-semibold">• Oversee medication protocols</li>
              <li className="font-semibold">• Coordinate with developmental specialists</li>
              <li className="font-semibold">• Participate in 90-day Service Plan reviews</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 p-5 rounded-lg border-t-4 border-orange-500">
          <CardHeader>
            <CardTitle className="text-base font-bold mb-3 text-gray-800">Case Managers - IDD Enhanced</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 leading-relaxed">
              <li>• Implement TBRI® with IDD adaptations</li>
              <li>• Coordinate all IDD services per Service Plan</li>
              <li className="font-semibold">• Ensure therapy attendance (≥85% target)</li>
              <li className="font-semibold">• Monitor developmental progress daily</li>
              <li className="font-semibold">• Document skill achievements using TBRI® framework</li>
              <li className="font-semibold">• Facilitate family engagement per TBRI® Connecting</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Outcomes Section */}
      <div className="bg-gradient-to-r from-[#A90533] to-[#5E3989] text-white p-6 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">IDD/Autism Support Services CQI Outcomes</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🧩 Developmental Progress</h4>
            <p className="text-sm opacity-90">Achieved through specialized interventions and consistent support</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">💬 Communication Gains</h4>
            <p className="text-sm opacity-90">Supported by speech therapy and alternative communication methods</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🎯 Life Skills Mastery</h4>
            <p className="text-sm opacity-90">Accomplished via structured training and practice opportunities</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🏡 Community Integration</h4>
            <p className="text-sm opacity-90">Enabled by adaptive supports and comprehensive aftercare</p>
          </div>
        </div>
      </div>
    </div>
  )
}
