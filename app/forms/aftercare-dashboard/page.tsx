import AftercareDashboard from "@/components/aftercare-dashboard"
import { Suspense } from "react"
import AftercareDashboardLoading from "./loading"

export default function AftercareDashboardPage() {
  // In a real application, you would fetch childData based on user role and other criteria
  // For this example, AftercareDashboard component uses mock data internally.

  return (
    <Suspense fallback={<AftercareDashboardLoading />}>
      <AftercareDashboard />
    </Suspense>
  )
}
