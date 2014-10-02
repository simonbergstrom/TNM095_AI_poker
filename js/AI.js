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

	console.log(ourcards,boardcards);

	// Check how many cards we have on the table....


	if(typeof boardcards.turnCard === 'undefined'){
		ourrank = rankHand([ourcards.card1,ourcards.card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3]);
	}
	else if (typeof boardcards.riverCard === 'undefined'){
		ourrank = rankHand([ourcards.card1,ourcards.card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard]);
	}
	else {
		ourrank = rankHand([ourcards.card1,ourcards.card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard,boardcards.riverCard]);
	}
	// Simulate opponentscards (All possible combination of two cards for the opponent)
	var oppCards = simulateOppCards(ourcards,boardcards);


	for(var i in oppCards) {
		opprank = rankHand([oppCards[i].card1,oppCards[i].card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard,boardcards.riverCard]);

		if(ourRank.primeScore === opprank.primeScore){

			if(ourRank.secondaryScore > opprank.secondaryScore){
				ahead++;
			}
			else if(ourRank.secondaryScore < opprank.secondaryScore){
				behind++;
			}
			else
				tied++;
		}
		else if (ourRank.primeScore > opprank.primeScore){
			ahead++;
		}
		else 
			behind++;

	}

	return (ahead + tied/2)/(ahead + tied + behind);

}

function simulateOppCards(playerCards,boardCards){

	var oppCards = [];

	var deck = new Cards();
	deck.shuffle();

	// Remove the cards that is already on table to simulate the possible cards for the opponent...
	deck.removePossibleCards2([playerCards.card1,playerCards.card2]);
	deck.removePossibleCards2(boardCards.flop.card1,boardCards.flop.card2,boardCards.flop.card3);

	if(typeof boardCards.turnCard !== "undefined"){
		deck.removePossibleCards2([boardCards.turnCard]);
	}
	if(typeof boardCards.riverCard !== "undefined"){
		deck.removePossibleCards2([boardCards.riverCard]);
	}

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