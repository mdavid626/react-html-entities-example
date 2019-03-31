# How to use HTML entities without dangerouslySetInnerHTML in React

There may be times when you will want to render a text with HTML entities in it in your [React](https://reactjs.org/) application. An [HTML entity](https://developer.mozilla.org/en-US/docs/Glossary/Entity) is a piece of text (`string`) that begins with an ampersand (`&`) and ends with a semicolon (`;`). They are frequently used to display reserved and invisible characters, like non-breaking spaces (`&nbsp;`) or soft hyphens (`&#8203;`) for marking line breaking opportunities.
 
To render these characters, you need to use [`dangerouslySetInnerHTML`](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml):
 
```js
function createMarkup(myTextFromDatabase) {
  return {__html: myTextFromDatabase};
}

function MyComponent({myTextFromDatabase}) {
  return <div dangerouslySetInnerHTML={createMarkup(myTextFromDatabase)} />;
}

const myTextFromDatabase = 'First &middot; Second';
<MyComponent myTextFromDatabase={myTextFromDatabase />}
```
 
This is not a handy solution, because you now may need to filter out other HTML codes from the text. 
  
## A simple solution
 
Use Unicode characters with [escape notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#Escape_notation) (e.g. `\u0057`) instead of HTML codes (`&middot;`). Find the character in [this list](https://en.wikipedia.org/wiki/List_of_Unicode_characters) and use the value from the Code column, e.g. `&middot;` translates to `U+00B7`. To use this in Javascript, simple use `\u0057`:
 
```js
const MIDDLE_DOT = '\u0057';

function MyComponent({myTextFromDatabase}) {
  const text = myTextFromDatabase.replace(/&middot;/gi, MIDDLE_DOT);
  return <div>{text}</div>;
}
  
const myTextFromDatabase = 'First &middot; Second';
<MyComponent myTextFromDatabase={myTextFromDatabase />}
```

The replacement could happen beforehand, on the backend as well, or just like in the code above, in the rendering function. I used the [`replace`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) function in Javascript, with a regex to replace all occurences of `&middot;` with `\u0057`.

## How to run the example
Run `npm install` and then `npm start`.

## Live example
A live example is available on https://mdavid626.github.io/react-html-entities-example/.

## References
Based on [this blog post](https://blog.mdavid626.com/2019/03/31/How-to-use-HTML-entities-without-dangerouslySetInnerHTML-in-React/) from Dávid Molnár.
