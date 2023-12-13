"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import BannerForm from "./BannerForm";
import BannerTable from "./BannerTable";
import { useForm } from "react-hook-form";

const Banner = () => {
  const { toast } = useToast();
  const inialValues = { title: "", description: "", image: "", link: "" };
  const [defaultValues, setDefaultValues] = useState(inialValues);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [update, setUpdate] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  //   get all banner
  const {
    data: banners,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/banner");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  // banner add
  const handleAddBanner = (data: any) => {
    setSubmitLoading(true);
    const banner = {
      title: data.bannerTitle || defaultValues.title,
      description: data.description || defaultValues.description,
      link: data.link || defaultValues.link,
    };

    const api = update ? `/api/banner/${update}` : "/api/banner";
    const fetchMethod = update ? "PATCH" : "POST";
    const imgBbKey = "b918b3b8d7b742f871bbfa70d8aaf06c";
    const picture = data.image[0];
    const formData = new FormData();
    formData.append("image", picture);
    const url = `https://api.imgbb.com/1/upload?key=${imgBbKey}`;

    const bannerUpload = (imgData: any) => {
      fetch(api, {
        method: fetchMethod,
        body: JSON.stringify({ ...banner, image: imgData }),
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
            bannerUpload(imgData.data.url);
          } else {
            setSubmitLoading(false);
            toast({
              variant: "destructive",
              description: "Something went wrong",
            });
          }
        });
    } else {
      bannerUpload(defaultValues.image);
    }
  };

  //   banner delete
  const handleDelete = (id: any) => {
    fetch(`/api/banner/${id}`, { method: "Delete" })
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

  //   banner update
  const handleUpdate = (banner: any) => {
    reset();
    const bannerData = {
      title: banner.title,
      description: banner.description,
      link: banner.link,
      image: banner.image,
    };
    setDefaultValues(bannerData);
    setUpdate(banner._id);
  };

  return (
    <div className="mt-5 md:flex items-start justify-between gap-5">
      <BannerForm
        register={register}
        handleSubmit={handleSubmit}
        handleAddBanner={handleAddBanner}
        defaultValues={defaultValues}
        setDefaultValues={setDefaultValues}
        submitLoading={submitLoading}
        update={update}
        setUpdate={setUpdate}
      />
      <BannerTable
        isLoading={isLoading}
        banners={banners}
        update={update}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Banner;
