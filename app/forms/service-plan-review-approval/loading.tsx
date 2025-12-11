import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-6xl mx-auto my-8 p-6 space-y-6">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center justify-between mt-4">
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
          <Skeleton className="h-2 w-full mt-4" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-24 w-full" /> {/* Dashboard */}
          <Skeleton className="h-10 w-full" /> {/* Tabs */}
          <Skeleton className="h-64 w-full" /> {/* Tab Content */}
          <Skeleton className="h-64 w-full" /> {/* Goals Table */}
          <Skeleton className="h-64 w-full" /> {/* Compliance */}
          <Skeleton className="h-64 w-full" /> {/* Action Planning */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" /> {/* Submit Button */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
