const { app, BrowserWindow, Menu, globalShortcut } = require('electron');

// Set node env
process.env.NODE_ENV = 'development';

const isDevMode = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;

function createMainWindow() {
	mainWindow = new BrowserWindow({
		title: 'Image Resizer',
		width: 500,
		height: 600,
		icon: `${__dirname}/assets/icons/Icon_256x256.png`,
		resizable: isDevMode,
		backgroundColor: '#252b4d',
	});

	// mainWindow.loadURL(`file://${__dirname}/app/index.html`);
	mainWindow.loadFile(`${__dirname}/app/index.html`);
}

app.on('ready', () => {
	createMainWindow();

	const mainMenu = Menu.buildFromTemplate(menu);
	Menu.setApplicationMenu(mainMenu);

	globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload());
	globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () =>
		mainWindow.toggleDevTools()
	);

	mainWindow.on('closed', () => (mainWindow = null));
});

const menu = [
	// For mac file option
	...(isMac ? [{ role: 'appMenu' }] : []),
	{
		label: 'File',
		submenu: [
			{
				label: 'Quit',
				// accelerator: isMac ? ' Command+W' : 'Ctrl+W',
				accelerator: 'CmdOrCtrl+W', // Cross platform
				click: () => app.quit(),
			},
		],
	},
];

app.on('window-all-closed', () => {
	if (!isMac) {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow();
	}
});
