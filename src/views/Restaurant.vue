<template>
  <ion-page>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title>Menu F & B</ion-title>
        </ion-toolbar>

        <div class="ion-padding ion-margin">
          <ion-title  size="small">Category</ion-title>
          <div class="flex ion-justify-content-center">
            <ion-chip color="primary" :outline="true">Food</ion-chip>
            <ion-chip color="primary" :outline="true">Bevereges</ion-chip>
            <ion-chip color="primary" :outline="true">Liquor</ion-chip>
          </div>
          <ion-title  size="small">Sort By</ion-title>
          <div class="flex ion-justify-content-center">
            <ion-chip color="primary" :outline="true">Food</ion-chip>
            <ion-chip color="primary" :outline="true">Bevereges</ion-chip>
            <ion-chip color="primary" :outline="true">Liquor</ion-chip>
          </div>
        </div>
      </ion-header>

      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-card>
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              <ion-card-header>
                <ion-card-title>Card Title</ion-card-title>
                <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                Here's a small text description for the card content. Nothing more, nothing less.
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card>
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              <ion-card-header>
                <ion-card-title>Card Title</ion-card-title>
                <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                Here's a small text description for the card content. Nothing more, nothing less.
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card>
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              <ion-card-header>
                <ion-card-title>Card Title</ion-card-title>
                <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                Here's a small text description for the card content. Nothing more, nothing less.
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card>
              <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
              <ion-card-header>
                <ion-card-title>Card Title</ion-card-title>
                <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                Here's a small text description for the card content. Nothing more, nothing less.
              </ion-card-content>
            </ion-card>
          </ion-col>

        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/vue';

</script>
