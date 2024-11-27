window.onload = () => {
    if(!sessionStorage.email){
        location.href = '/login';
    }
}

let email = sessionStorage.email;

let user = document.querySelector("#user");
let otp = document.querySelector("#otp");
let verify = document.querySelector("#verify");
let back = document.querySelector("#back");

user.innerText = email;

const code = Math.floor(100000 + Math.random() * 900000).toString()

fetch('/verify-user', {
    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({
        email: email,
        code: code
    })
})

verify.addEventListener('click', () => {
    if(code == otp.value) {
        alert("Verification Succesful");
        fetch('/register-user', {
            method: 'post',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                fname: sessionStorage.fname,
                lname: sessionStorage.lname,
                password: sessionStorage.password,
                email: sessionStorage.email
            })
        })
        .then(res => res.json())
        .then(data => {
            redirect(data);
        })
    }
    else {
        alert("Incorrect OTP");
    }
})

back.addEventListener('click', () => {
    sessionStorage.clear();
    location.href = '/register';
})

const redirect = (data) => {
    location.href = '/';
}
