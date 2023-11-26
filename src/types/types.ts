// Types for Single Product

type Product = {
  id: number;
  user_id: number;
  category_id: number;
  pname: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
  Province: string;
  District: string;
  Municipality: string;
  category: {
    id: number;
    category_name: string;
    created_at: string;
    updated_at: string;
  };
  image: Image[];
};

type Image = {
  id: number;
  product_id: number;
  image_url: string;
  created_at: string | null;
  updated_at: string | null;
};

// For User Details
type UserDetail = {
  District: string;
  Municipality: string;
  Phone_no: string;
  Profile_image: string;
  Province: string;
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  updated_at: string;
};

type TUserDetails = {
  data: UserDetail;
};

// for Product Details (Electronics)
type EProductDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  model: string;
  type_of_electronic: string;
  condition: string;
  brand: string;
  warranty_information: string;
};

// for Product Details (Home Appliance)
type EHomeApplianceDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  brand: string;
  condition: string;
  model: string;
  type_of_appliance: string;
  warranty_information: string;
  features: string;
  capacity: string;
};

// for Product Details (Furniture)
type EFurnitureDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  type_of_furniture: string;
  material: string;
  dimensions: string;
  color: string;
  style: string;
  condition: string;
  assembly_required: string;
};

type TUserDetail = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  Province: string;
  District: string;
  Municipality: string;
  Phone_no: string;
  Profile_image: string;
};

type EProduct = {
  District: string;
  Municipality: string;
  Province: string;
  category_id: number;
  created_at: string;
  description: string;
  id: number;
  pname: string;
  price: number;
  updated_at: string;
  user_id: number;
  category: TCategory;
  image: TImage[];
  user: TUserDetail;
};

type TCategory = {
  category_name: string;
  created_at: string;
  id: number;
  updated_at: string;
};

type TImage = {
  id: number;
  created_at: string;
  image_url: string;
  updated_at: string;
};
