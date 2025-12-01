const BASE_URL = "http://localhost:8000/api";

export const apiGet = async (url: string) => {
  const res = await fetch(`${BASE_URL}${url}`, { cache: "no-store" });
  return res.json();
};

export const apiPost = async (
  url: string,
  data: FormData | Record<string, unknown>
) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers:
      data instanceof FormData ? {} : { "Content-Type": "application/json" },
  });

  return res.json();
};

export const apiDelete = async (url: string) => {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
  });
  return res.json();
};
