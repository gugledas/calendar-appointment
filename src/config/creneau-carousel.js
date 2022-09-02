// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from "swiper";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// init Swiper:
const swiper = new Swiper(".swiper-creneau", {
	// configure Swiper to use modules
	modules: [Navigation, Pagination],
	pagination: {
		el: ".swiper-pagination",
	},

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	slidesPerView: 5,
	loop: true,
});
const swipere = new Swiper(".swiper", {
	// configure Swiper to use modules
	modules: [Navigation, Pagination],
	pagination: {
		el: ".swiper-pagination",
	},

	// Navigation arrows
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},

	slidesPerView: 5,
	loop: true,
});
console.log("", swiper, swipere, "---");
