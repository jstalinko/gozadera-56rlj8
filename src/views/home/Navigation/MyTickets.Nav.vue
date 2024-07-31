<template>
   <ion-page>
    <ion-nav :root="component"></ion-nav>
    </ion-page>

</template>
<script lang="ts" setup>
import { IonNav,IonPage } from '@ionic/vue';
import { markRaw } from 'vue';
import MyTickets from '@/views/home/MyTickets.vue';
const component = markRaw(MyTickets);
</script>