"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, ChevronDown, ChevronUp, ExternalLink, Shield, Users, Clock, Info } from "lucide-react"
import Link from "next/link"

type ServicePackageType = "mental-behavioral" | "idd-autism" | "basic" | "substance-use" | "stass" | "tffc"

interface FosterHomeCredentialSectionProps {
  childData?: {
    id: string
    name: string
    servicePackage: ServicePackageType
    addOnServices?: string[]
  }
  sectionData?: {
    homeInfo?: {
      familyName: string
      homeId: string
      licenseNumber: string
      currentCapacity?: number
      maxCapacity?: number
    }
    credentials?: {
      t3cBasic: { status: "current" | "expiring" | "expired"; expiration: string }
      servicePackage: { status: "current" | "expiring" | "expired"; expiration: string }
      addOns?: Array<{ name: string; status: "current" | "expiring" | "expired"; expiration: string }>
      // TFFC dual credentialing
      tffcCredential?: { status: "current" | "expiring" | "expired"; expiration: string }
      basicCredential?: { status: "current" | "expiring" | "expired"; expiration: string }
    }
    // TFFC specific
    tffcLimits?: {
      maxTffcChildren: number
      currentTffcCount: number
      dualCredentialed: boolean
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
      case "substance-use":
        return "Substance Use Support Services"
      case "stass":
        return "Short-Term Assessment (STASS)"
      case "tffc":
        return "Treatment Foster Family Care"
      default:
        return packageType
    }
  }

  const getPackageColor = (packageType: string) => {
    switch (packageType) {
      case "mental-behavioral":
        return "bg-blue-100 text-blue-800"
      case "idd-autism":
        return "bg-teal-100 text-teal-800"
      case "substance-use":
        return "bg-amber-100 text-amber-800"
      case "stass":
        return "bg-gray-100 text-gray-800"
      case "tffc":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
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
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Foster Home Credentials</h3>
                <p className="text-sm text-gray-600">Home: {sectionData.homeInfo?.familyName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getPackageColor(childData.servicePackage)}>
                  {getPackageName(childData.servicePackage)}
                </Badge>
                {getStatusBadge(overallStatus)}
              </div>
            </div>

            {/* Capacity Information */}
            {sectionData.homeInfo?.maxCapacity && (
              <div className="bg-gray-50 p-3 rounded mb-4 flex items-center gap-4">
                <Users className="h-5 w-5 text-gray-500" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Capacity</div>
                  <div className="text-sm text-gray-600">
                    {sectionData.homeInfo.currentCapacity || 0} / {sectionData.homeInfo.maxCapacity} children
                  </div>
                </div>
                {(sectionData.homeInfo.currentCapacity || 0) >= sectionData.homeInfo.maxCapacity && (
                  <Badge className="bg-red-100 text-red-800">At Capacity</Badge>
                )}
              </div>
            )}

            {/* TFFC Specific Section */}
            {childData.servicePackage === "tffc" && (
              <div className="bg-purple-50 p-3 rounded mb-4 border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-800">TFFC Credentialing</span>
                </div>
                
                {sectionData.tffcLimits?.dualCredentialed && (
                  <div className="flex items-center gap-2 text-sm text-purple-700 mb-2">
                    <Info className="h-4 w-4" />
                    <span>Dual Credentialed (TFFC + Basic)</span>
                  </div>
                )}
                
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-600">TFFC Limit:</span>
                    <span className="font-medium">
                      {sectionData.tffcLimits?.currentTffcCount || 0} / {sectionData.tffcLimits?.maxTffcChildren || 2} TFFC children max
                    </span>
                  </div>
                  {(sectionData.tffcLimits?.currentTffcCount || 0) >= (sectionData.tffcLimits?.maxTffcChildren || 2) && (
                    <Alert className="mt-2 border-purple-300 bg-purple-50">
                      <AlertTriangle className="h-4 w-4 text-purple-600" />
                      <AlertDescription className="text-purple-700">
                        At TFFC capacity - cannot accept additional TFFC placements
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            )}

            {/* STASS Note */}
            {childData.servicePackage === "stass" && (
              <div className="bg-yellow-50 p-3 rounded mb-4 border border-yellow-200">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    <strong>STASS:</strong> Time-limited assessment placement (30-45 days max)
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-2">
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

                {/* Show TFFC-specific credentials */}
                {childData.servicePackage === "tffc" && sectionData.credentials?.tffcCredential && (
                  <p className="flex items-center gap-2">
                    <span>TFFC Credential:</span>
                    <span>{getStatusIcon(sectionData.credentials.tffcCredential.status)}</span>
                    <span>
                      {sectionData.credentials.tffcCredential.status === "current" ? "Current" : "Expires"}{" "}
                      {formatExpirationDate(sectionData.credentials.tffcCredential.expiration)}
                    </span>
                  </p>
                )}

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
