<template>
	<div id="app">
		<nav class="d-none">
			<router-link to="/">Prise de rendez-vous</router-link> |
			<router-link to="/about">About</router-link>
		</nav>
		<router-view />
	</div>
</template>
<script>
export default {
	mounted() {
		this.getDatas();
	},
	methods: {
		getDatas() {
			this.$store.dispatch("getCreneauxDatas");
		},
	},
};
</script>
