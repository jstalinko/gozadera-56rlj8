<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense" class="mt-header">
        <ion-toolbar>
          <ion-title>Explore our outlets</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card
        v-if="outlets.length > 0"
        v-for="(out, index) in outlets"
        :key="index"
      >
        <ion-card-header>
          <ion-card-title>{{ out.name }}</ion-card-title>
          <br />
          <iframe
            :src="out.gmaps_url"
            width="100%"
            height="200"
            style="border: 0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </ion-card-header>

        <ion-card-content>
          {{ out.tagline }}
          <br />
          <i style="margin: 6px">{{ out.address }}</i>
          <br />
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-badge>
                  <ion-icon :icon="phonePortraitOutline"></ion-icon>
                  {{ out.phone }}
                </ion-badge>
              </ion-col>
              <ion-col>
                <ion-badge v-if="out.is_karoke">
                  <ion-icon :icon="micCircle"></ion-icon>
                  Karaoke
                </ion-badge>
              </ion-col>
              <ion-col>
                <ion-badge v-if="out.is_bar">
                  <ion-icon :icon="restaurantOutline"></ion-icon>
                  Bar
                </ion-badge>
              </ion-col>
              <ion-col>
                <ion-badge v-if="out.private_room">
                  <ion-icon :icon="homeOutline"></ion-icon>
                  Private Room
                </ion-badge>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card-content>
        <ion-button
          v-if="isRsvp"
          expand="block"
          :href="'/home/outlet/' + out.id + '?' + httpBuildQuery(dateParams)"
          ><ion-icon :icon="mailOutline"></ion-icon>&nbsp;
          Reservation</ion-button
        >
        <br />
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonCardContent,
  IonButton,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBadge,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/vue";
import {
  homeOutline,
  mailOutline,
  micCircle,
  phonePortraitOutline,
  restaurantOutline,
} from "ionicons/icons";
import { getOutlets } from "@/composables/Http";
import { onMounted, ref } from "vue";
import { httpBuildQuery, Loading } from "@/composables/Utils";
import { useRoute } from "vue-router";
const dateParams = ref({
  startDate: new Date().toISOString(),
  endDate: new Date(
    new Date().setMonth(new Date().getMonth() + 1)
  ).toISOString(),
});
const outlets: any = ref([]);
const route = useRoute();
const isRsvp = ref(route.query.rsvp);
const dataOutlets = async () => {
  await Loading(1000, "Please wait ...");
  const resp: any = await getOutlets();
  if (resp.data.code == 200) {
    outlets.value = resp.data.data;
  }
};

onMounted(async () => await dataOutlets());
</script>

<style lang="scss" scoped>
ion-badge {
  &.ios,
  &.md {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;
    width: max-content;
    padding: 6px 8px;
  }
}
</style>
