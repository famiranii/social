"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PenIcon } from "lucide-react";
import BirthDaate from "./components/BirthDaate";
import DropDown from "../components/DropDown";
import FormInput from "./components/FromInput";
import HobbiesInput from "./components/HobbiesInput";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { infoSchema } from "../components/schemas";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import Loading from "../components/Loading";
import { infoType } from "@/types/infoTypes";
import { api } from "../components/lib/api";
import { getCountriesApi } from "@/store/featurs/getCountriesSlice";

export default function Page() {
  const countries = useAppSelector((state) => state.countries.countries);
  const dispatch = useAppDispatch();
  const [image, setImage] = useState("/images/random-image.jpg");

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(getCountriesApi());
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<infoType>({
    resolver: zodResolver(infoSchema),
  });
  const country = useWatch({
    control,
    name: "country",
  });
  const onSubmit = async (payload: infoType) => {
    try {
      let uploadedImageUrl: string | undefined;

      // 1. upload image (separate API)
      if (payload.image) {
        const formData = new FormData();
        formData.append("image", payload.image);
        formData.append("user_id", "2");

        const res: any = await api.post("upload", formData);

        uploadedImageUrl = res.data; // فرض: API لینک میده
      }

      // 2. prepare info payload
      const formData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        if (key === "image") return; // skip file

        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });

      // اگر API نیاز داره image url هم ذخیره کنه
      // if (uploadedImageUrl) {
      //   formData.append("image", uploadedImageUrl);
      // }

      // 3. send info
      const response: any = await api.post("info", formData);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center py-3">
      <div className="w-full h-full max-w-xl flex flex-col justify-center  overflow-y-auto backdrop-blur-2xl bg-amber-50/15 rounded-2xl shadow md:p-6">
        {/* Profile Photo */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-4 mb-8">
            <label className="relative cursor-pointer">
              <div className="w-30 h-30 rounded-full overflow-hidden relative">
                <Image
                  src={image}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-2 bg-sky-500 text-white rounded-full absolute z-10 left-2.5 bottom-2">
                <PenIcon size={15} />
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Name */}
          <div className="space-y-3 w-full px-6">
            <div className="flex items-end justify-between gap-2">
              <FormInput title="first_name" {...register("first_name")} />
              <FormInput title="last_name" {...register("last_name")} />
            </div>
            <div className="flex items-end justify-between gap-2">
              <FormInput title="username" {...register("username")} />
              <BirthDaate />
            </div>
            <div className="flex items-end justify-between gap-2">
              <DropDown
                options={countries}
                value={country || "Select country"}
                onChange={(value) => setValue("country", value)}
              />
              <FormInput title="City" {...register("city")} />
            </div>
            <div>
              <FormInput title="biography" {...register("biography")} />
            </div>
            <div>
              <HobbiesInput />
            </div>
            <button className="w-full bg-sky-500 text-white py-3 rounded-xl font-medium hover:bg-sky-600">
              {isSubmitting ? <Loading width={25} /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
