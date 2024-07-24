<template>
  <ion-page>
    <ion-content class="ion-padding ion-margin">
      <form class="flex flex-col flex-wrap mt-40">
        <ion-img src="/icon.png" style="width: 120px; height: 120px; margin: 0 auto" />
        <br />
        <ion-title size="large">Reset your password</ion-title><br />
        <ion-text color="primary">Your new password will be send in your whatsapp number!</ion-text>
        <br /><br />
        <ion-input label="Whatsapp Number" label-placement="floating" fill="solid" placeholder="Your whatsapp number"
          v-model="phone"></ion-input>
        <br />
        <ion-button @click="resetPassword">Reset Password</ion-button>
      </form>
      <ion-grid>
        <ion-row>
          <ion-col size="4">
            <ion-button rel="button" color="primary" fill="clear" expland="block" href="/auth/login">Login</ion-button>
          </ion-col>
          <ion-col size="8">
            <ion-button rel="button" color="secondary" fill="clear" expand="block"
              href="/auth/register">Register</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonInput, IonTitle,  toastController } from "@ionic/vue";
import { ref } from "vue";
import { doResetPassword } from "@/composables/Http";
import { Loading } from "@/composables/Utils";


const phone = ref('');
let toastConfig: any;
const resetPassword = async () => {
  await Loading(1500, "Please wait...");
  const res: any = await doResetPassword(phone.value);

  if (res.data.code === 200) {
    toastConfig = {
      message: "Success! New password send in whatsapp number.",
      duration: 1500,
      position: "bottom",
      color: "success",
    };

  }else{
    toastConfig = {
      message: "Failed! Server error, please try again later.",
      duration: 1500,
      position: "bottom",
      color: "error",
    };
  }

  const toast = await toastController.create(toastConfig);
  await toast.present();
}


</script>

<style scoped lang="scss">
ion-input {
  &.ios {
    --border-color: var(--ion-color-step-500,
        var(--ion-background-color-step-500, gray));
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
