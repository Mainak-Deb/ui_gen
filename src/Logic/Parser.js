
export function fetchHTML(text) {
    const regex = /```html\s+(.*?)\s+```/s;
    const match = text.match(regex);

    if (match) {
        const extractedCode = match[1];
        return extractedCode;
    } else {
        console.log("No HTML code found.");
        return ""
    }
}


export  function fetchCSS(text) {
    const regex = /```css\s+(.*?)\s+```/s;
    const match = text.match(regex);

    if (match) {
        const extractedCode = match[1];
        return extractedCode;
    } else {
        console.log("No css code found.");
        return ""
    }
}



export  function fetchJS(text) {
    const regex = /```js\s+(.*?)\s+```/s;
    const match = text.match(regex);

    if (match) {
        const extractedCode = match[1];
        return extractedCode;
    } else {
        console.log("No js code found.");
        return ""
    }
}

export function htmlBodyExtractor(code){
    const regex = /<body>\s+(.*?)\s+<\/body>/s;
    const match = code.match(regex);

    if (match) {
        const extractedCode = match[1];
        return extractedCode;
    } else {
        console.log("No HTML code found.");
        return ""
    }
}
