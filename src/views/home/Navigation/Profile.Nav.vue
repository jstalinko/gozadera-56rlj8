<template>
    <ion-page>
        <ion-nav :root="component"></ion-nav>

    </ion-page>
</template>
<script lang="ts" setup>
import { IonNav, IonPage } from '@ionic/vue';
import { markRaw, onMounted } from 'vue';
import Profile from '@/views/home/Profile.vue';
import { Loading } from '@/composables/Utils';
const component = markRaw(Profile);
onMounted(async () => await Loading(1000, "Please wait..."));
</script>