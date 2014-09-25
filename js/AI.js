// Functonality for the poker agent runned by a monte carlo search 
function AI(state) {

	function Node(state, type, move) {

		this.type = type;
		this.move = "";
		this.nrTimesVisited = 0;
	    this.state = state;
	    this.expectedValue = 0;

	    this.children = [];
	    this.parent = null;

	    this.setParentNode = function(node) {
	        this.parent = node;
	    }
	    this.getParentNode = function() {
	        return this.parent;
	    }
	    this.addChild = function(node) {
	        node.setParentNode(this);
	        this.children[this.children.length] = node;
	    }
	    this.getChildren = function() {
	        return this.children;
	    }
	    this.removeChildren = function() {
	        this.children = [];
	    }
	    this.printValue = function() {
	    	console.log(state);
	    }

	    this.baseDefaultPolicy = function(){
	    	var currentState = this;
	    	while(currentState.turn < 5){
	    		var availableMoves = currentState.getAvailableMoves();
		    	var index = Math.floor(Math.random() * availableMoves.length);
		    	var nextMove = availableMoves[index];
		    	currentState = currentState.makeMove(move);
	    	}
	    	// showdown
	    }
	}

	function chanceNode(state, move){
		this.base = Node;
		this.base(state, "chance", move);

		this.defaultPolicy = function(){
			
		}
	}

	function leafNode(state, move){
		this.base = Node;
		this.base(state, "leaf", move);

		this.defaultPolicy = function(){
			
		}

		this.defaultPolicy = function(){
			
		}
	}

	function opponentNode(state, move){
		this.base = Node;
		this.base(state, "oponent", move);

		this.defaultPolicy = function(){
			
		}

		this.treePolicy = function(){

		}
	}

	function aiNode(state, move){
		this.base = Node;
		this.base(state, "ai", move);

		this.defaultPolicy = function(){
			
		}

		this.treePolicy = function(){

		}
	}

	var C = Math.sqrt(2);
	var totalMoves = 0;
	this.root = new aiNode(state, "");
	var currentNode = this.root;
	var notFinished = 100;

	while(notFinished--){
		while(currentNode.type !== "leaf" && currentNode.children.length === Object.keys(currentNode.state.getAvailableMoves()).length){
			var index = {ind: 0, val: -Infinity};

			for(var i=0; i<currentNode.children.length; ++i){
				var value = currentNode.expectedValue + C*Math.sqrt((2*Math.log(totalMoves))/currentNode.nrTimesVisited);
				if(value > index[value]){
					index[ind] = i;
					index[val] = value;
				}
			}

			currentNode = currentNode.children[index.ind];
		}

		var newNode;
		if(currentNode.type !== "leaf"){
			var move = currentNode.state.getAvailableMoves()[currentNode.children.length];
			if(move === "fold"){
				newNode = new leafNode(currentNode.state.makeMove("fold");
				currentNode.children.push(newNode, "fold"));
			}
			else if(currentNode.move === "check" && move === "check"){
				newNode = new chanceNode(currentNode.state.makeMove("check");
				currentNode.children.push(newNode, "check"));
			}
			else if(currentNode.move === "call"){
				newNode = new chanceNode(currentNode.state.makeMove("call");
				currentNode.children.push(newNode, "call"));
			}
			else{
				newNode = new opponentNode(currentNode.state.makeMove(move);
				currentNode.children.push(newNode, move));
			}

			var expectedReward = newNode.baseDefaultPolicy();

			// Uppdate tree with expected reward
		}
	}
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

AI.prototype.traverse = function(){
	this.nodeTraverse(this.root);
}

AI.prototype.nodeTraverse = function(node){
	console.log("cards on hand: ", node.state.cardOnHand, " cards on board: ", node.state.cardsOnTable);
	for(var i=0; i<node.children.length; ++i){
		this.nodeTraverse(node.children[i]);
	}
}

function HandPotential(ourcards,boardcards){

	var HP = [],HPTotal = [],ourrank,opprank;


	ourrank=rankHand([ourcards.card1,ourcards.card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard,boardcards.riverCard]);
	ourrank = ourrank.primeScore + ourrank.secondaryScore;


	var oppCards = simulateOppCards(ourcards);

	for(var i in oppCards){
		opprank = rankHand([oppCards[i].card1,oppCards[i].card2,boardcards.flop.card1,boardcards.flop.card2,boardcards.flop.card3,boardcards.turnCard,boardcards.riverCard]);
		opprank = opprank.primeScore+opprank.secondaryScore;


		if(ourrank>opprank) index = ahead
		else if(ourrank=opprank) index = tied
 		else index = behind
 		HPTotal[index] += 1

 		// All possible board cards to come.
 		var board = [oppCards[i].flop,oppCards[i].turnCard,oppCards[i].riverCard];
 		var ourbest = ourrank;
 		var oppbest = opprank;

 		if(ourrank>opprank) HP[index][ahead]+=1
		else if(ourrank === opprank) HP[index][tied]+=1
		else HP[index][behind]+=1
	}
}