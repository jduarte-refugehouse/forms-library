import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import CQICycle from "@/components/basic-cqi-cycle-diagram"

export default function BasicCQIModelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="outline" className="mb-6 gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Return to Dashboard
          </Button>
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <CQICycle />
        </div>
      </div>
    </div>
  )
}
