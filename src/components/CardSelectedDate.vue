<template>
	<div class="card-selected-date">
		<span class="text">{{ donnee.text }}</span>
		<a class="link-sc" @click="editing">Modifier</a>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "CardSelectedDate",
	props: {},

	data() {
		return {};
	},
	mounted() {},
	computed: {
		...mapState({
			donnee: "currentSelectedDate",
		}),
	},
	methods: {
		editing() {
			class ed {
				constructor(datas) {
					this.text = datas.text;
					this.value = datas.value;
					this.editing = datas.editing;
				}
			}
			let donnee = new ed(this.donnee);
			donnee.editing = !donnee.editing;
			//console.log("donnee", donnee, this.donnee);
			this.$store.dispatch("setSelectedCreneau", donnee);
			this.$store.dispatch("getCreneauxDatas");
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.card-selected-date {
	border-radius: 4px;
	font-size: 14px;
	box-shadow: rgb(60 66 87 / 4%) 0px 0px 5px 0px,
		rgb(0 0 0 / 4%) 0px 0px 10px 0px;
	background-color: rgb(255, 255, 255);
	margin: 5px 0px 10px;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	padding: 20px 25px;

	.text {
		margin-right: auto;
		color: #000;
	}
}
</style>
