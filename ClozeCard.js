// importing the basicCard modules from BasicCard.js file
var BasicCard = require("./BasicCard.js");
function ClozeCard(text,cloze) {
    this.text = text;
    console.log(this.text);
    this.cloze = cloze;
    console.log(this.cloze);
    this.logError = function (cloze, pratial, fullText) {
     // The constructor should throw or log an error when the cloze deletion does not appear in the input text.
        if (text.includes(cloze)) {
           this.pratial = text.replace(cloze,"...");
        } else {
            conosle.log("This dosn't look correct");
            this.pratial = "Error";
        }

    }
}


module.exports = ClozeCard;