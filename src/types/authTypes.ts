import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const RegisterSchema = z.object({
  // Required
  name: z
    .string({ required_error: "Name is required" })
    .min(6, { message: "Minimun of 6 characters is required" })
    .max(20, { message: "Maximum of 20 characters are only allowed" }),
  email: z.string({ required_error: "Email is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be 8 characters long" })
    .max(25, { message: "Maximum of 25 characters are only allowed" }),

  // Optional
  Province: z.string({ required_error: "Province is required" }).optional(),
  District: z.string({ required_error: "Province is required" }).optional(),
  Municipality: z.string({ required_error: "Province is required" }).optional(),

  Profile_image: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
});

export type TRegister = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export type TLogin = z.infer<typeof LoginSchema>;
