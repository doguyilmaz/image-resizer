const path = require('path');
const os = require('os');
const { ipcRenderer } = require('electron');

const form = document.getElementById('image-form');
const slider = document.getElementById('slider');
const img = document.getElementById('img');
const filePath = document.getElementById('file-path');
const outputPath = document.getElementById('output-path');

let isToasted = false;

// Set output directory
// LATER: optional
outputPath.innerText = path.join(os.homedir(), 'imageresizer');

// Onsubmit
form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (!filePath.value) {
		if (!isToasted) {
			isToasted = true;
			return M.toast(
				{
					html: `Please select an image.`,
					classes: 'align-center red',
				},
				setTimeout(() => {
					isToasted = false;
				}, 4000)
			);
		}
	} else {
		const imgPath = img.files[0].path;
		const quality = slider.value;

		ipcRenderer.send('img:resize', {
			imgPath,
			quality,
		});
	}
});

// On finish image resize
ipcRenderer.on('img:done', () => {
	isToasted = true;
	M.toast(
		{
			html: `Image resized to ${slider.value}% quality.`,
			classes: 'align-center green',
		},
		setTimeout(() => {
			isToasted = false;
		}, 4000)
	);
});
