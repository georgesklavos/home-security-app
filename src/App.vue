<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, toastController } from "@ionic/vue";
import { defineComponent } from "vue";
import { PushNotifications } from "@capacitor/push-notifications";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  async mounted() {
    const addListeners = async () => {
      await PushNotifications.addListener("registration", (token) => {
        this.$store.commit("androidToken", token.value);
        console.info("Registration token: ", token.value);
      });

      await PushNotifications.addListener("registrationError", (err) => {
        console.error("Registration error: ", err.error);
      });

      await PushNotifications.addListener(
        "pushNotificationReceived",
        async (notification) => {
          console.log("Push notification received: ", notification);
          const toast = await toastController.create({
            color: "dark",
            duration: 3000,
            header: notification.title,
            message: notification.body,
            showCloseButton: true,
            position: "top",
          });
          await toast.present();
        }
      );

      await PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (notification) => {
          console.log(
            "Push notification action performed",
            notification.actionId,
            notification.inputValue
          );
        }
      );
    };

    const registerNotifications = async () => {
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === "prompt") {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== "granted") {
        throw new Error("User denied permissions!");
      }

      await PushNotifications.register();
    };

    const getDeliveredNotifications = async () => {
      const notificationList =
        await PushNotifications.getDeliveredNotifications();
      console.log("delivered notifications", notificationList);
    };
    registerNotifications();
    addListeners();
    getDeliveredNotifications();
  },
});
</script>

<style>
.p-error {
  color: #f44336;
}
</style>