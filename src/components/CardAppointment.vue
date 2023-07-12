<template>
	<div class="card-appoint" :url="urlPath">
		<div class="container">
			<div>
				<service-choose></service-choose>
			</div>

			<div
				v-if="executants.length > 0"
				class="d-flex align-items-baseline justify-content-between"
			>
				<div class="date-hours-title">Avec qui ?</div>
				<b-form-group class="mx-5" size="lg">
					<b-form-select
						v-model="selected.equipe"
						:options="executants"
						class="form-control"
					></b-form-select>
				</b-form-group>
			</div>
			<div class="date-hours-title">Choix de la date & heure</div>
			<div v-show="!$store.state.selected.creneau.editing">
				<card-selected-date></card-selected-date>
			</div>

			<div>
				<div v-show="!isLoading">
					<b-alert v-model="$store.state.statusCreneau" variant="primary">
						Aucun créneaux disponible
					</b-alert>
				</div>
				<div
					class="date-hours-content"
					v-show="
						$store.state.selected.creneau.editing &&
						!isLoading &&
						!$store.state.statusCreneau
					"
				>
					<div class="content-header">
						<div class="date-header swiper-creneau">
							<div class="swiper-wrapper">
								<div
									class="swiper-slide"
									v-for="(days, index) in daysCreneaux"
									:key="index"
								>
									<div
										class="dh-date"
										:class="{ 'dh-date--current': isCurrentDay(days) }"
										v-html="days.label"
									></div>
								</div>
							</div>

							<div class="nav-prev">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="css-jr5xe1"
								>
									<path
										fill-rule="evenodd"
										d="M8.705 6.705a.998.998 0 0 0 0 1.41L12.58 12l-3.876 3.884a.998.998 0 0 0 1.411 1.411L15.41 12l-5.295-5.295a.997.997 0 0 0-1.41 0z"
									></path>
									<use transform="matrix(0 1 1 0 -.295 .295)"></use>
								</svg>
							</div>
							<div class="nav-next">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="css-nil"
								>
									<path
										fill-rule="evenodd"
										d="M8.705 6.705a.998.998 0 0 0 0 1.41L12.58 12l-3.876 3.884a.998.998 0 0 0 1.411 1.411L15.41 12l-5.295-5.295a.997.997 0 0 0-1.41 0z"
									></path>
									<use transform="matrix(0 1 1 0 -.295 .295)"></use>
								</svg>
							</div>
						</div>
					</div>
					<!-- Affichage des creneaux -->
					<div class="date-row swiper-rows">
						<div class="swiper-wrapper">
							<div
								class="swiper-slide"
								v-for="(creneaux, index) in daysCreneaux"
								:key="index"
							>
								<div v-if="creneaux.conf && creneaux.conf.status">
									<date-hour-column :creneaux="creneaux"> </date-hour-column>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				v-if="isLoading"
				class="text-center d-flex justify-content-center my-5 py-5"
			>
				<b-spinner style="width: 3rem; height: 3rem" variant="dark"></b-spinner>
			</div>
		</div>

		<div
			v-if="$store.getters.canRegister && !$store.state.connected"
			class="container"
		>
			<div class="date-hours-title">3. Identification</div>
			<loginRegister
				class="login-register"
				action-after-login="emit_even"
				model-register-form="generate_password"
				action-after-register="emit_even_register"
			>
				<template v-slot:condition_utilisation>
					<div class="d-none">...</div>
				</template>
			</loginRegister>
		</div>

		<div
			v-if="$store.state.connected && !$store.state.alreadyConnected"
			class="container"
		>
			<div class="date-hours-title">3. Identification</div>
			<div class="options-content">
				<div class="card-options">
					<div class="co-title">Connected!</div>
				</div>
			</div>
		</div>
		<div
			class="container"
			v-show="$store.state.connected && !$store.state.selected.creneau.editing"
		>
			<div class="date-hours-title d-none">Final</div>
			<recapitulation-options></recapitulation-options>
		</div>
		<!-- pop up modal -->
		<div>
			<pop-up-modal></pop-up-modal>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
/* register */
import loginRegister from "drupal-vuejs/src/App/components/LoginRegister.vue";
import users from "../config/users";
/* moment js */
import moment from "moment";
/*  */
// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from "swiper";
// import Swiper and modules styles
import "swiper/css";

/* swiper */
/* import des composants */
import DateHourColumn from "./DateHourColumn.vue";
import CardSelectedDate from "./CardSelectedDate.vue";
import ServiceChoose from "./ServiceChoose.vue";
import RecapitulationOptions from "./RecapitulationOptions.vue";
import PopUpModal from "./PopUpModal.vue";

export default {
	components: {
		DateHourColumn,
		CardSelectedDate,
		loginRegister,
		ServiceChoose,
		RecapitulationOptions,
		PopUpModal,
	},
	name: "CardAppointment",
	props: {},

	data() {
		return {
			equipe: "",
		};
	},
	mounted() {
		this.check_if_user_connected();
		this.checkIfUserRegister();
		users.getCurrentUser().then((user) => {
			//console.log("user login--", user);
			if (user) {
				this.$store.dispatch("setConnected", {
					connected: true,
					already: true,
				});
			}
		});
		let inter = setInterval(() => {
			if (this.daysCreneaux.length) {
				//console.log("aattat", inter);
				this.editSwiper();
				clearInterval(inter);
			}
		}, 100);
		//
	},
	computed: {
		...mapState({ isLoading: "creneauIsLoading", selected: "selected" }),
		...mapGetters(["daysCreneaux", "executants", "urlPath"]),
	},
	methods: {
		/** *
		 *  @param {object} days represente les information du jours
		 *  @param {string} object.value la date du jour au format "Fri 2 Sep"
		 * */
		isCurrentDay(days) {
			let real_Date = days.value;
			let today = moment().format("ddd D MMM yyyy");
			//console.log("re", real_Date, "----", today, today.includes(real_Date));

			return today.includes(real_Date);
		},
		check_if_user_connected() {
			document.addEventListener(
				"login_rx_vuejs__user_is_login",
				() => {
					if (this.$store.state.entity_type == "commerce_order") {
						// Si l'utilisateur viens de se connecter on recharge la page afin de mettre à jour le formulaire checkout.
						window.location.reload();
					} else {
						users.getCurrentUser().then((user) => {
							if (user) {
								this.$store.dispatch("setConnected", {
									connected: true,
									already: false,
								});
							}
						});
					}
				},
				false
			);
		},
		checkIfUserRegister() {
			document.addEventListener(
				"login_rx_vuejs__user_is_register",
				() => {
					if (this.$store.state.entity_type == "commerce_order") {
						// Si l'utilisateur viens de se connecter on recharge la page afin de mettre à jour le formulaire checkout.
						window.location.reload();
					} else {
						users.getCurrentUser().then((user) => {
							if (user) {
								this.$store.dispatch("setConnected", {
									connected: true,
									already: false,
								});
							}
						});
					}
				},
				false
			);
		},
		editSwiper() {
			new Swiper(".swiper-creneau", {
				speed: 600,
				modules: [Navigation, Pagination],
				pagination: {
					el: ".swiper-pagination",
				},
				navigation: {
					nextEl: ".nav-next",
					prevEl: ".nav-prev",
				},
				slidesPerView: 1,
				slidesPerGroup: 1,
				allowTouchMove: false,
				spaceBetween: 30,
				loop: false,
				breakpoints: {
					377: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					569: {
						slidesPerView: 3,
						slidesPerGroup: 3,
					},
					769: {
						slidesPerView: 4,
						slidesPerGroup: 4,
					},
					993: {
						slidesPerView: 5,
						slidesPerGroup: 5,
					},
					1200: {
						slidesPerView: 6,
						slidesPerGroup: 6,
					},
				},
			});
			new Swiper(".swiper-rows", {
				speed: 600,
				modules: [Navigation, Pagination],
				pagination: {
					el: ".swiper-pagination",
				},
				navigation: {
					nextEl: ".nav-next",
					prevEl: ".nav-prev",
				},
				effect: "fade",
				fadeEffect: {
					crossFade: true,
				},
				slidesPerView: 1,
				slidesPerGroup: 1,
				allowTouchMove: false,
				loop: false,
				spaceBetween: 30,
				breakpoints: {
					377: {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					569: {
						slidesPerView: 3,
						slidesPerGroup: 3,
					},
					769: {
						slidesPerView: 4,
						slidesPerGroup: 4,
					},
					993: {
						slidesPerView: 5,
						slidesPerGroup: 5,
					},
					1200: {
						slidesPerView: 6,
						slidesPerGroup: 6,
					},
				},
			});
		},
	},
};
</script>

<style lang="scss">
html,
body {
	min-height: initial;
}
.link-sc {
	cursor: pointer;
	display: flex;
	text-decoration: underline;
	font-size: 14px;
	font-weight: normal;
	color: #000;
	transition: 0.3s;
	text-transform: capitalize;
	&:hover {
		text-decoration: none;
		color: rgb(241, 138, 101);
	}
}
.date-hours-content {
	margin-top: 5px;
	width: 100%;
	overflow: hidden;
	position: relative;
	padding-bottom: 40px;
	box-shadow: rgb(60 66 87 / 4%) 0px 0px 5px 0px,
		rgb(0 0 0 / 4%) 0px 0px 10px 0px;
	border-radius: 4px;
	background-color: white;
}
.date-header {
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	padding: 10px 5%;
	position: relative;
	border-bottom: 1px solid rgb(229, 229, 229);
	min-height: 50px;
	.swiper-wrapper {
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
	}
	.swiper-slide {
		width: auto;
		display: flex;
		justify-content: center;
	}
}
.dh-date {
	min-width: 130px;
	text-align: center;
	display: flex;
	color: rgb(151, 151, 151);
	font-weight: bold;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	font-size: 14px;
	&--current {
		color: rgb(13, 13, 13);
	}
}
.date-row {
	height: calc(100% - 59px);
	padding: 0px 5% 26px;

	border-radius: 4px;
	.swiper-wrapper {
		-webkit-box-pack: justify;
		justify-content: space-between;
		display: flex;
	}
	.swiper-slide {
		width: auto;
	}
	.dr-colum {
		min-width: 130px;
		text-align: center;
	}
	.days_hours {
		color: #0a0a0a;
		font-size: 14px;
		padding-top: 24px;
		line-height: 1.29;
		cursor: pointer;
		&:hover {
			font-weight: bold;
		}
		&--disabled {
			color: rgb(156, 156, 156);
			pointer-events: none;
			text-decoration: line-through;
		}
	}
}
.date-hours-title {
	margin-bottom: 10px;
	font-size: 18px;
	font-weight: bold;
	line-height: 1.5;
	margin-top: 35px;
	text-align: left;
}
.content-header {
	position: relative;
	svg {
		width: 35px;
		height: 35px;
		fill: black;
	}
	.nav-prev,
	.nav-next {
		position: absolute;
		padding: 1rem;
		cursor: pointer;
		top: 0;
		//background: red;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		//background: white;
	}
	.nav-prev {
		left: 0;
		transform: rotate(-180deg);
	}
	.nav-next {
		right: 0;
	}
	.swiper-button-disabled {
		cursor: not-allowed;
		svg {
			fill: rgb(156, 156, 156);
		}
	}
	.swiper-button-lock {
		cursor: not-allowed;
	}
}
.swiper-creneau,
swiper-rows {
	margin-left: auto;
	margin-right: auto;
	position: relative;
	overflow: hidden;
	list-style: none;
	z-index: 1;
}
.card-appoint {
	.login-register {
		background-color: rgb(255, 255, 255);
		box-shadow: rgb(60 66 87 / 4%) 0px 0px 5px 0px,
			rgb(0 0 0 / 4%) 0px 0px 10px 0px;
		margin-bottom: 20px;
		padding-bottom: 40px;
	}
	a {
		cursor: pointer;
		text-decoration: underline;
		font-weight: normal;
		color: #000;
		transition: 0.3s;
		text-transform: capitalize;
		&:hover {
			text-decoration: none;
			color: rgb(236, 137, 90);
		}
	}
	.login-page {
		min-height: initial;

		.spinner-grow {
			position: absolute;
		}
		.block-center {
			background-color: rgb(255, 255, 255);
			box-shadow: initial;
			position: relative;
		}
	}
}
</style>
