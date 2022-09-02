<template>
	<div class="dr-colum">
		<div
			class="days_hours"
			:class="{ 'days_hours--disabled': dayDisabled(creneau.conf) }"
			v-for="(creneau, index) in creneaux.creneau"
			:key="index"
		>
			{{ creneau.value }}
		</div>
	</div>
</template>

<script>
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
	computed: {},
	methods: {
		/**
		 * @param {Number,Boolean} status Réprésente l'état du créneaux
		 */
		dayDisabled(status) {
			//console.log(status);
			if (status.status) {
				return false;
			}
			return true;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
