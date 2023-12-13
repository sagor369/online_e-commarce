"use client";
import React from "react";
import Footer from "@/components/share/Footer/Footer";
import Header from "@/components/share/Navbar/Header";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "../../components/AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/share/Navbar/Navbar";
import "sweetalert2/dist/sweetalert2.min.css"
import Image from "next/image";
import Link from "next/link";
import whatsapp from "@/public/icons/whatsapp.png";


type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const RootLayout = ({ children }: Props) => {
  const queryClient = new QueryClient();

  return (
    <html lang="en" data-theme="light">
      <body className="relative">
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            <div className="sticky top-0 z-[80]">
            <Navbar ></Navbar>
            </div>
            {children}
            <Link
          className="fixed bottom-4 right-6 z-50"
          target="_blank"
          href={
            "https://api.whatsapp.com/send?phone=918509733240&text=Hello, I have a question"
          }
        >
          <Image src={whatsapp} alt="" className="w-16 h-16 z-[100]"></Image>
        </Link>
            <Footer />
          </QueryClientProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
};
export default RootLayout;
