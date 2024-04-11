import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productExist = state.cart.some(
        (product) => product.id === action.payload.id
      );

      if (!productExist) {
        state.cart.push(action.payload);
      } else {
        alert("Item Already exists");
      }
    },
    removeProduct: (state, action) => {
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = updatedCart;
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cart.actions;

export default cart.reducer;
