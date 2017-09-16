// importing the basicCard modules from BasicCard.js file
var BasicCard = require("./BasicCard.js");

function ClozeCard(cloze, partial, fullText) {
    this.cloze = cloze;
    this.partial = partial;
    this.fullText = fullText;
    this.logError = function (cloze, pratial, fullText) {
     // The constructor should throw or log an error when the cloze deletion does not appear in the input text.
        var str = fullText;
        var n = str.includes(cloze);
        if (n === true) {
            console.log("This doesn't look right!!!!");
        }

    }
}


module.exports = ClozeCard;