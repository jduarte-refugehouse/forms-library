"use client"

import { useState } from "react"
import { BarChart3, Save, ArrowLeft, CheckCircle, Calendar, TrendingUp, Users, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function MonthlyReportForm() {
  const [formData, setFormData] = useState({
    // Report Information
    reportMonth: "2024-01",
    reportDate: "2024-02-01",
    workerName: "Jennifer Martinez",
    workerTitle: "Aftercare Specialist",
    supervisorName: "Dr. Patricia Williams",

    // Caseload Summary
    caseloadData: {
      totalCases: 12,
      activeCases: 10,
      closedCases: 2,
      newCases: 1,
      transferredCases: 0,
    },

    // Contact Statistics
    contactStats: {
      totalContacts: 45,
      successfulContacts: 38,
      attemptedContacts: 7,
      phoneContacts: 28,
      inPersonContacts: 17,
      averageDuration: 24,
      contactGoalMet: true,
    },

    // Service Delivery
    serviceDelivery: [
      {
        service: "Individual Therapy",
        clientsServed: 8,
        sessionsProvided: 32,
        goalMet: true,
        notes: "All clients maintaining regular attendance",
      },
      {
        service: "Educational Support",
        clientsServed: 10,
        sessionsProvided: 40,
        goalMet: true,
        notes: "Good progress across all educational goals",
      },
      {
        service: "Housing Assistance",
        clientsServed: 6,
        sessionsProvided: 12,
        goalMet: false,
        notes: "Two clients still seeking stable housing",
      },
      {
        service: "Employment Services",
        clientsServed: 4,
        sessionsProvided: 16,
        goalMet: true,
        notes: "Two clients secured part-time employment",
      },
    ],

    // Outcomes and Progress
    outcomes: {
      educationGoalsMet: 8,
      housingStabilized: 7,
      employmentAchieved: 3,
      healthServicesAccessed: 9,
      legalIssuesResolved: 2,
    },

    // Challenges and Concerns
    challenges: [
      {
        category: "Housing",
        description: "Limited affordable housing options in the area",
        impact: "High",
        actionPlan: "Working with housing authority to identify additional resources",
      },
      {
        category: "Transportation",
        description: "Several clients lack reliable transportation",
        impact: "Medium",
        actionPlan: "Exploring public transit voucher program",
      },
    ],

    // Success Stories
    successStories: [
      {
        clientInitials: "S.J.",
        achievement: "Graduated high school and enrolled in community college",
        impact: "Client now has clear educational pathway and increased confidence",
      },
      {
        clientInitials: "M.R.",
        achievement: "Secured stable housing after 6 months of assistance",
        impact: "Housing stability has improved overall well-being and service engagement",
      },
    ],

    // Resource Utilization
    resourceUtilization: {
      budgetAllocated: 25000,
      budgetSpent: 22500,
      utilizationRate: 90,
      majorExpenditures: [
        { category: "Transportation", amount: 3500 },
        { category: "Emergency Housing", amount: 8000 },
        { category: "Educational Support", amount: 4500 },
        { category: "Mental Health Services", amount: 6500 },
      ],
    },

    // Goals for Next Month
    nextMonthGoals: [
      "Increase successful contact rate to 90%",
      "Secure housing for 2 remaining clients",
      "Launch new employment readiness workshop",
      "Complete quarterly assessments for all active cases",
    ],

    // Additional Notes
    additionalNotes:
      "Overall strong month with good progress across most service areas. Housing remains the primary challenge but new partnerships are being developed.",

    // Approval Workflow
    approvalStatus: "pending",
    submittedDate: null,
    approvedDate: null,
    approverComments: "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const addChallenge = () => {
    const newChallenge = {
      category: "",
      description: "",
      impact: "Medium",
      actionPlan: "",
    }
    setFormData((prev) => ({
      ...prev,
      challenges: [...prev.challenges, newChallenge],
    }))
  }

  const addSuccessStory = () => {
    const newStory = {
      clientInitials: "",
      achievement: "",
      impact: "",
    }
    setFormData((prev) => ({
      ...prev,
      successStories: [...prev.successStories, newStory],
    }))
  }

  const addGoal = () => {
    setFormData((prev) => ({
      ...prev,
      nextMonthGoals: [...prev.nextMonthGoals, ""],
    }))
  }

  const updateGoal = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      nextMonthGoals: prev.nextMonthGoals.map((goal, i) => (i === index ? value : goal)),
    }))
  }

  const removeGoal = (index) => {
    setFormData((prev) => ({
      ...prev,
      nextMonthGoals: prev.nextMonthGoals.filter((_, i) => i !== index),
    }))
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

  const submitForApproval = async () => {
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData((prev) => ({
        ...prev,
        approvalStatus: "submitted",
        submittedDate: new Date().toISOString().split("T")[0],
      }))
      alert("Report submitted for approval!")
    }, 1500)
  }

  const calculateContactSuccessRate = () => {
    const { successfulContacts, totalContacts } = formData.contactStats
    return totalContacts > 0 ? Math.round((successfulContacts / totalContacts) * 100) : 0
  }

  const calculateBudgetUtilization = () => {
    const { budgetSpent, budgetAllocated } = formData.resourceUtilization
    return budgetAllocated > 0 ? Math.round((budgetSpent / budgetAllocated) * 100) : 0
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Form Directory
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-purple-500 text-white p-6">
            <h1 className="text-2xl font-bold flex items-center">
              <BarChart3 className="mr-3 h-6 w-6" />
              Monthly Aftercare Report Generator
            </h1>
            <p className="mt-2 opacity-90">
              Comprehensive monthly reporting with data visualization and approval workflow
            </p>
          </div>

          {showSuccess && (
            <div className="bg-green-500 text-white p-4 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Monthly report saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Report Information */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Report Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Month *</label>
                  <input
                    type="month"
                    value={formData.reportMonth}
                    onChange={(e) => handleInputChange("reportMonth", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Report Date *</label>
                  <input
                    type="date"
                    value={formData.reportDate}
                    onChange={(e) => handleInputChange("reportDate", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Approval Status</label>
                  <div
                    className={`p-3 rounded-md text-center font-medium ${
                      formData.approvalStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : formData.approvalStatus === "submitted"
                          ? "bg-blue-100 text-blue-800"
                          : formData.approvalStatus === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {formData.approvalStatus.charAt(0).toUpperCase() + formData.approvalStatus.slice(1)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Worker Name *</label>
                  <input
                    type="text"
                    value={formData.workerName}
                    onChange={(e) => handleInputChange("workerName", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Worker Title *</label>
                  <input
                    type="text"
                    value={formData.workerTitle}
                    onChange={(e) => handleInputChange("workerTitle", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor Name *</label>
                  <input
                    type="text"
                    value={formData.supervisorName}
                    onChange={(e) => handleInputChange("supervisorName", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Caseload Summary */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Caseload Summary
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{formData.caseloadData.totalCases}</div>
                  <div className="text-sm text-gray-600">Total Cases</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{formData.caseloadData.activeCases}</div>
                  <div className="text-sm text-gray-600">Active Cases</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-gray-600">{formData.caseloadData.closedCases}</div>
                  <div className="text-sm text-gray-600">Closed Cases</div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{formData.caseloadData.newCases}</div>
                  <div className="text-sm text-gray-600">New Cases</div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">{formData.caseloadData.transferredCases}</div>
                  <div className="text-sm text-gray-600">Transferred</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Cases</label>
                  <input
                    type="number"
                    value={formData.caseloadData.totalCases}
                    onChange={(e) => handleNestedChange("caseloadData", "totalCases", Number.parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Active Cases</label>
                  <input
                    type="number"
                    value={formData.caseloadData.activeCases}
                    onChange={(e) => handleNestedChange("caseloadData", "activeCases", Number.parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Closed Cases</label>
                  <input
                    type="number"
                    value={formData.caseloadData.closedCases}
                    onChange={(e) => handleNestedChange("caseloadData", "closedCases", Number.parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Cases</label>
                  <input
                    type="number"
                    value={formData.caseloadData.newCases}
                    onChange={(e) => handleNestedChange("caseloadData", "newCases", Number.parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transferred Cases</label>
                  <input
                    type="number"
                    value={formData.caseloadData.transferredCases}
                    onChange={(e) =>
                      handleNestedChange("caseloadData", "transferredCases", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Contact Statistics */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Contact Statistics
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{formData.contactStats.totalContacts}</div>
                  <div className="text-sm text-gray-600">Total Contacts</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{calculateContactSuccessRate()}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{formData.contactStats.averageDuration}m</div>
                  <div className="text-sm text-gray-600">Avg Duration</div>
                </div>

                <div
                  className={`p-4 rounded-lg text-center ${
                    formData.contactStats.contactGoalMet ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <div
                    className={`text-2xl font-bold ${
                      formData.contactStats.contactGoalMet ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {formData.contactStats.contactGoalMet ? "✓" : "✗"}
                  </div>
                  <div className="text-sm text-gray-600">Goal Met</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Contacts</label>
                  <input
                    type="number"
                    value={formData.contactStats.totalContacts}
                    onChange={(e) =>
                      handleNestedChange("contactStats", "totalContacts", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Successful Contacts</label>
                  <input
                    type="number"
                    value={formData.contactStats.successfulContacts}
                    onChange={(e) =>
                      handleNestedChange("contactStats", "successfulContacts", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Contacts</label>
                  <input
                    type="number"
                    value={formData.contactStats.phoneContacts}
                    onChange={(e) =>
                      handleNestedChange("contactStats", "phoneContacts", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">In-Person Contacts</label>
                  <input
                    type="number"
                    value={formData.contactStats.inPersonContacts}
                    onChange={(e) =>
                      handleNestedChange("contactStats", "inPersonContacts", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={formData.contactStats.contactGoalMet}
                    onChange={(e) => handleNestedChange("contactStats", "contactGoalMet", e.target.checked)}
                    className="mr-3 h-5 w-5 text-purple-500"
                  />
                  <span className="font-medium">Monthly contact goal met</span>
                </label>
              </div>
            </section>

            {/* Service Delivery */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Delivery</h2>

              <div className="space-y-4">
                {formData.serviceDelivery.map((service, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                        <input
                          type="text"
                          value={service.service}
                          onChange={(e) => handleArrayUpdate("serviceDelivery", index, "service", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Clients Served</label>
                        <input
                          type="number"
                          value={service.clientsServed}
                          onChange={(e) =>
                            handleArrayUpdate(
                              "serviceDelivery",
                              index,
                              "clientsServed",
                              Number.parseInt(e.target.value),
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sessions Provided</label>
                        <input
                          type="number"
                          value={service.sessionsProvided}
                          onChange={(e) =>
                            handleArrayUpdate(
                              "serviceDelivery",
                              index,
                              "sessionsProvided",
                              Number.parseInt(e.target.value),
                            )
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Goal Met</label>
                        <select
                          value={service.goalMet}
                          onChange={(e) =>
                            handleArrayUpdate("serviceDelivery", index, "goalMet", e.target.value === "true")
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <textarea
                        value={service.notes}
                        onChange={(e) => handleArrayUpdate("serviceDelivery", index, "notes", e.target.value)}
                        rows="2"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Outcomes and Progress */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Outcomes and Progress</h2>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education Goals Met</label>
                  <input
                    type="number"
                    value={formData.outcomes.educationGoalsMet}
                    onChange={(e) =>
                      handleNestedChange("outcomes", "educationGoalsMet", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Housing Stabilized</label>
                  <input
                    type="number"
                    value={formData.outcomes.housingStabilized}
                    onChange={(e) =>
                      handleNestedChange("outcomes", "housingStabilized", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Achieved</label>
                  <input
                    type="number"
                    value={formData.outcomes.employmentAchieved}
                    onChange={(e) =>
                      handleNestedChange("outcomes", "employmentAchieved", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Health Services Accessed</label>
                  <input
                    type="number"
                    value={formData.outcomes.healthServicesAccessed}
                    onChange={(e) =>
                      handleNestedChange("outcomes", "healthServicesAccessed", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Legal Issues Resolved</label>
                  <input
                    type="number"
                    value={formData.outcomes.legalIssuesResolved}
                    onChange={(e) =>
                      handleNestedChange("outcomes", "legalIssuesResolved", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>

            {/* Challenges and Concerns */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5" />
                  Challenges and Concerns
                </h2>
                <button
                  type="button"
                  onClick={addChallenge}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md font-medium transition-all"
                >
                  Add Challenge
                </button>
              </div>

              <div className="space-y-4">
                {formData.challenges.map((challenge, index) => (
                  <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input
                          type="text"
                          value={challenge.category}
                          onChange={(e) => handleArrayUpdate("challenges", index, "category", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Impact Level</label>
                        <select
                          value={challenge.impact}
                          onChange={(e) => handleArrayUpdate("challenges", index, "impact", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>

                      <div className="flex items-end">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              challenges: prev.challenges.filter((_, i) => i !== index),
                            }))
                          }}
                          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={challenge.description}
                          onChange={(e) => handleArrayUpdate("challenges", index, "description", e.target.value)}
                          rows="3"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Action Plan</label>
                        <textarea
                          value={challenge.actionPlan}
                          onChange={(e) => handleArrayUpdate("challenges", index, "actionPlan", e.target.value)}
                          rows="3"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Success Stories */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Success Stories</h2>
                <button
                  type="button"
                  onClick={addSuccessStory}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-medium transition-all"
                >
                  Add Success Story
                </button>
              </div>

              <div className="space-y-4">
                {formData.successStories.map((story, index) => (
                  <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client Initials</label>
                        <input
                          type="text"
                          value={story.clientInitials}
                          onChange={(e) => handleArrayUpdate("successStories", index, "clientInitials", e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="e.g., J.D."
                        />
                      </div>

                      <div className="md:col-span-2 flex items-end">
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              successStories: prev.successStories.filter((_, i) => i !== index),
                            }))
                          }}
                          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Achievement</label>
                        <textarea
                          value={story.achievement}
                          onChange={(e) => handleArrayUpdate("successStories", index, "achievement", e.target.value)}
                          rows="3"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Impact</label>
                        <textarea
                          value={story.impact}
                          onChange={(e) => handleArrayUpdate("successStories", index, "impact", e.target.value)}
                          rows="3"
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Resource Utilization */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Resource Utilization</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${formData.resourceUtilization.budgetAllocated.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Budget Allocated</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${formData.resourceUtilization.budgetSpent.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Budget Spent</div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{calculateBudgetUtilization()}%</div>
                  <div className="text-sm text-gray-600">Utilization Rate</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Allocated</label>
                  <input
                    type="number"
                    value={formData.resourceUtilization.budgetAllocated}
                    onChange={(e) =>
                      handleNestedChange("resourceUtilization", "budgetAllocated", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Spent</label>
                  <input
                    type="number"
                    value={formData.resourceUtilization.budgetSpent}
                    onChange={(e) =>
                      handleNestedChange("resourceUtilization", "budgetSpent", Number.parseInt(e.target.value))
                    }
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Major Expenditures</h3>
                <div className="space-y-2">
                  {formData.resourceUtilization.majorExpenditures.map((expenditure, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{expenditure.category}</span>
                      <span className="text-lg font-bold text-purple-600">${expenditure.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Goals for Next Month */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Goals for Next Month</h2>
                <button
                  type="button"
                  onClick={addGoal}
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md font-medium transition-all"
                >
                  Add Goal
                </button>
              </div>

              <div className="space-y-3">
                {formData.nextMonthGoals.map((goal, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => updateGoal(index, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={`Goal ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeGoal(index)}
                      className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Notes */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Notes</h2>

              <textarea
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                rows="6"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Any additional observations, notes, or important information for this reporting period..."
              />
            </section>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <button
                type="button"
                onClick={submitForApproval}
                disabled={isSubmitting || formData.approvalStatus !== "pending"}
                className={`px-6 py-3 rounded-md font-medium transition-all flex items-center ${
                  isSubmitting || formData.approvalStatus !== "pending"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                {isSubmitting ? "Submitting..." : "Submit for Approval"}
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className={`px-8 py-3 rounded-md font-medium transition-all flex items-center ${
                  isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
              >
                <Save className="h-5 w-5 mr-2" />
                {isSaving ? "Saving..." : "Save Report"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
