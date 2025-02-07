import { create } from 'zustand';
import axios from 'axios';

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
}));
