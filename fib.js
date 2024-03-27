// Re-set the document title
document.title = "Dynamic Fibonacci Sequence";

//create a div to hold the fibonacci sequence as a list
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
d1.setAttribute("class", "fib-list");
var d2 = document.createElement("div");
d2.setAttribute("class", "fib-item");
var p1 = document.createElement("p");
p1.textContent = "0";
d2.appendChild(p1);
d1.appendChild(d2);
listDiv.appendChild(d1);

//create a div to hold the fibonacci sequence as a tree
var treeDiv = document.createElement("div");
treeDiv.setAttribute("class", "black unrollingContainer");
document.querySelector("body").appendChild(treeDiv);

//create a form which contains a slider
var treeForm = document.createElement("form");

var treeLabel = document.createElement("label");

var treeInput = document.createElement("input");

//add to div
treeForm.appendChild(treeLabel);
treeForm.appendChild(treeInput);
// treeDiv.appendChild(treeForm);

//create default value
var div1 = document.createElement("div");
div1.setAttribute("class", "fib-container");
div1.setAttribute("id", "tree-of-divs");
var div2 = document.createElement("div");
div2.setAttribute("class", "fib-item");
var pg1 = document.createElement("p");
pg1.textContent = "T(0) = 0";
div2.appendChild(pg1);
div1.appendChild(div2);
treeDiv.appendChild(div1);

//function that turns a number into its fibonacci sequence value
var numToFib = function (num) {
  if (num == 1) return 1;
  if (num == 0) return 0;
  return numToFib(num - 1) + numToFib(num - 2);
};

// Improved version of treeSlider to handle updates smoothly
var generateTreeFromInput = function (me) {
  var value = parseInt(document.getElementById('fibInput').value, 10);

  // Create a new tree container if it doesn't exist or clear the existing one
  var fibTree = document.querySelector("#tree-of-divs");
  if (!fibTree) {
    fibTree = document.createElement("div");
    fibTree.setAttribute("id", "tree-of-divs");
    fibTree.setAttribute("class", "fib-container");
    treeDiv.appendChild(fibTree);
  } else {
    // Clear the fibTree without removing it, preparing for new content
    while (fibTree.firstChild) {
      fibTree.removeChild(fibTree.firstChild);
    }
  }

  // Start building the new tree
  recursiveBinTree(value, fibTree);
};

function recursiveBinTree(depth, parentDiv = null) {
  var newNode = document.createElement("div");
  newNode.classList.add("fib-item");
  var newP = document.createElement("p");
  newP.innerHTML = `T(${depth})`;
  if (depth > 1) {
      newP.classList.add("clickable");
  }

  newNode.appendChild(newP);

  if (depth === 0 || depth === 1) {
      newP.innerHTML += ` = ${depth}`;
  } else {
      newP.onclick = function() {
          this.classList.remove("clickable");
          this.classList.add("expanded");
          this.onclick = null; // Prevent further clicks on this element

          // Expand further
          const expansionDiv = document.createElement("div");
          expansionDiv.classList.add("fib-expansion");
          newNode.appendChild(expansionDiv);

          const leftNode = recursiveBinTree(depth - 1, expansionDiv);
          const plusText = document.createTextNode(" + ");
          const rightNode = recursiveBinTree(depth - 2, expansionDiv);

          expansionDiv.appendChild(leftNode);
          expansionDiv.appendChild(plusText);
          expansionDiv.appendChild(rightNode);
      };
  }

  if (parentDiv) {
      parentDiv.appendChild(newNode);
  } else {
      document.getElementById("tree-of-divs").appendChild(newNode);
  }

  return newNode; // This allows for manipulation of the node if necessary
}
