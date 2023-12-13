"use client";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";
import { useQuery } from "@tanstack/react-query";
import PageLoading from "@/components/adminComponents/PageLoading/PageLoading";

interface Item {
  itemName: String;
  quantity: Number;
  unit: Number;
  price: Number;
  discount: Number;
  tax: Number;
}

const EditInvoice = ({ params }: any) => {
  const { register, handleSubmit } = useForm();
  const { toast } = useToast();
  const router = useRouter();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [paymentType, setPaymentType] = useState("Cash");
  const [payAmount, setPayAmount] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const itemInfo = {
    itemName: "",
    quantity: "",
    unit: "",
    price: "",
    discount: "",
    tax: "",
  };
  const [items, setItems] = useState([itemInfo]);
  const inialValues = { customerName: "", customerPhone: "", customerEmail: "", customerAddress: "" };
  const [defaultValues, setDefaultValues] = useState(inialValues);

  const { isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/invoice/${params.id}`);
        const data = await res.json();
        setDefaultValues(data.Invoice);
        setItems(data.Invoice.items);
        setInvoiceNo(data.Invoice.invoiceNumber);
        setPaymentType(data.Invoice.paymentMethod);
        setPayAmount(data.Invoice.payAmount);
        setDate(data.Invoice.date);
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  const handleInvoice = (data: any) => {
    setSubmitLoading(true);
    const invoice = {
      customerName: data.customerName,
      customerAddress: data.address,
      customerEmail: data.customerEmail,
      customerPhone: data.contactNo,
      payAmount,
      date,
      invoiceNumber: invoiceNo,
      paymentMethod: paymentType,
      items,
    };
    fetch(`/api/invoice/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(invoice),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSubmitLoading(false);
          toast({ description: data });
          router.push("/admin/invoice");
        } else {
          setSubmitLoading(false);
          toast({
            variant: "destructive",
            description: "Something went wrong",
          });
        }
      });
  };

  const handleChange = (index: number, field: keyof Item, value: any) => {
    const item = items[index];
    item[field] = value;
    setItems([...items]);
  };

  const handleCalculation = (index: number, field: keyof Item) => {
    const item = items[index];
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
    const item = items[index];
    const price = Number(item.price);
    const qty = Number(item.quantity);
    const discount = handleCalculation(index, "discount");
    const tax = handleCalculation(index, "tax");
    const result = price * qty + Number(tax) - Number(discount);
    return result.toFixed(2);
  };

  const totalCalculation = (field: keyof Item) => {
    let total = 0;
    items.forEach((item) => (total += Number(item[field])));
    return total.toFixed(2);
  };

  const totalAmountCalculation = (field: keyof Item) => {
    let total = 0;
    items.forEach(
      (item, index) => (total += Number(handleCalculation(index, field)))
    );
    return total.toFixed(2);
  };

  const totalAmount = () => {
    let total = 0;
    items.forEach((item, index) => (total += Number(handleItemAmount(index))));
    return total.toFixed(2);
  };

  const handleItemAdd = () => {
    setItems([...items, itemInfo]);
  };

  const handleItemDelete = (index: number) => {
    if (items.length === 1) {
      return;
    }
    const remainingItems = items.filter((item, i) => i !== index);
    setItems(remainingItems);
  };

  return (
    isLoading ? <div className="flex items-center justify-center h-[300px]">
        <PageLoading />
    </div> : <div className="my-8 p-5 border shadow bg-white rounded-md">
      <h3 className="text-xl mb-5 text-center font-semibold">Update Invoice</h3>
      <form onSubmit={handleSubmit(handleInvoice)}>
        <div className="flex items-center justify-between gap-5 mb-5">
          <div className="w-1/2">
            <Label className="mb-2 block">Invoice No</Label>
            <Input
              placeholder="Invoice No"
              value={invoiceNo}
              className="py-6 outline-none"
              readOnly
            />
          </div>
          <div className="w-1/2">
            <Label className="mb-2 block">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="py-6 outline-none w-full flex justify-start"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? moment(date).format("L") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  required
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-5">
          <div className="md:w-1/2 w-full">
            <Label className="mb-2 block">Customer Name</Label>
            <Input
              placeholder="Name"
              className="py-6 outline-none"
              defaultValue={defaultValues?.customerName}
              {...register("customerName")}
              required
            />
          </div>
          <div className="md:w-1/2 w-full">
            <Label className="mb-2 block">Contact No</Label>
            <Input
              placeholder="Contact No"
              className="py-6 outline-none"
              defaultValue={defaultValues?.customerPhone}
              {...register("contactNo")}
              required
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-5">
          <div className="md:w-1/2 w-full">
            <Label className="mb-2 block">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              defaultValue={defaultValues?.customerEmail}
              className="py-6 outline-none"
              {...register("customerEmail")}
            />
          </div>
          <div className="md:w-1/2 w-full">
            <Label className="mb-2 block">Address</Label>
            <Input
              placeholder="Address"
              className="py-6 outline-none"
              defaultValue={defaultValues?.customerAddress}
              {...register("address")}
              required
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="border">#</TableHead>
              <TableHead className="border">Item</TableHead>
              <TableHead className="border text-center">Qty</TableHead>
              <TableHead className="border text-center">Unit</TableHead>
              <TableHead className="border text-center">Price</TableHead>
              <TableHead className="border text-center p-0">
                <div>Discount</div>
                <div className="flex items-center justify-between">
                  <div className="border w-1/2">%</div>
                  <div className="border w-1/2">Amount</div>
                </div>
              </TableHead>
              <TableHead className="border text-center p-0">
                <div>Tax</div>
                <div className="flex items-center justify-between">
                  <div className="border w-1/2">%</div>
                  <div className="border w-1/2">Amount</div>
                </div>
              </TableHead>
              <TableHead className="border text-center">Amount</TableHead>
              <TableHead className="text-right border"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="border text-center p-0">
                  {index + 1}
                </TableCell>
                <TableCell className="w-[200px] border p-0">
                  <Input
                    value={items[index].itemName}
                    onChange={(e) =>
                      handleChange(index, "itemName", e.target.value)
                    }
                    className="py-1 outline-none"
                  />
                </TableCell>
                <TableCell className="border p-0 w-[70px]">
                  <Input
                    value={items[index].quantity}
                    onChange={(e) =>
                      handleChange(index, "quantity", e.target.value)
                    }
                    className="py-1 outline-none"
                    type="number"
                  />
                </TableCell>
                <TableCell className="border p-0">
                  <Select
                    value={items[index].unit}
                    onValueChange={(e) => handleChange(index, "unit", e)}
                  >
                    <SelectTrigger className="py-1 outline-none">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Pcs">Pcs</SelectItem>
                        <SelectItem value="Box">Box</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="border p-0 w-[100px]">
                  <Input
                    value={items[index].price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    className="py-1 outline-none"
                    type="number"
                  />
                </TableCell>
                <TableCell className="border p-0">
                  <TableCell className="border p-0 w-1/2">
                    <Input
                      value={items[index].discount}
                      onChange={(e) =>
                        handleChange(index, "discount", e.target.value)
                      }
                      className="py-1 outline-none"
                      type="number"
                    />
                  </TableCell>
                  <TableCell className="border p-0 w-1/2">
                    <Input
                      value={handleCalculation(index, "discount")}
                      className="py-1 outline-none text-right"
                      readOnly
                    />
                  </TableCell>
                </TableCell>
                <TableCell className="border p-0">
                  <TableCell className="border p-0 w-1/2">
                    <Input
                      value={items[index].tax}
                      onChange={(e) =>
                        handleChange(index, "tax", e.target.value)
                      }
                      className="py-1 outline-none"
                      type="number"
                    />
                  </TableCell>
                  <TableCell className="border p-0 w-1/2">
                    <Input
                      value={handleCalculation(index, "tax")}
                      className="py-1 outline-none text-right"
                      readOnly
                    />
                  </TableCell>
                </TableCell>
                <TableCell className="border p-0 w-[130px]">
                  <Input
                    value={handleItemAmount(index)}
                    className="py-1 outline-none text-right"
                    readOnly
                  />
                </TableCell>
                <TableCell className="text-right border p-0">
                  <span
                    onClick={() => handleItemDelete(index)}
                    className="flex justify-center"
                  >
                    <X className="cursor-pointer text-[#DB1B1B]" />
                  </span>
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
              <TableCell className="border text-right">
                {totalAmountCalculation("discount")}
              </TableCell>
              <TableCell className="border text-right">
                {totalAmountCalculation("tax")}
              </TableCell>
              <TableCell className="border text-right">
                {totalAmount()}
              </TableCell>
              <TableCell className="border"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex items-start mt-3 justify-between gap-2">
          <span
            onClick={handleItemAdd}
            className="bg-primary text-white rounded-md cursor-pointer p-2 mt-3 w-[100px] flex items-center justify-center"
          >
            Add Item
          </span>
          <div>
            <div className="flex items-center gap-2">
              <Select
                value={paymentType}
                onValueChange={(e) => setPaymentType(e)}
              >
                <SelectTrigger className="py-1 outline-none">
                  <SelectValue placeholder="Payment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                value={payAmount}
                placeholder="Pay Amount"
                onChange={(e) => setPayAmount(e.target.value)}
                className="py-1 outline-none"
                type="number"
              />
            </div>
            <div className="text-right p-5">
              <span className="mr-3">Due Balance:</span>
              {Math.round(Number(totalAmount()) - Number(payAmount))}
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={submitLoading}
          className="text-white w-full mt-5"
        >
          {submitLoading ? <BtnSpinner /> : "Update Create Invoice"}
        </Button>
      </form>
    </div>
  );
};

export default EditInvoice;
