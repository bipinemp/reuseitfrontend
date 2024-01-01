import axios from "axios";
import { FaPhoneAlt } from "react-icons/fa";

// for fetcing all Products
export const fetchAllProducts = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/getdat?page=${pageParam}&limit=10`,
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
      `http://localhost:8000/api/getIndivProduct/${id}`,
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

export const createOldProduct = async (data: any) => {
  const { fnname, ...actualdata } = data;
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/${fnname}`,
      actualdata,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

export const createNewProduct = async (data: any) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/sellproducts`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const resData = response.data;

    return resData;
  } catch (error) {
    return error;
  }
};

// get categories list
export const getCategoriesList = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/getCategory");
    return response.data;
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
      },
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
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const makeCategory = async (data: any) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/makeCategory",
      data,
      { withCredentials: true },
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
      { withCredentials: true },
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
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// for Recommendation system
export const postUserIdFromProductDetailsPage = async (
  product_id: number,
  user_id: number | null,
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
      { user_id: user_id },
    );
    return response;
  } catch (error) {
    return error;
  }
};

// for filtering products based on category , max_price , min_price
export const filterProducts = async (pageNum: number, params: any) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/filter?page=${pageNum}`,
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// DASHBOARD
// for fetcing all Products
export const fetchMyProducts = async ({ pageParam }: { pageParam: number }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/myproducts?page=${pageParam}&limit=10`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteMyProduct = async (id: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/deleteads/${id}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

type StatusType = {
  product_id: number;
  selling_price: string;
};

export const setStatus = async (data: StatusType) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/status`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const sendPhoneNumber = async (phone: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sendotp`,
      { number: phone },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const sendOtp = async (otp: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/verifyotp`,
      { otp: otp },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// For updating product
export const updateProduct = async (data: any) => {
  const { function_name, ...actualdata } = data;
  try {
    const response = await axios.post(
      `http://localhost:8000/api/update/${function_name}`,
      actualdata,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateDynamicProduct = async (data: any) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/UpdateProducts`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// for getting individual Category details
export const getCategoryDetails = async (id: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/getindivcategory/${id}`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

// Get All Users List for chatting
export const getUsersList = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/getUsers`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

// get allMessages of user
export const getMessagesList = async (senderId: number, id: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/messages/${senderId}/${id}`,
    );

    return response.data.messages;
  } catch (error) {
    return error;
  }
};

// get details of user
export const getUserDetails = async (id: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/userdetails/${id}`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

// get latest chat user'id
export const getLatestMessageId = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

// for getting chat notification count
export const getCount = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/getmsgcount", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// for Online and Offline status for Chatting
export const makeOnline = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/activeuser", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const makeOffline = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/notactiveuser",
      {
        withCredentials: true,
      },
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Date formating
export const formatDate = (date: string) => {
  const currentDate = new Date();
  const inputDateTime = new Date(date);

  // Check if the date is today
  if (
    inputDateTime.getDate() === currentDate.getDate() &&
    inputDateTime.getMonth() === currentDate.getMonth() &&
    inputDateTime.getFullYear() === currentDate.getFullYear()
  ) {
    return "TODAY";
  }

  // Check if the date is yesterday
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);

  if (
    inputDateTime.getDate() === yesterday.getDate() &&
    inputDateTime.getMonth() === yesterday.getMonth() &&
    inputDateTime.getFullYear() === yesterday.getFullYear()
  ) {
    return "YESTERDAY";
  }

  // Format the date using Intl.DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(inputDateTime);

  // Check if the year is the current year
  if (inputDateTime.getFullYear() === currentDate.getFullYear()) {
    return formattedDate;
  } else {
    return `${formattedDate} ${inputDateTime.getFullYear()}`;
  }
};

export const formatDateMsg = (date: string) => {
  const currentDate = new Date();
  const inputDateTime = new Date(date);

  // Format the date using Intl.DateTimeFormat
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(inputDateTime);

  // Check if the year is the current year
  if (inputDateTime.getFullYear() === currentDate.getFullYear()) {
    return formattedDate;
  } else {
    return `${formattedDate} ${inputDateTime.getFullYear()}`;
  }
};
