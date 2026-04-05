import "./libs/splide.min.js"

(function () {
	Splide.defaults = {
		pagination: false,
		arrows: false,
	}

	function createSwiper(swiperSelector, options) {
		const hasSwiper = !!document.querySelector(swiperSelector);
		if (hasSwiper) {
			let splide = new Splide(swiperSelector, options);
			splide.mount();

			return splide;
		}
	}

	createSwiper("#tariff_splide", {
		autoWidth: true,
		omitEnd: true,
		focus: 0,
		gap: 20,
		padding: "calc((100vw - 100%) / 2)",

		breakpoints: {
			767: {
				gap: 8,
			}
		}
	})
}())
