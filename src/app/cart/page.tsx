"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/product";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    tax,
    total,
  } = useCartStore(
    useShallow((s) => ({
      items: s.items,
      updateQuantity: s.updateQuantity,
      removeFromCart: s.removeFromCart,
      clearCart: s.clearCart,
      subtotal: s.subtotal(),
      tax: s.tax(),
      total: s.total(),
    }))
  );

  const decrementStock = useProductStore((s) => s.decrementStock);
  const router = useRouter();

  const handleCheckout = () => {
    items.forEach((item) => decrementStock(item.product.id, item.quantity));
    clearCart();
    toast.success("Order placed successfully!");
    router.push("/");
  };

  if (items.length === 0) {
    return (
      <div className="text-muted-foreground flex flex-col items-center justify-center py-20">
        <ShoppingBag className="mb-4 h-16 w-16" />
        <h2 className="font-heading mb-1 text-xl font-semibold">
          Your cart is empty
        </h2>
        <p className="mb-4 text-sm">Add some products to get started</p>
        <Button variant="outline" onClick={() => router.push("/")}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold">Shopping Cart</h1>
          <p className="text-muted-foreground text-sm">
            {items.length} item{items.length !== 1 && "s"}
          </p>
        </div>
        <Button variant="destructive" size="sm" onClick={clearCart}>
          Clear All
        </Button>
      </div>

      <div className="space-y-3">
        {items.map(({ product, quantity }) => (
          <Card key={product.id} className="animate-fade-in">
            <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  width={64}
                  height={64}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-heading truncate text-sm font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    ${product.price.toFixed(2)} each
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="bg-muted/50 flex items-center gap-2 rounded-lg p-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-background h-8 w-8"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-background h-8 w-8"
                    disabled={quantity >= product.stock}
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-heading w-20 text-right font-bold whitespace-nowrap">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="space-y-3 p-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="font-heading flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button className="mt-2 w-full" size="lg" onClick={handleCheckout}>
            Place Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
