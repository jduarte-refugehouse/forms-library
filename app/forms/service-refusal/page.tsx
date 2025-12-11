"use client"

import { useState } from "react"
import { AlertTriangle, Save, Mail, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const HelpTooltip = ({ text }: { text: string }) => (
  <div className="group relative inline-block ml-2">
    <div className="w-4 h-4 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs cursor-help">
      ?
    </div>
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 w-64">
      {text}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
    </div>
  </div>
)

export default function ServiceRefusalDocumentationForm() {
  const [refusalData, setRefusalData] = useState({
    // Basic Information
    childName: "",
    caseNumber: "",
    packageType: "",
    otherPackageType: "",
    refusalDate: new Date().toISOString().split("T")[0],

    // Refusal Details
    whoRefused: "",
    refusalReason: "",

    // Documentation
    conversationNotes: "",
    servicesRemainAvailable: true,

    // Follow-up Plan
    monthlyContactPlanned: true,
    letterSent: false,
    letterSentDate: "",

    // Program Director Approval (for optional packages)
    programDirectorName: "",
    approvalDate: "",
    clinicalJustificationDocumented: false,

    // Additional Notes
    additionalNotes: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const packageTypes = [
    {
      value: "mental",
      label: "Mental & Behavioral Health Support Services",
      helpText: "Required aftercare: 6 months, twice monthly. Include STAR Health Coordinator if assigned.",
      required: true,
    },
    {
      value: "idd",
      label: "IDD/Autism Spectrum Disorder Support Services",
      helpText: "Required aftercare: 6 months, twice monthly. Education Portfolio required.",
      required: true,
    },
    {
      value: "substance-use",
      label: "Substance Use Support Services",
      helpText: "Required aftercare: 6 months, twice monthly. Recovery-focused support with MAT compliance monitoring if applicable.",
      required: true,
    },
    {
      value: "treatment",
      label: "T3C Treatment Foster Family Care Support Services",
      helpText: "Required aftercare: 6 months, twice monthly. Weekly contact schedule.",
      required: true,
    },
    {
      value: "stass",
      label: "Short-Term Assessment Support Services (STASS)",
      helpText: "⚠️ STASS does NOT require aftercare - time-limited assessment placement (30-45 days). Aftercare provided under receiving package.",
      required: false,
      noAftercare: true,
    },
    {
      value: "basic",
      label: "Basic Foster Home",
      helpText: "Optional aftercare - requires Program Director approval.",
      required: false,
    },
    {
      value: "transition-support",
      label: "Transition Support Services Add-On",
      helpText: "6-month transition support required. Alumni information mandatory. PAL resources available.",
      required: false,
    },
    {
      value: "kinship-addon",
      label: "Kinship Caregiver Support Add-On",
      helpText: "30-day pre-permanency planning required. Focus on family support services.",
      required: false,
    },
    {
      value: "pregnant-parenting-addon",
      label: "Pregnant & Parenting Youth Add-On",
      helpText: "Focus on dual-generation support. Include parenting education and support services.",
      required: false,
    },
    {
      value: "emergency",
      label: "Emergency Shelter Services",
      helpText: "Optional aftercare - requires Program Director approval.",
      required: false,
    },
    {
      value: "therapeutic",
      label: "Therapeutic Foster Care Services",
      helpText: "Optional aftercare - requires Program Director approval.",
      required: false,
    },
    {
      value: "kinship",
      label: "Kinship Care Services",
      helpText: "30-day pre-permanency planning required. Focus on family support.",
      required: false,
    },
    {
      value: "adoption",
      label: "Adoption Support Services",
      helpText: "Post-adoption support planning and family integration.",
      required: false,
    },
    {
      value: "independent",
      label: "Independent Living Services",
      helpText: "6-month transition support required. Alumni information mandatory.",
      required: false,
    },
    {
      value: "respite",
      label: "Respite Care Services",
      helpText: "Short-term support coordination with primary placement.",
      required: false,
    },
    {
      value: "family-preservation",
      label: "Family Preservation Services",
      helpText: "Family strengthening and prevention strategies.",
      required: false,
    },
    {
      value: "reunification",
      label: "Family Reunification Services",
      helpText: "Transition planning and safety assessment required.",
      required: false,
    },
    {
      value: "other",
      label: "Other (please specify)",
      helpText: "Requires Program Director approval and detailed justification.",
      required: false,
    },
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setRefusalData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Clear other package type when not "other"
    if (name === "packageType" && value !== "other") {
      setRefusalData((prev) => ({ ...prev, otherPackageType: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    const selectedPackage = packageTypes.find((p) => p.value === refusalData.packageType)

    if (!refusalData.childName) newErrors.childName = "Child name is required"
    if (!refusalData.caseNumber) newErrors.caseNumber = "Case number is required"
    if (!refusalData.packageType) newErrors.packageType = "Package type is required"
    if (refusalData.packageType === "other" && !refusalData.otherPackageType) {
      newErrors.otherPackageType = "Please specify the other package type"
    }
    if (!refusalData.whoRefused) newErrors.whoRefused = "Please specify who refused services"
    if (!refusalData.refusalReason) newErrors.refusalReason = "Please document the reason for refusal"
    if (!refusalData.conversationNotes) newErrors.conversationNotes = "Please document the refusal conversation"

    // Validation for optional packages requiring Program Director approval
    if (selectedPackage && !selectedPackage.required) {
      if (!refusalData.programDirectorName) {
        newErrors.programDirectorName = "Program Director name is required for optional aftercare"
      }
      if (!refusalData.approvalDate) {
        newErrors.approvalDate = "Approval date is required for optional aftercare"
      }
      if (!refusalData.clinicalJustificationDocumented) {
        newErrors.clinicalJustificationDocumented = "Clinical justification must be documented for optional aftercare"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }, 1000)
  }

  const generateSimpleLetter = () => {
    const selectedPackage = packageTypes.find((p) => p.value === refusalData.packageType)
    const packageLabel =
      refusalData.packageType === "other" ? refusalData.otherPackageType : selectedPackage?.label || ""

    let specificServices = ""

    switch (refusalData.packageType) {
      case "transition-support":
      case "independent":
        specificServices =
          "These services include PAL (Positive Adult Liaisons) resources, independent living skills support, and alumni network connections."
        break
      case "pregnant-parenting-addon":
        specificServices =
          "These services include parenting education, dual-generation support, childcare resources, and family planning assistance."
        break
      case "kinship-addon":
      case "kinship":
        specificServices =
          "These services include family support services, kinship caregiver resources, and family strengthening programs."
        break
      case "mental":
        specificServices =
          "These services include mental health support, behavioral health resources, and coordination with STAR Health if applicable."
        break
      case "idd":
        specificServices =
          "These services include educational portfolio support, developmental services, and specialized autism spectrum resources."
        break
      case "substance-use":
        specificServices =
          "These services include recovery support, relapse prevention planning, MAT compliance monitoring (if applicable), sober support network connections, and coordination with substance use treatment providers."
        break
      case "treatment":
        specificServices =
          "These services include continued therapeutic support, TBRI-informed transition assistance, and connection with ongoing treatment resources."
        break
      case "stass":
        specificServices =
          "Note: STASS is a time-limited assessment placement and does not typically include aftercare services. Aftercare will be provided under the recommended receiving service package."
        break
      default:
        specificServices =
          "These services include case management support, referrals, and assistance with transition needs."
    }

    const letter = `
Date: ${new Date().toLocaleDateString()}

Re: ${refusalData.childName} - Case #${refusalData.caseNumber}
Service Package: ${packageLabel}

This letter confirms that aftercare services were offered and declined on ${new Date(refusalData.refusalDate).toLocaleDateString()}.

${specificServices}

Aftercare services remain available should you choose to access them in the future. To access services at any time during the 6-month aftercare period, please contact your aftercare case manager.

We will continue monthly check-ins to ensure you have our current contact information and to offer services if your needs change.

${
  selectedPackage && !selectedPackage.required
    ? `
Program Director Approval: ${refusalData.programDirectorName}
Approval Date: ${new Date(refusalData.approvalDate).toLocaleDateString()}
Clinical Justification: Documented
`
    : ""
}
`

    // In a real implementation, this would generate a PDF
    alert("Letter template generated. In production, this would create a downloadable PDF.")

    setRefusalData((prev) => ({
      ...prev,
      letterSent: true,
      letterSentDate: new Date().toISOString().split("T")[0],
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Form Directory
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Refusal Documentation (Draft)</h1>
              <p className="text-gray-600">Simple documentation when aftercare services are declined</p>
            </div>
          </div>

          {/* Draft Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              <p className="font-medium">This is a draft form for review and evaluation purposes only.</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2 text-yellow-500" />
                  Service Refusal Documentation
                </h2>
                <p className="text-sm text-gray-600 mt-1">Simple documentation when aftercare services are declined</p>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                Draft
              </Badge>
            </div>

            {showSuccess && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Service refusal documented successfully!
              </div>
            )}

            <div className="space-y-6">
              {/* Basic Information */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Child Name *</label>
                    <input
                      type="text"
                      name="childName"
                      value={refusalData.childName}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${errors.childName ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.childName && <p className="text-red-500 text-sm mt-1">{errors.childName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Case Number *</label>
                    <input
                      type="text"
                      name="caseNumber"
                      value={refusalData.caseNumber}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${errors.caseNumber ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.caseNumber && <p className="text-red-500 text-sm mt-1">{errors.caseNumber}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      Service Package *
                      <HelpTooltip text="Select the service package to understand what aftercare services are being declined." />
                    </label>
                    <select
                      name="packageType"
                      value={refusalData.packageType}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${errors.packageType ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select package</option>
                      {packageTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {refusalData.packageType &&
                      packageTypes.find((t) => t.value === refusalData.packageType)?.helpText && (
                        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                          <strong>Package Requirements:</strong>{" "}
                          {packageTypes.find((t) => t.value === refusalData.packageType)?.helpText}
                        </div>
                      )}
                    {errors.packageType && <p className="text-red-500 text-sm mt-1">{errors.packageType}</p>}
                  </div>

                  {refusalData.packageType && (
                    <div className="md:col-span-2">
                      {packageTypes.find((t) => t.value === refusalData.packageType)?.required ? (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center gap-2 text-red-800">
                            <AlertTriangle className="h-5 w-5" />
                            <strong>Required Aftercare Package</strong>
                          </div>
                          <p className="text-sm text-red-700 mt-1">
                            This is a required aftercare package. Document thoroughly and ensure services remain
                            available. Consider alternative engagement strategies.
                          </p>
                        </div>
                      ) : (
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center gap-2 text-blue-800">
                            <AlertTriangle className="h-5 w-5" />
                            <strong>Optional Aftercare Package</strong>
                          </div>
                          <p className="text-sm text-blue-700 mt-1">
                            Program Director approval required for optional aftercare. Document the refusal and ensure
                            the family knows services remain available if needed.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Program Director Approval Section for Optional Packages */}
                  {refusalData.packageType &&
                    !packageTypes.find((t) => t.value === refusalData.packageType)?.required && (
                      <div className="md:col-span-2">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-4">
                          <h3 className="text-lg font-semibold text-yellow-800 flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            Program Director Approval Required
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Program Director Name *
                              </label>
                              <input
                                type="text"
                                name="programDirectorName"
                                value={refusalData.programDirectorName}
                                onChange={handleInputChange}
                                placeholder="Enter Program Director's name"
                                className={`w-full p-2 border rounded-md ${errors.programDirectorName ? "border-red-500" : "border-gray-300"}`}
                              />
                              {errors.programDirectorName && (
                                <p className="text-red-500 text-sm mt-1">{errors.programDirectorName}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Approval Date *</label>
                              <input
                                type="date"
                                name="approvalDate"
                                value={refusalData.approvalDate}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded-md ${errors.approvalDate ? "border-red-500" : "border-gray-300"}`}
                              />
                              {errors.approvalDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.approvalDate}</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="clinicalJustificationDocumented"
                                checked={refusalData.clinicalJustificationDocumented}
                                onChange={handleInputChange}
                                className="mr-2"
                              />
                              <span className="text-sm font-medium text-gray-700">
                                Clinical Justification Documented *
                              </span>
                            </label>
                            {errors.clinicalJustificationDocumented && (
                              <p className="text-red-500 text-sm mt-1">{errors.clinicalJustificationDocumented}</p>
                            )}
                            <p className="text-xs text-gray-600 mt-1">
                              Confirm that clinical justification for optional aftercare has been documented in case
                              file
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                  {refusalData.packageType === "other" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please specify other package type *
                      </label>
                      <input
                        type="text"
                        name="otherPackageType"
                        value={refusalData.otherPackageType}
                        onChange={handleInputChange}
                        placeholder="Enter the specific package type"
                        className={`w-full p-2 border rounded-md ${errors.otherPackageType ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.otherPackageType && (
                        <p className="text-red-500 text-sm mt-1">{errors.otherPackageType}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Refusal</label>
                    <input
                      type="date"
                      name="refusalDate"
                      value={refusalData.refusalDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </section>

              {/* Refusal Details */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Refusal Details</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Who Refused Services? *</label>
                  <input
                    type="text"
                    name="whoRefused"
                    value={refusalData.whoRefused}
                    onChange={handleInputChange}
                    placeholder="e.g., Youth, Parent/Guardian, Caregiver"
                    className={`w-full p-2 border rounded-md ${errors.whoRefused ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.whoRefused && <p className="text-red-500 text-sm mt-1">{errors.whoRefused}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Refusal *</label>
                  <textarea
                    name="refusalReason"
                    value={refusalData.refusalReason}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Brief summary of why services were declined"
                    className={`w-full p-2 border rounded-md ${errors.refusalReason ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.refusalReason && <p className="text-red-500 text-sm mt-1">{errors.refusalReason}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conversation Notes *</label>
                  <textarea
                    name="conversationNotes"
                    value={refusalData.conversationNotes}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Document what was discussed during the refusal conversation, including that services remain available"
                    className={`w-full p-2 border rounded-md ${errors.conversationNotes ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.conversationNotes && <p className="text-red-500 text-sm mt-1">{errors.conversationNotes}</p>}
                </div>
              </section>

              {/* Documentation Actions */}
              <section className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">Documentation & Follow-up</h2>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-sm text-blue-800">
                    Document that services remain available and plan for continued outreach as appropriate.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="servicesRemainAvailable"
                      checked={refusalData.servicesRemainAvailable}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Informed that aftercare services remain available
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="monthlyContactPlanned"
                      checked={refusalData.monthlyContactPlanned}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Will continue monthly check-ins to offer services
                    </span>
                  </label>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Optional: Send formal letter</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Generate a letter documenting the refusal and ongoing availability of services
                    </p>
                    {refusalData.letterSent && (
                      <p className="text-xs text-green-600 mt-2">
                        ✓ Letter generated on {new Date(refusalData.letterSentDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={generateSimpleLetter}
                    disabled={refusalData.letterSent}
                    className={`px-4 py-2 rounded-md flex items-center ${
                      refusalData.letterSent
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    {refusalData.letterSent ? "Letter Sent" : "Generate Letter"}
                  </button>
                </div>
              </section>

              {/* Additional Notes */}
              <section className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={refusalData.additionalNotes}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any other relevant information"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Documentation"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
