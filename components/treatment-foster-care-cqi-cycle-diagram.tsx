import { AlertTriangle, XCircle, CheckCircle2 } from "lucide-react"

const TreatmentFosterCareCQICycle = () => {
  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="text-center mb-8 pb-5 border-b-4 border-indigo-500">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">T3C Treatment Foster Family Care Support Services</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">Continuous Quality Improvement Model</h2>
        <p className="text-base text-gray-600">
          Intensive Treatment Package-Specific CQI Process per T3C Blueprint Requirements
        </p>
      </div>

      {/* Package Note */}
      <div className="bg-orange-50 border-2 border-orange-600 rounded-lg p-4 mb-8 text-center">
        <h3 className="text-lg font-bold text-orange-900 mb-2">Treatment Foster Care CQI Framework</h3>
        <p className="text-sm text-orange-800 leading-relaxed">
          This CQI model is specifically designed for monitoring and improving intensive therapeutic services for
          children with serious emotional and behavioral disorders.
          <br />
          Builds upon Basic and Mental Health CQI processes with intensive clinical quality metrics, behavioral support
          monitoring, and 90-day review cycles.
        </p>
      </div>

      {/* CQI Framework Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Treatment Foster Family Care Support Services CQI Cycle
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
                  <strong className="text-sm">Tier 1-2 (Basic/MH):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Review Logic Model</li>
                    <li>Set TBRI®-aligned goals</li>
                    <li>Schedule therapy services</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-600">
                  <strong className="text-sm font-semibold">TFC-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Plan intensive therapy (weekly minimum per T3C p.137)</li>
                    <li>Develop intensive behavioral intervention plans (PBIS/FBA)</li>
                    <li>Schedule psychiatric consultations</li>
                    <li>Plan crisis prevention strategies</li>
                    <li>Set behavioral data collection protocols</li>
                    <li>Review maximum 2-child-per-home compliance</li>
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
                  <strong className="text-sm">Tier 1-2 (Basic/MH):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Implement TBRI® daily</li>
                    <li>Provide therapy services</li>
                    <li>Document services</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-600">
                  <strong className="text-sm font-semibold">TFC-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Deliver weekly individual therapy (minimum)</li>
                    <li>Conduct family therapy with intensive focus</li>
                    <li>Implement behavior support plans (1:6 specialist ratio)</li>
                    <li>Execute Functional Behavior Assessments</li>
                    <li>Provide 24/7 crisis response with therapist on-call</li>
                    <li>Monitor psychiatric medications daily</li>
                    <li>Collect behavioral data continuously</li>
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
                  <strong className="text-sm">Tier 1-2 (Basic/MH):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Analyze data</li>
                    <li>Review CANS results</li>
                    <li>Identify trends</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-600">
                  <strong className="text-sm font-semibold">TFC-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Review 90-day CANS 3.0 with behavioral focus</li>
                    <li>Analyze behavioral incident data trends</li>
                    <li>Assess crisis intervention effectiveness</li>
                    <li>Evaluate therapy attendance and progress</li>
                    <li>Review medication effectiveness and side effects</li>
                    <li>Assess step-down readiness criteria</li>
                    <li>Calculate length of service (max 365 days)</li>
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
                  <strong className="text-sm">Tier 1-2 (Basic/MH):</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Adjust service approaches</li>
                    <li>Update plans</li>
                    <li>Enhance training</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-2 rounded border-l-4 border-orange-600">
                  <strong className="text-sm font-semibold">TFC-Specific:</strong>
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-sm leading-relaxed">
                    <li>Modify intensive therapy frequency/modality per clinical need</li>
                    <li>Update behavior support plans with FBA data</li>
                    <li>Adjust crisis protocols based on incident analysis</li>
                    <li>Coordinate psychiatric medication adjustments</li>
                    <li>Plan step-down to Mental Health or aftercare</li>
                    <li>Document Treatment Director 90-day review</li>
                    <li>Complete Program Director confirmation (15-day)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Center Circle - Logic Model */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-500 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center p-5 shadow-xl z-10">
            <h4 className="text-base font-bold text-amber-900 leading-tight">
              Treatment Foster Care
              <br />
              Logic Model
            </h4>
            <p className="text-xs text-amber-800 mt-2 leading-snug">
              TBRI® Foundation
              <br />+ Intensive Clinical
              <br />+ Behavioral Support
              <br />
              90-Day Review Cycle
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Treatment Foster Care CQI Timeline</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Beginning of 90-Day Cycle</h3>
            <p className="text-xs text-gray-600 mb-2">Program Director, Treatment Director, QA Team</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Review TFC service delivery</li>
              <li>• Set intensive treatment targets</li>
              <li className="text-orange-600 font-semibold">• Plan intensive therapy schedules</li>
              <li className="text-orange-600 font-semibold">• Develop behavioral intervention plans</li>
              <li className="text-orange-600 font-semibold">• Schedule psychiatric consultations</li>
              <li className="text-orange-600 font-semibold">• Review crisis protocols</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 1-75</h3>
            <p className="text-xs text-gray-600 mb-2">
              Therapists, Behavior Specialists, Case Managers, Foster Parents
            </p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• TBRI® implementation</li>
              <li className="text-orange-600 font-semibold">• Weekly individual therapy (minimum)</li>
              <li className="text-orange-600 font-semibold">• Family therapy sessions</li>
              <li className="text-orange-600 font-semibold">• Behavioral interventions (1:6 ratio)</li>
              <li className="text-orange-600 font-semibold">• FBA implementation</li>
              <li className="text-orange-600 font-semibold">• 24/7 crisis management</li>
              <li className="text-orange-600 font-semibold">• Medication monitoring</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-pink-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Days 76-85</h3>
            <p className="text-xs text-gray-600 mb-2">QA Coordinator, Treatment Director</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Compile intensive therapy data</li>
              <li>• Analyze CANS 3.0 results</li>
              <li className="text-orange-600 font-semibold">• Review behavioral data trends</li>
              <li className="text-orange-600 font-semibold">• Assess crisis interventions</li>
              <li className="text-orange-600 font-semibold">• Evaluate medication compliance</li>
              <li className="text-orange-600 font-semibold">• Determine continued stay</li>
              <li className="text-orange-600 font-semibold">• Assess step-down readiness</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border-l-4 border-orange-500">
            <h3 className="text-sm font-bold text-gray-800 mb-2">Day 86-90</h3>
            <p className="text-xs text-gray-600 mb-2">Full TFC CQI Team</p>
            <ul className="text-xs space-y-1 leading-relaxed">
              <li>• Intensive treatment team meeting</li>
              <li>• Review all clinical outcomes</li>
              <li className="text-orange-600 font-semibold">• Adjust intensive treatment plans</li>
              <li className="text-orange-600 font-semibold">• Modify therapy frequency</li>
              <li className="text-orange-600 font-semibold">• Update behavioral plans</li>
              <li className="text-orange-600 font-semibold">• Plan step-down/aftercare</li>
              <li className="text-orange-600 font-semibold">• Treatment Director review</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Metrics Table */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Treatment Foster Care CQI Metrics</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="p-3 text-left text-sm font-semibold">Logic Model Component</th>
                <th className="p-3 text-left text-sm font-semibold">TFC-Specific Metrics</th>
                <th className="p-3 text-left text-sm font-semibold">Target/Threshold</th>
                <th className="p-3 text-left text-sm font-semibold">Review Frequency</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-orange-50 font-semibold">
                <td className="p-3 border-b">TBRI® Implementation</td>
                <td className="p-3 border-b">
                  • Staff TBRI® Practitioner competency in intensive context
                  <br />• TBRI® fidelity in intensive therapy sessions
                  <br />• Treatment foster parent TBRI® application scores
                  <br />• Crisis de-escalation using IDEAL Response®
                </td>
                <td className="p-3 border-b">
                  ≥90% competency
                  <br />
                  Documented in all sessions
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
                <td className="p-3 border-b">Intensive Therapeutic Services</td>
                <td className="p-3 border-b">
                  • Weekly individual therapy attendance{" "}
                  <span className="text-gray-500 italic">(vs as-needed Basic)</span>
                  <br />• Family therapy participation (intensive focus)
                  <br />• Group therapy engagement
                  <br />• Psychiatric consultation frequency
                  <br />• Licensed Therapist ratio (1:11)
                </td>
                <td className="p-3 border-b">
                  100% weekly minimum
                  <br />
                  Bi-weekly minimum
                  <br />
                  As clinically indicated
                  <br />
                  Monthly minimum
                  <br />
                  Maintained
                </td>
                <td className="p-3 border-b">
                  Weekly monitoring
                  <br />
                  Monthly review
                </td>
              </tr>
              <tr className="bg-orange-50 font-semibold">
                <td className="p-3 border-b">Behavioral Support Services</td>
                <td className="p-3 border-b">
                  • Functional Behavior Assessments completed
                  <br />• Behavior support plan implementation fidelity
                  <br />• Behavioral incident frequency trends
                  <br />• Behavior Specialist ratio (1:6)
                  <br />• In-home coaching contacts
                </td>
                <td className="p-3 border-b">
                  100% for target behaviors
                  <br />
                  ≥90% fidelity
                  <br />
                  ≥40% reduction in 90 days
                  <br />
                  Maintained
                  <br />
                  Weekly minimum
                </td>
                <td className="p-3 border-b">
                  Weekly data
                  <br />
                  Monthly analysis
                  <br />
                  90-day comprehensive
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">CANS 3.0 Assessment</td>
                <td className="p-3 border-b">
                  • 90-day CANS completion <span className="text-gray-500 italic">(vs 6-month Basic)</span>
                  <br />• Behavioral/emotional domain improvements
                  <br />• Risk behavior reductions
                  <br />• Life functioning improvements
                  <br />• Treatment response indicators
                </td>
                <td className="p-3 border-b">
                  100% on time
                  <br />
                  ≥20% improvement
                  <br />
                  Significant decrease
                  <br />
                  Measurable gains
                  <br />
                  Clinical progress
                </td>
                <td className="p-3 border-b">Every 90 days</td>
              </tr>
              <tr className="bg-orange-50 font-semibold">
                <td className="p-3 border-b">Crisis Management</td>
                <td className="p-3 border-b">
                  • Crisis intervention frequency
                  <br />• Response time to crisis
                  <br />• Therapist on-call consultation utilization
                  <br />• De-escalation success rate
                  <br />• Psychiatric hospitalization rate
                  <br />• Crisis Staff ratio (1:25)
                </td>
                <td className="p-3 border-b">
                  Decreasing trend (≥75%)
                  <br />
                  &lt;1 hour
                  <br />
                  100% availability
                  <br />
                  ≥85%
                  <br />
                  ≤1 per year
                  <br />
                  Maintained
                </td>
                <td className="p-3 border-b">
                  Weekly tracking
                  <br />
                  Monthly analysis
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Medication Management</td>
                <td className="p-3 border-b">
                  • Medication compliance rate
                  <br />• Medication effectiveness assessments
                  <br />• Side effect monitoring and documentation
                  <br />• Psychiatric follow-ups
                  <br />• Medication adjustments based on data
                </td>
                <td className="p-3 border-b">
                  ≥90%
                  <br />
                  Monthly evaluations
                  <br />
                  Daily checks documented
                  <br />
                  Monthly minimum
                  <br />
                  Data-driven
                </td>
                <td className="p-3 border-b">
                  Daily monitoring
                  <br />
                  Weekly/Monthly review
                </td>
              </tr>
              <tr className="bg-orange-50 font-semibold">
                <td className="p-3 border-b">Treatment Foster Home Parameters</td>
                <td className="p-3 border-b">
                  • Maximum 2 children per home compliance
                  <br />• Weekly case manager contact (1:6 ratio)
                  <br />• Treatment foster parent training (50+ hrs)
                  <br />• Respite utilization rates
                  <br />• Foster parent satisfaction/retention
                </td>
                <td className="p-3 border-b">
                  100% compliance
                  <br />
                  100% weekly contact
                  <br />
                  100% completion
                  <br />
                  As needed/available
                  <br />
                  ≥85% satisfaction
                </td>
                <td className="p-3 border-b">
                  Monthly verification
                  <br />
                  Quarterly assessment
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Length of Service</td>
                <td className="p-3 border-b">
                  • Average length of service tracking
                  <br />• Maximum 365-day compliance
                  <br />• Step-down readiness assessment
                  <br />• Transition planning timelines
                  <br />• Aftercare service engagement
                </td>
                <td className="p-3 border-b">
                  Tracked per child
                  <br />
                  100% within maximum
                  <br />
                  By 9 months
                  <br />
                  60 days prior
                  <br />
                  100% at discharge
                </td>
                <td className="p-3 border-b">
                  Monthly tracking
                  <br />
                  Every 90-day review
                </td>
              </tr>
              <tr className="bg-orange-50 font-semibold">
                <td className="p-3 border-b">Treatment Director Review</td>
                <td className="p-3 border-b">
                  • 90-day continued stay reviews
                  <br />• Written confirmations within 15 business days
                  <br />• Step-down recommendations
                  <br />• Treatment effectiveness evaluation
                  <br />• Clinical oversight documentation
                </td>
                <td className="p-3 border-b">
                  100% on time
                  <br />
                  100% within timeline
                  <br />
                  Data-driven
                  <br />
                  Comprehensive
                  <br />
                  Fully documented
                </td>
                <td className="p-3 border-b">Every 90 days</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="p-3 border-b">Service Plans</td>
                <td className="p-3 border-b">
                  • Initial Service Plan completion
                  <br />• 60-day Service Plan reviews
                  <br />• Therapy frequency justification
                  <br />• Goal achievement progress
                  <br />• Service coordination documentation
                </td>
                <td className="p-3 border-b">
                  100% within 30 days
                  <br />
                  100% on time
                  <br />
                  Clinical need documented
                  <br />
                  Measurable progress
                  <br />
                  Comprehensive
                </td>
                <td className="p-3 border-b">30/60-day cycles</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Crisis Pattern Analysis - Required at 60-Day Reviews */}
      <div className="mb-8 border-2 border-[#A90533]/30 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#A90533] to-[#5E3989] text-white p-4">
          <h2 className="text-lg font-bold text-center flex items-center justify-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Crisis Pattern Analysis
          </h2>
          <p className="text-center text-white/90 text-sm">
            Required at Each 60-Day Continued Stay Review (FC-TFFC-01 §13.4)
          </p>
        </div>
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Analysis Components */}
            <div>
              <h4 className="font-bold text-[#A90533] mb-3">Review Components:</h4>
              <div className="space-y-2">
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm font-medium">Crisis Incident Frequency</div>
                  <div className="text-xs text-gray-600">Count per 60-day period</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm font-medium">Trigger Pattern Analysis</div>
                  <div className="text-xs text-gray-600">Identify common triggers</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm font-medium">Intervention Effectiveness</div>
                  <div className="text-xs text-gray-600">What worked / didn't work</div>
                </div>
                <div className="bg-gradient-to-r from-[#5E3989]/10 to-[#A90533]/10 border-l-4 border-[#5E3989] pl-3 py-2 rounded-r">
                  <div className="text-sm font-medium">Intensity Trends</div>
                  <div className="text-xs text-gray-600">Escalating, stable, or decreasing</div>
                </div>
              </div>
            </div>
            
            {/* Step-Down Implications */}
            <div>
              <h4 className="font-bold text-[#5E3989] mb-3">Step-Down Readiness Indicators:</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-green-800">Significant reduction</div>
                    <div className="text-xs text-green-600">May indicate step-down readiness</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded border-l-4 border-yellow-500">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div>
                    <div className="text-sm font-medium text-yellow-800">Stable without improvement</div>
                    <div className="text-xs text-yellow-600">Treatment adjustment needed</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-red-50 rounded border-l-4 border-red-500">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <div>
                    <div className="text-sm font-medium text-red-800">Increasing frequency/intensity</div>
                    <div className="text-xs text-red-600">Step-down not appropriate</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded border-l-4 border-green-500">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-green-800">Crisis-free extended period</div>
                    <div className="text-xs text-green-600">Strong step-down readiness</div>
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
          <h3 className="text-base font-bold mb-3 text-gray-800">Program Director - TFC Responsibilities</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Oversee TFC intensive service package delivery per T3C Blueprint</li>
            <li>• Monitor TBRI® implementation in intensive treatment context</li>
            <li className="text-orange-600 font-semibold">• Review continued stay criteria every 90 days</li>
            <li className="text-orange-600 font-semibold">• Provide written confirmations within 15 business days</li>
            <li>• Lead TFC-specific CQI reviews with intensive clinical focus</li>
            <li>• Approve Logic Model modifications based on outcome data</li>
            <li className="text-orange-600 font-semibold">• Ensure maximum 2-child-per-home compliance</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-green-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Treatment Director - TFC Specific</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li className="text-orange-600 font-semibold">
              • Complete 90-day continued stay reviews (written confirmations within 15 business days)
            </li>
            <li className="text-orange-600 font-semibold">• Supervise all licensed therapists (1:11 ratio)</li>
            <li className="text-orange-600 font-semibold">• Review intensive treatment effectiveness</li>
            <li className="text-orange-600 font-semibold">• Oversee behavioral support services</li>
            <li className="text-orange-600 font-semibold">
              • Coordinate psychiatric services and medication management
            </li>
            <li className="text-orange-600 font-semibold">• Lead clinical case consultations for complex cases</li>
            <li className="text-orange-600 font-semibold">• Approve step-down transitions and aftercare plans</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-pink-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Licensed Therapists - TFC Team</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li className="text-orange-600 font-semibold">• Provide weekly individual therapy (minimum) using TBRI®</li>
            <li className="text-orange-600 font-semibold">• Conduct intensive family therapy with TBRI® integration</li>
            <li className="text-orange-600 font-semibold">• Determine therapy frequency based on clinical need</li>
            <li className="text-orange-600 font-semibold">• Document treatment progress per T3C requirements</li>
            <li className="text-orange-600 font-semibold">• Collaborate on TBRI®-informed behavioral plans</li>
            <li className="text-orange-600 font-semibold">• Participate in 60-day Service Plan reviews</li>
            <li className="text-orange-600 font-semibold">• Provide on-call consultation for crisis response</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-orange-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Behavior Support Specialists - TFC Enhanced</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li className="text-orange-600 font-semibold">• Conduct Functional Behavior Assessments (FBA)</li>
            <li className="text-orange-600 font-semibold">• Develop individualized behavior support plans</li>
            <li className="text-orange-600 font-semibold">• Provide weekly in-home coaching (1:6 ratio)</li>
            <li className="text-orange-600 font-semibold">• Analyze behavioral data trends continuously</li>
            <li className="text-orange-600 font-semibold">• Recommend intervention modifications based on data</li>
            <li className="text-orange-600 font-semibold">
              • Support treatment foster parents during behavioral crises
            </li>
            <li>• Integrate TBRI® principles into all behavioral interventions</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-indigo-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Case Managers - TFC Intensive</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li>• Implement TBRI® in all intensive therapeutic contexts</li>
            <li>• Coordinate all TFC services per Service Plan</li>
            <li className="text-orange-600 font-semibold">
              • Provide weekly support to treatment foster parents (1:6 ratio)
            </li>
            <li className="text-orange-600 font-semibold">• Ensure therapy attendance (100% weekly minimum)</li>
            <li className="text-orange-600 font-semibold">• Monitor medication compliance daily</li>
            <li className="text-orange-600 font-semibold">• Document behavioral incidents using TBRI® framework</li>
            <li className="text-orange-600 font-semibold">• Facilitate intensive family engagement per TBRI®</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-5 rounded-lg border-t-4 border-green-500">
          <h3 className="text-base font-bold mb-3 text-gray-800">Crisis Management Staff - TFC Support</h3>
          <ul className="text-sm space-y-2 leading-relaxed">
            <li className="text-orange-600 font-semibold">• Provide 24/7 crisis response availability (1:25 ratio)</li>
            <li className="text-orange-600 font-semibold">• Document and analyze all crisis interventions</li>
            <li className="text-orange-600 font-semibold">• Coordinate Licensed Therapist on-call consultation</li>
            <li className="text-orange-600 font-semibold">• Implement crisis de-escalation protocols using TBRI®</li>
            <li className="text-orange-600 font-semibold">• Recommend crisis prevention strategies based on data</li>
            <li className="text-orange-600 font-semibold">• Support treatment foster parents during crises</li>
          </ul>
        </div>
      </div>

      {/* Outcomes Section */}
      <div className="bg-gradient-to-r from-[#A90533] to-[#5E3989] text-white p-6 rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Treatment Foster Care CQI Outcomes</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🧠 Clinical Stabilization</h4>
            <p className="text-sm opacity-90">
              Achieved through intensive therapy, behavioral support, and psychiatric coordination
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">📊 Behavioral Improvement</h4>
            <p className="text-sm opacity-90">Supported by FBA, individualized plans, and data-driven interventions</p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">🚨 Crisis Reduction</h4>
            <p className="text-sm opacity-90">
              Accomplished via 24/7 response, prevention strategies, and therapist consultation
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg border border-white/30">
            <h4 className="text-base font-semibold mb-2">⬇️ Successful Step-Down</h4>
            <p className="text-sm opacity-90">
              Enabled by therapeutic progress, reduced service needs, and comprehensive aftercare
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TreatmentFosterCareCQICycle
