<template>
	<div class="home">
		<CardAppointment />
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
		return {};
	},
	methods: {},
};
</script>
<style lang="scss"></style>
