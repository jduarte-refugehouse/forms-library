import type {
  ServicePackageKey,
  AddOnKey,
  MedicalComplexityKey,
  PlacementStatusKey,
  LocationKey,
} from "./constants"

export interface ChildAssignment {
  id: string
  package: ServicePackageKey
  status: PlacementStatusKey
  addOns: AddOnKey[]
  medicalComplexity?: MedicalComplexityKey
}

export interface CaseManager {
  id: string
  name: string
  location: LocationKey
  children: ChildAssignment[]
}

export interface ChildPointBreakdown {
  childId: string
  packageName: string
  packageShortName: string
  basePoints: number
  addOnPoints: number
  medicalModifier: number
  totalPoints: number
  isAftercare: boolean
  addOnDetails: string[]
}

export interface CaseloadSummary {
  totalPoints: number
  childCount: number
  activeCount: number
  aftercareCount: number
  breakdown: ChildPointBreakdown[]
  status: "low" | "green" | "yellow" | "red"
}

export interface TeamSummary {
  location: LocationKey
  totalChildren: number
  caseManagerCount: number
  averagePoints: number
  inGreen: number
  inYellow: number
  inRed: number
  inLow: number
}

