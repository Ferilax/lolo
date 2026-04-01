(function () {
	const CLASSES = {
		MODIFICATION: "_open",
		BODYLOCK: "_lock-scroll",
		MODAL_BODY: ".modal__body"
	}

	function createPopover(modalSelector, triggerSelector) {
		const modal = document.querySelector(modalSelector)
		const trigger = document.querySelector(triggerSelector)
		const HTMLElement = document.documentElement

		if (!modal || !trigger) return

		// Переключатель появления поповера
		function scrollSwitcher(action) {
			if (action === "lock") {
				HTMLElement.classList.add(CLASSES.BODYLOCK)
				modal.classList.add(CLASSES.MODIFICATION)
				document.addEventListener("click", clickOutsideHandler)
			}

			if (action === "unlock") {
				HTMLElement.classList.remove(CLASSES.BODYLOCK)
				modal.classList.remove(CLASSES.MODIFICATION)
				document.removeEventListener("click", clickOutsideHandler)
			}
		}

		// При открытом поповере вешаем на документ обработчик, для отлавливания кликов вне
		// При закрытии поповера удаляем обработчик
		function clickOutsideHandler(e) {
			const modal = e.target.closest(CLASSES.MODAL_BODY)
			const close = e.target.closest(triggerSelector)

			if (!modal && !close) {
				scrollSwitcher("unlock")
			}
		}

		trigger.addEventListener("click", () => {
			scrollSwitcher("lock")
		})
	}

	createPopover(".auth-modal", ".auth-modal-trigger")

	// input show password -------------------------------------------------------
	const inputContainer = document.querySelector(".input-container")

	inputContainer.addEventListener("click", (e) => {
		const input = inputContainer.querySelector("input")
		const eyeOpened = inputContainer.querySelector(".eye-opened")
		const eyeClosed = inputContainer.querySelector(".eye-closed")

		if (e.target.closest(".eye-opened")) {
			input.setAttribute("type", "password")
			eyeOpened.style.display = "none"
			eyeClosed.style.display = "flex"
		}
		if (e.target.closest(".eye-closed")) {
			input.setAttribute("type", "text")
			eyeClosed.style.display = "none"
			eyeOpened.style.display = "flex"
		}
	})
}())