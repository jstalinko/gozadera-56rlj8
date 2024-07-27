<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense" class="mt-header">
        <ion-toolbar>
          <ion-title>Explore our outlets</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card v-if="outlets.length > 0" v-for="(out,index) in outlets" :key="index">
        <ion-card-header>
          <ion-card-title>{{ out.name }}</ion-card-title>
          <br>
          <iframe
            :src="out.gmaps_url"
            width="100%" height="200" style="border:0;" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </ion-card-header>

        <ion-card-content>
         {{out.tagline}}
         <br>
         <i style="margin:6px;">{{ out.address }}</i>
         <br>
         <div class="flex justify-between" style="padding:2px;margin-top: 5px;">
          <ion-badge><ion-icon :icon="phonePortraitOutline"></ion-icon> {{ out.phone }}</ion-badge>&nbsp;
         <ion-badge v-if="out.is_karoke"><ion-icon :icon="micCircle"></ion-icon> Karoke</ion-badge>&nbsp;
         <ion-badge v-if="out.is_bar"><ion-icon :icon="restaurantOutline"></ion-icon> Bar</ion-badge>&nbsp;
         <ion-badge v-if="out.private_room"><ion-icon :icon="homeOutline"></ion-icon> Private Room</ion-badge>
         </div>
      
        </ion-card-content>
        <ion-button expand="block" :href="'/home/outlet/'+out.id+'?'+httpBuildQuery(dateParams)"><ion-icon :icon="mailOutline"></ion-icon>&nbsp; Reservation</ion-button>
        <br>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { IonCard, IonCardHeader, IonCardTitle, IonIcon, IonCardContent, IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonBadge } from '@ionic/vue';
import { homeOutline, mailOutline, micCircle, phonePortraitOutline, restaurantOutline } from 'ionicons/icons';
import { getOutlets } from '@/composables/Http';
import { onMounted, ref } from 'vue';
import { httpBuildQuery, Loading } from '@/composables/Utils';
const dateParams = ref({
  startDate: new Date().toISOString(),
  endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
});
const outlets: any = ref([]);
const dataOutlets = async () => {
  await Loading(1000, "Please wait ...");
  let resp: any = await getOutlets();
  if (resp.data.code == 200) {
    outlets.value = resp.data.data;
  }
}


onMounted(async () => await dataOutlets());

</script>