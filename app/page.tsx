"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Phone, Users, ClipboardList, Download, AlertCircle } from "lucide-react"
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
                    <Link href={`/forms/${form.id}`}>
                      <Button variant="outline" size="sm">
                        View Form
                      </Button>
                    </Link>
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
                    <Link href={`/forms/${form.id}`}>
                      <Button variant="outline" size="sm">
                        View Form
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2024 Refuge House Form Directory. All forms are draft versions for evaluation purposes.</p>
        </div>
      </div>
    </div>
  )
}
