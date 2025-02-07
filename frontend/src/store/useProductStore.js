import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

// base url will be dynamic depending on the environment
const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000/api/v1' : '';

// const BASE_URL = 'http://localhost:5000/api/v1';

export const useProductStore = create((set, get) => ({
  //product state
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  //form state
  formData: {
    name: '',
    price: '',
    image: '',
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: '', price: '', image: '' } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success('Product added successfully');
      document.getElementById('add_product_modal').close();
    } catch (error) {
      console.log('Error in addProduct function', error);
      toast.error('Something went wrong');
    } finally {
      set({ loading: false });
    }
  },

  //fetch products
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      set({ products: response.data.data, loading: false, error: null });
    } catch (error) {
      if (error.status === 429)
        set({ error: 'Rate limit exceeded', product: [] }); //handle rate limit
      else set({ error: 'Something went wrong', product: [] });
      set({ error: error.message, loading: false });
    }
  },

  //delete product
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      set({ products: get().products.filter((product) => product.id !== id) });
      toast.success('Product deleted successfully');
    } catch (error) {
      console.log('error in deleteProduct', error);
      toast.error('Something went wrong');
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
  //fetch product by id
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data, // pre-fill form with current product data
        error: null,
      });
    } catch (error) {
      console.log('Error in fetchProduct function', error);
      set({ error: 'Something went wrong', currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/products/${id}`, formData);
      set({ currentProduct: response.data.data });
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Something went wrong');
      console.log('Error in updateProduct function', error);
    } finally {
      set({ loading: false });
    }
  },
}));
