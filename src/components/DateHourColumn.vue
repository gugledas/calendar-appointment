<template>
	<div class="dr-colum">
		<div class="days_hours" v-for="(creneau, index) in creneaux" :key="index">
			{{ creneau.value }}
		</div>
	</div>
</template>

<script>
export default {
	name: "DateHourColumn",
	props: {
		creneaux: {
			type: Array,
			required: true,
			default: function () {
				return [];
			},
		},
	},

	data() {
		return {};
	},
	mounted() {
		//	console.log("cern", this.creneaux);
	},
	computed: {},
	methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
