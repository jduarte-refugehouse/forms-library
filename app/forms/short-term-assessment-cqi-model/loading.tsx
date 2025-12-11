import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-10 w-48 mb-4 bg-white/20" />
          <div className="flex items-center gap-6 mb-6">
            <Skeleton className="h-24 w-24 rounded-full bg-white/20" />
            <div className="flex-1">
              <Skeleton className="h-10 w-64 mb-2 bg-white/20" />
              <Skeleton className="h-6 w-96 bg-white/20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  )
}
