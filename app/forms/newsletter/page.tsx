"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

export default function NewsletterForm() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    interests: {
      tech: false,
      business: false,
      design: false,
      marketing: false,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", formData)
    alert("Successfully subscribed to newsletter!")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: checked,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Showcase
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <CardTitle>Subscribe to Our Newsletter</CardTitle>
            <CardDescription>Stay updated with our latest news, tips, and exclusive content</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">What interests you? (Optional)</Label>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="tech"
                      checked={formData.interests.tech}
                      onCheckedChange={(checked) => handleInterestChange("tech", checked as boolean)}
                    />
                    <Label htmlFor="tech">Technology</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="business"
                      checked={formData.interests.business}
                      onCheckedChange={(checked) => handleInterestChange("business", checked as boolean)}
                    />
                    <Label htmlFor="business">Business</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="design"
                      checked={formData.interests.design}
                      onCheckedChange={(checked) => handleInterestChange("design", checked as boolean)}
                    />
                    <Label htmlFor="design">Design</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.interests.marketing}
                      onCheckedChange={(checked) => handleInterestChange("marketing", checked as boolean)}
                    />
                    <Label htmlFor="marketing">Marketing</Label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full">
                Subscribe Now
              </Button>

              <p className="text-xs text-gray-500 text-center">We respect your privacy. Unsubscribe at any time.</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
