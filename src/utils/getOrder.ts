import { baseURL, pathOrders } from "../settings/config"
import { TOrdersRes } from "../types/types";
import { checkReponse } from "./checkResponse";

export const getOrder = (orderNumber: string) => {
  const url = new URL(`${pathOrders}/${orderNumber}`, baseURL).toString()

  return fetch(url)
    .then((res) => checkReponse<TOrdersRes>(res))
    .then((data) => {
      if (data.success) return data;
      return Promise.reject(data);
    });
}
