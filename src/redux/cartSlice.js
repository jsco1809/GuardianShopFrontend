import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {
      content: [],
      totalElements: 0
    },
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.content.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.content.push({ ...item, quantity: 1 });
      }
      state.items.totalElements = state.items.content.length;
    },
    removeFromCart: (state, action) => {
      state.items.content = state.items.content.filter(
        (i) => i.id !== action.payload.id
      );

      state.items.totalElements = state.items.content.length;
    },

    clearCart: (state) => {
      state.items = {
        content: [],
        totalElements: 0,
      };
    },
    
    updateCart: (state, action) => {
      const payload = action.payload;
      state.items = {
        content: Array.isArray(payload?.content) ? payload.content : [],
        totalElements: payload?.totalElements || 0
      };
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
