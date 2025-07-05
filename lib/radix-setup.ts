"use client"
/**
 * Ensures Radix UI peer-dependencies are bundled.
 * We don’t actually use the re-exports here – they’re just imported
 * so that Next Lite can automatically install the packages.
 */
import "@radix-ui/react-slot"
import "@radix-ui/react-checkbox"
import "@radix-ui/react-label"
import "@radix-ui/react-radio-group"
import "@radix-ui/react-select"
