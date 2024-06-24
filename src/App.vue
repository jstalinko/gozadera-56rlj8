<template>
  <ion-app>
    <PullToRefresh />
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import PullToRefresh from '@/components/PullToRefresh.vue';
</script>
