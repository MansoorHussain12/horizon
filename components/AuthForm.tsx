"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInputField from "./FormInputField";
import Logo from "./Logo";
import { Loader2 } from "lucide-react";

interface Props {
  type: "sign-in" | "sign-up";
}

type FormType = z.infer<typeof authFormSchema>;

const AuthForm = ({ type }: Props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    console.log(values);
    setLoading(false);
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <Button className="form-btn" type="submit">
              {loading ? <Loader2 className="animate-spin" size={20} /> : <></>}
            </Button>
          </form>
        </Form>
      )}
    </section>
  );
};

export default AuthForm;
