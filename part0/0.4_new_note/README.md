# new note

This contain markup of the homework submission.
Files `pageload.txt` and `homework.txt` also exists in this directory.

Paste the homework.txt contents into the editor at [https://www.websequencediagrams.com/](https://www.websequencediagrams.com/) for the output image.

Instructions:

- User creates a note on a page [https://studies.cs.helsinki.fi/exampleapp/notes](https://studies.cs.helsinki.fi/exampleapp/notes)
- User writes something in the text field
- User submits

```txt
note over browser:
User types in input, clicks Save
end note
browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
server->browser: Status Code 203 response with Location /exampleapp/notes to redirect
note over browser:
Repeats steps in pageload.txt
end note
```

Interactions on page load:

```txt
note over browser:
User goes to site
end note
browser->server: GET https://studies.cs.helsinki.fi/exampleapp/notes
server->browser: html code with favicon, css link, jss scripts
browser->server: GET https://studies.cs.helsinki.fi/favicon.ico
server->browser: returns favicon
browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server->browser: return sCSS stylesheet
browser->server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
server->browser: returns JS script file
note over browser:
main.js fetches JSON file at endpoint /examples/data.json
end note
browser->server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server->browser: returns json data, event handler parses and creates HTML elements on page
```
