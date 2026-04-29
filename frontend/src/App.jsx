import { useCallback, useEffect, useMemo, useState } from 'react';
import ProfileOnboarding from './components/ProfileOnboarding.jsx';
import TopNav from './components/TopNav.jsx';
import DashboardSummary from './components/DashboardSummary.jsx';
import ActivityPanel from './components/ActivityPanel.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const emptyData = {
  goalCalories: 2000,
  macrosGoal: { protein: 100, carbs: 250, fat: 70 },
  totals: { calories: 0, protein: 0, carbs: 0, fat: 0, burned: 0, remaining: 0, currentWeight: 0, water: 0, routineCount: 0 },
  meals: [],
  exercises: [],
  waterIntake: [],
  routines: [],
  sleepEntries: [],
  weightHistory: [],
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('caloProfile')) || null;
    } catch {
      return null;
    }
  });
  const [profileForm, setProfileForm] = useState({
    name: profile?.name || '',
    age: profile?.age || '',
    weight: profile?.weight || '',
    goalCalories: profile?.goalCalories || 2000,
    proteinGoal: profile?.macrosGoal?.protein || 100,
    carbsGoal: profile?.macrosGoal?.carbs || 250,
    fatGoal: profile?.macrosGoal?.fat || 70,
  });
  const [editProfileMode, setEditProfileMode] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(profile ? 0 : 1);
  const [data, setData] = useState(emptyData);
  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState('');
  const [mealForm, setMealForm] = useState({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  const [exerciseForm, setExerciseForm] = useState({ name: '', calories: '' });
  const [waterForm, setWaterForm] = useState('');
  const [routineForm, setRoutineForm] = useState({ name: '', duration: '', notes: '' });
  const [sleepForm, setSleepForm] = useState({ hours: '', notes: '' });
  const [weightForm, setWeightForm] = useState('');
  const [alert, setAlert] = useState('');
  const [error, setError] = useState('');

  const normalizeSummaryPayload = (payload) => ({
    ...emptyData,
    ...payload,
    totals: {
      ...emptyData.totals,
      ...payload?.totals,
    },
    meals: Array.isArray(payload?.meals) ? payload.meals : [],
    exercises: Array.isArray(payload?.exercises) ? payload.exercises : [],
    waterIntake: Array.isArray(payload?.waterIntake) ? payload.waterIntake : [],
    routines: Array.isArray(payload?.routines) ? payload.routines : [],
    sleepEntries: Array.isArray(payload?.sleepEntries) ? payload.sleepEntries : [],
    weightHistory: Array.isArray(payload?.weightHistory) ? payload.weightHistory : [],
  });

  const loadSummary = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/summary`);
      if (!response.ok) throw new Error('Unable to load summary');

      const payload = await response.json();
      setData(normalizeSummaryPayload(payload));
    } catch {
      setError('Could not connect to backend. Start the API server and reload.');
      setData(emptyData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!profile) return;

    const updateSummary = async () => {
      await loadSummary();
    };

    updateSummary();
  }, [profile, loadSummary]);

  useEffect(() => {
    if (profile) {
      localStorage.setItem('caloProfile', JSON.stringify(profile));
    }
  }, [profile]);

  useEffect(() => {
    const updateSummary = async () => {
      await loadSummary();
    };

    updateSummary();
  }, [loadSummary]);

  const getMillisUntilNextMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0);
    return nextMidnight.getTime() - now.getTime();
  };

  useEffect(() => {
    let timerId;

    const scheduleRefresh = () => {
      timerId = window.setTimeout(async () => {
        await loadSummary();
        scheduleRefresh();
      }, getMillisUntilNextMidnight());
    };

    scheduleRefresh();
    return () => window.clearTimeout(timerId);
  }, [loadSummary]);

  const clearAlerts = () => {
    setAlert('');
    setError('');
  };

  const handleProfileChange = (field, value) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleMealChange = (field, value) => {
    setMealForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleExerciseChange = (field, value) => {
    setExerciseForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleWaterChange = (value) => {
    setWaterForm(value);
  };

  const handleRoutineChange = (field, value) => {
    setRoutineForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSleepChange = (field, value) => {
    setSleepForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleWeightChange = (value) => {
    setWeightForm(value);
  };

  const handleAddMeal = async (event) => {
    event.preventDefault();
    clearAlerts();

    try {
      const response = await fetch(`${API_URL}/api/meals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mealForm),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Could not save meal');

      setAlert('Meal logged successfully.');
      setMealForm({ name: '', calories: '', protein: '', carbs: '', fat: '' });
      setFormType('');
      loadSummary();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddExercise = async (event) => {
    event.preventDefault();
    clearAlerts();

    try {
      const response = await fetch(`${API_URL}/api/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exerciseForm),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Could not save exercise');

      setAlert('Exercise logged successfully.');
      setExerciseForm({ name: '', calories: '' });
      setFormType('');
      loadSummary();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddWater = async (event) => {
    event.preventDefault();
    clearAlerts();

    try {
      const response = await fetch(`${API_URL}/api/water`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: waterForm }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Could not save water intake');

      setAlert('Water intake logged successfully.');
      setWaterForm('');
      setFormType('');
      loadSummary();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddRoutine = async (event) => {
    event.preventDefault();
    clearAlerts();

    try {
      const response = await fetch(`${API_URL}/api/routines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(routineForm),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Could not save routine');

      setAlert('Routine saved successfully.');
      setRoutineForm({ name: '', duration: '', notes: '' });
      setFormType('');
      loadSummary();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddSleep = async (event) => {
    event.preventDefault();
    clearAlerts();

    try {
      const response = await fetch(`${API_URL}/api/sleep`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sleepForm),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Could not save sleep entry');

      setAlert('Sleep logged successfully.');
      setSleepForm({ hours: '', notes: '' });
      setFormType('');
      loadSummary();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateWeight = async (event) => {
    event.preventDefault();
    clearAlerts();

    try {
      const response = await fetch(`${API_URL}/api/weight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight: weightForm }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Could not update weight');

      setAlert('Weight updated successfully.');
      setWeightForm('');
      setFormType('');
      loadSummary();
    } catch (err) {
      setError(err.message);
    }
  };

  const saveProfileToBackend = async (profilePayload) => {
    try {
      const response = await fetch(`${API_URL}/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profilePayload),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Unable to save profile to backend');
      }
    } catch {
      // Backend save is optional; local storage still preserves profile.
    }
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    clearAlerts();

    if (onboardingStep === 1) {
      if (!profileForm.name.trim()) {
        setError('Please enter your name.');
        return;
      }
      setOnboardingStep(2);
      return;
    }

    const cleanProfile = {
      name: profileForm.name.trim(),
      age: Number(profileForm.age) || 0,
      weight: Number(profileForm.weight) || 0,
      goalCalories: Number(profileForm.goalCalories) || 2000,
      macrosGoal: {
        protein: Number(profileForm.proteinGoal) || 100,
        carbs: Number(profileForm.carbsGoal) || 250,
        fat: Number(profileForm.fatGoal) || 70,
      },
    };

    if (!cleanProfile.name) {
      setError('Please enter your name.');
      return;
    }

    setProfile(cleanProfile);
    setEditProfileMode(false);
    setOnboardingStep(0);
    setAlert('Profile saved. Welcome to CaloTrack!');
    await saveProfileToBackend(cleanProfile);
  };

  const displayData = useMemo(
    () => ({
      ...data,
      goalCalories: profile?.goalCalories || data.goalCalories,
      macrosGoal: profile?.macrosGoal || data.macrosGoal,
    }),
    [data, profile]
  );

  const progress = useMemo(() => {
    if (!displayData.macrosGoal) return { protein: 0, carbs: 0, fat: 0 };

    return {
      protein: Math.min(100, Math.round((displayData.totals.protein / displayData.macrosGoal.protein) * 100)),
      carbs: Math.min(100, Math.round((displayData.totals.carbs / displayData.macrosGoal.carbs) * 100)),
      fat: Math.min(100, Math.round((displayData.totals.fat / displayData.macrosGoal.fat) * 100)),
    };
  }, [displayData]);

  const meals = Array.isArray(data.meals) ? data.meals : [];
  const exercises = Array.isArray(data.exercises) ? data.exercises : [];
  const waterEntries = Array.isArray(data.waterIntake) ? data.waterIntake : [];
  const routines = Array.isArray(data.routines) ? data.routines : [];
  const sleepEntries = Array.isArray(data.sleepEntries) ? data.sleepEntries : [];
  const weightHistory = Array.isArray(data.weightHistory) ? data.weightHistory : [];
  const totals = data.totals || emptyData.totals;

  const formatNumber = (value) => Number(value).toLocaleString();
  const currentWeight = loading ? '...' : totals.currentWeight || profile?.weight || 0;
  const userName = profile?.name ? profile.name.split(' ')[0] : 'Alex';

  if (!profile || editProfileMode) {
    return (
      <ProfileOnboarding
        onboardingStep={onboardingStep}
        profileForm={profileForm}
        error={error}
        onProfileChange={handleProfileChange}
        onSubmit={handleProfileSubmit}
        onStepBack={() => setOnboardingStep(1)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-tertiary flex flex-col">
      <TopNav
        mobileMenuOpen={mobileMenuOpen}
        onToggleMenu={() => setMobileMenuOpen((prev) => !prev)}
        onEditProfile={() => {
          setEditProfileMode(true);
          setOnboardingStep(1);
        }}
        userName={userName}
      />

      <main className="flex-grow mx-auto w-full max-w-7xl p-6 md:p-12">
        <header className="mb-10 text-center px-2 sm:px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-2">Welcome Back, {userName}!</h2>
          <p className="text-base sm:text-lg text-quaternary font-medium">Track your meals, exercises, and weight in one place.</p>
        </header>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700 mb-6">
            {error}
          </div>
        )}
        {alert && (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-sm text-green-700 mb-6">
            {alert}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-1">
            <DashboardSummary loading={loading} displayData={displayData} data={data} progress={progress} formatNumber={formatNumber} />
          </div>

          <div className="space-y-8">
            <ActivityPanel
              loading={loading}
              meals={meals}
              exercises={exercises}
              waterEntries={waterEntries}
              routines={routines}
              formatNumber={formatNumber}
              currentWeight={currentWeight}
              formType={formType}
              setFormType={setFormType}
              mealForm={mealForm}
              exerciseForm={exerciseForm}
              waterForm={waterForm}
              routineForm={routineForm}
              sleepForm={sleepForm}
              weightForm={weightForm}
              sleepEntries={sleepEntries}
              weightHistory={weightHistory}
              onMealChange={handleMealChange}
              onExerciseChange={handleExerciseChange}
              onWaterChange={handleWaterChange}
              onRoutineChange={handleRoutineChange}
              onSleepChange={handleSleepChange}
              onWeightChange={handleWeightChange}
              handleAddMeal={handleAddMeal}
              handleAddExercise={handleAddExercise}
              handleAddWater={handleAddWater}
              handleAddRoutine={handleAddRoutine}
              handleAddSleep={handleAddSleep}
              handleUpdateWeight={handleUpdateWeight}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
