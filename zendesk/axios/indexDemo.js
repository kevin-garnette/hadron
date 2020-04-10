// NODE MODULE	
const fs = require('fs');
const glob = require('glob');

// CONNEXION SETTINGS

const axios = require("axios").default;
const username = 'cp.kenmoe@gmail.com';
const password = 'royfielding';
const token = Buffer.from(`${username}:${password}`,'utf8').toString('base64');
// foudn here https://flaviocopes.com/axios-send-authorization-header/
axios.defaults.baseURL = 'https://admintestpatrice.zendesk.com/api/v2/incremental';
axios.defaults.headers.common = {'Authorization': `Basic ${token}`};
const startFrom2019 = '/tickets/cursor.json?start_time=1546500000'; // Thu Jan  3 07:20:00 GMT 2019
const exportDir = '../export/';

	axios({ // CONNECTING TO API WITH AN INITIAL START TIME
    url: startFrom2019,
    })
    .then(response => { // RETRIEVING DATA
    const tickets = response.data;
    console.log(response.status);
//    console.log(response.config);
    })

//HANDLING API CONNECTION ERRORS
    .catch(error => {
    console.log(error);
    // CONVERTING JSON TO TEXT AND 
    let ticketsASCII = JSON.stringify(tickets);
    // CREATING A TIMESTAMP
    let timestamp = Math.floor(Date.now()/1000);
    // SAVING TICKETS TO DISK
    fs.writeFile('../export/Tickets_'+ timestamp , ticketsASCII, function(err)
{
    if (err) {
        console.log(err);
    }
    });
})

