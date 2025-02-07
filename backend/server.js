import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import productRoutes from './routes/productRoutes.js';
import { sql } from './config/dbConnect.js';
import { aj } from './lib/arcjet.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Middleware
app.use(cors()); //cors is a middleware that allows or blocks requests based on the origin of the request. It's a security feature to prevent unauthorized access to your server.
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
); //helmet is a security middleware that helps you protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(morgan('dev')); // morgan is a middleware that logs HTTP requests. It's a great tool for debugging and seeing what requests are coming in.
app.use(express.json()); // express.json() is a middleware that parses incoming requests with JSON payloads.

/// apply arcjet rate-limit to all routes
app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1, // specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: 'Too Many Requests' });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: 'Bot access denied' });
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
      return;
    }

    // check for spoofed bots
    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      res.status(403).json({ error: 'Spoofed bot detected' });
      return;
    }

    next();
  } catch (error) {
    console.log('Arcjet error', error);
    next(error);
  }
});

//routes
app.use('/api/v1/products', productRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // server our react app
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

//Initialize Database
async function dbConnect() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`;
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error connecting to database: ', error.message);
  }
}
//start server
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
