import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import { useAppConfig } from "./AppConfig";
import { getToken } from "./storage";
const config = useAppConfig();

export const _TOKEN = await getToken();
export const HEADERS = {
  auth: {
    "Content-Type": "application/json",
    "User-Agent": "@GozaderaApp",
    Authorization: `Bearer ${_TOKEN}`,
  },
  basic: {
    "Content-Type": "application/json",
    "User-Agent": "@GozaderaApp",
  },
};

/*--------------------------- apiGet ------------------------------*/

export const apiGet = async (path: any, options: any) => {
  let opt = {
    url: config.apiUrl + path,
    ...options,
  };
  const response: HttpResponse = await CapacitorHttp.get(opt);

  return response;
};

/*--------------------------- apiPost ------------------------------*/

export const apiPost = async (path: any, data: any, options: any) => {
  let opt = {
    url: config.apiUrl + path,
    data: data,
    ...options,
  };
  const response: HttpResponse = await CapacitorHttp.post(opt);

  return response;
};

/*--------------------------- doLogin ------------------------------*/
export const doLogin = async (email: string, password: string) => {
  let options = {
    headers: HEADERS.basic,
  };

  const response = await apiPost(
    "login",
    { email: email, password: password },
    options
  );

  return response;
};

/*-------------------------- Get product by category ----------------- */
export const getProductByCategory = async (category: string) => {
  let options = {
    headers: HEADERS.auth,
  };
  const response: any = await apiGet(`category/${category}`, options);

  return response;
};

/*-------------------------- Get product Redeemables ----------------- */
export const getRedeemables = async () =>
  await apiGet(`product-redeemables`, { headers: HEADERS.auth });

/*-------------------------- Redeem Product ----------------- */
export const doRedeem = async (product_id: number, redeem_id: number) =>
  await apiPost(
    `redeem`,
    { product_id: product_id, redeem_id: redeem_id },
    { headers: HEADERS.auth }
  );
/*------------------------- Redeem History ---------------------*/
export const getRedeemHistory = async() => await apiGet(`redeem-history` , {headers: HEADERS.auth});

/*------------------------- get Profile ------------------------*/
export const getProfile = async() => await apiGet(`profile`,{headers:HEADERS.auth});