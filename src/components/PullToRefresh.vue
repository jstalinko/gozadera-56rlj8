<template>
    <ion-content>
        <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
            <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
    </ion-content>
</template>


<script lang="ts">
  import { IonContent, IonHeader, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { IonContent, IonHeader, IonRefresher, IonRefresherContent, IonTitle, IonToolbar },
    setup() {
      const handleRefresh = (event: CustomEvent) => {
        setTimeout(() => {
          // Any calls to load data go here
          
        }, 2000);
      };

      return { handleRefresh };
    },
  });
</script>