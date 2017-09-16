var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var gameType;
var score = 0;
var fs = require("fs");

inquirer.prompt([
    {
        message: "Do you want to play the Flash Card Game!!!",
        type: "checkbox",
        choices: ["Yes", "No"],
        name: "game"
    },
    {
        message: "Which type of Game would you like to play?",
        type: "checkbox",
        choices: ["Basic", "Cloze"],
        name: "startGame"
    }
]).then(function (answers) {
    var game = answers.startGame;
    console.log(JSON.stringify(answers));
    console.log(typeof answers.startGame[0]);
    if (game === "Basic") {
        console.log("basicGame");
        basicGame();
    }

});

function basicGame() {
    inquirer.prompt([{
            message: "Do you want to the front of the card?",
            type: "input",
            name: "front"
        },
        {
            message: "Do you want the back of the card?",
            type: "input",
            name: "back"
        },
    ]).then(function (answers) {
        fs.readFile("basic-card.txt", "utf8", function (error, data) {
            if (error) {
                console.log(error);
            } else {
                console.log(data);
                BasicCard();
            }
        });
    });


}