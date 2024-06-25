<template>
  <ion-page>
    <ion-content class="ion-padding ion-margin">
      <form class="flex flex-col flex-wrap mt-40">
        <ion-img
          src="/icon.png"
          style="width: 120px; height: 120px; margin: 0 auto"
        />
        <br />
        <ion-title size="large">Reset your password</ion-title><br />
        <ion-text color="primary"
          >Your new password will be send in your whatsapp number!</ion-text
        >
        <br /><br />
        <ion-input
          label="Whatsapp Number"
          label-placement="floating"
          fill="solid"
          placeholder="Your whatsapp number"
        ></ion-input>
        <br />
        <ion-button>Reset Password</ion-button>
      </form>
      <ion-grid>
        <ion-row>
          <ion-col size="4">
            <ion-button
              rel="button"
              color="primary"
              fill="clear"
              expland="block"
              href="/auth/login"
              >Login</ion-button
            >
          </ion-col>
          <ion-col size="8">
            <ion-button
              rel="button"
              color="secondary"
              fill="clear"
              expand="block"
              href="/auth/register"
              >Register</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonInput, IonTitle } from "@ionic/vue";
</script>
