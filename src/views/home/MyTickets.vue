<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense" class="mt-header">
                <ion-toolbar>
                    <ion-title>
                       My Tickets
                    </ion-title>
                </ion-toolbar>
            </ion-header>

      <ion-accordion-group class="ion-padding">
      <ion-accordion  v-for="(acc,index) in myTickets" :value="acc.invoice" :key="index">
      <ion-item slot="header" color="light">
        <ion-label class="flex justify-between">
          <span>{{acc.event}}</span>
          <span>#{{ acc.invoice }}</span>
          <ion-badge>{{ acc.status }}</ion-badge>
        </ion-label>
      </ion-item>
      <div class="ion-padding" slot="content">{{ acc.note }}</div>
    </ion-accordion>
    </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage,IonContent,IonAccordion,IonItem,IonLabel,IonAccordionGroup,IonBadge,
  IonHeader,IonToolbar,IonTitle
} from '@ionic/vue';
import { ref } from 'vue';
const myTickets: any = ref([
  {
    invoice: 'ABCDE1',
    event: 'Rock Concert 2024',
    price: 12000,
    status: 'issued', // pending, issued, check-in
    note: '-'
  },
  {
    invoice: 'ABCDE2',
    event: 'Tech Expo 2024',
    price: 15000,
    status: 'pending',
    note: 'Requires confirmation'
  },
  {
    invoice: 'ABCDE3',
    event: 'Jazz Festival 2024',
    price: 18000,
    status: 'check-in',
    note: '-'
  },
  {
    invoice: 'ABCDE4',
    event: 'Startup Summit 2024',
    price: 20000,
    status: 'issued',
    note: 'VIP'
  },
  {
    invoice: 'ABCDE5',
    event: 'Food Carnival 2024',
    price: 11000,
    status: 'pending',
    note: 'Delayed payment'
  },
  {
    invoice: 'ABCDE6',
    event: 'Film Festival 2024',
    price: 25000,
    status: 'check-in',
    note: '-'
  },
  {
    invoice: 'ABCDE7',
    event: 'Comedy Night 2024',
    price: 13000,
    status: 'issued',
    note: 'Special request'
  },
  {
    invoice: 'ABCDE8',
    event: 'Book Fair 2024',
    price: 17000,
    status: 'pending',
    note: 'Awaiting approval'
  },
  {
    invoice: 'ABCDE9',
    event: 'Gaming Convention 2024',
    price: 22000,
    status: 'check-in',
    note: '-'
  },
  {
    invoice: 'ABCDE10',
    event: 'Art Exhibition 2024',
    price: 14000,
    status: 'issued',
    note: 'Priority'
  }
]);

</script>
