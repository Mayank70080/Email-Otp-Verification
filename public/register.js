let showpass = document.querySelector("#showpass");
let password = document.querySelector("#password");
let reshowpass = document.querySelector("#reshowpass");
let repassword = document.querySelector("#repassword");
let fname = document.querySelector("#fname");
let lname = document.querySelector("#lname");
let email = document.querySelector("#email");

showpass.onclick = function() {
    if(password.type == "password") {
        password.type = "text";
        showpass.src = "eye-open.png";
    }
    else {
        password.type = "password";
        showpass.src = "eye-close.png";
    }
}

reshowpass.onclick = function() {
    if(repassword.type == "password") {
        repassword.type = "text";
        reshowpass.src = "eye-open.png";
    }
    else {
        repassword.type = "password";
        reshowpass.src = "eye-close.png";
    }
}

let signupbtn = document.querySelector("#signupbtn");

signupbtn.addEventListener('click', () => {
    if(!email.value || !password.value || !fname.value || !lname.value || !repassword.value) {
        alert("Please fill all the required fields");
    }
    else {
        if(password.value==repassword.value) {
            fetch('/check-user', {
                method: 'post',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify({
                    email: email.value
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data == "0") {
                    redirect();
                }
                else {
                    alert("User already exists");
                }
            })
        }
        else {
            alert("Passwords do not match");
        }
    }
})

const redirect = () => {
    sessionStorage.fname = fname.value;
    sessionStorage.lname = lname.value;
    sessionStorage.password = password.value;
    sessionStorage.email = email.value;
    location.href = '/verification';
}