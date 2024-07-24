<template>
    <ion-page>
        <ion-content>
            <ion-header collapse="condense" class="mt-header">
                <ion-toolbar>
                    <ion-title>{{ category.toUpperCase() }}</ion-title>
                </ion-toolbar>
            </ion-header>

            <div class="ion-padding" style="margin-top: 20px">
                <ion-segment value="buttons">
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
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonTitle } from '@ionic/vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const category = ref(route.params.category);

</script>