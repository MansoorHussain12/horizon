"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInputField from "./FormInputField";
import Logo from "./Logo";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  type: "sign-in" | "sign-up";
}

const AuthForm = ({ type }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(data);
    setLoading(false);

    try {
      // Sign up with Appwrite & create plaid link
      if (type === "sign-up") {
        // const newUser = await signUp(data);
        // setUser(newUser);
      }

      if (type === "sign-in") {
        // const response = await signIn({
        // email: data.email,
        // password: data.password
        //  });
        //
        // if (response) router.push("/");
      }
    } catch (error) {
      console.log("Auth Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Logo className="flex cursor-pointer items-center gap-1" />
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600 ">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* Plaid Link */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <FormInputField
                      control={form.control}
                      label="First Name"
                      name="firstName"
                      placeholder="Enter your first name"
                    />
                    <FormInputField
                      control={form.control}
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <FormInputField
                    control={form.control}
                    label="Address"
                    name="address1"
                    placeholder="Enter your specific address"
                  />
                  <FormInputField
                    control={form.control}
                    label="City"
                    name="city"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <FormInputField
                      control={form.control}
                      label="State"
                      name="state"
                      placeholder="Example: NY"
                    />
                    <FormInputField
                      control={form.control}
                      label="Postal Code"
                      name="postalCode"
                      placeholder="Example: 11101"
                    />
                  </div>
                  <div className="flex gap-4">
                    <FormInputField
                      control={form.control}
                      label="Date of Birth"
                      name="dateOfBirth"
                      placeholder="YYYY-MM-DD"
                    />
                    <FormInputField
                      control={form.control}
                      label="SSN"
                      name="ssn"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}
              <FormInputField
                control={form.control}
                label="Email"
                name="email"
                placeholder="Enter your email"
              />
              <FormInputField
                control={form.control}
                label="Password"
                name="password"
                placeholder="Enter your password"
              />
              <div className="flex flex-col gap-4">
                <Button className="form-btn" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;