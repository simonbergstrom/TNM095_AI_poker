// The card deck object

// Pointer for the card deck.
var counter = 0;

// Constructor for card deck..
function Cards() {
	this.cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
	//this.cards= [0,1,2,3,4,5,6,7,8,9,10]; // Spades = 1-13 , Hearts = 14-26 , Diamonds = 27-39 , 40-52 Clubs
}

Cards.prototype.whichCard = function(card){
	var number=card%13;

	if(number === 0)
		number = 13;

	var res;

	if(card <14){ // Spades
		res = {"suit":"Spades", "number":number};
		//console.log("Spades nr: ",number);
	}
	else if(card<27){ //Hearts
		res = {"suit":"Hearts", "number":number};
		//console.log("Heart nr: ",number);
	}
	else if(card<40){ // Diamonds
		res = {"suit":"Diamonds", "number":number};
		//console.log("Diamonds nr: ",number);
	}
	else { //Clubs
		res = {"suit":"Clubs", "number":number};
		//console.log("Clubs nr: ",number);
	}

	return res;
};


// Method for shuffle the cards and start a new round
Cards.prototype.shuffle = function() {
  for(var j, x, i = this.cards.length; i; j = Math.floor(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
    counter = 0;
};

// Method for pop the Flop and reveal three cards
Cards.prototype.getFlop = function() {
	var i = this.cards.length-1-counter;
	var res = {"card1": this.whichCard(this.cards[i]), "card2": this.whichCard(this.cards[i-1]), "card3": this.whichCard(this.cards[i-2])};
	counter=counter+3;
	return res;
};

// Method for
Cards.prototype.getPocket = function(){
	var i = this.cards.length-1-counter;
	var res = {"card1": this.whichCard(this.cards[i]),"card2": this.whichCard(this.cards[i-1])};
	counter += 2;
	return res;

};

Cards.prototype.getOneCard = function(){
	var res = this.whichCard(this.cards[this.cards.length-counter-1]);
	counter++;

	return res;
}
