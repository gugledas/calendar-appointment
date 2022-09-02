import Vue from "vue";
import Vuex from "vuex";
import config from "../config/config";

Vue.use(Vuex);

const state = {
	creneaux_datas: [],
	//urlCreneaux: "/booking-manager/api/node/3",
	urlCreneaux: "/booking-manager/api/node/263",
	creneauIsLoading: false,
};

export default new Vuex.Store({
	state: state,
	getters: {
		daysCreneaux(state) {
			let newtab = config.formatValidDay(state.creneaux_datas.jours);
			console.log("newtab", newtab);
			if (state.creneaux_datas.jours) {
				return state.creneaux_datas.jours;
			}
			return [];
		},
	},
	mutations: {
		GET_CRENEAUX_DATAS(state, datas) {
			state.creneaux_datas = datas;
		},
		SET_LOADING(state, datas) {
			state.creneauIsLoading = datas;
		},
	},
	actions: {
		/**   récupère les données du créneaux en BD
		 * @param {string} url
		 */
		async getCreneauxDatas(context) {
			context.commit("SET_LOADING", true);
			let datas = await config.datas(context.state.urlCreneaux);
			console.log("url", datas);
			context.commit("GET_CRENEAUX_DATAS", datas);
			context.commit("SET_LOADING", false);
		},
	},
	modules: {},
});
