<!DOCTYPE html>
<html>
<head>
	<title>TicTacToe</title>
	<link rel="stylesheet" href="layout.css" type="text/css">
</head>
<body>
<div class="wrapper">
	<h1 class="heading">TicTacToe</h1>
	<br>
	<table class="grid">
	    <tr>
	        <td id="00" class="td"></td>
	        <td id="01" class="td"></td>
	        <td id="02" class="td"></td>
	    </tr>
	    <tr>
	        <td id="10" class="td"></td>
	        <td id="11" class="td"></td>
	        <td id="12" class="td"></td>
	    </tr>
	    <tr>
	        <td id="20" class="td"></td>
	        <td id="21" class="td"></td>
	        <td id="22" class="td"></td>
	    </tr>
	</table>


	<br>
	<div id="result" class="result"></div>
	<br>
	<button class="reset_button" onclick="reset()">Reset</button>

	<br><br>
	<footer>
	<a href="https://github.com/akhileshdevrari/">Created by Akhilesh Devrari</a>
	</footer>
</div>

<script type="text/javascript" src="script.js"></script>
</body>
</html>