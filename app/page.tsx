"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Phone,
  Users,
  ClipboardList,
  Download,
  AlertCircle,
  UserPlus,
  Home,
  ListChecks,
  FileCheck,
} from "lucide-react"
import Link from "next/link"

export default function FormDirectory() {
  const generalForms = [
    {
      id: "quick-phone-widget",
      title: "Quick Phone Contact Widget (Draft)",
      description: "Streamlined interface for capturing essential contact information during phone interactions",
      icon: Phone,
      category: "Communication",
      status: "draft",
    },
  ]

  const intakePlacementForms = [
    {
      id: "placement-inquiry",
      title: "Placement Inquiry Workflow (Draft)",
      description:
        "Comprehensive multi-step workflow for managing foster care placement inquiries from initial contact through final placement",
      icon: UserPlus,
      category: "Intake",
      status: "draft",
    },
    {
      id: "placement-workflow?childId=sample-child-123",
      title: "Placement Workflow (New)",
      description:
        "Handles immediate placement tasks within the first 24-72 hours, including safety, health, and documentation.",
      icon: ListChecks,
      category: "Placement",
      status: "draft",
    },
    {
      id: "admission-assessment?childId=sample-child-123&placementId=sample-placement-456",
      title: "Admission Assessment (New)",
      description:
        "Comprehensive 30-day assessment with TBRI® components, package-specific evaluations, and regulatory compliance tracking.",
      icon: FileCheck,
      category: "Assessment",
      status: "draft",
    },
  ]

  const aftercareForms = [
    {
      id: "contact-log",
      title: "Contact Log Entry Form (Draft)",
      description: "Comprehensive logging system for tracking all client interactions and communications",
      icon: FileText,
      category: "Documentation",
      status: "draft",
    },
    {
      id: "service-refusal",
      title: "Service Refusal Documentation (Draft)",
      description: "Formal documentation process for recording when clients decline offered services",
      icon: ClipboardList,
      category: "Legal",
      status: "draft",
    },
    {
      id: "aftercare-plan",
      title: "Aftercare Services Plan (Draft)",
      description: "Comprehensive planning tool for developing individualized aftercare service strategies",
      icon: Users,
      category: "Planning",
      status: "draft",
    },
  ]

  const servicePlanningForms = [
    {
      id: "enhanced-continued-stay",
      title: "Enhanced Continued Stay Confirmation (Draft)",
      description:
        "90-day confirmation form for Mental & Behavioral Health and IDD/Autism service packages per T3C Blueprint requirements",
      icon: FileCheck,
      category: "Service Planning",
      status: "draft",
    },
    {
      id: "service-authorization",
      title: "Service Authorization Tracking (Draft)",
      description:
        "Comprehensive tracking system for service authorization requests, approvals, denials, and alternative arrangements with financial oversight",
      icon: ClipboardList,
      category: "Authorization",
      status: "draft",
    },
    {
      id: "cans-integration",
      title: "CANS 3.0 Integration Section (Draft)",
      description:
        "Child welfare service plan component for CANS assessment integration, domain scoring, and service modifications based on assessment results",
      icon: ClipboardList,
      category: "Assessment Integration",
      status: "draft",
    },
  ]

  const downloadForm = (formId: string) => {
    // Implement your download logic here
    alert(`Downloading form: ${formId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refuge House Form Directory</h1>
          <p className="text-xl text-gray-600 mb-6">
            Professional form components for services management - Draft versions for review and evaluation
          </p>
          {/* Draft Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-amber-800">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">
                These forms are draft versions intended for review and evaluation purposes only.
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/download">
              <Button size="lg" className="gap-2">
                <Download className="h-5 w-5" />
                Download All Forms
              </Button>
            </Link>
          </div>
        </div>

        {/* Intake and Placement Forms Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Home className="h-6 w-6" />
            Intake and Placement
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intakePlacementForms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <form.icon className="h-8 w-8 text-blue-600 mb-2" />
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {form.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{form.title}</CardTitle>
                  <CardDescription className="text-sm">{form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{form.category}</Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => downloadForm(form.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Link href={`/forms/${form.id}`}>
                        <Button variant="outline" size="sm">
                          View Form
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Planning Forms Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileCheck className="h-6 w-6" />
            Service Planning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicePlanningForms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <form.icon className="h-8 w-8 text-blue-600 mb-2" />
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {form.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{form.title}</CardTitle>
                  <CardDescription className="text-sm">{form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{form.category}</Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => downloadForm(form.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Link href={`/forms/${form.id}`}>
                        <Button variant="outline" size="sm">
                          View Form
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Aftercare Forms Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Users className="h-6 w-6" />
            Aftercare Forms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aftercareForms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <form.icon className="h-8 w-8 text-blue-600 mb-2" />
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {form.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{form.title}</CardTitle>
                  <CardDescription className="text-sm">{form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{form.category}</Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => downloadForm(form.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Link href={`/forms/${form.id}`}>
                        <Button variant="outline" size="sm">
                          View Form
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* General Forms Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Phone className="h-6 w-6" />
            General Forms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalForms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <form.icon className="h-8 w-8 text-blue-600 mb-2" />
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {form.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{form.title}</CardTitle>
                  <CardDescription className="text-sm">{form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{form.category}</Badge>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => downloadForm(form.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Link href={`/forms/${form.id}`}>
                        <Button variant="outline" size="sm">
                          View Form
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 Refuge House Form Directory. All forms are draft versions for evaluation purposes.</p>
        </div>
      </div>
    </div>
  )
}
