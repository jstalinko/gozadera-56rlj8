<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-grid :fixed="true">
        <ion-row>
          <!-- --------------------------------- Bottles -------------------------------- -->
          <ion-col size="1" size-sm="1" size-md="1" size-lg="1" size-xl="1">
            <ion-grid :fixed="true">
              <ion-row>
                <ion-col
                  size="2"
                  size-sm="2"
                  size-md="2"
                  size-lg="2"
                  size-xl="2"
                >
                  My Bottles
                </ion-col>
                <ion-col
                  size="2"
                  size-sm="2"
                  size-md="2"
                  size-lg="2"
                  size-xl="2"
                  class="count"
                >
                  <ion-icon :icon="wineOutline" />
                  123
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>

          <!-- --------------------------------- Points --------------------------------- -->
          <ion-col size="1" size-sm="1" size-md="1" size-lg="1" size-xl="1">
            <ion-grid :fixed="true">
              <ion-row>
                <ion-col
                  size="2"
                  size-sm="2"
                  size-md="2"
                  size-lg="2"
                  size-xl="2"
                >
                  My Bottles
                </ion-col>
                <ion-col
                  size="2"
                  size-sm="2"
                  size-md="2"
                  size-lg="2"
                  size-xl="2"
                  class="count"
                >
                  <ion-icon :icon="walletOutline" />
                  123
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonIcon } from "@ionic/vue";
import { walletOutline, wineOutline } from "ionicons/icons";
</script>

<style scoped>
ion-grid {
  --ion-grid-columns: 2;
}

ion-col {
  /* background-color: #135d54; */
  border: solid 1px #fff;
  margin: 6px 0;
  /* color: #fff; */
  text-align: center;
}
.count {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
