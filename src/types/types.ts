// For Recommendations  Data
type TRecommendations = {
  data: Recommendation;
};

type MyProduct = {
  id: number;
  user_id: number;
  category_id: number;
  pname: string;
  description: string;
  Province: string;
  District: string;
  Municipality: string;
  price: number;
  created_at: string;
  updated_at: string;
  category: TCategory;
};

type Recommendation = {
  recommendations: ActualRecommendation[];
};

type ActualRecommendation = {
  District: string;
  Municipality: string;
  Province: string;
  category_id?: number;
  created_at: string;
  description: string;
  id: number;
  pname: string;
  price: number;
  updated_at: string;
  user_id: number;
  image: RecoImage[];
  category?: TCategory;
};

type RecoImage = {
  id: number;
  product_id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
};

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
  image?: Image[];
  status: number;
};

type Image = {
  id: number;
  product_id?: number;
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
  products: UserProducts[];
};

type TUserDetails = {
  data: UserDetail;
};

interface UserProducts {
  id: number;
  user_id: number;
  category_id: number;
  pname: string;
  description: string;
  Province: string;
  District: string;
  Municipality: string;
  price: number;
  created_at: string;
  updated_at: string;
  image: UserProdImages[];
}

interface UserProdImages {
  id: number;
  product_id: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}

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

// for Product Details (Clothing)
type EClothingDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  type_of_clothing_accessory: string;
  size: string;
  color: string;
  brand: string;
  material: string;
  condition: string;
  care_instructions: string;
};

// for Product Details (Toys and Games)
type EToysDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  type_of_toy_game: string;
  age_group: string;
  brand: string;
  condition: string;
  description: string;
  safety_information: string;
  assembly_required: string;
  recommended_use: string;
};

// for Product Details (Sports and Fitness)
type ESportsDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  type_of_equipment: string;
  brand: string;
  condition: string;
  size_weight: string;
  features: string;
  suitable_sport_activity: string;
  warranty_information: string;
  usage_instructions: string;
};

// for Product Details (Books and Media)
type EBooksDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  author_artist: string;
  genre: string;
  format: string;
  condition: string;
  edition: string;
  isbn_upc: string;
};

// for Product Details (Antiques and Collectibles)
type EAntiquesDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  type_of_item: string;
  era_period: string;
  material: string;
  condition: string;
  provenance_location: string;
  rarity: string;
  historical_significance: string;
  certification: string;
};

// for Product Details (Cars)
type ECarsDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  brand: string;
  model: string;
  year: string;
  condition: string;
  km_driven: string;
  color: string;
  used_time: string;
  fuel_type: string;
  owner: string;
  transmission_type: string;
};

// for Product Details (Bikes & Scooters)
type EBikesScootersDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  brand: string;
  model: string;
  year: string;
  mileage: string;
  condition: string;
  km_driven: string;
  color: string;
  used_time: string;
  owner: string;
};

// for Product Details (Bicycles)
type EBicyclesDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  brand: string;
};

// for Product Details (Musics)
type EMusicsDetails = {
  id: number;
  created_at: string;
  updated_at: string;
  product: EProduct;
  product_id: number;

  type_of_instrument: string;
  brand: string;
  condition: string;
  material: string;
  accessories_included: string;
  sound_characteristics: string;
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
  ActiveStatus?: number;
  verifiedStatus?: number;
  Timeago?: string;
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

// for Chatting Users list data
type UserType = {
  id: number;
  sender_id: number;
  receiver_id: number;
  username: string;
  message: string;
  created_at: string;
  updated_at: string;
  msg_image: string | null;
  msg_status: number;
  otherUserdata: {
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
    ActiveStatus?: number;
    verifiedStatus?: number;
  };
  authUserData: {
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
    ActiveStatus?: number;
    verifiedStatus?: number;
  };
};
