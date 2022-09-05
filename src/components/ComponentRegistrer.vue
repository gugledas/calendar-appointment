<template>
	<div>
		<label v-html="strings.ask_to_login"></label>
		<loginRegister
			action_after_login="emit_even"
			model_register_form="generate_password"
		></loginRegister>
	</div>
</template>

<script>
import { loginRegister } from "drupal-vuejs";
import { mapState } from "vuex";
import users from "../../users.js";
export default {
	name: "page-register",
	components: {
		loginRegister,
	},
	mounted() {
		this.check_if_user_connected();
	},
	methods: {
		ev_logingoogle(user) {
			console.log(user);
		},
		check_if_user_connected() {
			document.addEventListener(
				"login_rx_vuejs__user_is_login",
				() => {
					console.log("user login");
					users.getCurrentUser().then((user) => {
						console.log("user login--", user);
					});
				},
				false
			);
		},
	},
	computed: {
		...mapState({
			//strings: (state) => state.strings,
		}),
	},
};
</script>
