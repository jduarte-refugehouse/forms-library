const CQICycle = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-white">
      <h2 className="text-xl font-bold text-center mb-6">T3C Basic Foster Family Home Support Services: CQI Cycle</h2>

      <div className="relative w-full max-w-2xl">
        {/* Main circular flow */}
        <div className="relative w-full h-96">
          {/* Plan Quadrant */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-100 rounded-tl-full border-2 border-blue-600 flex items-center justify-center">
            <div className="absolute w-4/5 h-4/5 flex flex-col items-center justify-center -rotate-45 px-2">
              <h3 className="text-lg font-bold text-blue-800 mb-1">PLAN</h3>
              <ul className="text-xs list-disc pl-6 text-blue-900 text-left">
                <li>Review Logic Model</li>
                <li>Set measurable goals</li>
                <li>Develop strategies</li>
              </ul>
            </div>
          </div>

          {/* Do Quadrant */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-100 rounded-tr-full border-2 border-green-600 flex items-center justify-center">
            <div className="absolute w-4/5 h-4/5 flex flex-col items-center justify-center rotate-45 px-2">
              <h3 className="text-lg font-bold text-green-800 mb-1">DO</h3>
              <ul className="text-xs list-disc pl-6 text-green-900 text-left">
                <li>Implement TBRI®</li>
                <li>Collect data</li>
                <li>Document services</li>
              </ul>
            </div>
          </div>

          {/* Study Quadrant */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-100 rounded-br-full border-2 border-purple-600 flex items-center justify-center">
            <div className="absolute w-4/5 h-4/5 flex flex-col items-center justify-center rotate-135 px-2">
              <h3 className="text-lg font-bold text-purple-800 mb-1">STUDY</h3>
              <ul className="text-xs list-disc pl-6 text-purple-900 text-left">
                <li>Analyze data</li>
                <li>Compare to model</li>
                <li>Identify trends</li>
              </ul>
            </div>
          </div>

          {/* Act Quadrant */}
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-orange-100 rounded-bl-full border-2 border-orange-600 flex items-center justify-center">
            <div className="absolute w-4/5 h-4/5 flex flex-col items-center justify-center -rotate-135 px-2">
              <h3 className="text-lg font-bold text-orange-800 mb-1">ACT</h3>
              <ul className="text-xs list-disc pl-6 text-orange-900 text-left">
                <li>Develop improvements</li>
                <li>Adjust approach</li>
                <li>Modify training</li>
              </ul>
            </div>
          </div>

          {/* Center Circle - Logic Model */}
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-yellow-100 rounded-full border-2 border-yellow-600 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-sm font-bold text-yellow-800">TBRI®-Based</h3>
              <h3 className="text-sm font-bold text-yellow-800">Logic Model</h3>
            </div>
          </div>

          {/* Arrows */}
          <div className="absolute inset-0">
            {/* Rotating arrows - simplified representation */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Circular arrow path */}
              <path
                d="M 85,50 A 35,35 0 1,1 50,15 L 50,22 L 60,15 L 50,8 L 50,15 A 35,35 0 1,0 85,50 Z"
                fill="#4B5563"
                className="opacity-75"
              />
            </svg>
          </div>
        </div>

        {/* Timeline labels */}
        <div className="mt-8 grid grid-cols-4 gap-2 text-center">
          <div className="bg-blue-50 p-2 rounded shadow">
            <p className="font-bold text-blue-800 text-sm">Beginning of Quarter</p>
            <p className="text-xs text-blue-700">Program Director, QA Team</p>
          </div>
          <div className="bg-green-50 p-2 rounded shadow">
            <p className="font-bold text-green-800 text-sm">Weeks 1-10</p>
            <p className="text-xs text-green-700">Case Managers, Foster Parents</p>
          </div>
          <div className="bg-purple-50 p-2 rounded shadow">
            <p className="font-bold text-purple-800 text-sm">Weeks 11-12</p>
            <p className="text-xs text-purple-700">QA Coordinator, Program Director</p>
          </div>
          <div className="bg-orange-50 p-2 rounded shadow">
            <p className="font-bold text-orange-800 text-sm">Week 13</p>
            <p className="text-xs text-orange-700">CQI Team</p>
          </div>
        </div>

        {/* Connection to outcomes */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-300">
          <h3 className="text-center font-bold text-gray-700">Continuous Improvement Leads To:</h3>
          <div className="flex justify-between mt-2 text-center">
            <div className="flex-1 p-2">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-800 text-lg">👨‍👩‍👧‍👦</span>
              </div>
              <p className="text-xs mt-1 font-semibold">Family Connections</p>
            </div>
            <div className="flex-1 p-2">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-800 text-lg">🏠</span>
              </div>
              <p className="text-xs mt-1 font-semibold">Placement Stability</p>
            </div>
            <div className="flex-1 p-2">
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-800 text-lg">❤️</span>
              </div>
              <p className="text-xs mt-1 font-semibold">Trauma Healing</p>
            </div>
            <div className="flex-1 p-2">
              <div className="w-12 h-12 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-800 text-lg">🎯</span>
              </div>
              <p className="text-xs mt-1 font-semibold">Permanency Achievement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CQICycle
