"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Save, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ContactLogForm() {
  const [formData, setFormData] = useState({
    clientName: "",
    contactDate: "",
    contactTime: "",
    contactMethod: "",
    staffMember: "",
    purpose: "",
    summary: "",
    outcome: "",
    nextSteps: "",
    followUpDate: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
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
        contactDate: "",
        contactTime: "",
        contactMethod: "",
        staffMember: "",
        purpose: "",
        summary: "",
        outcome: "",
        nextSteps: "",
        followUpDate: "",
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
            <FileText className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Log Entry Form (Draft)</h1>
              <p className="text-gray-600">
                Comprehensive logging system for tracking all client interactions and communications
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
                    <FileText className="h-5 w-5" />
                    Client Contact Log Entry
                  </CardTitle>
                  <CardDescription>Document all client interactions for comprehensive case management</CardDescription>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Log Entry Saved</h3>
                  <p className="text-gray-600">The client interaction has been successfully documented.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name *</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => handleInputChange("clientName", e.target.value)}
                        placeholder="Enter client's name"
                        required
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

                  {/* Contact Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactDate">Contact Date *</Label>
                      <Input
                        id="contactDate"
                        type="date"
                        value={formData.contactDate}
                        onChange={(e) => handleInputChange("contactDate", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactTime">Contact Time *</Label>
                      <Input
                        id="contactTime"
                        type="time"
                        value={formData.contactTime}
                        onChange={(e) => handleInputChange("contactTime", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactMethod">Contact Method *</Label>
                      <select
                        id="contactMethod"
                        value={formData.contactMethod}
                        onChange={(e) => handleInputChange("contactMethod", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select method</option>
                        <option value="phone">Phone Call</option>
                        <option value="in-person">In-Person</option>
                        <option value="email">Email</option>
                        <option value="text">Text Message</option>
                        <option value="video">Video Call</option>
                      </select>
                    </div>
                  </div>

                  {/* Purpose */}
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose of Contact *</Label>
                    <select
                      id="purpose"
                      value={formData.purpose}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select purpose</option>
                      <option value="intake">Initial Intake</option>
                      <option value="assessment">Assessment</option>
                      <option value="service-planning">Service Planning</option>
                      <option value="check-in">Check-in</option>
                      <option value="crisis-intervention">Crisis Intervention</option>
                      <option value="referral">Referral</option>
                      <option value="follow-up">Follow-up</option>
                      <option value="case-closure">Case Closure</option>
                    </select>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2">
                    <Label htmlFor="summary">Contact Summary *</Label>
                    <Textarea
                      id="summary"
                      value={formData.summary}
                      onChange={(e) => handleInputChange("summary", e.target.value)}
                      placeholder="Provide a detailed summary of the interaction..."
                      rows={4}
                      required
                    />
                  </div>

                  {/* Outcome */}
                  <div className="space-y-2">
                    <Label htmlFor="outcome">Outcome/Resolution</Label>
                    <Textarea
                      id="outcome"
                      value={formData.outcome}
                      onChange={(e) => handleInputChange("outcome", e.target.value)}
                      placeholder="Describe the outcome or resolution achieved..."
                      rows={3}
                    />
                  </div>

                  {/* Next Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nextSteps">Next Steps/Action Items</Label>
                      <Textarea
                        id="nextSteps"
                        value={formData.nextSteps}
                        onChange={(e) => handleInputChange("nextSteps", e.target.value)}
                        placeholder="List any follow-up actions required..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="followUpDate">Follow-up Date</Label>
                      <Input
                        id="followUpDate"
                        type="date"
                        value={formData.followUpDate}
                        onChange={(e) => handleInputChange("followUpDate", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1 gap-2">
                      <Save className="h-4 w-4" />
                      Save Contact Log Entry
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormData({
                          clientName: "",
                          contactDate: "",
                          contactTime: "",
                          contactMethod: "",
                          staffMember: "",
                          purpose: "",
                          summary: "",
                          outcome: "",
                          nextSteps: "",
                          followUpDate: "",
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
