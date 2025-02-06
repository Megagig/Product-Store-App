import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); //cors is a middleware that allows or blocks requests based on the origin of the request. It's a security feature to prevent unauthorized access to your server.
app.use(helmet()); //helmet is a security middleware that helps you protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use(morgan('dev')); // morgan is a middleware that logs HTTP requests. It's a great tool for debugging and seeing what requests are coming in.
app.use(express.json()); // express.json() is a middleware that parses incoming requests with JSON payloads.

//routes
app.use('/api/v1/products', productRoutes);

//start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
