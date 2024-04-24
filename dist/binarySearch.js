// Re-set the document title
document.title = "Dynamic Binary Search Sequence";

//create a div to hold the binary search sequence as a list
var listDiv = document.createElement("div");

// create the form which contains the slider
var listForm = document.createElement("form");
listForm.setAttribute("id", "list-of-divs");

var label = document.createElement("label");
label.setAttribute("id", "list-label");
label.setAttribute("for", "list-slider");

var input = document.createElement("input");
input.setAttribute("id", "list-slider");
input.setAttribute("type", "range");
input.setAttribute("min", "0");
input.setAttribute("max", "20");
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

//create a div to hold the binary search sequence as a tree
var treeDiv = document.createElement("div");
treeDiv.setAttribute("class", "black unrollingContainer binaryUnrollingContainer");
document.querySelector("body").appendChild(treeDiv);

//create a form which contains a slider
var treeForm = document.createElement("form");

var treeLabel = document.createElement("label");

var treeInput = document.createElement("input");

//add to div
treeForm.appendChild(treeLabel);
treeForm.appendChild(treeInput);

//create default value
var div1 = document.createElement("div");
div1.setAttribute("class", "bsearch-container");
div1.setAttribute("id", "tree-of-divs");
var div2 = document.createElement("div");
div2.setAttribute("class", "bsearch-item");
var pg1 = document.createElement("p");
pg1.textContent = "T(0) = 0";
div2.appendChild(pg1);
div1.appendChild(div2);
treeDiv.appendChild(div1);

//function that turns a number into its binary search sequence value
var numToBSearch = 0;
  
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

// Improved version of treeSlider to handle updates smoothly
var generateBSTreeFromInput = function (me) {
    var value = parseInt(document.getElementById('userInputBS').value, 10);
  
    // Create a new tree container if it doesn't exist or clear the existing one
    var bsearchTree = document.querySelector("#tree-of-divs");
    if (!bsearchTree) {
        bsearchTree = document.createElement("div");
        bsearchTree.setAttribute("id", "tree-of-divs");
        bsearchTree.setAttribute("class", "bsearch-container");
      treeDiv.appendChild(bsearchTree);
    } else {
      // Clear the bsearchTree without removing it, preparing for new content
      while (bsearchTree.firstChild) {
        bsearchTree.removeChild(bsearchTree.firstChild);
      }
    }
  
    // Start building the new tree
    recursiveBinTree(value, bsearchTree);
};


function recursiveBinTree(depth, parentDiv = null) {
    var newNode = document.createElement("div");
    newNode.classList.add("bsearch-item");
    var newP = document.createElement("p");
    newP.innerHTML = `T(${depth})`; ;
    if (depth > 1) {
        newP.classList.add("clickable");
    }
  
    newNode.appendChild(newP);

  
    if (depth === 0 || depth === 1 || depth < 1 ) {
        newP.innerHTML += ``;
    } else {
        newP.onclick = function() {
            this.classList.remove("clickable");
            this.classList.add("expanded");
            this.onclick = null; // Prevent further clicks on this element
  
            
            // Expand further
            const expansionDiv = document.createElement("div");
            expansionDiv.classList.add("bsearch-expansion");
            newNode.appendChild(expansionDiv);

            // var value = depth/2;
            // if(value % 2 != 0){
            //     const Node = recursiveBinTree(depth-1, expansionDiv);
            // }else{
            //     const Node = recursiveBinTree(depth/2, expansionDiv);
            // }

  
            const Node = recursiveBinTree(depth/2, expansionDiv);
            expansionDiv.appendChild(Node);
            expansionDiv.style.display = "flex"; // Use flex layout
            expansionDiv.style.alignItems = "center"; // Center items vertically
            expansionDiv.style.justifyContent = "center"; // Center items horizontally


            // Right Node for O(depth)
            const rightNodeContainer = document.createElement("div");
            rightNodeContainer.classList.add("fib-right");
            rightNodeContainer.classList.add("fib-item");
            const rightNode = document.createElement("p");
            const plusText = document.createTextNode(" + ");
            rightNode.textContent = `O(1)`; // Represents the merge operation's complexity
            rightNodeContainer.appendChild(rightNode);
            expansionDiv.appendChild(plusText);
            expansionDiv.appendChild(rightNodeContainer);
        };
    }
  
    if (parentDiv) {
        parentDiv.appendChild(newNode);
    } else {
        document.getElementById("tree-of-divs").appendChild(newNode);
    }
  
    return newNode; // This allows for manipulation of the node if necessary
}
  
