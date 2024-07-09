<template>
  <ion-grid :fixed="true">
    <ion-row>
      <ion-col size="12" size-sm="12" size-md="12" size-lg="12" size-xl="12">
        <!-- ----------------------------- Starting Table ----------------------------- -->
        <ion-card>
          <ion-card-header>
            <ion-card-title class="text-center">TOP 10 SPENDER</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item v-for="(val, idx) in 10" :key="val">
                <ion-badge
                  slot="start"
                  color="primary"
                  class="rank bold"
                  :class="{ outlined: idx >= 3 }"
                >
                  {{ val }}.
                </ion-badge>
                <ion-label>
                  Cupcake Ip {{ val }} coba
                  <sub>123,12{{ val }} K</sub>
                </ion-label>
                <ion-badge
                  slot="end"
                  color="primary"
                  class="label bold"
                  :class="[idx >= 3 ? 'outlined' : '']"
                >
                  VIP
                </ion-badge>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
        <!-- -------------------------------- End Table ------------------------------- -->
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts" setup>
import {
  IonGrid,
  IonCol,
  IonRow,
  IonList,
  IonItem,
  IonLabel,
  IonCardHeader,
  IonCard,
  IonBadge,
  IonCardContent,
  IonCardTitle,
} from "@ionic/vue";
</script>

<style lang="scss" scoped>
ion-card {
  &.md,
  &.ios {
    margin-inline-start: 0;
    margin-inline-end: 0;
    margin-right: 0;
    margin-left: 0;
    border-radius: 8px;
  }
}

ion-badge {
  &.rank {
    border-radius: 8px;
    --padding-top: 10px;
    --padding-bottom: 10px;
    --padding-start: 10px;
    --padding-end: 10px;
  }
  &.label {
    --padding-end: 16px;
    --padding-start: 16px;
  }
  &.outlined {
    border: var(--ion-color-primary) 1px solid;
    background: transparent;
    color: var(--ion-color-primary);
  }
}

ion-item {
  --background: transparent;
}
.list-ios {
  background: transparent;
}
</style>
