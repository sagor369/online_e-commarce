"use client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DeleteButton from "@/components/adminComponents/DeleteButton/DeleteButton";
import EditButton from "@/components/adminComponents/EditButton/EditButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImg } from "../images";
import Image from "next/image";
import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";
import { Loading } from "@/components/adminComponents/Loading/Loading";

const Users = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [dialogShow, setDialogShow] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  //   gett all users
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitLoading(true);
    const updateUser = { name, email, phoneNumber, role };

    fetch(`/api/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSubmitLoading(false);
          setDialogShow(false);
          setUserId("");
          setName("");
          setEmail("");
          setPhoneNumber("");
          toast({
            description: data,
          });
          refetch();
        } else {
          setSubmitLoading(false);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        }
      });
  };

  //   user delete
  const handleDelete = (id: any) => {
    fetch(`/api/users/${id}`, { method: "Delete" })
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

  //   update delete
  const handleUpdate = (user: any) => {
    setDialogShow(true);
    setUserId(user._id);
    setName(user.name);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setRole(user.role);
  };

  return (
    <div className="mt-5 bg-white rounded-md border max-h-[500px] overflow-auto">
      {isLoading ? (
        <Loading />
      ) : users?.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          No Users Found
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: any) => (
              <TableRow key={user?._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user?.image} />
                    <AvatarFallback>
                      <Image src={PlaceHolderImg} alt="" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.phoneNumber}</TableCell>
                <TableCell>{new Date(user?.createdAt).toDateString()}</TableCell>
                <TableCell>{user?.role}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <div>
                    <Dialog>
                      <DialogTrigger>
                        <span
                          onClick={() => {
                            handleUpdate(user);
                          }}
                        >
                          <EditButton />
                        </span>
                      </DialogTrigger>
                      {dialogShow && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="mb-4">
                              Update User
                            </DialogTitle>
                            <DialogDescription>
                              <form onSubmit={handleSubmit}>
                                <Input
                                  placeholder="Name"
                                  className="py-6 outline-none mb-4"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  required
                                />
                                <Input
                                  type="email"
                                  placeholder="Email"
                                  className="py-6 outline-none mb-4"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                                <Input
                                  placeholder="Phone Number"
                                  className="py-6 outline-none mb-4"
                                  value={phoneNumber}
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                  required
                                />
                                <Select
                                  onValueChange={(e) => setRole(e)}
                                  value={role}
                                  required
                                >
                                  <SelectTrigger className="mb-6 outline-none">
                                    <SelectValue placeholder="User Role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={"user"}>User</SelectItem>
                                    <SelectItem value={"admin"}>
                                      Admin
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button
                                  type="submit"
                                  className="text-white w-full"
                                  disabled={submitLoading}
                                >
                                  {submitLoading ? <BtnSpinner /> : "Update"}
                                </Button>
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      )}
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
                            Delete this "{user?.name}" user
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              onClick={() => {
                                handleDelete(user?._id);
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

export default Users;
