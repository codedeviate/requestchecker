'use strict';

const fetch = require('node-fetch');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', type: String, multiple: true, defaultOption: true },
  { name: 'timeout', alias: 't', type: Number, defaultValue: 30 },
  { name: 'help', alias: 'h', type: Boolean }
];

const options = commandLineArgs(optionDefinitions);

if(options.help || !options.src) {
    console.log("Request Checker");
    console.log("  Perform a request to a given url and get the response status.")
    console.log("  Usage: node index.js [-h] [-v] <url>");
    console.log("    -h Show this help");
    console.log("    -v Verbose output. Will show the headers sent back from the server");
    console.log("    <url> the url to examine");
    console.log("  Output will contain the status grouped by major class (2xx, 3xx, 4xx or 5xx).");
    console.log("  If the class is 2xx and there is a Content-Location header then this will be shown.");
    console.log("  If verbose output is selected then the headers will be listed as well.");
} else if(options.src) {
    options.src.forEach(function (val, index, array) {
        fetch(val, {redirect: 'manual'}).then((response) => {
            let hdrs = [];
            response.headers.forEach((val, index, array) =>  {
                hdrs[index.toLowerCase()] = val;
            });

            let statusGroup = parseInt(response.status / 100);
            if(statusGroup == 2) {
                console.log("We had a 2xx response (" + response.status + ")");
                if(hdrs["content-location"]) {
                    console.log("But we did get a Content-Location (" + hdrs["content-location"] + ")");
                }
            } else if(statusGroup == 3) {
                console.log("We got a 3xx response (" + response.status + ")");
                if(hdrs["location"]) {
                    console.log("Sending us to " + hdrs["location"]);
                };
            } else if(statusGroup == 4) {
                console.log("We got a 4xx response (" + response.status + ")");
            } else if(statusGroup == 5) {
                console.log("We got a 5xx response (" + response.status + ")");
            }

            if(options.verbose) {
                console.log("\nHeaders\n########################################");
                response.headers.forEach((val, index, array) =>  {
                    console.log(index + ": ", val);
                });
            }
        });
    });
}

