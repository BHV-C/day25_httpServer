const fetchAPI =  require ('../day 24 challenge/script.js') ;
// import fetchAPI  from '../day 24 challenge/script.js';
// console.log(imp.cities);

const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
    { name: 'London', lat: 51.5074, lng: -0.1278 },
    { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
    { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
    { name: 'Rome', lat: 41.9028, lng: 12.4964 },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
    { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
    { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
    { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
  ];


/**************************** Creating HTTP Server **********************************/ 
// importing the 'http' module
const http = require('http');

// Parse Request Data: To access request data such as the URL, query parameters, or headers,
// we need to use the built-in 'url' and 'querystring' modules. 
const url = require('url');

// Create the Server && handling incoming requests and send responses
const server = http.createServer(async(req, res) => {
    // Request handling logic goes here
   
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    if (path === ''){
        // Handle unknown endpoints
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to my Server');
    }
     else if (path === '/products') {
        // Handle the '/products' endpoint
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('I am a list of products :products');
    } else if (path === '/users') {
        // Handle the '/users' endpoint
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('I am a list of products :ok for users page');
    } else if (path === '/weather'){
        // Handle unknown endpoints
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        // res.end('Welcome to the weather service');
        // if(!query.id){

        // }
        if (query.city) {
            let response;
            // Extract the city name from the query parameter
            const cityName = query.city.toLowerCase();

            // Find the corresponding city in your cities array
            const city = cities.find(c => c.name.toLowerCase() === cityName);

            if (city) {
                // City found, you can now use 'city' object to fetch weather data or perform other actions

                //response = setTimeout(()=>fetchAPI(city.name).then(data => {return data}).catch(error => {console.log(error)}),2000);
                response = await fetchAPI(city.name).then(data => {return data}).catch(error => {console.log(error)});
                console.log("****************");
                console.log(response);
                console.log("****************");    
                const responseText = `Weather information for ${city.name}\nTemperature is ${response.elevation}`;
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(responseText);//`Weather information for ${city.name}`);
            } else {
                // City not found in your data
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('City not found');
            }
        } else {
            // Query parameter 'city' is missing
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Please provide a city parameter');
        }
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page Not Found');
    }
    // let {queryy, pathname: pathh}=url.parse(request.url, true);

  });

// Start Listening for Requests on port 3000:
server.listen(3000, () => {
console.log('Server is listening on port 3000');
});

// server.get('/weather', (req,res) => {
//     let city = req.query.name;
//     for(let e of cities) {
//         if(city === e.name) {res.send(e.name, e.lat , e.lng)}
//         else {
//             res.json("not found");
//         }
//     }
// });

