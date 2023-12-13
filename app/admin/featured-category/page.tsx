"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/adminComponents/Loading/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { PlaceHolderImg } from "../images";
import { Switch } from "@/components/ui/switch";

const FeaturedCategory = () => {
  const { toast } = useToast();

  //   gett all categories
  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  const handleFetured = (data: any) => {
    fetch(`/api/category/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify({ isFeatured: data.isFeatured }),
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
        ) : categories?.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px]">
            No Categories Found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Featured</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories?.map((categoryItem: any) => (
                <TableRow key={categoryItem?._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={categoryItem?.image} />
                      <AvatarFallback>
                        <Image src={PlaceHolderImg} alt="category" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {categoryItem?.name}
                  </TableCell>
                  <TableCell>{categoryItem?.description}</TableCell>
                  <TableCell>
                    {categoryItem?.isFeatured}{" "}
                    <Switch
                      defaultChecked={categoryItem?.isFeatured}
                      onCheckedChange={() =>
                        handleFetured({
                          id: categoryItem?._id,
                          isFeatured: !categoryItem?.isFeatured,
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

export default FeaturedCategory;
