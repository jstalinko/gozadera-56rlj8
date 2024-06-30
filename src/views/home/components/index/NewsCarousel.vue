<template>
  <ion-grid :fixed="true" class="transparent">
    <ion-row>
      <ion-col
        size="12"
        size-sm="12"
        size-md="12"
        size-lg="12"
        size-xl="12"
        class="align-start"
      >
        <h4 class="bold">Whats New</h4>
      </ion-col>
      <ion-col size="12" size-sm="12" size-md="12" size-lg="12" size-xl="12">
        <swiper
          :modules="[Autoplay, Navigation]"
          :navigation="true"
          :autoplay="true"
          :loop="true"
          :centeredSlides="true"
        >
          <swiper-slide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </swiper-slide>
          <swiper-slide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </swiper-slide>
          <swiper-slide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </swiper-slide>
          <swiper-slide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </swiper-slide>
          <swiper-slide>
            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
          </swiper-slide>
          <swiper-slide>
            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
          </swiper-slide>
        </swiper>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts" setup>
import { IonCol, IonGrid, IonRow } from "@ionic/vue";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
</script>

<style scoped lang="scss">
ion-col {
  &.align-start {
    text-align: start;
  }
}
</style>
