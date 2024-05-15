"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Logo from "./Logo";

interface Props {
  type: "sign-in" | "sign-up";
}

type FormType = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

const AuthForm = ({ type }: Props) => {
  const [user, setUser] = useState(null);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: FormType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel className="form-label">Email</FormLabel>
                  <div className="flex w-full flex-col">
                    <FormControl>
                      <Input
                        className="input-class"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="form-item">
                  <FormLabel className="form-label">Password</FormLabel>
                  <div className="flex w-full flex-col">
                    <FormControl>
                      <Input
                        className="input-class"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="form-message mt-2" />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </section>
  );
};

export default AuthForm;
