
var addItem = function() {
	var itemVal = $('#todoItem').val();

	if(itemVal.length > 0){
		//ajax
		$.ajax({
			url:"/middleware/todos",
			contentType:"application/json",
			type:"POST",
			data:JSON.stringify({
				item: itemVal
			}),
			dataType: 'json',
			success:function(data){
						populateList();
					}
		});
		$('#todoItem').val('');
	}
};

var populateList = function () {
	$.get("/middleware/todos", function(data) {
		var list = "";
		data.forEach(function(element){
			if(element.item) {
				list+='<li class="list-group-item">' + element.item + '</li>';
			}
		});

		$("#results").html(list);
	});
}
$(document).ready(function() {
	populateList();

});
