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
          v-model="email"
        ></ion-input>
        <br />
        <ion-input
          label="Username"
          label-placement="floating"
          fill="solid"
          placeholder="Your username"
          v-model="username"
        ></ion-input>
        <br />
        <ion-input
          label="Whatsapp Number"
          label-placement="floating"
          fill="solid"
          placeholder="Your whatsapp number"
          v-model="phone"
        ></ion-input>
        <br />
        <ion-button type="button" @click="actionRegister">Register</ion-button>
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
import {
  IonPage,
  IonContent,
  IonButton,
  IonInput,
  IonTitle,
  toastController,
} from "@ionic/vue";
import { ref } from "vue";
import { doRegister } from "@/composables/Http";
const username = ref("");
const email = ref("");
const phone = ref("");

const actionRegister = async () => {
  const resp: any = await doRegister(email.value, username.value, phone.value);
  let toasConfig: any;
  if (resp.data.code == 200) {
    toasConfig = {
      duration: 5000,
      message:
        "Successfully register! Check your whatsapp to get your account details.",
      color: "success",
    };
  } else {
    toasConfig = {
      duration: 3000,
      message: "Failed to register, please try again later.",
      color: "danger",
    };
  }

  (await toastController.create(toasConfig)).present();
};
</script>

<style scoped lang="scss">
ion-input {
  &.ios {
    --border-color: var(
      --ion-color-step-500,
      var(--ion-background-color-step-500, gray)
    );
    border-bottom: solid 1px var(--border-color);
  }
}

ion-title {
  &.ios,
  &.md {
    &.title-large {
      font-size: 1.25rem;
    }
  }
}
</style>
