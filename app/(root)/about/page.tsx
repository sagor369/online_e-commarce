import Image from "next/image";
import React from "react";
import about from "@/public/images/about.webp";
import {
  HiOutlineCube,
  HiOutlineShieldCheck,
  HiOutlineShoppingCart,
} from "react-icons/hi";

import facebook from "@/public/icons/Facebook.webp"
import instagram from "@/public/icons/Instagram.webp"
import linkdine from "@/public/icons/Linked-in.jpg"
import youtube from "@/public/icons/Youtube.webp"
import twiter from "@/public/icons/Twiter.webp"

const AboutPage = () => {
  return (
    <div className="text-slate-600">
      <div>
        <Image
          className="w-full my-8 "
          src={about}
          alt=""
          width={1300}
          height={600}
        ></Image>
        <div>
          <h2 className="ml-6 my-6">
            Welcome to Printo! We make printing and gifting easy.
          </h2>
          <p className="my-6 ml-6">
            We are India's largest print-on-demand platform with a vision to be
            the world's largest. We have over 15 years of experience in the
            print industry, 28 retail stores across 6 cities, and have serviced
            more than 1 Million customers online & offline.
          </p>

          <p className="my-6 ml-6">
            Small, medium and large enterprises, creators and consumers today
            depend on Printo to deliver high-quality print services and ship
            across India and the world with over 1000 employees across 6 cities.
          </p>
          <p className="my-6 ml-6 ">
            Printo also has India's largest wedding album design & production
            company - Canvera.com. A well known name across the event
            photography industry in India, Canvera has 1 lakh + photographers
            signed up and using the platform.
          </p>
        </div>
        <div className="my-6 ml-6">
          <h2 className="font-bold text-4xl mb-6">The Printo Story</h2>
          <p className="mb-6 ">
            Printo was founded by a motley crew from Bombay - a life science
            graduate and software engineer who knew little about software, and
            even less about print! Soon joined by a few more diehards, including
            a print engineer and a pre-press expert (finally, someone from
            print!). The founding team was disappointed with the lack of
            professional print services for young businesses and individuals,
            most of whom had orders that were too small for the higher quality
            printers.
          </p>
          <p>
            What was initially started out as a print store only for businesses,
            eventually became a store that provided printing services to all. It
            was born out of a vision to create a place run by happy people who
            delivered happy customers and catered to the printing needs of
            everyone. Today, Printo is a business known for its steadfast
            service and colourfast printing.
          </p>
        </div>
        <div className="my-6 ml-6">
          <h2 className="font-bold text-4xl mb-6">Where is Printo from?</h2>
          <p className="mb-6">
            Printo is headquartered in Bangalore, India, with a 10,000 sqft
            production facility and corporate office not far from Koramangala,
            off Hosur Road. From the first store in Koramangala, Bangalore,
            Printo has launched retail stores across 6-cities.
          </p>
          <div>
            <button className="bg-multi-primary py-2 px-3 text-white mr-2 rounded">
              Bangalore
            </button>
            <button className="bg-multi-primary py-2 px-3 text-white mr-2 rounded">
              Chennai
            </button>
            <button className="bg-multi-primary py-2 px-3 text-white mr-2 rounded">
              Gurugram{" "}
            </button>
            <button className="bg-multi-primary py-2 px-3 text-white mr-2 rounded">
              Hyderabad
            </button>
            <button className="bg-multi-primary py-2 px-3 text-white mr-2 rounded">
              New Delhi
            </button>
            <button className="bg-multi-primary py-2 px-3 text-white mr-2 rounded">
              Pune
            </button>
          </div>
          <p className="mt-1">
            Customers in these cities have the option to place their order
            online and collect it from the store if they prefer.
          </p>
        </div>
        <div className="my-6 ml-6">
          <h2 className="font-bold text-4xl mb-6">
            We can't wait to hear from you!
          </h2>
          <p>
            If you would like to know more about us, send us an email at
            care@printo.in and we'll answer your queries. Remember, we go the
            extra mile to bring innovative ideas that make printing easy and
            fun. Try us and experience the difference!
          </p>
        </div>
        <div className="my-6 ml-6">
          <h2 className="font-bold text-4xl mb-6">What does Printo do?</h2>
          <p className="mb-6">
            Printo is a retail chain that offers print and personalized gift
            services under one roof. We aim to make printing a hassle-free
            process for both business customers and individuals. We work with
            you to create anything from business cards, letterheads, packaging,
            marketing brochures or exhibition banners. We have a library of
            templates for you to choose from to make invitations cards, create
            personalized gifts and process photo prints at great prices.
          </p>
          <p>
            Our mission is two-fold. Firstly, it is to put a smile on the
            customer's face by making their printing experience easy. The other
            is to achieve scalability and efficiency without compromising the
            quality of the service.
          </p>
        </div>
        <div className="my-6">
          <h1 className="font-bold text-4xl my-6 text-center">
            Printe Made Easy
          </h1>
          <div className="md:flex hidden justify-around mt-10">
            <div className=" flex gap-4 items-center">
              <HiOutlineCube className="w-16 h-16" />
              <div>
                <h3 className="text-3xl font-bold">Super fast</h3>
                <p>
                  Great service with <br /> quick delivery
                </p>
              </div>
            </div>
            <div className=" flex gap-4 items-center">
              <HiOutlineShieldCheck className="w-16 h-16" />
              <div>
                <h3 className="text-3xl font-bold">Trusted</h3>
                <p>
                  Quality build over <br /> 15+ years
                </p>
              </div>
            </div>
            <div className=" flex gap-6 items-center ">
              <HiOutlineShoppingCart className="w-16 h-16" />
              <div>
                <h3 className="text-3xl font-bold">Easy order</h3>
                <p>
                  No minimum order <br /> quantity required
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 ml-6">
          <h2 className="font-bold text-4xl mb-4">
            How do I Shop from Printo?
          </h2>
          <ol className="ml-6 " style={{ listStyleType: "number" }}>
            <li>At a Printo store located near you.</li>
            <li>You can place your order online at printo.in</li>
            <li>Call us at (+91 951 373 4374)</li>
          </ol>
          <p className="my-6">
            We deliver the prints across India, making print buying as easy and
            stress-free as possible! Printo customers can also create and order
            print products and have them shipped anywhere in India or abroad.
          </p>
        </div>
        <div className="my-6 ml-6">
          <h2 className="font-bold text-4xl mb-6">Talk to Us</h2>
          <p>
            If you would like to know more about us, email us at care@printo.in
            and we'll answer your queries. Remember, we go the extra mile to
            bring innovative ideas that make printing and gifting easy and fun.
            Try us and experience the difference!
          </p>
        </div>
        <div className="ml-6">
        <h2 className="font-bold text-4xl mb-6">Follow Us</h2>
       <div className="flex gap-4 items-center ">
        <Image src={facebook} alt=""></Image>
        <Image src={instagram} alt=""></Image>
        <Image src={linkdine} alt=""></Image>
        <Image src={youtube} alt=""></Image>
        <Image src={twiter} alt=""></Image>
       </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
