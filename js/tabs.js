(function () {
	// Объект с CSS классами
	const CLASSES = {
		TAB_SYSTEM: ".tab-system",
		TRIGGER: ".tab-trigger",
		CONTENTS_CONTAINER: ".tab-contents",
		CONTENT: ".tab-content",
		ACTIVE: "_active",
	};

	// -------------------------------------------------------------------------------------

	// Получаем все системы табов, триггеры и контенты на странице
	const tabsSystems = document.querySelectorAll(CLASSES.TAB_SYSTEM);
	const tabTriggers = document.querySelectorAll(CLASSES.TRIGGER);
	const tabContents = document.querySelectorAll(CLASSES.CONTENT);

	// -------------------------------------------------------------------------------------

	function removeActiveClass(...arrays) {
		arrays.forEach(array => {
			array.forEach(element => {
				element.classList.remove(CLASSES.ACTIVE)
			})
		});
	}
	function setActiveClass(...arrays) {
		arrays.forEach(array => {
			array.forEach(element => {
				element.classList.add(CLASSES.ACTIVE)
			})
		});
	}

	function initTabSystem(system) {
		// Фильтруем триггеры, относящиеся к текущей системе табов
		const triggers = [...tabTriggers].filter(t => {
			const parentRed = t.closest(CLASSES.TAB_SYSTEM);
			return parentRed === system;
		});
		// Фильтруем контенты, относящиеся к текущей системе табов
		const contents = [...tabContents].filter(c => {
			const parentRed = c.closest(CLASSES.TAB_SYSTEM);
			return parentRed === system;
		});

		function getTriggers(dataTab) {
			return [...triggers].filter(trigger => trigger.dataset.tab === dataTab);
		}
		function getContents(dataTab) {
			return [...contents].filter(content => content.dataset.tab === dataTab);
		}

		function updateTabs(currentTrigger) {
			const dataTab = currentTrigger.dataset.tab;

			// Находим соответствующий тригер(-ы)
			const currentTriggers = getTriggers(dataTab)
			// Находим соответствующий контент(-ы)
			const currentContents = getContents(dataTab)

			// Удаляем класс active
			removeActiveClass(triggers, contents)
			// Добавляем класс active
			setActiveClass(currentTriggers, currentContents)
		}

		// Добавляем обработчики клика на все триггеры
		triggers.forEach(t => t.addEventListener("click", () => updateTabs(t)));
	}

	// Инициализируем все системы табов на странице
	tabsSystems.forEach(s => initTabSystem(s))
})();