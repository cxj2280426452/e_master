import Vue from 'vue'
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import {
	localStorage
} from "mp-storage";

Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		token: "",
		uid: "",
		openId: ""
	},
	mutations: {

		setToken(state, param) {
			state.token = param;
		},

		setUid(state, param) {
			state.uid = param;
		},
		setOpenId(state, param) {
			state.openId = param;
		}
	},
	actions: {

	},
	plugins: [createPersistedState({
		storage: localStorage
	})]
})
export default store;
