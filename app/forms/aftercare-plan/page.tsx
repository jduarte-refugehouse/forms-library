"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Save, AlertCircle, CheckCircle, Plus, Trash2, FileText, Send } from "lucide-react"
import Link from "next/link"

export default function AftercarePlanForm() {
  const [formData, setFormData] = useState({
    packageType: "",
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
    { value: "other", label: "Other Package (Optional Aftercare)" },
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

        {/* Form */}
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Comprehensive Aftercare Services Plan
                  </CardTitle>
                  <CardDescription>6 months duration with twice monthly contact minimum</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  Draft
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
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
                    <div>
                      <Label htmlFor="packageType">Service Package Type *</Label>
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

                    <div>
                      <Label htmlFor="caseNumber">Case Number *</Label>
                      <Input
                        name="caseNumber"
                        value={formData.caseNumber}
                        onChange={handleInputChange}
                        className={errors.caseNumber ? "border-red-500" : ""}
                      />
                      {errors.caseNumber && <p className="text-red-500 text-sm mt-1">{errors.caseNumber}</p>}
                    </div>

                    <div>
                      <Label htmlFor="childName">Child Name *</Label>
                      <Input
                        name="childName"
                        value={formData.childName}
                        onChange={handleInputChange}
                        className={errors.childName ? "border-red-500" : ""}
                      />
                      {errors.childName && <p className="text-red-500 text-sm mt-1">{errors.childName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="childDOB">Date of Birth *</Label>
                      <Input
                        type="date"
                        name="childDOB"
                        value={formData.childDOB}
                        onChange={handleInputChange}
                        className={errors.childDOB ? "border-red-500" : ""}
                      />
                      {errors.childDOB && <p className="text-red-500 text-sm mt-1">{errors.childDOB}</p>}
                    </div>

                    <div>
                      <Label htmlFor="dischargeDate">Discharge Date *</Label>
                      <Input
                        type="date"
                        name="dischargeDate"
                        value={formData.dischargeDate}
                        onChange={handleInputChange}
                        className={errors.dischargeDate ? "border-red-500" : ""}
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
                      <Label htmlFor="primaryContactMethod">Primary Contact Method *</Label>
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
                      <>
                        <div>
                          <Label htmlFor="phoneNumber">
                            Phone Number {formData.primaryContactMethod === "phone" && "*"}
                          </Label>
                          <Input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            placeholder="(123) 456-7890"
                            className={errors.phoneNumber ? "border-red-500" : ""}
                          />
                          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                        </div>

                        <div>
                          <Label htmlFor="textNumber">
                            Text Number {formData.primaryContactMethod === "text" && "*"}
                          </Label>
                          <Input
                            type="tel"
                            name="textNumber"
                            value={formData.textNumber}
                            onChange={handleInputChange}
                            placeholder="(123) 456-7890"
                            className={errors.textNumber ? "border-red-500" : ""}
                          />
                          {errors.textNumber && <p className="text-red-500 text-sm mt-1">{errors.textNumber}</p>}
                        </div>
                      </>
                    )}

                    {formData.primaryContactMethod === "email" && (
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="youth@example.com"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                    )}

                    {formData.primaryContactMethod === "rocketchat" && (
                      <div>
                        <Label htmlFor="rocketChatUsername">Rocket.chat Username *</Label>
                        <Input
                          name="rocketChatUsername"
                          value={formData.rocketChatUsername}
                          onChange={handleInputChange}
                          placeholder="@username"
                          className={errors.rocketChatUsername ? "border-red-500" : ""}
                        />
                        {errors.rocketChatUsername && (
                          <p className="text-red-500 text-sm mt-1">{errors.rocketChatUsername}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="alternativeContact">Alternative Contact Name</Label>
                      <Input
                        name="alternativeContact"
                        value={formData.alternativeContact}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="alternativeContactPhone">Alternative Contact Phone</Label>
                      <Input
                        type="tel"
                        name="alternativeContactPhone"
                        value={formData.alternativeContactPhone}
                        onChange={handleInputChange}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Preferred Contact Times</Label>
                    <div className="space-y-2 mt-2">
                      {preferredTimes.map((time) => (
                        <label key={time} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.preferredContactTimes.includes(time)}
                            onChange={() => handleTimePreferenceChange(time)}
                            className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm">{time}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Mailing Address */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-700">Mailing Address</h2>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="mailingAddress.street">Street Address *</Label>
                      <Input
                        name="mailingAddress.street"
                        value={formData.mailingAddress.street}
                        onChange={handleInputChange}
                        className={errors["mailingAddress.street"] ? "border-red-500" : ""}
                      />
                      {errors["mailingAddress.street"] && (
                        <p className="text-red-500 text-sm mt-1">{errors["mailingAddress.street"]}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="mailingAddress.city">City *</Label>
                        <Input
                          name="mailingAddress.city"
                          value={formData.mailingAddress.city}
                          onChange={handleInputChange}
                          className={errors["mailingAddress.city"] ? "border-red-500" : ""}
                        />
                        {errors["mailingAddress.city"] && (
                          <p className="text-red-500 text-sm mt-1">{errors["mailingAddress.city"]}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="mailingAddress.state">State</Label>
                        <Input
                          name="mailingAddress.state"
                          value={formData.mailingAddress.state}
                          onChange={handleInputChange}
                          readOnly
                          className="bg-gray-50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="mailingAddress.zip">ZIP Code *</Label>
                        <Input
                          name="mailingAddress.zip"
                          value={formData.mailingAddress.zip}
                          onChange={handleInputChange}
                          pattern="[0-9]{5}"
                          className={errors["mailingAddress.zip"] ? "border-red-500" : ""}
                        />
                        {errors["mailingAddress.zip"] && (
                          <p className="text-red-500 text-sm mt-1">{errors["mailingAddress.zip"]}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="addressVerified"
                        name="addressVerified"
                        checked={formData.addressVerified}
                        onChange={handleInputChange}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="addressVerified">
                        I have verified this mailing address is current and correct *
                      </Label>
                    </div>
                    {errors.addressVerified && <p className="text-red-500 text-sm">{errors.addressVerified}</p>}
                  </div>
                </section>

                {/* Package-specific sections */}
                {formData.packageType === "mental" && (
                  <section className="space-y-4 p-4 bg-blue-50 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700">Mental & Behavioral Health Support</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="therapistName">Therapist Name *</Label>
                        <Input
                          name="therapistName"
                          value={formData.therapistName}
                          onChange={handleInputChange}
                          className={errors.therapistName ? "border-red-500" : ""}
                        />
                        {errors.therapistName && <p className="text-red-500 text-sm mt-1">{errors.therapistName}</p>}
                      </div>

                      <div>
                        <Label htmlFor="therapistPhone">Therapist Phone</Label>
                        <Input
                          type="tel"
                          name="therapistPhone"
                          value={formData.therapistPhone}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="nextTherapyAppointment">Next Therapy Appointment</Label>
                        <Input
                          type="datetime-local"
                          name="nextTherapyAppointment"
                          value={formData.nextTherapyAppointment}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="medicationManagement"
                          name="medicationManagement"
                          checked={formData.medicationManagement}
                          onChange={handleInputChange}
                          className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="medicationManagement">Requires medication management</Label>
                      </div>
                    </div>

                    {formData.medicationManagement && (
                      <div>
                        <Label htmlFor="psychiatristName">Psychiatrist Name</Label>
                        <Input name="psychiatristName" value={formData.psychiatristName} onChange={handleInputChange} />
                      </div>
                    )}

                    <div>
                      <Label htmlFor="crisisPlan">Crisis Plan *</Label>
                      <Textarea
                        name="crisisPlan"
                        value={formData.crisisPlan}
                        onChange={handleInputChange}
                        rows={4}
                        className={errors.crisisPlan ? "border-red-500" : ""}
                        placeholder="Describe the crisis intervention plan..."
                      />
                      {errors.crisisPlan && <p className="text-red-500 text-sm mt-1">{errors.crisisPlan}</p>}
                    </div>
                  </section>
                )}

                {formData.packageType === "idd" && (
                  <section className="space-y-4 p-4 bg-purple-50 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700">IDD/Autism Spectrum Support</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="rnCaseManagerName">RN Case Manager Name *</Label>
                        <Input
                          name="rnCaseManagerName"
                          value={formData.rnCaseManagerName}
                          onChange={handleInputChange}
                          className={errors.rnCaseManagerName ? "border-red-500" : ""}
                        />
                        {errors.rnCaseManagerName && (
                          <p className="text-red-500 text-sm mt-1">{errors.rnCaseManagerName}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="rnCaseManagerPhone">RN Case Manager Phone</Label>
                        <Input
                          type="tel"
                          name="rnCaseManagerPhone"
                          value={formData.rnCaseManagerPhone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="behaviorPlanInPlace"
                        name="behaviorPlanInPlace"
                        checked={formData.behaviorPlanInPlace}
                        onChange={handleInputChange}
                        className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="behaviorPlanInPlace">Behavior plan in place</Label>
                    </div>

                    {formData.behaviorPlanInPlace && (
                      <div>
                        <Label htmlFor="behaviorPlanDetails">Behavior Plan Details *</Label>
                        <Textarea
                          name="behaviorPlanDetails"
                          value={formData.behaviorPlanDetails}
                          onChange={handleInputChange}
                          rows={3}
                          className={errors.behaviorPlanDetails ? "border-red-500" : ""}
                          placeholder="Describe the behavior plan..."
                        />
                        {errors.behaviorPlanDetails && (
                          <p className="text-red-500 text-sm mt-1">{errors.behaviorPlanDetails}</p>
                        )}
                      </div>
                    )}

                    <div>
                      <Label htmlFor="specializedSupports">Specialized Supports</Label>
                      <Textarea
                        name="specializedSupports"
                        value={formData.specializedSupports}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="List any specialized supports or accommodations..."
                      />
                    </div>
                  </section>
                )}

                {formData.packageType === "treatment" && (
                  <section className="space-y-4 p-4 bg-green-50 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700">Treatment Foster Family Care Support</h2>

                    <div className="bg-green-100 border border-green-200 rounded-md p-3">
                      <p className="text-sm text-green-800">
                        Standard aftercare services will be provided: 6 months duration with twice monthly contact
                        minimum. Focus will be on maintaining treatment gains and supporting step-down transition.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="additionalNotes">Treatment Focus Areas (Optional)</Label>
                      <Textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="Note any specific treatment gains to monitor or support needs during aftercare..."
                      />
                    </div>
                  </section>
                )}

                {formData.packageType === "other" && (
                  <section className="space-y-4 p-4 bg-yellow-50 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-700">Optional Aftercare Services</h2>

                    <div className="bg-yellow-100 border border-yellow-200 rounded-md p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Aftercare is not required for this package. Program Director approval is
                        needed based on clinical need and available resources.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="additionalNotes">Justification and Approval *</Label>
                      <Textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        rows={4}
                        className={errors.additionalNotes ? "border-red-500" : ""}
                        placeholder="Document clinical justification and Program Director approval for optional aftercare services..."
                      />
                      {errors.additionalNotes && <p className="text-red-500 text-sm mt-1">{errors.additionalNotes}</p>}
                    </div>
                  </section>
                )}

                {/* Service Continuity */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-700">Service Continuity</h2>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Scheduled Appointments</Label>
                      <Button type="button" onClick={addAppointment} size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Appointment
                      </Button>
                    </div>

                    {formData.appointments.length > 0 ? (
                      <div className="space-y-3">
                        {formData.appointments.map((apt) => (
                          <div key={apt.id} className="p-3 border border-gray-200 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                              <Input
                                placeholder="Provider"
                                value={apt.provider}
                                onChange={(e) => updateAppointment(apt.id, "provider", e.target.value)}
                              />
                              <Input
                                type="date"
                                value={apt.date}
                                onChange={(e) => updateAppointment(apt.id, "date", e.target.value)}
                              />
                              <Input
                                type="time"
                                value={apt.time}
                                onChange={(e) => updateAppointment(apt.id, "time", e.target.value)}
                              />
                              <Input
                                placeholder="Type"
                                value={apt.type}
                                onChange={(e) => updateAppointment(apt.id, "type", e.target.value)}
                              />
                              <Button
                                type="button"
                                onClick={() => removeAppointment(apt.id)}
                                variant="destructive"
                                size="sm"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No appointments scheduled yet.</p>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Service Referrals</Label>
                      <Button type="button" onClick={addReferral} size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Referral
                      </Button>
                    </div>

                    {formData.referrals.length > 0 ? (
                      <div className="space-y-3">
                        {formData.referrals.map((ref) => (
                          <div key={ref.id} className="p-3 border border-gray-200 rounded-md">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                              <Input
                                placeholder="Service"
                                value={ref.service}
                                onChange={(e) => updateReferral(ref.id, "service", e.target.value)}
                              />
                              <Input
                                placeholder="Provider"
                                value={ref.provider}
                                onChange={(e) => updateReferral(ref.id, "provider", e.target.value)}
                              />
                              <select
                                value={ref.status}
                                onChange={(e) => updateReferral(ref.id, "status", e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                              >
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                              </select>
                              <Button
                                type="button"
                                onClick={() => removeReferral(ref.id)}
                                variant="destructive"
                                size="sm"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <Input
                              placeholder="Notes"
                              value={ref.notes}
                              onChange={(e) => updateReferral(ref.id, "notes", e.target.value)}
                              className="mt-2"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No referrals added yet.</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="starHealthCoordinator">STAR Health Service Coordinator</Label>
                    <Input
                      name="starHealthCoordinator"
                      value={formData.starHealthCoordinator}
                      onChange={handleInputChange}
                      placeholder="Name and contact if assigned"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Include name and phone number if child has an assigned STAR Health Service Coordinator
                    </p>
                  </div>
                </section>

                {/* SSCC/DFPS Documentation Submission */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-700">SSCC/DFPS Documentation Submission</h2>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
                    <p className="text-sm text-blue-800">
                      Documentation must be provided to SSCC/DFPS at the end of each month per T3C Blueprint
                      requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ssccContactEmail">SSCC/DFPS Contact Email</Label>
                      <Input
                        type="email"
                        name="ssccContactEmail"
                        value={formData.ssccContactEmail}
                        onChange={handleInputChange}
                        placeholder="sscc@dfps.state.tx.us"
                      />
                    </div>

                    <div>
                      <Label htmlFor="preferredSubmissionMethod">Preferred Submission Method</Label>
                      <select
                        name="preferredSubmissionMethod"
                        value={formData.preferredSubmissionMethod}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="email">Email</option>
                        <option value="portal">DFPS Portal</option>
                        <option value="other">Other (specify in notes)</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t">
                  <Button type="button" onClick={() => setShowPreview(true)} variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Preview PDF
                  </Button>

                  <Button
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                    variant="outline"
                    className="gap-2 bg-transparent"
                  >
                    <Save className="h-4 w-4" />
                    {isSubmitting && isDraft ? "Saving..." : "Save as Draft"}
                  </Button>

                  <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
                    <Send className="h-4 w-4" />
                    {isSubmitting && !isDraft ? "Submitting..." : "Submit Plan"}
                  </Button>
                </div>
              </div>

              {/* Preview Modal (simplified) */}
              {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <h3 className="text-lg font-semibold mb-4">PDF Preview</h3>
                    <div className="border-2 border-gray-200 rounded p-4 bg-gray-50">
                      <p className="text-gray-600 text-center py-8">PDF preview would be displayed here</p>
                    </div>
                    <Button onClick={() => setShowPreview(false)} className="mt-4" variant="outline">
                      Close Preview
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
