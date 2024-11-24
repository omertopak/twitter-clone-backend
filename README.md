# Twitter Clone Application 🚀

## Overview
This project is a Twitter-like application where users can create posts, retweet, reply, and interact with other users. The goal is to build a functional and scalable social media application.

-------------

## Live Demo
You can view the live version of the project hosted on **[Netlify](https://twitter-app-x.netlify.app/)**. Click the link below to interact with the project:

- [Live Demo on Netlify](https://twitter-app-x.netlify.app/)

This is the deployed version of the project, showcasing the main features such as tweet creation, replies, and the infinite scroll functionality.

## Login - Test Account

For users who don't want to create a new account, you can log in using the following test credentials:

- **Email**: test@gmail.com
- **Password**: testtest

These credentials will allow you to test the app's functionality without creating a new account.

> **Note**: Due to the hosting on Render.com, the initial upload may take a bit longer. Please be patient during the first load of the application.
-------------

## Features
- **User Authentication:** Users can sign up, log in, and manage their profiles.
- **Post Management:** Create, edit, delete, and view tweets.
- **Replies and Retweets:** Interact with tweets by replying or retweeting them.
- **Dark/Light Theme Toggle:** Support for user-preferred themes.
- **Infinite Scroll:** Seamless loading of tweets as the user scrolls.
- **Real-time Updates:** Reflect changes instantly with efficient API calls.

-------------


## Tech Stack
- **Frontend:**
  - React.js
  - Context API for state management
  - Styled Components (or CSS Modules)
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose ORM
- **Other Tools and Libraries:**
  - Axios for API requests
  - JSON Web Token (JWT) for authentication
  - Multer for file uploads
  - Cloud Deployment: Render.com

-------------

## Mock Data from Mockaroo
  For testing and development purposes, this project uses mock data generated with Mockaroo. Mockaroo allows us to create realistic, random data to simulate real user interaction.

  To generate similar data, you can visit the Mockaroo website and customize your data model to match the structure used in the project. Here's an example of the data schema used for generating tweets:
  
  -Tweet content (random text)
  -Username (random user names)
  -Date (random date)
  -Likes, Retweets, Replies (random numbers)
  -This mock data helps simulate a realistic environment for testing and development.
  
  Script Details:
  -The script fetches data from Mockaroo using the Mockaroo API.
  -The generated data includes random user information, tweets, likes, retweets, and replies.
  -The script formats the data to match the MongoDB schema and automatically inserts it into the database.
-------------

## Installation
Clone the repository, install dependencies, set up environment variables, and start the application.  
  cd client
  npm install
  cd ../server
  npm install

## Project Structure
```
├── client/         # React frontend
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   │   ├── App.jsx
│   │   ├── app
│   │   ├── assets
│   │   ├── components
│   │   ├── features
│   │   ├── helper
│   │   ├── hooks
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── pages
│   │   ├── router
│   │   └── styles
│   ├── yarn.lock
│   └── README.md
│
├── server/         # Node.js backend
    ├── index.js
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── configs
    │   ├── controllers
    │   ├── helpers
    │   ├── middlewares
    │   ├── models
    │   └── routes
    └── yarn.lock
```
