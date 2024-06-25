<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>

      <ion-tab-bar slot="bottom">
        <ion-tab-button
          v-for="(item, i) in tabButtons"
          :key="i"
          :tab="generateTabId(item.label)"
          :href="item.path"
          aria-hidden="true"
        >
          <ion-icon :icon="item.icon" />
          <ion-label>{{ item.label }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  // IonNav,
} from "@ionic/vue";
import {
  homeOutline,
  restaurantOutline,
  qrCodeOutline,
  wineOutline,
  personOutline,
} from "ionicons/icons";
import { ref } from "vue";

interface TabButton {
  path: string;
  label: string;
  icon: string;
}

const tabButtons = ref<TabButton[]>([
  {
    path: "/home/index",
    label: "Home",
    icon: homeOutline,
  },
  {
    path: "/home/restaurant",
    label: "F & B",
    icon: restaurantOutline,
  },
  {
    path: "/home/myqr",
    label: "My QR",
    icon: qrCodeOutline,
  },
  {
    path: "/home/redeem",
    label: "Redeem",
    icon: wineOutline,
  },
  {
    path: "/home/profile",
    label: "Profile",
    icon: personOutline,
  },
]);

function generateTabId(val: string) {
  return val.replaceAll(" ", "").toLowerCase();
}
</script>
