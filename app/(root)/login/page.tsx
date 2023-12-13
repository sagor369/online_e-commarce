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
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BtnSpinner from "@/components/adminComponents/BtnSpinner/BtnSpinner";

const Login = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const form = useForm();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setSubmitLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.ok) {
      setSubmitLoading(false);
      router.push("/");
    } else {
      setSubmitLoading(false);
      toast({
        variant: "destructive",
        description: "Email or Password does not match",
      });
    }
  };

  return (
    <div className="flex items-center justify-center container mx-auto">
      <Card className="md:w-[460px] w-full my-20">
        <CardHeader>
          <CardTitle className="text-center text-primary">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <div>
                <Link href={"/forgot"}>Reset Password</Link>
              </div>
              <Button
                type="submit"
                disabled={submitLoading}
                className="w-full text-white"
              >
                {submitLoading ? <BtnSpinner /> : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p>
            Don't Have Account?{" "}
            <Link href={"/register"} className="text-primary">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
