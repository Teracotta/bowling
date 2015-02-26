<?php

require 'main.php';

class HelloTest extends PHPUnit_Framework_TestCase
{
	public function testHello() {
		$main = New Main;
		$response = $main->respond("Hi");
		$this->assertEquals("Hello", $response);
	}

	public function testSetUserName() {

	}
}