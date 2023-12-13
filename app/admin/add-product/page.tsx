"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";
import { useRouter } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddProduct = () => {
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [size, setSize] = useState<any>([]);
  const [inStock, setInStock] = useState(true);
  const { toast } = useToast();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [stateChange, setStateChange] = useState(true);
  const router = useRouter();
  const [editorHtml, setEditorHtml] = useState("");

  const handleSize = (value: string) => {
    if (size.indexOf(value) > -1) {
      const remaining = size.filter((item: string) => item !== value);
      setSize(remaining);
    } else {
      setSize([...size, value]);
    }
  };

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    fetch("/api/subcategory")
      .then((res) => res.json())
      .then((data) => {
        const filterCategories = data.filter(
          (item: any) => item.category === category
        );
        setSubCategories(filterCategories);
      });
  }, [category]);

  // handle image
  const onDrop = (acceptedFiles: any) => {
    setValue("images", [...getValues("images"), ...acceptedFiles]);
  };
  const imageDelete = (lastModified: Number) => {
    const remainingImages = getValues("images").filter(
      (item: any) => item?.lastModified !== lastModified
    );
    setValue("images", remainingImages);
    setStateChange(!stateChange);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleProductAdd = (productData: any) => {
    setSubmitLoading(true);
    let uploadedImages: any[] = [];
    const imgBbKey = process.env.NEXT_PUBLIC_IMG_BB_KEY;
    const picture = productData.images;

    if (picture?.length === 0) {
      setSubmitLoading(false);
      return toast({
        variant: "destructive",
        description: "Image is required",
      });
    }

    const formData = new FormData();
    const url = `https://api.imgbb.com/1/upload?key=${imgBbKey}`;

    for (let i = 0; i < picture.length; i++) {
      formData.append("image", picture[i]);
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          if (imgData.success) {
            uploadedImages.push({ url: imgData.data.url });
            if (i + 1 === picture.length) {
              const product = {
                name: productData.title,
                price: productData.price,
                promoPrice: productData.promoPrice,
                description: editorHtml,
                manufacturer: "Print Style",
                images: uploadedImages,
                category,
                subCategory,
                size,
                inStock,
              };
              fetch("/api/products", {
                method: "POST",
                body: JSON.stringify(product),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success) {
                    setSubmitLoading(false);
                    reset();
                    setInStock(true);
                    setCategory("");
                    setSubCategory("");
                    setSize([]);
                    router.push("/admin/products");
                    toast({ description: data.message });
                  } else {
                    setSubmitLoading(false);
                    toast({
                      variant: "destructive",
                      description: data.message,
                    });
                  }
                });
            }
          } else {
            setSubmitLoading(false);
            toast({
              variant: "destructive",
              description: "Something went wrong",
            });
          }
        });
    }
  };

  return (
    <div className="my-8">
      <div className="bg-white p-5 border rounded-md max-w-[600px] mx-auto">
        <h2 className="font-semibold text-2xl mb-5">Create Product</h2>
        <form onSubmit={handleSubmit(handleProductAdd)}>
          <Label>Product Title</Label>
          <Input
            placeholder="Title"
            {...register("title")}
            required
            className="outline-none mb-3"
          />
          <Label>Description</Label>
          <ReactQuill
            theme="snow"
            value={editorHtml}
            onChange={(e) => setEditorHtml(e)}
            className="mb-3"
          />
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="w-1/2">
              <Label>Category</Label>
              <Select
                value={category}
                onValueChange={(e) => setCategory(e)}
                required
              >
                <SelectTrigger className="outline-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((item: any) => (
                    <SelectItem key={item?._id} value={item?._id}>
                      {item?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-1/2">
              <Label>Sub Category</Label>
              <Select
                value={subCategory}
                onValueChange={(e) => setSubCategory(e)}
              >
                <SelectTrigger className="outline-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {subCategories?.map((item: any) => (
                    <SelectItem key={item?._id} value={item?._id}>
                      {item?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="w-1/2">
              <Label>Price</Label>
              <Input
                {...register("price")}
                type="number"
                required
                placeholder="price"
                className="outline-none mb-3"
              />
            </div>
            <div className="w-1/2">
              <Label>Promo Price</Label>
              <Input
                {...register("promoPrice")}
                type="number"
                required
                placeholder="promo price"
                className="outline-none mb-3"
              />
            </div>
          </div>
          <div className="mb-3">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed border-[#cccccc] rounded-md cursor-pointer p-5 text-center ${
                isDragActive ? "border-[#007bff]" : ""
              }`}
            >
              <input {...getInputProps()} {...register("images")} />
              <p>Drag & drop some files here, or click to select files</p>
            </div>
            <ul className="flex flex-wrap items-center gap-2 mt-2">
              {Array.isArray(getValues("images")) &&
                getValues("images").map((image: any, index: any) => (
                  <li
                    key={index}
                    className="w-[120px] h-[120px] border rounded-md overflow-hidden flex items-center relative"
                  >
                    <X
                      onClick={() => imageDelete(image.lastModified)}
                      className="absolute right-1 top-1 cursor-pointer text-gray-500"
                    />
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      className="w-full"
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex items-center flex-wrap md:flex-nowrap justify-between gap-3 mb-3">
            <div>
              <Label>Available Size</Label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Input
                    checked={size.indexOf("Free") > -1}
                    type="checkbox"
                    id="free-size"
                    value="Free"
                    onChange={(e) => handleSize(e.target.value)}
                    placeholder="Manufacturer name"
                    className="outline-none w-3"
                  />
                  <Label htmlFor="free-size">Free</Label>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    checked={size.indexOf("S") > -1}
                    type="checkbox"
                    id="s-size"
                    value="S"
                    onChange={(e) => handleSize(e.target.value)}
                    placeholder="Manufacturer name"
                    className="outline-none w-3"
                  />
                  <Label htmlFor="s-size">S</Label>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    checked={size.indexOf("M") > -1}
                    type="checkbox"
                    id="m-size"
                    value="M"
                    onChange={(e) => handleSize(e.target.value)}
                    placeholder="Manufacturer name"
                    className="outline-none w-3"
                  />
                  <Label htmlFor="m-size">M</Label>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    checked={size.indexOf("L") > -1}
                    type="checkbox"
                    id="l-size"
                    value="L"
                    onChange={(e) => handleSize(e.target.value)}
                    placeholder="Manufacturer name"
                    className="outline-none w-3"
                  />
                  <Label htmlFor="l-size">L</Label>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    checked={size.indexOf("XL") > -1}
                    type="checkbox"
                    id="xl-size"
                    value="XL"
                    onChange={(e) => handleSize(e.target.value)}
                    placeholder="Manufacturer name"
                    className="outline-none w-3"
                  />
                  <Label htmlFor="xl-size">XL</Label>
                </div>
                <div className="flex items-center gap-1">
                  <Input
                    checked={size.indexOf("XXL") > -1}
                    type="checkbox"
                    id="xxl-size"
                    value="XXL"
                    onChange={(e) => handleSize(e.target.value)}
                    placeholder="Manufacturer name"
                    className="outline-none w-3"
                  />
                  <Label htmlFor="xxl-size">XXL</Label>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Label>In Stock</Label>
              <Switch
                checked={inStock}
                onCheckedChange={() => setInStock(!inStock)}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-white"
            disabled={submitLoading}
          >
            {submitLoading ? <BtnSpinner /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
