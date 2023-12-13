"use client";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
};

const ContactForm = () => {
  const [loading, setLoding] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoding(true);
    const { firstName, lastName, email, phoneNumber, message } = data;
    const contactData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });
    const result = await res.json();
    setLoding(false);
    if (result.success) {
      toast({
        variant: "destructive",
        description: "Successfull Submited",
      });
    }
    console.log(result);
  };

  return (
    <div className=" p-4 ">
      <div className="p-3 text-multi-primary">
        <h1 className="font-semibold font-[Poppins] text-4xl ">
          Contact Us You Need Custom
        </h1>
        <h4 className=" font-[Poppins] text-xl font-normal mt-[23px] mb-[62px]">
          Maecenas eu vehicula felis Aen ean elementum torto lacinia,
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="sm:grid sm:grid-cols-2 gap-3 items-center justify-center font-[Poppins]">
            <input
              type="text"
              {...(register("firstName"), { required: true })}
              placeholder="first name"
              className="w-full border h-14 rounded-lg px-2 "
            />
            <input
              type="text"
              placeholder="last name"
              {...(register("lastName"), { required: true })}
              className="w-full border h-14 rounded-lg px-2  max-sm:mt-4"
            />
            <input
              type="text"
              placeholder="your email"
              {...(register("email"), { required: true })}
              className="w-full border h-14 rounded-lg px-2 max-sm:mt-4"
            />
            <input
              type="text"
              placeholder="Mobile number"
              {...(register("phoneNumber"), { required: true })}
              className="w-full border h-14 rounded-lg px-2 max-sm:mt-4"
            />
          </div>
          <textarea
            className="w-full my-4 h-28  px-4 py-2 border border-gray-300  rounded-lg "
            {...(register("message"), { required: true })}
            placeholder="Additional Message"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-32 h-14 mx-2 mb-2 bg-multi-primary text-lg font-normal font-[Poppins] text-white rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
