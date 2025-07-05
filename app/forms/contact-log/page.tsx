"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Phone,
  MessageSquare,
  Users,
  Mic,
  Save,
  Calendar,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function ContactLogEntryForm() {
  const [contactData, setContactData] = useState({
    // Basic Information
    childName: "",
    caseNumber: "",
    packageType: "",
    otherPackageType: "",
    contactDate: new Date().toISOString().split("T")[0],
    contactTime: new Date().toTimeString().slice(0, 5),

    // Contact Details
    contactType: "phone",
    contactPurpose: "general",
    personContacted: "",
    contactMethod: "outgoing",
    duration: 15,
    successful: true,

    // Topics and Notes
    topicsDiscussed: [],
    conversationNotes: "",
    voiceNote: "",
    actionItems: "",
    followUpNeeded: false,
    followUpDate: "",

    // Crisis-specific fields
    crisisType: "",
    immediateActions: "",
    safetyPlan: "",
    notificationsRequired: [],

    // Documentation
    documentationComplete: false,
    supervisorReview: false,
  })

  const [todaysEntries, setTodaysEntries] = useState([])
  const [monthlyReminder, setMonthlyReminder] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Load today's entries on mount
  useEffect(() => {
    loadTodaysEntries()
    checkMonthlyReminder()
  }, [])

  // Timer for voice recording
  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const packageTypes = [
    { value: "mental", label: "Mental & Behavioral Health Support Services" },
    { value: "idd", label: "IDD/Autism Spectrum Disorder Support Services" },
    { value: "treatment", label: "T3C Treatment Foster Family Care Support Services" },
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

  const contactTypes = [
    { value: "phone", label: "Phone Call", icon: Phone },
    { value: "text", label: "Text/SMS", icon: MessageSquare },
    { value: "inperson", label: "In-Person Visit", icon: Users },
  ]

  const contactPurposes = [
    { value: "general", label: "General Check-in" },
    { value: "aftercare", label: "Aftercare Contact" },
    { value: "crisis", label: "Crisis Response" },
    { value: "placement", label: "Placement Related" },
    { value: "medical", label: "Medical/Health" },
    { value: "education", label: "Education/School" },
    { value: "family", label: "Family Contact" },
    { value: "court", label: "Court/Legal" },
    { value: "behavioral", label: "Behavioral Concerns" },
    { value: "transition", label: "Transition Planning" },
  ]

  const discussionTopics = [
    "Safety and Well-being",
    "Educational Progress",
    "Medical/Health Updates",
    "Behavioral Concerns",
    "Family Relationships",
    "Placement Stability",
    "Future Planning",
    "Crisis Support",
    "Resource Needs",
    "Legal Updates",
  ]

  const crisisTypes = [
    "Safety Concern",
    "Mental Health Crisis",
    "Placement Disruption",
    "Medical Emergency",
    "Legal Issue",
    "Family Crisis",
    "Educational Crisis",
    "Other",
  ]

  const notificationOptions = [
    "Supervisor",
    "DFPS Caseworker",
    "Court",
    "Guardian ad Litem",
    "CASA",
    "Therapist",
    "Medical Provider",
  ]

  const loadTodaysEntries = () => {
    // Simulate loading today's entries
    const mockEntries = [
      {
        id: 1,
        childName: "Sarah Johnson",
        time: "09:30 AM",
        type: "phone",
        purpose: "aftercare",
        duration: 20,
        status: "completed",
      },
      {
        id: 2,
        childName: "Michael Chen",
        time: "11:15 AM",
        type: "text",
        purpose: "medical",
        status: "completed",
      },
      {
        id: 3,
        childName: "Maria Rodriguez",
        time: "02:45 PM",
        type: "inperson",
        purpose: "placement",
        duration: 45,
        status: "completed",
      },
    ]
    setTodaysEntries(mockEntries)
  }

  const checkMonthlyReminder = () => {
    // Check if it's near end of month
    const today = new Date()
    const daysLeft = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate()
    setMonthlyReminder(daysLeft <= 3)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setContactData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }

    // Clear other package type when not "other"
    if (name === "packageType" && value !== "other") {
      setContactData((prev) => ({ ...prev, otherPackageType: "" }))
    }

    // Set follow-up date when follow-up is needed
    if (name === "followUpNeeded" && checked) {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7)
      setContactData((prev) => ({
        ...prev,
        followUpDate: futureDate.toISOString().split("T")[0],
      }))
    }
  }

  const handleTopicToggle = (topic) => {
    setContactData((prev) => ({
      ...prev,
      topicsDiscussed: prev.topicsDiscussed.includes(topic)
        ? prev.topicsDiscussed.filter((t) => t !== topic)
        : [...prev.topicsDiscussed, topic],
    }))
  }

  const handleNotificationToggle = (notification) => {
    setContactData((prev) => ({
      ...prev,
      notificationsRequired: prev.notificationsRequired.includes(notification)
        ? prev.notificationsRequired.filter((n) => n !== notification)
        : [...prev.notificationsRequired, notification],
    }))
  }

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      // Simulate saving voice note
      setTimeout(() => {
        setContactData((prev) => ({
          ...prev,
          voiceNote: `Voice note recorded (${recordingTime}s)`,
        }))
      }, 500)
    } else {
      // Start recording
      setIsRecording(true)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const validateForm = () => {
    const newErrors = {}

    if (!contactData.childName) newErrors.childName = "Child name is required"
    if (!contactData.caseNumber) newErrors.caseNumber = "Case number is required"
    if (!contactData.packageType) newErrors.packageType = "Package type is required"
    if (contactData.packageType === "other" && !contactData.otherPackageType) {
      newErrors.otherPackageType = "Please specify the other package type"
    }
    if (!contactData.personContacted) newErrors.personContacted = "Person contacted is required"
    if (!contactData.conversationNotes) newErrors.conversationNotes = "Conversation notes are required"

    // Crisis-specific validation
    if (contactData.contactPurpose === "crisis") {
      if (!contactData.crisisType) newErrors.crisisType = "Crisis type is required"
      if (!contactData.immediateActions) newErrors.immediateActions = "Immediate actions are required"
      if (!contactData.safetyPlan) newErrors.safetyPlan = "Safety plan is required"
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
      const newEntry = {
        id: Date.now(),
        childName: contactData.childName,
        time: contactData.contactTime,
        type: contactData.contactType,
        purpose: contactData.contactPurpose,
        duration: contactData.duration,
        status: "completed",
      }

      setTodaysEntries((prev) => [...prev, newEntry])
      setIsSubmitting(false)
      setShowSuccess(true)

      // Reset form after short delay
      setTimeout(() => {
        setShowSuccess(false)
        setContactData({
          childName: "",
          caseNumber: "",
          packageType: "",
          otherPackageType: "",
          contactDate: new Date().toISOString().split("T")[0],
          contactTime: new Date().toTimeString().slice(0, 5),
          contactType: "phone",
          contactPurpose: "general",
          personContacted: "",
          contactMethod: "outgoing",
          duration: 15,
          successful: true,
          topicsDiscussed: [],
          conversationNotes: "",
          voiceNote: "",
          actionItems: "",
          followUpNeeded: false,
          followUpDate: "",
          crisisType: "",
          immediateActions: "",
          safetyPlan: "",
          notificationsRequired: [],
          documentationComplete: false,
          supervisorReview: false,
        })
      }, 2000)
    }, 1500)
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
            <Phone className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Log Entry Form (Draft)</h1>
              <p className="text-gray-600">Detailed contact tracking with voice-to-text and crisis documentation</p>
            </div>
          </div>

          {/* Draft Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-amber-800">
              <Phone className="h-5 w-5" />
              <p className="font-medium">This is a draft form for review and evaluation purposes only.</p>
            </div>
          </div>

          {/* Monthly Documentation Reminder */}
          {monthlyReminder && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-blue-800">
                <Calendar className="h-5 w-5" />
                <p className="font-medium">
                  Monthly Documentation Reminder: End of month approaching. Ensure all required contacts are documented.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Today's Entries Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-blue-600" />
                Today's Entries ({todaysEntries.length})
              </h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {new Date().toLocaleDateString()}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todaysEntries.map((entry) => (
                <div key={entry.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{entry.childName}</p>
                    <span className="text-xs text-gray-500">{entry.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    {contactTypes.find((t) => t.value === entry.type)?.icon && (
                      <span className="flex items-center">
                        {React.createElement(contactTypes.find((t) => t.value === entry.type).icon, {
                          className: "h-3 w-3 mr-1",
                        })}
                        {contactTypes.find((t) => t.value === entry.type)?.label}
                      </span>
                    )}
                    {entry.duration && <span>• {entry.duration}min</span>}
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    {contactPurposes.find((p) => p.value === entry.purpose)?.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Contact Log Entry</h2>
                <p className="text-sm text-gray-600 mt-1">Document all contact attempts and interactions</p>
              </div>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                Draft
              </Badge>
            </div>

            {showSuccess && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Contact logged successfully!
              </div>
            )}

            <div className="space-y-8">
              {/* Basic Information */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Child Name *</label>
                    <input
                      type="text"
                      name="childName"
                      value={contactData.childName}
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
                      value={contactData.caseNumber}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${errors.caseNumber ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.caseNumber && <p className="text-red-500 text-sm mt-1">{errors.caseNumber}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Package *</label>
                    <select
                      name="packageType"
                      value={contactData.packageType}
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

                  {contactData.packageType === "other" && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Please specify other package type *
                      </label>
                      <input
                        type="text"
                        name="otherPackageType"
                        value={contactData.otherPackageType}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Date</label>
                    <input
                      type="date"
                      name="contactDate"
                      value={contactData.contactDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Time</label>
                    <input
                      type="time"
                      name="contactTime"
                      value={contactData.contactTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </section>

              {/* Contact Type Selection */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Contact Type</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contactTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        contactData.contactType === type.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="contactType"
                        value={type.value}
                        checked={contactData.contactType === type.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <type.icon className="h-6 w-6 mr-3 text-blue-600" />
                      <span className="font-medium">{type.label}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Contact Details */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Contact Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Purpose</label>
                    <select
                      name="contactPurpose"
                      value={contactData.contactPurpose}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {contactPurposes.map((purpose) => (
                        <option key={purpose.value} value={purpose.value}>
                          {purpose.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Person Contacted *</label>
                    <input
                      type="text"
                      name="personContacted"
                      value={contactData.personContacted}
                      onChange={handleInputChange}
                      placeholder="e.g., Youth, Foster Parent, Case Worker"
                      className={`w-full p-2 border rounded-md ${errors.personContacted ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.personContacted && <p className="text-red-500 text-sm mt-1">{errors.personContacted}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Method</label>
                    <select
                      name="contactMethod"
                      value={contactData.contactMethod}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="outgoing">Outgoing</option>
                      <option value="incoming">Incoming</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      name="duration"
                      value={contactData.duration}
                      onChange={handleInputChange}
                      min="1"
                      max="300"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="successful"
                        checked={contactData.successful}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Contact was successful</span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Topics Discussed */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Topics Discussed</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {discussionTopics.map((topic) => (
                    <label key={topic} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={contactData.topicsDiscussed.includes(topic)}
                        onChange={() => handleTopicToggle(topic)}
                        className="mr-2"
                      />
                      <span className="text-sm">{topic}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* Voice-to-Text Simulation */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Voice Notes & Documentation</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Voice Note (Simulated)</label>
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className={`w-full py-4 rounded-lg flex items-center justify-center transition-all ${
                        isRecording
                          ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                          : contactData.voiceNote
                            ? "bg-green-100 hover:bg-green-200 text-green-700"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <Mic className="h-6 w-6 mr-2" />
                      {isRecording ? (
                        <span>Recording... {formatTime(recordingTime)}</span>
                      ) : contactData.voiceNote ? (
                        <span>{contactData.voiceNote}</span>
                      ) : (
                        <span>Tap to record voice note</span>
                      )}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conversation Notes *</label>
                    <textarea
                      name="conversationNotes"
                      value={contactData.conversationNotes}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Document the conversation details, outcomes, and any concerns discussed"
                      className={`w-full p-2 border rounded-md ${errors.conversationNotes ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.conversationNotes && (
                      <p className="text-red-500 text-sm mt-1">{errors.conversationNotes}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Action Items</label>
                    <textarea
                      name="actionItems"
                      value={contactData.actionItems}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="List any follow-up actions or tasks that need to be completed"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </section>

              {/* Crisis-Specific Fields */}
              {contactData.contactPurpose === "crisis" && (
                <section className="space-y-4 bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-semibold text-red-800">Crisis Documentation</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Crisis Type *</label>
                      <select
                        name="crisisType"
                        value={contactData.crisisType}
                        onChange={handleInputChange}
                        className={`w-full p-2 border rounded-md ${errors.crisisType ? "border-red-500" : "border-gray-300"}`}
                      >
                        <option value="">Select crisis type</option>
                        {crisisTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.crisisType && <p className="text-red-500 text-sm mt-1">{errors.crisisType}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notifications Required</label>
                      <div className="space-y-1">
                        {notificationOptions.map((option) => (
                          <label key={option} className="flex items-center text-sm">
                            <input
                              type="checkbox"
                              checked={contactData.notificationsRequired.includes(option)}
                              onChange={() => handleNotificationToggle(option)}
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Immediate Actions Taken *</label>
                      <textarea
                        name="immediateActions"
                        value={contactData.immediateActions}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Document immediate actions taken to address the crisis"
                        className={`w-full p-2 border rounded-md ${errors.immediateActions ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.immediateActions && (
                        <p className="text-red-500 text-sm mt-1">{errors.immediateActions}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Safety Plan *</label>
                      <textarea
                        name="safetyPlan"
                        value={contactData.safetyPlan}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Document safety plan and ongoing monitoring requirements"
                        className={`w-full p-2 border rounded-md ${errors.safetyPlan ? "border-red-500" : "border-gray-300"}`}
                      />
                      {errors.safetyPlan && <p className="text-red-500 text-sm mt-1">{errors.safe}</p>}
                    </div>
                  </div>
                </section>
              )}

              {/* Follow-up */}
              <section className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">Follow-up</h3>

                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="followUpNeeded"
                      checked={contactData.followUpNeeded}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">Follow-up contact needed</span>
                  </label>

                  {contactData.followUpNeeded && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
                      <input
                        type="date"
                        name="followUpDate"
                        value={contactData.followUpDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  )}
                </div>
              </section>

              {/* Documentation Checklist */}
              <section className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">Documentation Checklist</h3>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="documentationComplete"
                      checked={contactData.documentationComplete}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      All required documentation is complete and accurate
                    </span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="supervisorReview"
                      checked={contactData.supervisorReview}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Supervisor review required (crisis contacts only)
                    </span>
                  </label>
                </div>
              </section>

              {/* Submit Button */}
              <div className="flex justify-end pt-6 border-t">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Saving..." : "Save Contact Log"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
