<template>
  <ion-page>
    <ion-content>
      <ion-img src="../../../resources/icon.png" style="width:120px;height: 150px;margin:0 auto;" />
      <h4 class="ion-text-center">Welcome , Sonata !</h4>
      <ion-grid :fixed="true" class="goza-area">
        <ion-row>
          <ion-col class="ion-text-center br-1">
            <ion-icon :icon="beerOutline"></ion-icon>
            <ion-text>My Bottles</ion-text> <br>
            <b>10</b>
          </ion-col>
          <ion-col class="ion-text-center bl-1">
            <ion-icon :icon="cardOutline"></ion-icon>
            <ion-text>My Points</ion-text>
            <br>
            <b>10</b>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid class="flex flex-col flex-wrap align-items-center">
        <ion-row>
          <ion-col>
            <ion-button color="primary" class="text-reset">
              <ion-icon :icon="beerOutline" size="large"></ion-icon>
              <ion-text>My Bottles</ion-text>
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button color="primary" class="text-reset">
              <ion-icon :icon="ticketOutline" size="large"></ion-icon>
              My Tickets
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button color="primary" class="text-reset">
              <ion-icon :icon="mailOpenOutline" size="large"></ion-icon>
              RSVP
            </ion-button>
          </ion-col>
          <ion-col>
            <ion-button color="primary" class="text-reset">
              <ion-icon :icon="mapOutline" size="large"></ion-icon>
              Outlet
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonIcon,
  IonText,
  IonButton
} from "@ionic/vue";
import { beerOutline, cardOutline, mailOpenOutline, mapOutline, ticketOutline, wineOutline } from "ionicons/icons";
</script>

<style scoped>
.goza-area {
  border-radius: 100px !important;
  background-color: var(--ion-color-primary);
  padding: 13px;
  color: #fff;
  width: 90%;
  max-width: 96%;
}

.br-1 {
  border-right: 1px solid #ddd;
}

.bl-1 {
  border-left: 1px solid #ddd;
}
</style>
