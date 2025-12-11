import { Suspense } from "react"
import PregnantParentingYouthDashboard from "@/components/pregnant-parenting-youth-dashboard"

export default function PregnantParentingYouthDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PregnantParentingYouthDashboard />
    </Suspense>
  )
}
