<template>
	<div id="app">
		<nav>
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

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
/* 
*étape une afiche les jours

*/
</style>
