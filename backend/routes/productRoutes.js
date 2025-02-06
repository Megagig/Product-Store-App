import express from 'express';
import { getProducts } from '../controllers/productController.js';

const productRoutes = express.Router();

productRoutes.get('/', getProducts);

export default productRoutes;
