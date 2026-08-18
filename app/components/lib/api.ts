import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const setToken = (token: string) =>
  Cookies.set("token", token, {
    expires: 7,
    secure: true,
    sameSite: "lax",
  });
export const removeToken = () => Cookies.remove("token");

const getToken = () => {
  const cookie = document.cookie
    .split(";")
    .find((r) => r.trim().startsWith("token="))
    ?.trim()
    .substring("token=".length);
  return cookie ?? null;
};

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  const data = await res.json().catch(() => ({}));

  if (data.message === "token error") {
    removeToken();
    window.location.href = "/login";
  }

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
}

export const api = {
  get: <T>(url: string) => request<T>(url, { method: "GET" }),

  post: <T>(url: string, data?: any) =>
    request<T>(url, {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  put: <T>(url: string, data?: any) =>
    request<T>(url, {
      method: "PUT",
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),

  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),
};