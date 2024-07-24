<template>
  <ion-grid :fixed="true">
    <ion-row>
      <ion-col size="12" size-sm="12" size-md="12" size-lg="12" size-xl="12">
        <h4 class="bold">Special Offers</h4>
      </ion-col>
      <ion-col
        v-for="(val, idx) in offers"
        :key="idx"
        class="wrapper"
        size="6"
        size-sm="6"
        size-md="6"
        size-lg="6"
        size-xl="6"
      >
        <ion-img
          src="https://gozadera-mobile.fotografersukasuka.com/img/event/kanan.jpeg"
          class="cut"
          alt="The Wisconsin State Capitol building in Madison, WI at night"
        />
        <div>
          <p class="content">{{ val }}</p>
        </div>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts" setup>
import { IonGrid, IonCol, IonRow, IonImg } from "@ionic/vue";
import { ref } from "vue";

const offers = ref(["Events", "Everyday", "Weekday", "Weekend"]);
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
  // ion-img {
  // &::part(image) {
  // filter: blur(8px);
  // }
  // }
  &.wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    div {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 75%;
        height: 75%;
        color: #ffffff;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.85);
        font-weight: bold;
        font-size: 1.25rem;
        border: solid 1px #ffffff;
      }
    }
  }
}
</style>
