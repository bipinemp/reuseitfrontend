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
  email: z.string({ required_error: "Email is required" }).email(),
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
      (file) => {
        // Ensure the file is defined
        if (!file) return false;

        // Check the file type
        const acceptedTypes = [
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/webp",
        ];
        return acceptedTypes.includes(file.type);
      },
      {
        message: "File must be of type jpg, jpeg, png, or webp",
      }
    )
    .optional(),
});

export type TRegister = z.infer<typeof RegisterSchema>;

export const MessageChatSchema = z.object({
  message: z.string({ required_error: "Name is required" }).optional(),

  msg_image: z
    .any()
    .refine(
      (file) => {
        // Ensure the file is defined
        if (!file) return false;

        // Check the file type
        const acceptedTypes = [
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/webp",
        ];
        return acceptedTypes.includes(file.type);
      },
      {
        message: "File must be of type jpg, jpeg, png, or webp",
      }
    )
    .optional(),
});

export type TMsgType = z.infer<typeof MessageChatSchema>;

export const LoginSchema = z.object({
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export type TLogin = z.infer<typeof LoginSchema>;
