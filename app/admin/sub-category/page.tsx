"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import SubCategoryForm from "./SubCategoryForm";
import SubCategoryTable from "./SubCategoryTable";
import { useForm } from "react-hook-form";

const SubCategories = () => {
  const { toast } = useToast();
  const inialValues = { name: "", description: "", image: "" };
  const [defaultValues, setDefaultValues] = useState(inialValues);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [update, setUpdate] = useState(null);
  const [parentCategory, setParentCategory] = useState("");
  const [parentCategories, setParentCategories] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  // gett all sub categories
  const {
    data: subCategories,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["subCategories"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/subcategory");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  // sub category add
  const handleAddSubCategory = (data: any) => {
    setSubmitLoading(true);
    const parentCategoryName: any = parentCategories.find(
      (item: any) => item?._id === parentCategory
    );
    const subCategory = {
      name: data.name || defaultValues.name,
      description: data.description || defaultValues.description,
      category: parentCategory,
      categoryName: parentCategoryName?.name,
    };

    const api = update ? `/api/subcategory/${update}` : "/api/subcategory";
    const fetchMethod = update ? "PATCH" : "POST";
    const imgBbKey = process.env.NEXT_PUBLIC_IMG_BB_KEY;
    const picture = data.image[0];
    const formData = new FormData();
    formData.append("image", picture);
    const url = `https://api.imgbb.com/1/upload?key=${imgBbKey}`;

    const subCategoryUpload = (imgData: any) => {
      fetch(api, {
        method: fetchMethod,
        body: JSON.stringify({ ...subCategory, image: imgData }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (update && data) {
            setDefaultValues(inialValues);
            setSubmitLoading(false);
            setUpdate(null);
            refetch();
            reset();
            toast({
              description: data,
            });
          } else if (data.success) {
            setSubmitLoading(false);
            refetch();
            reset();
            toast({
              description: "Successfully banner added",
            });
          } else {
            setSubmitLoading(false);
            toast({
              variant: "destructive",
              description: "Something went wrong",
            });
          }
        });
    };

    if (picture) {
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          if (imgData.success) {
            subCategoryUpload(imgData.data.url);
          } else {
            setSubmitLoading(false);
            toast({
              variant: "destructive",
              description: imgData.error,
            });
          }
        });
    } else {
      subCategoryUpload(defaultValues.image);
    }
  };

  //   category delete
  const handleDelete = (id: any) => {
    fetch(`/api/subcategory/${id}`, { method: "Delete" })
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

  //   category update
  const handleUpdate = (categoryItem: any) => {
    reset();
    const categoryData = {
      name: categoryItem.name,
      description: categoryItem.description,
      image: categoryItem.image,
    };
    setParentCategory(categoryItem.category);
    setDefaultValues(categoryData);
    setUpdate(categoryItem._id);
  };

  return (
    <div className="mt-5 md:flex items-start justify-between gap-5">
      <SubCategoryForm
        register={register}
        handleSubmit={handleSubmit}
        handleAddSubCategory={handleAddSubCategory}
        submitLoading={submitLoading}
        update={update}
        setUpdate={setUpdate}
        defaultValues={defaultValues}
        setDefaultValues={setDefaultValues}
        parentCategory={parentCategory}
        setParentCategory={setParentCategory}
        setParentCategories={setParentCategories}
      />
      <SubCategoryTable
        isLoading={isLoading}
        categories={subCategories}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        update={update}
      />
    </div>
  );
};

export default SubCategories;
