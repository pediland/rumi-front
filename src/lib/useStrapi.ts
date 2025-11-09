// src/lib/useStrapi.ts
"use client";

import useSWR from "swr";
import qs from "qs";
import { fetcher, API_URL } from "./fetcher";
import { useLocale } from "next-intl";

export function useStrapi(
  endpoint: string,
  params: any = {},
  options: any = {},
) {
  const locale = useLocale();
  const query = qs.stringify({ ...params, locale }, { encodeValuesOnly: true });
  const url = `${API_URL}/api/${endpoint}${query ? `?${query}` : ""}`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher, options);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
