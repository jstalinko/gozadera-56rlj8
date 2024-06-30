<template>
  <ion-page>
    <ion-content :fullscreen="true" class="ion-padding">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title>Menu F & B</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding" style="margin-top: 20px">
        <ion-segment
          value="buttons"
          v-model="filterCategory"
          @ion-change="changeCategory"
        >
          <ion-segment-button value="food">
            <ion-label>Food</ion-label>
          </ion-segment-button>
          <ion-segment-button value="beverages">
            <ion-label>Beverages</ion-label>
          </ion-segment-button>
          <ion-segment-button value="alcohol">
            <ion-label>Liquor</ion-label>
          </ion-segment-button>
        </ion-segment>
        <br />

        <div class="items-center" v-if="filterCategory === 'food'">
          <ion-chip
            color="primary"
            @click="filterSubAction('starter')"
            :outline="filterSubCategory == 'starter' ?? false"
            >Starter</ion-chip
          >
          <ion-chip
            color="primary"
            @click="filterSubAction('main_course')"
            :outline="filterSubCategory == 'main_course' ?? false"
            >Main Course</ion-chip
          >
          <ion-chip
            color="primary"
            @click="filterSubAction('rice_dish')"
            :outline="filterSubCategory == 'rice_dish' ?? false"
            >Rice Dish</ion-chip
          >
          <ion-chip
            color="primary"
            @click="filterSubAction('pasta_or_noodles')"
            :outline="filterSubCategory == 'pasta_or_noodles' ?? false"
            >Pasta / Noodles</ion-chip
          >
          <ion-chip
            color="primary"
            @click="filterSubAction('soup')"
            :outline="filterSubCategory == 'soup' ?? false"
            >Soup</ion-chip
          >
          <ion-chip
            color="primary"
            @click="filterSubAction('salad')"
            :outline="filterSubCategory == 'salad' ?? false"
            >Salad</ion-chip
          >
          <ion-chip
            color="primary"
            @click="filterSubAction('small_bites')"
            :outline="filterSubCategory == 'small_bites' ?? false"
            >Small Bites</ion-chip
          >
        </div>
      </div>
      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="(pr, index) in products" :key="index">
            <ion-card>
              <img :alt="pr.name" :src="imageUrl(pr.image)" />
              <ion-card-header>
                <ion-card-title>{{ pr.name }}</ion-card-title>
                <ion-card-subtitle color="primary">
                  {{
                    pr.sub_category
                      ? pr.sub_category
                          .replace("_", " ")
                          .replace("_", " ")
                          .toUpperCase()
                      : pr.category.toUpperCase()
                  }}</ion-card-subtitle
                >
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
} from "@ionic/vue";
import { ref, onMounted } from "vue";
import { getProductByCategory } from "@/composables/Http";
import { imageUrl, Loading } from "@/composables/Utils";

const filterCategory = ref("food");
const filterSubCategory = ref("");
const products: any = ref([]);

const filterSubAction = async (sub: string) => {
  filterSubCategory.value = sub;
  if (filterCategory.value == "food") {
    await getProduct();
    const productx = products.value;
    products.value = await productx.filter(
      (product: Record<string, unknown>) => product.sub_category == sub
    );
  }
};

const changeCategory = async () => {
  await getProduct();
};
const getProduct = async () => {
  await Loading(2000, "Please wait ...");
  const response: any = await getProductByCategory(filterCategory.value);
  if (response.data.code == 200) {
    products.value = response.data.data;
    console.log(products.value);
  } else {
    console.log(response);
  }
};
onMounted(async () => {
  await getProduct();
});
</script>

<style lang="scss" scoped>
ion-title {
  &.ios,
  &.md {
    &.title-large {
      font-size: 1.25rem;
    }
  }
}

ion-card {
  margin-inline-start: 0;
  margin-inline-end: 0;
  margin-right: 0;
  margin-left: 0;
}

ion-card-title {
  &.ios,
  &.md {
    font-size: 1rem;
  }
}
</style>
