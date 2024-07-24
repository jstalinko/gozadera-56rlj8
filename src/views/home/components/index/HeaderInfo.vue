<template>
  <ion-grid :fixed="true" class="transparent">
    <ion-row>
      <ion-col size="12" size-sm="12" size-md="12" size-lg="12" size-xl="12">
        <ion-grid :fixed="true" class="rounded-full summary">
          <ion-row>
            <ion-col
              class="br-1"
              size="6"
              size-sm="6"
              size-md="6"
              size-lg="6"
              size-xl="6"
            >
              <ion-grid :fixed="true" class="transparent">
                <ion-row>
                  <ion-col
                    size="12"
                    size-sm="12"
                    size-md="12"
                    size-lg="12"
                    size-xl="12"
                  >
                    Level
                  </ion-col>
                  <ion-col
                    class="count"
                    size="12"
                    size-sm="12"
                    size-md="12"
                    size-lg="12"
                    size-xl="12"
                  >
                    <ion-icon :icon="speedometerOutline" />
                    {{ props.level }}
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-col>
            <ion-col
              class="bl-1"
              size="6"
              size-sm="6"
              size-md="6"
              size-lg="6"
              size-xl="6"
            >
              <ion-grid :fixed="true" class="transparent">
                <ion-row>
                  <ion-col
                    size="12"
                    size-sm="12"
                    size-md="12"
                    size-lg="12"
                    size-xl="12"
                  >
                    My Points
                  </ion-col>
                  <ion-col
                    class="count"
                    size="12"
                    size-sm="12"
                    size-md="12"
                    size-lg="12"
                    size-xl="12"
                  >
                    <ion-icon :icon="cardOutline" />
                    {{ props.point }}
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-col>
    </ion-row>
  </ion-grid>

  <ion-grid :fixed="true" class="transparent">
    <ion-row>
      <ion-col size="3" size-sm="3" size-md="3" size-lg="3" size-xl="3">
        <ion-button
          expand="block"
          color="primary"
          class="text-reset"
          href="/home/my-bottles"
        >
          <ion-icon :icon="beerOutline"></ion-icon>&nbsp;
          <ion-text>Bottles</ion-text>
        </ion-button>
      </ion-col>
      <ion-col size="3" size-sm="3" size-md="3" size-lg="3" size-xl="3">
        <ion-button
          expand="block"
          color="primary"
          class="text-reset"
          href="/home/my-tickets"
        >
          <ion-icon :icon="ticketOutline"></ion-icon>&nbsp;
          Tickets
        </ion-button>
      </ion-col>
      <ion-col size="3" size-sm="3" size-md="3" size-lg="3" size-xl="3">
        <ion-button
          expand="block"
          color="primary"
          class="text-reset"
          href="/home/rsvp"
        >
          <ion-icon :icon="mailOpenOutline"></ion-icon>&nbsp;
          RSVP
        </ion-button>
      </ion-col>
      <ion-col size="3" size-sm="3" size-md="3" size-lg="3" size-xl="3">
        <ion-button
          expand="block"
          color="primary"
          class="text-reset"
          href="/home/outlets"
        >
          <ion-icon :icon="mapOutline"></ion-icon>&nbsp;
          Outlet
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts" setup>
import {
  IonIcon,
  IonText,
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/vue";
import {
  beerOutline,
  cardOutline,
  mailOpenOutline,
  mapOutline,
  speedometerOutline,
  ticketOutline,
} from "ionicons/icons";

interface HeaderInfoProps {
  point: number;
  level: string;
}

const props = withDefaults(defineProps<HeaderInfoProps>(), {
  point: 0,
  level: "Basic",
});
</script>

<style scoped lang="scss">
ion-grid {
  background-color: var(--ion-color-primary);
  &.pye {
    padding-top: 1px;
    padding-bottom: 1px;
  }
  &.rounded-full {
    border-radius: 999px;
  }
  &.transparent {
    background-color: transparent;
  }
  &.summary {
    ion-col {
      padding: 2px 5px;
    }
  }
}

ion-col {
  text-align: center;
  &.count {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
  }
  &.align-start {
    text-align: start;
  }
}
</style>
