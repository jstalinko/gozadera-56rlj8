<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense" class="mt-header">
        <ion-toolbar>
          <ion-title> My Tickets </ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card v-for="(tik, index) in myTickets" :key="index">
        <ion-card-header>
          <div class="flex justify-between">
            <ion-card-subtitle>#{{ tik.invoice }}</ion-card-subtitle>
            <ion-card-subtitle color="primary">{{
              currencyIDR(tik.total)
              }}</ion-card-subtitle>
          </div>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label> Rsvp Date : {{ tik.rsvp_date }} </ion-label>
            </ion-item>
            <ion-item>
              <ion-label class="flex justify-between">
                <div v-html="statusUi(tik.payment_status)"></div>
                <div v-html="statusUi(tik.status)"></div>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label> Pax Left : {{ tik.pax_left }} Person </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
        <ion-button fill="clear" @click="onClickDetail(tik)">Payment Detail</ion-button>
        <ion-button fill="clear" :href="'/home/rsvp-detail/'+tik.id">RSVP Detail</ion-button>
      </ion-card>
      <!-- show payment detail and rsvp datail -->
      <ion-modal :is-open="isOpen" :initial-breakpoint="0.9">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="setOpen(false)">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Payment Detail</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm(selectedTicket.id)">Detail</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <b>#{{ selectedTicket.invoice }}</b><br>

          <ion-list>
            <ion-item>
              <ion-label>
                Sub-Total : {{ currencyIDR(selectedTicket.subtotal) }}
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                Total : {{ currencyIDR(selectedTicket.total) }}
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                Status : <span v-html="statusUi(selectedTicket.payment_status)"></span>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                Payment Method : {{ selectedTicket.payment_method.toUpperCase() }}
              </ion-label>
            </ion-item>

          </ion-list>
          <br>
          <b>Payment Destination</b><br><br>
          <ion-text v-for="(p, i) in selectedTicket.payments" :key="i"
            v-if="selectedTicket.payment_method == 'transfer'">
            Transfer to : <br><br>
            <b><i>{{ p.account_number }} a/n {{ p.account_name }}</i></b> ( {{ p.bank_name }})
          </ion-text>

          <div v-if="selectedTicket.payment_method == 'qris'" v-for="(p2, i2) in selectedTicket.payments" :key="i2">
            <ion-img :src="imageUrl(p2.qris_image)"></ion-img><br>
            <p>{{ p2.account_name }}</p>
          </div>

          <br><br>
          <div v-if="selectedTicket.proof_transfer == null">
          <p>Upload proof transaction:</p><br>
          <form @submit.prevent="uploadFile(selectedTicket.id)">
      <ion-item>
        <ion-label position="stacked">Select File</ion-label>
        <input type="file" @change="onFileSelected" />
      </ion-item>
      <ion-item v-if="preview"><br>
        <img :src="preview" alt="Image Preview" style="max-width: 100%; max-height: 200px;" />
      </ion-item>
      <ion-button type="submit" expand="full">Upload</ion-button>
    </form>
    </div>
    <div v-else>
      <b>Proof transfer :</b>
      <ion-img :src="imageUrl(selectedTicket.proof_transfer.image)" ></ion-img>
    </div>

        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { getMyTickets, uploadTransfer } from "@/composables/Http";
import { currencyIDR, idrFormat, imageUrl, Loading } from "@/composables/Utils";
import { OverlayEventDetail } from "@ionic/core/components";
import Modal from "./components/Modal.vue";
import {
  IonPage,
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardSubtitle,
  IonList,
  IonCardHeader,
  IonCardContent,
  IonModal,
  IonButtons,
  IonImg,
  IonText
} from "@ionic/vue";
import { onMounted, ref } from "vue";

const isOpen = ref(false);
const myTickets: any = ref([]);

const selectedTicket: any= ref<Record<string, unknown>>({});
const preview:any = ref(null);
const selectedFile:any = ref(null);
const getTicket = async () => {
  await Loading(1500,"Please wait...");
  const resp: any = await getMyTickets();
  if (resp.data.code === 200) {
    myTickets.value = resp.data.data;
  }
};
type Status =
  | "waiting_payment"
  | "check_in"
  | "check_out"
  | "canceled"
  | "expired"
  | "issued"
  | "unpaid"
  | "paid";

const statusUi = (status: Status): string => {
  switch (status) {
    case "waiting_payment":
      return '<ion-badge color="primary">Waiting Payment</ion-badge>';
    case "check_in":
      return '<ion-badge color="success">Check In</ion-badge>';
    case "check_out":
      return '<ion-badge color="secondary">Check Out</ion-badge>';
    case "canceled":
      return '<ion-badge color="danger">Canceled</ion-badge>';
    case "expired":
      return '<ion-badge color="dark">Expired</ion-badge>';
    case "issued":
      return '<ion-badge color="tertiary">Issued</ion-badge>';
    case "unpaid":
      return '<ion-badge color="warning">Unpaid</ion-badge>';
    case "paid":
      return '<ion-badge color="success">Paid</ion-badge>';
    default:
      return '<ion-badge color="medium">Unknown Status</ion-badge>';
  }
};
const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === "confirm") {
  }
};

const onClickDetail = (tik: Record<string, unknown>) => {
  // console.log(tik);
  isOpen.value = true;
  selectedTicket.value = tik;
};

const confirm = (id:any) => {
  window.location.href = '/home/rsvp-detail/'+id;
};

const setOpen = (open: boolean) => {
  console.log("setOpen");
  isOpen.value = open;
};


const onFileSelected = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;

    // Create a FileReader to read the file
    const reader = new FileReader();
    reader.onload = (e:any) => {
      preview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const uploadFile = async (id:any) => {
  await Loading(1000,"Please wait...");
  if (selectedFile.value) {
    const resp: any = await uploadTransfer(selectedFile.value ,id );
    if(resp.data.code == 200)
  {
    await getTicket();
  }
  } else {
    console.warn('No file selected!');
  }
};
onMounted(async () => await getTicket());
</script>
