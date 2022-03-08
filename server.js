// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

//spin up the server
const server = app.listen(port, () =>{
    console.log(`running on localhost: ${port}`);
});

//GET route
app.get('/recieveData', sendAllData);

//callback function to complete GET
function sendAllData(req,res){
    res.send(projectData).status(200).end();
}

//POST route 
app.post('/giveData', (request, response) => {
    const data = request.body;
    console.log(data);
    projectData["date"] = data.date;
    projectData["temp"] = data.temp;
    projectData["content"] = data.content;

    response.send(projectData).status(200).end();
});