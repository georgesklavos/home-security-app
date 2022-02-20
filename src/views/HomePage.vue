<template>
  <IonCard style="margin-top: 50%">
    <ion-card-header style="text-align: center">
      <ion-card-title>Login</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item>
        <ion-label position="floating">Email</ion-label>
        <ion-input></ion-input>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Password</ion-label>
        <ion-input type="password"></ion-input>
      </ion-item>
       <ion-button expand="block" @click="login">Login</ion-button>
    </ion-card-content>
  </IonCard>
</template>

<script lang="ts">
import { IonCard, IonInput, IonLabel, IonItem } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonCard,
    IonInput,
    IonLabel,
    IonItem,
  },
  methods: {
    login() {
      console.log("click login");
    }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
