function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'New column';
	this.$element = createColumn();

	function createColumn() {
		// creating components of columns:
		var $column = $('<div>').addClass('column col-lg-4');
		var $columnTitle = $('<h2>').addClass('column-title text-center').text(self.name).css('font-weight', '700');
		var $columnCardList = $('<ul>').addClass('column-card-list').css('list-style-type', 'none');
		var $columnDelete = $('<button>').addClass('btn-delete btn-default btn-column').text('x');
		var $columnAddCard = $('<button>').addClass('add-card btn-default').text('Add a card');

		// delete a column:
		$columnDelete.click(function () {
			self.removeColumn();
		});

		// add a note:
		$columnAddCard.click(function(event) {
			var cardName = prompt("Enter the name of the card");
			event.preventDefault();
			self.createCard(new Card(cardName));
			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.createCard(card);
				}
			});
		});

		// contruction column element:
		$column.append($columnTitle)
				.append($columnDelete)
				.append($columnAddCard)
				.append($columnCardList);

		// return of the created column:
		return $column;
	}	
};

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function() {
		this.$element.remove();
	},
	deleteColumn: function() {
	var self = this;
	$.ajax({
		url: baseUrl + '/column/' + self.id,
		method: 'DELETE',
		success: function(response) {
			self.element.remove();
		}
	});
}
};