
function fetchHTML(text) {
    const regex = /```html\s+(.*?)\s+```/s;
    const match = text.match(regex);

    if (match) {
        const extractedCode = match[1];
        console.log(extractedCode);
        return extractedCode;
    } else {
        console.log("No HTML code found.");
        return ""
    }
}


function fetchCSS(text) {
    const regex = /```css\s+(.*?)\s+```/s;
    const match = text.match(regex);

    if (match) {
        const extractedCode = match[1];
        console.log(extractedCode);
        return extractedCode;
    } else {
        console.log("No css code found.");
        return ""
    }
}



function fetchJS(text) {
    const regex = /```js\s+(.*?)\s+```/s;
    const match = text.match(regex);

    if (match) {
        const extractedCode = match[1];
        console.log(extractedCode);
        return extractedCode;
    } else {
        console.log("No js code found.");
        return ""
    }
}


export default {fetchHTML, fetchCSS, fetchJS};