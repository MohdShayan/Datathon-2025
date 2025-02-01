"use client";
import React from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import logo from "../../image.png"
export default function Form1() {
  interface FormElements extends HTMLFormControlsCollection {
    firstname: HTMLInputElement;
    lastname: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    twitterpassword: HTMLInputElement;
  }

  interface FormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const handleSubmit = (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { firstname, lastname, email, password, twitterpassword } = form.elements;

    console.log("Form Data:", {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      password: password.value,
      twitterpassword: twitterpassword.value,
    });
  };

  return (
    <div className="flex justify-center items-center py-20 bg-blue-100">

    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black ">
      <h2 className="font-bold flex gap-2 justify-center items-center text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to <img src={logo} alt="" className='w-10 h-10' /> <span className="text-blue-700 font-bold text-2xl">SupaRetail</span>
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Please fill in the form below to get started.
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Age</Label>
          <Input id="age" type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="category">Category</Label>
          <Input id="category" placeholder="eg. Grocery" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="city">City</Label>
          <Input id="city" placeholder="eg. Grocery" type="text" />
        </LabelInputContainer>
        <Link className="text-sm text-black pt-32 text-end" to={'/dashboard'}>Skip</Link>

         
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};