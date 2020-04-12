function forgotpassFunction() {
    var email = document.getElementById("email");

    if (validateMailForgot(email)) {
        var displayed = 0;
        const requestData = `email=${email.value}`;
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
                console.log(xhttp.response, this.status);
                location.assign("reset-password.html");
            }
        };

        xhttp.open("POST", "https://sma-a4.herokuapp.com/auth/reset_password", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(requestData);
    }

}


function validateMailForgot(email) {
    if (email.value == "") {
        alert("You didn't enter an email!");
        return false;
    }

    var myRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var emailValid = myRegex.test(email.value);
    if (emailValid == false) {
        alert("You have entered an invalid email address!");
        return false;
    }
    return true;
}