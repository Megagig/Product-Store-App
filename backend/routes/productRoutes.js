import express from 'express';
import {
  createProduct,
  getAllProducts,
} from '../controllers/productController.js';

const productRoutes = express.Router();

productRoutes.get('/', getAllProducts);
productRoutes.post('/', createProduct);

export default productRoutes;
