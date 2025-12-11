import Link from "next/link"
import { ArrowLeft, Info, Phone, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function TreatmentFosterCareTreatmentModelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 gap-2 text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
              Return to Dashboard
            </Button>
          </Link>

          <div className="flex items-center gap-6 mb-6">
            <div className="bg-white rounded-full p-3">
              <Image
                src="/images/refugehouse-logo.png"
                alt="Refuge House Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Treatment Model</h1>
              <p className="text-xl text-purple-100 italic">A home is in the heart of every child.</p>
              <Badge className="mt-2 bg-white/20 text-white border-white/30">
                T3C Treatment Foster Family Care Support Services
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="shadow-xl">
          <CardContent className="p-8 space-y-8">
            {/* Foundational Reference */}
            <Alert className="border-orange-600/30 bg-orange-50">
              <Info className="h-5 w-5 text-orange-700" />
              <AlertDescription className="text-base">
                <strong className="text-orange-900">🏗️ Foundational Treatment Model:</strong> This Treatment Foster
                Family Care Support Services treatment model is the{" "}
                <strong>most intensive enhancement and extension</strong> of our foundational TBRI® model used in the
                T3C Basic Foster Family Home Support Services package. For comprehensive information about the core
                TBRI® principles, implementation strategies, education plans, and foundational practices, please refer
                to:{" "}
                <a
                  href="/forms/basic-tbri-resource-guide"
                  className="text-orange-700 hover:text-orange-900 underline font-semibold"
                >
                  View Complete TBRI® Resource Guide (Basic Foster Family Home)
                </a>
                <br />
                <br />
                <em className="text-sm text-orange-800">
                  All staff and caregivers working with children in the Treatment Foster Care package must complete
                  training in the foundational TBRI® model and Mental Health enhancements before receiving specialized
                  intensive treatment training.
                </em>
              </AlertDescription>
            </Alert>

            {/* Treatment Model Framework */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">
                1. Treatment Model Framework and Structure
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Child Placing Agency implements Trust-Based Relational Intervention® (TBRI®) as our foundational
                treatment model, enhanced with intensive clinical interventions for providing the T3C Treatment Foster
                Family Care Support Services. TBRI provides the evidence-based, trauma-informed foundation while
                incorporating specialized behavioral health practices for children with serious emotional, mental, and
                behavioral disorders requiring the most intensive level of therapeutic support in a family setting.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                The selection of TBRI as our foundation recognizes that children requiring treatment foster care have
                experienced significant relational trauma and attachment disruptions. These children need both the
                therapeutic relationships that TBRI provides and the intensive clinical structure necessary to address
                serious behavioral and emotional challenges. Our enhanced model maintains TBRI's core commitment to
                healing through relationships while incorporating the behavioral interventions, psychiatric
                coordination, and crisis management required for children with the most complex needs.
              </p>

              <Alert className="border-[#5E3989]/20 bg-purple-50 mb-6">
                <AlertDescription>
                  <strong className="text-[#5E3989]">Core TBRI Principles with Intensive Clinical Enhancements</strong>
                  <br />
                  The enhanced TBRI framework maintains three interconnected principles adapted for children requiring
                  intensive treatment-level services.{" "}
                  <a
                    href="/forms/basic-tbri-resource-guide"
                    className="text-[#5E3989] hover:text-[#A90533] underline font-semibold"
                  >
                    See the foundational TBRI® Resource Guide
                  </a>{" "}
                  for detailed information on the core principles.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <Card className="border-t-4 border-t-blue-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">
                      Connecting Principles - Intensive Therapeutic Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Daily therapeutic check-ins using validated assessment tools</li>
                      <li>Therapeutic communication techniques integrated into all daily interactions</li>
                      <li>Relationship-based crisis de-escalation strategies</li>
                      <li>Connection maintained even during behavioral crises</li>
                      <li>Individualized engagement approaches based on trauma history and attachment patterns</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-green-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Empowering Principles - Structured Clinical Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Medication management integrated into daily routines with psychiatric oversight</li>
                      <li>Sensory accommodations and environmental modifications based on individual assessment</li>
                      <li>Comprehensive crisis prevention planning with individualized safety strategies</li>
                      <li>Teaching and practicing coping skills and emotional regulation techniques</li>
                      <li>Regular health monitoring and coordination with multiple service providers</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-orange-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">
                      Correcting Principles - Intensive Behavioral Interventions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Positive Behavioral Interventions and Supports (PBIS) framework</li>
                      <li>Functional Behavior Assessment (FBA) for all persistent challenging behaviors</li>
                      <li>Individualized Behavior Support Plans with data-driven modifications</li>
                      <li>Teaching replacement behaviors at developmentally appropriate levels</li>
                      <li>Natural and logical consequences within therapeutic framework</li>
                      <li>Progress monitoring with regular team review and plan adjustments</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Integration</h3>
              <p className="text-gray-700 mb-4">
                Our model integrates intensive therapeutic services within the specialized treatment foster home
                environment:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#5E3989] to-[#764ba2] text-white">
                      <th className="p-4 text-left font-semibold">Service Component</th>
                      <th className="p-4 text-left font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-800">Therapeutic Services</td>
                      <td className="p-4 text-sm text-gray-700">
                        • Individual therapy at frequency determined by clinical need (minimum weekly)
                        <br />• Family therapy to support caregiver-child relationships and address systemic issues
                        <br />• Group therapy for social skill building and peer interaction
                        <br />• Psychiatric services for medication management and diagnostic clarification
                        <br />• Wraparound services coordinated through STAR Health when eligible
                        <br />• 24/7 crisis intervention with Licensed Therapist on-call consultation
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-800">Staffing Structure</td>
                      <td className="p-4 text-sm text-gray-700">
                        • Treatment Director meeting T3C qualifications with supervision of all Licensed Therapists
                        <br />• Licensed Therapists (1:11 ratio) specializing in serious emotional and behavioral
                        disorders
                        <br />• Behavior Support Specialists (1:6 ratio) providing direct behavioral consultation
                        <br />• Crisis Management Staff (1:25 ratio) available for immediate crisis response
                        <br />• Case Managers with mental health specialization (1:6 ratio)
                        <br />• Aftercare Case Manager (1:25 ratio) for transition support
                        <br />• 24/7 on-call availability of case management level or above staff
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-4 font-semibold text-gray-800">Treatment Home Parameters</td>
                      <td className="p-4 text-sm text-gray-700">
                        • Maximum 2 children in care per treatment foster home
                        <br />• 50+ hours annual training for treatment foster parents
                        <br />• Weekly case manager support (1:6 ratio)
                        <br />• Weekly behavior specialist coaching and consultation
                        <br />• Respite care availability to prevent caregiver burnout
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* On-Call Licensed Therapist Requirement */}
              <Card className="border-2 border-[#5E3989]/30 mt-6">
                <CardHeader className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
                  <CardTitle className="text-center text-white flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    On-Call Licensed Therapist Requirement
                  </CardTitle>
                  <p className="text-center italic text-white/90 text-sm">
                    T3C Blueprint p.138 - Unique to Treatment Foster Family Care
                  </p>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Treatment Foster Family Care requires 24/7 access to an On-Call Licensed Therapist 
                    trained in the agency's Evidence-informed Treatment Model (TBRI®). This requirement 
                    ensures immediate clinical support for high-acuity situations.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-[#5E3989] mb-3">On-Call Therapist Functions:</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-0.5 flex-shrink-0" />
                          Crisis consultation via phone 24/7
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-0.5 flex-shrink-0" />
                          In-person crisis response when clinically indicated
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-0.5 flex-shrink-0" />
                          Clinical guidance for foster parents during emergencies
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-0.5 flex-shrink-0" />
                          Coordination with Treatment Director for adjustments
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#5E3989] mt-0.5 flex-shrink-0" />
                          Psychiatric emergency triage and hospital liaison
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-[#A90533] mb-3">Implementation:</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          Contracted therapists with STAR Health credentialing
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          Staff therapists with on-call rotation
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          Treatment Director serving as clinical backup
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#A90533] mt-0.5 flex-shrink-0" />
                          All on-call therapists trained in TBRI® principles
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Well-being Needs */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#A90533] pb-2">
                2. Meeting Custom Physical, Emotional, Social, and Spiritual Well-being Needs
              </h2>
              <p className="text-gray-700 mb-6">
                Our intensive TBRI-enhanced model addresses all domains of well-being with the highest level of clinical
                precision and support:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-l-4 border-l-pink-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Physical Well-being</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Children requiring treatment foster care often experience complex physical health issues related
                      to serious mental health conditions and medication regimens:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Comprehensive health assessments with psychiatric focus</li>
                      <li>Daily medication administration and side effect monitoring</li>
                      <li>Coordination with psychiatrists for medication adjustments</li>
                      <li>Sleep hygiene programs with clinical oversight</li>
                      <li>Physical activity as therapeutic intervention</li>
                      <li>Nutritional planning addressing medication effects</li>
                      <li>STAR Health and wraparound service coordination</li>
                      <li>Regular medical monitoring and preventive care</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Emotional Well-being</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Intensive emotional support addresses the complex needs of children with serious emotional and
                      behavioral disorders:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Daily mood monitoring using validated tools</li>
                      <li>Comprehensive crisis safety planning</li>
                      <li>Intensive emotion regulation skill training</li>
                      <li>Trauma-focused interventions adapted to individual needs</li>
                      <li>Multiple therapeutic outlets (individual, family, group)</li>
                      <li>CANS assessment every 90 days with clinical interpretation</li>
                      <li>Weekly therapy sessions (minimum)</li>
                      <li>24/7 crisis intervention availability</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Social Well-being</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">
                      Serious behavioral and emotional symptoms significantly impact relationships, requiring intensive
                      structured support:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Evidence-based social skills training with practice</li>
                      <li>Supported and supervised peer interactions</li>
                      <li>Intensive family therapy and caregiver education</li>
                      <li>Close school collaboration with IEP support</li>
                      <li>Gradual community integration with clinical support</li>
                      <li>Relationship repair strategies after incidents</li>
                      <li>Therapeutic recreation activities</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500 bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Spiritual Well-being</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Values development at appropriate developmental level</li>
                      <li>Cultural identity support and exploration</li>
                      <li>Supported inclusion in faith communities when desired</li>
                      <li>Meaning-making opportunities within therapeutic context</li>
                      <li>Hope-building interventions</li>
                      <li>Connection to purpose and future orientation</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Evidence Base */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">
                3. Evidence and Data Informing Treatment Model Selection
              </h2>

              <Alert className="border-blue-600/30 bg-blue-50 mb-6">
                <AlertDescription>
                  <strong className="text-blue-900">🏆 Evidence-Based Recognition</strong>
                  <br />
                  <br />
                  <strong className="text-blue-800">
                    California Evidence-Based Clearinghouse for Child Welfare (CEBC) Rating:
                  </strong>
                  <br />
                  TBRI® Caregiver Training is rated as a <strong>"Promising Practice"</strong> based on scientific
                  research showing improved outcomes for children who experienced trauma, abuse, and neglect.
                  <br />
                  <br />
                  <strong className="text-blue-800">Title IV-E Prevention Services Clearinghouse:</strong>
                  <br />
                  TBRI® is recognized for mental health prevention and treatment, making it eligible for use in programs
                  requiring evidence-based, trauma-informed interventions.
                  <br />
                  <br />
                  <strong className="text-blue-800">Implementation Support:</strong>
                  <br />
                  The Karyn Purvis Institute of Child Development (KPICD) provides ongoing support including coaching,
                  site visits, teleconferencing, and email support to ensure fidelity to the model.
                  <br />
                  <br />
                  <strong className="text-blue-800">Fidelity Measures:</strong>
                  <br />
                  TBRI® includes "Rate Your Understanding" assessments to ensure consistent delivery across all
                  caregivers and settings.
                </AlertDescription>
              </Alert>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Research Foundation</h3>
              <p className="text-gray-700 mb-3">
                The integration of TBRI with intensive clinical interventions represents current best practices in
                treatment foster care. Research demonstrates:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li>Treatment foster care models achieve better outcomes than residential care for most children</li>
                <li>Trauma-informed approaches significantly improve placement stability and behavioral outcomes</li>
                <li>
                  Evidence-based therapies delivered in the context of therapeutic foster care produce lasting change
                </li>
                <li>
                  Family-based treatment with intensive supports enables children to avoid or step down from
                  institutional care
                </li>
                <li>
                  Behavioral interventions (PBIS, FBA) in family settings show superior generalization compared to
                  clinic-only services
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Monitoring</h3>
              <p className="text-gray-700 mb-3">
                Our Continuous Quality Improvement process ensures effective intensive service delivery through:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>CANS assessments every 90 days with clinical interpretation</li>
                <li>Daily behavioral incident documentation and weekly data analysis</li>
                <li>Weekly therapy attendance tracking</li>
                <li>Crisis intervention frequency and effectiveness monitoring</li>
                <li>Treatment Director 90-day continued stay reviews</li>
                <li>Medication compliance and effectiveness tracking</li>
                <li>Foster parent satisfaction and retention assessment</li>
                <li>Step-down readiness evaluation every 90 days</li>
              </ul>
            </section>

            {/* Trauma-Informed Approach */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#A90533] pb-2">
                4. Trauma-Informed Approach for Children Who Have Experienced Abuse and Neglect
              </h2>
              <p className="text-gray-700 mb-4">
                Children requiring treatment foster care have experienced significant trauma, often including multiple
                placements, severe abuse or neglect, and complex relational trauma. Our trauma-informed approach
                recognizes that challenging behaviors are adaptations to traumatic experiences.
              </p>

              <Alert className="border-orange-600/30 bg-orange-50 mb-6">
                <AlertDescription className="text-orange-900">
                  <strong>Note:</strong> All children and caregivers in the Treatment Foster Care package receive the
                  foundational TBRI® education outlined in the{" "}
                  <a
                    href="/forms/basic-tbri-resource-guide"
                    className="text-orange-700 hover:text-orange-900 underline font-semibold"
                  >
                    Basic Foster Family Home TBRI® Resource Guide
                  </a>
                  , plus Mental Health enhancements, plus additional specialized training in intensive behavioral
                  interventions, crisis management, and treatment-level clinical coordination (20 additional hours
                  beyond standard pre-service training).
                </AlertDescription>
              </Alert>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Assessment and Treatment Planning</h3>
              <p className="text-gray-700 mb-2">
                <strong>Comprehensive Assessment:</strong> The CANS 3.0 serves as our primary assessment tool,
                administered every 90 days to track progress and inform treatment. This is supplemented by:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                <li>Functional Behavior Assessments for challenging behaviors</li>
                <li>Trauma-specific assessments as clinically indicated</li>
                <li>Ongoing behavioral data collection and analysis</li>
                <li>Regular psychiatric evaluation when medication is involved</li>
              </ul>

              <p className="text-gray-700 mb-2">
                <strong>Individualized Service Planning:</strong> Each child's Service Plan is developed collaboratively
                within 30 days of admission and reviewed every 60 days. Plans include:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li>Trauma-informed goals addressing both symptom reduction and skill development</li>
                <li>Specific therapeutic interventions matched to trauma history</li>
                <li>Behavioral support strategies based on functional assessment</li>
                <li>Crisis prevention and response protocols</li>
                <li>Coordination of all services and supports</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Clinical Interventions</h3>
              <p className="text-gray-700 mb-2">
                <strong>Evidence-Based Therapies:</strong> Our Licensed Therapists utilize trauma-focused,
                evidence-based approaches including:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                <li>Trauma-Focused Cognitive Behavioral Therapy (TF-CBT) adapted to developmental level</li>
                <li>Attachment-focused interventions building on TBRI foundation</li>
                <li>Cognitive-behavioral strategies for emotion regulation and coping</li>
                <li>Family therapy to heal relationships and build caregiver capacity</li>
              </ul>

              <p className="text-gray-700 mb-2">
                <strong>Behavioral Support:</strong> Behavior Support Specialists work directly with foster parents to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                <li>Implement individualized behavior support plans</li>
                <li>Teach therapeutic parenting strategies beyond basic TBRI</li>
                <li>Provide in-home coaching and support</li>
                <li>Analyze behavioral data and modify interventions as needed</li>
                <li>Support crisis prevention and response</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Foster Parent Preparation and Support</h3>
              <p className="text-gray-700 mb-3">
                Treatment foster parents receive extensive training and ongoing support:
              </p>

              <p className="text-gray-700 mb-2">
                <strong>Enhanced Training:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                <li>20 hours of Treatment Foster Care specific training beyond pre-service</li>
                <li>Advanced TBRI techniques for complex trauma presentations</li>
                <li>Crisis intervention and de-escalation strategies</li>
                <li>Working with psychiatric medication and side effects</li>
                <li>Understanding serious mental health diagnoses</li>
                <li>Implementing behavior support plans with fidelity</li>
              </ul>

              <p className="text-gray-700 mb-2">
                <strong>Ongoing Support:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Weekly contact from case manager (1:6 ratio enables intensive support)</li>
                <li>Regular consultation with Behavior Support Specialist</li>
                <li>Access to Licensed Therapist consultation</li>
                <li>24/7 crisis support with in-person response capability</li>
                <li>Respite care to prevent caregiver burnout</li>
                <li>Peer support connections with other treatment foster parents</li>
              </ul>
            </section>

            {/* Appropriateness */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">
                5. Appropriateness of the Treatment Model for T3C Treatment Foster Family Care Support Services
              </h2>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Package Alignment</h3>
              <p className="text-gray-700 mb-4">
                Our enhanced TBRI model directly addresses each requirement specified in the T3C Treatment Foster Family
                Care Support Services package:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#5E3989] to-[#764ba2] text-white">
                      <th className="p-4 text-left font-semibold">T3C Requirement</th>
                      <th className="p-4 text-left font-semibold">Our Implementation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-800">Regular individual, family, and group therapy</td>
                      <td className="p-3 text-sm text-gray-700">
                        Licensed Therapists determine frequency based on clinical need; minimum weekly individual
                        therapy
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-800">CANS 3.0 every 90 days</td>
                      <td className="p-3 text-sm text-gray-700">
                        Administration with clinical interpretation informing Service Plan adjustments
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-800">24/7 crisis availability</td>
                      <td className="p-3 text-sm text-gray-700">
                        Case manager level or above staff available; Licensed Therapist on-call consultation
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-800">
                        Service Plans within 30 days, reviewed every 60 days
                      </td>
                      <td className="p-3 text-sm text-gray-700">
                        Collaborative development with measurable, individualized goals
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-800">Maximum 2 children in care per home</td>
                      <td className="p-3 text-sm text-gray-700">
                        Ensures intensive, individualized attention in family setting
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-800">Maximum 365-day length of service</td>
                      <td className="p-3 text-sm text-gray-700">
                        Policy includes anticipated length of service; step-down planning begins at admission
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Assurance Process</h3>
              <p className="text-gray-700 mb-2">
                <strong>90-Day Continued Stay Review:</strong>
              </p>
              <p className="text-gray-700 mb-3">
                Every 90 days, the Treatment Director reviews each child's progress and continued need for Treatment
                Foster Care services. This written review, completed within 15 business days, evaluates:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 mb-4">
                <li>Progress on Service Plan goals using CANS 3.0 and other outcome data</li>
                <li>Reduction in behavioral incidents and crisis episodes</li>
                <li>Psychiatric stability and medication effectiveness</li>
                <li>Therapy engagement and therapeutic alliance</li>
                <li>Educational progress and school stability</li>
                <li>Placement stability and caregiver satisfaction</li>
                <li>Readiness for step-down to lower level of care</li>
              </ol>

              <p className="text-gray-700 mb-2">
                <strong>Step-Down Criteria:</strong> Children demonstrating sustained progress may transition to T3C
                Mental & Behavioral Health Support Services or T3C Basic services based on:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Achievement of Service Plan goals enabling step-down to lower level of care</li>
                <li>Placement stability with reduced intensive supports</li>
                <li>Caregiver capacity to manage child's needs with standard foster care supports</li>
                <li>Connection to ongoing community-based services</li>
                <li>Reduced crisis episodes (≥75% reduction from admission)</li>
                <li>Behavioral stabilization (≥40% reduction in incidents)</li>
              </ul>
            </section>

            {/* Expected Outcomes */}
            <section className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg border-2 border-amber-400">
              <h3 className="text-xl font-bold text-amber-900 mb-4">Expected Outcomes</h3>
              <p className="text-amber-900 mb-4">
                Based on research and best practices in treatment foster care, we establish measurable goals:
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-amber-900 mb-2">90-Day Goals</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>75% reduction in crisis episodes requiring emergency intervention</li>
                    <li>Measurable improvement in at least 2 CANS 3.0 priority areas</li>
                    <li>Consistent engagement in therapy services</li>
                    <li>Behavioral support plan implementation with fidelity</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-amber-900 mb-2">6-Month Goals</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>85% placement stability (no unplanned moves)</li>
                    <li>Functional improvement allowing participation in normalized activities</li>
                    <li>Reduced medication needs or stabilization on appropriate regimen</li>
                    <li>Progress toward permanency goal</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold text-amber-900 mb-2">Discharge Goals</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>Achievement of Service Plan goals</li>
                    <li>Step-down to lower level of care</li>
                    <li>Permanency achievement (reunification, adoption, or APPLA)</li>
                    <li>Connection to ongoing services</li>
                    <li>Sustained stability for 6 months</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Closing Statement */}
            <section>
              <p className="text-gray-600 italic leading-relaxed">
                By integrating intensive behavioral health interventions with TBRI's proven approach to healing trauma
                through relationships, we ensure that children with the most serious emotional and behavioral challenges
                receive both the clinical structure they need and the healing family environment essential for lasting
                change. This balanced approach enables children to remain in family settings while receiving
                treatment-level services, supporting progress toward permanency and successful functioning in their
                communities.
              </p>
            </section>

            {/* Related Resources */}
            <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Related Resources:</h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/forms/basic-tbri-resource-guide"
                    className="text-[#5E3989] hover:text-[#A90533] underline font-semibold"
                  >
                    Complete TBRI® Resource Guide (Basic Foster Family Home)
                  </a>{" "}
                  - Foundational treatment model, education plan, and implementation materials
                </li>
                <li>
                  <a
                    href="/forms/mental-behavioral-treatment-model"
                    className="text-[#5E3989] hover:text-[#A90533] underline font-semibold"
                  >
                    Mental & Behavioral Health Treatment Model
                  </a>{" "}
                  - Mid-tier enhancement for therapeutic services
                </li>
                <li>
                  <a
                    href="/forms/treatment-foster-care-logic-model"
                    className="text-[#5E3989] hover:text-[#A90533] underline font-semibold"
                  >
                    Treatment Foster Care Logic Model
                  </a>{" "}
                  - Visual representation of intensive treatment implementation
                </li>
                <li>
                  <a
                    href="/forms/treatment-foster-care-cqi-model"
                    className="text-[#5E3989] hover:text-[#A90533] underline font-semibold"
                  >
                    Treatment Foster Care CQI Model
                  </a>{" "}
                  - Continuous quality improvement process for intensive services
                </li>
              </ul>
            </section>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            TBRI® is a registered trademark of the Karyn Purvis Institute of Child Development at Texas Christian
            University
          </p>
          <p className="text-sm text-gray-600 italic">"A home is in the heart of every child."</p>
          <div className="mt-4 pt-4 border-t border-gray-200 max-w-md mx-auto">
            <p className="text-sm text-gray-500">
              <strong>Last Revised:</strong> December 10, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
