import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import servicesReducer from './servicesSlice';
import categoryReducer from './categorySlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    services: servicesReducer,
    categories: categoryReducer,
  },
});

export default store;