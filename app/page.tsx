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
  BarChart3,
  Shield,
  Building,
  Package,
  BookOpen,
  Calculator,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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

  const fosterHomeForms = [
    {
      id: "foster-home-quarterly-review?homeId=FH-2024-0156",
      title: "Foster Home Quarterly Review (Draft)",
      description:
        "Comprehensive quarterly review integrating T3C credentialing requirements, training compliance, placement summaries, and TBRI® implementation evaluation",
      icon: Building,
      category: "Foster Home Management",
      status: "draft",
    },
    {
      id: "foster-home-credentialing-assessment?homeId=FH-2024-0156",
      title: "Foster Home Credentialing Assessment (New)",
      description:
        "Comprehensive assessment for foster family home credentialing, including eligibility, training, TBRI®, and specialized modules.",
      icon: Shield,
      category: "Credentialing",
      status: "draft",
    },
  ]

  const basicFosterFamilyHomeForms = [
    {
      id: "basic-tbri-resource-guide",
      title: "TBRI® Complete Resource Guide",
      description:
        "Comprehensive interactive guide combining TBRI® Overview, Treatment Model, and Education Plan with brand styling and enhanced navigation",
      icon: BookOpen,
      category: "Complete Guide",
      status: "active",
    },
    {
      id: "basic-logic-model",
      title: "Logic Model (T3C Basic Foster Family Home)",
      description:
        "Visual logic model depicting inputs, activities, outputs, and outcomes for T3C Basic Foster Family Home Support Services with TBRI® framework and CQI process",
      icon: BarChart3,
      category: "Logic Model",
      status: "active",
    },
    {
      id: "basic-cqi-model",
      title: "CQI Model (T3C Basic Foster Family Home)",
      description:
        "Continuous Quality Improvement cycle (Plan-Do-Study-Act) for monitoring and improving TBRI®-based services with quarterly review process and outcome tracking",
      icon: ListChecks,
      category: "CQI Model",
      status: "active",
    },
  ]

  const mentalBehavioralHealthForms = [
    {
      id: "mental-behavioral-treatment-model",
      title: "Treatment Model (T3C Mental & Behavioral Health)",
      description:
        "Comprehensive treatment model framework integrating TBRI® with clinical interventions for children with DSM-5 diagnoses requiring intensive therapeutic support",
      icon: FileText,
      category: "Treatment Model",
      status: "active",
    },
    {
      id: "mental-behavioral-logic-model",
      title: "Logic Model (T3C Mental & Behavioral Health)",
      description:
        "Service package specific logic model per T3C Blueprint requirements, incorporating TBRI® principles with enhanced therapeutic components and 90-day review cycles",
      icon: BarChart3,
      category: "Logic Model",
      status: "active",
    },
    {
      id: "mental-behavioral-cqi-model",
      title: "CQI Model (T3C Mental & Behavioral Health)",
      description:
        "Continuous Quality Improvement model designed for monitoring and improving therapeutic services with enhanced quality metrics and PDSA cycle framework",
      icon: ListChecks,
      category: "CQI Model",
      status: "active",
    },
  ]

  const iddAsdSupportForms = [
    {
      id: "idd-autism-treatment-model",
      title: "Treatment Model (T3C IDD/Autism Support Services)",
      description:
        "Comprehensive treatment model framework integrating TBRI® with developmental interventions for children with IDD/ASD requiring specialized therapeutic support",
      icon: FileText,
      category: "Treatment Model",
      status: "active",
    },
    {
      id: "idd-autism-logic-model",
      title: "Logic Model (T3C IDD/Autism Support Services)",
      description:
        "Service package specific logic model per T3C Blueprint requirements, incorporating TBRI® principles with enhanced developmental and behavioral supports and 90-day review cycles",
      icon: BarChart3,
      category: "Logic Model",
      status: "active",
    },
    {
      id: "idd-autism-cqi-model",
      title: "CQI Model (T3C IDD/Autism Support Services)",
      description:
        "Continuous Quality Improvement model designed for monitoring and improving developmental services with enhanced quality metrics and PDSA cycle framework",
      icon: ListChecks,
      category: "CQI Model",
      status: "active",
    },
  ]

  const shortTermAssessmentForms = [
    {
      id: "short-term-assessment-treatment-model",
      title: "Treatment Model (T3C Short Term Assessment Services)",
      description:
        "Comprehensive treatment model framework integrating TBRI® with time-limited assessment protocols for children requiring intensive evaluation and placement planning",
      icon: FileText,
      category: "Treatment Model",
      status: "active",
    },
    {
      id: "short-term-assessment-logic-model",
      title: "Logic Model (T3C Short Term Assessment Services)",
      description:
        "Service package specific logic model per T3C Blueprint requirements, incorporating TBRI® principles with focused assessment activities and outcome tracking",
      icon: BarChart3,
      category: "Logic Model",
      status: "active",
    },
    {
      id: "short-term-assessment-cqi-model",
      title: "CQI Model (T3C Short Term Assessment Services)",
      description:
        "Continuous Quality Improvement model designed for monitoring and improving assessment services with quality metrics and PDSA cycle framework",
      icon: ListChecks,
      category: "CQI Model",
      status: "active",
    },
  ]

  const treatmentFosterFamilyCareForms = [
    {
      id: "treatment-foster-care-treatment-model",
      title: "Treatment Model (T3C Treatment Foster Family Care)",
      description:
        "Comprehensive treatment model framework integrating TBRI® with intensive therapeutic interventions for children requiring specialized treatment foster care services",
      icon: FileText,
      category: "Treatment Model",
      status: "active",
    },
    {
      id: "treatment-foster-care-logic-model",
      title: "Logic Model (T3C Treatment Foster Family Care)",
      description:
        "Service package specific logic model per T3C Blueprint requirements, incorporating TBRI® principles with enhanced therapeutic components and specialized foster care supports",
      icon: BarChart3,
      category: "Logic Model",
      status: "active",
    },
    {
      id: "treatment-foster-care-cqi-model",
      title: "CQI Model (T3C Treatment Foster Family Care)",
      description:
        "Continuous Quality Improvement model designed for monitoring and improving treatment foster care services with enhanced quality metrics and PDSA cycle framework",
      icon: ListChecks,
      category: "CQI Model",
      status: "active",
    },
  ]

  const substanceUseSupportForms = [
    {
      id: "substance-use-treatment-model",
      title: "Treatment Model (T3C Substance Use Support Services)",
      description:
        "Comprehensive treatment model framework integrating TBRI® with recovery-oriented interventions for children and youth with substance use disorders requiring specialized support and monitoring",
      icon: FileText,
      category: "Treatment Model",
      status: "active",
    },
    {
      id: "substance-use-logic-model",
      title: "Logic Model (T3C Substance Use Support Services)",
      description:
        "Service package specific logic model per T3C Blueprint requirements, incorporating TBRI® principles with recovery-enhanced therapeutic components and substance use treatment coordination",
      icon: BarChart3,
      category: "Logic Model",
      status: "active",
    },
    {
      id: "substance-use-cqi-model",
      title: "CQI Model (T3C Substance Use Support Services)",
      description:
        "Continuous Quality Improvement model designed for monitoring and improving substance use support services with recovery-specific quality metrics and PDSA cycle framework",
      icon: ListChecks,
      category: "CQI Model",
      status: "active",
    },
  ]

  const resourceGuideForms = [
    {
      id: "caseload-calculator",
      title: "Caseload Point System & Staffing Ratios",
      description:
        "Interactive caseload monitoring dashboard with point calculator, team overview, and comprehensive T3C staffing ratio reference for blended service packages",
      icon: Calculator,
      category: "Staff Tools",
      status: "active",
    },
    {
      id: "continued-stay-review-guide",
      title: "Continued Stay Review Quick Reference Guide (New)",
      description:
        "Comprehensive compliance guide for Mental Health & IDD/Autism packages with step-by-step procedures, clinical criteria, and emergency protocols",
      icon: FileCheck,
      category: "Compliance Guide",
      status: "draft",
    },
    {
      id: "crisis-decision-tool",
      title: "Crisis Decision Tool (help.refugehouse.org)",
      description:
        "Interactive 24/7 decision support tool for foster parents and treatment teams to navigate medical, behavioral, safety, and psychiatric emergencies with step-by-step guidance and emergency contacts",
      icon: Shield,
      category: "Crisis Support",
      status: "active",
    },
    {
      id: "kinship-caregiver-resource-dashboard",
      title: "Kinship Caregiver Resource Dashboard (Draft)",
      description:
        "User-friendly portal for kinship families providing access to essential resources, benefit information, and support tools with mobile-first design",
      icon: Users,
      category: "Resource Portal",
      status: "draft",
    },
    {
      id: "staff-kinship-support-dashboard",
      title: "Staff Support Dashboard for Kinship Placements (Draft)",
      description:
        "Comprehensive tool for staff supporting kinship placements with real-time information, benefit navigation, and case management resources",
      icon: BarChart3,
      category: "Staff Tools",
      status: "draft",
    },
    {
      id: "youth-transition-dashboard",
      title: "Youth Transition Support Dashboard (Draft)",
      description:
        "Engaging, mobile-first platform for youth ages 14-22 to track transition progress, access resources, and plan for independence",
      icon: Users,
      category: "Youth Portal",
      status: "draft",
    },
    {
      id: "staff-transition-dashboard",
      title: "Staff Transition Support Dashboard (Draft)",
      description:
        "Comprehensive case management tool for transition specialists supporting youth aging out of care with T3C compliance tracking",
      icon: BarChart3,
      category: "Staff Tools",
      status: "draft",
    },
    {
      id: "pregnant-parenting-youth-dashboard",
      title: "Pregnant & Parenting Youth Resource Dashboard (Draft)",
      description:
        "Interactive, youth-friendly support portal for pregnant and parenting youth in foster care with comprehensive resources, benefit enrollment, and crisis support",
      icon: Users,
      category: "Youth Support",
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
    {
      id: "aftercare-dashboard",
      title: "Aftercare Monitoring Dashboard (New)",
      description: "Dashboard for tracking children in aftercare status with summary statistics and data table.",
      icon: BarChart3,
      category: "Monitoring",
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
    {
      id: "package-specific-monitoring?packageType=mental-behavioral&childId=sample-child-123",
      title: "Package-Specific Monitoring Dashboard (Draft)",
      description:
        "Adaptive monitoring dashboard that provides specialized tracking for Mental & Behavioral Health or IDD/Autism service packages with data visualization and alerts",
      icon: BarChart3,
      category: "Monitoring",
      status: "draft",
    },
    {
      id: "foster-home-credential?childId=sample-child-123&homeId=FH-2024-0156",
      title: "Foster Home Credential Verification (Draft)",
      description:
        "Comprehensive verification system for foster home credentials, compliance tracking, training requirements, and quarterly review management",
      icon: Shield,
      category: "Credential Verification",
      status: "draft",
    },
    {
      id: "service-plan-review-approval",
      title: "Service Plan Review and Approval (New)",
      description: "Comprehensive multi-tab form for managing service plan reviews, approvals, and participant input.",
      icon: ClipboardList,
      category: "Service Planning",
      status: "draft",
    },
  ]

  const downloadForm = (formId: string) => {
    // Implement your download logic here
    alert(`Downloading form: ${formId}`)
  }

  const renderFormCards = (forms: typeof generalForms, buttonText = "View Form") => {
    if (forms.length === 0) {
      return (
        <div className="col-span-full">
          <Card className="bg-gray-50">
            <CardContent className="py-8">
              <p className="text-center text-gray-500">No forms available in this category yet.</p>
            </CardContent>
          </Card>
        </div>
      )
    }

    return forms.map((form) => (
      <Card key={form.id} className="hover:shadow-lg transition-shadow duration-200 border-gray-200">
        <CardHeader>
          <div className="flex items-start justify-between">
            <form.icon className="h-8 w-8 text-[#5E3989] mb-2" />
            <Badge
              variant="secondary"
              className={
                form.status === "active"
                  ? "bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white"
                  : "bg-amber-100 text-amber-800"
              }
            >
              {form.status}
            </Badge>
          </div>
          <CardTitle className="text-lg">{form.title}</CardTitle>
          <CardDescription className="text-sm">{form.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border-[#5E3989] text-[#5E3989]">
              {form.category}
            </Badge>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadForm(form.id)}
                className="border-[#5E3989] text-[#5E3989] hover:bg-[#5E3989] hover:text-white"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Link href={`/forms/${form.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#5E3989] text-[#5E3989] hover:bg-[#5E3989] hover:text-white bg-transparent"
                >
                  {buttonText}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Image
              src="/images/refugehouse-logo.png"
              alt="Refuge House Logo"
              width={160}
              height={64}
              className="h-16 w-auto"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#5E3989] to-[#A90533] bg-clip-text text-transparent mb-2">
            Refuge House Form Directory
          </h1>
          <p className="text-base text-gray-600 mb-4 italic">A home is in the heart of every child.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-amber-800 text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <p className="font-medium">Draft versions for demonstration and coordination purposes</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white rounded-lg px-6 py-4 mb-8 shadow-md">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Package className="h-7 w-7" />
              Package Development
            </h2>
          </div>

          <div className="mb-8">
            <div className="bg-purple-50 border-l-4 border-[#5E3989] rounded-md px-5 py-3 mb-4 ml-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#5E3989]">
                <Home className="h-5 w-5" />
                Basic Foster Family Home
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderFormCards(basicFosterFamilyHomeForms, "View Artifact")}
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-purple-50 border-l-4 border-[#5E3989] rounded-md px-5 py-3 mb-4 ml-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#5E3989]">
                <FileText className="h-5 w-5" />
                Mental and Behavioral Health Support
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderFormCards(mentalBehavioralHealthForms, "View Artifact")}
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-purple-50 border-l-4 border-[#5E3989] rounded-md px-5 py-3 mb-4 ml-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#5E3989]">
                <Users className="h-5 w-5" />
                IDD/ASD Support Services
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderFormCards(iddAsdSupportForms, "View Artifact")}
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-purple-50 border-l-4 border-[#5E3989] rounded-md px-5 py-3 mb-4 ml-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#5E3989]">
                <ClipboardList className="h-5 w-5" />
                Short Term Assessment Services
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderFormCards(shortTermAssessmentForms, "View Artifact")}
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-purple-50 border-l-4 border-[#5E3989] rounded-md px-5 py-3 mb-4 ml-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#5E3989]">
                <Shield className="h-5 w-5" />
                Treatment Foster Family Care
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderFormCards(treatmentFosterFamilyCareForms, "View Artifact")}
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-purple-50 border-l-4 border-[#5E3989] rounded-md px-5 py-3 mb-4 ml-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-[#5E3989]">
                <AlertCircle className="h-5 w-5" />
                Substance Use Support Services
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {renderFormCards(substanceUseSupportForms, "View Artifact")}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white rounded-lg px-6 py-4 mb-6 shadow-md">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <BookOpen className="h-7 w-7" />
              Resource Guides
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderFormCards(resourceGuideForms, "Open Guide")}
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white rounded-lg px-6 py-4 mb-6 shadow-md">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Home className="h-7 w-7" />
              Intake and Placement
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderFormCards(intakePlacementForms)}
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white rounded-lg px-6 py-4 mb-6 shadow-md">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <FileCheck className="h-7 w-7" />
              Service Planning
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderFormCards(servicePlanningForms)}
          </div>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white rounded-lg px-6 py-4 mb-6 shadow-md">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Users className="h-7 w-7" />
              Aftercare Forms
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{renderFormCards(aftercareForms)}</div>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white rounded-lg px-6 py-4 mb-6 shadow-md">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Building className="h-7 w-7" />
              Foster Homes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{renderFormCards(fosterHomeForms)}</div>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white rounded-lg px-6 py-4 mb-6 shadow-md">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Phone className="h-7 w-7" />
              General Forms
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{renderFormCards(generalForms)}</div>
        </div>

        <div className="text-center text-gray-600 text-sm border-t border-gray-300 pt-8 mt-12">
          <p className="font-medium">© 2025 Refuge House. All forms are draft versions for evaluation purposes.</p>
          <p className="text-gray-500 mt-2">A home is in the heart of every child.</p>
        </div>
      </div>
    </div>
  )
}
