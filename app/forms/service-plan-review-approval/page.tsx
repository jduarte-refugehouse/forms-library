"use client"

import { useState } from "react"
import Link from "next/link"
import ServicePlanReviewApproval from "@/components/service-plan-review-approval"
import { Button } from "@/components/ui/button"

export default function ServicePlanReviewApprovalPage() {
  const [formData, setFormData] = useState<any>(null) // Replace 'any' with your actual data type
  const [isValid, setIsValid] = useState(false)
  const [viewMode, setViewMode] = useState<"edit" | "view">("edit")

  // Example child data - replace with actual data fetching
  const childData = {
    id: "child-123",
    name: "Alice Smith",
    placementDate: "2024-01-15",
    servicePlanApprovalDate: "2024-02-01",
    age: 10,
    packageType: "mental-behavioral" as "mental-behavioral" | "idd-autism" | "none",
  }

  // Example user role - replace with actual user authentication
  const userRole = "admin" as
    | "case_manager"
    | "program_director"
    | "clinical_director"
    | "foster_parent"
    | "youth"
    | "admin"

  const handleUpdate = (data: any) => {
    console.log("Form data updated:", data)
    setFormData(data)
  }

  const handleValidationChange = (valid: boolean) => {
    setIsValid(valid)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4">
        <Link href="/" passHref>
          <Button variant="outline">← Back to Directory</Button>
        </Link>
      </div>
      <ServicePlanReviewApproval
        childData={childData}
        sectionData={formData}
        onUpdate={handleUpdate}
        onValidationChange={handleValidationChange}
        viewMode={viewMode}
        userRole={userRole}
      />
    </div>
  )
}
