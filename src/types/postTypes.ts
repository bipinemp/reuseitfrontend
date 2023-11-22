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

export const ElectronicsSchema = z.object({
  type_of_electronic: z
    .string({ required_error: "Type of Electronic is required" })
    .min(1, { message: "You must select a Type of Electronic" }),
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, { message: "You must enter a Brand" }),
  model: z
    .string({ required_error: "Model is required" })
    .min(1, { message: "You must enter a Model" }),
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

  // product
  user_id: z.number().optional(),
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

export type TElectronics = z.infer<typeof ElectronicsSchema>;

export const FurnitureSchema = z.object({
  type_of_furniture: z
    .string({ required_error: "Type of Furniture is required" })
    .min(1, { message: "You must select a Type of Furniture" }),
  material: z
    .string({ required_error: "Material is required" })
    .min(1, { message: "You must enter a Material." }),
  dimensions: z.string().refine((value) => /^\d+x\d+x\d+$/.test(value), {
    message: "Dimensions must be of 10x10x10 format.",
  }),
  color: z
    .string({ required_error: "Color is required" })
    .min(1, { message: "You must select a Color" }),
  style: z
    .string({ required_error: "Style is required" })
    .min(1, { message: "You must select a Style" }),
  condition: z
    .string({ required_error: "Condition is required" })
    .min(1, { message: "You must select a Condition" }),
  assembly_required: z.enum(["true", "false"], {
    required_error: "You need to select Yes or No",
  }),
  image_urls: z
    .any()
    .refine((file: File[]) => file?.length === 0, "Image is required")
    .refine((file: File[]) => file?.length > 5, "Only 5 Images are Allowed")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),

  // product
  user_id: z.number().optional(),
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

export type TFurnitures = z.infer<typeof FurnitureSchema>;

export const ClothingSchema = z.object({
  type_of_clothing_accessory: z
    .string({ required_error: "Type of Clothing is required" })
    .min(1, { message: "You must select a Type of Clothing" }),
  size: z
    .string({ required_error: "Size is required" })
    .min(1, { message: "You must enter a Size" }),
  color: z
    .string({ required_error: "Color is required" })
    .min(1, { message: "You must select a Color" }),
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, { message: "You must select a Brand" }),
  material: z
    .string({ required_error: "Material is required" })
    .min(1, { message: "You must select a Material" }),
  condition: z
    .string({ required_error: "Condition is required" })
    .min(1, { message: "You must select a Condition" }),
  care_instructions: z
    .string({ required_error: "Care Instructions is required" })
    .min(1, { message: "You must select a Care Instructions" }),
  image_urls: z
    .any()
    .refine((file: File[]) => file?.length === 0, "Image is required")
    .refine((file: File[]) => file?.length > 5, "Only 5 Images are Allowed")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),

  // product
  user_id: z.number().optional(),
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

export type TClothing = z.infer<typeof ClothingSchema>;

export const ToysSchema = z.object({
  type_of_toy_game: z
    .string({ required_error: "Type of Toys/Games is required" })
    .min(1, { message: "You must select a Type of Toys/Games" }),
  age_group: z
    .string({ required_error: "You must enter the Age Group for Toys/Games" })
    .min(1, { message: "You must select the Age Group" }),
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, { message: "You must select a Brand" }),
  condition: z
    .string({ required_error: "Condition is required" })
    .min(1, { message: "You must select a Condition" }),
  safety_information: z
    .string({ required_error: "Safety Information is required" })
    .min(1, { message: "You must enter a Safety Information" }),
  assembly_required: z.enum(["true", "false"], {
    required_error: "You need to select Yes or No",
  }),
  recommended_use: z
    .string({ required_error: "Recommendation is required" })
    .min(1, { message: "You must enter how to use." }),
  image_urls: z
    .any()
    .refine((file: File[]) => file?.length === 0, "Image is required")
    .refine((file: File[]) => file?.length > 5, "Only 5 Images are Allowed")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),

  // product
  user_id: z.number().optional(),
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

export type TToys = z.infer<typeof ToysSchema>;

export const SportsSchema = z.object({
  type_of_equipment: z
    .string({ required_error: "Type of Equipment is required" })
    .min(1, { message: "You must select a Type of Equipment" }),
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, { message: "You must select a Brand" }),
  condition: z
    .string({ required_error: "Condition is required" })
    .min(1, { message: "You must select a Condition" }),
  size_weight: z
    .string({ required_error: "Size/Weight is required" })
    .min(1, { message: "You must enter a Size/Weight" }),
  features: z
    .string({ required_error: "Features is required" })
    .min(1, { message: "You must enter the Features" }),
  suitable_sport_activity: z
    .string({ required_error: "It is required" })
    .min(1, { message: "You must select the Suitable Sport Activity" }),
  warranty_information: z
    .string({ required_error: "Warrenty is required" })
    .min(1, { message: "You must select the Warranty" }),
  usage_instructions: z
    .string({ required_error: "Usage Instructions is required" })
    .min(1, { message: "You must enter the Usage Instructions" }),
  image_urls: z
    .any()
    .refine((file: File[]) => file?.length === 0, "Image is required")
    .refine((file: File[]) => file?.length > 5, "Only 5 Images are Allowed")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),

  // product
  user_id: z.number().optional(),
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

export type TSports = z.infer<typeof SportsSchema>;

export const BooksSchema = z.object({
  author_artist: z
    .string({ required_error: "Author/Artist is required" })
    .min(1, { message: "You must enter a Author/Artist" }),
  genre: z
    .string({ required_error: "Genre is required" })
    .min(1, { message: "You must select the Genre" }),
  format: z
    .string({ required_error: "Format is required" })
    .min(1, { message: "You must select the Format" }),
  condition: z
    .string({ required_error: "Condition is required" })
    .min(1, { message: "You must select the condition" }),
  edition: z
    .string({ required_error: "Edition is required" })
    .min(1, { message: "You must select the Edition" }),
  isbn_upc: z
    .string({ required_error: "ISBN/UPC  is required" })
    .min(1, { message: "You must enter a ISBN/UPC" }),
  image_urls: z
    .any()
    .refine((file: File[]) => file?.length === 0, "Image is required")
    .refine((file: File[]) => file?.length > 5, "Only 5 Images are Allowed")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),

  // product
  user_id: z.number().optional(),
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

export type TBooks = z.infer<typeof BooksSchema>;

export const AntiquesSchema = z.object({
  type_of_item: z
    .string({ required_error: "Type of Item is required" })
    .min(1, { message: "You must select a Type of Item" }),
  era_period: z
    .string({ required_error: "Era Period is required" })
    .min(1, { message: "You must select the Era Period" }),
  material: z
    .string({ required_error: "Material is required" })
    .min(1, { message: "You must selct the Material" }),
  condition: z
    .string({ required_error: "Condition is required" })
    .min(1, { message: "You must selct the Condition" }),
  provenance_location: z
    .string({ required_error: "Provenance Location is required" })
    .min(1, { message: "You must select the Provenance Location" }),
  rarity: z
    .string({ required_error: "Rarity is required" })
    .min(1, { message: "You must select the Rarity" }),
  historical_significance: z
    .string({ required_error: "Historical Significance is required" })
    .min(1, { message: "You must enter the Historical Significance" }),
  certification: z.string().nullable().optional(),
  image_urls: z
    .any()
    .refine((file: File[]) => file?.length === 0, "Image is required")
    .refine((file: File[]) => file?.length > 5, "Only 5 Images are Allowed")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),

  // product
  user_id: z.number().optional(),
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

export type TAntiques = z.infer<typeof AntiquesSchema>;

export const VehicleSchema = z.object({
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, { message: "You must select a Brand" }),
  model: z
    .string({ required_error: "Model is required" })
    .min(1, { message: "You must select a Model" }),
  year: z
    .string({ required_error: "year is required" })
    .min(1, { message: "You must enter a year" }),
  mileage: z
    .number({ required_error: "Mileage is required" })
    .min(1, { message: "You must enter a Mileage" }),
  condition: z
    .string({ required_error: "Condition is required" })
    .min(1, { message: "You must select a Condition" }),
  color: z
    .string({ required_error: "Color is required" })
    .min(1, { message: "You must enter a Color" }),
  used_time: z
    .string({ required_error: "Used Time is required" })
    .min(1, { message: "You must enter Used Time" }),
  fuel_type: z
    .string({ required_error: "Feul Type is required" })
    .min(1, { message: "You must select a Feul Type" }),
  owner: z
    .string({ required_error: "Owner is required" })
    .min(1, { message: "You must select no. of Owners" }),
  transmission_type: z
    .string({ required_error: "Tranmission Type is required" })
    .min(1, { message: "You must select a Tranmission Type" }),
  vin: z.string().nullable(),
  image_urls: z
    .any()
    .refine((file: File[]) => file?.length === 0, "Image is required")
    .refine((file: File[]) => file?.length > 5, "Only 5 Images are Allowed")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),

  // product
  user_id: z.number().optional(),
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

export type TVehicle = z.infer<typeof VehicleSchema>;

export const MusicsSchema = z.object({
  type_of_instrument: z
    .string({ required_error: "Type of Instrument is required" })
    .min(1, { message: "You must select a Type of Instrument" }),
  material: z
    .string({ required_error: "Material is required" })
    .min(1, { message: "You must select a Material" }),
  accessories_included: z
    .string({ required_error: "IT is required" })
    .min(1, { message: "You must select Yes or No" }),
  sound_characteristics: z.string().nullable().optional(),
  brand: z
    .string({ required_error: "Brand is required" })
    .min(1, { message: "You must select a Brand" }),

  condition: z
    .string({ required_error: "Condition is required" })
    .min(1, { message: "You must select a Condition" }),

  image_urls: z
    .any()
    .refine((file: File[]) => file?.length === 0, "Image is required")
    .refine((file: File[]) => file?.length > 5, "Only 5 Images are Allowed")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),

  // product
  user_id: z.number().optional(),
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

export type TMusic = z.infer<typeof MusicsSchema>;
