"use client"
/**
 * Ensures Radix UI peer-dependencies are bundled.
 * These imports are only here for Next Lite to detect and install them.
 */
import "@radix-ui/react-slot"
import "@radix-ui/react-checkbox"
import "@radix-ui/react-label"
import "@radix-ui/react-radio-group"
import "@radix-ui/react-select"
import "@radix-ui/react-slider" // NEW: fixes build error
