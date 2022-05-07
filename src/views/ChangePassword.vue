<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-title>Change password</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="logout"> Logout </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-progress-bar v-if="showLoading" type="indeterminate"></ion-progress-bar>
      <ion-card class="ion-text-center">

        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" v-model="v$.password.$model"></ion-input>
          </ion-item>
          <small v-if="
            (v$.password.$invalid && submitted) ||
            v$.password.$pending.$response
          " class="p-error">{{
    v$.password.required.$message.replace("Value", "Password")
}}</small>

          <ion-item>
            <ion-label position="floating">Confirm password</ion-label>
            <ion-input type="password" v-model="v$.confirmPassword.$model"></ion-input>
          </ion-item>
          <!-- <small v-if="
            (v$.confirmPassword.$invalid && submitted) ||
            v$.confirmPassword.$pending.$response
          " class="p-error">{{
    v$.confirmPassword.required.$message.replace("Value", "Confirm password")
}}</small> -->
          <div v-if="v$.confirmPassword.$error && submitted">
            <div id="email-error" v-for="(error, index) of v$.confirmPassword.$errors" :key="index">
              <small class="p-error">{{ error.$message.includes('Value') ? error.$message.replace('Value', 'Confirm password'):'Password must be the same as confirm password' }}</small>
            </div>
          </div>

          <ion-button style="margin-top: 5%" expand="block" @click="changePassword">Change password</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonInput,
  IonLabel,
  IonItem,
  IonButton,
  IonCardContent,
  IonContent,
  IonProgressBar,
  IonButtons,
useIonRouter
} from "@ionic/vue";
import useValidate from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
export default {
  name: "changePassword",
  setup() {
    const router = useIonRouter();
    return { v$: useValidate(), router };
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonCardContent,
    IonContent,
    IonProgressBar,
    IonButtons
  },
  data() {
    return {
      password: "",
      confirmPassword: "",
      submitted: false,
      showLoading: false
    };
  },
  validations() {
    return {
      password: { required },
      confirmPassword: { required, sameAsPassword: sameAs(this.password) },
    };
  },
  methods: {
    async changePassword() {
      this.submitted = true;
      const isFormCorrect = await this.v$.$validate();
      if (isFormCorrect) {
        this.showLoading = true;
        await this.$store.dispatch("changePassword", { password: this.password });
        this.showLoading = false;
        this.router.navigate("/alarms", "forward", "replace");
      }
    },
    logout() {
      this.$store.commit("logout");
    }
  }
};
</script>

<style scoped>
ion-card {
  /* transform: translateY(-50%);
    top: 45%;
    width: 90%;
    position: absolute; */
  transform: translateY(-50%);
  top: 45%;
}

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