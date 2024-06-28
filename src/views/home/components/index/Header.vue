<template>
  <ion-img
    src="/icon.png"
    style="width: 120px; height: 150px; margin: 0 auto"
  />
  <h4 class="ion-text-center">Welcome , {{ props.username }} !</h4>
</template>
<script lang="ts" setup>
import { IonImg } from "@ionic/vue";

interface HeaderProps {
  username: string;
}

const props = defineProps<HeaderProps>();
</script>
