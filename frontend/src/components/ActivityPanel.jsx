function ActivityPanel({
  loading,
  meals,
  exercises,
  waterEntries,
  routines,
  sleepEntries,
  weightHistory,
  formatNumber,
  currentWeight,
  formType,
  setFormType,
  mealForm,
  exerciseForm,
  waterForm,
  routineForm,
  sleepForm,
  weightForm,
  onMealChange,
  onExerciseChange,
  onWaterChange,
  onRoutineChange,
  onSleepChange,
  onWeightChange,
  handleAddMeal,
  handleAddExercise,
  handleAddWater,
  handleAddRoutine,
  handleAddSleep,
  handleUpdateWeight,
}) {
  return (
    <div className="space-y-8">
      <section className="bg-white rounded-3xl shadow-lg p-8 border-t-4 border-primary">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-600">Activity Log</h3>
            <p className="text-sm text-gray-500">Recent meals, workouts, and weight updates.</p>
          </div>
          <div className="rounded-full bg-tertiary px-4 py-2 text-sm font-semibold text-primary">Current weight: {`${formatNumber(currentWeight)} kg`}</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">Meals</h4>
              <button
                type="button"
                onClick={() => setFormType((prev) => (prev === 'meal' ? '' : 'meal'))}
                className="text-sm font-semibold text-primary hover:text-primary/80"
              >
                {formType === 'meal' ? 'Close' : '+ Add'}
              </button>
            </div>

            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-gray-500">Loading meals…</p>
              ) : meals.length === 0 ? (
                <p className="text-sm text-gray-500">No meals logged yet.</p>
              ) : (
                meals.slice(0, 4).map((meal) => (
                  <div key={meal.id} className="rounded-2xl bg-tertiary/80 p-4">
                    <div className="flex justify-between text-sm font-semibold text-gray-700">
                      <span>{meal.name}</span>
                      <span>{formatNumber(meal.calories)} kcal</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {formatNumber(meal.protein)}g protein • {formatNumber(meal.carbs)}g carbs • {formatNumber(meal.fat)}g fat
                    </div>
                  </div>
                ))
              )}
            </div>

            {formType === 'meal' && (
              <form onSubmit={handleAddMeal} className="space-y-4 mt-6">
                {['name', 'calories', 'protein', 'carbs', 'fat'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 capitalize mb-2">{field}</label>
                    <input
                      type={field === 'name' ? 'text' : 'number'}
                      value={mealForm[field]}
                      onChange={(e) => onMealChange(field, e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder={field === 'name' ? 'E.g. Chicken salad' : '0'}
                    />
                  </div>
                ))}
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-2xl font-semibold shadow-md hover:bg-opacity-90 transition">Save meal</button>
              </form>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">Exercises</h4>
              <button
                type="button"
                onClick={() => setFormType((prev) => (prev === 'exercise' ? '' : 'exercise'))}
                className="text-sm font-semibold text-primary hover:text-primary/80"
              >
                {formType === 'exercise' ? 'Close' : '+ Add'}
              </button>
            </div>

            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-gray-500">Loading exercises…</p>
              ) : exercises.length === 0 ? (
                <p className="text-sm text-gray-500">No workouts logged yet.</p>
              ) : (
                exercises.slice(0, 4).map((exercise) => (
                  <div key={exercise.id} className="rounded-2xl bg-tertiary/80 p-4">
                    <div className="flex justify-between text-sm font-semibold text-gray-700">
                      <span>{exercise.name}</span>
                      <span>{formatNumber(exercise.calories)} kcal</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">Added on {new Date(exercise.createdAt).toLocaleDateString()}</div>
                  </div>
                ))
              )}
            </div>

            {formType === 'exercise' && (
              <form onSubmit={handleAddExercise} className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exercise</label>
                  <input
                    type="text"
                    value={exerciseForm.name}
                    onChange={(e) => onExerciseChange('name', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="E.g. Evening run"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Calories burned</label>
                  <input
                    type="number"
                    value={exerciseForm.calories}
                    onChange={(e) => onExerciseChange('calories', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="0"
                  />
                </div>
                <button type="submit" className="w-full bg-secondary text-white py-3 rounded-2xl font-semibold shadow-md hover:bg-opacity-90 transition">Save exercise</button>
              </form>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">Water</h4>
              <button
                type="button"
                onClick={() => setFormType((prev) => (prev === 'water' ? '' : 'water'))}
                className="text-sm font-semibold text-primary hover:text-primary/80"
              >
                {formType === 'water' ? 'Close' : '+ Add'}
              </button>
            </div>

            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-gray-500">Loading hydration…</p>
              ) : waterEntries.length === 0 ? (
                <p className="text-sm text-gray-500">No water logged yet.</p>
              ) : (
                waterEntries.slice(0, 4).map((entry) => (
                  <div key={entry.id} className="rounded-2xl bg-cyan-50 p-4">
                    <div className="flex justify-between text-sm font-semibold text-cyan-700">
                      <span>{formatNumber(entry.amount)} ml</span>
                      <span>{new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {formType === 'water' && (
              <form onSubmit={handleAddWater} className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount of water (ml)</label>
                  <input
                    type="number"
                    value={waterForm}
                    onChange={(e) => onWaterChange(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. 250"
                  />
                </div>
                <button type="submit" className="w-full bg-cyan-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:bg-cyan-700 transition">Save water</button>
              </form>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">Sleep</h4>
              <button
                type="button"
                onClick={() => setFormType((prev) => (prev === 'sleep' ? '' : 'sleep'))}
                className="text-sm font-semibold text-primary hover:text-primary/80"
              >
                {formType === 'sleep' ? 'Close' : '+ Add'}
              </button>
            </div>

            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-gray-500">Loading sleep entries…</p>
              ) : sleepEntries.length === 0 ? (
                <p className="text-sm text-gray-500">No sleep logged yet.</p>
              ) : (
                sleepEntries.slice(0, 4).map((entry) => (
                  <div key={entry.id} className="rounded-2xl bg-indigo-50 p-4">
                    <div className="flex justify-between text-sm font-semibold text-indigo-700">
                      <span>{formatNumber(entry.hours)} hrs</span>
                      <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                    </div>
                    {entry.notes && <div className="mt-2 text-xs text-gray-500">{entry.notes}</div>}
                  </div>
                ))
              )}
            </div>

            {formType === 'sleep' && (
              <form onSubmit={handleAddSleep} className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hours slept</label>
                  <input
                    type="number"
                    value={sleepForm.hours}
                    onChange={(e) => onSleepChange('hours', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. 7.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
                  <textarea
                    value={sleepForm.notes}
                    onChange={(e) => onSleepChange('notes', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    rows={3}
                    placeholder="E.g. Fell asleep quickly"
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:bg-indigo-700 transition">Save sleep</button>
              </form>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">Weight</h4>
              <button
                type="button"
                onClick={() => setFormType((prev) => (prev === 'weight' ? '' : 'weight'))}
                className="text-sm font-semibold text-primary hover:text-primary/80"
              >
                {formType === 'weight' ? 'Close' : '+ Add'}
              </button>
            </div>

            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-gray-500">Loading weight history…</p>
              ) : weightHistory.length === 0 ? (
                <p className="text-sm text-gray-500">No weight logged yet.</p>
              ) : (
                weightHistory.slice(0, 4).map((entry) => (
                  <div key={entry.date || entry.id} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex justify-between text-sm font-semibold text-slate-700">
                      <span>{formatNumber(entry.weight)} kg</span>
                      <span>{new Date(entry.date || entry.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {formType === 'weight' && (
              <form onSubmit={handleUpdateWeight} className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New weight</label>
                  <input
                    type="number"
                    value={weightForm}
                    onChange={(e) => onWeightChange(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="kg"
                  />
                </div>
                <button type="submit" className="w-full border-2 border-quaternary text-quaternary py-3 rounded-2xl font-semibold hover:bg-quaternary hover:text-white transition">Save weight</button>
              </form>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em]">Routines</h4>
              <button
                type="button"
                onClick={() => setFormType((prev) => (prev === 'routine' ? '' : 'routine'))}
                className="text-sm font-semibold text-primary hover:text-primary/80"
              >
                {formType === 'routine' ? 'Close' : '+ Add'}
              </button>
            </div>

            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-gray-500">Loading routines…</p>
              ) : routines.length === 0 ? (
                <p className="text-sm text-gray-500">No routines logged yet.</p>
              ) : (
                routines.slice(0, 4).map((routine) => (
                  <div key={routine.id} className="rounded-2xl bg-emerald-50 p-4">
                    <div className="flex justify-between text-sm font-semibold text-emerald-700">
                      <span>{routine.name}</span>
                      <span>{formatNumber(routine.duration)} min</span>
                    </div>
                    {routine.notes && <div className="mt-2 text-xs text-gray-500">{routine.notes}</div>}
                  </div>
                ))
              )}
            </div>

            {formType === 'routine' && (
              <form onSubmit={handleAddRoutine} className="space-y-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Routine name</label>
                  <input
                    type="text"
                    value={routineForm.name}
                    onChange={(e) => onRoutineChange('name', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="E.g. Morning stretch"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={routineForm.duration}
                    onChange={(e) => onRoutineChange('duration', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g. 15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={routineForm.notes}
                    onChange={(e) => onRoutineChange('notes', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Optional notes"
                    rows={3}
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-2xl font-semibold shadow-md hover:bg-emerald-700 transition">Save routine</button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

export default ActivityPanel;
