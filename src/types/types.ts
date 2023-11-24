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
