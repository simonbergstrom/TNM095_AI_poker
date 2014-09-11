// The card deck object

// Pointer for the card deck.
var counter = 0;


function Cards() {
	this.cards = [0,1,2,3,4,5,6,7,8,9,10];
	console.log("Cards initiated: ", this.cards);
}

Cards.prototype.shuffle = function() {
  for(var j, x, i = this.cards.length; i; j = Math.floor(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
    counter=0;	
    console.log("SHUFFLE: ",this.cards);	
};

Cards.prototype.getFlop = function() {
	var i = this.cards.length-1-counter;
	var res = [this.cards[i],this.cards[i-1],this.cards[i-2]];
	counter=counter+3;
	console.log("GET Flop: ",res);

};
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

}