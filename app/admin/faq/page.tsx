"use client"
import { useState } from "react";
import FaqForm from "./FaqForm"
import { useForm } from "react-hook-form";
import AllFaq from "./AllFaq";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

const Faq = () => {
const inialValues = { question: "", answer: "" };
  const [defaultValues, setDefaultValues] = useState(inialValues);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [update, setUpdate] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  //   gett all faq
  const {
    data: faq,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["faq"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/faq");
        const data = await res.json();
        return data;
      } catch (error: any) {
        toast({ variant: "destructive", description: error.message });
      }
    },
  });

  const handleAddFaq = (data: any) => {
    setSubmitLoading(true);
    const faq = {
      question: data.question || defaultValues.question,
      answer: data.answer || defaultValues.answer,
    };
    const api = update ? `/api/faq/${update}` : "/api/faq";
    const fetchMethod = update ? "PATCH" : "POST";

    fetch(api, {
        method: fetchMethod,
        body: JSON.stringify(faq),
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
              description: "Successfully faq added",
            });
          } else {
            setSubmitLoading(false);
            toast({
              variant: "destructive",
              description: "Something went wrong",
            });
          }
        });
  }

  //   faq delete
  const handleDelete = (id: any) => {
    fetch(`/api/faq/${id}`, { method: "Delete" })
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

  //   faq update
  const handleUpdate = (faq: any) => {
    reset();
    const faqData = {
      question: faq.question,
      answer: faq.answer,
    };
    setDefaultValues(faqData);
    setUpdate(faq._id);
  };

  return (
    <div className="mt-5 md:flex items-start justify-between gap-5">
        <FaqForm
        register={register}
        handleSubmit={handleSubmit}
        handleAddFaq={handleAddFaq}
        defaultValues={defaultValues}
        setDefaultValues={setDefaultValues}
        submitLoading={submitLoading}
        update={update}
        setUpdate={setUpdate}
      />
      <AllFaq isLoading={isLoading}
        faq={faq}
        update={update}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete} />
    </div>
  )
}

export default Faq