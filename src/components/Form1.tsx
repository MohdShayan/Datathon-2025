"use client";
import React from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import logo from "../../image.png";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

export default function Form1() {
  interface FormElements extends HTMLFormControlsCollection {
    shop: HTMLInputElement;
    category: HTMLInputElement;
    size: HTMLInputElement;
    location: HTMLInputElement;
  }

  interface FormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const { user, isLoaded } = useUser(); 

  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { shop, category, size, location } = form.elements;

    if (!isLoaded || !user) {
      alert("User not loaded yet. Please wait...");
      return;
    }

    const formData = {
      shopName: shop.value,
      shopCategory: category.value,
      shopSize: size.value,
      shopLocation: location.value,
      createdBy: user.id, // Getting user ID from Clerk
    };

    try {
      const response = await axios.post("http://localhost:3000/form1", formData);
      console.log("Response:", response.data);
      alert("Form submitted successfully!");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center py-20 bg-blue-100">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold flex gap-2 justify-center items-center text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to <img src={logo} alt="" className="w-10 h-10" />{" "}
          <span className="text-blue-700 font-bold text-2xl">SupaRetail</span>
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300 flex gap-2 justify-center items-center">
          Please fill in the form below to get started.
        </p>

        {!isLoaded ? (
          <p className="text-center text-gray-600">Loading user data...</p>
        ) : (
          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="shop">Shop name</Label>
                <Input id="shop" placeholder="eg., SupaStore" type="text" required />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="category">Shop Category</Label>
                <Input id="category" placeholder="eg., Grocery" type="text" required />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="size">Shop size</Label>
              <Input id="size" placeholder="eg., Small, Medium, Large" type="text" required />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="location">Shop Location</Label>
              <Input id="location" placeholder="eg., Bandra, Andheri" type="text" required />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br mt-4 relative group/btn from-blue-500 dark:from-blue-500 dark:to-blue-800 to-blue-900 block dark:bg-blue-600 w-full text-white rounded-md h-10 font-bold shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Submit &rarr;
            </button>

            <div className="bg-gradient-to-r from-transparent via-cyan-300 dark:via-cyan-700 hover:via-cyan-700 to-transparent h-[4px] w-full" />
            <Link className="text-sm text-black pt-4 flex justify-end text-end" to={"/dashboard"}>
              Skip
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
