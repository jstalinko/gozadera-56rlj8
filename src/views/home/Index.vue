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


     <ion-card class="rounded">
      <ion-card-header>
        <ion-card-title class="text-center">TOP 10 SPENDER</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list :inset="true" >
      <ion-item :button="true">
        <ion-badge class="ion-padding rounded bold"  slot="start">1. </ion-badge>
        <ion-label>justalinko</ion-label>
        <ion-badge color="primary" slot="end">VIP</ion-badge>
      </ion-item>
      <ion-item :button="true">
        <ion-badge class="ion-padding rounded bold"  slot="start">1. </ion-badge>
        <ion-label>justalinko</ion-label>
        <ion-badge color="primary" slot="end">VIP</ion-badge>
      </ion-item>
      <ion-item :button="true">
        <ion-badge class="ion-padding rounded bold"  slot="start">1. </ion-badge>
        <ion-label>justalinko</ion-label>
        <ion-badge color="primary" slot="end">VIP</ion-badge>
      </ion-item>
      <ion-item :button="true">
        <ion-badge class="ion-padding rounded bold"  slot="start">1. </ion-badge>
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
  IonNote
} from "@ionic/vue";
import { beerOutline, cardOutline, mailOpenOutline, mapOutline, ticketOutline } from "ionicons/icons";
</script>