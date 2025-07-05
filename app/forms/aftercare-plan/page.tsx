"use client"

import { useState, useEffect } from "react"
import { AlertCircle, CheckCircle, Plus, Trash2, FileText, Send, ArrowLeft, Users } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

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

    // Package-specific fields
    // Mental & Behavioral Health
    therapistName: "",
    therapistPhone: "",
    nextTherapyAppointment: "",
    crisisPlan: "",
    medicationManagement: false,
    psychiatristName: "",

    // IDD/Autism
    rnCaseManagerName: "",
    rnCaseManagerPhone: "",
    behaviorPlanInPlace: false,
    behaviorPlanDetails: "",
    specializedSupports: "",

    // Treatment Foster Care
    weeklySchedule: {
      week1: "",
      week2: "",
      week3: "",
      week4: "",
    },

    // Service Continuity
    appointments: [],
    referrals: [],
    starHealthCoordinator: "",
    additionalNotes: "",

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

  // Set default discharge date to 30 days from today
  useEffect(() => {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 30)
    setFormData((prev) => ({
      ...prev,
      dischargeDate: futureDate.toISOString().split("T")[0],
    }))
  }, [])

  const packageTypes = [
    { value: "mental", label: "Mental & Behavioral Health Support Services (Required)" },
    { value: "idd", label: "IDD/Autism Spectrum Disorder Support Services (Required)" },
    { value: "treatment", label: "T3C Treatment Foster Family Care Support Services (Required)" },
    { value: "emergency", label: "Emergency Shelter Services" },
    { value: "basic", label: "Basic Foster Care Services" },
    { value: "therapeutic", label: "Therapeutic Foster Care Services" },
    { value: "kinship", label: "Kinship Care Services" },
    { value: "adoption", label: "Adoption Support Services" },
    { value: "independent", label: "Independent Living Services" },
    { value: "respite", label: "Respite Care Services" },
    { value: "family-preservation", label: "Family Preservation Services" },
    { value: "reunification", label: "Family Reunification Services" },
    { value: "other", label: "Other (please specify)" },
  ]

  const contactMethods = [
    { value: "phone", label: "Phone Call" },
    { value: "text", label: "Text Message" },
    { value: "email", label: "Email" },
    { value: "rocketchat", label: "Rocket.chat" },
  ]

  const preferredTimes = ["Morning (8am-12pm)", "Afternoon (12pm-5pm)", "Evening (5pm-8pm)", "Weekends"]

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
              <h1 className="text-3xl font-bold text-gray-900">Aftercare Services Plan (Draft)</h1>
              <p className="text-gray-600">
                Required for Mental & Behavioral Health, IDD/Autism Spectrum, and Treatment Foster Family Care packages
              </p>
            </div>
          </div>

          {/* Draft Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-amber-800">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">This is a draft form for review and evaluation purposes only.</p>
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
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                Draft
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Package Type *</label>
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
                      <div className="md:col-span-2">
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
                  </div>
                </section>
              )}

              {formData.packageType === "idd" && (
                <section className="space-y-4 bg-green-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-green-800">
                    IDD/Autism Spectrum Disorder Support Services
                  </h2>
                  <p className="text-sm text-green-700">Required aftercare: 6 months, twice monthly contact minimum</p>

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
                          className={`w-full p-2 border rounded-md ${
                            errors.behaviorPlanDetails ? "border-red-500" : "border-gray-300"
                          }`}
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
                  </div>
                </section>
              )}

              {formData.packageType === "treatment" && (
                <section className="space-y-4 bg-purple-50 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold text-purple-800">
                    T3C Treatment Foster Family Care Support Services
                  </h2>
                  <p className="text-sm text-purple-700">Required aftercare: 6 months, twice monthly contact minimum</p>

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
                          placeholder="Planned contact for week 1"
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
                          placeholder="Planned contact for week 2"
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
                          placeholder="Planned contact for week 3"
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
                          placeholder="Planned contact for week 4"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Service Continuity */}
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Service Continuity</h2>

                {/* Appointments */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-700">Scheduled Appointments</h3>
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
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Provider/Service</label>
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
                          <select
                            value={appointment.type}
                            onChange={(e) => updateAppointment(appointment.id, "type", e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          >
                            <option value="">Select type</option>
                            <option value="medical">Medical</option>
                            <option value="therapy">Therapy</option>
                            <option value="psychiatric">Psychiatric</option>
                            <option value="educational">Educational</option>
                            <option value="court">Court</option>
                            <option value="other">Other</option>
                          </select>
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

                      <button
                        type="button"
                        onClick={() => removeAppointment(appointment.id)}
                        className="mt-2 text-red-600 hover:text-red-800 flex items-center text-sm"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Referrals */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-gray-700">Referrals</h3>
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
                    <div key={referral.id} className="border border-gray-200 rounded-lg p-4 mb-3">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                          <input
                            type="text"
                            value={referral.service}
                            onChange={(e) => updateReferral(referral.id, "service", e.target.value)}
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

                      <button
                        type="button"
                        onClick={() => removeReferral(referral.id)}
                        className="mt-2 text-red-600 hover:text-red-800 flex items-center text-sm"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* STAR Health Coordinator */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">STAR Health Coordinator</label>
                  <input
                    type="text"
                    name="starHealthCoordinator"
                    value={formData.starHealthCoordinator}
                    onChange={handleInputChange}
                    placeholder="Name and contact information"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </section>

              {/* SSCC/DFPS Documentation */}
              <section className="space-y-4 bg-yellow-50 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-yellow-800">SSCC/DFPS Documentation Requirements</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SSCC Contact Email</label>
                    <input
                      type="email"
                      name="ssccContactEmail"
                      value={formData.ssccContactEmail}
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
                      <option value="biweekly">Bi-weekly</option>
                      <option value="weekly">Weekly</option>
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
                      <option value="portal">DFPS Portal</option>
                      <option value="fax">Fax</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Additional Notes */}
              <section className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Any additional information, special considerations, or Program Director approval notes for optional aftercare"
                    className={`w-full p-2 border rounded-md ${errors.additionalNotes ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.additionalNotes && <p className="text-red-500 text-sm mt-1">{errors.additionalNotes}</p>}
                </div>
              </section>

              {/* Submit Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:bg-gray-400 flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {isSubmitting && isDraft ? "Saving Draft..." : "Save Draft"}
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 flex items-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting && !isDraft ? "Submitting..." : "Submit Plan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
