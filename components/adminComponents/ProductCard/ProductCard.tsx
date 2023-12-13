import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import { IndianRupee, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { PlaceHolderImg } from "@/app/admin/images";

const ProductCard = ({ product, handleDelete }: any) => {
  const { name, price, promoPrice, _id, images } = product;

  return (
    <Card>
      <CardHeader>
        <div className="w-full !h-[250px] flex items-center justify-center overflow-hidden border rounded-md">
          <Image
            src={images?.length > 0 ? images[0].url : PlaceHolderImg}
            alt="product"
            width={200}
            height={200}
          />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-1">{name}</CardDescription>
        <CardTitle>
          {promoPrice > 0 ? (
            <span className="flex items-center gap-2">
              <span className="flex items-center">
                <IndianRupee className="w-5" />
                <del>{price}</del>
              </span>
              <span className="flex items-center">
                <IndianRupee className="w-5" />
                {promoPrice}
              </span>
            </span>
          ) : (
            <span className="flex items-center">
              <IndianRupee className="w-5" />
              {price}
            </span>
          )}
        </CardTitle>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <Link href={`/admin/add-product/${_id}`}>
          <Button className="bg-[#049813] hover:bg-[#088014] text-white">
            <Pencil className="mr-2 h-3 w-3" />
            Edit
          </Button>
        </Link>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-[#DB1B1B] hover:bg-red-700 text-white">
              <Trash2 className="mr-2 h-3 w-3" />
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">Are you sure?</DialogTitle>
              <DialogDescription>
                Delete this "{name}" product
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={() => {
                    handleDelete(_id);
                  }}
                  className="bg-[#DB1B1B] hover:bg-red-700 text-white"
                >
                  Delete
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
