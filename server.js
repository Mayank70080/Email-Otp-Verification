const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const knex = require('knex');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { template } = require('./emailtemplate');

const app = express();

let initialpath = path.join(__dirname, "public");

const db = knex({
    client: 'pg',
    connection: {
        host: 'ct3jiae8ii6s73d718h0-a.oregon-postgres.render.com',
        user: 'projecthd_user',
        password: 'fG4slDQfbDJ7PJ57IgCGWYNI0vG6jJ78',
        port: 5432,
        database: 'projecthd',
        ssl: true
    }
})

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "projectotp70080@gmail.com",
      pass: "owtf ijkl qppc bgqt",
    },
});

const sendemail = async(email, code) => {
    const info = await transporter.sendMail({
        from: '"Project HD" <projectotp70080@gmail.com>',
        to: email,
        subject: "Verify Your Email",
        text: "Verify Your Email",
        html: template.replace("{verificationCode}", code),
    });
    console.log(info);
}

app.use(bodyparser.json());
app.use(express.static(initialpath));

app.get('/', (req, res) => {
    res.sendFile(path.join(initialpath, "home.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(initialpath, "login.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(initialpath, "register.html"));
})

app.get('/verification', (req, res) => {
    res.sendFile(path.join(initialpath, "verification.html"));
})

app.post('/check-user', (req, res) => {
    const { email } = req.body;

    db.select('email')
        .from("users")
        .where({
            email: email
        })
        .then(data => {
            if(data.length) {
                res.json("User already exists");
            }
            else {
                res.json("0");
            }
        })
})

app.post('/register-user', async(req, res) => {
    const { fname, lname, password, email } = req.body;
    const dbpass = await bcrypt.hash(password, 12);
    db("users").insert({
        fname: fname,
        lname: lname,
        password: dbpass,
        email: email
    })
    .returning("email")
    .then(data => {
        res.json(data[0])
    })
})

app.post('/login-user', (req,res) => {
    const { email, password } = req.body;

    db.select()
        .from("users")
        .where({
            email: email
    })
    .then(data => {
        if(!data.length){
            res.json("No User Found");
            return
        }
        bcrypt.compare(password, data[0].password, (err, response) => {
            if(err) {
                res.json("Incorrect Password");
            }
            if(response) {
                res.json(data[0]);
            }
        })
    })
})

app.post('/verify-user', (req,res) => {
    const { email, code } = req.body;
    sendemail(email, code);
})

app.listen(3333, (req, res) => {
    console.log("Listening on port 3333");
});
