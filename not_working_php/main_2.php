<?php
session_start();
if (!isset($_SESSION['counter'])) {
    $_SESSION['counter'] = 0;
}
?>
<!DOCTYPE HTML>
<HTML>
<HEAD>
	<TITLE>Bowling Score System</TITLE>
</HEAD>
<BODY>
<?php 

// do not start the game until the number of required players is met
$gameStart = false;
$users = Array();

if(isset($_POST['submit'])) {
	if(empty($_POST['uname'])) {
		echo "The user's name is required.";
	}
	else {
		// $counter++;
		echo $_SESSION["counter"];
		$value = $_SESSION["counter"];
		echo $value;
		$value++;
		echo $value;
		$_SESSION["counter"] = $value;
		echo $_SESSION["counter"];
		array_push($users, $_POST['uname']);
	}

	// if there's minimum two players (for now start the game already at this point)
	if($_SESSION["counter"] == 2) {
		?>
		The players' names: <br />
		<?php
		// echo $_POST['uname'];
		// array_push($users, $_POST['uname']);
		var_dump($users);
		?>
		<br />
		<?php
		$gameStart = true;
	}
}

// start the game if the conditions are met
if($gameStart) {
?>
<br />THE GAME BEGINS

<?php	
}
// welcome view (game not started)
else {
?>
<h2>Welcome to the Virtual Random Bowling Session!</h2><br />
Please add the players' names below (minimum 2 players, maximum 6 players):<br />

<form action="main.php" method="post">
	Name: <input type="text" name="uname"><br />
	<input type="submit" name="submit" value="Submit">
</form>
<br />

<?php
}
?>

</BODY>
</HTML>