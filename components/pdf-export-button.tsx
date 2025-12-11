"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Download, FileText, Loader2, Printer } from "lucide-react"

// Package code mapping
const PACKAGE_CODES: Record<string, string> = {
  all: "All Packages",
  BASIC: "Basic Foster Family Home Support Services",
  MH: "Mental and Behavioral Health Support Services",
  IDD: "Intellectual/Developmental Disability Support Services",
  SU: "Substance Use Support Services",
  STASS: "Short-Term Assessment Support Services",
  TFFC: "Treatment Foster Family Care",
}

interface PDFExportButtonProps {
  formTitle: string
  formPath: string
  contentRef: React.RefObject<HTMLElement>
  defaultPackage?: string
  showPackageFilter?: boolean
  className?: string
}

// Helper to format date
const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Helper to format date and time
const formatDateTime = (date: Date): string => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  })
}

export function PDFExportButton({
  formTitle,
  formPath,
  contentRef,
  defaultPackage = "all",
  showPackageFilter = true,
  className = "",
}: PDFExportButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(defaultPackage)
  const [isOpen, setIsOpen] = useState(false)

  const handlePrint = () => {
    setIsOpen(false)
    
    const packageName = PACKAGE_CODES[selectedPackage] || "All Packages"
    const generatedAt = new Date()
    const formUrl = `https://previewforms.refugehouse.org${formPath}`

    // Create print-specific styles
    const printStyles = document.createElement("style")
    printStyles.id = "pdf-print-styles"
    printStyles.innerHTML = `
      @media print {
        /* Hide non-printable elements */
        button, nav, [role="navigation"], .no-print, [data-pdf-exclude="true"] {
          display: none !important;
        }
        
        /* Reset page styling */
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        /* Ensure backgrounds print */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `
    document.head.appendChild(printStyles)

    // Create the header element
    const headerElement = document.createElement("div")
    headerElement.id = "pdf-print-header"
    headerElement.innerHTML = `
      <div style="
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 24px;
        font-family: system-ui, -apple-system, sans-serif;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      ">
        <div style="
          font-size: 14px;
          font-weight: 600;
          color: #5E3989;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        ">
          Refuge House Child Placing Agency
        </div>
        
        <h1 style="
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 16px 0;
          padding: 0;
        ">${formTitle}</h1>
        
        <div style="
          background-color: #fff3cd;
          border: 1px solid #ffc107;
          border-radius: 6px;
          padding: 12px 16px;
          margin-bottom: 16px;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        ">
          <div style="
            font-weight: 600;
            color: #856404;
            font-size: 13px;
            margin-bottom: 6px;
          ">⚠️ STATIC DOCUMENT NOTICE</div>
          <p style="
            color: #856404;
            font-size: 12px;
            margin: 0;
            line-height: 1.5;
          ">
            This PDF was generated from a dynamic form on ${formatDate(generatedAt)}.
            The source form may have been updated since this PDF was created.
          </p>
        </div>
        
        <div style="
          font-size: 12px;
          color: #495057;
          line-height: 1.8;
        ">
          <div style="margin-bottom: 4px;">
            <strong>View Current Version:</strong> 
            <span style="color: #5E3989;">${formUrl}</span>
          </div>
          <div style="margin-bottom: 4px;">
            <strong>Document Generated:</strong> ${formatDateTime(generatedAt)}
          </div>
          <div>
            <strong>Package Filter:</strong> ${packageName}
          </div>
        </div>
      </div>
    `

    // Insert header at the beginning of the content
    if (contentRef.current) {
      contentRef.current.insertBefore(headerElement, contentRef.current.firstChild)
    }

    // Trigger print dialog
    window.print()

    // Clean up after print dialog closes
    setTimeout(() => {
      const header = document.getElementById("pdf-print-header")
      if (header) {
        header.remove()
      }
      const styles = document.getElementById("pdf-print-styles")
      if (styles) {
        styles.remove()
      }
    }, 1000)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`gap-2 bg-white hover:bg-gray-50 ${className}`}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="h-4 w-4" />
              Export PDF
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 bg-white">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {showPackageFilter && (
          <>
            <DropdownMenuLabel className="text-xs font-normal text-gray-500 pt-2">
              Package Filter
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
              <DropdownMenuRadioItem value="all">All Packages</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="BASIC">Basic Foster Family Home</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="MH">Mental & Behavioral Health</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="IDD">IDD/Autism Support</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="SU">Substance Use Support</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="STASS">Short-Term Assessment</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="TFFC">Treatment Foster Family Care</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          onClick={handlePrint}
          className="cursor-pointer"
        >
          <Printer className="h-4 w-4 mr-2" />
          Print / Save as PDF
        </DropdownMenuItem>
        
        <div className="px-2 py-1.5 text-xs text-gray-500">
          Tip: In the print dialog, select "Save as PDF" as the destination to download a PDF file.
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PDFExportButton
