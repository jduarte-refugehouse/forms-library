"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Plus, Trash2, FileText, Send, ArrowLeft, Users } from "lucide-react"
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

export default function AftercarePlanForm() {
  const [formData, setFormData] = useState({
    packageType: "",
    otherPackageType: "",
    childName: "",
    childDOB: "",
    dischargeDate: "",
    caseNumber: "",

    // Contact Information
    primaryContactMethod: "",
    phoneNumber: "",
    textNumber: "",
    email: "",
    rocketChatUsername: "",
    alternativeContact: "",
    alternativeContactPhone: "",
    mailingAddress: {
      street: "",
      city: "",
      state: "TX",
      zip: "",
    },
    addressVerified: false,
    preferredContactTimes: [],

    // NEW FIELDS - Enhancement Requirements
    aftercareStaffStartDate: "", // Required per Enhancement Request III.B.4.2
    monthlySubmissionConfirmed: false,
    lastMonthlySubmission: "",
    activationDate: "", // Auto-set to 90 days before discharge

    // Package-specific fields
    // Mental & Behavioral Health
    therapistName: "",
    therapistPhone: "",
    nextTherapyAppointment: "",
    crisisPlan: "",
    medicationManagement: false,
    psychiatristName: "",
    starHealthCoordinatorMental: "",

    // IDD/Autism
    rnCaseManagerName: "",
    rnCaseManagerPhone: "",
    behaviorPlanInPlace: false,
    behaviorPlanDetails: "",
    specializedSupports: "",
    educationPortfolioStatus: "",
    educationPortfolioDetails: "",

    // Treatment Foster Care
    weeklySchedule: {
      week1: "",
      week2: "",
      week3: "",
      week4: "",
    },

    // Independent Living Services
    alumniEmail: "",
    transitionCoordinator: "",
    transitionPlan: "",

    // Kinship Care Services
    kinshipCaregiverName: "",
    relationshipToChild: "",
    prePermanencyPlan: "",
    familySupportServices: "",

    // Pregnant/Parenting Youth Services
    parentingEducationProvider: "",
    childDevelopmentSpecialist: "",
    dualGenerationPlan: "",
    childDateOfBirth: "",
    expectedDueDate: "",

    // Transition Support Services Add-On
    palWorkerName: "",
    palWorkerContact: "",
    alumniOrganizationsProvided: "",
    transitionDomainsChecklist: [],

    // Kinship Caregiver Support Add-On
    kinshipCaregiverNameAddon: "",
    relationshipToChildAddon: "",
    permanencyType: "",
    supportGroupReferralProvided: false,
    ongoingFamilyChallenges: "",

    // Pregnant & Parenting Youth Add-On
    numberOfChildren: "",
    childrenAges: "",
    currentLivingArrangementSuitable: false,
    coParentInvolved: false,
    coParentContactInfo: "",
    childcarePlan: "",
    pediatricianInfo: "",
    wicStatus: "",
    parentingSupportGroups: "",

    // Service Continuity
    appointments: [],
    referrals: [],
    starHealthCoordinator: "",
    additionalNotes: "",

    // Contact Schedule
    contactSchedule: {
      frequency: "",
      duration: "",
      method: "",
      notes: "",
    },

    // SSCC/DFPS Documentation
    ssccContactEmail: "",
    documentationFrequency: "monthly",
    preferredSubmissionMethod: "email",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // Set default discharge date to 30 days from today and calculate activation date
  useEffect(() => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 30)

    // Calculate activation date (90 days before discharge)
    const activationDate = new Date(futureDate)
    activationDate.setDate(activationDate.getDate() - 90)

    setFormData((prev) => ({
      ...prev,
      dischargeDate: futureDate.toISOString().split("T")[0],
      activationDate: activationDate.toISOString().split("T")[0],
    }))
  }, [])

  // Auto-calculate activation date when discharge date changes
  useEffect(() => {
    if (formData.dischargeDate) {
      const dischargeDate = new Date(formData.dischargeDate)
      const activationDate = new Date(dischargeDate)
      activationDate.setDate(activationDate.getDate() - 90)

      setFormData((prev) => ({
        ...prev,
        activationDate: activationDate.toISOString().split("T")[0],
      }))
    }
  }, [formData.dischargeDate])

  // Auto-populate contact schedule based on package type
  useEffect(() => {
    if (formData.packageType) {
      let scheduleText = ""

      switch (formData.packageType) {
        case "transition":
          scheduleText =
            "Weekly contact for first 4 weeks, then bi-weekly for 8 weeks, then monthly for remainder of 6 months"
          break
        case "pregnant-parenting":
          scheduleText = "Weekly contact for first 4 weeks, then bi-weekly for remainder of service period"
          break
        case "kinship":
          scheduleText = "Weekly contact for first 8 weeks, then bi-weekly for 4 weeks, then monthly for remainder"
          break
        case "mental":
        case "idd":
        case "treatment":
          scheduleText = "Twice monthly contact for 6 months minimum"
          break
        case "independent":
          scheduleText =
            "Weekly contact for first month, then bi-weekly for 2 months, then monthly for remainder of 6 months"
          break
        default:
          scheduleText = "Contact frequency to be determined based on individual needs"
      }

      setFormData((prev) => ({
        ...prev,
        contactSchedule: {
          ...prev.contactSchedule,
          frequency: scheduleText,
        },
      }))
    }
  }, [formData.packageType])

  const packageTypes = [
    {
      value: "mental",
      label: "Mental & Behavioral Health Support Services (Required)",
      helpText: "6 months, twice monthly contact minimum. Include STAR Health Coordinator if assigned.",
    },
    {
      value: "idd",
      label: "IDD/Autism Spectrum Disorder Support Services (Required)",
      helpText: "6 months, twice monthly contact minimum. Education Portfolio required for all cases.",
    },
    {
      value: "treatment",
      label: "T3C Treatment Foster Family Care Support Services (Required)",
      helpText: "6 months, twice monthly contact minimum. Weekly contact schedule required.",
    },
    {
      value: "emergency",
      label: "Emergency Shelter Services",
      helpText: "Optional aftercare - requires Program Director approval.",
    },
    {
      value: "basic",
      label: "Basic Foster Care Services",
      helpText: "Optional aftercare - requires Program Director approval.",
    },
    {
      value: "therapeutic",
      label: "Therapeutic Foster Care Services",
      helpText: "Optional aftercare - requires Program Director approval.",
    },
    {
      value: "kinship",
      label: "Kinship Caregiver Support Add-On",
      helpText: "30-day pre-permanency planning required. Focus on family support and stability.",
    },
    {
      value: "adoption",
      label: "Adoption Support Services",
      helpText: "Post-adoption support planning. Include family integration strategies.",
    },
    {
      value: "independent",
      label: "Independent Living Services",
      helpText: "6-month transition support required. Alumni information mandatory for tracking.",
    },
    {
      value: "respite",
      label: "Respite Care Services",
      helpText: "Short-term support planning. Coordinate with primary placement.",
    },
    {
      value: "family-preservation",
      label: "Family Preservation Services",
      helpText: "Focus on family strengthening and prevention strategies.",
    },
    {
      value: "reunification",
      label: "Family Reunification Services",
      helpText: "Transition planning for family reunification. Safety planning required.",
    },
    {
      value: "pregnant-parenting",
      label: "Pregnant & Parenting Youth Add-On",
      helpText: "Focus on dual-generation support. Include parenting education and child development.",
    },
    {
      value: "transition",
      label: "Transition Support Services Add-On",
      helpText: "PAL worker support and alumni connections. Weekly to monthly contact schedule.",
    },
    {
      value: "other",
      label: "Other (please specify)",
      helpText: "Requires Program Director approval and detailed justification.",
    },
  ]

  const contactMethods = [
    { value: "phone", label: "Phone Call" },
    { value: "text", label: "Text Message" },
    { value: "email", label: "Email" },
    { value: "rocketchat", label: "Rocket.chat" },
  ]

  const preferredTimes = ["Morning (8am-12pm)", "Afternoon (12pm-5pm)", "Evening (5pm-8pm)", "Weekends"]

  const transitionDomains = [
    "Education/Career",
    "Employment/Financial",
    "Housing/Living Skills",
    "Health Management",
    "Relationships",
    "Transportation",
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Clear other package type when not "other"
    if (name === "packageType" && value !== "other") {
      setFormData((prev) => ({ ...prev, otherPackageType: "" }))
    }
  }

  const handleTimePreferenceChange = (time) => {
    setFormData((prev) => ({
      ...prev,
      preferredContactTimes: prev.preferredContactTimes.includes(time)
        ? prev.preferredContactTimes.filter((t) => t !== time)
        : [...prev.preferredContactTimes, time],
    }))
  }

  const handleTransitionDomainChange = (domain) => {
    setFormData((prev) => ({
      ...prev,
      transitionDomainsChecklist: prev.transitionDomainsChecklist.includes(domain)
        ? prev.transitionDomainsChecklist.filter((d) => d !== domain)
        : [...prev.transitionDomainsChecklist, domain],
    }))
  }

  const addAppointment = () => {
    setFormData((prev) => ({
      ...prev,
      appointments: [
        ...prev.appointments,
        {
          id: Date.now(),
          provider: "",
          date: "",
          time: "",
          type: "",
          location: "",
        },
      ],
    }))
  }

  const removeAppointment = (id) => {
    setFormData((prev) => ({
      ...prev,
      appointments: prev.appointments.filter((apt) => apt.id !== id),
    }))
  }

  const updateAppointment = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      appointments: prev.appointments.map((apt) => (apt.id === id ? { ...apt, [field]: value } : apt)),
    }))
  }

  const addReferral = () => {
    setFormData((prev) => ({
      ...prev,
      referrals: [
        ...prev.referrals,
        {
          id: Date.now(),
          service: "",
          provider: "",
          status: "pending",
          notes: "",
        },
      ],
    }))
  }

  const removeReferral = (id) => {
    setFormData((prev) => ({
      ...prev,
      referrals: prev.referrals.filter((ref) => ref.id !== id),
    }))
  }

  const updateReferral = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      referrals: prev.referrals.map((ref) => (ref.id === id ? { ...ref, [field]: value } : ref)),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields for all packages
    if (!formData.packageType) newErrors.packageType = "Package type is required"
    if (formData.packageType === "other" && !formData.otherPackageType) {
      newErrors.otherPackageType = "Please specify the other package type"
    }
    if (!formData.childName) newErrors.childName = "Child name is required"
    if (!formData.childDOB) newErrors.childDOB = "Date of birth is required"
    if (!formData.dischargeDate) newErrors.dischargeDate = "Discharge date is required"
    if (!formData.caseNumber) newErrors.caseNumber = "Case number is required"
    if (!formData.primaryContactMethod) newErrors.primaryContactMethod = "Primary contact method is required"

    // NEW VALIDATION - Enhancement Requirements
    if (!formData.aftercareStaffStartDate) newErrors.aftercareStaffStartDate = "Aftercare staff start date is required"
    if (!formData.ssccContactEmail) newErrors.ssccContactEmail = "SSCC contact email is required"

    // Contact method specific validation
    if (formData.primaryContactMethod === "phone" && !formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required"
    }
    if (formData.primaryContactMethod === "text" && !formData.textNumber) {
      newErrors.textNumber = "Text number is required"
    }
    if (formData.primaryContactMethod === "email" && !formData.email) {
      newErrors.email = "Email is required"
    }
    if (formData.primaryContactMethod === "rocketchat" && !formData.rocketChatUsername) {
      newErrors.rocketChatUsername = "Rocket.chat username is required"
    }

    // Mailing address validation
    if (!formData.mailingAddress.street) newErrors["mailingAddress.street"] = "Street address is required"
    if (!formData.mailingAddress.city) newErrors["mailingAddress.city"] = "City is required"
    if (!formData.mailingAddress.zip) newErrors["mailingAddress.zip"] = "ZIP code is required"
    if (!formData.addressVerified) newErrors.addressVerified = "Please verify the mailing address"

    // Package-specific validation
    if (formData.packageType === "mental") {
      if (!formData.therapistName) newErrors.therapistName = "Therapist name is required"
      if (!formData.crisisPlan) newErrors.crisisPlan = "Crisis plan is required"
    }

    if (formData.packageType === "idd") {
      if (!formData.rnCaseManagerName) newErrors.rnCaseManagerName = "RN Case Manager name is required"
      if (formData.behaviorPlanInPlace && !formData.behaviorPlanDetails) {
        newErrors.behaviorPlanDetails = "Behavior plan details are required"
      }
    }

    if (formData.packageType === "treatment") {
      // Treatment package has standard aftercare requirements, no additional fields required
    }

    if (formData.packageType === "other") {
      // Optional aftercare - ensure approval is documented in notes
      if (!formData.additionalNotes) {
        newErrors.additionalNotes = "Please document Program Director approval for optional aftercare"
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
    }, 2000)
  }

  const handleSaveDraft = async () => {
    setIsDraft(true)
    setIsSubmitting(true)

    // Simulate saving draft
    setTimeout(() => {
      setIsSubmitting(false)
      setIsDraft(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }, 1000)
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
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Aftercare Services Plan (Enhanced)</h1>
              <p className="text-gray-600">
                Required for Mental & Behavioral Health, IDD/Autism Spectrum, and Treatment Foster Family Care packages
              </p>
            </div>
          </div>

          {/* Draft Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">This form includes enhanced requirements per Enhancement Request III.B.4.2</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Aftercare Services Plan</h2>
                <p className="text-sm text-gray-600">
                  Required for Mental & Behavioral Health, IDD/Autism Spectrum, and Treatment Foster Family Care
                  packages (6 months, twice monthly contact minimum)
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Enhanced
              </Badge>
            </div>

            {showSuccess && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                {isDraft ? "Draft saved successfully!" : "Aftercare plan submitted successfully!"}
              </div>
            )}

            <div className="space-y-8">
              {/* Basic Information */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      Service Package Type *
                      <HelpTooltip text="Select the appropriate service package. Required packages have mandatory aftercare periods." />
                    </label>
                    <select
                      name="packageType"
                      value={formData.packageType}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${errors.packageType ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select package type</option>
                      {packageTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {formData.packageType && packageTypes.find((t) => t.value === formData.packageType)?.helpText && (
                      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                        <strong>Requirements:</strong>{" "}
                        {packageTypes.find((t) => t.value === formData.packageType)?.helpText}
                      </div>
                    )}
                    {errors.packageType && <p className="text-red-500 text-sm mt-1">{errors.packageType}</p>}
                  </div>

                  {formData.packageType === "other" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please specify other package type *
                      </label>
                      <input
                        type="text"
                        name="otherPackageType"
                        value={formData.otherPackageType}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      name="childDOB"
                      value={formData.childDOB}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${errors.childDOB ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.childDOB && <p className="text-red-500 text-sm mt-1">{errors.childDOB}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discharge Date *</label>
                    <input
                      type="date"
                      name="dischargeDate"
                      value={formData.dischargeDate}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${errors.dischargeDate ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.dischargeDate && <p className="text-red-500 text-sm mt-1">{errors.dischargeDate}</p>}
                  </div>
                </div>
              </section>

              {/* NEW SECTION - Aftercare Program Information */}
              <section className="space-y-4 bg-yellow-50 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold text-yellow-800">Aftercare Program Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      Aftercare Staff Start Date *
                      <HelpTooltip text="Date when staff began aftercare duties (Enhancement Request III.B.4.2)" />
                    </label>
                    <input
                      type="date"
                      name="aftercareStaffStartDate"
                      value={formData.aftercareStaffStartDate}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${errors.aftercareStaffStartDate ? "border-red-500" : "border-gray-300"}`}
                      required
                    />
                    {errors.aftercareStaffStartDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.aftercareStaffStartDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Activation Date</label>
                    <input
                      type="date"
                      name="activationDate"
                      value={formData.activationDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      readOnly
                      title="Automatically set to 90 days before discharge"
                    />
                    <p className="text-sm text-gray-600 mt-1">Auto-calculated: 90 days before discharge</p>
                  </div>
                </div>
              </section>

              {/* Contact Information */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact Method *</label>
                    <select
                      name="primaryContactMethod"
                      value={formData.primaryContactMethod}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${errors.primaryContactMethod ? "border-red-500" : "border-gray-300"}`}
                    >
                      <option value="">Select contact method</option>
                      {contactMethods.map((method) => (
                        <option key={method.value} value={method.value}>
                          {method.label}
                        </option>
                      ))}
                    </select>
                    {errors.primaryContactMethod && (
                      <p className="text-red-500 text-sm mt-1">{errors.primaryContactMethod}</p>
                    )}
                  </div>

                  {(formData.primaryContactMethod === "phone" || formData.primaryContactMethod === "text") && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {formData.primaryContactMethod === "phone" ? "Phone Number" : "Text Number"} *
                      </label>
                      <input
                        type="tel"
                        name={formData.primaryContactMethod === "phone" ? "phoneNumber" : "textNumber"}
                        value={formData.primaryContactMethod === "phone" ? formData.phoneNumber : formData.textNumber}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${
                          errors.phoneNumber || errors.textNumber ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {(errors.phoneNumber || errors.textNumber) && (
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber || errors.textNumber}</p>
                      )}
                    </div>
                  )}

                  {formData.primaryContactMethod === "email" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  )}

                  {formData.primaryContactMethod === "rocketchat" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rocket.chat Username *</label>
                      <input
                        type="text"
                        name="rocketChatUsername"
                        value={formData.rocketChatUsername}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.rocketChatUsername ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.rocketChatUsername && (
                        <p className="text-red-500 text-sm mt-1">{errors.rocketChatUsername}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Contact</label>
                    <input
                      type="text"
                      name="alternativeContact"
                      value={formData.alternativeContact}
                      onChange={handleInputChange}
                      placeholder="Name of alternative contact person"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Contact Phone</label>
                    <input
                      type="tel"
                      name="alternativeContactPhone"
                      value={formData.alternativeContactPhone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Mailing Address */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700">Mailing Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                      <input
                        type="text"
                        name="mailingAddress.street"
                        value={formData.mailingAddress.street}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${
                          errors["mailingAddress.street"] ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors["mailingAddress.street"] && (
                        <p className="text-red-500 text-sm mt-1">{errors["mailingAddress.street"]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        name="mailingAddress.city"
                        value={formData.mailingAddress.city}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${
                          errors["mailingAddress.city"] ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors["mailingAddress.city"] && (
                        <p className="text-red-500 text-sm mt-1">{errors["mailingAddress.city"]}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <select
                        name="mailingAddress.state"
                        value={formData.mailingAddress.state}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="TX">Texas</option>
                        <option value="OK">Oklahoma</option>
                        <option value="AR">Arkansas</option>
                        <option value="LA">Louisiana</option>
                        <option value="NM">New Mexico</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                      <input
                        type="text"
                        name="mailingAddress.zip"
                        value={formData.mailingAddress.zip}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${
                          errors["mailingAddress.zip"] ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors["mailingAddress.zip"] && (
                        <p className="text-red-500 text-sm mt-1">{errors["mailingAddress.zip"]}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="addressVerified"
                          checked={formData.addressVerified}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          I have verified this mailing address is current and accurate *
                        </span>
                      </label>
                      {errors.addressVerified && <p className="text-red-500 text-sm mt-1">{errors.addressVerified}</p>}
                    </div>
                  </div>
                </div>

                {/* Preferred Contact Times */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Times</label>
                  <div className="grid grid-cols-2 gap-2">
                    {preferredTimes.map((time) => (
                      <label key={time} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.preferredContactTimes.includes(time)}
                          onChange={() => handleTimePreferenceChange(time)}
                          className="mr-2"
                        />
                        <span className="text-sm">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Package-Specific Sections */}
              {formData.packageType === "mental" && (
                <section className="space-y-4 bg-blue-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-blue-800">Mental & Behavioral Health Support Services</h2>
                  <p className="text-sm text-blue-700">Required aftercare: 6 months, twice monthly contact minimum</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Therapist Name *</label>
                      <input
                        type="text"
                        name="therapistName"
                        value={formData.therapistName}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.therapistName ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.therapistName && <p className="text-red-500 text-sm mt-1">{errors.therapistName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Therapist Phone</label>
                      <input
                        type="tel"
                        name="therapistPhone"
                        value={formData.therapistPhone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Next Therapy Appointment</label>
                      <input
                        type="datetime-local"
                        name="nextTherapyAppointment"
                        value={formData.nextTherapyAppointment}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Crisis Plan *</label>
                      <textarea
                        name="crisisPlan"
                        value={formData.crisisPlan}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Document crisis intervention plan and emergency contacts"
                        className={`w-full p-2 border rounded-md ${errors.crisisPlan ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.crisisPlan && <p className="text-red-500 text-sm mt-1">{errors.crisisPlan}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="medicationManagement"
                          checked={formData.medicationManagement}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">Medication management required</span>
                      </label>
                    </div>

                    {formData.medicationManagement && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Psychiatrist Name</label>
                        <input
                          type="text"
                          name="psychiatristName"
                          value={formData.psychiatristName}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        STAR Health Coordinator
                        <HelpTooltip text="Include STAR Health Coordinator if assigned to this case." />
                      </label>
                      <input
                        type="text"
                        name="starHealthCoordinatorMental"
                        value={formData.starHealthCoordinatorMental}
                        onChange={handleInputChange}
                        placeholder="Name and contact info if assigned"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </section>
              )}

              {formData.packageType === "idd" && (
                <section className="space-y-4 bg-purple-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-purple-800">
                    IDD/Autism Spectrum Disorder Support Services
                  </h2>
                  <p className="text-sm text-purple-700">Required aftercare: 6 months, twice monthly contact minimum</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">RN Case Manager Name *</label>
                      <input
                        type="text"
                        name="rnCaseManagerName"
                        value={formData.rnCaseManagerName}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.rnCaseManagerName ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.rnCaseManagerName && (
                        <p className="text-red-500 text-sm mt-1">{errors.rnCaseManagerName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">RN Case Manager Phone</label>
                      <input
                        type="tel"
                        name="rnCaseManagerPhone"
                        value={formData.rnCaseManagerPhone}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="behaviorPlanInPlace"
                          checked={formData.behaviorPlanInPlace}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">Behavior plan in place</span>
                      </label>
                    </div>

                    {formData.behaviorPlanInPlace && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Behavior Plan Details *</label>
                        <textarea
                          name="behaviorPlanDetails"
                          value={formData.behaviorPlanDetails}
                          onChange={handleInputChange}
                          rows="3"
                          placeholder="Describe the behavior plan and implementation strategies"
                          className={`w-full p-2 border rounded-md ${errors.behaviorPlanDetails ? "border-red-500" : "border-gray-300"}`}
                        />
                        {errors.behaviorPlanDetails && (
                          <p className="text-red-500 text-sm mt-1">{errors.behaviorPlanDetails}</p>
                        )}
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialized Supports</label>
                      <textarea
                        name="specializedSupports"
                        value={formData.specializedSupports}
                        onChange={handleInputChange}
                        rows="2"
                        placeholder="List any specialized supports or accommodations needed"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        Education Portfolio Status
                        <HelpTooltip text="Education Portfolio required for all IDD/Autism cases." />
                      </label>
                      <select
                        name="educationPortfolioStatus"
                        value={formData.educationPortfolioStatus}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select status</option>
                        <option value="complete">Complete</option>
                        <option value="in-progress">In Progress</option>
                        <option value="needs-update">Needs Update</option>
                        <option value="not-started">Not Started</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Education Portfolio Details
                      </label>
                      <textarea
                        name="educationPortfolioDetails"
                        value={formData.educationPortfolioDetails}
                        onChange={handleInputChange}
                        rows="2"
                        placeholder="Notes about education portfolio status and next steps"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </section>
              )}

              {formData.packageType === "treatment" && (
                <section className="space-y-4 bg-green-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-green-800">
                    T3C Treatment Foster Family Care Support Services
                  </h2>
                  <p className="text-sm text-green-700">Required aftercare: 6 months, twice monthly contact minimum</p>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-700">Weekly Contact Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Week 1 Contact Plan</label>
                        <textarea
                          name="weeklySchedule.week1"
                          value={formData.weeklySchedule.week1}
                          onChange={handleInputChange}
                          rows="2"
                          placeholder="Plan for first week contact"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Week 2 Contact Plan</label>
                        <textarea
                          name="weeklySchedule.week2"
                          value={formData.weeklySchedule.week2}
                          onChange={handleInputChange}
                          rows="2"
                          placeholder="Plan for second week contact"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Week 3 Contact Plan</label>
                        <textarea
                          name="weeklySchedule.week3"
                          value={formData.weeklySchedule.week3}
                          onChange={handleInputChange}
                          rows="2"
                          placeholder="Plan for third week contact"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Week 4 Contact Plan</label>
                        <textarea
                          name="weeklySchedule.week4"
                          value={formData.weeklySchedule.week4}
                          onChange={handleInputChange}
                          rows="2"
                          placeholder="Plan for fourth week contact"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {formData.packageType === "independent" && (
                <section className="space-y-4 bg-indigo-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-indigo-800">Independent Living Services</h2>
                  <p className="text-sm text-indigo-700">
                    6-month transition support required. Alumni information mandatory.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        Alumni Email Address
                        <HelpTooltip text="Alumni information mandatory for tracking and support network." />
                      </label>
                      <input
                        type="email"
                        name="alumniEmail"
                        value={formData.alumniEmail}
                        onChange={handleInputChange}
                        placeholder="Alumni email for ongoing support"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transition Coordinator</label>
                      <input
                        type="text"
                        name="transitionCoordinator"
                        value={formData.transitionCoordinator}
                        onChange={handleInputChange}
                        placeholder="Name of assigned transition coordinator"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Transition Plan</label>
                      <textarea
                        name="transitionPlan"
                        value={formData.transitionPlan}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Detailed transition plan including goals and milestones"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </section>
              )}

              {formData.packageType === "transition" && (
                <section className="space-y-4 bg-blue-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-blue-800">Transition Support Services Add-On</h2>
                  <p className="text-sm text-blue-700">
                    PAL worker support and alumni connections. Weekly to monthly contact schedule.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PAL Worker Name</label>
                      <input
                        type="text"
                        name="palWorkerName"
                        value={formData.palWorkerName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PAL Worker Contact</label>
                      <input
                        type="text"
                        name="palWorkerContact"
                        value={formData.palWorkerContact}
                        onChange={handleInputChange}
                        placeholder="Phone or email"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alumni Organizations Provided
                      </label>
                      <textarea
                        name="alumniOrganizationsProvided"
                        value={formData.alumniOrganizationsProvided}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="List alumni organizations and resources provided"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transition Domains Checklist
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {transitionDomains.map((domain) => (
                          <label key={domain} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.transitionDomainsChecklist.includes(domain)}
                              onChange={() => handleTransitionDomainChange(domain)}
                              className="mr-2"
                            />
                            <span className="text-sm">{domain}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {formData.packageType === "kinship" && (
                <section className="space-y-4 bg-green-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-green-800">Kinship Caregiver Support Add-On</h2>
                  <p className="text-sm text-green-700">
                    30-day pre-permanency planning required. Focus on family support and stability.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kinship Caregiver Name</label>
                      <input
                        type="text"
                        name="kinshipCaregiverNameAddon"
                        value={formData.kinshipCaregiverNameAddon}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relationship to Child</label>
                      <input
                        type="text"
                        name="relationshipToChildAddon"
                        value={formData.relationshipToChildAddon}
                        onChange={handleInputChange}
                        placeholder="e.g., Grandmother, Aunt, etc."
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Permanency Type</label>
                      <select
                        name="permanencyType"
                        value={formData.permanencyType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select permanency type</option>
                        <option value="adoption">Adoption</option>
                        <option value="pmc-pca">PMC with PCA</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="supportGroupReferralProvided"
                          checked={formData.supportGroupReferralProvided}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">Support Group Referral Provided</span>
                      </label>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ongoing Family Challenges</label>
                      <textarea
                        name="ongoingFamilyChallenges"
                        value={formData.ongoingFamilyChallenges}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Document any ongoing challenges and support needs"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </section>
              )}

              {formData.packageType === "pregnant-parenting" && (
                <section className="space-y-4 bg-pink-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-pink-800">Pregnant & Parenting Youth Add-On</h2>
                  <p className="text-sm text-pink-700">
                    Focus on dual-generation support. Include parenting education and child development.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Number of Children</label>
                      <input
                        type="number"
                        name="numberOfChildren"
                        value={formData.numberOfChildren}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Children's Ages</label>
                      <input
                        type="text"
                        name="childrenAges"
                        value={formData.childrenAges}
                        onChange={handleInputChange}
                        placeholder="e.g., 2 years, 6 months"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="currentLivingArrangementSuitable"
                          checked={formData.currentLivingArrangementSuitable}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Current Living Arrangement Suitable for Children
                        </span>
                      </label>
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="coParentInvolved"
                          checked={formData.coParentInvolved}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className="text-sm font-medium text-gray-700">Co-parent Involved</span>
                      </label>
                    </div>

                    {formData.coParentInvolved && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Co-parent Contact Information
                        </label>
                        <input
                          type="text"
                          name="coParentContactInfo"
                          value={formData.coParentContactInfo}
                          onChange={handleInputChange}
                          placeholder="Name, phone, and relationship details"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Childcare Plan</label>
                      <textarea
                        name="childcarePlan"
                        value={formData.childcarePlan}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Describe childcare arrangements and support"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pediatrician Information</label>
                      <input
                        type="text"
                        name="pediatricianInfo"
                        value={formData.pediatricianInfo}
                        onChange={handleInputChange}
                        placeholder="Name and contact information"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">WIC Status</label>
                      <select
                        name="wicStatus"
                        value={formData.wicStatus}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select WIC status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="not-applied">Not Applied</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parenting Support Groups</label>
                      <textarea
                        name="parentingSupportGroups"
                        value={formData.parentingSupportGroups}
                        onChange={handleInputChange}
                        rows="2"
                        placeholder="List parenting support groups and resources"
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* Contact Schedule */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Contact Schedule</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      Contact Frequency
                      <HelpTooltip text="Auto-populated based on package type. Modify as needed for individual case." />
                    </label>
                    <textarea
                      name="contactSchedule.frequency"
                      value={formData.contactSchedule.frequency}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Typical Contact Duration</label>
                    <select
                      name="contactSchedule.duration"
                      value={formData.contactSchedule.duration}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select duration</option>
                      <option value="15-30 minutes">15-30 minutes</option>
                      <option value="30-45 minutes">30-45 minutes</option>
                      <option value="45-60 minutes">45-60 minutes</option>
                      <option value="60+ minutes">60+ minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact Method</label>
                    <select
                      name="contactSchedule.method"
                      value={formData.contactSchedule.method}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select method</option>
                      <option value="phone">Phone</option>
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="in-person">In-Person</option>
                      <option value="video">Video Call</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Notes</label>
                    <textarea
                      name="contactSchedule.notes"
                      value={formData.contactSchedule.notes}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="Any special scheduling considerations or preferences"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </section>

              {/* Service Continuity */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Service Continuity</h2>

                {/* Appointments */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-700">Upcoming Appointments</h3>
                    <button
                      type="button"
                      onClick={addAppointment}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center text-sm"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Appointment
                    </button>
                  </div>

                  {formData.appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">Appointment #{appointment.id}</h4>
                        <button
                          type="button"
                          onClick={() => removeAppointment(appointment.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                          <input
                            type="text"
                            value={appointment.provider}
                            onChange={(e) => updateAppointment(appointment.id, "provider", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                          <input
                            type="date"
                            value={appointment.date}
                            onChange={(e) => updateAppointment(appointment.id, "date", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                          <input
                            type="time"
                            value={appointment.time}
                            onChange={(e) => updateAppointment(appointment.id, "time", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                          <input
                            type="text"
                            value={appointment.type}
                            onChange={(e) => updateAppointment(appointment.id, "type", e.target.value)}
                            placeholder="e.g., Therapy, Medical"
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            value={appointment.location}
                            onChange={(e) => updateAppointment(appointment.id, "location", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Referrals */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-700">Service Referrals</h3>
                    <button
                      type="button"
                      onClick={addReferral}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center text-sm"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Referral
                    </button>
                  </div>

                  {formData.referrals.map((referral) => (
                    <div key={referral.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">Referral #{referral.id}</h4>
                        <button
                          type="button"
                          onClick={() => removeReferral(referral.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                          <input
                            type="text"
                            value={referral.service}
                            onChange={(e) => updateReferral(referral.id, "service", e.target.value)}
                            placeholder="e.g., Mental Health, Housing"
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                          <input
                            type="text"
                            value={referral.provider}
                            onChange={(e) => updateReferral(referral.id, "provider", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={referral.status}
                            onChange={(e) => updateReferral(referral.id, "status", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="declined">Declined</option>
                          </select>
                        </div>

                        <div className="md:col-span-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                          <textarea
                            value={referral.notes}
                            onChange={(e) => updateReferral(referral.id, "notes", e.target.value)}
                            rows="2"
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* STAR Health Coordinator */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    STAR Health Coordinator
                    <HelpTooltip text="Include STAR Health Coordinator information if assigned to this case." />
                  </label>
                  <input
                    type="text"
                    name="starHealthCoordinator"
                    value={formData.starHealthCoordinator}
                    onChange={handleInputChange}
                    placeholder="Name and contact information if assigned"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Any additional information, special considerations, or Program Director approval documentation"
                    className={`w-full p-2 border rounded-md ${errors.additionalNotes ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.additionalNotes && <p className="text-red-500 text-sm mt-1">{errors.additionalNotes}</p>}
                </div>
              </section>

              {/* ENHANCED SSCC/DFPS Documentation Section */}
              <section className="space-y-4 bg-red-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-red-800">SSCC/DFPS Monthly Documentation Requirements</h2>
                <div className="bg-red-100 border border-red-300 rounded p-3 mb-4">
                  <p className="text-sm text-red-800 font-medium">
                    <AlertCircle className="inline h-4 w-4 mr-1" />
                    CRITICAL: All aftercare documentation must be submitted to SSCC/DFPS at the end of EACH month
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SSCC Contact Email *</label>
                    <input
                      type="email"
                      name="ssccContactEmail"
                      value={formData.ssccContactEmail}
                      onChange={handleInputChange}
                      placeholder="SSCC contact for monthly documentation"
                      className={`w-full p-2 border rounded-md ${errors.ssccContactEmail ? "border-red-500" : "border-gray-300"}`}
                      required
                    />
                    {errors.ssccContactEmail && <p className="text-red-500 text-sm mt-1">{errors.ssccContactEmail}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Monthly Submission Date</label>
                    <input
                      type="date"
                      name="lastMonthlySubmission"
                      value={formData.lastMonthlySubmission}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Documentation Frequency</label>
                    <select
                      name="documentationFrequency"
                      value={formData.documentationFrequency}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="bi-weekly">Bi-weekly</option>
                      <option value="weekly">Weekly</option>
                      <option value="as-needed">As Needed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Submission Method</label>
                    <select
                      name="preferredSubmissionMethod"
                      value={formData.preferredSubmissionMethod}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="email">Email</option>
                      <option value="portal">Online Portal</option>
                      <option value="fax">Fax</option>
                      <option value="mail">Mail</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="monthlySubmissionConfirmed"
                        checked={formData.monthlySubmissionConfirmed}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        I confirm that monthly documentation submission requirements have been reviewed and understood
                      </span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Submit Buttons */}
              <div className="pt-6 border-t flex gap-4">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-400 flex items-center justify-center text-lg font-medium"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  {isSubmitting && isDraft ? "Saving Draft..." : "Save Draft"}
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 flex items-center justify-center text-lg font-medium"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isSubmitting && !isDraft ? "Submitting Plan..." : "Submit Aftercare Plan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
