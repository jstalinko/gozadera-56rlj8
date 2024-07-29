import { useAppConfig } from "./AppConfig";
import { loadingController } from "@ionic/vue";

export const currencyFormat = (value: number) => {
  if (value > 1000) {
    const total = value / 1000;
    // change . to ,
    return total.toFixed(2).toString().replace(".", ",") + " K";
  } else {
    return value;
  }
};
export const idrFormat = (value: number) => {
  return new Intl.NumberFormat("en-ID").format(value);
};

export const currencyIDR = (amount: any) => {
  amount = parseInt(amount);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Jumlah digit desimal minimum
    maximumFractionDigits: 0, // Jumlah digit desimal maksimum
  });

  // Menggunakan formatter untuk memformat angka
  return formatter.format(amount);
};

export const imageUrl = (imagePath: string | undefined) => {
  const config = useAppConfig();

  if (typeof imagePath === 'string') {
    if (!imagePath.startsWith('http')) {
      return config.storageUrl + imagePath;
    }
  }

  return imagePath;
};

export const Loading = async (duration: number, text: string) => {
  const loading = await loadingController.create({
    message: text,
    duration: duration,
  });

  loading.present();
};

export const convertDateString =  (date: any) => {
  let d = new Date(date).toLocaleDateString();
  return d;
}

export const httpBuildQuery = (params: any)=> {
  const queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
  return queryString;
}
export const getOrdinalSuffix = (number:any) =>{
  const suffixes = ["th", "st", "nd", "rd"];
  const value = number % 100;
  return number + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
}

export const dateFormatter = (date: string)=> {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}