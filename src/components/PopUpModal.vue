<template>
	<div class="pop-up-modal">
		<b-modal
			id="saveModal"
			centered
			:title="popUpInfo.variant == 'danger' ? 'Erreur' : ''"
			variant="success"
			buttonSize="sm"
			:okVariant="popUpInfo.variant != 'danger' ? 'success' : 'danger'"
			:hide-header="popUpInfo.variant != 'danger' ? true : false"
			size="sm"
			:header-bg-variant="popUpInfo.variant"
			cancel-title=""
			:ok-only="true"
			footer-class="border-0"
			v-model="$store.state.popUpInfo.show"
			>{{ $store.state.popUpInfo.message }}</b-modal
		>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "PopUpModal",
	props: {},

	data() {
		return {};
	},
	mounted() {
		this.$root.$on("bv::modal::hide", (bvEvent, saveModal) => {
			console.log("Modal is about to be shown", bvEvent, saveModal);
			this.$store.dispatch("redirectAfterSave");
		});
	},
	computed: {
		...mapState({ popUpInfo: "popUpInfo" }),
	},
	methods: {},
};
</script>

<style lang="scss"></style>
