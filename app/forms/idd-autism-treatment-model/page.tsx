import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function IddAutismTreatmentModelPage() {
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
                T3C IDD/Autism Spectrum Disorder Support Services
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="shadow-xl">
          <CardContent className="p-8 space-y-8">
            <Alert className="border-[#5E3989]/20 bg-purple-50">
              <Info className="h-5 w-5 text-[#5E3989]" />
              <AlertDescription className="text-base">
                <strong>Foundation:</strong> This treatment model builds upon and enhances the{" "}
                <a
                  href="/forms/basic-tbri-resource-guide"
                  className="text-[#5E3989] hover:text-[#A90533] underline font-semibold"
                >
                  Basic Foster Family Home TBRI® Resource Guide
                </a>
                . All foundational TBRI® principles are enhanced with specialized developmental and behavioral supports
                for children with IDD/ASD. For complete information on core TBRI® principles, please refer to the{" "}
                <a href="/forms/basic-tbri-resource-guide" className="text-[#5E3989] hover:text-[#A90533] underline">
                  foundational guide
                </a>
                .
              </AlertDescription>
            </Alert>

            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                Refuge House implements <strong>Trust-Based Relational Intervention® (TBRI®)</strong> as our primary
                treatment model, enhanced with developmental and behavioral supports for providing the T3C IDD/Autism
                Spectrum Disorder Support Services. TBRI provides the trauma-informed, attachment-based foundation
                essential for children in foster care, while incorporating evidence-based practices for children who
                have or are pending DSM-5 diagnoses of Intellectual or Developmental Disability and/or Autism Spectrum
                Disorder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#A90533] pb-2">
                Enhanced TBRI® Framework
              </h2>
              <p className="text-gray-700 mb-4">
                This package builds upon the{" "}
                <a href="/forms/basic-tbri-resource-guide" className="text-[#5E3989] hover:text-[#A90533] underline">
                  foundational TBRI® model
                </a>{" "}
                with developmental and behavioral adaptations:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-[#5E3989]/20 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989]">Connecting Principles +</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Visual communication supports and social stories</li>
                      <li>Alternative communication methods when verbal language is limited</li>
                      <li>Sensory-aware connection strategies</li>
                      <li>Structured social interactions with clear expectations</li>
                      <li>Modified eye contact expectations based on comfort</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-[#A90533]/20 bg-pink-50">
                  <CardHeader>
                    <CardTitle className="text-[#A90533]">Empowering Principles +</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Visual schedules and routine-based structure</li>
                      <li>Sensory accommodations based on individual assessment</li>
                      <li>Environmental modifications to support regulation</li>
                      <li>Predictable transitions with advance warnings</li>
                      <li>Physical activity and motor skill support</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-[#5E3989]/20 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989]">Correcting Principles +</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Positive Behavioral Interventions and Supports (PBIS)</li>
                      <li>Visual behavior support strategies</li>
                      <li>Functional communication training</li>
                      <li>Skills taught at developmental level</li>
                      <li>Natural consequences with cognitive considerations</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Service Integration */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">
                Service Integration
              </h2>

              <div className="space-y-4">
                <Card className="border-l-4 border-[#5E3989]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#5E3989]">Required Therapeutic Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Individual therapy weekly (adapted for developmental level)</li>
                      <li>Family therapy as appropriate to strengthen relationships</li>
                      <li>Speech and language therapy based on assessment</li>
                      <li>Occupational therapy for sensory and motor needs</li>
                      <li>Social skills groups using evidence-based curricula</li>
                      <li>Behavioral support services for skill development</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#A90533]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#A90533]">Medical Support Structure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>24/7 Registered Nurse availability for consultation and crisis support</li>
                      <li>Custom care plans addressing individual medical complexities</li>
                      <li>Medication administration protocols with specialized monitoring</li>
                      <li>Coordination with developmental specialists</li>
                      <li>Management of co-occurring conditions common in IDD/ASD</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Well-being Needs */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#A90533] pb-2">
                Meeting Custom Physical, Emotional, Social, and Spiritual Well-being Needs
              </h2>

              <div className="space-y-4">
                <Card className="border-l-4 border-[#5E3989]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#5E3989]">Physical Well-being</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 italic">
                      Up to 70% of children with autism have at least one co-occurring medical condition
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Proactive monitoring of common co-occurring conditions</li>
                      <li>Nutrition planning that respects food selectivity</li>
                      <li>Adapted physical activities accommodating motor differences</li>
                      <li>Medication management with careful monitoring</li>
                      <li>Dental care accommodations for sensory sensitivities</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#A90533]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#A90533]">Emotional Well-being</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 italic">
                      Supporting emotional health with understanding of developmental differences
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Visual emotion identification tools (zones of regulation)</li>
                      <li>Coping strategies taught at developmental level</li>
                      <li>Recognition that challenging behavior communicates emotional needs</li>
                      <li>Structured approaches to managing anxiety and depression</li>
                      <li>Trauma-informed adaptations respecting processing differences</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#5E3989]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#5E3989]">Social Well-being</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 italic">
                      Creating opportunities for positive social engagement in adaptive ways
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Supported opportunities for peer interaction in structured settings</li>
                      <li>Teaching social cues through direct instruction and role-playing</li>
                      <li>Facilitating participation in community activities with accommodations</li>
                      <li>Building self-advocacy skills for navigating social situations</li>
                      <li>Emphasis on inclusive practices within foster family and community</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#A90533]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#A90533]">Spiritual Well-being</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 italic">
                      Finding meaning and purpose through individualized approaches
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Respecting and supporting diverse religious/spiritual beliefs</li>
                      <li>Providing opportunities for connection to nature and contemplative practices</li>
                      <li>Encouraging expression of personal values and sense of self-worth</li>
                      <li>Access to spiritual guidance or community groups with accommodations</li>
                      <li>Focus on inner peace and sense of belonging</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Evidence Base */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">
                Evidence-Based Practice Foundation
              </h2>

              <Alert className="border-[#5E3989]/20 bg-purple-50 mb-4">
                <AlertDescription>
                  <strong className="text-[#5E3989]">CEBC Recognition:</strong> TBRI® Caregiver Training is rated as a{" "}
                  <strong>"Promising Practice"</strong> by the California Evidence-Based Clearinghouse for Child
                  Welfare, demonstrating improved outcomes for children who experienced trauma, abuse, and neglect.
                </AlertDescription>
              </Alert>

              <Alert className="border-[#A90533]/20 bg-pink-50">
                <AlertDescription>
                  <strong className="text-[#A90533]">Title IV-E Recognition:</strong> TBRI® is recognized by the Title
                  IV-E Prevention Services Clearinghouse for mental health prevention and treatment, making it eligible
                  for use in programs requiring evidence-based, trauma-informed interventions.
                </AlertDescription>
              </Alert>

              <div className="mt-6 space-y-3">
                <h3 className="font-bold text-gray-800">Key Research Findings:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Significant improvement in attachment behaviors when TBRI is adapted for IDD/ASD</li>
                  <li>Behavioral interventions in family settings show better outcomes than clinic-only services</li>
                  <li>Visual supports combined with TBRI demonstrate improved compliance</li>
                  <li>Family-based interventions show measurable improvements in family functioning</li>
                </ul>
              </div>
            </section>

            {/* Trauma-Informed Approach */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#A90533] pb-2">
                Trauma-Informed Approach for Children Who Have Experienced Abuse and Neglect
              </h2>
              <Alert className="border-[#5E3989]/20 bg-purple-50 mb-6">
                <AlertDescription>
                  Children with IDD/ASD face significantly higher rates of abuse and neglect than their neurotypical
                  peers, with studies showing they are 3-4 times more likely to experience maltreatment.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-[#5E3989]/20 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989]">Assessment Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      The CANS 3.0 serves as our primary assessment tool, with careful attention to how developmental
                      differences may impact trauma presentation. The 90-day CANS reassessment allows us to track
                      progress while considering developmental factors.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-[#A90533]/20 bg-pink-50">
                  <CardHeader>
                    <CardTitle className="text-[#A90533]">Treatment Adaptations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Trauma treatment is made accessible through developmental adaptations that respect each child's
                      communication style and cognitive abilities. Our therapists use evidence-based approaches modified
                      for developmental level.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-[#5E3989]/20 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989]">Caregiver Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Foster parents caring for children with both developmental disabilities and trauma histories need
                      comprehensive preparation and ongoing support, including training on recognizing trauma signs and
                      24/7 consultation access.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Staffing Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">
                Enhanced Staffing Structure
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-l-4 border-[#5E3989]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#5E3989]">Clinical Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Treatment Director with IDD/ASD specialization</li>
                      <li>Licensed therapists (1:12 ratio)</li>
                      <li>Behavior specialists (1:15 ratio)</li>
                      <li>Registered Nurse (24/7 availability)</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#A90533]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#A90533]">Case Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Reduced caseload ratios (1:15)</li>
                      <li>Extensive IDD service systems training</li>
                      <li>Weekly clinical consultation</li>
                      <li>Coordination with developmental specialists</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Expected Outcomes */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#A90533] pb-2">
                Expected Outcomes
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#A90533] mb-2">Short-Term (3-6 months):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Significant reductions in challenging behaviors</li>
                    <li>Improved emotional regulation</li>
                    <li>Engagement in therapeutic services</li>
                    <li>Placement stability maintained</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#A90533] mb-2">Intermediate (6-12 months):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Measurable improvements in daily living skills and adaptive functioning</li>
                    <li>Increased success in educational inclusion with appropriate supports</li>
                    <li>Enhanced coping skills</li>
                    <li>Strengthened caregiver-child relationships</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#A90533] mb-2">Long-Term (12+ months):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Trauma symptom reduction</li>
                    <li>Achievement of permanency goals</li>
                    <li>Successful step-down to lower level of care when appropriate</li>
                    <li>Improved overall well-being and functioning</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Quality Assurance */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">
                Quality Assurance and Fidelity
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>90-day CANS 3.0 administration with clinical interpretation</li>
                <li>Progress toward individualized Service Plan goals</li>
                <li>Medical stability and medication effectiveness review</li>
                <li>Educational progress including IEP goal attainment</li>
                <li>Behavioral data analysis showing trends</li>
                <li>
                  Continuous quality improvement process aligned with{" "}
                  <a href="/forms/idd-autism-cqi-model" className="text-[#5E3989] hover:text-[#A90533] underline">
                    CQI Model
                  </a>
                </li>
              </ul>
            </section>

            {/* Related Resources */}
            <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-[#5E3989] mb-4">Related Resources</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="/forms/basic-tbri-resource-guide"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-[#5E3989]"
                >
                  <h3 className="font-bold text-[#5E3989] mb-2">Foundational TBRI® Guide</h3>
                  <p className="text-sm text-gray-600">
                    Complete resource guide with core principles and education plan
                  </p>
                </a>
                <a
                  href="/forms/idd-autism-logic-model"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-[#A90533]"
                >
                  <h3 className="font-bold text-[#A90533] mb-2">Logic Model</h3>
                  <p className="text-sm text-gray-600">Visual representation of inputs, activities, and outcomes</p>
                </a>
                <a
                  href="/forms/idd-autism-cqi-model"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-[#5E3989]"
                >
                  <h3 className="font-bold text-[#5E3989] mb-2">CQI Model</h3>
                  <p className="text-sm text-gray-600">Continuous quality improvement cycle and process</p>
                </a>
              </div>
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
              <strong>Last Revised:</strong> September 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
