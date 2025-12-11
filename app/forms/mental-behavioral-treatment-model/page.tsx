import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function MentalBehavioralTreatmentModelPage() {
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
                T3C Mental and Behavioral Health Support Services
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="shadow-xl">
          <CardContent className="p-8 space-y-8">
            {/* Foundational Reference */}
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
                . All foundational TBRI® principles, education plans, and implementation strategies apply to this
                enhanced service package. For complete information on core TBRI® principles, please refer to the{" "}
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
                The T3C Mental and Behavioral Health Support Services package provides enhanced therapeutic
                interventions for children and youth with significant mental health needs. This model integrates
                evidence-based TBRI® principles with specialized clinical services to address complex trauma, behavioral
                challenges, and mental health diagnoses.
              </p>
            </section>

            {/* Enhanced TBRI Framework */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#A90533] pb-2">
                Enhanced TBRI® Framework
              </h2>
              <p className="text-gray-700 mb-4">
                This package builds upon the{" "}
                <a href="/forms/basic-tbri-resource-guide" className="text-[#5E3989] hover:text-[#A90533] underline">
                  foundational TBRI® model
                </a>{" "}
                with additional clinical components:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-[#5E3989]/20 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989]">Connecting Principles +</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Individual therapy sessions</li>
                      <li>Attachment-focused interventions</li>
                      <li>Trauma narrative work</li>
                      <li>Relationship repair strategies</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-[#A90533]/20 bg-pink-50">
                  <CardHeader>
                    <CardTitle className="text-[#A90533]">Empowering Principles +</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Psychiatric consultation</li>
                      <li>Medication management</li>
                      <li>Crisis intervention planning</li>
                      <li>Sensory integration therapy</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-[#5E3989]/20 bg-purple-50">
                  <CardHeader>
                    <CardTitle className="text-[#5E3989]">Correcting Principles +</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                      <li>Behavioral intervention plans</li>
                      <li>DBT skills training</li>
                      <li>Cognitive behavioral therapy</li>
                      <li>Safety planning protocols</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Clinical Services Integration */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">
                Clinical Services Integration
              </h2>

              <div className="space-y-4">
                <Card className="border-l-4 border-[#5E3989]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#5E3989]">Individual Therapy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Weekly individual therapy sessions provided by licensed therapists trained in trauma-informed
                      modalities including EMDR, TF-CBT, and attachment-based interventions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#A90533]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#A90533]">Psychiatric Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Access to psychiatric evaluation, medication management, and consultation for children with
                      diagnosed mental health conditions or complex behavioral presentations.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#5E3989]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#5E3989]">Crisis Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      24/7 crisis consultation available to foster parents and case managers, with mobile crisis
                      response when needed to prevent placement disruption.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#A90533]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#A90533]">Specialized Foster Parent Training</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Enhanced training beyond basic TBRI® certification, including therapeutic parenting techniques,
                      mental health first aid, and behavior management strategies for complex needs.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Evidence Base */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#A90533] pb-2">
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
                <h3 className="font-bold text-gray-800">Additional Evidence-Based Modalities:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <strong>Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)</strong> - Well-supported practice for
                    trauma treatment
                  </li>
                  <li>
                    <strong>Eye Movement Desensitization and Reprocessing (EMDR)</strong> - Effective for PTSD and
                    trauma symptoms
                  </li>
                  <li>
                    <strong>Dialectical Behavior Therapy (DBT)</strong> - Skills-based approach for emotion regulation
                  </li>
                  <li>
                    <strong>Parent-Child Interaction Therapy (PCIT)</strong> - Evidence-based for behavioral challenges
                  </li>
                </ul>
              </div>
            </section>

            {/* Target Population */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">
                Target Population
              </h2>
              <p className="text-gray-700 mb-4">
                Children and youth in DFPS conservatorship who require the Mental and Behavioral Health Support Services
                package due to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Diagnosed mental health conditions (depression, anxiety, PTSD, etc.)</li>
                <li>Complex trauma histories requiring therapeutic intervention</li>
                <li>Behavioral challenges that exceed basic foster care capacity</li>
                <li>Need for psychiatric services or medication management</li>
                <li>Risk of placement disruption without enhanced support</li>
                <li>History of multiple placement disruptions</li>
              </ul>
            </section>

            {/* Staffing Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#A90533] pb-2">
                Enhanced Staffing Structure
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-l-4 border-[#5E3989]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#5E3989]">Clinical Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Licensed Clinical Director</li>
                      <li>Licensed therapists (LCSW, LPC, LMFT)</li>
                      <li>Psychiatric consultant (MD or APRN)</li>
                      <li>Crisis intervention specialists</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#A90533]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#A90533]">Case Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      <li>Reduced caseload ratios (1:12)</li>
                      <li>Enhanced training requirements</li>
                      <li>Weekly clinical consultation</li>
                      <li>24/7 on-call availability</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Expected Outcomes */}
            <section>
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#5E3989] pb-2">
                Expected Outcomes
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#A90533] mb-2">Short-Term (3-6 months):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Reduction in crisis episodes</li>
                    <li>Improved emotional regulation</li>
                    <li>Engagement in therapeutic services</li>
                    <li>Placement stability maintained</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#A90533] mb-2">Intermediate (6-12 months):</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Decreased mental health symptoms</li>
                    <li>Improved behavioral functioning</li>
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
              <h2 className="text-2xl font-bold text-[#5E3989] mb-4 border-b-2 border-[#A90533] pb-2">
                Quality Assurance and Fidelity
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Monthly clinical supervision for all therapists</li>
                <li>Quarterly treatment model fidelity assessments</li>
                <li>Regular outcome measurement using standardized tools</li>
                <li>Case review by Clinical Director every 30 days</li>
                <li>
                  Continuous quality improvement process aligned with{" "}
                  <a
                    href="/forms/mental-behavioral-cqi-model"
                    className="text-[#5E3989] hover:text-[#A90533] underline"
                  >
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
                  href="/forms/mental-behavioral-logic-model"
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-[#A90533]"
                >
                  <h3 className="font-bold text-[#A90533] mb-2">Logic Model</h3>
                  <p className="text-sm text-gray-600">Visual representation of inputs, activities, and outcomes</p>
                </a>
                <a
                  href="/forms/mental-behavioral-cqi-model"
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
