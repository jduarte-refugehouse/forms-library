"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ClipboardList, Save, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ServiceRefusalForm() {
  const [formData, setFormData] = useState({
    clientName: "",
    clientId: "",
    staffMember: "",
    refusalDate: "",
    refusalTime: "",
    servicesOffered: "",
    reasonForRefusal: "",
    clientExplanation: "",
    riskAssessment: "",
    alternativesOffered: "",
    clientResponse: "",
    witnessPresent: false,
    witnessName: "",
    followUpPlanned: false,
    followUpDate: "",
    additionalNotes: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        clientName: "",
        clientId: "",
        staffMember: "",
        refusalDate: "",
        refusalTime: "",
        servicesOffered: "",
        reasonForRefusal: "",
        clientExplanation: "",
        riskAssessment: "",
        alternativesOffered: "",
        clientResponse: "",
        witnessPresent: false,
        witnessName: "",
        followUpPlanned: false,
        followUpDate: "",
        additionalNotes: "",
      })
    }, 2000)
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
            <ClipboardList className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Service Refusal Documentation (Draft)</h1>
              <p className="text-gray-600">
                Formal documentation process for recording when clients decline offered services
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
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Service Refusal Documentation
                  </CardTitle>
                  <CardDescription>Complete documentation when a client declines offered services</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  Draft
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Refusal Documented</h3>
                  <p className="text-gray-600">The service refusal has been properly documented and saved.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Client Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name *</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => handleInputChange("clientName", e.target.value)}
                        placeholder="Enter client's full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientId">Client ID</Label>
                      <Input
                        id="clientId"
                        value={formData.clientId}
                        onChange={(e) => handleInputChange("clientId", e.target.value)}
                        placeholder="Enter client ID number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staffMember">Staff Member *</Label>
                      <Input
                        id="staffMember"
                        value={formData.staffMember}
                        onChange={(e) => handleInputChange("staffMember", e.target.value)}
                        placeholder="Enter staff member name"
                        required
                      />
                    </div>
                  </div>

                  {/* Refusal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="refusalDate">Date of Refusal *</Label>
                      <Input
                        id="refusalDate"
                        type="date"
                        value={formData.refusalDate}
                        onChange={(e) => handleInputChange("refusalDate", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="refusalTime">Time of Refusal *</Label>
                      <Input
                        id="refusalTime"
                        type="time"
                        value={formData.refusalTime}
                        onChange={(e) => handleInputChange("refusalTime", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Services Information */}
                  <div className="space-y-2">
                    <Label htmlFor="servicesOffered">Services Offered *</Label>
                    <Textarea
                      id="servicesOffered"
                      value={formData.servicesOffered}
                      onChange={(e) => handleInputChange("servicesOffered", e.target.value)}
                      placeholder="Detail the specific services that were offered to the client..."
                      rows={3}
                      required
                    />
                  </div>

                  {/* Refusal Information */}
                  <div className="space-y-2">
                    <Label htmlFor="reasonForRefusal">Reason for Refusal *</Label>
                    <select
                      id="reasonForRefusal"
                      value={formData.reasonForRefusal}
                      onChange={(e) => handleInputChange("reasonForRefusal", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select primary reason</option>
                      <option value="not-ready">Not ready for services</option>
                      <option value="prefer-other">Prefers other provider</option>
                      <option value="location-issues">Location/transportation issues</option>
                      <option value="scheduling">Scheduling conflicts</option>
                      <option value="financial">Financial concerns</option>
                      <option value="family-opposition">Family opposition</option>
                      <option value="fear-stigma">Fear of stigma</option>
                      <option value="previous-experience">Previous negative experience</option>
                      <option value="other">Other (specify in explanation)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientExplanation">Client's Explanation</Label>
                    <Textarea
                      id="clientExplanation"
                      value={formData.clientExplanation}
                      onChange={(e) => handleInputChange("clientExplanation", e.target.value)}
                      placeholder="Record the client's own words explaining their refusal..."
                      rows={3}
                    />
                  </div>

                  {/* Risk Assessment */}
                  <div className="space-y-2">
                    <Label htmlFor="riskAssessment">Risk Assessment *</Label>
                    <Textarea
                      id="riskAssessment"
                      value={formData.riskAssessment}
                      onChange={(e) => handleInputChange("riskAssessment", e.target.value)}
                      placeholder="Assess any potential risks associated with the service refusal..."
                      rows={3}
                      required
                    />
                  </div>

                  {/* Alternatives */}
                  <div className="space-y-2">
                    <Label htmlFor="alternativesOffered">Alternatives Offered</Label>
                    <Textarea
                      id="alternativesOffered"
                      value={formData.alternativesOffered}
                      onChange={(e) => handleInputChange("alternativesOffered", e.target.value)}
                      placeholder="List any alternative services or resources offered..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clientResponse">Client Response to Alternatives</Label>
                    <Textarea
                      id="clientResponse"
                      value={formData.clientResponse}
                      onChange={(e) => handleInputChange("clientResponse", e.target.value)}
                      placeholder="Document the client's response to alternative options..."
                      rows={2}
                    />
                  </div>

                  {/* Witness Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="witnessPresent"
                        checked={formData.witnessPresent}
                        onChange={(e) => handleInputChange("witnessPresent", e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="witnessPresent">Witness present during refusal</Label>
                    </div>

                    {formData.witnessPresent && (
                      <div className="space-y-2">
                        <Label htmlFor="witnessName">Witness Name</Label>
                        <Input
                          id="witnessName"
                          value={formData.witnessName}
                          onChange={(e) => handleInputChange("witnessName", e.target.value)}
                          placeholder="Enter witness name and title"
                        />
                      </div>
                    )}
                  </div>

                  {/* Follow-up */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="followUpPlanned"
                        checked={formData.followUpPlanned}
                        onChange={(e) => handleInputChange("followUpPlanned", e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="followUpPlanned">Follow-up contact planned</Label>
                    </div>

                    {formData.followUpPlanned && (
                      <div className="space-y-2">
                        <Label htmlFor="followUpDate">Follow-up Date</Label>
                        <Input
                          id="followUpDate"
                          type="date"
                          value={formData.followUpDate}
                          onChange={(e) => handleInputChange("followUpDate", e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                      placeholder="Any additional relevant information..."
                      rows={3}
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1 gap-2">
                      <Save className="h-4 w-4" />
                      Save Service Refusal Documentation
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormData({
                          clientName: "",
                          clientId: "",
                          staffMember: "",
                          refusalDate: "",
                          refusalTime: "",
                          servicesOffered: "",
                          reasonForRefusal: "",
                          clientExplanation: "",
                          riskAssessment: "",
                          alternativesOffered: "",
                          clientResponse: "",
                          witnessPresent: false,
                          witnessName: "",
                          followUpPlanned: false,
                          followUpDate: "",
                          additionalNotes: "",
                        })
                      }
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
