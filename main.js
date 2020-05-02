import Vue from 'vue'
import App from './App'
import constants from "./config/constants.js";
import functions from "./utils/functions.js";
import request from "./utils/request.js";
import store from "./store.js";
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$store = store;
Vue.prototype.$constants = constants;
Vue.prototype.$functions = functions;
Vue.prototype.$request = request;

const app = new Vue({
	store,
    ...App
})
app.$mount()
