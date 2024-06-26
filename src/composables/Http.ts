import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import { useAppConfig } from "./AppConfig";
import { getToken } from "./storage";
const config = useAppConfig();

export const _TOKEN = await getToken();
export const HEADERS = {
  auth:  {
    "Content-Type": "application/json",
    "User-Agent": "@GozaderaApp",
     Authorization: `Bearer ${_TOKEN}`
  },
  basic: {
    "Content-Type": "application/json",
    "User-Agent": "@GozaderaApp",
  }
};


/*--------------------------- apiGet ------------------------------*/

export const apiGet = async (path: any , options: any) => {
  let opt = {
    url: config.apiUrl + path,
    ...options,
  };
  const response: HttpResponse = await CapacitorHttp.get(opt);

  return response;
};

/*--------------------------- apiPost ------------------------------*/

export const apiPost = async (path: any , data: any, options: any) => {
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
    headers: HEADERS.basic
  };

  const response = await apiPost(
    'login',
    { email: email, password: password },
    options
  );

  return response;
};

/*-------------------------- Get product by category ----------------- */
export const getProductByCategory = async(category: string) => {
  
  let options = {
    headers: HEADERS.auth
  };
  const response: any = await apiGet(`category/${category}` , options);

  return response;

}