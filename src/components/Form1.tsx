"use client";
import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../lib/utils";
import { Link } from "react-router-dom";
import logo from "../../image.png";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Form1() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [locationDetails, setLocationDetails] = useState({
    area: "",
    city: "",
    state: "",
  });

  interface FormElements extends HTMLFormControlsCollection {
    shop: HTMLInputElement;
    category: HTMLInputElement;
    size: HTMLInputElement;
    area: HTMLInputElement;
    city: HTMLInputElement;
    state: HTMLInputElement;
  }

  interface FormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLocationDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Latitude:", latitude, "Longitude:", longitude);
        try {
          // Reverse geocoding to get address from coordinates
          const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=fe2a5bde17474d36bc4b2c31efb73ed5`
          );
          const { components } = response.data.results[0];
          setLocationDetails({
            area: components.suburb || components.neighborhood || "",
            city: components.city || components.town || "",
            state: components.state || "",
          });
          setUseCurrentLocation(true);
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Failed to fetch address. Please enter manually.");
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Please enter manually.");
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<FormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { shop, category, size, area, city, state } = form.elements;

    if (!isLoaded || !user) {
      alert("User not loaded yet. Please wait...");
      return;
    }

    // Geocoding to convert address to coordinates
    const fullAddress = `${area.value}, ${city.value}, ${state.value}`;
    let coordinates = { lat: 0, lng: 0 };

    try {
      const geocodingResponse = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
          fullAddress
        )}&key=fe2a5bde17474d36bc4b2c31efb73ed5`
      );
      const { geometry } = geocodingResponse.data.results[0];
      coordinates = { lat: geometry.lat, lng: geometry.lng };
    } catch (error) {
      console.error("Error geocoding address:", error);
      alert("Failed to convert address to coordinates. Please check the address.");
      return;
    }

    const formData = {
      shopName: shop.value,
      shopCategory: category.value,
      shopSize: size.value,
      shopLocation: {
        area: area.value,
        city: city.value,
        state: state.value,
        coordinates,
      },
      createdBy: user.id,
    };

    try {
      const response = await axios.post("http://localhost:3000/form1", formData);
      console.log("Response:", response.data);
      form.reset();
      navigate("/typebased");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center py-20 bg-black">
      <div className="max-w-md w-full mx-auto rounded-2xl md:rounded-2xl p-4 md:p-8 shadow-input border dark:bg-black motion-preset-pop">
        <h2 className="font-bold flex gap-2 justify-center items-center text-xl text-neutral-200 dark:text-neutral-200">
          Welcome to <img src={logo} alt="" className="w-10 h-10" />{" "}
          <span className="text-blue-500 font-bold text-2xl">SupaRetail</span>
        </h2>
        <p className="text-neutral-300 text-sm max-w-sm my-6 dark:text-neutral-300 flex gap-2 justify-center items-center">
         <em>
          Please fill in the form below to get started.
         </em>

        </p>

        {!isLoaded ? (
          <p className="text-center text-gray-600">Loading user data...</p>
        ) : (
          <form className="my-2" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="shop" className="text-gray-300">Shop name</Label>
                <Input id="shop" placeholder="eg., SupaStore" type="text" required className="focus:bg-blue-100"/>
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="category" className="text-gray-300">Shop Category</Label>
                <Input id="category" placeholder="eg., Grocery" type="text" required className="focus:bg-blue-100"/>
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="size" className="text-gray-300">Shop size</Label>
              <Input id="size" placeholder="eg., Small, Medium, Large" type="text" required 
              className="focus:bg-blue-100"/>
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="area" className="text-gray-300">Area</Label>
              <Input
                id="area"
                placeholder="eg., Bandra West"
                type="text"
                value={locationDetails.area}
                onChange={handleLocationChange}
                required
                className="focus:bg-blue-100"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="city" className="text-gray-300">City</Label>
              <Input
                id="city"
                placeholder="eg., Mumbai"
                type="text"
                value={locationDetails.city}
                onChange={handleLocationChange}
                required
                className="focus:bg-blue-100"
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="state"  className="text-gray-300">State</Label>
              <Input
                id="state"
                placeholder="eg., Maharashtra"
                type="text"
                value={locationDetails.state}
                onChange={handleLocationChange}
                required
                className="focus:bg-blue-100"
              />
            </LabelInputContainer>

            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="text-sm text-blue-600 underline mb-4"
            >
              Use my current location
            </button>

            <button
              className="bg-gradient-to-br mt-4 relative group/btn from-blue-500 dark:from-blue-500 dark:to-blue-800 to-blue-900 block dark:bg-blue-600 w-full text-white rounded-md h-10 font-bold shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)inset,0px-1px_0px_0px_var(--zinc-800)_inset]"
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