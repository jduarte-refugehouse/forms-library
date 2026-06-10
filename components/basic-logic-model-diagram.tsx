const LogicModel = () => {
  return (
    <div className="flex flex-col p-4 bg-white">
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-4">
        T3C Basic Foster Family Home Support Services Logic Model
      </h1>
      <p className="text-sm text-center mb-6">
        Compliant with T3C Blueprint, Texas Administrative Code Chapter 749, and RCC Requirements
      </p>

      <div className="flex flex-col">
        {/* Agency Mission */}
        <div className="bg-blue-100 p-3 mb-4 rounded-lg">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Agency Mission</h2>
          <p className="text-sm">
            To provide trauma-informed care within a family setting that promotes safety, well-being, and permanency for
            children in Texas foster care
          </p>
        </div>

        {/* Treatment Model - Central element */}
        <div className="bg-yellow-100 p-3 mb-4 rounded-lg border-2 border-yellow-400">
          <h2 className="text-lg font-bold text-yellow-800 mb-2">Evidence-Informed Treatment Model: TBRI®</h2>
          <div className="flex flex-row space-x-4">
            <div className="flex-1 bg-yellow-50 p-2 rounded">
              <h3 className="font-bold text-yellow-700">Connecting Principles</h3>
              <ul className="text-xs list-disc pl-4">
                <li>Building trust</li>
                <li>Providing felt safety</li>
                <li>Supporting attachment</li>
              </ul>
            </div>
            <div className="flex-1 bg-yellow-50 p-2 rounded">
              <h3 className="font-bold text-yellow-700">Empowering Principles</h3>
              <ul className="text-xs list-disc pl-4">
                <li>Meeting physical needs</li>
                <li>Supporting regulation</li>
                <li>Predictable routines</li>
              </ul>
            </div>
            <div className="flex-1 bg-yellow-50 p-2 rounded">
              <h3 className="font-bold text-yellow-700">Correcting Principles</h3>
              <ul className="text-xs list-disc pl-4">
                <li>Proactive strategies</li>
                <li>IDEAL Response©</li>
                <li>Teaching self-regulation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Flow chart from inputs to impact */}
        <div className="flex flex-row space-x-2 text-center">
          {/* Inputs */}
          <div className="flex-1 flex flex-col">
            <div className="bg-green-100 p-3 rounded-lg h-full">
              <h2 className="text-lg font-bold text-green-800 mb-2">INPUTS</h2>
              <ul className="text-xs text-left list-disc pl-4">
                <li>Licensed CPA Administrator</li>
                <li>Program Director</li>
                <li>Case Managers (1:20 ratio)</li>
                <li>Verified foster homes</li>
                <li>Trained foster parents</li>
                <li>Intermittent Alternative Care</li>
                <li>IT systems for data collection</li>
                <li>TBRI® training for staff</li>
              </ul>
            </div>
            <div className="flex justify-center my-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </div>
          </div>

          {/* Activities */}
          <div className="flex-1 flex flex-col">
            <div className="bg-purple-100 p-3 rounded-lg h-full">
              <h2 className="text-lg font-bold text-purple-800 mb-2">ACTIVITIES</h2>
              <ul className="text-xs text-left list-disc pl-4">
                <li>TBRI® Connecting interventions</li>
                <li>TBRI® Empowering strategies</li>
                <li>TBRI® Correcting approaches</li>
                <li>CANS 3.0 Assessments</li>
                <li>Service Planning (90-day Snapshots — RCC contract floor)</li>
                <li>Family engagement</li>
                <li>STAR Health coordination</li>
                <li>Educational advocacy</li>
                <li>Human Trafficking Prevention</li>
              </ul>
            </div>
            <div className="flex justify-center my-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </div>
          </div>

          {/* Outputs */}
          <div className="flex-1 flex flex-col">
            <div className="bg-red-100 p-3 rounded-lg h-full">
              <h2 className="text-lg font-bold text-red-800 mb-2">OUTPUTS</h2>
              <ul className="text-xs text-left list-disc pl-4">
                <li>Number of children served</li>
                <li>Service Plans completed</li>
                <li>CANS 3.0 assessments</li>
                <li>Family outreach documented</li>
                <li>Foster parent training hours</li>
                <li>Intermittent care utilization</li>
                <li>Treatment model fidelity</li>
                <li>Service coordination data</li>
              </ul>
            </div>
            <div className="flex justify-center my-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </div>
          </div>

          {/* Outcomes */}
          <div className="flex-1 flex flex-col">
            <div className="bg-orange-100 p-2 rounded-lg mb-2">
              <h3 className="font-bold text-orange-800">SHORT-TERM</h3>
              <ul className="text-xs text-left list-disc pl-4">
                <li>Improved regulation</li>
                <li>Increased trust</li>
                <li>Decreased fear behaviors</li>
                <li>Placement stability</li>
              </ul>
            </div>
            <div className="bg-orange-100 p-2 rounded-lg mb-2">
              <h3 className="font-bold text-orange-800">INTERMEDIATE</h3>
              <ul className="text-xs text-left list-disc pl-4">
                <li>Enhanced well-being</li>
                <li>Strengthened family connections</li>
                <li>Improved caregiver capacity</li>
              </ul>
            </div>
            <div className="bg-orange-100 p-2 rounded-lg">
              <h3 className="font-bold text-orange-800">LONG-TERM</h3>
              <ul className="text-xs text-left list-disc pl-4">
                <li>Permanency achievement</li>
                <li>Trauma healing</li>
                <li>System impact</li>
              </ul>
            </div>
            <div className="flex justify-center my-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Continuous Quality Improvement Box */}
        <div className="bg-blue-600 text-white p-3 rounded-lg mt-2">
          <h2 className="text-lg font-bold mb-2 text-center">Continuous Quality Improvement Process</h2>
          <div className="flex flex-row space-x-4">
            <div className="flex-1">
              <h3 className="font-bold text-center">Data Collection</h3>
              <ul className="text-xs list-disc pl-4">
                <li>Child outcomes tracking</li>
                <li>Foster home-level analysis</li>
                <li>CANS 3.0 data utilization</li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-center">Program Review</h3>
              <ul className="text-xs list-disc pl-4">
                <li>Service Plan reviews</li>
                <li>Continued stay criteria</li>
                <li>TBRI® fidelity monitoring</li>
              </ul>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-center">Implementation Adjustments</h3>
              <ul className="text-xs list-disc pl-4">
                <li>Service delivery refinement</li>
                <li>Training enhancement</li>
                <li>Resource optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogicModel
