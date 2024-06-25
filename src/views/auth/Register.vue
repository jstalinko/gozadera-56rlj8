<template>
  <ion-page>
    <ion-content class="ion-padding ion-margin">
      <form class="flex flex-col flex-wrap mt-40">
        <ion-img
          src="/icon.png"
          style="width: 120px; height: 120px; margin: 0 auto"
        />
        <br />
        <ion-title size="large">Join with US!</ion-title>
        <br /><br />
        <ion-input
          label="Email"
          label-placement="floating"
          fill="solid"
          placeholder="Your email"
        ></ion-input>
        <br />
        <ion-input
          label="Username"
          label-placement="floating"
          fill="solid"
          placeholder="Your username"
        ></ion-input>
        <br />
        <ion-input
          label="Whatsapp Number"
          label-placement="floating"
          fill="solid"
          placeholder="Your whatsapp number"
        ></ion-input>
        <br />
        <ion-button>Register</ion-button>
      </form>
      <ion-grid>
        <ion-row>
          <ion-col size="4">
            <ion-button
              color="primary"
              fill="clear"
              expland="block"
              href="/auth/login"
              >Login?</ion-button
            >
          </ion-col>
          <ion-col size="8">
            <ion-button
              color="secondary"
              fill="clear"
              expand="block"
              href="/auth/forgot-password"
              >Forgot Password?</ion-button
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
