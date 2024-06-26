import { useAppConfig } from "./AppConfig";
import { loadingController } from "@ionic/vue";

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

export const imageUrl = (imagePath: string) => {
  let config = useAppConfig();
  if(imagePath !== undefined)
    {
      if(!imagePath.match(/^http/))
        {
          return config.storageUrl + imagePath;
        }
    }
  
  return imagePath;
};


export const Loading = async (duration: number , text: string) => {
    const loading = await loadingController.create({
        message: text,
        duration: duration,
      });

      loading.present();
}