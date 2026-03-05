import { useState } from "react";

import Image from "next/image";

import { Pencil, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

import { DeleteDialog } from "@/components/product/delete-dialog";
import { ProductFormDialog } from "@/components/product/product-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const role = useAuthStore(useShallow((s) => s.user?.role));
  const addToCart = useCartStore(useShallow((s) => s.addToCart));
  const deleteProduct = useProductStore(useShallow((s) => s.deleteProduct));
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <>
      <Card className="group animate-fade-in flex h-full flex-col gap-0 overflow-hidden pt-0 transition-shadow hover:shadow-md">
        <CardHeader className="p-0">
          <div className="bg-muted relative aspect-square overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
              width={1000}
              height={1000}
            />
            {outOfStock && (
              <div className="bg-background/70 absolute inset-0 flex items-center justify-center">
                <Badge variant="destructive" className="text-sm">
                  Out of Stock
                </Badge>
              </div>
            )}
            {lowStock && !outOfStock && (
              <Badge className="text-accent-foreground absolute top-2 right-2 bg-amber-400">
                Only {product.stock} left
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex-1 space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-heading truncate text-sm font-semibold">
                {product.name}
              </h3>
              <p className="text-muted-foreground truncate text-xs">
                {product.category}
              </p>
            </div>
            <span className="font-heading shrink-0 text-lg font-bold">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-muted-foreground line-clamp-3 text-xs">
            {product.description}
          </p>
        </CardContent>
        <CardFooter className="px-4">
          <div className="flex flex-1 gap-2 pt-1">
            {role === "user" && (
              <Button
                size="sm"
                className="flex-1"
                disabled={outOfStock}
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.name} added to cart`);
                }}
              >
                <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                Add to Cart
              </Button>
            )}
            {role === "admin" && (
              <div className="flex w-full justify-between gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  onClick={() => setEditOpen(true)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  className="flex-1 cursor-pointer"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
      <ProductFormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        product={product}
      />
      <DeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={product.name}
        title="Delete product?"
        onConfirm={() => {
          deleteProduct(product.id);
          toast.success("Product deleted");
        }}
      />
    </>
  );
}
