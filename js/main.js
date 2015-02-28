var playerNames = new Array();
var game = new Array();
var playerScore;
var playerCounter = 0;
var frameCounter = 1;		// added 1 for better user understanding (in .html)
var ballCounter = 1;		// added 1 for better user understanding (in .html)

var namePanel;
var userName;
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
		currentScore: 0,
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
			}
	};
	game.push(playerScore);
	console.log(game);
	information.innerHTML = "Player registered.";

	if(checkIfCorrectNumberOfPlayers(playerNames.length) == "enough") {
		information.innerHTML = information.innerHTML + " Enough players to start the game. Let's roll!";
		startPanel.hidden = false;
	}
    if(checkIfCorrectNumberOfPlayers(playerNames.length) == "max") {
    	startPanel.hidden = false;
		namePanel.hidden = true;
		nameField.hidden = true;
		information.innerHTML = information.innerHTML + " That's the maximum number of players - let's start the game!";
    }
	players_printed.innerHTML = playerNames.toString();
	userName.value="";
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

	frameNumber.innerHTML = frameCounter;
	ballNumber.innerHTML = ballCounter;
	gamePanel.hidden = false;
	maxPins = 10;


	information.innerHTML = information.innerHTML + " " + playerNames[playerCounter].toString() + ", please enter your score.";
}

function submitScore() {
	scoreField = document.getElementById('scoreField');
	scoreButton = document.getElementById('scoreButton');
	comment = document.getElementById('comment');

	if(!verifySubmittedScore(scoreField.value)) 
		return;

	if(frameCounter+1 != 12) {								// next frame
		console.log("frame counter " + frameCounter);
		console.log("player counter " + playerCounter);
		console.log("ball counter " + ballCounter);
		maxPins = maxPins - scoreField.value;
		comment.innerHTML = "...";

			if(ballCounter+1 != 3 && maxPins != 0) {		// next ball
				delete game[playerCounter][frameCounter][ballCounter];
				game[playerCounter][frameCounter][ballCounter] = parseInt(scoreField.value);
				game[playerCounter]["currentScore"] = game[playerCounter]["currentScore"] + parseInt(scoreField.value);
				ballCounter++;
			}
			else {
				if(maxPins == 0) {
					if(scoreField.value == 10) {
						comment.innerHTML = "STRIKE!";
						game[playerCounter][frameCounter]["strike"] = true;
						if(ballCounter == 1)
							game[playerCounter][frameCounter][2] = "-";
					}
					else {
						comment.innerHTML = "SPARE!";
						game[playerCounter][frameCounter]["spare"] = true;
					}
				}
				
				console.log("maxPins: " + maxPins);
				console.log(game[playerCounter]["currentScore"]);
				delete game[playerCounter][frameCounter][ballCounter];
				game[playerCounter][frameCounter][ballCounter] = parseInt(scoreField.value);
				game[playerCounter]["currentScore"] = game[playerCounter]["currentScore"] + parseInt(scoreField.value);
				ballCounter = 1;
				playerCounter++;							// next player
				maxPins = 10;
				if(playerCounter==playerNames.length) {
					playerCounter = 0;
					frameCounter++;
				}
			}
		if(frameCounter == 11) {
			frameNumber.innerHTML = "-- GAME COMPLETE --";
			ballNumber.innerHTML = "-- GAME COMPLETE --";
		}
		else {
			frameNumber.innerHTML = frameCounter;
			ballNumber.innerHTML = ballCounter;
			console.log(game);
			console.log(game[playerCounter][1]);
			console.log(game[playerCounter][1][1]);
			updateBoard();
			information.innerHTML = "Score recorded. " +  playerNames[playerCounter].toString() + ", please enter your score.";
		}
	}
	else {

		endGame();
	}
	scoreField.value = "";
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
    var text = "<tr><th>Name</th><th colspan=\"2\">1</th><th colspan=\"2\">2</th><th colspan=\"2\">3</th><th colspan=\"2\">4</th><th colspan=\"2\">5</th><th colspan=\"2\">6</th><th colspan=\"2\">7</th><th colspan=\"2\">8</th><th colspan=\"2\">9</th><th colspan=\"2\">10</th><th>Score</th></tr>";
    for (var i = 0; i < game.length; i++) {
        text += "<tr><td>" + game[i]["name"] + "</td>";
        for(var j = 1; j <= 10; j++)
        	text += "<td>" + game[i][j][1] + "</td><td>" + game[i][j][2] + "</td>";
        text += "<td>" + game[i]["currentScore"] + "</td></tr>";
    }
    scoreBoard.innerHTML = text;
}