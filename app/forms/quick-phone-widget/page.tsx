"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Phone, Save, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function QuickPhoneWidget() {
  const [formData, setFormData] = useState({
    callerName: "",
    phoneNumber: "",
    callType: "",
    urgencyLevel: "",
    notes: "",
    followUpRequired: false,
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
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        callerName: "",
        phoneNumber: "",
        callType: "",
        urgencyLevel: "",
        notes: "",
        followUpRequired: false,
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
            <Phone className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quick Phone Contact Widget (Draft)</h1>
              <p className="text-gray-600">
                Streamlined interface for capturing essential contact information during phone interactions
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
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Phone Contact Information
                  </CardTitle>
                  <CardDescription>Capture essential details during phone interactions</CardDescription>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Information Recorded</h3>
                  <p className="text-gray-600">The phone contact details have been successfully logged.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Caller Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="callerName">Caller Name *</Label>
                      <Input
                        id="callerName"
                        value={formData.callerName}
                        onChange={(e) => handleInputChange("callerName", e.target.value)}
                        placeholder="Enter caller's name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  {/* Call Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="callType">Call Type *</Label>
                      <select
                        id="callType"
                        value={formData.callType}
                        onChange={(e) => handleInputChange("callType", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select call type</option>
                        <option value="intake">Initial Intake</option>
                        <option value="followup">Follow-up</option>
                        <option value="crisis">Crisis Call</option>
                        <option value="information">Information Request</option>
                        <option value="referral">Referral</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgencyLevel">Urgency Level *</Label>
                      <select
                        id="urgencyLevel"
                        value={formData.urgencyLevel}
                        onChange={(e) => handleInputChange("urgencyLevel", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select urgency</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Call Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder="Enter any relevant notes about the call..."
                      rows={4}
                    />
                  </div>

                  {/* Follow-up */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="followUpRequired"
                      checked={formData.followUpRequired}
                      onChange={(e) => handleInputChange("followUpRequired", e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="followUpRequired">Follow-up required</Label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button type="submit" className="flex-1 gap-2">
                      <Save className="h-4 w-4" />
                      Save Contact Information
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setFormData({
                          callerName: "",
                          phoneNumber: "",
                          callType: "",
                          urgencyLevel: "",
                          notes: "",
                          followUpRequired: false,
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
