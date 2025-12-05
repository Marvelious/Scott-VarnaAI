// ABOUTME: Main Express server entry point
// ABOUTME: Configures middleware, routes, and database connection

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Complaints Generator API is running' });
});

// API routes
app.get('/api', (req: Request, res: Response) => {
  res.json({
    message: 'Complaints Generator API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      complaints: '/api/complaints',
      generate: '/api/generate',
      platforms: '/api/platforms'
    }
  });
});

// TODO: Add routes
// app.use('/api/complaints', complaintsRouter);
// app.use('/api/generate', generateRouter);
// app.use('/api/platforms', platformsRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
});