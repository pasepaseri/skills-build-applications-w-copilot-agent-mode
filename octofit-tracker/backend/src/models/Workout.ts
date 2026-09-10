import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, enum: ['cardio', 'strength', 'mobility'], required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);