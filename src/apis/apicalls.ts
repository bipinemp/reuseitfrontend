import { TAppliance } from "@/types/postTypes";
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

// for posting Appliance
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
