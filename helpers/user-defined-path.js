const path = require("path");

// module.exports = path.dirname(process.mainModule.filename); //Decapricated

module.exports = path.dirname(require.main.filename);