// Updated LenderOnboardingForm.tsx with consistent select UI and fixed address fields

"use client";

import React, { useState } from "react";
import { db, storage } from "@/app/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AddableItemGrid from "../components/Lend/ListingMockup";
import Tooltip from "../components/Tooltip";
import { formatCurrency } from "../lib/formatCurrency";
import CustomSelect from "../components/CustomSelect";
import { Edit2 } from "lucide-react";

interface FormDataType {
  category: string | null;
  title: string;
  description: string;
  condition: string;
  photos: File[];
  price: string;
  depositAmount: string;
  insured: string;
  streetAddress: string;
  city: string;
  province: string;
  postalcode: "",
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
    condition: "",
    photos: [],
    price: "",
    depositAmount: "",
    insured: "",
    streetAddress: "",
    city: "",
    province: "",
    postalcode: "",
    fullName: "",
    email: "",
    phone: "",
    consent: false,
  });

  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? (target as HTMLInputElement).checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked! : value,
    }));
  };

  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const MAX_FILE_SIZE_MB = 5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const oversized = newFiles.find(file => file.size > MAX_FILE_SIZE_MB * 1024 * 1024);

    if (oversized) {
      alert(`"${oversized.name}" is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    const totalFiles = formData.photos.length + newFiles.length;
    if (totalFiles > 3) {
      alert("You can only upload up to 3 photos.");
      return;
    }

    const updatedPhotos = [...formData.photos, ...newFiles];
    const updatedPreviews = [...photoPreviews, ...newFiles.map(file => URL.createObjectURL(file))];

    setFormData((prev) => ({ ...prev, photos: updatedPhotos }));
    setPhotoPreviews(updatedPreviews);
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = [...formData.photos];
    const updatedPreviews = [...photoPreviews];
    updatedPhotos.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setFormData((prev) => ({ ...prev, photos: updatedPhotos }));
    setPhotoPreviews(updatedPreviews);
  };

  const handleSubmit = async () => {
    if (validateStep()) {
    try {
      const imageUrls: string[] = [];
      for (const file of formData.photos) {
        const storageRef = ref(storage, `productImages/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }

      await addDoc(collection(db, "listings"), {
        ...formData,
        photos: imageUrls,
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
        depositAmount: "",
        insured: "Yes",
        streetAddress: "",
        city: "",
        province: "",
        postalcode: "",
        fullName: "",
        email: "",
        phone: "",
        consent: false,
      });
      setPhotoPreviews([]);
    } catch (err) {
      console.error("Error uploading form:", err);
      alert("Something went wrong. Please try again later.");
    }
  }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.category) {
          alert("Please choose a category.");
          return false;
        }
        break;

      case 2:
        if (!formData.title.trim()) {
          alert("Please enter a product title.");
          return false;
        }
        if (!formData.description.trim()) {
          alert("Please add a description.");
          return false;
        }
        if (!formData.condition) {
          alert("Please select a condition.");
          return false;
        }
        if (formData.photos.length === 0) {
          alert("Please upload at least one photo.");
          return false;
        }
        break;

      case 3:
        if (!formData.price) {
          alert("Please enter your daily rental price.");
          return false;
        }
        if (!formData.depositAmount) {
          alert("Please enter a deposit amount.");
          return false;
        }
        if (!formData.insured) {
          alert("Please select if your item is insured or not.");
          return false;
        }
        break;

      case 4:
        if (!formData.streetAddress.trim()) {
          alert("Please enter a street address.");
          return false;
        }
        if (!formData.city.trim()) {
          alert("Please enter a city.");
          return false;
        }
        if (!formData.province) {
          alert("Please select a province.");
          return false;
        }
        if (!formData.postalcode.trim()) {
          alert("Please enter a postal code.");
          return false;
        }
        break;

      case 5:
        if (!formData.fullName.trim()) {
          alert("Please enter your full name.");
          return false;
        }
        if (!formData.email.trim()) {
          alert("Please enter your email address.");
          return false;
        }
        // (optional) add a simple regex test for valid email
        break;
    }
    return true;
  };

  const handleNext = () => {
  if (validateStep()) {
    setStep((s) => {
      const newStep = s + 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
      return newStep;
    });
  }
};

const handleBack = () => {
  if (step > 1) {
    setStep((s) => {
      const newStep = s - 1;
      window.scrollTo({ top: 0, behavior: "smooth" });
      return newStep;
    });
  }
};


  return (
    <div className="min-h-screen px-4 flex flex-col items-center justify-start bg-[var(--color-bg)]">
    <div className="w-full max-w-2xl flex flex-col justify-between h-full px-4">
    <div className="mb-4 text-sm text-gray-500 font-bold">Step {step} of 5</div>

    <div className="flex-1">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="h-full space-y-6 relative"
      >
        {step === 1 && (
          <div className="my-6 space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              What category does your item fit in?
            </h2>
            <AddableItemGrid
              selected={formData.category}
              onChange={(cat) => setFormData((f) => ({ ...f, category: cat }))}
            />
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Tell us more about what you&apos;re lending?
            </h2>

            <div className="space-y-2">
            <label className="block font-medium">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            />

            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              rows={4}
              placeholder="Describe its features, condition, and ideal use case..."
            />

            <label className="block font-medium">Condition</label>
            <CustomSelect
              id="condition"
              name="condition"
              value={formData.condition}
              options={[
                { value: "New", label: "New" },
                { value: "Like New", label: "Like New" },
                { value: "Good", label: "Good" },
                { value: "Fair", label: "Fair" },
                { value: "Poor", label: "Poor" },
              ]}
              onChange={handleChange}
              placeholder="Select condition"
              required
            />

            <label className="block font-medium">Photos (Max. file size of {MAX_FILE_SIZE_MB}MB per photo)</label>
            <p className="text-sm text-gray-500 mb-2">
              High-quality photos from multiple angles help your item rent faster and build trust.
            </p>
            <div className="flex gap-4 mb-4">
              {photoPreviews.map((url, index) => (
                <div key={index} className="relative group w-36 h-36 border border-gray-300 rounded-md overflow-hidden">
                  <img src={url} alt={`Upload ${index}`} className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="cursor-pointer absolute top-0 right-0 p-1 bg-[var(--color-accent)] bg-opacity-60 text-white text-xs rounded-bl hover:bg-opacity-80"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {formData.photos.length < 3 && (
                <label className="flex items-center justify-center w-24 h-24 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100">
                  <span className="text-2xl text-gray-400">+</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-8">
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Now, set your daily rental price
            </h2>

            {/* Tip */}
            <p className="text-sm sm:text-base text-gray-500">
              Tip: {Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(514)}. You&apos;ll set a weekend price next.
            </p>

            {/* Price Input */}
            <div className="relative flex justify-center">
              <input
                type="text"
                inputMode="numeric"
                name="price"
                value={formatCurrency(formData.price)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d]/g, "")
                  const max = 99999
                  const clamped = Math.min(Number(raw), max).toString()
                  setFormData((prev) => ({ ...prev, price: clamped }))
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="R0"
                className="
                  text-3xl sm:text-5xl font-bold text-center
                  w-full
                  border border-gray-300 rounded-lg
                  px-4 py-2
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition
                "
              />
              {!isFocused && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {/* swap for your icon library if you prefer */}
                  <Edit2 className="w-6 h-6 text-gray-500" />
                </div>
              )}
            </div>

            {/* Earnings Summary */}
            {formData.price && (
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
                  <span>Guest price before taxes:</span>
                  <strong>
                    {Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(
                      Number(formData.price) * 1.15
                    )}
                  </strong>
                  <Tooltip message="Renters are charged a 10% service charge." />
                </div>

                <div className="w-full max-w-md border rounded-lg shadow-sm p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Base price</span>
                    <span>{formatCurrency(formData.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Host service fee (3.2%)</span>
                    <span className="text-red-500">
                      -{formatCurrency(Number(formData.price) * 0.032)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t pt-2">
                    <span>You earn</span>
                    <span>{formatCurrency(Number(formData.price) * 0.968)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Deposit Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="font-medium">Deposit Amount</label>
                <Tooltip message="A deposit can protect you from damage or loss. Most lenders ask for 10–30% of the item value." />
              </div>
              <input
                type="text"
                name="depositAmount"
                placeholder="R0"
                value={formatCurrency(formData.depositAmount)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d]/g, "")
                  setFormData((prev) => ({ ...prev, depositAmount: raw }))
                }}
                className="
                  w-full
                  border border-gray-300 rounded-lg
                  px-4 py-2 bg-white
                  focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition
                "
              />
            </div>

            {/* Insurance Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="font-medium">Is your item insured?</label>
                <Tooltip message="Insurance helps cover loss, theft, or damage while your item is being rented…" />
              </div>
              <CustomSelect
                id="insured"
                name="insured"
                value={formData.insured}
                options={[
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ]}
                onChange={handleChange}
                placeholder="Select an option"
                required
              />
            </div>
          </div>
        )}




        {step === 4 && (
        <div className="my-6 space-y-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Where can renters pick up your item?
          </h2>
          <p className="text-sm text-gray-500">
            Your address will only be visible to renters after they book your item.
          </p>
          <div className="grid gap-5">
            {/* Street Address */}
            <div>
              <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                id="streetAddress"
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                placeholder="e.g., 12 Main Road, Sea Point"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                placeholder="e.g., Cape Town"
              />
            </div>

            {/* Province */}
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                Province
              </label>
              <CustomSelect
                id="province"
                name="province"
                value={formData.province}
                options={[
                  { value: "Western Cape", label: "Western Cape" },
                  { value: "Gauteng", label: "Gauteng" },
                  { value: "KwaZulu-Natal", label: "KwaZulu-Natal" },
                  { value: "Eastern Cape", label: "Eastern Cape" },
                  { value: "Free State", label: "Free State" },
                  { value: "Limpopo", label: "Limpopo" },
                  { value: "Mpumalanga", label: "Mpumalanga" },
                  { value: "North West", label: "North West" },
                  { value: "Northern Cape", label: "Northern Cape" },
                ]}
                onChange={handleChange} 
                placeholder="Select a province"
                required
              />
            </div>

            {/* Postal Code */}
            <div>
              <label htmlFor="postalcode" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                id="postalcode"
                type="text"
                name="postalcode"
                value={formData.postalcode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                placeholder="e.g., 7785"
              />
            </div>

          </div>
        </div>
      )}


        {step === 5 && (
          <div className="mt-6 space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Finally, your contact details
            </h2>

            <div className="space-y-2">
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />

              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />

              <label className="block font-medium">Mobile Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />

              <div className="flex items-start gap-2 mt-4">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="cursor-pointer mt-1"
                />
                <label htmlFor="consent" className="text-sm">
                  I&apos;m interested in being one of the first lenders on Thingo. You can contact me for feedback or early access perks.
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sticky Bottom CTA */}
        <div className="fixed flex justify-between bottom-0 left-0 w-full bg-[var(--color-bg)] border-t border-gray-200 px-6 py-3 z-50">  
          <div className="max-w-2xl mx-auto flex items-center justify-between w-full">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="cursor-pointer font-medium text-gray-600 hover:underline"
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
              className="cursor-pointer text-center bg-[var(--color-primary)] text-white font-semibold py-2 px-6 rounded-full shadow-md hover:brightness-110 transition"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="cursor-pointer text-center bg-[var(--color-primary)] text-white font-semibold py-2 px-6 rounded-full shadow-md hover:brightness-110 transition"
            >
              List My Product
            </button>
          )}
          </div>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}
