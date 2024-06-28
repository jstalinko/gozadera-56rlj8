<template>
  <ion-page>
    <ion-content>
      <Header :username="profile.username" />
      <HeaderInfo :level="profile.level" :point="profile.point" />

      <NewsCarousel />

      <Offers />

      <ion-card class="rounded">
        <ion-card-header>
          <ion-card-title class="text-center">TOP 10 SPENDER</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list :inset="true">
            <ion-item :button="true">
              <ion-badge class="ion-padding rounded bold" slot="start">
                1.
              </ion-badge>
              <ion-label>justalinko</ion-label>
              <ion-badge color="primary" slot="end">VIP</ion-badge>
            </ion-item>
            <ion-item :button="true">
              <ion-badge class="ion-padding rounded bold" slot="start">
                1.
              </ion-badge>
              <ion-label>justalinko</ion-label>
              <ion-badge color="primary" slot="end">VIP</ion-badge>
            </ion-item>
            <ion-item :button="true">
              <ion-badge class="ion-padding rounded bold" slot="start">
                1.
              </ion-badge>
              <ion-label>justalinko</ion-label>
              <ion-badge color="primary" slot="end">VIP</ion-badge>
            </ion-item>
            <ion-item :button="true">
              <ion-badge class="ion-padding rounded bold" slot="start">
                1.
              </ion-badge>
              <ion-label>justalinko</ion-label>
              <ion-badge color="primary" slot="end">VIP</ion-badge>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonCardHeader,
  IonCard,
  IonBadge,
  IonCardContent,
  IonCardTitle,
} from "@ionic/vue";

import Header from "./components/index/Header.vue";
import HeaderInfo from "./components/index/HeaderInfo.vue";
import NewsCarousel from "./components/index/NewsCarousel.vue";
import Offers from "./components/index/Offers.vue";
import { ref, onMounted } from "vue";
import { getProfile } from "@/composables/Http";
import { clearStorage, setStore } from "@/composables/storage";
import { Loading } from "@/composables/Utils";

const profile: any = ref({});

const xProfile: any = async () => {
  await Loading(1500, "Please wait ...");
  const response: any = await getProfile();
  if (response.data.code == 200) {
    await setStore("_myqrcode", response.data.data.qrcode);
    delete response.data.data.qrcode;
    profile.value = response.data.data;
  } else {
    await clearStorage();
    return "/";
  }
};

onMounted(async () => {
  await xProfile();
});
</script>

<!-- <style scoped lang="scss">
ion-col {
  text-align: center;
  &.count {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
  &.align-start {
    text-align: start;
  }
}
</style> -->
