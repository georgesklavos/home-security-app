<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="alarms"></ion-back-button>
        </ion-buttons>
        <ion-title>Sensors</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logout"> Logout </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
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
        <ion-item-sliding v-for="(sensor, index) in sensors" :key="index">
          <ion-item>
            <ion-label>{{ sensor.name }}</ion-label>
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
  IonButton,
  // IonRippleEffect,
} from "@ionic/vue";
import { mapGetters } from "vuex";
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
    IonButton
    // IonRippleEffect,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.getCenros();
  },
  computed: {
    ...mapGetters(["sensors"]),
  },
  methods: {
    async refresh(event) {
      await this.getCenros();
      event.target.complete();
    },
    async getCenros() {
      this.loading = true;
      await this.$store.dispatch("sensors", this.$route.params.id);
      this.loading = false;
    },
    logout() {
      this.$store.commit("logout");
    }
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