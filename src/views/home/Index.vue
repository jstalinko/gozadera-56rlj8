<template>
  <ion-page>    
    <ion-content>
      
      <ion-img
        src="/icon.png"
        style="width: 120px; height: 150px; margin: 0 auto"
      />
      <h4 class="ion-text-center">Welcome , {{ profile.username }} !</h4>
      <ion-grid :fixed="true" class="pye rounded-full">
        <ion-row>
          <ion-col
            class="br-1"
            size="6"
            size-sm="6"
            size-md="6"
            size-lg="6"
            size-xl="6"
          >
            <ion-grid :fixed="true" class="transparent">
              <ion-row>
                <ion-col
                  size="12"
                  size-sm="12"
                  size-md="12"
                  size-lg="12"
                  size-xl="12"
                >
                  Level
                </ion-col>
                <ion-col
                  class="count"
                  size="12"
                  size-sm="12"
                  size-md="12"
                  size-lg="12"
                  size-xl="12"
                >
                  <ion-icon :icon="speedometerOutline" />
                  {{ profile.level ?? 'Basic' }}
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
          <ion-col
            class="bl-1"
            size="6"
            size-sm="6"
            size-md="6"
            size-lg="6"
            size-xl="6"
          >
            <ion-grid :fixed="true" class="transparent">
              <ion-row>
                <ion-col
                  size="12"
                  size-sm="12"
                  size-md="12"
                  size-lg="12"
                  size-xl="12"
                >
                  My Points
                </ion-col>
                <ion-col
                  class="count"
                  size="12"
                  size-sm="12"
                  size-md="12"
                  size-lg="12"
                  size-xl="12"
                >
                  <ion-icon :icon="cardOutline" />
                  {{ profile.point ?? 0 }}
               
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid :fixed="true" class="transparent">
        <ion-row>
          <ion-col size="3" size-sm="3" size-md="3" size-lg="3" size-xl="3">
            <ion-button
              expand="block"
              color="primary"
              class="text-reset"
              href="/home/my-bottles"
            >
              <ion-icon :icon="beerOutline"></ion-icon>
              <ion-text>Bottles</ion-text>
            </ion-button>
          </ion-col>
          <ion-col size="3" size-sm="3" size-md="3" size-lg="3" size-xl="3">
            <ion-button
              expand="block"
              color="primary"
              class="text-reset"
              href="/home/my-tickets"
            >
              <ion-icon :icon="ticketOutline"></ion-icon>
              Tickets
            </ion-button>
          </ion-col>
          <ion-col size="3" size-sm="3" size-md="3" size-lg="3" size-xl="3">
            <ion-button
              expand="block"
              color="primary"
              class="text-reset"
              href="/home/outlets"
            >
              <ion-icon :icon="mailOpenOutline"></ion-icon>
              RSVP
            </ion-button>
          </ion-col>
          <ion-col size="3" size-sm="3" size-md="3" size-lg="3" size-xl="3">
            <ion-button
              expand="block"
              color="primary"
              class="text-reset"
              href="/home/outlets"
            >
              <ion-icon :icon="mapOutline"></ion-icon>
              Outlet
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-card class="rounded">
        <ion-card-header>
          <ion-card-title class="text-center">TOP 10 SPENDER</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list :inset="true">
            <ion-item :button="true">
              <ion-badge class="ion-padding rounded bold" slot="start"
                >1.
              </ion-badge>
              <ion-label>justalinko</ion-label>
              <ion-badge color="primary" slot="end">VIP</ion-badge>
            </ion-item>
            <ion-item :button="true">
              <ion-badge class="ion-padding rounded bold" slot="start"
                >1.
              </ion-badge>
              <ion-label>justalinko</ion-label>
              <ion-badge color="primary" slot="end">VIP</ion-badge>
            </ion-item>
            <ion-item :button="true">
              <ion-badge class="ion-padding rounded bold" slot="start"
                >1.
              </ion-badge>
              <ion-label>justalinko</ion-label>
              <ion-badge color="primary" slot="end">VIP</ion-badge>
            </ion-item>
            <ion-item :button="true">
              <ion-badge class="ion-padding rounded bold" slot="start"
                >1.
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
  IonIcon,
  IonText,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonCol,
  IonGrid,
  IonRow,
  IonImg,
  IonCardHeader,
  IonCard,
  IonBadge,
  IonCardContent,
  IonCardTitle,
useIonRouter
} from "@ionic/vue";
import {
  beerOutline,
  cardOutline,
  mailOpenOutline,
  mapOutline,
  speedometerOutline,
  ticketOutline,
} from "ionicons/icons";
import {ref,onMounted} from 'vue';
import {getProfile} from "@/composables/Http";
import {clearStorage,setStore} from "@/composables/storage";
import { Loading } from "@/composables/Utils";

const profile:any = ref({});


const xProfile: any = async() => {
  await Loading(1500,"Please wait ...");
  let response:any = await getProfile();
  if(response.data.code == 200)
  {
    await setStore('_myqrcode',response.data.data.qrcode);
    delete response.data.data.qrcode;
    profile.value = response.data.data;
  }else{
    await clearStorage();
    return '/';
  }

}

onMounted(async () => {
  await xProfile();
});

</script>

<style scoped lang="scss">
ion-grid {
  // --ion-grid-columns: 2;
  background-color: var(--ion-color-primary);
  &.pye {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  &.rounded-full {
    border-radius: 999px;
  }
  &.transparent {
    background-color: transparent;
  }
}

ion-col {
  text-align: center;
  &.count {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
}
</style>
