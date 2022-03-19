# MDN HML Basics - Notes

Source: (https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)[https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics]

## HTML = HyperText Markup Language

- The structure of a web page and content
- Defined through elements
- Nested elements are composed of wrapping tags and inner content
- Attributes contain information about the element - class, id, action, data-

## Anatomy of an HTML document

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charste="utf-8" />
    <title>Page title</title>
  </head>
  <body>
    <p>page content</p>
  </body>
</html>
```

- <!DOCTYPE html> - required to make sure document behaves correctly
- <html></html> - wraps all content, is the root element
- <head></head> - keywords, CSS styles, char sets, scripts
- <meta charset="utf-8"> - sets char set of document, for most languages
- <title></title> - title of page, appears in browser tab, describes bookmark
- <body></Body> - content of page, script tags

## Basic elements

### Images

```html
<img
  src="url-to-image.png"
  alt="descriptive accessible text describing image"
/>
```

### Headings

```html
<h1>Page title</h1>
<h2>Top-level title</h2>
<h3>Subheading</h3>
<h4>Sub-subheading</h4>
<h5>Small</h5>
<h6>Smaller</h6>
```

### Comments

```html
<!-- comment syntax -->
```

### Paragraphs

```html
<p>paragraph</p>
```

### Lists

```html
<!-- Unordered list -->
<ul>
  <li>Item A</li>
  <li>Item B</li>
</ul>

<!-- Ordered list -->
<ol>
  <li>Item 1</li>
  <li>Item 2</li>
</ol>
```

### Links/Anchor tags

```html
<a href="#id">Anchor to certain id</a>
<a href="myapp/route">Link to internal route</a>
<a href="https://www.mozilla.org">Link to external page</a>
```
