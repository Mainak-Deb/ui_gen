const WebMaker=({rawcode})=>{
        let parsedHTML=rawcode["html"];
        parsedHTML=parsedHTML.replace('<link rel="stylesheet" href="style.css">',`<style>${rawcode["css"]}</style>`)
        parsedHTML=parsedHTML.replace(' <script src="index.js"></script>',`<script>${rawcode["js"]}</script>`)
        console.log(parsedHTML)
        return parsedHTML;
}
export default WebMaker;