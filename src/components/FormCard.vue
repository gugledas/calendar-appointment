<template>
	<div class="form-card">
		<form action="">
			<div class="form-input input-phone" v-show="type !== 'login'">
				<input type="tel" class="form-control" placeholder="phone" />
			</div>
			<div class="form-input">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
				>
					<path
						fill="#979797"
						fill-rule="evenodd"
						d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"
					></path>
				</svg>

				<input type="email" class="form-control" placeholder="Email" />
			</div>
			<div class="form-input show-pass">
				<div class="svg" @click="passShowToggle" v-show="passShow">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="22"
						height="19"
						viewBox="0 0 24 24"
						class="css-161rwvf"
					>
						<path
							fill="#979797"
							fill-rule="evenodd"
							d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6zm0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9zm0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"
						></path>
					</svg>
				</div>
				<div class="svg" @click="passShowToggle" v-show="!passShow">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
					>
						<path
							fill="#979797"
							fill-rule="evenodd"
							d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z"
						></path>
					</svg>
				</div>
				<input
					:type="passType"
					class="form-control password-input"
					placeholder="Mot de passe"
					autofocus
				/>
			</div>
			<div class="form-input text-left pt-3" v-show="type !== 'login'">
				<b-form-checkbox
					id="checkbox-1"
					name="checkbox-1"
					value="accepted"
					unchecked-value="not_accepted"
				>
					J'accepte les <a href="#">CGU</a>
				</b-form-checkbox>
			</div>
			<button type="submit" class="btn-regist btn-regist--active">
				{{ btnText }}
			</button>
		</form>
		<div v-if="type === 'login'" class="text-center mt-4">
			<a class="link-sc">Mot de passe oublié</a>
		</div>
	</div>
</template>

<script>
export default {
	name: "DateHourColumn",
	props: {
		type: {
			type: String,
			default: "login",
		},
		btnText: {
			type: String,
			default: "Se connecter",
		},
	},

	data() {
		return { passShow: false, passType: "password" };
	},
	mounted() {},
	computed: {},
	methods: {
		passShowToggle() {
			this.passShow = !this.passShow;
			if (this.passType === "password") {
				this.passType = "text";
			} else {
				this.passType = "password";
			}
			document
				.querySelectorAll("input.password-input")
				.forEach((el) => el.focus());
			//console.log("ss", ps);
			//if (ps) ps.;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.form-card {
	margin: 15px 0;
	input {
		height: 40px;
		font-size: 16px;
		-webkit-appearance: none;
		border-radius: 0;
		background-color: #fff;
		font-family: inherit;
		border-style: solid;
		border-width: 1px;
		border-color: #ccc;
		box-shadow: inset 0 1px 2px rgb(0 0 0 / 10%);
		color: rgba(0, 0, 0, 0.75);
		display: block;
		font-size: 1rem;
		margin: 0 0 18px 0;
		padding: 12px;
		width: 100%;
		box-sizing: border-box;
		transition: all 0.15s linear;
		&:focus {
			background: #fafafa;
			border-color: #999;
			outline: none;
		}
	}
	// .input-phone {
	// 	position: absolute;
	// 	top: 0px;
	// 	bottom: 0px;
	// 	left: 17px;
	// 	border: none;
	// 	outline: none;
	// 	background-color: transparent;
	// 	display: flex;
	// 	cursor: pointer;
	// 	-webkit-box-align: center;
	// 	align-items: center;
	// 	-webkit-box-pack: center;
	// 	justify-content: center;
	// 	appearance: initial !important;
	// }
	.form-input {
		position: relative;
		width: 100%;
		margin-bottom: 20px;
		a {
			color: rgb(0, 0, 0);
			cursor: pointer;
			text-decoration: underline;
			transition: 0.3s;
			&:hover {
				text-decoration: none;
				color: rgb(241, 138, 101);
			}
		}

		svg {
			position: absolute;
			top: 9px;
			right: 9px;
			width: 24px;
			height: 24px;
			border: none;
			outline: none;
			background-color: transparent;
			appearance: initial !important;
		}
	}
	.show-pass {
		svg {
			cursor: pointer;
		}
	}
}
</style>
