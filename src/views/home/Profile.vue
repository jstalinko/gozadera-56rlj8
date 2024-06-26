<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Profile</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid >
        <ion-row>
          <ion-col size="4">
            <ion-img :src="imageUrl(profile.image)" ></ion-img>
          </ion-col>
          <ion-col size="8">
           <ion-list>
            <ion-item>
              <ion-icon :icon="personCircleOutline" slot="start"></ion-icon>
              <ion-label>{{ profile.username }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon :icon="mailOpenOutline" slot="start"></ion-icon>
              <ion-label>{{ profile.email }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon :icon="speedometerOutline" slot="start"></ion-icon>
              <ion-label>{{ profile.level }}</ion-label>
            </ion-item>
            <ion-item>
              <ion-icon :icon="cardOutline" slot="start"></ion-icon>
              <ion-label>{{ profile.point }} Point</ion-label>
            </ion-item>
           </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
      
      <ion-button color="danger" expand="full" @click="doLogout"><ion-icon :icon="logOutOutline"></ion-icon>  Logout</ion-button> 
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonCol,
  IonRow,
  IonGrid,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonImg,
useIonRouter
} from "@ionic/vue";
import { cardOutline, logOutOutline, mailOpenOutline, personCircleOutline, speedometerOutline } from "ionicons/icons";
import { clearStorage } from "@/composables/storage";
import { getProfile } from "@/composables/Http";
import { ref,onMounted } from "vue";
import { imageUrl } from "@/composables/Utils";

const router = useIonRouter();
const profile: any = ref({});

const xProfile = async() => {
  let response: any = await getProfile();
  if(response.data.code == 200)
  {
    delete response.data.data.qrcode;
    profile.value = response.data.data;
  }else{
    await doLogout();
  }
}
const doLogout = async() => {
  await clearStorage();
  return router.push('/auth/login');
}


onMounted(async () => {
  await xProfile();
})
</script>
