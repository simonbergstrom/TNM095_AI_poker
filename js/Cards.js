// The card deck object
function Cards() {
	this.cards = [0,1,2,3,4,5,6,7,8,9,10];
	console.log("Cards initiated: ", this.cards);
}

Cards.prototype.shuffle = function() {
  for(var j, x, i = this.cards.length; i; j = Math.floor(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
    console.log("SHUFFLE: ",this.cards);	
};

Cards.prototype.getRiver = function() {
	var i = this.cards.length-1;
	var res = [this.cards[i],this.cards[i-1],this.cards[i-2]];
	console.log(res);

}