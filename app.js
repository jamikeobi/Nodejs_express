// Import Package

const express = require("express");
let app = express();

//Route = HTTP method + URL
app.get("/", (request, response) => {
  // Set status before sending html response

  // First: Sending Html
  // response.status(200).send('<h4>Hello, from express server!</h4>\n<p>WOWOWO</p>');


  //Second: Json response
  response.status(200).json({ message: "Hello world", status: 200 });
});

app.post('/', () => {
    console.log('POST request received');
});

//Create Server
const port = "3000";

app.listen(parseInt(port), () => {
  console.log(`Server is running on port ${port}`);
});
