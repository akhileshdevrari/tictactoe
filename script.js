var turn, ai, human, count=0, mode, first_turn;
var matrix = [];
for ( var i = 0; i < 3; i++ ) {
    matrix[i] = ["","",""]; 
}


 window.onload=function()	//Initialing variables. Don't even needed now, except turn=0
 {
 	ai = "X";
 	human = "0";
 	mode = "dumb";
 	turn = 0;
 }

function start_game()	//Starts game by add event listeners on grid
{
	if(mode == "dumb")
		document.getElementById("level").innerHTML = "Should be a Cakewalk!";
	else if(mode == "easy")
		document.getElementById("level").innerHTML = "Easy-breezy";
	else if(mode == "master")
		document.getElementById("level").innerHTML = "Best of Luck :p";
	 document.getElementById("00").addEventListener("click", function(){fill(0,0);});
	 document.getElementById("01").addEventListener("click", function(){fill(0,1);});
	 document.getElementById("02").addEventListener("click", function(){fill(0,2);});
	 document.getElementById("10").addEventListener("click", function(){fill(1,0);});
	 document.getElementById("11").addEventListener("click", function(){fill(1,1);});
	 document.getElementById("12").addEventListener("click", function(){fill(1,2);});
	 document.getElementById("20").addEventListener("click", function(){fill(2,0);});
	 document.getElementById("21").addEventListener("click", function(){fill(2,1);});
	 document.getElementById("22").addEventListener("click", function(){fill(2,2);});
}

function end_game()	//Ends game by removing event listeners on grid
{
	document.getElementById("00").outerHTML = document.getElementById("00").outerHTML;
	document.getElementById("01").outerHTML = document.getElementById("01").outerHTML;
	document.getElementById("02").outerHTML = document.getElementById("02").outerHTML;
	document.getElementById("10").outerHTML = document.getElementById("10").outerHTML;
	document.getElementById("11").outerHTML = document.getElementById("11").outerHTML;
	document.getElementById("12").outerHTML = document.getElementById("12").outerHTML;
	document.getElementById("20").outerHTML = document.getElementById("20").outerHTML;
	document.getElementById("21").outerHTML = document.getElementById("21").outerHTML;
	document.getElementById("22").outerHTML = document.getElementById("22").outerHTML;
}

 
function fill(i, j) {	//Function to fill (i,j) location in grid
	console.log("i = "+i+"  j = "+j+"  turn = "+turn+"  ai = "+ai);
	if(matrix[i][j] != "")
		return;
	var ans;
	if(turn%2 == 0)
		ans =  "0";
	else ans = "X";
	matrix[i][j] = ans;
	turn++;
	display();
	if(check() == true)
		return;
	if((turn%2 == 1 && ai=="X") || (turn%2==0 && ai=="0"))	//One time ai, one time human
		master();
}

function display()//Shows grid elements
{
	var i, j;
	for(i=0; i<3; i++)
		for(j=0; j<3; j++)
		{
			if(matrix[i][j]=="0")
				document.getElementById(""+i+j).innerHTML = "<div style=\"color:#ff6666;\">"+matrix[i][j]+"</div>";
			else document.getElementById(""+i+j).innerHTML = "<div style=\"color: #8000ff;\">"+matrix[i][j]+"</div>";
		}
}

function check() //returns true when game ends with results
{
	var temp = score(matrix);
	if(isfull(matrix)==false && temp==0)
		return false;
	if(temp==0)
		document.getElementById("result").innerHTML = "It's a Draw!";
	else if(temp==10 && mode!="two")
		document.getElementById("result").innerHTML = "You lose!";
	else if(temp==10 && mode=="two")
		document.getElementById("result").innerHTML = "X wins!";
	else if(temp==-10 && mode!="two")
		document.getElementById("result").innerHTML = "You Won!";
	else if(temp==-10 && mode=="two")
		document.getElementById("result").innerHTML = "0 wins!";
	console.log("game over");
	end_game();
	return true;
}

function reset()	//reload page
{
	location.reload();
}

function select_move(grid, player)	//minimax algorithm's main recursive formula
{
	if((isfull(grid)==true && score(grid)==0) )
		return 0;
	else if(score(grid) != 0 )
		return score(grid);
	var i, j, max = -20, min = 20, temp;
	for(i=0; i<3; i++)
	{
		for(j=0; j<3; j++)
		{
			if(grid[i][j] == "")
			{
				if(player==1)
					grid[i][j] = human;
				else grid[i][j] = ai;
				temp = select_move(grid, (player+1)%2);
				if(temp > max)
					max = temp;
				if(temp < min)
					min = temp;
				grid[i][j] = "";

			}
		}
	}
	if(player==0)	//if AI's turn, return maximum
		return max;
	else return min;	//if Human's turn return minimum
}

function master()	//initializes minimax algorithm
{
	if(mode=="two")	//nothing to do in two player mode
		return;
	if(mode=="dumb") //just fill a random box in dumb mode
	{
		var r;
		for(r = Math.floor(9*Math.random()); matrix[parseInt(r/3)][r%3] != ""; r = Math.floor(9*Math.random()));
		console.log("r = "+r);
		fill(parseInt(r/3), r%3);
		return;
	}
	if(mode=="easy")
	{
		var r = Math.floor(10*Math.random()+1);
		if(r>5)	//Easy = 50%dumb + 50% master
		{
			for(r = Math.floor(9*Math.random()); matrix[parseInt(r/3)][r%3] != ""; r = Math.floor(9*Math.random()));
			console.log("r = "+r);
			fill(parseInt(r/3), r%3);
			return;
		}
	}
	//master mode
	//initialize the decision tree and call minimax
	var i, j, move=parseInt(turn), temp, max = -20;
	var grid = [];
	for (i = 0; i < 3; i++ ) {
	    grid[i] = ["","",""]; 
	}
	for(i=0; i<3; i++)
		for(j=0; j<3; j++)
			grid[i][j] = matrix[i][j];
	for(i=0; i<3; i++)
	{
		for(j=0; j<3; j++)
		{
			if(matrix[i][j] == "")
			{
				grid[i][j] = ai;
				temp = select_move(grid, 1);
				if(temp>max)
				{
					max = temp;
					move = 3*i+j;
				}
				grid[i][j] = "";
			}
		}
	}
	fill(parseInt(move/3), parseInt(move%3));
}

function isfull(grid)	//return true if grid is full
{
	for(var i=0; i<3; i++)
		for(var j=0; j<3; j++)
			if(grid[i][j] == "")
				return false;
	return true;
}

function score(grid) //returns 10 if AI wins, -10 if AI lose, 0 otherwise
{
	count++;
	var ans = 0;
	for(var i=0; i<3; i++)
	{
		if(grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2] && grid[i][0] == ai)
			ans = 10;
		if(grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2] && grid[i][0] == human)
			ans = -10;
		if(grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i] && grid[0][i] == ai)
			ans = 10;
		if(grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i] && grid[0][i] == human)
			ans = -10;
	}
	if(grid[0][0] == grid[1][1] && grid[1][1]==grid[2][2] && grid[1][1] == ai)
		ans = 10;
	if(grid[0][0] == grid[1][1] && grid[1][1]==grid[2][2] && grid[1][1] == human)
		ans = -10;
	if(grid[0][2] == grid[1][1] && grid[1][1]==grid[2][0] && grid[1][1] == ai)
		ans = 10;
	if(grid[0][2] == grid[1][1] && grid[1][1]==grid[2][0] && grid[1][1] == human)
		ans = -10;
	return ans;
}

function show(grid) //utility function to print grid on console
{
	console.log("Grid is");
	console.log(grid[0][0]+" "+grid[0][1]+" "+grid[0][2]);
	console.log(grid[1][0]+" "+grid[1][1]+" "+grid[1][2]);
	console.log(grid[2][0]+" "+grid[2][1]+" "+grid[2][2]);
	console.log("ho gya");
}




function play_dumb(){
	mode = "dumb";
	disappear();
	first_move();
}
function play_easy(){
	mode = "easy";
	disappear();
	first_move();
}
function play_master(){
	mode = "master";
	disappear();
	first_move();
}
function play_two(){
	mode = "two";
	disappear();
	start_game();
}
function ai_play_first(){
	ai = "0";
	human = "X";
	var e = document.getElementById("human_first");
    e.style.display = "none";
    var e = document.getElementById("ai_first");
    e.style.display = "none";
	start_game();
	var r = Math.floor(9*Math.random())
	fill(parseInt(r/3), parseInt(r%3));
}
function human_play_first(){
	ai = "X";
	human = "0";
	var e = document.getElementById("human_first");
    e.style.display = "none";
    var e = document.getElementById("ai_first");
    e.style.display = "none";
	start_game();
}

function disappear() {	//disappear level buttons on clicking one
	var e = document.getElementById("dumb_btn");
    e.style.display = "none";
    var e = document.getElementById("easy_btn");
    e.style.display = "none";
    var e = document.getElementById("master_btn");
    e.style.display = "none";
    var e = document.getElementById("two_btn");
    e.style.display = "none";
}

function first_move(){	//if single player mode is on, make two more buttons
	document.getElementById("human_first_div").innerHTML = "<a class=\"btn red\" id=\"human_first\" onclick=\"human_play_first()\">You move first</a>";
	document.getElementById("ai_first_div").innerHTML = "<a class=\"btn purple\" id=\"ai_first\" onclick=\"ai_play_first()\">AI moves first</a>";
}