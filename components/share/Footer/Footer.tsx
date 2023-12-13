'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/images/logo1.png";
import axios from "axios";
import { Link } from "lucide-react";

const Footer = () => {
  const [data, setData] = useState<any>({});
  const [links, setLinks] = useState<any>([])
  useEffect(() => {
    axios.get("/api/footer")
      .then(res => {
        // console.log(res.data[0]);
        setData(res.data[0]);
      })
  }, [])


  useEffect(() => {
    axios.get("/api/navdata")
      .then(res => {
        // console.log(res.data);
        setLinks(res?.data);
      })
  }, [data])

  return (
    // <footer className="bg-multi-primary  w-full py-10 md:py-20 mt-5">
    //   <div className="grid grid-cols-1 text-center md:text-start md:grid-cols-5 items-center gap-2">
    //     <div className="col-span-1 pl-4 md:w-2/3 flex items-center md:justify-end justify-center ">
    //       <div>
    //         <Image src={logo} alt="Company logo" className="w-1/4 md:w-full" />
    //         <p className="text-white my-4">{data.bio}</p>
    //       </div>
    //     </div>

    //     <div className="col-span-4 ">
    //       <div className="grid justify-center  grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-4 px-3">
    //         <div>
    //           <h1 className="text-white font-[Poppins] font-semibold text-2xl mb-3 ">
    //             Address
    //           </h1>
    //           <h5 className="text-gray-200">
    //             143 New Street, xxxxxxx DC <br /> xxxxxx States, xxxxxx
    //           </h5>
    //         </div>

    //         {/* email  */}
    //         <div className=" ">
    //           <p className="text-white font-[Poppins] font-semibold text-2xl mb-3">
    //             Email
    //           </p>
    //           <div className="text-gray-200 ">
    //             <h5>needhelp@xxxxx.com</h5>
    //             <h5>inquiry@xxxxx.com</h5>
    //           </div>
    //         </div>

    //         {/* phone  */}
    //         <div>
    //           <h1 className="text-white font-[Poppins] font-semibold text-2xl mb-3 ">
    //             Phone
    //           </h1>
    //           <div className="text-gray-200 grid ">
    //             <h5>Local: 222 999 888</h5>
    //             <h5>Mobile: 000 8888 999</h5>
    //           </div>
    //         </div>

    //         {/* follow  */}
    //         <div >
    //           <div>
    //             <h1 className="text-white font-[Poppins] font-semibold text-2xl mb-3 ">
    //               Follow
    //             </h1>
    //           </div>
    //           <div className="flex gap-3 justify-center mt-6 md:mt-0">
    //             {/* Social Accounts */}
    //             <button>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="40"
    //                 height="40"
    //                 viewBox="126.445 2.281 589 589"
    //                 id="facebook"
    //               >
    //                 <circle
    //                   cx="420.945"
    //                   cy="296.781"
    //                   r="294.5"
    //                   fill="#3c5a9a"
    //                 ></circle>
    //                 <path
    //                   fill="#fff"
    //                   d="M516.704 92.677h-65.239c-38.715 0-81.777 16.283-81.777 72.402.189 19.554 0 38.281 0 59.357H324.9v71.271h46.174v205.177h84.847V294.353h56.002l5.067-70.117h-62.531s.14-31.191 0-40.249c0-22.177 23.076-20.907 24.464-20.907 10.981 0 32.332.032 37.813 0V92.677h-.032z"
    //                 ></path>
    //               </svg>
    //             </button>
    //             <button>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="40"
    //                 height="40"
    //                 viewBox="0 0 102 102"
    //                 id="instagram"
    //               >
    //                 <defs>
    //                   <radialGradient
    //                     id="a"
    //                     cx="6.601"
    //                     cy="99.766"
    //                     r="129.502"
    //                     gradientUnits="userSpaceOnUse"
    //                   >
    //                     <stop offset=".09" stopColor="#fa8f21"></stop>
    //                     <stop offset=".78" stopColor="#d82d7e"></stop>
    //                   </radialGradient>
    //                   <radialGradient
    //                     id="b"
    //                     cx="70.652"
    //                     cy="96.49"
    //                     r="113.963"
    //                     gradientUnits="userSpaceOnUse"
    //                   >
    //                     <stop
    //                       offset=".64"
    //                       stopColor="#8c3aaa"
    //                       stopOpacity="0"
    //                     ></stop>
    //                     <stop offset="1" stopColor="#8c3aaa"></stop>
    //                   </radialGradient>
    //                 </defs>
    //                 <path
    //                   fill="url(#a)"
    //                   d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
    //                   data-name="Path 16"
    //                 ></path>
    //                 <path
    //                   fill="url(#b)"
    //                   d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"
    //                   data-name="Path 17"
    //                 ></path>
    //                 <path
    //                   fill="#fff"
    //                   d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229"
    //                   data-name="Path 18"
    //                   transform="translate(-422.637 -426.196)"
    //                 ></path>
    //               </svg>
    //             </button>
    //             <button>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 width="40"
    //                 height="40"
    //                 viewBox="126.444 2.281 589 589"
    //                 id="twitter"
    //               >
    //                 <circle
    //                   cx="420.944"
    //                   cy="296.781"
    //                   r="294.5"
    //                   fill="#2daae1"
    //                 ></circle>
    //                 <path
    //                   fill="#fff"
    //                   d="M609.773 179.634c-13.891 6.164-28.811 10.331-44.498 12.204 16.01-9.587 28.275-24.779 34.066-42.86a154.78 154.78 0 0 1-49.209 18.801c-14.125-15.056-34.267-24.456-56.551-24.456-42.773 0-77.462 34.675-77.462 77.473 0 6.064.683 11.98 1.996 17.66-64.389-3.236-121.474-34.079-159.684-80.945-6.672 11.446-10.491 24.754-10.491 38.953 0 26.875 13.679 50.587 34.464 64.477a77.122 77.122 0 0 1-35.097-9.686v.979c0 37.54 26.701 68.842 62.145 75.961-6.511 1.784-13.344 2.716-20.413 2.716-4.998 0-9.847-.473-14.584-1.364 9.859 30.769 38.471 53.166 72.363 53.799-26.515 20.785-59.925 33.175-96.212 33.175-6.25 0-12.427-.373-18.491-1.104 34.291 21.988 75.006 34.824 118.759 34.824 142.496 0 220.428-118.052 220.428-220.428 0-3.361-.074-6.697-.236-10.021a157.855 157.855 0 0 0 38.707-40.158z"
    //                 ></path>
    //               </svg>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <div className="bg-multi-primary text-white">
      <footer className=" p-2 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10 gap-10">
          <div className="">
            {/* Company name */}
            <Image className="w-56 mb-6" src={logo} alt="logo" />
            <p className="text-[21px] lg:text-[16px] mb-6 dark:text-white">
              World-class user experiences with <br /> pixel perfect user
              interface <br /> designs.
            </p>
          </div>
          <div className="">
            {/* Address */}
            <h1 className="text-[24px] font-bold mb-8">Lets Connect</h1>
            <p className=" text-[21px] w-[80%] lg:text-[16px] mb-6 dark:text-white">
              {
                data?.location
              }
            </p>
          </div>
          <div>
            {/* Links */}
            <h1 className="text-[24px] font-bold mb-8">Links</h1>
            {/* <a href="">Home</a> */}
            {
              links?.map((d: any) => (
                <a className="block my-1" href={d.link}>{d.label}</a>
              ))
            }
          </div>
          <div className="mb-4">
            {/* Social Links */}
            <div className="lg:flex items-center xl:grid">
              <div>
                <h1 className="text-[24px] font-bold mb-8">Follow us</h1>
                {/* <Follow_Us /> */}
                
            <p className="my-2">Email: {data?.email}</p>
            <p>Local: {data?.localPhone}</p>
            <p>Mobile: {data?.mobilePhone}</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className=" dark:bg-[#030C1A] mx-auto rounded-lg">
          <div className="p-10 lg:p-0">
            <div className="mt-5 mb-2 flex justify-between items-center">
              {/* P=privacy and policy route */}
              <p className="text-center">@ 2023, Style Print. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
