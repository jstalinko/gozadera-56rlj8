<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense" class="mt-header">
        <ion-toolbar>
          <ion-title>Explore our outlets</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Gozadera Surabaya</ion-card-title>
          <br>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.778839444882!2d112.74435097592152!3d-7.2659910927409035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbc2fc4e7249%3A0x1ed2ba078562f007!2sGOZADERA%20INDONESIA!5e0!3m2!1sid!2sid!4v1719756172441!5m2!1sid!2sid"
            width="100%" height="200" style="border:0;" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </ion-card-header>

        <ion-card-content>
          Here's a small text description for the card content. Nothing more, nothing less.
        </ion-card-content>

        <ion-button expand="block"><ion-icon :icon="mailOutline"></ion-icon>&nbsp; Reservasi</ion-button>
        <br>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonIcon, IonCardContent, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { mailOutline } from 'ionicons/icons';
</script>