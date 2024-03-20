// Re-set the document title
document.title = "Dynamic Binary Search Sequence";

//create a div to hold the binary search sequence as a list
var listDiv = document.createElement("div");

// array attributes
var b_arr = document.createElement("array");
var arr_length = 10;
let arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
let updated_arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];

// var rect1 = document.createElement("rect");
// rect1.lineWidth = "1";
// rect1.strokeStyle = "white";
// rect1.rect(, , 20, 20);

// create the form which contains the slider
var listForm = document.createElement("form");
listForm.setAttribute("id", "list-of-divs");

var label = document.createElement("label");
label.setAttribute("id", "list-label");
label.setAttribute("for", "list-slider");

var input = document.createElement("input");
input.setAttribute("id", "list-slider");
input.setAttribute("type", "range");
input.setAttribute("min", "1");
input.setAttribute("max", "21");
input.setAttribute("value", "0");
input.setAttribute("oninput", "listSlider(this)");

//add to div
listForm.appendChild(label);
listForm.appendChild(input);
listDiv.appendChild(listForm);

//create default value
var d1 = document.createElement("div");
d1.setAttribute("class", "bsearch-list");
var d2 = document.createElement("div");
d2.setAttribute("class", "bsearch-item");
var p1 = document.createElement("p");
p1.textContent = "0";
d2.appendChild(p1);
d1.appendChild(d2);
listDiv.appendChild(d1);

var arrayRectangles = document.createElement("div");
arrayRectangles.setAttribute("class", "arrayRectangles");
displayMemTable();
document.querySelector("body").appendChild(arrayRectangles);

//create a div to hold the binary search sequence as a tree
var treeDiv = document.createElement("div");
treeDiv.setAttribute("class", "black bsearch-container");
document.querySelector("body").appendChild(treeDiv);

//create a form which contains a slider
var treeForm = document.createElement("form");

var treeLabel = document.createElement("label");
treeLabel.setAttribute("id", "tree-label");
treeLabel.setAttribute("for", "tree-slider");
treeLabel.textContent = "BinarySearch(0)";

var treeInput = document.createElement("input");
treeInput.setAttribute("id", "tree-slider");
treeInput.setAttribute("type", "range");
treeInput.setAttribute("min", "0");
treeInput.setAttribute("max", "21");
treeInput.setAttribute("value", "0");
treeInput.setAttribute("oninput", "treeSlider(this)");

//add to div
treeForm.appendChild(treeLabel);
treeForm.appendChild(treeInput);
treeDiv.appendChild(treeForm);

//create default value
var div1 = document.createElement("div");
div1.setAttribute("class", "bsearch-container");
div1.setAttribute("id", "tree-of-divs");
var div2 = document.createElement("div");
div2.setAttribute("class", "bsearch-item");
var pg1 = document.createElement("p");
pg1.textContent = "BinaryS(0) = 0";
div2.appendChild(pg1);
div1.appendChild(div2);
treeDiv.appendChild(div1);


var highlight_color = "yellow";		//The color of highlighted button 
var base_color = "white";  // color of unexpanded button

function binarySearch(arr, x)
{    
    let l = 0;
    let r = arr.length - 1;
    let mid;
    while (r >= l) {
        mid = l + Math.floor((r - l) / 2);
  
        // If the element is present at the middle
        // itself
        if (arr[mid] == x)
            //updateArray(arr, mid)
            return mid;
  
        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid] > x)
            r = mid - 1;
             
        // Else the element can only be present
        // in right subarray
        else
            l = mid + 1;
    }
  
    
    // We reach here when element is not
    // present in array
    return -1;
}

// takes in a index of an array results from the binarySearch() and updates the updated_arr
function updateArray(previousArr, index){
    let newArr = [];

    if(index > previousArr.length/2 ){
        for (let i = index; i > previousArr.length; i++){
            newArr.push(previousArr[i]);
        }
    }else{
        for (let i = 0; i <= index; i++){
            newArr.push(previousArr[i]);
        }
    }

    updated_arr = newArr;
}

// Improved version of treeSlider to handle updates smoothly
var treeSlider = function (me) {
    var value = parseInt(me.value);

    updated_arr = arr;
  
    // Update the label to match the current value with "BinarySearch" in bold
    var changeLabel = document.querySelector("#tree-label");
    changeLabel.innerHTML = `<strong>BinarySearch</strong>(${value})`;
  
    // Create a new tree container if it doesn't exist or clear the existing one
    var bsearchTree = document.querySelector("#tree-of-divs");
    if (!bsearchTree) {
      bsearchTree = document.createElement("div");
      bsearchTree.setAttribute("id", "tree-of-divs");
      bsearchTree.setAttribute("class", "bsearch-container");
      bsearchTree.appendChild(bsearchTree);
    } else {
      // Clear the bsearchtree without removing it, preparing for new content
      while (bsearchTree.firstChild) {
        bsearchTree.removeChild(bsearchTree.firstChild);
      }
    }
  
    // Start building the new tree
    recursiveBinTree(value, bsearchTree);
};

function recursiveBinTree(depth, parentDiv = null) {
    var newNode = document.createElement("div");
    newNode.setAttribute("class", "bsearch-item");
    var newP = document.createElement("p");
  
    // Container for children, will be added later if needed
    var childrenContainer = document.createElement("div");
    childrenContainer.style.display = "none"; // Initially hidden
  
    if(depth == 0){
        return;
    }
    newP.innerHTML = `<strong>BinaryS</strong>(${depth})`; // Bold "BinaryS"
    newNode.appendChild(newP);

    var expandButton = document.createElement("button");
    expandButton.textContent = "Expand";
    newNode.appendChild(expandButton); // Button stays at this level

    // Append the initially hidden container for children
    newNode.appendChild(childrenContainer);

    if (parentDiv) {
    parentDiv.appendChild(newNode);
    } else {
    document.getElementById("tree-of-divs").appendChild(newNode);
    //displayMemTable();
    }

    expandButton.onclick = function () {
    this.classList.toggle("clicked"); // Toggle the 'clicked' class on and off

    this.textContent = "Expanded";

    this.disabled = true; // Optional: Disable button after expanding

    // Make the container for children visible
    // childrenContainer.style.display = 'block';

    childrenContainer.style.display = "flex"; // Changed to flex to use its alignment features
    childrenContainer.className = "children-container";

    indexResults = binarySearch(updated_arr, depth);

    // updateArray(arr, indexResults);
    if (indexResults == -1){
        // Update the button's text to show the computed binary search value
        newP.textContent += ` = index at ${binarySearch(arr, depth)}`;
        return;
    }else{
        // Update the button's text to show the computed binary search value
        newP.textContent += ` = index at ${binarySearch(updated_arr, depth)}`;
        //displayMemTable();
        updateArray(updated_arr, depth);

    }

    // Recursive calls to expand the tree, into the children container
    if (childrenContainer.hasChildNodes() === false) {
        //Check to prevent duplicate content
    //   var leftSubtree = document.createElement("div");
    //   leftSubtree.setAttribute("class", "bsearch-left");
    //   recursiveBinTree(depth - 1, leftSubtree);
    //   childrenContainer.appendChild(leftSubtree);

        var rightSubtree = document.createElement("div");
        rightSubtree.setAttribute("class", "bsearch-right");

        //indexResults = binarySearch(updated_arr, depth);
        //updateArray(updated_arr, depth);
        //displayMemTable();
        recursiveBinTree(depth, rightSubtree);
        childrenContainer.appendChild(rightSubtree);
    }
    
    };
    //}
}
  
// what i could do is make a new array based on the updated list
//Takes in a 2D array and displays it
//Assumes a number of rows < 10
function displayMemTable(){

    
    // //Clear the table
    // while(array_display.firstChild){
    //     array_display.removeChild(table_display.lastChild);
    // }

    var row = document.createElement("tr");

    for(var c = 0; c < updated_arr.length; c++){
        var cell = document.createElement("td");
        cell.id = "weight_cell" + c;
        cell.className = "weight_cell";

        cell.innerHTML = "<b> " + arr[c] + " </b>"

        row.appendChild(cell);
    }

    arrayRectangles.appendChild(row);
}
