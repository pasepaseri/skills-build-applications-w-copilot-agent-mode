import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            Activity.deleteMany({}),
            Leaderboard.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        const users = await User.create([
            { name: 'Maya Chen', email: 'maya.chen@mergington.edu', grade: 10, avatar: 'MC' },
            { name: 'Jordan Rivera', email: 'jordan.rivera@mergington.edu', grade: 11, avatar: 'JR' },
            { name: 'Samir Patel', email: 'samir.patel@mergington.edu', grade: 9, avatar: 'SP' },
            { name: 'Avery Brooks', email: 'avery.brooks@mergington.edu', grade: 12, avatar: 'AB' },
        ]);
        const teams = await Team.create([
            { name: 'Trail Blazers', color: '#1f7a6e', members: [users[0]._id, users[1]._id] },
            { name: 'Pulse Squad', color: '#d97745', members: [users[2]._id, users[3]._id] },
        ]);
        await Activity.create([
            { user: users[0]._id, type: 'running', durationMinutes: 32, points: 64, recordedAt: new Date('2026-08-15') },
            { user: users[1]._id, type: 'strength', durationMinutes: 28, points: 56, recordedAt: new Date('2026-08-16') },
            { user: users[2]._id, type: 'walking', durationMinutes: 45, points: 45, recordedAt: new Date('2026-08-16') },
            { user: users[3]._id, type: 'running', durationMinutes: 25, points: 50, recordedAt: new Date('2026-08-17') },
        ]);
        await Leaderboard.create([
            { user: users[0]._id, team: teams[0]._id, points: 640, rank: 1 },
            { user: users[1]._id, team: teams[0]._id, points: 560, rank: 2 },
            { user: users[3]._id, team: teams[1]._id, points: 510, rank: 3 },
            { user: users[2]._id, team: teams[1]._id, points: 450, rank: 4 },
        ]);
        await Workout.create([
            { title: 'After-School Tempo Run', category: 'cardio', difficulty: 'intermediate', durationMinutes: 30, description: 'A steady run with three short pace intervals.' },
            { title: 'Strong Foundations', category: 'strength', difficulty: 'beginner', durationMinutes: 20, description: 'Bodyweight squats, lunges, push-ups, and planks.' },
            { title: 'Reset and Stretch', category: 'mobility', difficulty: 'beginner', durationMinutes: 15, description: 'Gentle mobility work for hips, shoulders, and back.' },
        ]);
        console.log('Seeded 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
