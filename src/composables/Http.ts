import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import { useAppConfig } from "./AppConfig";
import { getStore, getToken } from "./storage";
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
  await apiGet(`top-spender`, { headers: (await HEADERS()).basic });

export const getBanners = async () =>
  await apiGet(`banners`, { headers: (await HEADERS()).auth });

export const getMyBottles = async () => {
  let member_id = await getStore("_id");
  return await apiGet(`my-bottles?member_id=${member_id}`, {
    headers: (await HEADERS()).auth,
  });
};

/*------------------------- get Event ----------------------------*/
export const getEvent = async (category: String | null) => {
  let resp: any;
  if (category == null) {
    resp = await apiGet(`event`, { headers: (await HEADERS()).auth });
  } else {
    resp = await apiGet(`event/${category}`, {
      headers: (await HEADERS()).auth,
    });
  }

  return resp;
};

/*--------------------------- get Outlets ------------------------*/
export const getOutlets = async () => {
  return await apiGet(`outlets`, { headers: (await HEADERS()).auth });
};
/*-------------------------- get outlet floor  -------------------*/
export const getOutletFloor = async (outlet_id: any, rsvp_date: any) => {
  return await apiGet(`outlet-tables-floor/${outlet_id}`, {
    headers: (await HEADERS()).auth,
  });
};

export const getOutletTableFloor = async (
  outlet_id: any,
  floor: any,
  rsvp_date: any
) => {
  return await apiGet(
    `outlet-tables-floor/${outlet_id}/${floor}?rsvp_date=${rsvp_date}`,
    { headers: (await HEADERS()).auth }
  );
};

/*-------------------------- get outlet by id -------------------*/
export const getOutletById = async (id: Number) => {
  return await apiGet(`outlet/${id}`, { headers: (await HEADERS()).auth });
};

/*-------------------------- store reservation -------------------*/
export const storeRsvp = async (
  data: any,
  outlet_id: any,
  user_id: any,
  rsvp_date: any,
  payment_method: any
) => {
  return await apiPost(
    `rsvp-multi`,
    {
      data: data,
      outlet_id: outlet_id,
      user_id: user_id,
      rsvp_date: rsvp_date,
      payment_method: payment_method,
    },
    {
      headers: (await HEADERS()).auth,
    }
  );
};

/*------------------------- get my tickets --------------------------*/
export const getMyTickets = async () => {
  return await apiGet(`my-ticket`, { headers: (await HEADERS()).auth });
};

/*------------------------- get gallery -----------------------------*/
export const getGallery = async(event_id: Number) => {
  return await apiGet(`gallery/${event_id}` , {headers: (await HEADERS()).auth });
};

/*------------------------- upload transfer --------------------------*/
export const uploadTransfer = async(files:any,rsvp_id: any) => {
  var formData = new FormData();
  formData.append('image', files);
  formData.append('rsvp_id', rsvp_id);
  let resp:any= await apiPost(`upload-receipt` , formData , {headers: (await HEADERS()).auth});

  return resp;
}

/*-------------------------- rsvp detail ---------------------------------*/
export const getRsvpDetail = async(id: Number) => {
  return await apiGet(`rsvp-detail/${id}` , {headers: (await HEADERS()).auth});
}

/*--------------------------- update profile -----------------------------*/
export const setUpdateProfile = async(updatedProfile: any) => {
  return await apiPost(`update-profile` , {
      username: updatedProfile.username,
      email: updatedProfile.email,
      phone: updatedProfile.phone,
      address: updatedProfile.address,
      newPassword: updatedProfile.newPassword,
      currentPassword: updatedProfile.currentPassword,
  },{headers: (await HEADERS()).auth});
}

/*------------------------------- upload photo -------------------------*/
export const uploadProfile = async(image: any) => {
  var formData = new FormData();
  formData.append('image',image);
  let resp: any = await apiPost(`upload-profile` , formData, {headers:(await HEADERS()).auth});
  return resp;
}