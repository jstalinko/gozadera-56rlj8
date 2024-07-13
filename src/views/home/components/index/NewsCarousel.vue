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
          <swiper-slide v-for="(val, i) in banners" :key="i">
            <img :src="baseUrlImage + val.image" />
          </swiper-slide>
        </swiper>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts" setup>
import { getBanners } from "@/composables/Http";
import { IonCol, IonGrid, IonRow } from "@ionic/vue";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref } from "vue";

type BannerType = {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const baseUrlImage = ref(
  "https://gozadera-backend.fotografersukasuka.com/storage/"
);
const banners = ref<BannerType[]>([]);

async function fetchBanners() {
  const response = await getBanners();

  if (response.data.code === 200) {
    banners.value = response.data.data;
  }
}

onMounted(async () => {
  await fetchBanners();
});
</script>

<style scoped lang="scss">
ion-col {
  &.align-start {
    text-align: start;
  }
}
</style>
