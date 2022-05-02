import axios from "axios";
import { createStore } from "vuex";
import Cookies from "js-cookie";
import {app} from "../main";

axios.defaults.baseURL= process.env.VUE_APP_BACK_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;

// instance.interceptors.response.use(function (res) {
//   console.log(res);
//   if (res.status == 401) {
//     console.log("fdd");
//     window.location.replace(window.location.host + "/login");
//   }
//   return res;
// });

axios.interceptors.response.use((res) => res, (err) => {
  if(err.response.status == 401) {
    app.config.globalProperties.$router.push({name: "login"});
  }
});

export default createStore({
  state: {
    pagination: "Showing {first} to {last} of {totalRecords} entries",
    users: [],
    alarms: [],
    userInfo: {},
    censors: []
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
    censors(state) {
      return state.censors;
    }
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
    censors(state, payload) {
      state.censors = payload;
    }
  },
  actions: {
    async login(context, data) {
      await axios.post("login", data).then((res) => {
        // context.commit("userInfo", res.data);
        Cookies.set("token", res.data.access_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
      });
    },
    async alarms(context) {
      await axios.get("limited/alarms").then((res) => {
        context.commit("alarms", res.data);
      });
    },
    async censors(context,alarmId) {
      await axios.get(`limited/sensors/${alarmId}`).then((res) => {
        context.commit("censors", res.data);
      });
    },
  },
});
