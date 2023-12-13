"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loading } from "@/components/adminComponents/Loading/Loading";
import DeleteButton from "@/components/adminComponents/DeleteButton/DeleteButton";
import { Eye, IndianRupee } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImg } from "../images";

const Orders = () => {
  //   gett all orders
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/order");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });
  //   gett all products
  const { data: products } = useQuery({
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

  //   gett all users
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  // find product
  const findProductName = (id: String) => {
    const product = products?.find((item: any) => item._id === id);
    const productName = product?.name;
    return productName;
  };
  const findProductImg = (id: String) => {
    const product = products?.find((item: any) => item._id === id);
    const productImg = product?.images[0].url;
    return productImg;
  };

  // find user
  const findUser = (id: String) => {
    const user = users?.find((item: any) => item?._id === id);
    return user || { name: "", email: "" };
  };

  // status change
  const handleStatusChange = (data: any) => {
    fetch(`/api/order/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: data.e }),
    })
      .then((res) => res.json())
      .then((updateData) => {
        if (updateData) {
          toast({
            description: updateData,
          });
        } else {
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        }
      });
  };

  // oreder delete
  const handleDelete = (id: String) => {
    fetch(`/api/order/${id}`, { method: "Delete" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast({ description: data.message });
          refetch();
        } else {
          toast({ variant: "destructive", description: data.message });
        }
      });
  };

  return (
    <div className="bg-white rounded-md border mt-5 max-h-[400px] overflow-auto">
      {isLoading ? (
        <Loading />
      ) : orders?.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          No Orders Found
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell>{findUser(item?.user).name}</TableCell>
                <TableCell>{findUser(item?.user).email}</TableCell>
                <TableCell>
                  {new Date(item?.createdAt).toDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue={item?.status}
                    onValueChange={(e) =>
                      handleStatusChange({ id: item?._id, e })
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={item?.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cart">Cart</SelectItem>
                      <SelectItem value="create">Create</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <div>
                    <Dialog>
                      <DialogTrigger>
                        <Button className="bg-[#049813] hover:bg-[#088014] text-white p-[6px] h-[30px]">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="mb-4">
                            Order Details
                          </DialogTitle>
                          <DialogDescription>
                            <div>
                              <h3 className="font-semibold text-lg mb-2">Products</h3>
                              {item?.product.map((productItem: any) => (
                                <div
                                  key={productItem.productId}
                                  className="mb-2 border-b pb-2 flex items-center gap-5"
                                >
                                  <Avatar>
                                    <AvatarImage
                                      src={findProductImg(
                                        productItem.productId
                                      )}
                                    />
                                    <AvatarFallback>
                                      <Image src={PlaceHolderImg} alt="" />
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p>
                                      {findProductName(productItem.productId)}
                                    </p>
                                    <p className="flex items-center gap-2">
                                      <span className="flex items-center">
                                        Price: <IndianRupee className="w-4" />
                                        {productItem.price}
                                      </span>
                                      <span>
                                        Quantity: {productItem.quantity}
                                      </span>
                                      <span className="flex items-center">
                                        Subtotal:{" "}
                                        <IndianRupee className="w-4" />
                                        {Number(productItem.quantity) *
                                          Number(productItem.price)}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-2">Attachment</h3>
                              <p><span className="font-semibold">Description:</span> {item?.description}</p>
                              <div className="flex items-center gap-2 flex-wrap mb-3 mt-2">
                                {item?.image.map((attachmentImg: any) => (
                                  <Image
                                    src={attachmentImg.url}
                                    alt="attachment"
                                    width={100}
                                    height={100}
                                  />
                                ))}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-2">Delivery Information</h3>
                              <div className="flex items-center flex-wrap gap-2">
                              <span>Name: {item?.deliveryAddress.name}</span>
                                <span>
                                  Phone: {item?.deliveryAddress.phone}
                                </span>
                                <span>
                                  Pincode: {item?.deliveryAddress.pincode}
                                </span>
                                <span>City: {item?.deliveryAddress.city}</span>
                                <span>
                                  State: {item?.deliveryAddress.state}
                                </span>
                                <span>
                                  Address: {item?.deliveryAddress.address}
                                </span>
                              </div>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter></DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div>
                    <Dialog>
                      <DialogTrigger>
                        <DeleteButton />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="mb-4">
                            Are you sure?
                          </DialogTitle>
                          <DialogDescription>
                            Delete this order
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              onClick={() => {
                                handleDelete(item?._id);
                              }}
                              className="bg-[#DB1B1B] hover:bg-red-700 text-white"
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Orders;
