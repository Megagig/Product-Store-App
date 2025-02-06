import { sql } from '../config/dbConnect.js';
export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
    SELECT * FROM products
    ORDER BY created_at DESC
    `;
    console.log('fetched products', products);
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log('error fetching products', error);
    res.status(500).json({ success: false, message: 'Internal Server error' });
  }
};

export const createProduct = async (req, res) => {
  const { name, image, price } = req.body;

  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all the fields' });
  }
  try {
    const newProduct = await sql`
    INSERT INTO products (name, image, price)
    VALUES (${name}, ${image}, ${price})
    RETURNING *
    `;
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log('error creating product', error);
    res.status(500).json({ success: false, message: 'Internal Server error' });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await sql`
    SELECT * FROM products
    WHERE id = ${id}
    `;
    if (product.count === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log('error fetching product', error);
    res.status(500).json({ success: false, message: 'Internal Server error' });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, image, price } = req.body;

  if (!name || !image || !price) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide all the fields' });
  }

  try {
    const updatedProduct = await sql`
    UPDATE products
    SET name = ${name}, image = ${image}, price = ${price}
    WHERE id = ${id}
    RETURNING *
    `;
    if (updatedProduct.count === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: updatedProduct[0] });
  } catch (error) {
    console.log('error updating product', error);
    res.status(500).json({ success: false, message: 'Internal Server error' });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await sql`

    DELETE FROM  products
    WHERE id = ${id}
    RETURNING *
    `;
    if (deletedProduct.count === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log('Error deleting Product', error);
    res.status(500).json({ status: false, message: 'internal server error' });
  }
};
