const usersEndpoint = '/users.json?start_time=';
const baseURL = 'https://admintestpatrice.zendesk.com/api/v2/';
const endpoint = 'incremental/tickets/cursor.json?start_time=';



console.log(`${baseURL}`+`${usersEndpoint}`+`${UnixTimeOfFirstRequest}`);