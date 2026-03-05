import { create } from "zustand";
import { persist } from "zustand/middleware";

import initialProducts from "@/data/products.json";
import type { Product } from "@/types/product";

interface ProductState {
  products: Product[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  decrementStock: (id: string, qty: number) => void;
  filteredProducts: () => Product[];
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: initialProducts as Product[],
      searchQuery: "",
      setSearchQuery: (q) => set({ searchQuery: q }),
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: crypto.randomUUID() },
          ],
        })),
      updateProduct: (id, data) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      decrementStock: (id, qty) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, stock: Math.max(0, p.stock - qty) } : p
          ),
        })),
      filteredProducts: () => {
        const { products, searchQuery } = get();
        if (!searchQuery.trim()) return products;
        const q = searchQuery.toLowerCase();
        return products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
      },
    }),
    { name: "pos-products" }
  )
);
