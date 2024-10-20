import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '@/utils/apiCalling';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ searchQuery, page, limit }, { rejectWithValue }) => {
    try {
      const query = `/products/search?q=${searchQuery ?? ""}&limit=${limit}&skip=${(page - 1) * limit}` 
      const response = await getData(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductsByCatagory = createAsyncThunk(
  'products/fetchProducts',
  async ({ category , page, sortBy , order}, { rejectWithValue }) => {
    try {
      const query = `/products/${category ? "category" + "/" + category : ""}?sortBy=${sortBy}&order=${order}&limit=${10}&skip=${(page - 1) * 10}`
      const response = await getData(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchProductsByShort = createAsyncThunk(
  'products/fetchProducts',
  async ({ sortBy, order , page }, { rejectWithValue }) => {
    try {
      const query = `/products?sortBy=${sortBy}&order=${order}&limit=${10}&skip=${(page - 1) * 10}`
      const response = await getData(query);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const initialState = {
  products: [],
  totalCount: 0,
  currentPage: 1,
  searchQuery: '',
  category: '', // Add filter state for category
  sortBy: '', // Add filter state for sorting
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setProducts: (state) => {
      state.products = [];
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.totalCount = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setPage, setSearchQuery, setCategory, setSortBy, setProducts, resetError } = productsSlice.actions;

export default productsSlice.reducer;
