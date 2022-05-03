<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Alarms</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-list v-if="loading">
        <ion-item v-for="index in 20" :key="index">
          <!-- <ion-thumbnail>
            <ion-skeleton-text animated class="thumbnail"></ion-skeleton-text>
          </ion-thumbnail> -->
          <ion-note slot="start"
            ><div style="margin-bottom: 10px">
              <ion-skeleton-text animated class="dot"></ion-skeleton-text>
            </div>
          </ion-note>
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
          <ion-item button @click="showCensors(alarm)">
            <ion-label>{{ alarm.name }}</ion-label>
            <ion-note slot="start" :color="alarm.active ? 'success' : 'danger'"
              ><div
                class="dot"
                :style="
                  alarm.active
                    ? 'background-color:#2dd36f'
                    : 'background-color:#eb445a'
                "
              ></div>
              {{ alarm.active ? "On" : "Off" }}</ion-note
            >
            <!-- <ion-button
              
              style="width: 100%; height: 100%"
              expand="full"
              fill="clear"
              class="full-width"
              >{{ alarm.name }}</ion-button
            > -->
          </ion-item>
          <ion-item-options side="end">
            <ion-item-option
              v-if="alarm.enabled"
              color="danger"
              @click="toggleAlarm(alarm)"
              >Disable</ion-item-option
            >
            <ion-item-option v-else color="success" @click="toggleAlarm(alarm)"
              >Enable</ion-item-option
            >
            <!-- ADD ALERT  -->
          </ion-item-options>
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
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  // IonThumbnail,
  IonSkeletonText,
  // IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonRefresher,
  IonRefresherContent,
  IonNote,
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
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    // IonThumbnail,
    IonSkeletonText,
    // IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonRefresher,
    IonRefresherContent,
    IonNote,
    // IonRippleEffect,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.getAlarms();
  },
  computed: {
    ...mapGetters(["alarms"]),
  },
  methods: {
    async refresh(event) {
      await this.getAlarms();
      event.target.complete();
    },
    showCensors(data) {
      this.$router.push({ path: `/censors/${data._id}` });
      console.log(data);
    },
    async toggleAlarm(data) {
      await this.$store.dispatch("toggleAlarm", data._id);
      this.getAlarms();
    },
    getAlarms() {
      this.loading = true;
      this.$store.dispatch("alarms");
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.thumbnail {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: inline-block;
}

.dot {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
}
</style>