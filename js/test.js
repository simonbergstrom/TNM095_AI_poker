function randomVsAi(){

	var ai = new AI();

	var player1 = {"cardOnHand": [], "money": 20};
	var player2 = {"cardOnHand": [], "money": 20};

	while(player1.money > 0 && player2.money > 0){

		console.log("start of turn");

		var deck = new Cards();
		deck.shuffle();

		player1.cardOnHand = [deck.getOneCard(), deck.getOneCard()];
		player2.cardOnHand = [deck.getOneCard(), deck.getOneCard()];

		var currentState = new SimpleGameState();
		
		currentState.turn = 1;
		currentState.pot = 0;
		currentState.bigBlind = 1;
		currentState.numberOfTimesRaised = 0;

		currentState.bigBlind = 1;
		currentState.player = currentState.bigBlind === 1 ? "human" : "ai";
		
		currentState.playerMoney = {"human": 20, "ai": 20};
		
		currentState.cardOnHand = player2.cardOnHand;
		currentState.cardsOnTable = [];

		currentState.availableMoves = {
		    "call": false,
		    "bet": true,
		    "check":true,
		    "raise":false,
		    "fold": false
		};

		// Blinds
		if(currentState.bigBlind === 1){
			if(player1.money > 1){
			  player1.money -= 2;
			  player2.money -= 1;
			  currentState.pot += 3;
			}
			else{
			  player1.money -= 1;
			  player2.money -= 1;
			  currentState.pot += 2;
			}
		}
		else{
			if(player2.money > 1){
			  player2.money -= 2;
			  player1.money -= 1;
			  currentState.pot += 3;
			}
			else{
			  player1.money -= 1;
			  player2.money -= 1;
			  currentState.pot += 2;
			}
		}

		// Start round
		var turnIndicator = currentState.turn;
		var nextMove;

		while(currentState.turn < 5){
			
			if(currentState.player === "ai"){
				var tree = new searchTree(currentState);
				nextMove = tree.simulate();
			}
			else{ // Random ai
				var availableMoves = currentState.getAvailableMoves();
	    		var index = Math.floor(Math.random() * availableMoves.length);
	    		nextMove = availableMoves[index];
			}

			if(nextMove === "fold"){
				break;
			}

	    	currentState = currentState.makeMove(nextMove);

	    	if(currentState.turn > turnIndicator){

	    		if(currentState.turn === 2){
	    			currentState.cardsOnTable[0] = deck.getOneCard();
	    			currentState.cardsOnTable[1] = deck.getOneCard();
	    			currentState.cardsOnTable[2] = deck.getOneCard();
	    		}
	    		else if(currentState.turn === 3){
	    			currentState.cardsOnTable[3] = deck.getOneCard();
	    		}
	    		else if(currentState.turn === 4){
	    			currentState.cardsOnTable[4] = deck.getOneCard();
	    		}
	    		turnIndicator = currentState.turn;
	    	}
		}
		console.log(currentState.pot)
		// Showdown
		if(nextMove !== "fold"){

			var res1 = rankHand(player2.cardOnHand.concat(currentState.cardsOnTable));
			var res2 = rankHand(player1.cardOnHand.concat(currentState.cardsOnTable));

			if(res1.primeScore == res2.primeScore){
				if(res1.secondaryScore > res2.secondaryScore){
				  player2.money += currentState.pot;
				}
				else if(res1.secondaryScore == res2.secondaryScore) {
				  player1.money += Math.ceil(currentState.pot/2);
				  player2.money += Math.floor(currentState.pot/2);
				}
				else{
				    player1.money += currentState.pot;
				}
			}
			else if (res1.primeScore > res2.primeScore){
				player2.money += currentState.pot;
			}
			else{
				player1.money += currentState.pot;
			}
		}
		// Someone folded
		else{
			if(currentState.player === "ai"){
				player2.money -= currentState.pot;
				player1.money += currentState.pot;
			}
			else{
				player1.money -= currentState.pot;
				player2.money += currentState.pot;
			}
		}
		console.log("end of turn");
	}
	console.log(player1.money, player2.money)
}