<?php
class Main {
	public function respond($message){
		if ($message === "Hi") {
			return "Hello";
		}
		else {
			return "Huh?";
		}
	}
}