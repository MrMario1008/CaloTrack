const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const state = {
  profile: null,
  goalCalories: 2000,
  macrosGoal: {
    protein: 100,
    carbs: 250,
    fat: 70,
  },
  meals: [
    {
      id: 1,
      name: 'Greek Yogurt Bowl',
      calories: 360,
      protein: 25,
      carbs: 40,
      fat: 10,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'Chicken Salad',
      calories: 400,
      protein: 30,
      carbs: 20,
      fat: 18,
      createdAt: new Date().toISOString(),
    },
  ],
  exercises: [
    {
      id: 1,
      name: 'Morning walk',
      calories: 120,
      createdAt: new Date().toISOString(),
    },
  ],
  waterIntake: [
    {
      id: 1,
      amount: 600,
      createdAt: new Date().toISOString(),
    },
  ],
  sleepEntries: [],
  routines: [
    {
      id: 1,
      name: 'Stretching',
      duration: 15,
      notes: 'Morning mobility routine',
      createdAt: new Date().toISOString(),
    },
  ],
  weightHistory: [
    {
      date: new Date().toISOString(),
      weight: 72,
    },
  ],
};

function computeTotals() {
  const totals = state.meals.reduce(
    (acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      return acc;
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  totals.burned = state.exercises.reduce((sum, exercise) => sum + exercise.calories, 0);
  totals.water = state.waterIntake.reduce((sum, water) => sum + water.amount, 0);
  totals.routineCount = state.routines.length;
  totals.remaining = Math.max(0, state.goalCalories - totals.calories + totals.burned);
  totals.currentWeight = state.weightHistory[state.weightHistory.length - 1]?.weight ?? 0;
  return totals;
}

function isSameDay(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function trimDailyEntries() {
  const today = new Date();
  state.meals = state.meals.filter((entry) => isSameDay(new Date(entry.createdAt), today));
  state.exercises = state.exercises.filter((entry) => isSameDay(new Date(entry.createdAt), today));
  state.waterIntake = state.waterIntake.filter((entry) => isSameDay(new Date(entry.createdAt), today));
  state.routines = state.routines.filter((entry) => isSameDay(new Date(entry.createdAt), today));
}

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Calories Management API' });
});

app.get('/api/summary', (req, res) => {
  trimDailyEntries();
  const totals = computeTotals();
  res.json({
    profile: state.profile,
    goalCalories: state.goalCalories,
    macrosGoal: state.macrosGoal,
    totals,
    meals: state.meals,
    exercises: state.exercises,
    waterIntake: state.waterIntake,
    sleepEntries: state.sleepEntries,
    routines: state.routines,
    weightHistory: state.weightHistory,
  });
});

app.get('/api/profile', (req, res) => {
  res.json({ profile: state.profile });
});

app.post('/api/profile', (req, res) => {
  const { name, age, weight, goalCalories, macrosGoal } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required.' });
  }

  state.profile = {
    name,
    age: Number(age) || 0,
    weight: Number(weight) || 0,
    goalCalories: Number(goalCalories) || 2000,
    macrosGoal: {
      protein: Number(macrosGoal?.protein) || 100,
      carbs: Number(macrosGoal?.carbs) || 250,
      fat: Number(macrosGoal?.fat) || 70,
    },
  };

  state.goalCalories = state.profile.goalCalories;
  state.macrosGoal = state.profile.macrosGoal;

  res.status(201).json({ message: 'Profile saved.', profile: state.profile });
});

app.post('/api/water', (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ message: 'Water amount is required.' });
  }

  const entry = {
    id: Date.now(),
    amount: Number(amount),
    createdAt: new Date().toISOString(),
  };

  state.waterIntake.unshift(entry);
  res.status(201).json({ message: 'Water intake logged successfully.', entry });
});

app.post('/api/sleep', (req, res) => {
  const { hours, notes } = req.body;
  if (!hours) {
    return res.status(400).json({ message: 'Sleep hours are required.' });
  }

  const entry = {
    id: Date.now(),
    hours: Number(hours),
    notes: notes || '',
    createdAt: new Date().toISOString(),
  };

  state.sleepEntries.unshift(entry);
  res.status(201).json({ message: 'Sleep logged successfully.', entry });
});

app.post('/api/routines', (req, res) => {
  const { name, duration, notes } = req.body;
  if (!name || !duration) {
    return res.status(400).json({ message: 'Routine name and duration are required.' });
  }

  const entry = {
    id: Date.now(),
    name,
    duration: Number(duration),
    notes: notes || '',
    createdAt: new Date().toISOString(),
  };

  state.routines.unshift(entry);
  res.status(201).json({ message: 'Routine saved successfully.', entry });
});

app.post('/api/meals', (req, res) => {
  const { name, calories, protein, carbs, fat } = req.body;
  if (!name || !calories || !protein || !carbs || !fat) {
    return res.status(400).json({ message: 'All meal fields are required.' });
  }

  const meal = {
    id: Date.now(),
    name,
    calories: Number(calories),
    protein: Number(protein),
    carbs: Number(carbs),
    fat: Number(fat),
    createdAt: new Date().toISOString(),
  };

  state.meals.unshift(meal);
  res.status(201).json({ message: 'Meal logged successfully.', meal });
});

app.post('/api/exercises', (req, res) => {
  const { name, calories } = req.body;
  if (!name || !calories) {
    return res.status(400).json({ message: 'Exercise name and calories burned are required.' });
  }

  const exercise = {
    id: Date.now(),
    name,
    calories: Number(calories),
    createdAt: new Date().toISOString(),
  };

  state.exercises.unshift(exercise);
  res.status(201).json({ message: 'Exercise logged successfully.', exercise });
});

app.post('/api/weight', (req, res) => {
  const { weight } = req.body;
  if (!weight) {
    return res.status(400).json({ message: 'Weight value is required.' });
  }

  const record = {
    date: new Date().toISOString(),
    weight: Number(weight),
  };

  state.weightHistory.unshift(record);
  res.status(201).json({ message: 'Weight updated successfully.', record });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
