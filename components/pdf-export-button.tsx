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

// Create footer HTML
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
      alert("Unable to find page content. Please refresh and try again.")
      return
    }

    setIsGenerating(true)
    setIsOpen(false)

    try {
      // Dynamically import html2pdf
      const html2pdfModule = await import("html2pdf.js")
      const html2pdf = html2pdfModule.default

      const generatedAt = new Date()
      const formUrl = `https://previewforms.refugehouse.org${formPath}`

      // Create a wrapper div that will be visible during rendering
      const pdfWrapper = document.createElement("div")
      pdfWrapper.id = "pdf-export-wrapper"
      pdfWrapper.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 8.5in;
        min-height: 11in;
        background: white;
        z-index: 99999;
        padding: 0.5in;
        box-sizing: border-box;
        overflow: visible;
      `

      // Add header
      const headerDiv = document.createElement("div")
      headerDiv.innerHTML = createPDFHeader(formTitle, formUrl, selectedPackage, generatedAt)
      pdfWrapper.appendChild(headerDiv)

      // Clone the content
      const contentClone = contentRef.current.cloneNode(true) as HTMLElement
      
      // Remove unwanted elements from the clone
      const selectorsToRemove = [
        'button',
        '[data-pdf-exclude="true"]',
        '.pdf-exclude',
        '.no-print',
        'nav',
        '[role="navigation"]',
      ]
      
      selectorsToRemove.forEach(selector => {
        const elements = contentClone.querySelectorAll(selector)
        elements.forEach(el => el.remove())
      })

      // Find and remove the gradient header (the purple/magenta header)
      const headers = contentClone.querySelectorAll('[class*="bg-gradient"]')
      headers.forEach(header => {
        // Check if it's the main header with the gradient
        if (header.className.includes('from-[#5E3989]') || 
            header.className.includes('from-purple') ||
            (header as HTMLElement).style.background?.includes('gradient')) {
          header.remove()
        }
      })

      // Also try to remove the first child that's a gradient header
      const firstChild = contentClone.firstElementChild
      if (firstChild && firstChild.className.includes('bg-gradient')) {
        firstChild.remove()
      }

      // Reset styles on the clone for PDF
      contentClone.style.cssText = `
        background: white;
        padding: 0;
        margin: 0;
        min-height: auto;
        width: 100%;
      `

      // Process all elements to ensure they render properly
      const allElements = contentClone.querySelectorAll('*')
      allElements.forEach(el => {
        const htmlEl = el as HTMLElement
        // Fix positioning issues
        const computedStyle = window.getComputedStyle(htmlEl)
        if (computedStyle.position === 'fixed' || computedStyle.position === 'sticky') {
          htmlEl.style.position = 'relative'
        }
        // Ensure backgrounds render
        if (computedStyle.backgroundColor === 'transparent') {
          // Keep transparent
        }
      })

      pdfWrapper.appendChild(contentClone)

      // Add footer
      const footerDiv = document.createElement("div")
      footerDiv.innerHTML = createPDFFooter()
      pdfWrapper.appendChild(footerDiv)

      // Add to document body (must be visible for html2canvas to work properly)
      document.body.appendChild(pdfWrapper)

      // Wait a moment for the DOM to update and render
      await new Promise(resolve => setTimeout(resolve, 500))

      // Configure PDF options
      const opt = {
        margin: 0,
        filename: generateFilename(formTitle, selectedPackage),
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: true, // Enable logging for debugging
          letterRendering: true,
          allowTaint: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 816, // 8.5in at 96dpi
          windowHeight: 1056, // 11in at 96dpi
        },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait" as const,
        },
        pagebreak: {
          mode: ["avoid-all", "css", "legacy"],
        },
      }

      // Generate PDF
      await html2pdf().set(opt).from(pdfWrapper).save()

      // Clean up
      document.body.removeChild(pdfWrapper)

    } catch (error) {
      console.error("Error generating PDF:", error)
      // Try to clean up if there was an error
      const wrapper = document.getElementById("pdf-export-wrapper")
      if (wrapper) {
        document.body.removeChild(wrapper)
      }
      alert("There was an error generating the PDF. Please check the console for details.")
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
