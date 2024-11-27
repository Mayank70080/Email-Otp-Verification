window.onload = () => {
    if(sessionStorage.email){
        location.href = '/';
    }
}

let showpass = document.querySelector("#showpass");
let password = document.querySelector("#password");
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

let signinbtn = document.querySelector("#signinbtn");
let signupbtn = document.querySelector("#signupbtn");

signupbtn.addEventListener('click', () => {
    location.href = '/register';
})

signinbtn.addEventListener('click', () => {
    if(!email.value || !password.value) {
        alert("Please fill all the required fields");
    }
    else {
        fetch('/login-user',{
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            redirect(data);
        })
    }
})

const redirect = (data) => {
    if(!data.email){
        alert(data);
    } else{
        sessionStorage.email = data.email;
        sessionStorage.fname = data.fname;
        sessionStorage.lname = data.lname;
        location.href = '/';
    }
}