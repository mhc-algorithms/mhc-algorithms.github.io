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
treeDiv.setAttribute("class", "black fib-container");
document.querySelector("body").appendChild(treeDiv);

//create a form which contains a slider
var treeForm = document.createElement("form");

var treeLabel = document.createElement("label");
treeLabel.setAttribute("id", "tree-label");
treeLabel.setAttribute("for", "tree-slider");
treeLabel.textContent = "Fibonacci(0)";

var treeInput = document.createElement("input");
treeInput.setAttribute("id", "tree-slider");
treeInput.setAttribute("type", "range");
treeInput.setAttribute("min", "0");
treeInput.setAttribute("max", "11");
treeInput.setAttribute("value", "0");
treeInput.setAttribute("oninput", "treeSlider(this)");

//add to div
treeForm.appendChild(treeLabel);
treeForm.appendChild(treeInput);
treeDiv.appendChild(treeForm);

//create default value
var div1 = document.createElement("div");
div1.setAttribute("class", "fib-container");
div1.setAttribute("id", "tree-of-divs");
var div2 = document.createElement("div");
div2.setAttribute("class", "fib-item");
var pg1 = document.createElement("p");
pg1.textContent = "Fib(0) = 0";
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
var treeSlider = function (me) {
  var value = parseInt(me.value);

  // Update the label to match the current value with "Fibonacci" in bold
  var changeLabel = document.querySelector("#tree-label");
  changeLabel.innerHTML = `<strong>Fibonacci</strong>(${value})`;

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
  newNode.setAttribute("class", "fib-item");
  var newP = document.createElement("p");

  // Container for children, will be added later if needed
  var childrenContainer = document.createElement("div");
  childrenContainer.style.display = "none"; // Initially hidden

  // Base cases: directly display Fib(0) = 0 and Fib(1) = 1
  if (depth === 0 || depth === 1) {
    newP.innerHTML = `<strong>Fib</strong>(${depth}) = ${depth}`;
    newNode.appendChild(newP);
    if (parentDiv) {
      parentDiv.appendChild(newNode);
    } else {
      document.getElementById("tree-of-divs").appendChild(newNode);
    }
  } else {
    // For non-base cases, show an expandable node
    newP.innerHTML = `<strong>Fib</strong>(${depth})`; // Bold "Fib"
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
    }

    expandButton.onclick = function () {
      this.classList.toggle("clicked"); // Toggle the 'clicked' class on and off

      this.textContent = "Expanded";

      this.disabled = true; // Optional: Disable button after expanding

      // Make the container for children visible
      // childrenContainer.style.display = 'block';

      childrenContainer.style.display = "flex"; // Changed to flex to use its alignment features
      childrenContainer.className = "children-container";

      // Update the button's text to show the computed Fibonacci value
      newP.textContent += ` = ${numToFib(depth)}`;

      // Recursive calls to expand the tree, into the children container
      if (childrenContainer.hasChildNodes() === false) {
        // Check to prevent duplicate content
        var leftSubtree = document.createElement("div");
        leftSubtree.setAttribute("class", "fib-left");
        recursiveBinTree(depth - 1, leftSubtree);
        childrenContainer.appendChild(leftSubtree);

        var rightSubtree = document.createElement("div");
        rightSubtree.setAttribute("class", "fib-right");
        recursiveBinTree(depth - 2, rightSubtree);
        childrenContainer.appendChild(rightSubtree);
      }
    };
  }
}
