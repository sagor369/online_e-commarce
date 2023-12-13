"use client"
import ContactForm from '@/components/homeComponent/ContactForm/ContactForm';
import UserFAQ from '@/components/userComponent/UserFAQ';
import React, { useEffect, useState } from 'react';
import "@/app/styles/Address.css"

const CantactPage = () => {
    const [faqData, setFaqData] = useState([])
    useEffect(()=>{
        fetch("/api/faq")
    .then(res =>res.json())
    .then(data => setFaqData(data))

    },[])
    return (
        <div className='container mx-auto my-10'>
            <div className='grid grid-cols-1 md:grid-cols-2  gap-6'>

           <div>
            <h1 className='text-4xl mb-10 font-bold'>Frequently Faced Issues</h1>
            <UserFAQ faqData = {faqData}></UserFAQ>
           </div>
           <div className='contact-bg rounded'>
            <ContactForm></ContactForm>
           </div>
            </div>
        </div>
    );
};

export default CantactPage;