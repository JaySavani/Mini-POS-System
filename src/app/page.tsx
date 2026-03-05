"use client";

import { useState } from "react";

import { Package, Plus } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { ProductCard } from "@/components/product/product-card";
import { ProductFormDialog } from "@/components/product/product-form-dialog";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { useProductStore } from "@/stores/product";

export default function Home() {
  const products = useProductStore(useShallow((s) => s.filteredProducts()));
  const role = useAuthStore(useShallow((s) => s.user?.role));
  const [addOpen, setAddOpen] = useState(false);
  return (
    <>
      <div className="mx-auto my-6 flex max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center lg:px-8">
        <div>
          <h1 className="font-heading text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground text-sm">
            {products.length} items in inventory
          </p>
        </div>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <SearchBar />
          {role === "admin" && (
            <Button
              onClick={() => setAddOpen(true)}
              className="shrink-0 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 py-20 lg:px-8">
          <Package className="mb-3 h-12 w-12" />
          <p className="font-medium">No products found</p>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search
          </p>
        </div>
      ) : (
        <div className="mx-auto mb-6 grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <ProductFormDialog open={addOpen} onOpenChange={setAddOpen} />
    </>
  );
}
