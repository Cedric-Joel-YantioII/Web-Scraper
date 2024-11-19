# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Documentation for Project

1. User Guide
Project Setup

Prerequisites:
Ensure you have Python (version 3.x) installed for the backend and Node.js (version 14 or above) for the frontend.
Install dependencies for both backend and frontend.
Backend Setup (Flask)
Navigate to the backend directory.
Set up a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows, use venv\Scripts\activate
Install the required libraries:
pip install -r requirements.txt
Start the Flask server:
python app.py
The backend should now run at http://127.0.0.1:5000.
Frontend Setup (React)
Navigate to the frontend directory.
Install the required packages:
npm install
Start the React app:
npm start
Access the frontend at http://localhost:3000.
Usage

Open the frontend at http://localhost:3000.
Enter the URL, search type, and search term.
Click "Scrape Website" to initiate the web scraping process, and view results.

2. Developer Guide

Project Structure

Backend (Flask):
app.py: Main backend file that handles API requests.
Key Libraries: Flask, Flask-CORS, requests, BeautifulSoup.
Frontend (React):
App.js: Main React component with form elements for user input and button interactions.
index.js: Entry point of the React app.
index.css: Contains global styles for the frontend.
Key Functions and Components

Backend (app.py):
scrape_website(url): Fetches HTML content from the specified URL, parses it with BeautifulSoup, and extracts links, images, and text items.
/api/scrape: API endpoint that receives POST requests from the frontend. It calls scrape_website and returns results based on search_type.
Frontend (App.js):
handleSubmit: Handles form submission, sending a request to /api/scrape with the user-provided URL, search type, and search term.
Rendering Results: Results from the backend are displayed based on the user's search criteria.

3. API Documentation

Endpoint: /api/scrape
Method: POST
Description: Processes a web scraping request.
Parameters:
url (string): The URL to scrape.
search_type (string): Type of search (link, image, or text).
search_term (string): The term to filter results.
Response: JSON array of matching items or a message if no matches are found.

4. Project Report

Summary of Contributions

Backend: Set up a Flask server to handle scraping requests with BeautifulSoup.
Frontend: Created a React interface for user input, request handling, and displaying results.
Challenges and Solutions

Challenge: Managing cross-origin requests between React and Flask.
Solution: Used Flask-CORS to allow communication between the two local servers.
Challenge: Parsing HTML effectively to find specific elements.
Solution: Used BeautifulSoup’s find_all to retrieve relevant tags efficiently.
Reflection on Python Libraries

BeautifulSoup: Ideal for parsing HTML, but it requires understanding of HTML structure for accurate results.
Flask: A straightforward choice for handling backend API requests in Python.
Unexpected Findings

Minor compatibility issues between certain requests and HTML structures.
Changes from the original plan included adding specific error handling for better user feedback.