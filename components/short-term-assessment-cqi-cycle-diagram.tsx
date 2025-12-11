import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react"

const ShortTermAssessmentCQICycle = () => {
  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="text-center mb-8 pb-5 border-b-4 border-indigo-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">T3C Short-Term Assessment Support Services</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Continuous Quality Improvement Model</h2>
        <p className="text-base text-gray-600">
          Time-Limited Assessment Package-Specific CQI Process per T3C Blueprint Requirements
        </p>
      </div>

      {/* Package Note */}
      <div className="bg-amber-50 border-2 border-amber-600 rounded-lg p-4 mb-8 text-center">
        <h3 className="text-lg font-bold text-amber-900 mb-2">Short-Term Assessment CQI Framework</h3>
        <p className="text-sm text-amber-800 leading-relaxed">
          This CQI model is specifically designed for monitoring and improving time-limited assessment placements (30-45
          days maximum).
          <br />
          Uses Basic Foster Family Home TBRI foundation with enhanced assessment coordination and rapid transition
          planning metrics.
        </p>
      </div>

      {/* CQI Framework Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Short-Term Assessment Support Services CQI Cycle
        </h2>

        {/* PDSA Grid Layout */}
        <div className="relative max-w-4xl mx-auto p-10">
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            {/* PLAN Quadrant */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-500 rounded-xl p-5 relative">
              <div className="border-b-2 border-gray-200 pb-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">PLAN</h3>
                <span className="text-sm text-gray-600">Day 1-3 of Placement</span>
              </div>
              <div className="text-sm space-y-3">
                <div className="opacity-80">
                  <strong className="text-sm">Tier 1 (Basic):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Review TBRI Logic Model</li>
                    <li>Set stabilization goals</li>
                    <li>Plan family engagement</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-2 rounded border-l-4 border-amber-600">
                  <strong className="text-sm font-semibold">STASS-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Develop comprehensive assessment plan per T3C p.68</li>
                    <li>Schedule all evaluations within timeframe (21-30 days)</li>
                    <li>Coordinate STAR Health assessment services</li>
                    <li>Plan educational enrollment and testing</li>
                    <li>Establish observation/documentation protocols</li>
                    <li>Set transition planning timeline (max 30-45 days)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* DO Quadrant */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-5 relative">
              <div className="border-b-2 border-gray-200 pb-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">DO</h3>
                <span className="text-sm text-gray-600">Days 1-30 (or 1-45)</span>
              </div>
              <div className="text-sm space-y-3">
                <div className="opacity-80">
                  <strong className="text-sm">Tier 1 (Basic):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Implement TBRI Connecting</li>
                    <li>Provide predictable routines</li>
                    <li>Document services</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-2 rounded border-l-4 border-amber-600">
                  <strong className="text-sm font-semibold">STASS-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Conduct CANS 3.0 within 21-30 days (age-dependent)</li>
                    <li>Coordinate all assessments (medical, educational, behavioral)</li>
                    <li>Transport to multiple appointments</li>
                    <li>Document behavioral observations daily</li>
                    <li>Facilitate evaluations through STAR Health</li>
                    <li>Complete school enrollment and testing</li>
                    <li>Engage family in assessment process</li>
                    <li>Develop initial and monthly Service Plan reviews</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* STUDY Quadrant */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-500 rounded-xl p-5 relative">
              <div className="border-b-2 border-gray-200 pb-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">STUDY</h3>
                <span className="text-sm text-gray-600">Days 25-35 (or 40-50)</span>
              </div>
              <div className="text-sm space-y-3">
                <div className="opacity-80">
                  <strong className="text-sm">Tier 1 (Basic):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Review data</li>
                    <li>Analyze TBRI fidelity</li>
                    <li>Identify trends</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-2 rounded border-l-4 border-amber-600">
                  <strong className="text-sm font-semibold">STASS-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Review all assessment results</li>
                    <li>Analyze CANS 3.0 findings</li>
                    <li>Synthesize evaluation data</li>
                    <li>Determine appropriate Service Package</li>
                    <li>Identify placement needs based on assessments</li>
                    <li>Review placement stability during assessment</li>
                    <li>Assess transition readiness</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ACT Quadrant */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-500 rounded-xl p-5 relative">
              <div className="border-b-2 border-gray-200 pb-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">ACT</h3>
                <span className="text-sm text-gray-600">Days 30-45 (or 45-60)</span>
              </div>
              <div className="text-sm space-y-3">
                <div className="opacity-80">
                  <strong className="text-sm">Tier 1 (Basic):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Adjust TBRI approach</li>
                    <li>Enhance supports</li>
                    <li>Update training</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-2 rounded border-l-4 border-amber-600">
                  <strong className="text-sm font-semibold">STASS-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Finalize Service Package recommendation</li>
                    <li>Complete transition plan with receiving agency</li>
                    <li>Transfer all assessment data</li>
                    <li>Brief receiving placement on child's needs</li>
                    <li>Document family engagement for permanency planning</li>
                    <li>Complete transition within time limits</li>
                    <li>Track outcomes for program improvement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Center Circle - Logic Model */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-500 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center p-5 shadow-xl z-10">
            <h4 className="text-base font-bold text-amber-900 leading-tight">
              STASS
              <br />
              Logic Model
            </h4>
            <p className="text-xs text-amber-800 mt-2 leading-snug">
              TBRI Foundation
              <br />+ Assessment Focus
              <br />
              Time-Limited
              <br />
              (30-45 days max)
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">STASS CQI Timeline</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 1-3</h3>
            <p className="text-xs text-gray-600 mb-2">Program Director, Licensed Therapist, Case Manager</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Review assessment needs</li>
              <li>• Schedule evaluations</li>
              <li className="text-amber-600 font-semibold">• Plan CANS 3.0 timeline</li>
              <li className="text-amber-600 font-semibold">• Coordinate STAR Health</li>
              <li className="text-amber-600 font-semibold">• Establish documentation protocols</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 1-30/45</h3>
            <p className="text-xs text-gray-600 mb-2">Case Managers, Foster Parents, Licensed Therapist</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• TBRI implementation</li>
              <li className="text-amber-600 font-semibold">• Conduct all assessments</li>
              <li className="text-amber-600 font-semibold">• Complete CANS 3.0</li>
              <li className="text-amber-600 font-semibold">• Document observations</li>
              <li className="text-amber-600 font-semibold">• School enrollment/testing</li>
              <li className="text-amber-600 font-semibold">• Family engagement</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-pink-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 25-35/40-50</h3>
            <p className="text-xs text-gray-600 mb-2">Licensed Therapist, Treatment Director</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Compile assessment data</li>
              <li>• Analyze all results</li>
              <li className="text-amber-600 font-semibold">• Review CANS findings</li>
              <li className="text-amber-600 font-semibold">• Determine Service Package</li>
              <li className="text-amber-600 font-semibold">• Identify placement match</li>
              <li className="text-amber-600 font-semibold">• Assess transition readiness</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 30-45/45-60</h3>
            <p className="text-xs text-gray-600 mb-2">Full STASS Team</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Finalize recommendations</li>
              <li className="text-amber-600 font-semibold">• Complete transition plan</li>
              <li className="text-amber-600 font-semibold">• Transfer assessment data</li>
              <li className="text-amber-600 font-semibold">• Brief receiving placement</li>
              <li className="text-amber-600 font-semibold">• Execute transition</li>
              <li className="text-amber-600 font-semibold">• Track outcomes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">STASS CQI Metrics</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="p-3 text-left text-sm font-semibold">Logic Model Component</th>
                <th className="p-3 text-left text-sm font-semibold">STASS-Specific Metrics</th>
                <th className="p-3 text-left text-sm font-semibold">Target/Threshold</th>
                <th className="p-3 text-left text-sm font-semibold">Review Frequency</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-amber-50 font-semibold">
                <td className="p-3 border-b">
                  <strong>Referral & Admission</strong>
                </td>
                <td className="p-3 border-b">
                  • Referrals by source (SSCC vs DFPS)
                  <br />• Admission rate from referrals
                  <br />• Denial reasons documented
                  <br />• Time from referral to admission
                </td>
                <td className="p-3 border-b">
                  Tracked per source
                  <br />
                  Target ≥80%
                  <br />
                  100% documented
                  <br />
                  &lt;48 hours
                </td>
                <td className="p-3 border-b">
                  Monthly aggregate
                  <br />
                  Per placement
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Length of Service</td>
                <td className="p-3 border-b">
                  • Average days by child
                  <br />• % within 30-day limit (ages ≤5)
                  <br />• % within 45-day limit (ages 6+)
                  <br />• Extension utilization rate
                </td>
                <td className="p-3 border-b">
                  Tracked per child
                  <br />
                  100% compliance
                  <br />
                  100% compliance
                  <br />
                  &lt;20% extensions
                </td>
                <td className="p-3 border-b">
                  Per placement
                  <br />
                  Monthly aggregate
                </td>
              </tr>
              <tr className="bg-amber-50 font-semibold">
                <td className="p-3 border-b">
                  <strong>Assessment Completion</strong>
                </td>
                <td className="p-3 border-b">
                  • CANS 3.0 within timeframe (21-30 days age-dependent)
                  <br />• Comprehensive assessments coordinated
                  <br />• Medical evaluations completed
                  <br />• Educational testing arranged
                  <br />• STAR Health coordination documented
                </td>
                <td className="p-3 border-b">
                  100% on time
                  <br />
                  100% within timeframe
                  <br />
                  100% completed
                  <br />
                  100% enrolled/tested
                  <br />
                  100% documented
                </td>
                <td className="p-3 border-b">
                  Per placement
                  <br />
                  Monthly aggregate
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Service Planning</td>
                <td className="p-3 border-b">
                  • Initial Service Plan within 30 days
                  <br />• Monthly Service Plan reviews
                  <br />• Licensed Therapist oversight documented
                  <br />• Assessment goals met
                </td>
                <td className="p-3 border-b">
                  100% on time
                  <br />
                  100% monthly
                  <br />
                  100% documented
                  <br />
                  ≥95% achieved
                </td>
                <td className="p-3 border-b">Per placement</td>
              </tr>
              <tr className="bg-amber-50 font-semibold">
                <td className="p-3 border-b">
                  <strong>Stabilization During Assessment</strong>
                </td>
                <td className="p-3 border-b">
                  • Placement stability (no moves during STASS)
                  <br />• Crisis interventions required
                  <br />• TBRI fidelity maintained
                  <br />• Behavioral observations documented
                </td>
                <td className="p-3 border-b">
                  100% stable
                  <br />
                  Minimize frequency
                  <br />
                  ≥85% fidelity
                  <br />
                  100% daily
                </td>
                <td className="p-3 border-b">
                  Per placement
                  <br />
                  Weekly review
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Family Engagement</td>
                <td className="p-3 border-b">
                  • Family identification efforts
                  <br />• Family participation in assessments
                  <br />• Engagement documented in Service Plan
                  <br />• Information shared with SSCC/DFPS
                </td>
                <td className="p-3 border-b">
                  100% attempted
                  <br />
                  When safe/appropriate
                  <br />
                  100% documented
                  <br />
                  100% shared
                </td>
                <td className="p-3 border-b">Per placement</td>
              </tr>
              <tr className="bg-amber-50 font-semibold">
                <td className="p-3 border-b">
                  <strong>Service Package Determination</strong>
                </td>
                <td className="p-3 border-b">
                  • Appropriate package identified
                  <br />• Recommendation based on assessment data
                  <br />• Placement match identified
                  <br />• Timeline for determination
                </td>
                <td className="p-3 border-b">
                  100% determined
                  <br />
                  100% data-driven
                  <br />
                  100% matched
                  <br />
                  By day 30-45
                </td>
                <td className="p-3 border-b">
                  Per placement
                  <br />
                  Quarterly analysis
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Transition Success</td>
                <td className="p-3 border-b">
                  • Successful transitions to identified placement
                  <br />• Assessment data transferred
                  <br />• Receiving placement briefed
                  <br />• Transition within time limits
                </td>
                <td className="p-3 border-b">
                  ≥95% successful
                  <br />
                  100% transferred
                  <br />
                  100% briefed
                  <br />
                  100% on time
                </td>
                <td className="p-3 border-b">
                  Per placement
                  <br />
                  Quarterly aggregate
                </td>
              </tr>
              <tr className="bg-amber-50 font-semibold">
                <td className="p-3 border-b">
                  <strong>Program Efficiency</strong>
                </td>
                <td className="p-3 border-b">
                  • Assessment coordination timeliness
                  <br />• Transportation efficiency
                  <br />• Documentation quality
                  <br />• Foster parent STASS competency
                </td>
                <td className="p-3 border-b">
                  100% on schedule
                  <br />
                  No missed appointments
                  <br />
                  ≥90% quality score
                  <br />
                  ≥85% competency
                </td>
                <td className="p-3 border-b">
                  Weekly tracking
                  <br />
                  Monthly review
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Extension Tracking and Analysis */}
      <div className="mb-8 border-2 border-yellow-500/50 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4">
          <h2 className="text-lg font-bold text-yellow-800 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Extension Tracking and Analysis
          </h2>
          <p className="text-sm text-yellow-700">
            Monitoring extension requests indicates assessment coordination efficiency
          </p>
        </div>
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-yellow-300">
              <h4 className="font-bold text-yellow-800 mb-2">Extension Rate</h4>
              <div className="text-2xl font-bold text-yellow-600">&lt;20%</div>
              <p className="text-xs text-gray-600">of placements • Monthly tracking</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-yellow-300">
              <h4 className="font-bold text-yellow-800 mb-2">Documentation</h4>
              <div className="text-2xl font-bold text-yellow-600">100%</div>
              <p className="text-xs text-gray-600">PD written approval • Per extension</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-yellow-300">
              <h4 className="font-bold text-yellow-800 mb-2">Justification Quality</h4>
              <div className="text-2xl font-bold text-yellow-600">100%</div>
              <p className="text-xs text-gray-600">Meets T3C Blueprint p.72 criteria</p>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <h4 className="font-bold text-yellow-800 text-sm mb-2">Extension Criteria (per policy):</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Additional assessments pending and cannot be expedited</li>
              <li>• Appropriate receiving placement identified but not yet available</li>
              <li>• Service Planning team documents specific reason extension serves child's best interest</li>
              <li>• Program Director approves in writing</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Unknown History Crisis Monitoring */}
      <div className="mb-8 border-2 border-[#A90533]/30 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#A90533]/10 to-[#5E3989]/10 p-4">
          <h2 className="text-lg font-bold text-[#A90533] flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Unknown History Crisis Monitoring
          </h2>
        </div>
        <div className="p-6 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#A90533]/30">
                  <th className="text-left p-2 text-[#A90533]">Metric</th>
                  <th className="text-left p-2 text-[#A90533]">Purpose</th>
                  <th className="text-left p-2 text-[#A90533]">Data Source</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2 font-medium">Crisis incidents in first 72 hours</td>
                  <td className="p-2 text-gray-600">Identify unknown history impacts</td>
                  <td className="p-2 text-gray-600">Incident reports</td>
                </tr>
                <tr className="border-b bg-gradient-to-r from-[#A90533]/5 to-transparent">
                  <td className="p-2 font-medium">Expedited Safety Plan completion</td>
                  <td className="p-2 text-gray-600">Verify 72-hour timeline</td>
                  <td className="p-2 text-gray-600">Case records</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 font-medium">Behavioral pattern documentation</td>
                  <td className="p-2 text-gray-600">Quality of observations</td>
                  <td className="p-2 text-gray-600">Foster parent logs</td>
                </tr>
                <tr className="bg-gradient-to-r from-[#A90533]/5 to-transparent">
                  <td className="p-2 font-medium">Crisis-to-assessment integration</td>
                  <td className="p-2 text-gray-600">Data informing recommendations</td>
                  <td className="p-2 text-gray-600">SP Recommendation form</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Roles Section */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-indigo-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Program Director - STASS Responsibilities</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Oversee STASS time-limited service delivery per T3C Blueprint</li>
            <li>• Monitor assessment coordination effectiveness</li>
            <li className="text-amber-600 font-semibold">• Track length of service compliance (30-45 day limits)</li>
            <li className="text-amber-600 font-semibold">• Review referral/admission/denial data monthly</li>
            <li>• Lead STASS-specific CQI reviews</li>
            <li>• Approve Logic Model modifications based on outcomes</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-green-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Treatment Director - STASS Specific</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li className="text-amber-600 font-semibold">• Supervise Licensed Therapist assessment coordination</li>
            <li className="text-amber-600 font-semibold">• Review assessment completion timelines</li>
            <li className="text-amber-600 font-semibold">• Oversee Service Package determinations</li>
            <li className="text-amber-600 font-semibold">• Ensure assessment quality and thoroughness</li>
            <li>• Monitor TBRI fidelity during short-term placement</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-pink-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Licensed Therapist - STASS Team</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li className="text-amber-600 font-semibold">• Oversee comprehensive assessment coordination</li>
            <li className="text-amber-600 font-semibold">• Administer or coordinate CANS 3.0 within timeframe</li>
            <li className="text-amber-600 font-semibold">• Lead Service Planning team meetings</li>
            <li className="text-amber-600 font-semibold">• Synthesize assessment data for recommendations</li>
            <li className="text-amber-600 font-semibold">• Determine appropriate Service Package</li>
            <li className="text-amber-600 font-semibold">• Document assessment findings comprehensively</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-orange-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Case Managers - STASS Enhanced</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Implement TBRI for stabilization</li>
            <li className="text-amber-600 font-semibold">• Coordinate all assessment appointments (1:12 ratio)</li>
            <li className="text-amber-600 font-semibold">• Document behavioral observations daily</li>
            <li className="text-amber-600 font-semibold">• Facilitate STAR Health coordination</li>
            <li className="text-amber-600 font-semibold">• Support school enrollment and testing</li>
            <li className="text-amber-600 font-semibold">• Engage family in assessment process</li>
            <li className="text-amber-600 font-semibold">• Execute transition plan within timeline</li>
          </ul>
        </div>
      </div>

      {/* Outcomes Section */}
      <div className="bg-gradient-to-r from-[#A90533] to-[#5E3989] text-white p-6 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Short-Term Assessment CQI Outcomes</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">Assessment Completion</h4>
            <p className="text-sm opacity-90">
              Comprehensive evaluations within required timeframes for informed placement decisions
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">Placement Stability</h4>
            <p className="text-sm opacity-90">Zero moves during assessment period through TBRI-based stabilization</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">Service Package Match</h4>
            <p className="text-sm opacity-90">Data-driven recommendations ensuring appropriate long-term placement</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">Successful Transitions</h4>
            <p className="text-sm opacity-90">
              Smooth handoffs with complete assessment data transfer within time limits
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default ShortTermAssessmentCQICycle
