# Refuge House Brand Guidelines

## Overview
This document contains the official brand guidelines for Refuge House, including colors, typography, logo usage, and design patterns used throughout the Forms Library application.

## Brand Identity

### Tagline
**"A home is in the heart of every child"**

### Mission
Refuge House provides trauma-informed care and support services for children and families, utilizing Trust-Based Relational Intervention (TBRI®) principles.

---

## Color Palette

### Primary Brand Colors

#### Purple (Primary)
- **Hex:** `#5E3989`
- **Usage:** Primary brand color, headers, primary buttons, key UI elements
- **Tailwind:** Custom color defined in theme

#### Pink (Accent)
- **Hex:** `#A90533`
- **Usage:** Accent color, gradients, hover states, secondary emphasis
- **Tailwind:** Custom color defined in theme

### Brand Gradient
\`\`\`css
background: linear-gradient(135deg, #5E3989 0%, #A90533 100%)
\`\`\`
- **Usage:** Hero sections, headers, feature cards, call-to-action elements

### Neutral Colors
- **Background:** Use semantic tokens (`bg-background`, `bg-card`)
- **Text:** Use semantic tokens (`text-foreground`, `text-muted-foreground`)
- **Borders:** Use semantic tokens (`border`)

---

## Logo

### Logo Files
- **Primary Logo:** `/public/images/refugehouse-logo.png`
- **Format:** PNG with transparency
- **Usage:** Header, hero sections, branded materials

### Logo Usage Guidelines
\`\`\`tsx
// Example: Using the logo in a component
import Image from "next/image"

<Image
  src="/images/refugehouse-logo.png"
  alt="Refuge House"
  width={200}
  height={80}
  className="h-16 w-auto"
/>
\`\`\`

### Logo Placement
- **Header:** Top-left or centered in hero section
- **Minimum Size:** 120px width for readability
- **Clear Space:** Maintain adequate padding around logo

---

## Typography

### Font Families
- **Sans Serif:** System font stack (default)
- **Headings:** Bold weights (600-700)
- **Body Text:** Regular weight (400)

### Text Hierarchy
\`\`\`tsx
// Page Title
<h1 className="text-4xl font-bold">Title</h1>

// Section Heading
<h2 className="text-2xl font-semibold">Section</h2>

// Subsection
<h3 className="text-xl font-semibold">Subsection</h3>

// Body Text
<p className="text-base leading-relaxed">Content</p>
\`\`\`

---

## Design Patterns

### Cards
\`\`\`tsx
<Card className="border-purple-200">
  <CardHeader className="bg-gradient-to-r from-[#5E3989] to-[#A90533]">
    <CardTitle className="text-white">Title</CardTitle>
  </CardHeader>
  <CardContent className="pt-6">
    {/* Content */}
  </CardContent>
</Card>
\`\`\`

### Badges
\`\`\`tsx
// Primary Badge
<Badge className="bg-[#5E3989] text-white">Label</Badge>

// Accent Badge
<Badge className="bg-[#A90533] text-white">Label</Badge>

// Outline Badge
<Badge variant="outline" className="border-[#5E3989] text-[#5E3989]">
  Label
</Badge>
\`\`\`

### Buttons
\`\`\`tsx
// Primary Button
<Button className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
  Action
</Button>

// Secondary Button
<Button variant="outline" className="border-[#5E3989] text-[#5E3989] bg-transparent">
  Action
</Button>
\`\`\`

### Icons
- Use Lucide React icons consistently
- Icon color should match brand colors: `className="text-[#5E3989]"`
- Standard sizes: 16px, 20px, 24px

---

## Component Styling Guidelines

### Hero Sections
\`\`\`tsx
<div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white">
  <div className="container mx-auto px-4 py-12">
    <Image src="/images/refugehouse-logo.png" alt="Refuge House" />
    <h1 className="text-4xl font-bold">Title</h1>
    <p className="text-lg">Tagline or description</p>
  </div>
</div>
\`\`\`

### Section Headers
\`\`\`tsx
<div className="bg-gradient-to-r from-[#5E3989] to-[#A90533] text-white p-6 rounded-t-lg">
  <h2 className="text-2xl font-semibold">Section Title</h2>
</div>
\`\`\`

### Tier Labels
Used to distinguish service levels (Basic vs. Enhanced):
\`\`\`tsx
// Basic Tier
<Badge className="bg-[#5E3989] text-white">Basic</Badge>

// Enhanced Tier
<Badge className="bg-[#A90533] text-white">Enhanced</Badge>
\`\`\`

### Page Footer with Revision Date
**REQUIRED:** All form pages must include a revision date footer at the bottom.

\`\`\`tsx
<div className="mt-8 text-center">
  <p className="text-sm text-gray-500 mb-2">
    TBRI® is a registered trademark of the Karyn Purvis Institute of Child Development at Texas Christian University
  </p>
  <p className="text-sm text-gray-600 italic">"A home is in the heart of every child."</p>
  <div className="mt-4 pt-4 border-t border-gray-200 max-w-md mx-auto">
    <p className="text-sm text-gray-500">
      <strong>Last Revised:</strong> January 2025
    </p>
  </div>
</div>
\`\`\`

**Guidelines:**
- Place at the bottom of every form page after the main content
- Use the format: `<strong>Last Revised:</strong> [Month Year]`
- Update the date whenever significant changes are made to the page
- Keep styling consistent with the example above

---

## Accessibility

### Color Contrast
- Ensure text on brand colors meets WCAG AA standards
- White text on purple (#5E3989): ✓ Passes
- White text on pink (#A90533): ✓ Passes

### Alt Text
- Always include descriptive alt text for the logo
- Example: `alt="Refuge House - A home is in the heart of every child"`

---

## Usage Examples

### Treatment Models & Logic Models
- Use gradient headers with white text
- Apply brand colors to tier badges
- Use card-based layouts with purple borders
- Include TBRI® references with proper styling
- **Include revision date footer at bottom of page**

### Dashboards & Forms
- Hero section with logo and gradient background
- Section cards with purple/pink accents
- Consistent button styling with brand colors
- Icon colors matching brand palette

### CQI Models
- PDSA cycle with brand color phases
- Metrics tables with purple headers
- Timeline indicators using gradient
- Role badges with brand colors
- **Include revision date footer at bottom of page**

---

## Quick Reference

### CSS Variables (if needed)
\`\`\`css
:root {
  --refuge-purple: #5E3989;
  --refuge-pink: #A90533;
}
\`\`\`

### Tailwind Custom Colors
Add to `tailwind.config.ts` if needed:
\`\`\`js
colors: {
  'refuge-purple': '#5E3989',
  'refuge-pink': '#A90533',
}
\`\`\`

---

## Notes for Future Development

1. **Consistency:** Always use the brand colors (#5E3989 and #A90533) for primary UI elements
2. **Logo:** Reference `/public/images/refugehouse-logo.png` for all logo needs
3. **Gradients:** Use the 135deg gradient from purple to pink for hero sections and headers
4. **Typography:** Maintain clear hierarchy with bold headings and readable body text
5. **Accessibility:** Ensure all color combinations meet WCAG standards
6. **Revision Dates:** Always include revision date footer on form pages for version tracking

---

**Last Updated:** January 2025
**Maintained By:** Refuge House Development Team
