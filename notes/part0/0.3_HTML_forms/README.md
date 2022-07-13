# MDN HTML Forms - Notes

Source: (https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form)[https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form]

## What are web forms?

- Points of interaction between users and web servers
- Form controls are sometimes called widgets
- Types - single line text, multiline textareas, dropdowns, checkboxes, radio buttons, checkboxes
- Mostly created with [<input>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element

## Designing your form

### The <form> element

```html
<form action="/my-endpoint" method="post">...</form>
```

### The <label>, <input>, <textarea>, and <button> elements

```html
<form action="/my-endpoint" method="post">
    <ul>
        <li>
            <label for="usernameId">Username:</label>
            <input id="usernameId" name="username" type="text" placeholder="Enter username..."/>
        </li>
        <li>
            <label for="emailId">Email:</label>
            <input id="emailId" name="useremail" type="email" placeholder="Enter email..."/>
        </li>
        <li>
            <label for="passwordId">Password:</label>
            <input id="passwordId" name="userpassword" type="password" placeholder="Enter password..."/>
        </li>
        <li>
            <label for="messageId">Message:</label>
            <textarea id="messageId" name="usermessage" placeholder="Enter message..."/>
        </li>
    </ul>

    <input type="submit">Submit</input>
    <button type="submit">Submit more</button>
    <button type="reset">Reset</button>
</form>
```
