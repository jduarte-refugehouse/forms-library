"use client"

import { Suspense } from "react"
import { FosterHomeQuarterlyReview } from "@/components/foster-home-quarterly-review"

export default function FosterHomeQuarterlyReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div>Loading...</div>}>
        <FosterHomeQuarterlyReview />
      </Suspense>
    </div>
  )
}
