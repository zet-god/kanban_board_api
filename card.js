function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'No name assigned';
	this.$element = createCard();

	function createCard() {
		// creating the blocks
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.name);
		var $cardDelete = $('<button>').addClass('btn-delete btn-default').text('x');

		// delete a card:
		$cardDelete.click(function(){
			self.removeCard();
		});

		// construct card element:
		$card.append($cardDelete)
				.append($cardDescription);

		// return of the created card:
		return $card;
	};
};

Card.prototype = {
	removeCard: function() {
		var self = this;
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function(){
				self.element.remove();
			}
		});
	}
}