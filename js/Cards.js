// The card deck object

// Pointer for the card deck.
var counter = 0;

// Constructor for card deck..
function Cards() {
	this.cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52];
	//this.cards= [0,1,2,3,4,5,6,7,8,9,10]; // Spades = 1-13 , Hearts = 14-26 , Diamonds = 27-39 , 40-52 Clubs
	console.log("Cards initiated: ", this.cards);
}

Cards.prototype.whichCard = function(card){
	var number=card%13;

	if(card <14){ // Spades
		console.log("Spades nr: ",number);
	}
	else if(card<27){ //Hearts
		console.log("Heart nr: ",number);
	}
	else if(card<40){ // Diamonds
		console.log("Diamonds nr: ",number);
	}
	else { //Clubs
		console.log("Clubs nr: ",number);
	}
};


// Method for shuffle the cards and start a new round
Cards.prototype.shuffle = function() {
  for(var j, x, i = this.cards.length; i; j = Math.floor(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
    counter=0;	
    console.log("SHUFFLE: ",this.cards);	
};

// Method for pop the Flop and reveal three cards
Cards.prototype.getFlop = function() {
	var i = this.cards.length-1-counter;
	var res = [this.cards[i],this.cards[i-1],this.cards[i-2]];
	counter=counter+3;
	console.log("GET Flop: ",res);

};
// Method for 
Cards.prototype.getPocket = function(){
	var i = this.cards.length-1-counter;
	var res = [this.cards[i],this.cards[i-1]];
	counter=counter+2;
	console.log("Your Hand: ",res);

};

Cards.prototype.getOneCard = function(){
	var res = this.cards[this.cards.length-counter-1];
	counter = counter+1;
	console.log("Pop one card: ", res);

	return res;

}