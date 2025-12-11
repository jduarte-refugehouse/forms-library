"use client"

import { useState } from "react"
import {
  AlertCircle,
  Heart,
  Brain,
  Shield,
  Home,
  ChevronRight,
  RefreshCw,
  CheckCircle,
  Info,
  User,
  Activity,
  HelpCircle,
  Clock,
  Target,
  TrendingUp,
  FileText,
  Eye,
  Lightbulb,
  FlaskConical,
  Search,
  Phone,
  Calendar,
  HeartPulse,
} from "lucide-react"

const CrisisDecisionTool = () => {
  const [currentStep, setCurrentStep] = useState("initial")
  const [servicePackage, setServicePackage] = useState("")
  const [situationType, setSituationType] = useState("")
  const [responses, setResponses] = useState({})
  const [recommendation, setRecommendation] = useState(null)
  const [history, setHistory] = useState([])

  const [tbriData, setTbriData] = useState({
    preCrisisAssessment: {
      triggers: [],
      warningSignsObserved: [],
      timeToEscalation: "",
      customTrigger: "",
      customWarningSigns: "",
    },
    interventionsAttempted: {
      connecting: {},
      empowering: {},
      correcting: {},
    },
    postCrisisRecovery: {
      timeToRegulation: "",
      recoveryActivities: [],
      childInsightLevel: "",
      safetyPlanAdjustments: "",
    },
    traumaInformedNotes: "",
  })

  const [showTbriTips, setShowTbriTips] = useState(false)

  const tbriTips = {
    fearBased: {
      title: "For Fear-Based Behaviors",
      strategies: [
        "Increase felt safety through predictability",
        "Offer choices within boundaries",
        "Use calm, reassuring voice",
        "Avoid cornering (physical or emotional)",
      ],
    },
    controlSeeking: {
      title: "For Control-Seeking Behaviors",
      strategies: [
        "Offer structured choices",
        "Use 'Yes, and...' instead of 'No'",
        "Provide compromises",
        "Give voice before direction",
      ],
    },
    sensoryOverwhelm: {
      title: "For Sensory Overwhelm",
      strategies: [
        "Reduce stimulation immediately",
        "Offer sensory supports",
        "Create calm environment",
        "Use minimal language",
      ],
    },
  }

  const traumaInformedLanguage = {
    manipulative: "seeking control due to felt safety needs",
    "attention-seeking": "connection-seeking",
    defiant: "struggling to regulate",
    aggressive: "in fight/flight response",
    "non-compliant": "unable to process requests",
  }

  // Phone numbers and resources
  const resources = {
    emergency: {
      number: "911",
      label: "Emergency Services",
      icon: Shield,
      color: "red",
      when: "Immediate danger to self or others, medical emergency requiring immediate intervention",
    },
    nurseLineIDD: {
      number: "1-866-912-6283",
      label: "Superior STAR Health 24/7 Nurse Line",
      icon: Heart,
      color: "blue",
      when: "Medical questions, medication concerns, health guidance for IDD/Autism youth",
    },
    dfpsHotline: {
      number: "1-800-252-5400",
      label: "DFPS Abuse/Neglect Hotline",
      icon: Shield,
      color: "orange",
      when: "Suspected abuse or neglect, safety concerns requiring CPS involvement",
    },
    refugeHouse: {
      number: "Check On-Call Schedule",
      label: "Refuge House On-Call",
      icon: Home,
      color: "green",
      when: "Behavioral escalation, placement support needed, non-emergency consultation",
    },
    mentalHealthSupport: {
      number: "1-866-912-6283",
      label: "Superior STAR Health 24/7 Nurse Line (Mental Health)",
      icon: Brain,
      color: "purple",
      when: "Mental health crisis, suicidal thoughts, emotional crisis, behavioral health guidance",
    },
    crisisLine: {
      number: "1-800-273-TALK",
      label: "National Suicide Prevention Lifeline",
      icon: AlertCircle,
      color: "pink",
      when: "Immediate suicide risk, need professional help",
    },
    tffcOnCallTherapist: {
      number: "Check On-Call Schedule",
      label: "TFFC On-Call Licensed Therapist",
      icon: Phone,
      color: "purple",
      when: "TFFC-specific crisis requiring clinical consultation - 24/7 availability",
    },
    substanceUseCrisis: {
      number: "1-800-662-4357",
      label: "SAMHSA National Helpline",
      icon: HeartPulse,
      color: "amber",
      when: "Substance use crisis, relapse support, withdrawal concerns",
    },
  }

  // Decision tree logic
  const handleInitialSelection = (type) => {
    setSituationType(type)
    setHistory([...history, "initial"])

    // For behavioral crises, go to pre-crisis assessment first
    if (type === "behavioral") {
      setCurrentStep("preCrisisAssessment")
    } else if (type === "medical") {
      setCurrentStep("medicalAssessment")
    } else if (type === "safety") {
      setCurrentStep("safetyAssessment")
    } else if (type === "psychiatric") {
      setCurrentStep("psychiatricAssessment")
    } else if (type === "substance") {
      setCurrentStep("substanceAssessment")
    } else if (type === "unknown-history") {
      setCurrentStep("unknownHistoryAssessment")
    }
  }

  const handlePreCrisisAssessment = (assessmentData) => {
    setTbriData((prev) => ({
      ...prev,
      preCrisisAssessment: assessmentData,
    }))
    setHistory([...history, currentStep])
    setCurrentStep("behavioralAssessment")
  }

  const handleBehavioralAssessment = (severity) => {
    setHistory([...history, currentStep])
    if (severity === "danger") {
      const followUpItems = [
        "Ensure safety of all household members",
        "Call case manager within 2 hours of restraint",
        "Complete Physical Restraint Form within 24 hours",
        "Conduct child processing session within 24 hours",
        "Monitor child for 15 minutes post-restraint minimum",
        "Check if this is 4th+ restraint in 7 days (triggers service plan review)",
        "Document all TBRI interventions attempted before restraint",
        "Note restraint duration (15-minute maximum for personal restraint)",
      ]
      
      // TFFC-specific follow-up items
      if (servicePackage === "tffc") {
        followUpItems.push(
          "Contact On-Call Therapist for clinical debrief",
          "Document crisis for 60-day Crisis Pattern Analysis",
          "Assess impact on step-down readiness"
        )
      }
      
      // STASS-specific follow-up items
      if (servicePackage === "stass") {
        followUpItems.push(
          "Document behavioral pattern for assessment team",
          "Update expedited safety plan within 72 hours",
          "Note observations for Service Package Recommendation"
        )
      }
      
      // Substance Use specific follow-up items
      if (servicePackage === "substance-use") {
        followUpItems.push(
          "Assess if substance use was a contributing factor",
          "Use recovery-focused language in documentation",
          "Update recovery support plan if needed"
        )
      }
      
      setRecommendation({
        primary: resources.emergency,
        secondary: servicePackage === "tffc" ? resources.tffcOnCallTherapist : resources.refugeHouse,
        action: "Call 911 for immediate safety",
        followUp: followUpItems,
      })
      setCurrentStep("postCrisisDocumentation")
    } else if (severity === "escalating") {
      setCurrentStep("tbriInterventions")
    } else {
      setCurrentStep("tbriInterventions")
    }
  }

  const handleTbriIntervention = (category, intervention, effectiveness) => {
    setTbriData((prev) => ({
      ...prev,
      interventionsAttempted: {
        ...prev.interventionsAttempted,
        [category]: {
          ...prev.interventionsAttempted[category],
          [intervention]: effectiveness,
        },
      },
    }))
  }

  const handlePostCrisisRecovery = (recoveryData) => {
    setTbriData((prev) => ({
      ...prev,
      postCrisisRecovery: recoveryData,
    }))
    setCurrentStep("recommendation")
  }

  const handleMedicalAssessment = (severity) => {
    setHistory([...history, currentStep])
    if (severity === "emergency") {
      setRecommendation({
        primary: resources.emergency,
        secondary: resources.refugeHouse,
        action: "Call 911 immediately",
        followUp: [
          "Notify Refuge House on-call after emergency response",
          "Document incident in Radius",
          "Follow up with case manager next business day",
        ],
      })
      setCurrentStep("recommendation")
    } else if (severity === "urgent" && (servicePackage === "idd" || servicePackage === "both")) {
      setRecommendation({
        primary: resources.nurseLineIDD,
        secondary: resources.refugeHouse,
        action: "Call Superior Nurse Line for medical consultation",
        followUp: [
          "Document nurse recommendations",
          "Follow nurse guidance for next steps",
          "Update case manager via Radius",
        ],
      })
      setCurrentStep("recommendation")
    } else {
      setCurrentStep("medicalNonEmergency")
    }
  }

  const handlePsychiatricAssessment = (type) => {
    setHistory([...history, currentStep])
    if (type === "suicidal") {
      setCurrentStep("suicideRisk")
    } else if (type === "psychosis") {
      setRecommendation({
        primary: resources.emergency,
        secondary: resources.refugeHouse,
        action: "Call 911 for psychiatric emergency",
        followUp: [
          "Request CIT (Crisis Intervention Team) officer if available",
          "Stay with youth until help arrives",
          "Notify Refuge House on-call",
        ],
      })
      setCurrentStep("recommendation")
    } else {
      setRecommendation({
        primary: resources.mentalHealthSupport,
        secondary: resources.refugeHouse,
        action: "Call Superior Nurse Line for mental health crisis support",
        followUp: [
          "Stay with youth during call",
          "Follow nurse recommendations for crisis intervention",
          "Contact Refuge House on-call if placement support needed",
          "Document intervention in child's record",
        ],
      })
      setCurrentStep("recommendation")
    }
  }

  const handleSuicideRisk = (immediacy) => {
    setHistory([...history, currentStep])
    if (immediacy === "immediate") {
      setRecommendation({
        primary: resources.emergency,
        secondary: resources.crisisLine,
        action: "Call 911 immediately - active suicide attempt or immediate means",
        followUp: [
          "Do not leave youth alone",
          "Remove means if safe to do so",
          "Notify Refuge House on-call after emergency response",
        ],
      })
    } else {
      setRecommendation({
        primary: resources.mentalHealthSupport,
        secondary: resources.refugeHouse,
        action: "Call Superior Nurse Line for suicide prevention support",
        followUp: [
          "Create safety plan with youth using nurse guidance",
          "Remove or secure potential means",
          "Follow nurse recommendations for level of care",
          "Schedule emergency therapy appointment",
          "Notify case manager immediately",
        ],
      })
    }
    setCurrentStep("recommendation")
  }

  const handleSafetyAssessment = (type) => {
    setHistory([...history, currentStep])
    if (type === "abuse") {
      setRecommendation({
        primary: resources.dfpsHotline,
        secondary: resources.refugeHouse,
        action: "Call DFPS Hotline to report suspected abuse/neglect",
        followUp: [
          "Document observations objectively",
          "Notify Refuge House on-call after report",
          "Preserve any evidence",
          "Support child with trauma-informed approach",
        ],
      })
      setCurrentStep("recommendation")
    } else if (type === "runaway") {
      setCurrentStep("runawayProtocol")
    } else {
      setRecommendation({
        primary: resources.refugeHouse,
        secondary: null,
        action: "Contact Refuge House on-call for safety planning",
        followUp: ["Document safety concerns", "Implement environmental modifications", "Review safety plan with team"],
      })
      setCurrentStep("recommendation")
    }
  }

  const reset = () => {
    setCurrentStep("initial")
    setServicePackage("")
    setSituationType("")
    setResponses({})
    setRecommendation(null)
    setHistory([])
  }

  const goBack = () => {
    if (history.length > 0) {
      const previousStep = history[history.length - 1]
      setHistory(history.slice(0, -1))
      setCurrentStep(previousStep)
      setRecommendation(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* ... existing emergency banner and header ... */}
        <div className="bg-red-600 text-white rounded-xl shadow-lg p-4 mb-4 border-2 border-red-700">
          <div className="flex items-center justify-center gap-3">
            <AlertCircle className="text-white animate-pulse" size={24} />
            <div className="text-center">
              <div className="text-lg font-bold">EMERGENCY: Always call 911 in life-threatening situations</div>
              <div className="text-sm opacity-90">
                If someone is in immediate danger, call 911 first, then use this tool
              </div>
            </div>
            <AlertCircle className="text-white animate-pulse" size={24} />
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Shield className="text-indigo-600" />
                Refuge House Crisis Decision Support
              </h1>
              <p className="text-gray-600 mt-2">
                24/7 Guidance with TBRI® Integration for Foster Parents & Treatment Team
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowTbriTips(!showTbriTips)}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
              >
                <HelpCircle size={18} />
                TBRI Tips
              </button>
              {currentStep !== "initial" && (
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <RefreshCw size={18} />
                  Start Over
                </button>
              )}
            </div>
          </div>
        </div>

        {showTbriTips && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" />
              TBRI® Quick Reference
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(tbriTips).map(([key, tip]) => (
                <div key={key} className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">{tip.title}</h4>
                  <ul className="text-sm space-y-1">
                    {tip.strategies.map((strategy, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{strategy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Package Selection */}
        {currentStep === "initial" && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Which service package does this child receive?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <button
                onClick={() => setServicePackage("basic")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  servicePackage === "basic"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Home className="mx-auto mb-2 text-indigo-600" />
                <div className="font-medium">Basic Foster Care</div>
              </button>
              <button
                onClick={() => setServicePackage("mental")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  servicePackage === "mental"
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Brain className="mx-auto mb-2 text-indigo-600" />
                <div className="font-medium">Mental & Behavioral Health</div>
              </button>
              <button
                onClick={() => setServicePackage("idd")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  servicePackage === "idd" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Heart className="mx-auto mb-2 text-indigo-600" />
                <div className="font-medium">IDD/Autism</div>
              </button>
              <button
                onClick={() => setServicePackage("both")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  servicePackage === "both" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Activity className="mx-auto mb-2 text-indigo-600" />
                <div className="font-medium">Both MH & IDD</div>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setServicePackage("substance-use")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  servicePackage === "substance-use"
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <FlaskConical className="mx-auto mb-2 text-amber-600" />
                <div className="font-medium">Substance Use</div>
                <div className="text-xs text-gray-500 mt-1">Recovery Support Services</div>
              </button>
              <button
                onClick={() => setServicePackage("stass")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  servicePackage === "stass"
                    ? "border-teal-500 bg-teal-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Search className="mx-auto mb-2 text-teal-600" />
                <div className="font-medium">STASS</div>
                <div className="text-xs text-gray-500 mt-1">Short-Term Assessment</div>
              </button>
              <button
                onClick={() => setServicePackage("tffc")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  servicePackage === "tffc"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Shield className="mx-auto mb-2 text-purple-600" />
                <div className="font-medium">TFFC</div>
                <div className="text-xs text-gray-500 mt-1">Treatment Foster Family Care</div>
              </button>
            </div>
            
            {/* Package-Specific Alerts */}
            {servicePackage === "stass" && (
              <div className="mt-4 p-4 bg-teal-50 border-l-4 border-teal-500 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-teal-600 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-teal-800">STASS: Unknown History Considerations</h4>
                    <p className="text-sm text-teal-700 mt-1">
                      Children in STASS often have limited or unknown histories. Heightened vigilance 
                      and expedited safety planning may be needed. Observe for undisclosed trauma triggers.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {servicePackage === "tffc" && (
              <div className="mt-4 p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <Phone className="text-purple-600 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-purple-800">TFFC: On-Call Therapist Available 24/7</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Treatment Foster Family Care includes access to a TBRI®-trained Licensed Therapist 
                      for crisis consultation. Contact On-Call Schedule for therapist support before escalating.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {servicePackage === "substance-use" && (
              <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <HeartPulse className="text-amber-600 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-amber-800">Substance Use: Recovery-Focused Response</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Approach substance-related crises with non-punitive, recovery-focused framing. 
                      Watch for withdrawal symptoms and relapse risk factors.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* ... existing initial assessment ... */}
          {currentStep === "initial" && !servicePackage && (
            <div className="bg-green-50 rounded-xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
                <CheckCircle className="text-green-600" />
                SAMA Crisis Management Framework
              </h3>
              <p className="text-sm text-green-700">
                Refuge House uses{" "}
                <span className="font-semibold">Satori Alternatives to Managing Aggression (SAMA)</span> as our
                authorized emergency behavior management program. All physical interventions must follow SAMA protocols
                and be performed by SAMA-certified caregivers only.
              </p>
            </div>
          )}

          {currentStep === "initial" && servicePackage && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">What type of situation are you facing?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleInitialSelection("medical")}
                  className="p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-left"
                >
                  <Activity className="text-red-500 mb-2" size={32} />
                  <div className="font-semibold text-lg">Medical Issue</div>
                  <div className="text-sm text-gray-600">
                    Physical injury, illness, medication questions, medical emergency
                  </div>
                  {servicePackage === "substance-use" && (
                    <div className="text-xs text-amber-600 mt-1 font-medium">
                      ⚠️ Includes withdrawal symptom assessment
                    </div>
                  )}
                </button>
                <button
                  onClick={() => handleInitialSelection("behavioral")}
                  className="p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-left"
                >
                  <AlertCircle className="text-orange-500 mb-2" size={32} />
                  <div className="font-semibold text-lg">Behavioral Crisis</div>
                  <div className="text-sm text-gray-600">Aggression, property destruction, self-harm behaviors</div>
                  <div className="text-xs text-green-600 mt-1 font-medium">✓ Includes TBRI® Assessment</div>
                  {servicePackage === "tffc" && (
                    <div className="text-xs text-purple-600 font-medium">
                      ✓ On-Call Therapist available
                    </div>
                  )}
                </button>
                <button
                  onClick={() => handleInitialSelection("safety")}
                  className="p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-left"
                >
                  <Shield className="text-blue-500 mb-2" size={32} />
                  <div className="font-semibold text-lg">Safety Concern</div>
                  <div className="text-sm text-gray-600">Runaway, abuse/neglect suspicion, environmental danger</div>
                  {servicePackage === "stass" && (
                    <div className="text-xs text-teal-600 mt-1 font-medium">
                      ⚠️ Unknown history - heightened vigilance
                    </div>
                  )}
                </button>
                <button
                  onClick={() => handleInitialSelection("psychiatric")}
                  className="p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all text-left"
                >
                  <Brain className="text-purple-500 mb-2" size={32} />
                  <div className="font-semibold text-lg">Psychiatric Emergency</div>
                  <div className="text-sm text-gray-600">Suicidal thoughts, psychosis, severe mental health crisis</div>
                </button>
                
                {/* Substance Use Specific Option */}
                {servicePackage === "substance-use" && (
                  <button
                    onClick={() => handleInitialSelection("substance")}
                    className="p-6 rounded-lg border-2 border-amber-300 bg-amber-50 hover:border-amber-400 hover:bg-amber-100 transition-all text-left md:col-span-2"
                  >
                    <FlaskConical className="text-amber-600 mb-2" size={32} />
                    <div className="font-semibold text-lg text-amber-800">Substance-Related Crisis</div>
                    <div className="text-sm text-amber-700">
                      Relapse, active use, withdrawal symptoms, overdose risk, recovery support needed
                    </div>
                    <div className="text-xs text-amber-600 mt-1 font-medium">
                      ✓ Recovery-focused non-punitive approach
                    </div>
                  </button>
                )}
                
                {/* STASS Unknown History Option */}
                {servicePackage === "stass" && (
                  <button
                    onClick={() => handleInitialSelection("unknown-history")}
                    className="p-6 rounded-lg border-2 border-teal-300 bg-teal-50 hover:border-teal-400 hover:bg-teal-100 transition-all text-left md:col-span-2"
                  >
                    <Search className="text-teal-600 mb-2" size={32} />
                    <div className="font-semibold text-lg text-teal-800">Unknown History Emergency</div>
                    <div className="text-sm text-teal-700">
                      Unexpected reaction, undisclosed trauma trigger, behavior pattern unclear
                    </div>
                    <div className="text-xs text-teal-600 mt-1 font-medium">
                      ✓ Expedited safety planning included
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}

          {currentStep === "preCrisisAssessment" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Eye className="text-blue-600" />
                Pre-Crisis Recognition Assessment
              </h2>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="text-yellow-600" size={20} />
                  <p className="font-semibold text-yellow-800">Reference Child's ICMP First</p>
                </div>
                <p className="text-sm text-yellow-700">
                  Before proceeding, review this child's{" "}
                  <span className="font-semibold">Individual Crisis Management Plan (ICMP)</span> for:
                </p>
                <ul className="list-disc ml-6 mt-2 text-sm text-yellow-700 space-y-1">
                  <li>Known triggers and warning signs specific to this child</li>
                  <li>Previously effective de-escalation strategies</li>
                  <li>Interventions that may NOT work due to trauma history</li>
                  <li>Medical/psychological factors that influence crisis response</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="font-medium text-blue-800">
                  TBRI® Principle: Understanding triggers helps prevent escalation
                </p>
                <p className="text-sm mt-1">Document what you observed before the crisis began</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Observed Escalation Triggers (check all that apply):</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "Sensory overload",
                      "Transition difficulty",
                      "Unmet physical need",
                      "Fear/perceived threat",
                      "Loss of control feeling",
                      "Anniversary/trauma reminder",
                      "Peer conflict",
                      "Authority challenge",
                    ].map((trigger) => (
                      <label key={trigger} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          className="rounded"
                          onChange={(e) => {
                            const triggers = tbriData.preCrisisAssessment.triggers
                            if (e.target.checked) {
                              setTbriData((prev) => ({
                                ...prev,
                                preCrisisAssessment: {
                                  ...prev.preCrisisAssessment,
                                  triggers: [...triggers, trigger],
                                },
                              }))
                            } else {
                              setTbriData((prev) => ({
                                ...prev,
                                preCrisisAssessment: {
                                  ...prev.preCrisisAssessment,
                                  triggers: triggers.filter((t) => t !== trigger),
                                },
                              }))
                            }
                          }}
                        />
                        <span className="text-sm">{trigger}</span>
                      </label>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Other trigger (specify)..."
                    className="w-full mt-2 p-2 border rounded-lg"
                    value={tbriData.preCrisisAssessment.customTrigger}
                    onChange={(e) =>
                      setTbriData((prev) => ({
                        ...prev,
                        preCrisisAssessment: {
                          ...prev.preCrisisAssessment,
                          customTrigger: e.target.value,
                        },
                      }))
                    }
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Early Warning Signs Observed:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "Changes in breathing",
                      "Facial expression changes",
                      "Body tension/posturing",
                      "Verbal tone changes",
                      "Withdrawal/isolation",
                      "Increased stimming",
                      "Difficulty with eye contact",
                    ].map((sign) => (
                      <label key={sign} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <input
                          type="checkbox"
                          className="rounded"
                          onChange={(e) => {
                            const signs = tbriData.preCrisisAssessment.warningSignsObserved
                            if (e.target.checked) {
                              setTbriData((prev) => ({
                                ...prev,
                                preCrisisAssessment: {
                                  ...prev.preCrisisAssessment,
                                  warningSignsObserved: [...signs, sign],
                                },
                              }))
                            } else {
                              setTbriData((prev) => ({
                                ...prev,
                                preCrisisAssessment: {
                                  ...prev.preCrisisAssessment,
                                  warningSignsObserved: signs.filter((s) => s !== sign),
                                },
                              }))
                            }
                          }}
                        />
                        <span className="text-sm">{sign}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Time between first warning sign and crisis:</h3>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={tbriData.preCrisisAssessment.timeToEscalation}
                    onChange={(e) =>
                      setTbriData((prev) => ({
                        ...prev,
                        preCrisisAssessment: {
                          ...prev.preCrisisAssessment,
                          timeToEscalation: e.target.value,
                        },
                      }))
                    }
                  >
                    <option value="">Select timeframe...</option>
                    <option value="<5 min">Less than 5 minutes</option>
                    <option value="5-15 min">5-15 minutes</option>
                    <option value="15-30 min">15-30 minutes</option>
                    <option value=">30 min">More than 30 minutes</option>
                  </select>
                </div>

                <button
                  onClick={() => handlePreCrisisAssessment(tbriData.preCrisisAssessment)}
                  className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Continue to Crisis Assessment
                </button>
              </div>
            </div>
          )}

          {/* Medical Assessment */}
          {currentStep === "medicalAssessment" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Medical Situation Assessment</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="font-medium">Quick Check: Is the child...</p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Having difficulty breathing?</li>
                  <li>Unconscious or unresponsive?</li>
                  <li>Experiencing severe bleeding?</li>
                  <li>Having a seizure lasting {">"}5 minutes?</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleMedicalAssessment("emergency")}
                  className="p-4 rounded-lg border-2 border-red-300 bg-red-50 hover:bg-red-100 transition-all"
                >
                  <div className="font-semibold text-red-700">Life-Threatening Emergency</div>
                  <div className="text-sm text-red-600 mt-1">Immediate medical intervention needed</div>
                </button>
                <button
                  onClick={() => handleMedicalAssessment("urgent")}
                  className="p-4 rounded-lg border-2 border-orange-300 bg-orange-50 hover:bg-orange-100 transition-all"
                >
                  <div className="font-semibold text-orange-700">Urgent but Not Life-Threatening</div>
                  <div className="text-sm text-orange-600 mt-1">Needs medical guidance soon</div>
                </button>
                <button
                  onClick={() => handleMedicalAssessment("nonurgent")}
                  className="p-4 rounded-lg border-2 border-green-300 bg-green-50 hover:bg-green-100 transition-all"
                >
                  <div className="font-semibold text-green-700">Non-Urgent Medical Question</div>
                  <div className="text-sm text-green-600 mt-1">Can wait for regular hours</div>
                </button>
              </div>
            </div>
          )}

          {currentStep === "tbriInterventions" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Target className="text-green-600" />
                TBRI® De-escalation Strategies
              </h2>

              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <p className="font-semibold text-green-800">Track what you try and how effective it is</p>
                <p className="text-sm mt-1">This data helps identify what works best for this child</p>
              </div>

              {/* Connecting Strategies */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Heart className="text-pink-500" />
                  TBRI® Connecting Strategies
                </h3>
                <div className="space-y-3">
                  {[
                    { key: "healthyTouch", label: "Offered healthy touch (if appropriate)" },
                    { key: "eyeLevel", label: "Got on child's eye level" },
                    { key: "warmTone", label: "Used warm tone and soft voice" },
                    { key: "matchedIntensity", label: "Matched child's emotional intensity then brought down" },
                    {
                      key: "reflectiveListening",
                      label: "Gave voice to child's emotions ('You seem really frustrated...')",
                    },
                  ].map((strategy) => (
                    <div key={strategy.key} className="flex items-center justify-between p-3 bg-pink-50 rounded">
                      <span className="text-sm font-medium">{strategy.label}</span>
                      <select
                        className="ml-4 p-1 border rounded text-sm"
                        onChange={(e) => handleTbriIntervention("connecting", strategy.key, e.target.value)}
                      >
                        <option value="">Not tried</option>
                        <option value="helped">Helped</option>
                        <option value="no-change">No change</option>
                        <option value="escalated">Escalated</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Empowering Strategies */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Shield className="text-blue-500" />
                  TBRI® Empowering Strategies
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      key: "sensorySupport",
                      label: "Offered sensory support (weighted blanket, fidget, music, movement)",
                    },
                    { key: "physicalNeeds", label: "Addressed physical needs (snack, drink, rest, movement)" },
                    { key: "offeredChoices", label: "Offered choices (felt safety)" },
                    {
                      key: "environmentalMod",
                      label: "Created environmental modification (dimmed lights, reduced noise, moved location)",
                    },
                  ].map((strategy) => (
                    <div key={strategy.key} className="flex items-center justify-between p-3 bg-blue-50 rounded">
                      <span className="text-sm font-medium">{strategy.label}</span>
                      <select
                        className="ml-4 p-1 border rounded text-sm"
                        onChange={(e) => handleTbriIntervention("empowering", strategy.key, e.target.value)}
                      >
                        <option value="">Not tried</option>
                        <option value="helped">Helped</option>
                        <option value="no-change">No change</option>
                        <option value="escalated">Escalated</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Correcting Strategies */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <CheckCircle className="text-green-500" />
                  TBRI® Correcting Strategies
                </h3>
                <div className="space-y-3">
                  {[
                    { key: "compromise", label: "Offered compromise ('Let's try...')" },
                    { key: "redo", label: "Used 're-do' opportunity" },
                    { key: "timeIn", label: "Implemented time-in (stayed present)" },
                  ].map((strategy) => (
                    <div key={strategy.key} className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <span className="text-sm font-medium">{strategy.label}</span>
                      <select
                        className="ml-4 p-1 border rounded text-sm"
                        onChange={(e) => handleTbriIntervention("correcting", strategy.key, e.target.value)}
                      >
                        <option value="">Not tried</option>
                        <option value="successful">Successful</option>
                        <option value="partial">Partial</option>
                        <option value="refused">Refused</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* TFFC On-Call Therapist Option */}
              {servicePackage === "tffc" && (
                <div className="mt-6 p-4 bg-purple-50 border-2 border-purple-300 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="text-purple-600" size={20} />
                    <h4 className="font-semibold text-purple-800">TFFC: On-Call Therapist Support</h4>
                  </div>
                  <p className="text-sm text-purple-700 mb-3">
                    If interventions aren't working but the situation isn't yet dangerous, 
                    consider calling the On-Call Therapist for real-time clinical guidance.
                  </p>
                  <button
                    onClick={() => {
                      setRecommendation({
                        primary: resources.tffcOnCallTherapist,
                        secondary: resources.refugeHouse,
                        action: "Call On-Call Therapist for clinical consultation",
                        followUp: [
                          "Describe current situation and interventions attempted",
                          "Follow therapist guidance for de-escalation",
                          "Document therapist recommendations",
                          "Therapist may coordinate with Treatment Director",
                          "Continue monitoring - call 911 if danger increases",
                        ],
                      })
                      setCurrentStep("recommendation")
                    }}
                    className="w-full p-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Contact On-Call Therapist Now
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <button
                  onClick={() => setCurrentStep("postCrisisRecovery")}
                  className="p-4 rounded-lg border-2 border-green-400 bg-green-50 hover:bg-green-100 transition-all"
                >
                  <div className="font-semibold text-green-700">Situation Improving</div>
                  <div className="text-sm text-green-600">Continue to recovery phase</div>
                </button>
                <button
                  onClick={() => {
                    const followUpItems = [
                      "Ensure safety of others in home",
                      "Request CIT officer if available",
                      "Notify Refuge House on-call",
                      "Document TBRI interventions attempted",
                    ]
                    if (servicePackage === "tffc") {
                      followUpItems.push("Contact On-Call Therapist for debrief after emergency")
                    }
                    setRecommendation({
                      primary: resources.emergency,
                      secondary: servicePackage === "tffc" ? resources.tffcOnCallTherapist : resources.refugeHouse,
                      action: "Call 911 - situation unsafe",
                      followUp: followUpItems,
                    })
                    setCurrentStep("postCrisisDocumentation")
                  }}
                  className="p-4 rounded-lg border-2 border-red-400 bg-red-50 hover:bg-red-100 transition-all"
                >
                  <div className="font-semibold text-red-700">Not Working - Escalating</div>
                  <div className="text-sm text-red-600">Safety concern increasing</div>
                </button>
              </div>
            </div>
          )}

          {currentStep === "postCrisisRecovery" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="text-purple-600" />
                Post-Crisis TBRI® Restoration
              </h2>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <p className="font-semibold text-purple-800">TBRI® Focus: Repair and restore the relationship</p>
                <p className="text-sm mt-1">Document recovery process and child's insight development</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Time to regulation:</h3>
                  <select
                    className="w-full p-2 border rounded-lg"
                    value={tbriData.postCrisisRecovery.timeToRegulation}
                    onChange={(e) =>
                      setTbriData((prev) => ({
                        ...prev,
                        postCrisisRecovery: {
                          ...prev.postCrisisRecovery,
                          timeToRegulation: e.target.value,
                        },
                      }))
                    }
                  >
                    <option value="">Select timeframe...</option>
                    <option value="<30 min">Less than 30 minutes</option>
                    <option value="30-60 min">30-60 minutes</option>
                    <option value="1-2 hrs">1-2 hours</option>
                    <option value=">2 hrs">More than 2 hours</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Recovery activities used (check all that apply):</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      "Nurture through healthy touch (when regulated)",
                      "Provided hydration/snack",
                      "Engaged in rhythmic activity (walk, rocking, music)",
                      "Processed event when calm (not lecturing)",
                      "Practiced success through re-do",
                      "Restored relationship through play/connection",
                      "Identified trigger for future planning",
                    ].map((activity) => (
                      <label key={activity} className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                        <input
                          type="checkbox"
                          className="rounded"
                          onChange={(e) => {
                            const activities = tbriData.postCrisisRecovery.recoveryActivities
                            if (e.target.checked) {
                              setTbriData((prev) => ({
                                ...prev,
                                postCrisisRecovery: {
                                  ...prev.postCrisisRecovery,
                                  recoveryActivities: [...activities, activity],
                                },
                              }))
                            } else {
                              setTbriData((prev) => ({
                                ...prev,
                                postCrisisRecovery: {
                                  ...prev.postCrisisRecovery,
                                  recoveryActivities: activities.filter((a) => a !== activity),
                                },
                              }))
                            }
                          }}
                        />
                        <span className="text-sm">{activity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Child's insight level:</h3>
                  <div className="space-y-2">
                    {[
                      "Able to identify trigger",
                      "Able to identify feelings",
                      "Able to identify alternative responses",
                      "Not yet able to process",
                      "Refused to discuss",
                    ].map((level) => (
                      <label key={level} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="insightLevel"
                          value={level}
                          onChange={(e) =>
                            setTbriData((prev) => ({
                              ...prev,
                              postCrisisRecovery: {
                                ...prev.postCrisisRecovery,
                                childInsightLevel: e.target.value,
                              },
                            }))
                          }
                        />
                        <span className="text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Safety plan adjustments made:</h3>
                  <textarea
                    className="w-full p-3 border rounded-lg"
                    rows={3}
                    placeholder="Document environmental, relational, and sensory modifications for future prevention..."
                    value={tbriData.postCrisisRecovery.safetyPlanAdjustments}
                    onChange={(e) =>
                      setTbriData((prev) => ({
                        ...prev,
                        postCrisisRecovery: {
                          ...prev.postCrisisRecovery,
                          safetyPlanAdjustments: e.target.value,
                        },
                      }))
                    }
                  />
                </div>

                <button
                  onClick={() => {
                    setRecommendation({
                      primary: resources.refugeHouse,
                      secondary: null,
                      action: "Crisis resolved with TBRI® restoration completed",
                      followUp: [
                        "Document all TBRI interventions and effectiveness in Radius",
                        "Share successful strategies with treatment team",
                        "Update behavior support plan based on insights",
                        "Schedule team meeting if patterns emerge",
                        "Celebrate successful regulation and repair",
                      ],
                    })
                    setCurrentStep("recommendation")
                  }}
                  className="w-full p-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Complete Recovery Documentation
                </button>
              </div>
            </div>
          )}

          {currentStep === "postCrisisDocumentation" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="text-red-600" />
                Post-Crisis Documentation
              </h2>

              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="font-semibold text-red-800">Emergency Response Complete</p>
                <p className="text-sm mt-1">
                  Document TBRI interventions attempted and regulatory compliance information
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">Trauma-Informed Narrative:</h3>
                  <div className="bg-blue-50 p-3 rounded-lg mb-2">
                    <p className="text-sm font-medium text-blue-800">Consider trauma-informed language:</p>
                    <div className="text-xs mt-1 space-y-1">
                      <p>• What need might the behavior be communicating?</p>
                      <p>• What fear might be driving this response?</p>
                      <p>• What past experience might this be triggering?</p>
                    </div>
                  </div>
                  <textarea
                    className="w-full p-3 border rounded-lg"
                    rows={4}
                    placeholder="Describe the incident using trauma-informed language. Focus on the child's internal experience and needs rather than just behaviors..."
                    value={tbriData.traumaInformedNotes}
                    onChange={(e) =>
                      setTbriData((prev) => ({
                        ...prev,
                        traumaInformedNotes: e.target.value,
                      }))
                    }
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    <p>
                      Language suggestions: Replace "defiant" → "struggling to regulate" | "manipulative" → "seeking
                      control due to felt safety needs"
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <h4 className="font-semibold text-orange-800 mb-2">Restraint Frequency Check</h4>
                  <p className="text-sm text-orange-700 mb-3">
                    Has this child had 3 or more other restraints in the past 7 days?
                  </p>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 p-2 bg-white rounded border cursor-pointer">
                      <input type="radio" name="restraintFrequency" value="no" className="cursor-pointer" />
                      <span className="text-sm">No</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-white rounded border cursor-pointer">
                      <input type="radio" name="restraintFrequency" value="yes" className="cursor-pointer" />
                      <span className="text-sm font-semibold text-orange-700">Yes - Service Plan Review Required</span>
                    </label>
                  </div>
                  <p className="text-xs text-orange-600 mt-2">
                    If yes, notify case manager that service plan review must be conducted within 30 days per policy
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">TBRI Interventions Attempted:</h4>
                    <div className="text-sm space-y-1">
                      {Object.entries(tbriData.interventionsAttempted).map(([category, interventions]) => (
                        <div key={category}>
                          <p className="font-medium capitalize">{category}:</p>
                          {Object.entries(interventions).map(([intervention, result]) => (
                            <p key={intervention} className="ml-2">
                              • {intervention}: {result}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border-2 border-yellow-400">
                    <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                      <Clock className="text-yellow-600" size={20} />
                      Required Actions Timeline
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                        <div>
                          <p className="font-semibold">Within 2 Hours:</p>
                          <p className="text-gray-700">Call case manager to report restraint use</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                        <div>
                          <p className="font-semibold">Within 24 Hours:</p>
                          <p className="text-gray-700">Complete child processing session</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                        <div>
                          <p className="font-semibold">Within 24 Hours:</p>
                          <p className="text-gray-700">Submit Physical Restraint Form to case manager</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="text-orange-600 mt-0.5 flex-shrink-0" size={16} />
                        <div>
                          <p className="font-semibold text-orange-700">Service Plan Review Trigger:</p>
                          <p className="text-orange-600">
                            If this is 4th+ restraint within 7 days, service plan team review required within 30 days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
                        <div>
                          <p className="font-semibold">15-Minute Observation:</p>
                          <p className="text-gray-700">Monitor child for minimum 15 minutes post-restraint</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TFFC-Specific Documentation */}
                {servicePackage === "tffc" && (
                  <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-300 mt-4">
                    <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                      <Calendar className="text-purple-600" size={20} />
                      TFFC Crisis Pattern Analysis Documentation
                    </h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Per FC-TFFC-01 §13.4: This crisis must be documented for the 60-Day Crisis Pattern Analysis review.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-purple-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Document trigger patterns observed</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-purple-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Note crisis intensity level</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-purple-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Record interventions and effectiveness</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-purple-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Assess impact on step-down readiness</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="text-purple-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Contact On-Call Therapist for clinical debrief</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STASS-Specific Documentation */}
                {servicePackage === "stass" && (
                  <div className="p-4 bg-teal-50 rounded-lg border-2 border-teal-300 mt-4">
                    <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                      <Search className="text-teal-600" size={20} />
                      STASS Assessment Documentation
                    </h4>
                    <p className="text-sm text-teal-700 mb-3">
                      All behavioral observations inform the Service Package Recommendation.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-teal-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Document detailed behavioral observations</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-teal-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Update expedited safety plan within 72 hours</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-teal-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Share observations with assessment team</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Substance Use-Specific Documentation */}
                {servicePackage === "substance-use" && (
                  <div className="p-4 bg-amber-50 rounded-lg border-2 border-amber-300 mt-4">
                    <h4 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                      <HeartPulse className="text-amber-600" size={20} />
                      Substance Use Documentation Guidance
                    </h4>
                    <p className="text-sm text-amber-700 mb-3">
                      Use recovery-focused, non-punitive language in all documentation.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Assess if substance use was a contributing factor</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Update recovery support plan if needed</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="text-amber-600 mt-0.5 flex-shrink-0" size={16} />
                        <span>Notify substance use treatment provider</span>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setCurrentStep("recommendation")}
                  className="w-full p-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Complete Emergency Documentation
                </button>
              </div>
            </div>
          )}

          {/* Behavioral Assessment */}
          {currentStep === "behavioralAssessment" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Behavioral Crisis Assessment</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="font-medium">Current Situation Check:</p>
                <p className="text-sm mt-2">Assess the immediate safety of the child and others in the home.</p>
              </div>

              {/* TFFC On-Call Therapist Alert */}
              {servicePackage === "tffc" && (
                <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="text-purple-600" size={24} />
                    <h3 className="font-semibold text-purple-800">TFFC: On-Call Therapist Available</h3>
                  </div>
                  <p className="text-sm text-purple-700">
                    Treatment Foster Family Care includes 24/7 access to a TBRI®-trained Licensed Therapist. 
                    For escalating situations, consider calling the On-Call Therapist for clinical guidance 
                    before the situation becomes dangerous.
                  </p>
                  <div className="mt-2 p-2 bg-purple-100 rounded text-sm font-medium text-purple-800">
                    Check On-Call Schedule for therapist contact
                  </div>
                </div>
              )}

              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="text-red-600" size={24} />
                  <h3 className="font-semibold text-red-800">SAMA Physical Intervention Guidelines</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-red-700">Short Personal Restraint</p>
                    <ul className="list-disc ml-5 mt-1 space-y-1 text-gray-700">
                      <li>
                        Maximum duration: <span className="font-bold">1 minute</span>
                      </li>
                      <li>External danger prevention only</li>
                      <li>Must end immediately after danger averted</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded">
                    <p className="font-semibold text-red-700">Personal Restraint</p>
                    <ul className="list-disc ml-5 mt-1 space-y-1 text-gray-700">
                      <li>
                        Maximum duration: <span className="font-bold">15 minutes</span>
                      </li>
                      <li>Hug or Elbow-to-Hip containment only</li>
                      <li>SAMA certification required</li>
                      <li>Continuous monitoring mandatory</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-red-100 rounded text-xs">
                  <p className="font-semibold text-red-800">PROHIBITED:</p>
                  <p className="text-red-700">
                    Prone/supine restraints, pressure points, mechanical/chemical restraints, seclusion, any restraint
                    impairing breathing or communication
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleBehavioralAssessment("danger")}
                  className="w-full p-4 rounded-lg border-2 border-red-300 bg-red-50 hover:bg-red-100 transition-all text-left"
                >
                  <div className="font-semibold text-red-700">Immediate Danger</div>
                  <div className="text-sm text-red-600 mt-1">
                    Child is actively harming self/others or destroying property with weapons
                  </div>
                </button>
                <button
                  onClick={() => handleBehavioralAssessment("escalating")}
                  className="w-full p-4 rounded-lg border-2 border-orange-300 bg-orange-50 hover:bg-orange-100 transition-all text-left"
                >
                  <div className="font-semibold text-orange-700">Escalating Situation</div>
                  <div className="text-sm text-orange-600 mt-1">
                    Verbal threats, throwing objects, but can potentially de-escalate
                  </div>
                  {servicePackage === "tffc" && (
                    <div className="text-xs text-purple-600 mt-1">
                      Consider On-Call Therapist consultation
                    </div>
                  )}
                </button>
                <button
                  onClick={() => handleBehavioralAssessment("stable")}
                  className="w-full p-4 rounded-lg border-2 border-yellow-300 bg-yellow-50 hover:bg-yellow-100 transition-all text-left"
                >
                  <div className="font-semibold text-yellow-700">Challenging but Stable</div>
                  <div className="text-sm text-yellow-600 mt-1">
                    Defiance, refusal, verbal aggression but no immediate safety risk
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Psychiatric Assessment */}
          {currentStep === "psychiatricAssessment" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Psychiatric Emergency Assessment</h2>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-4">
                <p className="font-medium">Mental Health Crisis Indicators</p>
                <p className="text-sm mt-2">Select the primary concern you're observing</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => handlePsychiatricAssessment("suicidal")}
                  className="w-full p-4 rounded-lg border-2 border-red-300 bg-red-50 hover:bg-red-100 transition-all text-left"
                >
                  <div className="font-semibold text-red-700">Suicidal Thoughts or Behaviors</div>
                  <div className="text-sm text-red-600 mt-1">Expressing desire to die, self-harm, suicide planning</div>
                </button>
                <button
                  onClick={() => handlePsychiatricAssessment("psychosis")}
                  className="w-full p-4 rounded-lg border-2 border-orange-300 bg-orange-50 hover:bg-orange-100 transition-all text-left"
                >
                  <div className="font-semibold text-orange-700">Psychosis or Severe Disorientation</div>
                  <div className="text-sm text-orange-600 mt-1">
                    Hallucinations, delusions, complete disconnect from reality
                  </div>
                </button>
                <button
                  onClick={() => handlePsychiatricAssessment("anxiety")}
                  className="w-full p-4 rounded-lg border-2 border-yellow-300 bg-yellow-50 hover:bg-yellow-100 transition-all text-left"
                >
                  <div className="font-semibold text-yellow-700">Severe Anxiety or Panic</div>
                  <div className="text-sm text-yellow-600 mt-1">
                    Panic attack, severe anxiety, emotional dysregulation
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Suicide Risk Assessment */}
          {currentStep === "suicideRisk" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Suicide Risk Assessment</h2>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="font-bold text-red-700">Take All Suicidal Statements Seriously</p>
                <p className="text-sm mt-2">Stay with the child. Remain calm and supportive.</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => handleSuicideRisk("immediate")}
                  className="w-full p-4 rounded-lg border-2 border-red-400 bg-red-50 hover:bg-red-100 transition-all text-left"
                >
                  <div className="font-semibold text-red-700">Immediate Risk</div>
                  <div className="text-sm text-red-600 mt-1">
                    Has means available, active attempt, or specific plan with intent
                  </div>
                </button>
                <button
                  onClick={() => handleSuicideRisk("high")}
                  className="w-full p-4 rounded-lg border-2 border-orange-400 bg-orange-50 hover:bg-orange-100 transition-all text-left"
                >
                  <div className="font-semibold text-orange-700">High Risk - No Immediate Means</div>
                  <div className="text-sm text-orange-600 mt-1">
                    Expressing desire to die but no immediate means or active attempt
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Safety Assessment */}
          {currentStep === "safetyAssessment" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Safety Concern Assessment</h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleSafetyAssessment("abuse")}
                  className="w-full p-4 rounded-lg border-2 border-red-300 bg-red-50 hover:bg-red-100 transition-all text-left"
                >
                  <div className="font-semibold text-red-700">Suspected Abuse or Neglect</div>
                  <div className="text-sm text-red-600 mt-1">Signs of abuse, disclosure, or neglect concerns</div>
                </button>
                <button
                  onClick={() => handleSafetyAssessment("runaway")}
                  className="w-full p-4 rounded-lg border-2 border-orange-300 bg-orange-50 hover:bg-orange-100 transition-all text-left"
                >
                  <div className="font-semibold text-orange-700">Runaway or Missing</div>
                  <div className="text-sm text-orange-600 mt-1">Child has left without permission or is missing</div>
                </button>
                <button
                  onClick={() => handleSafetyAssessment("environmental")}
                  className="w-full p-4 rounded-lg border-2 border-yellow-300 bg-yellow-50 hover:bg-yellow-100 transition-all text-left"
                >
                  <div className="font-semibold text-yellow-700">Environmental Safety</div>
                  <div className="text-sm text-yellow-600 mt-1">Home safety concerns, supervision issues</div>
                </button>
              </div>
            </div>
          )}

          {/* Runaway Protocol */}
          {currentStep === "runawayProtocol" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Runaway Protocol</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="font-semibold">Immediate Actions Required:</p>
                <ol className="list-decimal ml-6 mt-2 space-y-2">
                  <li>Search immediate area and contact friends/known locations</li>
                  <li>If not found within 1 hour, call local law enforcement</li>
                  <li>Contact Refuge House on-call immediately</li>
                  <li>Notify DFPS caseworker</li>
                </ol>
              </div>
              <button
                onClick={() => {
                  setRecommendation({
                    primary: resources.refugeHouse,
                    secondary: { number: "911", label: "Local Law Enforcement", icon: Shield, color: "blue" },
                    action: "Follow Runaway Protocol - Call law enforcement and Refuge House",
                    followUp: [
                      "File missing person report with police",
                      "Provide recent photo and description",
                      "Document all search efforts",
                      "Keep phone available for return contact",
                      "Prepare safe environment for return",
                    ],
                  })
                  setCurrentStep("recommendation")
                }}
                className="w-full p-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                Proceed with Runaway Protocol
              </button>
            </div>
          )}

          {/* Medical Non-Emergency */}
          {currentStep === "medicalNonEmergency" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Non-Emergency Medical Guidance</h2>
              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <p className="font-semibold text-green-800">For non-urgent medical needs:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Schedule appointment with primary care physician</li>
                  <li>Use urgent care for minor injuries/illness after hours</li>
                  <li>Document symptoms and timeline</li>
                  <li>Notify case manager next business day</li>
                </ul>
              </div>
              {(servicePackage === "idd" || servicePackage === "mental" || servicePackage === "both") && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800">Package-Specific Note:</p>
                  <p className="text-sm mt-1">
                    The Superior Nurse Line provides comprehensive support for both medical and mental health needs for
                    children in specialized packages
                  </p>
                  <p className="font-semibold text-blue-700 mt-2">1-866-912-6283</p>
                </div>
              )}
              <button
                onClick={() => {
                  setRecommendation({
                    primary: servicePackage === "idd" ? resources.nurseLineIDD : resources.refugeHouse,
                    secondary: null,
                    action: "No immediate action needed - follow standard medical care",
                    followUp: [
                      "Monitor symptoms",
                      "Schedule routine medical appointment if needed",
                      "Update case manager via Radius",
                    ],
                  })
                  setCurrentStep("recommendation")
                }}
                className="w-full p-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                Got it - Continue to Recommendations
              </button>
            </div>
          )}

          {/* Substance Use Assessment - NEW */}
          {currentStep === "substanceAssessment" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <FlaskConical className="text-amber-600" />
                Substance-Related Crisis Assessment
              </h2>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                <div className="flex items-start gap-2">
                  <HeartPulse className="text-amber-600 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-amber-800">Recovery-Focused Approach Required</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Per FC-SU-01: All substance-related interventions must use non-punitive, 
                      recovery-focused framing. Relapse is part of recovery, not failure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setRecommendation({
                      primary: resources.emergency,
                      secondary: resources.refugeHouse,
                      action: "Call 911 - Suspected overdose or medical emergency",
                      followUp: [
                        "Request Narcan/naloxone administration if available and trained",
                        "Stay with youth until emergency services arrive",
                        "Provide substance information to emergency responders",
                        "Notify Refuge House on-call immediately after",
                        "Document without judgment - focus on medical facts",
                        "Prepare for recovery-focused conversation when stable",
                      ],
                    })
                    setCurrentStep("recommendation")
                  }}
                  className="w-full p-4 rounded-lg border-2 border-red-400 bg-red-50 hover:bg-red-100 transition-all text-left"
                >
                  <div className="font-semibold text-red-700">Suspected Overdose</div>
                  <div className="text-sm text-red-600 mt-1">
                    Unresponsive, difficulty breathing, blue lips, pinpoint pupils
                  </div>
                </button>

                <button
                  onClick={() => {
                    setRecommendation({
                      primary: resources.nurseLineIDD,
                      secondary: resources.refugeHouse,
                      action: "Call Superior Nurse Line for withdrawal assessment",
                      followUp: [
                        "Monitor for severe withdrawal symptoms (seizures, hallucinations)",
                        "Follow nurse guidance for symptom management",
                        "Ensure hydration and comfort",
                        "Contact case manager and treatment team",
                        "Update MAT provider if applicable",
                        "Document symptoms in non-judgmental language",
                      ],
                    })
                    setCurrentStep("recommendation")
                  }}
                  className="w-full p-4 rounded-lg border-2 border-orange-400 bg-orange-50 hover:bg-orange-100 transition-all text-left"
                >
                  <div className="font-semibold text-orange-700">Withdrawal Symptoms</div>
                  <div className="text-sm text-orange-600 mt-1">
                    Shaking, sweating, nausea, anxiety, agitation, insomnia
                  </div>
                </button>

                <button
                  onClick={() => {
                    setRecommendation({
                      primary: resources.substanceUseCrisis,
                      secondary: resources.refugeHouse,
                      action: "Connect with SAMHSA Helpline for relapse support",
                      followUp: [
                        "Use non-judgmental, recovery-focused language",
                        "Affirm that relapse is part of recovery for many",
                        "Focus on re-engagement, not punishment",
                        "Contact substance use treatment provider",
                        "Review and adjust recovery support plan",
                        "Schedule therapy session ASAP",
                        "Document relapse circumstances for treatment planning",
                      ],
                    })
                    setCurrentStep("recommendation")
                  }}
                  className="w-full p-4 rounded-lg border-2 border-yellow-400 bg-yellow-50 hover:bg-yellow-100 transition-all text-left"
                >
                  <div className="font-semibold text-yellow-700">Relapse or Active Use</div>
                  <div className="text-sm text-yellow-600 mt-1">
                    Youth has used substances but is medically stable
                  </div>
                </button>

                <button
                  onClick={() => {
                    setRecommendation({
                      primary: resources.refugeHouse,
                      secondary: resources.substanceUseCrisis,
                      action: "Contact Refuge House for recovery support consultation",
                      followUp: [
                        "Listen without judgment",
                        "Validate struggles while supporting recovery",
                        "Engage youth in recovery support activities",
                        "Review coping skills and triggers",
                        "Notify treatment team of increased support needs",
                        "Consider peer support or sponsor connection",
                      ],
                    })
                    setCurrentStep("recommendation")
                  }}
                  className="w-full p-4 rounded-lg border-2 border-green-400 bg-green-50 hover:bg-green-100 transition-all text-left"
                >
                  <div className="font-semibold text-green-700">Craving or Urge Support</div>
                  <div className="text-sm text-green-600 mt-1">
                    Youth expressing strong urges or struggling with cravings
                  </div>
                </button>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Info className="text-blue-600" size={18} />
                  MAT Compliance Check
                </h4>
                <p className="text-sm text-blue-700">
                  If youth is on Medication-Assisted Treatment (MAT), verify compliance status. 
                  MAT non-compliance may indicate relapse risk or barrier to care that needs addressing.
                </p>
              </div>
            </div>
          )}

          {/* STASS Unknown History Assessment - NEW */}
          {currentStep === "unknownHistoryAssessment" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Search className="text-teal-600" />
                Unknown History Crisis Assessment
              </h2>
              
              <div className="bg-teal-50 border-l-4 border-teal-400 p-4 mb-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="text-teal-600 mt-0.5 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-teal-800">STASS: Limited History Available</p>
                    <p className="text-sm text-teal-700 mt-1">
                      Children in Short-Term Assessment often have unknown trauma histories. 
                      Assume potential for undisclosed trauma and proceed with heightened caution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="font-semibold text-yellow-800">First 72 Hours - Enhanced Monitoring Period</p>
                <p className="text-sm text-yellow-700 mt-1">
                  If this child is within first 72 hours of placement, expedited safety planning 
                  and heightened observation are required.
                </p>
              </div>

              <div className="space-y-3 mt-4">
                <button
                  onClick={() => {
                    setRecommendation({
                      primary: resources.emergency,
                      secondary: resources.refugeHouse,
                      action: "Call 911 - Unknown trigger causing dangerous behavior",
                      followUp: [
                        "Do not attempt to restrain unless SAMA-trained and immediate danger",
                        "Clear area of other children and hazards",
                        "Request CIT (Crisis Intervention Team) if available",
                        "Document all behaviors objectively for assessment",
                        "Notify Refuge House on-call immediately",
                        "Prepare detailed incident description for treatment team",
                      ],
                    })
                    setCurrentStep("recommendation")
                  }}
                  className="w-full p-4 rounded-lg border-2 border-red-400 bg-red-50 hover:bg-red-100 transition-all text-left"
                >
                  <div className="font-semibold text-red-700">Severe Unexpected Reaction</div>
                  <div className="text-sm text-red-600 mt-1">
                    Intense aggression, severe dissociation, or danger to self/others with unclear cause
                  </div>
                </button>

                <button
                  onClick={() => setCurrentStep("preCrisisAssessment")}
                  className="w-full p-4 rounded-lg border-2 border-orange-400 bg-orange-50 hover:bg-orange-100 transition-all text-left"
                >
                  <div className="font-semibold text-orange-700">Apparent Trauma Trigger</div>
                  <div className="text-sm text-orange-600 mt-1">
                    Something seems to have triggered a trauma response - needs assessment
                  </div>
                  <div className="text-xs text-green-600 mt-1">→ Continue to TBRI® Assessment</div>
                </button>

                <button
                  onClick={() => {
                    setRecommendation({
                      primary: resources.refugeHouse,
                      secondary: resources.mentalHealthSupport,
                      action: "Contact Refuge House for rapid safety planning consultation",
                      followUp: [
                        "Create or update expedited safety plan within 72 hours",
                        "Document behavioral observations in detail",
                        "Note any patterns, triggers, or calming strategies observed",
                        "Share information with assessment team for service package recommendation",
                        "Maintain heightened supervision until patterns understood",
                        "Use TBRI® proactive strategies for felt safety",
                      ],
                    })
                    setCurrentStep("recommendation")
                  }}
                  className="w-full p-4 rounded-lg border-2 border-yellow-400 bg-yellow-50 hover:bg-yellow-100 transition-all text-left"
                >
                  <div className="font-semibold text-yellow-700">Emerging Pattern Unclear</div>
                  <div className="text-sm text-yellow-600 mt-1">
                    Behaviors are concerning but not immediately dangerous - need guidance
                  </div>
                </button>

                <button
                  onClick={() => {
                    setRecommendation({
                      primary: resources.nurseLineIDD,
                      secondary: resources.refugeHouse,
                      action: "Call Superior Nurse Line for undisclosed medical/health assessment",
                      followUp: [
                        "Describe symptoms/behaviors to nurse",
                        "Ask about potential medical causes for behavior",
                        "Follow nurse guidance for evaluation",
                        "Document for assessment team",
                        "Schedule medical evaluation if recommended",
                      ],
                    })
                    setCurrentStep("recommendation")
                  }}
                  className="w-full p-4 rounded-lg border-2 border-blue-400 bg-blue-50 hover:bg-blue-100 transition-all text-left"
                >
                  <div className="font-semibold text-blue-700">Possible Medical/Physical Cause</div>
                  <div className="text-sm text-blue-600 mt-1">
                    Behaviors may indicate undisclosed medical condition
                  </div>
                </button>
              </div>

              <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                  <FileText className="text-purple-600" size={18} />
                  Assessment Documentation
                </h4>
                <p className="text-sm text-purple-700">
                  All behavioral observations during STASS placement inform the Service Package 
                  Recommendation. Document patterns objectively for the assessment team.
                </p>
              </div>
            </div>
          )}

          {/* Recommendation */}
          {currentStep === "recommendation" && recommendation && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Recommended Action</h2>

              {/* Primary Action */}
              <div
                className={`p-6 rounded-lg border-2 border-${recommendation.primary.color}-400 bg-${recommendation.primary.color}-50`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <recommendation.primary.icon size={32} className={`text-${recommendation.primary.color}-600`} />
                    <div>
                      <div className="font-bold text-xl">{recommendation.action}</div>
                      <div className="text-sm text-gray-600 mt-1">{recommendation.primary.when}</div>
                    </div>
                  </div>
                </div>
                <div
                  className={`text-3xl font-bold text-${recommendation.primary.color}-700 text-center p-4 bg-white rounded-lg`}
                >
                  <div className="text-sm text-gray-500 mb-2">Call Now:</div>
                  {recommendation.primary.number}
                  <div className="text-base font-normal mt-2">{recommendation.primary.label}</div>
                </div>
              </div>

              {/* Secondary Action if applicable */}
              {recommendation.secondary && (
                <div className="p-4 rounded-lg border-2 border-gray-300 bg-gray-50">
                  <div className="font-semibold mb-2">Then Contact:</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <recommendation.secondary.icon
                        size={24}
                        className={`text-${recommendation.secondary.color}-600`}
                      />
                      <span>{recommendation.secondary.label}</span>
                    </div>
                    <div className="font-bold text-lg">{recommendation.secondary.number}</div>
                  </div>
                </div>
              )}

              {/* Follow-up Steps */}
              <div className="p-4 rounded-lg bg-blue-50 border-l-4 border-blue-400">
                <div className="font-semibold text-blue-800 mb-2">Follow-Up Actions:</div>
                <ol className="list-decimal ml-6 space-y-1">
                  {recommendation.followUp.map((step, index) => (
                    <li key={index} className="text-sm">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={goBack}
                  className="flex-1 p-3 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={reset}
                  className="flex-1 p-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                >
                  New Situation
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ... existing footer ... */}
        <div className="bg-white rounded-xl shadow-lg p-4 mt-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-gray-400" />
              <span className="text-gray-600">Available 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500" />
              <span className="text-red-600 font-semibold">Always call 911 in life-threatening emergencies</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-400" />
              <span className="text-gray-600">Document all incidents in Radius</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-green-500" />
              <span className="text-green-600">TBRI® data improves outcomes</span>
            </div>
          </div>
        </div>

        {/* ... existing back button ... */}
        {currentStep !== "initial" && currentStep !== "recommendation" && history.length > 0 && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={goBack}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
            >
              <ChevronRight className="rotate-180" size={20} />
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CrisisDecisionTool
