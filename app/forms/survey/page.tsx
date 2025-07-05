"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function SurveyForm() {
  const [formData, setFormData] = useState({
    age: "",
    experience: "",
    satisfaction: [7],
    recommendation: "",
    improvements: "",
    contact: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Survey submitted:", formData)
    alert("Thank you for completing the survey!")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Showcase
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Customer Experience Survey</CardTitle>
            <CardDescription>Help us understand your experience and improve our services</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="age">Age Group</Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, age: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your age group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-25">18-25</SelectItem>
                    <SelectItem value="26-35">26-35</SelectItem>
                    <SelectItem value="36-45">36-45</SelectItem>
                    <SelectItem value="46-55">46-55</SelectItem>
                    <SelectItem value="56+">56+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium">How long have you been using our service?</Label>
                <RadioGroup
                  value={formData.experience}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="less-than-month" id="less-than-month" />
                    <Label htmlFor="less-than-month">Less than a month</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-6-months" id="1-6-months" />
                    <Label htmlFor="1-6-months">1-6 months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="6-12-months" id="6-12-months" />
                    <Label htmlFor="6-12-months">6-12 months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="over-year" id="over-year" />
                    <Label htmlFor="over-year">Over a year</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-base font-medium">Overall Satisfaction: {formData.satisfaction[0]}/10</Label>
                <div className="mt-3">
                  <Slider
                    value={formData.satisfaction}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, satisfaction: value }))}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Very Dissatisfied</span>
                    <span>Very Satisfied</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Would you recommend us to others?</Label>
                <RadioGroup
                  value={formData.recommendation}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, recommendation: value }))}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="definitely" id="definitely" />
                    <Label htmlFor="definitely">Definitely</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="probably" id="probably" />
                    <Label htmlFor="probably">Probably</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-sure" id="not-sure" />
                    <Label htmlFor="not-sure">Not sure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="probably-not" id="probably-not" />
                    <Label htmlFor="probably-not">Probably not</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="definitely-not" id="definitely-not" />
                    <Label htmlFor="definitely-not">Definitely not</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="improvements">What could we improve?</Label>
                <Textarea
                  id="improvements"
                  name="improvements"
                  value={formData.improvements}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Please share your suggestions..."
                />
              </div>

              <div>
                <Label htmlFor="contact">Email (optional - for follow-up)</Label>
                <Input
                  id="contact"
                  name="contact"
                  type="email"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Survey
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
