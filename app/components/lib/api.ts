import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers() {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    return data;
  } catch (error: any) {
    console.error("Failed to fetch products:", error.message || error);

    // You can either return fallback OR throw
    throw new Error("Unable to fetch products. Please try again later.");
  }
}

export async function loginUser(data: any) {
  const res = await axios.post("/api/login", data);
  return res.data;
}

export async function getPosts() {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
}

export async function createPost(data: any) {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
