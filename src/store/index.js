import Vue from "vue";
import Vuex from "vuex";
import config from "../config/config";

Vue.use(Vuex);

const state = {
	/* représente les données d'un créneaux spécifique en BD */
	creneaux_datas: [],
	//urlCreneaux: "/booking-manager/api/node/3",
	urlCreneaux: "/booking-manager/api/node/263",
	creneauIsLoading: false,
	currentSelectedDate: {
		text: "En attente",
		value: "",
		editing: true,
	},
};

export default new Vuex.Store({
	state: state,
	getters: {
		daysCreneaux(state) {
			if (state.creneaux_datas.jours) {
				return state.creneaux_datas.jours;
			}
			return [];
		},
		canRegister(state) {
			if (state.currentSelectedDate.value !== "") return true;
			return false;
		},
	},
	mutations: {
		GET_CRENEAUX_DATAS(state, datas) {
			state.creneaux_datas = datas;
		},
		SET_LOADING(state, datas) {
			state.creneauIsLoading = datas;
		},
		SET_SELECTED_CRENEAUX(state, datas) {
			state.currentSelectedDate = datas;
		},
	},
	actions: {
		/**   Récupère les données du créneaux en BD
		 * @param {string} url
		 */
		async getCreneauxDatas(context) {
			context.commit("SET_LOADING", true);
			let datas = await config.datas(context.state.urlCreneaux);
			console.log("url", datas);
			context.commit("GET_CRENEAUX_DATAS", datas);
			context.commit("SET_LOADING", false);
		},
		/**   Mets a jour les infos de l'étape du choix du créneaux {{state.currentSelectedDate}}
		 * @param {Object} datas
		 * @param {string} datas.text Répresente le texte de la date sélectionné
		 * @param {string} datas.value l'heure du créneau choisis
		 * @param {boolean} datas.editing indique la sélection ou l'édition d'un créneau est encour
		 */
		setSelectedCreneau(context, datas) {
			context.commit("SET_SELECTED_CRENEAUX", datas);
		},
	},
	modules: {},
});
