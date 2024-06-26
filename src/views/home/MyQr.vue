<template>
  <ion-page>
    <ion-content class="ion-padding ion-margin">
      <h1 class="text-center">My QR</h1>
      <ion-card style="background-color: #fff">
        <ion-card-content>
          <ion-img :src="myqrcode" ></ion-img>
          
        </ion-card-content>
      </ion-card>
      <ion-text class="text-center">Scan your QRCode for each transaction to get member point.</ion-text>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonContent, IonPage,IonCard,IonCardContent,IonImg,IonText } from "@ionic/vue";
import { getStore } from "@/composables/storage";
import { onMounted,ref } from "vue";
const myqrcode = ref('');
onMounted(async () => {
  myqrcode.value = await getStore('_myqrcode'); 
});

</script>
