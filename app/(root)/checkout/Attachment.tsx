"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { X } from "lucide-react";

import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";
import { useToast } from "@/components/ui/use-toast";

const Attachment = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [stateChange, setStateChange] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>({ description: "", image: "" }); // context use koresilam
  const [submitLoading, setSubmitLoading] = useState(false);
  const { toast } = useToast();

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

  const attachmentSubmit = (data: any) => {
    orderInfo.description = data.description;
    setOrderInfo({ ...orderInfo });
    setSubmitLoading(true);
    let uploadedImages: any[] = [];
    const imgBbKey = process.env.NEXT_PUBLIC_IMG_BB_KEY;
    const picture = data.images;

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
              orderInfo.image = uploadedImages;
              setOrderInfo({ ...orderInfo });
              setSubmitLoading(false);
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

  console.log(orderInfo);

  return (
    <div>
      <form onSubmit={handleSubmit(attachmentSubmit)}>
        <Textarea
          placeholder="Description"
          className="outline-none mb-4"
          {...register("description")}
          required
        />
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
        <Button
          type="submit"
          disabled={submitLoading}
          className="text-white w-full"
        >
          {submitLoading ? <BtnSpinner /> : "Add"}
        </Button>
      </form>
    </div>
  );
};

export default Attachment;
