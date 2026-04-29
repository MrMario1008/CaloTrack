function ProfileOnboarding({ onboardingStep, profileForm, error, onProfileChange, onSubmit, onStepBack }) {
  const stepTitle = onboardingStep === 1 ? 'Personal Details' : 'Weight and Calorie Goals';
  const stepSubtitle =
    onboardingStep === 1
      ? 'Start by telling us your name and age.'
      : 'Now add your current weight and nutrition targets.';

  return (
    <div className="min-h-screen bg-tertiary flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl border border-slate-200">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-primary mb-3">{stepTitle}</h1>
            <p className="text-sm text-gray-600">{stepSubtitle}</p>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Step {onboardingStep} of 2
          </div>
        </div>

        {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">{error}</div>}

        <form onSubmit={onSubmit} className="grid gap-4">
          {onboardingStep === 1 ? (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full name</label>
                <input
                  value={profileForm.name}
                  onChange={(e) => onProfileChange('name', e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                  placeholder="Enter your name"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={profileForm.age}
                    onChange={(e) => onProfileChange('age', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                    placeholder="Age"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current weight (kg)</label>
                  <input
                    type="number"
                    value={profileForm.weight}
                    onChange={(e) => onProfileChange('weight', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                    placeholder="Weight"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Daily calories</label>
                  <input
                    type="number"
                    value={profileForm.goalCalories}
                    onChange={(e) => onProfileChange('goalCalories', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                    placeholder="2000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Protein goal</label>
                  <input
                    type="number"
                    value={profileForm.proteinGoal}
                    onChange={(e) => onProfileChange('proteinGoal', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Carb goal</label>
                  <input
                    type="number"
                    value={profileForm.carbsGoal}
                    onChange={(e) => onProfileChange('carbsGoal', e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                    placeholder="250"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Fat goal</label>
                <input
                  type="number"
                  value={profileForm.fatGoal}
                  onChange={(e) => onProfileChange('fatGoal', e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                  placeholder="70"
                />
              </div>
            </>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            {onboardingStep === 2 && (
              <button
                type="button"
                onClick={onStepBack}
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition sm:w-auto"
              >
                Back
              </button>
            )}
            <button type="submit" className="w-full rounded-2xl bg-primary py-3 text-white font-semibold shadow-md hover:bg-primary/90 transition sm:w-auto">
              {onboardingStep === 1 ? 'Continue' : 'Complete setup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileOnboarding;
