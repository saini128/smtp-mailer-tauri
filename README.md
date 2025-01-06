# Postweaver - SMTP Mailer

A simple software that allows you to send quick emails with smtp credentials. Can be used in cases where you don't have POP3 and IMAP setup and only SMTP without even a proper mailing client. This software also stores the credentials in storage so you don't have to enter again and again

## Contribution Guidelines

#### Currently this project is up for frontend contributions only
- Fork the repo
- ```git clone <forked_repo url>```
- ```cd smtp-mailer-tauri```
- ```npm i```
- ```npm run dev```

There are 2 pages in this project in ```src/pages/HomePage.jsx``` and ```src/pages/LoginPage.jsx```

Only these 2 pages need revamp.

To swap between 2 pages on view as they are connected to backend just add an exclaimation mark(!) at line 29 before credentialsAvailable and hit save for hot reload
```jsx
{credentialsAvailable ? <HomePage /> : <LoginPage />}
```
#### Pull Request format
- Before making a PR ensure that the code only has changes in the necessary jsx files and css file.
- The PR should be having a detailed description including screenshots of the updated frontend.

#### Open-source Contribution is a great way of learning!!
This project is a very easy starting point for open-source contribution. The code is too simple and straightforward for newbies. Every contribution is a step towards maturing as a coder so all the best for this journey! Happy Coding!!

#### Visit me at <a href="https://singhropar.com">singhropar.com</a>
#### Contact - hushraj.singh@ccstiet.com