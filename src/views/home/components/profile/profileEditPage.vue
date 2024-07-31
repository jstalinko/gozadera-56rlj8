<template>
    <ion-header collapse="condense">
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button></ion-back-button>
            </ion-buttons>
            <ion-title slot="end">Edit Profile</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-page>


        <ion-content class="ion-padding ion-margin"><br><br>
            <ion-list class="ion-margin">

                <ion-item lines="none">
                    <ion-label position="stacked">Avatar</ion-label>
                    <div class="avatar-preview" @click="triggerFileInput">
                        <ion-avatar>
                            <img :src="editableUser.image || defaultAvatar" alt="Avatar Preview" />
                            <ion-icon :icon="cameraOutline" class="camera-icon"></ion-icon>
                        </ion-avatar>
                    </div>
                    <input type="file" ref="fileInput" @change="onFileChange" hidden />
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Username</ion-label>
                    <ion-input v-model="editableUser.username"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Email</ion-label>
                    <ion-input v-model="editableUser.email" type="email"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Address</ion-label>
                    <ion-input v-model="editableUser.address"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Phone</ion-label>
                    <ion-input v-model="editableUser.phone" type="tel"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">New Password</ion-label>
                    <ion-input v-model="editableUser.newPassword" type="password"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">Current Password</ion-label>
                    <ion-input v-model="editableUser.currentPassword" type="password"></ion-input>
                </ion-item>



                <ion-button expand="block" @click="updateProfile">Save</ion-button>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonList, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonAvatar, toastController } from '@ionic/vue';
import { imageUrl, Loading } from '@/composables/Utils';
import { cameraOutline } from 'ionicons/icons';
import { setUpdateProfile, uploadProfile } from '@/composables/Http';

const props = defineProps({
    user: Object
});

const editableUser = ref({ ...props.user });

const defaultAvatar = 'https://via.placeholder.com/150'; // Placeholder image if no avatar is available
const fileInput = ref<HTMLInputElement | null>(null);

const onFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    let toastConfig: any;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
            editableUser.value.image = reader.result as string;
        };
        reader.readAsDataURL(input.files[0]);
        let resp: any = await uploadProfile(input.files[0]);

        if (resp.data.code === 200) {
            toastConfig = {
                message: "Success change profile photo!",
                duration: 1500,
                position: "bottom",
                color: "success",
            };
            console.log(resp.data);
        } else {
            toastConfig = {
                message: "Failed: " + resp.data.message,
                duration: 1500,
                position: "bottom",
                color: "danger",
            };
        }
        let toast = await toastController.create(toastConfig);
        toast.present();
    }
};

const triggerFileInput = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
};

const updateProfile = async () => {
    await Loading(1000, "Please wait...");
    let toastConfig: any;
    let resp: any = await setUpdateProfile(editableUser.value);
    if (resp.data.code === 200) {
        toastConfig = {
            message: "Success change profile!",
            duration: 1500,
            position: "bottom",
            color: "success",
        };
        window.location.href = '/home/profile';
    } else {
        toastConfig = {
            message: "Failed: " + resp.data.message,
            duration: 1500,
            position: "bottom",
            color: "danger",
        };
    }
    console.log(resp.data);
    let toast = await toastController.create(toastConfig);
    toast.present();
};
</script>



<style scoped>
.avatar-preview {
    position: relative;
    display: inline-block;
    cursor: pointer;
    margin-bottom: 16px;
}

.avatar-preview ion-avatar {
    width: 100px;
    height: 100px;
}

.camera-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 24px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 5px;
}

ion-item {
    margin-bottom: 16px;
}
</style>