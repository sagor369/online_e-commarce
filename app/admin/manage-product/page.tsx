"use client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/adminComponents/Loading/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { PlaceHolderImg } from "../images";
import { Switch } from "@/components/ui/switch";

const ManageProduct = () => {
  const { toast } = useToast();

  //   gett all products
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  const handleTrending = (data: any) => {
    fetch(`/api/products/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify({ isTrending: data.isTrending }),
    })
      .then((res) => res.json())
      .then((updateData) => {
        if (updateData) {
          toast({
            description: updateData,
          });
          refetch();
        } else {
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        }
      });
  };
  const handlePhotoGift = (data: any) => {
    fetch(`/api/products/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify({ isPhotoGift: data.isPhotoGift }),
    })
      .then((res) => res.json())
      .then((updateData) => {
        if (updateData) {
          toast({
            description: updateData,
          });
          refetch();
        } else {
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        }
      });
  };

  return (
    <div className="my-8">
      <div className="bg-white rounded-md border max-h-[400px] overflow-auto">
        {isLoading ? (
          <Loading />
        ) : products?.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px]">
            No Products Found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Trending</TableHead>
                <TableHead>Photo Gift</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((productItem: any) => (
                <TableRow key={productItem?._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={productItem?.images[0].url} />
                      <AvatarFallback>
                        <Image src={PlaceHolderImg} alt="category" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {productItem?.name}
                  </TableCell>
                  <TableCell>
                    {productItem?.isFeatured}{" "}
                    <Switch
                      defaultChecked={productItem?.isTrending}
                      onCheckedChange={() =>
                        handleTrending({
                          id: productItem?._id,
                          isTrending: !productItem?.isTrending,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {productItem?.isPhotoGift}{" "}
                    <Switch
                      defaultChecked={productItem?.isPhotoGift}
                      onCheckedChange={() =>
                        handlePhotoGift({
                          id: productItem?._id,
                          isPhotoGift: !productItem?.isPhotoGift,
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageProduct;
