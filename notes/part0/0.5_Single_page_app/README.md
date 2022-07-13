# new note

This contain markup of the homework submission.
File `homework_pageload.txt` also exists in this directory.

Instructions on form submit in SPA:

- User navigates to page [https://studies.cs.helsinki.fi/exampleapp/spa](https://studies.cs.helsinki.fi/exampleapp/spa) `homework_pageload.txt`

```txt
note over browser:
User navigates to SPA
end note

browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa
server->browser: Status Code 200, HTML code with favicon, CSS, and spa.js script
browser->server: GET https://studies.cs.helsinki.fi/favicon.ico
server->browser: Status Code 200, returns favicon
browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server->browser: Status Code 200, returns CSS stylesheet main.css
browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server->browser: Status Code 200, returns JS file spa.js

note over browser:
spa.js script loads, adds onsubmit event handler, sends XHTTP request to /exampleapp/data.json
end note

browser->server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server->browser: Status Code 200, returns file data.json

note over browser:
spa.js xhttp.onreadystatechange parses JSON, calls redrawNotes function, appending notes to the page
end note
```
