export const API_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://artstudio-strapi-ywdttp-1cfc68-57-129-103-197.traefik.me";

export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN || ""}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    (error as any).info = await res.json();
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
};
