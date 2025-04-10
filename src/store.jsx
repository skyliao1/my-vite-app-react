import { configureStore, createSlice } from '@reduxjs/toolkit';

// 用户登录状态切片
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

// 购物车状态切片
const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addToCart: (state, action) => {
      const { productId, product } = action.payload;
      if (state[productId]) {
        state[productId].quantity += 1;
      } else {
        state[productId] = { ...product, quantity: 1 };
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      if (state[productId]) {
        state[productId].quantity -= 1;
        if (state[productId].quantity <= 0) {
          delete state[productId];
        }
      }
    },
  },
});

// 创建 Store
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
  }
});

export const { login, logout } = authSlice.actions;
export const { addToCart, removeFromCart } = cartSlice.actions;

export default store;
