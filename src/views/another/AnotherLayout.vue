<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>New Item</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-router-outlet />
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonRouterOutlet,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
</script>
