
function main() {
    "use strict";
    if (process.argv.length != 3) {
        console.error("Expected 3, got " + process.argv.length, process.argv)
        process.exit(1)
    }
    // first two args are node and the location of this script
    // and can thus be discarded
    let args = process.argv.slice(2); 
    let file = require("./"+args[0]),
        tests = require("./src/tests"),
        wdio = require('webdriverio').remote({ desiredCapabilities: { browserName: file.browser.toLowerCase() } });
    tests.run(wdio, file.specs, file.login_info)
    wdio.end()
};

main();