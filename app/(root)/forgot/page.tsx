"use client"

import { useToast } from "@/components/ui/use-toast";

const ForGotPassword = () => {
    const toast = useToast()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;



        // generate token
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const minLength = 10;
        const maxLength = 12;

        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

        let randomString = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        console.log(randomString);

        localStorage.setItem("reset-token",randomString)
        localStorage.setItem("reset-email",email)

        const response = await fetch('/api/forgot', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                token: randomString
            })
        })

        if (response.status == 200) {
            alert("Email send successful. check your mail")
        }
    }

    return (
        <div className='w-full  max-w-md mx-auto p-6'>
            <div className="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Remember your password?
                            <a className="text-[#5D1BB3] decoration-2 hover:underline font-medium" href="/login">
                                Login here
                            </a>
                        </p>
                    </div>

                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                                    <div className="relative">
                                        <input type="email" id="email" name="email" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-[#5D1BB3] focus:ring-[#5D1BB3] shadow-sm" required aria-describedby="email-error" />
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                </div>
                                <button className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#5D1BB3] text-white hover:bg-[#5D1BB3] focus:outline-none focus:ring-2 focus:ring-[#5D1BB3] focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Reset password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForGotPassword;