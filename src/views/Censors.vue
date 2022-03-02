<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="alarms"></ion-back-button>
        </ion-buttons>
        <ion-title>Censors</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="refresh()">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list v-if="loading">
        <ion-item v-for="index in 20" :key="index">
          <ion-thumbnail>
            <ion-skeleton-text animated class="thumbnail"></ion-skeleton-text>
          </ion-thumbnail>
          <ion-label>
            <p>
              <ion-skeleton-text animated style="width: 80%">
              </ion-skeleton-text>
            </p>
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list v-else>
        <ion-item-sliding v-for="(alarm, index) in alarms" :key="index">
          <ion-item>
            <ion-label>{{ alarm.name }}</ion-label>
          </ion-item>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonItem,
  IonList,
  IonLabel,
  // IonItemOption,
  // IonItemOptions,
  IonItemSliding,
  IonThumbnail,
  IonSkeletonText,
  IonHeader,
  IonBackButton,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonRefresher,
  IonRefresherContent,
  // IonRippleEffect,
} from "@ionic/vue";
export default {
  name: "alarmsPage",
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonList,
    IonLabel,
    // IonItemOption,
    // IonItemOptions,
    IonItemSliding,
    IonThumbnail,
    IonSkeletonText,
    IonHeader,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonTitle,
    IonRefresher,
    IonRefresherContent,
    // IonRippleEffect,
  },
  data() {
    return {
      loading: false,
      alarms: [
        { id: 1, name: "censor 1", enabled: false },
        { id: 2, name: "censor 2", enabled: true },
        { id: 3, name: "censor 3", enabled: true },
        { id: 4, name: "censor 4", enabled: true },
        { id: 5, name: "censor 5", enabled: true },
        { id: 6, name: "censor 6", enabled: true },
        { id: 7, name: "censor 7", enabled: true },
        { id: 8, name: "censor 8", enabled: true },
        { id: 9, name: "censor 9", enabled: true },
      ],
    };
  },
  methods: {
    refresh() {
      console.log("run refresh");
    },
    showCensors(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped>
.thumbnail {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: inline-block;
}
</style>