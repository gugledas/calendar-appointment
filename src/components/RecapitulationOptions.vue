<template>
	<div>
		<div class="recap-content"></div>
	</div>
</template>

<script>
export default {
	name: "DateHourColumn",
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
.options-content {
	margin-top: 2rem;
	font-size: 14px;
	line-height: 1.5;
	box-shadow: rgb(60 66 87 / 4%) 0px 0px 5px 0px,
		rgb(0 0 0 / 4%) 0px 0px 10px 0px;
	border-radius: 4px;
	margin-bottom: 12px;
	background-color: rgb(255, 255, 255) !important;
}
.card-options {
	display: flex;
	height: auto;
	min-height: 54px;
	padding: 10px 18px 12px;
	border-bottom: none;
	align-items: center;
	.co-title {
		margin-right: auto;
		margin-bottom: 0px;
		width: auto;
		padding-right: 24px;
		color: black;
		font-size: 16px;
	}
}
</style>
