"use client"

import { useState } from "react"
import { Phone, CheckCircle, Send, ArrowLeft, AlertCircle } from "lucide-react"
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

export default function QuickPhoneWidget() {
  const [formData, setFormData] = useState({
    servicePackage: "",
    contactPurpose: "",
    childName: "",
    caseNumber: "",
    contactDate: new Date().toISOString().split("T")[0],
    contactTime: new Date().toTimeString().slice(0, 5),
    duration: "",
    contactMethod: "phone",
    contactedBy: "",
    summary: "",
    followUpNeeded: false,
    followUpDate: "",
    followUpNotes: "",

    // Package-specific quick checks
    childWelfareCheck: false,
    transitionGoalsProgress: false,
    familyStabilityMaintained: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const servicePackages = [
    {
      value: "mental",
      label: "Mental & Behavioral Health Support Services (Required)",
      required: true,
      helpText: "6 months, twice monthly contact minimum. Include STAR Health Coordinator if assigned.",
    },
    {
      value: "idd",
      label: "IDD/Autism Spectrum Disorder Support Services (Required)",
      required: true,
      helpText: "6 months, twice monthly contact minimum. Education Portfolio required for all cases.",
    },
    {
      value: "treatment",
      label: "T3C Treatment Foster Family Care Support Services (Required)",
      required: true,
      helpText: "6 months, twice monthly contact minimum. Weekly contact schedule required.",
    },
    {
      value: "independent",
      label: "Independent Living Services",
      required: true,
      helpText: "6-month transition support required. Alumni information mandatory for tracking.",
    },
    {
      value: "transition",
      label: "Transition Support Services Add-On",
      required: false,
      helpText: "PAL worker support and alumni connections. Weekly to monthly contact schedule.",
    },
    {
      value: "kinship",
      label: "Kinship Caregiver Support Add-On",
      required: false,
      helpText: "30-day pre-permanency planning required. Focus on family support and stability.",
    },
    {
      value: "pregnant-parenting",
      label: "Pregnant & Parenting Youth Add-On",
      required: false,
      helpText: "Focus on dual-generation support. Include parenting education and child development.",
    },
    {
      value: "basic",
      label: "Basic Foster Home (Optional)",
      required: false,
      helpText: "Optional aftercare - requires Program Director approval.",
    },
    {
      value: "emergency",
      label: "Emergency Shelter Services",
      required: false,
      helpText: "Optional aftercare - requires Program Director approval.",
    },
    {
      value: "therapeutic",
      label: "Therapeutic Foster Care Services",
      required: false,
      helpText: "Optional aftercare - requires Program Director approval.",
    },
    {
      value: "adoption",
      label: "Adoption Support Services",
      required: false,
      helpText: "Post-adoption support planning. Include family integration strategies.",
    },
    {
      value: "respite",
      label: "Respite Care Services",
      required: false,
      helpText: "Short-term support planning. Coordinate with primary placement.",
    },
    {
      value: "family-preservation",
      label: "Family Preservation Services",
      required: false,
      helpText: "Focus on family strengthening and prevention strategies.",
    },
    {
      value: "reunification",
      label: "Family Reunification Services",
      required: false,
      helpText: "Transition planning for family reunification. Safety planning required.",
    },
  ]

  const getContactPurposes = () => {
    const basePurposes = [
      "Routine Check-in",
      "Crisis Support",
      "Appointment Reminder",
      "Service Coordination",
      "Documentation Follow-up",
      "Resource Referral",
      "Other",
    ]

    const packageSpecificPurposes = []

    // Add package-specific purposes
    if (formData.servicePackage === "transition" || formData.servicePackage === "independent") {
      packageSpecificPurposes.push("PAL Check-in", "Alumni Connection")
    }

    if (formData.servicePackage === "pregnant-parenting") {
      packageSpecificPurposes.push("Parenting Support", "Benefits Review")
    }

    if (formData.servicePackage === "kinship") {
      packageSpecificPurposes.push("Caregiver Support", "Benefits Review")
    }

    return [...packageSpecificPurposes, ...basePurposes]
  }

  const contactMethods = [
    { value: "phone", label: "Phone Call" },
    { value: "text", label: "Text Message" },
    { value: "email", label: "Email" },
    { value: "in-person", label: "In-Person" },
    { value: "video", label: "Video Call" },
  ]

  const durations = [
    { value: "5", label: "5 minutes" },
    { value: "10", label: "10 minutes" },
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "1 hour" },
    { value: "other", label: "Other" },
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Reset contact purpose when package changes
    if (name === "servicePackage") {
      setFormData((prev) => ({
        ...prev,
        contactPurpose: "",
      }))
    }

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.servicePackage) newErrors.servicePackage = "Service package is required"
    if (!formData.contactPurpose) newErrors.contactPurpose = "Contact purpose is required"
    if (!formData.childName) newErrors.childName = "Child name is required"
    if (!formData.caseNumber) newErrors.caseNumber = "Case number is required"
    if (!formData.contactDate) newErrors.contactDate = "Contact date is required"
    if (!formData.contactTime) newErrors.contactTime = "Contact time is required"
    if (!formData.duration) newErrors.duration = "Duration is required"
    if (!formData.contactedBy) newErrors.contactedBy = "Contacted by field is required"
    if (!formData.summary) newErrors.summary = "Contact summary is required"

    if (formData.followUpNeeded && !formData.followUpDate) {
      newErrors.followUpDate = "Follow-up date is required when follow-up is needed"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)

      // Reset form
      setFormData({
        servicePackage: "",
        contactPurpose: "",
        childName: "",
        caseNumber: "",
        contactDate: new Date().toISOString().split("T")[0],
        contactTime: new Date().toTimeString().slice(0, 5),
        duration: "",
        contactMethod: "phone",
        contactedBy: "",
        summary: "",
        followUpNeeded: false,
        followUpDate: "",
        followUpNotes: "",
        childWelfareCheck: false,
        transitionGoalsProgress: false,
        familyStabilityMaintained: false,
      })
    }, 1000)
  }

  const getPackageReminder = () => {
    const selectedPackage = servicePackages.find((pkg) => pkg.value === formData.servicePackage)
    if (!selectedPackage) return null

    const reminderMap = {
      mental: "Remember to document therapy attendance and crisis plan updates",
      idd: "Check education portfolio status and behavior plan implementation",
      treatment: "Document weekly contact schedule and treatment progress",
      independent: "Review transition goals and alumni network connections",
      transition: "Check PAL worker contact and transition domain progress",
      kinship: "Assess family stability and permanency planning progress",
      "pregnant-parenting": "Review dual-generation support and child welfare",
      basic: "Document optional aftercare justification",
      emergency: "Note temporary placement status and next steps",
      therapeutic: "Review therapeutic interventions and progress",
      adoption: "Check post-adoption adjustment and support needs",
      respite: "Coordinate with primary placement provider",
      "family-preservation": "Document family strengthening activities",
      reunification: "Review safety plan and family progress",
    }

    return reminderMap[formData.servicePackage]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Form Directory
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <Phone className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quick Phone Contact Widget</h1>
              <p className="text-gray-600">Fast logging for brief phone contacts and check-ins</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Quick Contact Log</h2>
                <p className="text-sm text-gray-600">Log brief contacts and check-ins efficiently</p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Quick Entry
              </Badge>
            </div>

            {showSuccess && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Contact logged successfully!
              </div>
            )}

            <div className="space-y-6">
              {/* Service Package */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  Service Package *
                  <HelpTooltip text="Select the service package to show relevant contact options and reminders." />
                </label>
                <select
                  name="servicePackage"
                  value={formData.servicePackage}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${errors.servicePackage ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select service package</option>
                  {servicePackages.map((pkg) => (
                    <option key={pkg.value} value={pkg.value}>
                      {pkg.label}
                    </option>
                  ))}
                </select>
                {formData.servicePackage &&
                  servicePackages.find((p) => p.value === formData.servicePackage)?.helpText && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                      <strong>Package Info:</strong>{" "}
                      {servicePackages.find((p) => p.value === formData.servicePackage)?.helpText}
                    </div>
                  )}
                {errors.servicePackage && <p className="text-red-500 text-sm mt-1">{errors.servicePackage}</p>}
              </div>

              {/* Contact Purpose */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Purpose *</label>
                <select
                  name="contactPurpose"
                  value={formData.contactPurpose}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${errors.contactPurpose ? "border-red-500" : "border-gray-300"}`}
                  disabled={!formData.servicePackage}
                >
                  <option value="">Select contact purpose</option>
                  {getContactPurposes().map((purpose) => (
                    <option key={purpose} value={purpose}>
                      {purpose}
                    </option>
                  ))}
                </select>
                {errors.contactPurpose && <p className="text-red-500 text-sm mt-1">{errors.contactPurpose}</p>}
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Child Name *</label>
                  <input
                    type="text"
                    name="childName"
                    value={formData.childName}
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
                    value={formData.caseNumber}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${errors.caseNumber ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.caseNumber && <p className="text-red-500 text-sm mt-1">{errors.caseNumber}</p>}
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Date *</label>
                  <input
                    type="date"
                    name="contactDate"
                    value={formData.contactDate}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${errors.contactDate ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.contactDate && <p className="text-red-500 text-sm mt-1">{errors.contactDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Time *</label>
                  <input
                    type="time"
                    name="contactTime"
                    value={formData.contactTime}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${errors.contactTime ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.contactTime && <p className="text-red-500 text-sm mt-1">{errors.contactTime}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${errors.duration ? "border-red-500" : "border-gray-300"}`}
                  >
                    <option value="">Select duration</option>
                    {durations.map((duration) => (
                      <option key={duration.value} value={duration.value}>
                        {duration.label}
                      </option>
                    ))}
                  </select>
                  {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Method</label>
                  <select
                    name="contactMethod"
                    value={formData.contactMethod}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {contactMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contacted By *</label>
                  <input
                    type="text"
                    name="contactedBy"
                    value={formData.contactedBy}
                    onChange={handleInputChange}
                    placeholder="Staff member name"
                    className={`w-full p-2 border rounded-md ${errors.contactedBy ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.contactedBy && <p className="text-red-500 text-sm mt-1">{errors.contactedBy}</p>}
                </div>
              </div>

              {/* Package-Specific Quick Checks */}
              {formData.servicePackage === "pregnant-parenting" && (
                <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                  <h3 className="text-lg font-medium text-pink-800 mb-3">Pregnant/Parenting Quick Check</h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="childWelfareCheck"
                      checked={formData.childWelfareCheck}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Child welfare check completed?</span>
                  </label>
                </div>
              )}

              {(formData.servicePackage === "transition" || formData.servicePackage === "independent") && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-medium text-blue-800 mb-3">Transition Support Quick Check</h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="transitionGoalsProgress"
                      checked={formData.transitionGoalsProgress}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Progress on transition goals?</span>
                  </label>
                </div>
              )}

              {formData.servicePackage === "kinship" && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="text-lg font-medium text-green-800 mb-3">Kinship Support Quick Check</h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="familyStabilityMaintained"
                      checked={formData.familyStabilityMaintained}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Family stability maintained?</span>
                  </label>
                </div>
              )}

              {/* Package Reminder */}
              {getPackageReminder() && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <AlertCircle className="h-5 w-5" />
                    <p className="font-medium">Package Reminder:</p>
                  </div>
                  <p className="text-yellow-700 mt-1">{getPackageReminder()}</p>
                </div>
              )}

              {/* Contact Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Summary *</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Brief summary of the contact..."
                  className={`w-full p-2 border rounded-md ${errors.summary ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
              </div>

              {/* Follow-up */}
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="followUpNeeded"
                    checked={formData.followUpNeeded}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Follow-up needed</span>
                </label>

                {formData.followUpNeeded && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date *</label>
                      <input
                        type="date"
                        name="followUpDate"
                        value={formData.followUpDate}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.followUpDate ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.followUpDate && <p className="text-red-500 text-sm mt-1">{errors.followUpDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Notes</label>
                      <textarea
                        name="followUpNotes"
                        value={formData.followUpNotes}
                        onChange={handleInputChange}
                        rows="2"
                        placeholder="What needs to be followed up on?"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400 flex items-center justify-center text-lg font-medium"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting ? "Logging Contact..." : "Log Contact"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
