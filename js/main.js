var playerNames = new Array();
var game = new Array();
var playerCounter = 0;
var frameCounter = 0;
var ballCounter = 0;

var namePanel;
var userName;
var startPanel;
var players_printed;
var information;

var gamePanel;
var frameNumber;
var ballNumber;
var scoreField;
var scoreButton;

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
	information.innerHTML = "The game starts!";

	gameOn();
}

function gameOn() {
	gamePanel = document.getElementById('gamePanel');
	frameNumber = document.getElementById('frameNumber');
	ballNumber = document.getElementById('ballNumber');
	frameNumber.innerHTML = frameCounter;
	ballNumber.innerHTML = ballCounter;
	gamePanel.hidden = false;


	information.innerHTML = information.innerHTML + " " + playerNames[playerCounter].toString() + ", please enter your score.";
}

function submitScore() {
	scoreField = document.getElementById('scoreField');
	scoreButton = document.getElementById('scoreButton');

	if(!verifySubmittedScore(scoreField.value)) 
		return;

	if(playerCounter+1 != playerNames.length) {
		playerCounter++;
		console.log(playerCounter);
		information.innerHTML = "Score recorded. " +  playerNames[playerCounter].toString() + ", please enter your score.";
	}
	else {
		endGame();
	}
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

	if (score < 0 || score > 10 || score % 1 != 0) {
		information.innerHTML = "Please input only integer values in the score indicating how many pins you have knocked over (0-10).";
		return false;
	}
	return true;
}

function endGame() {
	scoreField.disabled = true;
	scoreButton.disabled = true;
	console.log("yey");
	return;
}