type Product = {
  id: number;
  user_id: number;
  category_id: number;
  pname: string;
  description: string;
  price: number;
  created_at: string;
  updated_at: string;
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
