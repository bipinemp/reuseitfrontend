import axios from "axios";

// for fetcing all Products
export const fetchAllProducts = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/getdat?page=${pageParam}&limit=10`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// for fetching product details getIndivProduct
export const getProductDetails = async (id: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getIndivProduct/${id}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// for posting Ads
interface PreviewFile extends File {
  id: string;
  preview: string;
}

export const createNewAppliance = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/homeappliances",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewMusics = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/musics",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewElectronics = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/electronics",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewFurniture = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/furnitures",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewClothing = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/clothings",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewToys = async (data: any) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/toys", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewSports = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/sports",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewBooks = async (data: any) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/books", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewAntiques = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/antiques",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewCars = async (data: any) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/cars", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewBikes = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/motorcycles",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewScooters = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/scooters",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewBicycles = async (data: any) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/bicycles",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

// for Authentication Login Register
export const registerCall = async (actual_Data: any) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/register",
      actual_Data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const loginCall = async (actual_Data: any) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/login",
      actual_Data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const logoutCall = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/logout",
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/me",
      {},
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// for Recommendation system
export const postUserIdFromProductDetailsPage = async (
  product_id: number,
  user_id: number | null
) => {
  try {
    const UserId = user_id ? user_id : null;
    const response = await axios.post("http://localhost:8000/api/recommend", {
      product_id,
      user_id: UserId,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postUserIdFromHomePage = async (user_id: number) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/get_recommend",
      { user_id: user_id }
    );
    return response;
  } catch (error) {
    return error;
  }
};
