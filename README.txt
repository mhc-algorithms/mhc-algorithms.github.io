Algorithms Modules Website
Created Spring 2020 by Ivy O'Neal-Odom and Caroline Knote

index.html
	This is the homepage, it links to the other pages and gives an overview

The first two simulations need to be updated, as the css style sheet, the javascript, and the html are all in the html files. This is something we would like to change in order to make the code easier to access.

The following files correspond to the Stable Matching Simulation:

	StableMatchIntro.html
		this page gives definitions and explanation of the stable matching problem, and links to the simulator

	StableMatchingSimulator.html
		this file contains the style, the html and the javascript for the stable matching simulation.
		The code references students and schools, as this was the original way we outlined the problem, but these are shown to the user as families and animals instead. 

	GaleShapleyAlgorithm.html
		this file contains an explanation of the Gale-Shapley algorithm along with a repeat of the simulation. 
		We should work this so that we can just call a js file instead of copying the code. 
		Simulation notes are the same as the StableMatchingSimulator file

	StableMatchFeedback.html
		this file includes an embedded google form for feedback


The following files are for the Duck Game (Maximum Subarray Sum Problem)
	
	SubArraySum.html
		This file contains the javascript code, the html and the css style for this game.
		The html contains hideable explanation and instructions.
		The user must complete 3 levels (2, 4, 8 ducks) before being able to input values (maximum 16)
		The placement of images for this was hardcoded in, and as such, they do not scale with the size of the webpage.
		We would like to create an animation of water spraying from the hose to the selected ducks

	SASImg
		This folder contains the png files used. All non-background images should have transparent backgrounds
		background.png - a larger higher-quality version of the png background image
		background.tif - the original file for the background with layers
		background1.png - the background image used for the simulation, same as background.png but sized down
		duck.png - the image used for the duck
		hose.png - the image used for the hose
		spraysign1 - the larger higher-quality version of the spray sign
		spraysign2 - the image used for the spray sign in the game (sized down to fit)


The following files are for the Knapsack Problem simulation

	script_knapsack.js
		the javascript file for the knapsack problem simulation
		includes the knapsack, store shelves, and moving objects between them, includes checking using the inputted maximum weight
		includes a memoization table which highlights the values which build into creating the value when a square is selected
		The object sets must be hardcoded in with their images

	style_knapsack.css
		the style sheet for the knapsack problem

	KnapsackProblem.html
		the html file for displaying the knapsack simulation
		contains explanations and the buttons the the user interacts with

	KnapsackPic
		folder containing all the image files for the store shelves
		Images should contain the value and the weight in some way so the user can see these values
		images don't need to be transparent backgrounds for this


To add a simulation to the website:*
	1) Create the js, css, and html files. 
	2) Copy the following to the top of your html file:

<div class="header">
  <h1>Welcome to the MHC Algorithms Help Website!</h1>

</div>

<div class="navbar">
  <a href = "index.html">Home</a>
  <a href = "StableMatchIntro.html">Stable Matching Simulation</a>
  <a href = "SubArraySum.html">Duck Game (Divide-and-Conquer)</a>
  <a href = "KnapsackProblem.html">Knapsack Problem</a>
</div>

	3) Add a new hyperlink to the navbar. 
	4) Copy the added hyperlink to the navbar on all other html files.
	* Note: there is probably a better way to do this than editing all html files, but at the moment, this is how this must be done.

