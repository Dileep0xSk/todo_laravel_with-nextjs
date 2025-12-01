const BASE_URL = "http://localhost:8000/api";

export const apiGet = async (url: string) => {
  const res = await fetch(`${BASE_URL}${url}`, { cache: "no-store" });
  return res.json();
};

export const apiPost = async (url: string, data: any) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    body: data,
  });
  return res.json();
};

export const apiDelete = async (url: string) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
  });
  return res.json();
};
