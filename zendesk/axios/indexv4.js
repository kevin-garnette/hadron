// NODE MODULE	
const fs = require('fs');
const glob = require('glob');

// CONNEXION SETTINGS

const axios = require("axios").default;
const username = 'cp.kenmoe@gmail.com';
const password = 'royfielding';
const token = Buffer.from(`${username}:${password}`,'utf8').toString('base64');
const preCursor = '/tickets/cursor.json?start_time=1546500000'; // Thu Jan  3 07:20:00 GMT 2019
const exportDir = '../export/';
axios.defaults.baseURL = 'https://admintestpatrice.zendesk.com/api/v2/incremental';

// CHECK IF THE EXPORT DIR IS EMPTY
    if (fs.readdirSync(exportDir).length === 0){

// CONNECTING TO API WITH AN INITIAL START TIME
	axios({
    url: preCursor,
	headers: {'Authorization': `Basic ${token}`},
   })

// RETRIEVING DATA
    .then(response => {
    const tickets = response.data;
    console.log(response.status);
    
// CONVERTING JSON TO TEXT AND 
    let ticketsASCII = JSON.stringify(tickets);

// CREATING A TIMESTAMP
 	let timestamp = Math.floor(Date.now() / 1000);

// SAVING TICKETS TO DISK
    fs.writeFile('../export/Tickets_'+ timestamp + '.txt', ticketsASCII, function(err)
    {
    	if (err) {
    		console.log(err);
    	}
  });
})
//HANDLING API CONNECTION ERRORS
    .catch(error => {
    console.log(error);
  })	
    } else {

// CHECK MOST RECENT FILE
const newestFile = require('./apps.js');
newestFile;

// EXTRACT AFTER CURSOR. IF THERE NO NEW TICKETS, STOP THE EXPORT
let regexpCursor = /(?<=after_cursor\":\")(.*)(?=\",\"before_cursor)/g;
let afterCursor = newestFile.match(regexpCursor);

if (afterCursor === null) {
    console.log(`2A- The after_cursor look like this: ${afterCursor}`);
    console.log('2B- Furthermore there is no more new tickets to retrieve: End of script ! ');
    return;
        } else {

    console.log(`2- The after_cursor look like this: ${afterCursor}`);
// OR ELSE CONNECT TO API
	axios({
    url: '/tickets/cursor.json',
    headers: {'Authorization': `Basic ${token}`},
    params: {
        cursor: afterCursor
      }
   })

// RETRIEVING DATA
    .then(response => {
    const tickets = response.data;
    console.log(response.status);
 //   console.log(response.statusText);

// CONVERTING JSON TO TEXT
    let ticketsASCII = JSON.stringify(tickets);

// CREATING A TIMESTAMP
 	let timestamp = Math.floor(Date.now() / 1000);

// SAVING TICKETS TO DISK
    fs.writeFile('../export/Tickets_'+ timestamp , ticketsASCII, function(err)
    {
    	if (err) {
    		console.log(err);
    	}
    });
})
//HANDLING API CONNECTION ERRORS
    .catch(error => {
    console.log(error);
  })
        }
    }