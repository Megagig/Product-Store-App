import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:5000/api/v1';

export const useProductStore = create((set, get) => ({
  //product state
  products: [],
  loading: false,
  error: null,

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
