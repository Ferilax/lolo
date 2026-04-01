(function () {
	function loadAnimation(loadingEl) {
		let percent = 0

		const interval = setInterval(() => {
			loadingEl.querySelector(".loading__progress-percent").innerHTML = `${++percent}%`;
			loadingEl.querySelector(".loading__progress").style.width = `${percent}%`

			if (percent === 100) {
				clearInterval(interval)
				loadingEl.innerHTML = `<img src="img/food-4.png" loading="lazy" alt="">`
			}
		}, 40)
	}

	function initImageGenerator(buttonId, galleryId) {
		const button = document.getElementById(buttonId)
		button.addEventListener("click", () => {
			createImageElement(galleryId)
		})
	}

	function createImageElement(galleryId) {
		const div = document.createElement("div")
		const gallery = document.getElementById(galleryId)
		div.classList.add("photo", "loading")

		div.innerHTML = `
			<img class="loading__icon" src="img/icons/generation-icon.svg" loading="lazy" alt="">
			<span class="loading__text">Генерация...</span>
			<div class="loading__progressbar">
			<div class="loading__progress"></div>
			</div>
			<div class="loading__progress-percent">0%</div>
		`

		gallery.prepend(div)
		loadAnimation(div)
	}

	initImageGenerator("generation_generator", "generation_gallery")
	initImageGenerator("retouch_generator", "retouch_gallery")

	// IMAGE UPLOADING -------------------------------------------- ----------------------------------------------------------------
	// Тут обрабатываем фотографии, загруженные во кладке Ретушь
	const fileInput = document.querySelector(".upload-photo input")
	const photoCamera = document.querySelector(".take-photo input")
	const extraFileInput = document.querySelector(".extra-upload-photo input")
	const previewContainer = document.querySelector(".preview")
	let images = []


	function initImageUploading(element) {
		element.addEventListener("change", (e) => {
			const newFiles = Array.from(e.target.files)

			newFiles.forEach(file => {
				images.push({
					id: Date.now() + Math.random(),
					url: URL.createObjectURL(file),
					file: file
				})
			})

			render()
		})
	}

	initImageUploading(fileInput)
	initImageUploading(extraFileInput)

	function render() {
		previewContainer.innerHTML = ""

		if (images.length > 0) {
			extraFileInput.parentElement.style.display = "flex"
			photoCamera.parentElement.style.display = "none"
			fileInput.parentElement.style.display = "none"
		} else {
			extraFileInput.parentElement.style.display = "none"
			photoCamera.parentElement.style.display = "flex"
			fileInput.parentElement.style.display = "flex"
		}

		images.forEach(img => {
			const wrapper = document.createElement("div")
			const image = document.createElement("img")
			const deleteBtn = document.createElement("button")

			image.src = img.url
			deleteBtn.innerHTML = `
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M18 6L6 18" stroke="#7E7E7E" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M6 6L18 18" stroke="#7E7E7E" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			`

			deleteBtn.addEventListener("click", () => {
				URL.revokeObjectURL(img.url)
				images = images.filter(i => i.id !== img.id)
				render()
			})

			wrapper.classList.add("file-preview")
			deleteBtn.classList.add("file-preview__delete")

			wrapper.appendChild(image)
			wrapper.appendChild(deleteBtn)
			previewContainer.appendChild(wrapper)
		});
	}

	function updateFileInput() {
		const dt = new DataTransfer()
		images.forEach(img => dt.items.add(img.file))
		fileInput.files = dt.files
	}
}())