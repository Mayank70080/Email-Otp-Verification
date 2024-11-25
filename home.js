let namedis = document.querySelector("#namedis");
let emaildis = document.querySelector("#emaildis");
let signoutbtn = document.querySelector("#signoutbtn");
let email = sessionStorage.email;
let fname = sessionStorage.fname;
let lname = sessionStorage.lname;

window.onload = () => {
    if(!sessionStorage.email){
        location.href = '/login';
    }
}

namedis.innerText = `Welcome, ${fname} ${lname}!`;
emaildis.innerText = `Email: ${email}`;

signoutbtn.addEventListener('click', () => {
    sessionStorage.clear();
    location.reload();
})