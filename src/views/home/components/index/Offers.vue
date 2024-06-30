<template>
  <ion-grid :fixed="true">
    <ion-row>
      <ion-col size="12" size-sm="12" size-md="12" size-lg="12" size-xl="12">
        <h4 class="bold">Special Offers</h4>
      </ion-col>
      <ion-col
        v-for="it in 4"
        :key="it"
        class="count"
        size="6"
        size-sm="6"
        size-md="6"
        size-lg="6"
        size-xl="6"
      >
        <ion-img
          :src="`https://swiperjs.com/demos/images/nature-${it + 1}.jpg`"
          class="cut"
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        ></ion-img>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts" setup>
import { IonGrid, IonCol, IonRow, IonImg } from "@ionic/vue";
</script>

<style lang="scss" scoped>
ion-img {
  &::part(image) {
    box-shadow: 0px 0px 4px 4px #d49000;
    border-radius: 10px;
  }
}

ion-col {
  padding: 10px;
}
</style>
