"use client";

import React, { useState } from "react";
import { db, storage } from "@/app/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AddableItemGrid from "../components/Lend/ListingMockup";

interface FormDataType {
  category: string | null;
  title: string;
  description: string;
  condition: string;
  photos: File[];
  price: string;
  depositRequired: string;
  depositAmount: string;
  insured: string;
  availability: string;
  location: string;
  fullName: string;
  email: string;
  phone: string;
  consent: boolean;
}

export default function LenderOnboardingForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataType>({
    category: null,
    title: "",
    description: "",
    condition: "New",
    photos: [],
    price: "",
    depositRequired: "No",
    depositAmount: "",
    insured: "Yes",
    availability: "Ongoing",
    location: "",
    fullName: "",
    email: "",
    phone: "",
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked! : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      setFormData((prev) => ({ ...prev, photos: Array.from(files) }));
    }
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      let imageUrls: string[] = [];
      for (const file of formData.photos) {
        const storageRef = ref(
          storage,
          `productImages/${Date.now()}-${file.name}`
        );
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }

      await addDoc(collection(db, "listings"), {
        category: formData.category,
        title: formData.title,
        description: formData.description,
        condition: formData.condition,
        photos: imageUrls,
        price: formData.price,
        depositRequired: formData.depositRequired,
        depositAmount: formData.depositAmount,
        insured: formData.insured,
        availability: formData.availability,
        location: formData.location,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        consent: formData.consent,
        timestamp: serverTimestamp(),
      });

      alert("Thanks! Your product has been listed.");
      setStep(1);
      setFormData({
        category: null,
        title: "",
        description: "",
        condition: "New",
        photos: [],
        price: "",
        depositRequired: "No",
        depositAmount: "",
        insured: "Yes",
        availability: "Ongoing",
        location: "",
        fullName: "",
        email: "",
        phone: "",
        consent: false,
      });
    } catch (err) {
      console.error("Error uploading form:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Lender Onboarding</h1>
      <div className="mb-4 text-sm text-gray-500">Step {step} of 5</div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <label className="block font-medium">Product Category</label>
            <AddableItemGrid
              selected={formData.category}
              onChange={(cat) => setFormData((f) => ({ ...f, category: cat }))}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <label className="block font-medium">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows={4}
              placeholder="Describe its features, condition, and ideal use case..."
            />

            <label className="block font-medium">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>

            <label className="block font-medium">Photos (optional)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <label className="block font-medium">Rental Price (per day)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            <label className="block font-medium">Deposit Required?</label>
            <select
              name="depositRequired"
              value={formData.depositRequired}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>No</option>
              <option>Yes</option>
            </select>

            {formData.depositRequired === "Yes" && (
              <>
                <label className="block font-medium">Deposit Amount</label>
                <input
                  type="number"
                  name="depositAmount"
                  value={formData.depositAmount}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </>
            )}

            <label className="block font-medium">Is the product insured?</label>
            <select
              name="insured"
              value={formData.insured}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Yes</option>
              <option>No</option>
              <option>I’m not sure</option>
            </select>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <label className="block font-medium">Available For</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Ongoing</option>
              <option>This Month Only</option>
            </select>

            <label className="block font-medium">Pickup Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g., Cape Town, Sea Point"
            />
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            <label className="block font-medium">Mobile Number (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-sm">
                I’m interested in being one of the first lenders on Thingo. You can contact me for feedback or early access perks.
              </label>
            </div>
          </div>
        )}

        <div className="flex justify-between pt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-gray-600 hover:underline"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              List My Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
