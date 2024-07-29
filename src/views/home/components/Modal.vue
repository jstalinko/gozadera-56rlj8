<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>{{title}}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <slot name="content">
        Default content
    </slot>
  </ion-content>
</template>

<script lang="ts" setup>
  import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    modalController,
  } from '@ionic/vue';
  import { ref, VueElement } from 'vue';
  const name = ref();
  defineProps({title: String })
  // Define slots for type safety
interface Slots {
  content?: () => VueElement;
}

const slots = defineSlots<Slots>();


  const cancel = () => modalController.dismiss(null, 'cancel');
  const confirm = () => modalController.dismiss(name.value, 'confirm');
</script>