<template>
<ion-page>
  <ion-content>
    <ion-card class="ion-text-center">
      <ion-card-header style="text-align: center">
        <ion-card-title>Login</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item :class="{ error: v$.email.$errors.length }">
          <ion-label position="floating">Email</ion-label>
          <ion-input inputmode="email" v-model="v$.email.$model"></ion-input>
          <!-- <div
            class="input-errors"
            v-for="error of v$.email.$errors"
            :key="error.$uid"
          >
            <small class="error-msg">{{ error.$message }}</small>
          </div> -->
        </ion-item>

        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input type="password"></ion-input>
        </ion-item>
          <!-- <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small> -->
        <ion-button style="margin-top: 5%" expand="block" @click="login"
          >Login</ion-button
        >
      </ion-card-content>
    </ion-card>
  </ion-content>
</ion-page>
</template>

<script>
import { IonCard, IonInput, IonLabel, IonItem, IonButton, IonPage, IonCardContent, IonCardHeader,IonCardTitle,IonContent,  useIonRouter } from "@ionic/vue";
import { defineComponent } from "vue";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import {mapGetters} from "vuex";
// import { useRouter } from "vue-router";


export default defineComponent({
  name: "HomePage",
  setup() {
    const router = useIonRouter();
    return { v$: useValidate(),router };
  },
  components: {
    IonCard,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonPage,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent
  },
  data() {
    return {
      email: "",
      password: "",
      submitted: false
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
  computed: {
    ...mapGetters(["count"])
  },
  methods: {
    async login() {
      console.log(this.count);
      // const isFormCorrect = await this.v$.$validate();
      this.submitted = true;
      this.router.navigate("/alarms","forward","replace");
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      // if (!isFormCorrect) return
      console.log("click login");
    },
  },
});
</script>

<style scoped>
/* .ion-page {
  display: flex;
  justify-content: center;
  text-align: center;
} */
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
