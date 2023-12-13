"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "@/app/styles/Address.css";

type Inputs = {
  name: string;
  pincode: number;
  phone: number;
  city: string;
  state:string;
  street:string
};

const AddressPage = () => {
    const [add, setAdd ] = useState<any>([])
    const [open, setOpen] = useState(false)

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>();


    const onSubmit: SubmitHandler<Inputs> = async (data:Inputs) =>{
     const addData = [...add, data]
      setAdd(addData)
     // console.log(data)
    
  };
  return (
    <div className="">
     
       <button onClick={()=>setOpen(true)} className="w-full bg-multi-primary py-3 text-white  ">
            + Add Address
          </button>

        <div className={`${open ? "block" :"hidden"} mx-10`}>
        <form onSubmit={handleSubmit(onSubmit)} className=" py-4 md:mt-4 m-4  text-center mx-auto  contact-bg">
            <div className="flex justify-between flex-col md:flex-row gap-6 mx-4">
              <input
                {...register("name")}
                placeholder="Name"
                type="text"
                className=" text-black rounded px-2 py-2 border-2 md:w-1/2 w-full mb-6"
              />
              <input
                {...register("phone")}
                type="number"
                placeholder="10 digit mobile number "
                className=" text-black rounded px-2 py-2 border-2 md:w-1/2 w-full mb-6"
              />
            </div>
            <div className="flex justify-between flex-col md:flex-row gap-6 mx-4">
              <input
               {...register("pincode")}
               type="number"
               placeholder="pincode  "
               
                className=" text-black rounded px-2 py-2 border-2 md:w-1/2 w-full mb-6"
              />
              <input
                {...register("city")}
                type="text"
                placeholder="City/District/Town "
                className=" text-black rounded px-2 py-2 border-2 md:w-1/2 w-full mb-6"
              />
            </div>
            <div  className="flex justify-between items-start flex-col md:flex-row gap-6 mx-4  mb-10">
            <select {...register("state")} id="" className=" text-black rounded px-2 py-2 border-2 md:w-1/2 w-full mb-6">
              <option value="">--Select State--</option>
              <option value="india">India</option>
              <option value="bangladesh">Bangladesh</option>
              <option value="kolkata">Kolkata</option>
              
            </select>
            <textarea {...register("street")} id="" 
            placeholder="address, locality, areay" className="w-full border-2 px-2 py-1 md:w-1/2 h-28"></textarea>
            </div>
            <input
              className="text-white py-2 px-4 bg-multi-primary"
              type="submit"
              value="Save Address"
            />
            <button onClick={()=>setOpen(false)} className="ml-4 border border-multi-primary text-multi-primary py-2 px-4"> Close </button>
          </form>
        </div>
      <div>
        {
            add.map((data:Inputs) =>(
              <div className="contact-bg py-2 px-2 my-6 mx-4 ">
                <p>
                {data.name} 
                </p>
                <p>
                  {data.phone}
                </p>
                <p>
                   {data.city}, {data.state}, {data.street} <br />{data.pincode},
                </p>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default AddressPage;
