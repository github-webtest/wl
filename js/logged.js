setInterval(function(){
		

    if (localStorage.getItem('token')) {
		
    window.location.href = '/enter.html';
	
	  }
	  
	  const myDiv = document.getElementById('header_div');
	  const pageHeight = window.innerHeight;
	  const divHeight = myDiv.offsetHeight;
	  const result = (pageHeight - divHeight) - (pageHeight / 10);
	  document.getElementById("container").style.height = result + "px";
	
}, 100);