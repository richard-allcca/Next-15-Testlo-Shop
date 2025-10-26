import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
  getSummaryInfo: () => {
    totalItems: number;
    subTotal: number;
    tax: number;
    total: number;
  };
}

export const useCartStore = create<State>()(
  // Persist is used to save the store in localStorage
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, product) => total + product.quantity, 0);
      },

      // Actions
      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        const productInCartIndex = cart.findIndex(item => item.id === product.id && item.size === product.size);

        if (productInCartIndex < 0) {
          // No existe el producto
          set(() => ({
            cart: [...cart, product]
          }));
        } else {
          // Ya existe el producto
          const updatedCart = [...cart];
          updatedCart[productInCartIndex].quantity += product.quantity;
          set(() => ({
            cart: updatedCart
          }));
        }
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCart = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return item;
        });
        set(() => ({
          cart: updatedCart
        }));
      },
      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();
        // Method confused
        const updatedCart = cart.filter(item => item.id !== product.id || item.size !== product.size);
        // Correct method
        // const updatedCart = cart.filter(item => !(item.id === product.id && item.size === product.size));
        set(() => ({
          cart: updatedCart
        }));
      },
      getSummaryInfo: () => {
        const { cart } = get();
        const taxRate = 0.15;
        const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
        const subTotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);
        const tax = subTotal * taxRate;
        const total = subTotal + tax;
        return {
          totalItems,
          subTotal,
          tax,
          total
        };
      }
    }),
    {
      name: 'shopping-cart', // name of the item in the storage (must be unique)
    }
  )
);