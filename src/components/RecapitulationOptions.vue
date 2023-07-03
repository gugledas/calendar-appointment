<template>
	<div>
		<div class="recap-content">
			<div class="desc-content d-none">
				Vous êtes sur le point de réserver la prestation :
				<strong>{{ $store.state.rdv_datas.title }} </strong> <br />
				Pour le <strong>{{ $store.state.selected.creneau.text }} </strong><br />
				Pendant une durrée de
				<strong>{{ $store.state.rdv_datas.duree }} </strong> <br />
				Qui vous coûteras <strong>{{ $store.state.rdv_datas.prix }} </strong>.
			</div>
			<div>
				<b-button
					variant="primary"
					block
					class="btn-regist d-flex align-items-center justify-content-center"
					@click.prevent="saveDatas"
				>
					<div>Confirmer la réservation</div>
					<div v-show="$store.state.saveLoading" class="ml-3">
						<b-spinner
							style="width: 1.2rem; height: 1.2rem"
							variant="primary"
							type="grow"
							label="Spinning"
						></b-spinner>
					</div>
				</b-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "RecapitulationOptions",
	props: {},

	data() {
		return {};
	},
	mounted() {},
	computed: {},
	methods: {
		saveDatas() {
			this.$store.dispatch("saveDatasCreneauSelected");
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.recap-content {
	font-size: 14px;
	line-height: 1.5;
	box-shadow: rgb(60 66 87 / 4%) 0px 0px 5px 0px,
		rgb(0 0 0 / 4%) 0px 0px 10px 0px;
	border-radius: 4px;
	margin-bottom: 12px;
	background-color: rgb(255, 255, 255);
	min-height: 54px;
	padding: 20px 18px 12px;
	.btn-regist {
		font-weight: bold;
	}
	.desc-content {
		margin-bottom: 1rem;
	}
}
</style>
