# Request Checker
Perform a request to a given url and get the response status.

## "Installation"
*Please observe that this utility is written for usage in [Node.js](https://nodejs.org/)*

```bash
git clone https://github.com/codedeviate/requestchecker
cd requestchecker
npm install
```

## Usage
node index.js [-h] [-v] &lt;url&gt;
*  -h Show this help
*  -v Verbose output. Will show the headers sent back from the server
*  &lt;url&gt; the url to examine

Output will contain the status grouped by major class (2xx, 3xx, 4xx or 5xx).

If the class is 2xx and there is a Content-Location header then this will be shown.

If verbose output is selected then the headers will be listed as well.

### Alternative usage
npm run request -- [-h] [-v] &lt;url&gt;

This is the alterative way to execute the script by using the npm run command.

## Example
```
codedv8$ node index.js -v https://www.github.com
We got a 3xx response (301)
Sending us to https://github.com/

Headers
########################################
connection:  close
content-length:  0
location:  https://github.com/
```
