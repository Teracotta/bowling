var playerNames = new Array();
var game = new Array();
var playerScore;
var playerCounter = 0;
var frameCounter = 1;		// added 1 for better user understanding (in .html)
var ballCounter = 1;		// added 1 for better user understanding (in .html)

var namePanel;
var userName;
var startButton;
var startPanel;
var players_printed;
var information;
var comment;

var gamePanel;
var frameNumber;
var ballNumber;
var scoreField;
var scoreButton;
var scoreBoard;
var maxPins;

function writeName() {
	namePanel = document.getElementById('namePanel');
	userName = document.getElementById('nameField');
	startButton = document.getElementById('startButton');
	startPanel = document.getElementById('startPanel');
	players_printed = document.getElementById('playerNames');
    information = document.getElementById('information');
    
    if(userName.value == "") {
    	information.innerHTML = "Please do not leave the name field blank.";
    	return;
    }

	playerNames.push(userName.value);
	playerScore = {
		name: userName.value, 
		totalScore: 0,
		1: {
			1: 0,
			2: 0,
			spare: false,
			strike: false
			},
		2: {
			1: 0,
			2: 0,
			spare: false,
			strike: false
			},
		3: {
			1: 0,
			2: 0,
			spare: false,
			strike: false
			},
		4: {
			1: 0,
			2: 0,
			spare: false,
			strike: false
			},
		5: {
			1: 0,
			2: 0,
			spare: false,
			strike: false
			},
		6: {
			1: 0,
			2: 0,
			spare: false,
			strike: false
			},
		7: {
			1: 0,
			2: 0,
			spare: false,
			strike: false
			},
		8: {
			1: 0,
			2: 0,
			spare: false,
			strike: false
			},
		9: {
			1: 0,
			2: 0,
			spare: false,
			strike: false
			},
		10: {
			1: 0,
			2: 0,
			spare: false,
			strike: false
			},
		11: "-",
		12: "-"
	};
	game.push(playerScore);
	console.log(game);
	information.innerHTML = "Player registered.";

	if(checkIfCorrectNumberOfPlayers(playerNames.length) == "enough") {
		information.innerHTML = information.innerHTML + " Enough players to start the game. Let's roll!";
		startButton.disabled = false;
	}
    if(checkIfCorrectNumberOfPlayers(playerNames.length) == "max") {
    	startButton.disabled = false;
		namePanel.hidden = true;
		nameField.hidden = true;
		information.innerHTML = information.innerHTML + " That's the maximum number of players - let's start the game!";
    }
	players_printed.innerHTML = playerNames.toString();
	userName.value="";
	userName.focus();
}

function checkIfCorrectNumberOfPlayers(numberOfNames) {
	if(numberOfNames == 6) {
		return "max";
	}
	if(numberOfNames >= 2) {
		return "enough";
	}
}

function startGame() {
	namePanel.hidden = true;
	nameField.hidden = true;
	startPanel.hidden = true;
	information.innerHTML = "The game begins!";

	updateBoard();
	gameOn();
}

function gameOn() {
	gamePanel = document.getElementById('gamePanel');
	frameNumber = document.getElementById('frameNumber');
	ballNumber = document.getElementById('ballNumber');
	scoreField = document.getElementById('scoreField');

	frameNumber.innerHTML = frameCounter;
	ballNumber.innerHTML = ballCounter;
	gamePanel.hidden = false;
	scoreField.focus();
	maxPins = 10;

	information.innerHTML = information.innerHTML + " " + playerNames[playerCounter].toString() + ", please enter your score.";
}

function submitScore() {
	scoreButton = document.getElementById('scoreButton');
	comment = document.getElementById('comment');

	if(frameCounter < 11) {	
		if(!verifySubmittedScore(scoreField.value)) 
			return;

		console.log("frame counter " + frameCounter);
		console.log("player counter " + playerCounter);
		console.log("ball counter " + ballCounter);
		maxPins = maxPins - scoreField.value;
		comment.innerHTML = "...";
	
		if((frameCounter != 1 && game[playerCounter][frameCounter-1]["strike"])) {
			game[playerCounter]["totalScore"] += parseInt(scoreField.value);
				if((frameCounter != 2 && ballCounter != 2 && game[playerCounter][frameCounter-2]["strike"]))
					game[playerCounter]["totalScore"] += parseInt(scoreField.value);
		}

		if((frameCounter != 1 && game[playerCounter][frameCounter-1]["spare"]) && ballCounter == 1) {
			game[playerCounter]["totalScore"] += parseInt(scoreField.value);
		}
			if(ballCounter+1 != 3 && maxPins != 0) {		// next ball
				game[playerCounter][frameCounter][ballCounter] = parseInt(scoreField.value);
				game[playerCounter]["totalScore"] += parseInt(scoreField.value);
				ballCounter++;
			}
			else {
				if(maxPins == 0) {
					if(scoreField.value == 10 && ballCounter == 1) {
						comment.innerHTML = "STRIKE!";
						game[playerCounter][frameCounter]["strike"] = true;
						game[playerCounter][frameCounter][1] = "";
						game[playerCounter][frameCounter][2] = "X";
					}
					else {
						comment.innerHTML = "SPARE!";
						game[playerCounter][frameCounter]["spare"] = true;
						game[playerCounter][frameCounter][2] = "/";
					}
				}
				game[playerCounter]["totalScore"] += parseInt(scoreField.value);
			
				ballCounter = 1;
				playerCounter++;							// next player
				maxPins = 10;
				if(playerCounter == playerNames.length) {
					playerCounter = 0;
					frameCounter++;
				}
			}
		updateNews();
		frameNumber.innerHTML = frameCounter;
		ballNumber.innerHTML = ballCounter;
		console.log(game);

	}
	// extra points possible
	else {
		if((game[playerCounter][10]["spare"] || game[playerCounter][10]["strike"]) && frameCounter != 13) {
			if (parseInt(scoreField.value) < 0 || scoreField.value % 1 != 0) {
				information.innerHTML = "Please input only integer values in the score indicating how many pins you have knocked over (max: 10).";
				return;
			}
			// last spare - 1 extra round
			if(game[playerCounter][10]["spare"]) {
				game[playerCounter]["totalScore"] += parseInt(scoreField.value);
				game[playerCounter][frameCounter] = parseInt(scoreField.value);
				frameCounter++;
			}
			// last strike - 2 extra rounds
			else {
				if(frameCounter == 11) {
					game[playerCounter]["totalScore"] += parseInt(scoreField.value) * 2;
				}
				else 
				 	game[playerCounter]["totalScore"] += parseInt(scoreField.value);
				game[playerCounter][frameCounter] = parseInt(scoreField.value);
			}
			frameCounter++;
		}
		if(frameCounter == 13 && playerCounter+1 != playerNames.length) {
			frameCounter = 11;
			playerCounter++;
			console.log("wooooooooooooooooooooooooooo");
		}
		updateNews();
	}		

	console.log(game);
	if(frameCounter == 13 && playerCounter+1 == playerNames.length)	{
			frameNumber.innerHTML = "-- GAME COMPLETE --";
			ballNumber.innerHTML = "-- GAME COMPLETE --";
			endGame();
		}
	scoreField.value = "";
	scoreField.focus();
}

function updateNews() {
	updateBoard();
	information.innerHTML = "Score recorded. " +  playerNames[playerCounter].toString() + ", please enter your score.";
	frameNumber.innerHTML = frameCounter;
	ballNumber.innerHTML = ballCounter;
}

function verifySubmittedScore(score) {
	if(score == "") {
    	information.innerHTML = "Please do not leave the score field blank.";
    	return false;
    }

	if (isNaN(score)) 
	{
		information.innerHTML = "Please input only numeric values in the score field.";
		return false;
	}

	if (score < 0 || score > maxPins || score % 1 != 0) {
		information.innerHTML = "Please input only integer values in the score indicating how many pins you have knocked over (right now it can be between 0 and " + maxPins + ").";
		return false;
	}
	return true;
}

function endGame() {
	information.innerHTML = "All the scores are now recorded! And the winner is...";
	scoreField.disabled = true;
	scoreButton.disabled = true;
	return;
}

function updateBoard() {
	scoreBoard = document.getElementById('scoreBoard');
    var text = "<tr><th>Name</th><th colspan=\"2\">1</th><th colspan=\"2\">2</th><th colspan=\"2\">3</th><th colspan=\"2\">4</th><th colspan=\"2\">5</th><th colspan=\"2\">6</th><th colspan=\"2\">7</th><th colspan=\"2\">8</th><th colspan=\"2\">9</th><th colspan=\"2\">10</th><th>11 (extra)</th><th>12 (extra)</th><th>Score</th></tr>";
    for (var i = 0; i < game.length; i++) {
        text += "<tr><td>" + game[i]["name"] + "</td>";
        for(var j = 1; j <= 10; j++) 
        	text += "<td>" + game[i][j][1] + "</td><td>" + game[i][j][2] + "</td>";
        text += "<td>" + game[i][11] + "</td><td>" + game[i][12] + "</td>";
        text += "<td>" + game[i]["totalScore"] + "</td></tr>";
    }
    scoreBoard.innerHTML = text;
}

function restart() {
	playerNames = new Array();
	game = new Array();
	updateBoard();
	namePanel.hidden = false;
	nameField.hidden = false;
	startPanel.hidden = false;
	startButton.disabled = true;
	gamePanel.hidden = true;
	playerCounter = 0;
	frameCounter = 1;
	ballCounter = 1;
	players_printed.innerHTML = "None";
	information.innerHTML = "The game has been restarted. Welcome to the Virtual Bowling Scoring System!"
}