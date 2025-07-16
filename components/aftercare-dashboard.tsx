"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ArrowUpDown,
  Phone,
  User,
  Video,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  MoreHorizontal,
  Mail,
  Clock,
  ChevronDown,
  BarChart,
  Settings,
  ListFilter,
  Search,
  CalendarDays,
  Printer,
  FileText,
  Users,
  ClipboardList,
  Check,
  Circle,
  X,
} from "lucide-react"
import Link from "next/link"
import { format, parseISO, isPast, isBefore, addDays } from "date-fns"
import { cn } from "@/lib/utils"

// --- Mock Data and Types ---
type ContactType = "phone" | "in-person" | "video"
type ComplianceStatus = "on-track" | "behind" | "non-compliant"
type ReportingEntity = "SSCC" | "DFPS"
type DischargeType = "successful" | "unsuccessful" | "transfer"

interface Contact {
  date: string // ISO string
  type: ContactType
  duration: number // minutes
  withWhom: string
  topics: string
  followUpNeeded: string
}

interface AftercareChild {
  id: string
  name: string
  caseNumber: string
  dischargeDate: string // ISO string
  aftercareMonths: number // Total months in aftercare
  currentAftercareMonth: number
  worker: string
  reportingEntity: ReportingEntity
  lastContact: Contact | null
  nextContactDue: string // ISO string
  contactHistory: Contact[]
  complianceStatus: ComplianceStatus
  servicesDeclined: boolean
  dischargeType: DischargeType
  contactSchedule: {
    [month: string]: {
      required: number
      completed: number
      scheduled: number
      missed: number
      days?: { completed: boolean; scheduled: boolean; missed: boolean }[] // For twice monthly
    }
  }
}

const mockChildrenData: AftercareChild[] = [
  {
    id: "child-001",
    name: "Alice Smith",
    caseNumber: "CS-2023-001",
    dischargeDate: "2024-01-15",
    aftercareMonths: 6,
    currentAftercareMonth: 6,
    worker: "John Doe",
    reportingEntity: "SSCC",
    lastContact: {
      date: "2024-07-10",
      type: "phone",
      duration: 30,
      withWhom: "Foster Parent",
      topics: "School progress, summer plans",
      followUpNeeded: "Check on school enrollment",
    },
    nextContactDue: "2024-07-24",
    contactHistory: [
      {
        date: "2024-07-10",
        type: "phone",
        duration: 30,
        withWhom: "Foster Parent",
        topics: "School progress, summer plans",
        followUpNeeded: "Check on school enrollment",
      },
      {
        date: "2024-06-25",
        type: "in-person",
        duration: 60,
        withWhom: "Child, Foster Parent",
        topics: "Aftercare plan review",
        followUpNeeded: "Update service plan",
      },
    ],
    complianceStatus: "on-track",
    servicesDeclined: false,
    dischargeType: "successful",
    contactSchedule: {
      "1": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "2": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "3": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "4": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "5": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "6": {
        required: 2,
        completed: 1,
        scheduled: 1,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: false, scheduled: true, missed: false },
        ],
      },
    },
  },
  {
    id: "child-002",
    name: "Bob Johnson",
    caseNumber: "CS-2023-002",
    dischargeDate: "2024-03-01",
    aftercareMonths: 6,
    currentAftercareMonth: 5,
    worker: "Jane Doe",
    reportingEntity: "DFPS",
    lastContact: {
      date: "2024-07-05",
      type: "video",
      duration: 45,
      withWhom: "Child",
      topics: "Therapy progress",
      followUpNeeded: "Coordinate with therapist",
    },
    nextContactDue: "2024-07-19",
    contactHistory: [
      {
        date: "2024-07-05",
        type: "video",
        duration: 45,
        withWhom: "Child",
        topics: "Therapy progress",
        followUpNeeded: "Coordinate with therapist",
      },
    ],
    complianceStatus: "behind",
    servicesDeclined: true,
    dischargeType: "unsuccessful",
    contactSchedule: {
      "1": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "2": {
        required: 2,
        completed: 1,
        scheduled: 0,
        missed: 1,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: false, scheduled: false, missed: true },
        ],
      },
      "3": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "4": {
        required: 2,
        completed: 1,
        scheduled: 0,
        missed: 1,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: false, scheduled: false, missed: true },
        ],
      },
      "5": {
        required: 2,
        completed: 1,
        scheduled: 1,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: false, scheduled: true, missed: false },
        ],
      },
    },
  },
  {
    id: "child-003",
    name: "Charlie Brown",
    caseNumber: "CS-2023-003",
    dischargeDate: "2024-06-01",
    aftercareMonths: 6,
    currentAftercareMonth: 2,
    worker: "John Doe",
    reportingEntity: "SSCC",
    lastContact: {
      date: "2024-07-12",
      type: "in-person",
      duration: 60,
      withWhom: "Foster Parent",
      topics: "Home visit, child adjustment",
      followUpNeeded: "None",
    },
    nextContactDue: "2024-07-19",
    contactHistory: [
      {
        date: "2024-07-12",
        type: "in-person",
        duration: 60,
        withWhom: "Foster Parent",
        topics: "Home visit, child adjustment",
        followUpNeeded: "None",
      },
      {
        date: "2024-07-05",
        type: "phone",
        duration: 20,
        withWhom: "Foster Parent",
        topics: "Quick check-in",
        followUpNeeded: "None",
      },
    ],
    complianceStatus: "on-track",
    servicesDeclined: false,
    dischargeType: "successful",
    contactSchedule: {
      "1": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "2": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
    },
  },
  {
    id: "child-004",
    name: "Diana Prince",
    caseNumber: "CS-2023-004",
    dischargeDate: "2024-02-20",
    aftercareMonths: 6,
    currentAftercareMonth: 6,
    worker: "Jane Doe",
    reportingEntity: "DFPS",
    lastContact: {
      date: "2024-07-01",
      type: "phone",
      duration: 25,
      withWhom: "Child",
      topics: "Transition to college",
      followUpNeeded: "Send college resources",
    },
    nextContactDue: "2024-07-15", // Overdue
    contactHistory: [
      {
        date: "2024-07-01",
        type: "phone",
        duration: 25,
        withWhom: "Child",
        topics: "Transition to college",
        followUpNeeded: "Send college resources",
      },
    ],
    complianceStatus: "non-compliant",
    servicesDeclined: false,
    dischargeType: "successful",
    contactSchedule: {
      "1": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "2": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "3": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "4": {
        required: 2,
        completed: 2,
        scheduled: 0,
        missed: 0,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: true, scheduled: false, missed: false },
        ],
      },
      "5": {
        required: 2,
        completed: 1,
        scheduled: 0,
        missed: 1,
        days: [
          { completed: true, scheduled: false, missed: false },
          { completed: false, scheduled: false, missed: true },
        ],
      },
      "6": {
        required: 2,
        completed: 0,
        scheduled: 0,
        missed: 2,
        days: [
          { completed: false, scheduled: false, missed: true },
          { completed: false, scheduled: false, missed: true },
        ],
      },
    },
  },
]

const getContactIcon = (type: ContactType) => {
  switch (type) {
    case "phone":
      return <Phone className="h-4 w-4 text-gray-500" />
    case "in-person":
      return <User className="h-4 w-4 text-gray-500" />
    case "video":
      return <Video className="h-4 w-4 text-gray-500" />
    default:
      return null
  }
}

const getComplianceBadge = (status: ComplianceStatus) => {
  switch (status) {
    case "on-track":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" /> On Track
        </Badge>
      )
    case "behind":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
          <AlertCircle className="h-3 w-3 mr-1" /> Behind
        </Badge>
      )
    case "non-compliant":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800">
          <XCircle className="h-3 w-3 mr-1" /> Non-compliant
        </Badge>
      )
    default:
      return null
  }
}

// --- Helper Functions ---
const calculateDaysUntilAftercareEnds = (dischargeDate: string, aftercareMonths: number) => {
  const discharge = parseISO(dischargeDate)
  const aftercareEndDate = addDays(discharge, aftercareMonths * 30) // Approx months
  const today = new Date()
  const diffTime = aftercareEndDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const calculateComplianceRate = (children: AftercareChild[]) => {
  let totalRequiredContacts = 0
  let totalCompletedContacts = 0

  children.forEach((child) => {
    for (const month in child.contactSchedule) {
      totalRequiredContacts += child.contactSchedule[month].required
      totalCompletedContacts += child.contactSchedule[month].completed
    }
  })

  if (totalRequiredContacts === 0) return 100 // Avoid division by zero

  return (totalCompletedContacts / totalRequiredContacts) * 100
}

export default function AftercareDashboard() {
  const [children, setChildren] = useState<AftercareChild[]>(mockChildrenData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterMonth, setFilterMonth] = useState<string>("all")
  const [filterCompliance, setFilterCompliance] = useState<string>("all")
  const [filterWorker, setFilterWorker] = useState<string>("all")
  const [filterReportingEntity, setFilterReportingEntity] = useState<string>("all")
  const [filterDischargeType, setFilterDischargeType] = useState<string>("all")
  const [showOverdueOnly, setShowOverdueOnly] = useState(false)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof AftercareChild | null
    direction: "ascending" | "descending"
  }>({ key: null, direction: "ascending" })

  // --- Summary Statistics ---
  const activeAftercareCases = useMemo(() => {
    const active = children.filter(
      (child) => calculateDaysUntilAftercareEnds(child.dischargeDate, child.aftercareMonths) > 0,
    )
    const month1_3 = active.filter((c) => c.currentAftercareMonth >= 1 && c.currentAftercareMonth <= 3).length
    const month4_6 = active.filter((c) => c.currentAftercareMonth >= 4 && c.currentAftercareMonth <= 6).length
    return {
      total: active.length,
      month1_3,
      month4_6,
      trend: "up", // Placeholder
    }
  }, [children])

  const contactComplianceRate = useMemo(() => {
    const rate = calculateComplianceRate(children)
    let color = "text-green-600"
    if (rate < 80) color = "text-red-600"
    else if (rate >= 80 && rate <= 95) color = "text-yellow-600"
    return {
      percentage: rate.toFixed(1),
      color,
      actual: children.reduce(
        (sum, c) => sum + Object.values(c.contactSchedule).reduce((s, m) => s + m.completed, 0),
        0,
      ),
      required: children.reduce(
        (sum, c) => sum + Object.values(c.contactSchedule).reduce((s, m) => s + m.required, 0),
        0,
      ),
    }
  }, [children])

  const servicesDeclinedCount = useMemo(() => {
    return children.filter((c) => c.servicesDeclined).length
  }, [children])

  const upcomingDischarges = useMemo(() => {
    const upcoming = children.filter(
      (child) =>
        calculateDaysUntilAftercareEnds(child.dischargeDate, child.aftercareMonths) <= 30 &&
        calculateDaysUntilAftercareEnds(child.dischargeDate, child.aftercareMonths) > 0,
    )
    return {
      count: upcoming.length,
      names: upcoming.map((c) => c.name),
    }
  }, [children])

  const overdueContactsCount = useMemo(() => {
    return children.filter((child) => isPast(parseISO(child.nextContactDue))).length
  }, [children])

  // --- Filtered and Sorted Data ---
  const filteredChildren = useMemo(() => {
    let filtered = children

    if (searchTerm) {
      filtered = filtered.filter(
        (child) =>
          child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          child.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterMonth !== "all") {
      filtered = filtered.filter((child) => child.currentAftercareMonth === Number.parseInt(filterMonth))
    }

    if (filterCompliance !== "all") {
      filtered = filtered.filter((child) => child.complianceStatus === filterCompliance)
    }

    if (filterWorker !== "all") {
      filtered = filtered.filter((child) => child.worker === filterWorker)
    }

    if (filterReportingEntity !== "all") {
      filtered = filtered.filter((child) => child.reportingEntity === filterReportingEntity)
    }

    if (filterDischargeType !== "all") {
      filtered = filtered.filter((child) => child.dischargeType === filterDischargeType)
    }

    if (showOverdueOnly) {
      filtered = filtered.filter((child) => isPast(parseISO(child.nextContactDue)))
    }

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key!]
        const bValue = b[sortConfig.key!]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "ascending" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
        }
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "ascending" ? aValue - bValue : bValue - aValue
        }
        // Handle dates
        if (sortConfig.key === "dischargeDate" || sortConfig.key === "nextContactDue") {
          const dateA = parseISO(aValue as string)
          const dateB = parseISO(bValue as string)
          return sortConfig.direction === "ascending"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime()
        }
        // Handle lastContact date
        if (sortConfig.key === "lastContact") {
          const dateA = a.lastContact ? parseISO(a.lastContact.date) : new Date(0)
          const dateB = b.lastContact ? parseISO(b.lastContact.date) : new Date(0)
          return sortConfig.direction === "ascending"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime()
        }
        return 0
      })
    }

    return filtered
  }, [
    children,
    searchTerm,
    filterMonth,
    filterCompliance,
    filterWorker,
    filterReportingEntity,
    filterDischargeType,
    showOverdueOnly,
    sortConfig,
  ])

  const requestSort = (key: keyof AftercareChild) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortIndicator = (key: keyof AftercareChild) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓"
    }
    return ""
  }

  // Unique filter options
  const uniqueWorkers = useMemo(() => [...new Set(children.map((c) => c.worker))], [children])
  const uniqueReportingEntities = useMemo(() => [...new Set(children.map((c) => c.reportingEntity))], [children])
  const uniqueDischargeTypes = useMemo(() => [...new Set(children.map((c) => c.dischargeType))], [children])

  // --- Auto-save simulation (conceptual for dashboard) ---
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      // console.log("Dashboard auto-saved (conceptual).");
      // In a real app, this would trigger a backend save for dashboard settings/filters
    }, 120000) // Every 2 minutes

    return () => clearInterval(autoSaveInterval)
  }, [])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 p-6 print:bg-white">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Back to Directory */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="outline" className="gap-2 bg-transparent">
                <ArrowUpDown className="h-4 w-4 rotate-90" />
                Back to Directory
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between print:hidden">
            <h1 className="text-3xl font-bold text-gray-900">Aftercare Monitoring Dashboard</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="h-4 w-4 mr-2" /> Print Dashboard
              </Button>
              <Button onClick={() => alert("Generating monthly reports...")}>
                <Download className="h-4 w-4 mr-2" /> Generate Monthly Reports
              </Button>
            </div>
          </div>
          <p className="text-gray-600 print:hidden">
            Track and manage children in aftercare status, monitor compliance, and generate reports.
          </p>

          {/* Summary Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 print:grid-cols-2">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Active Aftercare Cases</CardTitle>
                <Users className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{activeAftercareCases.total}</div>
                <p className="text-xs text-blue-600">
                  {activeAftercareCases.month1_3} (1-3 mo) / {activeAftercareCases.month4_6} (4-6 mo)
                </p>
              </CardContent>
            </Card>

            <Card
              className={cn(
                "border-2",
                contactComplianceRate.color.includes("red")
                  ? "border-red-300"
                  : contactComplianceRate.color.includes("yellow")
                    ? "border-yellow-300"
                    : "border-green-300",
              )}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contact Compliance Rate</CardTitle>
                <CheckCircle className={cn("h-4 w-4", contactComplianceRate.color)} />
              </CardHeader>
              <CardContent>
                <div className={cn("text-2xl font-bold", contactComplianceRate.color)}>
                  {contactComplianceRate.percentage}%
                </div>
                <p className="text-xs text-gray-500">
                  {contactComplianceRate.actual} of {contactComplianceRate.required} contacts met
                </p>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-700">Services Declined</CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">{servicesDeclinedCount}</div>
                <p className="text-xs text-orange-600">
                  <Link href="#" className="underline">
                    Generate refusal letters
                  </Link>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Upcoming Discharges</CardTitle>
                <Calendar className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-900">{upcomingDischarges.count}</div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-xs text-purple-600 underline cursor-help">
                      {upcomingDischarges.names.length > 0 ? "View names" : "None upcoming"}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    {upcomingDischarges.names.length > 0 ? (
                      upcomingDischarges.names.map((name) => <div key={name}>{name}</div>)
                    ) : (
                      <div>No upcoming discharges</div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200 cursor-pointer" onClick={() => setShowOverdueOnly(true)}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-700">Overdue Contacts</CardTitle>
                <Clock className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-900">{overdueContactsCount}</div>
                <p className="text-xs text-red-600">Click to filter table</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-wrap items-center gap-4 print:hidden">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or case #"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1 bg-transparent">
                  <ListFilter className="h-4 w-4" /> Aftercare Month
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterMonth("all")}>All</DropdownMenuItem>
                {Array.from({ length: 6 }, (_, i) => i + 1).map((month) => (
                  <DropdownMenuItem key={month} onClick={() => setFilterMonth(month.toString())}>
                    Month {month}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1 bg-transparent">
                  <ListFilter className="h-4 w-4" /> Compliance
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterCompliance("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCompliance("on-track")}>On Track</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCompliance("behind")}>Behind</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCompliance("non-compliant")}>Non-compliant</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1 bg-transparent">
                  <ListFilter className="h-4 w-4" /> Worker
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterWorker("all")}>All</DropdownMenuItem>
                {uniqueWorkers.map((worker) => (
                  <DropdownMenuItem key={worker} onClick={() => setFilterWorker(worker)}>
                    {worker}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1 bg-transparent">
                  <ListFilter className="h-4 w-4" /> Reporting Entity
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterReportingEntity("all")}>All</DropdownMenuItem>
                {uniqueReportingEntities.map((entity) => (
                  <DropdownMenuItem key={entity} onClick={() => setFilterReportingEntity(entity)}>
                    {entity}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1 bg-transparent">
                  <ListFilter className="h-4 w-4" /> Discharge Type
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilterDischargeType("all")}>All</DropdownMenuItem>
                {uniqueDischargeTypes.map((type) => (
                  <DropdownMenuItem key={type} onClick={() => setFilterDischargeType(type)}>
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant={showOverdueOnly ? "default" : "outline"}
              onClick={() => setShowOverdueOnly(!showOverdueOnly)}
            >
              Show Only Overdue
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilterMonth("all")
                setFilterCompliance("all")
                setFilterWorker("all")
                setFilterReportingEntity("all")
                setFilterDischargeType("all")
                setShowOverdueOnly(false)
              }}
            >
              Reset Filters
            </Button>
          </div>

          {/* Main Data Table */}
          <Card>
            <CardHeader>
              <CardTitle>Aftercare Cases</CardTitle>
              <CardDescription>Overview of all children in aftercare.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => requestSort("name")} className="cursor-pointer">
                      Child Name {getSortIndicator("name")}
                    </TableHead>
                    <TableHead onClick={() => requestSort("caseNumber")} className="cursor-pointer">
                      Case # {getSortIndicator("caseNumber")}
                    </TableHead>
                    <TableHead onClick={() => requestSort("dischargeDate")} className="cursor-pointer">
                      Discharge Date {getSortIndicator("dischargeDate")}
                    </TableHead>
                    <TableHead onClick={() => requestSort("currentAftercareMonth")} className="cursor-pointer">
                      Aftercare Month {getSortIndicator("currentAftercareMonth")}
                    </TableHead>
                    <TableHead onClick={() => requestSort("worker")} className="cursor-pointer">
                      Worker {getSortIndicator("worker")}
                    </TableHead>
                    <TableHead>Reporting Entity</TableHead>
                    <TableHead onClick={() => requestSort("lastContact")} className="cursor-pointer">
                      Last Contact {getSortIndicator("lastContact")}
                    </TableHead>
                    <TableHead onClick={() => requestSort("nextContactDue")} className="cursor-pointer">
                      Next Due {getSortIndicator("nextContactDue")}
                    </TableHead>
                    <TableHead>Compliance</TableHead>
                    <TableHead className="text-right print:hidden">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredChildren.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                        No matching records found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredChildren.map((child) => (
                      <React.Fragment key={child.id}>
                        <TableRow>
                          <TableCell className="font-medium">
                            <Link
                              href={`/forms/aftercare-dashboard/${child.id}`}
                              className="text-blue-600 hover:underline"
                            >
                              {child.name}
                            </Link>
                          </TableCell>
                          <TableCell>{child.caseNumber}</TableCell>
                          <TableCell>{format(parseISO(child.dischargeDate), "MMM dd, yyyy")}</TableCell>
                          <TableCell>
                            {child.currentAftercareMonth} of {child.aftercareMonths}
                          </TableCell>
                          <TableCell>{child.worker}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{child.reportingEntity}</Badge>
                          </TableCell>
                          <TableCell>
                            {child.lastContact ? (
                              <div className="flex items-center gap-1">
                                {getContactIcon(child.lastContact.type)}
                                {format(parseISO(child.lastContact.date), "MMM dd, yyyy")}
                              </div>
                            ) : (
                              "N/A"
                            )}
                          </TableCell>
                          <TableCell
                            className={cn({
                              "text-red-600 font-medium": isPast(parseISO(child.nextContactDue)),
                              "text-yellow-600": isBefore(parseISO(child.nextContactDue), addDays(new Date(), 3)),
                            })}
                          >
                            {format(parseISO(child.nextContactDue), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell>{getComplianceBadge(child.complianceStatus)}</TableCell>
                          <TableCell className="text-right print:hidden">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => alert(`Logging contact for ${child.name}`)}>
                                  <Phone className="h-4 w-4 mr-2" /> Log Contact
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert(`Scheduling next for ${child.name}`)}>
                                  <Calendar className="h-4 w-4 mr-2" /> Schedule Next
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert(`Generating report for ${child.name}`)}>
                                  <FileText className="h-4 w-4 mr-2" /> Generate Report
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert(`Viewing history for ${child.name}`)}>
                                  <ClipboardList className="h-4 w-4 mr-2" /> View History
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => alert(`Sending reminder to ${child.name}`)}>
                                  <Mail className="h-4 w-4 mr-2" /> Send Reminder
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => alert(`Documenting service refusal for ${child.name}`)}
                                >
                                  <XCircle className="h-4 w-4 mr-2" /> Service Refusal
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        {/* Contact Frequency Tracker (Vertical Alignment) */}
                        <TableRow className="bg-gray-50 print:hidden">
                          <TableCell colSpan={10} className="py-2">
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                              <span className="font-semibold w-full mb-1">Contact Schedule:</span>
                              {Object.entries(child.contactSchedule).map(([month, schedule]) => (
                                <div key={month} className="flex flex-col items-start gap-1 min-w-[100px]">
                                  <span className="font-medium text-gray-800">Month {month}</span>
                                  {/* Now always using 'days' for twice monthly */}
                                  {schedule.days?.map((item, idx) => (
                                    <Tooltip key={`m${month}-item${idx}`}>
                                      <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1">
                                          {item.completed ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                          ) : item.scheduled ? (
                                            <Circle className="h-4 w-4 text-blue-500 fill-blue-500" />
                                          ) : item.missed ? (
                                            <X className="h-4 w-4 text-red-500" />
                                          ) : (
                                            <Circle className="h-4 w-4 text-gray-300 fill-gray-300" />
                                          )}
                                          <span className="sr-only">
                                            {item.completed
                                              ? "Completed"
                                              : item.scheduled
                                                ? "Scheduled"
                                                : item.missed
                                                  ? "Missed"
                                                  : "Pending"}
                                          </span>
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        Contact {idx + 1}:{" "}
                                        {item.completed
                                          ? "Completed"
                                          : item.scheduled
                                            ? "Scheduled"
                                            : item.missed
                                              ? "Missed"
                                              : "Pending"}
                                      </TooltipContent>
                                    </Tooltip>
                                  ))}
                                  <span className="text-xs text-gray-500 mt-1">
                                    ({schedule.completed}/{schedule.required})
                                  </span>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Alerts and Notifications Panel (Simplified for dashboard view) */}
          <Card className="print:hidden">
            <CardHeader>
              <CardTitle>Alerts & Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {overdueContactsCount > 0 && (
                <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded-md border border-red-200">
                  <AlertCircle className="h-5 w-5" />
                  <span>
                    <span className="font-semibold">{overdueContactsCount} Overdue Contacts:</span>{" "}
                    {children
                      .filter((c) => isPast(parseISO(c.nextContactDue)))
                      .map((c) => `${c.name} (${c.reportingEntity})`)
                      .join(", ")}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto text-red-700"
                    onClick={() => setShowOverdueOnly(true)}
                  >
                    View All
                  </Button>
                </div>
              )}
              {upcomingDischarges.count > 0 && (
                <div className="flex items-center gap-2 text-purple-700 bg-purple-50 p-3 rounded-md border border-purple-200">
                  <CalendarDays className="h-5 w-5" />
                  <span>
                    <span className="font-semibold">{upcomingDischarges.count} Aftercare Ending Soon:</span>{" "}
                    {upcomingDischarges.names.join(", ")}
                  </span>
                </div>
              )}
              {/* Placeholder for Reports Due */}
              <div className="flex items-center gap-2 text-blue-700 bg-blue-50 p-3 rounded-md border border-blue-200">
                <FileText className="h-5 w-5" />
                <span>
                  <span className="font-semibold">Reports Due:</span> 3 SSCC reports due by Jul 31, 2025, 2 DFPS reports
                  due by Aug 5, 2025
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-blue-700"
                  onClick={() => alert("Go to report generator")}
                >
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analytics View (Placeholder) */}
          <Card className="print:hidden">
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>Visual insights into aftercare program performance.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-48 bg-gray-100 rounded-md">
              <BarChart className="h-12 w-12 text-gray-400 mb-2" />
              <p className="text-gray-500">Analytics charts will be displayed here.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => alert("Navigating to full analytics page")}
              >
                View Full Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Reporting Entity Management (Placeholder) */}
          <Card className="print:hidden">
            <CardHeader>
              <CardTitle>Reporting Entity Management</CardTitle>
              <CardDescription>Configure contacts and submission preferences for reporting entities.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-32 bg-gray-100 rounded-md">
              <Settings className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-gray-500">Settings for reporting entities will be managed here.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => alert("Navigating to reporting entity settings")}
              >
                Manage Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  )
}
