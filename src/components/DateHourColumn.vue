<template>
	<div class="dr-colum">
		<div
			class="days_hours"
			:class="{
				'days_hours--disabled': dayDisabled(creneau.status),
			}"
			v-for="(creneau, index) in trueCreneaux"
			:key="index"
			@click="chooseCreneau(creneau)"
		>
			{{ creneau.value }}
		</div>
	</div>
</template>

<script>
import moment from "moment";
export default {
	name: "DateHourColumn",
	props: {
		creneaux: {
			type: Object,
			required: true,
			default: function () {
				return {};
			},
		},
	},

	data() {
		return {};
	},
	mounted() {},
	computed: {
		trueCreneaux() {
			return this.creneaux.creneau.filter((creneau) => creneau.status);
		},
	},
	methods: {
		/**
		 * @param {Number,Boolean} status Réprésente l'état du créneaux
		 */
		dayDisabled(status) {
			//console.log(status);
			if (status) {
				return false;
			}
			return true;
		},
		/**
		 * @param {Object} creneauTime Réprésente la valeur  du créneaux sélectionner
		 * @param {string} creneauTime.value Réprésente la valeur  du créneaux sélectionner
		 */
		chooseCreneau(creneauTime) {
			let day = moment(this.creneaux.value, "ddd D MMM YYYY").locale("fr");
			let weekDays = day.format("dddd");
			let month = day.format("MMMM");
			let dayNumber = day.format("D");
			let year = day.format("YYYY");
			//console.log("value", creneauTime.value, month, weekDays);
			let datas = {
				text: `${weekDays} ${dayNumber} ${month} ${year} à ${creneauTime.value}`,
				value: creneauTime.value,
				editing: false,
			};
			this.$store.dispatch("setSelectedCreneau", datas);
			window.scrollTo(0, 400);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
