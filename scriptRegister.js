function registerFunction() {
    var name = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var policybox = document.getElementById("checkb").checked;

    console.log(password.value);
    console.log(password.value.length);


    if (validateUser(name) && validateMail(email) && validatePassRegister(password) && validateCheckBox(policybox)) {
        var displayed = 0;
        const requestData = `name=${name.value}&email=${email.value}&password=${password.value}`;
        var xhttp;
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.onreadystatechange = function() {


            if (this.readyState == 4 && this.status == 201) {
                console.log(xhttp.response);
                location.assign("add-platform.html");
            } else
            if (this.status == 409) {
                if (displayed == 0) {
                    alert("There is already an account registered with this email!");
                    displayed++;
                }
            }
        };

        xhttp.open("POST", "https://sma-a4.herokuapp.com/auth/signup", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(requestData);
    }

}



// VALIDARI

function validateUser(name) {

    if (name.value == "") {
        alert("You didn't enter a username.\n");
        return false;
    }

    if ((name.value.length < 5) || (name.value.length > 20)) {
        alert("The username must have at least 5 characters.\n");
        return false;
    }

    var myRegex = /^[a-z0-9]+$/i;
    var userValid = myRegex.test(name.value);
    if (userValid == false) {
        alert("The username must contain alphanumeric characters.\n");
        return false;
    }
    return true;
}

function validatePassRegister(pw) {
    if (pw.value == "") {
        alert("You didn't enter a password.\n");
        return false;
    }

    console.log(pw.value.length);

    if (pw.value.length < 7) {
        alert("The password must have at least 7 characters");
        return false;
    }
    return true;
}

function validateMail(email) {

    if (email.value == "") {
        alert("You didn't enter an email.\n")
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

function validateCheckBox(policybox) {
    if (policybox) {
        return true;
    } else {
        alert("You must agree with our terms.\n");
        return false;
    }
}