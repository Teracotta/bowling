DESCRIBE 'bowling score system'
	IT 'should display a welcome message'
		GET informationValue
		EXPECT informationValue TO_EQUAL 'Welcome to the Virtual Bowling Scoring System!'

	IT 'should register input as name'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		EXPECT playerNames TO_EQUAL 'Maja'

	IT 'should enable the game with at least two players'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		EXPECT startButton TO_BE 'disabled'='false'

	IT 'should not accept more than 6 players'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name2' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name3' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name4' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name5' IN NameField
		CLICK 'SUBMIT NAME'
		EXPECT informationValue TO_EQUAL "That's the maximum number of players - let's start the game!"

	IT 'should display game-score components'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		EXPECT scoreBoard TO_BE 'hidden'='false'
		EXPECT frameCounter TO_BE 'hidden'='false'
		EXPECT ballCounter TO_BE 'hidden'='false'
		EXPECT comment TO_BE 'hidden'='false'
		EXPECT resetButton TO_BE 'hidden'='false'

	IT 'should record first score'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		WRITE '5' IN scoreField
		CLICK 'SUBMIT SCORE'
		EXPECT scoreBoard[0][0] TO_EQUAL 5
		EXPECT comment TO_EQUAL '...'

	IT 'should record first score and mark it as strike'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		WRITE '10' IN scoreField
		CLICK 'SUBMIT SCORE'
		EXPECT scoreBoard[0][0] TO_EQUAL ''
		EXPECT scoreBoard[0][1] TO_EQUAL 'X'
		EXPECT comment TO_EQUAL 'STRIKE!'

	IT 'should record first score and mark it as spare'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		WRITE '5' IN scoreField
		CLICK 'SUBMIT SCORE'
		WRITE '5' IN scoreField
		CLICK 'SUBMIT SCORE'
		EXPECT scoreBoard[0][0] TO_EQUAL 5
		EXPECT scoreBoard[0][1] TO_EQUAL '/'
		EXPECT comment TO_EQUAL 'SPARE!'

	IT "should distinguish between different players' scores"
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		WRITE '3' IN scoreField
		CLICK 'SUBMIT SCORE'
		WRITE '4' IN scoreField
		CLICK 'SUBMIT SCORE'
		WRITE '5' IN scoreField
		CLICK 'SUBMIT SCORE'
		WRITE '6' IN scoreField
		CLICK 'SUBMIT SCORE'
		EXPECT scoreBoard[0][0] TO_EQUAL 3
		EXPECT scoreBoard[0][1] TO_EQUAL 4
		EXPECT scoreBoard[1][0] TO_EQUAL 5
		EXPECT scoreBoard[1][1] TO_EQUAL 6

	IT "should allow 11th and 12th (extra) throws when strike occurs on 10th throw"
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		-- at 10th throw ([0][18] in scoreBoard) -- 
		WRITE '10' IN scoreField
		CLICK 'SUBMIT SCORE'
		EXPECT scoreBoard[0][18] TO_EQUAL ''
		EXPECT scoreBoard[0][19] TO_EQUAL 'X'
		EXPECT comment TO_EQUAL 'STRIKE!'
		EXPECT informationValue TO_EQUAL 'Maja, please enter your score'
		WRITE '10'
		CLICK 'SUBMIT SCORE'
		EXPECT scoreBoard[0][20] TO_EQUAL 'X'
		EXPECT comment TO_EQUAL 'STRIKE!'
		WRITE '10'
		CLICK 'SUBMIT SCORE'
		EXPECT scoreBoard[0][21] TO_EQUAL 'X'
		EXPECT comment TO_EQUAL 'STRIKE!'

	IT "should allow 11th (extra) throw when spare occurs on 10th throw"
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		-- at 10th throw ([0][18] in scoreBoard) -- 
		WRITE '5' IN scoreField
		CLICK 'SUBMIT SCORE'
		WRITE '5' IN scoreField
		CLICK 'SUBMIT SCORE'
		EXPECT scoreBoard[0][18] TO_EQUAL 5
		EXPECT scoreBoard[0][19] TO_EQUAL '/'
		EXPECT comment TO_EQUAL 'SPARE!'
		EXPECT informationValue TO_EQUAL 'Maja, please enter your score'
		WRITE '10'
		CLICK 'SUBMIT SCORE'
		EXPECT scoreBoard[0][20] TO_EQUAL 'X'
		EXPECT comment TO_EQUAL 'STRIKE!'

	IT 'should increase frameCounter with new frame'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		WRITE '3' IN scoreField
		CLICK 'SUBMIT SCORE'
		WRITE '4' IN scoreField
		CLICK 'SUBMIT SCORE'
		WRITE '5' IN scoreField
		CLICK 'SUBMIT SCORE'
		WRITE '6' IN scoreField
		CLICK 'SUBMIT SCORE'
		WRITE '7' IN scoreField
		CLICK 'SUBMIT SCORE'
		EXPECT frameCounter TO_EQUAL 1
		EXPECT scoreBoard[0][0] TO_EQUAL 3
		EXPECT scoreBoard[0][1] TO_EQUAL 4
		EXPECT scoreBoard[1][0] TO_EQUAL 5
		EXPECT scoreBoard[1][1] TO_EQUAL 6
		EXPECT scoreBoard[0][2] TO_EQUAL 7
		EXPECT frameCounter TO_EQUAL 2

	IT 'should increase ballCounter with new ball'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		WRITE '3' IN scoreField
		CLICK 'SUBMIT SCORE'

		EXPECT ballCounter TO_EQUAL 1
		EXPECT scoreBoard[0][0] TO_EQUAL 3


		WRITE '4' IN scoreField
		CLICK 'SUBMIT SCORE'

		EXPECT ballCounter TO_EQUAL 2
		EXPECT scoreBoard[0][1] TO_EQUAL 4

	IT 'should determine a single winner when appropriate'
		-- three users in, [0][22] = 300, [1][22] = 290, [1][23] = 0 --
		EXPECT informationValue TO_EQUAL "All the scores are now recorded! And the winner is NAME1 with score 300. Congratulations!";

	IT 'should determine multiple winners when appropriate'
		-- three users in, [0][22] = 300, [1][22] = 300, [1][23] = 0 --
		EXPECT informationValue TO_EQUAL "All the scores are now recorded! There is more than one winner! They are: NAME1 (score: 300) and NAME2 (score: 300). Congratulations!";

	IT 'should determine all players winners when appropriate'
		-- three users in, [0][22] = 300, [1][22] = 300, [1][23] = 300 --
		EXPECT informationValue TO_EQUAL "All the scores are now recorded! Everyone has the top score, everyone is a winner! Congratulations!";

	IT 'should show popup confirmation window when resetting game'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		CLICK resetButton
		EXPECT confirmationPopUp TO_BE hidden = false

	IT 'should show popup confirmation window when resetting game and then properly reset the game'
		WRITE 'Maja' IN NameField
		CLICK 'SUBMIT NAME'
		WRITE 'Name' IN NameField
		CLICK 'SUBMIT NAME'
		CLICK 'START THE GAME SCORING'
		CLICK resetButton
		EXPECT confirmationPopUp TO_BE hidden = false
		CLICK okButton
		EXPECT informationValue TO_EQUAL 'The game has been restarted. Welcome to the Virtual Bowling Scoring System!'