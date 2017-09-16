var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");
var score = 0;

inquirer.prompt([{
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
    var game = answers.startGame[0];
    if (game === "Basic") {
        Game("basic-card.json");
    } else if (game === "Cloze") {
        Game("cloze-card.json");
    }
});


function startBasicGame(questionAnswer, qno) {
    inquirer.prompt([{
        message: questionAnswer[qno].front + "?",
        type: "input",
        name: "answer"
    }]).then(function (answer) {
        if (answer.answer.toLowerCase() === questionAnswer[qno].back.toLowerCase()) {
            score++;
            console.log("Score: " + score);
            console.log("Correct Answer");
            console.log("------------------------");
        } else {
            console.log("Incorrect Answer");
            console.log("Score: " + score);
            console.log("------------------------");
        }
        if (questionAnswer.length - 1 > qno) {
            startBasicGame(questionAnswer, qno + 1);
        } else {
            console.log("Final Score: " + score);
            inquirer.prompt([{
                message: "Would you like to play again??",
                type: "confirm",
                name: "option"
            }]).then(function (answer) {
                if (answer.option === true) {
                     score = 0;
                   startBasicGame(questionAnswer,0);      
                } else {
                    console.log("Thank You for playing the game");
                }

            })
        }

    });
}

function Game(filename) {
    fs.readFile(filename, "utf8", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            var questionAnswer = [];
            var lines = JSON.parse(data);
            for (var i = 0; i < lines.length; i++) {
                // console.log(lines[i].split("?"));  
                questionAnswer.push(new BasicCard(lines[i].front, lines[i].back));
            }
            // console.log(questionAnswer);
            if(filename == "basic-card.json") {
                startBasicGame(questionAnswer, 0);
            } else {
                // startClozeGame(questionAnswer, 0);
            }
            
        }
    });
}

function startClozeGame() {

}