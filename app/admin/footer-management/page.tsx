"use client";
import BtnSpinner from '@/components/adminComponents/BtnSpinner/BtnSpinner';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

const FooterManagement = () => {
    const [bio, setBio] = useState("")
    const [location, setLocation] = useState("")
    const [email, setEmail] = useState("")
    const [mobilePhone, setMobilePhone] = useState("")
    const [localPhone, setLocalPhone] = useState("")
    const [fb, setFb] = useState("")
    const [ins, setIns] = useState("")
    const [twit, setTwit] = useState("")
    const [linkedin, setLinkedIn] = useState("")
    const [pin, setpin] = useState("")
    const social = { fb, ins, twit, linkedin, pin };

    const { toast } = useToast();

    const [submitLoading, setSubmitLoading] = useState(false)
    const imgBbKey = "b918b3b8d7b742f871bbfa70d8aaf06c";
    const url = `https://api.imgbb.com/1/upload?key=${imgBbKey}`;
    const { handleSubmit, register } = useForm();
    const [footerData, setFooterData] = useState<any>("")

    const onSubmit = () => {
        setSubmitLoading(true)
        const socialLinks = social;

        const FooterData =
        {
            bio,
            location,
            email,
            mobilePhone,
            localPhone,
            socialLinks
        }



        axios.patch("/api/footer/6573e6c8527bde6040823af3", FooterData)
            .then(res => {
                console.log(res.data);
                setSubmitLoading(false)
                toast({ description: "Updated Successful" });
            })
    };


    useEffect(() => {
        axios.get("/api/footer")
            .then(res => {
                setFooterData(res.data[0]);
            })
    }, [])

    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white xl:inline-block p-4 rounded-xl'>
                <h1 className='text-2xl font-bold mb-3'>Footer Management</h1>
                <div className='lg:flex gap-20 items-end'>
                    <div>
                        <div>
                            <label>BIO</label>
                            <input onChange={(e) => setBio(e.target.value)} defaultValue={footerData?.bio}placeholder='write a short bio' type="text" className='py-2 px-3 block outline-none my-2 border rounded-md w-full lg:w-[400px]' />
                        </div>
                        <div>
                            <label>Location</label>
                            <input onChange={(e) => setLocation(e.target.value)} defaultValue={footerData?.location} placeholder='company location' type="text" className='py-2 px-3 block outline-none my-2 border rounded-md w-full lg:w-[400px]' />
                        </div>
                        <div>
                            <label>Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} defaultValue={footerData?.email} placeholder='business email' type="email" className='py-2 px-3 block outline-none my-2 border rounded-md w-full lg:w-[400px]' />
                        </div>
                        <div>
                            <label>Mobile phone</label>
                            <input onChange={(e) => setMobilePhone(e.target.value)} defaultValue={footerData?.mobilePhone} placeholder='telephone no.' type="number" className='py-2 px-3 block outline-none my-2 border rounded-md w-full lg:w-[400px]' />
                        </div>
                        <div>
                            <label>Local phone</label>
                            <input onChange={(e) => setLocalPhone(e.target.value)} defaultValue={footerData?.localPhone} placeholder='telephone no.' type="number" className='py-2 px-3 block outline-none my-2 border rounded-md w-full lg:w-[400px]' />
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl font-semibold'>Social Links</h2>
                        <div>
                            <label>Facebook</label>
                            <input onChange={(e) => setFb(e.target.value)} defaultValue={footerData?.socialLinks?.fb} placeholder='https://www.fb.com' type="text" className='py-2 px-3 block outline-none my-2 border rounded-md w-full lg:w-[400px]' />
                        </div>
                        <div>
                            <label>Instagram</label>
                            <input onChange={(e) => setIns(e.target.value)} defaultValue={footerData?.socialLinks?.ins} placeholder='https://www.ins.com' type="text" className='py-2 px-3 block outline-none my-2 border rounded-md w-full lg:w-[400px]' />
                        </div>
                        <div>
                            <label>Twitter</label>
                            <input onChange={(e) => setTwit(e.target.value)} defaultValue={footerData?.socialLinks?.twit} placeholder='https://www.twit.com' type="text" className='py-2 px-3 block outline-none my-2 border rounded-md w-full lg:w-[400px]' />
                        </div>
                        <div>
                            <label>Linkedin</label>
                            <input onChange={(e) => setLinkedIn(e.target.value)} defaultValue={footerData?.socialLinks?.linked} placeholder='https://www.linked.com' type="text" className='py-2 px-3 block outline-none my-2 border rounded-md w-full lg:w-[400px]' />
                        </div>
                        <div>
                            <label>Pinterest</label>
                            <input onChange={(e) => setpin(e.target.value)} defaultValue={footerData?.socialLinks?.pin} placeholder='https://www.linked.com' type="text" className='py-2 px-3 block outline-none my-2 border rounded-md w-full lg:w-[400px]' />
                        </div>
                    </div>
                </div>

                <div className=' my-4 text-center'>
                    <Button
                        type="submit"
                        className="text-white w-full md:w-1/3"
                        disabled={submitLoading}
                    >
                        {submitLoading ? <BtnSpinner /> : "Save"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FooterManagement;
