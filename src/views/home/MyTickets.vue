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

      <ion-card v-for="(tik,index) in myTickets" :key="index">
    <ion-card-header>
     <div class="flex justify-between">
      <ion-card-subtitle>#{{ tik.invoice }}</ion-card-subtitle>
      <ion-card-subtitle color="primary">{{ currencyIDR(tik.total) }}</ion-card-subtitle>
     </div>

    </ion-card-header>

    <ion-card-content>
     <ion-list>
      <ion-item >
        <ion-label>
          Rsvp Date : {{ tik.rsvp_date }} 
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-label class="flex justify-between">
          <div v-html="statusUi(tik.payment_status)"></div>
          <div v-html="statusUi(tik.status)"></div>
        </ion-label>
      </ion-item>
      <ion-item>

        <ion-label>
          Pax Left : {{ tik.pax_left }} Person
        </ion-label>
      </ion-item>   
     </ion-list>
      
    </ion-card-content>
    <ion-button fill="clear"  >Payment Detail</ion-button>
    <ion-button fill="clear" >RSVP Detail</ion-button>
    
  </ion-card>
<!-- show payment detail and rsvp datail -->
  <!-- <ion-modal ref="modalPayment" :trigger="" @willDismiss="onWillDismiss">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button @click="cancel()">Cancel</ion-button>
          </ion-buttons>
          <ion-title>Welcome</ion-title>
          <ion-buttons slot="end">
            <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-input
            label="Enter your name"
            label-placement="stacked"
            ref="input"
            type="text"
            placeholder="Your name"
          ></ion-input>
        </ion-item>
      </ion-content>
    </ion-modal> -->

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { getMyTickets } from '@/composables/Http';
import { currencyIDR, idrFormat } from '@/composables/Utils';
import { OverlayEventDetail } from '@ionic/core/components';
import Modal from './components/Modal.vue';
import {
  IonPage, IonContent, IonButton, IonItem, IonLabel,
  IonHeader, IonToolbar, IonTitle
  ,IonCard,IonCardSubtitle,IonList,IonCardHeader,IonCardContent
  ,IonModal,IonButtons,IonInput
} from '@ionic/vue';
import { onMounted, ref } from 'vue';
const myTickets: any = ref([]);

const getTicket = async () => {
  let resp: any = await getMyTickets();
  if (resp.data.code === 200) {
    myTickets.value = resp.data.data;
  }
}
type Status =
  | 'waiting_payment'
  | 'check_in'
  | 'check_out'
  | 'canceled'
  | 'expired'
  | 'issued'
  | 'unpaid'
  | 'paid';

const statusUi = (status: Status): string => {
  switch (status) {
    case 'waiting_payment':
      return '<ion-badge color="primary">Waiting Payment</ion-badge>';
    case 'check_in':
      return '<ion-badge color="success">Check In</ion-badge>';
    case 'check_out':
      return '<ion-badge color="secondary">Check Out</ion-badge>';
    case 'canceled':
      return '<ion-badge color="danger">Canceled</ion-badge>';
    case 'expired':
      return '<ion-badge color="dark">Expired</ion-badge>';
    case 'issued':
      return '<ion-badge color="tertiary">Issued</ion-badge>';
    case 'unpaid':
      return '<ion-badge color="warning">Unpaid</ion-badge>';
    case 'paid':
      return '<ion-badge color="success">Paid</ion-badge>';
    default:
      return '<ion-badge color="medium">Unknown Status</ion-badge>';
  }
};
const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
     
    }
  };

onMounted(async() => await getTicket());
</script>
