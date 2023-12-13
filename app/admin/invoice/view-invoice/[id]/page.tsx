"use client";
import { InvoiceLogo } from "@/app/admin/images";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/adminComponents/Loading/Loading";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as numberToWords from "number-to-words";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface Item {
  itemName: String;
  quantity: Number;
  unit: Number;
  price: Number;
  discount: Number;
  tax: Number;
}

const ViewInvoice = ({ params }: any) => {
  const { toast } = useToast();
  const { data: invoice, isLoading } = useQuery({
    queryKey: ["invoice"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/invoice/${params.id}`);
        const data = await res.json();
        return data.Invoice;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  const handleCalculation = (index: number, field: keyof Item) => {
    const item = invoice?.items[index];
    const price = item.price;
    const percent = item[field];
    const qty = item.quantity;
    if (!percent) {
      return 0;
    }
    const result = ((Number(price) * Number(percent)) / 100) * Number(qty);
    return result.toFixed(2);
  };

  const handleItemAmount = (index: number) => {
    const item = invoice?.items[index];
    const price = Number(item.price);
    const qty = Number(item.quantity);
    const discount = handleCalculation(index, "discount");
    const tax = handleCalculation(index, "tax");
    const result = price * qty + Number(tax) - Number(discount);
    return result.toFixed(2);
  };

  const totalCalculation = (field: keyof Item) => {
    let total = 0;
    invoice?.items.forEach((item: any) => (total += Number(item[field])));
    return total.toFixed(2);
  };

  const totalAmountCalculation = (field: keyof Item) => {
    let total = 0;
    invoice?.items.forEach(
      (item: any, index: any) =>
        (total += Number(handleCalculation(index, field)))
    );
    return total.toFixed(2);
  };

  const totalAmount = () => {
    let total = 0;
    invoice?.items.forEach(
      (item: any, index: any) => (total += Number(handleItemAmount(index)))
    );
    return total.toFixed(2);
  };

  const convertNumberToWords = (num: number): string => {
    return numberToWords.toWords(num);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const dueAmount = () => {
    return (Number(totalAmount()) - Number(invoice?.payAmount)).toFixed(2);
  };

  return (
    <div className="mt-8">
      {isLoading || (
        <Button
          onClick={handlePrintInvoice}
          className="text-white flex items-center gap-2"
        >
          <Printer className="w-5" />
          Print Invoice
        </Button>
      )}
      <div
        id={`print-content`}
        className="my-8 bg-white p-12 shadow rounded-md"
      >
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold mb-1 text-2xl">Style Print</h4>
                <p>Natidanga, Kolkata, India</p>
                <p>Phone no: 9064743262</p>
                <p>Email: support@styleprint.com</p>
              </div>
              <div>
                <Image
                  src={InvoiceLogo}
                  alt="Style Print"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <h3 className="my-6 text-center text-3xl font-semibold text-primary">
              Invoice
            </h3>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">
                  Bill To: {invoice?.customerName}
                </p>
                <p>Contact No: {invoice?.customerPhone}</p>
                <p>Email: {invoice?.customerEmail}</p>
                <p>Address: {invoice?.customerAddress}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  Date: {moment(invoice?.date).format("L")}
                </p>
                <p className="font-semibold">
                  Invoice No: {invoice?.invoiceNumber}
                </p>
              </div>
            </div>
            <Table className="mt-5">
              <TableHeader>
                <TableRow>
                  <TableHead className="border text-primary font-bold text-center">
                    #
                  </TableHead>
                  <TableHead className="border text-primary font-bold">
                    Item
                  </TableHead>
                  <TableHead className="border text-primary font-bold text-center">
                    Qty
                  </TableHead>
                  <TableHead className="border text-primary font-bold text-center">
                    Unit
                  </TableHead>
                  <TableHead className="border text-primary font-bold text-center">
                    Price
                  </TableHead>
                  <TableHead className="border text-primary font-bold text-center p-0">
                    Discount
                  </TableHead>
                  <TableHead className="border text-primary font-bold text-center p-0">
                    Tax
                  </TableHead>
                  <TableHead className="border text-primary font-bold text-center">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice?.items?.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="border text-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="w-[200px] border">
                      {item?.itemName}
                    </TableCell>
                    <TableCell className="border text-center w-[70px]">
                      {item?.quantity}
                    </TableCell>
                    <TableCell className="border text-center">
                      {item?.unit}
                    </TableCell>
                    <TableCell className="border text-center w-[100px]">
                      {item?.price}
                    </TableCell>
                    <TableCell className="border text-center">
                      {handleCalculation(index, "discount")}
                    </TableCell>
                    <TableCell className="border text-center">
                      {handleCalculation(index, "tax")}
                    </TableCell>
                    <TableCell className="border text-center w-[130px]">
                      {handleItemAmount(index)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2} className="text-right border">
                    Total
                  </TableCell>
                  <TableCell className="border">
                    {totalCalculation("quantity")}
                  </TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border"></TableCell>
                  <TableCell className="border text-center">
                    {totalAmountCalculation("discount")}
                  </TableCell>
                  <TableCell className="border text-center">
                    {totalAmountCalculation("tax")}
                  </TableCell>
                  <TableCell className="border text-center">
                    {totalAmount()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="flex justify-between mt-5">
              <div>
                <p className="font-semibold">Invoice Amount In Words</p>
                <p className="capitalize">
                  {convertNumberToWords(Number(totalAmount()))}
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold">
                  <span className="mr-8">Pay Amount:</span> {invoice?.payAmount}
                </p>
                <p>
                  {Number(dueAmount()) > 0 ? (
                    <p className="text-xl font-semibold text-red-500">
                      <span className="mr-8">Due Amount:</span>
                      {(
                        Number(totalAmount()) - Number(invoice?.payAmount)
                      ).toFixed(2)}
                    </p>
                  ) : (
                    <div className="border-2 border-dashed border-green-700 p-3 text-center text-green-700 rounded-md mt-2">
                      <p>This Invocie Has Been</p>
                      <p className="text-4xl font-bold">Paid</p>
                      <p>Thank You</p>
                    </div>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        @media print {
          body {
            visibility: hidden;
          }
          #print-content,
          #print-content * {
            visibility: visible;
          }
          #print-content {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewInvoice;
