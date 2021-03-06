import axios from "axios";
import { createStore } from "vuex";
import { app } from "../main";

axios.defaults.baseURL = process.env.VUE_APP_BACK_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

// instance.interceptors.response.use(function (res) {
//   console.log(res);
//   if (res.status == 401) {
//     console.log("fdd");
//     window.location.replace(window.location.host + "/login");
//   }
//   return res;
// });

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status == 401) {
      console.log(app);
      app.config.globalProperties.$router.push({ name: "login" });
      localStorage.removeItem("token");
    }
    return Promise.reject(err);
  }
);

export default createStore({
  state: {
    pagination: "Showing {first} to {last} of {totalRecords} entries",
    users: [],
    alarms: [],
    userInfo: {},
    sensors: [],
    android: "",
    profile: {},
  },
  getters: {
    users(state) {
      return state.users;
    },
    alarms(state) {
      return state.alarms;
    },
    userInfo(state) {
      return state.userInfo;
    },
    sensors(state) {
      return state.sensors;
    },
    getAndroidToken(state) {
      return state.android;
    },
    profile(state) {
      return state.profile;
    },
  },
  mutations: {
    users(state, payload) {
      state.users = payload;
    },
    alarms(state, payload) {
      state.alarms = payload;
    },
    userInfo(state, payload) {
      state.userInfo = payload;
    },
    sensors(state, payload) {
      state.sensors = payload;
    },
    androidToken(state, payload) {
      state.android = payload;
    },
    logout() {
      localStorage.removeItem("token");
      app.config.globalProperties.$router.push({ name: "login" });
    },
    profile(state, payload) {
      state.profile = payload;
    },
  },
  actions: {
    async login(context, { email, password, androidToken }) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            "login",
            { email, password },
            {
              headers: {
                AndroidToken: androidToken,
              },
            }
          )
          .then((res) => {
            // context.commit("userInfo", res.data);
            console.log(res);
            if (res) {
              localStorage.setItem("token", res.data.access_token);
              axios.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${res.data.access_token}`;
              resolve();
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async alarms(context) {
      await axios.get("limited/alarms").then((res) => {
        context.commit("alarms", res.data);
      });
    },
    async sensors(context, alarmId) {
      await axios.get(`limited/sensors/${alarmId}`).then((res) => {
        context.commit("sensors", res.data);
      });
    },
    async toggleAlarm(context, alarmId) {
      await axios.put(`limited/alarms/${alarmId}`);
    },
    async profile(context) {
      await axios.get("limited/users/profile").then((res) => {
        context.commit("profile", res.data);
      });
    },
    async changePassword(context, data) {
      await axios.put('limited/users/password',data);
    }
  },
});
