<template>
	<div>
		<div class="recap-content">
			<div class="desc-content">
				Vous êtes sur le point de réserver la prestation :
				<strong>{{ $store.state.rdv_datas.title }} </strong> <br />
				Pour le <strong>{{ $store.state.currentSelectedDate.text }} </strong
				><br />
				Pendant une durrée de
				<strong>{{ $store.state.rdv_datas.duree }} </strong> <br />
				Qui vous coûteras <strong>{{ $store.state.rdv_datas.prix }} </strong>.
			</div>
			<div>
				<button block class="btn-regist">Confirmer la réservation</button>
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
	methods: {},
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
