<template>
    <ion-page>
        <ion-content class="ion-padding ion-margin">

            <form class="flex flex-col flex-wrap mt-40">
                <ion-img src="../../../resources/icon.png" style="width:120px;height: 120px;margin:0 auto;" />
                <br>
                <ion-title size="large">Login to your account!</ion-title>
                <br><br>
                <ion-input label="Email" label-placement="floating" fill="solid" placeholder="Your email"
                    v-model="email"></ion-input>
                <br>
                <ion-input label="Password" label-placement="floating" fill="solid" placeholder="Your password"
                    v-model="password"></ion-input>
                <br>
                <ion-button type="button" @click="submitLogin">Login</ion-button>

            </form>
            <ion-grid>
                <ion-row>
                    <ion-col size="4">
                        <ion-button type="button" color="primary" fill="clear" expland="block"
                            href="/auth/register">Register?</ion-button>
                    </ion-col>
                    <ion-col size="8">
                        <ion-button type="button" color="secondary" fill="clear" expand="block"
                            href="/auth/forgot-password">Forgot Password?</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>

    </ion-page>
</template>

<script setup lang="ts">
import {
    IonPage,
    IonContent,
    IonButton,
    IonInput,
    IonTitle,
    IonToast,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    toastController,
    useIonRouter
} from '@ionic/vue';
import { ref } from 'vue';
import {doLogin} from "@/composables/Http";
import { setToken } from '@/composables/storage';
const email = ref('');
const password = ref('');
const ionRouter = useIonRouter();

const submitLogin = async () => {
    let login: any = await doLogin(email.value,password.value);
    
    var toastConfig: any;
    if(login.data.code == 200 ){
        await setToken(login.data.token); 
        toastConfig = {
        message: 'Welcome! successfully login to your account',
        duration: 1500,
        position: 'bottom',
        color: 'success'
        }
        return ionRouter.push('/home/index');
    }else{
        toastConfig = {
        message: 'Wrong email or password !',
        duration: 1500,
        position: 'bottom',
        color: 'danger'
        }
    }
    
    const toast = await toastController.create(toastConfig);
    await toast.present();

};
</script>