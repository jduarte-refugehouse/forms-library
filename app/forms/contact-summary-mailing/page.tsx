"use client"

import { useState } from "react"
import { Mail, FileText, ArrowLeft, CheckCircle, Eye, Download, Send, Calendar, User } from "lucide-react"
import Link from "next/link"

export default function ContactSummaryMailingForm() {
  const [formData, setFormData] = useState({
    // Basic Information
    childName: "James Wilson",
    caseNumber: "TX-2024-004",
    mailingDate: "2024-01-15",
    reportingPeriod: "2024-01-01 to 2024-01-31",
    workerName: "Jennifer Martinez",
    workerTitle: "Aftercare Specialist",

    // Mailing Recipients
    recipients: [
      {
        id: 1,
        name: "Hon. Judge Patricia Smith",
        title: "Presiding Judge",
        address: "Family Court, 123 Justice Blvd, Austin, TX 78701",
        email: "judge.smith@familycourt.gov",
        type: "court",
        required: true,
      },
      {
        id: 2,
        name: "Sarah Johnson",
        title: "Parent/Guardian",
        address: "456 Oak Street, Austin, TX 78702",
        email: "sarah.johnson@email.com",
        type: "family",
        required: true,
      },
      {
        id: 3,
        name: "Michael Rodriguez",
        title: "Attorney",
        address: "Law Offices of Rodriguez & Associates, 789 Legal Ave, Austin, TX 78703",
        email: "mrodriguez@lawfirm.com",
        type: "legal",
        required: false,
      },
    ],

    // Contact Summary Data
    contactSummary: {
      totalContacts: 8,
      successfulContacts: 6,
      attemptedContacts: 2,
      phoneContacts: 5,
      inPersonContacts: 3,
      averageDuration: 22,
      lastContactDate: "2024-01-28",
    },

    // Service Updates
    serviceUpdates: [
      {
        service: "Individual Therapy",
        status: "Active",
        provider: "Community Mental Health Center",
        frequency: "Weekly",
        progress: "Good progress, attending regularly",
      },
      {
        service: "Educational Services",
        status: "Active",
        provider: "Local High School",
        frequency: "Daily",
        progress: "Maintaining good grades, improved attendance",
      },
      {
        service: "Housing Support",
        status: "Stable",
        provider: "Housing Authority",
        frequency: "Monthly check-ins",
        progress: "Housing placement remains stable",
      },
    ],

    // Goals Progress
    goalsProgress: [
      {
        goal: "Complete high school education",
        status: "On Track",
        progress: "75%",
        notes: "Maintaining B average, on track for graduation",
      },
      {
        goal: "Maintain stable housing",
        status: "Achieved",
        progress: "100%",
        notes: "Housing placement has been stable for 6 months",
      },
      {
        goal: "Develop independent living skills",
        status: "In Progress",
        progress: "60%",
        notes: "Making good progress with budgeting and life skills",
      },
    ],

    // Concerns and Issues
    concerns: "No significant concerns at this time. Youth is making good progress in all areas.",

    // Recommendations
    recommendations:
      "Continue current service plan. Consider adding vocational training component as youth approaches graduation.",

    // Next Steps
    nextSteps: "Schedule quarterly review meeting. Begin exploring post-graduation support options.",

    // Letter Template
    letterTemplate: "formal",
    includeAttachments: true,
    attachmentTypes: ["contact-log", "service-reports"],

    // Delivery Options
    deliveryMethod: "both", // email, mail, both
    urgentDelivery: false,
    trackDelivery: true,
  })

  const [previewMode, setPreviewMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }))
  }

  const handleArrayUpdate = (section, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  const handleRecipientToggle = (recipientId) => {
    setFormData((prev) => ({
      ...prev,
      recipients: prev.recipients.map((recipient) =>
        recipient.id === recipientId ? { ...recipient, selected: !recipient.selected } : recipient,
      ),
    }))
  }

  const generateLetter = async () => {
    setIsGenerating(true)

    // Simulate letter generation
    setTimeout(() => {
      setIsGenerating(false)
      alert("Letter generated successfully!")
    }, 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const letterTemplates = [
    { value: "formal", label: "Formal Court Report" },
    { value: "summary", label: "Summary Update" },
    { value: "detailed", label: "Detailed Progress Report" },
    { value: "custom", label: "Custom Template" },
  ]

  const attachmentOptions = [
    { value: "contact-log", label: "Contact Log Summary" },
    { value: "service-reports", label: "Service Provider Reports" },
    { value: "goal-progress", label: "Goal Progress Charts" },
    { value: "photos", label: "Progress Photos (if applicable)" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Form Directory
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-500 text-white p-6">
            <h1 className="text-2xl font-bold flex items-center">
              <Mail className="mr-3 h-6 w-6" />
              Contact Summary Mailing Generator
            </h1>
            <p className="mt-2 opacity-90">Generate and track required mailings with automated letter creation</p>
          </div>

          {showSuccess && (
            <div className="bg-green-500 text-white p-4 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Contact summary mailing saved and sent successfully!
            </div>
          )}

          <div className="p-6">
            {/* Toggle between Form and Preview */}
            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPreviewMode(false)}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    !previewMode ? "bg-white text-blue-600 shadow" : "text-gray-600"
                  }`}
                >
                  <FileText className="h-4 w-4 inline mr-2" />
                  Form
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode(true)}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    previewMode ? "bg-white text-blue-600 shadow" : "text-gray-600"
                  }`}
                >
                  <Eye className="h-4 w-4 inline mr-2" />
                  Preview
                </button>
              </div>
            </div>

            {!previewMode ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Basic Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Child/Youth Name *</label>
                      <input
                        type="text"
                        value={formData.childName}
                        onChange={(e) => handleInputChange("childName", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Case Number *</label>
                      <input
                        type="text"
                        value={formData.caseNumber}
                        onChange={(e) => handleInputChange("caseNumber", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Mailing Date *
                      </label>
                      <input
                        type="date"
                        value={formData.mailingDate}
                        onChange={(e) => handleInputChange("mailingDate", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reporting Period *</label>
                      <input
                        type="text"
                        value={formData.reportingPeriod}
                        onChange={(e) => handleInputChange("reportingPeriod", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., January 1-31, 2024"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Worker Name *</label>
                      <input
                        type="text"
                        value={formData.workerName}
                        onChange={(e) => handleInputChange("workerName", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Worker Title *</label>
                      <input
                        type="text"
                        value={formData.workerTitle}
                        onChange={(e) => handleInputChange("workerTitle", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </section>

                {/* Recipients */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Mailing Recipients</h2>

                  <div className="space-y-4">
                    {formData.recipients.map((recipient) => (
                      <div key={recipient.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <input
                                type="checkbox"
                                checked={recipient.selected !== false}
                                onChange={() => handleRecipientToggle(recipient.id)}
                                disabled={recipient.required}
                                className="mr-3 h-4 w-4 text-blue-500"
                              />
                              <h3 className="font-semibold text-gray-800">{recipient.name}</h3>
                              {recipient.required && (
                                <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded">Required</span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{recipient.title}</p>
                            <p className="text-sm text-gray-500 mb-1">{recipient.address}</p>
                            <p className="text-sm text-gray-500">{recipient.email}</p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              recipient.type === "court"
                                ? "bg-purple-100 text-purple-700"
                                : recipient.type === "family"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {recipient.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Contact Summary Statistics */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Summary Statistics</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{formData.contactSummary.totalContacts}</div>
                      <div className="text-sm text-gray-600">Total Contacts</div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {formData.contactSummary.successfulContacts}
                      </div>
                      <div className="text-sm text-gray-600">Successful</div>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {formData.contactSummary.attemptedContacts}
                      </div>
                      <div className="text-sm text-gray-600">Attempted</div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {formData.contactSummary.averageDuration}m
                      </div>
                      <div className="text-sm text-gray-600">Avg Duration</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Contacts</label>
                      <input
                        type="number"
                        value={formData.contactSummary.phoneContacts}
                        onChange={(e) =>
                          handleNestedChange("contactSummary", "phoneContacts", Number.parseInt(e.target.value))
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">In-Person Contacts</label>
                      <input
                        type="number"
                        value={formData.contactSummary.inPersonContacts}
                        onChange={(e) =>
                          handleNestedChange("contactSummary", "inPersonContacts", Number.parseInt(e.target.value))
                        }
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Contact Date</label>
                      <input
                        type="date"
                        value={formData.contactSummary.lastContactDate}
                        onChange={(e) => handleNestedChange("contactSummary", "lastContactDate", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </section>

                {/* Service Updates */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Updates</h2>

                  <div className="space-y-4">
                    {formData.serviceUpdates.map((service, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                            <input
                              type="text"
                              value={service.service}
                              onChange={(e) => handleArrayUpdate("serviceUpdates", index, "service", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                              value={service.status}
                              onChange={(e) => handleArrayUpdate("serviceUpdates", index, "status", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="Active">Active</option>
                              <option value="Stable">Stable</option>
                              <option value="Needs Attention">Needs Attention</option>
                              <option value="Discontinued">Discontinued</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                            <input
                              type="text"
                              value={service.provider}
                              onChange={(e) => handleArrayUpdate("serviceUpdates", index, "provider", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                            <input
                              type="text"
                              value={service.frequency}
                              onChange={(e) => handleArrayUpdate("serviceUpdates", index, "frequency", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Progress Notes</label>
                          <textarea
                            value={service.progress}
                            onChange={(e) => handleArrayUpdate("serviceUpdates", index, "progress", e.target.value)}
                            rows="2"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Goals Progress */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Goals Progress</h2>

                  <div className="space-y-4">
                    {formData.goalsProgress.map((goal, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
                            <input
                              type="text"
                              value={goal.goal}
                              onChange={(e) => handleArrayUpdate("goalsProgress", index, "goal", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                              value={goal.status}
                              onChange={(e) => handleArrayUpdate("goalsProgress", index, "status", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="On Track">On Track</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Achieved">Achieved</option>
                              <option value="Needs Attention">Needs Attention</option>
                              <option value="Not Started">Not Started</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Progress %</label>
                            <input
                              type="text"
                              value={goal.progress}
                              onChange={(e) => handleArrayUpdate("goalsProgress", index, "progress", e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="e.g., 75%"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Progress Notes</label>
                          <textarea
                            value={goal.notes}
                            onChange={(e) => handleArrayUpdate("goalsProgress", index, "notes", e.target.value)}
                            rows="2"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Concerns and Recommendations */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Assessment and Recommendations</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Concerns or Issues</label>
                      <textarea
                        value={formData.concerns}
                        onChange={(e) => handleInputChange("concerns", e.target.value)}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Document any current concerns, challenges, or issues..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recommendations</label>
                      <textarea
                        value={formData.recommendations}
                        onChange={(e) => handleInputChange("recommendations", e.target.value)}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Provide recommendations for continued services or changes..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Next Steps</label>
                      <textarea
                        value={formData.nextSteps}
                        onChange={(e) => handleInputChange("nextSteps", e.target.value)}
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Outline planned next steps and upcoming activities..."
                      />
                    </div>
                  </div>
                </section>

                {/* Letter Configuration */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Letter Configuration</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Letter Template *</label>
                      <select
                        value={formData.letterTemplate}
                        onChange={(e) => handleInputChange("letterTemplate", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        {letterTemplates.map((template) => (
                          <option key={template.value} value={template.value}>
                            {template.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Method *</label>
                      <select
                        value={formData.deliveryMethod}
                        onChange={(e) => handleInputChange("deliveryMethod", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="email">Email Only</option>
                        <option value="mail">Mail Only</option>
                        <option value="both">Both Email and Mail</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={formData.includeAttachments}
                        onChange={(e) => handleInputChange("includeAttachments", e.target.checked)}
                        className="mr-3 h-5 w-5 text-blue-500"
                      />
                      <span className="font-medium">Include Attachments</span>
                    </label>
                  </div>

                  {formData.includeAttachments && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Select Attachments</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {attachmentOptions.map((attachment) => (
                          <label
                            key={attachment.value}
                            className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              checked={formData.attachmentTypes.includes(attachment.value)}
                              onChange={() => {
                                const newTypes = formData.attachmentTypes.includes(attachment.value)
                                  ? formData.attachmentTypes.filter((type) => type !== attachment.value)
                                  : [...formData.attachmentTypes, attachment.value]
                                handleInputChange("attachmentTypes", newTypes)
                              }}
                              className="mr-3 h-4 w-4 text-blue-500"
                            />
                            <span className="text-sm">{attachment.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={formData.urgentDelivery}
                        onChange={(e) => handleInputChange("urgentDelivery", e.target.checked)}
                        className="mr-3 h-5 w-5 text-red-500"
                      />
                      <span className="font-medium">Urgent Delivery</span>
                    </label>

                    <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                      <input
                        type="checkbox"
                        checked={formData.trackDelivery}
                        onChange={(e) => handleInputChange("trackDelivery", e.target.checked)}
                        className="mr-3 h-5 w-5 text-blue-500"
                      />
                      <span className="font-medium">Track Delivery</span>
                    </label>
                  </div>
                </section>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <button
                    type="button"
                    onClick={generateLetter}
                    disabled={isGenerating}
                    className={`px-6 py-3 rounded-md font-medium transition-all flex items-center ${
                      isGenerating ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600 text-white"
                    }`}
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    {isGenerating ? "Generating..." : "Generate Letter"}
                  </button>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-medium transition-all flex items-center"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download
                    </button>

                    <button
                      type="submit"
                      disabled={isSaving}
                      className={`px-8 py-3 rounded-md font-medium transition-all flex items-center ${
                        isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {isSaving ? "Sending..." : "Save & Send"}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              /* Preview Mode */
              <div className="max-w-4xl mx-auto">
                <div className="bg-white border border-gray-300 p-8 rounded-lg shadow-sm">
                  <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">CONTACT SUMMARY REPORT</h1>
                    <p className="text-gray-600">Reporting Period: {formData.reportingPeriod}</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Case Information</h2>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Youth Name:</strong> {formData.childName}
                        </div>
                        <div>
                          <strong>Case Number:</strong> {formData.caseNumber}
                        </div>
                        <div>
                          <strong>Report Date:</strong> {formData.mailingDate}
                        </div>
                        <div>
                          <strong>Worker:</strong> {formData.workerName}, {formData.workerTitle}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Contact Summary</h2>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center p-3 bg-blue-50 rounded">
                          <div className="text-xl font-bold text-blue-600">{formData.contactSummary.totalContacts}</div>
                          <div>Total Contacts</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded">
                          <div className="text-xl font-bold text-green-600">
                            {formData.contactSummary.successfulContacts}
                          </div>
                          <div>Successful</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded">
                          <div className="text-xl font-bold text-yellow-600">
                            {formData.contactSummary.attemptedContacts}
                          </div>
                          <div>Attempted</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded">
                          <div className="text-xl font-bold text-purple-600">
                            {formData.contactSummary.averageDuration}m
                          </div>
                          <div>Avg Duration</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Service Updates</h2>
                      <div className="space-y-2">
                        {formData.serviceUpdates.map((service, index) => (
                          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <strong>{service.service}</strong> - {service.provider}
                                <div className="text-sm text-gray-600">{service.frequency}</div>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs rounded ${
                                  service.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : service.status === "Stable"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {service.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{service.progress}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Goals Progress</h2>
                      <div className="space-y-2">
                        {formData.goalsProgress.map((goal, index) => (
                          <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                            <div className="flex justify-between items-start">
                              <strong>{goal.goal}</strong>
                              <div className="text-right">
                                <span
                                  className={`px-2 py-1 text-xs rounded ${
                                    goal.status === "Achieved"
                                      ? "bg-green-100 text-green-700"
                                      : goal.status === "On Track"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {goal.status}
                                </span>
                                <div className="text-sm text-gray-600 mt-1">{goal.progress}</div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{goal.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {formData.concerns && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Current Concerns</h2>
                        <p className="text-sm text-gray-700">{formData.concerns}</p>
                      </div>
                    )}

                    {formData.recommendations && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Recommendations</h2>
                        <p className="text-sm text-gray-700">{formData.recommendations}</p>
                      </div>
                    )}

                    {formData.nextSteps && (
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Next Steps</h2>
                        <p className="text-sm text-gray-700">{formData.nextSteps}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
                    <p>This report was generated on {formData.mailingDate}</p>
                    <p>
                      Prepared by: {formData.workerName}, {formData.workerTitle}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
