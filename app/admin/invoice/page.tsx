"use client";
import { Loading } from "@/components/adminComponents/Loading/Loading";
import { Button } from "@/components/ui/button";
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
import { ClipboardEdit, Eye, Printer, Trash2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";

const Invoice = () => {
  const { toast } = useToast();

  // get all invoice
  const {
    data: invoices,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/invoice");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  const handleDelete = (id: String) => {
    fetch(`/api/invoice/${id}`, { method: "Delete" })
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
    <div className="my-8">
      <div className="flex">
        <Link href="/admin/invoice/create-invoice">
          <Button className="text-white flex items-center gap-2">
            <PlusCircle className="w-5" />
            Create Invoice
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-md border mt-8 max-h-[400px] overflow-auto">
        {isLoading ? (
          <Loading />
        ) : invoices?.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px]">
            No Invoice Found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-center">Invoice No</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead className="text-center">Payment</TableHead>
                <TableHead className="text-center">Pay</TableHead>
                <TableHead className="text-center">Items</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices?.map((invoice: any) => (
                <TableRow key={invoice?._id}>
                  <TableCell>{moment(invoice?.date).format("L")}</TableCell>
                  <TableCell className="text-center">
                    {invoice?.invoiceNumber}
                  </TableCell>
                  <TableCell>{invoice?.customerName}</TableCell>
                  <TableCell className="text-center">
                    {invoice?.paymentMethod}
                  </TableCell>
                  <TableCell className="text-center">
                    {invoice?.payAmount}
                  </TableCell>
                  <TableCell className="text-center">
                    {invoice?.items.length}
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-2">
                    <Link href={`/admin/invoice/view-invoice/${invoice?._id}`}>
                    <Printer
                      className="cursor-pointer"
                    />
                    </Link>
                    <Link
                      href={`/admin/invoice/create-invoice/${invoice?._id}`}
                    >
                      <ClipboardEdit className="cursor-pointer text-[#049813]" />
                    </Link>
                    <div>
                      <Dialog>
                        <DialogTrigger>
                          <Trash2 className="text-[#DB1B1B]" />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="mb-4">
                              Are you sure?
                            </DialogTitle>
                            <DialogDescription>
                              Delete this "{invoice?.invoiceNumber}" Invoice
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                type="button"
                                onClick={() => {
                                  handleDelete(invoice?._id);
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
    </div>
  );
};

export default Invoice;
