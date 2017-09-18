var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");
var score = 0;
console.log("Welcome to the Flash Card game!!!");
inquirer.prompt([
    {
    
        message: "Which type of Game would you like to play?",
        type: "checkbox",
        choices: ["Basic Card", "Cloze Card"],
        name: "startGame"
    }
]).then(function (answers) {
    var game = answers.startGame[0];
    if (game === "Basic Card") {
        Game("basic-card.json");
    } else if (game === "Cloze Card") {
        Game("cloze-card.json");
    }
});

function startBasicGame(questionAnswer, qno) {
    inquirer.prompt([{
        message: questionAnswer[qno].front + "\n",
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
                    startBasicGame(questionAnswer, 0);
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
            // A new card gets created using the BasicCard constructor where a new instance gets created for the object and the card is pushed into the questionAnswer list
            // When the user selects Basic Card game then the instance for Basic Card game should get created.
            // When the user selectd Cloze Card game then the instance for the Cloze Card game should get created.
            if (filename === "basic-card.json") {
                for (var i = 0; i < lines.length; i++) {
                    questionAnswer.push(new BasicCard(lines[i].front, lines[i].back));
                }
                startBasicGame(questionAnswer, 0);
            } else {
                for (var i = 0; i < lines.length; i++) {
                    questionAnswer.push(new ClozeCard(lines[i].front, lines[i].back));
                }
                startClozeGame(questionAnswer, 0);
            }
        }
    });
}

function startClozeGame(questionAnswer,qno) {
    inquirer.prompt([{
        message: questionAnswer[qno].partial + "\n",
        type: "input",
        name: "cloze"
    }]).then(function (answer) {
        if (answer.cloze.toLowerCase() === questionAnswer[qno].cloze.toLowerCase()) {
            score++;
            console.log("Score: " + score);
            console.log("Correct Answer");
            console.log("------------------------");
        } else {
            console.log("Incorrect Answer");
            console.log("Correct Answer is : " + questionAnswer[qno].text);
            console.log("Score: " + score);
            console.log("------------------------");
        }
        if (questionAnswer.length - 1 > qno) {
            startClozeGame(questionAnswer, qno + 1);
        } else {
            console.log("Final Score: " + score);
            inquirer.prompt([{
                message: "Would you like to play again??",
                type: "confirm",
                name: "option"
            }]).then(function (answer) {
                if (answer.option === true) {
                    score = 0;
                    startClozeGame(questionAnswer, 0);
                } else {
                    console.log("Thank You for playing the game");
                }
            })
        }
    });
}