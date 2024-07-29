<template>
    <ion-page>
        <ion-content>
            <ion-header collapse="condense" class="mt-header">
                <ion-toolbar>
                    <ion-title> Gallery Events </ion-title>
                </ion-toolbar>
            </ion-header>
            <NoData :message="'No Galleries for this events'" v-if="galleries.length < 1"/>
            <ion-grid v-if="galleries.length > 0">
                <ion-row>
                    <ion-col v-for="(gal,index) in galleries" :key="index" size="4">
                        <ion-img :src="imageUrl(gal.image)" :alt="gal.captions"></ion-img>
                        <ion-label>{{ gal.captions }}</ion-label>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonGrid, IonRow, IonCol, IonImg,IonLabel } from '@ionic/vue';
import { getGallery } from '@/composables/Http';
import { onMounted, ref } from 'vue';
import { HttpResponse } from '@capacitor/core';
import { useRoute } from 'vue-router';
import { imageUrl } from '@/composables/Utils';
import NoData from '@/components/NoData.vue';
const galleries = ref<Record<string, unknown>>([]);
const route = useRoute();

const gallery = async () => {
    let resp: HttpResponse = await getGallery(route.params.id);
    galleries.value = resp.data.data;
}

onMounted(async () => await gallery());


</script>