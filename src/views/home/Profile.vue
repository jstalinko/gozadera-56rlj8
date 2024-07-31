<template>
   

  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
  
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Profile</ion-title>
        </ion-toolbar>
      </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <ion-list>
              <ion-item>
                <ion-avatar slot="start" style="width: 100px;height:100px;">
            <ion-img :src="imageUrl(profile.image)"></ion-img>
           </ion-avatar>
                <ion-label>{{ profile.username }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon :icon="mailOpenOutline" slot="start"></ion-icon>
                <ion-label>{{ profile.email }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon :icon="mapOutline" slot="start"></ion-icon>
                <ion-label>{{ profile.address }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon :icon="phonePortraitOutline" slot="start"></ion-icon>
                <ion-label>{{ profile.phone }}</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon :icon="speedometerOutline" slot="start"></ion-icon>
                <ion-label>{{ profile.level }} ( Level )</ion-label>
              </ion-item>
              <ion-item>
                <ion-icon :icon="cardOutline" slot="start"></ion-icon>
                <ion-label>{{ profile.point }} Point</ion-label>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
   
      </ion-grid>

      <ion-nav-link router-direction="forward" :component="profileEditPage" :component-props="{user: profile}">
          <ion-button color="primary" type="button">
            <ion-icon :icon="pencilOutline"></ion-icon> Edit Profile
          </ion-button>
        </ion-nav-link>
      <ion-button color="danger" type="button"  @click="doLogout"
        ><ion-icon :icon="logOutOutline"></ion-icon> Logout</ion-button
      >
      <ion-button
        color="danger"
        type="button"
        @click="deactivate"
      >
        <ion-icon :icon="powerOutline"></ion-icon> Deactivate
        Account</ion-button
      >
    </ion-content>
   

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonAvatar,
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
  toastController,
  ToastOptions,
  IonNavLink
} from "@ionic/vue";
import {
  cardOutline,
  logOutOutline,
  mailOpenOutline,
  personCircleOutline,
  speedometerOutline,
  powerOutline,
  pencilOutline,
  mapOutline,
  phonePortraitOutline,
} from "ionicons/icons";
import { clearStorage } from "@/composables/storage";
import { getProfile } from "@/composables/Http";
import { ref, onMounted } from "vue";
import { imageUrl } from "@/composables/Utils";
import profileEditPage from "./components/profile/profileEditPage.vue";
const profile: any = ref({});


const xProfile = async () => {
  const response: any = await getProfile();
  if (response.data.code == 200) {
    delete response.data.data.qrcode;
    profile.value = response.data.data;
  } else {
    await doLogout();
  }
};
const doLogout = async () => {
  await clearStorage();
  window.location.href = "/auth/login";
};

const deactivate = async () => {
  const toastConfig: ToastOptions = {
    message: "Deactivated request will be notified soon by E-Mail",
    duration: 1500,
    position: "top",
    color: "danger",
  };
  const toast = await toastController.create(toastConfig);
  await toast.present();
  await doLogout();
};

onMounted(async () => {
  await xProfile();
});
</script>

<style scoped lang="scss">
ion-title {
  &.ios,
  &.md {
    &.title-large {
      font-size: 1.25rem;
    }
  }
}
</style>
