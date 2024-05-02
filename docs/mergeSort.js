// Re-set the document title
document.title = "Merge Sort Sequence";

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
treeDiv.setAttribute("class", "black unrollingContainer mergeUnrollingContainer");
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
div1.setAttribute("class", "merge-container");
div1.setAttribute("id", "tree-of-divs-merge");
var div2 = document.createElement("div");
div2.setAttribute("class", "fib-item");
var pg1 = document.createElement("p");
pg1.textContent = "T(0) = 0";
div2.appendChild(pg1);
div1.appendChild(div2);
treeDiv.appendChild(div1);

// Improved version of treeSlider to handle updates smoothly
var generateMergeSortTreeFromInput = function (me) {
  var value = parseInt(document.getElementById("mergeInput").value, 10);

  // Create a new tree container if it doesn't exist or clear the existing one
  var fibTree = document.querySelector("#tree-of-divs-merge");
  if (!fibTree) {
    fibTree = document.createElement("div");
    fibTree.setAttribute("id", "tree-of-divs-merge");
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
  newNode.classList.add("fib-item"); // You might want to rename this class to match merge sort rather than Fibonacci.
  var newP = document.createElement("p");
  newP.innerHTML = `T(${depth})`;
  if (depth > 1) {
    newP.classList.add("clickable");
  }

  newNode.appendChild(newP);

  if (depth === 0 || depth === 1) {
    newP.innerHTML += ` = ${depth}`;
  } else {
    newP.onclick = function () {
      this.classList.remove("clickable");
      this.classList.add("expanded");
      this.onclick = null; // Prevent further clicks on this element

      const expansionDiv = document.createElement("div");
      expansionDiv.classList.add("fib-expansion");
      expansionDiv.style.display = "flex"; // Use flex layout
      expansionDiv.style.alignItems = "center"; // Center items vertically
      expansionDiv.style.justifyContent = "center"; // Center items horizontally
      newNode.appendChild(expansionDiv);

      const halfDepth = Math.ceil(depth / 2);

      // Create a container for "2*T(halfDepth)"
      const leftNodeContainer = document.createElement("div");
      leftNodeContainer.classList.add("fib-left");
      expansionDiv.appendChild(leftNodeContainer);

      // Prefix "2*" for the left node
      const prefixText = document.createElement("span");
      prefixText.textContent = "2*";
      leftNodeContainer.appendChild(prefixText);

      // Actual recursive call for the left node
      recursiveBinTree(halfDepth, leftNodeContainer);

      // Right Node for O(depth)
      const rightNodeContainer = document.createElement("div");
      rightNodeContainer.classList.add("fib-right");
      rightNodeContainer.classList.add("fib-item");
      const rightNode = document.createElement("p");
      const plusText = document.createTextNode(" + ");
      rightNode.textContent = `O(${depth})`; // Represents the merge operation's complexity
      rightNodeContainer.appendChild(rightNode);
      expansionDiv.appendChild(plusText);
      expansionDiv.appendChild(rightNodeContainer);
    };
  }

  if (parentDiv) {
    parentDiv.appendChild(newNode);
  } else {
    document.getElementById("tree-of-divs-merge").appendChild(newNode);
  }
  return newNode;
}
