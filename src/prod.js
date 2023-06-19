import "@babel/polyfill";
//import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
const idKey = "#app-prise-rdv-v1";
const mountEl = document.querySelector(idKey);
new Vue({
	router,
	store,
	propsData: {
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
	},
	mounted() {
		// on met à jour les paramettres.
		if (this.urlCreneaux && this.urlCreneaux != "") {
			this.$store.state.urlCreneaux = this.urlCreneaux;
		}
		if (this.dynamicUrl === true || this.dynamicUrl === false) {
			this.$store.state.dynamicUrl = this.dynamicUrl;
		}
		this.getDatas();
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
