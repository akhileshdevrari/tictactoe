	var turn = 0;
	var matrix = [];
	for ( var i = 0; i < 3; i++ ) {
	    matrix[i] = ["","",""]; 
	}

	 document.getElementById("00").addEventListener("click", function(){fill(0,0);});
	 document.getElementById("01").addEventListener("click", function(){fill(0,1);});
	 document.getElementById("02").addEventListener("click", function(){fill(0,2);});
	 document.getElementById("10").addEventListener("click", function(){fill(1,0);});
	 document.getElementById("11").addEventListener("click", function(){fill(1,1);});
	 document.getElementById("12").addEventListener("click", function(){fill(1,2);});
	 document.getElementById("20").addEventListener("click", function(){fill(2,0);});
	 document.getElementById("21").addEventListener("click", function(){fill(2,1);});
	 document.getElementById("22").addEventListener("click", function(){fill(2,2);});
	 
	function fill(i, j) {
		if(matrix[i][j])
			return;
		var ans;
		if(turn%2 == 0)
			ans =  "0";
		else ans = "X";
		matrix[i][j] = ans;
		turn++;
		display();
		check();
	}

	function display()
	{
		var i, j;
		for(i=0; i<3; i++)
			for(j=0; j<3; j++)
				document.getElementById(""+i+j).innerHTML = matrix[i][j];
	}

	function check()
	{
		var winner = "Draw";

		for(var i=0; i<3; i++)
			for(var j=0; j<3; j++)
				if(matrix[i][j]=="")
					winner = "";

		for(var i=0; i<3; i++)
		{
			if(matrix[i][0] == matrix[i][1] && matrix[i][1] == matrix[i][2] && matrix[i][0] == "0")
				winner = "0";
			if(matrix[i][0] == matrix[i][1] && matrix[i][1] == matrix[i][2] && matrix[i][0] == "X")
				winner = "X";
			if(matrix[0][i] == matrix[1][i] && matrix[1][i] == matrix[2][i] && matrix[0][i] == "0")
				winner = "0";
			if(matrix[0][i] == matrix[1][i] && matrix[1][i] == matrix[2][i] && matrix[0][i] == "X")
				winner = "X";
		}
		if(matrix[0][0] == matrix[1][1] && matrix[1][1]==matrix[2][2] && matrix[1][1] == "0")
			winner = "0";
		if(matrix[0][0] == matrix[1][1] && matrix[1][1]==matrix[2][2] && matrix[1][1] == "X")
			winner = "X";
		if(matrix[0][2] == matrix[1][1] && matrix[1][1]==matrix[2][0] && matrix[1][1] == "0")
			winner = "0";
		if(matrix[0][2] == matrix[1][1] && matrix[1][1]==matrix[2][0] && matrix[1][1] == "X")
			winner = "X";
		if(winner != "")
		{
			if(winner=="Draw")
				document.getElementById("result").innerHTML = "It's a Draw";
			else document.getElementById("result").innerHTML = winner+" won!";
			for(var i=0; i<3; i++)
				for(var j=0; j<3; j++)
					matrix[i][j] = "1";
		}
	}

	function reset()
	{
		location.reload();
	}
