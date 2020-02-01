const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const convertHTMLToPDF = require("pdf-puppeteer");

const convertAsync = util.promisify(convertHTMLToPDF);


function promptUser() {
    // console.log("promptUser");
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your Github username?"
        },
        {
            type: "input",
            name: "color",
            message: "Which color do you like best: green, blue, pink, or red?"
        }
    ]);
}

function starQuery(data) {
    console.log("loading...");
    // console.log("starQuery");
    const queryURL = `https://api.github.com/users/${data.username}/starred`;
    return axios
        .get(queryURL)
        
}

function githubQuery(data) {
    console.log("loading...");
    // console.log("githubQuery");
    const queryURL = `https://api.github.com/users/${data.username}`;
    return axios
        .get(queryURL)
        
}

// pdf-puppeteer:
var callback = function (pdf) {
    
    fs.writeFile("developerPDF.pdf", pdf, "utf8", function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("new pdf success!");
    })
}
var options = {
    format: "Letter",
    printBackground: true,
    margin: {
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px"
    }
}

async function init() {
    // console.log("init called");
    try {
        const data = await promptUser()
        
        const response  = await githubQuery(data);

        const star  = await starQuery(data);

        const html = generateHTML(data, response, star);

        convertAsync(html, callback, options);
        
    } catch(err) {
        console.log(err);
        console.log("Invlaid username/color. Please try again.");
    }
}

init();

const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
};

function generateHTML(data, response, star) {
    console.log("loading...");
    // console.log(response.data)
    // console.log(star.data)
    
    return `
    <!DOCTYPE html>
    <html lang="en">
       <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
          <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
          <!-- bootstrap css -->
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
          <!-- my css -->
          <link rel="stylesheet" href="new.css">
          <title>Document</title>
          <style>
             /* copy & paste style.css here */
             @page {
        margin: 0;
    }
    *,
    *::after,
    *::before {
    box-sizing: border-box;
    }
    html, body {
    padding: 0;
    margin: 0;
    height: 100%; 
    }
    .container-fluid {
        
        padding:0;
        height:100%   
    }
    
    .row {
        padding:0;
        margin:0;
    }
    
    .wrapper {
    background-color: ${colors[data.color].wrapperBackground};
    height: 33.33333%;
    
    }
    body {
    background-color: white;
    -webkit-print-color-adjust: exact !important;
    font-family: 'Cabin', sans-serif;
    }
    .main {
    background-color: #E9EDEE;
    height: 33.33333%;
    padding-top: 140px;
    
    }
    h1, h2, h3, h4, h5, h6 {
    font-family: 'BioRhyme', serif;
    margin: 0;
    }
    h1 {
    font-size: 3em;
    }
    h2 {
    font-size: 2.5em;
    }
    h3 {
    font-size: 2em;
    }
    h4 {
    font-size: 1.5em;
    }
    h5 {
    font-size: 1.3em;
    }
    h6 {
    font-size: 1.2em;
    }
    .photo-header {
    position: relative;
    margin-top: 80px;
    margin-right:auto;
    margin-bottom:0px;
    margin-left:auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color:${colors[data.color].headerBackground};
    color: ${colors[data.color].headerColor};
    padding: 10px;
    width: 90vh;
    border-radius: 6px;
    height: 100%;
    
    }
    .photo-header img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
    margin-top: -50px;
    border: 6px solid ${colors[data.color].photoBorderColor};
    box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
    }
    .photo-header h1, .photo-header h2 {
    width: 100%;
    text-align: center;
    }
    .photo-header h1 {
    margin-top: 10px;
    }
    .links-nav {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    font-size: 1.1em;
    }
    .nav-link {
    display: inline-block;
    margin: 5px 10px;
    }
    .workExp-date {
    font-style: italic;
    font-size: .7em;
    text-align: right;
    margin-top: 10px;
    }
    /* .container {
    padding: 50px;
    padding-left: 100px;
    padding-right: 100px;
    } */
    
    .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    }
    
    .card {
    padding: 20px;
    border-radius: 6px;
    background-color: ${colors[data.color].headerBackground};
    color: ${colors[data.color].headerColor};
    margin: 20px;
    }
    
    .col {
    flex: 1;
    text-align: center;
    }
    
    a, a:hover {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
    }
    
    @media print { 
    body { 
        zoom: .75; 
    } 
    }
          </style>
        </head>
        <body>
            <div class="container-fluid">
                <div class="row wrapper">
                    <div class="photo-header">
                        <img src="${response.data.avatar_url}" alt="profile picture"></img>    
                        <h1>Hi!</h1>    
                        <h1>My name is ${response.data.name}!</h1>    
                        <h3>Currently at ${response.data.company}</h3>
                        <div class="row links-nav">
                            <div class="col nav-link"><a href="http://maps.google.com/maps?q${response.data.location}" target="_blank"><h3>${response.data.location}</h3></a></div>
                            <div class="col nav-link"><a href="${response.data.html_url}" target="_blank"><h3>Github</h3></a></div>
                            <div class="col nav-link"><a href="${response.data.blog}" target="_blank"><h3>Blog</h3></a></div>
                        </div>
                    </div>
                </div>
                <div class="row main">
                    <div class="col">
                        <div class="row">
                            <div class="col">
                                <h3>${response.data.bio}</h3>
                            </div>
                            
                        </div>
                        <br>
                        <div class="row">
                            <div class="col card">
                                <h3>Public Repositories</h3>
                                <h3>${response.data.public_repos}</h3>
                            </div>
                            <div class="col card">
                                <h3>Followers</h3>
                                <h3>${response.data.followers}</h3>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col card">
                                <h3>Github Stars</h3>
                                <h3>${star.data.length}</h3>
                            </div>
                            <div class="col card">
                                <h3>Following</h3>
                                <h3>${response.data.following}</h3>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="row wrapper">
                    
                </div>
            </div>
    
            <!-- Bootstrap scripts -->
            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
        </body>
    </html>
    `;
    
} 