import express from 'express';
const app = express();
const port = Number(process.env.PORT) || 8000;
app.use(express.json());
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
app.use((_request, response) => {
    response.status(404).json({ error: 'Route not found' });
});
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`OctoFit Tracker API listening on port ${port}`);
    });
}
export default app;
