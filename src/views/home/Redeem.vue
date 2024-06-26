<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
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
                <ion-button expand="block" color="primary">
                  <ion-icon :icon="heartCircle"></ion-icon>
                  Redeem</ion-button>
              </ion-card-content>

            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <div v-if="activeTab == 'history'">
        
        <NoData v-if="redeemHistories.length < 1"  :message="'Redeem your point to get special offers from us!'" />

      <ion-list :inset="true" v-if="redeemHistories.length > 0">
        <ion-item v-for="(hist,index) in redeemHistories" :key="index">
          <div class="unread-indicator-wrapper" slot="start">
            <div class="unread-indicator"></div>
          </div>
          <ion-label>
            <strong>Rick Astley</strong><br>
            <ion-text>Never Gonna Give You Up</ion-text><br>
            <ion-note color="medium" class="ion-text-wrap">
              Never gonna give you up Never gonna let you down Never gonna run...
            </ion-note>
          </ion-label>
          <div class="metadata-end-wrapper" slot="end">
            <ion-note color="medium">06:11</ion-note>
            <ion-icon color="medium" :icon="heartCircle"></ion-icon>
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
  IonCol
} from "@ionic/vue";
import { ref, onMounted, watch } from 'vue';
import { getRedeemables, getRedeemHistory } from "@/composables/Http";
import { Loading, imageUrl } from "@/composables/Utils";
import { heartCircle } from "ionicons/icons";
import NoData from '@/components/NoData.vue';

const redeemables: any = ref([]);
const redeemHistories: any = ref([]);
const activeTab: any = ref('redeem');

watch(activeTab, async () => {
  if (activeTab.value == 'redeem') {
    await getProductRedeem();
  } else if (activeTab.value == 'history') {
    await getRedeemHist();
  }
});

const getProductRedeem = async () => {
  await Loading(1600, "Please wait ...");
  let response: any = await getRedeemables();
  if (response.data.code == 200) {
    redeemables.value = response.data.data;
  } else {

  }
}
const getRedeemHist = async () => {
  await Loading(1500, "Please wait ...");
  let response: any = await getRedeemHistory();
  if (response.data.code == 200) {
    redeemHistories.value = response.data.data;
  }
  console.log(response.data.data);
}

onMounted(async () => {
  await getProductRedeem();
});
</script>
