var board = {
	name: 'Kanban Board',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

$('.create-column')
	.click(function(){
		var CoulmnName = prompt('Enter a column name');
		$.ajax({
			url: baseUrl + '/column',
			method: 'POST',
			data: {
				name: columnName
			},
			success: function(response){
				var column = new Column(response.id, columnName);
				if (name === "") { 
					board.createColumn(column);
				} else if (name) {
					board.createColumn(column);
				} else {
					return false;
				}			
			}
		});
	});

function initSortable() {
	$('.column-card-list').sortable({
		connectWith: '.column-card-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}