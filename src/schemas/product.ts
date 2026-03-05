import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().gt(0, "Price must be greater than 0"),
  stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
  image: z
    .string()
    .min(1, "Image URL is required")
    .url("Please enter a valid URL"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
