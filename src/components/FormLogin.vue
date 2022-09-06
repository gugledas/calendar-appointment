<template>
	<div class="container">
		<div class="login-registration">
			<div class="content-info accordion" role="tablist">
				<div class="date-hours-title">3. Identification</div>
				<div class="registration regist-card">
					<div class="option-title">Nouveau sur ce service ?</div>
					<b-collapse
						class="form-div"
						id="form-register"
						role="tabpanel"
						accordion="my-accordion"
					>
						<form-card type="register" btnText="Créer mon compte"></form-card>
					</b-collapse>
					<div @click="toggleActiveBtn">
						<button
							role="tab"
							v-b-toggle.form-register
							class="btn-regist"
							:class="{ 'btn-regist--active': !loginIsActive }"
							v-show="!registerOpen"
						>
							Créer mon comptee
						</button>
					</div>
				</div>
				<div class="ou-div">ou</div>
				<div class="registration regist-card">
					<div class="option-title">Vous avez déjà utilisé ce service ?</div>
					<b-collapse
						class="form-div"
						id="form-login"
						role="tabpanel"
						accordion="my-accordion"
					>
						<form-card btnText="Se connecter"></form-card>
					</b-collapse>
					<div @click="toggleActiveBtn">
						<button
							role="tab"
							block
							v-b-toggle.form-login
							class="btn-regist"
							:class="{ 'btn-regist--active': loginIsActive }"
							v-show="!loginOpen"
						>
							Se connecter
						</button>
					</div>
				</div>
			</div>
			a
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import FormCard from "./FormCard.vue";

export default {
	components: { FormCard },
	name: "FormLogin",
	props: {},

	data() {
		return {
			loginIsActive: false,
			registerOpen: false,
			loginOpen: false,
		};
	},
	mounted() {
		this.$root.$on("bv::collapse::state", (collapseId, isJustShown) => {
			if (collapseId == "form-register") {
				this.registerOpen = isJustShown;
			} else {
				this.loginOpen = isJustShown;
			}
		});
	},
	computed: {
		...mapState({
			donnee: "currentSelectedDate",
		}),
		btnIsActive() {
			return "";
		},
	},
	methods: {
		toggleActiveBtn() {
			this.loginIsActive = !this.loginIsActive;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.option-title {
	padding-bottom: 12px;
}
.login-registration {
	margin-bottom: 100px;
	color: #0a0a0a;
}
.regist-card {
	background-color: rgb(255, 255, 255);
	box-shadow: rgb(60 66 87 / 4%) 0px 0px 5px 0px,
		rgb(0 0 0 / 4%) 0px 0px 10px 0px;
	padding: 15px 20px 30px;
	.link-sc {
		display: inline-flex;
		//font-size: 16px;
	}
}
.ou-div {
	font-size: 17px;
	color: #0a0a0a;
	padding-bottom: 15px;
	padding-top: 15px;
}

.btn-regist {
	display: inline-flex;
	cursor: pointer;
	text-decoration: none;
	font-size: 14px;
	line-height: 1.29;
	border-radius: 4px;
	border: none;
	padding: 12px 30px;
	width: 100%;
	max-height: 42px;
	min-height: 42px;
	border: 1px solid rgb(0, 0, 0);
	background-color: transparent;
	color: black;
	margin-bottom: 0px;
	margin-top: 12px;
	flex-shrink: 0;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	transition: background-color 0.3s ease-out 0s, color 0.3s ease-out 0s,
		border-color 0.3s ease-out 0s;
	user-select: none;
	&:active {
		border: 1px solid lightblue;
	}
	&:hover {
		background: black;
		color: white;
	}
	&--active {
		background: black;
		color: white;
	}
}
</style>
