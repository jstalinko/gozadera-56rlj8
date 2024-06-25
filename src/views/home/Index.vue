<template>
  <ion-page>
    <ion-content>
      <ion-grid :fixed="true">
        <ion-row>
          <ion-col> My Bottles </ion-col>
          <ion-col> Points </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent } from "@ionic/vue";
</script>

<style scoped>
ion-col {
  background-color: #135d54;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
}
</style>
