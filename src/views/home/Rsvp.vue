<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Reservasi</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div class="relative w-full h-[600px]">
          <ion-img src="/map.jpeg" alt="Map" class="w-full h-full object-cover" />
          <div
            v-for="table in tables"
            :key="table.id"
            :style="{ top: table.top, left: table.left }"
            class="absolute p-4 bg-red-500 text-white cursor-pointer"
            @click="selectTable(table)"
          >
            {{ table.name }}
          </div>
        </div>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup>
  import { IonPage,IonHeader,IonToolbar,IonTitle,IonImg,IonContent } from '@ionic/vue';
  import { ref } from 'vue';
  
  const tables = ref([
    { id: 1, name: 'Table 1', top: '10%', left: '20%' },
    { id: 2, name: 'Table 2', top: '30%', left: '50%' },
    { id: 3, name: 'Table 3', top: '60%', left: '70%' },
    { id: 3, name: 'Table 4', top: '70%', left: '70%' },

    { id: 3, name: 'Table 5', top: '80%', left: '70%' },

    { id: 3, name: 'Table 6', top: '90%', left: '70%' },

  ]);
  
  const selectTable = (table) => {
    alert(`You selected ${table.name}`);
  };
  </script>
  
  <style scoped>
  .relative {
    position: relative;
  }
  
  .absolute {
    position: absolute;
  }
  </style>
  