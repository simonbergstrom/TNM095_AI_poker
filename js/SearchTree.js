function Node(state, type) {

	this.type = type;
	this.nrTimesVisited = 0;
    this.state = state;
    this.expectedValue = 0;

    this.children = [];
    this.parent = null;

    this.setParentNode = function(node) {
        this.parent = node;
    };
    this.getParentNode = function() {
        return this.parent;
    };
    this.addChild = function(node) {
        node.setParentNode(this);
        this.children[this.children.length] = node;
    };
    this.getChildren = function() {
        return this.children;
    };
    this.removeChildren = function() {
        this.children = [];
    };

    this.baseDefaultPolicy = function(){
    	var deck = new Cards();	
    	deck.shuffle();
    	deck.removePossibleCards2(this.state.cardOnHand.concat(this.state.cardsOnTable));
    	var currentState = this.state;
    	var turnIndicator = currentState.turn;
    	while(currentState.turn < 5){
    		var availableMoves = currentState.getAvailableMoves();
	    	var index = Math.floor(Math.random() * availableMoves.length);
	    	var nextMove = availableMoves[index];

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

    	var difference = 0;
    	// showdown
    	if(currentState.move !== "fold"){
    		
    		var simulatedOpponentHand = [deck.getOneCard(), deck.getOneCard()];

			var res1 = rankHand(currentState.cardOnHand.concat(currentState.cardsOnTable));
			var res2 = rankHand(simulatedOpponentHand.concat(currentState.cardsOnTable));

			if(res1.primeScore > res2.primeScore){
				difference += currentState.pot;
			}
			else if(res1.primeScore === res2.primeScore){
				if(res1.secondaryScore > res2.secondaryScore){
					difference += currentState.pot;
				}
				else if(res1.secondaryScore === res2.secondaryScore){
					difference += Math.floor(currentState.pot/2);
				}
			}
    	}
    	else{
    		difference -= currentState.pot/2;
    	}

    	difference += (currentState.playerMoney.ai - this.state.playerMoney.ai);

		return difference;
    };
}

function chanceNode(state){
	this.base = Node;
	this.base(state, "chance");
	this.nrDraws = 0;

	this.defaultPolicy = function(){
		this.nrDraws++;
		var availableMoves = this.state.getAvailableMoves();
    	var index = Math.floor(Math.random() * availableMoves.length);
    	var move = availableMoves[index];

		this.addChild(new opponentNode(jQuery.extend(true, {}, this.state)));

		var deck = new Cards();
    	deck.shuffle();
    	deck.removePossibleCards2(this.state.cardOnHand.concat(this.state.cardsOnTable));

    	if(this.state.turn === 2){
			this.children[this.children.length-1].state.cardsOnTable[0] = deck.getOneCard();
	    	this.children[this.children.length-1].state.cardsOnTable[1] = deck.getOneCard();
	    	this.children[this.children.length-1].state.cardsOnTable[2] = deck.getOneCard();
		}
		else if(this.state.turn === 3){
			this.children[this.children.length-1].state.cardsOnTable[3] = deck.getOneCard();
		}
		else if(this.state.turn === 4){
			this.children[this.children.length-1].state.cardsOnTable[4] = deck.getOneCard();
		}
   		console.log(this.nrDraws);
	    return this.children[this.children.length-1].baseDefaultPolicy();
	};
}

function leafNode(state){
	this.base = Node;
	this.base(state, "leaf");

	this.defaultPolicy = function(){
		return this.baseDefaultPolicy();
	};
}

function opponentNode(state){
	this.base = Node;
	this.base(state, "opponent");

	this.defaultPolicy = function(){
		return this.baseDefaultPolicy();
	};

	this.treePolicy = function(){};
}

function aiNode(state){
	this.base = Node;
	this.base(state, "ai");

	this.defaultPolicy = function(){
		return this.baseDefaultPolicy();
	};

	this.treePolicy = function(){};
}

function searchTree(state){
	this.root = new opponentNode(state);
	this.maxTimeInMilliseconds = 1000;
}

searchTree.prototype.simulate = function(){
	var startTime = new Date();
	var chanseNodeBranchFactor = 20;
	var elapsedTime;
	
	do{
		currentNode = this.root;
		
		while( (currentNode.type === "chance" && currentNode.nrDraws >= chanseNodeBranchFactor) ||
			   (currentNode.type === "opponent" && currentNode.children.length === currentNode.state.getAvailableMoves().length) ){
			var index = {ind: 0, val: -Infinity};

			for(var i=0; i<currentNode.children.length; ++i){
				var value = currentNode.children[i].expectedValue/currentNode.children[i].nrTimesVisited + 
							2*Math.sqrt(Math.log(currentNode.nrTimesVisited)/currentNode.children[i].nrTimesVisited);
				if(value > index.val){
					index.ind = i;
					index.val = value;
				}
			}

			currentNode = currentNode.children[index.ind];
		}
		//console.log(currentNode.type === "chance", currentNode.type === "chance" && currentNode.nrDraws >= chanseNodeBranchFactor);
		//console.log(currentNode.type);
		if(currentNode.type === "opponent"){
			var move = currentNode.state.getAvailableMoves()[currentNode.children.length];
			
			if(move === "fold" || move === "gameEnded"){ 
				currentNode.addChild(new leafNode(currentNode.state.makeMove(move)));
			}
			else if( (currentNode.state.move === "check" && move === "check") || move === "call"){ // call or check check
				currentNode.addChild(new chanceNode(currentNode.state.makeMove(move))); 
			}
			else{ // bet, raise, check
				currentNode.addChild(new opponentNode(currentNode.state.makeMove(move)));
			}

			currentNode = currentNode.children[currentNode.children.length-1];
		}

		var expectedReward = currentNode.defaultPolicy(); 

		/************** Update tree with the result from the simulation ***************/
		while(currentNode.parent !== null){
			currentNode.expectedValue += expectedReward;
			currentNode.nrTimesVisited++;
			currentNode = currentNode.parent;
		}
		elapsedTime = new Date();
		//console.log("loop");
	}while(this.maxTimeInMilliseconds > (elapsedTime - startTime) )

	/************** Pick the move from the root ***************/
	var index = {ind: 0, val: -Infinity};

	for(var i=0; i<this.root.children.length; ++i){
		console.log("value for ", this.root.children[i].state.move, " is ", this.root.children[i].expectedValue/this.root.children[i].nrTimesVisited);
		if( (this.root.children[i].expectedValue/this.root.children[i].nrTimesVisited) > index.val){
			index.ind = i;
			index.val = this.root.children[i].expectedValue/this.root.children[i].nrTimesVisited;
		}
	}

	return this.root.children[index.ind].state.move;
}

searchTree.prototype.traverse = function(){
	console.log("Traversing tree");
	this.nodeTraverse(this.root);
};

searchTree.prototype.nodeTraverse = function(node){
	console.log(" **** ", node.type, " ", node.state.move, " **** ");
	for(var i=0; i<node.children.length; ++i){
		console.log(node.children[i].type, " ", node.children[i].state.move);
	}
	console.log("******************")

	for(var i=0; i<node.children.length; ++i){
		this.nodeTraverse(node.children[i]);
	}
};