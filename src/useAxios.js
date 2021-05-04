import axios from "axios";
import { useState } from "react";
import { errorToast } from "./components/toasts";

export const useAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);

  async function genericRequest(callback) {
    try {
      setIsLoading(true);
      const data = await callback();
      return data;
    } catch (err) {
      errorToast("Reqest Falied! Server Error");
    } finally {
      setIsLoading(false);
    }
  }

  async function getData() {
    return genericRequest(async () => {
      const response = await axios.get(url);
      return response.data;
    });
  }

  async function postData(newItem) {
    return genericRequest(async () => {
      const response = await axios.post(url, newItem);
      return response.data;
    });
  }

  async function deleteData(id) {
    return genericRequest(async () => {
      const response = await axios.delete(`${url}/${id}`);
      if (response.status === 204) {
        return "success";
      }
    });
  }
  async function updateData(id, body) {
    const updateRequest = async () => {
      const response = await axios.post(`${url}/${id}`, body);
      if (response.status === 201) {
        return response.data;
      }
    };
    return genericRequest(updateRequest);
  }

  return { isLoading, getData, postData, deleteData, updateData };
};
