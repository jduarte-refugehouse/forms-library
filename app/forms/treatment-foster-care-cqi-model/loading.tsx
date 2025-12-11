export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="h-10 w-32 bg-white/20 rounded animate-pulse mb-4" />
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-white/20 rounded-full p-3 w-24 h-24 animate-pulse" />
            <div className="flex-1">
              <div className="h-10 w-64 bg-white/20 rounded animate-pulse mb-2" />
              <div className="h-6 w-96 bg-white/20 rounded animate-pulse mb-2" />
              <div className="h-6 w-48 bg-white/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="space-y-6">
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="h-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-96 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
