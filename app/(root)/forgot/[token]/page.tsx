"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import bcryptjs from 'bcryptjs'

const ChangePassword = () => {
    const router = useRouter();
    const handleChangePassword = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        const password = form.password.value;
        const cpassword = form.cpassword.value;

        if (password !== cpassword || password < 6) {
            alert("password not matched")
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const email = localStorage.getItem("reset-email");
        // console.log(email);
        axios.patch(`/api/users/${email}`, { password: hashedPassword })
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    localStorage.removeItem("reset-token")
                    localStorage.removeItem("reset-email")
                    router.push("/")
                }
            })
    }
    return (
        <div>
            <div className='w-full  max-w-md mx-auto p-6'>
                <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Change Your password?</h1>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Remember your password?
                                <a className="text-[#5D1BB3] decoration-2 hover:underline font-medium" href="#">
                                    Login here
                                </a>
                            </p>
                        </div>

                        <div className="mt-5">
                            <form onSubmit={handleChangePassword}>
                                <div className="grid gap-y-4">
                                    <div>
                                        <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Password</label>
                                        <div className="relative">
                                            <input type="password" name="password" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-[#5D1BB3] focus:ring-[#5D1BB3] shadow-sm" required aria-describedby="email-error" />
                                        </div>

                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Confirm Password</label>
                                        <div className="relative">
                                            <input type="password" name="cpassword" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-[#5D1BB3] focus:ring-[#5D1BB3] shadow-sm" required aria-describedby="email-error" />
                                        </div>

                                    </div>
                                    <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#5D1BB3] text-white hover:bg-[#5D1BB3] focus:outline-none focus:ring-2 focus:ring-[#5D1BB3] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Change password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;