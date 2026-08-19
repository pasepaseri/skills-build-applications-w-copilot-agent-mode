import express from 'express';
import mongoose from 'mongoose';
import './config/database.js';
import { Activity } from './models/Activity.js';
import { Leaderboard } from './models/Leaderboard.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
app.use(express.json());
const collections = { Activity, Leaderboard, Team, User, Workout };
app.get('/api', (_request, response) => {
    response.json({
        service: 'octofit-tracker-backend',
        status: 'ok',
        version: '1.0.0',
    });
});
app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', service: 'octofit-tracker-backend' });
});
app.get('/api/users', async (_request, response) => {
    response.json(await User.find().sort({ name: 1 }));
});
app.get('/api/teams', async (_request, response) => {
    response.json(await Team.find().populate('members').sort({ name: 1 }));
});
app.get('/api/activities', async (_request, response) => {
    response.json(await Activity.find().populate('user').sort({ recordedAt: -1 }));
});
app.get('/api/leaderboard', async (_request, response) => {
    response.json(await Leaderboard.find().populate('user team').sort({ rank: 1 }));
});
app.get('/api/workouts', async (_request, response) => {
    response.json(await Workout.find().sort({ title: 1 }));
});
app.get('/api/database-status', (_request, response) => {
    response.json({ database: mongoose.connection.name, status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});
app.use((_request, response) => {
    response.status(404).json({ error: 'Route not found' });
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`OctoFit Tracker API listening on port ${port}`);
    });
}
export default app;
