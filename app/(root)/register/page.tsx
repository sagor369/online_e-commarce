"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";
import axios from "axios";

const Register = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const form = useForm();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const { fullName, email, phone, password, confirmPassword } = data;
    if (password !== confirmPassword || password < 6) {
      toast({
        variant: "destructive",
        description:
          "Password must be at least 6 characters long and both passwords must match.",
      });
      return;
    }

    setSubmitLoading(true);
    const newUser = {
      name: fullName,
      email,
      phoneNumber: phone,
      password,
    };

    axios.post("/api/users", newUser).then((res) => {
      if (res.data.success) {
        router.push("/login");
      }
      setSubmitLoading(false);
    });
  };

  return (
    <div className="flex items-center justify-center container mx-auto">
      <Card className="md:w-[460px] w-full my-20">
        <CardHeader>
          <CardTitle className="text-center text-primary">
            Create Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        type="text"
                        className="outline-none py-6"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        className="outline-none py-6"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Phone"
                        type="text"
                        className="outline-none py-6"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        className="outline-none py-6"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        type="password"
                        className="outline-none py-6"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={submitLoading}
                className="w-full text-white"
              >
                {submitLoading ? <BtnSpinner /> : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>
            Already Have An Account?{" "}
            <Link href={"/login"} className="text-primary">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
