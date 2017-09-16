/* // importing the basicCard modules from BasicCard.js file
var BasicCard = require("./BasicCard.js"); */

function ClozeCard(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.partial = text.includes(cloze) ? text.replace(cloze, "...") : "Error";
}



module.exports = ClozeCard;