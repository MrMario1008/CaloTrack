function DashboardSummary({ loading, displayData, data, progress, formatNumber }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-1">
      <div className="bg-white rounded-3xl shadow-lg p-8 border-t-4 border-secondary transform hover:scale-[1.01] transition duration-300">
        <h3 className="text-xl font-bold text-gray-600 mb-4">Calories Remaining</h3>
        <div className="relative mx-auto w-40 h-40 flex items-center justify-center rounded-full border-8 border-secondary mb-4 bg-tertiary">
          <span className="text-4xl font-extrabold text-primary">{loading ? '...' : formatNumber(data.totals.remaining)}</span>
        </div>
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex justify-between">
            <span>Goal</span>
            <span>{formatNumber(displayData.goalCalories)} kcal</span>
          </div>
          <div className="flex justify-between">
            <span>Food eaten</span>
            <span>{formatNumber(data.totals.calories)} kcal</span>
          </div>
          <div className="flex justify-between">
            <span>Burned</span>
            <span>{formatNumber(data.totals.burned)} kcal</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8 border-t-4 border-primary transform hover:scale-[1.01] transition duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-600">Macronutrients</h3>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Daily goal</span>
        </div>
        <div className="space-y-6">
          {['protein', 'carbs', 'fat'].map((macro) => (
            <div key={macro}>
              <div className="flex justify-between text-sm font-semibold mb-2 text-gray-600">
                <span>{macro.charAt(0).toUpperCase() + macro.slice(1)}</span>
                <span>
                  {formatNumber(displayData.totals[macro])} / {formatNumber(displayData.macrosGoal[macro])}g
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-tertiary overflow-hidden">
                <div
                  className={`h-full rounded-full ${macro === 'protein' ? 'bg-primary' : macro === 'carbs' ? 'bg-secondary' : 'bg-quaternary'}`}
                  style={{ width: `${progress[macro]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg p-8 border-t-4 border-cyan-400 transform hover:scale-[1.01] transition duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-600">Hydration & Routines</h3>
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">Realtime</span>
        </div>
        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <span>Water today</span>
            <span className="font-semibold text-cyan-700">{formatNumber(data.totals.water)} ml</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Routine count</span>
            <span className="font-semibold text-emerald-700">{formatNumber(data.totals.routineCount)}</span>
          </div>
          <div className="rounded-3xl bg-cyan-50 p-4 text-sm text-slate-700">
            Log water and routines anytime, and the dashboard updates automatically.
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSummary;
