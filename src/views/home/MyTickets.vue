<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense" class="mt-header">
        <ion-toolbar>
          <ion-title> My Tickets </ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="ion-padding" style="margin-top: 20px">
        <ion-segment value="buttons" v-model="activeFilter">
          <ion-segment-button value="today">
            <ion-label>Today</ion-label>
          </ion-segment-button>
          <ion-segment-button value="30day">
            <ion-label>Last 30 Days</ion-label>
          </ion-segment-button>
          <ion-segment-button value="90day">
            <ion-label>Last 90 Days</ion-label>
          </ion-segment-button>
          <ion-segment-button value="all">
            <ion-label>All </ion-label>
          </ion-segment-button>
        </ion-segment>
        <br />
      </div>


      <NoData
        v-if="myTickets.length == 0"
        :message="'No tickets! Make reservation first..'"
      />

      <ion-card
        v-for="(tik, index) in myTickets"
        :key="index"
        v-if="myTickets.length > 0"
      >
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
        <ion-button fill="clear" @click="onClickDetail(tik)"
          >Payment Detail</ion-button
        >
        <ion-nav-link
          router-direction="forward"
          :component="pageDetail"
          :component-props="{ id: tik.id }"
        >
          <ion-button fill="clear">Rsvp Detail</ion-button>
        </ion-nav-link>
      </ion-card>
      <!-- show payment detail and rsvp datail -->
      <ion-modal :is-open="isOpen">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="setOpen(false)">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Payment Detail</ion-title>
            <!-- <ion-buttons slot="end">
              <ion-nav-link
                router-direction="forward"
                :component="pageDetail"
                :component-props="{ id: selectedTicket.id }"
              >
                <ion-button fill="clear">Detail</ion-button>
              </ion-nav-link>
            </ion-buttons> -->
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <b>#{{ selectedTicket.invoice }}</b
          ><br />

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
                Status :
                <span v-html="statusUi(selectedTicket.payment_status)"></span>
              </ion-label>
            </ion-item>
            <ion-item>
              <ion-label>
                Payment Method :
                {{ selectedTicket.payment_method.toUpperCase() }}
              </ion-label>
            </ion-item>
          </ion-list>
          <br />
          <b>Payment Destination</b><br /><br />
          <ion-text
            v-for="(p, i) in selectedTicket.payments"
            :key="i"
            v-if="selectedTicket.payment_method == 'transfer'"
          >
            <br />
            Transfer to : <br /><br />
            <b
              ><i>{{ p.account_number }} a/n {{ p.account_name }}</i></b
            >
            ( {{ p.bank_name }})
          </ion-text>

          <div
            v-if="selectedTicket.payment_method == 'qris'"
            v-for="(p2, i2) in selectedTicket.payments"
            :key="i2"
          >
            <ion-img :src="imageUrl(p2.qris_image)"></ion-img><br />
            <p>{{ p2.account_name }} | Scan QRIS Here</p>
          </div>

          <br /><br />
          <div v-if="selectedTicket.proof_transfer == null">
            <p>Upload proof transaction:</p>
            <br />
            <form @submit.prevent="uploadFile(selectedTicket.id)">
              <ion-item>
                <ion-label position="stacked">Select File</ion-label>
                <input type="file" @change="onFileSelected" />
              </ion-item>
              <ion-item v-if="preview"
                ><br />
                <img
                  :src="preview"
                  alt="Image Preview"
                  style="max-width: 100%; max-height: 200px"
                />
              </ion-item>
              <ion-button type="submit" expand="full">Upload</ion-button>
            </form>
          </div>
          <div v-else>
            <b>Proof transfer :</b>
            <ion-img
              :src="imageUrl(selectedTicket.proof_transfer.image)"
            ></ion-img>
          </div>
          <div style="margin: 10%">&nbsp;</div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { getMyTickets, uploadTransfer } from "@/composables/Http";
import { currencyIDR, imageUrl, Loading } from "@/composables/Utils";
import { OverlayEventDetail } from "@ionic/core/components";
import RsvpDetail from "./RsvpDetail.vue";
import {
  IonNavLink,
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
  IonText,
  toastController,
  ToastOptions,
  IonSegment,
  IonSegmentButton
} from "@ionic/vue";
import { markRaw, onMounted, ref,watch } from "vue";
import NoData from "@/components/NoData.vue";

const pageDetail = markRaw(RsvpDetail);
const showToast = ref(false);
const isOpen = ref(false);
const myTickets: any = ref([]);
const activeFilter:any  = ref('30day');

let toastConfig: ToastOptions = {};

const selectedTicket: any = ref<Record<string, unknown>>({});
const preview: any = ref(null);
const selectedFile: any = ref(null);

watch(activeFilter , async() => await getTicket());
const getTicket = async () => {
  await Loading(1500, "Please wait...");
  const resp: any = await getMyTickets(activeFilter.value);
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

const confirm = (id: any) => {
  window.location.href = "/home/rsvp-detail/" + id;
};

const setOpen = (open: boolean) => {
  isOpen.value = open;
};

const onFileSelected = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;

    // Create a FileReader to read the file
    const reader = new FileReader();
    reader.onload = (e: any) => {
      preview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const uploadFile = async (id: any) => {
  await Loading(1000, "Please wait...");
  if (selectedFile.value) {
    const resp: any = await uploadTransfer(selectedFile.value, id);
    if (resp.data.code == 200) {
      await getTicket();

      toastConfig = {
        message: "Success! Proof transaction uploaded!",
        duration: 1500,
        position: "bottom",
        color: "success",
      };
    }else{
      toastConfig = {
        message: "Failed! Upload image, "+resp.data.message,
        duration: 1500,
        position: "bottom",
        color: "error",
      };
    }

  } else {
    toastConfig = {
        message: "Error! Please select image first",
        duration: 1500,
        position: "bottom",
        color: "error",
      };
  }
  const toast = await toastController.create(toastConfig);
  await toast.present();
  isOpen.value = false;
};

onMounted(async () => await getTicket());
</script>

<style lang="scss" scoped>
ion-modal {
  padding-top: 10%;
}
</style>
