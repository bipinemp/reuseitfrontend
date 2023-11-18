import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ApplianceSchema = z.object({
  type_of_appliance: z
    .string({ required_error: "Type of Appliance is required" })
    .min(1, { message: "You must select a Type of Appliance" }),
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, { message: "You must enter a Brand" }),
  model: z
    .string({ required_error: "Model is required" })
    .min(1, { message: "You must enter a Model" }),
  capacity: z
    .string({ required_error: "Capacity is required" })
    .min(1, { message: "You must enter a Capacity" }),
  features: z
    .string({ required_error: "Features is required" })
    .min(1, { message: "You must enter the Features" }),
  condition: z
    .string({ required_error: "Condition is required" })
    .min(1, { message: "You must select a Condition" }),
  warranty_information: z
    .string({ required_error: "Warrenty is required" })
    .min(1, { message: "You must select a Warrenty" }),
  image_urls: z
    .any()
    .refine((file: File[]) => file?.length === 0, "Image is required")
    .refine((file: File[]) => file?.length > 5, "Only 5 Images are Allowed")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
  user_id: z.number().optional(),
  category_id: z.number().optional(),
  pname: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "You must enter a Title" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "You must enter a Description" }),
  price: z
    .string({ required_error: "Price is required" })
    .min(1, { message: "You must enter a Price amount" }),
  Province: z
    .string({ required_error: "Province is required" })
    .min(1, { message: "You must enter a Province amount" }),
  District: z
    .string({ required_error: "District is required" })
    .min(1, { message: "You must enter a District" }),
  Municipality: z
    .string({ required_error: "Municipility is required" })
    .min(1, { message: "You must enter a Municipility" }),
});

export type TAppliance = z.infer<typeof ApplianceSchema>;

// export const blogSchema = z.object({
//   title: z
// .string({ required_error: "Title is required" })
// .min(1, { message: "You must enter a Title" })
//     .min(10, "Title is too short (minimum is 10 characters long)")
//     .max(128, "Title is too Long (maximum is 128 characters)"),
//   description: z
//     .string({ required_error: "Description is required" })
//     .min(1, { message: "You must enter a Description" })
//     .nonempty("Description is required")
//     .min(10, "Description is too short (minimum is 10 characters long)")
//     .max(50, "Description is too long (maximum is 30 characters)"),
// });
