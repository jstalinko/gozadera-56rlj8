<template>
    <ion-page>
        <ion-content class="ion-padding ion-margin">
            
            <form  class="flex flex-col flex-wrap mt-40" >
                <ion-img src="../../../resources/icon.png"  style="width:120px;height: 120px;margin:0 auto;" />
                <br>
                <ion-title size="large">Login to your account!</ion-title>
                <br><br>
                <ion-input label="Email" label-placement="floating" fill="solid" placeholder="Your email"></ion-input>
                <br>
                <ion-input label="Password" label-placement="floating" fill="solid" placeholder="Your password"></ion-input>
                <br>
                <ion-button>Login</ion-button>
                
            </form>
            <ion-grid >
        <ion-row>
            <ion-col size="4">
                <ion-button rel="button" color="primary" fill="clear" expland="block" href="/auth/register">Register?</ion-button>
            </ion-col>
            <ion-col size="8">
                <ion-button rel="button" color="secondary" fill="clear" expand="block" href="/auth/forgot-password">Forgot Password?</ion-button>
            </ion-col>
        </ion-row>
      </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonInput,IonTitle } from '@ionic/vue';
</script>