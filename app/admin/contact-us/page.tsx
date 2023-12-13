"use client";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
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
import DeleteButton from "@/components/adminComponents/DeleteButton/DeleteButton";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/adminComponents/Loading/Loading";
import { Eye } from "lucide-react";

const Contact = () => {
  // get all contact
  const {
    data: contact,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/contact");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  //   contact delete
  const handleDelete = (id: String) => {
    fetch(`/api/contact/${id}`, { method: "Delete" })
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
      ) : contact?.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          No Contact Found
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contact?.map((item: any) => (
              <TableRow key={item?._id}>
                <TableCell>{`${item?.firstName} ${item?.lastName}`}</TableCell>
                <TableCell>{item?.email}</TableCell>
                <TableCell>{item?.phoneNumber}</TableCell>
                <TableCell>{item?.message.slice(0, 30)}...</TableCell>
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
                            Message
                          </DialogTitle>
                          <DialogDescription>
                            {item?.message}
                          </DialogDescription>
                        </DialogHeader>
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
                            Delete this "{item?.email}" contact
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

export default Contact;
