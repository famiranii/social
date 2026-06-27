"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PenIcon } from "lucide-react";
import BirthDate from "./components/BirthDate";
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
import { toast } from "sonner";

export default function Page() {
  const countries = useAppSelector((state) => state.countries.countries);
  const userInfo = useAppSelector((state) => state.userInfo.userInfo);
  const user_id = String(
    useAppSelector((state) => state.auth.userId) ?? localStorage.getItem("id"),
  );
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<infoType>({
    resolver: zodResolver(infoSchema),
  });
  const country = useWatch({
    control,
    name: "country",
  });
  const birthday = useWatch({
    control,
    name: "birthday",
  });
  const onSubmit = async (payload: infoType) => {
    try {
      let uploadedImageUrl: string | undefined;

      if (payload.image) {
        const imageFormData = new FormData();
        imageFormData.append("image", payload.image);
        imageFormData.append("user_id", user_id);

        const uploadResponse: { url: string } = await api.post(
          "upload",
          imageFormData,
        );
        uploadedImageUrl = uploadResponse.url;

        const profileFormData = new FormData();
        profileFormData.append("user_id", user_id);
        profileFormData.append("image", uploadedImageUrl);

        await api.post("set/profile", profileFormData);
      }

      const infoFormData = new FormData();

      Object.entries(payload).forEach(([key, value]) => {
        if (key === "image") return;

        if (value !== undefined && value !== null) {
          infoFormData.append(key, String(value));
        }
      });

      if (uploadedImageUrl) {
        infoFormData.append("image", uploadedImageUrl);
      }

      infoFormData.append("user_id", user_id);

      const response: { data: any; error: boolean; message: string } =
        await api.post("info", infoFormData);
      if (response.error) {
        toast.error(
          response.message || "There was an error updating your profile.",
        );
      }

      toast.success("Profile updated successfully.");
    } catch (error: any) {
      console.error(error);
      toast.error(
        error?.response?.data?.message ||
          "There was an error updating your profile.",
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  useEffect(() => {
    if (!userInfo) return;

    reset({
      first_name: userInfo.first_name ?? "",
      last_name: userInfo.last_name ?? "",
      username: userInfo.username ?? "",
      country: userInfo.country ?? "",
      city: userInfo.city ?? "",
      biography: userInfo.biography ?? "",
      birthday: userInfo.birthday ?? "",
      sex: userInfo.sex ?? "",
      age: userInfo.age ?? 0,
      job: userInfo.job ?? "",
    });

    // if (userInfo.image) {
    //   setImage(userInfo.image);
    // }
  }, [userInfo, reset]);

  return (
    <div className="h-screen flex justify-center items-center py-3">
      <div className="w-full h-full max-w-xl flex flex-col justify-center  overflow-y-auto backdrop-blur-2xl bg-amber-50/15 rounded-2xl shadow md:p-">
        {/* Profile Photo */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-4 mb-8">
            <label className="relative cursor-pointer">
              <div className="w-30 h-30 border rounded-full overflow-hidden relative">
                <Image
                  src={
                    image ||
                    (userInfo.image &&
                      process.env.NEXT_PUBLIC_IMAGE_URL + userInfo?.image) ||
                    " /images/admnor - image.jpg"
                  }
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
              <BirthDate
                value={birthday || ""}
                onChange={(value) => setValue("birthday", value)}
              />
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
            <div className="flex justify-between items-end gap-2">
              <FormInput title="age" {...register("age")} type="number" />
              <FormInput title="sex" {...register("sex")} />
              <FormInput title="job" {...register("job")} />
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
