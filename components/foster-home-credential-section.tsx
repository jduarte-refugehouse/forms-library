"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, ChevronDown, ChevronUp, ExternalLink, Shield } from "lucide-react"
import Link from "next/link"

interface FosterHomeCredentialSectionProps {
  childData?: {
    id: string
    name: string
    servicePackage: "mental-behavioral" | "idd-autism" | "basic"
    addOnServices?: string[]
  }
  sectionData?: {
    homeInfo?: {
      familyName: string
      homeId: string
      licenseNumber: string
    }
    credentials?: {
      t3cBasic: { status: "current" | "expiring" | "expired"; expiration: string }
      servicePackage: { status: "current" | "expiring" | "expired"; expiration: string }
      addOns?: Array<{ name: string; status: "current" | "expiring" | "expired"; expiration: string }>
    }
  }
  onUpdate?: (data: any) => void
  onValidationChange?: (isValid: boolean) => void
  viewMode?: "edit" | "view"
}

export function FosterHomeCredentialSection({
  childData = {
    id: "sample-child-123",
    name: "Sample Child",
    servicePackage: "mental-behavioral",
    addOnServices: ["trauma-informed-care"],
  },
  sectionData = {
    homeInfo: {
      familyName: "Johnson Family",
      homeId: "FH-2024-0156",
      licenseNumber: "TX-FC-789456",
    },
    credentials: {
      t3cBasic: { status: "current", expiration: "2025-12-15" },
      servicePackage: { status: "current", expiration: "2025-08-30" },
      addOns: [{ name: "Trauma-Informed Care", status: "expiring", expiration: "2024-12-30" }],
    },
  },
  onUpdate = () => {},
  onValidationChange = () => {},
  viewMode = "edit",
}: FosterHomeCredentialSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  // Calculate overall credential status
  const getOverallStatus = () => {
    const { credentials } = sectionData

    if (!credentials) return "unknown"

    // Check for expired credentials
    const hasExpired =
      credentials.t3cBasic.status === "expired" ||
      credentials.servicePackage.status === "expired" ||
      credentials.addOns?.some((addon) => addon.status === "expired")

    if (hasExpired) return "expired"

    // Check for expiring credentials
    const hasExpiring =
      credentials.t3cBasic.status === "expiring" ||
      credentials.servicePackage.status === "expiring" ||
      credentials.addOns?.some((addon) => addon.status === "expiring")

    if (hasExpiring) return "expiring"

    return "current"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "current":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Current</Badge>
      case "expiring":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Expiring Soon</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Expired</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: "current" | "expiring" | "expired") => {
    switch (status) {
      case "current":
        return "✅"
      case "expiring":
        return "⏰"
      case "expired":
        return "❌"
    }
  }

  const getPackageName = (packageType: string) => {
    switch (packageType) {
      case "mental-behavioral":
        return "Mental & Behavioral Health"
      case "idd-autism":
        return "IDD/Autism Services"
      case "basic":
        return "Basic Foster Care"
      default:
        return packageType
    }
  }

  const formatExpirationDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" })
  }

  const checkExpiringWithin30Days = () => {
    const thirtyDaysFromNow = new Date()
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)

    const { credentials } = sectionData
    if (!credentials) return false

    const t3cExpiring = new Date(credentials.t3cBasic.expiration) <= thirtyDaysFromNow
    const packageExpiring = new Date(credentials.servicePackage.expiration) <= thirtyDaysFromNow
    const addOnExpiring = credentials.addOns?.some((addon) => new Date(addon.expiration) <= thirtyDaysFromNow)

    return t3cExpiring || packageExpiring || addOnExpiring
  }

  const overallStatus = getOverallStatus()
  const expiringWithin30Days = checkExpiringWithin30Days()

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle className="text-lg">Foster Home Credentials</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Credential verification for service plan</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent>
          <div className="bg-white p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Foster Home Credentials</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Home: {sectionData.homeInfo?.familyName}</span>
                {getStatusBadge(overallStatus)}
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p className="flex items-center gap-2">
                  <span>T3C Basic:</span>
                  <span>{getStatusIcon(sectionData.credentials?.t3cBasic.status || "current")}</span>
                  <span>
                    {sectionData.credentials?.t3cBasic.status === "current" ? "Current" : "Expires"}{" "}
                    {formatExpirationDate(sectionData.credentials?.t3cBasic.expiration || "")}
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <span>{getPackageName(childData.servicePackage)}:</span>
                  <span>{getStatusIcon(sectionData.credentials?.servicePackage.status || "current")}</span>
                  <span>
                    {sectionData.credentials?.servicePackage.status === "current" ? "Current" : "Expires"}{" "}
                    {formatExpirationDate(sectionData.credentials?.servicePackage.expiration || "")}
                  </span>
                </p>

                {sectionData.credentials?.addOns?.map((addon, index) => (
                  <p key={index} className="flex items-center gap-2">
                    <span>{addon.name}:</span>
                    <span>{getStatusIcon(addon.status)}</span>
                    <span>
                      {addon.status === "current" ? "Current" : "Expires"} {formatExpirationDate(addon.expiration)}
                    </span>
                  </p>
                ))}
              </div>

              {expiringWithin30Days && (
                <Alert className="mt-3">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>Credentials expire soon - home review needed</AlertDescription>
                </Alert>
              )}

              <div className="mt-3 pt-2 border-t">
                <Link
                  href={`/homes/${sectionData.homeInfo?.homeId}/credentials`}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  View Full Credentialing Record
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
