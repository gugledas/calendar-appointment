import Vue from "vue";
import Vuex from "vuex";
import config from "../rootConfig";

Vue.use(Vuex);

const state = {
	/* représente les données d'un créneaux spécifique en BD */
	creneaux_datas: [],
	/* information de la prestation sélectionner */
	rdv_datas: {
		title: "",
		prix: "",
		duree: "",
		type: "",
	},
	connected: false,
	alreadyConnected: false,
	urlCreneaux: "/prise-rendez-vous/souscription/",
	/**
	 * Permet de consytruire l'url de l'action en function de l'url de la page.
	 */
	dynamicUrl: true,
	saveUrl: "/prise-rendez-vous/save/rdv/",
	creneauIsLoading: false,
	popUpInfo: {
		show: false,
		message: "",
		variant: "",
	},
	saveLoading: false,
	/* indique si des creneau sont disponibles ou pas */
	statusCreneau: false,
	messagePopUP: "Réservation éffectuer avec success",
	selected: {
		equipe: false,
		creneau: {
			text: "...",
			value: "",
			editing: true,
			date: "",
		},
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
			if (state.selected.creneau.value !== "") return true;
			return false;
		},
		urlPath() {
			let endpoint = window.location.pathname
				.split("/")
				.filter((el) => el.length)
				.splice(-2)
				.join("/");
			if (endpoint.length > 2) return endpoint;
			return "";
		},
		executants(state) {
			var equipes = [];
			if (state.creneaux_datas.equipes) {
				state.creneaux_datas.equipes.forEach((item) => {
					equipes.push({ value: item.id, text: item.title });
				});
				return equipes;
			} else return equipes;
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
			state.selected.creneau = datas;
		},
		SET_SELECTED_EQUIPE(state, datas) {
			state.selected.equipe = datas;
		},
		SET_RDV_DATAS(state, datas) {
			state.rdv_datas = datas;
		},
		SET_CONNECTED(state, datas) {
			state.connected = datas;
		},
		SET_SAVING_LOADING(state, datas) {
			state.saveLoading = datas;
		},
		SET_STATUS_CRENEAUX(state, datas) {
			state.statusCreneau = datas;
		},
		SET_ALREDY_CONNECTED(state, datas) {
			state.alreadyConnected = datas;
		},
		SET_POP_UP_INFO(state, datas) {
			state.popUpInfo = datas;
		},
	},
	actions: {
		/**   Récupère les données du créneaux en BD
		 * @param {string} url
		 */
		async getCreneauxDatas(context) {
			let url = context.state.urlCreneaux;
			context.commit("SET_LOADING", true);
			//
			if (context.state.dynamicUrl && context.getters.urlPath)
				url += context.getters.urlPath;
			let datas = await config.get(url, { timeout: 10000 }).catch((er) => {
				console.log("cattt", er);
				context.commit("SET_STATUS_CRENEAUX", true);
				context.commit("SET_LOADING", false);
			});
			console.log("url", datas);
			if (datas && datas.data && datas.data.data_creneaux) {
				context.commit("GET_CRENEAUX_DATAS", datas.data.data_creneaux);
				// on selectionne la premiere valeur dans equipe.
				if (
					datas.data.data_creneaux &&
					datas.data.data_creneaux.equipes &&
					datas.data.data_creneaux.equipes[0]
				) {
					context.commit(
						"SET_SELECTED_EQUIPE",
						datas.data.data_creneaux.equipes[0].id
					);
				}
			}
			/* set rdvDatas */
			if (
				datas &&
				datas.data &&
				datas.data.data_to_rdv &&
				datas.data.data_to_rdv.id
			) {
				let bdDatas = datas.data.data_to_rdv;
				let dts = {};
				dts.prix = bdDatas.field_prix[0].value;
				dts.title = bdDatas.title[0].value;
				dts.duree = bdDatas.field_duree[0].value;
				dts.type = bdDatas.type[0].value;
				//console.log("dts", dts);
				context.commit("SET_RDV_DATAS", dts);
			}
			setTimeout(() => {
				context.commit("SET_LOADING", false);
			}, 200);
		},
		/**   Mets a jour les infos de l'étape du choix du créneaux
		 * @param {Object} datas
		 * @param {string} datas.text Répresente le texte de la date sélectionné
		 * @param {string} datas.value l'heure du créneau choisis
		 * @param {boolean} datas.editing indique la sélection ou l'édition du créneau est encour
		 */
		setSelectedCreneau(context, datas) {
			context.commit("SET_SELECTED_CRENEAUX", datas);
		},
		setSelectedEquipe(context, datas) {
			context.commit("SET_SELECTED_EQUIPE", datas);
		},
		setConnected(context, datas) {
			context.commit("SET_CONNECTED", datas.connected);
			//console.log("tasse", datas, "---");
			if (datas.already) {
				context.commit("SET_ALREDY_CONNECTED", datas.already);
			}
		},
		saveDatasCreneauSelected(context) {
			let url = context.getters.urlPath;
			let data = {
				entity_type_id: url.split("/")[0],
				entity_id: url.split("/")[1],
				...context.state.selected,
			};
			context.commit("SET_SAVING_LOADING", true);
			console.log(" Datasave : ", data, url);

			config
				.post(context.state.saveUrl + url, data)
				.then((res) => {
					console.log("reponse save", res);
					context.commit("SET_POP_UP_INFO", {
						show: true,
						message: "Réservation éffectuer avec success",
						variant: "success",
					});
					context.commit("SET_SAVING_LOADING", false);
					setTimeout(() => {
						window.location = window.location.origin;
					}, 6000);
				})
				.catch((err) => {
					console.error("save error", err);
					context.commit("SET_POP_UP_INFO", {
						show: true,
						message: "Une erreur s'est produite",
						variant: "danger",
					});
					context.commit("SET_SAVING_LOADING", false);
				});
		},
		redirectAfterSave(context) {
			if (context.state.popUpInfo.variant != "danger") {
				window.location = window.location.origin;
			}
		},
	},
	modules: {},
});
