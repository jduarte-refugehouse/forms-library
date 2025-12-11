"use client"

import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

const SubstanceUseCQICycle = () => {
  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="text-center mb-8 pb-5 border-b-4 border-emerald-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">T3C Substance Use Support Services</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Continuous Quality Improvement Model</h2>
        <p className="text-base text-gray-600">
          Recovery-Oriented Package-Specific CQI Process per T3C Blueprint Requirements
        </p>
      </div>

      {/* Package Note */}
      <div className="bg-emerald-50 border-2 border-emerald-600 rounded-lg p-4 mb-8 text-center">
        <h3 className="text-lg font-bold text-emerald-900 mb-2">Substance Use CQI Framework</h3>
        <p className="text-sm text-emerald-800 leading-relaxed">
          This CQI model is specifically designed for monitoring and improving recovery-oriented services for youth with
          substance use disorders.
          <br />
          Uses Basic Foster Family Home TBRI foundation with enhanced recovery metrics, relapse response tracking, and
          non-punitive intervention monitoring.
        </p>
      </div>

      {/* CQI Framework Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Substance Use Support Services CQI Cycle
        </h2>

        {/* PDSA Grid Layout */}
        <div className="relative max-w-4xl mx-auto p-10">
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            {/* PLAN Quadrant */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-500 rounded-xl p-5 relative">
              <div className="border-b-2 border-gray-200 pb-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">PLAN</h3>
                <span className="text-sm text-gray-600">Beginning of 90-Day Cycle</span>
              </div>
              <div className="text-sm space-y-3">
                <div className="opacity-80">
                  <strong className="text-sm">Tier 1 (Basic):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Review TBRI Logic Model</li>
                    <li>Set TBRI®-aligned goals</li>
                    <li>Plan family engagement</li>
                  </ul>
                </div>
                <div className="bg-emerald-50 p-2 rounded border-l-4 border-emerald-600">
                  <strong className="text-sm font-semibold">SU-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Review recovery progress and goals</li>
                    <li>Plan SU treatment coordination</li>
                    <li>Set recovery milestones per T3C</li>
                    <li>Schedule SU-qualified therapy sessions</li>
                    <li>Plan trigger management interventions</li>
                    <li>Review human trafficking screening compliance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* DO Quadrant */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-5 relative">
              <div className="border-b-2 border-gray-200 pb-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">DO</h3>
                <span className="text-sm text-gray-600">Days 1-75</span>
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
                <div className="bg-emerald-50 p-2 rounded border-l-4 border-emerald-600">
                  <strong className="text-sm font-semibold">SU-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Deliver weekly individual therapy (SU-qualified)</li>
                    <li>Implement non-punitive relapse response</li>
                    <li>Coordinate substance use treatment services</li>
                    <li>Conduct drug screening as clinical tool</li>
                    <li>Develop trigger management and coping skills</li>
                    <li>Maintain substance-free environment</li>
                    <li>Connect to recovery community resources</li>
                    <li>Complete CANS 3.0 every 90 days</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* STUDY Quadrant */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-pink-500 rounded-xl p-5 relative">
              <div className="border-b-2 border-gray-200 pb-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">STUDY</h3>
                <span className="text-sm text-gray-600">Days 76-85</span>
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
                <div className="bg-emerald-50 p-2 rounded border-l-4 border-emerald-600">
                  <strong className="text-sm font-semibold">SU-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Analyze CANS 3.0 recovery-related scores</li>
                    <li>Review recovery progress trends</li>
                    <li>Evaluate relapse patterns and responses</li>
                    <li>Assess treatment engagement metrics</li>
                    <li>Review drug screening patterns (clinical)</li>
                    <li>Analyze crisis intervention effectiveness</li>
                    <li>Evaluate step-down readiness</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* ACT Quadrant */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-500 rounded-xl p-5 relative">
              <div className="border-b-2 border-gray-200 pb-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">ACT</h3>
                <span className="text-sm text-gray-600">Days 86-90</span>
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
                <div className="bg-emerald-50 p-2 rounded border-l-4 border-emerald-600">
                  <strong className="text-sm font-semibold">SU-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Modify treatment modality/frequency as needed</li>
                    <li>Update relapse response protocols</li>
                    <li>Enhance trigger management strategies</li>
                    <li>Adjust recovery support intensity</li>
                    <li>Plan step-down to Basic or aftercare</li>
                    <li>Document Program Director 90-day review</li>
                    <li>Track post-discharge stability outcomes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Center Circle - Logic Model */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-emerald-100 to-teal-200 border-4 border-emerald-500 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center p-5 shadow-xl z-10">
            <h4 className="text-base font-bold text-emerald-900 leading-tight">
              Substance Use
              <br />
              Logic Model
            </h4>
            <p className="text-xs text-emerald-800 mt-2 leading-snug">
              TBRI® Foundation
              <br />+ Recovery-Oriented
              <br />
              Non-Punitive
              <br />
              90-Day Review Cycle
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Substance Use CQI Timeline</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Beginning of 90-Day Cycle</h3>
            <p className="text-xs text-gray-600 mb-2">Program Director, Treatment Director, CQI Coordinator</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Review SU service delivery</li>
              <li>• Set recovery targets</li>
              <li className="text-emerald-600 font-semibold">• Plan SU treatment coordination</li>
              <li className="text-emerald-600 font-semibold">• Schedule therapy sessions</li>
              <li className="text-emerald-600 font-semibold">• Review human trafficking screening</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 1-75</h3>
            <p className="text-xs text-gray-600 mb-2">Therapists, Case Managers, Foster Parents</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• TBRI® implementation</li>
              <li className="text-emerald-600 font-semibold">• Weekly individual therapy</li>
              <li className="text-emerald-600 font-semibold">• SU treatment services</li>
              <li className="text-emerald-600 font-semibold">• Drug screening (clinical)</li>
              <li className="text-emerald-600 font-semibold">• Relapse response per protocol</li>
              <li className="text-emerald-600 font-semibold">• Recovery community connections</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-pink-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 76-85</h3>
            <p className="text-xs text-gray-600 mb-2">CQI Coordinator, Treatment Director</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Compile recovery data</li>
              <li>• Analyze CANS 3.0 results</li>
              <li className="text-emerald-600 font-semibold">• Review recovery trends</li>
              <li className="text-emerald-600 font-semibold">• Analyze relapse patterns</li>
              <li className="text-emerald-600 font-semibold">• Evaluate treatment engagement</li>
              <li className="text-emerald-600 font-semibold">• Assess step-down readiness</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 86-90</h3>
            <p className="text-xs text-gray-600 mb-2">Full SU CQI Team</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Recovery team meeting</li>
              <li>• Review all SU outcomes</li>
              <li className="text-emerald-600 font-semibold">• Adjust treatment plans</li>
              <li className="text-emerald-600 font-semibold">• Update relapse protocols</li>
              <li className="text-emerald-600 font-semibold">• Plan step-down/aftercare</li>
              <li className="text-emerald-600 font-semibold">• Track discharge outcomes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Substance Use CQI Metrics</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="p-3 text-left text-sm font-semibold">Logic Model Component</th>
                <th className="p-3 text-left text-sm font-semibold">SU-Specific Metrics</th>
                <th className="p-3 text-left text-sm font-semibold">Target/Threshold</th>
                <th className="p-3 text-left text-sm font-semibold">Review Frequency</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-emerald-50 font-semibold">
                <td className="p-3 border-b">
                  <strong>T3C Compliance</strong>
                </td>
                <td className="p-3 border-b">
                  • CANS assessments within timeline
                  <br />• Substance use assessments within 30 days
                  <br />• 90-day Service Plan reviews completed
                  <br />• Staffing ratios maintained
                </td>
                <td className="p-3 border-b">
                  100%
                  <br />
                  100%
                  <br />
                  100%
                  <br />
                  100%
                </td>
                <td className="p-3 border-b">
                  Monthly
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Therapeutic Services</td>
                <td className="p-3 border-b">
                  • Weekly therapy attendance (SU-qualified)
                  <br />• SU treatment engagement
                  <br />• Family therapy participation
                  <br />• MAT coordination (when applicable)
                </td>
                <td className="p-3 border-b">
                  95%+
                  <br />
                  Per recommendation
                  <br />
                  As indicated
                  <br />
                  Per clinical need
                </td>
                <td className="p-3 border-b">
                  Weekly tracking
                  <br />
                  Monthly review
                </td>
              </tr>
              <tr className="bg-emerald-50 font-semibold">
                <td className="p-3 border-b">
                  <strong>Recovery Progress</strong>
                </td>
                <td className="p-3 border-b">
                  • Recovery progress documented
                  <br />• Relapse response within protocol
                  <br />• Trigger management skill development
                  <br />• CANS score improvement
                </td>
                <td className="p-3 border-b">
                  100% of cases
                  <br />
                  100%
                  <br />
                  Measurable progress
                  <br />
                  Improvement trend
                </td>
                <td className="p-3 border-b">
                  Monthly
                  <br />
                  Per incident
                  <br />
                  Quarterly
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Substance Use Monitoring</td>
                <td className="p-3 border-b">
                  • Drug screening completion per protocol
                  <br />• Screening results as clinical indicator
                  <br />• Substance use frequency trend
                  <br />• Non-punitive response verification
                </td>
                <td className="p-3 border-b">
                  Per protocol
                  <br />
                  Documented
                  <br />
                  Decreasing
                  <br />
                  100%
                </td>
                <td className="p-3 border-b">
                  Per screening
                  <br />
                  Monthly review
                </td>
              </tr>
              <tr className="bg-emerald-50 font-semibold">
                <td className="p-3 border-b">
                  <strong>Placement Stability</strong>
                </td>
                <td className="p-3 border-b">
                  • Placement stability rate
                  <br />• Unplanned placement changes
                  <br />• Foster parent retention (SU trained)
                  <br />• Substance-free environment compliance
                </td>
                <td className="p-3 border-b">
                  85%+
                  <br />
                  &lt;15%
                  <br />
                  90%+
                  <br />
                  100%
                </td>
                <td className="p-3 border-b">
                  Monthly
                  <br />
                  Quarterly
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Crisis Management</td>
                <td className="p-3 border-b">
                  • Crisis incident frequency
                  <br />• Crisis response time
                  <br />• De-escalation success rate
                  <br />• Relapse-related crisis tracking
                </td>
                <td className="p-3 border-b">
                  Decreasing trend
                  <br />
                  &lt;1 hour
                  <br />
                  ≥85%
                  <br />
                  Documented
                </td>
                <td className="p-3 border-b">
                  Per incident
                  <br />
                  Monthly analysis
                </td>
              </tr>
              <tr className="bg-emerald-50 font-semibold">
                <td className="p-3 border-b">
                  <strong>Post-Discharge Stability</strong>
                </td>
                <td className="p-3 border-b">
                  • 30-day recovery stability
                  <br />• 60-day recovery stability
                  <br />• 90-day recovery stability
                  <br />• No re-entry to care
                </td>
                <td className="p-3 border-b">
                  90%+
                  <br />
                  85%+
                  <br />
                  80%+
                  <br />
                  90%+
                </td>
                <td className="p-3 border-b">
                  Per discharge
                  <br />
                  Quarterly aggregate
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Relapse Response Analysis */}
      <div className="mb-8 border-2 border-emerald-500/30 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4">
          <h2 className="text-lg font-bold text-center flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Relapse Response Analysis
          </h2>
          <p className="text-center text-white/90 text-sm">
            Non-Punitive Review - Relapse as Treatment Issue
          </p>
        </div>
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Analysis Components */}
            <div>
              <h4 className="font-bold text-emerald-800 mb-3">Review Components:</h4>
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 pl-3 py-2 rounded-r">
                  <div className="text-sm font-medium">Relapse Frequency</div>
                  <div className="text-xs text-gray-600">Track patterns over time (clinical data)</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 pl-3 py-2 rounded-r">
                  <div className="text-sm font-medium">Trigger Identification</div>
                  <div className="text-xs text-gray-600">Document preceding circumstances</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 pl-3 py-2 rounded-r">
                  <div className="text-sm font-medium">Response Protocol Adherence</div>
                  <div className="text-xs text-gray-600">Verify non-punitive approach used</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 pl-3 py-2 rounded-r">
                  <div className="text-sm font-medium">Treatment Adjustment</div>
                  <div className="text-xs text-gray-600">What changes were made post-relapse</div>
                </div>
              </div>
            </div>
            
            {/* Recovery Progress Indicators */}
            <div>
              <h4 className="font-bold text-teal-800 mb-3">Recovery Progress Indicators:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-green-800">Increasing recovery periods</div>
                    <div className="text-xs text-green-600">Positive trajectory</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-green-800">Faster return to stability</div>
                    <div className="text-xs text-green-600">Treatment effectiveness</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-500">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div>
                    <div className="text-sm font-medium text-yellow-800">Stable but not improving</div>
                    <div className="text-xs text-yellow-600">Treatment adjustment needed</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-red-50 rounded border-l-4 border-red-500">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <div>
                    <div className="text-sm font-medium text-red-800">Escalating pattern</div>
                    <div className="text-xs text-red-600">Intensive review needed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roles Section */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-indigo-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Program Director - SU Responsibilities</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Oversee SU service package delivery per T3C Blueprint</li>
            <li>• Monitor TBRI® implementation in recovery context</li>
            <li className="text-emerald-600 font-semibold">• Review 90-day continued stay criteria</li>
            <li className="text-emerald-600 font-semibold">• Provide written confirmations within 15 business days</li>
            <li>• Lead SU-specific CQI reviews</li>
            <li>• Approve Logic Model modifications based on recovery outcomes</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-green-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Treatment Director - SU Specific</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li className="text-emerald-600 font-semibold">• Supervise SU-qualified licensed therapists</li>
            <li className="text-emerald-600 font-semibold">• Oversee substance use treatment coordination</li>
            <li className="text-emerald-600 font-semibold">• Review relapse response protocol adherence</li>
            <li className="text-emerald-600 font-semibold">• Monitor non-punitive approach implementation</li>
            <li className="text-emerald-600 font-semibold">• Coordinate MAT services when appropriate</li>
            <li>• Approve step-down transitions and aftercare plans</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-pink-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Licensed Therapists - SU Team</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li className="text-emerald-600 font-semibold">• Provide weekly individual therapy (SU-qualified)</li>
            <li className="text-emerald-600 font-semibold">• Coordinate substance use treatment services</li>
            <li className="text-emerald-600 font-semibold">• Implement non-punitive relapse response</li>
            <li className="text-emerald-600 font-semibold">• Develop trigger management and coping skills</li>
            <li className="text-emerald-600 font-semibold">• Conduct family therapy addressing SU impacts</li>
            <li className="text-emerald-600 font-semibold">• Document recovery progress per T3C</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-orange-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Case Managers - SU Enhanced</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Implement TBRI® in recovery-supportive context</li>
            <li className="text-emerald-600 font-semibold">• Coordinate SU services (1:15 ratio)</li>
            <li className="text-emerald-600 font-semibold">• Ensure therapy attendance (95%+ weekly)</li>
            <li className="text-emerald-600 font-semibold">• Connect to recovery community resources</li>
            <li className="text-emerald-600 font-semibold">• Support foster parents with SU awareness</li>
            <li className="text-emerald-600 font-semibold">• Navigate STAR Health for SU services</li>
          </ul>
        </div>
      </div>

      {/* Outcomes Section */}
      <div className="bg-gradient-to-r from-[#A90533] to-[#5E3989] text-white p-6 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Substance Use CQI Outcomes</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🌱 Recovery Progress</h4>
            <p className="text-sm opacity-90">
              Achieved through trauma-informed, non-punitive treatment and relapse support
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🏠 Placement Stability</h4>
            <p className="text-sm opacity-90">Supported by trained foster parents and recovery-focused environment</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🤝 Treatment Engagement</h4>
            <p className="text-sm opacity-90">
              Maintained through connection, non-judgment, and comprehensive services
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🔗 Community Connection</h4>
            <p className="text-sm opacity-90">
              Established through recovery resources, aftercare, and sustained support
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubstanceUseCQICycle

