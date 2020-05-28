const path = require('path');
const os = require('os');

const outputPath = document.getElementById('output-path');

outputPath.innerText = path.join(os.homedir(), 'imageresizer');
