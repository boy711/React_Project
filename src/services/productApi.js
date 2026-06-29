import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export async function getProducts() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Unable to load products. Please try again.");
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Unable to load product details. Please try again.");
  }
}
