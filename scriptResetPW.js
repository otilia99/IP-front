function resetFunction() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var token = document.getElementById("token");

if(validateMail(email) && validatePass(password))
	{
        var displayed = 0;
    	const requestData = `email=${email.value}&password=${password.value}&token=${token.value}`;
    	var xhttp;
    	if (window.XMLHttpRequest) {
        	// code for modern browsers
        	xhttp = new XMLHttpRequest();
    	} else {
        	// code for IE6, IE5
        	xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    	}
    	xhttp.onreadystatechange = function() {


        	if (this.readyState == 4 && this.status == 200) {
            	console.log(xhttp.response);
            	location.assign("index.html");
        	   }
               else
                if (this.status == 403)
                {
                    if(displayed == 0)
                    {
                        alert("Token has expired.");
                        location.reload(); //Dau refresh la pagina ca sa golesc campurile
                        displayed++;
                    }
                }
    		};

    	xhttp.open("POST", "https://sma-a4.herokuapp.com/auth/reset_password/callback", true);
    	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	xhttp.send(requestData);
	}

}



// VALIDARI
function validatePass(pw) {
	if (pw.value == "")
	{
		alert("You didn't enter a password.\n");
		return false;
	}

	console.log(pw.value.length);

	if (pw.value.length < 7)
	{
		alert("The password must have at least 7 characters");
		return false;
	}
	return true;
}

function validateMail(email) {

	if (email.value == "")
	{
		alert("You didn't enter an email.\n")
		return false;
	}

	var myRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var emailValid = myRegex.test(email.value);
	if (emailValid == false)
	{
		alert("You have entered an invalid email address!");
		return false;
	}
	return true;
}

