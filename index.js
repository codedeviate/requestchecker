'use strict';

const fetch = require('node-fetch');

const timeout = 30;

process.argv.forEach(function (val, index, array) {
    if(index > 1) {
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

            console.log("\nHeaders\n########################################");
            response.headers.forEach((val, index, array) =>  {
                console.log(index + ": ", val);
            });
        });
    }
});

