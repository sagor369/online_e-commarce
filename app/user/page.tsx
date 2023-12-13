"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import UserFAQ from "@/components/userComponent/UserFAQ";
import { FaEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";
import axios from "axios";

type Inputs = {
  name: string;
  email: string;
  phone: number;
};

const Users = () => {
  const [name, setName] = useState<boolean>(false)
  const [phone, setPhone] = useState<boolean>(false)
  const session: any = useSession();
  const userName = session?.data?.user?.name
  const userEmail = session?.data?.user?.email
  const userPhone = session?.data?.user?.phoneNumber

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const faqData = [
    {
      question: "What happens when I update my email address (or mobile number)?",
      answer: "Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number)."
    },
    {
      question: "When will my Flipkart account be updated with the new email address (or mobile number)?",
      answer: " It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes."
    },
    {
      question: "What happens to my existing account when I update my email address (or mobile number)?",
      answer: "Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details."
    }
  ]

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const updateData = {
      name: data.name || userName,
      email: data.email || userEmail,
      phoneNumber: data.phone || userPhone
    }
    axios.patch("/api/user/jhonedoe@gmail.com", updateData)
    .then(res => {
      console.log(res.data)
    })
    .catch(error =>{
      console.log(error.message)
    })
  };

  return (
    <div className="md:px-16 md:py-10 px-4 py-10">

      <div className="">
        <form className="md:w-2/3 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className=" mb-8 ">
            <label className="flex justify-between item-center">
              <p className="font-bold mb-2 ">Full name</p>
              <FaEdit onClick={() =>setName(!name)} className="text-slate-600"/>
            </label>
            <input
              {...register("name")}
              type="text"
              // disabled={true}
              disabled={name ? false: true}
              defaultValue={userName ||""}
              className=" border w-full border-multi-primary px-2 rounded h-10"
            />
          </div>
          <div className=" mb-8 ">
          <label >
              <p className="font-bold mb-2 ">Email</p>
            </label>
            <input
              {...register("email")}
              type="text"
              disabled
              defaultValue={userEmail || ''}
              className="px-2 rounded w-full h-10 border border-multi-primary"
            />
          </div>
          <div className=" mb-8">
          <label className="flex justify-between item-center">
              <p className="font-bold mb-2 ">Phone</p>
              <FaEdit onClick={() =>setPhone(!phone)} className="text-slate-600"/>
            </label>
            <input
              {...register("phone")}
              type="text"
              defaultValue={"+912424242422"}
              maxLength={13}
              disabled={phone ? false:  true}
              minLength={10}
              className=" border w-full border-multi-primary px-2 rounded h-10"
            />
          </div>

          <div className="">
            <button
              type="submit"
              className="border py-2 px-4 my-4 bg-multi-primary text-white"
            >
              Submit
            </button>
          </div>
        </form>
        
      </div>
      <div className="mt-10">
        <h1 className="text-3xl font-bold ">FAQs </h1>
        <UserFAQ faqData = {faqData}></UserFAQ>
      </div>
    </div>
  );
};

export default Users;
