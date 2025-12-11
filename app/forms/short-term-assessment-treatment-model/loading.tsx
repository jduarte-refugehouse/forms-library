export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#5E3989] border-r-transparent"></div>
        <p className="mt-4 text-lg text-[#5E3989] font-semibold">Loading Treatment Model...</p>
      </div>
    </div>
  )
}
