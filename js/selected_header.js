var inter = 1;

function header_selected(x) {
	
	if (x == "1" && inter == 2) {
		
		document.getElementById("header_selected1").style.background = "linear-gradient(to bottom right, #1f3b57, #3498db)";
		document.getElementById("header_selected2").style.background = "linear-gradient(to bottom right, #5c7d99, #85c1f0)";
		document.getElementById("container1").style.display = "block";
		document.getElementById("container2").style.display = "none";
		document.getElementById("header_selected1").style.transform = "scale(1.05)";
		document.getElementById("header_selected2").style.transform = "scale(0.90)";
		
		inter = 1;
		
	} else if (x == "2" && inter == 1) {
		
		document.getElementById("header_selected2").style.background = "linear-gradient(to bottom right, #1f3b57, #3498db)";
		document.getElementById("header_selected1").style.background = "linear-gradient(to bottom right, #5c7d99, #85c1f0)";
		document.getElementById("container2").style.display = "block";
		document.getElementById("container1").style.display = "none";
		document.getElementById("header_selected1").style.transform = "scale(0.90)";
		document.getElementById("header_selected2").style.transform = "scale(1.05)";
		
		inter = 2;
		
	}
	
}