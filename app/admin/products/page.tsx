"use client";
import { Button } from "@/components/ui/button";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import ProductCard from "./../../../components/adminComponents/ProductCard/ProductCard";
import PageLoading from "@/components/adminComponents/PageLoading/PageLoading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const Products = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const { isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
        setAllProducts(data);
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleChange = (e: string) => {
    setCategory(e);
    if (e === "all") {
      setProducts(allProducts);
    } else {
      const filterProducts = allProducts.filter(
        (product: any) => product.category === e
      );
      setProducts(filterProducts);
    }
  };

  //   product delete
  const handleDelete = (id: any) => {
    fetch(`/api/products/${id}`, { method: "Delete" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast({ description: data.message });
          refetch();
        } else {
          toast({ variant: "destructive", description: data.error });
        }
      });
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[70vh]">
          <PageLoading />
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex items-center justify-between gap-2">
            <Link href="/admin/add-product">
              <Button className="text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </Link>
            <Select value={category} onValueChange={(e) => handleChange(e)}>
              <SelectTrigger className="outline-none w-[150px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories?.map((item: any) => (
                  <SelectItem key={item?._id} value={item?._id}>
                    {item?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-5 my-8">
            {products.length === 0 ? (
              <div>No Products Found</div>
            ) : (
              products?.map((product: any) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
