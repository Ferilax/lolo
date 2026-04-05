(function () {
	const CLASSES = {
		MODIFICATION: "_open",
		BODYLOCK: "_lock-scroll",
		MODAL_BODY: ".modal__body"
	}

	function createPopover(modalSelector, triggerSelector) {
		const modal = document.querySelector(modalSelector)
		const triggers = document.querySelectorAll(triggerSelector)
		const HTMLElement = document.documentElement

		if (!modal || triggers.length === 0) return

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

		triggers.forEach(trigger => {
			trigger.addEventListener("click", () => {
				scrollSwitcher("lock")
			})
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

	// auth modal -------------------------------------------------------------------------------------
	const authModal = document.querySelector(".auth-modal")
	const loginPart = authModal.querySelector("#login")
	const registerPart = authModal.querySelector("#register")
	authModal.addEventListener("click", (e) => {
		const clickedLogInSwitcher = e.target.closest("#login .link")
		const clickedRegisterSwitcher = e.target.closest("#register .link")

		if (clickedLogInSwitcher) {
			loginPart.style.contentVisibility = "hidden"
			registerPart.style.contentVisibility = "unset"
		}
		if (clickedRegisterSwitcher) {
			loginPart.style.contentVisibility = "unset"
			registerPart.style.contentVisibility = "hidden"
		}
	})

}())