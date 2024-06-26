<template>
  <ion-content>
    <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
  </ion-content>
</template>


<script lang="ts" setup>
import { IonContent, IonHeader, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/vue';
const handleRefresh = (event: CustomEvent) => {
  setTimeout(() => {
    alert(event);

  }, 2000);
};
</script>