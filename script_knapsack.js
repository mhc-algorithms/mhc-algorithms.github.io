$(document).ready(function(){
	//All the possible items: [Name, Weight, Value]
	var ALL_ITEMS = [
		["A", 2, 20],
		["B", 15, 10],
		["C", 1, 5],
		["D", 10, 15],
		["FILLER", 10, 15],
		["_FILLER", 10, 15],
		["_FILLER_prime", 10, 15]
	]		//This is necessary for the test table below

	var highlight_color = "yellow";		//The color of highlighted memoization cells
	var selected_highlight_color = "lime";		//The color of the selected memoization cell
	var base_color = "white";			//The color of unhighlighted memoization cells

	// var ALL_ITEMS = [
	// 	["T-Shirt", 3, 15],
	// 	["Jeans", 7, 20],
	// 	["Cap", 1, 20],
	// 	["Sweater", 2, 60],
	// 	["Socks", 1, 13],
	// 	["Boots", 5, 200]
	// ]

	var n = 5;
	var maxN = ALL_ITEMS.length;

	var max_weight = 50;

	// var selected_item = null;
	var shelf_items = [];
	var knapsack_items = [];

	repopulate();
	update_values();

	//Name, Value, Weight: [A, 20, 2], [B, 10, 15], [C, 5, 1], [D, 15, 10]
	displayMemTable([
		[0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],						//0
		[0, 0, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],		//A
		[0, 0, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 30, 30, 30, 30, 30],		//A, B
		[0, 5, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 30, 35, 35, 35, 35],		//A, B, C
		[0, 5, 20, 25, 25, 25, 25, 25, 25, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],		//A, B, C, D
	])

	setInterval(checkParams, 500); //Every 500 millis checks to see if n and max_weight have changed

	//Checks if n has changed
	function checkParams(){
	  var newN = document.getElementById("nInput").value;
	  var new_max_weight = document.getElementById("max_weightInput").value;
	  if((newN != n && newN > 0 && newN <= maxN) || new_max_weight != max_weight){
	    n = newN;        
	    max_weight = new_max_weight;
	    repopulate();
	   }
	}


	//Restarts the game
	function repopulate(){
		var shelf_children = Array.from(document.getElementById("shelf").children);
		var knapsack_children = Array.from(document.getElementById("knapsack").children);

		shelf_items = [];
		knapsack_items = [];

		//Clear Shelf and Knapsack
		for(var i = 0; i < shelf_children.length; i++){
			shelf_children[i].remove();
		}
		for(var i = 0; i < knapsack_children.length; i++){
			knapsack_children[i].remove();
		}


		//Repopulate Shelf
		for(var i = 0; i < n; i++){
			var new_shelf_item = makeShelfItem(i);
			shelf_items.push(new_shelf_item);
			document.getElementById("shelf").appendChild(new_shelf_item);
		}
	}

	//Returns a shelf_item DOM from the i'th index of the possible items array
	function makeShelfItem(i){
		var item = document.createElement("div");
		item.id = "item" + i;
		item.className = "shelf_item";

		item.innerHTML = ALL_ITEMS[i][0] + "<br>" + ALL_ITEMS[i][1] + " lbs.<br>$" + ALL_ITEMS[i][2];

		return item;
	}

	//Display total weight and price of knapsack
	function update_values(){
		//Get indexes of knapsack items
		var indexes = [];
		for(var i = 0; i < knapsack_items.length; i++){
			indexes.push(parseInt(knapsack_items[i].id.substring(4)));
		}

		//Calculate Value and Weight of Knapsack
		var value = 0;
		var weight = 0;

		for(var i = 0; i < indexes.length; i++){
			value += ALL_ITEMS[indexes[i]][2];
			weight += ALL_ITEMS[indexes[i]][1];
		}

		//Display value + weight
		var stats_text;
		if(weight <= max_weight){
	    	stats_text = "Your Knapsack is worth $" + value + " and weighs in at " + weight + "lbs. out of a maximum of " + max_weight + "lbs.";
	    	// console.log("https://en.wikipedia.org/wiki/Giles_Corey#Death_by_pressing");
	    	// console.log("More...Weight...");
	    }else{
	    	stats_text = "Your Knapsack is worth $" + value + " and is overweight in at " + weight + "lbs. out of a maximum of " + max_weight + "lbs.";
	    }

		$("#stats_DOM").text(stats_text);
	}

	//creates an array of size n of possible items
	function generateShelf(){
		return ALL_ITEMS;		//Temporary, until we implement this function
	}

	//Finds the maximum possible value of the knapsack for problem checking purposes given an array of possible items and a maximum weight
	function max_knapsack_value(array, max_weight){
	}

	//Refreshes the shelf and knapsack DOMS
	function refresh_tables(){
		// console.log(shelf_items);
		// console.log(knapsack_items);
		var shelf_children = Array.from(document.getElementById("shelf").children);
		var knapsack_children = Array.from(document.getElementById("knapsack").children);

		//Refresh Shelf
		for(var i = 0; i < shelf_children.length; i++){			//Remove any children which don't belong
			if(shelf_items.indexOf(shelf_children[i]) == -1){
				shelf_children[i].remove();
			}
		}

		for(var i = 0; i < shelf_items.length; i++){					//Add any children which do belong
			if(shelf_children.indexOf(shelf_items[i]) == -1){
				$("#shelf").append(shelf_items[i]);
			}
		}

		//Refresh Knapsack
		for(var i = 0; i < knapsack_children.length; i++){			//Remove any children which don't belong
			if(knapsack_items.indexOf(knapsack_children[i]) == -1){
				knapsack_children[i].remove();
			}
		}

		for(var i = 0; i < knapsack_items.length; i++){					//Add any children which do belong
			if(knapsack_children.indexOf(knapsack_items[i]) == -1){
				$("#knapsack").append(knapsack_items[i]);
			}
		}

		//Update values
		update_values();
	}

	//creates a table with the values OR DOESN'T I CAN'T FIGURE OUT WHATS GOING ON
	function buildMemTable(){
		//for every item in the knapsack, make the table
		var costArray = [knapsack_items.length];
		var weightArray = [knapsack_items.length];

		//values go into the table
		//x-axis is all possible numbers 0 through N (# of items to pick from)
		//y-axis is the capacity 0 through max weight
		//label axes not in the arrays

		//com1=grid[row-1][col-new_item.w]
		//com2=grid[row-1][col]

		//com1+newItem.v verses com2

		for(var i = 0; i<knapsack_items.length; i++){
			//var item = knapsack_items[i];
			var index  = parseInt(knapsack_items[i].id.substring(4));
			console.log(index);
			//var children = Array.from(document.getElementById("knapsack").children);
			costArray.push(ALL_ITEMS[index][2]);
			weightArray.push(ALL_ITEMS[index][1]);
			
			console.log(costArray.toString());

		}

		var table = [costArray.length][weightArray.length];

		//var grin = new array(rows)
		//for r=0<length of grid
		//grid[r]= newArray(cols)


		for(var j = 0; j<costArray.length; j++){
			for(var k = 0; k<weightArray.length; k++){
				table[j][k] = costArray[j]+weightArray[k]; //this is a place HOLDER
			}
		}

		console.log(table);

	}

	//Takes in a 2D array and displays it
	//Assumes a number of rows < 10
	function displayMemTable(table){
		var table_display = document.getElementById("memoize_table");

		for(var r = 0; r < table.length; r++){
			var row = document.createElement("tr");
			row.className = "memoize_row";
			row.id = "row" + r;

			for(var c = 0; c < table[r].length; c++){
				var cell = document.createElement("td");
				cell.className = "memoize_cell";
				cell.id = r + "cell" + c;

				cell.innerHTML = table[r][c];

				row.appendChild(cell);
			}

			table_display.appendChild(row);
		}
	}

	//Explains why the currently selected cell has its value
	//Takes in an array of the two (or one) cells it is comparing and the selected cell
	function updateExplanation(comps, selected){
		var explanation = "";
		if(comps.length == 1){			//Only above_cell is used
			explanation = "The Knapsack is too small to fit the new item for this row, so the best we can do is the same as the best we can do without it.";
		}else if(comps.length == 2){	//Both cells are used
			explanation = "\
			We are able to fit the new item in the Knapsack, so we need to figure out if we want to. We will consider what will happen if we do add it and compare that to what will happen if we don't\n\n\
			If we do add the new item, then our Knapsack is effectively smaller. The value of the new item plus the (previously calculated) value of the smaller knapsack is the best we can do if we add the new item\n\n\
			If we don't add the item, then the best value we could get without the new item is the best value we can get.\n\n\
			In this case, ";

			if(comps[0].innerHTML === selected.innerHTML){		//Above_cell was chosen
				explanation += "the new item should not be added.";
			}else{												//Add_cell was chosen
				explanation += "the new item should be added.";
			}
		}else{							//Error
			explanation = "Something went wrong in updateExplanation";
		}

		$("#explanation").text(explanation);
	}

	//Handles clicks on a cell of the memoization table
	$(".memoize_cell").on("click", (event) => {
		//Clear table highlighting
		for(var row = 0; row < $("#memoize_table").children().length; row++){	//For each row
			for(var col = 0; col < $("#row" + row).children().length; col++){	//For each cell
				var cell = $("#row" + row).children()[col];

				// $(cell.id).css("background-color", "white");;

				document.getElementById(cell.id).style.backgroundColor = base_color;
			}
		}

		var cell = event.target;

		var row = parseInt(cell.parentElement.id.slice(3));
		var col = parseInt(cell.id.slice(5));

		if(row > 0 && col > 0){		//Don't worry about the base cases
			document.getElementById(cell.id).style.backgroundColor = selected_highlight_color;

			var above_cell = $("#row" + (row - 1)).children()[col];		//The cell directly above this one. Represents not adding new_item

			document.getElementById(above_cell.id).style.backgroundColor = highlight_color;

			var new_item_weight = ALL_ITEMS[row - 1][1];
			if(new_item_weight <= col){
				var add_cell = $("#row" + (row - 1)).children()[col - new_item_weight];		//The cell which represents adding new_item

				document.getElementById(add_cell.id).style.backgroundColor = highlight_color;

				updateExplanation([above_cell, add_cell], cell);
			}else{
				updateExplanation([above_cell], cell);
			}

		}
	});

    //Handle Item on Shelf Being Clicked
    $("body").on("click", ".shelf_item", function(event){
    	var moved = false;

    	for(var i = 0; i < knapsack_items.length; i++){
    		if(knapsack_items[i].id == this.id){	//A Knapsack Item has been clicked on
    			console.log("Removing from knapsack");
	    		//Remove item from knapsack_items
	    		knapsack_items.splice(i, 1);	//Remove from array
	    		shelf_items.push(this);

	    		moved = true;

	    		refresh_tables();		//How strange... this shouldn't need to be here, yet it doesn't work unless this is here...
	    	}
    	}

    	if(!moved){
	    	for(var i = 0; i < shelf_items.length; i++){
	    		console.log(shelf_items[i].id);
	    		if(shelf_items[i].id == this.id){
	    			console.log("Removing from Shelf");
	    			//Remove item from shelf_items
			    	shelf_items.splice(i, 1);

			    	//Add item to knapsack_items
			    	knapsack_items.push(this);
	    		}
	    	}
	    }


	    //Display the changes
    	refresh_tables();
    	buildMemTable();
    	
    });
});