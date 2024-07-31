<template>
  <ion-page>
    <ion-content>
      <ion-card>
        <img :alt="outlet_details.name" :src="imageUrl(outlet_details.image)" />
        <ion-card-header>
          <ion-card-title>{{ outlet_details.name }}</ion-card-title>
          <ion-card-subtitle>{{ outlet_details.tagline }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          {{ outlet_details.address }}
        </ion-card-content>
      </ion-card>

      <ion-card>
        <img
          :alt="outlet_details.name"
          :src="imageUrl(outlet_details.area_image)"
        />

        <ion-card-header>
          <ion-card-subtitle>Reservation Form</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <b>
            Choose Date
          </b>
          <ion-datetime-button datetime="datetime"></ion-datetime-button>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime" v-model="dateSelected" :min="startDate" :max="endDate" locale="en-US"
              hour-cycle="h24">
              <span slot="title">Select a Reservation Date</span>
            </ion-datetime>
          </ion-modal>
          <br />
          <b> Choose Floor </b>
          <ion-segment v-model="floorSelected">
            <ion-segment-button
              v-for="(floor, index) in floors"
              :value="floor.floor"
              :key="index"
            >
              <ion-label color="primary">{{
                getOrdinalSuffix(floor.floor)
              }}</ion-label>
            </ion-segment-button>
          </ion-segment>

          <br />
          <b> Choose Table(s) </b>
          <ion-grid>
            <ion-col size="3">
            <ion-button
              v-for="(tbl, index) in tables"
              :key="index"
              @click="selectTable(tbl, tbl.id, floorSelected)"
              :fill="carts.find((a: any) => a?.id == tbl.id) ? 'solid' : 'outline'"
              
              >{{ tbl.code }}</ion-button
            >
          </ion-col>
          </ion-grid>
        </ion-card-content>
      </ion-card>

      <ion-card v-if="carts.length > 0">
        <ion-card-header>
          <ion-card-subtitle> Summary </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <ion-item>Reservation for : {{ new Date(dateSelected).toDateString() }} at {{ new
              Date(dateSelected).toLocaleTimeString('en-US', {hour12:false}) }}</ion-item>
            <ion-item v-for="(cart, index) in carts" :key="index">
              <ion-label>
                {{ getOrdinalSuffix(cart.floor) }} Floor - {{ cart.table }} -
                {{ cart.max_pax }} Max Pax - {{ currencyIDR(cart.price) }}
              </ion-label>
            </ion-item>
          </ion-list>
          <br />

          <ion-item>
            <ion-select
              label="Payment Method"
              label-placement="floating"
              v-model="payment_method"
            >
              <ion-select-option value="transfer"
                >BANK TRANSFER</ion-select-option
              >
              <ion-select-option value="qris">QRIS</ion-select-option>
            </ion-select>
          </ion-item>

          <br>
          <ion-button expand="full" @click="prepareForRsvp"><ion-icon :icon="sendOutline"></ion-icon>&nbsp;
            Continue</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  toastController,
  IonIcon
} from "@ionic/vue";
import { useRoute } from "vue-router";
import { computed, onMounted, ref, watch } from "vue";
import {
  getOutletById,
  getOutletFloor,
  getOutletTableFloor,
  storeRsvp,
} from "@/composables/Http";
import { getOrdinalSuffix, imageUrl, currencyIDR,Loading } from "@/composables/Utils";
import { getStore } from "@/composables/storage";
import { sendOutline } from "ionicons/icons";

const route = useRoute();
const outlet_id: any = ref(route.params.id);
const outlet_details: any = ref([]);
const floorSelected: any = ref("1");
const tableSelected: any = ref([]);
const floors: any = ref([]);
const tables: any = ref([]);
const startDate: any = ref(route.query.startDate);
const endDate: any = ref(route.query.endDate);
const dateSelected: any = ref(startDate.value);
const payment_method = ref('transfer');
const carts: any = ref([]);
watch(
  floorSelected,
  async () =>{
    await Loading(1400,"Load data...")
    await getTables()
});
watch(dateSelected,async() =>{
  await Loading(1200,"Load data...");
  await getTables();
});

const outletDetail = async () => {
  const resp: any = await getOutletById(outlet_id.value);
  if (resp.data.code === 200) outlet_details.value = resp.data.data;
};

const selectTable = (data: any, table: any, floor: any) => {
  const item: any = carts.value.find((item: any) => item.id == table);
  if (!item) {
    carts.value.push({
      id: data.id,
      floor: floor,
      table: data.code,
      price: data.price,
      max_pax: data.max_pax,
    });
  } else {
    carts.value = carts.value.filter((item: any) => item.id != table);
  }

  // console.log(carts.value);
};

const prepareForRsvp = async () => {
  await Loading(1000, "Please wait...");
  let user_id = await getStore("_id");
  let data = JSON.stringify(carts.value);
  let resp: any = await storeRsvp(data, outlet_id.value, user_id, dateSelected.value, payment_method.value)
  let toastConfig:any;
  if (resp.data.code === 200) {
    toastConfig = {
      message: "Your reservation processed!",
      duration: 1500,
      position: "bottom",
      color: "success",
    };
    window.location.href="/home/my-tickets";
    
  }else{
    toastConfig = {
      message: "Server Error,please try again later.",
      duration: 1500,
      position: "bottom",
      color: "danger",
    };
  }
  (await toastController.create(toastConfig)).present();

};
const getFloor = async () => {
  const resp: any = await getOutletFloor(outlet_id.value, startDate.value);
  if (resp.data.code === 200) {
    floors.value = resp.data.data;
  }
};
const getTables = async () => {
  const resp: any = await getOutletTableFloor(
    outlet_id.value,
    floorSelected.value,
    dateSelected.value
  );
  if (resp.data.code === 200) {
    tables.value = resp.data.data;
  }
};
onMounted(async () => {
  await Loading(1400, "Please wait...");
  await outletDetail();
  await getFloor();
  await getTables();
});
</script>

<style lang="scss" scoped>
ion-datetime-button {
  &.ios,
  &.md {
    justify-content: start;
  }
}
</style>
