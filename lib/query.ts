import { QueryClient, useQuery } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000
    }
  }
});

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      return res.json();
    }
  })
}

export function useProductsById(id: number) {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch product");
      }
      return res.json();
    },
    initialData: () => {
      return queryClient.getQueryData<Product[]>(["products"])?.find((p) => p.id === id);
    },
    initialDataUpdatedAt: () => {
      return queryClient.getQueryState(["products"])?.dataUpdatedAt;
    }
  })
}