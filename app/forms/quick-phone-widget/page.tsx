"use client"

import { useState, useEffect } from "react"
import { Phone, PhoneOff, Mic, CheckCircle, Flag, Expand, Save, ChevronUp, ChevronDown, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function QuickPhoneContactWidget() {
  const [contactData, setContactData] = useState({
    contactSuccess: true,
    duration: 15,
    attemptCount: 1,
    voiceNote: "",
    followUpNeeded: false,
    childName: "",
    quickNotes: "",
    contactPurpose: "general",
    packageType: "",
    otherPackageType: "",
  })

  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recentContacts, setRecentContacts] = useState([])
  const [showRecent, setShowRecent] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [expandedView, setExpandedView] = useState(false)
  const [activeChild, setActiveChild] = useState(null)

  // Duration presets for quick selection
  const durationPresets = [5, 10, 15, 20, 30, 45]

  // Recent children for quick selection
  const recentChildren = [
    { id: 1, name: "Sarah Johnson", caseNumber: "TX-2024-001" },
    { id: 2, name: "Michael Chen", caseNumber: "TX-2024-002" },
    { id: 3, name: "Maria Rodriguez", caseNumber: "TX-2024-003" },
    { id: 4, name: "James Wilson", caseNumber: "TX-2024-004" },
    { id: 5, name: "Emma Davis", caseNumber: "TX-2024-005" },
  ]

  // Contact purpose options
  const contactPurposes = [
    { value: "general", label: "General Check-in" },
    { value: "aftercare", label: "Aftercare Contact" },
    { value: "crisis", label: "Crisis Response" },
    { value: "placement", label: "Placement Related" },
    { value: "medical", label: "Medical/Health" },
    { value: "education", label: "Education/School" },
    { value: "family", label: "Family Contact" },
    { value: "court", label: "Court/Legal" },
  ]

  // Service package options
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

  // Load recent contacts on mount
  useEffect(() => {
    loadRecentContacts()
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

  const loadRecentContacts = () => {
    // Simulate loading recent contacts
    const mockRecent = [
      {
        id: 1,
        childName: "Sarah Johnson",
        time: "10 min ago",
        type: "successful",
        duration: 15,
        purpose: "aftercare",
      },
      {
        id: 2,
        childName: "Michael Chen",
        time: "2 hours ago",
        type: "attempted",
        attempts: 2,
        purpose: "medical",
      },
      {
        id: 3,
        childName: "Maria Rodriguez",
        time: "3 hours ago",
        type: "successful",
        duration: 25,
        purpose: "family",
      },
      {
        id: 4,
        childName: "James Wilson",
        time: "Yesterday",
        type: "successful",
        duration: 10,
        purpose: "general",
      },
      {
        id: 5,
        childName: "Emma Davis",
        time: "Yesterday",
        type: "attempted",
        attempts: 1,
        purpose: "placement",
      },
    ]
    setRecentContacts(mockRecent)
  }

  const handleSuccessToggle = (value) => {
    setContactData((prev) => ({
      ...prev,
      contactSuccess: value,
      duration: value ? 15 : 0,
      attemptCount: value ? 0 : 1,
    }))
  }

  const handleDurationChange = (value) => {
    setContactData((prev) => ({
      ...prev,
      duration: Number.parseInt(value),
    }))
  }

  const handleDurationPreset = (preset) => {
    setContactData((prev) => ({
      ...prev,
      duration: preset,
    }))
  }

  const adjustAttempts = (change) => {
    setContactData((prev) => ({
      ...prev,
      attemptCount: Math.max(1, Math.min(10, prev.attemptCount + change)),
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

  const selectChild = (child) => {
    setActiveChild(child)
    setContactData((prev) => ({
      ...prev,
      childName: child.name,
    }))
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setContactData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear other package type when not "other"
    if (name === "packageType" && value !== "other") {
      setContactData((prev) => ({ ...prev, otherPackageType: "" }))
    }
  }

  const handleSave = async () => {
    if (!contactData.childName) {
      alert("Please select a child")
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      const newContact = {
        id: Date.now(),
        childName: contactData.childName,
        time: "Just now",
        type: contactData.contactSuccess ? "successful" : "attempted",
        duration: contactData.duration,
        attempts: contactData.attemptCount,
        followUp: contactData.followUpNeeded,
        purpose: contactData.contactPurpose,
      }

      setRecentContacts((prev) => [newContact, ...prev.slice(0, 4)])
      setIsSaving(false)
      setShowSuccess(true)

      // Reset form after short delay
      setTimeout(() => {
        setShowSuccess(false)
        setContactData({
          contactSuccess: true,
          duration: 15,
          attemptCount: 1,
          voiceNote: "",
          followUpNeeded: false,
          childName: "",
          quickNotes: "",
          contactPurpose: "general",
          packageType: "",
          otherPackageType: "",
        })
        setActiveChild(null)
      }, 2000)
    }, 800)
  }

  const createTask = () => {
    if (!contactData.childName) {
      alert("Please select a child first")
      return
    }
    alert(`Task created for ${contactData.childName}`)
  }

  const expandToFullForm = () => {
    alert("Expanding to full contact form...")
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
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
              <h1 className="text-3xl font-bold text-gray-900">Quick Phone Contact Widget (Draft)</h1>
              <p className="text-gray-600">Streamlined phone contact logging for quick interactions</p>
            </div>
          </div>

          {/* Draft Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-amber-800">
              <Phone className="h-5 w-5" />
              <p className="font-medium">This is a draft form for review and evaluation purposes only.</p>
            </div>
          </div>
        </div>

        <div
          className={`w-full max-w-md mx-auto bg-white rounded-lg shadow-lg transition-all duration-300 ${
            expandedView ? "max-h-screen" : "max-h-[600px]"
          }`}
        >
          {/* Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Quick Contact
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-400 text-blue-100">
                  Draft
                </Badge>
                <button onClick={() => setExpandedView(!expandedView)} className="p-1 hover:bg-blue-600 rounded">
                  <Expand className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-green-500 text-white p-3 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Contact saved!
            </div>
          )}

          <div className="p-4 space-y-4">
            {/* Child Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Child</label>
              <div className="grid grid-cols-2 gap-2">
                {recentChildren.slice(0, expandedView ? 5 : 4).map((child) => (
                  <button
                    key={child.id}
                    onClick={() => selectChild(child)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      activeChild?.id === child.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-medium text-sm">{child.name}</p>
                    <p className="text-xs text-gray-500">{child.caseNumber}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Package */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Package</label>
              <select
                name="packageType"
                value={contactData.packageType}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="">Select package type</option>
                {packageTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {contactData.packageType === "other" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specify Other Package</label>
                <input
                  type="text"
                  name="otherPackageType"
                  value={contactData.otherPackageType}
                  onChange={handleInputChange}
                  placeholder="Enter specific package type"
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            )}

            {/* Contact Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Purpose</label>
              <select
                value={contactData.contactPurpose}
                onChange={(e) => setContactData((prev) => ({ ...prev, contactPurpose: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              >
                {contactPurposes.map((purpose) => (
                  <option key={purpose.value} value={purpose.value}>
                    {purpose.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Type Toggle */}
            <div className="flex rounded-lg overflow-hidden border-2 border-gray-200">
              <button
                onClick={() => handleSuccessToggle(true)}
                className={`flex-1 py-4 flex flex-col items-center transition-all ${
                  contactData.contactSuccess ? "bg-green-500 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Phone className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Successful</span>
              </button>
              <button
                onClick={() => handleSuccessToggle(false)}
                className={`flex-1 py-4 flex flex-col items-center transition-all ${
                  !contactData.contactSuccess
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <PhoneOff className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Attempted</span>
              </button>
            </div>

            {/* Person Contacted (for successful contacts) */}
            {contactData.contactSuccess && expandedView && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Person Contacted</label>
                <input
                  type="text"
                  value={contactData.personContacted || ""}
                  onChange={(e) => setContactData((prev) => ({ ...prev, personContacted: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm"
                  placeholder="e.g., Youth, Foster Parent, Case Worker"
                />
              </div>
            )}

            {/* Duration Slider (for successful contacts) */}
            {contactData.contactSuccess && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration: {contactData.duration} minutes
                </label>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={contactData.duration}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                      ((contactData.duration - 5) / 55) * 100
                    }%, #e5e7eb ${((contactData.duration - 5) / 55) * 100}%, #e5e7eb 100%)`,
                  }}
                />
                {/* Duration Presets */}
                <div className="grid grid-cols-6 gap-1 mt-2">
                  {durationPresets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handleDurationPreset(preset)}
                      className={`py-1 text-xs rounded ${
                        contactData.duration === preset
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {preset}m
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Attempt Counter (for attempted contacts) */}
            {!contactData.contactSuccess && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Attempts</label>
                <div className="flex items-center justify-center space-x-4">
                  <button
                    onClick={() => adjustAttempts(-1)}
                    className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  >
                    <ChevronDown className="h-6 w-6" />
                  </button>
                  <span className="text-3xl font-bold text-gray-800 w-12 text-center">{contactData.attemptCount}</span>
                  <button
                    onClick={() => adjustAttempts(1)}
                    className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  >
                    <ChevronUp className="h-6 w-6" />
                  </button>
                </div>
              </div>
            )}

            {/* Voice Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Voice Note</label>
              <button
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
                  <span>Tap to record</span>
                )}
              </button>
            </div>

            {/* Quick Notes (expanded view only) */}
            {expandedView && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quick Notes</label>
                <textarea
                  value={contactData.quickNotes}
                  onChange={(e) => setContactData((prev) => ({ ...prev, quickNotes: e.target.value }))}
                  rows="2"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Add any quick notes..."
                />
              </div>
            )}

            {/* Follow-up Flag */}
            <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
              <input
                type="checkbox"
                checked={contactData.followUpNeeded}
                onChange={(e) => setContactData((prev) => ({ ...prev, followUpNeeded: e.target.checked }))}
                className="mr-3 h-5 w-5 text-blue-500"
              />
              <Flag className="h-5 w-5 mr-2 text-orange-500" />
              <span className="text-sm font-medium">Follow-up needed</span>
            </label>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving || !activeChild}
                className={`py-3 rounded-lg font-medium transition-all flex flex-col items-center ${
                  isSaving || !activeChild
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                <Save className="h-5 w-5 mb-1" />
                <span className="text-xs">{isSaving ? "Saving..." : "Save"}</span>
              </button>

              <button
                onClick={createTask}
                className="py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition-all flex flex-col items-center"
              >
                <Flag className="h-5 w-5 mb-1" />
                <span className="text-xs">Task</span>
              </button>

              <button
                onClick={expandToFullForm}
                className="py-3 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium transition-all flex flex-col items-center"
              >
                <Expand className="h-5 w-5 mb-1" />
                <span className="text-xs">Full Form</span>
              </button>
            </div>

            {/* Recent Contacts */}
            <div>
              <button
                onClick={() => setShowRecent(!showRecent)}
                className="w-full flex items-center justify-between text-sm font-medium text-gray-700 py-2"
              >
                <span>Recent Contacts ({recentContacts.length})</span>
                {showRecent ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {showRecent && (
                <div className="space-y-2 mt-2">
                  {recentContacts.map((contact) => (
                    <div key={contact.id} className="p-3 bg-gray-50 rounded-lg flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{contact.childName}</p>
                        <p className="text-xs text-gray-500">
                          {contact.time} •{" "}
                          {contact.type === "successful" ? `${contact.duration} min` : `${contact.attempts} attempts`}
                        </p>
                        {contact.purpose && contact.purpose !== "general" && (
                          <span className="text-xs text-blue-600">
                            {contactPurposes.find((p) => p.value === contact.purpose)?.label}
                          </span>
                        )}
                      </div>
                      {contact.followUp && <Flag className="h-4 w-4 text-orange-500 flex-shrink-0" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
