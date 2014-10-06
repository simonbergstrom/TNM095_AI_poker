// Functonality for the poker agent runned by a monte carlo search 
function AI(){
	var humanOpponentActions = {};

	var bucket = [[4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1],
				  [3, 4, 3, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0],
				  [3, 3, 4, 3, 2, 2, 1, 0, 0, 0, 0, 0, 0],
				  [3, 3, 2, 4, 2, 1, 0, 0, 0, 0, 0, 0, 0],
				  [2, 2, 2, 2, 3, 2, 1, 0, 0, 0, 0, 0, 0],
				  [2, 2, 1, 1, 2, 3, 2, 1, 0, 0, 0, 0, 0],
				  [1, 1, 0, 0, 0, 1, 3, 1, 1, 0, 0, 0, 0],
				  [1, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
				  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]];
}

AI.prototype.findBestMove = function(state, move){
	var simpleState = new SimpleGameState();
	simpleState.initFromGameState(state, move);
	var tree = new searchTree(simpleState);
	//tree.traverse();
	return tree.simulate();
}

function BestHand(ourcards,boardcards){
	var ahead=0,tied=0,behind=0,ourrank,opprank;

	ourrank = rankHand([ourcards.card1,ourcards.card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard,boardcards.riverCard]);
	ourrank = ourrank.primeScore + ourrank.secondaryScore; // BORDE KUNNAS GÖRAS I GAMESTATE OCKSÅ? 

	// Simulate opponentscards

	var oppCards = simulateOppCards(ourcards);

	for(var i in oppCards) {
		opprank = rankHand([oppCards[i].card1,oppCards[i].card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard,boardcards.riverCard]);
		opprank = opprank.primeScore+opprank.secondaryScore; 

		if(ourrank > opprank) ahead += 1;
		else if (ourrank == opprank) tied += 1;
		else behind += 1;
	}

	var handstrength = (ahead + tied/2)/(ahead + tied + behind);

	return handstrength;
}

function HandPotential(ourcards,boardcards){

	var HP = [],HPTotal = [],ourrank,opprank;


	ourrank=rankHand([ourcards.card1,ourcards.card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard,boardcards.riverCard]);
	ourrank = ourrank.primeScore + ourrank.secondaryScore;


	var oppCards = simulateOppCards(ourcards);

	for(var i in oppCards){
		opprank = rankHand([oppCards[i].card1,oppCards[i].card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard,boardcards.riverCard]);
		opprank = opprank.primeScore+opprank.secondaryScore;


		if(ourrank>opprank) index = ahead;
		else if(ourrank===opprank) index = tied;
 		else index = behind;
 		HPTotal[index] += 1;

 		// All possible board cards to come.
 		var board = [oppCards[i].flop,oppCards[i].turnCard,oppCards[i].riverCard];
 		var ourbest = ourrank;
 		var oppbest = opprank;

 		if(ourrank>opprank) HP[index][ahead]+=1;
		else if(ourrank === opprank) HP[index][tied]+=1;
		else HP[index][behind]+=1;
	}
}