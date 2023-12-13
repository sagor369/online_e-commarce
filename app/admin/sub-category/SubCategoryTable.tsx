"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteButton from "@/components/adminComponents/DeleteButton/DeleteButton";
import EditButton from "@/components/adminComponents/EditButton/EditButton";
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

const SubCategoryTable = (props: any) => {
  const { isLoading, categories, handleUpdate, handleDelete, update } = props;
  return (
    <div className="bg-white rounded-md border md:w-3/5 max-h-[400px] overflow-auto">
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
              <TableHead>Parent</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories?.map((categoryItem: any) => (
              <TableRow
                key={categoryItem?._id}
                className={`${update === categoryItem?._id && "bg-gray-300 hover:bg-gray-300"} `}
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={categoryItem?.image} />
                    <AvatarFallback>
                      <Image src={PlaceHolderImg} alt="" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
                  {categoryItem?.name}
                </TableCell>
                <TableCell>{categoryItem?.description}</TableCell>
                <TableCell>{categoryItem?.categoryName}</TableCell>
                <TableCell className="text-right flex items-center justify-end gap-2">
                  <span onClick={() => {
                      handleUpdate(categoryItem);
                    }}>
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
                            Delete this "{categoryItem?.name}" category
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              onClick={() => {
                                handleDelete(categoryItem?._id);
                              }}
                              className="bg-[#DB1B1B] hover:bg-red-900 text-white"
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

export default SubCategoryTable;
