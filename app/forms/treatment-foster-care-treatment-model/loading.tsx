import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-48 mb-4 bg-white/20" />
          <div className="flex items-center gap-6 mb-6">
            <Skeleton className="h-24 w-24 rounded-full bg-white/20" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-96 bg-white/20" />
              <Skeleton className="h-6 w-64 bg-white/20" />
              <Skeleton className="h-6 w-80 bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Card className="shadow-xl">
          <CardContent className="p-8 space-y-8">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-96 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
