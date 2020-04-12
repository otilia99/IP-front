function loginFunction() {
    var emailLogin = document.getElementById("emailLogin");
    var passLogin = document.getElementById("passLogin");

    if (validateMailLogin(emailLogin) && validatePassLogin(passLogin)) {
        var displayed = 0;
        const requestDataLogin = `email=${emailLogin.value}&password=${passLogin.value}`;
        var xhttpLogin;
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhttpLogin = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xhttpLogin = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttpLogin.onreadystatechange = function() {
            console.log(this.status);
            if (this.readyState == 4 && this.status === 200) {
                console.log(xhttpLogin.response);
                location.assign("main-page.html");
            } else {
                if (this.status == 401)
                    if (displayed == 0) {
                        alert("Your login credentials don't match an account in our system.")
                        displayed++;
                    }
            }
        };

        xhttpLogin.open("POST", "https://sma-a4.herokuapp.com/auth/login", true);
        xhttpLogin.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttpLogin.send(requestDataLogin);
    }
}

function validateMailLogin(emailLogin) {
    if (emailLogin.value == "") {
        alert("You didn't enter an email!");
        return false;
    }
    return true;
}

function validatePassLogin(passLogin) {
    if (passLogin.value == "") {
        alert("You didn't enter a password!");
        return false;
    }
    return true;
}