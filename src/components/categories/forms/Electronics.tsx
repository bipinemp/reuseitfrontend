"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { electronicsList } from "@/lib/lists";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElectronicsSchema, TElectronics } from "@/types/postTypes";
import InputBox from "./components/InputBox";
import TextareaBox from "./components/TextareaBox";
import SelectBox from "./components/SelectBox";
import FileUpload from "./components/FileUpload";
import PriceBox from "./components/PriceBox";
import ElectronicsLocationBox from "./components/locations/ElectronicsLocationBox";
import { usePathname, useRouter } from "next/navigation";
import Title from "./components/Title";
import { createNewElectronics, sendPhoneNumber } from "@/apis/apicalls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useUserProfile } from "@/apis/queries";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PreviewFile extends File {
  id: string;
  preview: string;
}

const Electronics: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [imgError, setImgError] = useState<string>("Image is required");
  const { data: UserData } = useUserProfile();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TElectronics>({
    resolver: zodResolver(ElectronicsSchema),
  });

  const typeofelectronic = electronicsList.filter((val) => val.name === "type");

  const typeofcondition = electronicsList.filter(
    (val) => val.name === "condition"
  );

  const typeofwarrenty = electronicsList.filter(
    (val) => val.name === "warrenty"
  );

  // mutation function for creating Home Appliance AD
  const { mutate: CreateBlog, isPending } = useMutation({
    mutationFn: createNewElectronics,
    onSettled: (data: any) => {
      if (data.status === 200) {
        toast.success("Post Successfull");
        reset();
        router.push(`/productdetails/${data.product_id}`);
      }
      if (data.response.status === 422) {
        const errorArr: any[] = Object.values(data.response.data.errors);
        toast.error(errorArr[0]);
      }
      setDialogOpen(false);
      setPhoneNumber("");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const { mutate: SendPhone, isPending: PhoneNumPending } = useMutation({
    mutationFn: sendPhoneNumber,
    onSettled: (data: any) => {
      setDialogOpen(false);
      setPhoneNumber("");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // actual form submission function
  const onSubmit = async (data: TElectronics) => {
    if (files.length === 0) {
      return;
    }
    setDialogOpen(true);

    if (phoneNumber !== "") {
      handleCreateAppliance(data);
      SendPhone(phoneNumber);
    }
  };

  // for mutation function
  async function handleCreateAppliance(data: TElectronics) {
    const actualData = {
      ...data,
      image_urls: files,
      user_id: UserData?.id,
      price: parseInt(data.price),
    };
    CreateBlog(actualData);
  }

  useEffect(() => {
    if (files.length === 0) {
      setImgError("Image is required");
    }
    if (files.length > 0) {
      setImgError("");
    }
  }, [files]);

  return (
    <div className="max-w-[1920px] mx-auto px-2 md:px-10 xl:px-52 2xl:px-80">
      <Title array={pathname.split("/")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col border-[1px] border-content rounded-lg mb-10"
      >
        {/* Details Section */}
        <div className="relative flex flex-col gap-7 border-b-[1px] border-content px-3 lg:px-10 py-8">
          <h3 className="font-semibold underline underline-offset-2">
            INCLUDE SOME DETAILS :
          </h3>

          <InputBox<TElectronics>
            name="pname"
            id="pname"
            placeholder="Enter Title..."
            register={register}
            error={errors?.pname?.message || ""}
            desc="Mention the key features of you item (e.g. brand, model, age,
              type)"
            label="Ad Title"
          />

          <TextareaBox<TElectronics>
            name="description"
            id="description"
            placeholder="Enter Description..."
            register={register}
            error={errors?.description?.message || ""}
            desc="Include condition, features and reason for selling"
            label="Description"
          />

          <div>
            <SelectBox<TElectronics>
              name="type_of_electronic"
              control={control}
              array={typeofelectronic[0].list}
              placeholder="Select Type of Electronic"
              label="Appliances:"
              error={errors.type_of_electronic?.message || ""}
            />
          </div>

          <InputBox<TElectronics>
            id="brand"
            name="brand"
            placeholder="Enter Brand Name..."
            error={errors?.brand?.message || ""}
            desc="Enter the name of the Brand"
            register={register}
            label="Brand"
          />

          <InputBox<TElectronics>
            id="model"
            name="model"
            placeholder="Enter Model Name..."
            error={errors?.model?.message || ""}
            desc="Enter the name of the Model"
            register={register}
            label="Model"
          />

          <div>
            <SelectBox<TElectronics>
              name="condition"
              control={control}
              array={typeofcondition[0]?.list}
              placeholder="Select Condition"
              label="Conditions:"
              error={errors.condition?.message || ""}
            />
          </div>

          <div>
            <SelectBox<TElectronics>
              name="warranty_information"
              control={control}
              array={typeofwarrenty[0]?.list}
              placeholder="Select the Warranty"
              label="Available Warrenties:"
              error={errors?.warranty_information?.message || ""}
            />
          </div>
        </div>

        <Dialog open={dialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter Phone Number</DialogTitle>
              <DialogDescription>
                Please enter you valid phone number.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="phone" className="text-left">
                  Phone Number
                </Label>
                <div className="relative">
                  <span className="absolute left-2 top-2 pr-2 border-r-[1px] border-r-content">
                    +977
                  </span>
                  <Input
                    id="phone"
                    className="pl-16"
                    type="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onWheel={(e) => (e.target as HTMLElement).blur()}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={() => setDialogOpen(false)} type="submit">
                  {PhoneNumPending ? "Sending OTP..." : "Save changes"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Price Section */}
        <PriceBox<TElectronics>
          name="price"
          id="price"
          register={register}
          error={errors?.price?.message || ""}
        />

        {/*Location selection Section */}
        <ElectronicsLocationBox control={control} errors={errors} />

        {/* Photo Selection Section */}
        <FileUpload files={files} setFiles={setFiles} imgError={imgError} />

        {/* Submitting Post Button */}
        <div className="px-3 lg:px-10 py-8">
          <Button type="submit" size="lg" className="text-lg w-fit">
            {isPending ? (
              <div className="flex gap-2 items-center">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p>Posting..</p>
              </div>
            ) : (
              "Post now"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Electronics;
