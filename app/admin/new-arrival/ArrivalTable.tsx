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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImg } from "../images";
import Image from "next/image";
import { Loading } from "@/components/adminComponents/Loading/Loading";
import DeleteButton from "@/components/adminComponents/DeleteButton/DeleteButton";
import EditButton from "@/components/adminComponents/EditButton/EditButton";

const ArrivalTable = (props: any) => {
  const { isLoading, arrivals, update, handleUpdate, handleDelete } = props;
  return (
    <div className="bg-white rounded-md border md:w-3/5 max-h-[400px] overflow-auto">
      {isLoading ? (
        <Loading />
      ) : arrivals?.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px]">
          No Arrivals Found
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Min Price</TableHead>
              <TableHead>Max Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {arrivals?.map((arrivalItem: any) => (
              <TableRow
                key={arrivalItem?._id}
                className={`${
                  update === arrivalItem?._id && "bg-gray-300 hover:bg-gray-300"
                } `}
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={arrivalItem?.image} />
                    <AvatarFallback>
                      <Image src={PlaceHolderImg} alt="arrival" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {arrivalItem?.name}
                </TableCell>
                <TableCell>{arrivalItem?.price.min}</TableCell>
                <TableCell>{arrivalItem?.price.max}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <span
                    onClick={() => {
                      handleUpdate(arrivalItem);
                    }}
                  >
                    <EditButton />
                  </span>
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
                            Delete this "{arrivalItem?.name}" arrival
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              onClick={() => {
                                handleDelete(arrivalItem?._id);
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

export default ArrivalTable;
