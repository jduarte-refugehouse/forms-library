"use client"

import { useState, useRef, ReactNode } from "react"
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
import { Download, FileText, Loader2 } from "lucide-react"

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

// Generate filename
const generateFilename = (formTitle: string, packageCode: string): string => {
  const sanitizedTitle = formTitle.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "_")
  const dateStr = new Date().toISOString().split("T")[0]
  return `${sanitizedTitle}_${packageCode}_${dateStr}.pdf`
}

// Create the PDF header HTML
const createPDFHeader = (
  formTitle: string,
  formUrl: string,
  packageFilter: string,
  generatedAt: Date
): string => {
  const packageName = PACKAGE_CODES[packageFilter] || "All Packages"

  return `
    <div style="
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 24px;
      font-family: system-ui, -apple-system, sans-serif;
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
          <a href="${formUrl}" style="color: #5E3989; text-decoration: underline;">${formUrl}</a>
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
}

// Create footer HTML for page numbers
const createPDFFooter = (): string => {
  return `
    <div style="
      text-align: center;
      font-size: 10px;
      color: #6c757d;
      padding-top: 16px;
      margin-top: 24px;
      border-top: 1px solid #dee2e6;
    ">
      <p style="margin: 4px 0;">© ${new Date().getFullYear()} Refuge House Child Placing Agency</p>
      <p style="margin: 4px 0; font-style: italic;">"A home is in the heart of every child."</p>
    </div>
  `
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

  const handleExportPDF = async () => {
    if (!contentRef.current) {
      console.error("Content ref is not available")
      return
    }

    setIsGenerating(true)

    try {
      // Dynamically import html2pdf
      const html2pdf = (await import("html2pdf.js")).default

      const generatedAt = new Date()
      const formUrl = `https://previewforms.refugehouse.org${formPath}`

      // Create a container for the PDF content
      const pdfContainer = document.createElement("div")
      pdfContainer.style.backgroundColor = "white"
      pdfContainer.style.padding = "0"
      pdfContainer.style.width = "100%"

      // Add header
      const headerDiv = document.createElement("div")
      headerDiv.innerHTML = createPDFHeader(formTitle, formUrl, selectedPackage, generatedAt)
      pdfContainer.appendChild(headerDiv)

      // Clone and add the main content
      const contentClone = contentRef.current.cloneNode(true) as HTMLElement

      // Remove any elements that shouldn't be in the PDF
      const elementsToRemove = contentClone.querySelectorAll(
        '[data-pdf-exclude="true"], .pdf-exclude, button, .no-print'
      )
      elementsToRemove.forEach((el) => el.remove())

      // Remove the header section from the clone (already have our PDF header)
      const headerSection = contentClone.querySelector(".bg-gradient-to-r.from-\\[\\#5E3989\\]")
      if (headerSection) {
        headerSection.remove()
      }

      // Style adjustments for PDF
      contentClone.style.padding = "0"
      contentClone.style.margin = "0"
      contentClone.style.backgroundColor = "white"

      // Remove any fixed or sticky positioning
      const allElements = contentClone.querySelectorAll("*")
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement
        const style = window.getComputedStyle(htmlEl)
        if (style.position === "fixed" || style.position === "sticky") {
          htmlEl.style.position = "relative"
        }
      })

      pdfContainer.appendChild(contentClone)

      // Add footer
      const footerDiv = document.createElement("div")
      footerDiv.innerHTML = createPDFFooter()
      pdfContainer.appendChild(footerDiv)

      // Temporarily add to document for rendering
      pdfContainer.style.position = "absolute"
      pdfContainer.style.left = "-9999px"
      pdfContainer.style.top = "0"
      document.body.appendChild(pdfContainer)

      // Configure PDF options
      const opt = {
        margin: [0.5, 0.5, 0.75, 0.5], // top, right, bottom, left in inches
        filename: generateFilename(formTitle, selectedPackage),
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
          allowTaint: true,
        },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
        },
        pagebreak: {
          mode: ["css", "legacy"],
          before: ".pdf-page-break",
          after: ".pdf-page-break-after",
          avoid: ".pdf-no-break",
        },
      }

      // Generate and save PDF
      await html2pdf().set(opt).from(pdfContainer).save()

      // Clean up
      document.body.removeChild(pdfContainer)

      setIsOpen(false)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
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
              Generating PDF...
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
          onClick={handleExportPDF}
          disabled={isGenerating}
          className="cursor-pointer"
        >
          <Download className="h-4 w-4 mr-2" />
          {isGenerating ? "Generating..." : "Download PDF"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PDFExportButton

