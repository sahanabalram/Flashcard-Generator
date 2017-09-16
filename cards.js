var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var gameType;
var score = 0;
var fs = require("fs");

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
        basicGame();
    }
});

function basicGame() {
    fs.readFile("basic-card.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        } else {
            var questionAnswer = [];
            // console.log(data);
            var lines = data.split('\n');
            // console.log(lines);
            for (var i = 0; i < lines.length; i++) {
                // console.log(lines[i].split("?"));
                var question = lines[i].split("?, ")[0].trim();
                var answer = lines[i].split("?, ")[1].trim();
                questionAnswer.push({
                    question: question,
                    answer: answer
                });
            }
            // console.log(questionAnswer);
            startBasicGame(questionAnswer, 0);
        }

    });
}

function startBasicGame(questionAnswer, qno) {
    inquirer.prompt([{
        message: questionAnswer[qno].question + "?",
        type: "input",
        name: "answer"
    }]).then(function (answer) {
        if (answer.answer === questionAnswer[qno].answer) {
            score++;
            console.log("Score: " + score);
            console.log("Correct Answer");
            console.log("------------------------");
        } else {
            console.log("Incorrect Answer");
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
            }]).then (function(answer){
                if(answer.option === true){
                    basicGame();
                } else {
                    console.log("Thank You for playing the game");
                }
                
            })
        }

    });
}