<template>
     <ion-header collapse="condense" >
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-back-button></ion-back-button>
                    </ion-buttons>
                    <ion-title slot="end"> {{ rsvp.invoice }}</ion-title>
                </ion-toolbar>
            </ion-header>
    <ion-page>
        <ion-content class="ion-padding">
           

            <ion-card>
                <ion-card-header>
                    <div class="icon-container">
                        <ion-icon :icon="checkmarkCircleOutline" class="success-icon"
                            v-if="rsvp.payment_status == 'paid'"></ion-icon>
                        <ion-icon :icon="warningOutline" class="warning-icon"
                            v-if="rsvp.payment_status == 'unpaid'"></ion-icon>
                        <ion-icon :icon="closeCircleOutline" class="danger-icon"
                            v-if="rsvp.payment_status !== 'unpaid' && rsvp.payment_status !== 'paid'"></ion-icon>
                    </div>
                </ion-card-header>

                <ion-card-content>
                    <div class="flex justify-between">
                        <span>
                            <p>RSVP ID</p>
                        </span>
                        <span> <b>{{ rsvp.invoice }}</b></span>
                    </div>
                    <div class="flex justify-between">
                        <span>
                            <p>Transaction Date</p>
                        </span>
                        <span> <b>{{ new Date(rsvp.created_at).toLocaleString() }}</b></span>
                    </div>
                    <div class="flex justify-between" style="margin-top: 3px;">
                        <span>
                            <p>Payment Method</p>
                        </span>
                        <span><b>{{ rsvp.payment_method }}</b></span>
                    </div>
                    <div class="flex justify-between" style="margin-top: 3px;">
                        <span>
                            <p>Payment Total</p>
                        </span>
                        <span><b>{{ currencyIDR(rsvp.total) }}</b></span>
                    </div>
                    <div class="flex justify-between" style="margin-top: 3px;">
                        <span>
                            <p>Payment Status</p>
                        </span>
                        <span><b v-html="statusUi(rsvp.payment_status)"></b></span>
                    </div>
                    <div class="flex justify-between" style="margin-top: 3px;">
                        <span>
                            <p>Reservation Status</p>
                        </span>
                        <span><b v-html="statusUi(rsvp.status)"></b></span>
                    </div>
                    <div class="flex justify-between" style="margin-top: 3px;">
                        <span>
                            <p>Reservation Date</p>
                        </span>
                        <span><b>{{ rsvp.rsvp_date }}</b></span>
                    </div>
                </ion-card-content>
            </ion-card>
            <ion-card>
                <ion-card-header>
                    <ion-card-subtitle>
                        Reservation Table(s) Detail
                    </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item v-for="(tbl, idx) in tablesOutlet" :key="idx">
                            <ion-label>
                                {{ getOrdinalSuffix(tbl.floor) }} Floor - Table No : {{ tbl.table }} - Max Pax : {{
                                    tbl.max_pax }} - @{{ currencyIDR(tbl.price) }}
                            </ion-label>
                        </ion-item>
                    </ion-list>


                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>

</template>
<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonIcon, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonList, IonItem, IonLabel ,IonButtons,IonBackButton} from '@ionic/vue';
import { getRsvpDetail } from '@/composables/Http';
import { onMounted, ref } from 'vue';
import { currencyIDR, dateFormatter, Loading, getOrdinalSuffix } from '@/composables/Utils';
import { checkmarkCircleOutline, closeCircle, closeCircleOutline, warningOutline } from 'ionicons/icons';
const rsvp: any = ref([]);
const tablesOutlet: any = ref([]);
const prop = defineProps({id: Number});
const getDetail = async () => {
    await Loading(1000, "Please wait...");
    const id: Number = parseInt(prop.id);
    let resp: any = await getRsvpDetail(id);
    if (resp.data.code == 200) {
        rsvp.value = resp.data.data;
        tablesOutlet.value = JSON.parse(resp.data.data.outlet_tables);
    }
}

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
onMounted(async () => await getDetail());

</script>

<style scoped>
.icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -10px;
    /* Adjust this value as needed to center the icon */
}

.success-icon {
    font-size: 48px;
    /* Adjust the size of the icon */
    color: var(--ion-color-success);
    /* Use Ionic's success color */
}

.danger-icon {
    font-size: 48px;
    /* Adjust the size of the icon */
    color: var(--ion-color-danger);
    /* Use Ionic's success color */
}

.warning-icon {
    font-size: 48px;
    /* Adjust the size of the icon */
    color: var(--ion-color-warning);
    /* Use Ionic's success color */
}
</style>