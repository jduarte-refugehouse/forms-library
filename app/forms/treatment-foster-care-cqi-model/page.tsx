"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import CQICycle from "@/components/treatment-foster-care-cqi-cycle-diagram"
import { PDFExportButton } from "@/components/pdf-export-button"

export default function TreatmentFosterCareCQIModelPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50" ref={contentRef}>
      <div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button variant="ghost" className="gap-2 text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
                Return to Dashboard
              </Button>
            </Link>
            <PDFExportButton
              formTitle="TFFC CQI Model"
              formPath="/forms/treatment-foster-care-cqi-model"
              contentRef={contentRef}
              defaultPackage="TFFC"
              showPackageFilter={false}
              className="border-white/30 text-gray-800"
            />
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="bg-white rounded-full p-3">
              <Image
                src="/images/refugehouse-logo.png"
                alt="Refuge House Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">CQI Model</h1>
              <p className="text-xl text-purple-100 italic">A home is in the heart of every child.</p>
              <Badge className="mt-2 bg-white/20 text-white border-white/30">
                T3C Treatment Foster Family Care Support Services
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6">
          <CQICycle />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            TBRI® is a registered trademark of the Karyn Purvis Institute of Child Development at Texas Christian
            University
          </p>
          <p className="text-sm text-gray-600 italic">"A home is in the heart of every child."</p>
          <div className="mt-4 pt-4 border-t border-gray-200 max-w-md mx-auto">
            <p className="text-sm text-gray-500">
              <strong>Last Revised:</strong> December 10, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
