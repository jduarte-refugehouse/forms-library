"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Code, Palette, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DownloadPage() {
  const downloadOptions = [
    {
      title: "Complete Form Package (Draft)",
      description: "All form components with full functionality, styling, and documentation",
      format: "ZIP Archive",
      size: "~2.5 MB",
      icon: FileText,
      items: [
        "4 Draft form components",
        "TypeScript definitions",
        "Tailwind CSS styling",
        "Component documentation",
        "Usage examples",
      ],
    },
    {
      title: "Source Code (Draft)",
      description: "Raw React/TypeScript source files for developers",
      format: "ZIP Archive",
      size: "~1.8 MB",
      icon: Code,
      items: [
        "React components (.tsx)",
        "TypeScript interfaces",
        "Utility functions",
        "Configuration files",
        "Build scripts",
      ],
    },
    {
      title: "Design System (Draft)",
      description: "UI components and styling guidelines",
      format: "ZIP Archive",
      size: "~800 KB",
      icon: Palette,
      items: [
        "Tailwind configuration",
        "Custom CSS components",
        "Color palette definitions",
        "Typography scales",
        "Spacing guidelines",
      ],
    },
  ]

  const handleDownload = (type: string) => {
    // Simulate download functionality
    console.log(`Downloading ${type}...`)
    alert(`${type} download would start here. This is a demo version.`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Form Directory
          </Link>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Download Refuge House Form Directory</h1>
          <p className="text-xl text-gray-600 mb-6">Access draft form components for review and evaluation</p>

          {/* Draft Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-amber-800">
              <AlertCircle className="h-5 w-5" />
              <p className="font-medium">
                All downloads contain draft versions for review and evaluation purposes only.
              </p>
            </div>
          </div>
        </div>

        {/* Download Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {downloadOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <option.icon className="h-8 w-8 text-blue-600" />
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    Draft
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{option.title}</CardTitle>
                <CardDescription className="text-sm mb-4">{option.description}</CardDescription>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span>{option.format}</span>
                  <span>{option.size}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {option.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full gap-2" onClick={() => handleDownload(option.title)}>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Form Components (Draft)</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Quick Phone Contact Widget</li>
                <li>• Contact Log Entry Form</li>
                <li>• Service Refusal Documentation</li>
                <li>• Aftercare Services Plan</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Technical Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• React 18 with TypeScript</li>
                <li>• Tailwind CSS styling</li>
                <li>• Form validation</li>
                <li>• Responsive design</li>
                <li>• Accessibility compliance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* System Requirements */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">System Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong>Development:</strong>
              <br />
              Node.js 18+, npm/yarn
            </div>
            <div>
              <strong>Frameworks:</strong>
              <br />
              React 18+, Next.js 14+
            </div>
            <div>
              <strong>Styling:</strong>
              <br />
              Tailwind CSS 3+
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
