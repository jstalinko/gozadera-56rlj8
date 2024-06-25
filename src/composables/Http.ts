import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import { useAppConfig } from "./AppConfig";
const config = useAppConfig();

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
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "@GozaderaApp",
    },
  };

  const response = await apiPost(
    'login',
    { email: email, password: password },
    options
  );

  return response;
};
