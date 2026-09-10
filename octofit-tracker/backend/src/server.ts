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
const codespaceName = process.env.CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.use((request, response, next) => {
  const origin = request.headers.origin;
  const allowedOrigin = origin && (
    /^https:\/\/[-a-z0-9]+-5173\.app\.github\.dev$/i.test(origin)
    || origin === 'http://localhost:5173'
  ) ? origin : undefined;

  if (allowedOrigin) {
    response.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    response.setHeader('Vary', 'Origin');
  }
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});

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

app.get('/api/leaderboard/', async (_request, response) => {
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
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

export default app;
