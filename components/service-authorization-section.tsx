"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Trash2,
  Edit,
  ChevronDown,
  ChevronRight,
  FileText,
  Mail,
  Send,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  FilePenLineIcon as Signature,
} from "lucide-react"

interface ServiceData {
  id: string
  serviceType: string
  frequencyRequested: string
  providerName: string
  authorizationStatus: "Approved" | "Pending" | "Denied"
  authorizationDate: string
  // Denial fields
  deniedBy?: string
  denialReason?: string
  denialDate?: string
  alternativeServiceArranged?: string
  alternativeServiceProvider?: string
  alternativeServiceStartDate?: string
  costCoverageRequired?: boolean
  // Program Director Authorization
  estimatedCost?: number
  justification?: string
  programDirectorApproval?: boolean
  digitalSignature?: string
  approvalDate?: string
}

interface SectionData {
  services: ServiceData[]
  sectionNotes: string
  totalDeniedCost: number
  totalApprovedByDirector: number
  runningTotalForChild: number
}

interface ServiceAuthorizationSectionProps {
  childData: {
    id: string
    firstName: string
    lastName: string
    dob: string
    caseNumber: string
  }
  sectionData: SectionData
  onUpdate: (data: SectionData) => void
  onValidationChange: (isValid: boolean) => void
  viewMode?: "edit" | "view"
}

const SERVICE_TYPES = [
  "Individual Therapy",
  "Family Therapy",
  "Group Therapy",
  "Psychiatric Services",
  "Psychological Testing",
  "Case Management",
  "Transportation",
  "Respite Care",
  "Educational Support",
  "Medical Services",
  "Dental Services",
  "Vision Services",
  "Substance Abuse Treatment",
  "Life Skills Training",
  "Vocational Services",
  "Other",
]

const DENIED_BY_OPTIONS = ["Medicaid", "Private Insurance", "DFPS", "School District", "Other"]

export default function ServiceAuthorizationSection({
  childData,
  sectionData,
  onUpdate,
  onValidationChange,
  viewMode = "edit",
}: ServiceAuthorizationSectionProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [editingService, setEditingService] = useState<string | null>(null)

  // Auto-save functionality
  const debouncedUpdate = useCallback(
    debounce((data: SectionData) => {
      onUpdate(data)
    }, 500),
    [onUpdate],
  )

  useEffect(() => {
    debouncedUpdate(sectionData)
  }, [sectionData, debouncedUpdate])

  // Validation
  useEffect(() => {
    const deniedServices = sectionData.services.filter((s) => s.authorizationStatus === "Denied")
    const deniedWithoutAlternatives = deniedServices.filter((s) => !s.alternativeServiceArranged?.trim())
    const isValid = deniedWithoutAlternatives.length === 0
    onValidationChange(isValid)
  }, [sectionData, onValidationChange])

  // Calculate counts
  const approvedCount = sectionData.services.filter((s) => s.authorizationStatus === "Approved").length
  const pendingCount = sectionData.services.filter((s) => s.authorizationStatus === "Pending").length
  const deniedCount = sectionData.services.filter((s) => s.authorizationStatus === "Denied").length

  const updateService = (serviceId: string, updates: Partial<ServiceData>) => {
    const updatedServices = sectionData.services.map((service) =>
      service.id === serviceId ? { ...service, ...updates } : service,
    )

    // Recalculate financial totals
    const totalDeniedCost = updatedServices
      .filter((s) => s.authorizationStatus === "Denied" && s.costCoverageRequired)
      .reduce((sum, s) => sum + (s.estimatedCost || 0), 0)

    const totalApprovedByDirector = updatedServices
      .filter((s) => s.authorizationStatus === "Denied" && s.programDirectorApproval)
      .reduce((sum, s) => sum + (s.estimatedCost || 0), 0)

    const newSectionData = {
      ...sectionData,
      services: updatedServices,
      totalDeniedCost,
      totalApprovedByDirector,
    }

    onUpdate(newSectionData)
  }

  const addService = () => {
    const newService: ServiceData = {
      id: Date.now().toString(),
      serviceType: "",
      frequencyRequested: "",
      providerName: "",
      authorizationStatus: "Pending",
      authorizationDate: "",
    }

    const newSectionData = {
      ...sectionData,
      services: [...sectionData.services, newService],
    }

    onUpdate(newSectionData)
    setEditingService(newService.id)
  }

  const deleteService = (serviceId: string) => {
    const updatedServices = sectionData.services.filter((s) => s.id !== serviceId)
    const newSectionData = {
      ...sectionData,
      services: updatedServices,
    }
    onUpdate(newSectionData)
  }

  const toggleRowExpansion = (serviceId: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(serviceId)) {
      newExpanded.delete(serviceId)
    } else {
      newExpanded.add(serviceId)
    }
    setExpandedRows(newExpanded)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 border-green-200"
      case "Pending":
        return "bg-yellow-50 border-yellow-200"
      case "Denied":
        return "bg-red-50 border-red-200"
      default:
        return ""
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "Denied":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Denied
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const generateFCSDR01 = (service: ServiceData) => {
    alert(`Generating FC-SDR-01 form for ${service.serviceType}`)
  }

  const requestAuthorization = (service: ServiceData) => {
    alert(`Requesting authorization for ${service.serviceType}`)
  }

  const emailProvider = (service: ServiceData) => {
    const subject = `Service Authorization Update - ${service.serviceType}`
    const body = `Dear ${service.providerName},\n\nRegarding service authorization for ${childData.firstName} ${childData.lastName} (Case: ${childData.caseNumber})...\n\nBest regards,\nRefuge House Team`
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
  }

  const exportFinancialReport = () => {
    const reportData = {
      childId: childData.id,
      childName: `${childData.firstName} ${childData.lastName}`,
      reportDate: new Date().toISOString(),
      financialSummary: {
        totalDeniedCost: sectionData.totalDeniedCost,
        totalApprovedByDirector: sectionData.totalApprovedByDirector,
        runningTotal: sectionData.runningTotalForChild,
      },
      deniedServices: sectionData.services.filter((s) => s.authorizationStatus === "Denied" && s.costCoverageRequired),
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `financial-report-${childData.id}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (viewMode === "view") {
    return (
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Service Authorizations & Denials</CardTitle>
              <CardDescription>Service authorization tracking and management</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-100 text-green-800">{approvedCount} Approved</Badge>
              <Badge className="bg-yellow-100 text-yellow-800">{pendingCount} Pending</Badge>
              <Badge className="bg-red-100 text-red-800">{deniedCount} Denied</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sectionData.services.map((service) => (
              <div key={service.id} className={`p-4 rounded-lg border ${getStatusColor(service.authorizationStatus)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{service.serviceType}</h4>
                    <p className="text-sm text-gray-600">
                      {service.providerName} - {service.frequencyRequested}
                    </p>
                  </div>
                  {getStatusBadge(service.authorizationStatus)}
                </div>
                {service.authorizationStatus === "Denied" && service.alternativeServiceArranged && (
                  <div className="mt-2 p-2 bg-blue-50 rounded">
                    <p className="text-sm">
                      <strong>Alternative:</strong> {service.alternativeServiceArranged}
                    </p>
                    <p className="text-sm">
                      <strong>Provider:</strong> {service.alternativeServiceProvider}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Service Authorizations & Denials</CardTitle>
            <CardDescription>Track service authorization requests, approvals, and denials</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-100 text-green-800">{approvedCount} Approved</Badge>
            <Badge className="bg-yellow-100 text-yellow-800">{pendingCount} Pending</Badge>
            <Badge className="bg-red-100 text-red-800">{deniedCount} Denied</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Financial Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Total Denied Cost</p>
                  <p className="text-lg font-bold text-red-600">${sectionData.totalDeniedCost.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Director Approved</p>
                  <p className="text-lg font-bold text-green-600">${sectionData.totalApprovedByDirector.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Running Total</p>
                  <p className="text-lg font-bold text-blue-600">${sectionData.runningTotalForChild.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <Button onClick={exportFinancialReport} size="sm" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Service List Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Service Authorizations</h3>
            <Button onClick={addService} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Auth Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectionData.services.map((service) => (
                  <>
                    <TableRow key={service.id} className={getStatusColor(service.authorizationStatus)}>
                      <TableCell>
                        {service.authorizationStatus === "Denied" && (
                          <Button variant="ghost" size="sm" onClick={() => toggleRowExpansion(service.id)}>
                            {expandedRows.has(service.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingService === service.id ? (
                          <Select
                            value={service.serviceType}
                            onValueChange={(value) => updateService(service.id, { serviceType: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                            <SelectContent>
                              {SERVICE_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <span>{service.serviceType || "Not specified"}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingService === service.id ? (
                          <Input
                            value={service.frequencyRequested}
                            onChange={(e) => updateService(service.id, { frequencyRequested: e.target.value })}
                            placeholder="e.g., 2x/week"
                          />
                        ) : (
                          <span>{service.frequencyRequested}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingService === service.id ? (
                          <Input
                            value={service.providerName}
                            onChange={(e) => updateService(service.id, { providerName: e.target.value })}
                            placeholder="Provider name"
                          />
                        ) : (
                          <span>{service.providerName}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingService === service.id ? (
                          <Select
                            value={service.authorizationStatus}
                            onValueChange={(value: "Approved" | "Pending" | "Denied") =>
                              updateService(service.id, { authorizationStatus: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Approved">Approved</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Denied">Denied</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          getStatusBadge(service.authorizationStatus)
                        )}
                      </TableCell>
                      <TableCell>
                        {editingService === service.id ? (
                          <Input
                            type="date"
                            value={service.authorizationDate}
                            onChange={(e) => updateService(service.id, { authorizationDate: e.target.value })}
                          />
                        ) : (
                          <span>
                            {service.authorizationDate ? new Date(service.authorizationDate).toLocaleDateString() : ""}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {editingService === service.id ? (
                            <Button variant="outline" size="sm" onClick={() => setEditingService(null)}>
                              Done
                            </Button>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => setEditingService(service.id)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => deleteService(service.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>

                          {/* Quick Actions */}
                          {service.authorizationStatus === "Denied" && (
                            <Button variant="outline" size="sm" onClick={() => generateFCSDR01(service)}>
                              <FileText className="h-3 w-3" />
                            </Button>
                          )}
                          {service.authorizationStatus === "Pending" && (
                            <Button variant="outline" size="sm" onClick={() => requestAuthorization(service)}>
                              <Send className="h-3 w-3" />
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => emailProvider(service)}>
                            <Mail className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Denial Details */}
                    {service.authorizationStatus === "Denied" && expandedRows.has(service.id) && (
                      <TableRow>
                        <TableCell colSpan={7}>
                          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                            <h4 className="font-medium text-red-800">Denial Details</h4>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor={`denied-by-${service.id}`}>Denied By</Label>
                                <Select
                                  value={service.deniedBy || ""}
                                  onValueChange={(value) => updateService(service.id, { deniedBy: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select who denied" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {DENIED_BY_OPTIONS.map((option) => (
                                      <SelectItem key={option} value={option}>
                                        {option}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor={`denial-date-${service.id}`}>Denial Date</Label>
                                <Input
                                  id={`denial-date-${service.id}`}
                                  type="date"
                                  value={service.denialDate || ""}
                                  onChange={(e) => updateService(service.id, { denialDate: e.target.value })}
                                />
                              </div>
                              <div className="flex items-center space-x-2 pt-6">
                                <Checkbox
                                  id={`cost-coverage-${service.id}`}
                                  checked={service.costCoverageRequired || false}
                                  onCheckedChange={(checked) =>
                                    updateService(service.id, { costCoverageRequired: checked as boolean })
                                  }
                                />
                                <Label htmlFor={`cost-coverage-${service.id}`}>Cost Coverage Required</Label>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor={`denial-reason-${service.id}`}>Denial Reason</Label>
                              <Textarea
                                id={`denial-reason-${service.id}`}
                                value={service.denialReason || ""}
                                onChange={(e) => updateService(service.id, { denialReason: e.target.value })}
                                placeholder="Detailed reason for denial..."
                                rows={3}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor={`alt-service-${service.id}`}>Alternative Service Arranged</Label>
                                <Textarea
                                  id={`alt-service-${service.id}`}
                                  value={service.alternativeServiceArranged || ""}
                                  onChange={(e) =>
                                    updateService(service.id, { alternativeServiceArranged: e.target.value })
                                  }
                                  placeholder="Description of alternative service..."
                                  rows={2}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`alt-provider-${service.id}`}>Alternative Service Provider</Label>
                                <Input
                                  id={`alt-provider-${service.id}`}
                                  value={service.alternativeServiceProvider || ""}
                                  onChange={(e) =>
                                    updateService(service.id, { alternativeServiceProvider: e.target.value })
                                  }
                                  placeholder="Provider name"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`alt-start-date-${service.id}`}>Alternative Service Start Date</Label>
                                <Input
                                  id={`alt-start-date-${service.id}`}
                                  type="date"
                                  value={service.alternativeServiceStartDate || ""}
                                  onChange={(e) =>
                                    updateService(service.id, { alternativeServiceStartDate: e.target.value })
                                  }
                                />
                              </div>
                            </div>

                            {/* Program Director Authorization */}
                            {service.costCoverageRequired && (
                              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <Alert className="mb-4">
                                  <AlertTriangle className="h-4 w-4" />
                                  <AlertDescription>
                                    Refuge House will cover the cost of this denied service per T3C requirements
                                  </AlertDescription>
                                </Alert>

                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor={`estimated-cost-${service.id}`}>Estimated Cost ($)</Label>
                                      <Input
                                        id={`estimated-cost-${service.id}`}
                                        type="number"
                                        step="0.01"
                                        value={service.estimatedCost || ""}
                                        onChange={(e) =>
                                          updateService(service.id, {
                                            estimatedCost: Number.parseFloat(e.target.value) || 0,
                                          })
                                        }
                                        placeholder="0.00"
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2 pt-6">
                                      <Checkbox
                                        id={`director-approval-${service.id}`}
                                        checked={service.programDirectorApproval || false}
                                        onCheckedChange={(checked) => {
                                          const updates: Partial<ServiceData> = {
                                            programDirectorApproval: checked as boolean,
                                          }
                                          if (checked) {
                                            updates.approvalDate = new Date().toISOString().split("T")[0]
                                          }
                                          updateService(service.id, updates)
                                        }}
                                      />
                                      <Label htmlFor={`director-approval-${service.id}`}>
                                        Program Director Approval
                                      </Label>
                                    </div>
                                  </div>

                                  <div>
                                    <Label htmlFor={`justification-${service.id}`}>Justification</Label>
                                    <Textarea
                                      id={`justification-${service.id}`}
                                      value={service.justification || ""}
                                      onChange={(e) => updateService(service.id, { justification: e.target.value })}
                                      placeholder="Justification for cost coverage..."
                                      rows={3}
                                    />
                                  </div>

                                  {service.programDirectorApproval && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div>
                                        <Label htmlFor={`digital-signature-${service.id}`}>Digital Signature</Label>
                                        <div className="flex gap-2">
                                          <Input
                                            id={`digital-signature-${service.id}`}
                                            value={service.digitalSignature || ""}
                                            onChange={(e) =>
                                              updateService(service.id, { digitalSignature: e.target.value })
                                            }
                                            placeholder="Program Director Name"
                                          />
                                          <Button variant="outline" size="sm">
                                            <Signature className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                      <div>
                                        <Label htmlFor={`approval-date-${service.id}`}>Approval Date</Label>
                                        <Input
                                          id={`approval-date-${service.id}`}
                                          type="date"
                                          value={service.approvalDate || ""}
                                          onChange={(e) => updateService(service.id, { approvalDate: e.target.value })}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Validation Warning */}
                            {!service.alternativeServiceArranged?.trim() && (
                              <Alert className="border-red-200 bg-red-50">
                                <AlertTriangle className="h-4 w-4 text-red-600" />
                                <AlertDescription className="text-red-800">
                                  Alternative service arrangement is required for all denied services.
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Section Notes */}
        <div>
          <Label htmlFor="section-notes">Section Notes</Label>
          <Textarea
            id="section-notes"
            value={sectionData.sectionNotes}
            onChange={(e) => onUpdate({ ...sectionData, sectionNotes: e.target.value })}
            placeholder="Additional notes about service authorizations..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(null, args), wait)
  }) as T
}
