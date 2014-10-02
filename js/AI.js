// Functonality for the poker agent runned by a monte carlo search 
function AI(){
	var humanOpponentActions = {};

}

AI.prototype.findBestMove = function(state, move){
	var simpleState = new SimpleGameState();
	simpleState.initFromGameState(state, move);
	var tree = new searchTree(simpleState);
	return tree.simulate();
}

function HandStrength(ourcards,boardcards){
	var ahead=0,tied=0,behind=0,ourrank,opprank;

	ourrank = rankHand([ourcards.card1,ourcards.card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard,boardcards.riverCard]);
	//ourrank = ourrank.primeScore + ourrank.secondaryScore;  

	// Simulate opponentscards (All possible combination of two cards for the opponent)
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

function simulateOppCards(playerCards){

	var oppCards = [];

	var deck = new Cards();
	deck.shuffle();

	deck.removePossibleCards2([playerCards.card1,playerCards.card2]);

	// Save all possible two combination of cards for the opponent player....
	for (var i=0; i<deck.cards.length; ++i) {
		for (var j=i+1; j<deck.cards.length; ++j){

			oppCards.push([deck.whichCard(deck.cards[i]), deck.whichCard(deck.cards[j])]);
		}
	}

	return oppCards;
}

function HandPotential(ourcards,boardcards){

	var HP = [],HPTotal = [],ourrank,opprank;


	ourrank=rankHand([ourcards.card1,ourcards.card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard,boardcards.riverCard]);


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