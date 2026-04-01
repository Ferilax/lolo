async function loadModules() {
	function has(selector) {
		return !!document.querySelector(selector)
	}

	if (has(".tab-system")) {
		import("./tabs.js")
	}
	if (has(".main_page")) {
		import("./generator.js")
	}
	if (has(".modal")) {
		import("./modal.js")
	}
}

// Запускаем после загрузки DOM
document.addEventListener("DOMContentLoaded", loadModules);