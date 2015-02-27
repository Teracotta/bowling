var playerNames = new Array();
var game = new Array();
var playerCounter = 0;
var frameCounter = 0;
var ballCounter = 0;

function writeName() {
	var namePanel = document.getElementById('namePanel');
	var playerName = document.getElementById('nameField');
	var startPanel = document.getElementById('startPanel');
	var players_printed = document.getElementById('playerNames');
    var information = document.getElementById('information');
    
    if(playerName.value == "") {
    	information.innerHTML = "Please do not leave the name field blank.";
    	return;
    }

	playerNames.push(playerName.value);
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
	var gamePanel = document.getElementById('gamePanel');
	var frameNumber = document.getElementById('frameNumber');
	var ballNumber = document.getElementById('ballNumber');
	frameNumber.innerHTML = frameCounter;
	ballNumber.innerHTML = ballCounter;
	gamePanel.hidden = false;


	information.innerHTML = information.innerHTML + " " + playerNames[playerCounter].toString() + ", please enter your score.";
}

function submitScore() {

}