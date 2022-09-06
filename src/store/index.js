import Vue from "vue";
import Vuex from "vuex";
import config from "../rootConfig";

Vue.use(Vuex);

const state = {
	/* représente les données d'un créneaux spécifique en BD */
	creneaux_datas: [],
	rdv_datas: {
		title: "",
		prix: "",
		duree: "",
	},
	connected: false,
	alreadyConnected: false,
	urlCreneaux: "/booking-manager/api/",
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
		urlPath(state) {
			let url = state.urlCreneaux;
			let endpoint = window.location.pathname
				.split("/")
				.filter((el) => el.length)
				.splice(-2)
				.join("/");
			if (endpoint.length > 2) return url + endpoint;
			return url;
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
		SET_RDV_DATAS(state, datas) {
			state.rdv_datas = datas;
		},
		SET_CONNECTED(state, datas) {
			state.connected = datas;
		},
		SET_ALREDY_CONNECTED(state, datas) {
			state.alreadyConnected = datas;
		},
	},
	actions: {
		/**   récupère les données du créneaux en BD
		 * @param {string} url
		 */
		async getCreneauxDatas(context) {
			context.commit("SET_LOADING", true);
			console.log("url", context.getters.urlPath);
			let datas = await config.get(context.getters.urlPath);
			console.log("url", datas);
			context.commit("GET_CRENEAUX_DATAS", datas.data.data_creneaux);
			context.commit("SET_LOADING", false);
			/* set rdvDatas */
			if (datas && datas.data && datas.data.data_to_rdv) {
				let bdDatas = datas.data.data_to_rdv;
				let dts = {};
				dts.prix = bdDatas.field_prix[0].value;
				dts.title = bdDatas.title[0].value;
				dts.duree = bdDatas.field_duree[0].value;
				console.log("dts", dts);
				context.commit("SET_RDV_DATAS", dts);
			}
		},
		/**   Mets a jour les infos de l'étape du choix du créneaux {{state.currentSelectedDate}}
		 * @param {Object} datas
		 * @param {string} datas.text Répresente le texte de la date sélectionné
		 * @param {string} datas.value l'heure du créneau choisis
		 * @param {boolean} datas.editing indique la sélection ou l'édition du créneau est encour
		 */
		setSelectedCreneau(context, datas) {
			context.commit("SET_SELECTED_CRENEAUX", datas);
		},
		setConnected(context, datas, already) {
			context.commit("SET_CONNECTED", datas);
			if (already) {
				context.commit("SET_ALREDY_CONNECTED", already);
			}
		},
	},
	modules: {},
});
