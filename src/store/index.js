import Vue from "vue";
import Vuex from "vuex";
import config from "../rootConfig";

Vue.use(Vuex);

const state = {
	//to login
	form: {
		name: [{ value: "" }],
		mail: [{ value: "" }],
	},
	configs_login_rx_vuejs: {
		client_google_id:
			"513247959752-qapd9jb30pdtoh51m0h53070a2v8c4er.apps.googleusercontent.com", //from https://console.cloud.google.com/apis/credentials?project=lesroisdelareno
	},
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
	urlCreneaux: "/prise-rendez-vous/souscription",
	/**
	 * Permet de construire l'url de l'action en function de l'url de la page.
	 * ( il faudra changer cela et transmetre directement les paramettres via les attributes )
	 */
	dynamicUrl: true,
	saveUrl: "/prise-rendez-vous/save/rdv",
	/**
	 * Parametre permettant d'identifier l'entité parente.
	 */
	entity_id: null, //requis
	entity_type: null, //requis
	entity_type_id: null, //optionnel.
	rdv_config_entity: null, //requis
	//
	/**
	 * Definie si on effectue la MAJ.
	 */
	submit_rdv_entity_id: null,
	//
	show_popup_save: true,
	creneauIsLoading: false,
	action_after_save: "/",
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
		urlPath(state) {
			// let endpoint = window.location.pathname
			// 	.split("/")
			// 	.filter((el) => el.length)
			// 	.splice(-2)
			// 	.join("/");
			// if (endpoint.length > 2) return endpoint;
			// return "";
			if (state.entity_id && state.entity_type)
				return "/" + state.entity_type + "/" + state.entity_id;
			else return null;
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
		/**
		 * Récupère les données du créneaux en BD et la conf.
		 * @param {string} url
		 */
		async getCreneauxDatas(context) {
			let url = context.state.urlCreneaux;
			context.commit("SET_LOADING", true);
			//
			if (!context.getters.urlPath)
				throw new Error(" L'url n'est pas definie ");
			url += context.getters.urlPath;
			//
			let datas = await config.get(url, { timeout: 10000 }).catch((er) => {
				console.log("cattt", er);
				context.commit("SET_STATUS_CRENEAUX", true);
				context.commit("SET_LOADING", false);
			});
			// console.log("url", datas);
			if (datas && datas.data && datas.data.data_creneaux) {
				context.commit("GET_CRENEAUX_DATAS", datas.data.data_creneaux);
				// On selectionne la premiere valeur dans equipe.
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
			// On recupere rdv_config_entity
			context.state.rdv_config_entity = datas.data.rdv_config_entity;
			context.state.submit_rdv_entity_id = datas.data.submit_rdv_entity_id;

			//set action_after_save
			context.state.action_after_save = datas.data.action_after_save;
			//
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
			context.dispatch("saveChoisesOfuser");
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
			if (!context.getters.urlPath) throw new Error("L'url n'est pas definie");
			let url = context.getters.urlPath;
			let data = {
				entity_id: context.state.entity_id,
				entity_type: context.state.entity_type,
				entity_type_id: context.state.entity_type_id,
				rdv_config_entity: context.state.rdv_config_entity,
				submit_rdv_entity_id: context.state.submit_rdv_entity_id,
				...context.state.selected,
			};
			context.commit("SET_SAVING_LOADING", true);
			config
				.post(context.state.saveUrl + url, data)
				.then((res) => {
					//on emet un evement apres la suvegarde du choix de utilisateurs.
					var event = new CustomEvent("prise_rendez_vous--save");
					document.dispatchEvent(event);
					//
					console.log("reponse save", res);
					context.commit("SET_SAVING_LOADING", false);
					if (context.state.show_popup_save) {
						context.commit("SET_POP_UP_INFO", {
							show: true,
							message: "Réservation éffectuer avec success",
							variant: "success",
						});
					}

					// setTimeout(() => {
					// 	window.location = window.location.origin;
					// }, 6000);
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
		/**
		 * Enregistre les choix de l'utilisateur.
		 */
		saveChoisesOfuser({ state }) {
			setTimeout(() => {
				// On verifie qu'on est toujours sur la meme entite.
				const val = {
					entity_id: state.entity_id,
					entity_type: state.entity_type,
					selected: state.selected,
				};
				window.localStorage.setItem(
					"calendar_appoint_selected",
					JSON.stringify(val)
				);
			}, 300);
		},
		/**
		 *
		 * @param {*} param0
		 */
		loadChoisesOfuser({ state, commit }) {
			var v = window.localStorage.getItem("calendar_appoint_selected");
			if (v) {
				const val = JSON.parse(v);
				if (
					val.entity_id == state.entity_id &&
					val.entity_type == state.entity_type
				) {
					if (val.selected.creneau && val.selected.creneau.date) {
						commit("SET_SELECTED_CRENEAUX", val.selected.creneau);
						commit("SET_SELECTED_EQUIPE", val.selected.equipe);
					}
				}
			}
		},
		redirectAfterSave({ state }) {
			if (state.action_after_save != "")
				if (state.popUpInfo.variant != "danger") {
					window.location = state.action_after_save;
				}
		},
	},
	modules: {},
});
