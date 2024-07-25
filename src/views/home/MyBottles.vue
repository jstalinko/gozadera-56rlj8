<template>
    <ion-page>
        <ion-content>
            <ion-header collapse="condense" class="mt-header">
                <ion-toolbar>
                    <ion-title>My Saved Bottles</ion-title>
                </ion-toolbar>
            </ion-header>
            <NoData v-if="myBottles.length < 1" :message="'save your bottle by calling our waiter!'" />

            <ion-list :inset="true" v-if="myBottles.length > 0" >
                <ion-item v-for="(btl, index) in myBottles" :key="index">

                    <div class="unread-indicator-wrapper" slot="start">
                        <div class="unread-indicator"></div>
                    </div>
                    <ion-label>
                        
                        <strong>{{ btl.product.name }}</strong><br />
                        <ion-text>{{ btl.note }}</ion-text><br />
                        <ion-note :color="btl.status == 'saved' ? 'success' : 'warning'" class="ion-text-wrap">
                            {{ btl.status.toUpperCase() }}
                        </ion-note>
                    </ion-label>
                    <div class="metadata-end-wrapper" slot="end">
                        <ion-note color="medium">{{ new Date(btl.created_at).toLocaleDateString() }}&nbsp;</ion-note>
                        <ion-icon color="medium" :icon="calendarClearOutline"></ion-icon>
                    </div>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle ,IonList,IonItem,IonNote,IonIcon} from '@ionic/vue';
import { calendarClearOutline } from 'ionicons/icons';
import NoData from '@/components/NoData.vue';
import { onMounted, ref } from 'vue';
import { HttpResponse } from '@capacitor/core';
import { getMyBottles } from '@/composables/Http';
import { Loading } from '@/composables/Utils';
const myBottles: any = ref([]);

const getBottles = async() => {
    await Loading(1000,"Please wait...");
    let resp: HttpResponse = await getMyBottles();
    myBottles.value = resp.data.data;
    console.log(resp);
};

onMounted(async() => await getBottles());

</script>