<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense" class="mt-header">
        <ion-toolbar>
          <ion-title>
            <span v-if="category == 'event'">
              {{ category.toUpperCase() }}
            </span>
            <span v-else> PROMO {{ category.toUpperCase() }} </span>
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding" style="margin-top: 20px">
        <ion-segment value="buttons" v-model="activeTab">
          <ion-segment-button value="upcoming">
            <ion-label>UP-COMING</ion-label>
          </ion-segment-button>
          <ion-segment-button value="ongoing">
            <ion-label>ON-GOING</ion-label>
          </ion-segment-button>
          <ion-segment-button value="finished">
            <ion-label>FINISHED</ion-label>
          </ion-segment-button>
        </ion-segment>

        <br />

        <NoData
          :message="'while no data is displayed'"
          v-if="eventsData.length < 1"
        />

        <ion-card
          v-for="(event, index) in eventsData"
          :key="index"
          v-if="eventsData.length > 0"
        >
          <ion-img :alt="event.name" :src="imageUrl(event.image)" />
          <ion-card-header>
            <ion-card-title>{{ event.name }}</ion-card-title>

            <ion-card-subtitle color="primary">
              <ion-grid>
                <ion-row>
                  <ion-col>
                    {{ dateFormatter(event.start_date) }} -
                    {{ dateFormatter(event.end_date) }}
                  </ion-col>
                  <ion-col>
                    <ion-grid>
                      <ion-row class="bad">
                        <ion-col
                          size="6"
                          size-sm="6"
                          size-md="6"
                          size-lg="6"
                          size-xl="6"
                        >
                          <ion-badge>{{ event.type }}</ion-badge>
                        </ion-col>
                        <ion-col
                          size="6"
                          size-sm="6"
                          size-md="6"
                          size-lg="6"
                          size-xl="6"
                        >
                          <ion-badge :color="badgeColor[event.status]">
                            {{ event.status }}
                          </ion-badge>
                        </ion-col>
                      </ion-row>
                    </ion-grid>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            {{ event.description }}
           <div v-if="category === 'event'">
            <ion-button expand="block" :color="badgeColor[event.status]" :href="(event.status !== 'finished') ? '/home/outlet/'+event.outlet_id+'?'+httpBuildQuery({startDate: new Date(event.start_date).toISOString() , endDate: new Date(event.end_date).toISOString()}) : '/home/gallery/'+event.id">
              <span
                v-if="event.status == 'upcoming' || event.status == 'ongoing'"
              >
                <ion-icon :icon="calendarClearOutline"></ion-icon> Reservasi
              </span>
              <span v-else>
                <ion-icon :icon="imageOutline"></ion-icon> Gallery
              </span>
            </ion-button>
           </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import NoData from "@/components/NoData.vue";
import { getEvent } from "@/composables/Http";
import { httpBuildQuery, imageUrl, Loading } from "@/composables/Utils";
import { HttpResponse } from "@capacitor/core";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonBadge,
  IonButton,
  IonIcon,
  IonRow,
  IonGrid,
  IonCol,
} from "@ionic/vue";
import { calendarClearOutline, imageOutline } from "ionicons/icons";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const category: any = ref(route.params.category);
const activeTab = ref("ongoing");
const eventsData: any = ref([]);
const badgeColor: any = ref({
  finished: "danger",
  ongoing: "success",
  upcoming: "primary",
});

watch(activeTab, async () => await getEvents());
const getEvents = async () => {
  await Loading(1000, "Please wait...");
  const cat: any = category.value == "event" ? null : category.value;
  const resp: HttpResponse = await getEvent(cat);
  if (cat == null) {
    eventsData.value = resp.data.data.filter(
      (ev: any) => ev.status == activeTab.value
    );
  } else {
    eventsData.value = resp.data.data
      .filter((ev: any) => ev.type == category.value)
      .filter((s: any) => s.status == activeTab.value);
  }
};

function dateFormatter(date: string) {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

onMounted(async () => {
  await getEvents();
});
</script>

<style lang="scss" scoped>
ion-card-title {
  &.ios,
  &.md {
    font-size: 1.5rem;
  }
}

ion-row {
  &.bad {
    flex-wrap: nowrap;
    flex-direction: row;
    // gap: 2px;
  }
}
</style>
