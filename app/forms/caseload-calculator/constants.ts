// T3C Caseload Point System Constants
// Per T3C Blueprint requirements for Case Manager workload management

export const SERVICE_PACKAGES = {
  basic: {
    name: "T3C Basic Foster Family Home",
    shortName: "Basic",
    ratio: "1:20",
    points: 6,
    color: "bg-slate-100",
    noAddOns: false,
    noAftercare: false,
  },
  "substance-use": {
    name: "Substance Use Support Services",
    shortName: "Substance Use",
    ratio: "1:15",
    points: 8,
    color: "bg-emerald-100",
    noAddOns: false,
    noAftercare: false,
  },
  stass: {
    name: "Short-Term Assessment Support Services",
    shortName: "STASS",
    ratio: "1:12",
    points: 10,
    color: "bg-blue-100",
    noAddOns: true,
    noAftercare: true,
  },
  "mental-behavioral": {
    name: "Mental & Behavioral Health Support Services",
    shortName: "Mental Health",
    ratio: "1:15",
    points: 8,
    color: "bg-purple-100",
    noAddOns: false,
    noAftercare: false,
  },
  "idd-autism": {
    name: "IDD/Autism Spectrum Disorder Support Services",
    shortName: "IDD/Autism",
    ratio: "1:15",
    points: 8,
    color: "bg-amber-100",
    noAddOns: false,
    noAftercare: false,
  },
  "human-trafficking": {
    name: "Human Trafficking Victim/Survivor Support Services",
    shortName: "HT Survivor",
    ratio: "1:15",
    points: 8,
    color: "bg-rose-100",
    noAddOns: false,
    noAftercare: false,
  },
  "sexual-aggression": {
    name: "Sexual Aggression/Sex Offender Support Services",
    shortName: "Sexual Aggression",
    ratio: "1:15",
    points: 8,
    color: "bg-orange-100",
    noAddOns: false,
    noAftercare: false,
  },
  tffc: {
    name: "Treatment Foster Family Care Support Services",
    shortName: "TFFC",
    ratio: "1:6",
    points: 20,
    color: "bg-red-100",
    noAddOns: false,
    noAftercare: false,
  },
  "specialized-tfc": {
    name: "Specialized Treatment Foster Family Care Support Services",
    shortName: "Specialized TFC",
    ratio: "1:6",
    points: 20,
    color: "bg-pink-100",
    noAddOns: false,
    noAftercare: false,
  },
  "complex-medical": {
    name: "Complex Medical Needs/Medically Fragile Support Services",
    shortName: "Complex Medical",
    ratio: "Variable",
    points: 15,
    color: "bg-cyan-100",
    noAddOns: false,
    noAftercare: false,
    hasComplexity: true,
  },
} as const

export const ADD_ONS = {
  "pregnant-parenting": {
    name: "Pregnant & Parenting Youth Support",
    shortName: "PPY",
    points: 2,
  },
  transition: {
    name: "Transition Support Services",
    shortName: "Transition",
    points: 2,
  },
  kinship: {
    name: "Kinship Caregiver Support",
    shortName: "Kinship",
    points: 1,
  },
} as const

export const MEDICAL_COMPLEXITY = {
  standard: {
    name: "Standard Medical",
    shortName: "Standard",
    points: 0,
    description: "Routine medical monitoring",
  },
  moderate: {
    name: "Moderate Complexity",
    shortName: "Moderate",
    points: 3,
    description: "Multiple specialists, daily medications",
  },
  high: {
    name: "High Complexity",
    shortName: "High",
    points: 5,
    description: "Medical equipment, nursing visits",
  },
  fragile: {
    name: "Medically Fragile",
    shortName: "Fragile",
    points: 8,
    description: "24/7 medical oversight, life-sustaining equipment",
  },
} as const

export const PLACEMENT_STATUS = {
  active: {
    name: "Active Placement",
    shortName: "Active",
    usePackagePoints: true,
    flatPoints: null,
  },
  aftercare: {
    name: "Aftercare Status",
    shortName: "Aftercare",
    usePackagePoints: false,
    flatPoints: 0.5, // Flat 0.5 points regardless of package - 2 contacts per month only
  },
} as const

export const CASELOAD_ZONES = {
  low: {
    name: "Under-utilized",
    min: 0,
    max: 79.99,
    color: "bg-gray-400",
    textColor: "text-gray-700",
    borderColor: "border-gray-400",
    bgLight: "bg-gray-50",
    description: "May indicate capacity for additional assignments",
  },
  green: {
    name: "Optimal",
    min: 100,
    max: 120,
    color: "bg-green-500",
    textColor: "text-green-700",
    borderColor: "border-green-500",
    bgLight: "bg-green-50",
    description: "Normal operations",
  },
  yellow: {
    name: "Monitor",
    min: 121,
    max: 130,
    color: "bg-yellow-500",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-500",
    bgLight: "bg-yellow-50",
    description: "Requires supervisor awareness; consider rebalancing",
  },
  red: {
    name: "Over Capacity",
    min: 131,
    max: Infinity,
    color: "bg-red-500",
    textColor: "text-red-700",
    borderColor: "border-red-500",
    bgLight: "bg-red-50",
    description: "Immediate intervention required",
  },
} as const

// Target is 100-120 points
export const TARGET_POINTS = 120
export const OPTIMAL_MIN = 100
export const OPTIMAL_MAX = 120
export const MONITOR_MAX = 130

// Staffing Ratio Reference
export const STAFFING_RATIOS = {
  packages: {
    basic: {
      caseManager: "1:20",
      licensedTherapist: "N/A",
      bssMentor: "N/A",
      crisisManagement: "N/A",
      aftercareCM: "N/A",
      fosterHomeLimit: "Per home study approval",
    },
    "substance-use": {
      caseManager: "1:15",
      licensedTherapist: "1:14",
      bssMentor: "1:15",
      crisisManagement: "1:25",
      aftercareCM: "1:25",
      fosterHomeLimit: "Per home study approval",
    },
    stass: {
      caseManager: "1:12",
      licensedTherapist: "1:12",
      bssMentor: "N/A",
      crisisManagement: "1:25",
      aftercareCM: "N/A",
      fosterHomeLimit: "4 STASS children",
    },
    "mental-behavioral": {
      caseManager: "1:15",
      licensedTherapist: "1:14",
      bssMentor: "1:15",
      crisisManagement: "1:25",
      aftercareCM: "1:25",
      fosterHomeLimit: "Per home study approval",
    },
    "idd-autism": {
      caseManager: "1:15",
      licensedTherapist: "1:12",
      bssMentor: "1:15",
      crisisManagement: "1:25",
      aftercareCM: "1:25",
      fosterHomeLimit: "Per home study approval",
    },
    "human-trafficking": {
      caseManager: "1:15",
      licensedTherapist: "1:14",
      bssMentor: "1:15",
      crisisManagement: "1:25",
      aftercareCM: "1:25",
      fosterHomeLimit: "Per home study approval",
    },
    "sexual-aggression": {
      caseManager: "1:15",
      licensedTherapist: "1:14",
      bssMentor: "1:15",
      crisisManagement: "1:25",
      aftercareCM: "1:25",
      fosterHomeLimit: "Per home study approval",
    },
    tffc: {
      caseManager: "1:6",
      licensedTherapist: "1:11",
      bssMentor: "1:6",
      crisisManagement: "1:25",
      aftercareCM: "1:25",
      fosterHomeLimit: "2 TFFC children",
      specialNote: "On-Call Licensed Therapist required 24/7",
    },
    "specialized-tfc": {
      caseManager: "1:6",
      licensedTherapist: "1:11",
      bssMentor: "1:6",
      crisisManagement: "1:25",
      aftercareCM: "1:25",
      fosterHomeLimit: "2 STFC children",
      specialNote: "Research-based model",
    },
    "complex-medical": {
      caseManager: "Variable",
      licensedTherapist: "1:14",
      bssMentor: "1:15",
      crisisManagement: "1:25",
      aftercareCM: "1:25",
      fosterHomeLimit: "Per home study approval",
      specialNote: "24/7 RN availability required",
    },
  },
} as const

// Sample data for demonstration
export const SAMPLE_DATA = {
  dallas: [
    {
      id: "cm-001",
      name: "Maria Rodriguez",
      location: "dallas" as const,
      children: [
        { id: "C001", package: "mental-behavioral" as const, status: "active" as const, addOns: ["transition" as const], medicalComplexity: undefined },
        { id: "C002", package: "tffc" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C003", package: "substance-use" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C004", package: "basic" as const, status: "active" as const, addOns: ["kinship" as const], medicalComplexity: undefined },
        { id: "C005", package: "mental-behavioral" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C006", package: "idd-autism" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C007", package: "basic" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C008", package: "basic" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C009", package: "mental-behavioral" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C010", package: "stass" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C011", package: "basic" as const, status: "aftercare" as const, addOns: [], medicalComplexity: undefined },
        { id: "C012", package: "mental-behavioral" as const, status: "aftercare" as const, addOns: [], medicalComplexity: undefined },
        { id: "C013", package: "tffc" as const, status: "aftercare" as const, addOns: [], medicalComplexity: undefined },
      ],
    },
    {
      id: "cm-002",
      name: "James Thompson",
      location: "dallas" as const,
      children: [
        { id: "C014", package: "tffc" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C015", package: "tffc" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C016", package: "mental-behavioral" as const, status: "active" as const, addOns: ["pregnant-parenting" as const], medicalComplexity: undefined },
        { id: "C017", package: "substance-use" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C018", package: "mental-behavioral" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C019", package: "idd-autism" as const, status: "active" as const, addOns: ["transition" as const], medicalComplexity: undefined },
        { id: "C020", package: "stass" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C021", package: "basic" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C022", package: "basic" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C023", package: "substance-use" as const, status: "aftercare" as const, addOns: [], medicalComplexity: undefined },
        { id: "C024", package: "mental-behavioral" as const, status: "aftercare" as const, addOns: [], medicalComplexity: undefined },
      ],
    },
    {
      id: "cm-003",
      name: "David Chen",
      location: "dallas" as const,
      children: [
        { id: "C040", package: "tffc" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C041", package: "tffc" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C042", package: "tffc" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C043", package: "mental-behavioral" as const, status: "active" as const, addOns: ["transition" as const], medicalComplexity: undefined },
        { id: "C044", package: "mental-behavioral" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C045", package: "substance-use" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C046", package: "complex-medical" as const, status: "active" as const, addOns: [], medicalComplexity: "high" as const },
        { id: "C047", package: "basic" as const, status: "aftercare" as const, addOns: [], medicalComplexity: undefined },
      ],
    },
  ],
  sanAntonio: [
    {
      id: "cm-004",
      name: "Stephanie Bass",
      location: "sanAntonio" as const,
      children: [
        { id: "C025", package: "mental-behavioral" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C026", package: "mental-behavioral" as const, status: "active" as const, addOns: ["transition" as const], medicalComplexity: undefined },
        { id: "C027", package: "idd-autism" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C028", package: "basic" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C029", package: "basic" as const, status: "active" as const, addOns: ["kinship" as const], medicalComplexity: undefined },
        { id: "C030", package: "substance-use" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C031", package: "stass" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C032", package: "tffc" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C033", package: "basic" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C034", package: "idd-autism" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C035", package: "mental-behavioral" as const, status: "active" as const, addOns: [], medicalComplexity: undefined },
        { id: "C036", package: "basic" as const, status: "aftercare" as const, addOns: [], medicalComplexity: undefined },
        { id: "C037", package: "mental-behavioral" as const, status: "aftercare" as const, addOns: [], medicalComplexity: undefined },
        { id: "C038", package: "idd-autism" as const, status: "aftercare" as const, addOns: [], medicalComplexity: undefined },
        { id: "C039", package: "basic" as const, status: "aftercare" as const, addOns: [], medicalComplexity: undefined },
      ],
    },
  ],
}

export type ServicePackageKey = keyof typeof SERVICE_PACKAGES
export type AddOnKey = keyof typeof ADD_ONS
export type MedicalComplexityKey = keyof typeof MEDICAL_COMPLEXITY
export type PlacementStatusKey = keyof typeof PLACEMENT_STATUS
export type LocationKey = "dallas" | "sanAntonio"

