# new note

This contain markup of the homework submission.
Files `homework_pageload.txt` and `homework_form_submission.txt` also exist in this directory.

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

- User writes a note, clicks Save
- User views updated note in unordered list

```txt
note over browser:
User types in input element, clicks Save
end note

note over browser:
* spa.js window event listener form.onSubmit is called
* e.preventDefault() prevents page from reloading
* creates new note object, pushes to array of notes, redraws page
* input value is reset
* redrawNotes appends new note to page
* sendToServer function is called to do POST request with payload {content:'my-note',date:"..."}
end note

browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
server->browser: Status Code 201 saying note was created, with response {message:'my-note'}

note over browser:
NOTE - there are no error handlers here. It would be better to wait for a positive response before redrawing the page.
end note
```
