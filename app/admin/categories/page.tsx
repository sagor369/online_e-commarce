"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";
import { useForm } from "react-hook-form";

const Categories = () => {
  const { toast } = useToast();
  const inialValues = { name: "", description: "", image: "" };
  const [defaultValues, setDefaultValues] = useState(inialValues);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [update, setUpdate] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  //   gett all categories
  const {
    data: categories,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  // category add
  const handleAddCategory = (data: any) => {
    setSubmitLoading(true);
    const category = {
      name: data.name || defaultValues.name,
      description: data.description || defaultValues.description,
    };
    const api = update ? `/api/category/${update}` : "/api/category";
    const fetchMethod = update ? "PATCH" : "POST";
    const imgBbKey = "b918b3b8d7b742f871bbfa70d8aaf06c";
    const picture = data.image[0];
    const formData = new FormData();
    formData.append("image", picture);
    const url = `https://api.imgbb.com/1/upload?key=${imgBbKey}`;

    const categoryUpload = (imgData: any) => {
      fetch(api, {
        method: fetchMethod,
        body: JSON.stringify({ ...category, image: imgData }),
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
              description: "Successfully category added",
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
            categoryUpload(imgData.data.url);
          } else {
            setSubmitLoading(false);
            toast({
              variant: "destructive",
              description: "Something went wrong",
            });
          }
        });
    } else {
      categoryUpload(defaultValues.image);
    }
  };

  //   category delete
  const handleDelete = (id: any) => {
    fetch(`/api/category/${id}`, { method: "Delete" })
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
    setDefaultValues(categoryData);
    setUpdate(categoryItem._id);
  };

  return (
    <div className="mt-5 md:flex items-start justify-between gap-5">
      <CategoryForm
        handleAddCategory={handleAddCategory}
        handleSubmit={handleSubmit}
        submitLoading={submitLoading}
        update={update}
        setUpdate={setUpdate}
        defaultValues={defaultValues}
        setDefaultValues={setDefaultValues}
        register={register}
      />
      <CategoryTable
        isLoading={isLoading}
        categories={categories}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        update={update}
      />
    </div>
  );
};

export default Categories;
