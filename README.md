# Email-OTP Verification

This project lets a user sign up or sign in in case he/she already created an account and confirms if the email used is genuine with the help of a verification code.

## Project Description
This project consists of four web pages with the first one being the login page, which lets the user login. If the user is new then it lets them create a new account for which the page redirects to the register page. If a user is registering then the user is redirected to the verification page where the user needs to verify the email account used. Lastly after successful completion the user is redirected to the home page.

## Tools and Technologies Used 
HTML5 - For structuring of the web pages.
CSS Bootstrap - To add the designing elements.
PostgreSQL - To store login data of the users.
JavaScript - For the client side programming.
NodeJS - For the server side programming and to manage the post and get request from the client side.
NodeJS Libraries used -
Express - For the server side programming.
Knex - For managing connection with the database and handle search and insert queries every time a user tries to register or login.
Bcrypt - To hash passwords.
Nodemailer - To send verification mails to the users.

## Installation
Step 1 - Install all dependencies listed in the package.json file using npm install.
```bash
npm install
```
Step 2 - Create a local PostgreSQL database.
Step 3 - Update the database info in the server.js file and establish a connection.
Step 4 - Update the email and password with the one you want to use for sending mails.
Step 5 - Run the file using the command npm start.
```bash
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
