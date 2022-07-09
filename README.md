# Request Checker
Perform a request to a given url and get the response status.

## Usage
node index.js [-h] [-v] &lt;url&gt;
*  -h Show this help
*  -v Verbose output. Will show the headers sent back from the server
*  &lt;url&gt; the url to examine

Output will contain the status grouped by major class (2xx, 3xx, 4xx or 5xx).

If the class is 2xx and there is a Content-Location header then this will be shown.

If verbose output is selected then the headers will be listed as well.
