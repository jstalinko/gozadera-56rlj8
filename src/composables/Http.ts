import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import { useAppConfig } from "./AppConfig";
import { getToken } from "./storage";
const config = useAppConfig();

export const HEADERS = async () => {
  async function compile() {
    const _TOKEN = await getToken();

    console.log("token", _TOKEN);

    return {
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
  }

  const { auth, basic } = await compile();
  return { auth, basic };
};

/*--------------------------- apiGet ------------------------------*/

export const apiGet = async (path: any, options: any) => {
  const opt = {
    url: config.apiUrl + path,
    ...options,
  };
  const response: HttpResponse = await CapacitorHttp.get(opt);

  return response;
};

/*--------------------------- apiPost ------------------------------*/

export const apiPost = async (path: any, data: any, options: any) => {
  const opt = {
    url: config.apiUrl + path,
    data: data,
    ...options,
  };
  const response: HttpResponse = await CapacitorHttp.post(opt);

  return response;
};

/*--------------------------- doLogin ------------------------------*/
export const doLogin = async (email: string, password: string) => {
  const options = {
    headers: (await HEADERS()).basic,
  };

  const response = await apiPost(
    "login",
    { email: email, password: password },
    options
  );

  return response;
};

/*-------------------------- doRegister --------------------------- */
export const doRegister = async (
  email: string,
  username: string,
  phone: any
) => {
  const response = await apiPost(
    `register`,
    {
      email: email,
      username: username,
      phone: phone,
    },
    { headers: (await HEADERS()).basic }
  );

  return response;
};

/*------------------------ doResetPassword ------------------------*/
export const doResetPassword = async (phone: any) => {
  const response = await apiPost(
    `forgot-password`,
    { phone: phone },
    { headers: (await HEADERS()).basic }
  );

  return response;
};

/*-------------------------- Get product by category ----------------- */
export const getProductByCategory = async (category: string) => {
  const options = {
    headers: (await HEADERS()).auth,
  };
  const response: any = await apiGet(`category/${category}`, options);

  return response;
};

/*-------------------------- Get product Redeemables ----------------- */
export const getRedeemables = async () =>
  await apiGet(`product-redeemables`, { headers: (await HEADERS()).auth });

/*-------------------------- Redeem Product ----------------- */
export const doRedeem = async (product_id: number, redeem_id: number) =>
  await apiPost(
    `redeem`,
    { product_id: product_id, redeem_id: redeem_id },
    { headers: (await HEADERS()).auth }
  );
/*------------------------- Redeem History ---------------------*/
export const getRedeemHistory = async () =>
  await apiGet(`redeem-history`, { headers: (await HEADERS()).auth });

/*------------------------- get Profile ------------------------*/
export const getProfile = async () =>
  await apiGet(`profile`, { headers: (await HEADERS()).auth });

export const getTopSpenders = async () =>
  await apiGet("top-spender", { headers: (await HEADERS()).basic });

export const getBanners = async () =>
  await apiGet("banners", { headers: (await HEADERS()).auth });
