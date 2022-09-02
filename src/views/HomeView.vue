<template>
	<div class="home">
		<CardAppointment msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
// @ is an alias to /src
import CardAppointment from "@/components/CardAppointment.vue";

export default {
	name: "HomeView",
	components: {
		CardAppointment,
	},
	data() {
		return {
			slide: 0,
			sliding: null,
		};
	},
	methods: {
		onSlideStart() {
			this.sliding = true;
		},
		onSlideEnd() {
			this.sliding = false;
		},
	},
};
</script>
