// Importing the express module
const express = require('express');

// Importing the qrcode module
const qrcode = require('qrcode');

const app = express();

const port = 3000;

//define Qr generation route
app.get('/qrcode',(req,res) => {
   //define url that we would like to connect into the qr code
   const url = 'https://www.google.com';
   
   //convert the url into dataUrl (QR image representation)
   qrcode.toDataURL(url,(err, qrCodeUrl) =>{

      //handle QR code generation error
      if(err){
         //if there is an error we will send a 500 status code and a message
         res.status(500).send('Error generating QR code');
      }  
      //Conditional statement
      else{
         //if there is no error we will send the QR code image
         res.send(`
            <!DOCTYPE HTML><html>
            <head>
               <title>QR Code Generator</title>
            </head>
            <body>
               <h1>QR Code Generator</h1>
               <img src="${qrCodeUrl}" alt="QR Code">
               <p>Scan the QR code to visit the website</p>
            </body>
            </html>
         `);
      }

   })
})

//start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
