import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:5000/api/v1';

export const useProductStore = create((set, get) => ({
  //product state
  products: [],
  loading: false,
  error: null,

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
}));
