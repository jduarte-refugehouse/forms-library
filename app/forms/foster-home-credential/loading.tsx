import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function FosterHomeCredentialLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Navigation Header Skeleton */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-8 w-32" />
            <div className="h-4 w-px bg-gray-300" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Quick Controls Skeleton */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-8 w-16" />
              <div className="h-4 w-px bg-gray-300" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </div>

        {/* Context Banner Skeleton */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </div>

        {/* Main Content Skeleton */}
        <div className="space-y-6">
          <Card className="w-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5" />
                  <div>
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-4 w-32 mt-1" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg border">
                <Skeleton className="h-5 w-40 mb-2" />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-4 w-56" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                  <div className="mt-3 pt-2 border-t">
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Context Skeleton */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <Skeleton className="h-5 w-32 mb-2" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-72" />
              <Skeleton className="h-4 w-68" />
              <Skeleton className="h-4 w-60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
