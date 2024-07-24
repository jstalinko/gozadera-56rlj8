<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense" class="mt-header">
        <ion-toolbar>
          <ion-title>Redeem your point</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding" style="margin-top: 20px">
        <ion-segment value="buttons" v-model="activeTab">
          <ion-segment-button value="redeem">
            <ion-label>Redeem</ion-label>
          </ion-segment-button>
          <ion-segment-button value="history">
            <ion-label>History</ion-label>
          </ion-segment-button>
        </ion-segment>
        <br />
      </div>
      <ion-grid v-if="activeTab == 'redeem'">
        <ion-row>
          <ion-col size="6" v-for="(red, index) in redeemables" :key="index">
            <ion-card>
              <img :alt="red.product.name" :src="imageUrl(red.product.image)" />
              <ion-card-header>
                <ion-card-title>{{ red.product.name }}</ion-card-title>
                <ion-card-subtitle color="primary">{{ red.point }} Points</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <div v-if="myPoint >= red.point">
                  <ion-button expand="block" color="primary" @click="getRedeem(red.id, red.product.id)">
                    <ion-icon :icon="heartCircle"></ion-icon> Redeem</ion-button>
                </div>
                <div v-else>
                  <ion-button expand="block" color="danger">
                    <ion-icon :icon="alertCircleOutline"></ion-icon> Redeem </ion-button>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div v-if="activeTab == 'history'">
        <NoData v-if="redeemHistories.length < 1" :message="'Redeem your point to get special offers from us!'" />

        <ion-list :inset="true" v-if="redeemHistories.length > 0">
          <ion-item v-for="(hist, index) in redeemHistories" :key="index">
            
            <div class="unread-indicator-wrapper" slot="start">
              <div class="unread-indicator"></div>
            </div>
            <ion-label>
              <strong>{{ hist.product.name }}</strong><br />
              <ion-text>{{ hist.note }}</ion-text><br />
              <ion-note :color="hist.status == 'success' ? 'success' : 'warning'" class="ion-text-wrap" >
                {{ hist.status.toUpperCase() }}
              </ion-note>
            </ion-label>
            <div class="metadata-end-wrapper" slot="end">
              <ion-note color="medium">{{ new Date(hist.created_at).toLocaleDateString() }}&nbsp;</ion-note>
              <ion-icon color="medium" :icon="calendarClearOutline"></ion-icon>
            </div>
          </ion-item>
        </ion-list>
      </div>
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
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonIcon,
  IonButton,
  IonCardContent,
  IonItem,
  IonNote,
  IonText,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  toastController,
} from "@ionic/vue";
import { ref, onMounted, watch } from "vue";
import { doRedeem, getRedeemables, getRedeemHistory } from "@/composables/Http";
import { Loading, convertDateString, imageUrl } from "@/composables/Utils";
import { alertCircleOutline, calendarClearOutline, heartCircle } from "ionicons/icons";
import NoData from "@/components/NoData.vue";
import { getStore } from "@/composables/storage";
import { HttpResponse } from "@capacitor/core";

const redeemables: any = ref([]);
const redeemHistories: any = ref([]);
const activeTab: any = ref("redeem");
const myPoint = ref(0);
watch(activeTab, async () => {
  if (activeTab.value == "redeem") {
    await getProductRedeem();
  } else if (activeTab.value == "history") {
    await getRedeemHist();
  }
});

const getProductRedeem = async () => {
  await Loading(1600, "Please wait ...");
  const response: any = await getRedeemables();
  if (response.data.code == 200) {
    redeemables.value = response.data.data;
  }
  // else {
  // }
};
const getRedeemHist = async () => {
  await Loading(1500, "Please wait ...");
  const response: any = await getRedeemHistory();
  if (response.data.code == 200) {
    redeemHistories.value = response.data.data;
  }
  console.log(response.data.data);
};
const getRedeem = async (id: number, product_id: number) => {
  await Loading(1000, "Please wait...");
  let toastConfig: any;
  let resp: HttpResponse = await doRedeem(product_id, id);

  if (resp.data.code == 200) {
    toastConfig = {
      message: "Success Redeem!",
      duration: 1500,
      position: "bottom",
      color: "success",
    };
  } else {
    toastConfig = {
      message: "Failed to redeem: " + resp.data.message,
      duration: 1500,
      position: "bottom",
      color: "danger",
    };
  }
  let toast = await toastController.create(toastConfig);
  toast.present();

}


onMounted(async () => {
  await getProductRedeem();
  myPoint.value = await getStore('_point');
});
</script>

<style lang="scss" scoped>
ion-title {

  &.ios,
  &.md {
    &.title-large {
      font-size: 1.25rem;
    }
  }
}

ion-card {
  margin-inline-start: 0;
  margin-inline-end: 0;
  margin-right: 0;
  margin-left: 0;
}

ion-card-title {

  &.ios,
  &.md {
    font-size: 1rem;
  }
}
</style>
