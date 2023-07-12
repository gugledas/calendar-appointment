import "@babel/polyfill";
//import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
import { required, email, alpha } from "vee-validate/dist/rules";
extend("required", {
	...required,
	message: "Ce champs est requis",
});
extend("email", email);
extend("alpha", alpha);

//
const idKey = "#app-prise-rdv-v1";
const mountEl = document.querySelector(idKey);
console.log("entity-id", mountEl.getAttribute("entity-id"));
new Vue({
	router,
	store,
	propsData: {
		entity_id: parseInt(mountEl.getAttribute("entity-id")),
		entity_type: mountEl.getAttribute("entity-type"),
		entity_type_id: mountEl.getAttribute("entity-type-id"),
		show_popup_save:
			mountEl.getAttribute("show-popup-save") == "false" ? false : true,
		dynamicUrl: mountEl.getAttribute("dynamic-url") == "false" ? false : true,
		urlCreneaux:
			mountEl.getAttribute("url-creneaux") != ""
				? mountEl.getAttribute("url-creneaux")
				: "/prise-rendez-vous/souscription/",
	},
	// Les props ne fonctionnent pas correctement d'ou utilisation des propsData, mais vue3 semble bien fonctionner.
	props: {
		urlCreneaux: { type: String },
		dynamicUrl: { type: Boolean },
		entity_id: { type: Number },
		entity_type: { type: String },
		entity_type_id: { type: String },
		show_popup_save: { type: Boolean, default: true },
	},
	mounted() {
		// on met à jour les paramettres.
		if (this.urlCreneaux && this.urlCreneaux != "") {
			this.$store.state.urlCreneaux = this.urlCreneaux;
		}
		if (this.dynamicUrl === true || this.dynamicUrl === false) {
			this.$store.state.dynamicUrl = this.dynamicUrl;
		}
		if (this.show_popup_save === true || this.show_popup_save === false) {
			this.$store.state.show_popup_save = this.show_popup_save;
		}
		//
		this.$store.state.entity_id = this.entity_id;
		this.$store.state.entity_type = this.entity_type;
		this.$store.state.entity_type_id = this.entity_type_id;

		this.getDatas();
		//
		this.$store.dispatch("loadChoisesOfuser");
	},
	render: (h) =>
		h(App, {
			props: {},
		}),
	methods: {
		/**
		 * On charge les données à partir d'ici car on doit patienter que l'application soit entierement initialisé.
		 * Le composant "root" est le dernier à etre initialiser.
		 */
		getDatas() {
			this.$store.dispatch("getCreneauxDatas");
		},
	},
}).$mount(idKey);
