const MentalBehavioralCQICycle = () => {
  return (
    <div className="w-full bg-white">
      {/* CQI Framework Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Mental & Behavioral Health Support Services CQI Cycle
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
                    <li>Review Logic Model</li>
                    <li>Set TBRI®-aligned goals</li>
                    <li>Develop intervention strategies</li>
                  </ul>
                </div>
                <div className="bg-teal-50 p-2 rounded border-l-4 border-teal-600">
                  <strong className="text-sm font-semibold">MH-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Schedule weekly therapy per T3C p.77</li>
                    <li>Develop TBRI®-informed crisis protocols</li>
                    <li>Plan therapeutic family engagement</li>
                    <li>Review psychotropic medications</li>
                    <li>Set behavioral intervention goals within TBRI®</li>
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
                    <li>Implement TBRI® Connecting daily</li>
                    <li>Document all services</li>
                    <li>Family engagement per TBRI®</li>
                  </ul>
                </div>
                <div className="bg-teal-50 p-2 rounded border-l-4 border-teal-600">
                  <strong className="text-sm font-semibold">MH-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Conduct weekly individual therapy (required)</li>
                    <li>Facilitate family therapy with TBRI® integration</li>
                    <li>Monitor medication compliance daily</li>
                    <li>Implement behavioral plans using TBRI® Correcting</li>
                    <li>Provide 24/7 crisis response per protocol</li>
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
                    <li>Analyze data</li>
                    <li>Compare to model</li>
                    <li>Identify trends</li>
                  </ul>
                </div>
                <div className="bg-teal-50 p-2 rounded border-l-4 border-teal-600">
                  <strong className="text-sm font-semibold">MH-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Review 90-day CANS results</li>
                    <li>Assess therapy attendance (≥90%)</li>
                    <li>Analyze crisis incident patterns</li>
                    <li>Evaluate medication effectiveness</li>
                    <li>Determine step-down readiness</li>
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
                    <li>Refine TBRI® implementation</li>
                    <li>Adjust service approaches</li>
                    <li>Enhance training as needed</li>
                  </ul>
                </div>
                <div className="bg-teal-50 p-2 rounded border-l-4 border-teal-600">
                  <strong className="text-sm font-semibold">MH-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Adjust therapy frequency/modality per needs</li>
                    <li>Update behavioral plans with TBRI® strategies</li>
                    <li>Revise crisis protocols based on data</li>
                    <li>Modify medication regimens (with psychiatrist)</li>
                    <li>Plan transitions or aftercare services</li>
                    <li>Document Program Director confirmation (15-day)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Center Circle - Logic Model */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-500 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center p-5 shadow-xl z-10">
            <h4 className="text-base font-bold text-amber-900 leading-tight">
              Mental & Behavioral Health
              <br />
              Logic Model
            </h4>
            <p className="text-xs text-amber-800 mt-2 leading-snug">
              TBRI® Foundation
              <br />+ Therapeutic Services
              <br />
              90-Day Review Cycle
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Mental & Behavioral Health CQI Timeline</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Beginning of 90-Day Cycle</h3>
            <p className="text-xs text-gray-600 mb-2">Program Director, Treatment Director, QA Team</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Review MH service delivery</li>
              <li>• Set therapeutic targets</li>
              <li className="font-semibold">• Plan therapy schedules</li>
              <li className="font-semibold">• Review medication protocols</li>
              <li className="font-semibold">• Update crisis plans</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 1-75</h3>
            <p className="text-xs text-gray-600 mb-2">Therapists, Case Managers, Foster Parents</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• TBRI® implementation</li>
              <li className="font-semibold">• Weekly individual therapy</li>
              <li className="font-semibold">• Family therapy sessions</li>
              <li className="font-semibold">• Behavioral interventions</li>
              <li className="font-semibold">• Crisis management</li>
              <li className="font-semibold">• Medication monitoring</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-pink-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 76-85</h3>
            <p className="text-xs text-gray-600 mb-2">QA Coordinator, Treatment Director</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Compile therapy data</li>
              <li>• Analyze CANS results</li>
              <li className="font-semibold">• Review therapy attendance</li>
              <li className="font-semibold">• Assess crisis incidents</li>
              <li className="font-semibold">• Evaluate medication compliance</li>
              <li className="font-semibold">• Determine continued stay</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Day 86-90</h3>
            <p className="text-xs text-gray-600 mb-2">Full MH CQI Team</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Treatment team meeting</li>
              <li>• Review all outcomes</li>
              <li className="font-semibold">• Adjust treatment plans</li>
              <li className="font-semibold">• Modify therapy frequency</li>
              <li className="font-semibold">• Update behavioral plans</li>
              <li className="font-semibold">• Plan aftercare services</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Mental & Behavioral Health CQI Metrics</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="p-3 text-left text-sm font-semibold">Logic Model Component</th>
                <th className="p-3 text-left text-sm font-semibold">MH-Specific Metrics</th>
                <th className="p-3 text-left text-sm font-semibold">Target/Threshold</th>
                <th className="p-3 text-left text-sm font-semibold">Review Frequency</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-teal-50 font-semibold">
                <td className="p-3 border-b">TBRI® Implementation</td>
                <td className="p-3 border-b">
                  • Staff TBRI® Practitioner competency
                  <br />• TBRI® fidelity in therapy sessions
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
                <td className="p-3 border-b">Therapeutic Services</td>
                <td className="p-3 border-b">
                  • Weekly individual therapy attendance
                  <br />• Family therapy participation
                  <br />• Group therapy engagement
                  <br />• Psychiatric consultation frequency
                </td>
                <td className="p-3 border-b">
                  ≥90% attendance
                  <br />
                  Monthly minimum
                  <br />
                  As indicated
                  <br />
                  Quarterly minimum
                </td>
                <td className="p-3 border-b">
                  Weekly monitoring
                  <br />
                  Monthly review
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">CANS Assessment</td>
                <td className="p-3 border-b">
                  • 90-day CANS completion <span className="text-gray-500 italic">(vs 6-month Basic)</span>
                  <br />• Behavioral domain improvements
                  <br />• Risk behavior reductions
                  <br />• Strengths development
                </td>
                <td className="p-3 border-b">
                  100% on time
                  <br />
                  ≥20% improvement
                  <br />
                  Decrease in scores
                  <br />
                  Increase in scores
                </td>
                <td className="p-3 border-b">Every 90 days</td>
              </tr>
              <tr className="bg-teal-50 font-semibold">
                <td className="p-3 border-b">Crisis Management</td>
                <td className="p-3 border-b">
                  • Crisis intervention frequency
                  <br />• Response time to crisis
                  <br />• De-escalation success rate
                  <br />• Psychiatric hospitalization rate
                </td>
                <td className="p-3 border-b">
                  Decreasing trend
                  <br />
                  &lt;1 hour
                  <br />
                  ≥80%
                  <br />
                  ≤2 per year
                </td>
                <td className="p-3 border-b">Monthly</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Medication Management</td>
                <td className="p-3 border-b">
                  • Medication compliance rate
                  <br />• Medication effectiveness
                  <br />• Side effect monitoring
                  <br />• Psychiatric follow-ups
                </td>
                <td className="p-3 border-b">
                  ≥85%
                  <br />
                  Clinical improvement
                  <br />
                  Weekly checks
                  <br />
                  Monthly minimum
                </td>
                <td className="p-3 border-b">Weekly/Monthly</td>
              </tr>
              <tr className="bg-teal-50 font-semibold">
                <td className="p-3 border-b">Behavioral Interventions</td>
                <td className="p-3 border-b">
                  • Behavioral plan implementation
                  <br />• Incident frequency
                  <br />• School behavior reports
                  <br />• Positive behavior increases
                </td>
                <td className="p-3 border-b">
                  100% fidelity
                  <br />
                  ≥40% reduction
                  <br />
                  Improving trend
                  <br />
                  Documented gains
                </td>
                <td className="p-3 border-b">
                  Weekly data
                  <br />
                  Monthly analysis
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles Section */}
      <div className="grid grid-cols-2 gap-5 mb-8">
        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-indigo-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Program Director - MH Responsibilities</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Oversee MH service package delivery per T3C Blueprint</li>
            <li>• Monitor TBRI® implementation across all services</li>
            <li className="font-semibold">• Review continued stay criteria every 90 days</li>
            <li className="font-semibold">• Provide written confirmations within 15 business days</li>
            <li>• Lead MH-specific CQI reviews with TBRI® focus</li>
            <li>• Approve Logic Model modifications based on CQI</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-green-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Treatment Director - MH Specific</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li className="font-semibold">• Supervise all licensed therapists</li>
            <li className="font-semibold">• Review treatment effectiveness</li>
            <li className="font-semibold">• Oversee behavioral interventions</li>
            <li className="font-semibold">• Coordinate psychiatric services</li>
            <li className="font-semibold">• Lead clinical team meetings</li>
            <li className="font-semibold">• Approve step-down transitions</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-pink-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Licensed Therapists - MH Team</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li className="font-semibold">• Provide weekly individual therapy using TBRI® principles</li>
            <li className="font-semibold">• Conduct family therapy with TBRI® integration</li>
            <li className="font-semibold">• Lead group therapy programs as appropriate</li>
            <li className="font-semibold">• Document treatment progress per T3C requirements</li>
            <li className="font-semibold">• Collaborate on TBRI®-informed behavioral plans</li>
            <li className="font-semibold">• Participate in 90-day Service Plan reviews</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-orange-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Case Managers - MH Enhanced</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Implement TBRI® in all therapeutic contexts</li>
            <li>• Coordinate all MH services per Service Plan</li>
            <li className="font-semibold">• Ensure therapy attendance (≥90% target)</li>
            <li className="font-semibold">• Monitor medication compliance daily</li>
            <li className="font-semibold">• Document behavioral incidents using TBRI® framework</li>
            <li className="font-semibold">• Facilitate family engagement per TBRI® Connecting</li>
          </ul>
        </div>
      </div>

      {/* Outcomes Section */}
      <div className="bg-gradient-to-r from-[#A90533] to-[#5E3989] text-white p-6 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Mental & Behavioral Health CQI Outcomes</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🧠 Clinical Stabilization</h4>
            <p className="text-sm opacity-90">Achieved through intensive therapy and behavioral interventions</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">💊 Treatment Adherence</h4>
            <p className="text-sm opacity-90">Supported by coordinated medication management and therapy</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🏥 Crisis Reduction</h4>
            <p className="text-sm opacity-90">Accomplished via 24/7 response and preventive interventions</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">📊 Step-Down Success</h4>
            <p className="text-sm opacity-90">Enabled by therapeutic progress and comprehensive aftercare</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MentalBehavioralCQICycle
