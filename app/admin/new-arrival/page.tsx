"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ArrivalForm from "./ArrivalForm";
import ArrivalTable from "./ArrivalTable";

const NewArrival = () => {
  const { toast } = useToast();
  const inialValues = { image: "", name: "", min: "", max: "" };
  const [defaultValues, setDefaultValues] = useState(inialValues);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [update, setUpdate] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  //   get all arrivals
  const {
    data: arrivals,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["arrivals"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/newarrival");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  // arrival add
  const handleAddArrival = (data: any) => {
    setSubmitLoading(true);
    const arrival = {
      name: data.name || defaultValues.name,
      price: {
        min: data.minPrice || defaultValues.min,
        max: data.maxPrice || defaultValues.max,
      },
    };

    const api = update ? `/api/newarrival/${update}` : "/api/newarrival";
    const fetchMethod = update ? "PATCH" : "POST";
    const imgBbKey = "b918b3b8d7b742f871bbfa70d8aaf06c";
    const picture = data.image[0];
    const formData = new FormData();
    formData.append("image", picture);
    const url = `https://api.imgbb.com/1/upload?key=${imgBbKey}`;

    const arrivalUpload = (imgData: any) => {
      fetch(api, {
        method: fetchMethod,
        body: JSON.stringify({ ...arrival, image: imgData }),
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
              description: "Successfully arrival added",
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
            arrivalUpload(imgData.data.url);
          } else {
            setSubmitLoading(false);
            toast({
              variant: "destructive",
              description: "Something went wrong",
            });
          }
        });
    } else {
      arrivalUpload(defaultValues.image);
    }
  };

  //   arrival delete
  const handleDelete = (id: any) => {
    fetch(`/api/newarrival/${id}`, { method: "Delete" })
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

  //   arrival update
  const handleUpdate = (arrival: any) => {
    reset();
    const arrivalData = {
      name: arrival.name,
      min: arrival.price.min,
      max: arrival.price.max,
      image: arrival.image,
    };
    setDefaultValues(arrivalData);
    setUpdate(arrival._id);
  };

  return (
    <div className="mt-5 md:flex items-start justify-between gap-5">
      <ArrivalForm
        register={register}
        handleSubmit={handleSubmit}
        handleAddArrival={handleAddArrival}
        defaultValues={defaultValues}
        setDefaultValues={setDefaultValues}
        submitLoading={submitLoading}
        update={update}
        setUpdate={setUpdate}
      />
      <ArrivalTable
        isLoading={isLoading}
        arrivals={arrivals}
        update={update}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default NewArrival;
